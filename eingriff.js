// How to be a Hero - SL-Eingriff
//
// Der Spielleiter greift direkt in den Bogen eines Spielers ein: Gegenstand,
// Waffe oder Geld geben, Status-Effekt setzen oder entfernen. Wahlweise
// verdeckt - dann erscheint beim Spieler kein Logbuch-Eintrag und kein
// Hinweis, der Wert ist einfach da. Das ist Absicht: ein Fluch, ein
// unbemerkt zugestecktes Amulett, eine schleichende Vergiftung sollen nicht
// mit Fanfare ankommen. Offen (nicht verdeckt) landet der Eingriff wie jede
// andere Änderung im Aktions-Logbuch des Spielers.
//
// Im SL-Feed steht der Eingriff immer, inklusive "verdeckt" - der SL soll
// nachvollziehen können, was er wann getan hat.
//
// Nachrichten (multiplayer.js):
//   SL -> Spieler  { type: 'eingriff', aktion, still, ... }
//     aktion 'geben'          { item: { art, name, amount, damage, description } }
//     aktion 'status'         { status: { name, value, type } }
//     aktion 'statusWeg'      { statusId }
//
// Das Formular sitzt in einem Modal statt in der Spielerkarte: die Karten
// werden bei jedem Bogen-Update neu gebaut, Eingaben darin gingen verloren.

let eingriffPeerId = null;
// Zuletzt gewählte Verdeckt-Einstellung bleibt für die Sitzung
let eingriffStill = false;

// --- Spielleiter ------------------------------------------------------------

function openEingriff(peerId) {
    eingriffPeerId = peerId;
    renderEingriff();
    const overlay = document.getElementById('eingriff-modal-overlay');
    if (overlay) overlay.classList.add('active');
    setTimeout(() => { const el = document.getElementById('eg-name'); if (el) el.focus(); }, 50);
}

function closeEingriff() {
    const overlay = document.getElementById('eingriff-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    eingriffPeerId = null;
}

function eingriffSpielerDaten() {
    return (typeof connectedPlayersData !== 'undefined' && eingriffPeerId) ? connectedPlayersData[eingriffPeerId] : null;
}

function eingriffSpielerName() {
    const d = eingriffSpielerDaten();
    return d ? ([d.vorname, d.name].filter(Boolean).join(' ') || 'Unbekannt') : 'Unbekannt';
}

// Wird auch aufgerufen, wenn der Bogen des Spielers sich ändert (Status-Liste
// aktuell halten) - die Eingabefelder bleiben dabei stehen.
function renderEingriff() {
    const body = document.getElementById('eingriff-body');
    if (!body) return;
    const d = eingriffSpielerDaten();
    if (!d) {
        body.innerHTML = '<p class="hr-hint">Der Spieler ist nicht mehr verbunden.</p>';
        return;
    }
    const name = eingriffSpielerName();
    const farbe = typeof getColorForPlayer === 'function' ? getColorForPlayer(name) : 'var(--color-accent)';
    const statuses = (Array.isArray(d.statuses) ? d.statuses : []).filter(s => s && typeof s === 'object');

    // Beim Neuzeichnen die Eingaben behalten
    const merken = {};
    ['eg-art', 'eg-name', 'eg-menge', 'eg-schaden', 'eg-desc', 'eg-st-name', 'eg-st-wert', 'eg-st-typ'].forEach(id => {
        const el = document.getElementById(id);
        if (el) merken[id] = el.value;
    });
    const art = merken['eg-art'] || 'gegenstand';
    const arten = typeof TISCHMITTE_ARTEN !== 'undefined' ? TISCHMITTE_ARTEN : { gegenstand: { label: 'Gegenstand' }, waffe: { label: 'Waffe' }, waehrung: { label: 'Geld' } };

    body.innerHTML = `
        <p class="hr-hint" style="margin-top:0">
            Eingriff in den Bogen von <strong style="color:${escapeHtml(farbe)}">${escapeHtml(name)}</strong>.
        </p>
        <label class="hr-check eg-still">
            <input type="checkbox" id="eg-still" ${eingriffStill ? 'checked' : ''}>
            <span><strong>Verdeckt</strong> – beim Spieler kein Logbuch-Eintrag und kein Hinweis, die Änderung ist einfach da</span>
        </label>

        <h4>Geben</h4>
        <div class="eg-zeile">
            <select id="eg-art" class="x-select" onchange="renderEingriff()">
                ${Object.entries(arten).map(([k, v]) => `<option value="${k}" ${k === art ? 'selected' : ''}>${v.label}</option>`).join('')}
            </select>
            <input type="text" id="eg-name" class="x-input" placeholder="${art === 'waehrung' ? 'Währung (z.B. ' + escapeHtml((d.currency && d.currency.name) || 'Credits') + ')' : (art === 'waffe' ? 'Waffe …' : 'Gegenstand …')}" value="${escapeHtml(merken['eg-name'] || '')}" onkeydown="if(event.key==='Enter') eingriffGeben()">
            ${art === 'waffe'
                ? `<input type="text" id="eg-schaden" class="x-input eg-klein" placeholder="Schaden (1w10)" value="${escapeHtml(merken['eg-schaden'] || '')}" onkeydown="if(event.key==='Enter') eingriffGeben()">`
                : `<input type="number" id="eg-menge" class="x-input eg-klein" value="${escapeHtml(merken['eg-menge'] || '1')}" min="${art === 'waehrung' ? '-999999' : '1'}" title="${art === 'waehrung' ? 'Betrag (negativ = abziehen)' : 'Menge'}" onkeydown="if(event.key==='Enter') eingriffGeben()">`}
        </div>
        <div class="eg-zeile">
            <input type="text" id="eg-desc" class="x-input" placeholder="Beschreibung / Effekt (optional)" value="${escapeHtml(merken['eg-desc'] || '')}" onkeydown="if(event.key==='Enter') eingriffGeben()">
            <button class="tool-btn" onclick="eingriffGeben()"><i class="fa-solid fa-gift"></i> Geben</button>
        </div>
        ${art === 'waehrung' ? `<p class="hr-hint">Negativer Betrag zieht ab. Aktuell: ${escapeHtml((d.currency && d.currency.amount) || 0)} ${escapeHtml((d.currency && d.currency.name) || '')}</p>` : ''}

        <h4>Status-Effekte</h4>
        <div class="eg-status-liste">
            ${statuses.length ? statuses.map(s => {
                const typ = ['bonus', 'malus', 'neutral'].includes(s.type) ? s.type : 'malus';
                return `<span class="status-badge ${typ}" style="cursor:default">${escapeHtml(s.name || '?')}${s.value ? ' (' + escapeHtml(s.value) + ')' : ''}
                    <button class="eg-st-weg" data-egweg="${escapeHtml(s.id || '')}" title="Diesen Status beim Spieler entfernen">✕</button></span>`;
            }).join('') : '<span class="hr-dim">Keine Status-Effekte.</span>'}
        </div>
        <div class="eg-zeile">
            <input type="text" id="eg-st-name" class="x-input" placeholder="Status (z.B. Vergiftet)" value="${escapeHtml(merken['eg-st-name'] || '')}" onkeydown="if(event.key==='Enter') eingriffStatus()">
            <input type="text" id="eg-st-wert" class="x-input eg-klein" placeholder="Wert (z.B. 1W6)" value="${escapeHtml(merken['eg-st-wert'] || '')}" onkeydown="if(event.key==='Enter') eingriffStatus()">
            <select id="eg-st-typ" class="x-select eg-klein">
                ${[['malus', 'Malus (Rot)'], ['bonus', 'Bonus (Grün)'], ['neutral', 'Neutral (Grau)']].map(([k, l]) => `<option value="${k}" ${(merken['eg-st-typ'] || 'malus') === k ? 'selected' : ''}>${l}</option>`).join('')}
            </select>
            <button class="tool-btn" onclick="eingriffStatus()"><i class="fa-solid fa-masks-theater"></i> Setzen</button>
        </div>
        <div id="eg-status" class="hr-hint" style="min-height:1.2rem"></div>`;

    const still = document.getElementById('eg-still');
    if (still) still.addEventListener('change', () => { eingriffStill = still.checked; });
    body.querySelectorAll('[data-egweg]').forEach(b => b.addEventListener('click', () => eingriffStatusWeg(b.dataset.egweg)));
}

function eingriffSenden(nachricht) {
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[eingriffPeerId] : null;
    if (!conn || !conn.open) { eingriffMeldung('Keine Verbindung zu diesem Spieler.', true); return false; }
    try { conn.send(Object.assign({ type: 'eingriff', still: eingriffStill }, nachricht)); } catch (e) { eingriffMeldung('Senden fehlgeschlagen.', true); return false; }
    return true;
}

function eingriffMeldung(text, warnung) {
    const el = document.getElementById('eg-status');
    if (!el) return;
    el.textContent = text;
    el.style.color = warnung ? 'var(--color-dmg)' : 'var(--color-heal)';
}

function eingriffGeben() {
    const art = (document.getElementById('eg-art') || {}).value || 'gegenstand';
    const nameEl = document.getElementById('eg-name');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    const item = { art, name, description: ((document.getElementById('eg-desc') || {}).value || '').trim() };
    if (art === 'waffe') item.damage = ((document.getElementById('eg-schaden') || {}).value || '').trim();
    else if (art === 'waehrung') item.amount = parseInt((document.getElementById('eg-menge') || {}).value) || 0;
    else item.amount = Math.max(1, parseInt((document.getElementById('eg-menge') || {}).value) || 1);
    if (art === 'waehrung' && !item.amount) return;

    if (!eingriffSenden({ aktion: 'geben', item })) return;
    const label = typeof tischmitteLabel === 'function' ? tischmitteLabel(item) : name;
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `gibt ${label} an ${eingriffSpielerName()}${eingriffStill ? ' (verdeckt)' : ''}.`, eingriffStill ? '🤫' : '🎁');
    eingriffMeldung(`✓ ${label} geschickt${eingriffStill ? ' – verdeckt' : ''}.`);
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    const desc = document.getElementById('eg-desc'); if (desc) desc.value = '';
    const menge = document.getElementById('eg-menge'); if (menge) menge.value = '1';
    const schaden = document.getElementById('eg-schaden'); if (schaden) schaden.value = '';
}

function eingriffStatus() {
    const nameEl = document.getElementById('eg-st-name');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    const status = {
        name,
        value: ((document.getElementById('eg-st-wert') || {}).value || '').trim(),
        type: (document.getElementById('eg-st-typ') || {}).value || 'malus'
    };
    if (!eingriffSenden({ aktion: 'status', status })) return;
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `setzt Status "${name}" bei ${eingriffSpielerName()}${eingriffStill ? ' (verdeckt)' : ''}.`, eingriffStill ? '🤫' : '🎭');
    eingriffMeldung(`✓ Status "${name}" gesetzt${eingriffStill ? ' – verdeckt' : ''}.`);
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    const wert = document.getElementById('eg-st-wert'); if (wert) wert.value = '';
}

function eingriffStatusWeg(statusId) {
    if (!statusId) return;
    const d = eingriffSpielerDaten();
    const st = d && Array.isArray(d.statuses) ? d.statuses.find(s => s && s.id === statusId) : null;
    if (!eingriffSenden({ aktion: 'statusWeg', statusId })) return;
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `entfernt Status "${st ? st.name : '?'}" bei ${eingriffSpielerName()}${eingriffStill ? ' (verdeckt)' : ''}.`, eingriffStill ? '🤫' : '🎭');
    eingriffMeldung(`✓ Status entfernt${eingriffStill ? ' – verdeckt' : ''}.`);
}

// Nach jedem Bogen-Update: offenes Modal mit der aktuellen Status-Liste nachziehen
function eingriffAktualisieren(peerId) {
    const overlay = document.getElementById('eingriff-modal-overlay');
    if (overlay && overlay.classList.contains('active') && peerId === eingriffPeerId) renderEingriff();
}

// --- Spieler ----------------------------------------------------------------

// Wendet den Eingriff auf den eigenen Bogen an. Verdeckt = kein Log, kein
// Hinweis; offen = Logbuch-Eintrag wie bei jeder anderen Änderung.
function eingriffEmpfangen(payload) {
    if (!payload || typeof appData === 'undefined') return;
    const still = !!payload.still;
    const log = (text, klasse, icon) => { if (!still && typeof addActivityLog === 'function') addActivityLog(text, klasse, icon); };

    if (payload.aktion === 'geben' && payload.item && typeof payload.item === 'object') {
        const it = payload.item;
        const name = String(it.name || '').slice(0, 120);
        const description = String(it.description || '').slice(0, 1000);
        if (it.art === 'waehrung') {
            if (!appData.currency) appData.currency = { name: name || 'Credits', amount: 0 };
            const betrag = parseInt(it.amount) || 0;
            appData.currency.amount = (parseInt(appData.currency.amount) || 0) + betrag;
            log(`${betrag >= 0 ? 'Erhalten' : 'Abgezogen'}: ${Math.abs(betrag)} ${name || appData.currency.name} (vom Spielleiter)`, betrag >= 0 ? 'activity-good' : 'activity-bad', '<i class="fa-solid fa-coins"></i>');
        } else if (it.art === 'waffe') {
            if (!appData.weapons) appData.weapons = [];
            appData.weapons.push({ id: 'w_' + Date.now(), name, damage: String(it.damage || '').slice(0, 40), description, showDesc: !!description });
            log(`Erhalten: ${name} (vom Spielleiter)`, 'activity-good', '<i class="fa-solid fa-khanda"></i>');
        } else {
            if (!appData.inventory) appData.inventory = [];
            const amount = Math.max(1, parseInt(it.amount) || 1);
            appData.inventory.push({ id: 'inv_' + Date.now(), name, amount, description, showDesc: !!description });
            log(`Erhalten: ${amount > 1 ? amount + 'x ' : ''}${name} (vom Spielleiter)`, 'activity-good', '<i class="fa-solid fa-box"></i>');
        }
    } else if (payload.aktion === 'status' && payload.status && typeof payload.status === 'object') {
        if (!appData.statuses) appData.statuses = [];
        const s = payload.status;
        const type = ['bonus', 'malus', 'neutral'].includes(s.type) ? s.type : 'malus';
        appData.statuses.push({ id: 'st_' + Date.now(), name: String(s.name || '').slice(0, 60), value: String(s.value || '').slice(0, 30), type });
        const cssMap = { bonus: 'activity-good', malus: 'activity-bad', neutral: 'activity-neutral' };
        log(`Neuer Status: ${String(s.name || '')} (vom Spielleiter)`, cssMap[type], '<i class="fa-solid fa-masks-theater"></i>');
    } else if (payload.aktion === 'statusWeg' && payload.statusId) {
        const st = (appData.statuses || []).find(s => s && s.id === payload.statusId);
        if (!st) return;
        appData.statuses = appData.statuses.filter(s => s.id !== payload.statusId);
        log(`Status entfernt: ${st.name} (vom Spielleiter)`, 'activity-neutral', '<i class="fa-solid fa-heart-circle-check"></i>');
    } else {
        return;
    }
    if (typeof saveData === 'function') saveData();
    if (typeof renderAll === 'function') renderAll();
}

function eingriffNachrichtVerarbeiten(payload) {
    if (payload && payload.type === 'eingriff') { eingriffEmpfangen(payload); return true; }
    return false;
}
