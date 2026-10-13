// How to be a Hero - Karte (Kartenbibliothek des Spielleiters)
//
// Der Spielleiter legt beliebig viele Karten an (Stadtplan, Dungeon, Schauplatz,
// ...), wechselt zwischen ihnen und stellt darauf Spieler- und NSC-Figuren,
// Markierungen, Zeichnungen und Pins (optional mit Handout) auf. Nebel des
// Krieges ist eingebaut. Die Zeichen-, Raster- und Nebel-Mechanik steckt in
// battlemap.js (bewusst regelsystem-unabhängig, 1:1 aus dem Schwesterprojekt
// Eldara übernommen) - diese Datei ist nur der HeroHQ-Teil darum herum.
//
// FREIGABE: Die Karte ist standardmäßig nur beim SL sichtbar (Vorbereitung).
// Erst der Schalter "Karte für Spieler freigeben" schickt sie an die
// Spieler - vorher geht nichts über die Leitung, die Spieler haben also auch
// keinen Karten-Abschnitt und im Browser nichts zum Nachschauen. Ausschalten
// holt die Karte wieder bei allen weg. Der Schalter wird bewusst NICHT
// gespeichert: eine neue Sitzung startet immer verdeckt, damit eine Karte vom
// letzten Abend nicht ungewollt auftaucht, sobald die Spieler beitreten.
//
// Der SL-Client ist die Autorität (wie bei Tischmitte, Quests usw.): Nach jeder
// Änderung geht der Stand an alle Spieler. Spieler bewegen nur ihre eigene
// Figur - entweder frei oder als Vorschlag, den der SL bestätigt (Einstellung
// "Spieler-Bewegung").
//
// Nachrichten (multiplayer.js):
//   SL -> Spieler   { type: 'karte', karteId, name, zuegeFrei, zustand: {...battlemap-Zustand, bild} }
//                   { type: 'karteAus' }     Karte nicht (mehr) freigegeben
//   Spieler -> SL   { type: 'karteZugVorschlag', karteId, figurId, x, y, frei? }
//                       frei: die Figur steht lokal schon dort - der SL übernimmt die
//                       Position sofort, wenn die Bewegung gerade frei ist, sonst gilt es als Vorschlag
//                   { type: 'karteRefreshAnfrage' }   aktuellen Stand noch einmal schicken
//
// Figur-IDs: 'spieler:'+peerId (eine pro verbundenem Spieler, automatisch),
// 'nsc:'+nscId (aus der NSC-Liste), 'frei:'+uid (freie SL-Markierung).

const KARTEN_KEY = 'htbah_gm_karten';
const KARTEN_OFFEN_KEY = 'htbah_gm_karten_offen';
const KARTE_RASTER_AUS_KEY = 'htbah_karte_raster_aus';

function karteLeererZustand() {
    return { raster: Object.assign({}, KARTE_RASTER_STANDARD), figuren: [], formen: [], pins: [], nebel: { aktiv: false, aufgedeckt: [], entwurf: [] }, bild: null };
}

// Spiegel von battlemap.js' eigenen STANDARD-Rasterwerten - wird hier
// zusätzlich gebraucht, weil battlemap.js immer nur EINE Zustands-Instanz pro
// Sitzung lebendig hält: applyState() MERGT ein übergebenes raster-Objekt nur
// rein (Object.assign), statt es zu ersetzen. Bekäme eine Karte ohne eigene
// (oder mit unvollständiger) Feldgröße den Zustand einer anderen Karte, würden
// Lücken vom vorher aktiven Kartenwechsel "durchbluten". karteZustandFuerAnwenden()
// füllt deshalb vor jedem applyState() explizit auf.
const KARTE_RASTER_STANDARD = {
    rasterGroesse: 50, rasterVersatzX: 0, rasterVersatzY: 0,
    rasterSichtbar: true, rasterFarbe: 'rgba(212,162,76,0.30)', einrasten: true, ringeAnzeigen: true, statusAnzeigen: true, lpAnzeigen: true,
    einheit: 1, einheitName: 'm', diagonale: 'gleich'
};

// Messform (Linie/Kreis/Kegel/Strahl): rein lokale Ansichtswahl, gilt für GM-, Vollbild- und Spieler-Leiste
let karteMessform = 'linie';
function karteMessformSelectHtml() {
    return `<select data-ktmessform class="sk-input sk-mal-art" onchange="karteMessformSetzen(this.value)" title="Messform: Linie = Strecke; Kreis, Kegel (60°) und Strahl (1 Feld breit) zeigen eine Fläche ab dem Startpunkt">
        ${[['linie', 'Linie'], ['kreis', 'Kreis'], ['kegel', 'Kegel'], ['strahl', 'Strahl']].map(([k, l]) => `<option value="${k}" ${karteMessform === k ? 'selected' : ''}>${l}</option>`).join('')}
    </select>`;
}
function karteMessformSetzen(wert) {
    karteMessform = wert;
    if (karteMap) karteMap.setMessForm(wert);
    if (karteSpielerMap) karteSpielerMap.setMessForm(wert);
    document.querySelectorAll('[data-ktmessform]').forEach(s => { s.value = wert; });
}
function karteZustandFuerAnwenden(zustand) {
    return Object.assign({}, zustand, { raster: Object.assign({}, KARTE_RASTER_STANDARD, (zustand && zustand.raster) || {}) });
}

// Rein lokale Spieler-Präferenz (Default aus - Raster wie vom SL eingestellt):
// blendet das Raster nur im EIGENEN Browser aus, ohne die geteilte Karte für
// SL/andere Spieler anzufassen. Nur ein Override kurz vor dem lokalen applyState().
function karteRasterAusgeblendet() {
    try { return localStorage.getItem(KARTE_RASTER_AUS_KEY) === '1'; } catch (e) { return false; }
}
function karteSpielerZustandFuerAnwenden(zustand) {
    const z = karteZustandFuerAnwenden(zustand);
    if (karteRasterAusgeblendet()) z.raster = Object.assign({}, z.raster, { rasterSichtbar: false });
    return z;
}
function karteRasterAusblendenUmschalten() {
    sicherSpeichern(KARTE_RASTER_AUS_KEY, karteRasterAusgeblendet() ? '0' : '1');
    if (karteSpielerMap && karteSpielerLetzte && karteSpielerLetzte.zustand) {
        karteSpielerMap.applyState(karteSpielerZustandFuerAnwenden(karteSpielerLetzte.zustand), karteSpielerLetzte.zustand.bild);
    }
    document.querySelectorAll('[data-ktraster-toggle]').forEach(btn => btn.classList.toggle('tool-btn-aktiv', karteRasterAusgeblendet()));
}

// --- Spielleiter --------------------------------------------------------------

let karten = [];              // [{ id, name, zustand }]
let karteAktivId = null;
let karteMap = null;          // aktuell eingehängte BattleMap-Instanz
let karteOffenGm = true;
// Sieht die Gruppe die Karte? Nur im Speicher, startet immer verdeckt (siehe Kopfkommentar).
let karteFreigabe = false;
// Wie sich die Spieler auf der Karte bewegen: 'frei' (Standard) = jeder zieht seine eigene Figur selbst,
// 'bestaetigung' = Züge sind nur Vorschläge, die der SL bestätigt.
let karteZuegeModus = 'frei';

function karteZuegeFrei() {
    return karteZuegeModus !== 'bestaetigung';
}

function karteNeueId() {
    return 'kt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function karteLaden() {
    try {
        const roh = localStorage.getItem(KARTEN_KEY);
        const stand = roh ? JSON.parse(roh) : null;
        karten = stand && Array.isArray(stand.karten) ? stand.karten.filter(k => k && typeof k.id === 'string' && k.zustand) : [];
        karteAktivId = stand ? stand.aktivId : null;
    } catch (e) { karten = []; karteAktivId = null; }
    try { karteOffenGm = localStorage.getItem(KARTEN_OFFEN_KEY) !== '0'; } catch (e) { karteOffenGm = true; }
}

// Die Karten samt Hintergrundbild sind groß und ändern sich bei jedem Ziehen
// einer Figur - deshalb gebündelt statt bei jedem Mausereignis neu zu schreiben.
let karteSichernTimer = null;
function karteSichern() {
    clearTimeout(karteSichernTimer);
    karteSichernTimer = setTimeout(karteSofortSichern, 400);
}
function karteSofortSichern() {
    clearTimeout(karteSichernTimer);
    karteSichernTimer = null;
    sicherSpeichern(KARTEN_KEY, JSON.stringify({ karten, aktivId: karteAktivId }));
}
window.addEventListener('pagehide', () => { if (karteSichernTimer) karteSofortSichern(); });

// Schreibt den lebenden Kartenzustand zurück in karten[], bevor gewechselt
// oder gespeichert wird - battlemap.js hält immer nur EINE Instanz lebendig.
function karteAktuelleZurueckschreiben() {
    if (!karteMap || !karteAktivId) return;
    const eintrag = karten.find(k => k.id === karteAktivId);
    if (!eintrag) return;
    eintrag.zustand = Object.assign(karteMap.getState(), { bild: karteMap.bild });
}

function karteFreieSpawnPosition() {
    if (!karteMap) return { x: 1, y: 1 };
    const mitte = karteMap.sichtbaresZentrum();
    const n = karteMap.figuren.length;
    if (n === 0) return mitte;
    const winkel = n * 2.4;
    const radius = 1.5 * Math.sqrt(n);
    return { x: Math.round((mitte.x + Math.cos(winkel) * radius) * 2) / 2, y: Math.round((mitte.y + Math.sin(winkel) * radius) * 2) / 2 };
}

// Portraits liegen bewusst nicht im synchronisierten Zustand (battlemap.js) -
// nach jedem Kartenwechsel/Laden neu zuweisen.
function karteFigurenPortraitsWiederherstellen() {
    if (!karteMap || typeof connectedPlayersData === 'undefined') return;
    karteMap.figuren.forEach(f => {
        if (!f.id.startsWith('spieler:')) return;
        const d = connectedPlayersData[f.id.slice('spieler:'.length)];
        const bild = d ? safeImageSrc(d.portrait) : null;
        if (bild && bild !== 'assets/giphy.gif') karteMap.setFigurBild(f.id, bild);
    });
}

// Für jeden verbundenen Spieler eine eigene Figur, sofern noch keine da ist -
// und bei bereits vorhandener Figur Name/Farbe live nachziehen (z.B. wenn ein
// Spieler seinen Charakternamen ändert). Position/Größe bleiben dabei unangetastet.
function karteSpielerFigurenAbgleichen() {
    if (!karteMap || typeof connectedPlayersData === 'undefined') return;
    Object.keys(connectedPlayersData).forEach(peerId => {
        const id = 'spieler:' + peerId;
        const d = connectedPlayersData[peerId] || {};
        const name = [d.vorname, d.name].filter(Boolean).join(' ') || 'Spieler';
        const farbe = getColorForPlayer(name);
        const bestehend = karteMap.figuren.find(f => f.id === id);
        if (bestehend) {
            if (bestehend.name !== name || bestehend.farbe !== farbe) karteMap.addFigur({ id, name, farbe });
            return;
        }
        const pos = karteFreieSpawnPosition();
        karteMap.addFigur({ id, name, x: pos.x, y: pos.y, groesse: 1, besitzer: peerId, farbe });
    });
    karteFigurenPortraitsWiederherstellen();
}

// Spieler weg: seine Karten-Figur bleibt sonst als Leiche stehen.
function karteSpielerEntfernen(peerId) {
    if (!karteMap) return;
    karteMap.removeFigur('spieler:' + peerId);
    karteVerteilen();
    renderKarteGm();
}

function karteEinhaengen(canvas) {
    if (!canvas || karteMap) return;
    karteLaden();
    if (!karten.length) {
        const id = karteNeueId();
        karten.push({ id, name: 'Karte 1', zustand: karteLeererZustand() });
        karteAktivId = id;
    }
    if (!karteAktivId || !karten.find(k => k.id === karteAktivId)) karteAktivId = karten[0].id;

    karteMap = BattleMap.create(canvas, {
        einheit: 1, einheitName: 'm',
        onAuswahl: () => karteAuswahlLeisteAktualisieren(),
        onPinKlick: (pin, x, y) => kartePinPopover(pin, x, y, 'gm'),
        onPinNeu: (pin) => { kartePinPopover(pin, null, null, 'gm'); renderKarteGm(); },
        onChange: () => { karteAktuelleZurueckschreiben(); karteSichern(); karteVerteilen(); }
    });
    const eintrag = karten.find(k => k.id === karteAktivId);
    karteMap.applyState(karteZustandFuerAnwenden(eintrag.zustand), eintrag.zustand.bild);
    karteSpielerFigurenAbgleichen();
}

function karteNeuDialog() {
    const name = prompt('Name der neuen Karte (z.B. "Hafenviertel", "Verlies"):', '');
    if (name === null) return;
    karteNeu(name.trim() || 'Neue Karte');
}

function karteNeu(name) {
    karteAktuelleZurueckschreiben();
    const id = karteNeueId();
    karten.push({ id, name: name || 'Neue Karte', zustand: karteLeererZustand() });
    karteAktivId = id;
    if (karteMap) {
        karteMap.applyState(karteLeererZustand(), null);
        karteSpielerFigurenAbgleichen();
    }
    karteSichern();
    karteVerteilen();
    renderKarteGm();
}

function karteWechseln(id) {
    if (!id || id === karteAktivId) return;
    karteAktuelleZurueckschreiben();
    const eintrag = karten.find(k => k.id === id);
    if (!eintrag || !karteMap) return;
    karteAktivId = id;
    karteMap.auswahlLeeren();
    karteMap.applyState(karteZustandFuerAnwenden(eintrag.zustand), eintrag.zustand.bild);
    karteSpielerFigurenAbgleichen();
    karteSichern();
    karteVerteilen();
    renderKarteGm();
}

function karteUmbenennenDialog() {
    const eintrag = karten.find(k => k.id === karteAktivId);
    if (!eintrag) return;
    const name = prompt('Neuer Name:', eintrag.name);
    if (!name) return;
    eintrag.name = name.trim() || eintrag.name;
    karteSichern();
    karteVerteilen();
    renderKarteGm();
}

function karteLoeschenBestaetigt() {
    if (karten.length <= 1) { alert('Die letzte Karte kann nicht gelöscht werden.'); return; }
    const eintrag = karten.find(k => k.id === karteAktivId);
    if (!eintrag || !confirm(`Karte "${eintrag.name}" wirklich löschen?`)) return;
    karten = karten.filter(k => k.id !== karteAktivId);
    karteAktivId = null;
    karteWechseln(karten[0].id);
}

function karteBildHochladen(ereignis) {
    const datei = ereignis.target.files && ereignis.target.files[0];
    ereignis.target.value = '';
    if (!datei || !karteMap) return;
    BattleMap.bildVerkleinern(datei).then(res => {
        karteMap.setBild(res.dataUrl);
        karteMap.einpassen();
        karteAktuelleZurueckschreiben();
        karteSichern();
        karteVerteilen();
    }).catch(() => alert('Dieses Bild konnte nicht geladen werden.'));
}

function karteBildEntfernen() {
    if (!karteMap) return;
    karteMap.setBild(null);
    karteAktuelleZurueckschreiben();
    karteSichern();
    karteVerteilen();
}

function karteMarkierungHinzufuegen() {
    const nameEl = document.getElementById('kt-marker-name');
    const name = (nameEl ? nameEl.value : '').trim() || 'Markierung';
    if (!karteMap) return;
    const pos = karteFreieSpawnPosition();
    // besitzer 'sl' (wörtlich, siehe battlemap.js fuerSpieler()) macht die
    // Markierung im Nebel des Krieges versteckbar.
    karteMap.addFigur({ id: 'frei:' + karteNeueId(), name, x: pos.x, y: pos.y, groesse: 1, besitzer: 'sl', farbe: '#8b5cf6' });
    if (nameEl) nameEl.value = '';
    renderKarteGm();
}

// Aus nscliste.js aufgerufen ("Auf Karte setzen"). Erneutes Platzieren legt nichts doppelt an.
function karteNscPlatzieren(nsc) {
    if (!karteMap || !nsc || !nsc.id) return;
    const id = 'nsc:' + nsc.id;
    if (karteMap.figuren.find(f => f.id === id)) { renderKarteGm(); return; }
    const pos = karteFreieSpawnPosition();
    karteMap.addFigur({ id, name: nsc.name || 'NSC', x: pos.x, y: pos.y, groesse: 1, besitzer: 'sl', farbe: '#a3342b' });
    renderKarteGm();
}

function karteFigurEntfernen(id) {
    if (!karteMap) return;
    karteMap.removeFigur(id);
    renderKarteGm();
}

function karteFigurVerdecktUmschalten(id) {
    if (!karteMap) return;
    const f = karteMap.figuren.find(x => x.id === id);
    if (!f) return;
    karteMap.setVerdeckt(id, !f.verdeckt);
    renderKarteGm();
}

function karteNebelUmschalten(an) {
    if (!karteMap) return;
    karteMap.nebelAktiv(!!an);
    karteVerteilen();
}

function karteNebelFreigeben() {
    if (!karteMap) return;
    karteMap.nebelFreigeben();
    renderKarteGm();
}

function karteNebelEntwurfVerwerfen() {
    if (!karteMap) return;
    karteMap.nebelEntwurfVerwerfen();
    renderKarteGm();
}

function karteZugModusSetzen(modus) {
    karteZuegeModus = modus === 'bestaetigung' ? 'bestaetigung' : 'frei';
    karteVerteilen();
    renderKarteGm();
}

function karteZugBestaetigen(id) {
    if (!karteMap) return;
    karteMap.zugBestaetigen(id);
    renderKarteGm();
}

function karteZugVerwerfen(id) {
    if (!karteMap) return;
    karteMap.zugVerwerfen(id);
    renderKarteGm();
}

// --- Freigabe & Live-Sync an die Spieler ---------------------------------------

function karteAnAlleSpieler(nachricht) {
    if (typeof clientConnections === 'undefined') return;
    Object.values(clientConnections).forEach(conn => {
        if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
    });
}

// Der Schalter "Karte für Spieler freigeben". An: aktuellen Stand an alle; aus: Karte bei allen wegnehmen.
function karteFreigabeSetzen(an) {
    karteFreigabe = !!an;
    if (karteFreigabe) {
        karteJetztVerteilen();
        if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', 'gibt die Karte für die Gruppe frei.', '🗺️');
    } else {
        clearTimeout(karteVerteilenTimer);
        karteAnAlleSpieler({ type: 'karteAus' });
        if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', 'blendet die Karte für die Gruppe wieder aus.', '🗺️');
    }
    renderKarteGm();
}

let karteVerteilenTimer = null;

// Beim Start einer SL-Sitzung (multiplayer.js: enterGmMode): immer verdeckt beginnen und das Panel aufbauen,
// jetzt wo das Dashboard sichtbar ist (eine Leinwand in einem versteckten Container hätte keine Größe).
function karteSitzungStart() {
    karteFreigabe = false;
    clearTimeout(karteVerteilenTimer);
    renderKarteGm();
}

function karteVerteilen() {
    if (!karteFreigabe) return;
    clearTimeout(karteVerteilenTimer);
    karteVerteilenTimer = setTimeout(karteJetztVerteilen, 300);
}

function karteZustandFuerSpieler() {
    if (!karteFreigabe || !karteMap || !karteAktivId) return null;
    const eintrag = karten.find(k => k.id === karteAktivId);
    const zustand = karteMap.getStateFuerSpieler();
    zustand.bild = karteMap.bild;
    return { type: 'karte', karteId: karteAktivId, name: eintrag ? eintrag.name : '', zuegeFrei: karteZuegeFrei(), zustand };
}

function karteJetztVerteilen() {
    const nachricht = karteZustandFuerSpieler();
    if (nachricht) karteAnAlleSpieler(nachricht);
}

function karteAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    const nachricht = karteZustandFuerSpieler();
    if (nachricht) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
}

// Zugvorschlag eines Spielers für seine eigene Figur - true = verarbeitet
// (auch wenn abgelehnt, damit multiplayer.js nicht weitersucht).
function karteAnfrageVerarbeiten(peerId, payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type !== 'karteRefreshAnfrage' && payload.type !== 'karteZugVorschlag') return false;
    // Nicht freigegeben: Anfragen ignorieren (ein Spieler soll hier gar nichts auslösen können)
    if (!karteFreigabe) return true;
    // Knopf "Aktualisieren": denselben Stand schicken, den ein frisch beitretender Spieler bekäme
    if (payload.type === 'karteRefreshAnfrage') {
        const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;
        if (conn) karteAnVerbindung(conn);
        return true;
    }
    if (!karteMap || payload.karteId !== karteAktivId) return true;
    const eigeneId = 'spieler:' + peerId;
    if (payload.figurId !== eigeneId) return true;
    const x = Number(payload.x), y = Number(payload.y);
    if (!isFinite(x) || !isFinite(y)) return true;
    // Ist die Bewegung gerade frei, steht die Figur sofort dort; sonst ist es ein Vorschlag zum Bestätigen
    if (karteZuegeFrei()) karteMap.addFigur({ id: eigeneId, x, y, geplantX: null, geplantY: null });
    else karteMap.addFigur({ id: eigeneId, geplantX: x, geplantY: y });
    renderKarteGm();
    return true;
}

// Spieler-Knopf "Aktualisieren" - fragt beim SL denselben Stand an, den ein
// frisch beitretender Spieler bekäme, ohne die ganze Seite neu zu laden.
function karteAktualisierenAnfordern(knopf) {
    if (typeof hostConnection === 'undefined' || !hostConnection || !hostConnection.open) return;
    try { hostConnection.send({ type: 'karteRefreshAnfrage' }); } catch (e) { /* weg */ }
    if (knopf) {
        const icon = knopf.querySelector('i');
        if (icon) {
            icon.classList.add('fa-spin');
            setTimeout(() => icon.classList.remove('fa-spin'), 800);
        }
    }
}

// --- GM-Oberfläche --------------------------------------------------------------

function karteFigurKopfHtml(f) {
    return `
        <div class="sk-marker-zeile" style="justify-content:space-between; flex-wrap:nowrap; margin:0;">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"><span class="sk-farbpunkt" style="background:${escapeHtml(f.farbe || '#9ca3af')}"></span> ${escapeHtml(f.name)}</span>
            <span style="display:flex; gap:0.3rem; flex-shrink:0;">
                <button class="sk-badge-groesse" onclick="karteMap.setFigurGroesse('${escapeHtml(f.id)}', ${(f.groesse || 1) - 0.5}); renderKarteGm();" title="Kleiner">−</button>
                <button class="sk-badge-groesse" onclick="karteMap.setFigurGroesse('${escapeHtml(f.id)}', ${(f.groesse || 1) + 0.5}); renderKarteGm();" title="Größer">+</button>
                <button class="x-mini" onclick="karteFigurVerdecktUmschalten('${escapeHtml(f.id)}')" title="${f.verdeckt ? 'Aufdecken' : 'Verstecken (Hinterhalt)'}"><i class="fa-solid ${f.verdeckt ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
                <button class="sk-badge-x" onclick="karteFigurEntfernen('${escapeHtml(f.id)}')" title="Entfernen">×</button>
            </span>
        </div>`;
}

// Mehrfachauswahl: lebt in battlemap.js (nur SL, lokal). Hier nur die Leiste mit Sammelaktionen.
function karteAuswahlLeisteInnenHtml() {
    if (!karteMap) return '';
    const n = karteMap.getAuswahl().length;
    return `<span class="ir-hint" style="margin:0" title="Strg+Klick auf Figuren, Strg+Rahmen ziehen oder das Werkzeug Auswahl; eine gewählte Figur ziehen bewegt alle"><i class="fa-solid fa-object-group"></i> Auswahl: <b>${n}</b></span>
        <button class="sk-mini-btn" onclick="karteMap.setAuswahl(karteMap.figuren.map(f => f.id))">Alle</button>
        ${n ? `<button class="sk-mini-btn" onclick="karteAuswahlVerdecken(true)" title="Alle gewählten Figuren vor den Spielern verstecken"><i class="fa-solid fa-eye-slash"></i> Verstecken</button>
        <button class="sk-mini-btn" onclick="karteAuswahlVerdecken(false)" title="Alle gewählten Figuren aufdecken"><i class="fa-solid fa-eye"></i> Aufdecken</button>
        <button class="sk-mini-btn" onclick="karteMap.auswahlLeeren()"><i class="fa-solid fa-xmark"></i> Aufheben</button>` : ''}`;
}

function karteAuswahlLeisteAktualisieren() {
    const el = document.getElementById('kt-auswahl-leiste');
    if (el && karteMap) el.innerHTML = karteAuswahlLeisteInnenHtml();
    const gewaehlt = karteMap ? karteMap.getAuswahl() : [];
    document.querySelectorAll('.kt-figur[data-figur-id]').forEach(e => e.classList.toggle('kt-figur-gewaehlt', gewaehlt.includes(e.dataset.figurId)));
}

function karteAuswahlVerdecken(verdeckt) {
    if (!karteMap) return;
    karteMap.getAuswahl().forEach(id => karteMap.setVerdeckt(id, verdeckt));
    renderKarteGm();
}

function renderKtRasterWerkzeuge() {
    const box = document.getElementById('kt-raster-werkzeuge');
    if (!box || !karteMap) return;
    const r = karteMap.raster;
    box.innerHTML = `
        <label class="sk-raster-feld" title="Kantenlänge eines Rasterfelds in Pixeln des Kartenbilds - passend zum Raster auf dem Bild einstellen">Feldgröße <input type="number" id="kt-raster-groesse" class="sk-input sk-input-schmal" value="${r.rasterGroesse}" min="5"></label>
        <label class="sk-raster-feld">Versatz X <input type="number" id="kt-raster-versatzx" class="sk-input sk-input-schmal" value="${r.rasterVersatzX}"></label>
        <label class="sk-raster-feld">Versatz Y <input type="number" id="kt-raster-versatzy" class="sk-input sk-input-schmal" value="${r.rasterVersatzY}"></label>
        <input type="color" id="kt-raster-farbe" class="sk-mal-farbe" value="#d4a24c" title="Rasterfarbe">
        <label class="sk-raster-feld" title="Was ein Feld in der Spielwelt bedeutet - Grundlage für alle Entfernungsangaben beim Messen">1 Feld = <input type="number" id="kt-raster-einheit" class="sk-input sk-input-schmal" value="${r.einheit}" min="0.1" step="any"> <input type="text" id="kt-raster-einheitname" class="sk-input sk-input-schmal" value="${escapeHtml(r.einheitName)}" maxlength="6" style="width:3.2rem"></label>
        <label class="hr-check" style="margin:0"><input type="checkbox" id="kt-raster-sichtbar" ${r.rasterSichtbar ? 'checked' : ''}> <span>Raster sichtbar</span></label>
        <label class="hr-check" style="margin:0"><input type="checkbox" id="kt-raster-einrasten" ${r.einrasten ? 'checked' : ''}> <span>Einrasten</span></label>`;
    const anwenden = () => {
        if (!karteMap) return;
        karteMap.setRaster({
            rasterGroesse: parseFloat(document.getElementById('kt-raster-groesse').value) || 50,
            rasterVersatzX: parseFloat(document.getElementById('kt-raster-versatzx').value) || 0,
            rasterVersatzY: parseFloat(document.getElementById('kt-raster-versatzy').value) || 0,
            rasterSichtbar: document.getElementById('kt-raster-sichtbar').checked,
            einrasten: document.getElementById('kt-raster-einrasten').checked,
            einheit: Math.max(0.1, parseFloat(document.getElementById('kt-raster-einheit').value) || 1),
            einheitName: (document.getElementById('kt-raster-einheitname').value || '').trim().slice(0, 6) || 'm'
        });
    };
    ['kt-raster-groesse', 'kt-raster-versatzx', 'kt-raster-versatzy', 'kt-raster-sichtbar', 'kt-raster-einrasten', 'kt-raster-einheit', 'kt-raster-einheitname'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', anwenden);
    });
    const farbe = document.getElementById('kt-raster-farbe');
    if (farbe) farbe.addEventListener('input', () => karteMap && karteMap.setRaster({ rasterFarbe: farbe.value }));
}

// Statuszeile am Freigabe-Schalter und Abzeichen im Panelkopf
function karteFreigabeAnzeigeAktualisieren() {
    const cb = document.getElementById('kt-freigabe-cb');
    if (cb) cb.checked = karteFreigabe;
    const verbunden = typeof clientConnections !== 'undefined' ? Object.values(clientConnections).filter(c => c && c.open).length : 0;
    const status = document.getElementById('kt-freigabe-status');
    if (status) {
        status.className = 'kt-freigabe-status ' + (karteFreigabe ? 'kt-freigabe-an' : 'kt-freigabe-aus');
        status.innerHTML = karteFreigabe
            ? `<i class="fa-solid fa-eye"></i> Die Gruppe sieht die Karte${verbunden ? ` (${verbunden} verbunden)` : ' - sobald jemand beitritt'}`
            : '<i class="fa-solid fa-eye-slash"></i> Nur du siehst die Karte - Vorbereitung';
    }
    const badge = document.getElementById('kt-kopf-badge');
    if (badge) badge.innerHTML = karteFreigabe ? '<span class="x-count" title="Die Gruppe sieht diese Karte"><i class="fa-solid fa-eye"></i> für Spieler sichtbar</span>' : '';
}

function renderKarteGm() {
    const box = document.getElementById('gm-karte');
    if (!box) return;
    box.style.display = '';

    if (!document.getElementById('kt-canvas')) {
        box.innerHTML = `
            <details class="x-details sk-details" ${karteOffenGm ? 'open' : ''}>
                <summary class="tm-head">
                    <div class="tm-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-map"></i> Karte
                        <span id="kt-kopf-badge"></span>
                        <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('karte')" title="Hilfe zur Karte"></i>
                    </div>
                </summary>
                <div class="sk-kt-gruppen">
                    <div class="sk-kt-gruppe kt-freigabe">
                        <div class="sk-kt-gruppe-titel"><i class="fa-solid fa-users-viewfinder"></i> Sichtbarkeit</div>
                        <div class="sk-kt-gruppe-reihe">
                            <label class="hr-check" style="margin:0" title="Aus: Die Karte ist nur bei dir sichtbar, nichts geht an die Spieler. An: Alle verbundenen Spieler sehen die aktive Karte (inkl. Nebel des Krieges)."><input type="checkbox" id="kt-freigabe-cb"> <span><b>Karte für Spieler freigeben</b></span></label>
                            <span id="kt-freigabe-status" class="kt-freigabe-status kt-freigabe-aus"></span>
                        </div>
                    </div>
                    <div class="sk-kt-gruppe">
                        <div class="sk-kt-gruppe-titel"><i class="fa-solid fa-layer-group"></i> Karten</div>
                        <div class="sk-kt-gruppe-reihe">
                            <select id="kt-auswahl" class="sk-input"></select>
                            <button class="tool-btn" onclick="karteNeuDialog()"><i class="fa-solid fa-plus"></i> Neue Karte</button>
                            <button class="tool-btn" onclick="karteUmbenennenDialog()"><i class="fa-solid fa-pen"></i> Umbenennen</button>
                            <button class="x-mini x-mini-danger" onclick="karteLoeschenBestaetigt()" title="Karte löschen"><i class="fa-solid fa-trash"></i></button>
                            <span class="sk-kt-trenner"></span>
                            <label class="tool-btn" style="margin:0"><i class="fa-solid fa-image"></i> Bild laden<input type="file" accept="image/*" style="display:none" onchange="karteBildHochladen(event)"></label>
                            <button class="tool-btn" onclick="karteBildEntfernen()"><i class="fa-solid fa-image-slash"></i> Bild entfernen</button>
                            <button class="tool-btn" onclick="karteMap && karteMap.einpassen()"><i class="fa-solid fa-expand"></i> Einpassen</button>
                            <button class="tool-btn" onclick="karteVollbildOeffnen('gm')" title="Karte großformatig anzeigen"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> Vollbild</button>
                        </div>
                    </div>
                    <div class="sk-kt-gruppe">
                        <div class="sk-kt-gruppe-titel"><i class="fa-solid fa-pen-ruler"></i> Werkzeuge</div>
                        <div class="sk-kt-gruppe-reihe">
                            <button class="tool-btn" data-ktwerkzeug="zeigen"><i class="fa-solid fa-arrow-pointer"></i> Zeigen</button>
                            <button class="tool-btn" data-ktwerkzeug="auswahl" title="Rahmen aufziehen oder Figuren anklicken; ausgewählte Figuren lassen sich gemeinsam verschieben (auch: Strg+Klick / Strg+Ziehen im Werkzeug Zeigen)"><i class="fa-solid fa-object-group"></i> Auswahl</button>
                            <button class="tool-btn" data-ktwerkzeug="messen"><i class="fa-solid fa-ruler"></i> Messen</button>
                            ${karteMessformSelectHtml()}
                            <button class="tool-btn" data-ktwerkzeug="malen"><i class="fa-solid fa-pen"></i> Zeichnen</button>
                            <button class="tool-btn" data-ktwerkzeug="radieren"><i class="fa-solid fa-eraser"></i> Radieren</button>
                            <button class="tool-btn" data-ktwerkzeug="pin" title="Klick auf die Karte setzt einen Pin (Ort/Hinweis, optional mit Handout)"><i class="fa-solid fa-location-pin"></i> Pin</button>
                            <span class="sk-kt-trenner"></span>
                            <select id="kt-mal-art" class="sk-input sk-mal-art" title="Form">
                                <option value="freihand">Freihand</option>
                                <option value="linie">Linie</option>
                                <option value="kreis">Kreis</option>
                                <option value="rechteck">Rechteck</option>
                            </select>
                            <input type="color" id="kt-mal-farbe" class="sk-mal-farbe" value="#a3342b" title="Zeichenfarbe">
                            <label class="sk-mal-deckkraft-label" title="Deckkraft der Markierung (Füllung und Umriss)">
                                <i class="fa-solid fa-droplet"></i>
                                <input type="range" id="kt-mal-deckkraft" min="0.15" max="1" step="0.05" value="0.55">
                                <span id="kt-mal-deckkraft-wert">55%</span>
                            </label>
                            <button class="tool-btn" onclick="karteMap && karteMap.rueckgaengig()" title="Rückgängig"><i class="fa-solid fa-rotate-left"></i></button>
                        </div>
                    </div>
                    <div class="sk-kt-gruppe">
                        <div class="sk-kt-gruppe-titel"><i class="fa-solid fa-border-all"></i> Raster</div>
                        <div id="kt-raster-werkzeuge" class="sk-kt-gruppe-reihe"></div>
                    </div>
                    <div class="sk-kt-gruppe">
                        <div class="sk-kt-gruppe-titel"><i class="fa-solid fa-cloud"></i> Nebel des Krieges</div>
                        <div class="sk-kt-gruppe-reihe">
                            <label class="hr-check" style="margin:0"><input type="checkbox" id="kt-nebel-aktiv"> <span>Aktiv</span></label>
                            <button class="tool-btn" data-ktwerkzeug="nebel-auf"><i class="fa-solid fa-cloud"></i> Nebel aufdecken</button>
                            <button class="tool-btn" data-ktwerkzeug="nebel-zu"><i class="fa-solid fa-cloud-sun"></i> Nebel abdecken</button>
                            <button class="tool-btn" onclick="karteNebelFreigeben()" title="Aufgedeckte Bereiche für Spieler freigeben"><i class="fa-solid fa-eye"></i> Für Spieler freigeben</button>
                            <button class="tool-btn" onclick="karteNebelEntwurfVerwerfen()" title="Noch nicht freigegebenen Entwurf verwerfen"><i class="fa-solid fa-eye-slash"></i> Entwurf verwerfen</button>
                            <span class="sk-kt-trenner"></span>
                            <label class="hr-check" style="margin:0" title="Blendet Markierungen aus, sobald der Nebel über ihnen aufgedeckt ist (nur bei dir, nicht bei den Spielern)"><input type="checkbox" id="kt-markierung-ausblenden"> <span>Markierungen in aufgedecktem Bereich ausblenden</span></label>
                        </div>
                    </div>
                    <div class="sk-kt-gruppe">
                        <div class="sk-kt-gruppe-titel"><i class="fa-solid fa-users"></i> Spieler</div>
                        <div class="sk-kt-gruppe-reihe">
                            <label class="sk-raster-feld" title="Frei: Jeder Spieler zieht seine eigene Figur selbst. Mit Bestätigung: Züge sind nur Vorschläge, die du bestätigst oder verwirfst.">Spieler-Bewegung
                                <select id="kt-zuege-modus" class="sk-input">
                                    <option value="frei">Frei (eigene Figur)</option>
                                    <option value="bestaetigung">Mit Bestätigung</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div id="kt-canvas-heim"><canvas id="kt-canvas" class="sk-canvas"></canvas></div>
                <p class="ir-hint">Spieler-Figuren entstehen automatisch, sobald jemand beitritt. NSCs kommen über den Karten-Knopf in der NSC-Liste dazu. Nebel: Bereich aufdecken (nur du siehst den Entwurf), dann „Für Spieler freigeben“. Beim Kartenwechsel sehen freigegebene Spieler sofort die neue Karte.</p>
                <div id="kt-dynamic"></div>
            </details>`;
        const canvas = document.getElementById('kt-canvas');
        karteEinhaengen(canvas);
        renderKtRasterWerkzeuge();
        box.querySelectorAll('[data-ktwerkzeug]').forEach(btn => btn.addEventListener('click', () => {
            if (karteMap) karteMap.setWerkzeug(btn.dataset.ktwerkzeug);
            box.querySelectorAll('[data-ktwerkzeug]').forEach(b => b.classList.toggle('tool-btn-aktiv', b === btn));
        }));
        const zeigenBtn = box.querySelector('[data-ktwerkzeug="zeigen"]');
        if (zeigenBtn) zeigenBtn.classList.add('tool-btn-aktiv');
        const malArtSel = document.getElementById('kt-mal-art');
        if (malArtSel) malArtSel.addEventListener('change', () => karteMap && karteMap.setMalArt(malArtSel.value));
        const malFarbeInput = document.getElementById('kt-mal-farbe');
        if (malFarbeInput) malFarbeInput.addEventListener('input', () => karteMap && karteMap.setMalFarbe(malFarbeInput.value));
        const malDeckkraftInput = document.getElementById('kt-mal-deckkraft');
        const malDeckkraftWert = document.getElementById('kt-mal-deckkraft-wert');
        if (malDeckkraftInput) malDeckkraftInput.addEventListener('input', () => {
            const wert = parseFloat(malDeckkraftInput.value) || 0.55;
            if (karteMap) karteMap.setMalDeckkraft(wert);
            if (malDeckkraftWert) malDeckkraftWert.textContent = Math.round(wert * 100) + '%';
        });
        const markierungAusblendenCb = document.getElementById('kt-markierung-ausblenden');
        if (markierungAusblendenCb) markierungAusblendenCb.addEventListener('change', () => karteMap && karteMap.setMarkierungenAusblenden(markierungAusblendenCb.checked));
        const nebelAktivCb = document.getElementById('kt-nebel-aktiv');
        if (nebelAktivCb) nebelAktivCb.addEventListener('change', () => karteNebelUmschalten(nebelAktivCb.checked));
        const zuegeModusSel = document.getElementById('kt-zuege-modus');
        if (zuegeModusSel) zuegeModusSel.addEventListener('change', () => karteZugModusSetzen(zuegeModusSel.value));
        const freigabeCb = document.getElementById('kt-freigabe-cb');
        if (freigabeCb) freigabeCb.addEventListener('change', () => karteFreigabeSetzen(freigabeCb.checked));
        const auswahl = document.getElementById('kt-auswahl');
        if (auswahl) auswahl.addEventListener('change', () => karteWechseln(auswahl.value));
        const details = box.querySelector('details');
        if (details) details.addEventListener('toggle', () => {
            karteOffenGm = details.open;
            sicherSpeichern(KARTEN_OFFEN_KEY, details.open ? '1' : '0');
            if (details.open && karteMap) karteMap.zeichnen();
        });
    } else {
        karteSpielerFigurenAbgleichen();
    }

    const auswahl = document.getElementById('kt-auswahl');
    if (auswahl) {
        auswahl.innerHTML = karten.map(k => `<option value="${escapeHtml(k.id)}" ${k.id === karteAktivId ? 'selected' : ''}>${escapeHtml(k.name)}</option>`).join('');
    }
    const nebelAktivCb = document.getElementById('kt-nebel-aktiv');
    if (nebelAktivCb && karteMap) nebelAktivCb.checked = karteMap.istNebelAktiv();
    const zuegeModusSel = document.getElementById('kt-zuege-modus');
    if (zuegeModusSel) zuegeModusSel.value = karteZuegeModus;
    karteFreigabeAnzeigeAktualisieren();

    const dyn = document.getElementById('kt-dynamic');
    if (!dyn || !karteMap) return;
    const vorschlaege = karteMap.offeneZuege();
    dyn.innerHTML = `
        ${vorschlaege.length ? `<div class="sk-vorschlaege">
            <div class="sk-vorschlaege-titel"><i class="fa-solid fa-route"></i> Offene Zugvorschläge</div>
            ${vorschlaege.map(v => `<div class="sk-vorschlag-zeile">
                <span>${escapeHtml(v.name)} → ${v.felder} Feld${v.felder === 1 ? '' : 'er'}</span>
                <button class="sk-mini-btn" onclick="karteZugBestaetigen('${escapeHtml(v.id)}')"><i class="fa-solid fa-check"></i> Bestätigen</button>
                <button class="sk-mini-btn" onclick="karteZugVerwerfen('${escapeHtml(v.id)}')"><i class="fa-solid fa-xmark"></i> Verwerfen</button>
            </div>`).join('')}
        </div>` : ''}
        <div class="sk-marker-zeile">
            <input type="text" id="kt-marker-name" class="sk-input" placeholder="Markierung benennen …" onkeydown="if(event.key==='Enter') karteMarkierungHinzufuegen()">
            <button class="sk-mini-btn" onclick="karteMarkierungHinzufuegen()"><i class="fa-solid fa-location-dot"></i> Markierung setzen</button>
        </div>
        <div class="kt-auswahl-leiste" id="kt-auswahl-leiste">${karteAuswahlLeisteInnenHtml()}</div>
        ${kartePinListeHtml()}
        ${karteFigurenListeHtml()}`;
}

// --- Figurenliste (Spieler, NSC, freie Markierungen) ---------------------------------------

function karteFigurArt(f) {
    if (String(f.id).startsWith('spieler:')) return 0;
    if (String(f.id).startsWith('nsc:')) return 1;
    return 2;
}

function karteFigurenListeHtml() {
    const figuren = karteMap.figuren.slice().sort((a, b) => karteFigurArt(a) - karteFigurArt(b));
    const spieler = figuren.filter(f => karteFigurArt(f) === 0).length;
    const nsc = figuren.filter(f => karteFigurArt(f) === 1).length;
    const verdeckt = figuren.filter(f => f.verdeckt).length;
    const gewaehlt = karteMap.getAuswahl();
    return `<details class="kt-pins kt-figuren x-details" open>
        <summary class="kt-pins-kopf"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-users"></i> Spieler &amp; NSC
            <span class="x-count" title="Alle Figuren auf der Karte">${figuren.length}</span>
            ${spieler ? `<span class="x-count" title="Spieler-Figuren"><i class="fa-solid fa-user"></i> ${spieler}</span>` : ''}
            ${nsc ? `<span class="x-count" title="NSC-Figuren"><i class="fa-solid fa-address-book"></i> ${nsc}</span>` : ''}
            ${verdeckt ? `<span class="x-count" title="Verdeckte Figuren - nur du siehst sie"><i class="fa-solid fa-eye-slash"></i> ${verdeckt}</span>` : ''}</summary>
        <div class="sk-einheiten-liste">
            ${figuren.length ? figuren.map(f => `<div class="kt-figur ${gewaehlt.includes(f.id) ? 'kt-figur-gewaehlt' : ''}" data-figur-id="${escapeHtml(f.id)}">${karteFigurKopfHtml(f)}</div>`).join('') : '<p class="x-leer">Noch keine Figuren auf der Karte.</p>'}
        </div>
    </details>`;
}

// --- Pins (Orte & Hinweise auf der Karte) ----------------------------------------------
// Ein Pin ist ein beschrifteter Punkt mit Symbol, Notiz und optional einem Handout aus der
// Handout-Bibliothek (handouts.js). Gesetzt mit dem Pin-Werkzeug, verschiebbar per Ziehen. Die
// Spieler sehen nur nicht-verdeckte Pins (und keine im Nebel) und können sie anklicken, um
// Beschriftung und Notiz zu lesen. Das Handout selbst bekommen sie nur, wenn der SL es zeigt
// (Knopf in der Pinzeile oder im Popover) - danach öffnet der Pin es auch bei ihnen wieder.
const KARTE_PIN_ICONS = ['📍', '⚓', '🏝️', '🏴‍☠️', '💰', '🗝️', '📜', '⚔️', '❓', '❗', '🏠', '🔥', '☠️', '🌀', '🧭'];

function kartePinListeHtml() {
    const pins = karteMap.pins || [];
    const handoutListe = typeof handouts !== 'undefined' ? handouts : [];
    const zeilen = pins.map(p => `
        <div class="kt-pin-zeile" data-pin="${escapeHtml(p.id)}">
            <select class="sk-input kt-pin-icon" onchange="kartePinSetzen('${escapeHtml(p.id)}', { icon: this.value })" title="Symbol">
                ${KARTE_PIN_ICONS.concat(KARTE_PIN_ICONS.includes(p.icon) ? [] : [p.icon]).map(i => `<option value="${escapeHtml(i)}" ${i === p.icon ? 'selected' : ''}>${escapeHtml(i)}</option>`).join('')}
            </select>
            <input type="text" class="sk-input kt-pin-label" value="${escapeHtml(p.label || '')}" maxlength="60" placeholder="Beschriftung …" onchange="kartePinSetzen('${escapeHtml(p.id)}', { label: this.value })">
            <input type="text" class="sk-input kt-pin-text" value="${escapeHtml(p.text || '')}" maxlength="600" placeholder="Notiz für die Spieler (optional) …" onchange="kartePinSetzen('${escapeHtml(p.id)}', { text: this.value })">
            ${handoutListe.length || p.handoutId ? `<select class="sk-input kt-pin-handout" onchange="kartePinSetzen('${escapeHtml(p.id)}', { handoutId: this.value })" title="Handout, das zu diesem Ort gehört">
                <option value="">Kein Handout</option>
                ${handoutListe.map(h => `<option value="${escapeHtml(h.id)}" ${h.id === p.handoutId ? 'selected' : ''}>${escapeHtml(h.titel)}</option>`).join('')}
            </select>` : ''}
            <label class="hr-check" style="margin:0" title="Verdeckt: nur du siehst den Pin, bis du ihn aufdeckst"><input type="checkbox" ${p.verdeckt ? 'checked' : ''} onchange="kartePinSetzen('${escapeHtml(p.id)}', { verdeckt: this.checked })"> <span>verdeckt</span></label>
            ${p.handoutId ? `<button class="sk-mini-btn" onclick="kartePinHandoutZeigen('${escapeHtml(p.id)}')" title="Das Handout allen verbundenen Spielern zeigen"><i class="fa-solid fa-scroll"></i> Handout zeigen</button>` : ''}
            <button class="btn-delete-icon" onclick="kartePinLoeschen('${escapeHtml(p.id)}')" title="Pin löschen"><i class="fa-solid fa-trash"></i></button>
        </div>`).join('');
    const verdeckte = pins.filter(p => p.verdeckt).length;
    return `<details class="kt-pins x-details" open>
        <summary class="kt-pins-kopf"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-location-pin"></i> Pins (Orte &amp; Hinweise)
            <span class="x-count">${pins.length}</span>${verdeckte ? ` <span class="x-count" title="Verdeckte Pins - nur du siehst sie"><i class="fa-solid fa-eye-slash"></i> ${verdeckte}</span>` : ''}</summary>
        ${zeilen || '<p class="x-leer">Noch keine Pins - Werkzeug <b>Pin</b> wählen und auf die Karte klicken.</p>'}
    </details>`;
}

function kartePinSetzen(id, patch) {
    if (!karteMap) return;
    karteMap.updatePin(id, patch);
    if ('handoutId' in patch || 'icon' in patch) renderKarteGm();
}

function kartePinLoeschen(id) {
    if (!karteMap) return;
    karteMap.removePin(id);
    renderKarteGm();
}

function kartePinHandoutZeigen(id) {
    const pin = karteMap && (karteMap.pins || []).find(p => p.id === id);
    if (!pin || !pin.handoutId || typeof handoutZeigen !== 'function') return;
    handoutZeigen(pin.handoutId);   // Rückmeldung steht im Live-Feed (addGmLogEntry)
}

let kartePinPopoverEl = null;
function kartePinPopoverSchliessen() {
    if (kartePinPopoverEl) { kartePinPopoverEl.remove(); kartePinPopoverEl = null; }
    document.removeEventListener('pointerdown', kartePinPopoverAussen, true);
    document.removeEventListener('keydown', kartePinPopoverEsc, true);
}
function kartePinPopoverAussen(e) { if (kartePinPopoverEl && !kartePinPopoverEl.contains(e.target)) kartePinPopoverSchliessen(); }
function kartePinPopoverEsc(e) { if (e.key === 'Escape') kartePinPopoverSchliessen(); }

// Kleine Infokarte zu einem Pin. rolle 'gm': mit Handout-Knopf; 'spieler': Handout nur, wenn sie
// es schon erhalten haben. x/y = Bildschirmposition des Klicks (null: Fensterrand rechts oben).
function kartePinPopover(pin, x, y, rolle) {
    kartePinPopoverSchliessen();
    const hatHandout = !!pin.handoutId;
    const handoutName = hatHandout && typeof handouts !== 'undefined' ? ((handouts.find(h => h.id === pin.handoutId) || {}).titel || 'Handout') : 'Handout';
    const erhalten = rolle === 'spieler' && hatHandout && typeof handoutVerlauf !== 'undefined' && handoutVerlauf.some(h => h.id === pin.handoutId);
    const el = document.createElement('div');
    el.className = 'kt-pin-popover';
    el.innerHTML = `
        <div class="kt-pin-popover-kopf"><span class="kt-pin-popover-icon">${escapeHtml(pin.icon || '📍')}</span><strong>${escapeHtml(pin.label || 'Ort')}</strong>${pin.verdeckt ? ' <span class="x-count" title="Nur du siehst diesen Pin"><i class="fa-solid fa-eye-slash"></i></span>' : ''}</div>
        ${pin.text ? `<div class="kt-pin-popover-text">${escapeHtml(pin.text)}</div>` : (rolle === 'spieler' ? '<div class="kt-pin-popover-text x-leer">Keine weitere Notiz.</div>' : '')}
        ${rolle === 'gm' && hatHandout ? `<button class="tool-btn" id="kt-pin-popover-handout"><i class="fa-solid fa-scroll"></i> „${escapeHtml(handoutName)}“ allen zeigen</button>` : ''}
        ${erhalten ? `<button class="tool-btn" id="kt-pin-popover-lesen"><i class="fa-solid fa-scroll"></i> Handout lesen</button>` : ''}`;
    document.body.appendChild(el);
    kartePinPopoverEl = el;
    const breite = el.offsetWidth, hoehe = el.offsetHeight;
    const links = x == null ? window.innerWidth - breite - 24 : Math.min(Math.max(8, x + 12), window.innerWidth - breite - 8);
    const oben = y == null ? 90 : Math.min(Math.max(8, y - hoehe - 12 < 8 ? y + 16 : y - hoehe - 12), window.innerHeight - hoehe - 8);
    el.style.left = links + 'px';
    el.style.top = oben + 'px';
    const handoutBtn = el.querySelector('#kt-pin-popover-handout');
    if (handoutBtn) handoutBtn.addEventListener('click', () => { kartePinHandoutZeigen(pin.id); kartePinPopoverSchliessen(); });
    const lesenBtn = el.querySelector('#kt-pin-popover-lesen');
    if (lesenBtn) lesenBtn.addEventListener('click', () => { kartePinPopoverSchliessen(); if (typeof handoutVerlaufOeffnen === 'function') handoutVerlaufOeffnen(); });
    setTimeout(() => {
        document.addEventListener('pointerdown', kartePinPopoverAussen, true);
        document.addEventListener('keydown', kartePinPopoverEsc, true);
    }, 0);
}

// --- Vollbild ---------------------------------------------------------------
//
// Es gibt keine eigene Vollbild-Leinwand: die vorhandene Karten-Instanz (GM
// oder Spieler, jede mit eigenem <canvas> und eigener BattleMap-Instanz)
// wandert per appendChild in #karte-vollbild-overlay und beim Schließen
// wieder zurück in ihren "Heim"-Container (kt-canvas-heim/kt-spieler-canvas-heim) -
// das Verschieben eines <canvas>-Knotens im DOM lässt Zeichenkontext und
// Inhalt unangetastet.
let karteVollbildRolle = null; // 'gm' | 'spieler' | null

function karteVollbildWerkzeugleisteHtml(rolle) {
    const gemeinsam = `
        <button class="tool-btn" data-ktvwerkzeug="zeigen"><i class="fa-solid fa-arrow-pointer"></i> Zeigen</button>
        <button class="tool-btn" data-ktvwerkzeug="messen"><i class="fa-solid fa-ruler"></i> Messen</button>
        ${karteMessformSelectHtml()}`;
    const nurGm = `
        <button class="tool-btn" data-ktvwerkzeug="auswahl" title="Rahmen aufziehen oder Figuren anklicken, dann gemeinsam verschieben"><i class="fa-solid fa-object-group"></i> Auswahl</button>
        <button class="tool-btn" data-ktvwerkzeug="malen"><i class="fa-solid fa-pen"></i> Zeichnen</button>
        <button class="tool-btn" data-ktvwerkzeug="radieren"><i class="fa-solid fa-eraser"></i> Radieren</button>
        <button class="tool-btn" data-ktvwerkzeug="pin" title="Klick auf die Karte setzt einen Pin"><i class="fa-solid fa-location-pin"></i> Pin</button>
        <span class="sk-kt-trenner"></span>
        <button class="tool-btn" data-ktvwerkzeug="nebel-auf"><i class="fa-solid fa-cloud"></i> Nebel aufdecken</button>
        <button class="tool-btn" data-ktvwerkzeug="nebel-zu"><i class="fa-solid fa-cloud-sun"></i> Nebel abdecken</button>`;
    const nurSpieler = `
        <button class="tool-btn" onclick="karteAktualisierenAnfordern(this)" title="Aktuellen Stand vom Spielleiter neu abrufen, falls die Karte hängen geblieben wirkt"><i class="fa-solid fa-rotate"></i> Aktualisieren</button>
        <button class="tool-btn ${karteRasterAusgeblendet() ? 'tool-btn-aktiv' : ''}" data-ktraster-toggle onclick="karteRasterAusblendenUmschalten()" title="Raster nur bei dir aus-/einblenden - wirkt sich nicht auf den SL oder andere Spieler aus"><i class="fa-solid fa-table-cells"></i> Raster</button>`;
    const mapVar = rolle === 'gm' ? 'karteMap' : 'karteSpielerMap';
    return gemeinsam + (rolle === 'gm' ? nurGm : nurSpieler) +
        `<span class="sk-kt-trenner"></span>
        <button class="tool-btn" onclick="${mapVar} && ${mapVar}.einpassen()"><i class="fa-solid fa-expand"></i> Einpassen</button>
        <button class="tool-btn karte-vollbild-schliessen" onclick="karteVollbildSchliessen()"><i class="fa-solid fa-xmark"></i> Schließen (Esc)</button>`;
}

function karteVollbildOeffnen(rolle) {
    const overlay = document.getElementById('karte-vollbild-overlay');
    const map = rolle === 'gm' ? karteMap : karteSpielerMap;
    const canvas = document.getElementById(rolle === 'gm' ? 'kt-canvas' : 'kt-spieler-canvas');
    if (!overlay || !map || !canvas) return;
    if (karteVollbildRolle) karteVollbildSchliessen(); // schon offen (z.B. Doppelklick) - erst sauber zurückräumen
    karteVollbildRolle = rolle;

    overlay.innerHTML = `
        <div class="karte-vollbild-werkzeuge">${karteVollbildWerkzeugleisteHtml(rolle)}</div>
        <div class="karte-vollbild-leinwand-host" id="karte-vollbild-leinwand-host"></div>`;
    document.getElementById('karte-vollbild-leinwand-host').appendChild(canvas);
    overlay.style.display = 'flex';

    overlay.querySelectorAll('[data-ktvwerkzeug]').forEach(btn => {
        btn.classList.toggle('tool-btn-aktiv', btn.dataset.ktvwerkzeug === map.getWerkzeug());
        btn.addEventListener('click', () => {
            map.setWerkzeug(btn.dataset.ktvwerkzeug);
            overlay.querySelectorAll('[data-ktvwerkzeug]').forEach(b => b.classList.toggle('tool-btn-aktiv', b === btn));
        });
    });

    document.addEventListener('keydown', karteVollbildEscHandler);
    // Die Leinwand kennt ihre neue (viel größere) Größe erst nach dem Umhängen.
    setTimeout(() => map.zeichnen(), 30);
}

function karteVollbildEscHandler(e) {
    if (e.key === 'Escape') karteVollbildSchliessen();
}

function karteVollbildSchliessen() {
    const overlay = document.getElementById('karte-vollbild-overlay');
    const rolle = karteVollbildRolle;
    if (!overlay || !rolle) return;
    const map = rolle === 'gm' ? karteMap : karteSpielerMap;
    const canvas = document.getElementById(rolle === 'gm' ? 'kt-canvas' : 'kt-spieler-canvas');
    const heim = document.getElementById(rolle === 'gm' ? 'kt-canvas-heim' : 'kt-spieler-canvas-heim');
    document.removeEventListener('keydown', karteVollbildEscHandler);
    overlay.style.display = 'none';
    overlay.innerHTML = '';
    karteVollbildRolle = null;
    if (heim && canvas) heim.appendChild(canvas);
    if (map) setTimeout(() => map.zeichnen(), 30);
    // Das Werkzeug kann sich im Vollbild geändert haben - Hervorhebung im Haupt-Panel nachziehen
    if (rolle === 'gm' && map) {
        document.querySelectorAll('#gm-karte [data-ktwerkzeug]').forEach(b => b.classList.toggle('tool-btn-aktiv', b.dataset.ktwerkzeug === map.getWerkzeug()));
    }
}

// --- Spieler --------------------------------------------------------------

let karteSpielerMap = null;
let karteSpielerOffen = window.innerWidth > 768; // auf dem Handy erstmal eingeklappt, mehr Überblick auf der langen Seite
let karteSpielerLetzte = null;  // letzte empfangene Nachricht ({karteId, name, zuegeFrei, zustand}); null = nicht freigegeben

function karteEmpfangen(payload) {
    karteSpielerLetzte = payload;
    // Erst rendern (legt karteSpielerMap beim allerersten Empfang erst an),
    // danach den Kartenzustand anwenden - sonst geht der erste Sync ins Leere.
    renderKarteSpieler();
    if (karteSpielerMap && payload.zustand) {
        karteSpielerMap.setBestaetigung(!payload.zuegeFrei, false);
        karteSpielerMap.applyState(karteSpielerZustandFuerAnwenden(payload.zustand), payload.zustand.bild);
        const meinPeer = typeof peer !== 'undefined' && peer ? peer.id : null;
        const meineFigur = meinPeer && karteSpielerMap.figuren.find(f => f.besitzer === meinPeer);
        const meinBild = typeof appData !== 'undefined' ? safeImageSrc(appData.portrait) : null;
        if (meineFigur && meinBild && meinBild !== 'assets/giphy.gif') karteSpielerMap.setFigurBild(meineFigur.id, meinBild);
    }
}

// Der SL hat die Karte wieder weggenommen: alles verwerfen, Abschnitt verschwindet
function karteAusEmpfangen() {
    karteSpielerLetzte = null;
    kartePinPopoverSchliessen();
    if (karteVollbildRolle === 'spieler') karteVollbildSchliessen();
    renderKarteSpieler();
}

function karteSpielerBeitritt() {
    karteSpielerLetzte = null;
    renderKarteSpieler();
}

function karteSpielerGetrennt() {
    karteSpielerLetzte = null;
    kartePinPopoverSchliessen();
    if (karteVollbildRolle === 'spieler') karteVollbildSchliessen();
    renderKarteSpieler();
}

function karteNachrichtVerarbeiten(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type === 'karte') { karteEmpfangen(payload); return true; }
    if (payload.type === 'karteAus') { karteAusEmpfangen(); return true; }
    return false;
}

function renderKarteSpieler() {
    const section = document.getElementById('karte-section');
    if (!section) return;
    const verbunden = typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
    if (!verbunden || (typeof isGmMode !== 'undefined' && isGmMode) || !karteSpielerLetzte) {
        section.style.display = 'none';
        return;
    }
    section.style.display = '';

    if (!document.getElementById('kt-spieler-canvas')) {
        section.innerHTML = `
            <details class="x-details sk-details" ${karteSpielerOffen ? 'open' : ''}>
                <summary class="tm-head">
                    <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-map category-icon-fa"></i> Karte
                        <span id="kt-spieler-name-badge"></span>
                        <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('karte')" title="Hilfe zur Karte"></i></h2>
                </summary>
                <div class="sk-karten-werkzeuge">
                    <button class="tool-btn" data-ktspielerwerkzeug="zeigen"><i class="fa-solid fa-arrow-pointer"></i> Zeigen</button>
                    <button class="tool-btn" data-ktspielerwerkzeug="messen"><i class="fa-solid fa-ruler"></i> Messen</button>
                    ${karteMessformSelectHtml()}
                    <button class="tool-btn" onclick="karteVollbildOeffnen('spieler')" title="Karte großformatig anzeigen"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> Vollbild</button>
                    <button class="tool-btn" onclick="karteAktualisierenAnfordern(this)" title="Aktuellen Stand vom Spielleiter neu abrufen, falls die Karte hängen geblieben wirkt - ohne die Seite neu zu laden"><i class="fa-solid fa-rotate"></i> Aktualisieren</button>
                    <button class="tool-btn ${karteRasterAusgeblendet() ? 'tool-btn-aktiv' : ''}" data-ktraster-toggle onclick="karteRasterAusblendenUmschalten()" title="Raster nur bei dir aus-/einblenden - wirkt sich nicht auf den SL oder andere Spieler aus"><i class="fa-solid fa-table-cells"></i> Raster</button>
                </div>
                <div id="kt-spieler-canvas-heim"><canvas id="kt-spieler-canvas" class="sk-canvas"></canvas></div>
                <p class="ir-hint">Zieh deine Figur an die gewünschte Stelle. Hat der Spielleiter Bestätigung verlangt, erscheint dein Zug beim ihm erst als Vorschlag.</p>
            </details>`;
        const canvas = document.getElementById('kt-spieler-canvas');
        karteSpielerMap = BattleMap.create(canvas, {
            einheit: 1, einheitName: 'm',
            onPinKlick: (pin, x, y) => kartePinPopover(pin, x, y, 'spieler'),
            bestaetigungNoetig: true,
            nebelDeckend: true,
            onZugVorschlag: (figur) => {
                if (typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open && karteSpielerLetzte) {
                    try { hostConnection.send({ type: 'karteZugVorschlag', karteId: karteSpielerLetzte.karteId, figurId: figur.id, x: figur.geplantX, y: figur.geplantY }); } catch (e) { /* weg */ }
                }
            },
            // Freie Bewegung: die Figur steht lokal schon am Ziel - dem SL die neue Position melden, sonst
            // bliebe der Zug nur auf dem eigenen Bildschirm (und der nächste Kartenstand des SL würde die
            // Figur zurücksetzen). Dieselbe Nachricht wie ein Zugvorschlag, der SL wendet sie an.
            onLokaleFigur: (figur) => {
                if (typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open && karteSpielerLetzte) {
                    try { hostConnection.send({ type: 'karteZugVorschlag', karteId: karteSpielerLetzte.karteId, figurId: figur.id, x: figur.x, y: figur.y, frei: true }); } catch (e) { /* weg */ }
                }
            }
        });
        const meinPeer = typeof peer !== 'undefined' && peer ? peer.id : null;
        karteSpielerMap.setBesitzer(meinPeer);
        section.querySelectorAll('[data-ktspielerwerkzeug]').forEach(btn => btn.addEventListener('click', () => {
            karteSpielerMap.setWerkzeug(btn.dataset.ktspielerwerkzeug);
            section.querySelectorAll('[data-ktspielerwerkzeug]').forEach(b => b.classList.toggle('tool-btn-aktiv', b === btn));
        }));
        const zeigenBtn = section.querySelector('[data-ktspielerwerkzeug="zeigen"]');
        if (zeigenBtn) zeigenBtn.classList.add('tool-btn-aktiv');
        const details = section.querySelector('details');
        if (details) details.addEventListener('toggle', () => { karteSpielerOffen = details.open; if (details.open && karteSpielerMap) karteSpielerMap.zeichnen(); });
        if (karteSpielerLetzte.zustand) {
            karteSpielerMap.setBestaetigung(!karteSpielerLetzte.zuegeFrei, false);
            karteSpielerMap.applyState(karteSpielerZustandFuerAnwenden(karteSpielerLetzte.zustand), karteSpielerLetzte.zustand.bild);
        }
    }

    const badge = document.getElementById('kt-spieler-name-badge');
    if (badge) badge.innerHTML = `<span class="x-count" style="font-size:0.7rem"><i class="fa-solid fa-map"></i> ${escapeHtml(karteSpielerLetzte.name || '')}</span>`;
}
