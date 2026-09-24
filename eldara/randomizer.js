// How to be a Hero - Zufallsgenerator (SL-Vorbereitungswerkzeug)
//
// Reiner Prep-Helfer für den Spielleiter: Namen, Orte, Gegenstände, NSC-Bausteine
// und Begegnungen würfeln. Läuft komplett lokal beim SL, geht nie automatisch an
// Spieler raus - Ergebnisse landen erst dann bei der Runde, wenn der SL sie
// bewusst weiterreicht (z.B. "In Tischmitte legen", dort dann ganz normal über
// Aufdecken sichtbar machen).
//
// Datenpakete liegen in randomizer/<id>.js und werden erst beim ersten Öffnen
// des Panels nachgeladen (wie hausregeln.js es mit Regelpaketen macht). Ein
// Paket ruft randomizerPaketRegistrieren({...}) auf; das Format steht in
// DATA_FORMAT.md. Drei Pakete sind eingebaut:
//   - original: setting-neutrale Namen/Orte/Items/NSC-Bausteine/Begegnungen
//   - piraten:  generisches Piraten-Flair (kein Eldara-Kanon)
//   - eldora:   kanonische Eldara-Inhalte, inkl. Wesen-Liste und den
//               "Besonderen Eigenschaften" aus dem Regelwerk (RW 4.1 S.18f) -
//               dort rein als Flavor-Text für den NSC-Generator, NICHT an die
//               Talentbaum-Punkte-Ökonomie angebunden (die hängt weiterhin an
//               talentbaum.js / hausregeln.js und wird separat überarbeitet).
//
// Das Modul kennt hausregeln.js/talentbaum.js nicht und funktioniert unabhängig
// davon - genau wie jedes der anderen Erweiterungsmodule für sich lauffähig ist.
// Die einzige Berührung mit einem anderen Modul ist optional: "In Tischmitte
// legen" ruft, wenn vorhanden, die Funktionen aus tischmitte.js direkt auf.

const RANDOMIZER_PAKETE_EINGEBAUT = [
    { id: 'original', name: 'Allgemein', datei: 'randomizer/original.js' },
    { id: 'piraten', name: 'Piraten (allgemein)', datei: 'randomizer/piraten.js' },
    { id: 'eldora', name: 'Eldara (kanonisch)', datei: 'randomizer/eldora.js' }
];

const RZ_KATEGORIEN = [
    ['namen', 'Namen'],
    ['npc', 'NSC-Bausteine'],
    ['orte_items', 'Orte & Fundorte'],
    ['begegnungen', 'Begegnungen'],
    ['geruechte', 'Gerüchte'],
    ['items', 'Gegenstände'],
    ['waffen', 'Waffen'],
    ['sonstiges', 'Sonstiges']
];

// Tabellen dieser Kategorien sind "Loot" - ihre Würfelergebnisse lassen sich
// direkt in die Tischmitte legen (siehe rzWuerfelTabelle), Tabellen anderer
// Kategorien (Namen, NSC-Bausteine, Gerüchte, ...) sind reiner Flavor-Text.
const RZ_LOOT_KATEGORIEN = ['items', 'waffen'];

// Rang-Schwellen aus dem Regelwerk (RW 4.1 S.17): welcher Attributwert welchen
// Talentbaum-Rang ergibt. Hier nur für die NSC-Rang-Würfelei genutzt - dieselbe
// Verteilung wie beim echten Talentwert eines Charakters.
const RZ_RANG_STAFFEL = [{ bis: 30, rang: 1 }, { bis: 60, rang: 2 }, { bis: 90, rang: 3 }, { bis: 99, rang: 4 }];

const RANDOMIZER_OFFEN_KEY = 'htbah_gm_randomizer_offen';

const randomizerPaketeGeladen = {};
const randomizerPaketeLadend = {};
let randomizerAlleGeladen = false;
// Prominent in der Dashboard-Mitte statt einer kleinen Seitenleiste - standardmäßig
// aufgeklappt, damit der SL beim Öffnen des Dashboards sofort alle Tabellen sieht.
let randomizerOffen = true;
try {
    const gespeichert = localStorage.getItem(RANDOMIZER_OFFEN_KEY);
    if (gespeichert !== null) randomizerOffen = gespeichert === '1';
} catch (e) { /* egal */ }

let randomizerAktivesPaket = 'eldora';

// Kriterien für "NSC würfeln" - der SL kann jede Achse offen lassen ("Zufällig",
// leerer String bzw. 'zufaellig') oder auf einen konkreten Wert festnageln, wenn
// er einen bestimmten Charakter für seine Runde braucht statt einer Überraschung.
let randomizerNamensquelle = 'eldora'; // 'zufaellig' | 'original' | 'piraten' | 'eldora'
let randomizerNscOrt = '';             // '' = Zufällig, sonst ein "neben"-Wert aus npc_trefforte
let randomizerNscGeschlecht = 'zufaellig'; // 'zufaellig' | 'maennlich' | 'weiblich'
let randomizerNscHaltung = '';         // '' = Zufällig, sonst ein "haupt"-Wert aus npc_haltungen
let randomizerNscWesenModus = 'zufaellig'; // 'zufaellig' (~40%) | 'immer' | 'nie'

let randomizerErgebnisAktuell = null; // { htmlAusgabe, textAusgabe, quelle, attribution?, tischmitteBereit, tischmitteVorlage? }
let randomizerLetzteAktion = null;    // () => void - fürs "Neu würfeln"

function rzZufall(liste) {
    return liste[Math.floor(Math.random() * liste.length)];
}

function rzRangWuerfeln() {
    const wurf = Math.floor(Math.random() * 99) + 1;
    const treffer = RZ_RANG_STAFFEL.find(s => wurf <= s.bis);
    return treffer ? treffer.rang : RZ_RANG_STAFFEL[RZ_RANG_STAFFEL.length - 1].rang;
}

// --- Laden -------------------------------------------------------------------

function randomizerPaketRegistrieren(paket) {
    if (!paket || !paket.id) return;
    randomizerPaketeGeladen[paket.id] = paket;
    const warten = randomizerPaketeLadend[paket.id];
    delete randomizerPaketeLadend[paket.id];
    if (warten) warten.forEach(cb => { try { cb(paket); } catch (e) { console.error(e); } });
}

function randomizerPaketLaden(id, cb) {
    if (randomizerPaketeGeladen[id]) { cb(randomizerPaketeGeladen[id]); return; }
    const info = RANDOMIZER_PAKETE_EINGEBAUT.find(p => p.id === id);
    if (!info) { cb(null); return; }
    if (randomizerPaketeLadend[id]) { randomizerPaketeLadend[id].push(cb); return; }
    randomizerPaketeLadend[id] = [cb];
    const s = document.createElement('script');
    s.src = info.datei;
    s.onerror = () => {
        const warten = randomizerPaketeLadend[id] || [];
        delete randomizerPaketeLadend[id];
        console.error('Zufallsgenerator-Paket konnte nicht geladen werden:', info.datei);
        warten.forEach(w => w(null));
    };
    document.head.appendChild(s);
}

// Lädt alle eingebauten Pakete auf einmal - sie sind winzig (insgesamt ~50KB),
// anders als die Regelpakete in hausregeln.js braucht es hier kein Nachladen
// pro Auswahl.
function randomizerAlleLaden(cb) {
    if (randomizerAlleGeladen) { cb(); return; }
    let offen = RANDOMIZER_PAKETE_EINGEBAUT.length;
    RANDOMIZER_PAKETE_EINGEBAUT.forEach(info => {
        randomizerPaketLaden(info.id, () => {
            offen--;
            if (offen <= 0) { randomizerAlleGeladen = true; cb(); }
        });
    });
}

// --- Würfel-Funktionen ---------------------------------------------------------

// Namenslisten liegen je nach Paket unterschiedlich ab: "original" hat sie als
// Tabellen (tabellen.namen_maennlich.eintraege[].haupt), "eldora" als einfache
// Wortlisten (wortlisten.vornamen_maennlich, reine Strings ohne .eintraege).
function rzNamenlisten(paketId) {
    const p = randomizerPaketeGeladen[paketId];
    if (!p) return null;
    const t = p.tabellen || {};
    const w = p.wortlisten || {};
    const maennlich = t.namen_maennlich ? t.namen_maennlich.eintraege.map(e => e.haupt) : w.vornamen_maennlich;
    const weiblich = t.namen_weiblich ? t.namen_weiblich.eintraege.map(e => e.haupt) : w.vornamen_weiblich;
    const nachnamenListe = t.nachnamen ? t.nachnamen.eintraege.map(e => e.haupt) : w.nachnamen;
    if (!maennlich || !weiblich || !nachnamenListe) return null;
    return { maennlich, weiblich, nachnamen: nachnamenListe };
}

// geschlecht: 'maennlich' | 'weiblich' legt es fest, alles andere (z.B. undefined
// oder 'zufaellig') würfelt es wie bisher 50/50 aus.
function rzNameRoh(paketId, geschlecht) {
    const listen = rzNamenlisten(paketId);
    if (!listen) return null;
    const weiblich = geschlecht === 'weiblich' ? true : geschlecht === 'maennlich' ? false : Math.random() < 0.5;
    const vor = rzZufall(weiblich ? listen.weiblich : listen.maennlich);
    const nach = rzZufall(listen.nachnamen);
    return `${vor} ${nach}`;
}

function rzPiratenNameRoh(geschlecht) {
    const p = randomizerPaketeGeladen.piraten;
    if (!p) return null;
    const weiblich = geschlecht === 'weiblich' ? true : geschlecht === 'maennlich' ? false : Math.random() < 0.5;
    const vor = rzZufall((weiblich ? p.tabellen.vornamen_weiblich : p.tabellen.vornamen_maennlich).eintraege).haupt;
    const nach = rzZufall(p.tabellen.nachnamen.eintraege).haupt;
    let name = `${vor} ${nach}`;
    if (Math.random() < 0.4) name += ` „${rzZufall(p.tabellen.beinamen.eintraege).haupt}"`;
    return name;
}

function rzWuerfelName(paketId) {
    const roh = rzNameRoh(paketId);
    if (!roh) return;
    randomizerErgebnisAktuell = { htmlAusgabe: `<strong>${escapeHtml(roh)}</strong>`, textAusgabe: roh, quelle: 'Zufallsname', tischmitteBereit: false };
    randomizerLetzteAktion = () => rzWuerfelName(paketId);
    renderRandomizerGm();
}

function rzWuerfelPiratenname() {
    const roh = rzPiratenNameRoh();
    if (!roh) return;
    randomizerErgebnisAktuell = { htmlAusgabe: `<strong>${escapeHtml(roh)}</strong>`, textAusgabe: roh, quelle: 'Piratenname', tischmitteBereit: false };
    randomizerLetzteAktion = rzWuerfelPiratenname;
    renderRandomizerGm();
}

// "Einfaches Crewmitglied": erdig/komisch statt legendärer Kapitän, nach dem
// Muster aus dem Piraten-Paket ("der bucklige Bernd" / "Schnürschuh-Bill").
function rzWuerfelCrewErdig() {
    const p = randomizerPaketeGeladen.piraten;
    if (!p || !p.wortlisten) return;
    const w = p.wortlisten;
    let roh;
    if (Math.random() < 0.5) {
        const weiblich = Math.random() < 0.5;
        const vor = rzZufall(weiblich ? w.vornamen_erdig_weiblich : w.vornamen_erdig_maennlich);
        const adj = rzZufall(w.beinamen_adjektiv);
        roh = `${weiblich ? 'die' : 'der'} ${adj} ${vor}`;
    } else {
        const vor = rzZufall(Math.random() < 0.5 ? w.vornamen_erdig_weiblich : w.vornamen_erdig_maennlich);
        roh = `${rzZufall(w.beinamen_praefix)}-${vor}`;
    }
    randomizerErgebnisAktuell = { htmlAusgabe: `<strong>${escapeHtml(roh)}</strong>`, textAusgabe: roh, quelle: 'Einfaches Crewmitglied', tischmitteBereit: false };
    randomizerLetzteAktion = rzWuerfelCrewErdig;
    renderRandomizerGm();
}

function rzWuerfelMagischerGegenstand() {
    const p = randomizerPaketeGeladen.eldora;
    if (!p) return;
    const e = rzZufall(p.tabellen.gegenstaende_magisch.eintraege);
    randomizerErgebnisAktuell = {
        htmlAusgabe: `<strong>${escapeHtml(e.haupt)}</strong>${e.neben ? ` <span class="rz-neben">(${escapeHtml(e.neben)})</span>` : ''}`,
        textAusgabe: e.haupt + (e.neben ? ` (${e.neben})` : ''),
        quelle: 'Magischer Gegenstand (Eldara)',
        tischmitteBereit: true,
        tischmitteVorlage: { art: 'gegenstand', name: e.haupt, description: e.neben || '' }
    };
    randomizerLetzteAktion = rzWuerfelMagischerGegenstand;
    renderRandomizerGm();
}

function rzWuerfelTabelle(paketId, tabelleId) {
    const p = randomizerPaketeGeladen[paketId];
    const t = p && p.tabellen[tabelleId];
    if (!t || !t.eintraege.length) return;
    const e = rzZufall(t.eintraege);
    // Gegenstände/Waffen sind Loot - lassen sich direkt in die Tischmitte legen,
    // reiner Flavor-Text (Namen, NSC-Bausteine, Gerüchte, ...) nicht.
    const istLoot = RZ_LOOT_KATEGORIEN.includes(t.kategorie);
    randomizerErgebnisAktuell = {
        htmlAusgabe: `<strong>${escapeHtml(e.haupt)}</strong>${e.neben ? ` <span class="rz-neben">(${escapeHtml(e.neben)})</span>` : ''}`,
        textAusgabe: e.haupt + (e.neben ? ` (${e.neben})` : ''),
        quelle: t.name,
        attribution: t.attribution,
        tischmitteBereit: istLoot,
        tischmitteVorlage: !istLoot ? undefined : (t.kategorie === 'waffen'
            ? { art: 'waffe', name: e.haupt, damage: e.neben || '' }
            : { art: 'gegenstand', name: e.haupt, description: e.neben || '' })
    };
    randomizerLetzteAktion = () => rzWuerfelTabelle(paketId, tabelleId);
    renderRandomizerGm();
}

// Liefert alle einzigartigen Orte aus npc_trefforte (für das "Ort"-Kriterium) -
// jeder Eintrag ist dort {haupt: Rolle, neben: Ort}, mehrere Rollen teilen sich
// denselben Ort.
function rzNscOrte() {
    const original = randomizerPaketeGeladen.original;
    if (!original) return [];
    const orte = original.tabellen.npc_trefforte.eintraege.map(e => e.neben);
    return [...new Set(orte)];
}

function rzNscHaltungen() {
    const original = randomizerPaketeGeladen.original;
    if (!original) return [];
    return original.tabellen.npc_haltungen.eintraege.map(e => e.haupt);
}

// Kleines Easter-Egg fürs Team: ganz selten (~1:200), und nur wenn der SL
// wirklich jede Achse dem Zufall überlässt (kein Ort/Geschlecht/Haltung/
// Wesen-Modus festgenagelt) unter dem Eldara-Paket, "würfelt" der Zufalls-
// generator statt eines normalen NSC den Kartenzeichner der Runde persönlich.
// Rein Flavor, keine Mechanik dahinter - genau wie ein normaler NSC-Wurf auch.
const RZ_EASTER_EGG_DON_DAVIS = {
    name: 'Don Davis',
    rolle: 'Der Kartenzeichner – zieht heimlich die Fäden im Hintergrund',
    ort: 'Tief im dunklen Schiffsrumpf, wo ihn niemand vermutet',
    haltung: 'Freundlich, aber auffällig zurückhaltend – beobachtet lieber, als sich einzumischen',
    auffaelligkeit: 'Ein mächtiger Bart, eines Kapitäns würdig. Tätowierungen am ganzen Körper – findet seine Körperteile nach jedem Gefecht mühelos wieder. Seine Karten sind immer verdächtig aktuell – fast so, als hätte er die Geschichte schon einmal miterlebt.',
    motivation: 'Fortschritt kann nur erreicht werden, wenn Wissen allen frei zugänglich gemacht wird',
    wesen: 'Geist'
};

// Kompletter NSC: Name + Trefferort/Rolle + Haltung + Auffälligkeit + Motivation
// (Sprachbausteine immer aus dem "Allgemein"-Paket, unabhängig von der gewählten
// Namensquelle) + optional ein Wesen/Monster mit passender Eigenschaft (nur wenn
// das Eldara-Paket geladen ist). Der SL kann jede Achse über randomizerNsc* auf
// einen konkreten Wert festnageln statt sie dem Zufall zu überlassen.
function rzWuerfelNSC() {
    const original = randomizerPaketeGeladen.original;
    const eldora = randomizerPaketeGeladen.eldora;

    const komplettZufaellig = !randomizerNscOrt && randomizerNscGeschlecht === 'zufaellig'
        && !randomizerNscHaltung && randomizerNscWesenModus === 'zufaellig';
    if (eldora && komplettZufaellig && Math.random() < 1 / 200) {
        const d = RZ_EASTER_EGG_DON_DAVIS;
        randomizerErgebnisAktuell = {
            htmlAusgabe: [
                `<strong>${escapeHtml(d.name)}</strong>`,
                `${escapeHtml(d.rolle)} <span class="rz-neben">(${escapeHtml(d.ort)})</span>`,
                `Haltung: ${escapeHtml(d.haltung)}`,
                `Auffällig: ${escapeHtml(d.auffaelligkeit)}`,
                `Motivation: ${escapeHtml(d.motivation)}`,
                `<strong>Wesen: ${escapeHtml(d.wesen)}</strong>`
            ].join('<br>'),
            textAusgabe: [
                d.name, `${d.rolle} (${d.ort})`, `Haltung: ${d.haltung}`,
                `Auffällig: ${d.auffaelligkeit}`, `Motivation: ${d.motivation}`, `Wesen: ${d.wesen}`
            ].join(' · '),
            quelle: 'NSC', tischmitteBereit: false, nscBereit: true,
            nscVorlage: Object.assign({}, d)
        };
        randomizerLetzteAktion = rzWuerfelNSC;
        renderRandomizerGm();
        return;
    }

    let namensquelle = randomizerNamensquelle;
    if (namensquelle === 'zufaellig') {
        const geladen = RANDOMIZER_PAKETE_EINGEBAUT.map(i => i.id).filter(id => randomizerPaketeGeladen[id]);
        namensquelle = geladen.length ? rzZufall(geladen) : 'original';
    }
    const geschlecht = randomizerNscGeschlecht === 'zufaellig' ? undefined : randomizerNscGeschlecht;
    const name = namensquelle === 'piraten' ? rzPiratenNameRoh(geschlecht) : rzNameRoh(namensquelle, geschlecht);

    const zeilenHtml = [];
    const zeilenText = [];
    // Strukturierte Fassung fürs Übernehmen in die NSC-Liste (nscliste.js) -
    // parallel zu den zeilenHtml/zeilenText fürs reine Anzeigen.
    const vorlage = { name: name || '' };
    if (name) { zeilenHtml.push(`<strong>${escapeHtml(name)}</strong>`); zeilenText.push(name); }

    if (original) {
        const trefforte = original.tabellen.npc_trefforte.eintraege;
        const passendZumOrt = randomizerNscOrt ? trefforte.filter(e => e.neben === randomizerNscOrt) : trefforte;
        const wo = rzZufall(passendZumOrt.length ? passendZumOrt : trefforte);

        const haltungen = original.tabellen.npc_haltungen.eintraege;
        const passendeHaltung = randomizerNscHaltung ? haltungen.filter(e => e.haupt === randomizerNscHaltung) : haltungen;
        const halt = rzZufall(passendeHaltung.length ? passendeHaltung : haltungen);

        const auff = rzZufall(original.tabellen.npc_auffaelligkeiten.eintraege);
        const mot = rzZufall(original.tabellen.npc_motivationen.eintraege);
        zeilenHtml.push(`${escapeHtml(wo.haupt)} <span class="rz-neben">(${escapeHtml(wo.neben)})</span>`);
        zeilenHtml.push(`Haltung: ${escapeHtml(halt.haupt)}`);
        zeilenHtml.push(`Auffällig: ${escapeHtml(auff.haupt)}`);
        zeilenHtml.push(`Motivation: ${escapeHtml(mot.haupt)}`);
        zeilenText.push(`${wo.haupt} (${wo.neben})`, `Haltung: ${halt.haupt}`, `Auffällig: ${auff.haupt}`, `Motivation: ${mot.haupt}`);
        Object.assign(vorlage, { rolle: wo.haupt, ort: wo.neben, haltung: halt.haupt, auffaelligkeit: auff.haupt, motivation: mot.haupt });
    }

    if (eldora && eldora.wesen && eldora.eigenschaften) {
        // Nicht jeder NSC ist etwas Übernatürliches - ohne Vorgabe sind die meisten normale Menschen.
        const istWesen = randomizerNscWesenModus === 'immer' ? true
            : randomizerNscWesenModus === 'nie' ? false
            : Math.random() < 0.4;
        if (istWesen) {
            const wesen = rzZufall(eldora.wesen);
            const rang = rzRangWuerfeln();
            const kandidaten = eldora.eigenschaften.filter(e => e.rang === rang);
            const eig = kandidaten.length ? rzZufall(kandidaten) : null;
            const wirkung = eig ? rzZufall(eig.wirkungen) : '';
            const zeile = `Wesen: ${wesen} (Rang ${rang})${eig ? ` – ${eig.name}: ${wirkung}` : ''}`;
            zeilenHtml.push(`<strong>${escapeHtml(zeile)}</strong>`);
            zeilenText.push(zeile);
            vorlage.wesen = `${wesen} (Rang ${rang})${eig ? ` – ${eig.name}: ${wirkung}` : ''}`;
        } else {
            zeilenHtml.push('Kein Wesen – gewöhnlicher Mensch');
            zeilenText.push('Kein Wesen – gewöhnlicher Mensch');
        }
    }

    randomizerErgebnisAktuell = {
        htmlAusgabe: zeilenHtml.join('<br>'), textAusgabe: zeilenText.join(' · '), quelle: 'NSC',
        tischmitteBereit: false, nscBereit: true, nscVorlage: vorlage
    };
    randomizerLetzteAktion = rzWuerfelNSC;
    renderRandomizerGm();
}

// --- Weiterreichen -------------------------------------------------------------

function randomizerStatus(text, warnung) {
    const el = document.getElementById('rz-status');
    if (!el) return;
    el.textContent = text;
    el.style.color = warnung ? 'var(--color-dmg)' : 'var(--color-heal)';
    el.style.opacity = '1';
    clearTimeout(randomizerStatus._t);
    randomizerStatus._t = setTimeout(() => { el.style.opacity = '0'; }, 4000);
}

function rzInNotizen() {
    const e = randomizerErgebnisAktuell;
    const textarea = document.getElementById('gm-general-notes');
    if (!e || !textarea) return;
    const zeit = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const zeile = `[${zeit}] 🎲 ${e.textAusgabe}`;
    textarea.value = textarea.value ? textarea.value + '\n' + zeile : zeile;
    if (typeof saveGmGeneralNotes === 'function') saveGmGeneralNotes(textarea.value);
    randomizerStatus('✓ In die SL-Notizen übernommen.');
}

// Legt das zuletzt gewürfelte Item direkt in die Tischmitte (versteckt) - der
// SL muss nichts abtippen, nur später aufdecken (siehe tischmitte.js).
function rzInTischmitte() {
    const e = randomizerErgebnisAktuell;
    if (!e || !e.tischmitteBereit || !e.tischmitteVorlage) return;
    if (typeof tischmitteCommit !== 'function' || typeof tischmitte === 'undefined') {
        randomizerStatus('Die Tischmitte ist hier nicht verfügbar.', true);
        return;
    }
    const item = Object.assign(
        { id: typeof tischmitteNeueId === 'function' ? tischmitteNeueId() : 'tm_' + Date.now(), hidden: true },
        e.tischmitteVorlage
    );
    tischmitteCommit([item].concat(tischmitte));
    randomizerStatus(`✓ "${item.name}" in die Tischmitte gelegt (versteckt).`);
}

// Übernimmt den zuletzt gewürfelten NSC 1:1 in die NSC-Liste (siehe nscliste.js) -
// der SL muss Name/Ort/Rolle/etc. nicht abtippen.
function rzInNscListe() {
    const e = randomizerErgebnisAktuell;
    if (!e || !e.nscBereit || !e.nscVorlage) return;
    if (typeof nscListeHinzufuegen !== 'function') {
        randomizerStatus('Die NSC-Liste ist hier nicht verfügbar.', true);
        return;
    }
    const eintrag = nscListeHinzufuegen(e.nscVorlage);
    randomizerStatus(`✓ "${eintrag.name}" in die NSC-Liste übernommen.`);
}

// --- Darstellung ---------------------------------------------------------------

function randomizerErgebnisHtml() {
    const e = randomizerErgebnisAktuell;
    if (!e) return '<div class="x-leer">Noch nichts gewürfelt.</div>';
    return `
        ${e.quelle ? `<div class="rz-quelle">${escapeHtml(e.quelle)}</div>` : ''}
        <div class="rz-ergebnis-text">${e.htmlAusgabe}</div>
        ${e.attribution ? `<div class="rz-attribution">${escapeHtml(e.attribution)}</div>` : ''}
        <div class="rz-ergebnis-actions">
            <button class="tool-btn" id="rz-reroll"><i class="fa-solid fa-rotate"></i> Neu würfeln</button>
            <button class="tool-btn" id="rz-notiz"><i class="fa-solid fa-book-journal-whills"></i> In SL-Notizen</button>
            ${e.tischmitteBereit ? `<button class="tool-btn" id="rz-tischmitte-btn"><i class="fa-solid fa-hand-holding"></i> In Tischmitte legen</button>` : ''}
            ${e.nscBereit ? `<button class="tool-btn" id="rz-nsc-uebernehmen-btn"><i class="fa-solid fa-address-card"></i> In NSC-Liste übernehmen</button>` : ''}
        </div>`;
}

function renderRandomizerGm() {
    const box = document.getElementById('gm-randomizer');
    if (!box) return;

    let inhalt;
    if (!randomizerAlleGeladen) {
        inhalt = '<p class="hr-hint">Tabellen werden beim ersten Öffnen geladen …</p>';
    } else {
        const original = randomizerPaketeGeladen.original;
        const piraten = randomizerPaketeGeladen.piraten;
        const eldora = randomizerPaketeGeladen.eldora;

        const quellOptionen = RANDOMIZER_PAKETE_EINGEBAUT
            .map(i => `<option value="${i.id}" ${randomizerNamensquelle === i.id ? 'selected' : ''}>${escapeHtml(i.name)}</option>`).join('');
        const orteOptionen = rzNscOrte()
            .map(o => `<option value="${escapeHtml(o)}" ${randomizerNscOrt === o ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('');
        const haltungOptionen = rzNscHaltungen()
            .map(h => `<option value="${escapeHtml(h)}" ${randomizerNscHaltung === h ? 'selected' : ''}>${escapeHtml(h)}</option>`).join('');
        // 6 Basistabellen (Vornamen, Nachnamen, Rolle/Ort, Haltung, Auffälligkeit,
        // Motivation) + Wesen/Eigenschaften, sobald das Eldara-Paket geladen ist.
        const tabellenAnzahl = original ? 6 + (eldora && eldora.wesen && eldora.eigenschaften ? 2 : 0) : 0;

        const generatorenHtml = `
            <div class="rz-generatoren-reihe">
                <div class="rz-block">
                    <div class="rz-nsc-kopf">
                        <div class="rz-block-titel" style="margin-bottom:0"><i class="fa-solid fa-user-gear"></i> NSC würfeln</div>
                        ${tabellenAnzahl ? `<span class="rz-badge">${tabellenAnzahl} Tabellen kombiniert</span>` : ''}
                    </div>
                    <p class="rz-nsc-hint">Ort bestimmt eine passende Rolle, dazu Name, Haltung, Auffälligkeit, Motivation${eldora ? ' und optional ein Wesen' : ''} - jede Achse lässt sich festlegen oder dem Zufall überlassen.</p>
                    <div class="rz-kriterien-grid">
                        <div class="rz-feld">
                            <label for="rz-nsc-ort">Ort (bestimmt Rolle)</label>
                            <select id="rz-nsc-ort" class="x-select">
                                <option value="">Zufällig</option>
                                ${orteOptionen}
                            </select>
                        </div>
                        <div class="rz-feld">
                            <label for="rz-quelle">Namensstil</label>
                            <select id="rz-quelle" class="x-select">
                                <option value="zufaellig" ${randomizerNamensquelle === 'zufaellig' ? 'selected' : ''}>Zufällig</option>
                                ${quellOptionen}
                            </select>
                        </div>
                        <div class="rz-feld">
                            <label for="rz-nsc-geschlecht">Geschlecht</label>
                            <select id="rz-nsc-geschlecht" class="x-select">
                                <option value="zufaellig" ${randomizerNscGeschlecht === 'zufaellig' ? 'selected' : ''}>Zufällig</option>
                                <option value="maennlich" ${randomizerNscGeschlecht === 'maennlich' ? 'selected' : ''}>Männlich</option>
                                <option value="weiblich" ${randomizerNscGeschlecht === 'weiblich' ? 'selected' : ''}>Weiblich</option>
                            </select>
                        </div>
                        <div class="rz-feld">
                            <label for="rz-nsc-haltung">Grundhaltung</label>
                            <select id="rz-nsc-haltung" class="x-select">
                                <option value="">Zufällig</option>
                                ${haltungOptionen}
                            </select>
                        </div>
                        ${eldora ? `<div class="rz-feld">
                            <label for="rz-nsc-wesen">Wesen/Monster</label>
                            <select id="rz-nsc-wesen" class="x-select">
                                <option value="zufaellig" ${randomizerNscWesenModus === 'zufaellig' ? 'selected' : ''}>Zufällig (~40%)</option>
                                <option value="immer" ${randomizerNscWesenModus === 'immer' ? 'selected' : ''}>Immer</option>
                                <option value="nie" ${randomizerNscWesenModus === 'nie' ? 'selected' : ''}>Nie</option>
                            </select>
                        </div>` : ''}
                    </div>
                    <button class="tool-btn rz-btn-primary" id="rz-nsc-btn"><i class="fa-solid fa-dice"></i> Würfeln</button>
                </div>
                <div class="rz-block">
                    <div class="rz-block-titel"><i class="fa-solid fa-shuffle"></i> Weitere Generatoren</div>
                    <div class="rz-zeile">
                        ${original ? `<button class="tool-btn" data-rzgen="name:original"><i class="fa-solid fa-id-badge"></i> Zufallsname</button>` : ''}
                        ${piraten ? `<button class="tool-btn" data-rzgen="piratenname"><i class="fa-solid fa-id-badge"></i> Piratenname</button>` : ''}
                        ${piraten ? `<button class="tool-btn" data-rzgen="crewErdig"><i class="fa-solid fa-user"></i> Einfaches Crewmitglied</button>` : ''}
                        ${eldora ? `<button class="tool-btn" data-rzgen="magischerGegenstand"><i class="fa-solid fa-wand-sparkles"></i> Magischer Gegenstand</button>` : ''}
                    </div>
                </div>
            </div>`;

        const paketTabs = RANDOMIZER_PAKETE_EINGEBAUT.filter(i => randomizerPaketeGeladen[i.id]).map(i =>
            `<button class="rz-tab ${randomizerAktivesPaket === i.id ? 'rz-tab-aktiv' : ''}" data-rztab="${i.id}">${escapeHtml(i.name)}</button>`).join('');

        const aktivPaket = randomizerPaketeGeladen[randomizerAktivesPaket];
        let tabellenHtml = '';
        if (aktivPaket) {
            const kategorienMitInhalt = RZ_KATEGORIEN.map(([kat, label]) => {
                const eintraege = Object.entries(aktivPaket.tabellen).filter(([, t]) => t.kategorie === kat);
                if (!eintraege.length) return '';
                return `<div class="rz-kat">
                    <div class="rz-kat-label">${escapeHtml(label)}</div>
                    <div class="rz-zeile">${eintraege.map(([id, t]) =>
                        `<button class="tool-btn rz-tabelle-btn" data-rztabelle="${randomizerAktivesPaket}::${id}">${escapeHtml(t.name)}</button>`).join('')}
                    </div>
                </div>`;
            }).join('');
            tabellenHtml = `<div class="rz-kategorien-grid">${kategorienMitInhalt}</div>`;
        }

        inhalt = `
            ${generatorenHtml}
            <div class="rz-block">
                <div class="rz-block-kopf">
                    <div class="rz-block-titel"><i class="fa-solid fa-table-list"></i> Tabellen durchstöbern</div>
                    <div class="rz-tabs">${paketTabs}</div>
                </div>
                ${tabellenHtml}
            </div>
            <div id="rz-ergebnis-box" class="rz-ergebnis-box">${randomizerErgebnisHtml()}</div>
            <div id="rz-status" class="x-hint"></div>`;
    }

    box.innerHTML = `
        <details class="x-details rz-details" ${randomizerOffen ? 'open' : ''}>
            <summary>
                <div class="rz-titelzeile">
                    <i class="fa-solid fa-chevron-right x-chevron"></i>
                    <i class="fa-solid fa-dice-d20 rz-titel-icon"></i>
                    <div>
                        <div class="rz-titel">Zufallsgenerator</div>
                        <div class="rz-untertitel">Namen, NSC, Orte & Gegenstände für die Vorbereitung - rein lokal bei dir</div>
                    </div>
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('randomizer')" title="Hilfe zum Zufallsgenerator"></i>
                </div>
            </summary>
            <div class="rz-body">${inhalt}</div>
        </details>`;

    const details = box.querySelector('details');
    if (details) details.addEventListener('toggle', () => {
        randomizerOffen = details.open;
        sicherSpeichern(RANDOMIZER_OFFEN_KEY, details.open ? '1' : '0');
        if (details.open && !randomizerAlleGeladen) randomizerAlleLaden(() => renderRandomizerGm());
    });

    box.querySelectorAll('[data-rztab]').forEach(b => b.addEventListener('click', () => { randomizerAktivesPaket = b.dataset.rztab; renderRandomizerGm(); }));
    box.querySelectorAll('[data-rztabelle]').forEach(b => b.addEventListener('click', () => {
        const [paketId, tabelleId] = b.dataset.rztabelle.split('::');
        rzWuerfelTabelle(paketId, tabelleId);
    }));
    box.querySelectorAll('[data-rzgen]').forEach(b => b.addEventListener('click', () => {
        const val = b.dataset.rzgen;
        if (val === 'piratenname') rzWuerfelPiratenname();
        else if (val === 'crewErdig') rzWuerfelCrewErdig();
        else if (val === 'magischerGegenstand') rzWuerfelMagischerGegenstand();
        else if (val.indexOf('name:') === 0) rzWuerfelName(val.split(':')[1]);
    }));

    const quelle = document.getElementById('rz-quelle');
    if (quelle) quelle.addEventListener('change', () => { randomizerNamensquelle = quelle.value; });
    const nscOrt = document.getElementById('rz-nsc-ort');
    if (nscOrt) nscOrt.addEventListener('change', () => { randomizerNscOrt = nscOrt.value; });
    const nscGeschlecht = document.getElementById('rz-nsc-geschlecht');
    if (nscGeschlecht) nscGeschlecht.addEventListener('change', () => { randomizerNscGeschlecht = nscGeschlecht.value; });
    const nscHaltung = document.getElementById('rz-nsc-haltung');
    if (nscHaltung) nscHaltung.addEventListener('change', () => { randomizerNscHaltung = nscHaltung.value; });
    const nscWesen = document.getElementById('rz-nsc-wesen');
    if (nscWesen) nscWesen.addEventListener('change', () => { randomizerNscWesenModus = nscWesen.value; });
    const nscBtn = document.getElementById('rz-nsc-btn');
    if (nscBtn) nscBtn.addEventListener('click', rzWuerfelNSC);
    const reroll = document.getElementById('rz-reroll');
    if (reroll) reroll.addEventListener('click', () => { if (randomizerLetzteAktion) randomizerLetzteAktion(); });
    const notiz = document.getElementById('rz-notiz');
    if (notiz) notiz.addEventListener('click', rzInNotizen);
    const tischBtn = document.getElementById('rz-tischmitte-btn');
    if (tischBtn) tischBtn.addEventListener('click', rzInTischmitte);
    const nscUebernehmenBtn = document.getElementById('rz-nsc-uebernehmen-btn');
    if (nscUebernehmenBtn) nscUebernehmenBtn.addEventListener('click', rzInNscListe);
}

document.addEventListener('DOMContentLoaded', () => {
    renderRandomizerGm();
});
