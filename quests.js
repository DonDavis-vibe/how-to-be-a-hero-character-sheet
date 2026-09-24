// How to be a Hero - Quest-Logbuch
//
// Der Spielleiter legt Quests vor oder während der Runde an und entscheidet
// gezielt, was davon wann bei den Spielern ankommt: eine Quest kann komplett
// versteckt sein, und selbst wenn sie geteilt ist, lassen sich einzelne
// Hinweise und Ziele unabhängig voneinander freigeben (z.B. das wahre
// Endziel erst enthüllen, wenn die Gruppe weit genug ist).
//
// Anders als die Tischmitte gibt es hier keine Spieler-Aktionen (Nehmen o.ä.) -
// Quests laufen nur SL -> Spieler. Wichtig: Solange der SL nie eine Quest
// teilt, taucht beim Spieler nichts auf - kein leerer Abschnitt, kein Hinweis
// aufs Feature. Es entsteht erst, wenn es gebraucht wird.
//
// Nachricht (multiplayer.js):
//   SL -> Spieler   { type: 'quests', quests: [...] }   nur sichtbare Inhalte
//
// Quest: { id, name, beschreibung, nscId, hidden,
//          hinweise: [{ id, text, hidden }],
//          ziele: [{ id, text, hidden, erledigt }] }
// nscId verweist optional auf einen Eintrag aus nscListe (nscliste.js).

const QUESTE_KEY = 'htbah_gm_queste';
const QUESTE_OFFEN_KEY = 'htbah_gm_queste_offen';

// Beim SL kanonisch (inkl. versteckt), beim Spieler die gefilterte Kopie
let queste = [];
let questeSpieler = [];
let questeOffenGm = true;
let questeOffenSpieler = false;

function questeNeueId(praefix) {
    return (praefix || 'q') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// --- Spielleiter --------------------------------------------------------------

function questeLaden() {
    try {
        const roh = localStorage.getItem(QUESTE_KEY);
        queste = roh ? JSON.parse(roh) : [];
        if (!Array.isArray(queste)) queste = [];
        questeOffenGm = localStorage.getItem(QUESTE_OFFEN_KEY) !== '0';
    } catch (e) { queste = []; }
}

function questeSichern() {
    sicherSpeichern(QUESTE_KEY, JSON.stringify(queste));
}

// Nur das, was der SL freigegeben hat - versteckte Quests, Hinweise und Ziele
// verlassen den SL-Rechner nicht.
function questeSichtbarFuerSpieler() {
    return queste.filter(q => !q.hidden).map(q => ({
        id: q.id,
        name: q.name,
        beschreibung: q.beschreibung,
        nscName: q.nscId ? questeNscName(q.nscId) : '',
        hinweise: (q.hinweise || []).filter(h => !h.hidden).map(h => h.text),
        ziele: (q.ziele || []).filter(z => !z.hidden).map(z => ({ id: z.id, text: z.text, erledigt: z.erledigt }))
    }));
}

function questeNscName(nscId) {
    if (typeof nscListe === 'undefined') return '';
    const n = nscListe.find(x => x.id === nscId);
    return n ? n.name : '';
}

// Jede Änderung läuft hier durch: sichern, an alle verteilen, GM-Ansicht neu zeichnen.
function questeCommit() {
    questeSichern();
    if (typeof clientConnections !== 'undefined') {
        const nachricht = { type: 'quests', quests: questeSichtbarFuerSpieler() };
        Object.values(clientConnections).forEach(conn => {
            if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
        });
    }
    renderQuesteGm();
}

function questeAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    try { conn.send({ type: 'quests', quests: questeSichtbarFuerSpieler() }); } catch (e) { /* weg */ }
}

function questeHinzufuegen() {
    const nameEl = document.getElementById('qs-neu-name');
    const beschrEl = document.getElementById('qs-neu-beschreibung');
    const nscEl = document.getElementById('qs-neu-nsc');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }

    queste = [{
        id: questeNeueId(),
        name,
        beschreibung: (beschrEl ? beschrEl.value : '').trim(),
        nscId: (nscEl ? nscEl.value : '') || '',
        hidden: true,
        hinweise: [],
        ziele: []
    }].concat(queste);
    questeOffenGm = true;
    questeCommit();
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    if (beschrEl) beschrEl.value = '';
    if (nscEl) nscEl.value = '';
}

function questeEntfernen(id) {
    if (!confirm('Diese Quest komplett löschen?')) return;
    queste = queste.filter(q => q.id !== id);
    questeCommit();
}

function questeVerstecktToggle(id) {
    queste = queste.map(q => q.id === id ? Object.assign({}, q, { hidden: !q.hidden }) : q);
    questeCommit();
}

function questeFeldAendern(id, feld, wert) {
    const q = queste.find(x => x.id === id);
    if (!q) return;
    q[feld] = wert;
    questeSichern();
    // Kein voller Commit (kein Re-Render, kein Broadcast) bei jedem Tastendruck -
    // die Beschreibung tippt sich sonst ruckelig. Broadcast holt der nächste
    // Sichtbarkeits-Toggle oder Reload nach.
}

function questeFeldAendernUndSenden(id, feld, wert) {
    const q = queste.find(x => x.id === id);
    if (!q) return;
    q[feld] = wert;
    questeCommit();
}

function questeHinweisHinzufuegen(questId) {
    const input = document.querySelector(`[data-qshintinput="${CSS.escape(questId)}"]`);
    const text = (input ? input.value : '').trim();
    if (!text) return;
    const q = queste.find(x => x.id === questId);
    if (!q) return;
    if (!Array.isArray(q.hinweise)) q.hinweise = [];
    q.hinweise.push({ id: questeNeueId('h'), text, hidden: true });
    questeCommit();
}

function questeHinweisEntfernen(questId, hintId) {
    const q = queste.find(x => x.id === questId);
    if (!q) return;
    q.hinweise = (q.hinweise || []).filter(h => h.id !== hintId);
    questeCommit();
}

function questeHinweisVerstecktToggle(questId, hintId) {
    const q = queste.find(x => x.id === questId);
    if (!q) return;
    const h = (q.hinweise || []).find(x => x.id === hintId);
    if (!h) return;
    h.hidden = !h.hidden;
    questeCommit();
}

function questeZielHinzufuegen(questId) {
    const input = document.querySelector(`[data-qszielinput="${CSS.escape(questId)}"]`);
    const text = (input ? input.value : '').trim();
    if (!text) return;
    const q = queste.find(x => x.id === questId);
    if (!q) return;
    if (!Array.isArray(q.ziele)) q.ziele = [];
    q.ziele.push({ id: questeNeueId('z'), text, hidden: true, erledigt: false });
    questeCommit();
}

function questeZielEntfernen(questId, zielId) {
    const q = queste.find(x => x.id === questId);
    if (!q) return;
    q.ziele = (q.ziele || []).filter(z => z.id !== zielId);
    questeCommit();
}

function questeZielVerstecktToggle(questId, zielId) {
    const q = queste.find(x => x.id === questId);
    if (!q) return;
    const z = (q.ziele || []).find(x => x.id === zielId);
    if (!z) return;
    z.hidden = !z.hidden;
    questeCommit();
}

function questeZielErledigtToggle(questId, zielId) {
    const q = queste.find(x => x.id === questId);
    if (!q) return;
    const z = (q.ziele || []).find(x => x.id === zielId);
    if (!z) return;
    z.erledigt = !z.erledigt;
    questeCommit();
}

function renderQuesteGm() {
    const box = document.getElementById('gm-quests');
    if (!box) return;

    const nscOptionen = typeof nscListe !== 'undefined'
        ? nscListe.map(n => `<option value="${escapeHtml(n.id)}">${escapeHtml(n.name)}</option>`).join('')
        : '';

    const karten = queste.map(q => {
        const hinweise = q.hinweise || [];
        const ziele = q.ziele || [];
        const alleZieleErledigt = ziele.length > 0 && ziele.every(z => z.erledigt);
        const nscName = q.nscId ? questeNscName(q.nscId) : '';

        const hinweiseHtml = hinweise.map(h => `
            <div class="qs-teil-zeile">
                <span class="qs-teil-text ${h.hidden ? 'qs-teil-versteckt' : ''}">${escapeHtml(h.text)}</span>
                <button class="x-mini" data-qshinttoggle="${escapeHtml(q.id)}:${escapeHtml(h.id)}" title="${h.hidden ? 'Für die Gruppe freigeben' : 'Wieder verstecken'}"><i class="fa-solid ${h.hidden ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
                <button class="x-mini x-mini-danger" data-qshintdel="${escapeHtml(q.id)}:${escapeHtml(h.id)}" title="Hinweis löschen"><i class="fa-solid fa-trash"></i></button>
            </div>`).join('');

        const zieleHtml = ziele.map(z => `
            <div class="qs-teil-zeile">
                <label class="qs-ziel-check">
                    <input type="checkbox" ${z.erledigt ? 'checked' : ''} data-qszielerledigt="${escapeHtml(q.id)}:${escapeHtml(z.id)}">
                    <span class="qs-teil-text ${z.erledigt ? 'qs-ziel-erledigt' : ''} ${z.hidden ? 'qs-teil-versteckt' : ''}">${escapeHtml(z.text)}</span>
                </label>
                <button class="x-mini" data-qszieltoggle="${escapeHtml(q.id)}:${escapeHtml(z.id)}" title="${z.hidden ? 'Für die Gruppe freigeben' : 'Wieder verstecken'}"><i class="fa-solid ${z.hidden ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
                <button class="x-mini x-mini-danger" data-qszieldel="${escapeHtml(q.id)}:${escapeHtml(z.id)}" title="Ziel löschen"><i class="fa-solid fa-trash"></i></button>
            </div>`).join('');

        return `
        <div class="qs-item ${q.hidden ? 'qs-item-hidden' : ''}">
            <div class="qs-item-kopf">
                <span class="qs-name">${escapeHtml(q.name)}</span>
                ${nscName ? `<span class="nsc-badge"><i class="fa-solid fa-user"></i> ${escapeHtml(nscName)}</span>` : ''}
                ${alleZieleErledigt ? `<span class="tm-badge tm-badge-visible"><i class="fa-solid fa-circle-check"></i> Ziele erledigt</span>` : ''}
                <span class="tm-badge ${q.hidden ? 'tm-badge-hidden' : 'tm-badge-visible'}">${q.hidden ? '<i class="fa-solid fa-eye-slash"></i> versteckt' : '<i class="fa-solid fa-eye"></i> geteilt'}</span>
                <button class="x-mini" data-qstoggle="${escapeHtml(q.id)}" title="${q.hidden ? 'Für die Gruppe teilen' : 'Wieder verstecken'}"><i class="fa-solid ${q.hidden ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
                <button class="x-mini x-mini-danger" data-qsdel="${escapeHtml(q.id)}" title="Quest löschen"><i class="fa-solid fa-trash"></i></button>
            </div>
            <textarea class="x-input qs-beschreibung" data-qsbeschreibung="${escapeHtml(q.id)}" placeholder="Beschreibung …" rows="1">${escapeHtml(q.beschreibung)}</textarea>

            <div class="qs-teil">
                <div class="qs-teil-titel">Hinweise für die Gruppe</div>
                ${hinweiseHtml}
                <div class="qs-teil-add">
                    <input type="text" class="x-input qs-teil-input" data-qshintinput="${escapeHtml(q.id)}" placeholder="Neuer Hinweis …" onkeydown="if(event.key==='Enter'){event.preventDefault(); questeHinweisHinzufuegen('${escapeHtml(q.id)}');}">
                    <button class="x-mini" onclick="questeHinweisHinzufuegen('${escapeHtml(q.id)}')" title="Hinweis hinzufügen"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <div class="qs-teil">
                <div class="qs-teil-titel">Ziele</div>
                ${zieleHtml}
                <div class="qs-teil-add">
                    <input type="text" class="x-input qs-teil-input" data-qszielinput="${escapeHtml(q.id)}" placeholder="Neues Ziel …" onkeydown="if(event.key==='Enter'){event.preventDefault(); questeZielHinzufuegen('${escapeHtml(q.id)}');}">
                    <button class="x-mini" onclick="questeZielHinzufuegen('${escapeHtml(q.id)}')" title="Ziel hinzufügen"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>`;
    }).join('');

    box.innerHTML = `
        <details class="x-details qs-details" ${questeOffenGm ? 'open' : ''}>
            <summary class="qs-head">
                <div class="qs-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-scroll"></i> Quest-Logbuch
                    ${queste.length ? `<span class="x-count">${queste.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('quests')" title="Hilfe zum Quest-Logbuch"></i>
                </div>
            </summary>
            <div class="qs-form">
                <input type="text" id="qs-neu-name" class="x-input qs-input" placeholder="Name der Quest …" onkeydown="if(event.key==='Enter') questeHinzufuegen()">
                <input type="text" id="qs-neu-beschreibung" class="x-input qs-input qs-input-desc" placeholder="Kurzbeschreibung (optional)" onkeydown="if(event.key==='Enter') questeHinzufuegen()">
                ${nscOptionen ? `<select id="qs-neu-nsc" class="x-select"><option value="">Kein NSC verknüpft</option>${nscOptionen}</select>` : ''}
                <button class="tool-btn" onclick="questeHinzufuegen()"><i class="fa-solid fa-plus"></i> Anlegen</button>
            </div>
            <p class="qs-hint">Neue Quests sind erst <b>versteckt</b> - Symbol <i class="fa-solid fa-eye"></i> teilt sie mit der Gruppe. Genauso lassen sich einzelne Hinweise und Ziele unabhängig freigeben.</p>
            <div class="qs-list">${karten || '<div class="x-leer">Noch keine Quests. Leg eine an - sie bleibt versteckt, bis du sie freigibst.</div>'}</div>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => {
        questeOffenGm = details.open;
        sicherSpeichern(QUESTE_OFFEN_KEY, details.open ? '1' : '0');
    });
    box.querySelectorAll('[data-qstoggle]').forEach(b => b.addEventListener('click', () => questeVerstecktToggle(b.dataset.qstoggle)));
    box.querySelectorAll('[data-qsdel]').forEach(b => b.addEventListener('click', () => questeEntfernen(b.dataset.qsdel)));
    box.querySelectorAll('[data-qsbeschreibung]').forEach(t => {
        questeAutoSize(t);
        t.addEventListener('input', () => { questeAutoSize(t); questeFeldAendern(t.dataset.qsbeschreibung, 'beschreibung', t.value); });
        t.addEventListener('blur', () => questeFeldAendernUndSenden(t.dataset.qsbeschreibung, 'beschreibung', t.value));
    });
    box.querySelectorAll('[data-qshinttoggle]').forEach(b => b.addEventListener('click', () => {
        const [qid, hid] = b.dataset.qshinttoggle.split(':');
        questeHinweisVerstecktToggle(qid, hid);
    }));
    box.querySelectorAll('[data-qshintdel]').forEach(b => b.addEventListener('click', () => {
        const [qid, hid] = b.dataset.qshintdel.split(':');
        questeHinweisEntfernen(qid, hid);
    }));
    box.querySelectorAll('[data-qszieltoggle]').forEach(b => b.addEventListener('click', () => {
        const [qid, zid] = b.dataset.qszieltoggle.split(':');
        questeZielVerstecktToggle(qid, zid);
    }));
    box.querySelectorAll('[data-qszieldel]').forEach(b => b.addEventListener('click', () => {
        const [qid, zid] = b.dataset.qszieldel.split(':');
        questeZielEntfernen(qid, zid);
    }));
    box.querySelectorAll('[data-qszielerledigt]').forEach(cb => cb.addEventListener('change', () => {
        const [qid, zid] = cb.dataset.qszielerledigt.split(':');
        questeZielErledigtToggle(qid, zid);
    }));
}

function questeAutoSize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// --- Spieler ----------------------------------------------------------------

function questeVerbunden() {
    return typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
}

function questeEmpfangen(quests) {
    questeSpieler = Array.isArray(quests) ? quests : [];
    renderQuesteSpieler();
}

function renderQuesteSpieler() {
    const section = document.getElementById('quest-section');
    if (!section) return;
    // Kernanforderung: Solange der SL keine einzige Quest geteilt hat, existiert
    // dieser Abschnitt für den Spieler schlicht nicht - kein leerer Platzhalter,
    // kein Hinweis aufs Feature.
    if (!questeVerbunden() || (typeof isGmMode !== 'undefined' && isGmMode) || questeSpieler.length === 0) {
        section.style.display = 'none';
        section.innerHTML = '';
        return;
    }
    section.style.display = '';

    const karten = questeSpieler.map(q => {
        const zieleHtml = (q.ziele || []).map(z => `
            <div class="qs-teil-zeile qs-teil-zeile-spieler">
                <i class="fa-solid ${z.erledigt ? 'fa-square-check qs-ziel-icon-erledigt' : 'fa-square'}"></i>
                <span class="${z.erledigt ? 'qs-ziel-erledigt' : ''}">${escapeHtml(z.text)}</span>
            </div>`).join('');
        const hinweiseHtml = (q.hinweise || []).map(h => `<li>${escapeHtml(h)}</li>`).join('');
        return `
        <div class="qs-item card-layout">
            <div class="qs-item-kopf">
                <span class="qs-name">${escapeHtml(q.name)}</span>
                ${q.nscName ? `<span class="nsc-badge"><i class="fa-solid fa-user"></i> ${escapeHtml(q.nscName)}</span>` : ''}
            </div>
            ${q.beschreibung ? `<div class="qs-item-desc">${escapeHtml(q.beschreibung)}</div>` : ''}
            ${hinweiseHtml ? `<div class="qs-teil"><div class="qs-teil-titel">Hinweise</div><ul class="qs-hinweise-liste">${hinweiseHtml}</ul></div>` : ''}
            ${zieleHtml ? `<div class="qs-teil"><div class="qs-teil-titel">Ziele</div>${zieleHtml}</div>` : ''}
        </div>`;
    }).join('');

    section.innerHTML = `
        <details class="x-details qs-details" ${questeOffenSpieler ? 'open' : ''}>
            <summary class="qs-head">
                <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-scroll category-icon-fa"></i> Quest-Logbuch
                    <span class="x-count">${questeSpieler.length}</span>
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('quests')" title="Hilfe zum Quest-Logbuch"></i></h2>
            </summary>
            <div class="qs-list">${karten}</div>
        </details>`;

    const details = section.querySelector('details');
    if (details) details.addEventListener('toggle', () => { questeOffenSpieler = details.open; });
}

// Beim Spieler eintreffende Nachrichten (aus multiplayer.js). true = verarbeitet.
function questeNachrichtVerarbeiten(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type === 'quests') { questeEmpfangen(payload.quests); return true; }
    return false;
}

// Beitritt als Spieler: eine evtl. eigene alte SL-Sitzung gehört nicht zu
// dieser Runde - leer starten, der SL schickt seinen aktuellen Stand.
function questeBeitritt() {
    questeSpieler = [];
    questeOffenSpieler = false;
    renderQuesteSpieler();
}

function questeGetrennt() {
    questeSpieler = [];
    questeOffenSpieler = false;
    renderQuesteSpieler();
}

document.addEventListener('DOMContentLoaded', () => {
    questeLaden();
    renderQuesteGm();
});
