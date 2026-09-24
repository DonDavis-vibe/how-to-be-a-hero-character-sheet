// How to be a Hero - Hausregeln / Regelpakete
//
// HTBAH lebt davon, dass jede Runde ihr eigenes Setting baut. Dieses Modul hält
// die Hausregeln einer Runde als "Regelpaket": feste Talentliste, abweichende
// Punktekosten, ein Talentbaum (siehe talentbaum.js), Wesen-Effekte und
// Würfeltabellen. Ohne aktives Paket verhält sich der Bogen exakt wie bisher.
//
// Der Spielleiter wählt das Paket und schickt es an seine Runde - so rechnen alle
// nach denselben Regeln, ohne dass jeder etwas von Hand einstellen muss.
//
// Paketdaten liegen in hausregeln/<id>.js und werden erst nachgeladen, wenn das
// Paket gewählt wird (sie sind groß, und die meisten Runden brauchen sie nie).
// Eine Paketdatei ruft hausregelPaketRegistrieren({...}) auf. Das Format ist in
// DATA_FORMAT.md beschrieben.

const HAUSREGELN_KEY = 'htbah_hausregeln';

// Eingebaute Pakete. Die Datei wird per <script>-Tag nachgeladen, damit das
// Ganze auch direkt von file:// funktioniert (fetch() wäre dort blockiert).
const HAUSREGEL_PAKETE_EINGEBAUT = [
    {
        id: 'eldora-arrrrr',
        name: 'Eldara – Version Arrrrr',
        datei: 'hausregeln/eldora-arrrrr.js',
        kurz: 'Piraten-Setting mit fester Talentliste, progressiven Talentkosten und Talentbaum (3 Hauptbäume + 1 Wesen).'
    }
];

const HAUSREGELN_STANDARD = {
    // null = Regelwerk pur, sonst id eines Pakets
    paketId: null,
    // Nur gefüllt, wenn das Paket aus einer Datei kam und nicht eingebaut ist -
    // dann muss es mit an die Spieler geschickt werden.
    paketDaten: null,
    // Welche Teile des Pakets greifen. Alles einzeln abschaltbar, damit eine
    // Runde z.B. nur die Talentliste nutzen kann, ohne den Baum.
    optionen: {
        kostenStaffel: true,   // "Verteilte Punkte" nach Kostenstaffel des Pakets
        talentbaum: true,      // Talentbaum-Abschnitt auf dem Bogen zeigen
        wuerfelTabellen: true  // Sondertabellen (Kochen, Zechen, ...) anbieten
    }
};

let hausregeln = hausregelnStandardKopie();
// id -> Paketobjekt, sobald die Datei geladen ist
const hausregelPaketeGeladen = {};
// id -> [callbacks], während eine Datei noch lädt
const hausregelPaketeLadend = {};

function hausregelnStandardKopie() {
    return JSON.parse(JSON.stringify(HAUSREGELN_STANDARD));
}

function hausregelnLaden() {
    try {
        const roh = localStorage.getItem(HAUSREGELN_KEY);
        if (roh) hausregelnSetzen(JSON.parse(roh));
    } catch (e) {
        hausregeln = hausregelnStandardKopie();
    }
    return hausregeln;
}

function hausregelnSichern() {
    sicherSpeichern(HAUSREGELN_KEY, JSON.stringify(hausregeln));
}

// Übernimmt ein (evtl. unvollständiges oder älteres) Regelobjekt in den Standard.
function hausregelnSetzen(regeln) {
    const neu = hausregelnStandardKopie();
    if (regeln && typeof regeln === 'object') {
        if (typeof regeln.paketId === 'string' || regeln.paketId === null) neu.paketId = regeln.paketId;
        if (regeln.paketDaten && typeof regeln.paketDaten === 'object') neu.paketDaten = regeln.paketDaten;
        if (regeln.optionen && typeof regeln.optionen === 'object') Object.assign(neu.optionen, regeln.optionen);
    }
    hausregeln = neu;
    if (hausregeln.paketDaten && hausregeln.paketDaten.id) {
        hausregelPaketRegistrieren(hausregeln.paketDaten);
        hausregeln.paketId = hausregeln.paketDaten.id;
    }
    return hausregeln;
}

function hausregelnAktiv() {
    return !!hausregeln.paketId;
}

// Schaltet Eldara-spezifische Extra-Features frei (Rasterinventar, Schiff) -
// anders als der Talentbaum sind das rein optische/UX-Ergänzungen der Runde,
// keine Punkte-Ökonomie, daher ein eigener, engerer Check statt hausregelnAktiv().
function eldaraAktiv() {
    return hausregelnAktiv() && appData.hausregeln && appData.hausregeln.paket === 'eldora-arrrrr';
}

// Wird von den Paketdateien aufgerufen (und für Datei-Importe direkt).
function hausregelPaketRegistrieren(paket) {
    if (!paket || !paket.id) return;
    hausregelPaketeGeladen[paket.id] = paket;
    const warten = hausregelPaketeLadend[paket.id];
    delete hausregelPaketeLadend[paket.id];
    if (warten) warten.forEach(cb => { try { cb(paket); } catch (e) { console.error(e); } });
}

function hausregelPaketInfo(id) {
    return HAUSREGEL_PAKETE_EINGEBAUT.find(p => p.id === id) || null;
}

// Liefert das Paket per Callback - sofort, wenn schon geladen, sonst nach dem
// Nachladen der Datei. cb(null) wenn es das Paket nicht gibt.
function hausregelPaketLaden(id, cb) {
    if (!id) { cb(null); return; }
    if (hausregelPaketeGeladen[id]) { cb(hausregelPaketeGeladen[id]); return; }
    const info = hausregelPaketInfo(id);
    if (!info) { cb(null); return; }
    if (hausregelPaketeLadend[id]) { hausregelPaketeLadend[id].push(cb); return; }
    hausregelPaketeLadend[id] = [cb];
    const s = document.createElement('script');
    s.src = info.datei;
    s.onerror = () => {
        const warten = hausregelPaketeLadend[id] || [];
        delete hausregelPaketeLadend[id];
        console.error('Regelpaket konnte nicht geladen werden:', info.datei);
        warten.forEach(w => w(null));
    };
    document.head.appendChild(s);
}

// Das gerade wirksame Paket - oder null. Synchron, damit die Regel-Hooks in
// app.js keine Callbacks brauchen; vor dem Nachladen ist es schlicht noch null.
function aktivesPaket() {
    if (!hausregeln.paketId) return null;
    return hausregelPaketeGeladen[hausregeln.paketId] || null;
}

function hausregelOption(name) {
    return hausregelnAktiv() && !!hausregeln.optionen[name];
}

// --- Auswirkungen auf die Regeln --------------------------------------------
// Diese Funktionen fragt app.js ab. Ohne Paket liefern sie exakt das
// Regelwerk-Verhalten.

// Kosten für einen Talentwert. Regelwerk: 1 Punkt = 1 Punkt. Mit Kostenstaffel
// (z.B. Punkt 1-30 kostet 1, 31-60 kostet 2, ...) wird's progressiv.
function hausregelnTalentKosten(investiert) {
    const p = aktivesPaket();
    const wert = Math.max(0, parseInt(investiert) || 0);
    if (!p || !p.punkte || !Array.isArray(p.punkte.kostenStaffel) || !hausregelOption('kostenStaffel')) return wert;
    return talentKostenNachStaffel(wert, p.punkte.kostenStaffel);
}

function talentKostenNachStaffel(wert, staffel) {
    let kosten = 0;
    let von = 0;
    const stufen = staffel.slice().sort((a, b) => a.bis - b.bis);
    for (const st of stufen) {
        if (wert <= von) break;
        const bisHier = Math.min(wert, st.bis);
        kosten += (bisHier - von) * (st.kosten || 0);
        von = st.bis;
    }
    // Punkte über der letzten Stufe kosten wie die letzte Stufe
    if (wert > von && stufen.length) kosten += (wert - von) * (stufen[stufen.length - 1].kosten || 0);
    return kosten;
}

// Punktebudget laut Paket, sonst undefined (dann gilt appData.maxPoints)
function hausregelnBudget() {
    const p = aktivesPaket();
    if (p && p.punkte && hausregelOption('kostenStaffel') && p.punkte.maxTalentpunkte) return p.punkte.maxTalentpunkte;
    return undefined;
}

// Talentliste des Pakets als Vorgabe auf den Bogen übernehmen. Skills mit
// gleichem Namen behalten ihre Punkte, unbekannte Skills des Spielers bleiben
// stehen - hier wird nichts stillschweigend gelöscht.
function hausregelnTalenteUebernehmen(stumm) {
    const p = aktivesPaket();
    if (!p || !p.talente || typeof appData === 'undefined') return false;
    if (!stumm && !confirm(`Talentliste aus "${p.name}" auf den Bogen übernehmen?\n\nSkills mit gleichem Namen behalten ihre Punkte, deine übrigen Skills bleiben zusätzlich erhalten.`)) return false;

    ['handeln', 'wissen', 'soziales'].forEach(kat => {
        const vorgaben = p.talente[kat] || [];
        const bestehend = appData[`skills_${kat}`] || [];
        const rest = bestehend.slice();
        const neu = vorgaben.map(t => {
            const idx = rest.findIndex(s => (s.name || '').trim().toLowerCase() === t.name.toLowerCase());
            const alt = idx >= 0 ? rest.splice(idx, 1)[0] : null;
            return Object.assign({}, alt || { id: 's' + Date.now() + Math.random().toString(36).slice(2, 6), invested: 0 }, {
                name: t.name,
                paketTalent: t.id,
                beschreibung: t.beschreibung || '',
                tabelle: t.tabelle || undefined
            });
        });
        appData[`skills_${kat}`] = neu.concat(rest);
    });
    if (p.punkte && p.punkte.maxTalentpunkte) appData.maxPoints = p.punkte.maxTalentpunkte;
    if (p.waehrung && appData.currency && (!appData.currency.name || appData.currency.name === 'Credits')) appData.currency.name = p.waehrung;
    if (!appData.hausregeln) appData.hausregeln = {};
    appData.hausregeln.paket = p.id;

    if (typeof saveData === 'function') saveData();
    if (typeof renderAll === 'function') renderAll();
    if (typeof calculatePoints === 'function') calculatePoints();
    if (typeof addActivityLog === 'function') addActivityLog(`Talentliste aus Regelpaket "${p.name}" übernommen.`, 'activity-neutral', '<i class="fa-solid fa-scroll"></i>');
    return true;
}

// Feste Talentliste einer Kategorie, wenn sie für den Bogen gelten soll -
// sonst null (dann bleibt die freie Texteingabe wie im reinen Regelwerk).
// Eng an eldaraAktiv() statt an hausregelnAktiv() gebunden: wie beim
// Rasterinventar/Schiff ist das eine UX-Ergänzung der Eldara-Runde, keine
// generelle Paket-Eigenschaft, die jede Runde per Häkchen an-/abschalten soll.
function hausregelnFesteTalentliste(attr) {
    if (typeof eldaraAktiv !== 'function' || !eldaraAktiv()) return null;
    const p = aktivesPaket();
    const liste = p && p.talente && p.talente[attr];
    return Array.isArray(liste) && liste.length ? liste : null;
}

// --- Würfeltabellen ---------------------------------------------------------

function hausregelnTabellen() {
    const p = aktivesPaket();
    if (!p || !p.wuerfelTabellen || !hausregelOption('wuerfelTabellen')) return {};
    return p.wuerfelTabellen;
}

function wuerfelAusdruck(text) {
    const m = String(text || '1W10').trim().match(/^(\d+)\s*[wWdD]\s*(\d+)$/);
    if (!m) return { anzahl: 1, seiten: 10 };
    return { anzahl: parseInt(m[1], 10) || 1, seiten: parseInt(m[2], 10) || 10 };
}

// Würfelt auf einer Sondertabelle. Bei Proben-Tabellen (Kochen, Zechen, ...)
// entscheidet die vorherige Probe, ob in der Erfolgs- oder Misserfolgsspalte
// gelesen wird - das Tool weiß das nicht, deshalb fragt es nach.
function hausregelnTabelleWuerfeln(id, erfolg) {
    const t = hausregelnTabellen()[id];
    if (!t) return;
    let spalte;
    if (t.art === 'probe') {
        if (erfolg === undefined) {
            erfolg = confirm(`Tabelle "${t.name}":\n\nWar die vorherige Probe ein Erfolg?\n(OK = Erfolg, Abbrechen = Misserfolg)`);
        }
        spalte = erfolg ? 'success' : 'no_success';
    }
    const w = wuerfelAusdruck(t.wuerfel);
    const ergebnisse = [];
    const spalten = spalte ? [spalte] : Object.keys(t.spalten);
    spalten.forEach(sp => {
        const zeilen = t.spalten[sp] || [];
        let wurf = 0;
        for (let i = 0; i < w.anzahl; i++) wurf += Math.floor(Math.random() * w.seiten) + 1;
        const zeile = zeilen.find(z => parseInt(z.wurf, 10) === wurf) || zeilen[Math.min(wurf, zeilen.length) - 1];
        ergebnisse.push({ spalte: sp, wurf, text: zeile ? zeile.text : '–', buffs: zeile && zeile.buffs ? zeile.buffs : [] });
    });

    const titel = t.art === 'probe' ? `${t.name} (${erfolg ? 'Erfolg' : 'Misserfolg'})` : t.name;
    const textHtml = ergebnisse.map(e => {
        const buffs = e.buffs.length ? ` <span style="opacity:0.7">[${e.buffs.map(b => escapeHtml(b.name)).join(', ')}]</span>` : '';
        return `<b>${e.wurf}</b>: ${escapeHtml(e.text)}${buffs}`;
    }).join('<br>');
    // addToLog schickt den Eintrag selbst an Discord und ins SL-Dashboard.
    if (typeof addToLog === 'function') {
        if (typeof lastRollTimestamp !== 'undefined') lastRollTimestamp = Date.now();
        addToLog(`<i class="fa-solid fa-table-list"></i> ${escapeHtml(titel)} (${escapeHtml(t.wuerfel)})`, textHtml, Date.now());
    }
    return ergebnisse;
}

// --- Einstellungen (Modal) --------------------------------------------------

function openHausregeln() {
    hausregelnLaden();
    renderHausregeln();
    const overlay = document.getElementById('hausregeln-modal-overlay');
    if (overlay) overlay.classList.add('active');
}

function closeHausregeln() {
    const overlay = document.getElementById('hausregeln-modal-overlay');
    if (overlay) overlay.classList.remove('active');
}

function renderHausregeln() {
    const body = document.getElementById('hausregeln-body');
    if (!body) return;
    const h = hausregeln;
    const p = aktivesPaket();
    const gm = typeof isGmMode !== 'undefined' && isGmMode;

    const paketOptionen = [`<option value="">Regelwerk pur (keine Hausregeln)</option>`]
        .concat(HAUSREGEL_PAKETE_EINGEBAUT.map(i => `<option value="${escapeHtml(i.id)}" ${h.paketId === i.id ? 'selected' : ''}>${escapeHtml(i.name)}</option>`));
    if (h.paketId && !hausregelPaketInfo(h.paketId)) {
        paketOptionen.push(`<option value="${escapeHtml(h.paketId)}" selected>${escapeHtml(p ? p.name : h.paketId)} (aus Datei)</option>`);
    }

    let paketHtml = '';
    if (h.paketId && !p) {
        paketHtml = `<p class="hr-hint"><i class="fa-solid fa-spinner fa-spin"></i> Paket wird geladen …</p>`;
    } else if (p) {
        const zaehl = [];
        if (p.talente) zaehl.push(`${['handeln', 'wissen', 'soziales'].reduce((n, k) => n + (p.talente[k] || []).length, 0)} Talente`);
        if (p.talentbaum && p.talentbaum.skills) zaehl.push(`${p.talentbaum.skills.length} Baum-Skills in ${(p.talentbaum.hauptbaeume || []).length} Hauptbäumen / ${(p.talentbaum.wesen || []).length} Wesen`);
        if (p.wuerfelTabellen) zaehl.push(`${Object.keys(p.wuerfelTabellen).length} Würfeltabellen`);
        const staffel = p.punkte && p.punkte.kostenStaffel
            ? p.punkte.kostenStaffel.map(s => `bis ${s.bis}: ×${s.kosten}`).join(' · ')
            : '';
        paketHtml = `
            <div class="hr-paket-info card-layout">
                <div><strong>${escapeHtml(p.name)}</strong> <span class="hr-dim">Stand ${escapeHtml(p.version || '?')}</span></div>
                <div class="hr-dim">${escapeHtml(p.beschreibung || '')}</div>
                <div class="hr-dim" style="margin-top:0.3rem">${zaehl.map(escapeHtml).join(' · ')}</div>
            </div>
            <h4>Was soll greifen?</h4>
            ${p.punkte && p.punkte.kostenStaffel ? `
            <label class="hr-check"><input type="checkbox" data-hropt="kostenStaffel" ${h.optionen.kostenStaffel ? 'checked' : ''}>
                <span><strong>Kostenstaffel</strong> – Punkte werden progressiv teurer (${escapeHtml(staffel)}), Budget ${escapeHtml(p.punkte.maxTalentpunkte || '?')}</span></label>` : ''}
            ${p.talentbaum ? `
            <label class="hr-check"><input type="checkbox" data-hropt="talentbaum" ${h.optionen.talentbaum ? 'checked' : ''}>
                <span><strong>Talentbaum</strong> – Rang- und Skillpunkte, Hauptbäume und Wesen auf dem Bogen</span></label>` : ''}
            ${p.wuerfelTabellen ? `
            <label class="hr-check"><input type="checkbox" data-hropt="wuerfelTabellen" ${h.optionen.wuerfelTabellen ? 'checked' : ''}>
                <span><strong>Würfeltabellen</strong> – ${escapeHtml(Object.values(p.wuerfelTabellen).map(t => t.name).join(', '))}</span></label>` : ''}
            ${p.talente ? `
            <h4>Talentliste</h4>
            <button class="tool-btn" onclick="hausregelnTalenteUebernehmen()" title="Schreibt die feste Talentliste des Pakets auf den Bogen - bestehende Punkte bleiben erhalten, nichts wird automatisch überschrieben"><i class="fa-solid fa-list-check"></i> Talentliste auf diesen Bogen übernehmen</button>` : ''}`;
    } else {
        paketHtml = `<p class="hr-hint">Ohne Paket rechnet der Bogen exakt nach dem offiziellen Regelwerk.</p>`;
    }

    body.innerHTML = `
        <p class="hr-hint" style="margin-top:0">
            ${gm ? 'Gilt für diesen Browser - "An Spieler senden" verteilt es an die ganze Runde.' : 'Gilt für diesen Browser - dein Spielleiter überträgt es automatisch.'}
        </p>
        <h4>Regelpaket</h4>
        <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
            <select id="hr-paket-select" class="x-select hr-select">${paketOptionen.join('')}</select>
            <label class="tool-btn" title="Regelpaket aus JSON-Datei laden" style="margin:0">
                <i class="fa-solid fa-file-import"></i> Aus Datei
                <input type="file" id="hr-paket-datei" accept=".json" style="display:none" onchange="hausregelPaketImportieren(event)">
            </label>
        </div>
        <div id="hr-paket-details" style="margin-top:0.8rem">${paketHtml}</div>

        <div class="hr-footer">
            <button class="tool-btn hr-primary" onclick="hausregelnUebernehmen()"><i class="fa-solid fa-check"></i> Übernehmen</button>
            ${gm ? `<button class="tool-btn" onclick="hausregelnVerteilen()"><i class="fa-solid fa-satellite-dish"></i> An Spieler senden</button>` : ''}
            <button class="tool-btn" onclick="hausregelnExportieren()" title="Aktuelle Einstellung als Datei"><i class="fa-solid fa-download"></i></button>
            <label class="tool-btn" title="Einstellung aus Datei laden" style="margin:0">
                <i class="fa-solid fa-upload"></i>
                <input type="file" id="hr-datei" accept=".json" style="display:none" onchange="hausregelnImportieren(event)">
            </label>
            <button class="tool-btn" style="margin-left:auto" onclick="hausregelnZuruecksetzen()"><i class="fa-solid fa-rotate-left"></i> Regelwerk pur</button>
        </div>
        <div id="hr-status" class="hr-hint" style="min-height:1.2rem; margin-top:0.5rem"></div>`;

    const sel = document.getElementById('hr-paket-select');
    if (sel) sel.addEventListener('change', () => {
        hausregeln.paketId = sel.value || null;
        if (hausregeln.paketId && hausregelPaketInfo(hausregeln.paketId)) hausregeln.paketDaten = null;
        renderHausregeln();
        if (hausregeln.paketId) hausregelPaketLaden(hausregeln.paketId, () => renderHausregeln());
    });
    body.querySelectorAll('[data-hropt]').forEach(el => el.addEventListener('change', () => {
        hausregeln.optionen[el.dataset.hropt] = el.checked;
    }));
}

function hausregelnStatus(text, farbe) {
    const el = document.getElementById('hr-status');
    if (!el) return;
    el.innerHTML = text;
    el.style.color = farbe || 'var(--text-secondary)';
}

// --- Übernehmen, teilen, sichern -------------------------------------------

// Paket (falls nötig) laden, dann alles neu rechnen und zeichnen.
function hausregelnAnwenden(cb) {
    hausregelPaketLaden(hausregeln.paketId, (paket) => {
        if (hausregeln.paketId && !paket) {
            hausregelnStatus('Das Regelpaket konnte nicht geladen werden.', 'var(--color-dmg)');
        }
        if (typeof renderAll === 'function') renderAll();
        if (typeof calculatePoints === 'function') calculatePoints();
        if (typeof renderSchiffGm === 'function') renderSchiffGm();
        if (typeof renderSeekampfGm === 'function') renderSeekampfGm();
        if (typeof renderKarteGm === 'function') renderKarteGm();
        if (typeof renderKampfGm === 'function') renderKampfGm();
        if (cb) cb(paket);
    });
}

function hausregelnUebernehmen() {
    hausregelnSichern();
    hausregelnAnwenden(() => {
        hausregelnStatus('✓ Übernommen.' + (hausregelnAktiv() ? ' Der Bogen rechnet jetzt nach euren Hausregeln.' : ''), 'var(--color-heal)');
        if (typeof addActivityLog === 'function' && !(typeof isGmMode !== 'undefined' && isGmMode)) {
            const p = aktivesPaket();
            addActivityLog(p ? `Hausregeln "${p.name}" aktiv.` : 'Hausregeln aus – Regelwerk pur.', 'activity-neutral', '<i class="fa-solid fa-scroll"></i>');
        }
    });
}

// Was an die Spieler geht: die Einstellung, plus die Paketdaten nur dann, wenn
// das Paket nicht eingebaut ist (die eingebauten laden Spieler selbst nach).
function hausregelnZumSenden() {
    const p = aktivesPaket();
    return {
        paketId: hausregeln.paketId,
        paketDaten: (hausregeln.paketId && !hausregelPaketInfo(hausregeln.paketId)) ? p : null,
        optionen: Object.assign({}, hausregeln.optionen)
    };
}

function hausregelnVerteilen() {
    hausregelnSichern();
    if (typeof clientConnections === 'undefined') return;
    const nachricht = { type: 'hausregeln', regeln: hausregelnZumSenden() };
    let anzahl = 0;
    Object.values(clientConnections).forEach(conn => {
        if (conn && conn.open) { conn.send(nachricht); anzahl++; }
    });
    hausregelnStatus(anzahl
        ? `✓ An ${anzahl} Spieler geschickt.`
        : 'Noch kein Spieler verbunden – sie bekommen die Regeln automatisch beim Beitreten.', anzahl ? 'var(--color-heal)' : undefined);
    if (typeof addGmLogSystemMessage === 'function') addGmLogSystemMessage('Hausregeln an die Runde verteilt.');
}

// Beim Verbinden eines Spielers (multiplayer.js): aktuelle Regeln mitgeben.
function hausregelnAnVerbindung(conn) {
    if (!conn || !conn.open || !hausregelnAktiv()) return;
    try { conn.send({ type: 'hausregeln', regeln: hausregelnZumSenden() }); } catch (e) { /* Verbindung evtl. schon weg */ }
}

// Beim Spieler eintreffende Hausregeln
function hausregelnEmpfangen(regeln) {
    hausregelnSetzen(regeln);
    hausregelnSichern();
    hausregelnAnwenden((p) => {
        if (typeof addActivityLog === 'function') {
            addActivityLog(p ? `Spielleiter hat die Hausregeln "${p.name}" übertragen.` : 'Spielleiter hat die Hausregeln zurückgesetzt (Regelwerk pur).', 'activity-neutral', '<i class="fa-solid fa-scroll"></i>');
        }
        const overlay = document.getElementById('hausregeln-modal-overlay');
        if (overlay && overlay.classList.contains('active')) renderHausregeln();
    });
}

function hausregelnExportieren() {
    const text = JSON.stringify(Object.assign({ art: 'htbah-hausregeln' }, hausregelnZumSenden()), null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'htbah-hausregeln.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
}

function hausregelnImportieren(ereignis) {
    const datei = ereignis.target.files[0];
    ereignis.target.value = '';
    if (!datei) return;
    const leser = new FileReader();
    leser.onload = e => {
        try {
            const daten = JSON.parse(e.target.result);
            if (daten.art !== 'htbah-hausregeln') { alert('Das ist keine Hausregel-Datei.'); return; }
            hausregelnSetzen(daten);
            hausregelnSichern();
            renderHausregeln();
            hausregelnAnwenden(() => renderHausregeln());
        } catch (fehler) {
            alert('Die Datei konnte nicht gelesen werden.');
        }
    };
    leser.readAsText(datei);
}

// Ein komplettes Regelpaket (Format wie hausregeln/eldora-arrrrr.js, nur als
// reines JSON) aus einer Datei laden - für Runden mit eigenem Paket.
function hausregelPaketImportieren(ereignis) {
    const datei = ereignis.target.files[0];
    ereignis.target.value = '';
    if (!datei) return;
    const leser = new FileReader();
    leser.onload = e => {
        try {
            const paket = JSON.parse(e.target.result);
            if (!paket || typeof paket !== 'object' || !paket.id || !paket.name) {
                alert('Das ist kein Regelpaket (id und name fehlen).');
                return;
            }
            hausregelPaketRegistrieren(paket);
            hausregeln.paketId = paket.id;
            hausregeln.paketDaten = hausregelPaketInfo(paket.id) ? null : paket;
            renderHausregeln();
            hausregelnStatus(`Paket "${escapeHtml(paket.name)}" geladen – mit „Übernehmen" aktivieren.`);
        } catch (fehler) {
            alert('Die Datei konnte nicht gelesen werden.');
        }
    };
    leser.readAsText(datei);
}

function hausregelnZuruecksetzen() {
    if (!confirm('Alle Hausregeln verwerfen und wieder nach Regelwerk spielen?')) return;
    hausregeln = hausregelnStandardKopie();
    hausregelnSichern();
    renderHausregeln();
    hausregelnAnwenden();
}

// Beim Start: gespeicherte Einstellung laden und ggf. das Paket nachziehen.
// app.js hat seinen init() schon registriert (Skript-Reihenfolge), dieser
// Listener läuft danach.
document.addEventListener('DOMContentLoaded', () => {
    hausregelnLaden();
    if (hausregelnAktiv()) hausregelnAnwenden();
});
