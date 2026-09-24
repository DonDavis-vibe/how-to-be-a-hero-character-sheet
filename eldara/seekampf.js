// How to be a Hero - Seekampf (Eldara-Hausregel)
//
// Taktischer Seekampf-Tracker fürs Regelwerk-Kapitel "Seekampf" (RW 4.1
// S.3-5, siehe hausregeln/quellen/rw41.txt Zeile ~109-245). Nur sichtbar,
// wenn das Regelpaket "eldora-arrrrr" aktiv ist (eldaraAktiv() in
// hausregeln.js). Der Zustand (Schiffe, Initiative, Wind, Log) wird per
// Live-Sync an alle verbundenen Spieler geschickt.
//
// Reine Bewegungs-/Regelschicht - die eigentliche Karte (Raster, Zoom/Pan,
// Figuren per Drag & Drop, Zeichnen, Nebel des Krieges) läuft komplett über
// die gemeinsame Karten-Engine aus karten.js (die wiederum battlemap.js aus
// dem Schwesterprojekt demonslayer unverändert nutzt). Seekampf.js hält hier
// keine eigene Karte/Leinwand mehr - Schiffe und Markierungen werden nur als
// Figuren auf die gerade aktive Karte synchronisiert (skFigurenAbgleichen).
// Wechselt der SL im Karte-Panel die aktive Karte, verschwinden Schiffe aus
// der Ansicht, bis er zur Seekarte zurückwechselt - ihre Werte bleiben
// unangetastet, es ist rein die Sichtbarkeit auf der Leinwand. Hier drumherum
// kommt die Eldara-Spielmechanik:
//
// AUTOMATISIERT (reine Würfelmechanik ohne Charakterwerte):
//   - Initiative (1W10 pro Einheit, S.3)
//   - Wind (1W8 Richtung + 1W6-Countdown bis zum nächsten Wechsel, S.3)
//   - Bewegung (Grundgeschwindigkeit-Würfel + Windbonus, S.4)
//   - Kanonenfeuer-Trefferquote (W100 nach erfolgreicher Probe, S.4)
//   - Kritische Trefferzonen (1W4, S.4)
//   - Ramme-voraus-Schaden (2W10 + 1W10 pro 20t Lager, einzige Manöver-
//     Schadensformel, die ohne Charakterwerte auskommt, S.5)
//
// NICHT AUTOMATISIERT (Regelwerk verlangt eine Charakter-Probe wie Steuern/
// Schießen/Entern/Heimlichkeit - dieser Tracker kennt keine Skill-Werte,
// die liegen auf den einzelnen Charakterbögen): die Manöver-Liste (S.4f)
// erscheint als Nachschlage-Karte mit Malus und Effekttext, nicht als
// Würfel-Knopf - die Probe selbst läuft über das normale Würfel-Tool des
// steuernden/schießenden Spielers (Malus manuell im Bonus/Malus-Feld
// eintragen). Prozentuale Manöver-Effekte (z.B. "+10% Trefferchance")
// landen als sichtbare Erinnerungs-Badges auf der betroffenen Einheit,
// werden aber NICHT automatisch in die Kanonenfeuer-Trefferquote
// eingerechnet - genau wie der Zusatztaschen-Malus im Rasterinventar nur
// als Hinweis erscheint, nicht automatisch verrechnet wird.
//
// Datenmodell (persistiert als JSON unter SEEKAMPF_KEY):
//   seekampf = {
//     runde, wind: { richtung (0-7, siehe SK_WIND_RICHTUNGEN), naechsterWechsel },
//     einheiten: [ { id, name, seite ('spieler'|'gegner'|'neutral'), farbe,
//                    klasse (optional, nur zur Anzeige/Vorbefüllung),
//                    struktur: { aktuell, max }, geschwindigkeit (Würfelformel-
//                    Text, z.B. "w8+1"), kanonen, lager, effekte: [ { text,
//                    rundenUebrig (null = dauerhaft, bis SL entfernt) } ] } ],
//     initiative: [ { id, wurf } ] (sortiert), initiativeIndex,
//     log: [ text, ... ] (jüngste zuerst, gekappt)
//   }
// Die Kartendaten (Positionen, Rasterfelder, Hintergrundbild, Nebel) liegen
// nicht mehr hier, sondern in karten.js (KARTEN_KEY) - eine Karte unter
// vielen, wie jede andere auch.

const SEEKAMPF_KEY = 'htbah_gm_seekampf';
const SEEKAMPF_LOG_MAX = 40;

const SK_WIND_RICHTUNGEN = ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW'];
const SK_WIND_BONUS = {
    mit: { label: 'Mit dem Wind', formel: '1w8' },
    diagonal: { label: 'Diagonal', formel: '1w6' },
    quer: { label: 'Quer', formel: '1w4' },
    gegen: { label: 'Gegen den Wind', formel: null }
};
const SK_SEITEN = {
    spieler: { label: 'Spieler-Crew', farbe: '#57c2f0' },
    gegner: { label: 'Gegner', farbe: '#ef4444' },
    neutral: { label: 'Neutral', farbe: '#94a3b8' }
};

// Kartenmarkierungen ohne eigene Kampfwerte (Riffe, Inseln, Wracks, ...) -
// eigene, kleinere Kartentoken (skFreieSpawnPosition/addFigur), aber KEIN
// Eintrag in seekampf.einheiten - tauchen daher weder in der Einheiten-Liste
// noch in Initiative/Kampf-Log-Mechanik auf, nur als Orientierung auf der Karte.
const SK_MARKER_GROESSE_STANDARD = 0.75;
const SK_MARKER_GROESSE_SCHRITT = 0.2;
const SK_MARKER_GROESSE_MIN = 0.35;
const SK_MARKER_GROESSE_MAX = 3;

const SK_MARKER_TYPEN = {
    riff: { label: 'Riff / Untiefe', farbe: '#8b5e34', icon: '🪨' },
    insel: { label: 'Insel', farbe: '#4ade80', icon: '🏝️' },
    wrack: { label: 'Wrack', farbe: '#6b7280', icon: '☠️' },
    sonstiges: { label: 'Sonstiges', farbe: '#f0b429', icon: '📍' }
};

// Segelschiff-Symbol für Kampfschiffe - selbes Icon für alle Klassen (die
// Seite/Farbe unterscheidet sie, der Name darunter identifiziert sie einzeln;
// ein Symbol pro Schiffsklasse wäre hübscher, aber battlemap.js kennt nur ein
// Bild pro Figur, kein Klassen-Icon-System).
const SK_SCHIFF_ICON = '⛵';

// battlemap.js zeichnet Figuren ohne "Porträt" nur als Kreis + 2-Buchstaben-
// Kürzel - für Marker UND Schiffe generieren wir stattdessen ein kleines
// Icon-Bild (Emoji auf farbigem Kreis) und setzen es über setFigurBild() als
// "Porträt". Je Icon+Farbe-Kombination nur einmal gerendert und gecacht, da
// immer identisch.
const SK_ICON_CACHE = {};
function skIconBild(icon, farbe) {
    const key = icon + '|' + farbe;
    if (SK_ICON_CACHE[key]) return SK_ICON_CACHE[key];
    const groesse = 96;
    const canvas = document.createElement('canvas');
    canvas.width = groesse; canvas.height = groesse;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = farbe;
    ctx.beginPath();
    ctx.arc(groesse / 2, groesse / 2, groesse / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = `${Math.round(groesse * 0.58)}px "Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, groesse / 2, groesse / 2 + groesse * 0.03);
    const dataUrl = canvas.toDataURL();
    SK_ICON_CACHE[key] = dataUrl;
    return dataUrl;
}

// Echtes Artwork (von der Gruppe generiert, siehe seekampf-icons.js) statt
// Emoji, wo vorhanden - auf transparentem Grund, OHNE gebackene Farbe. Den
// farbigen Ring um das Porträt malt battlemap.js selbst anhand von f.farbe
// (siehe zeichneFigur()), bleibt also ein schlanker, gleichbleibender Rahmen
// statt mit der vollen Kreisfläche mitzuskalieren - beim Größer/Kleiner-
// Stellen wächst/schrumpft dadurch sichtbar das Icon, nicht der Ring. Emoji-
// Fallback bleibt für den Fall, dass mal ein Icon fehlt.
function skMarkerBild(typ) {
    const info = SK_MARKER_TYPEN[typ] || SK_MARKER_TYPEN.sonstiges;
    const vorgerendert = typeof SK_ICON_DATENURLS !== 'undefined' ? SK_ICON_DATENURLS[typ] : null;
    return vorgerendert || skIconBild(info.icon, info.farbe);
}

function skSchiffBild(farbe) {
    const vorgerendert = typeof SK_ICON_DATENURLS !== 'undefined' ? SK_ICON_DATENURLS.schiff : null;
    return vorgerendert || skIconBild(SK_SCHIFF_ICON, farbe);
}

// Manöver-Referenz (S.4f, rw41.txt Zeile ~187-244) - Wurf&Effekt-Spalte
// wörtlich übernommen. "±" im Rohtext ist durchgehend ein Malus auf die
// genannte Probe (steigt 5/10/15 mit der Schwierigkeit des Manövers).
const SK_MANOEVER = [
    { id: 'hart_am_wind', name: 'Hart am Wind', probe: 'Steuern', malus: -10, effekt: 'Bei Erfolg darf das Schiff 1W4 Felder gegen den Wind fahren.' },
    { id: 'ausweichrolle', name: 'Ausweichrolle', probe: 'Steuern', malus: -5, effekt: 'Bei Erfolg -10% Trefferchance für alle gegnerischen Kanonen in dieser Runde.' },
    { id: 'entern', name: 'Entern', probe: 'Entern (gegen gegnerischen Wurf)', malus: 0, effekt: 'Bei Erfolg sind beide Schiffe verbunden; Enterkampf beginnt (normale Nahkampf-/Fernkampf-Proben).' },
    { id: 'volle_breitseite', name: 'Volle Breitseite', probe: 'Steuern + Schießen', malus: -5, effekt: 'Bei Erfolg +10% Trefferchance für alle Schüsse dieser Salve.' },
    { id: 'ramme_voraus', name: 'Ramme voraus', probe: 'Steuern', malus: -10, effekt: 'Bei Erfolg 2W10 Strukturschaden + 1W10 pro 20t Lagergewicht; eigener Rumpf erleidet halben Schaden.' },
    { id: 'kettenmanoever', name: 'Kettenmanöver', probe: 'Schießen', malus: -10, effekt: 'Bei Erfolg verliert das Ziel 1 Würfelstufe Geschwindigkeit für 1W4 Runden (W8→W6→W4).' },
    { id: 'tarnfahrt', name: 'Tarnfahrt', probe: 'Heimlichkeit', malus: 0, effekt: 'Bei Erfolg -10% Trefferchance für Gegner in dieser Runde.' },
    { id: 'ueberholkurs', name: 'Überholkurs', probe: 'Steuern', malus: -5, effekt: 'Bei Erfolg muss der Gegner in der nächsten Runde -1 Würfelstufe Geschwindigkeit würfeln.' },
    { id: 'ploetzliche_wende', name: 'Plötzliche Wende', probe: 'Steuern', malus: -15, effekt: 'Bei Erfolg sofortige Richtungsänderung; Gegner erhalten -15% auf alle Schüsse in dieser Runde.' },
    { id: 'enterhakenwurf', name: 'Enterhakenwurf', probe: 'Entern', malus: 0, effekt: 'Bei Erfolg sind beide Schiffe bis zum nächsten Zug verbunden; Enterkampf kann beginnen.' },
    { id: 'segel', name: 'Segel reffen / volle Segel', probe: 'Steuern (für "volle Segel")', malus: -10, effekt: 'Bei Erfolg +1W8 Felder Bewegung, aber -10% auf eigene Schüsse in dieser Runde.' },
    { id: 'gegenbug', name: 'Gegenbug', probe: 'Steuern', malus: -5, effekt: 'Bei Erfolg +10 Rüstung gegen Kanonentreffer in dieser Runde.' }
];

// Kritische Trefferzonen (S.4, Zeile ~154-163) - 1W4 bei kritischem W100-Treffer.
const SK_KRITISCHE_TREFFERZONEN = [
    { wurf: 1, name: 'Segel zerstört', effekt: 'Geschwindigkeit halbiert.', badge: 'Segel zerstört (Geschwindigkeit halbiert)' },
    { wurf: 2, name: 'Ruder beschädigt', effekt: 'Manöverwürfe -10.', badge: 'Ruder beschädigt (Manöverwürfe -10)' },
    { wurf: 3, name: 'Magazin getroffen', effekt: 'Sofort 1W6 zusätzliche Kanonen explodieren.', badge: null },
    { wurf: 4, name: 'Mastbruch', effekt: 'Bewegung halbiert, bis repariert. (Handwerk -20)', badge: 'Mastbruch (Bewegung halbiert, Handwerk -20 zum Reparieren)' }
];

const SEEKAMPF_OFFEN_KEY = 'htbah_gm_seekampf_offen';

let seekampf = { runde: 1, wind: { richtung: 0, naechsterWechsel: 6 }, einheiten: [], marker: [], initiative: [], initiativeIndex: 0, log: [] };
let skOffenGm = true;

function skLeererStand() {
    return { runde: 1, wind: { richtung: 0, naechsterWechsel: 6 }, einheiten: [], marker: [], initiative: [], initiativeIndex: 0, log: [] };
}

function skLaden() {
    try {
        const roh = localStorage.getItem(SEEKAMPF_KEY);
        const geladen = roh ? JSON.parse(roh) : null;
        seekampf = geladen && typeof geladen === 'object' ? Object.assign(skLeererStand(), geladen) : skLeererStand();
        if (!Array.isArray(seekampf.einheiten)) seekampf.einheiten = [];
        if (!Array.isArray(seekampf.marker)) seekampf.marker = [];
        if (!Array.isArray(seekampf.initiative)) seekampf.initiative = [];
        if (!Array.isArray(seekampf.log)) seekampf.log = [];
        // Migration: früherer Stand kannte nur einen einzelnen spielerId statt
        // spielerIds (mehrere Spieler können sich ein Schiff teilen).
        seekampf.einheiten.forEach(e => {
            if (!Array.isArray(e.spielerIds)) e.spielerIds = e.spielerId ? [e.spielerId] : [];
            delete e.spielerId;
            // kapitaen (Migration): früherer Stand kannte keinen Kapitän - null
            // bedeutet "jeder in spielerIds darf steuern" (altes Verhalten).
            if (e.kapitaen === undefined) e.kapitaen = null;
            // karteId (Migration): früherer Stand zeigte jedes Schiff auf JEDER
            // Karte an - null bedeutet "noch nicht zugeordnet", wird von
            // skFigurenAbgleichen() beim nächsten Sync automatisch auf die dann
            // gerade aktive Karte "eingebürgert".
            if (e.karteId === undefined) e.karteId = null;
        });
        seekampf.marker.forEach(m => { if (m.karteId === undefined) m.karteId = null; });
    } catch (e) { seekampf = skLeererStand(); }
    try { skOffenGm = localStorage.getItem(SEEKAMPF_OFFEN_KEY) !== '0'; } catch (e) { skOffenGm = true; }
}

function skSichern() {
    sicherSpeichern(SEEKAMPF_KEY, JSON.stringify(seekampf));
    skVerteilen();
}

function skLog(text) {
    seekampf.log.unshift(text);
    if (seekampf.log.length > SEEKAMPF_LOG_MAX) seekampf.log.length = SEEKAMPF_LOG_MAX;
    skSichern();
}

// --- Live-Sync an die Spieler (nur GM-Seite aktiv; Kartendaten laufen separat
// über karten.js' eigene 'karte'-Nachricht, siehe dort) --

let skVerteilenTimer = null;

// Bewegungen/Würfe/Bearbeitungen kommen dicht hintereinander (z.B. jede
// Zeichenbewegung beim Ziehen eines Schiffs) - kurz sammeln, dann einmal senden.
function skVerteilen() {
    clearTimeout(skVerteilenTimer);
    skVerteilenTimer = setTimeout(skJetztVerteilen, 300);
}

function skZustandFuerSpieler() {
    // Die Karte selbst (Figuren, Bild, Nebel, ...) geht über karten.js raus
    // (type: 'karte') - hier nur noch die reinen Kampf-/Regeldaten.
    return { type: 'seekampf', wind: seekampf.wind, runde: seekampf.runde, einheiten: seekampf.einheiten, marker: seekampf.marker };
}

function skJetztVerteilen() {
    if (typeof clientConnections === 'undefined') return;
    const nachricht = skZustandFuerSpieler();
    Object.values(clientConnections).forEach(conn => {
        if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
    });
}

function skAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    try { conn.send(skZustandFuerSpieler()); } catch (e) { /* weg */ }
}

// Zugvorschlag eines Spielers für ein Schiff, das ihm zugewiesen ist -
// dieselbe Nachricht (type: 'karteZugVorschlag'), mit der auch die eigene
// Spieler-Figur ihren Zug anmeldet (siehe karten.js), nur eben mit der
// Schiffs-ID statt "spieler:"+peerId als figurId. karten.js reicht sie extra
// deshalb durch (return false dort), wenn sie nicht die eigene Figur des
// Spielers betrifft. Wird als geplantX/geplantY auf die Figur gemerged, damit
// battlemap.js' eingebaute Vorschau/Bestätigung (zugBestaetigen/zugVerwerfen)
// unverändert weiterverwendet werden kann.
function skAnfrageVerarbeiten(peerId, payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type !== 'karteZugVorschlag') return false;
    if (!karteMap || payload.karteId !== karteAktivId) return false;
    const e = skEinheit(payload.figurId);
    if (!e) return false;
    // Hat das Schiff einen Kapitän, darf NUR der steuern - sonst (kapitaen:
    // null) wie bisher jeder aus der zugewiesenen Crew.
    const darf = e.kapitaen ? e.kapitaen === peerId : (Array.isArray(e.spielerIds) && e.spielerIds.includes(peerId));
    if (!darf) return false;
    karteMap.addFigur({ id: e.id, geplantX: payload.x, geplantY: payload.y });
    // Der Vorschlag erscheint jetzt in der "Offene Zugvorschläge"-Liste des
    // Karte-Panels (dieselbe Mechanik wie für Spieler-Figuren) - dort auch
    // bestätigen/verwerfen, siehe karten.js.
    if (typeof renderKarteGm === 'function') renderKarteGm();
    return true;
}

function skZugBestaetigen(id) {
    if (!karteMap) return;
    if (karteMap.zugBestaetigen(id)) {
        const e = skEinheit(id);
        if (e) skLog(`Zug von ${e.name} bestätigt.`);
    }
    renderSeekampfGm();
}

function skZugVerwerfen(id) {
    if (!karteMap) return;
    karteMap.zugVerwerfen(id);
    renderSeekampfGm();
}

// --- Würfel-Helfer (reine Zahlenwürfe, keine Charakterwerte) -----------------

// Toleranter als parseDiceFormula (app.js): Anzahl vor dem "w" ist optional,
// die Geschwindigkeits-Notation der Schiffstabelle schreibt z.B. "w8+1".
function skWuerfelFormel(text) {
    const m = String(text || '').toLowerCase().trim().match(/^(\d*)w(\d+)([+-]\d+)?$/);
    if (!m) return null;
    return { count: parseInt(m[1]) || 1, sides: parseInt(m[2]), mod: m[3] ? parseInt(m[3]) : 0 };
}

function skWuerfeln(formelText) {
    const f = skWuerfelFormel(formelText);
    if (!f) return null;
    const rolls = [];
    for (let i = 0; i < f.count; i++) rolls.push(Math.floor(Math.random() * f.sides) + 1);
    const summe = rolls.reduce((a, b) => a + b, 0) + f.mod;
    return { rolls, mod: f.mod, summe };
}

function skW(sides) { return Math.floor(Math.random() * sides) + 1; }

// Würfelstufe um `stufen` senken, innerhalb der in der Schiffstabelle
// genutzten Leiter W4 < W6 < W8 (Kettenmanöver-Notation "W8→W6→W4").
// Ein fester Modifikator (z.B. das "+1" in "w8+1") bleibt erhalten.
function skWuerfelstufeSenken(formelText, stufen) {
    const f = skWuerfelFormel(formelText);
    if (!f) return formelText;
    const leiter = [4, 6, 8];
    let idx = leiter.indexOf(f.sides);
    if (idx === -1) idx = leiter.reduce((besterIdx, wert, i) => Math.abs(wert - f.sides) < Math.abs(leiter[besterIdx] - f.sides) ? i : besterIdx, 0);
    idx = Math.max(0, idx - stufen);
    return `${f.count}w${leiter[idx]}${f.mod ? (f.mod > 0 ? '+' + f.mod : f.mod) : ''}`;
}

// --- Einheiten ---------------------------------------------------------------

function skEinheit(id) { return seekampf.einheiten.find(e => e.id === id); }

// Neue Schiffe nicht exakt übereinander stapeln, sondern spiralförmig um die
// Sichtmitte verteilen (der SL zieht sie ohnehin gleich an ihre Startposition).
function skFreieSpawnPosition() {
    const mitte = karteMap.sichtbaresZentrum();
    const n = karteMap.figuren.length;
    if (n === 0) return mitte;
    const winkel = n * 2.4;
    const radius = 1.5 * Math.sqrt(n);
    return { x: Math.round((mitte.x + Math.cos(winkel) * radius) * 2) / 2, y: Math.round((mitte.y + Math.sin(winkel) * radius) * 2) / 2 };
}

function skEinheitHinzufuegen() {
    const nameEl = document.getElementById('sk-neu-name');
    const seiteEl = document.getElementById('sk-neu-seite');
    const klasseEl = document.getElementById('sk-neu-klasse');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    const seite = (seiteEl && SK_SEITEN[seiteEl.value]) ? seiteEl.value : 'gegner';
    const klasse = klasseEl ? klasseEl.value : '';
    const vorlage = klasse && SCHIFF_KLASSEN[klasse] ? SCHIFF_KLASSEN[klasse] : null;

    const id = 'sk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    const einheit = {
        id, name, seite, farbe: SK_SEITEN[seite].farbe,
        klasse: klasse || '', spielerIds: [], kapitaen: null,
        karteId: (typeof karteAktivId !== 'undefined' ? karteAktivId : null),
        struktur: { aktuell: vorlage ? vorlage.trefferpunkte : 100, max: vorlage ? vorlage.trefferpunkte : 100 },
        geschwindigkeit: vorlage ? vorlage.geschwindigkeit : 'w6',
        kanonen: vorlage ? vorlage.kanonen : 10,
        lager: vorlage ? vorlage.lager : 50,
        effekte: []
    };
    seekampf.einheiten.push(einheit);
    if (karteMap) {
        const pos = skFreieSpawnPosition();
        karteMap.addFigur({ id, name, farbe: einheit.farbe, x: pos.x, y: pos.y, groesse: 1.3 });
        karteMap.setFigurBild(id, skSchiffBild(einheit.farbe));
    }
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    skLog(`${name} (${SK_SEITEN[seite].label}) tritt dem Gefecht bei.`);
    renderSeekampfGm();
}

function skEinheitEntfernen(id) {
    const e = skEinheit(id);
    if (!e) return;
    if (!confirm(`"${e.name}" wirklich aus dem Gefecht entfernen?`)) return;
    seekampf.einheiten = seekampf.einheiten.filter(x => x.id !== id);
    seekampf.initiative = seekampf.initiative.filter(x => x.id !== id);
    if (karteMap) karteMap.removeFigur(id);
    skLog(`${e.name} verlässt das Gefecht.`);
    renderSeekampfGm();
}

// --- Kartenmarkierungen (Riffe, Inseln, Wracks - keine Kampfwerte) ----------

function skMarker(id) { return seekampf.marker.find(m => m.id === id); }

function skMarkerHinzufuegen() {
    const nameEl = document.getElementById('sk-marker-name');
    const typEl = document.getElementById('sk-marker-typ');
    const typ = (typEl && SK_MARKER_TYPEN[typEl.value]) ? typEl.value : 'sonstiges';
    const info = SK_MARKER_TYPEN[typ];
    const name = (nameEl && nameEl.value.trim()) || info.label;

    const id = 'skm_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    seekampf.marker.push({ id, name, farbe: info.farbe, typ, groesse: SK_MARKER_GROESSE_STANDARD, karteId: (typeof karteAktivId !== 'undefined' ? karteAktivId : null) });
    if (karteMap) {
        const pos = skFreieSpawnPosition();
        karteMap.addFigur({ id, name, farbe: info.farbe, x: pos.x, y: pos.y, groesse: SK_MARKER_GROESSE_STANDARD });
        karteMap.setFigurBild(id, skMarkerBild(typ));
        // addFigur() hängt neue Marker ans Array-Ende (= oben) - ohne diesen
        // Sortier-Reset läge ein frisch gesetzter Marker über bereits vorhandenen
        // Schiffen, statt wie gewollt darunter.
        skFigurenZOrdnen(karteMap, seekampf.einheiten);
    }
    if (nameEl) nameEl.value = '';
    skSichern();
    renderSeekampfGm();
}

function skMarkerEntfernen(id) {
    const m = skMarker(id);
    if (!m) return;
    seekampf.marker = seekampf.marker.filter(x => x.id !== id);
    if (karteMap) karteMap.removeFigur(id);
    skSichern();
    renderSeekampfGm();
}

// Größe eines einzelnen Markers anpassen (große Insel vs. kleine Insel, großes
// vs. kleines Riff, ...) - battlemap.js kennt groesse längst pro Figur und
// synct sie ganz normal mit (im Gegensatz zum Porträt-Bild), hier fehlte nur
// ein Regler dafür.
function skMarkerGroesseAendern(id, delta) {
    const m = skMarker(id);
    if (!m) return;
    const basis = m.groesse || SK_MARKER_GROESSE_STANDARD;
    m.groesse = Math.max(SK_MARKER_GROESSE_MIN, Math.min(SK_MARKER_GROESSE_MAX, Math.round((basis + delta) * 100) / 100));
    if (karteMap) karteMap.setFigurGroesse(id, m.groesse);
    skSichern();
    renderSeekampfGm();
}

function skEinheitFeldAendern(id, feld, wert) {
    const e = skEinheit(id);
    if (!e) return;
    if (feld === 'name') {
        e.name = wert;
        if (karteMap) karteMap.addFigur({ id, name: wert });
    } else if (feld === 'geschwindigkeit') {
        e.geschwindigkeit = wert;
    } else if (feld === 'kanonen' || feld === 'lager') {
        e[feld] = Math.max(0, parseInt(wert) || 0);
    } else if (feld === 'seite') {
        if (!SK_SEITEN[wert]) return;
        e.seite = wert;
        e.farbe = SK_SEITEN[wert].farbe;
        if (karteMap) {
            karteMap.addFigur({ id, farbe: e.farbe });
            karteMap.setFigurBild(id, skSchiffBild(e.farbe));
        }
    } else if (feld === 'struktur_max') {
        const max = Math.max(1, parseInt(wert) || 1);
        e.struktur.max = max;
        e.struktur.aktuell = Math.min(e.struktur.aktuell, max);
    }
    skSichern();
}

// Mehrere Spieler können sich ein Schiff teilen (die ganze Crew steht ja auf
// demselben Deck) - Klick auf einen Namens-Chip nimmt ihn rein oder raus.
// Wird jemand entfernt, der gerade Kapitän war, geht das Schiff automatisch
// zurück auf "jeder in der Crew darf steuern".
function skEinheitSpielerToggle(id, peerId) {
    const e = skEinheit(id);
    if (!e) return;
    if (!Array.isArray(e.spielerIds)) e.spielerIds = [];
    const idx = e.spielerIds.indexOf(peerId);
    if (idx === -1) e.spielerIds.push(peerId); else e.spielerIds.splice(idx, 1);
    if (idx !== -1 && e.kapitaen === peerId) e.kapitaen = null;
    skSichern();
    renderSeekampfGm();
}

// Kapitän: nur diese eine Person darf das Schiff steuern (Zugvorschläge
// anmelden), statt jeder in spielerIds - für Crews, die nicht wollen, dass
// jeder mitfummelt. kapitaen: null = altes Verhalten (jeder aus der Crew
// darf). Ein Klick auf den bereits amtierenden Kapitän setzt ihn wieder
// zurück auf null. Ein Kapitän muss Teil der Crew sein - wird er es noch
// nicht, direkt mit aufnehmen.
function skEinheitKapitaenUmschalten(id, peerId) {
    const e = skEinheit(id);
    if (!e) return;
    if (e.kapitaen === peerId) {
        e.kapitaen = null;
    } else {
        if (!Array.isArray(e.spielerIds)) e.spielerIds = [];
        if (!e.spielerIds.includes(peerId)) e.spielerIds.push(peerId);
        e.kapitaen = peerId;
    }
    skSichern();
    renderSeekampfGm();
}

function skStruktur(id, delta) {
    const e = skEinheit(id);
    if (!e) return;
    const vorher = e.struktur.aktuell;
    e.struktur.aktuell = Math.max(0, Math.min(e.struktur.max, e.struktur.aktuell + delta));
    if (vorher > 0 && e.struktur.aktuell === 0) skLog(`⚓ ${e.name} sinkt! Strukturpunkte auf 0.`);
    skSichern();
    renderSeekampfGm();
}

function skSchadenAnwenden(id, betrag) {
    if (!betrag) return;
    skStruktur(id, -Math.abs(betrag));
}

function skEffektHinzufuegen(id, text, runden) {
    const e = skEinheit(id);
    if (!e) return;
    e.effekte.push({ text, rundenUebrig: runden === null || runden === undefined ? null : runden });
    skSichern();
    renderSeekampfGm();
}

function skEffektEntfernen(id, index) {
    const e = skEinheit(id);
    if (!e || !e.effekte[index]) return;
    e.effekte.splice(index, 1);
    skSichern();
    renderSeekampfGm();
}

// --- Wind ---------------------------------------------------------------------

function skWindWuerfeln() {
    seekampf.wind.richtung = skW(8) - 1;
    seekampf.wind.naechsterWechsel = skW(6);
    skLog(`Wind: 1W8 → ${SK_WIND_RICHTUNGEN[seekampf.wind.richtung]} (nächster Wechsel in ${seekampf.wind.naechsterWechsel} Runden)`);
    skSichern();
    renderSeekampfGm();
}

// --- Initiative & Rundenablauf --------------------------------------------

function skInitiativeWuerfeln() {
    if (!seekampf.einheiten.length) { skLog('Initiative: keine Einheiten im Gefecht.'); renderSeekampfGm(); return; }
    seekampf.initiative = seekampf.einheiten
        .map(e => ({ id: e.id, wurf: skW(10) }))
        .sort((a, b) => b.wurf - a.wurf);
    seekampf.initiativeIndex = 0;
    skLog('Initiative gewürfelt: ' + seekampf.initiative.map(i => `${(skEinheit(i.id) || {}).name || '?'} (${i.wurf})`).join(', '));
    skSichern();
    renderSeekampfGm();
}

function skRundeWeiter() {
    if (!seekampf.initiative.length) { skInitiativeWuerfeln(); return; }
    seekampf.initiativeIndex++;
    if (seekampf.initiativeIndex >= seekampf.initiative.length) {
        seekampf.initiativeIndex = 0;
        seekampf.runde++;
        seekampf.wind.naechsterWechsel--;
        seekampf.einheiten.forEach(e => {
            e.effekte = e.effekte.filter(eff => {
                if (eff.rundenUebrig === null || eff.rundenUebrig === undefined) return true;
                eff.rundenUebrig--;
                if (eff.rundenUebrig <= 0) {
                    if (eff.revertGeschwindigkeit) e.geschwindigkeit = eff.revertGeschwindigkeit;
                    skLog(`${e.name}: Effekt "${eff.text}" läuft aus.${eff.revertGeschwindigkeit ? ` Geschwindigkeit zurück auf ${eff.revertGeschwindigkeit}.` : ''}`);
                    return false;
                }
                return true;
            });
        });
        skLog(`— Runde ${seekampf.runde} beginnt —`);
        if (seekampf.wind.naechsterWechsel <= 0) skWindWuerfeln();
    }
    skSichern();
    renderSeekampfGm();
}

function skGefechtZuruecksetzen() {
    if (!confirm('Gefecht wirklich zurücksetzen? Alle Einheiten, Initiative und das Kampf-Log werden gelöscht (Kartenmarkierungen wie Riffe/Inseln und die Karte selbst bleiben erhalten).')) return;
    const markerVorher = seekampf.marker;
    seekampf = Object.assign(skLeererStand(), { marker: markerVorher });
    if (karteMap) karteMap.figuren.slice().forEach(f => { if (!skMarker(f.id)) karteMap.removeFigur(f.id); });
    skSichern();
    renderSeekampfGm();
}

// --- Bewegung -------------------------------------------------------------

function skBewegungWuerfeln(id, windBezug) {
    const e = skEinheit(id);
    if (!e) return;
    const bonus = SK_WIND_BONUS[windBezug] || SK_WIND_BONUS.gegen;
    const basis = skWuerfeln(e.geschwindigkeit);
    if (!basis) { skLog(`${e.name}: Geschwindigkeits-Formel "${e.geschwindigkeit}" nicht erkannt.`); renderSeekampfGm(); return; }
    const windWurf = bonus.formel ? skWuerfeln(bonus.formel) : null;
    let felder = basis.summe + (windWurf ? windWurf.summe : 0);

    const halbiert = e.effekte.some(eff => /Geschwindigkeit halbiert|Bewegung halbiert/.test(eff.text));
    if (halbiert) felder = Math.max(1, Math.floor(felder / 2));

    skLog(`${e.name} Bewegung: ${e.geschwindigkeit} (${basis.summe})${windWurf ? ` + ${bonus.label} ${bonus.formel} (${windWurf.summe})` : ` + ${bonus.label} (kein Bonus)`}${halbiert ? ' → halbiert wegen Segel-/Mastschaden' : ''} = <b>${felder} Felder</b>`);
    skSichern();
    renderSeekampfGm();
}

// --- Kanonenfeuer -----------------------------------------------------------

function skKanonenfeuerWuerfeln(id, anzahlKanonen) {
    const e = skEinheit(id);
    const n = Math.max(1, parseInt(anzahlKanonen) || 1);
    if (!e) return;
    const pct = skW(100);
    const treffer = Math.round(n * pct / 100);
    const kritisch = pct === 100;
    skLog(`${e.name} Kanonenfeuer (${n} Kanonen): W100 → ${pct}% ⇒ <b>${treffer} von ${n} Kanonen treffen</b>${kritisch ? ' — <b>Kritischer Treffer!</b> (1W4 Trefferzone auswürfeln)' : ''}`);
    skSichern();
    renderSeekampfGm();
}

function skKritischerTreffer(zielId) {
    const ziel = skEinheit(zielId);
    if (!ziel) return;
    const wurf = skW(4);
    const zone = SK_KRITISCHE_TREFFERZONEN[wurf - 1];
    let text = `Kritische Trefferzone bei ${ziel.name}: 1W4 → ${wurf} (${zone.name}) — ${zone.effekt}`;
    if (zone.badge) {
        ziel.effekte.push({ text: zone.badge, rundenUebrig: null });
        text += ' [Badge gesetzt, manuell entfernen sobald repariert]';
    }
    if (zone.wurf === 3) {
        const extra = skW(6);
        text += ` → ${extra} zusätzliche Kanonen explodieren.`;
    }
    skLog(text);
    skSichern();
    renderSeekampfGm();
}

// --- Manöver ----------------------------------------------------------------

function skManoeverEintragen(id, manoeverId) {
    const e = skEinheit(id);
    const m = SK_MANOEVER.find(x => x.id === manoeverId);
    if (!e || !m) return;
    skLog(`${e.name} versucht „${m.name}" — Probe: ${m.probe}${m.malus ? ` (${m.malus})` : ''}.`);
    skSichern();
    renderSeekampfGm();
}

function skManoeverEffektEintragen(id, manoeverId) {
    const e = skEinheit(id);
    const m = SK_MANOEVER.find(x => x.id === manoeverId);
    if (!e || !m) return;
    if (m.id === 'kettenmanoever') {
        const runden = skW(4);
        const alteGeschwindigkeit = e.geschwindigkeit;
        e.geschwindigkeit = skWuerfelstufeSenken(e.geschwindigkeit, 1);
        e.effekte.push({ text: `Kettenmanöver: -1 Würfelstufe Geschwindigkeit (jetzt ${e.geschwindigkeit})`, rundenUebrig: runden, revertGeschwindigkeit: alteGeschwindigkeit });
        skLog(`${e.name}: Kettenmanöver trifft - Geschwindigkeit auf ${e.geschwindigkeit} für ${runden} Runden.`);
    } else {
        e.effekte.push({ text: `${m.name}: ${m.effekt}`, rundenUebrig: 1 });
        skLog(`${e.name}: Effekt von „${m.name}" eingetragen (diese Runde).`);
    }
    skSichern();
    renderSeekampfGm();
}

// Einzige Manöver-Schadensformel ohne Charakterwerte (S.5): 2W10 +
// 1W10 pro 20t Lagergewicht des RAMMENDEN Schiffs; eigener Rumpf halber Schaden.
function skRammeSchaden(taeterId, zielId) {
    const taeter = skEinheit(taeterId), ziel = skEinheit(zielId);
    if (!taeter || !ziel) return;
    const zusatzWuerfel = Math.floor((taeter.lager || 0) / 20);
    const basis = skWuerfeln('2w10');
    const zusatz = zusatzWuerfel > 0 ? skWuerfeln(`${zusatzWuerfel}w10`) : { summe: 0 };
    const gesamt = basis.summe + zusatz.summe;
    const eigenerSchaden = Math.floor(gesamt / 2);
    skStruktur(zielId, -gesamt);
    skStruktur(taeterId, -eigenerSchaden);
    skLog(`${taeter.name} rammt ${ziel.name}: 2W10 (${basis.summe}) + ${zusatzWuerfel}W10 pro 20t Lager (${zusatz.summe}) = <b>${gesamt} Schaden an ${ziel.name}</b>, <b>${eigenerSchaden} Schaden am eigenen Rumpf</b>.`);
}

// --- Karte (battlemap.js) ---------------------------------------------------

// Kampfzustand (Einheiten + Marker) mit den Karten-Figuren abgleichen: fehlende
// bekommen ein neues Token an einer freien Stelle, vorhandene Positionen
// bleiben unangetastet, und Token, die zu keiner Einheit/keinem Marker mehr
// gehören (gelöscht), verschwinden auch von der Karte.
// Schiffe/Marker gehören - anders als noch in einer früheren Fassung, wo
// jedes Schiff auf JEDER Karte auftauchte - genau EINER Karte (`karteId`):
// der, auf der sie erstellt bzw. zuletzt per skEinheitAufAktiveKarteVersetzen()
// hin versetzt wurden. Hier wird nur ein-/ausgeblendet, wer auf die gerade
// aktive Karte gehört - nichts wird dabei aus seekampf.einheiten/.marker
// gelöscht, ein Schiff behält all seine Kampfwerte, während eine andere
// Karte aktiv ist, es ist dort nur nicht sichtbar/ziehbar.
function skFigurenAbgleichen() {
    if (!karteMap) return;
    const aktivId = typeof karteAktivId !== 'undefined' ? karteAktivId : null;
    seekampf.einheiten.forEach(e => {
        // Erstkontakt (frisch erstellt, oder Altbestand ohne karteId) - gehört
        // ab jetzt zu der Karte, die gerade aktiv ist.
        if (e.karteId == null) e.karteId = aktivId;
        const gehoertHierher = e.karteId === aktivId;
        const vorhanden = karteMap.figuren.some(f => f.id === e.id);
        if (gehoertHierher && !vorhanden) {
            const pos = skFreieSpawnPosition();
            karteMap.addFigur({ id: e.id, name: e.name, farbe: e.farbe, x: pos.x, y: pos.y, groesse: 1.3 });
        } else if (!gehoertHierher && vorhanden) {
            karteMap.removeFigur(e.id);
        }
        // Wie bei Markern: Porträt ist nicht Teil des persistierten Kartenzustands,
        // nach jedem Neuladen/Sync erneut zuweisen (dedupliziert sich selbst).
        if (gehoertHierher) karteMap.setFigurBild(e.id, skSchiffBild(e.farbe));
    });
    seekampf.marker.forEach(m => {
        if (m.karteId == null) m.karteId = aktivId;
        const gehoertHierher = m.karteId === aktivId;
        const vorhanden = karteMap.figuren.some(f => f.id === m.id);
        if (gehoertHierher && !vorhanden) {
            const pos = skFreieSpawnPosition();
            karteMap.addFigur({ id: m.id, name: m.name, farbe: m.farbe, x: pos.x, y: pos.y, groesse: m.groesse || SK_MARKER_GROESSE_STANDARD });
        } else if (!gehoertHierher && vorhanden) {
            karteMap.removeFigur(m.id);
        }
        // setFigurBild() ist bewusst NICHT Teil des persistierten Kartenzustands
        // (battlemap.js) - nach jedem Neuladen/Sync erneut zuweisen (dedupliziert
        // sich selbst, siehe dortiger Kommentar).
        if (gehoertHierher) karteMap.setFigurBild(m.id, skMarkerBild(m.typ || 'sonstiges'));
    });
    // Nur eigene (Schiffs-/Marker-)Figuren aufräumen, die es nicht mehr gibt -
    // NICHT jede Figur ohne Treffer, sonst würden hier bei jedem Kartenwechsel
    // auch Spieler- und NSC-Figuren (karten.js) mit entfernt.
    karteMap.figuren.slice().forEach(f => {
        const istEigenesPraefix = f.id.startsWith('sk_') || f.id.startsWith('skm_');
        if (istEigenesPraefix && !skEinheit(f.id) && !skMarker(f.id)) karteMap.removeFigur(f.id);
    });
    skFigurenZOrdnen(karteMap, seekampf.einheiten);
}

// Versetzt ein Schiff explizit auf die gerade aktive Karte (z.B. wenn es an
// einer Insel anlegt und die Gruppe dort auf eine Landkarte wechselt) - sonst
// bliebe es für immer an seine Erstellungskarte gebunden. Idempotent: schon
// auf der Zielkarte -> einfach ein no-op (skFigurenAbgleichen lässt die
// Figur unangetastet an ihrer letzten Position stehen).
function skEinheitAufAktiveKarteVersetzen(id) {
    const e = skEinheit(id);
    if (!e || !karteMap || typeof karteAktivId === 'undefined' || !karteAktivId) return;
    e.karteId = karteAktivId;
    skFigurenAbgleichen();
    const kartenname = (typeof karten !== 'undefined' && Array.isArray(karten) && karten.find(k => k.id === karteAktivId)?.name) || 'die aktive Karte';
    skLog(`${e.name} wird auf "${kartenname}" versetzt.`);
    renderSeekampfGm();
}

// Schiffe sollen nie unter einem großen Riff/einer großen Insel verschwinden.
// battlemap.js zeichnet Figuren schlicht in Array-Reihenfolge (später = oben);
// addFigur() hängt neue Einträge nur ans Ende an, ohne Rücksicht auf Schiff
// vs. Marker. figuren ist ein Live-Getter auf das interne Array (siehe
// battlemap.js), daher reicht ein stabiler Sort + Neuzeichnen hier, ohne
// battlemap.js selbst anzufassen - einheitenListe kommt je nach Seite aus
// seekampf.einheiten (SL) oder skSpieler.einheiten (Spieler).
function skFigurenZOrdnen(karte, einheitenListe) {
    if (!karte) return;
    const schiffIds = new Set((einheitenListe || []).map(e => e.id));
    karte.figuren.sort((a, b) => (schiffIds.has(a.id) ? 1 : 0) - (schiffIds.has(b.id) ? 1 : 0));
    karte.zeichnen();
}

// Kartendarstellung (Leinwand, Raster, Bild-Upload, Zeichnen, Nebel) läuft
// jetzt komplett über die gemeinsame Karten-Engine (karten.js) - Schiffe und
// Markierungen werden dort nur noch als Figuren hinein-synchronisiert (siehe
// skFigurenAbgleichen). Seekampf selbst zeichnet nichts mehr eigenständig.

// --- Darstellung -------------------------------------------------------------

function skWindKompassSvg(richtung) {
    const grad = richtung * 45;
    return `<svg viewBox="0 0 40 40" class="sk-kompass" style="transform:rotate(${grad}deg)"><path d="M20 4 L27 24 L20 19 L13 24 Z" fill="var(--color-accent)"/><circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/></svg>`;
}

function skEinheitKarteHtml(e, istAmZug) {
    const seiteInfo = SK_SEITEN[e.seite] || SK_SEITEN.neutral;
    const strukturPct = e.struktur.max > 0 ? Math.max(0, Math.min(100, (e.struktur.aktuell / e.struktur.max) * 100)) : 0;
    const gesunken = e.struktur.aktuell <= 0;
    const effekteHtml = e.effekte.length ? `<div class="sk-effekte">${e.effekte.map((eff, i) => `
        <span class="sk-badge">${escapeHtml(eff.text)}${eff.rundenUebrig !== null ? ` (${eff.rundenUebrig})` : ''} <button class="sk-badge-x" onclick="skEffektEntfernen('${e.id}', ${i})" title="Effekt entfernen">×</button></span>`).join('')}</div>` : '';

    return `<div class="sk-einheit ${istAmZug ? 'sk-einheit-amzug' : ''} ${gesunken ? 'sk-einheit-gesunken' : ''}" style="--sk-farbe:${escapeHtml(e.farbe)}">
        <div class="sk-einheit-kopf">
            <span class="sk-farbpunkt"></span>
            <input type="text" class="sk-input sk-name" value="${escapeHtml(e.name)}" data-skfeld="name" data-skid="${escapeHtml(e.id)}">
            <select class="sk-input sk-seite" data-skfeld="seite" data-skid="${escapeHtml(e.id)}">
                ${Object.entries(SK_SEITEN).map(([k, v]) => `<option value="${k}" ${e.seite === k ? 'selected' : ''}>${v.label}</option>`).join('')}
            </select>
            <button class="btn-delete-icon" onclick="skEinheitEntfernen('${e.id}')" title="Aus dem Gefecht entfernen"><i class="fa-solid fa-trash"></i></button>
        </div>
        ${(() => {
            const eigeneKarte = (typeof karten !== 'undefined' && Array.isArray(karten)) ? karten.find(k => k.id === e.karteId) : null;
            const aktivId = typeof karteAktivId !== 'undefined' ? karteAktivId : null;
            const istAufAktiverKarte = e.karteId != null && e.karteId === aktivId;
            return `<div class="sk-aktion-zeile">
                <span class="ir-hint" style="margin:0"><i class="fa-solid fa-map-location-dot"></i> ${eigeneKarte ? escapeHtml(eigeneKarte.name) : 'keiner Karte zugeordnet'}${istAufAktiverKarte ? ' (aktive Karte)' : ''}</span>
                ${!istAufAktiverKarte && aktivId ? `<button class="sk-mini-btn" onclick="skEinheitAufAktiveKarteVersetzen('${e.id}')" title="Schiff auf die gerade aktive Karte versetzen"><i class="fa-solid fa-arrow-right-to-bracket"></i> Hierher versetzen</button>` : ''}
            </div>`;
        })()}
        ${typeof connectedPlayersData !== 'undefined' && Object.keys(connectedPlayersData).length ? `
        <div class="sk-besitzer-zeile">
            <span class="ir-hint" style="margin:0">Crew (mehrere möglich) - ${e.kapitaen ? `nur <b>${escapeHtml(schiffSpielerName(e.kapitaen))}</b> als Kapitän steuert` : 'jeder aus der Crew darf steuern'}, Krone klicken zum Ändern:</span>
            <div class="sk-besitzer-chips">
                ${Object.keys(connectedPlayersData).map(pid => {
                    const aktiv = Array.isArray(e.spielerIds) && e.spielerIds.includes(pid);
                    const istKapitaen = e.kapitaen === pid;
                    return `<span class="sk-besitzer-chip-gruppe">
                        <button type="button" class="sk-besitzer-chip ${aktiv ? 'sk-besitzer-chip-aktiv' : ''}" onclick="skEinheitSpielerToggle('${e.id}', '${escapeHtml(pid)}')" title="${aktiv ? 'Gehört zur Crew - klicken zum Entfernen' : 'Klicken, um zur Crew hinzuzufügen'}">${aktiv ? '<i class="fa-solid fa-check"></i> ' : ''}${escapeHtml(schiffSpielerName(pid))}</button>
                        <button type="button" class="sk-badge-groesse ${istKapitaen ? 'sk-kapitaen-aktiv' : ''}" onclick="skEinheitKapitaenUmschalten('${e.id}', '${escapeHtml(pid)}')" title="${istKapitaen ? 'Ist Kapitän - klicken, damit wieder die ganze Crew steuern darf' : 'Zum Kapitän machen - nur diese Person darf das Schiff dann noch steuern'}"><i class="fa-solid fa-crown"></i></button>
                    </span>`;
                }).join('')}
            </div>
        </div>` : ''}
        ${gesunken ? '<p class="ir-hint ir-warnung"><i class="fa-solid fa-water"></i> Sinkt!</p>' : ''}
        <div class="sk-struktur-zeile">
            <div class="sk-struktur-bar"><div class="sk-struktur-fill" style="width:${strukturPct}%"></div></div>
            <button class="btn-icon-small" onclick="skStruktur('${e.id}', -10)">-10</button>
            <button class="btn-icon-small" onclick="skStruktur('${e.id}', -1)">-1</button>
            <span class="sk-struktur-zahl">${e.struktur.aktuell} / <input type="number" class="sk-input sk-struktur-max" value="${e.struktur.max}" data-skfeld="struktur_max" data-skid="${escapeHtml(e.id)}" min="1"></span>
            <button class="btn-icon-small" onclick="skStruktur('${e.id}', 1)">+1</button>
            <button class="btn-icon-small" onclick="skStruktur('${e.id}', 10)">+10</button>
        </div>
        <div class="sk-werte-zeile">
            <label>Tempo <input type="text" class="sk-input sk-werte-input" value="${escapeHtml(e.geschwindigkeit)}" data-skfeld="geschwindigkeit" data-skid="${escapeHtml(e.id)}" title="Würfelformel, z.B. w8+1"></label>
            <label>Kanonen <input type="number" class="sk-input sk-werte-input" value="${e.kanonen}" data-skfeld="kanonen" data-skid="${escapeHtml(e.id)}" min="0"></label>
            <label>Lager (t) <input type="number" class="sk-input sk-werte-input" value="${e.lager}" data-skfeld="lager" data-skid="${escapeHtml(e.id)}" min="0"></label>
        </div>
        ${effekteHtml}
        <details class="sk-aktionen">
            <summary>Aktionen</summary>
            <div class="sk-aktion-zeile">
                <select class="sk-input" data-skwindbezug="${escapeHtml(e.id)}">
                    ${Object.entries(SK_WIND_BONUS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}
                </select>
                <button class="sk-mini-btn" onclick="skBewegungWuerfeln('${e.id}', document.querySelector('[data-skwindbezug=\\'${e.id}\\']').value)"><i class="fa-solid fa-dice"></i> Bewegung würfeln</button>
            </div>
            <div class="sk-aktion-zeile">
                <input type="number" class="sk-input sk-input-schmal" value="${e.kanonen}" min="1" data-skkanonenzahl="${escapeHtml(e.id)}" title="Anzahl abgefeuerter Kanonen">
                <button class="sk-mini-btn" onclick="skKanonenfeuerWuerfeln('${e.id}', document.querySelector('[data-skkanonenzahl=\\'${e.id}\\']').value)"><i class="fa-solid fa-dice"></i> Trefferquote (nach Erfolg)</button>
            </div>
            <div class="sk-aktion-zeile">
                <button class="sk-mini-btn" onclick="skKritischerTreffer('${e.id}')"><i class="fa-solid fa-burst"></i> Kritische Trefferzone (1W4)</button>
                <input type="number" class="sk-input sk-input-schmal" placeholder="Schaden" data-skschaden="${escapeHtml(e.id)}">
                <button class="sk-mini-btn" onclick="skSchadenAnwenden('${e.id}', document.querySelector('[data-skschaden=\\'${e.id}\\']').value)"><i class="fa-solid fa-minus"></i> Schaden abziehen</button>
            </div>
        </details>
    </div>`;
}

function skManoeverReferenzHtml() {
    return `<details class="sk-manoever-referenz">
        <summary>Manöver-Nachschlage (Probe läuft auf dem Charakterbogen des Steuermanns/Schützen)</summary>
        <div class="sk-manoever-liste">
        ${SK_MANOEVER.map(m => `
            <div class="sk-manoever-karte">
                <div class="sk-manoever-kopf"><b>${escapeHtml(m.name)}</b> <span class="ir-zone-malus">${escapeHtml(m.probe)}${m.malus ? ` ${m.malus}` : ''}</span></div>
                <p class="ir-hint">${escapeHtml(m.effekt)}</p>
                <div class="sk-aktion-zeile">
                    <select class="sk-input" data-skmanoevereinheit="${m.id}">
                        <option value="">Einheit wählen …</option>
                        ${seekampf.einheiten.map(e => `<option value="${e.id}">${escapeHtml(e.name)}</option>`).join('')}
                    </select>
                    <button class="sk-mini-btn" onclick="skManoeverVersuch('${m.id}')"><i class="fa-solid fa-pen"></i> Versuch loggen</button>
                    <button class="sk-mini-btn" onclick="skManoeverErfolg('${m.id}')"><i class="fa-solid fa-check"></i> Erfolg → Effekt</button>
                    ${m.id === 'ramme_voraus' ? `
                    <select class="sk-input" data-skrammeziel="${m.id}">
                        <option value="">Ziel wählen …</option>
                        ${seekampf.einheiten.map(e => `<option value="${e.id}">${escapeHtml(e.name)}</option>`).join('')}
                    </select>
                    <button class="sk-mini-btn" onclick="skRammeVersuch()"><i class="fa-solid fa-dice"></i> Rammschaden würfeln</button>` : ''}
                </div>
            </div>`).join('')}
        </div>
    </details>`;
}

function skManoeverVersuch(manoeverId) {
    const sel = document.querySelector(`[data-skmanoevereinheit="${manoeverId}"]`);
    if (!sel || !sel.value) return;
    skManoeverEintragen(sel.value, manoeverId);
}
function skManoeverErfolg(manoeverId) {
    const sel = document.querySelector(`[data-skmanoevereinheit="${manoeverId}"]`);
    if (!sel || !sel.value) return;
    skManoeverEffektEintragen(sel.value, manoeverId);
}
function skRammeVersuch() {
    const taeterSel = document.querySelector(`[data-skmanoevereinheit="ramme_voraus"]`);
    const zielSel = document.querySelector(`[data-skrammeziel="ramme_voraus"]`);
    if (!taeterSel || !taeterSel.value || !zielSel || !zielSel.value) return;
    skRammeSchaden(taeterSel.value, zielSel.value);
    renderSeekampfGm();
}

function renderSeekampfGm() {
    const box = document.getElementById('gm-seekampf');
    if (!box) return;
    if (typeof eldaraAktiv !== 'function' || !eldaraAktiv()) {
        box.style.display = 'none';
        return;
    }
    box.style.display = '';
    // Sorgt dafür, dass die gemeinsame Karten-Engine existiert, bevor wir
    // Schiffe/Marker auf sie synchronisieren (siehe karten.js) - Seekampf
    // zeichnet selbst nichts mehr, die Ansicht läuft komplett dort.
    if (typeof renderKarteGm === 'function') renderKarteGm();

    if (!box.querySelector('.sk-details')) {
        box.innerHTML = `
            <details class="x-details sk-details" ${skOffenGm ? 'open' : ''}>
                <summary class="tm-head">
                    <div class="tm-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-ship"></i> Seekampf
                        ${seekampf.einheiten.length ? `<span class="x-count">${seekampf.einheiten.length}</span>` : ''}
                        <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('seekampf')" title="Hilfe zum Seekampf"></i>
                    </div>
                </summary>
                <p class="ir-hint" style="margin-top:0">Schiffe und Markierungen erscheinen auf der aktiven Karte im Karte-Panel - dort auch bewegen, zeichnen und Kartenbild laden.</p>
                <div id="sk-dynamic"></div>
            </details>`;
        const details = box.querySelector('details');
        if (details) details.addEventListener('toggle', () => {
            skOffenGm = details.open;
            sicherSpeichern(SEEKAMPF_OFFEN_KEY, details.open ? '1' : '0');
        });
    }
    // Neu hinzugekommene/entfernte Einheiten und Marker seit dem letzten Render abgleichen.
    skFigurenAbgleichen();

    const dyn = document.getElementById('sk-dynamic');
    if (!dyn) return;

    const amZugId = seekampf.initiative.length ? seekampf.initiative[seekampf.initiativeIndex].id : null;
    const klasseOptionen = Object.entries(SCHIFF_KLASSEN).map(([k, v]) => `<option value="${k}">${v.label} (${v.trefferpunkte} TP, ${v.geschwindigkeit}, ${v.kanonen} Kanonen)</option>`).join('');

    dyn.innerHTML = `
        <div class="sk-kopfzeile">
            <div class="sk-wind-anzeige">
                ${skWindKompassSvg(seekampf.wind.richtung)}
                <div>
                    <div><b>Wind: ${SK_WIND_RICHTUNGEN[seekampf.wind.richtung]}</b></div>
                    <div class="ir-hint" style="margin:0">nächster Wechsel in ${seekampf.wind.naechsterWechsel} Runden</div>
                </div>
                <button class="sk-mini-btn" onclick="skWindWuerfeln()"><i class="fa-solid fa-dice"></i> Wind würfeln</button>
            </div>
            <div class="sk-runde-anzeige">
                <div><b>Runde ${seekampf.runde}</b></div>
                <button class="sk-mini-btn" onclick="skInitiativeWuerfeln()"><i class="fa-solid fa-dice"></i> Initiative würfeln</button>
                <button class="sk-mini-btn" onclick="skRundeWeiter()"><i class="fa-solid fa-forward"></i> Nächste Einheit</button>
                <button class="x-mini x-mini-danger" onclick="skGefechtZuruecksetzen()" title="Gefecht zurücksetzen"><i class="fa-solid fa-rotate-left"></i></button>
            </div>
        </div>
        ${seekampf.initiative.length ? `<div class="sk-initiative-leiste">
            ${seekampf.initiative.map(i => {
                const e = skEinheit(i.id);
                if (!e) return '';
                return `<span class="sk-init-chip ${i.id === amZugId ? 'sk-init-chip-aktiv' : ''}">${escapeHtml(e.name)} (${i.wurf})</span>`;
            }).join('')}
        </div>` : ''}

        <div class="sk-marker-zeile">
            <input type="text" id="sk-marker-name" class="sk-input" placeholder="Name (optional) …" onkeydown="if(event.key==='Enter') skMarkerHinzufuegen()">
            <select id="sk-marker-typ" class="sk-input">
                ${Object.entries(SK_MARKER_TYPEN).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}
            </select>
            <button class="sk-mini-btn" onclick="skMarkerHinzufuegen()"><i class="fa-solid fa-location-dot"></i> Marker setzen</button>
            ${seekampf.marker.length ? `<div class="sk-marker-liste">
                ${seekampf.marker.map(m => `<span class="sk-badge" style="--sk-farbe:${escapeHtml(m.farbe)}"><span class="sk-farbpunkt" style="background:${escapeHtml(m.farbe)}"></span>${escapeHtml(m.name)}
                    <button class="sk-badge-groesse" onclick="skMarkerGroesseAendern('${m.id}', -${SK_MARKER_GROESSE_SCHRITT})" title="Kleiner">−</button>
                    <button class="sk-badge-groesse" onclick="skMarkerGroesseAendern('${m.id}', ${SK_MARKER_GROESSE_SCHRITT})" title="Größer">+</button>
                    <button class="sk-badge-x" onclick="skMarkerEntfernen('${m.id}')" title="Marker entfernen">×</button></span>`).join('')}
            </div>` : ''}
        </div>

        <div class="sk-neu-form">
            <input type="text" id="sk-neu-name" class="sk-input" placeholder="Schiffsname …" onkeydown="if(event.key==='Enter') skEinheitHinzufuegen()">
            <select id="sk-neu-seite" class="sk-input">
                ${Object.entries(SK_SEITEN).map(([k, v]) => `<option value="${k}" ${k === 'gegner' ? 'selected' : ''}>${v.label}</option>`).join('')}
            </select>
            <select id="sk-neu-klasse" class="sk-input">
                <option value="">Eigene Werte (Standard)</option>
                ${klasseOptionen}
            </select>
            <button class="sk-add-btn" onclick="skEinheitHinzufuegen()"><i class="fa-solid fa-plus"></i> Zum Gefecht hinzufügen</button>
        </div>

        <div class="sk-einheiten-liste">
            ${seekampf.einheiten.length ? seekampf.einheiten.map(e => skEinheitKarteHtml(e, e.id === amZugId)).join('') : '<p class="x-leer">Noch keine Einheiten im Gefecht.</p>'}
        </div>

        ${skManoeverReferenzHtml()}

        <details class="sk-log-details">
            <summary>Kampf-Log (${seekampf.log.length})</summary>
            <div class="sk-log">${seekampf.log.length ? seekampf.log.map(t => `<div class="sk-log-zeile">${t}</div>`).join('') : '<p class="x-leer">Noch keine Ereignisse.</p>'}</div>
        </details>`;

    dyn.querySelectorAll('[data-skfeld]').forEach(el => {
        const ereignis = el.tagName === 'SELECT' ? 'change' : 'input';
        el.addEventListener(ereignis, () => skEinheitFeldAendern(el.dataset.skid, el.dataset.skfeld, el.value));
    });
}

// =============================================================================
// Spieler-Seite - Live-Ansicht der Karte, nur eigenes (zugewiesenes) Schiff
// per Zugvorschlag ziehbar. Nichts hiervon läuft im GM-Modus.
// =============================================================================

function skLeererSpielerStand() {
    return { wind: { richtung: 0, naechsterWechsel: 6 }, runde: 1, einheiten: [], marker: [] };
}

let skSpieler = skLeererSpielerStand();
let skSpielerOffen = true;

function skEmpfangen(payload) {
    skSpieler.wind = payload.wind || skSpieler.wind;
    skSpieler.runde = payload.runde || skSpieler.runde;
    skSpieler.einheiten = Array.isArray(payload.einheiten) ? payload.einheiten : [];
    skSpieler.marker = Array.isArray(payload.marker) ? payload.marker : [];
    renderSeekampfSpieler();
    // Die Figuren selbst (Position, Bild, Nebel) laufen über karten.js' eigene
    // Nachricht (type: 'karte') auf die gemeinsame karteSpielerMap - hier nur
    // noch Porträts und den lokalen Besitzer-Trick für Schiffe nachziehen.
    // karteSpielerMap existiert eventuell noch nicht (falls diese Nachricht
    // vor der ersten 'karte'-Nachricht ankommt) - dann holt der nächste Sync
    // das nach.
    if (typeof karteSpielerMap !== 'undefined' && karteSpielerMap) {
        const meinPeer = typeof peer !== 'undefined' && peer ? peer.id : null;
        skSpieler.einheiten.forEach(e => {
            karteSpielerMap.setFigurBild(e.id, skSchiffBild(e.farbe));
            // Mehrere Spieler können sich ein Schiff teilen (siehe skEinheitSpielerToggle)
            // - battlemap.js selbst kennt aber nur EINEN besitzer pro Figur und prüft
            // ihn strikt gegen setBesitzer(). Der Trick: jede Spieler-Karte ist ihre
            // eigene, unabhängige BattleMap-Instanz, also setzen wir "besitzer" hier
            // lokal auf die EIGENE peerId, wenn diese Person das Schiff steuern darf
            // (Kapitän gesetzt: nur der; sonst jeder aus spielerIds) - andere Spieler
            // machen dasselbe mit ihrer eigenen peerId auf ihrer eigenen Karte.
            const darf = e.kapitaen ? e.kapitaen === meinPeer : (Array.isArray(e.spielerIds) && meinPeer && e.spielerIds.includes(meinPeer));
            karteSpielerMap.addFigur({ id: e.id, besitzer: darf ? meinPeer : null });
        });
        skSpieler.marker.forEach(m => karteSpielerMap.setFigurBild(m.id, skMarkerBild(m.typ || 'sonstiges')));
        skFigurenZOrdnen(karteSpielerMap, skSpieler.einheiten);
    }
}

function skSpielerBeitritt() {
    skSpieler = skLeererSpielerStand();
    renderSeekampfSpieler();
}

function skSpielerGetrennt() {
    skSpieler = skLeererSpielerStand();
    renderSeekampfSpieler();
}

// Beim Spieler eintreffende Nachrichten (aus multiplayer.js). true = verarbeitet.
function skNachrichtVerarbeiten(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type === 'seekampf') { skEmpfangen(payload); return true; }
    return false;
}

function skEinheitKarteSpielerHtml(e) {
    const seiteInfo = SK_SEITEN[e.seite] || SK_SEITEN.neutral;
    const strukturPct = e.struktur.max > 0 ? Math.max(0, Math.min(100, (e.struktur.aktuell / e.struktur.max) * 100)) : 0;
    const gesunken = e.struktur.aktuell <= 0;
    const meinPeer = typeof peer !== 'undefined' && peer ? peer.id : null;
    const gehoertMir = Array.isArray(e.spielerIds) && meinPeer && e.spielerIds.includes(meinPeer);
    const effekteHtml = e.effekte.length ? `<div class="sk-effekte">${e.effekte.map(eff => `
        <span class="sk-badge">${escapeHtml(eff.text)}${eff.rundenUebrig !== null ? ` (${eff.rundenUebrig})` : ''}</span>`).join('')}</div>` : '';
    return `<div class="sk-einheit ${gesunken ? 'sk-einheit-gesunken' : ''}" style="--sk-farbe:${escapeHtml(e.farbe)}">
        <div class="sk-einheit-kopf">
            <span class="sk-farbpunkt"></span>
            <span class="sk-name-anzeige">${escapeHtml(e.name)}</span>
            <span class="ir-hint" style="margin:0">${escapeHtml(seiteInfo.label)}</span>
        </div>
        ${gehoertMir ? '<p class="ir-hint" style="color:var(--color-accent)"><i class="fa-solid fa-hand"></i> Du kannst dieses Schiff auf der Karte ziehen.</p>' : ''}
        ${gesunken ? '<p class="ir-hint ir-warnung"><i class="fa-solid fa-water"></i> Sinkt!</p>' : ''}
        <div class="sk-struktur-zeile">
            <div class="sk-struktur-bar"><div class="sk-struktur-fill" style="width:${strukturPct}%"></div></div>
            <span class="sk-struktur-zahl">${e.struktur.aktuell} / ${e.struktur.max}</span>
        </div>
        ${effekteHtml}
    </div>`;
}

// Zeichnet nichts mehr selbst - die Karte (inkl. Schiffe ziehen) läuft über
// das Karte-Panel (karten.js), das dieselbe Vorschlag/Bestätigung-Mechanik
// für Schiffe mitnutzt (siehe skAnfrageVerarbeiten). Hier nur noch Wind/
// Runde/Schiffsroster als Buchhaltungs-Ansicht.
function renderSeekampfSpieler() {
    const section = document.getElementById('seekampf-section');
    if (!section) return;
    const verbunden = typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
    if (!verbunden || (typeof isGmMode !== 'undefined' && isGmMode) || typeof eldaraAktiv !== 'function' || !eldaraAktiv()) {
        section.style.display = 'none';
        return;
    }
    section.style.display = '';

    if (!section.querySelector('.sk-details')) {
        section.innerHTML = `
            <details class="x-details sk-details" ${skSpielerOffen ? 'open' : ''}>
                <summary class="tm-head">
                    <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-ship category-icon-fa"></i> Seekampf
                        <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('seekampf')" title="Hilfe zum Seekampf"></i>
                    </h2>
                </summary>
                <p class="ir-hint" style="margin-top:0">Die Karte mit den Schiffen ist im Karte-Panel - dort auch ziehen, wenn dir (oder als Kapitän nur dir) ein Schiff zugewiesen ist. Dein Zug erscheint beim SL erst als Vorschlag, den er bestätigt oder verwirft.</p>
                <div id="sk-spieler-dynamic"></div>
            </details>`;
        const details = section.querySelector('details');
        if (details) details.addEventListener('toggle', () => { skSpielerOffen = details.open; });
    }

    const dyn = document.getElementById('sk-spieler-dynamic');
    if (!dyn) return;
    dyn.innerHTML = `
        <div class="sk-kopfzeile">
            <div class="sk-wind-anzeige">
                ${skWindKompassSvg(skSpieler.wind.richtung)}
                <div><b>Wind: ${SK_WIND_RICHTUNGEN[skSpieler.wind.richtung]}</b></div>
            </div>
            <div class="sk-runde-anzeige"><b>Runde ${skSpieler.runde}</b></div>
        </div>
        <div class="sk-einheiten-liste">
            ${skSpieler.einheiten.length ? skSpieler.einheiten.map(e => skEinheitKarteSpielerHtml(e)).join('') : '<p class="x-leer">Noch keine Einheiten im Gefecht.</p>'}
        </div>`;
}

// --- Zahlen-Stepper für die Raster-Werkzeuge (wie im Schwesterprojekt
// demonslayer, app.js) - ein Klick zählt einen step, Halten wiederholt
// automatisch (350ms Anlauf, dann alle 70ms). Global delegiert, damit jedes
// .sk-num-stepper-Element funktioniert, ohne einzeln verdrahtet zu werden.

function skNumStepperTick(btn) {
    const stepper = btn.closest('.sk-num-stepper');
    const input = stepper && stepper.querySelector('input[type=number]');
    if (!input || input.disabled || btn.disabled) return false;
    const schritt = (parseFloat(input.getAttribute('step')) || 1) * parseFloat(btn.dataset.dir);
    let wert = (parseFloat(input.value) || 0) + schritt;
    const min = input.getAttribute('min');
    const max = input.getAttribute('max');
    if (min !== null && wert < parseFloat(min)) wert = parseFloat(min);
    if (max !== null && wert > parseFloat(max)) wert = parseFloat(max);
    if (Math.abs(wert - (parseFloat(input.value) || 0)) < 1e-9) return false;
    input.value = String(wert);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
}

document.addEventListener('click', e => {
    const btn = e.target.closest('.sk-num-stepper button[data-dir]');
    if (btn) skNumStepperTick(btn);
});

let skNumStepperHold = null;
let skNumStepperBtn = null;
function skNumStepperHaltStop() {
    if (skNumStepperHold) { clearTimeout(skNumStepperHold); clearInterval(skNumStepperHold); skNumStepperHold = null; }
    skNumStepperBtn = null;
}
document.addEventListener('pointerdown', e => {
    const btn = e.target.closest('.sk-num-stepper button[data-dir]');
    if (!btn || btn.disabled) return;
    skNumStepperHaltStop();
    skNumStepperBtn = btn;
    skNumStepperHold = setTimeout(() => {
        skNumStepperHold = setInterval(() => {
            if (btn.disabled || !skNumStepperTick(btn)) skNumStepperHaltStop();
        }, 70);
    }, 350);
});
document.addEventListener('pointermove', e => {
    if (skNumStepperBtn && e.target.closest('.sk-num-stepper button[data-dir]') !== skNumStepperBtn) skNumStepperHaltStop();
});
['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => document.addEventListener(ev, skNumStepperHaltStop));
window.addEventListener('blur', skNumStepperHaltStop);

document.addEventListener('DOMContentLoaded', () => {
    skLaden();
    renderSeekampfGm();
});
