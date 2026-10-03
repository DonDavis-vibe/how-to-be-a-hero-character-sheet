// How to be a Hero - Anflüstern
//
// Der Spielleiter schickt einem oder mehreren Spielern eine private Nachricht,
// die nur sie sehen: "Du bemerkst, dass der Wirt nervös ist", "Das war eine
// Lüge". Die anderen am Tisch bekommen nichts davon mit.
//
// Wichtig: Flüsternachrichten laufen bewusst NICHT durch addActivityLog() -
// das schickt jeden Eintrag an Discord und ins Live-Log aller. Sie haben eine
// eigene Ablage (sessionStorage des Spielers, übersteht einen Reload mitten in
// der Sitzung) und tauchen auch nicht im Charakterbogen/Export auf.
//
// Nachrichten (multiplayer.js):
//   SL -> Spieler  { type: 'fluestern', id, text, zeit }
//   Spieler -> SL  { type: 'fluesternGelesen', id }   (Lesebestätigung)
//
// Spielleiter-Seite: Modal mit Empfänger-Auswahl, eingehängt in die Spielerkarte
// ("Anflüstern") und die SL-Leiste. Spieler-Seite: Hinweiskarte oben, die stehen
// bleibt, bis der Spieler sie als gelesen bestätigt, plus eine Verlaufsliste.

const FLUESTERN_MAX = 600;
const FLUESTERN_STORAGE_KEY = 'htbah_fluesterpost';

// --- Spielleiter ------------------------------------------------------------

const fluestern = {
    empfaenger: new Set(), // peerIds
    verlauf: [],           // gesendete Nachrichten dieser Sitzung (nur SL)
    entwurf: '',
};

function fluesternSpielerName(d) {
    return d ? ([d.vorname, d.name].filter(Boolean).join(' ') || 'Unbekannt') : 'Unbekannt';
}

function fluesternVerbundene() {
    const daten = typeof connectedPlayersData !== 'undefined' ? connectedPlayersData : {};
    const verbindungen = typeof clientConnections !== 'undefined' ? clientConnections : {};
    return Object.keys(daten)
        .filter(id => verbindungen[id] && verbindungen[id].open)
        .map(id => ({ id, name: fluesternSpielerName(daten[id]) }));
}

function fluesternModal() {
    let overlay = document.getElementById('fluestern-modal-overlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'fluestern-modal-overlay';
    overlay.className = 'help-modal-overlay';
    overlay.innerHTML = `
        <div class="help-modal-box fluestern-modal" role="dialog" aria-label="Spieler anflüstern">
            <button class="modal-close" aria-label="Schließen"><i class="fa-solid fa-xmark"></i></button>
            <h3 style="color: var(--color-accent); margin-top: 0;"><i class="fa-solid fa-comment-dots"></i> Anflüstern <i class="fa-solid fa-circle-question help-icon" onclick="showHelp('fluestern')" title="Hilfe zum Anflüstern"></i></h3>
            <div id="fluestern-body"></div>
        </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) fluesternSchliessen(); });
    overlay.querySelector('.modal-close').addEventListener('click', fluesternSchliessen);
    document.body.appendChild(overlay);
    return overlay;
}

// peerId optional: vorausgewählter Empfänger (Knopf auf der Spielerkarte)
function fluesternOeffnen(peerId) {
    const overlay = fluesternModal();
    fluestern.empfaenger = new Set(peerId ? [peerId] : []);
    fluesternRendern();
    overlay.classList.add('active');
    setTimeout(() => { const t = document.getElementById('fl-text'); if (t) t.focus(); }, 50);
}

function fluesternSchliessen() {
    const overlay = document.getElementById('fluestern-modal-overlay');
    if (overlay) overlay.classList.remove('active');
}

// Auch aufrufbar, wenn Spieler kommen/gehen - Text und Auswahl bleiben stehen
function fluesternAktualisieren() {
    const overlay = document.getElementById('fluestern-modal-overlay');
    if (overlay && overlay.classList.contains('active')) fluesternRendern();
}

function fluesternRendern() {
    const body = document.getElementById('fluestern-body');
    if (!body) return;
    const textEl = document.getElementById('fl-text');
    if (textEl) fluestern.entwurf = textEl.value;
    const spieler = fluesternVerbundene();
    // Ausgewählte, inzwischen getrennte Spieler fallen heraus
    fluestern.empfaenger = new Set([...fluestern.empfaenger].filter(id => spieler.some(s => s.id === id)));

    if (!spieler.length) {
        body.innerHTML = '<p class="hr-hint">Gerade ist kein Spieler verbunden.</p>';
        return;
    }
    const farbe = n => (typeof getColorForPlayer === 'function' ? getColorForPlayer(n) : 'var(--color-accent)');
    body.innerHTML = `
        <p class="hr-hint" style="margin-top:0">Nur die gewählten Spieler sehen die Nachricht - kein Logbuch, kein Discord.</p>
        <div class="fl-empfaenger">
            ${spieler.map(s => `
                <label class="fl-chip ${fluestern.empfaenger.has(s.id) ? 'fl-chip-an' : ''}" style="--fl-farbe:${escapeHtml(farbe(s.name))}">
                    <input type="checkbox" data-flid="${escapeHtml(s.id)}" ${fluestern.empfaenger.has(s.id) ? 'checked' : ''}>
                    <span>${escapeHtml(s.name)}</span>
                </label>`).join('')}
            ${spieler.length > 1 ? `<button class="x-mini" id="fl-alle" type="button">${fluestern.empfaenger.size === spieler.length ? 'Keinen' : 'Alle'}</button>` : ''}
        </div>
        <textarea id="fl-text" class="x-input fl-text" maxlength="${FLUESTERN_MAX}" rows="4" placeholder="Was soll nur sie/er hören …">${escapeHtml(fluestern.entwurf)}</textarea>
        <div class="fl-fuss">
            <span class="hr-dim" id="fl-zaehler"></span>
            <button class="tool-btn" id="fl-senden" type="button"><i class="fa-solid fa-paper-plane"></i> Zuflüstern</button>
        </div>
        <div id="fl-status" class="hr-hint" style="min-height:1.2rem"></div>
        ${fluestern.verlauf.length ? `
        <h4 class="fl-h4">Zuletzt geflüstert</h4>
        <ul class="fl-verlauf">${fluestern.verlauf.slice(0, 8).map(v => `
            <li><span class="fl-verlauf-kopf">${escapeHtml(v.zeit)} · an ${escapeHtml(v.an.join(', '))}${v.gelesen.length ? ` · ✓ gelesen: ${escapeHtml(v.gelesen.join(', '))}` : ''}</span>
            <span class="fl-verlauf-text">${escapeHtml(v.text)}</span></li>`).join('')}</ul>` : ''}`;

    body.querySelectorAll('[data-flid]').forEach(cb => cb.addEventListener('change', () => {
        if (cb.checked) fluestern.empfaenger.add(cb.dataset.flid); else fluestern.empfaenger.delete(cb.dataset.flid);
        cb.closest('.fl-chip').classList.toggle('fl-chip-an', cb.checked);
        const alle = document.getElementById('fl-alle');
        if (alle) alle.textContent = fluestern.empfaenger.size === spieler.length ? 'Keinen' : 'Alle';
    }));
    const alle = document.getElementById('fl-alle');
    if (alle) alle.addEventListener('click', () => {
        const alleAn = fluestern.empfaenger.size === spieler.length;
        fluestern.empfaenger = new Set(alleAn ? [] : spieler.map(s => s.id));
        fluesternRendern();
    });
    const text = document.getElementById('fl-text');
    const zaehler = document.getElementById('fl-zaehler');
    const zaehlen = () => { zaehler.textContent = `${text.value.length}/${FLUESTERN_MAX}`; };
    text.addEventListener('input', () => { fluestern.entwurf = text.value; zaehlen(); });
    text.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); fluesternSenden(); } });
    zaehlen();
    document.getElementById('fl-senden').addEventListener('click', fluesternSenden);
}

function fluesternMeldung(text, warnung) {
    const el = document.getElementById('fl-status');
    if (!el) return;
    el.textContent = text;
    el.style.color = warnung ? 'var(--color-dmg)' : 'var(--color-heal)';
}

function fluesternSenden() {
    const textEl = document.getElementById('fl-text');
    const text = (textEl ? textEl.value : '').trim().slice(0, FLUESTERN_MAX);
    if (!text) { if (textEl) textEl.focus(); return; }
    if (!fluestern.empfaenger.size) { fluesternMeldung('Erst einen Empfänger wählen.', true); return; }

    const id = 'fl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const zeit = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const namen = [];
    let gesendet = 0;
    fluestern.empfaenger.forEach(peerId => {
        const conn = typeof clientConnections !== 'undefined' ? clientConnections[peerId] : null;
        const name = fluesternSpielerName(typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null);
        if (!conn || !conn.open) return;
        try { conn.send({ type: 'fluestern', id, text, zeit }); gesendet++; namen.push(name); } catch (e) { /* weg */ }
    });
    if (!gesendet) { fluesternMeldung('Senden fehlgeschlagen - Verbindung weg?', true); return; }

    fluestern.verlauf.unshift({ id, text, zeit, an: namen, gelesen: [], peers: [...fluestern.empfaenger] });
    if (fluestern.verlauf.length > 30) fluestern.verlauf.pop();
    // Nur im SL-Feed - der Text selbst ist dort ebenfalls privat (nur der SL sieht das Dashboard)
    if (typeof addGmLogEntry === 'function') addGmLogEntry('Spielleiter', `flüstert ${namen.join(', ')} zu: „${text}“`, '🤫');
    fluestern.entwurf = '';
    if (textEl) textEl.value = ''; // sonst liest fluesternRendern() den alten Text zurück
    fluesternRendern();
    fluesternMeldung(`✓ An ${namen.join(', ')} geflüstert.`);
}

// Spieler -> SL: Lesebestätigung. Wird aus handleIncomingData() aufgerufen.
function fluesternAnfrageVerarbeiten(peerId, payload) {
    if (!payload || payload.type !== 'fluesternGelesen') return false;
    const eintrag = fluestern.verlauf.find(v => v.id === payload.id && v.peers.includes(peerId));
    if (!eintrag) return true;
    const name = fluesternSpielerName(typeof connectedPlayersData !== 'undefined' ? connectedPlayersData[peerId] : null);
    if (!eintrag.gelesen.includes(name)) eintrag.gelesen.push(name);
    if (typeof addGmLogEntry === 'function') addGmLogEntry(name, 'hat die Flüsternachricht gelesen.', '👁️');
    fluesternAktualisieren();
    return true;
}

// --- Spieler ----------------------------------------------------------------

let fluesterpost = []; // { id, text, zeit, gelesen }

function fluesterpostLaden() {
    try {
        const roh = JSON.parse(sessionStorage.getItem(FLUESTERN_STORAGE_KEY) || '[]');
        fluesterpost = Array.isArray(roh) ? roh.filter(m => m && typeof m.id === 'string' && typeof m.text === 'string').slice(0, 50) : [];
    } catch (e) { fluesterpost = []; }
}

function fluesterpostSichern() {
    try { sessionStorage.setItem(FLUESTERN_STORAGE_KEY, JSON.stringify(fluesterpost)); } catch (e) { /* sessionStorage evtl. blockiert */ }
}

// Kurzer, unaufdringlicher Zweiklang - ohne Sounddatei, folgt Ton-Schalter und Lautstärke
function fluesternPing() {
    try {
        if (typeof soundEnabled !== 'undefined' && !soundEnabled) return;
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const lautstaerke = 0.18 * (typeof getPlayerVolume === 'function' ? getPlayerVolume() : 1);
        [[659, 0], [880, 0.14]].forEach(([freq, start]) => {
            const osz = ctx.createOscillator(), gain = ctx.createGain();
            osz.type = 'sine'; osz.frequency.value = freq;
            gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
            gain.gain.exponentialRampToValueAtTime(Math.max(lautstaerke, 0.0002), ctx.currentTime + start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + 0.35);
            osz.connect(gain); gain.connect(ctx.destination);
            osz.start(ctx.currentTime + start); osz.stop(ctx.currentTime + start + 0.4);
        });
        setTimeout(() => ctx.close().catch(() => {}), 1000);
    } catch (e) { /* Audio blockiert - dann eben still */ }
}

function fluesternNachrichtVerarbeiten(payload) {
    if (!payload || payload.type !== 'fluestern') return false;
    const text = String(payload.text || '').slice(0, FLUESTERN_MAX);
    const id = String(payload.id || '').slice(0, 40);
    if (!text || !id || fluesterpost.some(m => m.id === id)) return true;
    fluesterpost.unshift({ id, text, zeit: String(payload.zeit || '').slice(0, 10), gelesen: false });
    fluesterpost = fluesterpost.slice(0, 50);
    fluesterpostSichern();
    fluesternPing();
    fluesterpostAnzeigen();
    return true;
}

function fluesterpostAnzeigen() {
    // Behälter für die Hinweiskarten (ungelesene bleiben stehen)
    let box = document.getElementById('fluestern-toasts');
    if (!box) {
        box = document.createElement('div');
        box.id = 'fluestern-toasts';
        box.setAttribute('aria-live', 'polite');
        document.body.appendChild(box);
    }
    const ungelesen = fluesterpost.filter(m => !m.gelesen).slice().reverse(); // älteste zuerst
    box.innerHTML = ungelesen.map(m => `
        <div class="fl-toast" data-flid="${escapeHtml(m.id)}">
            <div class="fl-toast-kopf"><i class="fa-solid fa-comment-dots"></i> Der Spielleiter flüstert dir zu <span>${escapeHtml(m.zeit)}</span></div>
            <div class="fl-toast-text">${escapeHtml(m.text)}</div>
            <button class="tool-btn fl-toast-ok" type="button">Gelesen</button>
        </div>`).join('');
    box.querySelectorAll('.fl-toast').forEach(t => t.querySelector('.fl-toast-ok').addEventListener('click', () => fluesterpostGelesen(t.dataset.flid)));

    // Verlauf-Knopf in der Symbolleiste erst zeigen, wenn es etwas zu lesen gibt
    const btn = document.getElementById('btn-fluesterpost');
    if (btn) {
        btn.style.display = fluesterpost.length ? '' : 'none';
        const zahl = btn.querySelector('.fl-zahl');
        if (zahl) { zahl.textContent = ungelesen.length ? ungelesen.length : ''; zahl.style.display = ungelesen.length ? '' : 'none'; }
    }
}

function fluesterpostGelesen(id) {
    const m = fluesterpost.find(x => x.id === id);
    if (!m || m.gelesen) return;
    m.gelesen = true;
    fluesterpostSichern();
    fluesterpostAnzeigen();
    if (typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open) {
        try { hostConnection.send({ type: 'fluesternGelesen', id }); } catch (e) { /* Verbindung weg - nicht schlimm */ }
    }
    fluesterpostVerlaufRendern();
}

function fluesterpostVerlaufOeffnen() {
    let overlay = document.getElementById('fluesterpost-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'fluesterpost-modal-overlay';
        overlay.className = 'help-modal-overlay';
        overlay.innerHTML = `
            <div class="help-modal-box fluestern-modal" role="dialog" aria-label="Flüsterpost">
                <button class="modal-close" aria-label="Schließen"><i class="fa-solid fa-xmark"></i></button>
                <h3 style="color: var(--color-accent); margin-top: 0;"><i class="fa-solid fa-comment-dots"></i> Flüsterpost</h3>
                <p class="hr-hint" style="margin-top:0">Nur für dich - bleibt bis zum Schließen dieses Tabs erhalten.</p>
                <div id="fluesterpost-liste"></div>
            </div>`;
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
        overlay.querySelector('.modal-close').addEventListener('click', () => overlay.classList.remove('active'));
        document.body.appendChild(overlay);
    }
    fluesterpostVerlaufRendern();
    overlay.classList.add('active');
}

function fluesterpostVerlaufRendern() {
    const liste = document.getElementById('fluesterpost-liste');
    if (!liste) return;
    liste.innerHTML = fluesterpost.length
        ? `<ul class="fl-verlauf">${fluesterpost.map(m => `
            <li><span class="fl-verlauf-kopf">${escapeHtml(m.zeit)}${m.gelesen ? '' : ' · neu'}</span><span class="fl-verlauf-text">${escapeHtml(m.text)}</span></li>`).join('')}</ul>`
        : '<div class="x-leer">Noch nichts erhalten.</div>';
}

document.addEventListener('DOMContentLoaded', () => {
    fluesterpostLaden();
    if (fluesterpost.length) fluesterpostAnzeigen();
});
