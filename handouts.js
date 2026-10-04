// How to be a Hero - Handouts (Briefe, Bilder, Vorlesetexte für die Spieler)
//
// Der Spielleiter hat eine kleine Handout-Bibliothek (Titel + Text und/oder
// Bild) und zeigt einzelne Handouts allen oder einem Spieler. Beim Spieler
// öffnet sich ein Fenster; alles bisher Erhaltene bleibt bis zum Schließen des
// Tabs über den Knopf "Handouts" in der Symbolleiste nachlesbar (wie die
// Flüsterpost, siehe fluestern.js).
//
// Befüllt wird die Bibliothek aktuell von der PenNodePaper-Brücke
// (pnpbridge.js), sie funktioniert aber unabhängig davon: handoutHinzufuegen()
// legt einen Eintrag an, handoutZeigen() verteilt ihn.
//
// Der SL-Client ist die Autorität, die Handouts liegen im Browser des SL
// (localStorage). Bilder werden vor dem Ablegen verkleinert (battlemap.js:
// bildVerkleinern), sonst wird die Übertragung per WebRTC unhandlich.
//
// Nachrichten (multiplayer.js):
//   SL -> Spieler  { type: 'handout', id, titel, text, bild, zeit }
//
// Eintrag (SL): { id, titel, text, bild (Data-URL oder null), zeit }

const HANDOUT_GM_KEY = 'htbah_gm_handouts';
const HANDOUT_SPIELER_KEY = 'htbah_handouts';
const HANDOUT_MAX_TEXT = 8000;

// --- Spielleiter ------------------------------------------------------------

let handouts = [];

function handoutsLaden() {
    try {
        const roh = JSON.parse(localStorage.getItem(HANDOUT_GM_KEY) || '[]');
        handouts = Array.isArray(roh) ? roh.filter(h => h && typeof h.id === 'string') : [];
    } catch (e) { handouts = []; }
}

function handoutsSichern() {
    sicherSpeichern(HANDOUT_GM_KEY, JSON.stringify(handouts));
}

// Legt ein Handout an oder ersetzt das mit gleicher ID (erneutes Senden aus
// PenNodePaper aktualisiert also, statt zu verdoppeln).
function handoutHinzufuegen(vorlage) {
    const eintrag = {
        id: String(vorlage.id || 'ho_' + Date.now().toString(36)).slice(0, 120),
        titel: String(vorlage.titel || 'Handout').slice(0, 120),
        text: String(vorlage.text || '').slice(0, HANDOUT_MAX_TEXT),
        bild: vorlage.bild || null,
        zeit: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    };
    handouts = [eintrag].concat(handouts.filter(h => h.id !== eintrag.id)).slice(0, 60);
    handoutsSichern();
    handoutsRendernGm();
    return eintrag;
}

function handoutEntfernen(id) {
    handouts = handouts.filter(h => h.id !== id);
    handoutsSichern();
    handoutsRendernGm();
}

// peerIds = Liste von Spielern, oder weglassen für alle Verbundenen.
// Gibt die Zahl der Empfänger zurück.
function handoutZeigen(id, peerIds) {
    const h = handouts.find(x => x.id === id);
    if (!h || typeof clientConnections === 'undefined') return 0;
    const ziele = peerIds || Object.keys(clientConnections);
    const namen = [];
    ziele.forEach(peerId => {
        const conn = clientConnections[peerId];
        if (!conn || !conn.open) return;
        try {
            conn.send({ type: 'handout', id: h.id, titel: h.titel, text: h.text, bild: h.bild, zeit: h.zeit });
            const d = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null;
            namen.push(d ? ([d.vorname, d.name].filter(Boolean).join(' ') || 'Spieler') : 'Spieler');
        } catch (e) { /* Verbindung weg */ }
    });
    if (namen.length && typeof addGmLogEntry === 'function') {
        addGmLogEntry('Spielleiter', `zeigt „${h.titel}“ ${peerIds ? namen.join(', ') : 'allen'}.`, '📜');
    }
    return namen.length;
}

function handoutsModal() {
    let overlay = document.getElementById('handouts-modal-overlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'handouts-modal-overlay';
    overlay.className = 'help-modal-overlay';
    overlay.innerHTML = `
        <div class="help-modal-box handouts-modal" role="dialog" aria-label="Handouts">
            <button class="modal-close" aria-label="Schließen"><i class="fa-solid fa-xmark"></i></button>
            <h3 style="color: var(--color-accent); margin-top: 0;"><i class="fa-solid fa-scroll"></i> Handouts</h3>
            <div id="handouts-liste-gm"></div>
        </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
    overlay.querySelector('.modal-close').addEventListener('click', () => overlay.classList.remove('active'));
    document.body.appendChild(overlay);
    return overlay;
}

function handoutsOeffnenGm() {
    handoutsModal().classList.add('active');
    handoutsRendernGm();
}

function handoutsRendernGm() {
    const box = document.getElementById('handouts-liste-gm');
    if (!box) return;
    const spieler = typeof connectedPlayersData !== 'undefined' ? Object.keys(connectedPlayersData) : [];
    const optionen = spieler.map(peerId => {
        const d = connectedPlayersData[peerId];
        return `<option value="${escapeHtml(peerId)}">${escapeHtml([d.vorname, d.name].filter(Boolean).join(' ') || 'Spieler')}</option>`;
    }).join('');
    if (!handouts.length) {
        box.innerHTML = '<div class="x-leer">Noch keine Handouts. Sie kommen aus PenNodePaper (Handout senden), sobald die Verbindung steht.</div>';
        return;
    }
    box.innerHTML = handouts.map(h => `
        <div class="ho-eintrag" data-hoid="${escapeHtml(h.id)}">
            <div class="ho-kopf"><strong>${escapeHtml(h.titel)}</strong><span>${escapeHtml(h.zeit)}</span></div>
            ${h.bild ? `<img class="ho-bild" src="${escapeHtml(h.bild)}" alt="">` : ''}
            ${h.text ? `<div class="ho-text">${escapeHtml(h.text)}</div>` : ''}
            <div class="ho-aktionen">
                <button class="gm-btn" data-hoalle><i class="fa-solid fa-users"></i> Allen zeigen</button>
                <select class="gm-select" data-hospieler ${spieler.length ? '' : 'disabled'}>${optionen || '<option>kein Spieler</option>'}</select>
                <button class="gm-btn" data-hoeinzeln ${spieler.length ? '' : 'disabled'}><i class="fa-solid fa-user"></i> Zeigen</button>
                <button class="gm-btn gm-btn-icon" data-howeg title="Aus der Bibliothek löschen"><i class="fa-solid fa-trash" style="color:#ed4245;"></i></button>
            </div>
        </div>`).join('');
    box.querySelectorAll('.ho-eintrag').forEach(zeile => {
        const id = zeile.dataset.hoid;
        zeile.querySelector('[data-hoalle]').addEventListener('click', () => handoutZeigen(id));
        zeile.querySelector('[data-hoeinzeln]').addEventListener('click', () => {
            const peerId = zeile.querySelector('[data-hospieler]').value;
            if (peerId) handoutZeigen(id, [peerId]);
        });
        zeile.querySelector('[data-howeg]').addEventListener('click', () => handoutEntfernen(id));
    });
}

// --- Spieler ----------------------------------------------------------------

let handoutVerlauf = []; // { id, titel, text, bild, zeit }

function handoutVerlaufLaden() {
    try {
        const roh = JSON.parse(sessionStorage.getItem(HANDOUT_SPIELER_KEY) || '[]');
        handoutVerlauf = Array.isArray(roh) ? roh.filter(h => h && typeof h.id === 'string').slice(0, 20) : [];
    } catch (e) { handoutVerlauf = []; }
}

function handoutVerlaufSichern() {
    // sessionStorage ist klein (~5 MB): bei Platzmangel zuerst die ältesten Bilder weglassen
    for (let n = handoutVerlauf.length; n >= 0; n--) {
        try {
            sessionStorage.setItem(HANDOUT_SPIELER_KEY, JSON.stringify(handoutVerlauf.map((h, i) => i < n ? h : Object.assign({}, h, { bild: null }))));
            return;
        } catch (e) { /* weiter kürzen */ }
    }
}

function handoutNachrichtVerarbeiten(payload) {
    if (!payload || payload.type !== 'handout') return false;
    const bild = typeof payload.bild === 'string' && /^(data:image\/|assets\/)/.test(payload.bild) ? payload.bild : null;
    const eintrag = {
        id: String(payload.id || '').slice(0, 120),
        titel: String(payload.titel || 'Handout').slice(0, 120),
        text: String(payload.text || '').slice(0, HANDOUT_MAX_TEXT),
        bild,
        zeit: String(payload.zeit || '').slice(0, 10)
    };
    if (!eintrag.id || (!eintrag.text && !eintrag.bild)) return true;
    handoutVerlauf = [eintrag].concat(handoutVerlauf.filter(h => h.id !== eintrag.id)).slice(0, 20);
    handoutVerlaufSichern();
    if (typeof fluesternPing === 'function') fluesternPing();
    handoutKnopfAktualisieren();
    handoutVerlaufOeffnen();
    return true;
}

function handoutKnopfAktualisieren() {
    const btn = document.getElementById('btn-handouts');
    if (btn) btn.style.display = handoutVerlauf.length ? '' : 'none';
}

function handoutVerlaufOeffnen() {
    let overlay = document.getElementById('handout-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'handout-modal-overlay';
        overlay.className = 'help-modal-overlay';
        overlay.innerHTML = `
            <div class="help-modal-box handouts-modal" role="dialog" aria-label="Handouts">
                <button class="modal-close" aria-label="Schließen"><i class="fa-solid fa-xmark"></i></button>
                <h3 style="color: var(--color-accent); margin-top: 0;"><i class="fa-solid fa-scroll"></i> Handouts</h3>
                <p class="hr-hint" style="margin-top:0">Vom Spielleiter gezeigt - bleibt bis zum Schließen dieses Tabs erhalten.</p>
                <div id="handout-liste"></div>
            </div>`;
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
        overlay.querySelector('.modal-close').addEventListener('click', () => overlay.classList.remove('active'));
        document.body.appendChild(overlay);
    }
    const liste = document.getElementById('handout-liste');
    liste.innerHTML = handoutVerlauf.length
        ? handoutVerlauf.map(h => `
            <div class="ho-eintrag">
                <div class="ho-kopf"><strong>${escapeHtml(h.titel)}</strong><span>${escapeHtml(h.zeit)}</span></div>
                ${h.bild ? `<img class="ho-bild" src="${escapeHtml(h.bild)}" alt="${escapeHtml(h.titel)}">` : ''}
                ${h.text ? `<div class="ho-text">${escapeHtml(h.text)}</div>` : ''}
            </div>`).join('')
        : '<div class="x-leer">Noch nichts erhalten.</div>';
    overlay.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    handoutsLaden();
    handoutVerlaufLaden();
    handoutKnopfAktualisieren();
});
