// How to be a Hero - NSC-Liste (SL-Gedächtnis für eigene Nichtspielercharaktere)
//
// Reine Merkliste für den SL: NPCs, die im Laufe der Runde auftauchen - egal ob
// von Hand eingetragen oder direkt aus dem Zufallsgenerator übernommen (Knopf
// "In NSC-Liste übernehmen" beim NSC-Ergebnis, siehe randomizer.js). Bleibt
// komplett lokal beim SL, geht nie an Spieler raus - anders als die Tischmitte
// gibt es hier auch kein "Aufdecken", das wäre hier gar nicht der Punkt.
//
// Eintrag: { id, name, ort, rolle, haltung, auffaelligkeit, motivation, wesen, notiz }
// notiz ist frei editierbar - der Platz für "wie es mit dem NSC weiterging".

const NSC_LISTE_KEY = 'htbah_gm_nscliste';
const NSC_LISTE_OFFEN_KEY = 'htbah_gm_nscliste_offen';
const NSC_SORTIERUNG_KEY = 'htbah_gm_nscliste_sortierung';

let nscListe = [];
let nscListeOffen = true;
let nscListeSortierung = 'reihenfolge'; // 'reihenfolge' | 'ort' | 'name' | 'haltung'

function nscNeueId() {
    return 'nsc_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function nscListeLaden() {
    try {
        const roh = localStorage.getItem(NSC_LISTE_KEY);
        nscListe = roh ? JSON.parse(roh) : [];
        if (!Array.isArray(nscListe)) nscListe = [];
        nscListeOffen = localStorage.getItem(NSC_LISTE_OFFEN_KEY) !== '0';
        nscListeSortierung = localStorage.getItem(NSC_SORTIERUNG_KEY) || 'reihenfolge';
    } catch (e) { nscListe = []; }
}

function nscListeSichern() {
    try { localStorage.setItem(NSC_LISTE_KEY, JSON.stringify(nscListe)); } catch (e) { /* voll */ }
}

// Vorlage darf jedes Feld weglassen - beim manuellen Anlegen ist meist nur der
// Name gesetzt, beim Übernehmen aus dem Generator (randomizer.js) alles.
function nscListeHinzufuegen(vorlage) {
    const eintrag = {
        id: nscNeueId(),
        name: String((vorlage && vorlage.name) || 'Unbenannt').slice(0, 120),
        ort: String((vorlage && vorlage.ort) || '').slice(0, 120),
        rolle: String((vorlage && vorlage.rolle) || '').slice(0, 120),
        haltung: String((vorlage && vorlage.haltung) || '').slice(0, 120),
        auffaelligkeit: String((vorlage && vorlage.auffaelligkeit) || '').slice(0, 300),
        motivation: String((vorlage && vorlage.motivation) || '').slice(0, 300),
        wesen: String((vorlage && vorlage.wesen) || '').slice(0, 300),
        notiz: String((vorlage && vorlage.notiz) || '').slice(0, 2000)
    };
    nscListe = [eintrag].concat(nscListe);
    nscListeSichern();
    nscListeOffen = true;
    renderNscListeGm();
    return eintrag;
}

function nscListeEntfernen(id) {
    if (!confirm('Diesen NSC aus der Liste entfernen?')) return;
    nscListe = nscListe.filter(n => n.id !== id);
    nscListeSichern();
    renderNscListeGm();
}

function nscListeFeldAendern(id, feld, wert) {
    const eintrag = nscListe.find(n => n.id === id);
    if (!eintrag) return;
    eintrag[feld] = wert;
    nscListeSichern();
}

function nscListeManuellHinzufuegen() {
    const nameEl = document.getElementById('nsc-neu-name');
    const ortEl = document.getElementById('nsc-neu-ort');
    const rolleEl = document.getElementById('nsc-neu-rolle');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    nscListeHinzufuegen({ name, ort: (ortEl ? ortEl.value : '').trim(), rolle: (rolleEl ? rolleEl.value : '').trim() });
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    if (ortEl) ortEl.value = '';
    if (rolleEl) rolleEl.value = '';
}

function nscListeSortiert() {
    const liste = nscListe.slice();
    const vgl = (a, b) => a.name.localeCompare(b.name, 'de');
    if (nscListeSortierung === 'ort') liste.sort((a, b) => (a.ort || 'zzz').localeCompare(b.ort || 'zzz', 'de') || vgl(a, b));
    else if (nscListeSortierung === 'name') liste.sort(vgl);
    else if (nscListeSortierung === 'haltung') liste.sort((a, b) => (a.haltung || 'zzz').localeCompare(b.haltung || 'zzz', 'de') || vgl(a, b));
    return liste;
}

// Grobe, rein kosmetische Einfärbung der Haltung nach Stichwort - dieselben drei
// Töne wie die Status-Badges der Spieler (gruppe.js), damit Rot/Grün/Grau überall
// im Dashboard dasselbe bedeutet.
function nscHaltungTon(haltung) {
    const h = (haltung || '').toLowerCase();
    if (/feindselig|misstraut|ablehn|hasst|argwöhn/.test(h)) return 'malus';
    if (/freundlich|hilfsbereit|verbündet|treu|offen\b|zugewandt/.test(h)) return 'bonus';
    return 'neutral';
}

function renderNscListeGm() {
    const box = document.getElementById('gm-nscliste');
    if (!box) return;

    const zeilen = nscListeSortiert().map(n => {
        const ton = nscHaltungTon(n.haltung);
        const details = [
            n.auffaelligkeit ? `<div><i class="fa-solid fa-magnifying-glass"></i> ${escapeHtml(n.auffaelligkeit)}</div>` : '',
            n.motivation ? `<div><i class="fa-solid fa-bullseye"></i> ${escapeHtml(n.motivation)}</div>` : '',
            n.wesen ? `<div><i class="fa-solid fa-dragon"></i> ${escapeHtml(n.wesen)}</div>` : ''
        ].filter(Boolean).join('');
        return `
        <div class="nsc-item">
            <div class="nsc-item-kopf">
                <span class="nsc-name">${escapeHtml(n.name)}</span>
                ${n.ort ? `<span class="nsc-badge"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(n.ort)}</span>` : ''}
                ${n.rolle ? `<span class="nsc-badge">${escapeHtml(n.rolle)}</span>` : ''}
                ${n.haltung ? `<span class="status-badge ${ton}">${escapeHtml(n.haltung)}</span>` : ''}
                ${typeof karteNsPlatzieren === 'function' && typeof eldaraAktiv === 'function' && eldaraAktiv() ? `<button class="x-mini" data-nsckarte="${escapeHtml(n.id)}" title="Auf Karte platzieren"><i class="fa-solid fa-map-location-dot"></i></button>` : ''}
                <button class="x-mini x-mini-danger" data-nscdel="${escapeHtml(n.id)}" title="NSC entfernen"><i class="fa-solid fa-trash"></i></button>
            </div>
            ${details ? `<div class="nsc-item-details">${details}</div>` : ''}
            <textarea class="x-input nsc-notiz" data-nscnotiz="${escapeHtml(n.id)}" placeholder="Eigene Notiz - z.B. wie es mit dem NSC weiterging …" rows="1">${escapeHtml(n.notiz)}</textarea>
        </div>`;
    }).join('');

    box.innerHTML = `
        <details class="x-details nsc-details" ${nscListeOffen ? 'open' : ''}>
            <summary class="nsc-head">
                <div class="nsc-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-address-book"></i> NSC-Liste
                    ${nscListe.length ? `<span class="x-count">${nscListe.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('nscliste')" title="Hilfe zur NSC-Liste"></i>
                </div>
                ${nscListe.length > 1 ? `<div class="nsc-head-actions" onclick="event.preventDefault(); event.stopPropagation()">
                    <select id="nsc-sortierung" class="x-select">
                        <option value="reihenfolge" ${nscListeSortierung === 'reihenfolge' ? 'selected' : ''}>Neueste zuerst</option>
                        <option value="ort" ${nscListeSortierung === 'ort' ? 'selected' : ''}>Nach Ort</option>
                        <option value="name" ${nscListeSortierung === 'name' ? 'selected' : ''}>Nach Name</option>
                        <option value="haltung" ${nscListeSortierung === 'haltung' ? 'selected' : ''}>Nach Haltung</option>
                    </select>
                </div>` : ''}
            </summary>
            <div class="nsc-form">
                <input type="text" id="nsc-neu-name" class="x-input nsc-input" placeholder="Name …" onkeydown="if(event.key==='Enter') nscListeManuellHinzufuegen()">
                <input type="text" id="nsc-neu-ort" class="x-input nsc-input" placeholder="Ort (optional)" onkeydown="if(event.key==='Enter') nscListeManuellHinzufuegen()">
                <input type="text" id="nsc-neu-rolle" class="x-input nsc-input" placeholder="Rolle (optional)" onkeydown="if(event.key==='Enter') nscListeManuellHinzufuegen()">
                <button class="tool-btn" onclick="nscListeManuellHinzufuegen()"><i class="fa-solid fa-plus"></i> Hinzufügen</button>
            </div>
            <div class="nsc-list">${zeilen || '<div class="x-leer">Noch keine NSCs. Trag welche ein oder übernimm sie direkt aus dem Zufallsgenerator.</div>'}</div>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => {
        nscListeOffen = details.open;
        try { localStorage.setItem(NSC_LISTE_OFFEN_KEY, details.open ? '1' : '0'); } catch (e) { /* egal */ }
    });
    const sortSel = document.getElementById('nsc-sortierung');
    if (sortSel) sortSel.addEventListener('change', () => {
        nscListeSortierung = sortSel.value;
        try { localStorage.setItem(NSC_SORTIERUNG_KEY, sortSel.value); } catch (e) { /* egal */ }
        renderNscListeGm();
    });
    box.querySelectorAll('[data-nscdel]').forEach(b => b.addEventListener('click', () => nscListeEntfernen(b.dataset.nscdel)));
    box.querySelectorAll('[data-nsckarte]').forEach(b => b.addEventListener('click', () => {
        const n = nscListe.find(x => x.id === b.dataset.nsckarte);
        if (n && typeof karteNsPlatzieren === 'function') karteNsPlatzieren(n);
    }));
    box.querySelectorAll('[data-nscnotiz]').forEach(t => {
        nscNotizAutoSize(t);
        t.addEventListener('input', () => { nscNotizAutoSize(t); nscListeFeldAendern(t.dataset.nscnotiz, 'notiz', t.value); });
    });
}

function nscNotizAutoSize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    nscListeLaden();
    renderNscListeGm();
});
