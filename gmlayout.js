// How to be a Hero - SL-Dashboard: Panel-Reihenfolge frei sortierbar
//
// Der SL kann die Panels in der Hauptspalte des Dashboards (Spielerkarten,
// Zufallsgenerator, NSC-Liste, Quests, Tischmitte, SL-Notizen) per Drag &
// Drop in eine beliebige Reihenfolge bringen. Die Reihenfolge bleibt in
// diesem Browser gespeichert (localStorage), unabhängig vom geladenen
// Charakter.
//
// Technik: jedes Panel steckt in index.html in einem äußeren .gm-panel-slot
// mit einem kleinen Ziehgriff obendrauf - die eigentlichen render*Gm()-
// Funktionen der einzelnen Module (nscliste.js, quests.js, tischmitte.js,
// randomizer.js) fassen weiterhin nur ihr eigenes inneres <div id="gm-...">
// an und wissen nichts vom Umsortieren. Ein MutationObserver auf jedes
// innere Div spiegelt dessen style.display auf den Slot, damit ein
// ausgeblendetes Panel auch keinen leeren Rahmen mit Ziehgriff hinterlässt.

const GM_PANEL_ORDER_KEY = 'htbah_gm_panel_reihenfolge';
let gmPanelGezogen = null;

function gmPanelsInitialisieren() {
    const spalte = document.getElementById('gm-panels-spalte');
    if (!spalte) return;
    const slots = [...spalte.querySelectorAll(':scope > .gm-panel-slot')];
    if (!slots.length) return;

    // Ursprüngliche HTML-Reihenfolge merken, damit "Zurücksetzen" ohne Reload
    // funktioniert - einfach wieder danach sortieren statt die Seite neu zu laden.
    slots.forEach((slot, i) => { slot.dataset.standardindex = i; });

    gmPanelReihenfolgeAnwenden(spalte);

    slots.forEach(slot => {
        const griff = slot.querySelector('.gm-panel-griff');
        const inneresPanel = slot.querySelector(':scope > [id]');

        if (griff) {
            griff.setAttribute('draggable', 'true');
            griff.addEventListener('dragstart', (e) => {
                gmPanelGezogen = slot;
                slot.classList.add('gm-panel-slot-ziehend');
                e.dataTransfer.effectAllowed = 'move';
                try { e.dataTransfer.setData('text/plain', slot.dataset.panel); } catch (err) { /* Safari-Krücke, gmPanelGezogen reicht als Fallback */ }
            });
            griff.addEventListener('dragend', () => {
                if (gmPanelGezogen) gmPanelGezogen.classList.remove('gm-panel-slot-ziehend');
                gmPanelGezogen = null;
                gmPanelReihenfolgeSichern();
            });
        }

        slot.addEventListener('dragover', (e) => {
            if (!gmPanelGezogen || gmPanelGezogen === slot) return;
            e.preventDefault();
            const rect = slot.getBoundingClientRect();
            const nachOben = e.clientY < rect.top + rect.height / 2;
            spalte.insertBefore(gmPanelGezogen, nachOben ? slot : slot.nextSibling);
        });

        // Sichtbarkeit des inneren Panels auf den Slot spiegeln, damit ein per
        // style.display="none" ausgeblendetes Panel keinen leeren Rahmen +
        // Ziehgriff übrig lässt.
        if (inneresPanel) {
            const sync = () => { slot.style.display = inneresPanel.style.display === 'none' ? 'none' : ''; };
            sync();
            new MutationObserver(sync).observe(inneresPanel, { attributes: true, attributeFilter: ['style'] });
        }
    });
}

function gmPanelReihenfolgeAnwenden(spalte) {
    let reihenfolge = [];
    try { reihenfolge = JSON.parse(localStorage.getItem(GM_PANEL_ORDER_KEY)) || []; } catch (e) { reihenfolge = []; }
    if (!reihenfolge.length) return;

    const nachId = {};
    spalte.querySelectorAll(':scope > .gm-panel-slot').forEach(s => { nachId[s.dataset.panel] = s; });
    reihenfolge.forEach(id => { if (nachId[id]) spalte.appendChild(nachId[id]); });
    // Panels, die es in der gespeicherten Liste (noch) nicht gibt - z.B. neu
    // dazugekommene Features wie Seekampf bei einem älteren gespeicherten
    // Stand - hinten anhängen statt sie zu verlieren.
    Object.keys(nachId).forEach(id => { if (!reihenfolge.includes(id)) spalte.appendChild(nachId[id]); });
}

function gmPanelReihenfolgeSichern() {
    const spalte = document.getElementById('gm-panels-spalte');
    if (!spalte) return;
    const reihenfolge = [...spalte.querySelectorAll(':scope > .gm-panel-slot')].map(s => s.dataset.panel);
    sicherSpeichern(GM_PANEL_ORDER_KEY, JSON.stringify(reihenfolge));
}

function gmPanelReihenfolgeZuruecksetzen() {
    const spalte = document.getElementById('gm-panels-spalte');
    if (!spalte) return;
    if (!confirm('Panel-Reihenfolge auf den Standard zurücksetzen?')) return;
    try { localStorage.removeItem(GM_PANEL_ORDER_KEY); } catch (e) { /* egal */ }
    const slots = [...spalte.querySelectorAll(':scope > .gm-panel-slot')]
        .sort((a, b) => parseInt(a.dataset.standardindex) - parseInt(b.dataset.standardindex));
    slots.forEach(s => spalte.appendChild(s));
}

document.addEventListener('DOMContentLoaded', gmPanelsInitialisieren);
