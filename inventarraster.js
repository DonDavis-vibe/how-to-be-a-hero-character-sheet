// How to be a Hero - Rasterinventar (Eldara-Hausregel)
//
// Bildet das offizielle Eldara-Inventarsystem ab (Regelwerk RW 4.1, Kapitel
// "Inventar & Rucksack", S. 25f. - siehe hausregeln/quellen/rw41.txt):
//
//   Gürtel        6 Plätze (2 Waffen + 4 Sachen laut Regelwerk - hier als ein
//                 gemeinsamer 6er-Block, siehe Einschränkung unten)
//   Gürtelbeutel  2 Plätze (große Items, Ersatzwaffen, Proviant)
//   Rucksack      12 Plätze (Standard), -1 bei mittlerer, -2 bei schwerer Rüstung
//   Zusatztasche  optional, bis zu 3 gleichzeitig: klein = +3 Plätze/-3 Handeln,
//                 groß = +5 Plätze/-5 Handeln, solange getragen
//
// Gegenstände belegen laut Größentabelle (S. 26) 0,5 / 1 / 2 / 3 Plätze - hier
// aufgerundet auf 1 / 1 / 2 / 3 Raster-Zellen (0,5-Gegenstände wie Dolche
// müssten sich eigentlich zu zweit einen Platz teilen; das ist NICHT
// nachgebaut, siehe Einschränkungen unten).
//
// EINSCHRÄNKUNGEN gegenüber dem Regelwerk (bewusst, nicht vergessen):
// - Die "2 Waffen"-Sonderplätze am Gürtel/Rucksack sind nicht als eigene,
//   waffen-exklusive Zone nachgebaut - die 6 Gürtel-Plätze sind ein normaler
//   gemeinsamer Block, eine Waffe belegt dort ganz normal ihre 1-3 Felder
//   wie jeder andere Gegenstand.
// - 0,5-Gegenstände (Dolch, Trank, Voodoo-Puppe) belegen hier volle 1 Zelle
//   statt sich zu zweit einen Platz zu teilen - eine Vereinfachung, kein
//   Bug. Die "Zwei X = 1 Slot"-Regel ist nicht umgesetzt.
// - Gürteltaschen (eigene Regelzeile, Text im Rohextrakt nicht eindeutig
//   auflösbar) sind nicht separat modelliert, nur Zusatztaschen.
// - Der Handeln-Malus durch Zusatztaschen wird nur als Hinweis angezeigt,
//   nicht automatisch in Würfe eingerechnet - dafür das normale
//   Bonus/Malus-Feld beim Würfeln nutzen.
//
// Waffen: appData.weapons (das klassische, immer sichtbare Waffen-Panel) und
// dieses Raster sind bei aktivem Eldara-Paket EIN Bestand, nicht zwei. Wird
// Eldara aktiviert, wandern bestehende Waffen automatisch als Raster-Einträge
// mit `istWaffe: true` + `schaden` rüber (irWaffenNachRasterMigrieren, Standard-
// größe 2 Felder, vom Spieler danach änderbar); das klassische Panel wird
// ausgeblendet (siehe renderInventory() in app.js). Wird Eldara wieder
// deaktiviert, wandern Waffen-Einträge automatisch zurück
// (irWaffenAusRasterMigrieren) und das klassische Panel erscheint wieder.
// Passt eine Waffe beim Aktivieren mangels Platz nicht ins Raster, bleibt sie
// vorerst im klassischen Bestand (appData.weapons) und eine Warnung erscheint.
//
// Datenmodell: appData.inventory bleibt die Quelle für Item-Daten (Name,
// Menge, Beschreibung) - neu ist `irGroesse` (0.5, 1, 2 oder 3, siehe
// IR_GROESSEN_KATALOG). appData.inventarRaster ist die Platzierung:
// { "<zone>_<index>": { itemId } | { itemId, cont: true } | null }.
// appData.eldaraRuestungsteile (siehe IR_RUESTUNG_TEILE) und
// appData.eldaraZusatztaschen (Array aus 'klein'|'gross', max. 3 Einträge)
// steuern, welche Zonen mit wie vielen Plätzen existieren.
//
// Rüstung (S.27f, siehe IR_RUESTUNG_TEILE): sechs echte Ausrüstungs-Plätze
// (Helm, 2x Schulter, Brust, 2x Bein), jeder wahlweise mit Leder/Kette/Platte
// bestückt - jede Kombination hat laut Tabelle einen eigenen Rüstungswert und
// Gold-Preis. Die Summe aller getragenen Werte ergibt die Rüstungsstufe
// (Ungepanzert 0 / Leicht 1-10 / Mittel 11-20 / Schwer 21+), die wie bisher
// den Rucksack verkleinert (-1 Mittel, -2 Schwer laut S.25f). Die Tabelle mit
// den zusätzlichen Bewegungs-/Handeln-/Heimlichkeit-Mali pro Stufe (S.27) ist
// im Quelltext nicht eindeutig lesbar (mehrdeutige Zeilenzuordnung) und wird
// deshalb NICHT automatisiert - siehe hausregeln/OFFENE_FRAGEN.md.

const IR_GROESSEN_KATALOG = [
    { wert: 0.5, label: 'Klein (0,5)', beispiel: 'Dolch, Trank, Fläschchen' },
    { wert: 1, label: 'Normal (1)', beispiel: 'Fackel, Seil, Rationen, Pistole' },
    { wert: 2, label: 'Groß (2)', beispiel: 'Säbel, Muskete, Zauberbuch' },
    { wert: 3, label: 'Sehr groß (3)', beispiel: 'Zweihandwaffe, Münztruhe' }
];

const IR_ZUSATZTASCHE_MAX = 3;
const IR_ZUSATZTASCHE_DATEN = { klein: { breite: 3, malus: 3, label: 'Klein' }, gross: { breite: 5, malus: 5, label: 'Groß' } };

// Rüstungsteile & Kosten (S.27f) - ein normaler Mensch hat Platz für 1 Helm,
// 2 Schulterteile, 1 Brustschutz, 2 Beinteile; jedes Teil einzeln mit einem
// von drei Materialien bestückbar. Wert = Rüstungswert-Beitrag, preis = Gold.
const IR_RUESTUNG_SLOTS = {
    helm: { label: 'Helm', anzahl: 1 },
    schulter: { label: 'Schulter', anzahl: 2 },
    brust: { label: 'Brust', anzahl: 1 },
    bein: { label: 'Bein', anzahl: 2 }
};
const IR_RUESTUNG_MATERIAL = ['leder', 'kette', 'platte'];
const IR_RUESTUNG_MATERIAL_LABEL = { leder: 'Leder', kette: 'Kette', platte: 'Platte' };
const IR_RUESTUNG_WERTE = {
    helm: { leder: { wert: 3, preis: 150 }, kette: { wert: 5, preis: 250 }, platte: { wert: 7, preis: 300 } },
    schulter: { leder: { wert: 1, preis: 50 }, kette: { wert: 2, preis: 75 }, platte: { wert: 3, preis: 100 } },
    brust: { leder: { wert: 5, preis: 250 }, kette: { wert: 10, preis: 500 }, platte: { wert: 15, preis: 600 } },
    bein: { leder: { wert: 2, preis: 75 }, kette: { wert: 4, preis: 200 }, platte: { wert: 6, preis: 400 } }
};
const IR_RUESTUNGSSTUFE_LABEL = { ungepanzert: 'Ungepanzert', leicht: 'Leicht', mittel: 'Mittel', schwer: 'Schwer' };

let irDragItemId = null;

// --- Rüstung (getragene Ausrüstung, S.27f) --------------------------------

// Alle sechs Rüstungsteil-Slots als flache Liste, in Anzeige-Reihenfolge.
function irRuestungsteilSlots() {
    const slots = [];
    Object.keys(IR_RUESTUNG_SLOTS).forEach(typ => {
        const info = IR_RUESTUNG_SLOTS[typ];
        for (let i = 1; i <= info.anzahl; i++) slots.push(info.anzahl > 1 ? typ + '_' + i : typ);
    });
    return slots;
}

function irRuestungsteilTyp(slot) {
    return slot.replace(/_\d+$/, '');
}

function irRuestungsteile(kontext) {
    const daten = kontext || appData;
    if (!daten.eldaraRuestungsteile || typeof daten.eldaraRuestungsteile !== 'object') {
        const leer = {};
        irRuestungsteilSlots().forEach(s => { leer[s] = null; });
        daten.eldaraRuestungsteile = leer;
    }
    return daten.eldaraRuestungsteile;
}

// Summe aller getragenen Rüstungswerte (bestimmt die Stufe).
function irRuestungswert(kontext) {
    const teile = irRuestungsteile(kontext);
    let summe = 0;
    Object.keys(teile).forEach(slot => {
        const material = teile[slot];
        if (!material) return;
        const info = IR_RUESTUNG_WERTE[irRuestungsteilTyp(slot)];
        if (info && info[material]) summe += info[material].wert;
    });
    return summe;
}

// Gold-Warenwert der aktuell getragenen Teile (nur zur Anzeige).
function irRuestungspreis(kontext) {
    const teile = irRuestungsteile(kontext);
    let summe = 0;
    Object.keys(teile).forEach(slot => {
        const material = teile[slot];
        if (!material) return;
        const info = IR_RUESTUNG_WERTE[irRuestungsteilTyp(slot)];
        if (info && info[material]) summe += info[material].preis;
    });
    return summe;
}

function irRuestungsstufe(wert) {
    if (wert >= 21) return 'schwer';
    if (wert >= 11) return 'mittel';
    if (wert >= 1) return 'leicht';
    return 'ungepanzert';
}

function irRuestungsteilAendern(slot, material) {
    const teile = irRuestungsteile();
    teile[slot] = IR_RUESTUNG_MATERIAL.includes(material) ? material : null;
    saveData();
    renderInventarRaster();
}

// --- Zonen (hängen von Rüstung/Zusatztaschen ab, darum als Funktion statt Konstante) ---

// kontext = appData eines Spielers (Standard: der eigene). Für den Schiffs-
// Kapazitätscheck (schiffsinventar.js) wird hier der fremde Bogen-Stand
// durchgereicht, damit die Zonen des ANFRAGENDEN Spielers gelten, nicht die
// eigenen des SL.
function irZonenDefinition(kontext) {
    const daten = kontext || appData;
    const stufe = irRuestungsstufe(irRuestungswert(daten));
    const ruestungsMalus = stufe === 'schwer' ? 2 : (stufe === 'mittel' ? 1 : 0);
    const zonen = [
        { id: 'guertel', titel: 'Gürtel', breite: 6, deaktiviert: 0 },
        { id: 'guertelbeutel', titel: 'Gürtelbeutel', breite: 2, deaktiviert: 0 },
        { id: 'rucksack', titel: 'Rucksack', breite: 12, deaktiviert: ruestungsMalus }
    ];
    (daten.eldaraZusatztaschen || []).forEach((art, i) => {
        const info = IR_ZUSATZTASCHE_DATEN[art] || IR_ZUSATZTASCHE_DATEN.klein;
        zonen.push({ id: 'zusatz' + i, titel: `Zusatztasche (${info.label})`, breite: info.breite, deaktiviert: 0, zusatzIndex: i, zusatzArt: art });
    });
    return zonen;
}

function irAlleSlots(kontext) {
    const slots = [];
    irZonenDefinition(kontext).forEach(zone => {
        const nutzbar = Math.max(0, zone.breite - (zone.deaktiviert || 0));
        for (let i = 0; i < nutzbar; i++) slots.push(zone.id + '_' + i);
    });
    return slots;
}

function irZoneUndIndex(slot) {
    const i = slot.lastIndexOf('_');
    return { zoneId: slot.slice(0, i), index: parseInt(slot.slice(i + 1), 10) };
}

// --- Reine Platzierungs-Logik ---

function irRasterDaten() {
    if (!appData.inventarRaster || typeof appData.inventarRaster !== 'object' || Array.isArray(appData.inventarRaster)) {
        appData.inventarRaster = {};
    }
    // Nach Rüstungswechsel oder entfernter Zusatztasche können Zellen wegfallen -
    // Karteileichen mit ungültigem Slot hier aufräumen (die Items selbst bleiben
    // in appData.inventory und werden beim nächsten Render neu einsortiert).
    const gueltig = new Set(irAlleSlots());
    Object.keys(appData.inventarRaster).forEach(s => { if (!gueltig.has(s)) delete appData.inventarRaster[s]; });
    return appData.inventarRaster;
}

function irItemsById() {
    const map = {};
    (appData.inventory || []).forEach(i => { map[i.id] = i; });
    return map;
}

// Rundet die Katalog-Größe (0,5/1/2/3) auf ganze Raster-Zellen auf.
function irSlotKostenVon(groesseRoh) {
    return Math.max(1, Math.ceil(Number(groesseRoh) || 1));
}

function irSlotKosten(item) {
    return irSlotKostenVon(item ? item.irGroesse : 1);
}

function irZellenFuer(slot, groesse, kontext) {
    const { zoneId, index } = irZoneUndIndex(slot);
    const zone = irZonenDefinition(kontext).find(z => z.id === zoneId);
    if (!zone) return [];
    const nutzbar = Math.max(0, zone.breite - (zone.deaktiviert || 0));
    const zellen = [];
    for (let k = 0; k < groesse; k++) {
        if (index + k >= nutzbar) return []; // würde über die Zonengrenze hinausragen
        zellen.push(zoneId + '_' + (index + k));
    }
    return zellen;
}

function irAnkerVon(raster, itemId, kontext) {
    return irAlleSlots(kontext).find(s => raster[s] && raster[s].itemId === itemId && !raster[s].cont) || null;
}

function irOhneItem(raster, itemId) {
    const next = Object.assign({}, raster);
    Object.keys(next).forEach(s => { if (next[s] && next[s].itemId === itemId) next[s] = null; });
    return next;
}

function irMitItem(raster, itemId, slot, groesse, kontext) {
    const next = Object.assign({}, raster);
    const zellen = irZellenFuer(slot, groesse, kontext);
    zellen.forEach((z, i) => { next[z] = i === 0 ? { itemId } : { itemId, cont: true }; });
    return next;
}

// Erster freie Platz (beliebige Startposition innerhalb einer Zone, solange
// genug zusammenhängende Zellen frei sind - anders als bei einem starren
// Paar-Raster gibt es hier keine festen Anker-Positionen).
function irErstesFreies(raster, groesse, kontext, reihenfolge) {
    const liste = reihenfolge || irAlleSlots(kontext);
    for (const slot of liste) {
        const zellen = irZellenFuer(slot, groesse, kontext);
        if (zellen.length < groesse) continue;
        if (zellen.every(z => raster[z] == null)) return zellen[0];
    }
    return null;
}

function irVerschieben(raster, itemsById, itemId, targetSlot, kontext) {
    const item = itemsById[itemId];
    if (!item) return { ok: false, grund: 'unbekannt' };
    const groesse = irSlotKosten(item);
    const zielZellen = irZellenFuer(targetSlot, groesse, kontext);
    if (zielZellen.length < groesse) return { ok: false, grund: 'passtNicht' };

    const vonAnker = irAnkerVon(raster, itemId, kontext);
    const blocker = new Set();
    zielZellen.forEach(z => { const belegt = raster[z]; if (belegt && belegt.itemId !== itemId) blocker.add(belegt.itemId); });

    if (blocker.size === 0) {
        return { ok: true, raster: irMitItem(irOhneItem(raster, itemId), itemId, targetSlot, groesse, kontext) };
    }
    if (groesse === 1 && blocker.size === 1) {
        const andereId = [...blocker][0];
        const andere = itemsById[andereId];
        if (andere && irSlotKosten(andere) === 1 && vonAnker) {
            let next = irOhneItem(raster, itemId);
            next = irOhneItem(next, andereId);
            next = irMitItem(next, itemId, targetSlot, 1, kontext);
            next = irMitItem(next, andereId, vonAnker, 1, kontext);
            return { ok: true, raster: next };
        }
    }
    return { ok: false, grund: groesse > 1 ? 'zuGross' : 'belegt' };
}

// Platziert ein Item, das noch keinen Platz hat, an den ersten freien Platz.
function irAutoPlatzieren(itemId) {
    const raster = irRasterDaten();
    const vorhanden = irAnkerVon(raster, itemId);
    if (vorhanden) return vorhanden;
    const item = irItemsById()[itemId];
    if (!item) return null;
    const groesse = irSlotKosten(item);
    const slot = irErstesFreies(raster, groesse);
    if (!slot) return null;
    appData.inventarRaster = irMitItem(raster, itemId, slot, groesse);
    return slot;
}

function irFehlendeEinsortieren() {
    (appData.inventory || []).forEach(item => irAutoPlatzieren(item.id));
}

// --- Waffen <-> Raster (siehe Kommentar am Dateikopf) ------------------------

// Läuft bei jedem Render, solange Eldara aktiv ist - von Natur aus idempotent,
// da appData.weapons nach erfolgreicher Migration leer ist (kein Zustands-Flag
// nötig, funktioniert auch nach einem Multiplayer-Sync sauber).
function irWaffenNachRasterMigrieren() {
    if (!Array.isArray(appData.weapons) || appData.weapons.length === 0) return;
    const bleibtKlassisch = [];
    appData.weapons.forEach(w => {
        const groesse = 2; // Standardannahme (Säbel/Muskete) - vom Spieler an der Karte änderbar
        if (!irHatPlatzFuer(groesse)) { bleibtKlassisch.push(w); return; }
        if (!appData.inventory) appData.inventory = [];
        const item = {
            id: 'inv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            name: w.name || 'Waffe',
            amount: 1,
            description: w.description || '',
            showDesc: !!w.showDesc,
            irGroesse: groesse,
            istWaffe: true,
            schaden: w.damage || ''
        };
        appData.inventory.push(item);
        irAutoPlatzieren(item.id);
    });
    appData.weapons = bleibtKlassisch;
}

// Läuft bei jedem Render, solange Eldara NICHT aktiv ist - idempotent, sobald
// keine Waffen-Einträge mehr im Raster stecken.
function irWaffenAusRasterMigrieren() {
    const waffenItems = (appData.inventory || []).filter(i => i.istWaffe);
    if (!waffenItems.length) return;
    if (!appData.weapons) appData.weapons = [];
    waffenItems.forEach(item => {
        appData.weapons.push({
            id: 'w_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            name: item.name,
            damage: item.schaden || '',
            description: item.description || '',
            showDesc: !!item.showDesc
        });
        appData.inventory = appData.inventory.filter(i => i.id !== item.id);
        appData.inventarRaster = irOhneItem(irRasterDaten(), item.id);
    });
}

// Für das Schiffs-Inventar (schiffsinventar.js): passt ein Gegenstand dieser
// Katalog-Größe noch ins EIGENE Raster?
function irHatPlatzFuer(groesseRoh) {
    return irErstesFreies(irRasterDaten(), irSlotKostenVon(groesseRoh)) !== null;
}

// --- Zusatztaschen -------------------------------------------------------------

function irZusatztascheHinzufuegen(art) {
    if (!Array.isArray(appData.eldaraZusatztaschen)) appData.eldaraZusatztaschen = [];
    if (appData.eldaraZusatztaschen.length >= IR_ZUSATZTASCHE_MAX) { irStatus(`Maximal ${IR_ZUSATZTASCHE_MAX} Zusatztaschen gleichzeitig.`, true); return; }
    appData.eldaraZusatztaschen.push(art === 'gross' ? 'gross' : 'klein');
    saveData();
    renderInventarRaster();
}

function irZusatztascheEntfernen(index) {
    if (!Array.isArray(appData.eldaraZusatztaschen)) return;
    appData.eldaraZusatztaschen.splice(index, 1);
    saveData();
    renderInventarRaster();
}

// --- Item-Verwaltung ----------------------------------------------------------

function irItemHinzufuegen() {
    const nameEl = document.getElementById('ir-neu-name');
    const mengeEl = document.getElementById('ir-neu-menge');
    const groesseEl = document.getElementById('ir-neu-groesse');
    const descEl = document.getElementById('ir-neu-desc');
    const istWaffeEl = document.getElementById('ir-neu-istwaffe');
    const schadenEl = document.getElementById('ir-neu-schaden');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    const groesse = groesseEl ? parseFloat(groesseEl.value) || 1 : 1;
    if (!irHatPlatzFuer(groesse)) { irStatus(`Kein Platz mehr für einen Gegenstand dieser Größe (${groesse}).`, true); return; }
    if (!appData.inventory) appData.inventory = [];
    const istWaffe = !!(istWaffeEl && istWaffeEl.checked);

    const item = {
        id: 'inv_' + Date.now(),
        name,
        amount: Math.max(1, parseInt(mengeEl ? mengeEl.value : 1) || 1),
        description: (descEl ? descEl.value : '').trim(),
        showDesc: false,
        irGroesse: groesse,
        istWaffe,
        schaden: istWaffe ? (schadenEl ? schadenEl.value.trim() : '') : ''
    };
    appData.inventory.push(item);
    irAutoPlatzieren(item.id);
    if (typeof addActivityLog === 'function') addActivityLog(`Erhalten: ${item.amount}x ${name}`, 'activity-good', `<i class="fa-solid fa-${istWaffe ? 'khanda' : 'box'}"></i>`);
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    if (mengeEl) mengeEl.value = '1';
    if (descEl) descEl.value = '';
    if (istWaffeEl) istWaffeEl.checked = false;
    if (schadenEl) { schadenEl.value = ''; schadenEl.style.display = 'none'; }
    saveData();
    renderInventarRaster();
}

function irItemEntfernen(itemId) {
    const idx = (appData.inventory || []).findIndex(i => i.id === itemId);
    if (idx < 0) return;
    const item = appData.inventory[idx];
    if (!confirm(`"${item.name || 'Item'}" wirklich löschen?`)) return;
    if (typeof addActivityLog === 'function') addActivityLog(`Verloren/Verbraucht: ${item.name || 'Item'}`, 'activity-bad', '<i class="fa-solid fa-trash"></i>');
    appData.inventory.splice(idx, 1);
    appData.inventarRaster = irOhneItem(irRasterDaten(), itemId);
    saveData();
    renderInventarRaster();
}

function irMengeAendern(itemId, delta) {
    const item = (appData.inventory || []).find(i => i.id === itemId);
    if (!item) return;
    const neu = (parseInt(item.amount) || 1) + delta;
    if (neu <= 0) { irItemEntfernen(itemId); return; }
    item.amount = neu;
    if (typeof addActivityLog === 'function') {
        addActivityLog(`${delta > 0 ? 'Gefunden' : 'Verbraucht'}: 1x ${item.name || 'Item'}`, delta > 0 ? 'activity-good' : 'activity-bad', `<i class="fa-solid fa-${delta > 0 ? 'plus' : 'minus'}"></i>`);
    }
    saveData();
    renderInventarRaster();
}

function irNameAendern(itemId, name) {
    const item = (appData.inventory || []).find(i => i.id === itemId);
    if (!item) return;
    item.name = name;
    saveData();
}

function irBeschreibungAendern(itemId, text) {
    const item = (appData.inventory || []).find(i => i.id === itemId);
    if (!item) return;
    item.description = text;
    saveData();
}

function irSchadenAendern(itemId, wert) {
    const item = (appData.inventory || []).find(i => i.id === itemId);
    if (!item) return;
    item.schaden = wert;
    saveData();
}

function irBeschreibungToggle(itemId) {
    const item = (appData.inventory || []).find(i => i.id === itemId);
    if (!item) return;
    item.showDesc = !item.showDesc;
    saveData();
    renderInventarRaster();
}

// Größe umschalten - sucht sofort einen neuen Platz; ohne freien Platz bleibt
// alles wie es war (der Gegenstand geht nie verloren).
function irGroesseAendern(itemId, neueGroesse) {
    const item = (appData.inventory || []).find(i => i.id === itemId);
    if (!item) return;
    const alteKosten = irSlotKosten(item);
    const neueKosten = irSlotKostenVon(neueGroesse);
    if (neueKosten === alteKosten) { item.irGroesse = neueGroesse; saveData(); return; }
    const rasterOhne = irOhneItem(irRasterDaten(), itemId);
    const slot = irErstesFreies(rasterOhne, neueKosten);
    if (!slot) { irStatus('Kein Platz für diese Größe frei.', true); return; }
    item.irGroesse = neueGroesse;
    appData.inventarRaster = irMitItem(rasterOhne, itemId, slot, neueKosten);
    saveData();
    renderInventarRaster();
}

// --- Drag & Drop (native HTML5 - reicht am Desktop) --------------------------

function irDragStart(e, itemId) {
    irDragItemId = itemId;
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', itemId); } catch (err) { /* Safari-Krücke, irDragItemId reicht als Fallback */ }
}

function irDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('ir-slot-over');
}

function irDragLeave(e) {
    e.currentTarget.classList.remove('ir-slot-over');
}

function irDrop(e, targetSlot) {
    e.preventDefault();
    e.currentTarget.classList.remove('ir-slot-over');
    const itemId = irDragItemId || e.dataTransfer.getData('text/plain');
    irDragItemId = null;
    if (!itemId) return;
    const res = irVerschieben(irRasterDaten(), irItemsById(), itemId, targetSlot);
    if (!res.ok) {
        irStatus(res.grund === 'zuGross' || res.grund === 'passtNicht' ? 'Braucht mehr zusammenhängende freie Felder.' : 'Feld ist belegt.', true);
        return;
    }
    appData.inventarRaster = res.raster;
    saveData();
    renderInventarRaster();
}

// --- Darstellung ---------------------------------------------------------------

function irSlotHtml(slot, item, breite) {
    if (!item) {
        return `<div class="ir-slot ir-slot-leer" data-irslot="${slot}"><i class="fa-solid fa-plus ir-slot-leer-icon"></i></div>`;
    }
    const groesse = irSlotKosten(item);
    const waffenZeile = item.istWaffe ? `
            <div class="ir-karte-reihe ir-waffen-reihe">
                <input type="text" class="ir-input ir-schaden-input" value="${escapeHtml(item.schaden || '')}" placeholder="Schaden (1w10)" data-irschaden="${escapeHtml(item.id)}">
                <button class="btn-icon-small ir-wuerfeln-btn" data-irwuerfeln="${escapeHtml(item.id)}" title="Schaden würfeln"><i class="fa-solid fa-dice"></i></button>
            </div>` : '';
    return `
    <div class="ir-slot ${breite > 1 ? 'ir-slot-breit-' + breite : ''}" data-irslot="${slot}">
        <div class="inv-item card-layout ir-karte ${item.istWaffe ? 'ir-karte-waffe' : ''}" draggable="true" data-iritem="${escapeHtml(item.id)}" title="Ziehen zum Umsortieren">
            <div class="ir-name-reihe">
                ${item.istWaffe ? '<i class="fa-solid fa-khanda ir-waffe-icon" title="Waffe"></i>' : ''}
                <input type="text" class="ir-name" value="${escapeHtml(item.name)}" data-irname="${escapeHtml(item.id)}" placeholder="Name …">
            </div>
            ${waffenZeile}
            <div class="ir-karte-reihe">
                <div class="item-amount-wrapper">
                    <button class="btn-icon-small" data-irminus="${escapeHtml(item.id)}">-</button>
                    <span class="item-amount">${item.amount || 1}</span>
                    <button class="btn-icon-small" data-irplus="${escapeHtml(item.id)}">+</button>
                </div>
                <select class="ir-groesse-select" data-irgroesse="${escapeHtml(item.id)}" title="Größe laut Regelwerk S.26">
                    ${IR_GROESSEN_KATALOG.map(g => `<option value="${g.wert}" ${Number(item.irGroesse) === g.wert ? 'selected' : ''}>${g.wert}</option>`).join('')}
                </select>
                <button class="btn-delete-icon" data-irdel="${escapeHtml(item.id)}"><i class="fa-solid fa-trash"></i></button>
            </div>
            <button class="item-desc-toggle ir-desc-toggle" data-irdesctoggle="${escapeHtml(item.id)}"><i class="fa-solid fa-chevron-${item.showDesc ? 'up' : 'down'}"></i> Details</button>
            <textarea class="item-description ${item.showDesc ? 'show' : ''}" placeholder="Beschreibung / Effekte..." data-irdesc="${escapeHtml(item.id)}">${escapeHtml(item.description || '')}</textarea>
        </div>
    </div>`;
}

function irZoneHtml(zone, raster, items) {
    const nutzbar = Math.max(0, zone.breite - (zone.deaktiviert || 0));
    const zellenHtml = [];
    for (let i = 0; i < nutzbar; i++) {
        const slot = zone.id + '_' + i;
        const belegung = raster[slot];
        if (belegung && belegung.cont) continue;
        const item = belegung ? items[belegung.itemId] : null;
        const groesse = item ? irSlotKosten(item) : 1;
        zellenHtml.push(irSlotHtml(slot, item, groesse));
        if (item && groesse > 1) i += groesse - 1;
    }
    const abbauKnopf = zone.zusatzArt ? `<button class="x-mini x-mini-danger" onclick="irZusatztascheEntfernen(${zone.zusatzIndex})" title="Zusatztasche ablegen"><i class="fa-solid fa-xmark"></i></button>` : '';
    const deaktiviertHinweis = zone.deaktiviert ? `<span class="ir-zone-malus">(-${zone.deaktiviert} durch Rüstung)</span>` : '';
    return `<div class="ir-gruppe">
        <div class="ir-gruppe-titel">${escapeHtml(zone.titel)} <span class="ir-zone-count">${nutzbar} Plätze</span> ${deaktiviertHinweis} ${abbauKnopf}</div>
        <div class="ir-slots">${zellenHtml.join('')}</div>
    </div>`;
}

function renderInventarRaster() {
    const box = document.getElementById('inventar-raster');
    if (!box) return;
    irFehlendeEinsortieren();
    const raster = irRasterDaten();
    const items = irItemsById();
    const zonen = irZonenDefinition();
    const unplatziert = (appData.inventory || []).filter(item => !irAnkerVon(raster, item.id));
    const teile = irRuestungsteile();
    const ruestungswert = irRuestungswert();
    const ruestungsstufe = irRuestungsstufe(ruestungswert);
    const ruestungspreis = irRuestungspreis();
    const taschen = appData.eldaraZusatztaschen || [];
    const handelnMalus = taschen.reduce((sum, art) => sum + (IR_ZUSATZTASCHE_DATEN[art] || IR_ZUSATZTASCHE_DATEN.klein).malus, 0);

    box.innerHTML = `
        <p class="ir-hint">Eldara-Regelwerk (S.25f.): Gürtel, Gürtelbeutel, Rucksack und optionale Zusatztaschen - jede Zone hat feste Plätze, Gegenstände belegen 1-3 Zellen je nach Größe. <i class="fa-solid fa-circle-question help-icon" onclick="showHelp('inventarraster')" title="Hilfe zum Rasterinventar"></i></p>
        <div class="ir-einstellungen">
            <div class="ir-einstellung ir-ruestung-block">
                <div class="ir-ruestung-titel">Rüstung <span class="ir-zone-malus">${ruestungswert} Rüstungswert - ${IR_RUESTUNGSSTUFE_LABEL[ruestungsstufe]}${ruestungspreis ? ` (Warenwert ${ruestungspreis}G)` : ''}</span></div>
                <div class="ir-ruestung-teile">
                    ${irRuestungsteilSlots().map((slot) => {
                        const typ = irRuestungsteilTyp(slot);
                        const info = IR_RUESTUNG_SLOTS[typ];
                        const nummer = slot.split('_')[1];
                        const beschriftung = info.anzahl > 1 ? `${info.label} ${nummer === '1' ? 'L' : 'R'}` : info.label;
                        return `<label class="ir-ruestung-teil">${beschriftung}
                            <select data-irruestteil="${slot}" class="ir-input">
                                <option value="" ${!teile[slot] ? 'selected' : ''}>-</option>
                                ${IR_RUESTUNG_MATERIAL.map(mat => {
                                    const d = IR_RUESTUNG_WERTE[typ][mat];
                                    return `<option value="${mat}" ${teile[slot] === mat ? 'selected' : ''}>${IR_RUESTUNG_MATERIAL_LABEL[mat]} (+${d.wert}, ${d.preis}G)</option>`;
                                }).join('')}
                            </select>
                        </label>`;
                    }).join('')}
                </div>
                <p class="ir-hint">Rucksack-Malus: ${ruestungsstufe === 'schwer' ? '-2 Plätze' : ruestungsstufe === 'mittel' ? '-1 Platz' : 'keiner'} durch diese Stufe. <i class="fa-solid fa-circle-question help-icon" onclick="showHelp('inventarraster')" title="Weitere Mali laut Regelwerk"></i></p>
            </div>
            <div class="ir-einstellung">
                Zusatztaschen (${taschen.length}/${IR_ZUSATZTASCHE_MAX})
                <button class="ir-mini-btn" onclick="irZusatztascheHinzufuegen('klein')" ${taschen.length >= IR_ZUSATZTASCHE_MAX ? 'disabled' : ''}>+ Klein (+3 / -3 Handeln)</button>
                <button class="ir-mini-btn" onclick="irZusatztascheHinzufuegen('gross')" ${taschen.length >= IR_ZUSATZTASCHE_MAX ? 'disabled' : ''}>+ Groß (+5 / -5 Handeln)</button>
            </div>
        </div>
        ${handelnMalus ? `<p class="ir-hint ir-warnung"><i class="fa-solid fa-triangle-exclamation"></i> Zusatztaschen kosten dich aktuell -${handelnMalus} auf Handeln, solange du sie trägst - beim Würfeln selbst im Bonus/Malus-Feld eintragen.</p>` : ''}
        ${unplatziert.length ? `<p class="ir-hint ir-warnung"><i class="fa-solid fa-triangle-exclamation"></i> Kein Platz mehr für: ${unplatziert.map(i => escapeHtml(i.name)).join(', ')} - erst Platz schaffen (löschen, Größe ändern oder eine Zusatztasche anlegen).</p>` : ''}
        ${(appData.weapons || []).length ? `<p class="ir-hint ir-warnung"><i class="fa-solid fa-triangle-exclamation"></i> Passt (noch) nicht ins Raster: ${appData.weapons.map(w => escapeHtml(w.name)).join(', ')} - bleibt vorerst im klassischen Waffen-Bestand, bis Platz frei ist.</p>` : ''}
        <div class="ir-gruppen">
            ${zonen.map(z => irZoneHtml(z, raster, items)).join('')}
        </div>
        <div id="ir-status" class="x-hint"></div>
        <div class="ir-form">
            <input type="text" id="ir-neu-name" class="ir-input" placeholder="Item Name..." onkeydown="if(event.key==='Enter') irItemHinzufuegen()">
            <select id="ir-neu-groesse" class="ir-input ir-input-groesse" title="Größe laut Regelwerk S.26">
                ${IR_GROESSEN_KATALOG.map(g => `<option value="${g.wert}" ${g.wert === 1 ? 'selected' : ''}>${g.label}</option>`).join('')}
            </select>
            <input type="number" id="ir-neu-menge" class="ir-input ir-input-menge" value="1" min="1" title="Menge">
            <label class="ir-waffe-check"><input type="checkbox" id="ir-neu-istwaffe"> Waffe</label>
            <input type="text" id="ir-neu-schaden" class="ir-input ir-input-schaden" placeholder="Schaden (z.B. 1w10)" style="display:none">
            <textarea id="ir-neu-desc" class="ir-input ir-input-desc" placeholder="Optionale Beschreibung / Effekte..." onkeydown="if(event.key==='Enter'){event.preventDefault(); irItemHinzufuegen();}"></textarea>
            <button class="ir-add-btn" onclick="irItemHinzufuegen()"><i class="fa-solid fa-plus"></i> Hinzufügen</button>
        </div>`;

    const istWaffeCb = document.getElementById('ir-neu-istwaffe');
    if (istWaffeCb) istWaffeCb.addEventListener('change', () => {
        const schadenEl = document.getElementById('ir-neu-schaden');
        if (schadenEl) schadenEl.style.display = istWaffeCb.checked ? '' : 'none';
    });

    box.querySelectorAll('[data-irruestteil]').forEach(el => el.addEventListener('change', () => irRuestungsteilAendern(el.dataset.irruestteil, el.value)));

    box.querySelectorAll('[data-irslot]').forEach(el => {
        el.addEventListener('dragover', irDragOver);
        el.addEventListener('dragleave', irDragLeave);
        el.addEventListener('drop', (e) => irDrop(e, el.dataset.irslot));
    });
    box.querySelectorAll('[data-iritem]').forEach(el => el.addEventListener('dragstart', (e) => irDragStart(e, el.dataset.iritem)));
    box.querySelectorAll('[data-irname]').forEach(el => el.addEventListener('input', () => irNameAendern(el.dataset.irname, el.value)));
    box.querySelectorAll('[data-irgroesse]').forEach(el => el.addEventListener('change', () => irGroesseAendern(el.dataset.irgroesse, parseFloat(el.value) || 1)));
    box.querySelectorAll('[data-irdel]').forEach(el => el.addEventListener('click', () => irItemEntfernen(el.dataset.irdel)));
    box.querySelectorAll('[data-irminus]').forEach(el => el.addEventListener('click', () => irMengeAendern(el.dataset.irminus, -1)));
    box.querySelectorAll('[data-irplus]').forEach(el => el.addEventListener('click', () => irMengeAendern(el.dataset.irplus, 1)));
    box.querySelectorAll('[data-irdesctoggle]').forEach(el => el.addEventListener('click', () => irBeschreibungToggle(el.dataset.irdesctoggle)));
    box.querySelectorAll('[data-irdesc]').forEach(el => el.addEventListener('input', () => irBeschreibungAendern(el.dataset.irdesc, el.value)));
    box.querySelectorAll('[data-irschaden]').forEach(el => el.addEventListener('input', () => irSchadenAendern(el.dataset.irschaden, el.value)));
    box.querySelectorAll('[data-irwuerfeln]').forEach(el => el.addEventListener('click', () => {
        const item = irItemsById()[el.dataset.irwuerfeln];
        if (item && typeof rollWeaponDamage === 'function') rollWeaponDamage(item.schaden, item.name);
    }));
}

function irStatus(text, warnung) {
    const el = document.getElementById('ir-status');
    if (!el) return;
    el.textContent = text;
    el.style.color = warnung ? 'var(--color-dmg)' : 'var(--color-heal)';
    el.style.opacity = '1';
    clearTimeout(irStatus._t);
    irStatus._t = setTimeout(() => { el.style.opacity = '0'; }, 3500);
}
