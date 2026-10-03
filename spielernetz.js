// How to be a Hero - Mein Beziehungsnetz (eigene Mindmap des Spielers)
//
// Wunsch aus der Runde: Spieler sollen wie der SL (netzwerk.js) ein
// Beziehungsnetz bekommen, verknüpft mit dem eigenen Logbuch (spielerlog.js).
// Lebt wie Inventar und Logbuch in appData (wandert beim "Speichern (JSON)"
// mit, taucht im GM-Dashboard nirgends auf). Knoten sind frei eingetippte
// Namen - Spieler haben keinen Zugriff auf die NSC-Liste des SL.
//
// Verknüpfung mit dem Logbuch auf zwei Wegen:
//  - automatisch über den NSC-Namen: ein Knoten zeigt alle Logbuch-Einträge,
//    deren NSC-Feld genauso heißt (Groß-/Kleinschreibung egal), und
//    "Aus Logbuch übernehmen" legt für jeden dort genannten NSC einen Knoten an
//  - gezielt pro Beziehung: optional ein Logbuch-Eintrag als Beleg
//
// appData.beziehungsnetz = { knoten: [{id, name, x, y, ich?}], relationen:
//   [{id, vonId, zuId, label, logId?}] } - der eigene Charakter ist der Knoten
// mit ich:true, sein Anzeigename kommt live aus Vor-/Nachname.
//
// Bedienung per Pointer Events (nicht Maus-Events wie netzwerk.js), weil
// Spieler oft am Handy sind: Ziehen/Verschieben geht dort per Finger, Zoomen
// über die +/- Knöpfe (am PC zusätzlich Strg + Mausrad). CSS-Klassen nw-* kommen aus
// style.css (gemeinsam mit netzwerk.js).

const SN_BOARD_GROESSE = 4000;
const SN_BOARD_MITTE = SN_BOARD_GROESSE / 2;
const SN_OFFEN_KEY = 'htbah_spielernetz_offen';

let spielernetzOffen = false;
try { spielernetzOffen = localStorage.getItem(SN_OFFEN_KEY) === '1'; } catch (e) { /* egal */ }

let snScale = 1, snPanX = 0, snPanY = 0;
let snZentriert = false;
let snPannt = false, snPanStartX = 0, snPanStartY = 0;
let snGezogen = null, snOffsetX = 0, snOffsetY = 0, snBewegt = false, snDownX = 0, snDownY = 0;
let snFensterListenerAktiv = false;
let snBearbeiteId = null;

function snNeueId() {
    return 'sn_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function snDaten() {
    if (!appData.beziehungsnetz || typeof appData.beziehungsnetz !== 'object') appData.beziehungsnetz = {};
    const d = appData.beziehungsnetz;
    if (!Array.isArray(d.knoten)) d.knoten = [];
    if (!Array.isArray(d.relationen)) d.relationen = [];
    if (!d.knoten.some(k => k.ich)) {
        d.knoten.unshift({ id: 'sn_ich', ich: true, x: SN_BOARD_MITTE, y: SN_BOARD_MITTE });
    }
    return d;
}

function snKnotenName(k) {
    if (!k) return 'Unbekannt';
    if (k.ich) return [appData.vorname, appData.name].filter(Boolean).join(' ') || 'Ich';
    return k.name || 'Unbenannt';
}

function snKnoten(id) {
    return snDaten().knoten.find(k => k.id === id) || null;
}

function snLogbuch() {
    return Array.isArray(appData.questlog) ? appData.questlog : [];
}

function snLogbuchEintraegeFuer(k) {
    const name = snKnotenName(k).trim().toLowerCase();
    if (!name || k.ich) return [];
    return snLogbuch().filter(e => (e.npc || '').trim().toLowerCase() === name);
}

function snKurz(text, n) {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

function snKnotenHinzufuegen(rohName) {
    const name = String(rohName || '').trim().slice(0, 80);
    if (!name) return null;
    const d = snDaten();
    const vorhanden = d.knoten.find(k => !k.ich && snKnotenName(k).toLowerCase() === name.toLowerCase());
    if (vorhanden) return vorhanden;
    const k = {
        id: snNeueId(), name,
        x: SN_BOARD_MITTE + (Math.random() * 500 - 250),
        y: SN_BOARD_MITTE + (Math.random() * 500 - 250)
    };
    d.knoten.push(k);
    return k;
}

function snKnotenAusEingabe() {
    const input = document.getElementById('sn-neu-name');
    const k = snKnotenHinzufuegen(input ? input.value : '');
    if (!k) { if (input) input.focus(); return; }
    saveData();
    renderSpielernetz();
    const neu = document.getElementById('sn-neu-name');
    if (neu) neu.focus();
}

function snAusLogbuchUebernehmen() {
    let neu = 0;
    const d = snDaten();
    snLogbuch().forEach(e => {
        const name = (e.npc || '').trim();
        if (!name) return;
        if (!d.knoten.some(k => !k.ich && snKnotenName(k).toLowerCase() === name.toLowerCase())) {
            snKnotenHinzufuegen(name);
            neu++;
        }
    });
    saveData();
    renderSpielernetz();
    snHinweis(neu ? `${neu} NSC${neu === 1 ? '' : 's'} aus dem Logbuch übernommen.` : 'Alle NSCs aus dem Logbuch sind schon im Netz.');
}

function snHinweis(text) {
    const el = document.getElementById('sn-hinweis');
    if (!el) return;
    el.textContent = text;
    clearTimeout(snHinweis._t);
    snHinweis._t = setTimeout(() => { el.textContent = ''; }, 4000);
}

function snKnotenEntfernen(id) {
    const k = snKnoten(id);
    if (!k || k.ich) return;
    if (!confirm(`„${snKnotenName(k)}" aus deinem Beziehungsnetz entfernen? Logbuch-Einträge bleiben erhalten.`)) return;
    const d = snDaten();
    d.knoten = d.knoten.filter(x => x.id !== id);
    d.relationen = d.relationen.filter(r => r.vonId !== id && r.zuId !== id);
    saveData();
    snModalSchliessen();
}

function snUmbenennen(id, name) {
    const k = snKnoten(id);
    const neu = String(name || '').trim().slice(0, 80);
    if (!k || k.ich || !neu) return;
    k.name = neu;
    saveData();
    renderSpielernetz();
}

function snRelationHinzufuegen() {
    if (!snBearbeiteId) return;
    const ziel = document.getElementById('sn-relation-ziel');
    const typ = document.getElementById('sn-relation-typ');
    const log = document.getElementById('sn-relation-log');
    if (!ziel || !ziel.value) return;
    const r = { id: snNeueId(), vonId: snBearbeiteId, zuId: ziel.value, label: (typ ? typ.value : '').trim() || 'kennt' };
    if (log && log.value) r.logId = log.value;
    snDaten().relationen.push(r);
    saveData();
    snModalOeffnen(snBearbeiteId);
}

function snRelationEntfernen(id) {
    const d = snDaten();
    d.relationen = d.relationen.filter(r => r.id !== id);
    saveData();
    snModalOeffnen(snBearbeiteId);
}

function snAnordnen() {
    const d = snDaten();
    const andere = d.knoten.filter(x => !x.ich);
    // Ellipse statt Kreis: am Handy ist das Board schmal und hoch, ein
    // gleichmäßiger Kreis würde seitlich über den Rand ragen.
    const c = document.getElementById('sn-board-container');
    const breite = c ? c.getBoundingClientRect().width : 600;
    const ry = Math.max(160, andere.length * 28);
    const rx = Math.max(80, Math.min(ry, breite / 2 - 120));
    // x/y sind die linke obere Ecke eines Knotens - ca. halbe Knotenbreite
    // abziehen, damit die Anordnung optisch in der Mitte sitzt.
    const ox = SN_BOARD_MITTE - 55;
    d.knoten.forEach(k => {
        if (k.ich) { k.x = ox; k.y = SN_BOARD_MITTE; return; }
        const w = (andere.indexOf(k) / Math.max(1, andere.length)) * Math.PI * 2 - Math.PI / 2;
        k.x = ox + Math.cos(w) * rx;
        k.y = SN_BOARD_MITTE + Math.sin(w) * ry;
    });
    saveData();
    snZentrieren();
    snBoardZeichnen();
}

// --- Bearbeiten-Fenster ---------------------------------------------------

function snModalOeffnen(id) {
    const k = snKnoten(id);
    const body = document.getElementById('spielernetz-modal-body');
    if (!k || !body) return;
    snBearbeiteId = id;
    const d = snDaten();

    const andere = d.knoten.filter(x => x.id !== id);
    const zielOptionen = andere.map(x => `<option value="${escapeHtml(x.id)}">${escapeHtml(snKnotenName(x))}</option>`).join('');
    const logOptionen = snLogbuch().map(e =>
        `<option value="${escapeHtml(e.id)}">${escapeHtml((e.npc ? e.npc + ' – ' : '') + snKurz(e.text, 40))}</option>`).join('');

    const relationen = d.relationen.filter(r => r.vonId === id || r.zuId === id).map(r => {
        const istVon = r.vonId === id;
        const gegenueber = snKnoten(istVon ? r.zuId : r.vonId);
        const eintrag = r.logId ? snLogbuch().find(e => e.id === r.logId) : null;
        return `<li class="nw-relation-item" style="flex-wrap:wrap;">
            <span><strong>${escapeHtml(r.label)}</strong> ${istVon ? '➔' : '⬅'} ${escapeHtml(snKnotenName(gegenueber))}</span>
            <button class="x-mini x-mini-danger" data-snrelweg="${escapeHtml(r.id)}" title="Beziehung löschen"><i class="fa-solid fa-xmark"></i></button>
            ${eintrag ? `<span class="ir-hint" style="flex-basis:100%; margin:0;"><i class="fa-solid fa-feather-pointed"></i> ${escapeHtml(snKurz(eintrag.text, 140))}</span>` : ''}
        </li>`;
    }).join('');

    const logEintraege = snLogbuchEintraegeFuer(k).map(e =>
        `<li class="nw-relation-item"><span>${e.zeitpunkt ? `<strong>${escapeHtml(e.zeitpunkt)}</strong> – ` : ''}${escapeHtml(snKurz(e.text, 200))}</span></li>`).join('');

    body.innerHTML = `
        <h3><i class="fa-solid fa-diagram-project"></i> ${escapeHtml(snKnotenName(k))}</h3>
        ${k.ich
            ? `<p class="ir-hint" style="margin:0 0 0.6rem 0;">Das bist du - der Name kommt aus deinem Charakterbogen.</p>`
            : `<label style="display:block; margin-bottom:0.6rem;">Name<br><input type="text" id="sn-edit-name" class="x-input" style="width:100%; margin-top:0.2rem;" value="${escapeHtml(k.name)}"></label>`}
        <hr style="border-color: var(--panel-border); margin: 0.8rem 0;">
        <label style="display:block; margin-bottom:0.4rem;">Neue Beziehung</label>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.4rem;">
            <select id="sn-relation-ziel" class="x-select" style="flex:1; min-width:130px;"><option value="">- Ziel wählen -</option>${zielOptionen}</select>
            <input type="text" id="sn-relation-typ" class="x-input" placeholder="z.B. misstraut" style="flex:1; min-width:110px;">
        </div>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.6rem;">
            <select id="sn-relation-log" class="x-select" style="flex:1; min-width:130px;"><option value="">Kein Logbuch-Eintrag verknüpft</option>${logOptionen}</select>
            <button class="gm-btn" onclick="snRelationHinzufuegen()"><i class="fa-solid fa-plus"></i></button>
        </div>
        <ul class="nw-relation-liste">${relationen || '<li class="x-leer">Noch keine Beziehungen.</li>'}</ul>
        ${k.ich ? '' : `
        <label style="display:block; margin: 0.6rem 0 0.2rem;"><i class="fa-solid fa-feather-pointed"></i> Aus deinem Logbuch</label>
        <ul class="nw-relation-liste">${logEintraege || '<li class="x-leer">Kein Eintrag mit diesem NSC-Namen im Logbuch.</li>'}</ul>`}
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.8rem;">
            ${k.ich ? '<span></span>' : `<button class="gm-btn" style="color:#ed4245;" onclick="snKnotenEntfernen('${escapeHtml(id)}')"><i class="fa-solid fa-trash"></i> Löschen</button>`}
            <button class="gm-btn gm-btn-ghost" onclick="snModalSchliessen()">Schließen</button>
        </div>`;

    const nameInput = document.getElementById('sn-edit-name');
    if (nameInput) nameInput.addEventListener('change', () => snUmbenennen(id, nameInput.value));
    body.querySelectorAll('[data-snrelweg]').forEach(b => b.addEventListener('click', () => snRelationEntfernen(b.dataset.snrelweg)));

    const overlay = document.getElementById('spielernetz-modal-overlay');
    if (overlay) overlay.classList.add('active');
}

function snModalSchliessen() {
    snBearbeiteId = null;
    const overlay = document.getElementById('spielernetz-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    renderSpielernetz();
}

// --- Pan / Zoom / Verschieben -------------------------------------------------

function snTransformAnwenden() {
    const t = `translate(${snPanX}px, ${snPanY}px) scale(${snScale})`;
    const board = document.getElementById('sn-board');
    const layer = document.getElementById('sn-thread-layer');
    if (board) board.style.transform = t;
    if (layer) layer.style.transform = t;
}

function snZentrieren() {
    const c = document.getElementById('sn-board-container');
    if (!c) return;
    const r = c.getBoundingClientRect();
    snScale = 1;
    snPanX = r.width / 2 - SN_BOARD_MITTE;
    snPanY = r.height / 2 - SN_BOARD_MITTE;
    snZentriert = true;
    snTransformAnwenden();
}

function snZoomen(faktor, mitteX, mitteY) {
    const c = document.getElementById('sn-board-container');
    if (!c) return;
    const r = c.getBoundingClientRect();
    const mx = mitteX !== undefined ? mitteX : r.width / 2;
    const my = mitteY !== undefined ? mitteY : r.height / 2;
    const vx = (mx - snPanX) / snScale, vy = (my - snPanY) / snScale;
    snScale = Math.min(Math.max(0.3, snScale * faktor), 2.5);
    snPanX = mx - vx * snScale;
    snPanY = my - vy * snScale;
    snTransformAnwenden();
}

function snEventsEinrichten() {
    const c = document.getElementById('sn-board-container');
    if (!c) return;

    // Fensterweit nur einmal; den Container pro Ereignis frisch lesen, weil
    // renderSpielernetz() ihn bei jedem Neuaufbau durch ein neues Element ersetzt.
    if (!snFensterListenerAktiv) {
        snFensterListenerAktiv = true;
        window.addEventListener('pointermove', (e) => {
            const cont = document.getElementById('sn-board-container');
            if (!cont) return;
            if (snGezogen) {
                if (Math.abs(e.clientX - snDownX) + Math.abs(e.clientY - snDownY) > 5) snBewegt = true;
                const r = cont.getBoundingClientRect();
                const k = snKnoten(snGezogen.dataset.id);
                if (!k) return;
                k.x = (e.clientX - r.left - snPanX) / snScale - snOffsetX;
                k.y = (e.clientY - r.top - snPanY) / snScale - snOffsetY;
                snGezogen.style.left = k.x + 'px';
                snGezogen.style.top = k.y + 'px';
                snLinienZeichnen();
            } else if (snPannt) {
                snPanX = e.clientX - snPanStartX;
                snPanY = e.clientY - snPanStartY;
                snTransformAnwenden();
            }
        });
        const loslassen = () => {
            if (snGezogen && snBewegt) saveData();
            snGezogen = null;
            snPannt = false;
        };
        window.addEventListener('pointerup', loslassen);
        window.addEventListener('pointercancel', loslassen);
    }

    if (c.dataset.snEventsGebunden) return;
    c.dataset.snEventsGebunden = '1';
    c.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (e.target.closest('.sn-zoom')) return;
        const node = e.target.closest('.nw-node');
        if (node) {
            const k = snKnoten(node.dataset.id);
            if (!k) return;
            const r = c.getBoundingClientRect();
            snGezogen = node;
            snBewegt = false;
            snDownX = e.clientX; snDownY = e.clientY;
            snOffsetX = (e.clientX - r.left - snPanX) / snScale - k.x;
            snOffsetY = (e.clientY - r.top - snPanY) / snScale - k.y;
            e.stopPropagation();
            return;
        }
        snPannt = true;
        snPanStartX = e.clientX - snPanX;
        snPanStartY = e.clientY - snPanY;
    });
    c.addEventListener('wheel', (e) => {
        // Nur mit Strg/Cmd zoomen - sonst würde das Board beim Scrollen durch
        // den langen Charakterbogen jedes Mal das Seiten-Scrollen abfangen.
        if (!(e.ctrlKey || e.metaKey)) return;
        e.preventDefault();
        const r = c.getBoundingClientRect();
        snZoomen(e.deltaY < 0 ? 1.1 : 1 / 1.1, e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
}

// --- Rendering ------------------------------------------------------------------

function snLinienZeichnen() {
    const layer = document.getElementById('sn-thread-layer');
    if (!layer) return;
    layer.innerHTML = '';
    snDaten().relationen.forEach(r => {
        const von = snKnoten(r.vonId), zu = snKnoten(r.zuId);
        const vEl = document.querySelector(`#sn-board .nw-node[data-id="${r.vonId}"]`);
        const zEl = document.querySelector(`#sn-board .nw-node[data-id="${r.zuId}"]`);
        if (!von || !zu || !vEl || !zEl) return;
        const x1 = von.x + vEl.offsetWidth / 2, y1 = von.y + vEl.offsetHeight / 2;
        const x2 = zu.x + zEl.offsetWidth / 2, y2 = zu.y + zEl.offsetHeight / 2;
        const linie = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linie.setAttribute('class', 'nw-linie');
        linie.setAttribute('x1', x1); linie.setAttribute('y1', y1);
        linie.setAttribute('x2', x2); linie.setAttribute('y2', y2);
        layer.appendChild(linie);
        if (r.label) {
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('class', 'nw-linie-label');
            t.setAttribute('x', (x1 + x2) / 2);
            t.setAttribute('y', (y1 + y2) / 2 - 6);
            t.textContent = r.label;
            layer.appendChild(t);
        }
    });
}

function snBoardZeichnen() {
    const board = document.getElementById('sn-board');
    if (!board) return;
    board.innerHTML = '';
    snDaten().knoten.forEach(k => {
        const el = document.createElement('div');
        el.className = `nw-node ${k.ich ? 'nw-node-pc' : 'nw-node-nsc'}`;
        el.dataset.id = k.id;
        el.style.left = k.x + 'px';
        el.style.top = k.y + 'px';
        el.textContent = snKnotenName(k);
        el.title = 'Antippen zum Bearbeiten, ziehen zum Verschieben';
        el.addEventListener('click', () => { if (!snBewegt) snModalOeffnen(k.id); });
        board.appendChild(el);
    });
    snLinienZeichnen();
}

function renderSpielernetz() {
    const box = document.getElementById('spielernetz-section');
    if (!box) return;
    // Wie das Logbuch von Anfang an da, damit das Feature auffindbar ist.
    box.style.display = '';

    const d = snDaten();
    const anzahl = d.knoten.filter(k => !k.ich).length;
    const logNpcs = new Set(snLogbuch().map(e => (e.npc || '').trim().toLowerCase()).filter(Boolean));
    const namenVorschlaege = [...new Set(snLogbuch().map(e => (e.npc || '').trim()).filter(Boolean))];

    box.innerHTML = `
        <details class="x-details qs-details" ${spielernetzOffen ? 'open' : ''}>
            <summary class="qs-head">
                <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-diagram-project category-icon-fa"></i> Mein Beziehungsnetz
                    ${anzahl ? `<span class="x-count">${anzahl}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('spielernetz')" title="Hilfe zum Beziehungsnetz"></i></h2>
            </summary>
            <p class="qs-hint">Wer kennt wen, wer mag wen nicht? Bleibt bei dir, mit deinem Logbuch verknüpft: NSCs mit gleichem Namen zeigen ihre Logbuch-Einträge.</p>
            <div class="qs-form">
                <input type="text" id="sn-neu-name" class="x-input qs-input" list="sn-namen-liste" placeholder="Neuer NSC …" onkeydown="if(event.key==='Enter'){event.preventDefault(); snKnotenAusEingabe();}">
                <datalist id="sn-namen-liste">${namenVorschlaege.map(n => `<option value="${escapeHtml(n)}"></option>`).join('')}</datalist>
                <button class="tool-btn" onclick="snKnotenAusEingabe()"><i class="fa-solid fa-plus"></i> NSC</button>
                ${logNpcs.size ? `<button class="tool-btn" onclick="snAusLogbuchUebernehmen()" title="Legt für jeden im Logbuch genannten NSC einen Knoten an"><i class="fa-solid fa-feather-pointed"></i> Aus Logbuch</button>` : ''}
                <button class="tool-btn" onclick="snAnordnen()"><i class="fa-solid fa-circle-nodes"></i> Anordnen</button>
            </div>
            <div id="sn-hinweis" class="x-hint"></div>
            <div class="nw-board-container" id="sn-board-container">
                <svg id="sn-thread-layer" class="nw-thread-layer"></svg>
                <div id="sn-board" class="nw-board"></div>
                <div class="sn-zoom">
                    <button class="x-mini" onclick="snZoomen(1.25)" title="Vergrößern"><i class="fa-solid fa-plus"></i></button>
                    <button class="x-mini" onclick="snZoomen(0.8)" title="Verkleinern"><i class="fa-solid fa-minus"></i></button>
                </div>
            </div>
        </details>`;

    const details = box.querySelector('details');
    const aufbauen = () => {
        snEventsEinrichten();
        if (!snZentriert) snZentrieren(); else snTransformAnwenden();
        snBoardZeichnen();
    };
    if (details) {
        details.addEventListener('toggle', () => {
            // Nur auf ECHTE Zustandsänderungen reagieren - das beim Neuaufbau
            // per innerHTML gesetzte open-Attribut löst ebenfalls ein toggle-
            // Ereignis aus, und das würde die Ansicht jedes Mal neu zentrieren.
            const war = spielernetzOffen;
            spielernetzOffen = details.open;
            sicherSpeichern(SN_OFFEN_KEY, details.open ? '1' : '0');
            if (details.open && !war) { snZentriert = false; aufbauen(); }
        });
        if (details.open) aufbauen();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof appData !== 'undefined') renderSpielernetz();
});
