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
//
// --- Kisten: private Spieler-Fächer an Bord (Zusatz zum geteilten Pool) ----
//
// Wunsch aus der Runde (Discord, JohoSaft): zusätzlich zum geteilten Schiffs-
// Inventar oben soll jeder Spieler sein EIGENES, privates Fach an Bord haben
// - andere Spieler sehen es nicht, der SL kann aber jederzeit reinschauen
// (und auch direkt was reinlegen/rausnehmen). Bewusst ein einfacheres Modell
// als der geteilte Pool: keine größen-gewichtete "Lager"-Kapazität, sondern
// eine simple Anzahl "Plätze" (ein Eintrag = ein Platz, unabhängig von
// dessen `amount`), die der SL frei einstellt (kistenKapazitaet, EIN
// gemeinsamer Wert für alle Kisten, nicht pro Spieler einzeln).
//
// Persistiert im selben localStorage-Blob wie oben (htbah_gm_schiff):
// { klasse, items, kistenKapazitaet, kisten: { [peerId]: [{id, name,
// amount, description}] } }.
//
// Nachrichten (GEZIELT an genau den einen betroffenen Spieler, nie an alle -
// anders als der geteilte Pool oben ist eine Kiste kein gemeinsamer Besitz):
//   SL -> ein Spieler   { type: 'kiste', items: [...], kapazitaet }   kompletter Stand SEINER Kiste
//   Spieler -> SL       { type: 'kisteNehmen', itemId }
//   SL -> ein Spieler   { type: 'kisteGeben', item }                  dir gehört's jetzt (auch als Rückgabe)
//   SL -> ein Spieler   { type: 'kisteAbgelehnt', itemId, grund }      'weg' | 'keinPlatz'
//   Spieler -> SL       { type: 'kisteAblegen', item }

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

// Kisten (SL-seitig kanonisch: peerId -> Item-Array; Spieler kennt nur die
// eigene, zuletzt synchronisierte Kopie).
let kisten = {};
let kistenKapazitaet = 5;
let meineKiste = [];
let meineKisteKapazitaet = 5;
let kisteOffenGm = true;
let kisteOffenSpieler = false;
const kistenAnfragen = {};

function kisteNeueId() {
    return 'kiste_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function kisteFuer(peerId) {
    if (!Array.isArray(kisten[peerId])) kisten[peerId] = [];
    return kisten[peerId];
}

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
            kisten = geladen.kisten && typeof geladen.kisten === 'object' ? geladen.kisten : {};
            kistenKapazitaet = Math.max(1, parseInt(geladen.kistenKapazitaet) || 5);
        } else if (Array.isArray(geladen)) {
            // Alter Stand ohne Schiffsklasse (vor der Lager-Kapazität)
            schiff = geladen;
            schiffKlasse = 'schoner';
            kisten = {};
            kistenKapazitaet = 5;
        } else {
            schiff = [];
            schiffKlasse = 'schoner';
            kisten = {};
            kistenKapazitaet = 5;
        }
        schiffOffenGm = localStorage.getItem(SCHIFF_OFFEN_GM_KEY) !== '0';
    } catch (e) { schiff = []; schiffKlasse = 'schoner'; kisten = {}; kistenKapazitaet = 5; }
}

function schiffSichern() {
    sicherSpeichern(SCHIFF_KEY, JSON.stringify({ klasse: schiffKlasse, items: schiff, kisten, kistenKapazitaet }));
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

// --- Kisten: Spielleiter -----------------------------------------------------

function kisteSenden(peerId, nachricht) {
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;
    if (!conn || !conn.open) return false;
    try { conn.send(nachricht); return true; } catch (e) { return false; }
}

function kisteVerteilenAn(peerId) {
    kisteSenden(peerId, { type: 'kiste', items: kisteFuer(peerId), kapazitaet: kistenKapazitaet });
}

function kisteAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    try { conn.send({ type: 'kiste', items: kisteFuer(conn.peer), kapazitaet: kistenKapazitaet }); } catch (e) { /* weg */ }
}

// EIN gemeinsamer Wert für alle Kisten (siehe Datei-Kopfkommentar) - Änderung
// geht an jeden gerade verbundenen Spieler raus, damit seine Anzeige sofort
// den neuen Wert zeigt.
function kistenKapazitaetAendern(wert) {
    kistenKapazitaet = Math.max(1, parseInt(wert) || 1);
    schiffSichern();
    if (typeof connectedPlayersData !== 'undefined') Object.keys(connectedPlayersData).forEach(kisteVerteilenAn);
    renderSchiffGm();
}

function kisteHinzufuegen(peerId) {
    const nameEl = document.getElementById('kiste-neu-name-' + peerId);
    const mengeEl = document.getElementById('kiste-neu-menge-' + peerId);
    const descEl = document.getElementById('kiste-neu-desc-' + peerId);
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    const liste = kisteFuer(peerId);
    if (liste.length >= kistenKapazitaet) { alert(`Kiste voll: ${liste.length}/${kistenKapazitaet} Plätze belegt.`); return; }
    const item = {
        id: kisteNeueId(), name,
        amount: Math.max(1, parseInt(mengeEl ? mengeEl.value : 1) || 1),
        description: (descEl ? descEl.value : '').trim()
    };
    kisten[peerId] = [item].concat(liste);
    schiffSichern();
    kisteVerteilenAn(peerId);
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `legt ${schiffLabel(item)} in ${schiffSpielerName(peerId)}s Kiste.`, '🗝️');
    renderSchiffGm();
}

function kisteEntfernen(peerId, itemId) {
    kisten[peerId] = kisteFuer(peerId).filter(i => i.id !== itemId);
    schiffSichern();
    kisteVerteilenAn(peerId);
    renderSchiffGm();
}

// Anfragen der Spieler (aus handleIncomingData in multiplayer.js) - dieselbe
// Nehmen/Ablegen-Mechanik wie beim geteilten Pool, nur pro Kiste isoliert und
// mit einfacher Platz- statt Größen-Prüfung.
function kisteAnfrageVerarbeiten(peerId, payload) {
    if (!payload || typeof payload !== 'object') return false;
    const name = schiffSpielerName(peerId);

    if (payload.type === 'kisteNehmen') {
        const liste = kisteFuer(peerId);
        const item = liste.find(i => i.id === payload.itemId);
        if (!item) { kisteSenden(peerId, { type: 'kisteAbgelehnt', itemId: payload.itemId, grund: 'weg' }); return true; }
        const spielerDaten = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null;
        if (!schiffSpielerHatPlatz(spielerDaten, 1)) {
            kisteSenden(peerId, { type: 'kisteAbgelehnt', itemId: payload.itemId, grund: 'keinPlatz' });
            return true;
        }
        kisten[peerId] = liste.filter(i => i.id !== item.id);
        schiffSichern();
        kisteSenden(peerId, { type: 'kisteGeben', item });
        if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `nimmt ${schiffLabel(item)} aus der eigenen Kiste.`, '🗝️');
        renderSchiffGm();
        return true;
    }
    if (payload.type === 'kisteAblegen' && payload.item && typeof payload.item === 'object') {
        const roh = payload.item;
        const item = {
            id: kisteNeueId(),
            name: String(roh.name || '').slice(0, 120),
            amount: Math.max(1, parseInt(roh.amount) || 1),
            description: String(roh.description || '').slice(0, 1000)
        };
        const liste = kisteFuer(peerId);
        if (liste.length >= kistenKapazitaet) {
            // Kein Platz mehr - Spieler hat es lokal schon aus dem eigenen
            // Raster entfernt (siehe kisteAblegen), darum direkt zurückgeben.
            kisteSenden(peerId, { type: 'kisteGeben', item });
            if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `wollte ${schiffLabel(item)} in die eigene Kiste legen, aber die ist voll - bleibt bei ${name}.`, '⚠️');
            return true;
        }
        kisten[peerId] = [item].concat(liste);
        schiffSichern();
        kisteVerteilenAn(peerId);
        if (typeof addGmLogEntry === 'function') addGmLogEntry(name, `legt ${schiffLabel(item)} in die eigene Kiste.`, '🗝️');
        renderSchiffGm();
        return true;
    }
    return false;
}

function kisteSpielerBlockHtml(peerId) {
    const liste = kisteFuer(peerId);
    const zeilen = liste.map(i => `
        <div class="tm-item schiff-item">
            <div class="tm-item-kopf">
                <i class="fa-solid fa-box tm-art-icon"></i>
                <span class="tm-item-name">${escapeHtml(schiffLabel(i))}</span>
            </div>
            ${i.description ? `<div class="tm-item-desc">${escapeHtml(i.description)}</div>` : ''}
            <div class="tm-item-actions">
                <button class="x-mini x-mini-danger" data-kistedel="${escapeHtml(i.id)}" data-peer="${escapeHtml(peerId)}" title="Entfernen"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`).join('');
    return `
        <div class="tm-item-kopf" style="margin-top:0.6rem">
            <span class="tm-item-name">${escapeHtml(schiffSpielerName(peerId))}</span>
            <span class="nsc-badge ${liste.length >= kistenKapazitaet ? 'ir-warnung' : ''}">${liste.length} / ${kistenKapazitaet}</span>
        </div>
        <div class="qs-form">
            <input type="text" id="kiste-neu-name-${escapeHtml(peerId)}" class="x-input qs-input" placeholder="Gegenstand …">
            <input type="number" id="kiste-neu-menge-${escapeHtml(peerId)}" class="x-input" style="max-width:80px" value="1" min="1" title="Menge">
            <input type="text" id="kiste-neu-desc-${escapeHtml(peerId)}" class="x-input qs-input" placeholder="Beschreibung (optional)">
            <button class="x-mini" data-kisteadd="${escapeHtml(peerId)}" title="In die Kiste legen"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="tm-list">${zeilen || '<div class="x-leer">Leer.</div>'}</div>`;
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
        </details>
        <details class="x-details schiff-details" ${kisteOffenGm ? 'open' : ''} style="margin-top:0.8rem">
            <summary class="tm-head">
                <div class="tm-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-box-archive"></i> Spieler-Kisten
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('kisten')" title="Hilfe zu den Kisten"></i>
                </div>
            </summary>
            <p class="ir-hint">Privates Fach jedes Spielers an Bord - andere Spieler sehen es nicht, du als SL kannst aber jederzeit reinschauen und direkt was hineinlegen oder herausnehmen.</p>
            <div class="ir-einstellungen">
                <label class="ir-einstellung">Plätze pro Kiste
                    <input type="number" id="kisten-kapazitaet" class="ir-input" style="max-width:80px" value="${kistenKapazitaet}" min="1">
                </label>
            </div>
            ${spieler.length ? spieler.map(p => kisteSpielerBlockHtml(p)).join('') : '<div class="x-leer">Noch niemand verbunden.</div>'}
        </details>`;

    const details = box.querySelectorAll('details');
    if (details[0]) details[0].addEventListener('toggle', () => {
        schiffOffenGm = details[0].open;
        sicherSpeichern(SCHIFF_OFFEN_GM_KEY, details[0].open ? '1' : '0');
    });
    if (details[1]) details[1].addEventListener('toggle', () => { kisteOffenGm = details[1].open; });
    const klasseSel = document.getElementById('schiff-klasse');
    if (klasseSel) klasseSel.addEventListener('change', () => schiffKlasseAendern(klasseSel.value));
    const kapazEl = document.getElementById('kisten-kapazitaet');
    if (kapazEl) kapazEl.addEventListener('change', () => kistenKapazitaetAendern(kapazEl.value));
    box.querySelectorAll('[data-kistedel]').forEach(b => b.addEventListener('click', () => kisteEntfernen(b.dataset.peer, b.dataset.kistedel)));
    box.querySelectorAll('[data-kisteadd]').forEach(b => b.addEventListener('click', () => kisteHinzufuegen(b.dataset.kisteadd)));
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

// --- Kisten: Spieler ----------------------------------------------------------

function kisteEmpfangen(items, kapazitaet) {
    meineKiste = Array.isArray(items) ? items : [];
    meineKisteKapazitaet = Math.max(1, parseInt(kapazitaet) || 5);
    Object.keys(kistenAnfragen).forEach(id => { if (!meineKiste.some(i => i.id === id)) delete kistenAnfragen[id]; });
    renderSchiffSpieler();
}

function kisteNehmen(id) {
    if (!schiffVerbunden() || kistenAnfragen[id]) return;
    kistenAnfragen[id] = true;
    try { hostConnection.send({ type: 'kisteNehmen', itemId: id }); } catch (e) { delete kistenAnfragen[id]; }
    renderSchiffSpieler();
}

function kisteGeschenkEmpfangen(item) {
    if (!item || typeof appData === 'undefined') return;
    delete kistenAnfragen[item.id];
    if (!appData.inventory) appData.inventory = [];
    const neu = {
        id: 'inv_' + Date.now(),
        name: String(item.name || '').slice(0, 120),
        amount: Math.max(1, parseInt(item.amount) || 1),
        description: String(item.description || '').slice(0, 1000),
        showDesc: false,
        irGroesse: 1
    };
    appData.inventory.push(neu);
    if (typeof irAutoPlatzieren === 'function') irAutoPlatzieren(neu.id);
    if (typeof addActivityLog === 'function') addActivityLog(`Aus der eigenen Kiste genommen: ${schiffLabel(item)}`, 'activity-good', '<i class="fa-solid fa-box-archive"></i>');
    if (typeof saveData === 'function') saveData();
    if (typeof renderAll === 'function') renderAll();
    schiffHinweis(`${schiffLabel(item)} genommen.`);
}

function kisteAbgelehnt(itemId, grund) {
    delete kistenAnfragen[itemId];
    meineKiste = meineKiste.filter(i => i.id !== itemId || grund === 'keinPlatz');
    renderSchiffSpieler();
    schiffHinweis(grund === 'keinPlatz' ? 'Kein Platz mehr im eigenen Rasterinventar.' : 'Zu spät - das ist schon weg.', true);
}

// Eigenen Gegenstand in die eigene Kiste legen. Ist sie voll, kommt der
// Gegenstand automatisch zurück (siehe kisteAnfrageVerarbeiten).
function kisteAblegen() {
    const sel = document.getElementById('kiste-ablegen-select');
    if (!sel || !sel.value || !schiffVerbunden()) return;
    const itemId = sel.value;
    const idx = (appData.inventory || []).findIndex(i => i.id === itemId);
    if (idx < 0) return;
    const q = appData.inventory[idx];
    const item = { name: q.name, amount: q.amount || 1, description: q.description || '' };
    try { hostConnection.send({ type: 'kisteAblegen', item }); } catch (e) { return; }
    appData.inventory.splice(idx, 1);
    if (typeof irOhneItem === 'function' && typeof irRasterDaten === 'function') appData.inventarRaster = irOhneItem(irRasterDaten(), itemId);
    if (typeof addActivityLog === 'function') addActivityLog(`In die eigene Kiste gelegt: ${schiffLabel(item)}`, 'activity-neutral', '<i class="fa-solid fa-box-archive"></i>');
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

    const meineKisteKarten = meineKiste.map(i => {
        const wartet = !!kistenAnfragen[i.id];
        return `
        <div class="tm-item card-layout">
            <div class="tm-item-kopf">
                <i class="fa-solid fa-box tm-art-icon"></i>
                <span class="tm-item-name">${escapeHtml(schiffLabel(i))}</span>
            </div>
            ${i.description ? `<div class="tm-item-desc">${escapeHtml(i.description)}</div>` : ''}
            <div class="tm-item-actions">
                <button class="tool-btn tm-take" data-kistenehmen="${escapeHtml(i.id)}" ${wartet ? 'disabled' : ''}>
                    <i class="fa-solid ${wartet ? 'fa-spinner fa-spin' : 'fa-hand-back-fist'}"></i> ${wartet ? 'Wird geholt …' : 'Nehmen'}
                </button>
            </div>
        </div>`;
    }).join('') || '<div class="x-leer">Noch leer.</div>';

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
        </details>
        <details class="x-details schiff-details" ${kisteOffenSpieler ? 'open' : ''} style="margin-top:0.8rem">
            <summary class="tm-head">
                <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-box-archive category-icon-fa"></i> Deine Kiste
                    ${meineKiste.length ? `<span class="x-count">${meineKiste.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('kisten')" title="Hilfe zu den Kisten"></i></h2>
            </summary>
            <p class="ir-hint">Dein privates Fach an Bord - nur du und der SL sehen den Inhalt. Plätze: ${meineKiste.length} / ${meineKisteKapazitaet}.</p>
            <div class="tm-list">${meineKisteKarten}</div>
            ${eigene.length ? `
            <div class="tm-ablegen">
                <select id="kiste-ablegen-select" class="x-select tm-select"><option value="">Eigenes in die Kiste legen …</option>${eigene.join('')}</select>
                <button class="tool-btn" onclick="kisteAblegen()" title="Aus deinem Rasterinventar in die Kiste legen"><i class="fa-solid fa-arrow-up-from-bracket"></i> Ablegen</button>
            </div>` : ''}
        </details>`;

    const alleDetails = section.querySelectorAll('details');
    if (alleDetails[0]) alleDetails[0].addEventListener('toggle', () => { schiffOffenSpieler = alleDetails[0].open; });
    if (alleDetails[1]) alleDetails[1].addEventListener('toggle', () => { kisteOffenSpieler = alleDetails[1].open; });
    section.querySelectorAll('[data-schiffnehmen]').forEach(b => b.addEventListener('click', () => schiffNehmen(b.dataset.schiffnehmen)));
    section.querySelectorAll('[data-kistenehmen]').forEach(b => b.addEventListener('click', () => kisteNehmen(b.dataset.kistenehmen)));
}

// Beim Spieler eintreffende Nachrichten (aus multiplayer.js). true = verarbeitet.
function schiffNachrichtVerarbeiten(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type === 'schiff') { schiffEmpfangen(payload.klasse, payload.items); return true; }
    if (payload.type === 'schiffGeben') { schiffGeschenkEmpfangen(payload.item); return true; }
    if (payload.type === 'schiffAbgelehnt') { schiffAbgelehnt(payload.itemId, payload.grund); return true; }
    if (payload.type === 'kiste') { kisteEmpfangen(payload.items, payload.kapazitaet); return true; }
    if (payload.type === 'kisteGeben') { kisteGeschenkEmpfangen(payload.item); return true; }
    if (payload.type === 'kisteAbgelehnt') { kisteAbgelehnt(payload.itemId, payload.grund); return true; }
    return false;
}

function schiffBeitritt() {
    schiffSpieler = [];
    schiffOffenSpieler = false;
    Object.keys(schiffAnfragen).forEach(k => delete schiffAnfragen[k]);
    meineKiste = [];
    kisteOffenSpieler = false;
    Object.keys(kistenAnfragen).forEach(k => delete kistenAnfragen[k]);
    renderSchiffSpieler();
}

function schiffGetrennt() {
    schiffSpieler = [];
    schiffOffenSpieler = false;
    Object.keys(schiffAnfragen).forEach(k => delete schiffAnfragen[k]);
    meineKiste = [];
    kisteOffenSpieler = false;
    Object.keys(kistenAnfragen).forEach(k => delete kistenAnfragen[k]);
    renderSchiffSpieler();
}

document.addEventListener('DOMContentLoaded', () => {
    schiffLaden();
    renderSchiffGm();
});
