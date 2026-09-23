// How to be a Hero - NSC-Liste (SL-Gedächtnis für eigene Nichtspielercharaktere)
//
// Reine Merkliste für den SL: NPCs, die im Laufe der Runde auftauchen - egal ob
// von Hand eingetragen oder direkt aus dem Zufallsgenerator übernommen (Knopf
// "In NSC-Liste übernehmen" beim NSC-Ergebnis, siehe randomizer.js). Bleibt
// komplett lokal beim SL, geht nie an Spieler raus - anders als die Tischmitte
// gibt es hier auch kein "Aufdecken", das wäre hier gar nicht der Punkt.
//
// Eintrag: { id, name, ort, rolle, haltung, auffaelligkeit, motivation, wesen, notiz, bild }
// notiz ist frei editierbar - der Platz für "wie es mit dem NSC weiterging".
// bild (optional, Data-URL) ist das Karten-Icon dieses NSCs - wird beim
// Platzieren (karten.js: karteNsPlatzieren) als Kartentoken-Porträt gesetzt
// UND auf jeden bereits platzierten Token automatisch nachgezogen, sobald es
// sich ändert (karteNscBilderAnwenden) - battlemap.js hält Porträts bewusst
// außerhalb seines eigenen synchronisierten Zustands (siehe dort), die
// Quelle der Wahrheit ist hier in der NSC-Liste. Bleibt (wie der Rest der
// Liste) rein SL-seitig - Spieler sehen weiterhin nur Name/Farbe ihrer
// Kartentoken, keine NSC-Bilder.

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
        notiz: String((vorlage && vorlage.notiz) || '').slice(0, 2000),
        bild: (vorlage && vorlage.bild) || null
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

// Karten-Icon setzen - verkleinert über battlemap.js' eigenes bildVerkleinern
// (kompakte 240px-Kante statt der 1800px eines Kartenhintergrunds, das hier
// landet ja nur als kleines Kreis-Token, siehe karteNscBilderAnwenden).
function nscListeBildHochladen(id, ereignis) {
    const datei = ereignis.target.files && ereignis.target.files[0];
    if (!datei || typeof BattleMap === 'undefined') return;
    BattleMap.bildVerkleinern(datei, 240, 0.75).then(res => {
        const eintrag = nscListe.find(n => n.id === id);
        if (!eintrag) return;
        eintrag.bild = res.dataUrl;
        nscListeSichern();
        renderNscListeGm();
        if (typeof karteNscBilderAnwenden === 'function') karteNscBilderAnwenden();
    }).catch(() => { alert('Bild konnte nicht geladen werden.'); });
    ereignis.target.value = '';
}

function nscListeBildEntfernen(id) {
    const eintrag = nscListe.find(n => n.id === id);
    if (!eintrag) return;
    eintrag.bild = null;
    nscListeSichern();
    renderNscListeGm();
    if (typeof karteNscBilderAnwenden === 'function') karteNscBilderAnwenden();
}

// Klont einen NSC mit fortlaufender Nummer im Namen - für Gruppen identischer
// Gegner ("Wache", "Wache 2", "Wache 3", ...). Zählt über ALLE Einträge mit
// demselben Namensstamm (nicht nur den gerade geklickten), damit auch
// wiederholtes Duplizieren derselben oder einer bereits nummerierten Kopie
// sauber weiterzählt, statt Nummern zu wiederholen.
function nscListeDuplizieren(id) {
    const original = nscListe.find(n => n.id === id);
    if (!original) return;
    const stamm = (original.name.match(/^(.*?)\s+\d+$/) || [null, original.name])[1].trim() || original.name;
    const stammEscaped = stamm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const vorhandeneNummern = nscListe
        .map(n => (n.name.match(new RegExp('^' + stammEscaped + '\\s+(\\d+)$')) || [])[1])
        .filter(Boolean)
        .map(Number);
    const naechsteNummer = (vorhandeneNummern.length ? Math.max(...vorhandeneNummern) : 1) + 1;
    const kopie = JSON.parse(JSON.stringify(original));
    kopie.id = nscNeueId();
    kopie.name = `${stamm} ${naechsteNummer}`;
    nscListe = [kopie].concat(nscListe);
    nscListeSichern();
    nscListeOffen = true;
    renderNscListeGm();
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
                <label style="cursor:pointer; display:inline-flex;" title="Karten-Icon hochladen (wird auf platzierten Kartentoken übernommen)">
                    ${n.bild ? `<img class="gr-bild" src="${n.bild}" alt="">` : `<span class="gr-bild gr-bild-leer"><i class="fa-solid fa-image"></i></span>`}
                    <input type="file" accept="image/*" style="display:none" data-nscbild="${escapeHtml(n.id)}">
                </label>
                ${n.bild ? `<button class="x-mini" data-nscbildweg="${escapeHtml(n.id)}" title="Icon entfernen"><i class="fa-solid fa-xmark"></i></button>` : ''}
                <span class="nsc-name">${escapeHtml(n.name)}</span>
                ${n.ort ? `<span class="nsc-badge"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(n.ort)}</span>` : ''}
                ${n.rolle ? `<span class="nsc-badge">${escapeHtml(n.rolle)}</span>` : ''}
                ${n.haltung ? `<span class="status-badge ${ton}">${escapeHtml(n.haltung)}</span>` : ''}
                ${typeof karteNsPlatzieren === 'function' && typeof eldaraAktiv === 'function' && eldaraAktiv() ? `<button class="x-mini" data-nsckarte="${escapeHtml(n.id)}" title="Auf Karte platzieren"><i class="fa-solid fa-map-location-dot"></i></button>` : ''}
                <button class="x-mini" data-nscdup="${escapeHtml(n.id)}" title="Duplizieren (z.B. Wache 2, Wache 3, ...)"><i class="fa-solid fa-copy"></i></button>
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
    box.querySelectorAll('[data-nscdup]').forEach(b => b.addEventListener('click', () => nscListeDuplizieren(b.dataset.nscdup)));
    box.querySelectorAll('[data-nscbild]').forEach(inp => inp.addEventListener('change', (e) => nscListeBildHochladen(inp.dataset.nscbild, e)));
    box.querySelectorAll('[data-nscbildweg]').forEach(b => b.addEventListener('click', () => nscListeBildEntfernen(b.dataset.nscbildweg)));
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
