// How to be a Hero - Tischmitte (geteilte Loot-Ablage)
//
// Der Spielleiter legt Beute in die Mitte des Tisches - Gegenstände, Waffen oder
// Geld. Solange etwas "versteckt" ist, kennt es nur sein Rechner: so lässt sich
// der Loot eines Dungeons vor der Session vorbereiten und erst aufdecken, wenn
// die Gruppe ihn findet. Spieler sehen nur aufgedeckte Dinge und können sie
// nehmen; auch umgekehrt können sie eigene Sachen in die Mitte legen.
//
// Der SL-Client ist die Autorität (wie beim Kampf, Karte usw. in unseren anderen
// Tools): Nach jeder Änderung schickt er den kompletten sichtbaren Stand an alle.
// "Nehmen" ist nur eine Anfrage - der SL entscheidet, ob der Gegenstand noch da
// ist, und schickt ihn genau einem Spieler. Greifen zwei gleichzeitig zu,
// bekommt einer eine Absage statt dass der Loot sich verdoppelt.
//
// Nachrichten (multiplayer.js):
//   SL -> Spieler   { type: 'tischmitte', items: [...] }       sichtbarer Stand
//                   { type: 'tischmitteGeben', item }           du hast ihn
//                   { type: 'tischmitteAbgelehnt', itemId }     war schon weg
//   Spieler -> SL   { type: 'tischmitteNehmen', itemId }
//                   { type: 'tischmitteAblegen', item }
//
// Eintrag: { id, art: 'gegenstand'|'waffe'|'waehrung', name, amount, damage,
//            description, hidden, von }  (von = Spielername, wenn abgelegt)

const TISCHMITTE_GM_KEY = 'htbah_gm_tischmitte';
const TISCHMITTE_ARTEN = {
    gegenstand: { label: 'Gegenstand', icon: 'fa-box' },
    waffe: { label: 'Waffe', icon: 'fa-khanda' },
    waehrung: { label: 'Geld', icon: 'fa-coins' }
};

// Beim SL kanonisch (inkl. versteckt), beim Spieler die sichtbare Kopie
let tischmitte = [];
// Spieler: itemId -> true, solange eine "Nehmen"-Anfrage unterwegs ist
const tischmitteAnfragen = {};
// Auf-/zugeklappt. Spieler: zu, bis der SL etwas Neues aufdeckt - dann springt
// der Tisch auf. SL: merkt sich seine Wahl im Browser.
const TISCHMITTE_GM_OFFEN_KEY = 'htbah_gm_tischmitte_offen';
let tischmitteOffenSpieler = false;
let tischmitteOffenGm = true;
// Spieler: welche Eintraege wir schon gesehen haben, um "neu aufgedeckt" zu erkennen
let tischmitteBekannt = new Set();

function tischmitteNeueId() {
    return 'tm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function tischmitteLabel(item) {
    if (!item) return '?';
    if (item.art === 'waehrung') return `${item.amount || 0} ${item.name || 'Geld'}`;
    if (item.art === 'waffe') return `${item.name || 'Waffe'}${item.damage ? ' (' + item.damage + ')' : ''}`;
    return `${(item.amount || 1) > 1 ? (item.amount + 'x ') : ''}${item.name || 'Gegenstand'}`;
}

function tischmitteSichtbar() {
    return tischmitte.filter(i => !i.hidden);
}

// --- Spielleiter ------------------------------------------------------------

function tischmitteLaden() {
    try {
        const roh = localStorage.getItem(TISCHMITTE_GM_KEY);
        tischmitte = roh ? JSON.parse(roh) : [];
        if (!Array.isArray(tischmitte)) tischmitte = [];
        tischmitteOffenGm = localStorage.getItem(TISCHMITTE_GM_OFFEN_KEY) !== '0';
    } catch (e) { tischmitte = []; }
}

function tischmitteSichern() {
    sicherSpeichern(TISCHMITTE_GM_KEY, JSON.stringify(tischmitte));
}

// Jede Änderung beim SL läuft hier durch: sichern, an alle verteilen, zeichnen.
// Versteckte Einträge werden vor dem Senden herausgefiltert - sie verlassen den
// SL-Rechner nicht.
function tischmitteCommit(next) {
    tischmitte = next;
    tischmitteSichern();
    if (typeof clientConnections !== 'undefined') {
        const nachricht = { type: 'tischmitte', items: tischmitteSichtbar() };
        Object.values(clientConnections).forEach(conn => {
            if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
        });
    }
    renderTischmitteGm();
}

// Beim Verbinden eines Spielers (multiplayer.js) den aktuellen Stand mitgeben
function tischmitteAnVerbindung(conn) {
    // Auch eine leere Liste schicken: der Spieler könnte selbst mal SL gewesen
    // sein und noch eine alte Tischmitte im Browser haben.
    if (!conn || !conn.open) return;
    try { conn.send({ type: 'tischmitte', items: tischmitteSichtbar() }); } catch (e) { /* weg */ }
}

function tischmitteHinzufuegen() {
    const art = (document.getElementById('tm-neu-art') || {}).value || 'gegenstand';
    const nameEl = document.getElementById('tm-neu-name');
    const mengeEl = document.getElementById('tm-neu-menge');
    const schadenEl = document.getElementById('tm-neu-schaden');
    const descEl = document.getElementById('tm-neu-desc');
    const hiddenEl = document.getElementById('tm-neu-hidden');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }

    const item = {
        id: tischmitteNeueId(),
        art: TISCHMITTE_ARTEN[art] ? art : 'gegenstand',
        name,
        description: (descEl ? descEl.value : '').trim(),
        hidden: hiddenEl ? hiddenEl.checked : true
    };
    if (item.art === 'waffe') item.damage = (schadenEl ? schadenEl.value : '').trim();
    else item.amount = Math.max(1, parseInt(mengeEl ? mengeEl.value : 1) || 1);

    tischmitteCommit([item].concat(tischmitte));
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    if (descEl) descEl.value = '';
    if (schadenEl) schadenEl.value = '';
    if (mengeEl) mengeEl.value = '1';
}

function tischmitteEntfernen(id) {
    tischmitteCommit(tischmitte.filter(i => i.id !== id));
}

function tischmitteVerstecktToggle(id) {
    tischmitteCommit(tischmitte.map(i => i.id === id ? Object.assign({}, i, { hidden: !i.hidden }) : i));
}

function tischmitteAlleAufdecken() {
    tischmitteCommit(tischmitte.map(i => Object.assign({}, i, { hidden: false })));
}

function tischmitteLeeren() {
    if (!tischmitte.length || !confirm('Die ganze Tischmitte leeren?')) return;
    tischmitteCommit([]);
}

// SL gibt einen Eintrag direkt einem bestimmten Spieler (auch versteckte)
function tischmitteGebenAn(id, peerId) {
    const item = tischmitte.find(i => i.id === id);
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;
    if (!item || !conn || !conn.open) return;
    tischmitteCommit(tischmitte.filter(i => i.id !== id));
    try { conn.send({ type: 'tischmitteGeben', item }); } catch (e) { return; }
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `gibt ${tischmitteLabel(item)} an ${tischmitteSpielerName(peerId)}.`, '🎁');
}

function tischmitteSpielerName(peerId) {
    const d = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null;
    return d ? ([d.vorname, d.name].filter(Boolean).join(' ') || 'Unbekannt') : 'Unbekannt';
}

// Anfragen der Spieler (aus handleIncomingData in multiplayer.js)
function tischmitteAnfrageVerarbeiten(peerId, payload) {
    if (!payload || typeof payload !== 'object') return false;
    const name = tischmitteSpielerName(peerId);
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;

    if (payload.type === 'tischmitteNehmen') {
        // Versteckte gelten als nicht vorhanden - der Spieler hat sie nie gesehen
        const item = tischmitte.find(i => i.id === payload.itemId && !i.hidden);
        if (item && conn && conn.open) {
            tischmitteCommit(tischmitte.filter(i => i.id !== item.id));
            try { conn.send({ type: 'tischmitteGeben', item }); } catch (e) { /* weg */ }
            if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `nimmt ${tischmitteLabel(item)} aus der Tischmitte.`, '🫳');
        } else if (conn && conn.open) {
            try { conn.send({ type: 'tischmitteAbgelehnt', itemId: payload.itemId }); } catch (e) { /* weg */ }
        }
        return true;
    }
    if (payload.type === 'tischmitteAblegen' && payload.item && typeof payload.item === 'object') {
        const roh = payload.item;
        const item = {
            id: tischmitteNeueId(),
            art: TISCHMITTE_ARTEN[roh.art] ? roh.art : 'gegenstand',
            name: String(roh.name || '').slice(0, 120),
            description: String(roh.description || '').slice(0, 1000),
            hidden: false,
            von: name
        };
        if (item.art === 'waffe') item.damage = String(roh.damage || '').slice(0, 40);
        else item.amount = Math.max(1, parseInt(roh.amount) || 1);
        tischmitteCommit([item].concat(tischmitte));
        if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `legt ${tischmitteLabel(item)} in die Tischmitte.`, '📥');
        return true;
    }
    return false;
}

function renderTischmitteGm() {
    const box = document.getElementById('gm-tischmitte');
    if (!box) return;
    const sichtbar = tischmitteSichtbar().length;
    const versteckt = tischmitte.length - sichtbar;
    const spieler = typeof connectedPlayersData !== 'undefined' ? Object.keys(connectedPlayersData) : [];
    const art = (document.getElementById('tm-neu-art') || {}).value || 'gegenstand';

    const zeilen = tischmitte.map(i => {
        const a = TISCHMITTE_ARTEN[i.art] || TISCHMITTE_ARTEN.gegenstand;
        const gebenSelect = spieler.length ? `
            <select class="gm-select tm-geben" data-tmgeben="${escapeHtml(i.id)}" title="Direkt einem Spieler geben">
                <option value="">Geben an …</option>
                ${spieler.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(tischmitteSpielerName(p))}</option>`).join('')}
            </select>` : '';
        return `
        <div class="tm-item ${i.hidden ? 'tm-item-hidden' : ''}">
            <div class="tm-item-kopf">
                <i class="fa-solid ${a.icon} tm-art-icon" title="${a.label}"></i>
                <span class="tm-item-name">${escapeHtml(tischmitteLabel(i))}</span>
                ${i.von ? `<span class="tm-von" title="Von einem Spieler abgelegt"><i class="fa-solid fa-user"></i> ${escapeHtml(i.von)}</span>` : ''}
                <span class="tm-badge ${i.hidden ? 'tm-badge-hidden' : 'tm-badge-visible'}">${i.hidden ? '<i class="fa-solid fa-eye-slash"></i> versteckt' : '<i class="fa-solid fa-eye"></i> sichtbar'}</span>
            </div>
            ${i.description ? `<div class="tm-item-desc">${escapeHtml(i.description)}</div>` : ''}
            <div class="tm-item-actions">
                <button class="gm-btn" data-tmtoggle="${escapeHtml(i.id)}" title="${i.hidden ? 'Für alle Spieler aufdecken' : 'Vor den Spielern verstecken'}">
                    <i class="fa-solid ${i.hidden ? 'fa-eye' : 'fa-eye-slash'}"></i> ${i.hidden ? 'Aufdecken' : 'Verstecken'}
                </button>
                ${gebenSelect}
                <button class="gm-btn gm-btn-ghost tm-del" data-tmdel="${escapeHtml(i.id)}" title="Entfernen"><i class="fa-solid fa-trash" style="color:var(--color-dmg)"></i></button>
            </div>
        </div>`;
    }).join('');

    box.innerHTML = `
        <details class="x-details tm-details" ${tischmitteOffenGm ? 'open' : ''}>
        <summary class="tm-head">
            <div class="tm-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-hand-holding"></i> Tischmitte
                <span class="x-count" title="Für Spieler sichtbar"><i class="fa-solid fa-eye"></i> ${sichtbar}</span>
                ${versteckt ? `<span class="x-count" title="Nur du siehst diese"><i class="fa-solid fa-eye-slash"></i> ${versteckt}</span>` : ''}
                <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('tischmitte')" title="Hilfe zur Tischmitte"></i>
            </div>
            <div class="tm-head-actions" onclick="event.preventDefault(); event.stopPropagation()">
                ${versteckt ? `<button class="gm-btn" onclick="tischmitteAlleAufdecken()" title="Alle versteckten Einträge auf einmal aufdecken"><i class="fa-solid fa-eye"></i> Alle aufdecken</button>` : ''}
                ${tischmitte.length ? `<button class="gm-btn gm-btn-ghost" onclick="tischmitteLeeren()"><i class="fa-solid fa-broom"></i> Leeren</button>` : ''}
            </div>
        </summary>
        <div class="tm-form">
            <select id="tm-neu-art" class="gm-select" onchange="renderTischmitteGm()">
                ${Object.entries(TISCHMITTE_ARTEN).map(([k, v]) => `<option value="${k}" ${k === art ? 'selected' : ''}>${v.label}</option>`).join('')}
            </select>
            <input type="text" id="tm-neu-name" class="x-input tm-input" placeholder="${art === 'waehrung' ? 'Währung (z.B. Credits)' : (art === 'waffe' ? 'Waffe …' : 'Gegenstand …')}" onkeydown="if(event.key==='Enter') tischmitteHinzufuegen()">
            ${art === 'waffe'
                ? `<input type="text" id="tm-neu-schaden" class="x-input tm-input tm-input-klein" placeholder="Schaden (1w10)" onkeydown="if(event.key==='Enter') tischmitteHinzufuegen()">`
                : `<input type="number" id="tm-neu-menge" class="x-input tm-input tm-input-klein" value="1" min="1" title="${art === 'waehrung' ? 'Betrag' : 'Menge'}" onkeydown="if(event.key==='Enter') tischmitteHinzufuegen()">`}
            <input type="text" id="tm-neu-desc" class="x-input tm-input tm-input-desc" placeholder="Beschreibung / Effekt (optional)" onkeydown="if(event.key==='Enter') tischmitteHinzufuegen()">
            <label class="gm-toggle" title="Versteckt anlegen: nur du siehst den Eintrag, bis du ihn aufdeckst">
                <input type="checkbox" id="tm-neu-hidden" checked> <span><i class="fa-solid fa-eye-slash"></i> versteckt</span>
            </label>
            <button class="gm-btn tm-add" onclick="tischmitteHinzufuegen()"><i class="fa-solid fa-plus"></i> Ablegen</button>
        </div>
        <div class="tm-list">${zeilen || '<div class="x-leer">Noch leer. Lege Beute ab und decke sie auf, wenn die Gruppe sie findet - oder lass Spieler Dinge hierher legen.</div>'}</div>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => {
        tischmitteOffenGm = details.open;
        sicherSpeichern(TISCHMITTE_GM_OFFEN_KEY, details.open ? '1' : '0');
    });
    box.querySelectorAll('[data-tmtoggle]').forEach(b => b.addEventListener('click', () => tischmitteVerstecktToggle(b.dataset.tmtoggle)));
    box.querySelectorAll('[data-tmdel]').forEach(b => b.addEventListener('click', () => tischmitteEntfernen(b.dataset.tmdel)));
    box.querySelectorAll('[data-tmgeben]').forEach(s => s.addEventListener('change', () => { if (s.value) tischmitteGebenAn(s.dataset.tmgeben, s.value); }));
}

// --- Spieler ----------------------------------------------------------------

function tischmitteVerbunden() {
    return typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
}

// Neuer Stand vom SL
function tischmitteEmpfangen(items) {
    tischmitte = Array.isArray(items) ? items : [];
    // Anfragen zu Dingen, die nicht mehr da sind, sind erledigt
    Object.keys(tischmitteAnfragen).forEach(id => { if (!tischmitte.some(i => i.id === id)) delete tischmitteAnfragen[id]; });
    // Der SL hat etwas aufgedeckt, das wir noch nicht kannten -> Tisch aufklappen,
    // damit niemand die Beute übersieht. Eigene Ablagen zählen nicht als neu.
    const ich = typeof appData !== 'undefined' ? [appData.vorname, appData.name].filter(Boolean).join(' ') : '';
    const neu = tischmitte.filter(i => !tischmitteBekannt.has(i.id) && !(i.von && i.von === ich));
    if (neu.length) tischmitteOffenSpieler = true;
    tischmitteBekannt = new Set(tischmitte.map(i => i.id));
    renderTischmitteSpieler();
}

function tischmitteNehmen(id) {
    if (!tischmitteVerbunden() || tischmitteAnfragen[id]) return;
    tischmitteAnfragen[id] = true;
    try { hostConnection.send({ type: 'tischmitteNehmen', itemId: id }); } catch (e) { delete tischmitteAnfragen[id]; }
    renderTischmitteSpieler();
}

// Der SL hat uns etwas gegeben - ins Inventar, zu den Waffen oder in die Kasse
function tischmitteGeschenkEmpfangen(item) {
    if (!item || typeof appData === 'undefined') return;
    delete tischmitteAnfragen[item.id];
    const name = String(item.name || '').slice(0, 120);
    const description = String(item.description || '').slice(0, 1000);
    if (item.art === 'waehrung') {
        if (!appData.currency) appData.currency = { name: name || 'Credits', amount: 0 };
        appData.currency.amount = (parseInt(appData.currency.amount) || 0) + (parseInt(item.amount) || 0);
        if (typeof addActivityLog === 'function') addActivityLog(`Erhalten: ${tischmitteLabel(item)} (Tischmitte)`, 'activity-good', '<i class="fa-solid fa-coins"></i>');
    } else if (item.art === 'waffe') {
        if (!appData.weapons) appData.weapons = [];
        appData.weapons.push({ id: 'w_' + Date.now(), name, damage: String(item.damage || ''), description, showDesc: !!description });
        if (typeof addActivityLog === 'function') addActivityLog(`Erhalten: ${tischmitteLabel(item)} (Tischmitte)`, 'activity-good', '<i class="fa-solid fa-khanda"></i>');
    } else {
        if (!appData.inventory) appData.inventory = [];
        appData.inventory.push({ id: 'inv_' + Date.now(), name, amount: Math.max(1, parseInt(item.amount) || 1), description, showDesc: !!description });
        if (typeof addActivityLog === 'function') addActivityLog(`Erhalten: ${tischmitteLabel(item)} (Tischmitte)`, 'activity-good', '<i class="fa-solid fa-box"></i>');
    }
    if (typeof saveData === 'function') saveData();
    if (typeof renderAll === 'function') renderAll();
    tischmitteHinweis(`${tischmitteLabel(item)} genommen.`);
}

function tischmitteAbgelehnt(itemId) {
    delete tischmitteAnfragen[itemId];
    tischmitte = tischmitte.filter(i => i.id !== itemId);
    renderTischmitteSpieler();
    tischmitteHinweis('Zu spät - das hat sich schon jemand geschnappt.', true);
}

// Eigenen Gegenstand / eigene Waffe in die Mitte legen. Bei Stapeln (z.B. 3x
// Verbandskasten) wählt der Spieler, wie viele davon - der Rest bleibt bei ihm.
function tischmitteAblegen() {
    const sel = document.getElementById('tm-ablegen-select');
    if (!sel || !sel.value || !tischmitteVerbunden()) return;
    const [art, id] = sel.value.split(':');
    let item = null;
    if (art === 'gegenstand') {
        const idx = (appData.inventory || []).findIndex(i => i.id === id);
        if (idx < 0) return;
        const q = appData.inventory[idx];
        const stapel = Math.max(1, parseInt(q.amount) || 1);
        const mengeEl = document.getElementById('tm-ablegen-menge');
        const menge = Math.min(stapel, Math.max(1, parseInt(mengeEl ? mengeEl.value : stapel) || stapel));
        item = { art, name: q.name, amount: menge, description: q.description || '' };
        if (menge >= stapel) appData.inventory.splice(idx, 1);
        else q.amount = stapel - menge;
    } else if (art === 'waffe') {
        const idx = (appData.weapons || []).findIndex(w => w.id === id);
        if (idx < 0) return;
        const q = appData.weapons[idx];
        item = { art, name: q.name, damage: q.damage || '', description: q.description || '' };
        appData.weapons.splice(idx, 1);
    }
    if (!item) return;
    try { hostConnection.send({ type: 'tischmitteAblegen', item }); } catch (e) { return; }
    if (typeof addActivityLog === 'function') addActivityLog(`In die Tischmitte gelegt: ${tischmitteLabel(item)}`, 'activity-neutral', '<i class="fa-solid fa-hand-holding"></i>');
    if (typeof saveData === 'function') saveData();
    if (typeof renderAll === 'function') renderAll();
}

// Mengenfeld nur zeigen, wenn ein Stapel (> 1) gewählt ist
function tischmitteAblegenAuswahl() {
    const sel = document.getElementById('tm-ablegen-select');
    const mengeEl = document.getElementById('tm-ablegen-menge');
    if (!sel || !mengeEl) return;
    const [art, id] = (sel.value || '').split(':');
    const q = art === 'gegenstand' ? (appData.inventory || []).find(i => i.id === id) : null;
    const stapel = q ? Math.max(1, parseInt(q.amount) || 1) : 1;
    mengeEl.style.display = stapel > 1 ? '' : 'none';
    mengeEl.max = stapel;
    mengeEl.value = stapel;
    mengeEl.title = `Wie viele von ${stapel} ablegen?`;
}

function tischmitteHinweis(text, warnung) {
    const el = document.getElementById('tm-hinweis');
    if (!el) return;
    el.textContent = text;
    el.style.color = warnung ? 'var(--color-dmg)' : 'var(--color-heal)';
    el.style.opacity = '1';
    clearTimeout(tischmitteHinweis._t);
    tischmitteHinweis._t = setTimeout(() => { el.style.opacity = '0'; }, 4000);
}

function renderTischmitteSpieler() {
    const section = document.getElementById('tischmitte-section');
    if (!section) return;
    // Nur als verbundener Spieler sinnvoll; der SL hat sein eigenes Panel
    if (!tischmitteVerbunden() || (typeof isGmMode !== 'undefined' && isGmMode)) {
        section.style.display = 'none';
        section.innerHTML = '';
        return;
    }
    section.style.display = '';
    const eigene = []
        .concat((appData.inventory || []).map(i => `<option value="gegenstand:${escapeHtml(i.id)}">${escapeHtml((i.amount > 1 ? i.amount + 'x ' : '') + (i.name || 'Unbenannt'))}</option>`))
        .concat((appData.weapons || []).map(w => `<option value="waffe:${escapeHtml(w.id)}">${escapeHtml(w.name || 'Waffe')}${w.damage ? ' (' + escapeHtml(w.damage) + ')' : ''}</option>`));

    const karten = tischmitte.map(i => {
        const a = TISCHMITTE_ARTEN[i.art] || TISCHMITTE_ARTEN.gegenstand;
        const wartet = !!tischmitteAnfragen[i.id];
        return `
        <div class="tm-item card-layout">
            <div class="tm-item-kopf">
                <i class="fa-solid ${a.icon} tm-art-icon" title="${a.label}"></i>
                <span class="tm-item-name">${escapeHtml(tischmitteLabel(i))}</span>
                ${i.von ? `<span class="tm-von"><i class="fa-solid fa-user"></i> ${escapeHtml(i.von)}</span>` : ''}
            </div>
            ${i.description ? `<div class="tm-item-desc">${escapeHtml(i.description)}</div>` : ''}
            <div class="tm-item-actions">
                <button class="tool-btn tm-take" data-tmnehmen="${escapeHtml(i.id)}" ${wartet ? 'disabled' : ''}>
                    <i class="fa-solid ${wartet ? 'fa-spinner fa-spin' : 'fa-hand-back-fist'}"></i> ${wartet ? 'Wird geholt …' : 'Nehmen'}
                </button>
            </div>
        </div>`;
    }).join('');

    section.innerHTML = `
        <details class="x-details tm-details" ${tischmitteOffenSpieler ? 'open' : ''}>
        <summary class="tm-head">
            <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-hand-holding category-icon-fa"></i> Tischmitte
                ${tischmitte.length ? `<span class="x-count">${tischmitte.length}</span>` : ''}
                <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('tischmitte')" title="Hilfe zur Tischmitte"></i></h2>
        </summary>
        <div id="tm-hinweis" class="x-hint"></div>
        <div class="tm-list">${karten || '<div class="x-leer">Nichts auf dem Tisch. Wenn der Spielleiter Beute aufdeckt, erscheint sie hier.</div>'}</div>
        ${eigene.length ? `
        <div class="tm-ablegen">
            <select id="tm-ablegen-select" class="x-select tm-select" onchange="tischmitteAblegenAuswahl()"><option value="">Eigenes ablegen …</option>${eigene.join('')}</select>
            <input type="number" id="tm-ablegen-menge" class="x-input tm-input-menge" min="1" value="1" title="Wie viele davon?" style="display:none" onkeydown="if(event.key==='Enter') tischmitteAblegen()">
            <button class="tool-btn" onclick="tischmitteAblegen()" title="Aus deinem Inventar in die Tischmitte legen (z.B. zum Weitergeben)"><i class="fa-solid fa-arrow-up-from-bracket"></i> Ablegen</button>
        </div>` : ''}
        </details>`;

    const details = section.querySelector('details');
    if (details) details.addEventListener('toggle', () => { tischmitteOffenSpieler = details.open; });
    section.querySelectorAll('[data-tmnehmen]').forEach(b => b.addEventListener('click', () => tischmitteNehmen(b.dataset.tmnehmen)));
}

// Beim Spieler eintreffende Nachrichten (aus multiplayer.js). true = verarbeitet.
function tischmitteNachrichtVerarbeiten(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type === 'tischmitte') { tischmitteEmpfangen(payload.items); return true; }
    if (payload.type === 'tischmitteGeben') { tischmitteGeschenkEmpfangen(payload.item); return true; }
    if (payload.type === 'tischmitteAbgelehnt') { tischmitteAbgelehnt(payload.itemId); return true; }
    return false;
}

// Beitritt als Spieler: was hier evtl. aus einer eigenen SL-Sitzung liegt,
// gehört nicht zu dieser Runde - leer starten, der SL schickt seinen Stand.
function tischmitteBeitritt() {
    tischmitte = [];
    tischmitteBekannt = new Set();
    tischmitteOffenSpieler = false;
    Object.keys(tischmitteAnfragen).forEach(k => delete tischmitteAnfragen[k]);
    renderTischmitteSpieler();
}

// Verbindung zum SL weg: Kopie verwerfen, Abschnitt ausblenden
function tischmitteGetrennt() {
    tischmitte = [];
    tischmitteBekannt = new Set();
    tischmitteOffenSpieler = false;
    Object.keys(tischmitteAnfragen).forEach(k => delete tischmitteAnfragen[k]);
    renderTischmitteSpieler();
}

document.addEventListener('DOMContentLoaded', () => {
    tischmitteLaden();
    renderTischmitteGm();
});
