let peer = null;
let hostConnection = null;
let clientConnections = {};
let isGmMode = false;
let connectedPlayersData = {};

let peerJsLoaded = false;
let peerJsLoading = false;
let peerJsLoadCallbacks = [];
let joinTimeout = null;
let hostReconnectAttempts = 0;
let hostReconnectPending = false;
let roomOnline = false;

// Lädt PeerJS bei Bedarf nach (Modal öffnen ODER Reload-Wiederherstellung) und
// ruft callback erst auf, wenn Peer wirklich verfügbar ist. Mehrfachaufrufe
// während des Ladens sammeln sich in einer Warteschlange statt das Script
// mehrfach einzubinden.
function ensurePeerJsLoaded(callback) {
    if (peerJsLoaded && typeof Peer !== 'undefined') {
        callback();
        return;
    }
    peerJsLoadCallbacks.push(callback);
    if (peerJsLoading) return;
    peerJsLoading = true;
    const script = document.createElement('script');
    script.src = "https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js";
    script.onload = () => {
        peerJsLoaded = true;
        peerJsLoading = false;
        const callbacks = peerJsLoadCallbacks;
        peerJsLoadCallbacks = [];
        callbacks.forEach(cb => cb());
    };
    script.onerror = () => {
        peerJsLoading = false;
        console.error('PeerJS konnte nicht geladen werden.');
    };
    document.head.appendChild(script);
}

// --- Reload-Schutz: Rolle + Raum-Code überleben einen Reload (sessionStorage,
// nicht localStorage - eine versehentlich vor Tagen offen gelassene Session
// soll nicht in einer neuen Runde wieder auftauchen, ein Reload MITTEN in der
// laufenden Session aber schon). SL und Spieler versuchen beim nächsten Laden
// automatisch, denselben Raum wieder zu erreichen. ---
const MULTIPLAYER_SESSION_KEY = 'htbah_multiplayer_session';

function saveMultiplayerSession(role, code) {
    try { sessionStorage.setItem(MULTIPLAYER_SESSION_KEY, JSON.stringify({ role, roomCode: code })); } catch (e) { /* sessionStorage evtl. blockiert */ }
}
function clearMultiplayerSession() {
    try { sessionStorage.removeItem(MULTIPLAYER_SESSION_KEY); } catch (e) { /* sessionStorage evtl. blockiert */ }
}
function loadMultiplayerSession() {
    try { return JSON.parse(sessionStorage.getItem(MULTIPLAYER_SESSION_KEY) || 'null'); } catch (e) { return null; }
}

let multiplayerAutoRestoreAttempted = false;

function tryRestoreMultiplayerSession() {
    if (multiplayerAutoRestoreAttempted) return;
    multiplayerAutoRestoreAttempted = true;

    const stored = loadMultiplayerSession();
    if (!stored || !stored.roomCode) return;

    if (stored.role === 'gm') {
        updateMultiplayerStatus("Stelle vorherige Sitzung wieder her...", "#fbbf24");
        ensurePeerJsLoaded(() => hostMultiplayerSession(stored.roomCode));
    } else if (stored.role === 'player') {
        updateMultiplayerStatus("Stelle vorherige Sitzung wieder her...", "#fbbf24");
        ensurePeerJsLoaded(() => joinMultiplayerSession(stored.roomCode));
    }
}

document.addEventListener('DOMContentLoaded', tryRestoreMultiplayerSession);

function openMultiplayerModal() {
    if (!peerJsLoaded) {
        updateMultiplayerStatus("Lade Multiplayer-Komponenten...", "#fbbf24");
        ensurePeerJsLoaded(() => updateMultiplayerStatus(""));
    }

    const modal = document.getElementById('multiplayer-modal-overlay');
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
    loadTurnSettings();
}

function toggleTurnSettings() {
    const box = document.getElementById('turn-settings');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function closeMultiplayerModal() {
    const modal = document.getElementById('multiplayer-modal-overlay');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function updateMultiplayerStatus(text, color = "white") {
    const statusEl = document.getElementById('multiplayer-status');
    statusEl.innerHTML = text;
    statusEl.style.color = color;
}

// --- CONNECTION CONFIG ---
// STUN reicht nur, solange beide Seiten eine direkte P2P-Verbindung aufbauen können.
// Hinter symmetrischem NAT (Mobilfunk/CGNAT, Firmennetze) oder wenn UDP blockiert ist,
// braucht es einen TURN-Server, der den Traffic weiterleitet.
//
// Hier optional einen eigenen TURN-Server eintragen (z.B. selbst gehostetes coturn oder
// ein Anbieter-Konto). Spieler können zusätzlich im Multiplayer-Menü einen eigenen
// TURN-Server hinterlegen, der dann zusammen mit diesem verwendet wird.
// Beispiel:
// const DEFAULT_TURN_SERVER = {
//     urls: ['turn:turn.example.com:3478', 'turns:turn.example.com:5349'],
//     username: 'user',
//     credential: 'pass'
// };
const DEFAULT_TURN_SERVER = null;

// Nach dieser Zeit gilt ein Beitritt als gescheitert (WebRTC meldet das nicht selbst)
const JOIN_TIMEOUT_MS = 20000;

const STUN_SERVERS = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
];

// Vom Nutzer im Multiplayer-Menü hinterlegter TURN-Server
function getCustomTurnServer() {
    try {
        const stored = JSON.parse(localStorage.getItem('multiplayer_turn') || 'null');
        if (stored && stored.urls) return stored;
    } catch (e) {
        console.warn('TURN-Konfiguration unlesbar, wird ignoriert.', e);
    }
    return null;
}

function getPeerConfig() {
    const iceServers = [...STUN_SERVERS];
    if (DEFAULT_TURN_SERVER) iceServers.push(DEFAULT_TURN_SERVER);
    const custom = getCustomTurnServer();
    if (custom) iceServers.push(custom);
    return { config: { iceServers: iceServers } };
}

function hasTurnConfigured() {
    return !!(DEFAULT_TURN_SERVER || getCustomTurnServer());
}

function saveTurnSettings() {
    const url = document.getElementById('turn-url').value.trim();
    const user = document.getElementById('turn-user').value.trim();
    const pass = document.getElementById('turn-pass').value;

    if (!url) {
        localStorage.removeItem('multiplayer_turn');
        updateMultiplayerStatus("TURN-Server entfernt.", "#9ca3af");
        return;
    }
    if (!/^turns?:/i.test(url)) {
        updateMultiplayerStatus("TURN-URL muss mit turn: oder turns: beginnen.", "#ed4245");
        return;
    }

    localStorage.setItem('multiplayer_turn', JSON.stringify({
        urls: url,
        username: user,
        credential: pass
    }));
    updateMultiplayerStatus('<i class="fa-solid fa-check"></i> TURN-Server gespeichert.', "#57F287");
}

function loadTurnSettings() {
    const custom = getCustomTurnServer();
    if (!custom) return;
    const urlField = document.getElementById('turn-url');
    if (!urlField) return;
    urlField.value = Array.isArray(custom.urls) ? custom.urls[0] : custom.urls;
    document.getElementById('turn-user').value = custom.username || '';
    document.getElementById('turn-pass').value = custom.credential || '';
}

// Generate a random 4-character alphanumeric code
function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for(let i=0; i<4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// --- GM MODE (HOST) ---
// preferredCodeArg: beim Reload-Schutz wird hier der alte Raum-Code übergeben,
// damit versucht wird, dieselbe Peer-ID zurückzuerobern und Spieler automatisch
// wieder andocken können. Defensive Prüfung, falls die Funktion (z.B. als
// onclick-Handler) direkt mit einem Event-Objekt aufgerufen wird.
function hostMultiplayerSession(preferredCodeArg) {
    const preferredCode = typeof preferredCodeArg === 'string' ? preferredCodeArg : undefined;

    if (peer) peer.destroy();

    hostReconnectAttempts = 0;
    hostReconnectPending = false;
    roomOnline = false;
    updateMultiplayerStatus(preferredCode ? "Stelle vorherige Sitzung wieder her..." : "Erstelle Raum...", "#fbbf24");
    const roomCode = preferredCode || generateRoomCode();
    const peerId = 'htbah-' + roomCode;

    peer = new Peer(peerId, getPeerConfig());

    // Achtung: PeerJS feuert 'open' auch nach einem erfolgreichen Reconnect erneut.
    // enterGmMode() darf dann NICHT nochmal laufen - das würde Live-Log und
    // Spielerübersicht mitten in der Session leeren.
    peer.on('open', (id) => {
        if (!isGmMode) {
            closeMultiplayerModal();
            enterGmMode(roomCode);
        } else if (!roomOnline) {
            addGmLogSystemMessage("Verbindung zum Server wiederhergestellt.");
        }
        hostReconnectAttempts = 0;
        setRoomStatus(true);
        saveMultiplayerSession('gm', roomCode);
    });

    // Der Signalling-Server trennt inaktive Peers (Tab im Hintergrund, Standby,
    // kurzer Netzaussetzer). PeerJS meldet sich NICHT von selbst neu an - der Raum
    // bleibt dann für neue Spieler unauffindbar, obwohl das Dashboard weiterläuft.
    peer.on('disconnected', () => {
        setRoomStatus(false);
        reconnectHost();
    });

    peer.on('connection', (conn) => {
        // A player connected
        conn.on('data', (data) => {
            handleIncomingData(conn.peer, data);
        });
        
                conn.on('error', (err) => {
            console.error('Peer connection error:', err);
            delete clientConnections[conn.peer];
            renderGmDashboard();
        });
        conn.on('close', () => {
            delete clientConnections[conn.peer];
            delete connectedPlayersData[conn.peer];
            renderGmDashboard();
            addGmLogSystemMessage(`Spieler hat den Raum verlassen.`);
        });
        
        clientConnections[conn.peer] = conn;
    });
    
    peer.on('error', (err) => {
        if (err.type === 'unavailable-id') {
            clearMultiplayerSession();
            updateMultiplayerStatus(
                preferredCode
                    ? "Alter Raum-Code ist noch nicht wieder freigegeben. Kurz warten und erneut hosten."
                    : "Raum-Code bereits vergeben. Bitte erneut hosten.",
                "#ed4245"
            );
        } else {
            updateMultiplayerStatus("Fehler: " + err.type, "#ed4245");
        }
        console.error(err);
    });
}

function reconnectHost() {
    if (!peer || peer.destroyed || !isGmMode) return;
    if (peer.open) return; // Verbindung steht bereits wieder

    // Ein fehlgeschlagener reconnect() löst erneut 'disconnected' aus - ohne diese
    // Sperre würden sich mehrere Reconnect-Ketten parallel aufschaukeln.
    if (hostReconnectPending) return;

    if (hostReconnectAttempts >= 8) {
        addGmLogSystemMessage("Verbindung zum Server verloren. Bitte Dashboard schließen und neu hosten.");
        return;
    }

    // Backoff: 2s, 4s, 8s ... max 30s
    const delay = Math.min(2000 * Math.pow(2, hostReconnectAttempts), 30000);
    hostReconnectAttempts++;
    hostReconnectPending = true;

    setTimeout(() => {
        if (!peer || peer.destroyed || peer.open) {
            hostReconnectPending = false;
            return;
        }
        try {
            peer.reconnect();
        } catch (e) {
            console.error('Reconnect fehlgeschlagen:', e);
        }
        // peer.open wird asynchron gesetzt - kurz warten, dann Ergebnis prüfen
        setTimeout(() => {
            hostReconnectPending = false;
            if (!peer || peer.destroyed) return;
            if (peer.open) {
                hostReconnectAttempts = 0;
                // Nur melden, wenn der Raum vorher wirklich offline war - sonst
                // erzeugen mehrere 'disconnected'-Events doppelte Log-Einträge.
                if (!roomOnline) {
                    setRoomStatus(true);
                    addGmLogSystemMessage("Verbindung zum Server wiederhergestellt.");
                }
            } else {
                reconnectHost();
            }
        }, 3000);
    }, delay);
}

// Zeigt im Dashboard an, ob der Raum beim Signalling-Server registriert ist.
// Bereits verbundene Spieler bleiben bei "offline" erreichbar (P2P läuft direkt),
// aber neue Spieler können nicht mehr beitreten.
function setRoomStatus(online) {
    roomOnline = online;
    const el = document.getElementById('gm-room-status');
    if (!el) return;

    if (online) {
        el.innerHTML = '<i class="fa-solid fa-circle"></i> Raum online';
        el.style.color = '#57F287';
        el.title = 'Neue Spieler können beitreten.';
    } else {
        el.innerHTML = '<i class="fa-solid fa-circle"></i> Raum offline';
        el.style.color = '#ed4245';
        el.title = 'Verbindung zum Signalling-Server verloren - neue Spieler können gerade nicht beitreten. Reconnect läuft.';
    }
}

function enterGmMode(roomCode) {
    isGmMode = true;
    document.querySelector('.app-container').style.display = 'none';
    document.getElementById('gm-dashboard').style.display = 'flex';
    document.getElementById('gm-room-code').innerText = roomCode;
    document.getElementById('gm-live-log').innerHTML = '';
    const gridCol = document.getElementById('gm-players-grid');
    if (gridCol) gridCol.innerHTML = '';
    
    // Load general GM notes
    const generalNotesField = document.getElementById('gm-general-notes');
    if (generalNotesField) {
        generalNotesField.value = localStorage.getItem('gm_general_notes') || '';
    }
    
    loadGmLogHistory();
    addGmLogSystemMessage(`Session gestartet! Raum-Code: ${roomCode}`);
    if (typeof refreshCustomSoundUI === 'function') refreshCustomSoundUI();
}

function exitGmMode() {
    if (peer) peer.destroy();
    peer = null;
    isGmMode = false;
    clientConnections = {};
    connectedPlayersData = {};
    clearMultiplayerSession();

    document.getElementById('gm-dashboard').style.display = 'none';
    document.querySelector('.app-container').style.display = 'grid';
}

function handleIncomingData(peerId, payload) {
    if (payload.type === 'state') {
        connectedPlayersData[peerId] = payload.data;
        renderGmDashboard();
    } else if (payload.type === 'log') {
        const charName = connectedPlayersData[peerId] ? [connectedPlayersData[peerId].vorname, connectedPlayersData[peerId].name].filter(Boolean).join(' ') : 'Unbekannt';
        addGmLogEntry(charName, payload.message, payload.emoji);
        if (payload.bigNumber !== undefined && payload.bigNumber !== null) {
            updateGmPlayerBigDiceResult(payload.bigNumber, payload.subtitle, charName);
        }
        
        // Trigger Effects based on log content
        if (typeof fireConfetti === 'function') {
            const msg = payload.message || '';
            if (msg.includes('Kritischer Erfolg') || msg.includes('(Max!)')) fireConfetti();
            if (msg.includes('Patzer') || msg.includes('(Min!)')) fireFumble();
        }
    }
}

function updateGmPlayerBigDiceResult(result, text, charName) {
    const resDiv = document.getElementById('gm-player-dice-big-result');
    const subDiv = document.getElementById('gm-player-dice-subtitle');
    const nameDiv = document.getElementById('gm-player-dice-name');
    if(!resDiv) return;
    
    resDiv.style.transform = 'scale(0.5)';
    resDiv.style.opacity = '0';
    
    const playerColor = getColorForPlayer(charName);
    
    setTimeout(() => {
        resDiv.innerText = result;
        resDiv.style.color = playerColor;
        resDiv.style.textShadow = `0 0 15px ${playerColor}99`;
        subDiv.innerHTML = escapeHtml(text);
        nameDiv.innerHTML = `Gewürfelt von: <strong style="color: ${playerColor};">${escapeHtml(charName)}</strong>`;
        resDiv.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        resDiv.style.transform = 'scale(1)';
        resDiv.style.opacity = '1';
    }, 150);
}

const GM_PLAYER_COLORS = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#f97316', '#a855f7', '#14b8a6', '#e11d48', '#84cc16'];

function getColorForPlayer(name) {
    if (!name || name === 'Unbekannt') return '#9ca3af';
    // Check if GM has manually assigned a color
    const stored = localStorage.getItem('gmPlayerColor_' + name);
    if (stored) return stored;
    // Fallback to hash
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return GM_PLAYER_COLORS[Math.abs(hash) % GM_PLAYER_COLORS.length];
}

function setColorForPlayer(name, color) {
    localStorage.setItem('gmPlayerColor_' + name, color);
    renderGmDashboard();
}

// Spielerdaten kommen über WebRTC von fremden Rechnern und landen per innerHTML
// im Dashboard. Ohne Escaping reicht ein Charaktername wie
// '<img src=x onerror="...">', um Code im Browser des Spielleiters auszuführen.
// Gilt für jedes Feld, das ein Spieler selbst befüllt: Name, Beruf, Statur,
// Fähigkeits-, Item- und Waffennamen, Status, Währung.
function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Portraits kommen als data:-URL aus dem Canvas des Spielers. Alles andere -
// insbesondere 'javascript:' in einem src - wäre ein zweiter Weg, fremden Code
// auszuführen, also fällt es auf das Standardbild zurück.
function safeImageSrc(src) {
    const s = String(src || '');
    if (/^data:image\/(png|jpeg|jpg|gif|webp|avif);base64,[A-Za-z0-9+/=]+$/i.test(s.replace(/\s/g, ''))) {
        return s;
    }
    return 'assets/giphy.gif';
}

function renderGmDashboard() {
    const gridCol = document.getElementById('gm-players-grid');
    if (!gridCol) return;
    
    // Capture currently open details sections
    const openStates = {};
    gridCol.querySelectorAll('details').forEach(el => {
        if (el.open && el.dataset.peerId && el.dataset.detailsType) {
            openStates[`${el.dataset.peerId}_${el.dataset.detailsType}`] = true;
        }
    });

    // Capture focus to prevent interrupting GM typing
    const activeEl = document.activeElement;
    let focusedCharName = null;
    let cursorStart = null;
    let cursorEnd = null;
    if (activeEl && activeEl.classList.contains('gm-note-textarea')) {
        focusedCharName = activeEl.dataset.charname;
        cursorStart = activeEl.selectionStart;
        cursorEnd = activeEl.selectionEnd;
    }
    
    gridCol.innerHTML = '';
    
    Object.keys(connectedPlayersData).forEach(peerId => {
        const pData = connectedPlayersData[peerId];
        const hpPercent = pData.hpMax > 0 ? Math.max(0, Math.min(100, (pData.hpCurrent / pData.hpMax) * 100)) : 0;
        let hpColor = "#57F287";
        let hpPulseClass = "";
        if (hpPercent <= 50) hpColor = "#fee75c";
        if (pData.hpCurrent <= 10) {
            hpColor = "#ed4245";
            hpPulseClass = "low-hp-warning";
        }
        
        // Load GM notes for this character
        const charName = [pData.vorname, pData.name].filter(Boolean).join(' ') || 'Unbekannt';
        const charNameHtml = escapeHtml(charName);
        const playerColor = getColorForPlayer(charName);
        const gmNotesKey = 'gmNotes_' + charName;
        const currentNotes = localStorage.getItem(gmNotesKey) || '';

        // Portrait Image
        const portraitSrc = safeImageSrc(pData.portrait);
        
        let skillsHtml = '';
        let totalPoints = 0;
        const catNames = { 'handeln': 'Handeln', 'wissen': 'Wissen', 'soziales': 'Soziales' };
        ['handeln', 'wissen', 'soziales'].forEach(cat => {
            const arr = pData[`skills_${cat}`] || [];
            const catGbp = pData[`gbp_${cat}`] || 0;
            const catAttr = pData[`attr_${cat}`] || 0;
            
            if (arr.length > 0 || catGbp > 0) {
                skillsHtml += `
                <div style="margin-top: 0.8rem; border-bottom: 1px solid ${playerColor}40; padding-bottom: 0.3rem; margin-bottom: 0.3rem; display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="text-transform: uppercase; color: ${playerColor}; font-size: 0.85rem;">${catNames[cat]} <span style="opacity: 0.6; font-size: 0.75rem;">(Wert: ${escapeHtml(catAttr)})</span></strong>
                    <span style="font-size: 0.75rem; color: #fbbf24; background: rgba(251,191,36,0.1); padding: 0.1rem 0.4rem; border-radius: 10px;"><i class="fa-solid fa-lightbulb"></i> ${escapeHtml(catGbp)} GBP</span>
                </div>`;
                arr.forEach(s => {
                    const inv = parseInt(s.invested) || 0;
                    totalPoints += inv;
                    skillsHtml += `<div style="display: flex; justify-content: space-between; font-size: 0.9rem; padding: 0.1rem 0;">
                        <span>${escapeHtml(s.name)}</span>
                        <strong>${inv}</strong>
                    </div>`;
                });
            }
        });
        
        let invHtml = '';
        const invArr = pData.inventory || [];
        if (invArr.length > 0) {
            invArr.forEach(i => {
                invHtml += `<div style="display: flex; justify-content: space-between; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.2rem 0;">
                    <span>${escapeHtml(i.name)}</span>
                    <strong style="color: #fbbf24;">x${escapeHtml(i.amount)}</strong>
                </div>`;
            });
        }
        
        let wpnsHtml = '';
        const wpnArr = pData.weapons || [];
        if (wpnArr.length > 0) {
            wpnArr.forEach(w => {
                wpnsHtml += `<div style="display: flex; justify-content: space-between; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.2rem 0;">
                    <span>${escapeHtml(w.name)}</span>
                    <strong style="color: #ed4245;">${escapeHtml(w.damage)}</strong>
                </div>`;
            });
        }
        
        const card = document.createElement('div');
        card.className = 'glass-panel';
        card.style.padding = '1rem';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.gap = '0.5rem';
        card.style.borderTop = `4px solid ${playerColor}`;
        
        // Das Punktebudget ist auf dem Bogen einstellbar und wird mitgeschickt.
        // Vorher stand hier fest 400, was bei Runden mit abweichendem Budget bei
        // jedem Spieler eine falsche Cheat-Warnung ausgelöst hat.
        const maxPoints = parseInt(pData.maxPoints) || 400;
        let ptsColor = totalPoints > maxPoints ? '#ed4245' : '#9ca3af';
        
        // Status effects
        const statuses = pData.statuses || [];
        let statusHtml = '';
        if (statuses.length > 0) {
            statusHtml = statuses.map(s => {
                const sName = (typeof s === 'string') ? s : (s.name || '?');
                const sVal = (typeof s === 'object' && s.value) ? ` (${s.value})` : '';
                const sType = (typeof s === 'object' && s.type) ? s.type : 'malus';
                const colorMap = { bonus: 'rgba(87,242,135', malus: 'rgba(237,66,69', neutral: 'rgba(156,163,175' };
                const base = colorMap[sType] || colorMap.malus;
                return `<span style="background: ${base},0.2); border: 1px solid ${base},0.5); color: ${base},1); padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.75rem; font-weight: bold;">${escapeHtml(sName)}${escapeHtml(sVal)}</span>`;
            }).join(' ');
        }
        
        // Currency
        const currencyName = (pData.currency && pData.currency.name) ? pData.currency.name : 'Credits';
        const currencyAmount = (pData.currency && pData.currency.amount !== undefined) ? pData.currency.amount : 0;
        
        // Check open states
        const skillsOpen = openStates[`${peerId}_skills`] ? 'open' : '';
        const invOpen = openStates[`${peerId}_inventory`] ? 'open' : '';
        const wpnOpen = openStates[`${peerId}_weapons`] ? 'open' : '';

        // Character info
        const beruf = pData.beruf || '';
        const alter = pData.alter || '';
        const statur = pData.statur || '';
        
        // Color picker dots
        let colorDotsHtml = GM_PLAYER_COLORS.map(c => {
            const isActive = c === playerColor;
            return `<span class="gm-color-dot" data-color="${c}" data-char="${charNameHtml}" style="display:inline-block; width:14px; height:14px; border-radius:50%; background:${c}; cursor:pointer; border: 2px solid ${isActive ? 'white' : 'transparent'}; transition: border 0.2s;"></span>`;
        }).join('');
        
        card.innerHTML = `
            <div style="display: flex; gap: 1rem; align-items: center;">
                <img src="${portraitSrc}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid ${playerColor}; box-shadow: 0 0 10px ${playerColor}80;">
                <div style="flex: 1;">
                    <div style="font-size: 1.2rem; font-weight: bold; display: flex; justify-content: space-between; align-items: center; color: ${playerColor};">
                        <span>${charNameHtml}</span>
                        <span style="font-size: 0.9rem; color: #fbbf24;"><i class="fa-solid fa-lightbulb"></i> GBP: ${(parseInt(pData.gbp_handeln) || 0) + (parseInt(pData.gbp_wissen) || 0) + (parseInt(pData.gbp_soziales) || 0)}</span>
                    </div>
                    <div style="font-size: 0.75rem; opacity: 0.6; margin-top: 0.1rem;">
                        ${[beruf, alter ? alter + ' J.' : '', statur].filter(x => x).map(escapeHtml).join(' • ')}
                    </div>
                    <div style="font-size: 0.8rem; color: ${ptsColor}; text-align: right;">
                        Verteilte Punkte: <strong>${totalPoints}</strong> / ${maxPoints}
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 0.3rem; align-items: center; flex-wrap: wrap; margin-top: 0.3rem;">
                <span style="font-size: 0.7rem; opacity: 0.5; margin-right: 0.2rem;"><i class="fa-solid fa-palette"></i></span>
                ${colorDotsHtml}
            </div>
            
            ${statusHtml ? `<div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.3rem;">${statusHtml}</div>` : ''}
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.3rem;">
                <div style="flex: 1; margin-right: 1rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.2rem;">
                        <span>HP</span>
                        <span class="${hpPulseClass ? 'hp-text-danger' : ''}">${escapeHtml(pData.hpCurrent)} / ${escapeHtml(pData.hpMax)}</span>
                    </div>
                    <div class="${hpPulseClass}" style="height: 10px; background: rgba(0,0,0,0.5); border-radius: 5px; overflow: hidden;">
                        <div style="height: 100%; width: ${hpPercent}%; background: ${hpColor}; transition: width 0.3s ease;"></div>
                    </div>
                </div>
                <div style="font-size: 0.85rem; color: #fbbf24; background: rgba(251,191,36,0.1); padding: 0.2rem 0.6rem; border-radius: 10px; white-space: nowrap;">
                    <i class="fa-solid fa-coins"></i> ${escapeHtml(currencyAmount)} ${escapeHtml(currencyName)}
                </div>
            </div>
            
            <details data-peer-id="${escapeHtml(peerId)}" data-details-type="skills" ${skillsOpen} style="margin-top: 0.5rem; background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 4px;">
                <summary style="cursor: pointer; font-weight: bold; font-size: 0.9rem; outline: none;">Skills anzeigen</summary>
                <div style="margin-top: 0.5rem;">
                    ${skillsHtml || '<i>Keine Skills</i>'}
                </div>
            </details>
            
            <div style="display: flex; gap: 0.5rem;">
                <details data-peer-id="${escapeHtml(peerId)}" data-details-type="inventory" ${invOpen} style="flex: 1; background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 4px;">
                    <summary style="cursor: pointer; font-weight: bold; font-size: 0.9rem; outline: none;"><i class="fa-solid fa-box-open" style="color: #fbbf24;"></i> Inventar</summary>
                    <div style="margin-top: 0.5rem;">
                        ${invHtml || '<i>Leer</i>'}
                    </div>
                </details>
                
                <details data-peer-id="${escapeHtml(peerId)}" data-details-type="weapons" ${wpnOpen} style="flex: 1; background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 4px;">
                    <summary style="cursor: pointer; font-weight: bold; font-size: 0.9rem; outline: none;"><i class="fa-solid fa-khanda" style="color: #ed4245;"></i> Waffen</summary>
                    <div style="margin-top: 0.5rem;">
                        ${wpnsHtml || '<i>Keine</i>'}
                    </div>
                </details>
            </div>
            
            <div style="margin-top: 0.5rem;">
                <div style="font-size: 0.8rem; opacity: 0.7; margin-bottom: 0.2rem;"><i class="fa-solid fa-user-secret"></i> Geheime SL-Notizen:</div>
                <textarea class="gm-note-textarea" data-charname="${charNameHtml}" style="width: 100%; background: rgba(0,0,0,0.5); border: 1px solid var(--panel-border); color: white; padding: 0.5rem; border-radius: 4px; resize: vertical; min-height: 60px; outline: none;">${escapeHtml(currentNotes)}</textarea>
            </div>
        `;
        
        // Add event listener to save notes
        card.querySelector('textarea').addEventListener('input', (e) => {
            localStorage.setItem('gmNotes_' + e.target.dataset.charname, e.target.value);
        });
        
        // Add color dot click listeners
        card.querySelectorAll('.gm-color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                setColorForPlayer(dot.dataset.char, dot.dataset.color);
            });
        });
        
        gridCol.appendChild(card);
    });

    // Restore focus if a textarea was active
    if (focusedCharName) {
        // Direkter Vergleich statt Attributselektor: Anführungszeichen oder
        // Backslashes im Charakternamen würden einen Selektor-String sprengen.
        const textarea = [...document.querySelectorAll('.gm-note-textarea')]
            .find(el => el.dataset.charname === focusedCharName);
        if (textarea) {
            textarea.focus();
            textarea.setSelectionRange(cursorStart, cursorEnd);
        }
    }
}

let gmLogHistory = [];

function loadGmLogHistory() {
    try {
        const history = JSON.parse(localStorage.getItem('gmLogHistory')) || [];
        gmLogHistory = history;
        const list = document.getElementById('gm-live-log');
        list.innerHTML = '';
        // Render backwards since we prepend
        [...gmLogHistory].reverse().forEach(entry => {
            const li = document.createElement('li');
            li.innerHTML = entry.html;
            li.style.cssText = entry.style;
            list.prepend(li);
        });
    } catch(e) {
        gmLogHistory = [];
    }
}

function saveGmLogHistory() {
    // Keep max 50 entries
    if (gmLogHistory.length > 50) gmLogHistory = gmLogHistory.slice(0, 50);
    localStorage.setItem('gmLogHistory', JSON.stringify(gmLogHistory));
}

function addGmLogEntry(charName, message, emoji) {
    const list = document.getElementById('gm-live-log');
    const li = document.createElement('li');
    const playerColor = getColorForPlayer(charName);
    const styleText = `background: rgba(0,0,0,0.5); padding: 0.8rem; border-radius: 4px; border-left: 3px solid ${playerColor};`;
    li.style.cssText = styleText;
    
    const timeStr = new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    
    // Kein innerHTML-Umweg mehr, um Tags zu strippen: dabei entstehen echte
    // Elemente, und ein <img src=x onerror="..."> feuert auch in einem Knoten,
    // der nie im Dokument hängt. Was hier ankommt, ist ohnehin Klartext
    // (siehe addToLog in app.js) und wird nur noch escapt.
    const cleanMsg = message === null || message === undefined ? '' : String(message);

    const innerHTML = `
        <div style="font-size: 0.8rem; opacity: 0.7; margin-bottom: 0.3rem;">${timeStr} - <strong style="color: ${playerColor};">${escapeHtml(charName)}</strong></div>
        <div>${escapeHtml(emoji)} ${escapeHtml(cleanMsg)}</div>
    `;
    li.innerHTML = innerHTML;
    list.prepend(li);
    
    gmLogHistory.unshift({ html: innerHTML, style: styleText });
    saveGmLogHistory();
}

function addGmLogSystemMessage(msg) {
    const list = document.getElementById('gm-live-log');
    const li = document.createElement('li');
    const styleText = 'background: rgba(251,191,36,0.1); padding: 0.5rem; border-radius: 4px; border-left: 3px solid #fbbf24; font-size: 0.8rem; color: #fbbf24;';
    li.style.cssText = styleText;
    li.innerText = msg;
    list.prepend(li);
    
    gmLogHistory.unshift({ html: msg, style: styleText });
    saveGmLogHistory();
}

function clearGmLog() {
    if(confirm('Möchtest du das Live-Log wirklich komplett leeren?')) {
        gmLogHistory = [];
        saveGmLogHistory();
        document.getElementById('gm-live-log').innerHTML = '';
        addGmLogSystemMessage('Logbuch wurde geleert.');
    }
}

function updateGmBigDiceResult(result, text) {
    const resDiv = document.getElementById('gm-dice-big-result');
    const subDiv = document.getElementById('gm-dice-subtitle');
    
    resDiv.style.transform = 'scale(0.5)';
    resDiv.style.opacity = '0';
    
    setTimeout(() => {
        resDiv.innerText = result;
        subDiv.innerHTML = text;
        resDiv.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        resDiv.style.transform = 'scale(1)';
        resDiv.style.opacity = '1';
    }, 150);
}

function rollGmDice(max) {
    const res = Math.floor(Math.random() * max) + 1;
    const text = `1W${max}`;
    updateGmBigDiceResult(res, text);
    addGmLogEntry('Spielleiter (Lokal)', `${text}: ${res}`, '🎲');
    
    if (typeof fireConfetti === 'function') {
        if (max === 100 && res <= 5) fireConfetti();
        else if (max === 100 && res >= 96) fireFumble();
        else if (max !== 100 && res === max) fireConfetti();
        else if (max !== 100 && res === 1) fireFumble();
    }
}

function rollGmCustomDice(diceStr) {
    if(!diceStr) return;
    const parts = diceStr.toLowerCase().split('w');
    if (parts.length !== 2) {
        alert("Ungültiges Format! Bitte z.B. '2w10' eingeben.");
        return;
    }
    const count = parseInt(parts[0]) || 1;
    const max = parseInt(parts[1]);
    if (isNaN(max) || max < 2) {
        alert("Ungültiger Würfel-Typ!");
        return;
    }
    
    let total = 0;
    let rolls = [];
    for(let i=0; i<count; i++) {
        const r = Math.floor(Math.random() * max) + 1;
        total += r;
        rolls.push(r);
    }
    
    const text = `${diceStr} (${rolls.join(', ')})`;
    updateGmBigDiceResult(total, text);
    addGmLogEntry('Spielleiter (Lokal)', `${text}: ${total}`, '🎲');
    
    if (typeof fireConfetti === 'function') {
        if (total === count * max) fireConfetti();
        else if (total === count) fireFumble();
    }
}

// --- PLAYER MODE (CLIENT) ---
// codeArg: beim Reload-Schutz wird hier der alte Raum-Code übergeben, statt
// ihn aus dem (evtl. noch gar nicht sichtbaren) Eingabefeld zu lesen.
function joinMultiplayerSession(codeArg) {
    const rawCode = typeof codeArg === 'string' ? codeArg : document.getElementById('multiplayer-join-code').value;
    const code = rawCode.trim().toUpperCase();
    if (!code || code.length !== 4) {
        updateMultiplayerStatus("Bitte 4-stelligen Code eingeben.", "#ed4245");
        return;
    }

    updateMultiplayerStatus(typeof codeArg === 'string' ? "Stelle vorherige Sitzung wieder her..." : "Verbinde...", "#fbbf24");

    if (peer) peer.destroy();

    peer = new Peer(getPeerConfig()); // Random ID for client

    peer.on('open', () => {
        const hostId = 'htbah-' + code;
        hostConnection = peer.connect(hostId, { reliable: true });

        // PeerJS kennt keinen Timeout fuer den DataChannel: scheitert der
        // WebRTC-Verbindungsaufbau, bleibt die Anzeige sonst ewig auf "Verbinde...".
        clearTimeout(joinTimeout);
        joinTimeout = setTimeout(() => {
            if (hostConnection && hostConnection.open) return;
            diagnoseFailedConnection(hostConnection);
        }, JOIN_TIMEOUT_MS);

        hostConnection.on('open', () => {
            clearTimeout(joinTimeout);
            updateMultiplayerStatus('<i class="fa-solid fa-check"></i> Verbunden!', "#57F287");
            setTimeout(closeMultiplayerModal, 1000);
            saveMultiplayerSession('player', code);

            // Send initial state
            sendMultiplayerState();
        });

        hostConnection.on('close', () => {
            hostConnection = null;
            clearMultiplayerSession();
            alert("Die Verbindung zum Spielleiter wurde getrennt.");
        });
        
        hostConnection.on('data', (payload) => {
            if (payload && payload.type === 'theme') {
                if (typeof changeTheme === 'function') {
                    const sel = document.getElementById('theme-selector');
                    if (sel) sel.value = payload.theme;
                    changeTheme(payload.theme, true);
                }
            } else if (payload && payload.type === 'playSound') {
                if (typeof playAudioFile === 'function') playAudioFile(payload.soundId, payload.volume);
            } else if (payload && payload.type === 'setVolume') {
                if (typeof currentAudioPlayers !== 'undefined') {
                    currentAudioPlayers.forEach(audio => audio.volume = payload.volume);
                }
            } else if (payload && payload.type === 'stopSound') {
                if (typeof stopAllAudio === 'function') stopAllAudio();
            } else if (payload && payload.type === 'fadeOutSound') {
                if (typeof fadeOutAllAudio === 'function') fadeOutAllAudio();
            } else if (payload && payload.type === 'customSound') {
                // Privater Sound des SL, kommt direkt per WebRTC an - existiert nur für die
                // Dauer der Wiedergabe im Speicher, wird nirgends gespeichert oder veröffentlicht.
                if (typeof appData !== 'undefined' && appData.soundEnabled === false) return;
                try {
                    const blob = payload.blob instanceof Blob ? payload.blob : new Blob([payload.blob]);
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);
                    audio.volume = payload.volume || 0.6;
                    audio.play().catch(e => console.warn('Audio play blocked:', e));
                    if (typeof currentAudioPlayers !== 'undefined') currentAudioPlayers.push(audio);
                    audio.addEventListener('ended', () => {
                        if (typeof currentAudioPlayers !== 'undefined') {
                            currentAudioPlayers = currentAudioPlayers.filter(a => a !== audio);
                        }
                        URL.revokeObjectURL(url);
                    });
                } catch (e) {
                    console.error('Eigener Sound konnte nicht abgespielt werden:', e);
                }
            }
        });
        
        hostConnection.on('error', (err) => {
            clearTimeout(joinTimeout);
            console.error(err);
            updateMultiplayerStatus("Verbindungsfehler.", "#ed4245");
        });
    });

    peer.on('error', (err) => {
        clearTimeout(joinTimeout);
        console.error(err);
        if (err.type === 'peer-unavailable') {
            clearMultiplayerSession();
            const safeCode = code.replace(/[<>&"]/g, '');
            updateMultiplayerStatus(
                "Raum <strong>" + safeCode + "</strong> nicht gefunden.<br>" +
                "<span style='font-weight: normal; font-size: 0.85rem;'>Code prüfen - oder der Spielleiter muss den Raum neu hosten.</span>",
                "#ed4245"
            );
        } else if (err.type === 'network' || err.type === 'server-error' || err.type === 'socket-error') {
            updateMultiplayerStatus("Signalling-Server nicht erreichbar. Später erneut versuchen.", "#ed4245");
        } else {
            updateMultiplayerStatus("Fehler: " + err.type, "#ed4245");
        }
    });
}

// Nach dem Timeout auswerten, WORAN es lag - die ICE-Kandidaten verraten das.
async function diagnoseFailedConnection(conn) {
    clearMultiplayerSession();
    const pc = conn && conn.peerConnection;
    let localTypes = [];
    let remoteCount = 0;

    if (pc) {
        try {
            const stats = await pc.getStats();
            stats.forEach(r => {
                if (r.type === 'local-candidate' && r.candidateType) localTypes.push(r.candidateType);
                if (r.type === 'remote-candidate') remoteCount++;
            });
        } catch (e) {
            console.warn('getStats fehlgeschlagen:', e);
        }
    }

    const hasUdp = localTypes.some(t => t === 'host' || t === 'srflx' || t === 'relay');
    const hasRelay = localTypes.includes('relay');
    const hint = "<span style='font-weight: normal; font-size: 0.85rem;'>";

    if (!hasUdp) {
        // Kein einziger brauchbarer Kandidat: WebRTC ist im Browser blockiert.
        // Lokale Kandidaten entstehen ohne Netzwerkzugriff - das kann keine Firewall verhindern.
        updateMultiplayerStatus(
            "WebRTC ist in diesem Browser blockiert." + "<br>" + hint +
            "Der Raum wurde gefunden, aber es konnte keine Verbindung aufgebaut werden. " +
            "Häufigste Ursache: eine VPN- oder Privacy-Extension mit WebRTC-Leak-Schutz. " +
            "Diese deaktivieren oder einen anderen Browser nutzen.</span>",
            "#ed4245"
        );
    } else if (remoteCount === 0) {
        updateMultiplayerStatus(
            "Keine Antwort vom Spielleiter." + "<br>" + hint +
            "Der Raum existiert, aber die Gegenseite hat keine Verbindungsdaten geschickt. " +
            "Beim Spielleiter könnte WebRTC blockiert sein.</span>",
            "#ed4245"
        );
    } else if (!hasRelay && !hasTurnConfigured()) {
        updateMultiplayerStatus(
            "Keine direkte Verbindung möglich." + "<br>" + hint +
            "Beide Seiten sind hinter einem strengen NAT (z.B. Mobilfunk oder Firmennetz). " +
            "Dafür wird ein TURN-Server benötigt - im Menü unter \"Erweitert\" eintragbar.</span>",
            "#ed4245"
        );
    } else {
        updateMultiplayerStatus(
            "Verbindungsaufbau fehlgeschlagen." + "<br>" + hint +
            "Der Raum wurde gefunden, aber die P2P-Verbindung kam nicht zustande. " +
            "Netzwerk oder TURN-Zugangsdaten prüfen.</span>",
            "#ed4245"
        );
    }

    if (conn) conn.close();
}

function sendMultiplayerState() {
    if (!hostConnection || !hostConnection.open) return;
    hostConnection.send({
        // Bogen ohne Webhook-URL: Der Spielleiter braucht sie nicht und soll
        // sie auch nicht bekommen (siehe charakterZumTeilen in app.js).
        type: 'state',
        data: charakterZumTeilen()
    });
}

function sendMultiplayerLog(message, emoji = "🎲", bigNumber = null, subtitle = null) {
    if (isGmMode) {
        addGmLogEntry("Spielleiter (Lokal)", message, emoji);
        return;
    }
    if (!hostConnection || !hostConnection.open) return;
    hostConnection.send({
        type: 'log',
        message: message,
        emoji: emoji,
        bigNumber: bigNumber,
        subtitle: subtitle
    });
}

function saveGmGeneralNotes(val) {
    localStorage.setItem('gm_general_notes', val);
}
// --- GM Notes Management ---

function exportGmNotes() {
    const notesData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('gmNotes_') || key === 'gm_general_notes')) {
            notesData[key] = localStorage.getItem(key);
        }
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notesData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'htbah_gm_notizen.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importGmNotes(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            for (const key in data) {
                if (key.startsWith('gmNotes_') || key === 'gm_general_notes') {
                    localStorage.setItem(key, data[key]);
                }
            }
            alert('SL Notizen erfolgreich geladen!');
            if (typeof renderGmDashboard === 'function') renderGmDashboard();
            const generalNotesField = document.getElementById('gm-general-notes');
            if (generalNotesField) {
                generalNotesField.value = localStorage.getItem('gm_general_notes') || '';
            }
        } catch (err) {
            alert('Fehler beim Laden der Datei.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function showGmNotesArchive() {
    const modal = document.getElementById('gm-notes-archive-modal');
    const content = document.getElementById('gm-notes-archive-content');
    if(!modal || !content) return;
    content.innerHTML = '';
    
    let hasNotes = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('gmNotes_')) {
            const charName = key.replace('gmNotes_', '');
            const notes = localStorage.getItem(key) || '';
            if (notes.trim() === '') continue;
            hasNotes = true;
            
            const playerColor = getColorForPlayer(charName);
            const box = document.createElement('div');
            box.style.cssText = 'background: rgba(0,0,0,0.5); border: 1px solid var(--panel-border); border-radius: 8px; padding: 1rem;';
            box.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 0.5rem; color: ${playerColor};">${escapeHtml(charName)}</div>
                <textarea style="width: 100%; height: 100px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 0.5rem; border-radius: 4px; resize: vertical; outline: none; font-family: inherit;">${escapeHtml(notes)}</textarea>
            `;
            
            box.querySelector('textarea').addEventListener('input', (e) => {
                localStorage.setItem(key, e.target.value);
                // Also update live dashboard if player is currently connected
                if (typeof isGmMode !== 'undefined' && isGmMode) renderGmDashboard(); 
            });
            content.appendChild(box);
        }
    }
    
    if (!hasNotes) {
        content.innerHTML = '<div style="text-align: center; opacity: 0.6; padding: 2rem;">Keine archivierten Spieler-Notizen gefunden.</div>';
    }
    
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeGmNotesArchive() {
    const modal = document.getElementById('gm-notes-archive-modal');
    if(!modal) return;
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function broadcastTheme(theme) {
    if (typeof isGmMode !== 'undefined' && isGmMode) {
        Object.values(clientConnections).forEach(conn => {
            if (conn && conn.open) {
                conn.send({ type: 'theme', theme: theme });
            }
        });
    }
}


// --- SOUNDBOARD ---
let currentAudioPlayers = [];

function previewGmSound(soundId) {
    const vol = document.getElementById('gm-volume-slider') ? parseFloat(document.getElementById('gm-volume-slider').value) : 0.6;
    if (typeof playAudioFile === 'function') playAudioFile(soundId, vol);
}

function sendGmSound(soundId) {
    const vol = document.getElementById('gm-volume-slider') ? parseFloat(document.getElementById('gm-volume-slider').value) : 0.6;
    if (typeof playAudioFile === 'function') playAudioFile(soundId, vol);
    Object.values(clientConnections).forEach(conn => {
        if (conn.open) {
            conn.send({ type: 'playSound', soundId: soundId, volume: vol });
        }
    });
}

function changeGmVolume(vol) {
    const volume = parseFloat(vol);
    if (typeof currentAudioPlayers !== 'undefined') {
        currentAudioPlayers.forEach(audio => audio.volume = volume);
    }
    // Sync live volume change to players
    Object.values(clientConnections).forEach(conn => {
        if (conn.open) {
            conn.send({ type: 'setVolume', volume: volume });
        }
    });
}

function sendGmStopSound() {
    if (typeof stopAllAudio === 'function') stopAllAudio();
    Object.values(clientConnections).forEach(conn => {
        if (conn.open) {
            conn.send({ type: 'stopSound' });
        }
    });
}

function playAudioFile(soundId, overrideVolume = 0.6) {
    if (typeof appData !== 'undefined' && appData.soundEnabled === false) return;

    const soundMap = {
        'success': 'assets/sound/crit.mp3',
        'fail': 'assets/sound/fail.mp3',
        'suspense': 'assets/sounds/suspense.webm',
        'wilhelm': 'assets/sounds/wilhelm.webm',
        'tension': 'assets/sounds/tension.webm',
        'heartbeat': 'assets/sounds/heartbeat.webm',
        'rain': 'assets/sounds/rain.webm',
        'tavern': 'assets/sounds/menschen.mp3',
        'knock': 'assets/sounds/knock.webm',
        'clock': 'assets/sounds/clock.webm',
        'explosion_close': 'assets/sounds/explosion_close.mp3',
        'explosion_far': 'assets/sounds/explosion_far.webm',
        'combat': 'assets/sounds/combat.webm',
        'magic': 'assets/sounds/magic.webm',
        'crickets': 'assets/sounds/crickets.webm',
        'bell': 'assets/sounds/bell.webm',
        'dramatic': 'assets/sounds/dramatic.webm',
        'boss': 'assets/sounds/boss.webm',
        'sad': 'assets/sounds/sad.webm',
        'loot': 'assets/sounds/loot5.webm',
        'boss2': 'assets/sounds/boss2.webm',
        'shootout': 'assets/sounds/shootout.webm',
        'brawl': 'assets/sounds/brawl3.webm',
        'brawl_bud': 'assets/sounds/brawl4.webm',
        'city': 'assets/sounds/city.webm',
        'space': 'assets/sounds/space.webm',
        'campfire': 'assets/sounds/campfire.webm',
        'spooky': 'assets/sounds/spooky.webm',
        'elevator': 'assets/sounds/elevator.webm',
        'medieval': 'assets/sounds/medieval.webm',
        'door_creak': 'assets/sounds/door_creak.wav',
        'thunder_hit': 'assets/sounds/thunder_hit.wav',
        'glass_break': 'assets/sounds/glass_break.wav',
        'alarm_breach': 'assets/sounds/alarm_breach.wav',
        'sword_draw': 'assets/sounds/sword_draw.wav',
        'horse_gallop': 'assets/sounds/horse_gallop.wav',
        'prison_door': 'assets/sounds/prison_door.wav',
        'whoosh_transition': 'assets/sounds/whoosh_transition.wav',
        'music_mystery': 'assets/sounds/music_mystery.mp3',
        'music_exploration': 'assets/sounds/music_exploration.mp3',
        'music_horror': 'assets/sounds/music_horror.mp3',
        'music_western': 'assets/sounds/music_western.mp3',
        'music_triumph': 'assets/sounds/music_triumph.mp3'
    };

    if (soundMap[soundId]) {
        const audio = new Audio(soundMap[soundId]);
        audio.volume = overrideVolume;
        audio.play().catch(e => console.warn('Audio play blocked:', e));
        currentAudioPlayers.push(audio);
        
        audio.addEventListener('ended', () => {
            currentAudioPlayers = currentAudioPlayers.filter(a => a !== audio);
        });
    }
}

function sendGmFadeOutSound() {
    if (typeof fadeOutAllAudio === 'function') fadeOutAllAudio();
    Object.values(clientConnections).forEach(conn => {
        if (conn.open) {
            conn.send({ type: 'fadeOutSound' });
        }
    });
}

// --- Eigener privater Sound (z.B. lizenzierte Musik, die nur für den privaten Rahmen erlaubt
// ist und nicht veröffentlicht werden darf). Bleibt ausschließlich lokal im Browser des SL
// (IndexedDB) und wird beim Abspielen für alle nur direkt per WebRTC an die aktuell verbundenen
// Spieler übertragen - landet nie im Repository oder auf der öffentlich gehosteten Seite. ---
const CUSTOM_SOUND_DB_NAME = 'htbah-custom-sounds';
const CUSTOM_SOUND_STORE = 'sounds';
const CUSTOM_SOUND_KEY = 'gm-custom-sound';
const CUSTOM_SOUND_MAX_BYTES = 30 * 1024 * 1024; // 30 MB - großzügig, aber begrenzt die WebRTC-Übertragungsdauer

let customSoundCache = null; // { name, blob } - vermeidet wiederholte DB-Reads während der Session

function openCustomSoundDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(CUSTOM_SOUND_DB_NAME, 1);
        req.onupgradeneeded = () => {
            if (!req.result.objectStoreNames.contains(CUSTOM_SOUND_STORE)) {
                req.result.createObjectStore(CUSTOM_SOUND_STORE);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function saveCustomSoundToDB(name, blob) {
    const db = await openCustomSoundDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CUSTOM_SOUND_STORE, 'readwrite');
        tx.objectStore(CUSTOM_SOUND_STORE).put({ name, blob }, CUSTOM_SOUND_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function loadCustomSoundFromDB() {
    const db = await openCustomSoundDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CUSTOM_SOUND_STORE, 'readonly');
        const req = tx.objectStore(CUSTOM_SOUND_STORE).get(CUSTOM_SOUND_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
}

async function deleteCustomSoundFromDB() {
    const db = await openCustomSoundDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CUSTOM_SOUND_STORE, 'readwrite');
        tx.objectStore(CUSTOM_SOUND_STORE).delete(CUSTOM_SOUND_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function refreshCustomSoundUI() {
    try {
        customSoundCache = await loadCustomSoundFromDB();
    } catch (e) {
        console.warn('Eigener Sound konnte nicht geladen werden:', e);
        customSoundCache = null;
    }

    const label = document.getElementById('gm-custom-sound-label');
    if (!label) return;
    const previewBtn = document.getElementById('gm-custom-sound-preview-btn');
    const sendBtn = document.getElementById('gm-custom-sound-send-btn');
    const removeBtn = document.getElementById('gm-custom-sound-remove-btn');

    if (customSoundCache) {
        label.textContent = customSoundCache.name;
        label.title = customSoundCache.name;
        label.style.color = '#e9d5ff';
        if (previewBtn) previewBtn.style.display = 'inline-flex';
        if (sendBtn) sendBtn.style.display = 'inline-flex';
        if (removeBtn) removeBtn.style.display = 'inline-flex';
    } else {
        label.textContent = 'Keiner hochgeladen';
        label.title = '';
        label.style.color = '#9ca3af';
        if (previewBtn) previewBtn.style.display = 'none';
        if (sendBtn) sendBtn.style.display = 'none';
        if (removeBtn) removeBtn.style.display = 'none';
    }
}

async function handleCustomSoundUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > CUSTOM_SOUND_MAX_BYTES) {
        alert('Datei ist größer als 30 MB - das würde die Übertragung an Spieler zu lange dauern lassen. Bitte eine kleinere/komprimierte Version verwenden.');
        event.target.value = '';
        return;
    }
    try {
        await saveCustomSoundToDB(file.name, file);
        event.target.value = '';
        await refreshCustomSoundUI();
        if (typeof addGmLogSystemMessage === 'function') {
            addGmLogSystemMessage(`Eigener Sound "${file.name}" gespeichert (bleibt privat auf diesem Gerät).`);
        }
    } catch (e) {
        console.error(e);
        alert('Speichern fehlgeschlagen: ' + e.message);
    }
}

function previewCustomSound() {
    if (!customSoundCache) return;
    const vol = document.getElementById('gm-volume-slider') ? parseFloat(document.getElementById('gm-volume-slider').value) : 0.6;
    const url = URL.createObjectURL(customSoundCache.blob);
    const audio = new Audio(url);
    audio.volume = vol;
    audio.play().catch(e => console.warn('Audio play blocked:', e));
    currentAudioPlayers.push(audio);
    audio.addEventListener('ended', () => {
        currentAudioPlayers = currentAudioPlayers.filter(a => a !== audio);
        URL.revokeObjectURL(url);
    });
}

function sendCustomSoundToAll() {
    if (!customSoundCache) return;
    const vol = document.getElementById('gm-volume-slider') ? parseFloat(document.getElementById('gm-volume-slider').value) : 0.6;

    previewCustomSound();

    Object.values(clientConnections).forEach(conn => {
        if (conn.open) {
            conn.send({ type: 'customSound', name: customSoundCache.name, volume: vol, blob: customSoundCache.blob });
        }
    });
    if (typeof addGmLogSystemMessage === 'function') {
        addGmLogSystemMessage(`Eigener Sound "${customSoundCache.name}" an alle gesendet (nur direkt an eure Session, nicht öffentlich).`);
    }
}

async function removeCustomSound() {
    if (!confirm('Eigenen Sound wirklich entfernen?')) return;
    await deleteCustomSoundFromDB();
    await refreshCustomSoundUI();
}

function fadeOutAllAudio() {
    if (typeof currentAudioPlayers === 'undefined' || currentAudioPlayers.length === 0) return;

    // Clone the array so we can clear the global one immediately for new sounds
    const playersToFade = [...currentAudioPlayers];
    currentAudioPlayers = [];

    const fadeSteps = 35; // increased steps for smoother fade
    const fadeDuration = 3500; // 3.5 seconds fade out
    const stepTime = fadeDuration / fadeSteps;

    playersToFade.forEach(audio => {
        const startVol = audio.volume;
        const stepVol = startVol / fadeSteps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            let newVol = startVol - (stepVol * currentStep);
            if (newVol < 0) newVol = 0;
            audio.volume = newVol;

            if (currentStep >= fadeSteps || newVol === 0) {
                clearInterval(fadeInterval);
                audio.pause();
                audio.currentTime = 0;
            }
        }, stepTime);
    });
}

function stopAllAudio() {
    currentAudioPlayers.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    currentAudioPlayers = [];
}


