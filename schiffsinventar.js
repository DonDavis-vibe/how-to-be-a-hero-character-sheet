// How to be a Hero - Schiffs-Inventar (Eldara-Hausregel)
//
// Das Schiff als gemeinsame Heimat/Ressourcenquelle der Crew, ähnlich dem
// "Lair"-Vorrat bei Blades in the Dark: ein geteilter Gegenstands-Pool, den
// alle jederzeit sehen (kein Verstecken/Aufdecken wie bei der Tischmitte -
// das ist ja der eigene Besitz der Crew, kein SL-Geheimnis).
//
// Zwei Kapazitäts-Grenzen aus dem echten Regelwerk (RW 4.1 S.32, siehe
// hausregeln/quellen/rw41.txt):
// - Das Schiff selbst hat laut Schiffstabelle ein festes "Lager" (Kanonenboot
//   20, Schoner 50, Brigg 100, Fregatte 150, Kriegsschiff 250).
// - Ob ein Spieler etwas vom Schiff NEHMEN kann, hängt nicht von einer festen
//   Zahl ab, sondern schlicht davon, ob im eigenen Rasterinventar
//   (inventarraster.js) noch ein passendes Feld frei ist.
//
// EINSCHRÄNKUNG: Das Regelwerk sagt nicht, wie viele "Lager"-Einheiten ein
// Gegenstand mit Rasterinventar-Größe X verbraucht - beide Systeme sind im
// Rohtext nicht explizit verknüpft. Hier wird vereinfachend dieselbe
// Größentabelle (irSlotKostenVon aus inventarraster.js) für beide Werte
// verwendet. Wirkt das Lager zu klein/groß, einfach eine andere Schiffsklasse
// wählen - das ist eine bewusste Annäherung, keine Regelwerk-Zahl.
//
// Nur relevant, wenn das Regelpaket "eldora-arrrrr" aktiv ist - siehe
// eldaraAktiv() in hausregeln.js.
//
// Nachrichten (multiplayer.js):
//   SL -> Spieler   { type: 'schiff', klasse, items: [...] }        kompletter Stand
//   Spieler -> SL   { type: 'schiffNehmen', itemId }
//   SL -> Spieler   { type: 'schiffGeben', item }                    dir gehört's jetzt (auch als Rückgabe, wenn's Ablegen mangels Lager nicht klappt)
//   SL -> Spieler   { type: 'schiffAbgelehnt', itemId, grund }        'weg' | 'keinPlatz'
//   Spieler -> SL   { type: 'schiffAblegen', item }
//
// Eintrag: { id, name, amount, groesse, description } - groesse wie beim
// Rasterinventar (0.5/1/2/3, siehe IR_GROESSEN_KATALOG).

const SCHIFF_KEY = 'htbah_gm_schiff';
const SCHIFF_OFFEN_GM_KEY = 'htbah_gm_schiff_offen';
// Trefferpunkte/Geschwindigkeit/Kanonen/Crew/Preis kommen aus derselben
// Schiffstabelle (S.32) wie Lager - bis hierhin nur für schiffsinventar.js
// selbst genutzt, jetzt zusätzlich als Vorlage für seekampf.js (Seekampf-
// Tracker, S.3-5: Strukturpunkte, Kanonenzahl, Geschwindigkeits-Würfel).
const SCHIFF_KLASSEN = {
    kanonenboot: { label: 'Kanonenboot', lager: 20, trefferpunkte: 100, geschwindigkeit: 'w8+1', kanonen: 4, crew: 5, preis: 1000 },
    schoner: { label: 'Schoner', lager: 50, trefferpunkte: 200, geschwindigkeit: 'w8', kanonen: 18, crew: 20, preis: 5000 },
    brigg: { label: 'Brigg', lager: 100, trefferpunkte: 500, geschwindigkeit: 'w6', kanonen: 25, crew: 35, preis: 10000 },
    fregatte: { label: 'Fregatte', lager: 150, trefferpunkte: 750, geschwindigkeit: 'w4+1', kanonen: 50, crew: 70, preis: 20000 },
    kriegsschiff: { label: 'Kriegsschiff', lager: 250, trefferpunkte: 1000, geschwindigkeit: 'w4', kanonen: 80, crew: 100, preis: 30000 }
};

// Beim SL kanonisch, beim Spieler die Kopie vom letzten Sync
let schiff = [];
let schiffKlasse = 'schoner';
let schiffSpieler = [];
let schiffSpielerKlasse = 'schoner';
let schiffOffenGm = true;
let schiffOffenSpieler = false;
// Spieler: itemId -> true, solange eine "Nehmen"-Anfrage unterwegs ist
const schiffAnfragen = {};

function schiffNeueId() {
    return 'schiff_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function schiffLabel(item) {
    if (!item) return '?';
    return `${(item.amount || 1) > 1 ? (item.amount + 'x ') : ''}${item.name || 'Gegenstand'}`;
}

function schiffGroesseLabel(groesse) {
    const info = (typeof IR_GROESSEN_KATALOG !== 'undefined' ? IR_GROESSEN_KATALOG : []).find(g => g.wert === Number(groesse));
    return info ? info.label : `Größe ${groesse}`;
}

function schiffSlotKosten(groesse) {
    return typeof irSlotKostenVon === 'function' ? irSlotKostenVon(groesse) : Math.max(1, Math.ceil(Number(groesse) || 1));
}

// --- Spielleiter --------------------------------------------------------------

function schiffLaden() {
    try {
        const roh = localStorage.getItem(SCHIFF_KEY);
        const geladen = roh ? JSON.parse(roh) : null;
        if (geladen && Array.isArray(geladen.items)) {
            schiff = geladen.items;
            schiffKlasse = SCHIFF_KLASSEN[geladen.klasse] ? geladen.klasse : 'schoner';
        } else if (Array.isArray(geladen)) {
            // Alter Stand ohne Schiffsklasse (vor der Lager-Kapazität)
            schiff = geladen;
            schiffKlasse = 'schoner';
        } else {
            schiff = [];
            schiffKlasse = 'schoner';
        }
        schiffOffenGm = localStorage.getItem(SCHIFF_OFFEN_GM_KEY) !== '0';
    } catch (e) { schiff = []; schiffKlasse = 'schoner'; }
}

function schiffSichern() {
    try { localStorage.setItem(SCHIFF_KEY, JSON.stringify({ klasse: schiffKlasse, items: schiff })); } catch (e) { /* voll */ }
}

function schiffLagerKapazitaet(klasse) {
    return (SCHIFF_KLASSEN[klasse] || SCHIFF_KLASSEN.schoner).lager;
}

function schiffLagerBelegt(liste) {
    return (liste || schiff).reduce((sum, i) => sum + schiffSlotKosten(i.groesse), 0);
}

function schiffCommit(next) {
    schiff = next;
    schiffSichern();
    if (typeof clientConnections !== 'undefined') {
        const nachricht = { type: 'schiff', klasse: schiffKlasse, items: schiff };
        Object.values(clientConnections).forEach(conn => {
            if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
        });
    }
    renderSchiffGm();
}

function schiffKlasseAendern(klasse) {
    schiffKlasse = SCHIFF_KLASSEN[klasse] ? klasse : 'schoner';
    schiffCommit(schiff);
}

function schiffAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    try { conn.send({ type: 'schiff', klasse: schiffKlasse, items: schiff }); } catch (e) { /* weg */ }
}

function schiffHinzufuegen() {
    const nameEl = document.getElementById('schiff-neu-name');
    const mengeEl = document.getElementById('schiff-neu-menge');
    const groesseEl = document.getElementById('schiff-neu-groesse');
    const descEl = document.getElementById('schiff-neu-desc');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    const groesse = groesseEl ? parseFloat(groesseEl.value) || 1 : 1;
    const kosten = schiffSlotKosten(groesse);
    if (schiffLagerBelegt() + kosten > schiffLagerKapazitaet(schiffKlasse)) {
        alert(`Lager voll: ${schiffLagerBelegt()}/${schiffLagerKapazitaet(schiffKlasse)} belegt. Größere Schiffsklasse wählen oder erst Platz schaffen.`);
        return;
    }

    const item = {
        id: schiffNeueId(),
        name,
        amount: Math.max(1, parseInt(mengeEl ? mengeEl.value : 1) || 1),
        groesse,
        description: (descEl ? descEl.value : '').trim()
    };
    schiffCommit([item].concat(schiff));
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    if (mengeEl) mengeEl.value = '1';
    if (descEl) descEl.value = '';
}

function schiffEntfernen(id) {
    schiffCommit(schiff.filter(i => i.id !== id));
}

// SL kann direkt einem bestimmten Spieler geben, ohne dass der erst "Nehmen"
// klicken muss - z.B. um vorbereitete Ausrüstung gezielt zu verteilen. Prüft
// dieselbe Platz-Grenze wie eine normale Anfrage.
function schiffGebenAn(id, peerId) {
    const item = schiff.find(i => i.id === id);
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;
    const spielerDaten = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null;
    if (!item || !conn || !conn.open || !spielerDaten) return;
    if (!schiffSpielerHatPlatz(spielerDaten, item.groesse)) {
        if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `wollte ${schiffLabel(item)} an ${schiffSpielerName(peerId)} geben, aber kein Platz im Rasterinventar frei.`, '⚠️');
        return;
    }
    schiffCommit(schiff.filter(i => i.id !== item.id));
    try { conn.send({ type: 'schiffGeben', item }); } catch (e) { return; }
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `gibt ${schiffLabel(item)} vom Schiff an ${schiffSpielerName(peerId)}.`, '🚢');
}

function schiffSpielerName(peerId) {
    const d = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null;
    return d ? ([d.vorname, d.name].filter(Boolean).join(' ') || 'Unbekannt') : 'Unbekannt';
}

// Prüft anhand des zuletzt gesendeten Bogen-Standes eines Spielers, ob dort im
// Rasterinventar noch ein passendes Feld frei ist - nutzt dieselbe reine Logik
// wie das eigene Raster (inventarraster.js, mit dem fremden Bogen als Kontext),
// nicht appData des SL.
function schiffSpielerHatPlatz(spielerDaten, groesse) {
    if (typeof irErstesFreies !== 'function') return true;
    const raster = (spielerDaten && spielerDaten.inventarRaster && typeof spielerDaten.inventarRaster === 'object')
        ? spielerDaten.inventarRaster : {};
    return irErstesFreies(raster, schiffSlotKosten(groesse), spielerDaten) !== null;
}

// Anfragen der Spieler (aus handleIncomingData in multiplayer.js)
function schiffAnfrageVerarbeiten(peerId, payload) {
    if (!payload || typeof payload !== 'object') return false;
    const name = schiffSpielerName(peerId);
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;

    if (payload.type === 'schiffNehmen') {
        const item = schiff.find(i => i.id === payload.itemId);
        if (!item) {
            if (conn && conn.open) { try { conn.send({ type: 'schiffAbgelehnt', itemId: payload.itemId, grund: 'weg' }); } catch (e) { /* weg */ } }
            return true;
        }
        const spielerDaten = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null;
        if (!schiffSpielerHatPlatz(spielerDaten, item.groesse)) {
            if (conn && conn.open) { try { conn.send({ type: 'schiffAbgelehnt', itemId: payload.itemId, grund: 'keinPlatz' }); } catch (e) { /* weg */ } }
            return true;
        }
        schiffCommit(schiff.filter(i => i.id !== item.id));
        if (conn && conn.open) { try { conn.send({ type: 'schiffGeben', item }); } catch (e) { /* weg */ } }
        if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `nimmt ${schiffLabel(item)} vom Schiff.`, '🚢');
        return true;
    }
    if (payload.type === 'schiffAblegen' && payload.item && typeof payload.item === 'object') {
        const roh = payload.item;
        const item = {
            id: schiffNeueId(),
            name: String(roh.name || '').slice(0, 120),
            amount: Math.max(1, parseInt(roh.amount) || 1),
            groesse: Number(roh.groesse) || 1,
            description: String(roh.description || '').slice(0, 1000)
        };
        const kosten = schiffSlotKosten(item.groesse);
        if (schiffLagerBelegt() + kosten > schiffLagerKapazitaet(schiffKlasse)) {
            // Kein Lager mehr frei - Spieler hat es lokal schon aus dem eigenen
            // Raster entfernt (siehe schiffAblegen), darum direkt zurückgeben
            // statt nur abzulehnen.
            if (conn && conn.open) { try { conn.send({ type: 'schiffGeben', item }); } catch (e) { /* weg */ } }
            if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `wollte ${schiffLabel(item)} aufs Schiff legen, aber das Lager ist voll - bleibt bei ${name}.`, '⚠️');
            return true;
        }
        schiffCommit([item].concat(schiff));
        if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `legt ${schiffLabel(item)} aufs Schiff.`, '📥');
        return true;
    }
    return false;
}

function renderSchiffGm() {
    const box = document.getElementById('gm-schiff');
    if (!box) return;
    if (typeof eldaraAktiv !== 'function' || !eldaraAktiv()) {
        box.style.display = 'none';
        box.innerHTML = '';
        return;
    }
    box.style.display = '';
    const spieler = typeof connectedPlayersData !== 'undefined' ? Object.keys(connectedPlayersData) : [];
    const belegt = schiffLagerBelegt();
    const kapazitaet = schiffLagerKapazitaet(schiffKlasse);
    const katalog = typeof IR_GROESSEN_KATALOG !== 'undefined' ? IR_GROESSEN_KATALOG : [{ wert: 1, label: 'Normal (1)' }];

    const zeilen = schiff.map(i => {
        const gebenSelect = spieler.length ? `
            <select class="x-select schiff-geben" data-schiffgeben="${escapeHtml(i.id)}" title="Direkt einem Spieler geben">
                <option value="">Geben an …</option>
                ${spieler.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(schiffSpielerName(p))}</option>`).join('')}
            </select>` : '';
        return `
        <div class="tm-item schiff-item">
            <div class="tm-item-kopf">
                <i class="fa-solid fa-box tm-art-icon"></i>
                <span class="tm-item-name">${escapeHtml(schiffLabel(i))}</span>
                <span class="nsc-badge">${escapeHtml(schiffGroesseLabel(i.groesse))}</span>
            </div>
            ${i.description ? `<div class="tm-item-desc">${escapeHtml(i.description)}</div>` : ''}
            <div class="tm-item-actions">
                ${gebenSelect}
                <button class="x-mini x-mini-danger" data-schiffdel="${escapeHtml(i.id)}" title="Entfernen"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    }).join('');

    box.innerHTML = `
        <details class="x-details schiff-details" ${schiffOffenGm ? 'open' : ''}>
            <summary class="tm-head">
                <div class="tm-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-sailboat"></i> Schiffs-Inventar
                    ${schiff.length ? `<span class="x-count">${schiff.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('schiff')" title="Hilfe zum Schiffs-Inventar"></i>
                </div>
            </summary>
            <p class="ir-hint">Immer für die ganze Crew sichtbar - kein Verstecken nötig, das ist ja ihr eigener Besitz. "Nehmen" klappt nur, wenn der Spieler noch ein passendes Feld im eigenen Rasterinventar frei hat.</p>
            <div class="ir-einstellungen">
                <label class="ir-einstellung">Schiffsklasse
                    <select id="schiff-klasse" class="ir-input">
                        ${Object.entries(SCHIFF_KLASSEN).map(([k, v]) => `<option value="${k}" ${k === schiffKlasse ? 'selected' : ''}>${v.label} (Lager ${v.lager})</option>`).join('')}
                    </select>
                </label>
                <span class="ir-einstellung ${belegt >= kapazitaet ? 'ir-warnung' : ''}"><i class="fa-solid fa-warehouse"></i> Lager: ${belegt} / ${kapazitaet} belegt</span>
            </div>
            <div class="qs-form">
                <input type="text" id="schiff-neu-name" class="x-input qs-input" placeholder="Gegenstand …" onkeydown="if(event.key==='Enter') schiffHinzufuegen()">
                <select id="schiff-neu-groesse" class="x-select">
                    ${katalog.map(g => `<option value="${g.wert}" ${g.wert === 1 ? 'selected' : ''}>${g.label}</option>`).join('')}
                </select>
                <input type="number" id="schiff-neu-menge" class="x-input" style="max-width:80px" value="1" min="1" title="Menge">
                <input type="text" id="schiff-neu-desc" class="x-input qs-input" placeholder="Beschreibung (optional)" onkeydown="if(event.key==='Enter') schiffHinzufuegen()">
                <button class="tool-btn" onclick="schiffHinzufuegen()"><i class="fa-solid fa-plus"></i> Ablegen</button>
            </div>
            <div class="tm-list">${zeilen || '<div class="x-leer">Noch nichts an Bord. Leg die Grundausstattung der Crew ab.</div>'}</div>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => {
        schiffOffenGm = details.open;
        try { localStorage.setItem(SCHIFF_OFFEN_GM_KEY, details.open ? '1' : '0'); } catch (e) { /* egal */ }
    });
    const klasseSel = document.getElementById('schiff-klasse');
    if (klasseSel) klasseSel.addEventListener('change', () => schiffKlasseAendern(klasseSel.value));
    box.querySelectorAll('[data-schiffdel]').forEach(b => b.addEventListener('click', () => schiffEntfernen(b.dataset.schiffdel)));
    box.querySelectorAll('[data-schiffgeben]').forEach(s => s.addEventListener('change', () => { if (s.value) schiffGebenAn(s.dataset.schiffgeben, s.value); }));
}

// --- Spieler ----------------------------------------------------------------

function schiffVerbunden() {
    return typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
}

function schiffEmpfangen(klasse, items) {
    schiffSpielerKlasse = SCHIFF_KLASSEN[klasse] ? klasse : 'schoner';
    schiffSpieler = Array.isArray(items) ? items : [];
    Object.keys(schiffAnfragen).forEach(id => { if (!schiffSpieler.some(i => i.id === id)) delete schiffAnfragen[id]; });
    renderSchiffSpieler();
}

function schiffNehmen(id) {
    if (!schiffVerbunden() || schiffAnfragen[id]) return;
    schiffAnfragen[id] = true;
    try { hostConnection.send({ type: 'schiffNehmen', itemId: id }); } catch (e) { delete schiffAnfragen[id]; }
    renderSchiffSpieler();
}

function schiffGeschenkEmpfangen(item) {
    if (!item || typeof appData === 'undefined') return;
    delete schiffAnfragen[item.id];
    if (!appData.inventory) appData.inventory = [];
    const neu = {
        id: 'inv_' + Date.now(),
        name: String(item.name || '').slice(0, 120),
        amount: Math.max(1, parseInt(item.amount) || 1),
        description: String(item.description || '').slice(0, 1000),
        showDesc: false,
        irGroesse: Number(item.groesse) || 1
    };
    appData.inventory.push(neu);
    if (typeof irAutoPlatzieren === 'function') irAutoPlatzieren(neu.id);
    if (typeof addActivityLog === 'function') addActivityLog(`Vom Schiff genommen: ${schiffLabel(item)}`, 'activity-good', '<i class="fa-solid fa-sailboat"></i>');
    if (typeof saveData === 'function') saveData();
    if (typeof renderAll === 'function') renderAll();
    schiffHinweis(`${schiffLabel(item)} genommen.`);
}

function schiffAbgelehnt(itemId, grund) {
    delete schiffAnfragen[itemId];
    schiffSpieler = schiffSpieler.filter(i => i.id !== itemId || grund === 'keinPlatz');
    renderSchiffSpieler();
    schiffHinweis(grund === 'keinPlatz' ? 'Kein Platz mehr im eigenen Rasterinventar.' : 'Zu spät - das ist schon weg.', true);
}

// Eigenen Gegenstand aufs Schiff legen (z.B. um Platz im eigenen Raster zu
// schaffen, oder etwas für die ganze Crew abzugeben). Ist das Lager voll,
// bekommt man den Gegenstand automatisch zurück (siehe schiffAnfrageVerarbeiten).
function schiffAblegen() {
    const sel = document.getElementById('schiff-ablegen-select');
    if (!sel || !sel.value || !schiffVerbunden()) return;
    const itemId = sel.value;
    const idx = (appData.inventory || []).findIndex(i => i.id === itemId);
    if (idx < 0) return;
    const q = appData.inventory[idx];
    const item = { name: q.name, amount: q.amount || 1, groesse: Number(q.irGroesse) || 1, description: q.description || '' };
    try { hostConnection.send({ type: 'schiffAblegen', item }); } catch (e) { return; }
    appData.inventory.splice(idx, 1);
    if (typeof irOhneItem === 'function' && typeof irRasterDaten === 'function') appData.inventarRaster = irOhneItem(irRasterDaten(), itemId);
    if (typeof addActivityLog === 'function') addActivityLog(`Aufs Schiff gelegt: ${schiffLabel(item)}`, 'activity-neutral', '<i class="fa-solid fa-sailboat"></i>');
    if (typeof saveData === 'function') saveData();
    if (typeof renderAll === 'function') renderAll();
}

function schiffHinweis(text, warnung) {
    const el = document.getElementById('schiff-hinweis');
    if (!el) return;
    el.textContent = text;
    el.style.color = warnung ? 'var(--color-dmg)' : 'var(--color-heal)';
    el.style.opacity = '1';
    clearTimeout(schiffHinweis._t);
    schiffHinweis._t = setTimeout(() => { el.style.opacity = '0'; }, 4000);
}

function renderSchiffSpieler() {
    const section = document.getElementById('schiff-section');
    if (!section) return;
    if (!schiffVerbunden() || (typeof isGmMode !== 'undefined' && isGmMode) || typeof eldaraAktiv !== 'function' || !eldaraAktiv()) {
        section.style.display = 'none';
        section.innerHTML = '';
        return;
    }
    section.style.display = '';

    const eigene = (appData.inventory || []).map(i =>
        `<option value="${escapeHtml(i.id)}">${escapeHtml((i.amount > 1 ? i.amount + 'x ' : '') + (i.name || 'Unbenannt'))}</option>`);

    const karten = schiffSpieler.map(i => {
        const wartet = !!schiffAnfragen[i.id];
        return `
        <div class="tm-item card-layout">
            <div class="tm-item-kopf">
                <i class="fa-solid fa-box tm-art-icon"></i>
                <span class="tm-item-name">${escapeHtml(schiffLabel(i))}</span>
                <span class="nsc-badge">${escapeHtml(schiffGroesseLabel(i.groesse))}</span>
            </div>
            ${i.description ? `<div class="tm-item-desc">${escapeHtml(i.description)}</div>` : ''}
            <div class="tm-item-actions">
                <button class="tool-btn tm-take" data-schiffnehmen="${escapeHtml(i.id)}" ${wartet ? 'disabled' : ''}>
                    <i class="fa-solid ${wartet ? 'fa-spinner fa-spin' : 'fa-hand-back-fist'}"></i> ${wartet ? 'Wird geholt …' : 'Nehmen'}
                </button>
            </div>
        </div>`;
    }).join('');

    const belegt = schiffLagerBelegt(schiffSpieler);
    const kapazitaet = schiffLagerKapazitaet(schiffSpielerKlasse);

    section.innerHTML = `
        <details class="x-details schiff-details" ${schiffOffenSpieler ? 'open' : ''}>
            <summary class="tm-head">
                <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-sailboat category-icon-fa"></i> Schiffs-Inventar
                    ${schiffSpieler.length ? `<span class="x-count">${schiffSpieler.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('schiff')" title="Hilfe zum Schiffs-Inventar"></i></h2>
            </summary>
            <p class="ir-hint">${escapeHtml((SCHIFF_KLASSEN[schiffSpielerKlasse] || {}).label || '')} · Lager: ${belegt} / ${kapazitaet} belegt</p>
            <div id="schiff-hinweis" class="x-hint"></div>
            <div class="tm-list">${karten || '<div class="x-leer">Noch nichts an Bord.</div>'}</div>
            ${eigene.length ? `
            <div class="tm-ablegen">
                <select id="schiff-ablegen-select" class="x-select tm-select"><option value="">Eigenes aufs Schiff legen …</option>${eigene.join('')}</select>
                <button class="tool-btn" onclick="schiffAblegen()" title="Aus deinem Rasterinventar aufs Schiff legen"><i class="fa-solid fa-arrow-up-from-bracket"></i> Ablegen</button>
            </div>` : ''}
        </details>`;

    const details = section.querySelector('details');
    if (details) details.addEventListener('toggle', () => { schiffOffenSpieler = details.open; });
    section.querySelectorAll('[data-schiffnehmen]').forEach(b => b.addEventListener('click', () => schiffNehmen(b.dataset.schiffnehmen)));
}

// Beim Spieler eintreffende Nachrichten (aus multiplayer.js). true = verarbeitet.
function schiffNachrichtVerarbeiten(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type === 'schiff') { schiffEmpfangen(payload.klasse, payload.items); return true; }
    if (payload.type === 'schiffGeben') { schiffGeschenkEmpfangen(payload.item); return true; }
    if (payload.type === 'schiffAbgelehnt') { schiffAbgelehnt(payload.itemId, payload.grund); return true; }
    return false;
}

function schiffBeitritt() {
    schiffSpieler = [];
    schiffOffenSpieler = false;
    Object.keys(schiffAnfragen).forEach(k => delete schiffAnfragen[k]);
    renderSchiffSpieler();
}

function schiffGetrennt() {
    schiffSpieler = [];
    schiffOffenSpieler = false;
    Object.keys(schiffAnfragen).forEach(k => delete schiffAnfragen[k]);
    renderSchiffSpieler();
}

document.addEventListener('DOMContentLoaded', () => {
    schiffLaden();
    renderSchiffGm();
});
