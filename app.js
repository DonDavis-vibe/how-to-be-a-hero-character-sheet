let saveTimeout;
// Default Data based on Angus MacGyver PDF
const defaultData = {
    vorname: 'Angus',
    name: 'assets/Macgyver',
    geschlecht: 'M',
    beruf: 'Problemlöser',
    alter: '42',
    statur: 'SpOor',
    
    hpCurrent: 100,
    hpMax: 100,

    attr_handeln: 17,
    gbp_handeln: 2,
    skills_handeln: [
        { id: 'h1', name: 'DIY Basteln', value: 87 },
        { id: 'h2', name: 'Fahr- und Fluggeräte steuern', value: 60 },
        { id: 'h3', name: 'leises Vorgehen', value: 50 },
        { id: 'h4', name: 'Akrobatik', value: 41 }
    ],

    attr_wissen: 16,
    gbp_wissen: 2,
    skills_wissen: [
        { id: 'w1', name: 'angewandte Physik', value: 90 },
        { id: 'w2', name: 'Elektrotechnisches Grundwissen', value: 72 },
        { id: 'w3', name: 'erste Hilfe', value: 41 }
    ],

    attr_soziales: 8,
    gbp_soziales: 1,
    skills_soziales: [
        { id: 's1', name: 'Überreden', value: 48 },
        { id: 's2', name: 'Menschenkenntnis', value: 43 }
    ],

    inventory: [
        { id: 'i1', name: 'Kaugummi' },
        { id: 'i2', name: 'Gaffa Tape' },
        { id: 'i3', name: 'Schweizer Taschenmesser' }
    ],
    maxPoints: 400
};

const blankData = {
    vorname: '',
    name: '',
    geschlecht: '',
    beruf: '',
    alter: '',
    statur: '',
    
    hpCurrent: 100,
    hpMax: 100,

    attr_handeln: 0,
    gbp_handeln: 0,
    skills_handeln: [],

    attr_wissen: 0,
    gbp_wissen: 0,
    skills_wissen: [],

    attr_soziales: 0,
    gbp_soziales: 0,
    skills_soziales: [],

    inventory: [],
    notes: '',
    theme: 'default',
    maxPoints: 400
};

// Application State
let appData = {};


let lastRollTimestamp = 0;

// Initialization
function init() {
    // Start with a blank character by default, since we are not using localStorage anymore
    appData = JSON.parse(JSON.stringify(blankData));

    renderAll();
    setupEventListeners();
    setupMouseSpotlight();
    calculatePoints();
    
    setInterval(updateLiveTimers, 1000);
}

function setupMouseSpotlight() {
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.glass-panel, .tool-btn, .add-skill-btn, .add-item-row button, .points-counter').forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function saveData() {
    // Auto-save to cache is disabled per user request.
    // Data is kept in memory until the user clicks "Speichern (JSON)".
}


function showSaveIndicator() {
    const ind = document.getElementById('save-indicator');
    if (!ind) return;
    ind.classList.add('show');
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        ind.classList.remove('show');
    }, 2000);
}

// Rendering
function renderAll() {
    // Basic Info fields
    document.querySelectorAll('[data-field]').forEach(el => {
        const field = el.getAttribute('data-field');
        if (appData[field] !== undefined) {
            el.value = appData[field];
        }
    });

    // Portrait
    if (appData.portrait) {
        document.getElementById('portrait-img').src = appData.portrait;
    } else {
        document.getElementById('portrait-img').src = 'assets/Macgyver-4141351554.jpg'; // default
    }

    // Max Points
    if (document.getElementById('points-max')) {
        document.getElementById('points-max').value = appData.maxPoints || 400;
    }

    // HP
    document.getElementById('hp-current').value = appData.hpCurrent;
    document.getElementById('hp-max').value = appData.hpMax;
    updateHpBarVisual();

    // Skills
    renderSkills('handeln');
    renderSkills('wissen');
    renderSkills('soziales');

    // Inventory
    renderInventory();

    // Theme
    if (appData.theme) {
        document.getElementById('theme-selector').value = appData.theme;
        applyTheme(appData.theme);
    } else {
        document.getElementById('theme-selector').value = 'default';
        applyTheme('default');
    }
}

function updateHpBarVisual() {
    let perc = (appData.hpCurrent / appData.hpMax) * 100;
    if (perc > 100) perc = 100;
    if (perc < 0) perc = 0;
    
    const bar = document.getElementById('hp-bar');
    bar.style.width = perc + '%';

    if (perc > 50) {
        bar.style.backgroundColor = 'var(--color-heal)';
    } else if (perc > 20) {
        bar.style.backgroundColor = '#f59e0b'; // warning orange
    } else {
        bar.style.backgroundColor = 'var(--color-dmg)'; // danger red
    }
}

// Event Listeners for simple fields
function setupEventListeners() {
    document.querySelectorAll('[data-field]').forEach(el => {
        el.addEventListener('input', (e) => {
            const field = e.target.getAttribute('data-field');
            appData[field] = e.target.value;
            saveData();
            calculatePoints();
        });
    });
}

// --- HP Management ---
function adjustHp(amount) {
    appData.hpCurrent += amount;
    if (appData.hpCurrent > appData.hpMax) appData.hpCurrent = appData.hpMax;
    
    document.getElementById('hp-current').value = appData.hpCurrent;
    updateHpBarVisual();
    saveData();
    
    // Quick animation on the number
    const display = document.getElementById('hp-current');
    display.classList.add('shake');
    setTimeout(() => display.classList.remove('shake'), 400);
}

function updateHp() {
    let val = parseInt(document.getElementById('hp-current').value) || 0;
    appData.hpCurrent = val;
    updateHpBarVisual();
    saveData();
}

function updateHpMax() {
    let val = parseInt(document.getElementById('hp-max').value) || 1;
    appData.hpMax = val;
    updateHpBarVisual();
    saveData();
}

// --- Skills Management ---
function renderSkills(attr) {
    const listEl = document.getElementById(`skills-${attr}`);
    listEl.innerHTML = '';
    
    const skills = appData[`skills_${attr}`];
    const attrVal = parseInt(appData[`attr_${attr}`]) || 0;
    
    skills.forEach((skill, index) => {
        const item = document.createElement('div');
        item.className = 'skill-item';
        
        const nameInput = document.createElement('div');
        nameInput.className = 'skill-name-input';
        nameInput.contentEditable = true;
        nameInput.setAttribute('placeholder', 'Skill Name');
        nameInput.textContent = skill.name || '';
        nameInput.oninput = (e) => {
            skill.name = e.target.textContent;
            saveData();
        };
        nameInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                nameInput.blur();
            }
        };

        const totalSpan = document.createElement('span');
        totalSpan.className = 'skill-total';
        totalSpan.id = 'total-' + skill.id;
        totalSpan.textContent = '= ' + (attrVal + (skill.invested || 0));

        const valInput = document.createElement('input');
        valInput.type = 'number';
        valInput.title = "Investierte Punkte";
        valInput.value = skill.invested !== undefined ? skill.invested : (skill.value !== undefined ? skill.value : 0);
        valInput.oninput = (e) => {
            skill.invested = parseInt(e.target.value) || 0;
            saveData();
            calculatePoints(); // This recalculates the base attribute
            
            // Update all spans in this category visually without re-rendering everything
            const currentAttrVal = appData[`attr_${attr}`];
            appData[`skills_${attr}`].forEach(s => {
                const span = document.getElementById('total-' + s.id);
                if (span) {
                    span.textContent = '= ' + (currentAttrVal + (s.invested || 0));
                }
            });
        };

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete-icon';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        delBtn.onclick = () => {
            appData[`skills_${attr}`].splice(index, 1);
            saveData();
            renderSkills(attr);
            calculatePoints();
        };

        item.appendChild(nameInput);
        item.appendChild(valInput);
        item.appendChild(totalSpan);
        item.appendChild(delBtn);
        listEl.appendChild(item);
    });
}

function addSkill(attr) {
    appData[`skills_${attr}`].push({
        id: 's' + Date.now(),
        name: 'Neuer Skill',
        invested: 0
    });
    saveData();
    renderSkills(attr);
    calculatePoints();
}

function calculatePoints() {
    let totalInvested = 0;
    ['handeln', 'wissen', 'soziales'].forEach(attr => {
        let catSum = 0;
        if (appData[`skills_${attr}`]) {
            appData[`skills_${attr}`].forEach(skill => {
                const pts = skill.invested !== undefined ? skill.invested : (skill.value !== undefined ? skill.value : 0);
                catSum += parseInt(pts) || 0;
                
                // auto-migrate legacy data
                if (skill.invested === undefined && skill.value !== undefined) {
                    skill.invested = parseInt(skill.value) || 0;
                }
            });
        }
        totalInvested += catSum;
        
        // HTBAH Core Rule: Base Attribute = sum of invested points / 10 (rounded mathematically)
        const baseAttr = Math.round(catSum / 10);
        appData[`attr_${attr}`] = baseAttr;
        
        const attrInput = document.getElementById(`attr-${attr}`);
        if (attrInput) {
            attrInput.value = baseAttr;
        }

        // --- Geistesblitzpunkte Logic ---
        // Max GBP = Base Attribute / 10 (kaufmännisch gerundet nach offiziellen Regeln)
        const maxGbp = Math.round(baseAttr / 10);
        
        appData[`gbp_${attr}`] = parseInt(appData[`gbp_${attr}`]);
        if (isNaN(appData[`gbp_${attr}`])) {
            appData[`gbp_${attr}`] = maxGbp; // default to max
        } else if (appData[`gbp_${attr}`] > maxGbp) {
            appData[`gbp_${attr}`] = maxGbp; // cap if base attribute drops
        } else if (appData[`gbp_${attr}`] < 0) {
            appData[`gbp_${attr}`] = 0;
        }
        
        const maxGbpEl = document.getElementById(`gbp-max-${attr}`);
        if (maxGbpEl) maxGbpEl.textContent = maxGbp;
        
        const currGbpInput = document.getElementById(`gbp-current-${attr}`);
        if (currGbpInput) {
            currGbpInput.value = appData[`gbp_${attr}`];
            currGbpInput.max = maxGbp;
        }
    });
    
    const max = appData.maxPoints || 400;
    
    const totalEl = document.getElementById('points-total');
    const containerEl = document.getElementById('points-counter');
    if (totalEl) {
        totalEl.textContent = totalInvested;
    }
    
    if (containerEl) {
        if (totalInvested > max) {
            containerEl.classList.add('over-limit');
        } else {
            containerEl.classList.remove('over-limit');
        }
    }
}

function updateMaxPoints() {
    const maxInput = document.getElementById('points-max');
    if (maxInput) {
        appData.maxPoints = parseInt(maxInput.value) || 400;
        saveData();
        calculatePoints();
    }
}

// --- Inventory Management ---
function renderInventory() {
    const listEl = document.getElementById('inventory-list');
    listEl.innerHTML = '';

    appData.inventory.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'inv-item';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.name;
        input.oninput = (e) => {
            item.name = e.target.value;
            saveData();
        };

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete-icon';
        delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        delBtn.onclick = () => {
            appData.inventory.splice(index, 1);
            saveData();
            renderInventory();
        };

        div.appendChild(input);
        div.appendChild(delBtn);
        listEl.appendChild(div);
    });
}

function addInventoryItem() {
    const input = document.getElementById('new-item-input');
    const val = input.value.trim();
    if (val) {
        appData.inventory.push({ id: 'i' + Date.now(), name: val });
        input.value = '';
        saveData();
        renderInventory();
    }
}

function handleNewItemKey(e) {
    if (e.key === 'Enter') {
        addInventoryItem();
    }
}

// --- Dice Roller ---
function rollDice(sides) {
    // Add shake animation to the button
    const btn = document.querySelector(`.dice-btn.w${sides}`);
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 400);

    // Generate random number
    const result = Math.floor(Math.random() * sides) + 1;
    
    // Update display
    const displayNum = document.querySelector('.result-number');
    const displayLabel = document.querySelector('.result-label');
    
    displayNum.textContent = result;
    displayLabel.textContent = `Gewürfelt: 1W${sides}`;
    
    // Animate display text
    displayNum.classList.add('shake');
    setTimeout(() => displayNum.classList.remove('shake'), 400);

    lastRollTimestamp = Date.now();
    updateLiveTimers();

    // Add to log
    addToLog(`1W${sides}`, result, lastRollTimestamp);

    // Confetti on 1 (Critical Success in HTBAH)
    if (result === 1) {
        fireConfetti();
    }
    // Darker effect on 100? Or just normal.
}

function rollCustomDice() {
    const input = document.getElementById('custom-dice-input').value.trim().toLowerCase();
    const match = input.match(/^(\d*)[wd](\d+)$/);
    if (!match) {
        alert("Bitte Format wie '2w10', '1w20' oder 'd6' verwenden.");
        return;
    }
    
    const count = parseInt(match[1]) || 1;
    const sides = parseInt(match[2]);
    
    if (count > 50 || sides > 1000 || sides < 2) {
        alert("Bitte realistische Zahlen verwenden.");
        return;
    }

    const btn = document.querySelector('.dice-btn.w-custom');
    if (btn) {
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 400);
    }
    
    let sum = 0;
    let results = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * sides) + 1;
        results.push(r);
        sum += r;
    }
    
    const displayNum = document.querySelector('.result-number');
    const displayLabel = document.querySelector('.result-label');
    
    displayNum.textContent = sum;
    displayLabel.textContent = `Gewürfelt: ${count}W${sides} ${count > 1 ? '(' + results.join(', ') + ')' : ''}`;
    
    displayNum.classList.add('shake');
    setTimeout(() => displayNum.classList.remove('shake'), 400);

    lastRollTimestamp = Date.now();
    updateLiveTimers();

    addToLog(`${count}W${sides}`, sum, lastRollTimestamp);

    if (sum === count) { // All 1s is a critical success in some variations, or just standard check
        fireConfetti();
    }
}

function updateLiveTimers() {
    if (!lastRollTimestamp) return;
    const now = Date.now();
    const diffSec = Math.floor((now - lastRollTimestamp) / 1000);
    
    let timeStr = 'Gerade eben';
    if (diffSec > 0 && diffSec < 60) {
        timeStr = `vor ${diffSec} Sekunden`;
    } else if (diffSec >= 60) {
        const min = Math.floor(diffSec / 60);
        timeStr = `vor ${min} Minute${min > 1 ? 'n' : ''}`;
    }
    
    const timeEl = document.getElementById('main-dice-time');
    if (timeEl) {
        timeEl.textContent = timeStr;
    }

    // Also update log entries
    document.querySelectorAll('.log-entry').forEach(li => {
        const ts = parseInt(li.getAttribute('data-ts'));
        if (ts) {
            const lDiff = Math.floor((now - ts) / 1000);
            let lStr = 'Gerade eben';
            if (lDiff > 0 && lDiff < 60) {
                lStr = `vor ${lDiff} Sek`;
            } else if (lDiff >= 60) {
                const lMin = Math.floor(lDiff / 60);
                lStr = `vor ${lMin} Min`;
            }
            const timeSpan = li.querySelector('.log-time');
            if (timeSpan) {
                timeSpan.textContent = lStr;
            }
        }
    });
}

function addToLog(dice, result, timestamp) {
    const logList = document.getElementById('dice-log');
    const li = document.createElement('li');
    li.className = 'log-entry';
    li.setAttribute('data-ts', timestamp);
    
    li.innerHTML = `
        <div>
            <span class="log-time">Gerade eben</span>
            <span class="log-type">${dice}</span>
        </div>
        <span class="log-val">${result}</span>
    `;

    logList.prepend(li);
    
    // Keep log max 10 entries
    if (logList.children.length > 10) {
        logList.removeChild(logList.lastChild);
    }
}

function fireConfetti() {
    if (window.confetti) {
        window.confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#8b5cf6', '#fbbf24', '#f43f5e']
        });
    }
}

// --- Image Upload ---
function handlePortraitUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        appData.portrait = e.target.result;
        document.getElementById('portrait-img').src = appData.portrait;
        saveData();
    };
    reader.readAsDataURL(file);
}

// --- Import / Export ---
function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    
    let fileName = "htbah_character";
    if (appData.vorname || appData.name) {
        fileName = `${appData.vorname}_${appData.name}`.trim().replace(/^_+|_+$/g, '');
    }
    
    downloadAnchorNode.setAttribute("download", fileName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    showSaveIndicator();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            appData = Object.assign(appData, imported);
            saveData();
            renderAll();
            calculatePoints();
            
            // Clear the file input so the same file can be loaded again if needed
            document.getElementById('import-upload').value = '';
        } catch (err) {
            alert("Fehler beim Importieren der Datei!");
        }
    };
    reader.readAsText(file);
}

function resetData() {
    if (confirm("Möchtest du wirklich einen komplett neuen Charakter erstellen? Alle aktuellen Daten werden gelöscht!")) {
        appData = JSON.parse(JSON.stringify(blankData));
        delete appData.portrait;
        document.getElementById('portrait-img').src = 'assets/Macgyver-4141351554.jpg'; // default placeholder
        
        saveData();
        renderAll();
        calculatePoints();
    }
}

// Boot up
document.addEventListener('DOMContentLoaded', init);

// --- Notes Management ---
function toggleNotes() {
    const content = document.getElementById('notes-content');
    const chevron = document.getElementById('notes-chevron');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        chevron.style.transform = 'rotate(0deg)';
    }
}

// --- Theme Management ---
function changeTheme() {
    const selector = document.getElementById('theme-selector');
    const theme = selector.value;
    appData.theme = theme;
    saveData();
    applyTheme(theme);
}

function applyTheme(theme) {
    document.body.className = '';
    if (theme && theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
}




