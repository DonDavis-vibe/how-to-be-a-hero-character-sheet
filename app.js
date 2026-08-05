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
    weapons: [
        { id: 'w1', name: 'Taschenmesser', damage: '1W6-1' }
    ],
    statuses: ['Verletzt'],
    currency: { name: 'Credits', amount: 150 },
    notes: 'Kaugummi + Büroklammer = Bombe?',
    theme: 'scifi',
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
    weapons: [],
    statuses: [],
    currency: { name: 'Credits', amount: 0 },
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
        document.getElementById('portrait-img').src = 'assets/giphy.gif'; // default
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

    renderWeapons();
    renderStatuses();
    if (appData.currency) {
        const cName = document.getElementById('currency-name');
        const cVal = document.getElementById('currency-val');
        if(cName) cName.value = appData.currency.name || 'Credits';
        if(cVal) cVal.value = appData.currency.amount || 0;
    }

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
        totalSpan.className = 'skill-total skill-val clickable';
        totalSpan.title = 'Probe würfeln!';
        totalSpan.id = 'total-' + skill.id;
        let totalSkillVal = attrVal + (skill.invested || 0);
        totalSpan.textContent = '= ' + totalSkillVal;
        totalSpan.onclick = () => rollSkillCheck(skill.name, totalSkillVal);
        
        const minusBtn = document.createElement('button');
        minusBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
        minusBtn.style = 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; color: rgba(255,255,255,0.7); width: 24px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; flex-shrink: 0; transition: all 0.2s;';
        minusBtn.onmouseover = () => { minusBtn.style.background = 'rgba(255,255,255,0.15)'; minusBtn.style.color = 'white'; };
        minusBtn.onmouseout = () => { minusBtn.style.background = 'rgba(255,255,255,0.05)'; minusBtn.style.color = 'rgba(255,255,255,0.7)'; };
        minusBtn.onclick = () => {
            skill.invested = Math.max(0, (parseInt(skill.invested !== undefined ? skill.invested : skill.value) || 0) - 1);
            valInput.value = skill.invested;
            valInput.dispatchEvent(new Event('input'));
        };

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

        const plusBtn = document.createElement('button');
        plusBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        plusBtn.style = 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; color: rgba(255,255,255,0.7); width: 24px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; flex-shrink: 0; transition: all 0.2s;';
        plusBtn.onmouseover = () => { plusBtn.style.background = 'rgba(255,255,255,0.15)'; plusBtn.style.color = 'white'; };
        plusBtn.onmouseout = () => { plusBtn.style.background = 'rgba(255,255,255,0.05)'; plusBtn.style.color = 'rgba(255,255,255,0.7)'; };
        plusBtn.onclick = () => {
            skill.invested = (parseInt(skill.invested !== undefined ? skill.invested : skill.value) || 0) + 1;
            valInput.value = skill.invested;
            valInput.dispatchEvent(new Event('input'));
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
        item.appendChild(minusBtn);
        item.appendChild(valInput);
        item.appendChild(plusBtn);
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

        const amountDiv = document.createElement('div');
        amountDiv.className = 'item-amount-wrapper';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'btn-icon-small';
        minusBtn.innerHTML = '-';
        minusBtn.onclick = () => {
            let amt = parseInt(item.amount) || 1;
            if (amt > 1) {
                item.amount = amt - 1;
                saveData();
                renderInventory();
            }
        };

        const amtSpan = document.createElement('span');
        amtSpan.className = 'item-amount';
        amtSpan.textContent = (item.amount !== undefined) ? item.amount : 1;

        const plusBtn = document.createElement('button');
        plusBtn.className = 'btn-icon-small';
        plusBtn.innerHTML = '+';
        plusBtn.onclick = () => {
            let amt = parseInt(item.amount) || 1;
            item.amount = amt + 1;
            saveData();
            renderInventory();
        };

        amountDiv.appendChild(minusBtn);
        amountDiv.appendChild(amtSpan);
        amountDiv.appendChild(plusBtn);

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete-icon';
        delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        delBtn.onclick = () => {
            appData.inventory.splice(index, 1);
            saveData();
            renderInventory();
        };

        div.appendChild(input);
        div.appendChild(amountDiv);
        div.appendChild(delBtn);
        listEl.appendChild(div);
    });
}

function addInventoryItem() {
    const input = document.getElementById('new-item-input');
    const val = input.value.trim();
    if (val) {
        appData.inventory.push({ id: 'i' + Date.now(), name: val, amount: 1 });
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
        document.getElementById('portrait-img').src = 'assets/giphy.gif'; // default placeholder
        
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
    
    // Default image paths
    let imgPaths = {
        'icon-handeln': 'assets/icon_handeln.jpg',
        'icon-wissen': 'assets/icon_wissen.jpg',
        'icon-soziales': 'assets/icon_soziales.jpg',
        'icon-inventar': 'assets/icon_inventar.jpg',
        'icon-notizen': 'assets/icon_notizen.jpg',
        'icon-hp': 'assets/icon_hp.jpg',
        'icon-waffen': 'assets/icon_handeln.jpg'
    };

    if (theme && theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
        // Override with theme-specific images if available
        if (theme === 'steampunk') {
            imgPaths = {
                'icon-handeln': 'assets/icon_handeln_steampunk.jpg',
                'icon-wissen': 'assets/icon_wissen_steampunk.jpg',
                'icon-soziales': 'assets/icon_soziales_steampunk.jpg',
                'icon-inventar': 'assets/icon_inventar_steampunk.jpg',
                'icon-notizen': 'assets/icon_notizen_steampunk.jpg',
                'icon-hp': 'assets/icon_hp_steampunk.jpg',
                'icon-waffen': 'assets/icon_handeln_steampunk.jpg',
                'main-theme-logo': 'assets/logo_steampunk.jpg'
            };
        } else if (theme === 'apocalyptic') {
            imgPaths = {
                'icon-handeln': 'assets/icon_handeln_apokalypse.jpg',
                'icon-wissen': 'assets/icon_wissen_apokalypse.jpg',
                'icon-soziales': 'assets/icon_soziales_apokalypse.jpg',
                'icon-inventar': 'assets/icon_inventar_apokalypse.jpg',
                'icon-notizen': 'assets/icon_notizen_apokalypse.jpg',
                'icon-hp': 'assets/icon_hp_apokalypse.jpg',
                'icon-waffen': 'assets/icon_handeln_apokalypse.jpg',
                'main-theme-logo': 'assets/logo_apokalypse.jpg'
            };
        }
    }

    // Handle main logo visibility
    const mainLogoWrapper = document.getElementById('main-logo-wrapper');
    if (imgPaths['main-theme-logo']) {
        if (mainLogoWrapper) mainLogoWrapper.style.display = 'flex';
    } else {
        if (mainLogoWrapper) mainLogoWrapper.style.display = 'none';
    }

    // Apply images to DOM
    for (const [id, path] of Object.entries(imgPaths)) {
        const imgEl = document.getElementById(id);
        if (imgEl) {
            imgEl.src = path;
        }
    }
}







// ==================== UTILITY PACK FUNCTIONS ====================
function renderStatuses() {
    const container = document.getElementById('status-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (!appData.statuses) appData.statuses = [];
    
    if (appData.statuses.length > 0 && typeof appData.statuses[0] === 'string') {
        appData.statuses = appData.statuses.map(s => ({ id: 'st_' + Math.random().toString(36).substr(2, 9), name: s, value: '' }));
        saveData();
    }

    appData.statuses.forEach(statusObj => {
        const badge = document.createElement('span');
        badge.className = `status-badge ${statusObj.type || 'malus'}`;
        badge.style.display = 'inline-flex';
        badge.style.alignItems = 'center';
        badge.style.cursor = 'default';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = statusObj.name;
        badge.appendChild(nameSpan);

        if (statusObj.value !== undefined && statusObj.value !== '') {
            badge.appendChild(document.createTextNode(': '));
            const valInput = document.createElement('input');
            valInput.type = 'text';
            valInput.value = statusObj.value;
            valInput.style = 'background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: inherit; width: 45px; font-family: inherit; font-size: inherit; outline: none; text-align: center; margin-left: 4px; padding: 0 2px;';
            valInput.onchange = (e) => {
                statusObj.value = e.target.value;
                saveData();
            };
            badge.appendChild(valInput);
        }

        const delIcon = document.createElement('i');
        delIcon.className = 'fa-solid fa-times';
        delIcon.style = 'margin-left: 0.5rem; opacity: 0.7; cursor: pointer; padding: 0.2rem;';
        delIcon.onclick = (e) => {
            e.stopPropagation();
            removeStatus(statusObj.id);
        };
        badge.appendChild(delIcon);
        
        container.appendChild(badge);
    });
}

function removeStatus(id) {
    if (!appData.statuses) return;
    appData.statuses = appData.statuses.filter(s => s.id !== id);
    saveData();
    renderStatuses();
}

function addCustomStatus() {
    const nameInput = document.getElementById('new-status-name');
    const valInput = document.getElementById('new-status-val');
    if (!nameInput) return;
    const name = nameInput.value.trim();
    const val = valInput ? valInput.value.trim() : '';
    if (name) {
        if (!appData.statuses) appData.statuses = [];
        const typeInput = document.getElementById('new-status-type');
        const statusType = typeInput ? typeInput.value : 'malus';
        appData.statuses.push({ id: 'st_' + Date.now(), name: name, value: val, type: statusType });
        nameInput.value = '';
        if (valInput) valInput.value = '';
        saveData();
        renderStatuses();
    }
}

function updateCurrency() {
    appData.currency = {
        name: document.getElementById('currency-name').value,
        amount: parseInt(document.getElementById('currency-val').value) || 0
    };
    saveData();
}

function renderWeapons() {
    const list = document.getElementById('weapons-list');
    if (!list) return;
    list.innerHTML = '';
    if (!appData.weapons) appData.weapons = [];
    appData.weapons.forEach(w => {
        list.innerHTML += `
            <div class="weapon-item">
                <span class="weapon-name">${w.name}</span>
                <span class="weapon-dmg">${w.damage}</span>
                <button class="btn-roll-dmg" onclick="rollWeaponDamage('${w.id}')"><i class="fa-solid fa-burst"></i> Roll</button>
                <button onclick="removeWeapon('${w.id}')" style="background:transparent;border:none;color:var(--text-secondary);cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    });
}

function addWeaponItem() {
    const nameInput = document.getElementById('new-weapon-name');
    const dmgInput = document.getElementById('new-weapon-dmg');
    const name = nameInput.value.trim();
    const dmg = dmgInput.value.trim();
    if (name && dmg) {
        if (!appData.weapons) appData.weapons = [];
        appData.weapons.push({ id: 'w_' + Date.now(), name: name, damage: dmg });
        nameInput.value = '';
        dmgInput.value = '';
        saveData();
        renderWeapons();
    }
}

function removeWeapon(id) {
    appData.weapons = appData.weapons.filter(w => w.id !== id);
    saveData();
    renderWeapons();
}

function parseDiceFormula(formula) {
    const match = formula.toLowerCase().match(/(\d+)w(\d+)([\+\-]\d+)?/);
    if (!match) return null;
    return {
        count: parseInt(match[1]),
        sides: parseInt(match[2]),
        mod: match[3] ? parseInt(match[3]) : 0
    };
}

function rollWeaponDamage(id) {
    const weapon = appData.weapons.find(w => w.id === id);
    if (!weapon) return;
    
    const parsed = parseDiceFormula(weapon.damage);
    if (!parsed) {
        alert("Schadensformat nicht erkannt. Bitte z.B. 1w6+2 verwenden.");
        return;
    }
    
    let total = 0;
    let rolls = [];
    for (let i = 0; i < parsed.count; i++) {
        let r = Math.floor(Math.random() * parsed.sides) + 1;
        rolls.push(r);
        total += r;
    }
    total += parsed.mod;
    
    const displayRes = document.getElementById('dice-result');
    displayRes.querySelector('.result-number').textContent = total;
    displayRes.querySelector('.result-label').textContent = weapon.name + " Schaden";
    displayRes.className = 'dice-result-display active damage-roll';
    
    setTimeout(() => {
        displayRes.classList.remove('active');
        displayRes.classList.remove('damage-roll');
    }, 300);
    
    let rollStr = `[${rolls.join('+')}]` + (parsed.mod !== 0 ? (parsed.mod > 0 ? '+'+parsed.mod : parsed.mod) : '');
    addToLog(`<i class="fa-solid fa-burst"></i> ${weapon.name} Schaden`, `<b>${total}</b> <span style="font-size:0.75rem;opacity:0.7">(${weapon.damage} = ${rollStr})</span>`);
}

function useGBP(category) {
    let field = 'gbp_' + category;
    if (appData[field] > 0) {
        appData[field]--;
        document.getElementById('gbp-current-' + category).value = appData[field];
        saveData();
        addToLog(`<i class="fa-solid fa-lightbulb"></i> Geistesblitzpunkt`, `für ${category.charAt(0).toUpperCase() + category.slice(1)} eingesetzt`);
    }
}

function rollSkillCheck(skillName, skillValue) {
    const result = Math.floor(Math.random() * 100) + 1;
    let statusText = '';
    let statusClass = '';
    
    if (result === 1) {
        statusText = '🌟 Kritischer Erfolg!';
        statusClass = 'crit-success';
    } else if (result === 100) {
        statusText = '💀 Patzer!';
        statusClass = 'crit-fail';
    } else if (result <= skillValue) {
        statusText = '✅ Erfolg';
        statusClass = 'success';
    } else {
        statusText = '❌ Fehlschlag';
        statusClass = 'fail';
    }

    const displayRes = document.getElementById('dice-result');
    displayRes.querySelector('.result-number').textContent = result;
    displayRes.querySelector('.result-label').textContent = skillName + " Probe";
    
    displayRes.className = 'dice-result-display active ' + statusClass;
    setTimeout(() => {
        displayRes.className = 'dice-result-display';
    }, 500);

    addToLog(`<i class="fa-solid fa-dice"></i> ${skillName}-Probe (Wert: ${skillValue})`, `gewürfelt <b>${result}</b> &rarr; <span style="color:var(--accent)">${statusText}</span>`);
}
