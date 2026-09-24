// How to be a Hero - Spieler-Logbuch (eigenes Abenteuer-Tagebuch)
//
// Zusätzlich zum freien Notizfeld können Spieler hier strukturierte Einträge
// anlegen: welcher NSC wurde wann getroffen, was hat er erzählt, welche
// Hinweise gab es. Anders als das SL-Quest-Logbuch (quests.js) läuft hier
// nichts über den Spielleiter - die Einträge leben wie Inventar oder Notizen
// in appData, werden beim "Speichern (JSON)" mit exportiert und tauchen nirgends
// im GM-Dashboard auf.
//
// Eintrag: { id, npc, zeitpunkt, text }

const SPIELERLOG_OFFEN_KEY = 'htbah_spielerlog_offen';
let spielerlogOffen = false;

(function spielerlogOffenLaden() {
    try { spielerlogOffen = localStorage.getItem(SPIELERLOG_OFFEN_KEY) === '1'; } catch (e) { /* egal */ }
})();

function spielerlogNeueId() {
    return 'sl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function spielerlogHinzufuegen() {
    const npcEl = document.getElementById('sl-neu-npc');
    const zeitEl = document.getElementById('sl-neu-zeitpunkt');
    const textEl = document.getElementById('sl-neu-text');
    const text = (textEl ? textEl.value : '').trim();
    if (!text) { if (textEl) textEl.focus(); return; }

    if (!Array.isArray(appData.questlog)) appData.questlog = [];
    appData.questlog.unshift({
        id: spielerlogNeueId(),
        npc: (npcEl ? npcEl.value : '').trim(),
        zeitpunkt: (zeitEl ? zeitEl.value : '').trim(),
        text
    });
    spielerlogOffen = true;
    saveData();
    renderSpielerlog();

    if (npcEl) npcEl.value = '';
    if (zeitEl) zeitEl.value = '';
    if (textEl) textEl.value = '';
    if (npcEl) npcEl.focus();
}

function spielerlogEntfernen(id) {
    // Kein confirm() - anders als das Löschen ganzer Container (Inventar, Quest,
    // NSC) ist ein einzelner Logbuch-Eintrag ein kleines Element wie ein
    // Quest-Hinweis oder -Ziel (siehe questeHinweisEntfernen in quests.js),
    // die in diesem Projekt ebenfalls ohne Rückfrage verschwinden.
    appData.questlog = (appData.questlog || []).filter(e => e.id !== id);
    saveData();
    renderSpielerlog();
}

function spielerlogFeldAendern(id, feld, wert) {
    const eintrag = (appData.questlog || []).find(e => e.id === id);
    if (!eintrag) return;
    eintrag[feld] = wert;
    saveData();
    // Kein Re-Render bei jedem Tastendruck - sonst springt der Cursor beim Tippen.
}

function spielerlogAutoSize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function renderSpielerlog() {
    const box = document.getElementById('spielerlog-section');
    if (!box) return;
    // Anders als das SL-Quest-Logbuch (das erst mit dem ersten Teilen entsteht)
    // ist das eigene Logbuch von Anfang an da - sonst findet der Spieler das
    // Feature nie, wenn er noch keinen Eintrag angelegt hat.
    box.style.display = '';

    const eintraege = Array.isArray(appData.questlog) ? appData.questlog : [];

    const karten = eintraege.map(e => `
        <div class="qs-item card-layout">
            <div class="qs-item-kopf">
                <input type="text" class="x-input sl-teil-input" data-slnpc="${escapeHtml(e.id)}" placeholder="NSC (optional) …" value="${escapeHtml(e.npc || '')}">
                <input type="text" class="x-input sl-teil-input" data-slzeit="${escapeHtml(e.id)}" placeholder="Wann? (optional) …" value="${escapeHtml(e.zeitpunkt || '')}">
                <button class="x-mini x-mini-danger" data-sldel="${escapeHtml(e.id)}" title="Eintrag löschen"><i class="fa-solid fa-trash"></i></button>
            </div>
            <textarea class="x-input qs-beschreibung" data-sltext="${escapeHtml(e.id)}" placeholder="Was wurde erzählt, welche Hinweise gab es …" rows="1">${escapeHtml(e.text || '')}</textarea>
        </div>`).join('');

    box.innerHTML = `
        <details class="x-details qs-details" ${spielerlogOffen ? 'open' : ''}>
            <summary class="qs-head">
                <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-feather-pointed category-icon-fa"></i> Mein Logbuch
                    ${eintraege.length ? `<span class="x-count">${eintraege.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('spielerlog')" title="Hilfe zum eigenen Logbuch"></i></h2>
            </summary>
            <p class="qs-hint">Dein eigenes Tagebuch: welchen NSC hast du wann getroffen, was hat er erzählt, welche Hinweise gab es. Bleibt bei dir - geht nie an den Spielleiter oder die Gruppe raus.</p>
            <div class="qs-form">
                <input type="text" id="sl-neu-npc" class="x-input qs-input" placeholder="NSC (optional) …" onkeydown="if(event.key==='Enter'){event.preventDefault(); document.getElementById('sl-neu-text').focus();}">
                <input type="text" id="sl-neu-zeitpunkt" class="x-input qs-input" placeholder="Wann? (optional) …" onkeydown="if(event.key==='Enter'){event.preventDefault(); document.getElementById('sl-neu-text').focus();}">
            </div>
            <div class="qs-form" style="margin-top: 0.5rem;">
                <textarea id="sl-neu-text" class="x-input qs-input-desc" placeholder="Was wurde erzählt, welche Hinweise gab es …" rows="2" style="flex: 1 1 100%;"></textarea>
                <button class="tool-btn" onclick="spielerlogHinzufuegen()"><i class="fa-solid fa-plus"></i> Eintragen</button>
            </div>
            <div class="qs-list">${karten || '<div class="x-leer">Noch keine Einträge. Halte fest, wen du getroffen hast und was du erfahren hast.</div>'}</div>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => {
        spielerlogOffen = details.open;
        sicherSpeichern(SPIELERLOG_OFFEN_KEY, details.open ? '1' : '0');
    });
    box.querySelectorAll('[data-sldel]').forEach(b => b.addEventListener('click', () => spielerlogEntfernen(b.dataset.sldel)));
    box.querySelectorAll('[data-slnpc]').forEach(i => i.addEventListener('input', () => spielerlogFeldAendern(i.dataset.slnpc, 'npc', i.value)));
    box.querySelectorAll('[data-slzeit]').forEach(i => i.addEventListener('input', () => spielerlogFeldAendern(i.dataset.slzeit, 'zeitpunkt', i.value)));
    box.querySelectorAll('[data-sltext]').forEach(t => {
        spielerlogAutoSize(t);
        t.addEventListener('input', () => { spielerlogAutoSize(t); spielerlogFeldAendern(t.dataset.sltext, 'text', t.value); });
    });
}
