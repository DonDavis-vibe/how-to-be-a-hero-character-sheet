// How to be a Hero - PenNodePaper-Brücke
//
// Verbindet das SL-Dashboard mit PenNodePaper (https://github.com/Rec0iL/PenNodePaper),
// einem KI-gestützten Welten- und Story-Baukasten für Pen & Paper. PenNodePaper
// bereitet Inhalte vor (Handouts, NSCs, Musik-Stichworte) und schiebt sie
// über eine WebSocket-Verbindung ins Dashboard; HeroHQ übersetzt sie in die
// eigenen Module. Nichts davon geht automatisch an die Spieler - alles landet
// zuerst beim SL (NSC-Liste, Handout-Bibliothek), nur was
// PenNodePaper ausdrücklich "aufdecken" lässt, wird gezeigt.
//
// Protokoll: PenNodePaper docs/vtt-bridge-spec.md (Version 1). Kurzfassung:
//   VTT -> PNP   hello (Profil: was wir empfangen können, wie unsere Bögen aussehen)
//   PNP -> VTT   push { kind: handout | scene | character | music_cue } -> result
//                request { what: tracks | party }                       -> result
//   VTT -> PNP   party (unaufgefordert, wenn sich die Gruppe ändert)
//
// Zuordnung:
//   handout    -> Handout-Bibliothek (handouts.js); reveal/to zeigt sie sofort
//   character  -> NSC-Liste (nscliste.js)
//   music_cue  -> Soundboard (multiplayer.js: sendGmSound). Die Titel kommen aus
//                 dem Dropdown des Soundboards, PenNodePaper schickt keine Audiodaten
//   party      -> die verbundenen Spieler-Bögen (connectedPlayersData), nur
//                 öffentliche Felder - keine Notizen, kein Quest-Log
//   scene      -> wird (noch) nicht unterstützt: dieses Tool hat keine Karte
//
// Die Verbindung läuft nur im SL-Modus und baut sich nach einem Reload selbst
// wieder auf, solange der SL sie nicht ausdrücklich getrennt hat.

const PNP_KEY = 'htbah_pnp_link';
const PNP_STANDARD_URL = 'ws://127.0.0.1:4317/bridge';
const PNP_PROTOKOLL = 1;
const PNP_PARTY_INTERVALL_MS = 1500;

// Vorschläge für die Felder (PenNodePaper zeigt sie als Auswahlliste; eigene Werte bleiben möglich).
// Die Haltungen treffen die Farben der NSC-Liste (nscHaltungTon in nscliste.js): grün / grau / rot.
const PNP_HALTUNGEN = ['freundlich', 'hilfsbereit', 'zugewandt', 'verbündet', 'treu', 'neutral', 'neugierig', 'ängstlich', 'gleichgültig', 'argwöhnisch', 'ablehnend', 'feindselig'];
const PNP_ROLLEN = ['Wirt / Wirtin', 'Händler', 'Schmuggler', 'Kapitän', 'Steuermann', 'Matrose', 'Schiffsarzt', 'Pirat', 'Soldat', 'Stadtwache', 'Adliger', 'Gelehrter', 'Heiler', 'Priester', 'Zauberer', 'Dieb', 'Söldner', 'Fischer', 'Handwerker', 'Bettler'];
const PNP_BRUECKEN_VERSION = '1.0';   // das Tool hat keine eigene Versionsnummer - Stand der Brücke

let pnpLink = null;            // { reportParty, close }
let pnpStatus = 'getrennt';    // 'getrennt' | 'verbinde' | 'verbunden'
let pnpKampagne = '';
let pnpPartySignatur = '';
let pnpPartyTimer = null;
const pnpPortraitCache = {};   // Party-ID -> { quelle, upf }

// --- Protokoll-Client ---------------------------------------------------------
// Klassische-Script-Fassung von PenNodePaper docs/pnp-bridge-client.js (die Datei
// dort ist ein ES-Modul; HeroHQ läuft ohne Bundler auch direkt von file://).

function pnpClientStarten({ url, token, profile, onPush, onRequest, onStatus }) {
    let ws = null, geschlossen = false, versuche = 0, timer = null;
    const senden = (m) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(m)); };
    const trenner = url.includes('?') ? '&' : '?';

    function oeffnen() {
        onStatus('connecting');
        try { ws = new WebSocket(`${url}${trenner}token=${encodeURIComponent(token)}`); }
        catch (e) { geschlossen = true; onStatus('closed', { reason: 'Ungültige Adresse' }); return; }
        ws.onopen = () => senden({ t: 'hello', protocol: PNP_PROTOKOLL, profile });
        ws.onmessage = async (e) => {
            let m;
            try { m = JSON.parse(e.data); } catch (err) { return; }
            if (m.t === 'welcome') { versuche = 0; onStatus('connected', { campaign: m.campaign }); return; }
            if (m.t !== 'push' && m.t !== 'request') return;
            try {
                const data = m.t === 'push' ? await onPush(m.kind, m.payload) : await onRequest(m.what);
                senden({ t: 'result', id: m.id, ok: true, data });
            } catch (err) {
                senden({ t: 'result', id: m.id, ok: false, error: err instanceof Error ? err.message : String(err) });
            }
        };
        ws.onclose = (e) => {
            ws = null;
            if (geschlossen) return onStatus('closed');
            if (e.code === 1008) { geschlossen = true; return onStatus('closed', { reason: e.reason || 'Protokoll passt nicht' }); }
            const warte = Math.min(30000, 2000 * 2 ** versuche++);
            onStatus('connecting', { retryInMs: warte });
            timer = setTimeout(oeffnen, warte);
        };
        ws.onerror = () => {};
    }

    oeffnen();
    return {
        reportParty(characters) { senden({ t: 'party', characters }); },
        close() { geschlossen = true; clearTimeout(timer); if (ws) ws.close(); }
    };
}

// --- Profil: was HeroHQ empfangen kann und wie die Bögen aufgebaut sind -----

function pnpProfil() {
    const liste = (key, label, item, group) => ({ key, label, type: 'list', group, item });
    const text = (key, label, group, extra) => Object.assign({ key, label, type: 'text', group }, extra || {});
    const zahl = (key, label, group, extra) => Object.assign({ key, label, type: 'number', group }, extra || {});
    return {
        id: 'herohq',
        name: 'HeroHQ (How to be a Hero)',
        version: PNP_BRUECKEN_VERSION,
        protocol: PNP_PROTOKOLL,
        push: {
            handout: { text: true, image: true, toPlayer: true },
            character: {},
            music_cue: { tracks: true, mood: true }
        },
        provides: { party: true },
        requests: ['tracks', 'party'],
        images: { maxBytes: 8000000, formats: ['png', 'jpg', 'webp'] },
        characters: {
            roles: [
                {
                    id: 'nsc',
                    label: 'NSC / Gegner',
                    description: 'Eintrag der NSC-Liste des Spielleiters (Gedächtnisstütze, kein Charakterbogen: das Regelwerk kennt keine Gegnerbögen). Gegner sind ebenfalls NSC-Einträge. Ein Porträt wird nicht gespeichert.',
                    for: ['npc', 'enemy'],
                    fields: [
                        text('ort', 'Ort', 'Auftreten'),
                        text('rolle', 'Rolle', 'Auftreten', { suggestions: PNP_ROLLEN, help: 'was er tut, z.B. Wirtin, Schmuggler, Schiffsarzt' }),
                        text('haltung', 'Haltung', 'Auftreten', { suggestions: PNP_HALTUNGEN, help: 'gegenüber der Gruppe' }),
                        text('auffaelligkeit', 'Auffälligkeit', 'Auftreten', { help: 'woran man ihn erkennt' }),
                        text('motivation', 'Motivation', 'Auftreten'),
                        text('wesen', 'Wesen / Art', 'Auftreten', { suggestions: ['Mensch', 'Zwerg', 'Elf', 'Ork', 'Halbling', 'Untoter', 'Dämon', 'Tier'], help: 'Volk oder Art, falls es eine Rolle spielt' })
                    ]
                },
                {
                    id: 'pc',
                    label: 'Spielercharakter',
                    description: 'Der Bogen eines verbundenen Spielers (nur lesend; öffentliche Felder, ohne Notizen und Quest-Log).',
                    for: ['pc'],
                    portrait: true,
                    fields: [
                        text('beruf', 'Beruf', 'Person'),
                        text('alter', 'Alter', 'Person'),
                        text('statur', 'Statur', 'Person'),
                        text('geschlecht', 'Geschlecht', 'Person'),
                        zahl('hpCurrent', 'Lebenspunkte', 'Gesundheit'),
                        zahl('hpMax', 'Max. Lebenspunkte', 'Gesundheit'),
                        zahl('attr_handeln', 'Handeln', 'Basiswerte'),
                        zahl('attr_wissen', 'Wissen', 'Basiswerte'),
                        zahl('attr_soziales', 'Soziales', 'Basiswerte'),
                        liste('skills_handeln', 'Talente Handeln', [text('name', 'Name'), zahl('invested', 'Punkte')], 'Talente'),
                        liste('skills_wissen', 'Talente Wissen', [text('name', 'Name'), zahl('invested', 'Punkte')], 'Talente'),
                        liste('skills_soziales', 'Talente Soziales', [text('name', 'Name'), zahl('invested', 'Punkte')], 'Talente'),
                        liste('inventory', 'Inventar', [text('name', 'Name'), text('description', 'Beschreibung')], 'Ausrüstung'),
                        liste('weapons', 'Waffen', [text('name', 'Name'), text('damage', 'Schaden'), text('description', 'Beschreibung')], 'Ausrüstung'),
                        liste('statuses', 'Status', [text('name', 'Name'), text('value', 'Wert'), text('type', 'Art (bonus/malus/neutral)')], 'Zustand'),
                        text('waehrung', 'Währung', 'Ausrüstung'),
                        zahl('geld', 'Geld', 'Ausrüstung')
                    ]
                }
            ]
        }
    };
}

// --- Hilfsfunktionen ----------------------------------------------------------

function pnpSlug(s) {
    return String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'x';
}

function pnpBlob(upfBild) {
    const bin = atob(upfBild.b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: upfBild.mime || 'image/png' });
}

function pnpBildPruefen(upfBild, wo) {
    if (!upfBild || typeof upfBild.b64 !== 'string' || !upfBild.b64) throw new Error(`${wo}: image missing`);
}

// Verkleinert ein Bild vor der Übertragung - sonst wird die Datenmenge für eine
// Peer-to-Peer-Verbindung schnell unhandlich. Gibt eine JPEG-Data-URL zurück.
function pnpBildVerkleinern(blob, maxKante, qualitaet) {
    return new Promise((erfuellen, ablehnen) => {
        const leser = new FileReader();
        leser.onerror = () => ablehnen(new Error('image could not be read'));
        leser.onload = () => {
            const bild = new Image();
            bild.onerror = () => ablehnen(new Error('image could not be decoded'));
            bild.onload = () => {
                const skala = Math.min(1, maxKante / Math.max(bild.width, bild.height));
                const flaeche = document.createElement('canvas');
                flaeche.width = Math.round(bild.width * skala);
                flaeche.height = Math.round(bild.height * skala);
                flaeche.getContext('2d').drawImage(bild, 0, 0, flaeche.width, flaeche.height);
                erfuellen(flaeche.toDataURL('image/jpeg', qualitaet));
            };
            bild.src = leser.result;
        };
        leser.readAsDataURL(blob);
    });
}

// Spieler-Porträt (Data-URL) -> quadratisches UpfImage für PenNodePaper
function pnpPortraitKlein(dataUrl, kante) {
    return new Promise(erfuellen => {
        const bild = new Image();
        bild.onerror = () => erfuellen(null);
        bild.onload = () => {
            const seite = Math.min(bild.width, bild.height);
            const flaeche = document.createElement('canvas');
            flaeche.width = flaeche.height = kante;
            flaeche.getContext('2d').drawImage(bild, (bild.width - seite) / 2, (bild.height - seite) / 2, seite, seite, 0, 0, kante, kante);
            const url = flaeche.toDataURL('image/jpeg', 0.8);
            erfuellen({ name: 'portrait.jpg', mime: 'image/jpeg', b64: url.slice(url.indexOf(',') + 1) });
        };
        bild.src = dataUrl;
    });
}

function pnpSpielerAnzeigeName(d) {
    return [d.vorname, d.name].filter(Boolean).join(' ') || 'Spieler';
}

// Stabile Party-ID: bleibt über Sitzungen gleich (die PeerJS-ID tut das nicht)
function pnpSpielerId(d) {
    return 'pc-' + pnpSlug(pnpSpielerAnzeigeName(d));
}

function pnpPeerFuerSpieler(id) {
    const daten = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData : {};
    const gesucht = String(id).toLowerCase();
    return Object.keys(daten).find(peerId =>
        peerId === id || pnpSpielerId(daten[peerId]) === id || pnpSpielerAnzeigeName(daten[peerId]).toLowerCase() === gesucht) || null;
}

// --- Party: die Bögen der verbundenen Spieler ---------------------------------

function pnpPartySheet(d) {
    const liste = (a, felder) => (Array.isArray(a) ? a : []).map(e => {
        const o = {};
        felder.forEach(f => { if (e && e[f] !== undefined && e[f] !== '') o[f] = e[f]; });
        return o;
    }).filter(o => Object.keys(o).length);
    const waehrung = d.currency || {};
    const sheet = {
        beruf: d.beruf, alter: d.alter, statur: d.statur, geschlecht: d.geschlecht,
        hpCurrent: Number(d.hpCurrent), hpMax: Number(d.hpMax),
        attr_handeln: Number(d.attr_handeln) || 0, attr_wissen: Number(d.attr_wissen) || 0, attr_soziales: Number(d.attr_soziales) || 0,
        skills_handeln: liste(d.skills_handeln, ['name', 'invested']),
        skills_wissen: liste(d.skills_wissen, ['name', 'invested']),
        skills_soziales: liste(d.skills_soziales, ['name', 'invested']),
        inventory: liste(d.inventory, ['name', 'description']),
        weapons: liste(d.weapons, ['name', 'damage', 'description']),
        statuses: liste(d.statuses, ['name', 'value', 'type']),
        waehrung: waehrung.name, geld: waehrung.amount !== undefined ? Number(waehrung.amount) : undefined
    };
    Object.keys(sheet).forEach(k => { if (sheet[k] === undefined || sheet[k] === '' || Number.isNaN(sheet[k])) delete sheet[k]; });
    return sheet;
}

function pnpPartyOhneBild() {
    const daten = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData : {};
    const verbindungen = typeof clientConnections !== 'undefined' ? clientConnections : {};
    return Object.keys(daten).map(peerId => {
        const d = daten[peerId];
        return {
            id: pnpSpielerId(d), role: 'pc', name: pnpSpielerAnzeigeName(d), playerName: pnpSpielerAnzeigeName(d),
            online: !!(verbindungen[peerId] && verbindungen[peerId].open), sheet: pnpPartySheet(d), _bild: d.portrait
        };
    });
}

async function pnpPartyBauen() {
    const gruppe = pnpPartyOhneBild();
    for (const c of gruppe) {
        const quelle = c._bild;
        delete c._bild;
        if (typeof quelle !== 'string' || !quelle.startsWith('data:image/')) continue;
        const gemerkt = pnpPortraitCache[c.id];
        if (!gemerkt || gemerkt.quelle !== quelle) pnpPortraitCache[c.id] = { quelle, upf: await pnpPortraitKlein(quelle, 256) };
        if (pnpPortraitCache[c.id].upf) c.portrait = pnpPortraitCache[c.id].upf;
    }
    return gruppe;
}

// Fingerabdruck der Gruppe (Porträts nur grob, sie sind groß) - ändert er sich, melden wir sie
function pnpPartyFingerabdruck() {
    return JSON.stringify(pnpPartyOhneBild().map(c => Object.assign({}, c, {
        _bild: typeof c._bild === 'string' ? c._bild.length + c._bild.slice(-24) : null
    })));
}

function pnpPartyBeobachten() {
    clearInterval(pnpPartyTimer);
    pnpPartyTimer = setInterval(async () => {
        if (pnpStatus !== 'verbunden' || !pnpLink) return;
        const stand = pnpPartyFingerabdruck();
        if (stand === pnpPartySignatur) return;
        pnpPartySignatur = stand;
        pnpLink.reportParty(await pnpPartyBauen());
    }, PNP_PARTY_INTERVALL_MS);
}

// --- Handout ------------------------------------------------------------------

async function pnpHandout(p) {
    if (!p || !p.id) throw new Error('handout: id missing');
    if (typeof handoutHinzufuegen !== 'function') throw new Error('handouts.js not loaded');
    let bild = null;
    if (p.kind === 'image') {
        pnpBildPruefen(p.image, 'handout');
        bild = await pnpBildVerkleinern(pnpBlob(p.image), 1600, 0.8);
    } else if (!p.text) {
        throw new Error('handout: text missing');
    }
    const h = handoutHinzufuegen({ id: 'pnp:' + p.id, titel: p.title, text: p.text, bild });
    if (p.to) {
        const peerId = pnpPeerFuerSpieler(p.to);
        if (!peerId) throw new Error(`Player "${p.to}" is not connected. The handout is in the GM's handout library.`);
        return { shownTo: handoutZeigen(h.id, [peerId]) };
    }
    if (p.reveal) return { shownTo: handoutZeigen(h.id) };
    return { shownTo: 0, library: true };
}

// --- Figur -> NSC-Liste ---------------------------------------------

async function pnpFigur(c) {
    if (!c || !c.id) throw new Error('character: id missing');
    if (c.role !== 'nsc') throw new Error(`Unknown role "${c.role}" - HeroHQ receives: nsc`);
    if (typeof nscListe === 'undefined') throw new Error('nscliste.js not loaded');
    const s = c.sheet || {};
    const id = 'nsc_pnp_' + pnpSlug(c.id);
    const kuerzen = (v, n) => String(v === undefined || v === null ? '' : v).slice(0, n);

    let eintrag = nscListe.find(n => n.id === id);
    const neu = !eintrag;
    if (neu) eintrag = { id };
    Object.assign(eintrag, {
        name: kuerzen(c.name || 'Unbenannt', 120), ort: kuerzen(s.ort, 120), rolle: kuerzen(s.rolle, 120),
        haltung: kuerzen(s.haltung, 120), auffaelligkeit: kuerzen(s.auffaelligkeit, 300),
        motivation: kuerzen(s.motivation, 300), wesen: kuerzen(s.wesen, 300), notiz: kuerzen(c.notes, 2000)
    });
    if (neu) nscListe = [eintrag].concat(nscListe);
    nscListeSichern();
    if (typeof renderNscListeGm === 'function') renderNscListeGm();
    if (typeof renderNetzwerkGm === 'function') renderNetzwerkGm();
    if (typeof nscListeAndereAnsichtenAktualisieren === 'function') nscListeAndereAnsichtenAktualisieren();
    return { npcList: neu ? 'added' : 'updated' };
}

// --- Musik -> Soundboard ------------------------------------------------------

// Die Titel kommen aus dem Dropdown des Soundboards - eine Quelle der Wahrheit, keine zweite Liste.
function pnpTracks() {
    const auswahl = document.getElementById('gm-sound-select');
    const tracks = [];
    if (auswahl) {
        auswahl.querySelectorAll('option').forEach(o => tracks.push({
            id: o.value, title: o.textContent.trim(), category: (o.parentElement.label || '').trim(), uploaded: false
        }));
    }
    if (typeof customSoundCache !== 'undefined' && customSoundCache) {
        tracks.push({ id: '_eigener', title: customSoundCache.name, category: 'Eigener Sound', uploaded: true });
    }
    return tracks;
}

// Stimmungen, die PenNodePaper frei formuliert, auf Tracks des Soundboards
const PNP_STIMMUNGEN = [
    [/tens|suspens|dread|ominous|unheimlich|bedroh/, 'tension'],
    [/myster|invest|ermittl|geheimnis|r(ä|ae)tsel/, 'music_mystery'],
    [/horror|creep|gruse|grus|spook|gespenst/, 'music_horror'],
    [/explor|travel|wander|erkund|reise|calm|ruhig|peace/, 'music_exploration'],
    [/triumph|victor|sieg|celebrat|feier/, 'music_triumph'],
    [/sad|sorrow|mourn|trauer|traurig|melanchol/, 'sad'],
    [/tavern|inn\b|kneipe|wirtshaus|taverne/, 'medieval'],
    [/saloon|western/, 'music_western'],
    [/boss|epic|climax|finale/, 'boss'],
    [/battle|combat|fight|kampf|action/, 'combat']
];

function pnpMusik(p) {
    if (!p) throw new Error('music_cue: payload missing');
    if (typeof sendGmSound !== 'function') throw new Error('soundboard not available');
    if (p.action === 'stop') { sendGmFadeOutSound(); return { stopped: true }; }
    if (p.action !== 'play') throw new Error(`music_cue: unknown action "${p.action}"`);

    const tracks = pnpTracks();
    let track = p.trackId ? tracks.find(t => t.id === p.trackId) : null;
    if (p.trackId && !track) throw new Error(`Unknown track "${p.trackId}". Request "tracks" for the list.`);
    if (!track && p.mood) {
        const treffer = PNP_STIMMUNGEN.find(([muster]) => muster.test(String(p.mood).toLowerCase()));
        track = treffer ? tracks.find(t => t.id === treffer[1]) : null;
    }
    if (!track) throw new Error('No trackId and the mood matches no track. Pick a trackId from the "tracks" list.');

    if (track.id === '_eigener') { sendCustomSoundToAll(); return { playing: track.title }; }
    // Musik und Kulissen laufen auf Schleife bis Ausfaden/Stop (wie der Schleifen-Knopf am Soundboard); die Wahl des SL bleibt unberührt
    const schleife = track.category === 'Musik' || track.category.startsWith('Atmosph');
    const vorher = gmSoundLoop;
    gmSoundLoop = vorher || schleife;
    try { sendGmSound(track.id); } finally { gmSoundLoop = vorher; }
    return { playing: track.title };
}

// --- Verbindung & Oberfläche ---------------------------------------------------

function pnpEinstellungenLesen() {
    try {
        const roh = JSON.parse(localStorage.getItem(PNP_KEY) || 'null');
        return roh && typeof roh === 'object' ? roh : {};
    } catch (e) { return {}; }
}

function pnpEinstellungenSichern(werte) {
    sicherSpeichern(PNP_KEY, JSON.stringify(Object.assign(pnpEinstellungenLesen(), werte)));
}

function pnpVerbinden(url, token, automatisch) {
    pnpTrennen(true);
    url = (url || '').trim() || PNP_STANDARD_URL;
    token = (token || '').trim();
    if (!token) { pnpStatusSetzen('getrennt', 'Pairing-Token fehlt'); return; }
    pnpEinstellungenSichern({ url, token, auto: true });
    pnpStatusSetzen('verbinde');
    pnpLink = pnpClientStarten({
        url, token, profile: pnpProfil(),
        onPush: async (kind, payload) => {
            if (kind === 'handout') return pnpHandout(payload);
            if (kind === 'character') return pnpFigur(payload);
            if (kind === 'music_cue') return pnpMusik(payload);
            throw new Error(`Unsupported push "${kind}"`);
        },
        onRequest: async (was) => {
            if (was === 'tracks') return pnpTracks();
            if (was === 'party') {
                pnpPartySignatur = pnpPartyFingerabdruck();
                return pnpPartyBauen();
            }
            throw new Error(`Unsupported request "${was}"`);
        },
        onStatus: (s, info) => {
            if (s === 'connected') { pnpKampagne = (info && info.campaign) || ''; pnpStatusSetzen('verbunden'); }
            else if (s === 'connecting') pnpStatusSetzen('verbinde', info && info.retryInMs ? 'Neuer Versuch in ' + Math.round(info.retryInMs / 1000) + ' s' : '');
            else pnpStatusSetzen('getrennt', info && info.reason);
        }
    });
    pnpPartyBeobachten();
    if (!automatisch && typeof addGmLogSystemMessage === 'function') addGmLogSystemMessage('PenNodePaper-Verbindung wird aufgebaut ...');
}

// ausdruecklich = der SL hat getrennt (dann kein Auto-Reconnect nach dem nächsten Reload)
function pnpTrennen(intern, ausdruecklich) {
    clearInterval(pnpPartyTimer);
    if (pnpLink) { pnpLink.close(); pnpLink = null; }
    pnpPartySignatur = '';
    if (ausdruecklich) pnpEinstellungenSichern({ auto: false });
    if (!intern) pnpStatusSetzen('getrennt');
}

function pnpStatusSetzen(status, hinweis) {
    pnpStatus = status;
    const knopf = document.getElementById('pnp-toolbar-status');
    if (knopf) {
        knopf.dataset.status = status;
        knopf.title = status === 'verbunden' ? 'Mit PenNodePaper verbunden' + (pnpKampagne ? ': ' + pnpKampagne : '') : status === 'verbinde' ? 'Verbinde ...' : 'Nicht verbunden';
    }
    const zeile = document.getElementById('pnp-status-zeile');
    if (zeile) {
        const text = status === 'verbunden' ? `Verbunden${pnpKampagne ? ' - Kampagne „' + pnpKampagne + '“' : ''}`
            : status === 'verbinde' ? 'Verbinde ...' : 'Nicht verbunden';
        zeile.textContent = text + (hinweis ? ' (' + hinweis + ')' : '');
        zeile.dataset.status = status;
    }
    const an = document.getElementById('pnp-verbinden-btn');
    if (an) an.innerHTML = status === 'getrennt' ? '<i class="fa-solid fa-plug"></i> Verbinden' : '<i class="fa-solid fa-plug-circle-xmark"></i> Trennen';
}

function pnpOeffnen() {
    let overlay = document.getElementById('pnp-modal-overlay');
    const e = pnpEinstellungenLesen();
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'pnp-modal-overlay';
        overlay.className = 'help-modal-overlay';
        overlay.innerHTML = `
            <div class="help-modal-box pnp-modal" role="dialog" aria-label="PenNodePaper-Verbindung">
                <button class="modal-close" aria-label="Schließen"><i class="fa-solid fa-xmark"></i></button>
                <h3 style="color: var(--color-accent); margin-top: 0;"><i class="fa-solid fa-diagram-project"></i> PenNodePaper</h3>
                <p class="hr-hint" style="margin-top:0">Verbindet dieses Dashboard mit <a href="https://github.com/Rec0iL/PenNodePaper" target="_blank" rel="noopener">PenNodePaper</a>. Dort unter ⚙ Einstellungen → <i>VTT link</i> stehen Adresse und Pairing-Token. Handouts, Karten, NSCs und Musik-Stichworte landen zuerst bei dir; die Spieler sehen nur, was du zeigst.</p>
                <label class="pnp-feld">Adresse <input type="text" id="pnp-url" autocomplete="off" spellcheck="false"></label>
                <label class="pnp-feld">Pairing-Token <input type="password" id="pnp-token" autocomplete="off" spellcheck="false"></label>
                <div class="pnp-fuss">
                    <button id="pnp-verbinden-btn" class="tool-btn" type="button"></button>
                    <span id="pnp-status-zeile" class="pnp-status-zeile"></span>
                </div>
                <p class="hr-hint">Musik: PenNodePaper wählt Titel aus deinem Soundboard (auch deine „Musik“-Gruppe). Audiodateien schickt es nicht.</p>
            </div>`;
        overlay.addEventListener('click', ev => { if (ev.target === overlay) overlay.classList.remove('active'); });
        overlay.querySelector('.modal-close').addEventListener('click', () => overlay.classList.remove('active'));
        overlay.querySelector('#pnp-verbinden-btn').addEventListener('click', () => {
            if (pnpStatus === 'getrennt') pnpVerbinden(document.getElementById('pnp-url').value, document.getElementById('pnp-token').value);
            else pnpTrennen(false, true);
        });
        document.body.appendChild(overlay);
    }
    document.getElementById('pnp-url').value = e.url || PNP_STANDARD_URL;
    document.getElementById('pnp-token').value = e.token || '';
    pnpStatusSetzen(pnpStatus);
    overlay.classList.add('active');
}

// Aus multiplayer.js: enterGmMode / exitGmMode
function pnpGmStart() {
    const e = pnpEinstellungenLesen();
    if (e.auto && e.token && pnpStatus === 'getrennt') pnpVerbinden(e.url, e.token, true);
    else pnpStatusSetzen(pnpStatus);
}

function pnpGmStop() {
    pnpTrennen(false);
}
