// How to be a Hero - Karte (Eldara-VTT)
//
// Verallgemeinert das bisherige Einzelkarten-Muster aus seekampf.js (eine
// einzige Schiffskarte) zu einer Kartenbibliothek: der SL legt beliebig viele
// Karten an (Insel, Schiffsdeck, Dschungel, ...), wechselt zwischen ihnen, und
// Spieler bewegen sich mit ihrer eigenen Figur darauf - Vorschlag, den der SL
// bestätigt oder verwirft, genau wie beim Seekampf. NSCs kommen per Knopf aus
// der NSC-Liste (nscliste.js) dazu. Nebel des Krieges ist eingebaut.
//
// Nutzt battlemap.js unverändert (siehe dort - bewusst regelsystem-
// unabhängig gehalten). seekampf.js (Schiffsgefechte) läuft als reine Regel-/
// Buchhaltungsschicht auf derselben geteilten Karte mit - Schiffe sind hier
// einfach Figuren wie alle anderen (siehe skFigurenAbgleichen dort), nur
// zusätzlich per Kapitän/Crew steuerbar. Wechselt der SL die aktive Karte,
// verschwinden Schiffe aus der Ansicht, bis er zurückwechselt (ihre Werte
// bleiben unangetastet) - deshalb rufen karteEinhaengen/karteWechseln/
// karteNeu unten auch skFigurenAbgleichen() mit auf, falls vorhanden.
//
// Nachrichten (multiplayer.js):
//   SL -> Spieler   { type: 'karte', karteId, name, kategorie, zuegeFrei,
//                      zustand: {...battlemap-Zustand, bild} }
//   Spieler -> SL    { type: 'karteZugVorschlag', karteId, figurId, x, y }
//
// Figur-IDs: 'spieler:'+peerId (eine pro verbundenem Spieler, automatisch),
// 'nsc:'+nscId (aus der NSC-Liste), 'frei:'+uid (freie SL-Markierung).

const KARTEN_KEY = 'htbah_gm_karten';
const KARTEN_OFFEN_KEY = 'htbah_gm_karten_offen';
const KARTEN_KATEGORIEN = {
    land: { label: 'Land', icon: 'fa-mountain-sun' },
    see: { label: 'See/Insel', icon: 'fa-water' },
    schiff: { label: 'Schiffsdeck', icon: 'fa-ship' },
    sonstiges: { label: 'Sonstiges', icon: 'fa-map' }
};

function karteLeererZustand() {
    return { raster: Object.assign({}, KARTE_RASTER_STANDARD), figuren: [], formen: [], nebel: { aktiv: false, aufgedeckt: [], entwurf: [] }, bild: null };
}

// Spiegel von battlemap.js' eigenen STANDARD-Rasterwerten (siehe dort) - wird
// hier zusätzlich gebraucht, weil battlemap.js immer nur EINE Zustands-
// Instanz pro Sitzung lebendig hält (siehe karteMap/karteSpielerMap unten):
// applyState() MERGT ein übergebenes raster-Objekt nur rein
// (Object.assign(zustand.raster, neu.raster)), statt es zu ersetzen. Bekäme
// eine Karte ohne eigene (oder mit unvollständiger) Feldgröße/Versatz/Farbe
// den Zustand einer anderen Karte einfach so übergeben, würden Lücken vom
// vorher aktiven Kartenwechsel "durchbluten" - z.B. bliebe eine frisch
// angelegte Karte auf der zuletzt eingestellten Feldgröße hängen, statt bei
// den Standardwerten zu starten. karteZustandFuerAnwenden() unten füllt
// deshalb vor jedem applyState() explizit auf - macht jede Karte inkl. ihrer
// eigenen Feldgröße wirklich unabhängig von jeder anderen, auch ältere, vor
// diesem Fix gespeicherte Karten mit unvollständigem raster.
const KARTE_RASTER_STANDARD = {
    rasterGroesse: 50, rasterVersatzX: 0, rasterVersatzY: 0,
    rasterSichtbar: true, rasterFarbe: 'rgba(212,162,76,0.30)', einrasten: true
};
function karteZustandFuerAnwenden(zustand) {
    return Object.assign({}, zustand, { raster: Object.assign({}, KARTE_RASTER_STANDARD, (zustand && zustand.raster) || {}) });
}

// --- Spielleiter --------------------------------------------------------------

let karten = [];              // [{ id, name, kategorie, zustand }]
let karteAktivId = null;
let karteMap = null;          // aktuell eingehängte BattleMap-Instanz
let karteOffenGm = true;
let karteZuegeFrei = false;   // Spieler bewegen ohne Bestätigung (pro Sitzung)

function karteNeueId() {
    return 'kt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function karteLaden() {
    try {
        const roh = localStorage.getItem(KARTEN_KEY);
        const stand = roh ? JSON.parse(roh) : null;
        karten = stand && Array.isArray(stand.karten) ? stand.karten : [];
        karteAktivId = stand ? stand.aktivId : null;
    } catch (e) { karten = []; karteAktivId = null; }
    try { karteOffenGm = localStorage.getItem(KARTEN_OFFEN_KEY) !== '0'; } catch (e) { karteOffenGm = true; }
}

function karteSichern() {
    try { localStorage.setItem(KARTEN_KEY, JSON.stringify({ karten, aktivId: karteAktivId })); } catch (e) { /* voll oder blockiert */ }
}

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
// nach jedem Kartenwechsel/Laden neu zuweisen, wie beim Seekampf auch.
function karteFigurenPortraitsWiederherstellen() {
    if (!karteMap || typeof connectedPlayersData === 'undefined') return;
    karteMap.figuren.forEach(f => {
        if (!f.id.startsWith('spieler:')) return;
        const peerId = f.id.slice('spieler:'.length);
        const d = connectedPlayersData[peerId];
        const bild = d && typeof safeImageSrc === 'function' ? safeImageSrc(d.portrait) : null;
        if (bild && bild !== 'assets/giphy.gif') karteMap.setFigurBild(f.id, bild);
    });
}

// Für jeden verbundenen Spieler eine eigene Figur, sofern noch keine da ist.
function karteSpielerFigurenAbgleichen() {
    if (!karteMap || typeof connectedPlayersData === 'undefined') return;
    Object.keys(connectedPlayersData).forEach(peerId => {
        const id = 'spieler:' + peerId;
        if (karteMap.figuren.find(f => f.id === id)) return;
        const d = connectedPlayersData[peerId];
        const name = [d.vorname, d.name].filter(Boolean).join(' ') || 'Spieler';
        const pos = karteFreieSpawnPosition();
        karteMap.addFigur({
            id, name, x: pos.x, y: pos.y, groesse: 1, besitzer: peerId,
            farbe: typeof getColorForPlayer === 'function' ? getColorForPlayer(name) : '#9ca3af'
        });
    });
    karteFigurenPortraitsWiederherstellen();
    karteNscBilderAnwenden();
}

// Vom SL entfernt: seine Karten-Figur bleibt sonst als Leiche stehen.
function karteSpielerEntfernen(peerId) {
    if (!karteMap) return;
    karteMap.removeFigur('spieler:' + peerId);
    karteVerteilen();
}

function karteEinhaengen(canvas) {
    if (!canvas || karteMap) return;
    karteLaden();
    if (!karten.length) {
        const id = karteNeueId();
        karten.push({ id, name: 'Karte 1', kategorie: 'land', zustand: karteLeererZustand() });
        karteAktivId = id;
    }
    if (!karteAktivId || !karten.find(k => k.id === karteAktivId)) karteAktivId = karten[0].id;

    karteMap = BattleMap.create(canvas, {
        einheit: 1, einheitName: 'm',
        onChange: () => { karteAktuelleZurueckschreiben(); karteSichern(); karteVerteilen(); }
    });
    const eintrag = karten.find(k => k.id === karteAktivId);
    karteMap.applyState(karteZustandFuerAnwenden(eintrag.zustand), eintrag.zustand.bild);
    karteSpielerFigurenAbgleichen();
    if (typeof skFigurenAbgleichen === 'function') skFigurenAbgleichen();
    karteFigurenPortraitsWiederherstellen();
    karteNscBilderAnwenden();
}

function karteNeuDialog() {
    const name = prompt('Name der neuen Karte (z.B. "Tortuga", "Schiffsdeck"):', '');
    if (name === null) return;
    karteNeu(name.trim() || 'Neue Karte', 'land');
}

function karteNeu(name, kategorie) {
    karteAktuelleZurueckschreiben();
    const id = karteNeueId();
    karten.push({ id, name: name || 'Neue Karte', kategorie: KARTEN_KATEGORIEN[kategorie] ? kategorie : 'land', zustand: karteLeererZustand() });
    karteAktivId = id;
    if (karteMap) {
        karteMap.applyState(karteLeererZustand(), null);
        karteSpielerFigurenAbgleichen();
        if (typeof skFigurenAbgleichen === 'function') skFigurenAbgleichen();
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
    karteMap.applyState(karteZustandFuerAnwenden(eintrag.zustand), eintrag.zustand.bild);
    karteSpielerFigurenAbgleichen();
    if (typeof skFigurenAbgleichen === 'function') skFigurenAbgleichen();
    karteFigurenPortraitsWiederherstellen();
    karteNscBilderAnwenden();
    karteSichern();
    karteVerteilen();
    renderKarteGm();
}

function karteKategorieWaehlen(kategorie) {
    const eintrag = karten.find(k => k.id === karteAktivId);
    if (!eintrag || !KARTEN_KATEGORIEN[kategorie]) return;
    eintrag.kategorie = kategorie;
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
    }).catch(() => { /* ungültiges Bild */ });
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
    // Markierung im Nebel des Krieges versteckbar - anders als bei Spieler-Figuren
    // gewollt, das ist ja der Sinn von Nebel für NSCs/Markierungen.
    karteMap.addFigur({ id: 'frei:' + karteNeueId(), name, x: pos.x, y: pos.y, groesse: 1, besitzer: 'sl', farbe: '#8b5cf6' });
    if (nameEl) nameEl.value = '';
    renderKarteGm();
}

// Aus nscliste.js aufgerufen ("Auf Karte platzieren"). Erneutes Platzieren
// legt nichts doppelt an.
function karteNsPlatzieren(nsc) {
    if (!karteMap || !nsc || !nsc.id) return;
    const id = 'nsc:' + nsc.id;
    if (karteMap.figuren.find(f => f.id === id)) { renderKarteGm(); return; }
    const pos = karteFreieSpawnPosition();
    karteMap.addFigur({ id, name: nsc.name || 'NSC', x: pos.x, y: pos.y, groesse: 1, besitzer: 'sl', farbe: '#a3342b' });
    if (nsc.bild) karteMap.setFigurBild(id, nsc.bild);
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `setzt "${nsc.name || 'NSC'}" auf die Karte.`, '🗺️');
    renderKarteGm();
}

// Eigenes Icon je NSC (nscliste.js: n.bild) auf jeden schon platzierten Token
// nachziehen - Porträts sind bewusst nicht Teil von battlemap.js' eigenem
// Zustand (siehe setFigurBild dort), müssen also nach jedem Sync/Wechsel aus
// der eigentlichen Quelle (der NSC-Liste) neu gesetzt werden, genau wie bei
// Spieler-Porträts (karteFigurenPortraitsWiederherstellen) und Schiffs-Icons
// (skFigurenAbgleichen).
function karteNscBilderAnwenden() {
    if (!karteMap || typeof nscListe === 'undefined') return;
    karteMap.figuren.forEach(f => {
        if (!f.id.startsWith('nsc:')) return;
        const n = nscListe.find(x => x.id === f.id.slice('nsc:'.length));
        // Auch ein entferntes Icon (n.bild null) muss durchgereicht werden -
        // setFigurBild(id, null) löscht es aus battlemap.js' eigenem Cache,
        // sonst bliebe ein einmal gesetztes Icon dort für immer hängen.
        if (n) karteMap.setFigurBild(f.id, n.bild || null);
    });
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

function karteZugFreigabeUmschalten(an) {
    karteZuegeFrei = !!an;
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

// --- Live-Sync an die Spieler --------------------------------------------------

let karteVerteilenTimer = null;

function karteVerteilen() {
    clearTimeout(karteVerteilenTimer);
    karteVerteilenTimer = setTimeout(karteJetztVerteilen, 300);
}

function karteZustandFuerSpieler() {
    if (!karteMap || !karteAktivId) return null;
    const eintrag = karten.find(k => k.id === karteAktivId);
    const zustand = karteMap.getStateFuerSpieler();
    zustand.bild = karteMap.bild;
    return {
        type: 'karte', karteId: karteAktivId,
        name: eintrag ? eintrag.name : '', kategorie: eintrag ? eintrag.kategorie : 'land',
        zuegeFrei: karteZuegeFrei, zustand
    };
}

function karteJetztVerteilen() {
    if (typeof clientConnections === 'undefined') return;
    const nachricht = karteZustandFuerSpieler();
    if (!nachricht) return;
    Object.values(clientConnections).forEach(conn => {
        if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
    });
}

function karteAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    const nachricht = karteZustandFuerSpieler();
    if (nachricht) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
}

// Zugvorschlag eines Spielers für seine eigene Figur - true = verarbeitet
// (auch wenn abgelehnt, damit multiplayer.js nicht weitersucht).
// Nur die eigene Spieler-Figur ist hier zuständig - für alles andere (z.B.
// ein Schiff aus dem Seekampf, das über dieselbe geteilte Karte gezogen wird)
// false zurückgeben, damit multiplayer.js an skAnfrageVerarbeiten weiterreicht
// (dieselbe Nachricht, andere Figuren-ID-Namensräume, siehe seekampf.js).
function karteAnfrageVerarbeiten(peerId, payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type !== 'karteZugVorschlag') return false;
    if (!karteMap || payload.karteId !== karteAktivId) return false;
    const eigeneId = 'spieler:' + peerId;
    if (payload.figurId !== eigeneId) return false;
    karteMap.addFigur({ id: eigeneId, geplantX: payload.x, geplantY: payload.y });
    renderKarteGm();
    return true;
}

// --- GM-Oberfläche --------------------------------------------------------------

function karteFigurZeileHtml(f) {
    return `
        <div class="sk-marker-zeile" style="justify-content:space-between; flex-wrap:nowrap;">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"><span class="sk-farbpunkt" style="background:${escapeHtml(f.farbe || '#9ca3af')}"></span> ${escapeHtml(f.name)}</span>
            <span style="display:flex; gap:0.3rem; flex-shrink:0;">
                <button class="sk-badge-groesse" onclick="karteMap.setFigurGroesse('${escapeHtml(f.id)}', ${(f.groesse || 1) - 0.5}); renderKarteGm();" title="Kleiner">−</button>
                <button class="sk-badge-groesse" onclick="karteMap.setFigurGroesse('${escapeHtml(f.id)}', ${(f.groesse || 1) + 0.5}); renderKarteGm();" title="Größer">+</button>
                <button class="x-mini" onclick="karteFigurVerdecktUmschalten('${escapeHtml(f.id)}')" title="${f.verdeckt ? 'Aufdecken' : 'Verstecken (Hinterhalt)'}"><i class="fa-solid ${f.verdeckt ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
                <button class="sk-badge-x" onclick="karteFigurEntfernen('${escapeHtml(f.id)}')" title="Entfernen">×</button>
            </span>
        </div>`;
}

function renderKtRasterWerkzeuge() {
    const box = document.getElementById('kt-raster-werkzeuge');
    if (!box || !karteMap) return;
    const r = karteMap.raster;
    box.innerHTML = `
        <label class="sk-raster-feld">Feldgröße <input type="number" id="kt-raster-groesse" class="sk-input sk-input-schmal" value="${r.rasterGroesse}" min="5"></label>
        <label class="sk-raster-feld">Versatz X <input type="number" id="kt-raster-versatzx" class="sk-input sk-input-schmal" value="${r.rasterVersatzX}"></label>
        <label class="sk-raster-feld">Versatz Y <input type="number" id="kt-raster-versatzy" class="sk-input sk-input-schmal" value="${r.rasterVersatzY}"></label>
        <input type="color" id="kt-raster-farbe" class="sk-mal-farbe" value="#d4a24c" title="Rasterfarbe">
        <label class="hr-check" style="margin:0"><input type="checkbox" id="kt-raster-sichtbar" ${r.rasterSichtbar ? 'checked' : ''}> <span>Raster sichtbar</span></label>
        <label class="hr-check" style="margin:0"><input type="checkbox" id="kt-raster-einrasten" ${r.einrasten ? 'checked' : ''}> <span>Einrasten</span></label>`;
    const anwenden = () => {
        if (!karteMap) return;
        karteMap.setRaster({
            rasterGroesse: parseFloat(document.getElementById('kt-raster-groesse').value) || 50,
            rasterVersatzX: parseFloat(document.getElementById('kt-raster-versatzx').value) || 0,
            rasterVersatzY: parseFloat(document.getElementById('kt-raster-versatzy').value) || 0,
            rasterSichtbar: document.getElementById('kt-raster-sichtbar').checked,
            einrasten: document.getElementById('kt-raster-einrasten').checked
        });
    };
    ['kt-raster-groesse', 'kt-raster-versatzx', 'kt-raster-versatzy', 'kt-raster-sichtbar', 'kt-raster-einrasten'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', anwenden);
    });
    const farbe = document.getElementById('kt-raster-farbe');
    if (farbe) farbe.addEventListener('input', () => karteMap && karteMap.setRaster({ rasterFarbe: farbe.value }));
}

function renderKarteGm() {
    const box = document.getElementById('gm-karte');
    if (!box) return;
    if (typeof eldaraAktiv !== 'function' || !eldaraAktiv()) { box.style.display = 'none'; return; }
    box.style.display = '';

    if (!document.getElementById('kt-canvas')) {
        box.innerHTML = `
            <details class="x-details sk-details" ${karteOffenGm ? 'open' : ''}>
                <summary class="tm-head">
                    <div class="tm-title"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-map"></i> Karte
                        <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('karte')" title="Hilfe zur Karte"></i>
                    </div>
                </summary>
                <div class="sk-karten-werkzeuge">
                    <select id="kt-auswahl" class="sk-input"></select>
                    <select id="kt-kategorie" class="sk-input">${Object.entries(KARTEN_KATEGORIEN).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}</select>
                    <button class="tool-btn" onclick="karteNeuDialog()"><i class="fa-solid fa-plus"></i> Neue Karte</button>
                    <button class="tool-btn" onclick="karteUmbenennenDialog()"><i class="fa-solid fa-pen"></i> Umbenennen</button>
                    <button class="x-mini x-mini-danger" onclick="karteLoeschenBestaetigt()" title="Karte löschen"><i class="fa-solid fa-trash"></i></button>
                </div>
                <div class="sk-karten-werkzeuge">
                    <button class="tool-btn" data-ktwerkzeug="zeigen"><i class="fa-solid fa-arrow-pointer"></i> Zeigen</button>
                    <button class="tool-btn" data-ktwerkzeug="messen"><i class="fa-solid fa-ruler"></i> Messen</button>
                    <button class="tool-btn" data-ktwerkzeug="malen"><i class="fa-solid fa-pen"></i> Zeichnen</button>
                    <button class="tool-btn" data-ktwerkzeug="radieren"><i class="fa-solid fa-eraser"></i> Radieren</button>
                    <button class="tool-btn" data-ktwerkzeug="nebel-auf"><i class="fa-solid fa-cloud"></i> Nebel aufdecken</button>
                    <button class="tool-btn" data-ktwerkzeug="nebel-zu"><i class="fa-solid fa-cloud-sun"></i> Nebel abdecken</button>
                    <select id="kt-mal-art" class="sk-input sk-mal-art" title="Form">
                        <option value="freihand">Freihand</option>
                        <option value="linie">Linie</option>
                        <option value="kreis">Kreis</option>
                        <option value="rechteck">Rechteck</option>
                    </select>
                    <input type="color" id="kt-mal-farbe" class="sk-mal-farbe" value="#a3342b" title="Zeichenfarbe">
                    <button class="tool-btn" onclick="karteMap && karteMap.rueckgaengig()" title="Rückgängig"><i class="fa-solid fa-rotate-left"></i></button>
                    <button class="tool-btn" onclick="karteMap && karteMap.einpassen()"><i class="fa-solid fa-expand"></i> Einpassen</button>
                    <label class="tool-btn" style="margin:0"><i class="fa-solid fa-image"></i> Bild laden<input type="file" accept="image/*" style="display:none" onchange="karteBildHochladen(event)"></label>
                    <button class="tool-btn" onclick="karteBildEntfernen()"><i class="fa-solid fa-image-slash"></i> Bild entfernen</button>
                </div>
                <div id="kt-raster-werkzeuge" class="sk-karten-werkzeuge"></div>
                <div class="sk-karten-werkzeuge">
                    <label class="hr-check" style="margin:0"><input type="checkbox" id="kt-nebel-aktiv"> <span>Nebel des Krieges aktiv</span></label>
                    <button class="tool-btn" onclick="karteNebelFreigeben()" title="Aufgedeckte Bereiche für Spieler freigeben"><i class="fa-solid fa-eye"></i> Für Spieler freigeben</button>
                    <button class="tool-btn" onclick="karteNebelEntwurfVerwerfen()" title="Noch nicht freigegebenen Entwurf verwerfen"><i class="fa-solid fa-eye-slash"></i> Entwurf verwerfen</button>
                    <label class="hr-check" style="margin:0"><input type="checkbox" id="kt-zuege-frei"> <span>Spieler bewegen ohne Bestätigung</span></label>
                </div>
                <canvas id="kt-canvas" class="sk-canvas"></canvas>
                <p class="ir-hint">Spieler-Figuren entstehen automatisch. NSCs kommen über "Auf Karte platzieren" in der NSC-Liste dazu. Nebel: Bereich aufdecken (nur du siehst den Entwurf), dann "Für Spieler freigeben".</p>
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
        const nebelAktivCb = document.getElementById('kt-nebel-aktiv');
        if (nebelAktivCb) nebelAktivCb.addEventListener('change', () => karteNebelUmschalten(nebelAktivCb.checked));
        const zuegeFreiCb = document.getElementById('kt-zuege-frei');
        if (zuegeFreiCb) zuegeFreiCb.addEventListener('change', () => karteZugFreigabeUmschalten(zuegeFreiCb.checked));
        const auswahl = document.getElementById('kt-auswahl');
        if (auswahl) auswahl.addEventListener('change', () => karteWechseln(auswahl.value));
        const kategorieSel = document.getElementById('kt-kategorie');
        if (kategorieSel) kategorieSel.addEventListener('change', () => karteKategorieWaehlen(kategorieSel.value));
        const details = box.querySelector('details');
        if (details) details.addEventListener('toggle', () => {
            karteOffenGm = details.open;
            try { localStorage.setItem(KARTEN_OFFEN_KEY, details.open ? '1' : '0'); } catch (e) { /* egal */ }
            if (details.open && karteMap) karteMap.zeichnen();
        });
    } else {
        karteSpielerFigurenAbgleichen();
    if (typeof skFigurenAbgleichen === 'function') skFigurenAbgleichen();
    }

    const auswahl = document.getElementById('kt-auswahl');
    if (auswahl) {
        auswahl.innerHTML = karten.map(k => `<option value="${escapeHtml(k.id)}" ${k.id === karteAktivId ? 'selected' : ''}>${escapeHtml(k.name)}</option>`).join('');
    }
    const kategorieSel = document.getElementById('kt-kategorie');
    const aktuelleKarte = karten.find(k => k.id === karteAktivId);
    if (kategorieSel && aktuelleKarte) kategorieSel.value = aktuelleKarte.kategorie;
    const nebelAktivCb = document.getElementById('kt-nebel-aktiv');
    if (nebelAktivCb && karteMap) nebelAktivCb.checked = karteMap.istNebelAktiv();
    const zuegeFreiCb = document.getElementById('kt-zuege-frei');
    if (zuegeFreiCb) zuegeFreiCb.checked = karteZuegeFrei;

    const dyn = document.getElementById('kt-dynamic');
    if (!dyn || !karteMap) return;
    const vorschlaege = karteMap.offeneZuege();
    dyn.innerHTML = `
        ${vorschlaege.length ? `<div class="sk-vorschlaege">
            <div class="sk-vorschlaege-titel"><i class="fa-solid fa-route"></i> Offene Zugvorschläge</div>
            ${vorschlaege.map(v => {
                // Gehört der Vorschlag zu einem Seekampf-Schiff, über die
                // spezialisierte Funktion bestätigen (loggt "Zug von X
                // bestätigt." im Seekampf-Log) statt der generischen.
                const istSchiff = typeof skEinheit === 'function' && skEinheit(v.id);
                const bestaetigenFn = istSchiff && typeof skZugBestaetigen === 'function' ? 'skZugBestaetigen' : 'karteZugBestaetigen';
                const verwerfenFn = istSchiff && typeof skZugVerwerfen === 'function' ? 'skZugVerwerfen' : 'karteZugVerwerfen';
                return `<div class="sk-vorschlag-zeile">
                <span>${escapeHtml(v.name)} → ${v.felder} Feld${v.felder === 1 ? '' : 'er'}</span>
                <button class="sk-mini-btn" onclick="${bestaetigenFn}('${escapeHtml(v.id)}')"><i class="fa-solid fa-check"></i> Bestätigen</button>
                <button class="sk-mini-btn" onclick="${verwerfenFn}('${escapeHtml(v.id)}')"><i class="fa-solid fa-xmark"></i> Verwerfen</button>
            </div>`;
            }).join('')}
        </div>` : ''}
        <div class="sk-marker-zeile">
            <input type="text" id="kt-marker-name" class="sk-input" placeholder="Markierung benennen …" onkeydown="if(event.key==='Enter') karteMarkierungHinzufuegen()">
            <button class="sk-mini-btn" onclick="karteMarkierungHinzufuegen()"><i class="fa-solid fa-location-dot"></i> Markierung setzen</button>
        </div>
        <div class="sk-einheiten-liste">
            ${karteMap.figuren.length ? karteMap.figuren.map(f => karteFigurZeileHtml(f)).join('') : '<p class="x-leer">Noch keine Figuren auf der Karte.</p>'}
        </div>`;
}

// --- Spieler --------------------------------------------------------------

let karteSpielerMap = null;
let karteSpielerOffen = true;
let karteSpielerLetzte = null;  // letzte empfangene Nachricht ({karteId, name, kategorie, zuegeFrei, zustand})

function karteEmpfangen(payload) {
    karteSpielerLetzte = payload;
    // Erst rendern (legt karteSpielerMap beim allerersten Empfang erst an),
    // danach den Kartenzustand anwenden - sonst geht der erste Sync ins Leere
    // (gleiche Reihenfolge wie bei skEmpfangen in seekampf.js).
    renderKarteSpieler();
    if (karteSpielerMap && payload.zustand) {
        karteSpielerMap.setBestaetigung(!payload.zuegeFrei);
        karteSpielerMap.applyState(karteZustandFuerAnwenden(payload.zustand), payload.zustand.bild);
        const meinPeer = typeof peer !== 'undefined' && peer ? peer.id : null;
        const meineFigur = meinPeer && karteSpielerMap.figuren.find(f => f.besitzer === meinPeer);
        const meinBild = typeof appData !== 'undefined' && typeof safeImageSrc === 'function' ? safeImageSrc(appData.portrait) : null;
        if (meineFigur && meinBild && meinBild !== 'assets/giphy.gif') karteSpielerMap.setFigurBild(meineFigur.id, meinBild);
    }
}

function karteSpielerBeitritt() {
    karteSpielerLetzte = null;
    renderKarteSpieler();
}

function karteSpielerGetrennt() {
    karteSpielerLetzte = null;
    renderKarteSpieler();
}

function karteNachrichtVerarbeiten(payload) {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.type === 'karte') { karteEmpfangen(payload); return true; }
    return false;
}

function renderKarteSpieler() {
    const section = document.getElementById('karte-section');
    if (!section) return;
    const verbunden = typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
    if (!verbunden || (typeof isGmMode !== 'undefined' && isGmMode) || typeof eldaraAktiv !== 'function' || !eldaraAktiv() || !karteSpielerLetzte) {
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
                </div>
                <canvas id="kt-spieler-canvas" class="sk-canvas"></canvas>
                <p class="ir-hint">Dein Zug erscheint beim Spielleiter erst als Vorschlag, den er bestätigt oder verwirft - außer er hat freie Bewegung erlaubt.</p>
            </details>`;
        const canvas = document.getElementById('kt-spieler-canvas');
        karteSpielerMap = BattleMap.create(canvas, {
            einheit: 1, einheitName: 'm',
            bestaetigungNoetig: true,
            nebelDeckend: true,
            onZugVorschlag: (figur) => {
                if (typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open && karteSpielerLetzte) {
                    try { hostConnection.send({ type: 'karteZugVorschlag', karteId: karteSpielerLetzte.karteId, figurId: figur.id, x: figur.geplantX, y: figur.geplantY }); } catch (e) { /* weg */ }
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
            karteSpielerMap.setBestaetigung(!karteSpielerLetzte.zuegeFrei);
            karteSpielerMap.applyState(karteZustandFuerAnwenden(karteSpielerLetzte.zustand), karteSpielerLetzte.zustand.bild);
        }
    }

    const badge = document.getElementById('kt-spieler-name-badge');
    if (badge) {
        const kat = KARTEN_KATEGORIEN[karteSpielerLetzte.kategorie];
        badge.innerHTML = `<span class="x-count" style="font-size:0.7rem"><i class="fa-solid ${kat ? kat.icon : 'fa-map'}"></i> ${escapeHtml(karteSpielerLetzte.name || '')}</span>`;
    }
}
