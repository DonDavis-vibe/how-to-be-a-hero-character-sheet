// How to be a Hero - Handy-Ansicht mit Reitern (bis 768px Breite)
//
// Auf dem Handy war der Bogen eine einzige, rund 6000 px hohe Seite. Hier
// bekommt jeder Bereich stattdessen einen festen Reiter am unteren Rand, und
// es ist immer nur der gerade gewählte Reiter zu sehen:
//   Held     - Bio, Notizen
//   Proben   - Fertigkeiten; Antippen einer Zeile würfelt die Probe
//   Inventar - Inventar, Waffen, Tischmitte
//   LP/Würfel- Aktuelle Werte, Lebenspunkte, Würfel, Logbuch, Team-Würfe
//   Mehr     - Werkzeuge (Speichern, Multiplayer, Theme ...) und alles, was
//              der Spielleiter freigibt (Quests, Karte, Gruppe)
//
// Die Panels selbst bleiben unverändert im DOM; sie bekommen nur ein
// data-mtab-Attribut, das CSS (style.css, "Handy-Reiter") blendet den Rest aus.
// Am Desktop passiert nichts - dort gilt weiter die schwebende Sprungleiste
// aus mobilenav.js. Ein Würfelergebnis erscheint auf dem Handy zusätzlich als
// kurzer Hinweis oben, damit man es auch sieht, wenn man auf "Proben" würfelt
// und das Würfel-Panel gar nicht offen ist (Hook in addToLog, app.js).
// Übernommen aus dem Schwesterprojekt Eldara und auf den HeroHQ-Bogen angepasst.

const MT_TABS = [
    { id: 'held', icon: 'fa-id-card', label: 'Held' },
    { id: 'proben', icon: 'fa-list-check', label: 'Proben' },
    { id: 'inventar', icon: 'fa-box-open', label: 'Inventar' },
    { id: 'wuerfel', icon: 'fa-dice-d20', label: 'LP/Würfel' },
    { id: 'mehr', icon: 'fa-ellipsis', label: 'Mehr' }
];

// Selektor -> Reiter. Nur Bereiche, die direkt in den Spalten-Containern stehen.
const MT_ZUORDNUNG = [
    ['#charakter-kopf', 'held'],
    ['#notes-panel', 'held'],
    ['#attributes-grid', 'proben'],
    ['#inventory-section', 'inventar'],
    ['#weapons-section', 'inventar'],
    ['#tischmitte-section', 'inventar'],
    ['#aktuelle-werte-details', 'wuerfel'],
    ['#hp-panel', 'wuerfel'],
    ['#dice-panel', 'wuerfel'],
    ['#teamwuerfel-section', 'wuerfel'],
    ['#activity-log-panel', 'wuerfel'],
    ['body > button[onclick^="showHelp(\'general\')"]', 'mehr'],
    ['.toolbar', 'mehr'],
    ['#quest-section', 'mehr'],
    ['#karte-section', 'mehr'],
    ['#spielerlog-section', 'mehr'],
    ['#spielernetz-section', 'mehr'],
    ['#gruppe-panel', 'mehr']
];
// Bereiche, die der Spielleiter ein- und ausblendet - zeigen einen Punkt am Reiter "Mehr"
const MT_TISCH_IDS = ['quest-section', 'karte-section', 'gruppe-panel'];

let mtAktuell = 'proben';
let mtAufgebaut = false;
let mtToastTimer = null;

function mtGespeicherterReiter() {
    try { return sessionStorage.getItem('htbah-mt-reiter'); } catch (e) { return null; }
}

function mtMobil() {
    if (typeof isGmMode !== 'undefined' && isGmMode) return false;
    return window.matchMedia('(max-width: 768px)').matches;
}

function mtZielReiterVon(el) {
    const kind = el && el.closest ? el.closest('[data-mtab]') : null;
    return kind ? kind.dataset.mtab : null;
}

function mtSichtbarImReiter(el) {
    return el.style.display !== 'none';
}

// Spalten-Container ohne sichtbare Kinder im aktuellen Reiter ausblenden,
// sonst steht dort ein leeres Glas-Panel.
function mtContainerPruefen() {
    document.querySelectorAll('.character-sheet, .tools-panel').forEach(c => {
        const hatInhalt = [...c.children].some(k => k.dataset.mtab === mtAktuell && mtSichtbarImReiter(k));
        c.classList.toggle('mt-leer', !hatInhalt);
    });
    const notizen = document.getElementById('notes-panel');
    if (notizen) notizen.classList.toggle('mt-leer', notizen.dataset.mtab !== mtAktuell);
}

function mtTischPunkt() {
    const tab = document.querySelector('#mobile-tabs [data-mtab-ziel="mehr"]');
    if (!tab) return;
    const aktiv = MT_TISCH_IDS.some(id => {
        const el = document.getElementById(id);
        return el && el.style.display !== 'none' && el.children.length > 0;
    });
    tab.classList.toggle('mt-punkt', aktiv && mtAktuell !== 'mehr');
}

function mtReiterZeigen(id, nachOben = true) {
    if (!MT_TABS.some(t => t.id === id)) id = 'proben';
    mtAktuell = id;
    try { sessionStorage.setItem('htbah-mt-reiter', id); } catch (e) { /* privater Modus - egal */ }
    document.body.dataset.mtab = id;
    document.querySelectorAll('#mobile-tabs [data-mtab-ziel]').forEach(b => {
        const aktiv = b.dataset.mtabZiel === id;
        b.classList.toggle('mt-aktiv', aktiv);
        b.setAttribute('aria-selected', aktiv ? 'true' : 'false');
    });
    mtContainerPruefen();
    mtTischPunkt();
    if (nachOben) window.scrollTo(0, 0);
}

// Wird von mobilenavSpringenZu (mobilenav.js) aufgerufen: wechselt zum Reiter,
// in dem das Zielpanel liegt, bevor dorthin gescrollt wird.
function mobiletabsZeigeFuer(el) {
    if (!document.body.classList.contains('mt-aktiv')) return;
    const reiter = mtZielReiterVon(el);
    if (reiter && reiter !== mtAktuell) mtReiterZeigen(reiter, false);
}

// Verteilte Punkte neben dem Hinweis in der Proben-Leiste: der eigentliche Zähler steckt in der
// Werkzeugleiste (Reiter "Mehr"), beim Verteilen der Skills will man ihn aber im Blick haben.
// Aufgerufen aus calculatePoints (app.js).
function mobiletabsPunkteAktualisieren(summe, maximum) {
    const el = document.getElementById('mt-punkte');
    if (!el) return;
    el.textContent = `${summe} / ${maximum}`;
    el.classList.toggle('mt-ueber', summe > maximum);
}

function mtAufbauen() {
    if (mtAufgebaut) return;
    mtAufgebaut = true;

    MT_ZUORDNUNG.forEach(([sel, tab]) => {
        const el = document.querySelector(sel);
        if (el) el.dataset.mtab = tab;
    });

    const nav = document.createElement('nav');
    nav.id = 'mobile-tabs';
    nav.className = 'mobile-tabs';
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', 'Bereiche');
    nav.innerHTML = MT_TABS.map(t => `
        <button type="button" role="tab" class="mobile-tab" data-mtab-ziel="${t.id}">
            <i class="fa-solid ${t.icon}"></i><span>${t.label}</span>
        </button>`).join('');
    nav.addEventListener('click', e => {
        const b = e.target.closest('[data-mtab-ziel]');
        if (b) mtReiterZeigen(b.dataset.mtabZiel);
    });
    document.body.appendChild(nav);

    // Hinweis über der Fertigkeitenliste + Schalter zum Bearbeiten
    const grid = document.getElementById('attributes-grid');
    if (grid) {
        const leiste = document.createElement('div');
        leiste.className = 'mt-proben-leiste';
        leiste.dataset.mtab = 'proben';
        leiste.innerHTML = `
            <span class="mt-proben-hinweis"><i class="fa-solid fa-hand-pointer"></i> Skill antippen = Probe würfeln<br><i class="fa-solid fa-coins"></i> Verteilt: <b id="mt-punkte" class="mt-punkte">–</b></span>
            <button type="button" class="tool-btn mt-bearbeiten-btn" id="mt-bearbeiten-btn"><i class="fa-solid fa-pen"></i> Bearbeiten</button>`;
        grid.parentNode.insertBefore(leiste, grid);
        leiste.querySelector('#mt-bearbeiten-btn').addEventListener('click', e => {
            const an = grid.classList.toggle('mt-bearbeiten');
            e.currentTarget.classList.toggle('mt-an', an);
            e.currentTarget.innerHTML = an ? '<i class="fa-solid fa-check"></i> Fertig' : '<i class="fa-solid fa-pen"></i> Bearbeiten';
        });
        // Im Normalmodus würfelt ein Tipp auf die ganze Zeile (nicht nur auf die Zahl)
        grid.addEventListener('click', e => {
            if (!document.body.classList.contains('mt-aktiv') || grid.classList.contains('mt-bearbeiten')) return;
            const zeile = e.target.closest('.skill-item');
            if (!zeile) return;
            const summe = zeile.querySelector('.skill-total');
            if (summe && !summe.contains(e.target)) summe.click();
        });
        // Stand sofort anzeigen (calculatePoints lief beim Laden schon, bevor die Leiste existierte)
        if (typeof calculatePoints === 'function') calculatePoints();
    }

    // Hinweis für Würfelergebnisse
    const toast = document.createElement('div');
    toast.id = 'mobile-wurf-toast';
    toast.className = 'mobile-wurf-toast';
    toast.addEventListener('click', () => toast.classList.remove('mt-zeigen'));
    document.body.appendChild(toast);

    // Sichtbarkeit der vom Spielleiter gesteuerten Bereiche beobachten
    const beobachter = new MutationObserver(() => { mtContainerPruefen(); mtTischPunkt(); });
    ['.character-sheet', '.tools-panel'].forEach(sel => {
        const c = document.querySelector(sel);
        if (c) [...c.children].forEach(k => beobachter.observe(k, { attributes: true, attributeFilter: ['style'] }));
    });
    const app = document.querySelector('.app-container');
    if (app) new MutationObserver(mtAnwenden).observe(app, { attributes: true, attributeFilter: ['style'] });
}

function mtAnwenden() {
    const an = mtMobil();
    document.body.classList.toggle('mt-aktiv', an);
    if (!an) return;
    mtAufbauen();
    mtReiterZeigen(mtAktuell, false);
}

// Kurzer Hinweis oben mit dem letzten Wurf (aufgerufen aus addToLog in app.js)
function mobiletabsWurfToast(titel, ergebnis) {
    if (!document.body.classList.contains('mt-aktiv') || mtAktuell === 'wuerfel') return;
    const toast = document.getElementById('mobile-wurf-toast');
    if (!toast) return;
    toast.innerHTML = `<div class="mwt-titel">${titel}</div><div class="mwt-wert">${ergebnis}</div>`;
    toast.classList.add('mt-zeigen');
    clearTimeout(mtToastTimer);
    mtToastTimer = setTimeout(() => toast.classList.remove('mt-zeigen'), 6000);
}

document.addEventListener('DOMContentLoaded', () => {
    const gespeichert = mtGespeicherterReiter();
    if (gespeichert && MT_TABS.some(t => t.id === gespeichert)) mtAktuell = gespeichert;
    mtAnwenden();
    const mq = window.matchMedia('(max-width: 768px)');
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(mtAnwenden);
});
