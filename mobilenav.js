// How to be a Hero - Schnellnavigation (alle Geräte)
//
// Auf dem Handy ist der Charakterbogen eine einzige lange Seite (die drei
// Grid-Spalten Toolbar/links/rechts stacken sich unter 768px, siehe style.css),
// und zwischen z.B. Logbuch (ganz unten) und Inventar (weit oben) hin- und
// herzuscrollen ist auf einem Touchscreen mühsam. Diese Leiste bleibt beim
// Scrollen am unteren Bildschirmrand stehen und springt per Klick/Tipp direkt
// zum gewünschten Panel (scrollIntoView), siehe .mobile-nav in style.css.
// Am Desktop erscheint sie als schwebende Leiste unten in der Mitte. Chips der
// Panels, die gerade im Sichtfeld sind, werden hervorgehoben
// (IntersectionObserver in mobilenavSichtfeldBeobachten).
//
// Nur Panels, die gerade tatsächlich sichtbar sind, bekommen einen Eintrag -
// Tischmitte/Quests/Team-Würfel/Gruppe erscheinen z.B. erst, sobald eine
// Multiplayer-Verbindung steht bzw. der SL etwas freigibt. Deshalb beobachtet
// ein MutationObserver die style-Attribute der veränderlichen Panels und
// rendert bei Bedarf neu, statt die Liste einmalig fest zu verdrahten.

const MOBILENAV_ZIELE = [
    { id: 'charakter-kopf', icon: 'fa-id-card', label: 'Start', immer: true },
    { id: 'attributes-grid', icon: 'fa-list-check', label: 'Fertigkeiten', immer: true },
    { id: 'aktuelle-werte-details', icon: 'fa-gauge-high', label: 'Werte', immer: true },
    { id: 'inventory-section', icon: 'fa-box-open', label: 'Inventar', immer: true },
    { id: 'weapons-section', icon: 'fa-khanda', label: 'Waffen', immer: true },
    { id: 'tischmitte-section', icon: 'fa-box-archive', label: 'Tischmitte' },
    { id: 'quest-section', icon: 'fa-scroll', label: 'Quests' },
    { id: 'spielerlog-section', icon: 'fa-journal-whills', label: 'Mein Log' },
    { id: 'spielernetz-section', icon: 'fa-diagram-project', label: 'Mein Netz' },
    { id: 'notes-panel', icon: 'fa-pen', label: 'Notizen', immer: true },
    { id: 'hp-panel', icon: 'fa-heart', label: 'HP', immer: true },
    { id: 'dice-panel', icon: 'fa-dice-d20', label: 'Würfel', immer: true },
    { id: 'teamwuerfel-section', icon: 'fa-users-viewfinder', label: 'Team-Würfel' },
    { id: 'gruppe-panel', icon: 'fa-people-group', label: 'Gruppe' },
    { id: 'activity-log-panel', icon: 'fa-book', label: 'Logbuch', immer: true }
];

let mobilenavBeobachtet = false;
let mobilenavTimer = null;
let mobilenavSignatur = '';

function mobilenavSichtbar(el) {
    if (!el) return false;
    if (el.style.display === 'none') return false;
    // offsetParent ist null, wenn ein Vorfahre (z.B. .app-container im
    // GM-Modus) display:none hat - fängt auch indirekt verstecktes ab.
    return el.offsetParent !== null || el.getClientRects().length > 0;
}

function mobilenavRender() {
    const nav = document.getElementById('mobile-nav');
    if (!nav) return;
    mobilenavBeobachten(); // einmalig, unabhängig vom aktuellen Sichtbarkeits-Stand
    // Im GM-Dashboard gibt es diese Leiste nicht - eigenes Layout, eigenes Thema.
    if (typeof isGmMode !== 'undefined' && isGmMode) { nav.style.display = 'none'; return; }

    const eintraege = MOBILENAV_ZIELE
        .map(z => ({ ziel: z, el: z.aktion ? nav : document.getElementById(z.id) }))
        .filter(e => e.ziel.aktion || mobilenavSichtbar(e.el));

    if (eintraege.length < 2) { nav.style.display = 'none'; return; }
    nav.style.display = '';

    // Nur neu aufbauen, wenn sich die Liste wirklich geändert hat. Ein
    // Neuaufbau zwischen Maus-/Fingerdruck und Loslassen ersetzt den Chip
    // unter dem Zeiger und verschluckt den Klick - fühlte sich wie ein nötiger
    // Doppelklick an, weil die Beobachter schon bei jeder gleichbleibenden
    // style-Zuweisung eines Panels anschlagen.
    const signatur = eintraege.map(e => e.ziel.id).join('|');
    if (signatur === mobilenavSignatur) return;
    mobilenavSignatur = signatur;

    nav.innerHTML = eintraege.map(e => `
        <button type="button" class="mobile-nav-chip" data-mobilnavziel="${e.ziel.id}">
            <i class="fa-solid ${e.ziel.icon}"></i>
            <span>${e.ziel.label}</span>
        </button>`).join('');
    mobilenavSichtfeldBeobachten(eintraege.filter(e => !e.ziel.aktion).map(e => e.el));
}

// Hebt die Chips der Panels hervor, die gerade (zu mindestens 15 %, bei sehr
// hohen Panels reicht ein Streifen) im Sichtfeld stehen. Wird bei jedem
// Neuaufbau der Leiste neu gestartet, weil sich die Panel-Liste ändern kann.
let mobilenavSichtObserver = null;
function mobilenavSichtfeldBeobachten(elemente) {
    if (mobilenavSichtObserver) mobilenavSichtObserver.disconnect();
    if (typeof IntersectionObserver === 'undefined') return;
    mobilenavSichtObserver = new IntersectionObserver(treffer => {
        treffer.forEach(t => {
            const chip = document.querySelector(`#mobile-nav [data-mobilnavziel="${t.target.id}"]`);
            if (chip) chip.classList.toggle('mobile-nav-aktiv', t.isIntersecting);
        });
    }, { threshold: [0, 0.15], rootMargin: '-10% 0px -15% 0px' });
    elemente.forEach(el => mobilenavSichtObserver.observe(el));
}

function mobilenavSpringenZu(id) {
    const ziel = document.getElementById(id);
    if (!ziel) return;
    ziel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    ziel.classList.add('mobile-nav-highlight');
    setTimeout(() => ziel.classList.remove('mobile-nav-highlight'), 1200);
}

// Beobachtet nur die Panels, die tatsächlich ein- und ausgeblendet werden
// (nicht die immer sichtbaren) sowie den App-Container selbst (GM-Modus
// blendet ihn komplett aus) - läuft nur einmal an, die Observer selbst
// bleiben über die ganze Sitzung aktiv.
function mobilenavBeobachten() {
    if (mobilenavBeobachtet) return;
    mobilenavBeobachtet = true;
    const beobachten = (el) => {
        if (!el) return;
        new MutationObserver(mobilenavVerzoegertRendern).observe(el, { attributes: true, attributeFilter: ['style'] });
    };
    MOBILENAV_ZIELE.filter(z => !z.immer).forEach(z => beobachten(document.getElementById(z.id)));
    beobachten(document.querySelector('.app-container'));
    beobachten(document.getElementById('gm-dashboard'));
}

function mobilenavVerzoegertRendern() {
    clearTimeout(mobilenavTimer);
    mobilenavTimer = setTimeout(mobilenavRender, 150);
}

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('mobile-nav');
    if (nav) nav.addEventListener('click', e => {
        const chip = e.target.closest('[data-mobilnavziel]');
        if (!chip) return;
        const ziel = MOBILENAV_ZIELE.find(z => z.id === chip.dataset.mobilnavziel);
        if (ziel && ziel.aktion && typeof window[ziel.aktion] === 'function') window[ziel.aktion]();
        else mobilenavSpringenZu(chip.dataset.mobilnavziel);
    });
    mobilenavRender();
});
