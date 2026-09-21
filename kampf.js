// How to be a Hero - Kampf (Eldara-Hausregel: allgemeiner Kampf/"Landkampf")
//
// Initiative-/Zustands-Tracker für RW 4.3 Kapitel "Kampf" (S.20-24,
// hausregeln/quellen/rw43.txt Zeile ~916-1120) - jeder Kampf, der KEIN
// Schiffsgefecht ist (Landkampf, Entern, Tavernenschlägerei, ...). Nur
// sichtbar, wenn das Regelpaket "eldora-arrrrr" aktiv ist (eldaraAktiv() in
// hausregeln.js).
//
// Anders als Seekampf braucht dieses Modul KEINE eigene Karte/Positionierung
// - Teilnehmer sind ohnehin schon Figuren auf der gemeinsamen Karte
// (karten.js: 'spieler:'+peerId automatisch, NSCs per "Auf Karte
// platzieren"). Kampf.js kümmert sich rein um Initiative-Reihenfolge und die
// Zustands-Automatik, komplett unabhängig davon, welche Karte gerade aktiv
// ist oder ob überhaupt eine offen ist.
//
// AUTOMATISIERT (reine Würfelmechanik):
//   - Initiative (1W10 pro Teilnehmer, S.20)
//   - Blutungen/Feuermarker: 1W6 pro Marke zu Rundenbeginn, automatisch beim
//     "Runde weiter"-Knopf (S.21)
//   - Gift: Schadenswürfel nach Stufe (1W4..1W20), Stufen-Eskalation bei zwei
//     Misserfolgen in Folge (S.21f) - die Zähigkeits-/Immunsystem-PROBE
//     selbst läuft am Bogen des Spielers, hier trägt der SL nur Erfolg/
//     Misserfolg ein
//   - Schlaf/tiefer Schlaf: Rundenzähler, Wecken-Zähler für tiefen Schlaf,
//     Aufwachen durch Schaden (S.22)
//   - 0-HP-Rettungswurf (1W100-Tabelle mit Tages-Eskalationsmalus, S.23)
//   - Ohnmacht/Amputation (1W10-Körperteil-Tabelle, S.24)
//   - Nächtliche Regeneration (1W10 Grund + Essen-/Schlaf-Würfel, S.24)
//
// NICHT AUTOMATISIERT: die eigentlichen Angriffs-/Verteidigungs-Proben
// (Fähigkeitswert = Talentpunkte + Begabungswert, S.7) - die laufen ganz
// normal über das Würfel-Tool des angreifenden/verteidigenden Spielers.
// Waffenschaden erscheint hier nur als Nachschlage-Tabelle (S.28f), kein
// Knopf, der von selbst schießt.
//
// HP-Modell: Spieler-Teilnehmer haben HIER keine eigene, autoritative HP -
// die liegt auf ihrem eigenen Bogen. Schaden/Heilung, die dieses Modul für
// sie auslöst (Blutung tickt, Rettungswurf heilt, ...), geht als gezielte
// Nachricht an genau diesen einen Spieler raus und wird DORT angewendet -
// exakt das gleiche Push-Prinzip wie eingriff.js schon für Gegenstände/
// Status/Monsterpunkte nutzt (dort neue Aktion 'hp', siehe eingriff.js).
// NSC-Teilnehmer dagegen haben ihre HP direkt hier im Kampf-Zustand (wie
// Seekampfs `struktur` bei Schiffen), weil der SL sie exklusiv kontrolliert.
//
// Datenmodell (persistiert als JSON unter KAMPF_KEY):
//   kampf = {
//     runde,
//     teilnehmer: [ { id, art ('spieler'|'nsc'), peerId (nur spieler), name,
//                     seite ('spieler'|'gegner'|'verbuendet'), farbe,
//                     hp: {aktuell, max} (nur nsc), init (1W10 oder null),
//                     blutung (0-5), feuermarker (0-5), gift (0-6),
//                     giftMisserfolge, schlaf (null | {tief, rundenUebrig,
//                     geweckt}), stun, rettungswuerfe (Zähler für
//                     Eskalationsmalus, mit "Zurücksetzen" gelöscht), tot,
//                     seeleRundenUebrig, permanenteEffekte: [{teil, folge}]
//                     (Amputationen), tageOhneEssen, tageOhneSchlaf } ],
//     log: [ text, ... ] (jüngste zuerst, gekappt)
//   }
//
// Live-Sync: { type: 'kampf', runde, teilnehmer: [...gefiltert, ohne
// Spieler-HP] } - GM zu allen Spielern, nach jeder Änderung (debounced) und
// bei Verbindungsaufbau.

const KAMPF_KEY = 'htbah_gm_kampf';
const KAMPF_OFFEN_KEY = 'htbah_gm_kampf_offen';
const KAMPF_LOG_MAX = 40;

const KAMPF_SEITEN = {
    spieler: { label: 'Spieler', farbe: '#57c2f0' },
    gegner: { label: 'Gegner', farbe: '#ef4444' },
    verbuendet: { label: 'Verbündet', farbe: '#4ade80' }
};

// Gift-Stufe -> Schadensformel (S.21, Tabelle "Giftschaden pro Stufe")
const KAMPF_GIFT_SCHADEN = { 1: '1w4', 2: '1w6', 3: '1w8', 4: '1w10', 5: '1w12', 6: '1w20' };

// Amputationstabelle 1W10 (S.24)
const KAMPF_AMPUTATION_TABELLE = {
    1: { teil: 'Große Narbe im Gesicht', folge: 'Einschüchtern +10 / Beruhigen -10 / Lügen -10' },
    2: { teil: 'Ohr Links', folge: 'Wahrnehmung -10' },
    3: { teil: 'Auge Links', folge: 'Wahrnehmung -10' },
    4: { teil: 'Bein Links', folge: 'Athletik -5 / Bewegung -1' },
    5: { teil: 'Hand Links', folge: 'Handeln -15 / kein Kampf mit zwei Waffen möglich' },
    6: { teil: 'Ohr Rechts', folge: 'Wahrnehmung -10' },
    7: { teil: 'Auge Rechts', folge: 'Wahrnehmung -10' },
    8: { teil: 'Bein Rechts', folge: 'Athletik -5 / Bewegung -1' },
    9: { teil: 'Hand Rechts', folge: 'Handeln -15 / kein Kampf mit zwei Waffen möglich' },
    10: { teil: 'Kopf', folge: 'Sofortiger Tod', toedlich: true }
};

// Essen/Schlaf-Qualität -> Würfelgröße für die nächtliche Regeneration (S.24)
const KAMPF_NACHT_WUERFEL = { viel: 12, wenig: 10, keine: 0 };

// Waffenschaden-Referenz (S.28f) - reine Nachschlage-Tabelle, kein Automatik-Knopf
// (siehe Datei-Kopfkommentar: die Angriffsprobe selbst braucht Charakterwerte).
const KAMPF_WAFFEN_NAHKAMPF = [
    { name: 'Faust / Stärke', schaden: '1w10 pro 15 Stärke', info: 'Krit: Ziel 15% gestunnt' },
    { name: 'Degen', schaden: '3w10+10', info: '+10 auf Blocken' },
    { name: 'Säbel', schaden: '5w10', info: 'Krit: +3 BL' },
    { name: 'Machete', schaden: '4w10+10', info: '+5 rüstungsbrechend' },
    { name: 'Axt', schaden: '5w10', info: '+1w4 Schaden pro 10 unter Nahkampfwurf' },
    { name: 'Kriegshammer/Streitkolben (2H)', schaden: 'Stärkeschaden +3w10', info: 'Krit: halber Schaden an angrenzenden Feldern' },
    { name: 'Messer/Dolch', schaden: '2w10 + GS 1', info: 'Krit: +GS 5' },
    { name: 'Stock', schaden: '1w10+5', info: '+5 auf Blocken, +5 Rüstung' },
    { name: 'Improvisierte Waffe', schaden: '1w10+1w4', info: '' }
];
const KAMPF_WAFFEN_FERNKAMPF = [
    { name: 'Muskete', schaden: '7w10', reichweite: '20m', ladedauer: '3 Aktionen' },
    { name: 'Pistole', schaden: '5w10', reichweite: '10m', ladedauer: '2 Aktionen' },
    { name: 'Bogen', schaden: '4w10', reichweite: '15m', ladedauer: '1 Aktion' },
    { name: 'Schrotflinte', schaden: '5w10 +2BL', reichweite: '5m', ladedauer: '3 Aktionen, 2 Ladungen' },
    { name: 'Kanone', schaden: 'Vs. Schiff 10w10 / Vs. Mensch 12w10', reichweite: '300m', ladedauer: '3 Aktionen' },
    { name: 'Wurfwaffe', schaden: '3w10', reichweite: '10m', ladedauer: '0 Aktionen' },
    { name: 'Bombe', schaden: '10w10', reichweite: '3x3m Radius', ladedauer: '3 Aktionen' }
];

let kampf = kampfLeererStand();
let kampfOffenGm = true;

function kampfLeererStand() {
    return { runde: 0, teilnehmer: [], log: [] };
}

function kampfLaden() {
    try {
        const roh = localStorage.getItem(KAMPF_KEY);
        const geladen = roh ? JSON.parse(roh) : null;
        kampf = geladen && typeof geladen === 'object' ? Object.assign(kampfLeererStand(), geladen) : kampfLeererStand();
        if (!Array.isArray(kampf.teilnehmer)) kampf.teilnehmer = [];
        if (!Array.isArray(kampf.log)) kampf.log = [];
        kampf.teilnehmer.forEach(t => {
            if (t.blutung == null) t.blutung = 0;
            if (t.feuermarker == null) t.feuermarker = 0;
            if (t.gift == null) t.gift = 0;
            if (t.giftMisserfolge == null) t.giftMisserfolge = 0;
            if (t.schlaf === undefined) t.schlaf = null;
            if (t.stun == null) t.stun = false;
            if (t.rettungswuerfe == null) t.rettungswuerfe = 0;
            if (t.tot == null) t.tot = false;
            if (t.seeleRundenUebrig === undefined) t.seeleRundenUebrig = null;
            if (!Array.isArray(t.permanenteEffekte)) t.permanenteEffekte = [];
            if (t.tageOhneEssen == null) t.tageOhneEssen = 0;
            if (t.tageOhneSchlaf == null) t.tageOhneSchlaf = 0;
        });
    } catch (e) { kampf = kampfLeererStand(); }
    try { kampfOffenGm = localStorage.getItem(KAMPF_OFFEN_KEY) !== '0'; } catch (e) { kampfOffenGm = true; }
}

function kampfSichern() {
    try { localStorage.setItem(KAMPF_KEY, JSON.stringify(kampf)); } catch (e) { /* voll oder blockiert */ }
    kampfVerteilen();
}

function kampfLog(text) {
    kampf.log.unshift(text);
    if (kampf.log.length > KAMPF_LOG_MAX) kampf.log.length = KAMPF_LOG_MAX;
    kampfSichern();
}

function kampfTeilnehmer(id) { return kampf.teilnehmer.find(t => t.id === id); }

// --- Teilnehmer hinzufügen/entfernen ----------------------------------------

function kampfSpielerHinzufuegen(peerId) {
    if (kampfTeilnehmer('spieler:' + peerId)) return;
    const d = (typeof connectedPlayersData !== 'undefined' && connectedPlayersData[peerId]) || {};
    const name = [d.vorname, d.name].filter(Boolean).join(' ') || 'Unbekannt';
    kampf.teilnehmer.push({
        id: 'spieler:' + peerId, art: 'spieler', peerId, name,
        seite: 'spieler', farbe: KAMPF_SEITEN.spieler.farbe,
        init: null, blutung: 0, feuermarker: 0, gift: 0, giftMisserfolge: 0,
        schlaf: null, stun: false, rettungswuerfe: 0, tot: false, seeleRundenUebrig: null,
        permanenteEffekte: [], tageOhneEssen: 0, tageOhneSchlaf: 0
    });
    kampfLog(`${name} tritt dem Kampf bei.`);
    renderKampfGm();
}

function kampfNscHinzufuegen() {
    const nameEl = document.getElementById('kf-neu-name');
    const hpEl = document.getElementById('kf-neu-hp');
    const seiteEl = document.getElementById('kf-neu-seite');
    const name = (nameEl ? nameEl.value : '').trim();
    if (!name) { if (nameEl) nameEl.focus(); return; }
    const hp = Math.max(1, parseInt(hpEl ? hpEl.value : 30) || 30);
    const seite = (seiteEl && KAMPF_SEITEN[seiteEl.value]) ? seiteEl.value : 'gegner';
    const id = 'kf_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    kampf.teilnehmer.push({
        id, art: 'nsc', name, seite, farbe: KAMPF_SEITEN[seite].farbe,
        hp: { aktuell: hp, max: hp },
        init: null, blutung: 0, feuermarker: 0, gift: 0, giftMisserfolge: 0,
        schlaf: null, stun: false, rettungswuerfe: 0, tot: false, seeleRundenUebrig: null,
        permanenteEffekte: [], tageOhneEssen: 0, tageOhneSchlaf: 0
    });
    if (nameEl) { nameEl.value = ''; nameEl.focus(); }
    kampfLog(`${name} (${KAMPF_SEITEN[seite].label}) tritt dem Kampf bei.`);
    renderKampfGm();
}

// Übernimmt nur den Namen aus der NSC-Liste ins Neu-Formular (HP kennt die
// Liste nicht) - der SL trägt HP/Seite selbst ein, bevor er "Hinzufügen" klickt.
function kampfNscAusListeUebernehmen() {
    const sel = document.getElementById('kf-nscliste-wahl');
    const id = sel ? sel.value : '';
    if (!id || typeof nscListe === 'undefined') return;
    const n = nscListe.find(x => x.id === id);
    if (!n) return;
    const nameEl = document.getElementById('kf-neu-name');
    if (nameEl) { nameEl.value = n.name || ''; nameEl.focus(); }
    if (sel) sel.value = '';
}

function kampfTeilnehmerEntfernen(id) {
    const t = kampfTeilnehmer(id);
    if (!t) return;
    kampf.teilnehmer = kampf.teilnehmer.filter(x => x.id !== id);
    kampfLog(`${t.name} verlässt den Kampf.`);
    renderKampfGm();
}

// --- Initiative --------------------------------------------------------------

function kampfInitiativeWuerfeln(id) {
    const t = kampfTeilnehmer(id);
    if (!t) return;
    t.init = skW(10);
    kampfLog(`${t.name} würfelt Initiative: ${t.init}.`);
    renderKampfGm();
}

function kampfInitiativeAlleWuerfeln() {
    kampf.teilnehmer.forEach(t => { if (t.init == null) t.init = skW(10); });
    kampfLog(`Initiative für alle ohne Wurf ausgewürfelt.`);
    renderKampfGm();
}

function kampfInitiativeSortierung() {
    return kampf.teilnehmer.slice().sort((a, b) => (b.init == null ? -1 : b.init) - (a.init == null ? -1 : a.init));
}

// --- Rundenablauf --------------------------------------------------------------

function kampfRundeWeiter() {
    kampf.runde++;
    kampf.teilnehmer.forEach(t => {
        if (t.tot) {
            if (t.seeleRundenUebrig != null) {
                t.seeleRundenUebrig--;
                if (t.seeleRundenUebrig <= 0) {
                    kampf.log.unshift(`${t.name}s Seele entgleitet endgültig - zu spät für eine Rettung.`);
                    t.seeleRundenUebrig = null;
                }
            }
            return;
        }
        if (t.stun) t.stun = false;
        if (t.schlaf) {
            t.schlaf.rundenUebrig--;
            if (t.schlaf.rundenUebrig <= 0) {
                kampf.log.unshift(`${t.name} wacht auf.`);
                t.schlaf = null;
            }
        }
        if (t.blutung > 0) {
            const w = kampfWuerfelSumme(t.blutung, 6);
            kampfSchadenAnwenden(t.id, w.summe, { grund: `Blutung (${t.blutung}x 1W6: ${w.rolls.join('+')})`, keineNeuBerechnung: true });
        }
        if (t.feuermarker > 0) {
            const w = kampfWuerfelSumme(t.feuermarker, 6);
            kampfSchadenAnwenden(t.id, w.summe, { grund: `Feuermarker (${t.feuermarker}x 1W6: ${w.rolls.join('+')})`, keineNeuBerechnung: true });
        }
    });
    kampf.log.unshift(`— Runde ${kampf.runde} beginnt —`);
    kampfSichern();
    renderKampfGm();
}

function kampfWuerfelSumme(anzahl, seiten) {
    const rolls = [];
    for (let i = 0; i < anzahl; i++) rolls.push(skW(seiten));
    return { rolls, summe: rolls.reduce((a, b) => a + b, 0) };
}

// --- Schaden/Heilung -----------------------------------------------------------

// opts: { grund, rb, ruestung, einzelTreffer } - rb/ruestung nur für den
// manuellen Schaden-Knopf gedacht (Rüstungsbrechend, S.23: RB reduziert die
// Rüstung des Ziels, ERST DANACH wird der Schaden verrechnet).
function kampfSchadenAnwenden(id, betrag, opts) {
    const t = kampfTeilnehmer(id);
    if (!t || !betrag) return;
    opts = opts || {};
    let effektiv = betrag;
    if (opts.rb) {
        const ruestungNachRb = Math.max(0, (opts.ruestung || 0) - opts.rb);
        effektiv = Math.max(0, betrag - ruestungNachRb);
    }
    if (t.schlaf) { t.schlaf = null; kampf.log.unshift(`${t.name} wacht durch den Schaden auf.`); }
    if (t.art === 'nsc') {
        t.hp.aktuell -= effektiv;
        kampf.log.unshift(`${t.name} erleidet ${effektiv} Schaden${opts.grund ? ' (' + opts.grund + ')' : ''} (${t.hp.aktuell}/${t.hp.max} HP).`);
        if (t.hp.aktuell <= 0) kampf.log.unshift(`${t.name} ist bei 0 HP oder darunter - Rettungswurf fällig!`);
    } else if (t.art === 'spieler') {
        kampfHpSenden(t.peerId, -effektiv, opts.grund);
        kampf.log.unshift(`${t.name} erleidet ${effektiv} Schaden${opts.grund ? ' (' + opts.grund + ')' : ''}.`);
    }
    if (opts.einzelTreffer && effektiv >= (opts.monsterform ? 100 : 70)) {
        kampf.log.unshift(`${t.name}: ${effektiv} Schaden in einem Treffer (≥${opts.monsterform ? 100 : 70}) - Amputation möglich (Knopf an der Karte).`);
    }
    kampfSichern();
    renderKampfGm();
}

function kampfHeilungAnwenden(id, betrag, grund) {
    const t = kampfTeilnehmer(id);
    if (!t || !betrag) return;
    if (t.art === 'nsc') {
        t.hp.aktuell = Math.min(t.hp.max, t.hp.aktuell + betrag);
        kampf.log.unshift(`${t.name} heilt ${betrag} HP${grund ? ' (' + grund + ')' : ''} (${t.hp.aktuell}/${t.hp.max} HP).`);
    } else if (t.art === 'spieler') {
        kampfHpSenden(t.peerId, betrag, grund);
        kampf.log.unshift(`${t.name} heilt ${betrag} HP${grund ? ' (' + grund + ')' : ''}.`);
    }
    kampfSichern();
    renderKampfGm();
}

// Schaden/Heilung eines Spielers laufen nie über den GM-Zustand direkt - nur
// dieser eine Spieler darf seine eigene HP ändern, siehe Datei-Kopfkommentar.
// Reuse des bestehenden eingriff.js-Protokolls (neue Aktion 'hp').
function kampfHpSenden(peerId, betrag, grund) {
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;
    if (!conn || !conn.open) return false;
    try { conn.send({ type: 'eingriff', aktion: 'hp', still: false, betrag, grund: grund ? String(grund).slice(0, 120) : undefined }); return true; }
    catch (e) { return false; }
}

function kampfStatusSenden(peerId, status) {
    const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;
    if (!conn || !conn.open) return false;
    try { conn.send({ type: 'eingriff', aktion: 'status', still: false, status }); return true; }
    catch (e) { return false; }
}

function kampfSchadenManuell(id) {
    const betragEl = document.querySelector(`[data-kfschaden="${id}"]`);
    const rbEl = document.querySelector(`[data-kfrb="${id}"]`);
    const ruestungEl = document.querySelector(`[data-kfruestung="${id}"]`);
    const betrag = betragEl ? Math.abs(parseInt(betragEl.value) || 0) : 0;
    if (!betrag) return;
    const rb = rbEl ? Math.max(0, parseInt(rbEl.value) || 0) : 0;
    const ruestung = ruestungEl ? Math.max(0, parseInt(ruestungEl.value) || 0) : 0;
    kampfSchadenAnwenden(id, betrag, { rb, ruestung, einzelTreffer: true });
    if (betragEl) betragEl.value = '';
}

function kampfHeilungManuell(id) {
    const betragEl = document.querySelector(`[data-kfheilung="${id}"]`);
    const betrag = betragEl ? Math.abs(parseInt(betragEl.value) || 0) : 0;
    if (!betrag) return;
    kampfHeilungAnwenden(id, betrag, 'manuell');
    if (betragEl) betragEl.value = '';
}

// --- Blutung/Feuermarker ------------------------------------------------------

function kampfBlutungAendern(id, delta) {
    const t = kampfTeilnehmer(id); if (!t) return;
    t.blutung = Math.max(0, Math.min(5, t.blutung + delta));
    kampfLog(`Blutung bei ${t.name}: ${t.blutung}.`);
    renderKampfGm();
}
function kampfFeuermarkerAendern(id, delta) {
    const t = kampfTeilnehmer(id); if (!t) return;
    t.feuermarker = Math.max(0, Math.min(5, t.feuermarker + delta));
    kampfLog(`Feuermarker bei ${t.name}: ${t.feuermarker}.`);
    renderKampfGm();
}
// Verband anlegen (Medizinprobe, 1 Aktion): stillt 3 Blutungen auf einmal (S.21)
function kampfVerbandAnlegen(id) {
    const t = kampfTeilnehmer(id); if (!t) return;
    const vorher = t.blutung;
    t.blutung = Math.max(0, t.blutung - 3);
    kampfLog(`Verband bei ${t.name}: ${vorher} → ${t.blutung} Blutungen.`);
    renderKampfGm();
}
// alles=true simuliert "Wasser: löscht alle Feuermarker sofort" (S.21)
function kampfFeuerLoeschen(id, alles) {
    const t = kampfTeilnehmer(id); if (!t) return;
    const vorher = t.feuermarker;
    t.feuermarker = alles ? 0 : Math.max(0, t.feuermarker - 2);
    kampfLog(`Feuer löschen bei ${t.name}: ${vorher} → ${t.feuermarker} Feuermarker${alles ? ' (Wasser)' : ''}.`);
    renderKampfGm();
}

// --- Gift ----------------------------------------------------------------------

function kampfGiftSetzen(id, stufe) {
    const t = kampfTeilnehmer(id); if (!t) return;
    t.gift = Math.max(0, Math.min(6, stufe));
    t.giftMisserfolge = 0;
    kampfLog(`Gift-Stufe bei ${t.name} auf ${t.gift} gesetzt.`);
    renderKampfGm();
}

// erfolg = Ergebnis der Zähigkeits-/Immunsystem-Probe, die der Spieler an
// seinem eigenen Bogen würfelt - der SL trägt hier nur ein, was rauskam.
function kampfGiftProbe(id, erfolg) {
    const t = kampfTeilnehmer(id);
    if (!t || t.gift <= 0) return;
    if (erfolg) {
        t.giftMisserfolge = 0;
        t.gift = Math.max(0, t.gift - 1);
        if (t.gift === 0) { kampfLog(`${t.name} übersteht das Gift - geheilt.`); return; }
        const formel = KAMPF_GIFT_SCHADEN[t.gift];
        const w = skWuerfeln(formel);
        kampfSchadenAnwenden(id, w.summe, { grund: `Gift Stufe ${t.gift} (${formel}: ${w.summe}), Probe bestanden` });
    } else {
        t.giftMisserfolge = (t.giftMisserfolge || 0) + 1;
        const formelVorher = KAMPF_GIFT_SCHADEN[t.gift];
        const w = skWuerfeln(formelVorher);
        let text = `Gift Stufe ${t.gift} (${formelVorher}: ${w.summe}), Probe misslungen`;
        if (t.giftMisserfolge >= 2) {
            t.gift = Math.min(6, t.gift + 1);
            t.giftMisserfolge = 0;
            text += ` - zweimal in Folge, Gift steigt auf Stufe ${t.gift}`;
        }
        kampfSchadenAnwenden(id, w.summe, { grund: text });
    }
}

// --- Schlaf/Stun -----------------------------------------------------------------

function kampfSchlafSetzen(id, tief) {
    const t = kampfTeilnehmer(id); if (!t) return;
    const runden = skW(4);
    t.schlaf = { tief: !!tief, rundenUebrig: runden, geweckt: 0 };
    kampfLog(`${t.name} fällt in ${tief ? 'tiefen ' : ''}Schlaf (${runden} Runden).`);
    renderKampfGm();
}
function kampfWecken(id) {
    const t = kampfTeilnehmer(id);
    if (!t || !t.schlaf) return;
    t.schlaf.geweckt = (t.schlaf.geweckt || 0) + 1;
    const noetig = t.schlaf.tief ? 2 : 1;
    if (t.schlaf.geweckt >= noetig) {
        kampfLog(`${t.name} wird wachgerüttelt und wacht auf.`);
        t.schlaf = null;
    } else {
        kampfLog(`${t.name} wird gerüttelt, wacht aber noch nicht auf (tiefer Schlaf, braucht ${noetig}).`);
    }
    renderKampfGm();
}
function kampfStunSetzen(id, an) {
    const t = kampfTeilnehmer(id); if (!t) return;
    t.stun = !!an;
    kampfLog(`${t.name} ist ${an ? '' : 'nicht mehr '}gestunnt.`);
    renderKampfGm();
}

// --- 0-HP-Rettungswurf (S.23) ------------------------------------------------

function kampfRettungswurfWuerfeln(id) {
    const t = kampfTeilnehmer(id);
    if (!t) return;
    const vorherigeVersuche = t.rettungswuerfe || 0;
    const wurf = skW(100);
    const malus = vorherigeVersuche * 10;
    const effektiv = wurf + malus;
    t.rettungswuerfe = vorherigeVersuche + 1;
    const wurfText = `Rettungswurf ${wurf}${malus ? ' +' + malus + ' Erschwernis' : ''} = ${effektiv}`;
    if (effektiv <= 50) {
        const heilung = skWuerfeln('1w10').summe;
        t.stun = true;
        kampfHeilungAnwenden(id, heilung, `${wurfText}, bestanden`);
        kampf.log.unshift(`${t.name} klammert sich ans Leben (${wurfText}), ist für 1 Runde gestunnt.`);
    } else {
        t.tot = true;
        t.seeleRundenUebrig = skW(6);
        kampf.log.unshift(`${t.name} ist gestorben (${wurfText}). Die Seele hält sich noch ${t.seeleRundenUebrig} Runden - Rettung ist noch möglich.`);
    }
    kampfSichern();
    renderKampfGm();
}

// --- Ohnmacht/Amputation (S.24) -----------------------------------------------

function kampfAmputationWuerfeln(id) {
    const t = kampfTeilnehmer(id);
    if (!t) return;
    const wurf = skW(10);
    const eintrag = KAMPF_AMPUTATION_TABELLE[wurf];
    if (eintrag.toedlich) {
        t.tot = true;
        t.seeleRundenUebrig = null;
        kampfLog(`${t.name} verliert bei Wurf ${wurf} den Kopf - sofort tot.`);
        return;
    }
    t.permanenteEffekte.push({ teil: eintrag.teil, folge: eintrag.folge });
    if (t.art === 'spieler') {
        kampfStatusSenden(t.peerId, { name: `Amputiert: ${eintrag.teil}`, value: eintrag.folge, type: 'malus' });
    }
    kampfLog(`${t.name} verliert ${eintrag.teil} (${eintrag.folge}, Wurf ${wurf}).`);
}

// --- Nächtliche Regeneration (S.24) -------------------------------------------

function kampfNachtRegeneration(id, essen, schlafQualitaet) {
    const t = kampfTeilnehmer(id);
    if (!t || t.tot) return;
    let gesamt = skW(10);
    const teile = [`Grund 1W10 (${gesamt})`];

    if (essen === 'keine') {
        t.tageOhneEssen = (t.tageOhneEssen || 0) + 1;
        if (t.tageOhneEssen >= 2) { const m = skW(10); gesamt -= m; teile.push(`-1W10 Hunger (${m})`); }
    } else {
        t.tageOhneEssen = 0;
        const seiten = KAMPF_NACHT_WUERFEL[essen] || 0;
        if (seiten) { const w = skW(seiten); gesamt += w; teile.push(`+1W${seiten} Essen (${w})`); }
    }

    if (schlafQualitaet === 'keine') {
        t.tageOhneSchlaf = (t.tageOhneSchlaf || 0) + 1;
        if (t.tageOhneSchlaf >= 2) { const m = skW(10); gesamt -= m; teile.push(`-1W10 Schlafmangel (${m})`); }
    } else {
        t.tageOhneSchlaf = 0;
        const seiten = KAMPF_NACHT_WUERFEL[schlafQualitaet] || 0;
        if (seiten) { const w = skW(seiten); gesamt += w; teile.push(`+1W${seiten} Schlaf (${w})`); }
    }

    if (gesamt > 0) kampfHeilungAnwenden(id, gesamt, `Nächtliche Regeneration: ${teile.join(', ')}`);
    else if (gesamt < 0) kampfSchadenAnwenden(id, -gesamt, { grund: `Nächtliche Regeneration: ${teile.join(', ')}` });
    else kampfLog(`${t.name}: Nächtliche Regeneration ${teile.join(', ')} = 0.`);
}

function kampfNachtRegenerationAlle() {
    const essenEl = document.getElementById('kf-regen-essen');
    const schlafEl = document.getElementById('kf-regen-schlaf');
    const essen = essenEl ? essenEl.value : 'wenig';
    const schlaf = schlafEl ? schlafEl.value : 'wenig';
    kampf.teilnehmer.forEach(t => kampfNachtRegeneration(t.id, essen, schlaf));
    kampfLog(`Nächtliche Regeneration für alle ausgewertet (Essen: ${essen}, Schlaf: ${schlaf}).`);
    renderKampfGm();
}

// --- Zurücksetzen ----------------------------------------------------------------

function kampfZuruecksetzen() {
    if (!confirm('Kampf wirklich zurücksetzen? Runde und alle Zustände (Blutung/Feuermarker/Gift/Schlaf/Stun/Initiative) werden gelöscht. Teilnehmer, HP und Amputationen bleiben erhalten.')) return;
    kampf.runde = 0;
    kampf.teilnehmer.forEach(t => {
        t.init = null; t.blutung = 0; t.feuermarker = 0; t.gift = 0; t.giftMisserfolge = 0;
        t.schlaf = null; t.stun = false; t.rettungswuerfe = 0;
    });
    kampfLog(`Kampf zurückgesetzt.`);
    renderKampfGm();
}

function kampfAlleEntfernen() {
    if (!confirm('Wirklich ALLE Teilnehmer aus dem Kampf entfernen?')) return;
    kampf.teilnehmer = [];
    kampfLog(`Alle Teilnehmer entfernt.`);
    renderKampfGm();
}

// --- Live-Sync an die Spieler ------------------------------------------------

let kampfVerteilenTimer = null;
function kampfVerteilen() {
    clearTimeout(kampfVerteilenTimer);
    kampfVerteilenTimer = setTimeout(kampfJetztVerteilen, 300);
}

// Spieler-HP wird bewusst NICHT mitgeschickt - die liegt schon auf dem
// eigenen Bogen jedes Spielers, siehe Datei-Kopfkommentar.
function kampfZustandFuerSpieler() {
    return {
        type: 'kampf', runde: kampf.runde,
        teilnehmer: kampf.teilnehmer.map(t => ({
            id: t.id, art: t.art, name: t.name, seite: t.seite, farbe: t.farbe, init: t.init,
            hp: t.art === 'nsc' ? t.hp : undefined,
            blutung: t.blutung, feuermarker: t.feuermarker, gift: t.gift,
            schlaf: t.schlaf, stun: t.stun, tot: t.tot, permanenteEffekte: t.permanenteEffekte
        }))
    };
}

function kampfJetztVerteilen() {
    if (typeof clientConnections === 'undefined') return;
    const nachricht = kampfZustandFuerSpieler();
    Object.values(clientConnections).forEach(conn => { if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } } });
}

function kampfAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    try { conn.send(kampfZustandFuerSpieler()); } catch (e) { /* weg */ }
}

// --- GM-Ansicht ----------------------------------------------------------------

function kampfTeilnehmerKarteHtml(t) {
    const seiteInfo = KAMPF_SEITEN[t.seite] || KAMPF_SEITEN.gegner;
    const kampfunfaehig = t.art === 'nsc' && t.hp.aktuell <= 10 && t.hp.aktuell > 0;
    const brauchtRettung = t.art === 'nsc' && t.hp.aktuell <= 0 && !t.tot;
    const effekteHtml = t.permanenteEffekte.length ? `<div class="sk-effekte">${t.permanenteEffekte.map(e =>
        `<span class="sk-badge" title="${escapeHtml(e.folge)}"><i class="fa-solid fa-user-injured"></i> ${escapeHtml(e.teil)}</span>`
    ).join('')}</div>` : '';

    return `<div class="sk-einheit ${t.tot ? 'sk-einheit-gesunken' : ''}" style="--sk-farbe:${escapeHtml(t.farbe)}">
        <div class="sk-einheit-kopf">
            <span class="sk-farbpunkt"></span>
            <span class="sk-name" style="flex:1; padding:0.3rem 0.5rem;">${escapeHtml(t.name)}${t.art === 'spieler' ? ' <i class="fa-solid fa-user" title="Spieler-Charakter"></i>' : ''}</span>
            <select class="sk-input sk-seite" onchange="kampfSeiteAendern('${t.id}', this.value)">
                ${Object.entries(KAMPF_SEITEN).map(([k, v]) => `<option value="${k}" ${t.seite === k ? 'selected' : ''}>${v.label}</option>`).join('')}
            </select>
            <button class="btn-delete-icon" onclick="kampfTeilnehmerEntfernen('${t.id}')" title="Aus dem Kampf entfernen"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="sk-aktion-zeile">
            <span class="ir-hint" style="margin:0"><i class="fa-solid fa-bolt"></i> Initiative: <b>${t.init == null ? '–' : t.init}</b></span>
            <button class="sk-mini-btn" onclick="kampfInitiativeWuerfeln('${t.id}')"><i class="fa-solid fa-dice"></i> 1W10</button>
            ${t.tot ? `<span class="ir-hint ir-warnung"><i class="fa-solid fa-skull"></i> Tot${t.seeleRundenUebrig != null ? ` - Seele noch ${t.seeleRundenUebrig} Runden rettbar` : ''}</span>` : ''}
        </div>
        ${t.art === 'nsc' ? `
        <div class="sk-struktur-zeile">
            <div class="sk-struktur-bar"><div class="sk-struktur-fill" style="width:${t.hp.max > 0 ? Math.max(0, Math.min(100, (t.hp.aktuell / t.hp.max) * 100)) : 0}%"></div></div>
            <span class="sk-struktur-zahl">${t.hp.aktuell} / <input type="number" class="sk-input sk-struktur-max" value="${t.hp.max}" onchange="kampfHpMaxAendern('${t.id}', this.value)" min="1"></span>
        </div>
        ${kampfunfaehig ? '<p class="ir-hint ir-warnung"><i class="fa-solid fa-triangle-exclamation"></i> Kampfunfähig (≤10 HP)</p>' : ''}
        ${brauchtRettung ? '<p class="ir-hint ir-warnung"><i class="fa-solid fa-heart-crack"></i> 0 HP oder weniger - Rettungswurf fällig!</p>' : ''}
        ` : `<p class="ir-hint" style="margin:0.3rem 0"><i class="fa-solid fa-heart"></i> HP liegt auf dem eigenen Bogen - Schaden/Heilung hier gehen als Nachricht direkt dorthin.</p>`}
        <div class="sk-aktion-zeile">
            <input type="number" class="sk-input sk-input-schmal" placeholder="Schaden" data-kfschaden="${t.id}">
            <input type="number" class="sk-input sk-input-schmal" placeholder="RB" data-kfrb="${t.id}" title="Rüstungsbrechend-Wert der Waffe (optional)">
            <input type="number" class="sk-input sk-input-schmal" placeholder="Rüstung Ziel" data-kfruestung="${t.id}" title="Rüstungswert des Ziels vor RB-Abzug (optional)">
            <button class="sk-mini-btn" onclick="kampfSchadenManuell('${t.id}')"><i class="fa-solid fa-minus"></i> Schaden</button>
            <input type="number" class="sk-input sk-input-schmal" placeholder="Heilung" data-kfheilung="${t.id}">
            <button class="sk-mini-btn" onclick="kampfHeilungManuell('${t.id}')"><i class="fa-solid fa-plus"></i> Heilen</button>
        </div>

        <div class="sk-aktion-zeile">
            <span class="ir-hint" style="margin:0"><i class="fa-solid fa-droplet"></i> Blutung ${t.blutung}/5</span>
            <button class="sk-badge-groesse" onclick="kampfBlutungAendern('${t.id}', -1)">−</button>
            <button class="sk-badge-groesse" onclick="kampfBlutungAendern('${t.id}', 1)">+</button>
            <button class="sk-mini-btn" onclick="kampfVerbandAnlegen('${t.id}')" title="Medizinprobe, 1 Aktion: stillt 3 Blutungen">Verband (-3)</button>
        </div>
        <div class="sk-aktion-zeile">
            <span class="ir-hint" style="margin:0"><i class="fa-solid fa-fire"></i> Feuermarker ${t.feuermarker}/5</span>
            <button class="sk-badge-groesse" onclick="kampfFeuermarkerAendern('${t.id}', -1)">−</button>
            <button class="sk-badge-groesse" onclick="kampfFeuermarkerAendern('${t.id}', 1)">+</button>
            <button class="sk-mini-btn" onclick="kampfFeuerLoeschen('${t.id}', false)">Löschen (-2)</button>
            <button class="sk-mini-btn" onclick="kampfFeuerLoeschen('${t.id}', true)" title="Wasser: löscht alle Feuermarker sofort">Wasser (alle)</button>
        </div>
        <div class="sk-aktion-zeile">
            <span class="ir-hint" style="margin:0"><i class="fa-solid fa-skull-crossbones"></i> Gift-Stufe</span>
            <select class="sk-input sk-input-schmal" onchange="kampfGiftSetzen('${t.id}', parseInt(this.value))">
                ${[0, 1, 2, 3, 4, 5, 6].map(s => `<option value="${s}" ${t.gift === s ? 'selected' : ''}>${s === 0 ? '–' : s}</option>`).join('')}
            </select>
            ${t.gift > 0 ? `
            <button class="sk-mini-btn" onclick="kampfGiftProbe('${t.id}', true)" title="Zähigkeits-/Immunsystem-Probe am Bogen bestanden"><i class="fa-solid fa-check"></i> Probe bestanden</button>
            <button class="sk-mini-btn" onclick="kampfGiftProbe('${t.id}', false)" title="Probe misslungen"><i class="fa-solid fa-xmark"></i> Probe misslungen</button>` : ''}
        </div>
        <div class="sk-aktion-zeile">
            ${t.schlaf ? `
            <span class="ir-hint" style="margin:0"><i class="fa-solid fa-bed"></i> ${t.schlaf.tief ? 'Tiefer Schlaf' : 'Schlaf'}, noch ${t.schlaf.rundenUebrig} Runden</span>
            <button class="sk-mini-btn" onclick="kampfWecken('${t.id}')">Rütteln/Wecken</button>` : `
            <button class="sk-mini-btn" onclick="kampfSchlafSetzen('${t.id}', false)"><i class="fa-solid fa-bed"></i> Schlaf</button>
            <button class="sk-mini-btn" onclick="kampfSchlafSetzen('${t.id}', true)"><i class="fa-solid fa-bed"></i> Tiefer Schlaf</button>`}
            <button class="sk-mini-btn ${t.stun ? 'sk-kapitaen-aktiv' : ''}" onclick="kampfStunSetzen('${t.id}', ${!t.stun})"><i class="fa-solid fa-star"></i> Stun ${t.stun ? 'an' : 'aus'}</button>
        </div>
        <div class="sk-aktion-zeile">
            <button class="sk-mini-btn" onclick="kampfRettungswurfWuerfeln('${t.id}')" title="0-HP-Rettungswurf, 1W100"><i class="fa-solid fa-heart-pulse"></i> Rettungswurf (0 HP)</button>
            <button class="sk-mini-btn" onclick="kampfAmputationWuerfeln('${t.id}')" title="Ohnmacht/Amputation, 1W10 - bei Einzeltreffer ≥70/100 Schaden"><i class="fa-solid fa-user-injured"></i> Amputation würfeln</button>
        </div>
        ${effekteHtml}
    </div>`;
}

function kampfSeiteAendern(id, seite) {
    const t = kampfTeilnehmer(id);
    if (!t || !KAMPF_SEITEN[seite]) return;
    t.seite = seite; t.farbe = KAMPF_SEITEN[seite].farbe;
    kampfSichern();
    renderKampfGm();
}
function kampfHpMaxAendern(id, val) {
    const t = kampfTeilnehmer(id);
    if (!t || t.art !== 'nsc') return;
    t.hp.max = Math.max(1, parseInt(val) || 1);
    if (t.hp.aktuell > t.hp.max) t.hp.aktuell = t.hp.max;
    kampfSichern();
    renderKampfGm();
}

function kampfWaffenReferenzHtml() {
    return `<details class="sk-manoever-referenz">
        <summary>Waffenschaden-Referenz (S.28f) - nur Nachschlagen, die Angriffsprobe läuft am Bogen</summary>
        <p class="ir-hint" style="margin-top:0"><b>Nahkampf</b></p>
        <div class="sk-manoever-liste">
        ${KAMPF_WAFFEN_NAHKAMPF.map(w => `<div class="sk-manoever-karte">
            <div class="sk-manoever-kopf"><b>${escapeHtml(w.name)}</b> <span class="ir-zone-malus">${escapeHtml(w.schaden)}</span></div>
            ${w.info ? `<p class="ir-hint">${escapeHtml(w.info)}</p>` : ''}
        </div>`).join('')}
        </div>
        <p class="ir-hint"><b>Fernkampf</b></p>
        <div class="sk-manoever-liste">
        ${KAMPF_WAFFEN_FERNKAMPF.map(w => `<div class="sk-manoever-karte">
            <div class="sk-manoever-kopf"><b>${escapeHtml(w.name)}</b> <span class="ir-zone-malus">${escapeHtml(w.schaden)}</span></div>
            <p class="ir-hint">Reichweite ${escapeHtml(w.reichweite)} · ${escapeHtml(w.ladedauer)}</p>
        </div>`).join('')}
        </div>
    </details>`;
}

function renderKampfGm() {
    const box = document.getElementById('gm-kampf');
    if (!box) return;
    if (typeof eldaraAktiv !== 'function' || !eldaraAktiv()) {
        box.style.display = 'none';
        return;
    }
    box.style.display = '';

    const verbundenePeers = typeof connectedPlayersData !== 'undefined' ? Object.keys(connectedPlayersData) : [];
    const sortiert = kampfInitiativeSortierung();

    box.innerHTML = `
        <details class="x-details" ${kampfOffenGm ? 'open' : ''}>
            <summary>
                <h3 style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-hand-fist"></i> Kampf
                    ${kampf.teilnehmer.length ? `<span class="x-count">${kampf.teilnehmer.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('kampf')" title="Hilfe zum Kampf-Tracker"></i></h3>
            </summary>
            <div class="sk-details">
                <div class="sk-aktion-zeile">
                    <span class="ir-hint" style="margin:0"><i class="fa-solid fa-flag-checkered"></i> Runde <b>${kampf.runde}</b></span>
                    <button class="tool-btn" onclick="kampfRundeWeiter()"><i class="fa-solid fa-forward"></i> Runde weiter</button>
                    <button class="sk-mini-btn" onclick="kampfInitiativeAlleWuerfeln()"><i class="fa-solid fa-dice"></i> Initiative für alle würfeln</button>
                    <button class="x-mini x-mini-danger" onclick="kampfZuruecksetzen()" title="Runde, Initiative und Zustände zurücksetzen">Zurücksetzen</button>
                    <button class="x-mini x-mini-danger" onclick="kampfAlleEntfernen()" title="Alle Teilnehmer entfernen">Alle entfernen</button>
                </div>

                <h4>Teilnehmer hinzufügen</h4>
                ${verbundenePeers.length ? `<div class="sk-aktion-zeile">
                    <span class="ir-hint" style="margin:0">Spieler:</span>
                    ${verbundenePeers.map(pid => {
                        const d = connectedPlayersData[pid] || {};
                        const name = [d.vorname, d.name].filter(Boolean).join(' ') || 'Unbekannt';
                        const dabei = !!kampfTeilnehmer('spieler:' + pid);
                        return `<button type="button" class="sk-besitzer-chip ${dabei ? 'sk-besitzer-chip-aktiv' : ''}" ${dabei ? 'disabled' : ''} onclick="kampfSpielerHinzufuegen('${escapeHtml(pid)}')">${dabei ? '<i class="fa-solid fa-check"></i> ' : ''}${escapeHtml(name)}</button>`;
                    }).join('')}
                </div>` : '<p class="ir-hint" style="margin-top:0">Keine Spieler verbunden.</p>'}
                <div class="sk-aktion-zeile">
                    <input type="text" id="kf-neu-name" class="sk-input" placeholder="Name (NSC/Gegner)" onkeydown="if(event.key==='Enter') kampfNscHinzufuegen()">
                    <input type="number" id="kf-neu-hp" class="sk-input sk-input-schmal" placeholder="HP" value="30" min="1">
                    <select id="kf-neu-seite" class="sk-input sk-input-schmal">
                        ${Object.entries(KAMPF_SEITEN).map(([k, v]) => `<option value="${k}" ${k === 'gegner' ? 'selected' : ''}>${v.label}</option>`).join('')}
                    </select>
                    <button class="tool-btn" onclick="kampfNscHinzufuegen()"><i class="fa-solid fa-plus"></i> Hinzufügen</button>
                </div>
                ${typeof nscListe !== 'undefined' && nscListe.length ? `<div class="sk-aktion-zeile">
                    <select id="kf-nscliste-wahl" class="sk-input">
                        <option value="">– Name aus NSC-Liste übernehmen –</option>
                        ${nscListe.map(n => `<option value="${escapeHtml(n.id)}">${escapeHtml(n.name)}</option>`).join('')}
                    </select>
                    <button class="sk-mini-btn" onclick="kampfNscAusListeUebernehmen()">Übernehmen</button>
                </div>` : ''}

                <h4>Teilnehmer (nach Initiative sortiert)</h4>
                <div class="sk-einheiten-liste">
                    ${sortiert.length ? sortiert.map(t => kampfTeilnehmerKarteHtml(t)).join('') : '<p class="ir-hint">Noch niemand im Kampf.</p>'}
                </div>

                <h4>Nächtliche Regeneration (alle Teilnehmer)</h4>
                <div class="sk-aktion-zeile">
                    <label>Essen <select id="kf-regen-essen" class="sk-input sk-input-schmal">
                        <option value="viel">Viel (2 Mahlzeiten)</option>
                        <option value="wenig" selected>Wenig (1 Mahlzeit)</option>
                        <option value="keine">Gar nicht</option>
                    </select></label>
                    <label>Schlaf <select id="kf-regen-schlaf" class="sk-input sk-input-schmal">
                        <option value="viel">Viel (+7 Std.)</option>
                        <option value="wenig" selected>Wenig (6-3 Std.)</option>
                        <option value="keine">Gar nicht</option>
                    </select></label>
                    <button class="sk-mini-btn" onclick="kampfNachtRegenerationAlle()"><i class="fa-solid fa-moon"></i> Nacht auswerten</button>
                </div>

                ${kampfWaffenReferenzHtml()}

                <h4>Log</h4>
                <div class="sk-log">${kampf.log.length ? kampf.log.map(l => `<div class="sk-log-zeile">${escapeHtml(l)}</div>`).join('') : '<p class="ir-hint">Noch nichts passiert.</p>'}</div>
            </div>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => {
        kampfOffenGm = details.open;
        try { localStorage.setItem(KAMPF_OFFEN_KEY, kampfOffenGm ? '1' : '0'); } catch (e) { /* egal */ }
    });
}

// --- Spieler-Ansicht -------------------------------------------------------------

let kampfSpieler = { runde: 0, teilnehmer: [] };

function kampfEmpfangen(payload) {
    kampfSpieler.runde = payload.runde || 0;
    kampfSpieler.teilnehmer = Array.isArray(payload.teilnehmer) ? payload.teilnehmer : [];
    renderKampfSpieler();
}

function kampfSpielerBeitritt() { /* nichts extra zu tun - Zustand kommt mit der nächsten 'kampf'-Nachricht */ }
function kampfSpielerGetrennt() {
    kampfSpieler = { runde: 0, teilnehmer: [] };
    renderKampfSpieler();
}

function kampfNachrichtVerarbeiten(payload) {
    if (payload && payload.type === 'kampf') { kampfEmpfangen(payload); return true; }
    return false;
}

function kampfTeilnehmerSpielerHtml(t) {
    const seiteInfo = KAMPF_SEITEN[t.seite] || KAMPF_SEITEN.gegner;
    const badges = [];
    if (t.blutung) badges.push(`<span class="sk-badge">🩸 Blutung ${t.blutung}</span>`);
    if (t.feuermarker) badges.push(`<span class="sk-badge">🔥 Feuer ${t.feuermarker}</span>`);
    if (t.gift) badges.push(`<span class="sk-badge">☠️ Gift ${t.gift}</span>`);
    if (t.schlaf) badges.push(`<span class="sk-badge">😴 Schlaf (${t.schlaf.rundenUebrig})</span>`);
    if (t.stun) badges.push(`<span class="sk-badge">⭐ Gestunnt</span>`);
    (t.permanenteEffekte || []).forEach(e => badges.push(`<span class="sk-badge" title="${escapeHtml(e.folge)}">🩹 ${escapeHtml(e.teil)}</span>`));
    return `<div class="sk-einheit ${t.tot ? 'sk-einheit-gesunken' : ''}" style="--sk-farbe:${escapeHtml(t.farbe)}">
        <div class="sk-einheit-kopf">
            <span class="sk-farbpunkt"></span>
            <span class="sk-name" style="flex:1; padding:0.3rem 0.5rem;">${escapeHtml(t.name)}</span>
            <span class="ir-hint" style="margin:0"><i class="fa-solid fa-bolt"></i> ${t.init == null ? '–' : t.init}</span>
        </div>
        ${t.art === 'nsc' && t.hp ? `<div class="sk-struktur-zeile">
            <div class="sk-struktur-bar"><div class="sk-struktur-fill" style="width:${t.hp.max > 0 ? Math.max(0, Math.min(100, (t.hp.aktuell / t.hp.max) * 100)) : 0}%"></div></div>
            <span class="sk-struktur-zahl">${t.hp.aktuell} / ${t.hp.max}</span>
        </div>` : ''}
        ${t.tot ? '<p class="ir-hint ir-warnung"><i class="fa-solid fa-skull"></i> Kampfunfähig/Tot</p>' : ''}
        ${badges.length ? `<div class="sk-effekte">${badges.join('')}</div>` : ''}
    </div>`;
}

function renderKampfSpieler() {
    const section = document.getElementById('kampf-section');
    if (!section) return;
    const verbunden = typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
    if (!verbunden || (typeof isGmMode !== 'undefined' && isGmMode) || !kampfSpieler.teilnehmer.length) {
        section.style.display = 'none';
        section.innerHTML = '';
        return;
    }
    section.style.display = '';
    const sortiert = kampfSpieler.teilnehmer.slice().sort((a, b) => (b.init == null ? -1 : b.init) - (a.init == null ? -1 : a.init));
    section.innerHTML = `
        <details class="x-details gm-seekampf" open>
            <summary><h3 style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-hand-fist"></i> Kampf - Runde ${kampfSpieler.runde}
                <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('kampf')" title="Hilfe zum Kampf"></i></h3></summary>
            <div class="sk-details">${sortiert.map(t => kampfTeilnehmerSpielerHtml(t)).join('')}</div>
        </details>`;
}

document.addEventListener('DOMContentLoaded', () => {
    kampfLaden();
    renderKampfGm();
});
