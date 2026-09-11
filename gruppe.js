// How to be a Hero - Gruppenübersicht für Spieler
//
// Spieler sehen im Multiplayer bislang nur ihren eigenen Bogen; der Überblick
// über die Runde liegt allein beim Spielleiter. Dieses Modul gibt jedem Spieler
// ein kleines Panel mit dem Nötigsten über seine Mitspieler: Name, Lebenspunkte,
// Status-Effekte. Bewusst nicht mehr - Skills, Inventar und Notizen bleiben
// Sache des jeweiligen Spielers und des SL.
//
// Die Daten laufen über den SL (er hat sie ohnehin): Nach jedem Bogen-Update
// eines Spielers schickt er allen eine kompakte Liste. Spieler untereinander
// sind nicht verbunden, das bleibt beim Stern-Netz von multiplayer.js.
//
//   SL -> Spieler   { type: 'gruppe', spieler: [{ peerId, name, hpCurrent, hpMax, statuses, farbe, bild }] }
//
// `bild` ist ein vom SL-Client heruntergerechnetes Thumbnail (72 px, JPEG,
// wenige KB) - das Original-Portrait ist Base64 und gern mehrere hundert KB,
// das wollen wir nicht bei jedem HP-Update an alle schicken.

let gruppeSpieler = [];
let gruppeVerteilenTimer = null;
// SL: peerId -> { sig, bild } - Thumbnail wird nur neu gebaut, wenn sich das
// Portrait ändert (Signatur = Länge + Anfang des Data-URIs)
const gruppeThumbs = {};
const GRUPPE_THUMB_PX = 72;
// Auf-/zugeklappt - das Panel wird bei jedem Update neu gebaut, die Wahl bleibt
let gruppeOffen = true;

// --- Spielleiter ------------------------------------------------------------

// Kompakte Sicht auf alle verbundenen Spieler. Kein Portrait: das ist Base64 und
// würde jede Aktualisierung um hunderte Kilobyte aufblasen.
function gruppeDaten() {
    if (typeof connectedPlayersData === 'undefined') return [];
    return Object.keys(connectedPlayersData).map(peerId => {
        const d = connectedPlayersData[peerId] || {};
        const name = [d.vorname, d.name].filter(Boolean).join(' ') || 'Unbekannt';
        return {
            peerId,
            name,
            bild: gruppeThumbnail(peerId, d.portrait),
            hpCurrent: parseInt(d.hpCurrent) || 0,
            hpMax: parseInt(d.hpMax) || 0,
            statuses: (Array.isArray(d.statuses) ? d.statuses : []).slice(0, 12).map(s => (typeof s === 'string')
                ? { name: s, value: '', type: 'malus' }
                : { name: String(s.name || '?'), value: String(s.value || ''), type: s.type || 'malus' }),
            farbe: typeof getColorForPlayer === 'function' ? getColorForPlayer(name) : '#9ca3af'
        };
    });
}

// Liefert das gecachte Thumbnail oder null - und stößt im Hintergrund die
// Erzeugung an, wenn das Portrait neu ist. Sobald es fertig ist, geht die
// Gruppe noch einmal raus.
function gruppeThumbnail(peerId, portrait) {
    const src = typeof safeImageSrc === 'function' ? safeImageSrc(portrait) : String(portrait || '');
    if (!src || !src.startsWith('data:image/')) { delete gruppeThumbs[peerId]; return null; }
    const sig = src.length + ':' + src.slice(-40);
    const cache = gruppeThumbs[peerId];
    if (cache && cache.sig === sig) return cache.bild;
    if (cache && cache.laedt === sig) return cache.bild || null;

    gruppeThumbs[peerId] = { sig: cache ? cache.sig : null, bild: cache ? cache.bild : null, laedt: sig };
    const img = new Image();
    img.onload = () => {
        try {
            const c = document.createElement('canvas');
            c.width = GRUPPE_THUMB_PX; c.height = GRUPPE_THUMB_PX;
            const ctx = c.getContext('2d');
            // "cover": kürzere Seite füllt das Quadrat, Rest wird beschnitten
            const s = Math.min(img.width, img.height);
            ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, GRUPPE_THUMB_PX, GRUPPE_THUMB_PX);
            gruppeThumbs[peerId] = { sig, bild: c.toDataURL('image/jpeg', 0.7) };
        } catch (e) {
            gruppeThumbs[peerId] = { sig, bild: null };
        }
        gruppeVerteilen();
    };
    img.onerror = () => { gruppeThumbs[peerId] = { sig, bild: null }; };
    img.src = src;
    return cache ? cache.bild : null;
}

function gruppeThumbVergessen(peerId) {
    delete gruppeThumbs[peerId];
}

// Bogen-Updates kommen bei jedem Tastendruck - kurz sammeln, dann einmal senden.
function gruppeVerteilen() {
    clearTimeout(gruppeVerteilenTimer);
    gruppeVerteilenTimer = setTimeout(gruppeJetztVerteilen, 250);
}

function gruppeJetztVerteilen() {
    if (typeof clientConnections === 'undefined') return;
    const nachricht = { type: 'gruppe', spieler: gruppeDaten() };
    Object.values(clientConnections).forEach(conn => {
        if (conn && conn.open) { try { conn.send(nachricht); } catch (e) { /* weg */ } }
    });
}

function gruppeAnVerbindung(conn) {
    if (!conn || !conn.open) return;
    try { conn.send({ type: 'gruppe', spieler: gruppeDaten() }); } catch (e) { /* weg */ }
}

// --- Spieler ----------------------------------------------------------------

function gruppeEmpfangen(spieler) {
    gruppeSpieler = Array.isArray(spieler) ? spieler : [];
    renderGruppe();
}

function gruppeGetrennt() {
    gruppeSpieler = [];
    renderGruppe();
}

function gruppeNachrichtVerarbeiten(payload) {
    if (payload && payload.type === 'gruppe') { gruppeEmpfangen(payload.spieler); return true; }
    return false;
}

function renderGruppe() {
    const panel = document.getElementById('gruppe-panel');
    if (!panel) return;
    const verbunden = typeof hostConnection !== 'undefined' && hostConnection && hostConnection.open;
    if (!verbunden || (typeof isGmMode !== 'undefined' && isGmMode)) {
        panel.style.display = 'none';
        panel.innerHTML = '';
        return;
    }
    panel.style.display = '';
    const meinPeer = typeof peer !== 'undefined' && peer ? peer.id : null;
    const andere = gruppeSpieler.filter(s => s.peerId !== meinPeer);

    const zeilen = andere.map(s => {
        const max = s.hpMax > 0 ? s.hpMax : 1;
        const prozent = Math.max(0, Math.min(100, (s.hpCurrent / max) * 100));
        let farbe = '#57F287';
        if (prozent <= 50) farbe = '#fee75c';
        const kritisch = s.hpCurrent <= 10;
        if (kritisch) farbe = '#ed4245';
        const tags = (s.statuses || []).map(st => {
            const typ = ['bonus', 'malus', 'neutral'].includes(st.type) ? st.type : 'malus';
            return `<span class="status-badge ${typ}">${escapeHtml(st.name)}${st.value ? ' (' + escapeHtml(st.value) + ')' : ''}</span>`;
        }).join('');
        const bild = s.bild && typeof safeImageSrc === 'function' && safeImageSrc(s.bild) !== 'assets/giphy.gif' ? s.bild : null;
        return `
        <div class="gr-spieler card-layout ${kritisch ? 'low-hp-warning' : ''}" style="--gr-farbe: ${escapeHtml(s.farbe || '#9ca3af')}">
            <div class="gr-kopf">
                ${bild
                    ? `<img class="gr-bild" src="${bild}" alt="">`
                    : `<span class="gr-bild gr-bild-leer"><i class="fa-solid fa-user"></i></span>`}
                <span class="gr-name">${escapeHtml(s.name)}</span>
                <span class="gr-hp ${kritisch ? 'hp-text-danger' : ''}"><i class="fa-solid fa-heart"></i> ${s.hpCurrent} / ${s.hpMax}</span>
            </div>
            <div class="gr-balken"><div class="gr-balken-fuellung" style="width:${prozent}%; background:${farbe}"></div></div>
            ${tags ? `<div class="gr-tags">${tags}</div>` : ''}
        </div>`;
    }).join('');

    panel.innerHTML = `
        <details class="x-details gr-details" ${gruppeOffen ? 'open' : ''}>
            <summary>
                <h3 style="margin:0"><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-people-group"></i> Gruppe
                    ${andere.length ? `<span class="x-count">${andere.length}</span>` : ''}
                    <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); event.stopPropagation(); showHelp('gruppe')" title="Hilfe zur Gruppenübersicht"></i></h3>
            </summary>
            <div class="gr-liste">${zeilen || '<div class="x-leer">Noch niemand sonst in der Runde.</div>'}</div>
        </details>`;
    const details = panel.querySelector('details');
    if (details) details.addEventListener('toggle', () => { gruppeOffen = details.open; });
}
