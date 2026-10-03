// How to be a Hero - Beziehungsnetz (SL-Mindmap für Helden & NSCs)
//
// Reines SL-Werkzeug zum Visualisieren von Beziehungen zwischen den Helden der
// Gruppe und den eigenen NSCs (nscliste.js) - frei verschiebbare Knoten auf
// einer zoom-/pan-baren Fläche, verbunden durch beschriftete Linien ("hasst",
// "schuldet Geld", ...). Bleibt komplett lokal beim SL, geht nie an Spieler
// raus - wie die NSC-Liste selbst.
//
// Knoten kommen aus zwei Quellen:
//  - Helden (netzwerkPcs): simple Namensliste, die der SL hier selbst pflegt -
//    bewusst UNABHÄNGIG von der Live-Multiplayer-Verbindung, damit das Netz
//    auch für Helden funktioniert, die gerade nicht online sind, und über
//    Reloads/Sessions hinweg stabil bleibt (anders als connectedPlayersData
//    in multiplayer.js, das beim Trennen sofort gelöscht wird).
//  - NSCs: direkt aus der bestehenden nscListe (nscliste.js) - keine eigene
//    Kopie, damit Name/Löschen dort automatisch hier mit durchschlägt. Siehe
//    netzwerkKnoten().
//
// Beziehungen (netzwerkRelationen) referenzieren beide Knotentypen über eine
// gemeinsame ID (Helden-IDs sind "pc_...", NSC-IDs schon immer "nsc_..." -
// keine Kollisionsgefahr), damit eine Relation egal zwischen welchen zwei
// Knotentypen funktioniert, ohne das zu unterscheiden.
//
// Technik (Pan/Zoom/Drag) ist 1:1 vom Prototyp eines Users übernommen
// (Downloads/QuestLog), nur auf unser Datenmodell und unsere UI-Konventionen
// (x-details, gm-btn, help-modal) umgestellt.

const NETZWERK_KEY = 'htbah_gm_netzwerk';
const NETZWERK_BOARD_GROESSE = 4000;
const NETZWERK_BOARD_MITTE = NETZWERK_BOARD_GROESSE / 2;

let netzwerkPcs = [];
let netzwerkRelationen = [];
let netzwerkPositionen = {}; // { [knotenId]: {x, y} }

// Pan/Zoom-Zustand - bewusst nicht persistiert, startet jedes Mal zentriert.
let nwScale = 1;
let nwPanX = 0;
let nwPanY = 0;
let nwIstAmPannen = false;
let nwPanStartX = 0, nwPanStartY = 0;
let nwGezogenerKnoten = null;
let nwKnotenOffsetX = 0, nwKnotenOffsetY = 0;
let nwEventsEingerichtet = false;
let nwBearbeiteId = null;

function netzwerkNeueId() {
    return 'pc_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function netzwerkLaden() {
    try {
        const roh = localStorage.getItem(NETZWERK_KEY);
        const daten = roh ? JSON.parse(roh) : null;
        netzwerkPcs = (daten && Array.isArray(daten.pcs)) ? daten.pcs : [];
        netzwerkRelationen = (daten && Array.isArray(daten.relationen)) ? daten.relationen : [];
        netzwerkPositionen = (daten && typeof daten.positionen === 'object' && daten.positionen) ? daten.positionen : {};
    } catch (e) { netzwerkPcs = []; netzwerkRelationen = []; netzwerkPositionen = {}; }
}

function netzwerkSichern() {
    sicherSpeichern(NETZWERK_KEY, JSON.stringify({ pcs: netzwerkPcs, relationen: netzwerkRelationen, positionen: netzwerkPositionen }));
}

// Alle Knoten zusammen - Helden aus der eigenen Liste, NSCs live aus nscListe
// (nscliste.js). Typ steuert nur die Optik (Farbe) und ob der Name hier
// editierbar ist (NSC-Namen gehören der NSC-Liste, nicht uns).
function netzwerkKnoten() {
    const pcs = netzwerkPcs.map(p => ({ id: p.id, name: p.name, typ: 'pc' }));
    const nscs = (typeof nscListe !== 'undefined' ? nscListe : []).map(n => ({ id: n.id, name: n.name, typ: 'nsc' }));
    return pcs.concat(nscs);
}

function netzwerkKnotenFinden(id) {
    return netzwerkKnoten().find(k => k.id === id) || null;
}

function netzwerkPcHinzufuegen() {
    const input = document.getElementById('nw-neu-held');
    const name = (input ? input.value : '').trim();
    if (!name) { if (input) input.focus(); return; }
    netzwerkPcs.push({ id: netzwerkNeueId(), name });
    netzwerkSichern();
    if (input) { input.value = ''; input.focus(); }
    renderNetzwerkGm();
}

function netzwerkPcEntfernen(id) {
    if (!confirm('Diesen Helden aus dem Beziehungsnetz entfernen?')) return;
    netzwerkPcs = netzwerkPcs.filter(p => p.id !== id);
    netzwerkRelationen = netzwerkRelationen.filter(r => r.vonId !== id && r.zuId !== id);
    delete netzwerkPositionen[id];
    netzwerkSichern();
    netzwerkModalSchliessen();
    renderNetzwerkGm();
}

// Von nscliste.js aufgerufen, nachdem ein NSC dort gelöscht wurde - räumt
// Relationen/Position auf (wir halten keine eigene NSC-Kopie, siehe oben).
function netzwerkNscGeloescht(id) {
    netzwerkRelationen = netzwerkRelationen.filter(r => r.vonId !== id && r.zuId !== id);
    delete netzwerkPositionen[id];
    netzwerkSichern();
    renderNetzwerkGm();
}

function netzwerkPcUmbenennen(id, name) {
    const pc = netzwerkPcs.find(p => p.id === id);
    if (!pc) return;
    pc.name = String(name || '').trim() || pc.name;
    netzwerkSichern();
    renderNetzwerkGm();
}

function netzwerkRelationHinzufuegen() {
    if (!nwBearbeiteId) return;
    const zielSel = document.getElementById('nw-relation-ziel');
    const typInput = document.getElementById('nw-relation-typ');
    const zuId = zielSel ? zielSel.value : '';
    const label = (typInput ? typInput.value : '').trim() || 'kennt';
    if (!zuId) return;
    netzwerkRelationen.push({ id: netzwerkNeueId(), vonId: nwBearbeiteId, zuId, label });
    netzwerkSichern();
    if (typInput) typInput.value = '';
    netzwerkModalOeffnen(nwBearbeiteId);
    renderNetzwerkNur();
}

function netzwerkRelationEntfernen(id) {
    netzwerkRelationen = netzwerkRelationen.filter(r => r.id !== id);
    netzwerkSichern();
    netzwerkModalOeffnen(nwBearbeiteId);
    renderNetzwerkNur();
}

// Helden im Kreis anordnen (wie beim ersten Rendern/Reset) - NSCs mit, damit
// sich ein unübersichtlich gewordenes Netz wieder sortieren lässt.
function netzwerkAnordnen() {
    const knoten = netzwerkKnoten();
    const radius = Math.max(250, knoten.length * 25);
    knoten.forEach((k, i) => {
        const winkel = (i / Math.max(1, knoten.length)) * Math.PI * 2;
        netzwerkPositionen[k.id] = {
            x: NETZWERK_BOARD_MITTE + Math.cos(winkel) * radius,
            y: NETZWERK_BOARD_MITTE + Math.sin(winkel) * radius
        };
    });
    netzwerkSichern();
    renderNetzwerkNur();
}

function netzwerkPosition(id) {
    if (!netzwerkPositionen[id]) {
        netzwerkPositionen[id] = {
            x: NETZWERK_BOARD_MITTE + (Math.random() * 300 - 150),
            y: NETZWERK_BOARD_MITTE + (Math.random() * 300 - 150)
        };
    }
    return netzwerkPositionen[id];
}

// --- Bearbeiten-Modal (Name/Löschen bei Helden, Beziehungen bei beiden) ----

function netzwerkModalOeffnen(id) {
    const knoten = netzwerkKnotenFinden(id);
    if (!knoten) return;
    nwBearbeiteId = id;
    const body = document.getElementById('netzwerk-modal-body');
    if (!body) return;

    const andereKnoten = netzwerkKnoten().filter(k => k.id !== id);
    const optionen = andereKnoten.map(k => `<option value="${escapeHtml(k.id)}">${escapeHtml(k.name)} ${k.typ === 'pc' ? '(Held)' : '(NSC)'}</option>`).join('');

    const relationenZeilen = netzwerkRelationen
        .filter(r => r.vonId === id || r.zuId === id)
        .map(r => {
            const istVon = r.vonId === id;
            const gegenueber = netzwerkKnotenFinden(istVon ? r.zuId : r.vonId);
            const pfeil = istVon ? '➔' : '⬅';
            return `<li class="nw-relation-item">
                <span><strong>${escapeHtml(r.label)}</strong> ${pfeil} ${escapeHtml(gegenueber ? gegenueber.name : 'Unbekannt')}</span>
                <button class="x-mini x-mini-danger" data-nwrelweg="${escapeHtml(r.id)}" title="Beziehung löschen"><i class="fa-solid fa-xmark"></i></button>
            </li>`;
        }).join('');

    body.innerHTML = `
        <h3><i class="fa-solid fa-diagram-project"></i> ${knoten.typ === 'pc' ? 'Held' : 'NSC'}: ${escapeHtml(knoten.name)}</h3>
        ${knoten.typ === 'pc'
            ? `<label style="display:block; margin-bottom:0.6rem;">Name<br><input type="text" id="nw-edit-name" class="x-input" style="width:100%; margin-top:0.2rem;" value="${escapeHtml(knoten.name)}"></label>`
            : `<p class="ir-hint" style="margin:0 0 0.6rem 0;">Name wird über die NSC-Liste gepflegt.</p>`}
        <hr style="border-color: var(--panel-border); margin: 0.8rem 0;">
        <label style="display:block; margin-bottom:0.4rem;">Neue Beziehung</label>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.6rem;">
            <select id="nw-relation-ziel" class="x-select" style="flex:1; min-width:140px;"><option value="">- Ziel wählen -</option>${optionen}</select>
            <input type="text" id="nw-relation-typ" class="x-input" placeholder="z.B. misstraut" style="flex:1; min-width:120px;">
            <button class="gm-btn" onclick="netzwerkRelationHinzufuegen()"><i class="fa-solid fa-plus"></i></button>
        </div>
        <ul class="nw-relation-liste">${relationenZeilen || '<li class="x-leer">Noch keine Beziehungen.</li>'}</ul>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.8rem;">
            ${knoten.typ === 'pc' ? `<button class="gm-btn" style="color:#ed4245;" onclick="netzwerkPcEntfernen('${escapeHtml(id)}')"><i class="fa-solid fa-trash"></i> Löschen</button>` : '<span></span>'}
            <button class="gm-btn gm-btn-ghost" onclick="netzwerkModalSchliessen()">Schließen</button>
        </div>`;

    if (knoten.typ === 'pc') {
        const nameInput = document.getElementById('nw-edit-name');
        if (nameInput) nameInput.addEventListener('change', () => netzwerkPcUmbenennen(id, nameInput.value));
    }
    body.querySelectorAll('[data-nwrelweg]').forEach(b => b.addEventListener('click', () => netzwerkRelationEntfernen(b.dataset.nwrelweg)));

    const overlay = document.getElementById('netzwerk-modal-overlay');
    if (overlay) overlay.classList.add('active');
}

function netzwerkModalSchliessen() {
    nwBearbeiteId = null;
    const overlay = document.getElementById('netzwerk-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    renderNetzwerkNur();
}

// --- Pan/Zoom/Drag ----------------------------------------------------------

function netzwerkTransformAnwenden() {
    const board = document.getElementById('nw-board');
    const layer = document.getElementById('nw-thread-layer');
    if (board) board.style.transform = `translate(${nwPanX}px, ${nwPanY}px) scale(${nwScale})`;
    if (layer) layer.style.transform = `translate(${nwPanX}px, ${nwPanY}px) scale(${nwScale})`;
}

function netzwerkZentrieren() {
    const container = document.getElementById('nw-board-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    nwScale = 1;
    nwPanX = rect.width / 2 - NETZWERK_BOARD_MITTE;
    nwPanY = rect.height / 2 - NETZWERK_BOARD_MITTE;
    netzwerkTransformAnwenden();
}

// Jede komplette Neuaufbau-Runde von renderNetzwerkGm() (z.B. nach dem
// Hinzufügen eines Helden) ersetzt #nw-board-container per innerHTML durch
// ein frisches Element - ein einmaliger globaler "schon eingerichtet"-Schalter
// würde die Maus-Listener also nur beim allerersten Container anbringen und
// bei jedem späteren Container (derselben id, aber ein neues DOM-Objekt)
// stillschweigend leer laufen. Deshalb hier zwei getrennte Schalter: die
// Fenster-weiten Listener (mousemove/mouseup) nur einmal für die gesamte
// Seite, die Container-Listener (mousedown/wheel) bei JEDEM neuen Container.
function netzwerkEventsEinrichten() {
    const container = document.getElementById('nw-board-container');
    if (!container) return;

    // Fenster-weite Listener: nur einmal für die gesamte Seite nötig, lesen
    // den Container bei jedem Mausereignis frisch aus dem DOM statt ihn per
    // Closure festzuhalten - so bleiben sie auch nach einem Neuaufbau korrekt.
    if (!nwEventsEingerichtet) {
        nwEventsEingerichtet = true;
        window.addEventListener('mousemove', (e) => {
            if (nwGezogenerKnoten) {
                const aktuellerContainer = document.getElementById('nw-board-container');
                if (!aktuellerContainer) return;
                const rect = aktuellerContainer.getBoundingClientRect();
                const mausX = (e.clientX - rect.left - nwPanX) / nwScale;
                const mausY = (e.clientY - rect.top - nwPanY) / nwScale;
                const pos = netzwerkPosition(nwGezogenerKnoten.dataset.id);
                pos.x = mausX - nwKnotenOffsetX;
                pos.y = mausY - nwKnotenOffsetY;
                nwGezogenerKnoten.style.left = pos.x + 'px';
                nwGezogenerKnoten.style.top = pos.y + 'px';
                netzwerkLinienZeichnen();
                return;
            }
            if (nwIstAmPannen) {
                nwPanX = e.clientX - nwPanStartX;
                nwPanY = e.clientY - nwPanStartY;
                netzwerkTransformAnwenden();
            }
        });
        window.addEventListener('mouseup', () => {
            if (nwGezogenerKnoten) { nwGezogenerKnoten = null; netzwerkSichern(); }
            nwIstAmPannen = false;
        });
    }

    // Container-Listener: der Container ist bei jedem renderNetzwerkGm()-Aufruf
    // ein neues DOM-Objekt (innerHTML-Neuaufbau), daher per dataset-Flag am
    // jeweiligen Element selbst markiert statt über einen globalen Schalter.
    if (container.dataset.nwEventsGebunden) return;
    container.dataset.nwEventsGebunden = '1';

    container.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        const node = e.target.closest('.nw-node');
        if (node) {
            nwGezogenerKnoten = node;
            const rect = container.getBoundingClientRect();
            const pos = netzwerkPosition(node.dataset.id);
            const mausX = (e.clientX - rect.left - nwPanX) / nwScale;
            const mausY = (e.clientY - rect.top - nwPanY) / nwScale;
            nwKnotenOffsetX = mausX - pos.x;
            nwKnotenOffsetY = mausY - pos.y;
            e.stopPropagation();
            return;
        }
        nwIstAmPannen = true;
        nwPanStartX = e.clientX - nwPanX;
        nwPanStartY = e.clientY - nwPanY;
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const mausX = e.clientX - rect.left, mausY = e.clientY - rect.top;
        const vorX = (mausX - nwPanX) / nwScale, vorY = (mausY - nwPanY) / nwScale;
        nwScale = Math.min(Math.max(0.3, nwScale - e.deltaY * 0.001), 2.5);
        nwPanX = mausX - vorX * nwScale;
        nwPanY = mausY - vorY * nwScale;
        netzwerkTransformAnwenden();
    });
}

// --- Rendering ---------------------------------------------------------------

// Zeichnet nur Knoten+Linien neu (z.B. nach dem Hinzufügen/Löschen einer
// Beziehung), ohne den Panel-Rahmen samt Toolbar/Formular neu aufzubauen -
// sonst würde jedes Mal der Pan/Zoom-Zustand mit verloren gehen.
function netzwerkLinienZeichnen() {
    const layer = document.getElementById('nw-thread-layer');
    if (!layer) return;
    layer.innerHTML = '';
    netzwerkRelationen.forEach(r => {
        const vonEl = document.querySelector(`.nw-node[data-id="${r.vonId}"]`);
        const zuEl = document.querySelector(`.nw-node[data-id="${r.zuId}"]`);
        if (!vonEl || !zuEl) return;
        const vonPos = netzwerkPosition(r.vonId), zuPos = netzwerkPosition(r.zuId);
        const x1 = vonPos.x + vonEl.offsetWidth / 2, y1 = vonPos.y + vonEl.offsetHeight / 2;
        const x2 = zuPos.x + zuEl.offsetWidth / 2, y2 = zuPos.y + zuEl.offsetHeight / 2;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'nw-linie');
        line.setAttribute('x1', x1); line.setAttribute('y1', y1);
        line.setAttribute('x2', x2); line.setAttribute('y2', y2);
        layer.appendChild(line);

        if (r.label) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('class', 'nw-linie-label');
            text.setAttribute('x', (x1 + x2) / 2);
            text.setAttribute('y', (y1 + y2) / 2 - 6);
            text.textContent = r.label;
            layer.appendChild(text);
        }
    });
}

function renderNetzwerkNur() {
    const board = document.getElementById('nw-board');
    if (!board) return;
    board.innerHTML = '';
    netzwerkKnoten().forEach(k => {
        const pos = netzwerkPosition(k.id);
        const el = document.createElement('div');
        el.className = `nw-node nw-node-${k.typ}`;
        el.dataset.id = k.id;
        el.style.left = pos.x + 'px';
        el.style.top = pos.y + 'px';
        el.textContent = k.name;
        el.title = 'Klicken zum Bearbeiten, ziehen zum Verschieben';
        el.addEventListener('click', (e) => {
            // Klick nach einem Dreh (Drag) nicht versehentlich als Öffnen werten.
            if (nwGezogenerKnoten) return;
            netzwerkModalOeffnen(k.id);
        });
        board.appendChild(el);
    });
    netzwerkLinienZeichnen();
}

function renderNetzwerkGm() {
    const box = document.getElementById('gm-netzwerk');
    if (!box) return;
    const warOffen = !!box.querySelector('.x-details[open]');

    box.innerHTML = `
        <details class="x-details nw-details" ${warOffen ? 'open' : ''}>
            <summary class="nsc-head">
                <div class="nsc-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-diagram-project"></i> Beziehungsnetz
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('netzwerk')" title="Hilfe zum Beziehungsnetz"></i>
                </div>
            </summary>
            <div class="nsc-form">
                <input type="text" id="nw-neu-held" class="x-input nsc-input" placeholder="Neuer Held …" onkeydown="if(event.key==='Enter') netzwerkPcHinzufuegen()">
                <button class="tool-btn" onclick="netzwerkPcHinzufuegen()"><i class="fa-solid fa-plus"></i> Held</button>
                <button class="gm-btn gm-btn-ghost" onclick="netzwerkAnordnen()"><i class="fa-solid fa-circle-nodes"></i> Neu anordnen</button>
            </div>
            <div class="nw-board-container" id="nw-board-container">
                <svg id="nw-thread-layer" class="nw-thread-layer"></svg>
                <div id="nw-board" class="nw-board"></div>
            </div>
        </details>`;

    const details = box.querySelector('details');
    if (details) {
        details.addEventListener('toggle', () => {
            if (details.open) {
                netzwerkEventsEinrichten();
                netzwerkZentrieren();
                renderNetzwerkNur();
            }
        });
        if (details.open) {
            netzwerkEventsEinrichten();
            netzwerkZentrieren();
            renderNetzwerkNur();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    netzwerkLaden();
    renderNetzwerkGm();
});
