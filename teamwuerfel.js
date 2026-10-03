// How to be a Hero - Team-Würfel (geteilter Wurf-Feed für Spieler)
//
// Bislang sah nur der SL die Würfe der ganzen Gruppe (Live-Log im Dashboard) -
// Spieler mussten dafür bislang parallel den Discord-Webhook mitlaufen lassen.
// Dieses Modul gibt jedem verbundenen Spieler ein eigenes, kleines Live-Feed
// unter seinem Würfel-Tool: die Würfe aller Mitspieler (den eigenen
// eingeschlossen), in Echtzeit, ganz ohne Discord.
//
// Der SL bleibt die Autorität (wie überall sonst im Tool): Er bekommt jeden
// Spieler-Wurf ohnehin schon per { type: 'log' } (siehe handleIncomingData in
// multiplayer.js) und reicht ihn von dort zusätzlich an alle Spieler weiter -
// inklusive Name und Farbe, die nur er kennt (appData der Spieler kennt sich
// selbst nicht als "Spieler X" und keine fremden Farb-Overrides). Nur echte
// Würfe (mit bigNumber) werden weitergereicht, keine allgemeinen
// Logbuch-Einträge (Items, HP, ...) - das wäre zu viel Rauschen für einen
// Würfel-Feed. Jeder Spieler kann per Toggle im eigenen Panel wählen, ob
// seine Würfe an die Gruppe gehen (Standard) oder nur beim SL landen
// (appData.teamwuerfelTeilen, sendMultiplayerLog in multiplayer.js) - der SL
// sieht sie so oder so über sein eigenes Live-Log. Ein zweiter, unabhängiger
// Toggle (appData.teamwuerfelSound, Standard AUS) spielt bei jedem
// eintreffenden Mitspieler-Wurf den "hit"-Sound ab (assets/sound/hit.mp3,
// siehe audio.js) - für alle, die auch akustisch mitbekommen wollen, wenn am
// Tisch gewürfelt wird, nicht nur wer's gerade im Blick hat.
//
// Nachricht (multiplayer.js, SL -> Spieler):
//   { type: 'teamWurf', name, farbe, message, emoji, bigNumber, subtitle, zeit }
//
// Rein ein Live-Feed, nichts davon wird gespeichert - ein neu beitretender
// Spieler sieht nur Würfe ab dem Moment seines Beitritts (wie das Logbuch
// des SL vor dem ersten Beitritt auch leer ist). Der letzte Wurf bleibt
// zusätzlich in einer eigenen Box auch bei eingeklapptem Feed sichtbar. Ein
// dritter, ebenfalls unabhängiger Toggle (appData.teamwuerfelPopup, Standard
// AUS) zeigt jeden eintreffenden Mitspieler-Wurf zusätzlich als kurzes,
// selbst verschwindendes Popup oben auf dem Bildschirm - für alle, die auch ohne
// das Panel offen zu haben sofort merken, wenn wer würfelt.

const TEAMWUERFEL_MAX = 20;
let teamwuerfelEintraege = [];
let teamwuerfelOffen = false;

// --- Spielleiter --------------------------------------------------------------

// Aus multiplayer.js (handleIncomingData, type 'log') für jeden echten Wurf
// (bigNumber gesetzt) aufgerufen - reicht ihn an alle Spieler weiter.
function teamwuerfelVerteilen(charName, payload) {
    if (typeof clientConnections === 'undefined') return;
    const nachricht = {
        type: 'teamWurf',
        name: charName,
        farbe: typeof getColorForPlayer === 'function' ? getColorForPlayer(charName) : '#9ca3af',
        message: payload.message,
        emoji: payload.emoji,
        bigNumber: payload.bigNumber,
        subtitle: payload.subtitle,
        zeit: Date.now()
    };
    Object.values(clientConnections).forEach(conn => {
        if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
    });
}

// --- Spieler --------------------------------------------------------------

function teamwuerfelEmpfangen(payload) {
    teamwuerfelEintraege.unshift(payload);
    if (teamwuerfelEintraege.length > TEAMWUERFEL_MAX) teamwuerfelEintraege.length = TEAMWUERFEL_MAX;
    // Sound/Popup nur für ECHTE Mitspieler-Würfe, nicht für den eigenen
    // (bekommt man ja schon per eigenem Würfel-Tool mit - beides ein zweites
    // Mal für den eigenen, hier nur reflektierten Wurf wäre doppelt/nervig).
    const ich = typeof appData !== 'undefined' ? [appData.vorname, appData.name].filter(Boolean).join(' ') : '';
    const fremderWurf = payload.name !== ich;
    if (teamwuerfelSoundAn() && fremderWurf && typeof AudioController !== 'undefined') AudioController.play('hit');
    if (teamwuerfelPopupAn() && fremderWurf) teamwuerfelPopupZeigen(payload);
    renderTeamwuerfel();
}

function teamwuerfelNachrichtVerarbeiten(payload) {
    if (payload && payload.type === 'teamWurf') { teamwuerfelEmpfangen(payload); return true; }
    return false;
}

// Beitritt: eine evtl. eigene alte Sitzung gehört nicht zu dieser Runde -
// leer starten.
function teamwuerfelBeitritt() {
    teamwuerfelEintraege = [];
    renderTeamwuerfel();
}

function teamwuerfelGetrennt() {
    teamwuerfelEintraege = [];
    renderTeamwuerfel();
}

// Eigene Würfe mit der Gruppe teilen (Standard) oder nur mit dem SL - der SL
// sieht sie über sein normales Live-Log (siehe handleIncomingData, type
// 'log') so oder so, das steuert nur die Weiterverteilung an die anderen
// Spieler (teamwuerfelVerteilen in multiplayer.js). undefined = alte/neue
// appData ohne dieses Feld -> Standardverhalten (teilen), damit sich für
// niemanden ungefragt etwas ändert.
function teamwuerfelTeiltMitGruppe() {
    return typeof appData !== 'undefined' && appData.teamwuerfelTeilen !== false;
}

function teamwuerfelTeilenUmschalten(an) {
    if (typeof appData === 'undefined') return;
    appData.teamwuerfelTeilen = !!an;
    if (typeof saveData === 'function') saveData();
}

// Sound (assets/sound/hit.mp3, siehe audio.js) bei Mitspieler-Würfen -
// bewusst OPT-IN (Standard aus), niemand soll ungefragt einen Sound bei
// jedem fremden Wurf bekommen, der es nicht ausdrücklich will.
function teamwuerfelSoundAn() {
    return typeof appData !== 'undefined' && !!appData.teamwuerfelSound;
}

function teamwuerfelSoundUmschalten(an) {
    if (typeof appData === 'undefined') return;
    appData.teamwuerfelSound = !!an;
    if (typeof saveData === 'function') saveData();
}

// Kurzes, selbst verschwindendes Popup bei Mitspieler-Würfen - bewusst
// OPT-IN (Standard aus), wie Sound. Bewusst ein nicht-blockierendes Toast
// (auto-hide, klickbar zum Wegwischen) statt alert(): Würfe können in einem
// Kampf mehrfach pro Minute reinkommen, ein blockierender Dialog pro Wurf
// wäre schnell nur noch nervig.
function teamwuerfelPopupAn() {
    return typeof appData !== 'undefined' && !!appData.teamwuerfelPopup;
}

function teamwuerfelPopupUmschalten(an) {
    if (typeof appData === 'undefined') return;
    appData.teamwuerfelPopup = !!an;
    if (typeof saveData === 'function') saveData();
}

let teamwuerfelPopupTimer = null;

function teamwuerfelPopupZeigen(eintrag) {
    let el = document.getElementById('tw-popup');
    if (!el) {
        el = document.createElement('div');
        el.id = 'tw-popup';
        el.className = 'tw-popup';
        el.onclick = () => el.classList.remove('tw-popup-sichtbar');
        document.body.appendChild(el);
    }
    el.style.setProperty('--tw-farbe', eintrag.farbe || '#9ca3af');
    el.innerHTML = `<i class="fa-solid fa-dice"></i>
        <div><strong>${escapeHtml(eintrag.name || 'Unbekannt')}</strong><br>${eintrag.emoji ? escapeHtml(eintrag.emoji) + ' ' : ''}${escapeHtml(eintrag.message || '')}</div>`;
    // Neu anstoßen statt nur die Klasse zu behalten, falls kurz hintereinander
    // mehrere Würfe reinkommen (Reflow erzwingt die CSS-Transition erneut).
    el.classList.remove('tw-popup-sichtbar');
    void el.offsetWidth;
    el.classList.add('tw-popup-sichtbar');
    clearTimeout(teamwuerfelPopupTimer);
    teamwuerfelPopupTimer = setTimeout(() => el.classList.remove('tw-popup-sichtbar'), 4000);
}

function renderTeamwuerfel() {
    const box = document.getElementById('teamwuerfel-section');
    if (!box) return;
    const verbunden = typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
    if (!verbunden || (typeof isGmMode !== 'undefined' && isGmMode)) {
        box.style.display = 'none';
        box.innerHTML = '';
        return;
    }
    box.style.display = '';

    const zeilen = teamwuerfelEintraege.map(e => {
        const zeit = new Date(e.zeit || Date.now()).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        return `
        <li class="tw-zeile" style="--tw-farbe: ${escapeHtml(e.farbe || '#9ca3af')}">
            <span class="tw-zeit">${escapeHtml(zeit)}</span>
            <span class="tw-name">${escapeHtml(e.name || 'Unbekannt')}</span>
            <span class="tw-msg">${e.emoji ? escapeHtml(e.emoji) + ' ' : ''}${escapeHtml(e.message || '')}</span>
        </li>`;
    }).join('');

    // Der letzte Wurf bleibt IMMER sichtbar, auch bei eingeklapptem Feed
    // darunter - auf Wunsch der Runde, damit man nicht extra aufklappen muss,
    // um zu sehen, was der letzte Mitspieler gerade gewürfelt hat.
    const letzter = teamwuerfelEintraege[0];
    const letzterHtml = letzter ? `
        <div class="tw-letzter" style="--tw-farbe: ${escapeHtml(letzter.farbe || '#9ca3af')}">
            <div class="tw-letzter-kopf">
                <span class="tw-letzter-name">${escapeHtml(letzter.name || 'Unbekannt')}</span>
                <span class="tw-letzter-zeit">${escapeHtml(new Date(letzter.zeit || Date.now()).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }))}</span>
            </div>
            <div class="tw-letzter-zahl">${escapeHtml(String(letzter.bigNumber != null ? letzter.bigNumber : ''))}</div>
            <div class="tw-letzter-sub">${letzter.emoji ? escapeHtml(letzter.emoji) + ' ' : ''}${escapeHtml(letzter.subtitle || letzter.message || '')}</div>
        </div>` : '';

    box.innerHTML = `
        ${letzterHtml}
        <details class="x-details tw-details" ${teamwuerfelOffen ? 'open' : ''}>
            <summary>
                <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-dice category-icon-fa"></i> Team-Würfel
                    ${teamwuerfelEintraege.length ? `<span class="x-count">${teamwuerfelEintraege.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('teamwuerfel')" title="Hilfe zum Team-Würfel"></i></h2>
            </summary>
            <label class="tw-teilen-toggle" onclick="event.stopPropagation()">
                <input type="checkbox" ${teamwuerfelTeiltMitGruppe() ? 'checked' : ''} onchange="teamwuerfelTeilenUmschalten(this.checked)">
                <span>Eigene Würfe mit der ganzen Gruppe teilen (sonst nur der SL)</span>
            </label>
            <label class="tw-teilen-toggle" onclick="event.stopPropagation()">
                <input type="checkbox" ${teamwuerfelSoundAn() ? 'checked' : ''} onchange="teamwuerfelSoundUmschalten(this.checked)">
                <span>Sound abspielen, wenn ein Mitspieler würfelt</span>
            </label>
            <label class="tw-teilen-toggle" onclick="event.stopPropagation()">
                <input type="checkbox" ${teamwuerfelPopupAn() ? 'checked' : ''} onchange="teamwuerfelPopupUmschalten(this.checked)">
                <span>Würfe als Popup anzeigen</span>
            </label>
            <ul class="tw-liste">${zeilen || '<li class="x-leer">Noch keine Würfe in der Runde.</li>'}</ul>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => { teamwuerfelOffen = details.open; });
}
