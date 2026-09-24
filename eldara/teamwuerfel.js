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
// Würfel-Feed.
//
// Nachricht (multiplayer.js, SL -> Spieler):
//   { type: 'teamWurf', name, farbe, message, emoji, bigNumber, subtitle, zeit }
//
// Rein ein Live-Feed, nichts davon wird gespeichert - ein neu beitretender
// Spieler sieht nur Würfe ab dem Moment seines Beitritts (wie das Logbuch
// des SL vor dem ersten Beitritt auch leer ist).

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

    box.innerHTML = `
        <details class="x-details tw-details" ${teamwuerfelOffen ? 'open' : ''}>
            <summary>
                <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-dice category-icon-fa"></i> Team-Würfel
                    ${teamwuerfelEintraege.length ? `<span class="x-count">${teamwuerfelEintraege.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('teamwuerfel')" title="Hilfe zum Team-Würfel"></i></h2>
            </summary>
            <ul class="tw-liste">${zeilen || '<li class="x-leer">Noch keine Würfe in der Runde.</li>'}</ul>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => { teamwuerfelOffen = details.open; });
}
