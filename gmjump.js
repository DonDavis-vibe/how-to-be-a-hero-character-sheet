// How to be a Hero - SL-Dashboard: Sprungleiste zu den Panels
//
// Das SL-Dashboard hat viele Panels in der rechten Spalte (Spieler, Zufallsgenerator,
// NSC-Liste, Beziehungsnetz, Quests, Tischmitte, SL-Notizen) - schnell verliert man
// den Überblick, wo was ist. Diese Leiste bleibt oben in der Spalte stehen
// (position: sticky, siehe .gm-jump-bar in style.css) und springt per Klick direkt
// zum gewünschten Panel (scrollIntoView), öffnet es dabei auch, falls es gerade
// als <details> eingeklappt ist.
//
// Nur Panels, die der SL gerade tatsächlich sieht, bekommen einen Chip. Ein
// MutationObserver auf die Spalte selbst (Umsortieren per Drag & Drop, siehe
// gmlayout.js) sowie auf jeden einzelnen Slot sorgt dafür, dass die Leiste
// immer die aktuelle Reihenfolge/Sichtbarkeit zeigt.

// icon/label je Panel-Schlüssel (data-panel in index.html).
const GMJUMP_LABELS = {
    spieler: { icon: 'fa-users', label: 'Spieler' },
    randomizer: { icon: 'fa-dice', label: 'Zufall' },
    nscliste: { icon: 'fa-address-book', label: 'NSCs' },
    netzwerk: { icon: 'fa-diagram-project', label: 'Netz' },
    quests: { icon: 'fa-scroll', label: 'Quests' },
    tischmitte: { icon: 'fa-hand-holding', label: 'Tischmitte' },
    notizen: { icon: 'fa-book-journal-whills', label: 'Notizen' }
};

let gmjumpBeobachtet = false;
let gmjumpTimer = null;

function gmjumpSichtbar(slot) {
    if (!slot) return false;
    return slot.offsetParent !== null || slot.getClientRects().length > 0;
}

function gmjumpRender() {
    const bar = document.getElementById('gm-jump-bar');
    const spalte = document.getElementById('gm-panels-spalte');
    if (!bar || !spalte) return;
    gmjumpBeobachten(spalte);

    const slots = [...spalte.querySelectorAll(':scope > .gm-panel-slot')].filter(gmjumpSichtbar);
    if (slots.length < 2) { bar.style.display = 'none'; return; }
    bar.style.display = '';

    bar.innerHTML = slots.map(slot => {
        const info = GMJUMP_LABELS[slot.dataset.panel] || { icon: 'fa-square', label: slot.dataset.panel };
        return `<button type="button" class="gm-jump-chip" data-gmjumpziel="${slot.dataset.panel}">
            <i class="fa-solid ${info.icon}"></i> <span>${info.label}</span>
        </button>`;
    }).join('');

    bar.querySelectorAll('[data-gmjumpziel]').forEach(btn => {
        btn.addEventListener('click', () => gmjumpSpringenZu(btn.dataset.gmjumpziel));
    });
}

function gmjumpSpringenZu(panelKey) {
    const spalte = document.getElementById('gm-panels-spalte');
    const slot = spalte && spalte.querySelector(`:scope > .gm-panel-slot[data-panel="${panelKey}"]`);
    if (!slot) return;
    const details = slot.querySelector('details');
    if (details && !details.open) details.open = true;
    slot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    slot.classList.add('gm-jump-highlight');
    setTimeout(() => slot.classList.remove('gm-jump-highlight'), 1200);
}

// Beobachtet die Spalte selbst (Drag & Drop-Umsortieren per gmlayout.js
// ändert die Kind-Reihenfolge) sowie jeden einzelnen Slot (style- UND
// class-Änderungen - Module blenden ihr Panel per style.display aus).
function gmjumpBeobachten(spalte) {
    if (gmjumpBeobachtet) return;
    gmjumpBeobachtet = true;
    new MutationObserver(gmjumpVerzoegertRendern).observe(spalte, { childList: true });
    spalte.querySelectorAll(':scope > .gm-panel-slot').forEach(slot => {
        new MutationObserver(gmjumpVerzoegertRendern).observe(slot, { attributes: true, attributeFilter: ['style', 'class'] });
    });
}

function gmjumpVerzoegertRendern() {
    clearTimeout(gmjumpTimer);
    gmjumpTimer = setTimeout(gmjumpRender, 150);
}

document.addEventListener('DOMContentLoaded', gmjumpRender);
