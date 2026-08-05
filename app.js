let saveTimeout;
let fxEnabled = true;
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
        // Theme and FX
    if (appData.fxEnabled !== undefined) {
        fxEnabled = appData.fxEnabled;
        const btn = document.getElementById('toggle-fx-btn');
        if (btn) btn.style.opacity = fxEnabled ? '1' : '0.5';
    }
    if (appData.soundEnabled !== undefined) {
        soundEnabled = appData.soundEnabled;
        const btn = document.getElementById('toggle-sound-btn');
        if (btn) {
            btn.style.opacity = soundEnabled ? '1' : '0.5';
            btn.innerHTML = soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
        }
    }
    
    if (appData.theme) {
        const selector = document.getElementById('theme-selector');
        if (selector) selector.value = appData.theme;
        applyTheme(appData.theme);
    } else {
        const selector = document.getElementById('theme-selector');
        if (selector) selector.value = 'default';
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

    if (amount < 0) {
        if (typeof AudioController !== 'undefined') AudioController.play('hit');
    } else if (amount > 0) {
        if (typeof AudioController !== 'undefined') AudioController.play('hpup');
    }
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

function adjustHpMax(amount) {
    let el = document.getElementById('hp-max');
    let val = parseInt(el.value) || 1;
    val = Math.max(1, val + amount);
    el.value = val;
    updateHpMax();
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
        delBtn.style.marginLeft = '1rem';
        delBtn.onclick = () => {
            if (confirm(`Möchtest du den Skill "${skill.name || 'Unbenannt'}" wirklich löschen?`)) {
                appData[`skills_${attr}`].splice(index, 1);
                saveData();
                renderSkills(attr);
                calculatePoints();
            }
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

// --- Drag & Drop State ---
let dragSourceIndex = null;
let dragSourceType = null;

function handleDragStart(e, index, type) {
    dragSourceIndex = index;
    dragSourceType = type;
    e.target.closest('.inv-item').classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const item = e.target.closest('.inv-item');
    if (item) item.classList.add('drag-over');
}

function handleDragLeave(e) {
    const item = e.target.closest('.inv-item');
    if (item) item.classList.remove('drag-over');
}

function handleDrop(e, targetIndex, type) {
    e.preventDefault();
    e.stopPropagation();
    const items = document.querySelectorAll('.inv-item');
    items.forEach(i => {
        i.classList.remove('dragging');
        i.classList.remove('drag-over');
    });

    if (dragSourceType !== type) return;
    if (dragSourceIndex === null || dragSourceIndex === targetIndex) return;

    const arrayName = type === 'inventory' ? 'inventory' : 'weapons';
    const itemToMove = appData[arrayName].splice(dragSourceIndex, 1)[0];
    appData[arrayName].splice(targetIndex, 0, itemToMove);
    
    saveData();
    if (type === 'inventory') renderInventory();
    else renderWeapons();
    
    dragSourceIndex = null;
    dragSourceType = null;
}

function handleDragEnd(e) {
    const elem = e.target.closest('.inv-item');
    if(elem) elem.classList.remove('dragging');
    const items = document.querySelectorAll('.inv-item');
    items.forEach(i => i.classList.remove('drag-over'));
}

function renderInventory() {
    const listEl = document.getElementById('inventory-list');
    listEl.innerHTML = '';

    appData.inventory.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'inv-item card-layout';
        div.draggable = true;
        
        div.addEventListener('dragstart', (e) => handleDragStart(e, index, 'inventory'));
        div.addEventListener('dragover', handleDragOver);
        div.addEventListener('dragleave', handleDragLeave);
        div.addEventListener('drop', (e) => handleDrop(e, index, 'inventory'));
        div.addEventListener('dragend', handleDragEnd);

        // Header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'inv-card-header';

        const dragHandle = document.createElement('i');
        dragHandle.className = 'fa-solid fa-bars drag-handle';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.name;
        input.className = 'inv-item-name';
        input.oninput = (e) => {
            item.name = e.target.value;
            saveData();
        };
        
        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete-icon';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        delBtn.style.marginLeft = '1rem';
        delBtn.onclick = () => {
            if (confirm(`Möchtest du das Item "${item.name || 'Unbenannt'}" wirklich löschen?`)) {
                appData.inventory.splice(index, 1);
                saveData();
                renderInventory();
            }
        };

        headerDiv.appendChild(dragHandle);
        headerDiv.appendChild(input);
        headerDiv.appendChild(delBtn);

        // Controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'inv-card-controls';
        
        const amountDiv = document.createElement('div');
        amountDiv.className = 'item-amount-wrapper';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'btn-icon-small';
        minusBtn.innerHTML = '-';
        minusBtn.onclick = () => {
            if (item.amount > 1) {
                item.amount--;
                saveData();
                renderInventory();
            } else {
                if(confirm("Item löschen?")) {
                    appData.inventory.splice(index, 1);
                    saveData();
                    renderInventory();
                }
            }
        };

        const amountSpan = document.createElement('span');
        amountSpan.className = 'item-amount';
        amountSpan.innerText = item.amount || 1;

        const plusBtn = document.createElement('button');
        plusBtn.className = 'btn-icon-small';
        plusBtn.innerHTML = '+';
        plusBtn.onclick = () => {
            item.amount = (item.amount || 1) + 1;
            saveData();
            renderInventory();
        };

        amountDiv.appendChild(minusBtn);
        amountDiv.appendChild(amountSpan);
        amountDiv.appendChild(plusBtn);

        const toggleDescBtn = document.createElement('button');
        toggleDescBtn.className = 'item-desc-toggle';
        toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Details';
        
        controlsDiv.appendChild(amountDiv);
        controlsDiv.appendChild(toggleDescBtn);
        
        // Description
        const descArea = document.createElement('textarea');
        descArea.className = 'item-description';
        descArea.placeholder = 'Beschreibung / Effekte...';
        descArea.value = item.description || '';
        if (item.showDesc) descArea.classList.add('show');
        
        descArea.oninput = (e) => {
            item.description = e.target.value;
            saveData();
        };
        
        toggleDescBtn.onclick = () => {
            item.showDesc = !item.showDesc;
            if (item.showDesc) {
                descArea.classList.add('show');
                toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Details';
            } else {
                descArea.classList.remove('show');
                toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Details';
            }
            saveData();
        };
        if (item.showDesc) toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Details';

        div.appendChild(headerDiv);
        div.appendChild(controlsDiv);
        div.appendChild(descArea);
        
        listEl.appendChild(div);
    });
}

function addInventoryItem() {
    const nameInput = document.getElementById('new-item-input');
    const amountInput = document.getElementById('new-item-amount');
    const descInput = document.getElementById('new-item-desc');
    
    if(!nameInput) return;
    
    const name = nameInput.value.trim();
    if (name) {
        if (!appData.inventory) appData.inventory = [];
        
        let amount = 1;
        let desc = '';
        if(amountInput) amount = parseInt(amountInput.value) || 1;
        if(descInput) desc = descInput.value.trim();
        
        appData.inventory.push({ 
            id: 'inv_' + Date.now(), 
            name: name,
            amount: amount,
            description: desc,
            showDesc: !!desc // auto-expand if description was added
        });
        
        nameInput.value = '';
        if(amountInput) amountInput.value = '1';
        if(descInput) descInput.value = '';
        
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
    } else if (result === 100) {
        fireFumble();
    }
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


function fireFumble() {
    if (typeof AudioController !== 'undefined') AudioController.play('fail');
    // Flash overlay
    const overlay = document.getElementById('crit-fail-overlay');
    if(overlay) {
        overlay.classList.add('show');
        setTimeout(() => overlay.classList.remove('show'), 500);
    }
    // Shake body
    document.body.classList.add('shake-hard-active');
    setTimeout(() => document.body.classList.remove('shake-hard-active'), 500);
    
    // Fall down skulls
    if (window.confetti) {
        const scalar = 2;
        const skull = window.confetti.shapeFromText({ text: '☠️', scalar });
        window.confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.1 },
            shapes: [skull],
            scalar,
            colors: ['#ff0000', '#000000']
        });
    }
}

function fireConfetti() {
    if (typeof AudioController !== 'undefined') AudioController.play('crit');
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

// --- Theme FX Logic ---
let fxInterval = null;
let fxInterval2 = null;
let fxInterval3 = null;

function clearFx() {
    const layer = document.getElementById('fx-layer');
    if(layer) layer.innerHTML = '';
    if(fxInterval) clearInterval(fxInterval);
    if(typeof fxInterval2 !== 'undefined' && fxInterval2) clearInterval(fxInterval2);
    if(typeof fxInterval3 !== 'undefined' && fxInterval3) clearInterval(fxInterval3);
}




function startLovecraftFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;

    // Eldritch Mist
    fxInterval = setInterval(() => {
        const mist = document.createElement('div');
        mist.style.position = 'absolute';
        mist.style.width = '300px';
        mist.style.height = '150px';
        mist.style.borderRadius = '50%';
        mist.style.background = 'radial-gradient(ellipse, rgba(50, 150, 100, 0.15) 0%, transparent 70%)';
        mist.style.left = (Math.random() * 100 - 10) + 'vw';
        mist.style.bottom = '-10vh';
        mist.style.filter = 'blur(20px)';
        
        const duration = Math.random() * 10 + 15; // 15-25s slow mist
        mist.style.animation = `lovecraftMist ${duration}s ease-in-out forwards`;
        
        layer.appendChild(mist);
        
        setTimeout(() => {
            if (mist.parentNode) mist.parentNode.removeChild(mist);
        }, duration * 1000);
    }, 2500); 

    // Watching Eyes
    fxInterval2 = setInterval(() => {
        const eye = document.createElement('div');
        eye.style.position = 'absolute';
        eye.style.width = '50px';
        eye.style.height = '25px';
        eye.style.borderRadius = '50%';
        eye.style.background = 'radial-gradient(circle at center, #000 15%, #4ade80 40%, transparent 75%)';
        eye.style.left = Math.random() * 90 + 5 + 'vw';
        eye.style.top = Math.random() * 80 + 10 + 'vh';
        eye.style.boxShadow = '0 0 15px rgba(74, 222, 128, 0.3)';
        
        const duration = Math.random() * 3 + 3; // 3-6s
        eye.style.animation = `lovecraftEye ${duration}s ease-in-out forwards`;
        
        layer.appendChild(eye);
        
        setTimeout(() => {
            if (eye.parentNode) eye.parentNode.removeChild(eye);
        }, duration * 1000);
    }, 3500);

    // Sanity Twitch / Glitch
    fxInterval3 = setInterval(() => {
        const container = document.querySelector('.app-container');
        if(container) {
            const twitchType = Math.floor(Math.random() * 3);
            if (twitchType === 0) {
                container.style.transform = 'translateX(' + (Math.random() * 6 - 3) + 'px) rotate(' + (Math.random() * 2 - 1) + 'deg)';
            } else if (twitchType === 1) {
                container.style.transform = 'skewX(' + (Math.random() * 2 - 1) + 'deg)';
                container.style.filter = 'blur(' + (Math.random() * 2 + 1) + 'px) sepia(1)';
            } else {
                container.style.transform = 'translateY(' + (Math.random() * 4 - 2) + 'px) scale(1.01)';
            }
            
            setTimeout(() => {
                if(container) {
                    container.style.transform = '';
                    container.style.filter = '';
                }
            }, 100 + Math.random() * 150); // very brief twitch
        }
    }, 25000); // Try twitching roughly every 25 seconds (much rarer now)
}

function startMafiaFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;

    // Heavy Noir Rain
    fxInterval = setInterval(() => {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.width = '2px';
        drop.style.height = Math.random() * 50 + 50 + 'px';
        drop.style.background = 'rgba(200, 200, 200, 0.3)';
        drop.style.left = (Math.random() * 120) + 'vw';
        drop.style.top = '-10vh';
        
        const duration = Math.random() * 0.4 + 0.4; // Very fast rain
        drop.style.animation = `mafiaRain ${duration}s linear forwards`;
        
        layer.appendChild(drop);
        
        setTimeout(() => {
            if (drop.parentNode) drop.parentNode.removeChild(drop);
        }, duration * 1000);
    }, 30); 

    // Ground Smoke/Fog
    fxInterval2 = setInterval(() => {
        const smoke = document.createElement('div');
        smoke.style.position = 'absolute';
        smoke.style.width = '200px';
        smoke.style.height = '200px';
        smoke.style.borderRadius = '50%';
        smoke.style.background = 'radial-gradient(circle, rgba(180,180,180,0.15) 0%, transparent 70%)';
        smoke.style.left = Math.random() * 100 + 'vw';
        smoke.style.bottom = '-10vh';
        smoke.style.filter = 'blur(15px)';
        
        const duration = Math.random() * 10 + 10; 
        smoke.style.animation = `mafiaSmoke ${duration}s ease-in forwards`;
        
        layer.appendChild(smoke);
        
        setTimeout(() => {
            if (smoke.parentNode) smoke.parentNode.removeChild(smoke);
        }, duration * 1000);
    }, 1500);
}

function startCyberpunkFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    fxInterval = setInterval(() => {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.left = Math.random() * 100 + 'vw';
        line.style.top = '-100px';
        line.style.width = '1px';
        line.style.height = Math.random() * 80 + 20 + 'px';
        line.style.background = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 0, 127, 0.4)';
        line.style.opacity = Math.random() * 0.3 + 0.1;
        
        const duration = Math.random() * 2 + 1.5; // much slower rain
        line.style.animation = `rainFall ${duration}s linear`;
        
        layer.appendChild(line);
        
        setTimeout(() => {
            if (line.parentNode) line.parentNode.removeChild(line);
        }, duration * 1000);
    }, 200); // sparse rain
}


function startTimeTravelFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    fxInterval = setInterval(() => {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        const size = Math.random() * 100 + 50; 
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.border = '2px solid rgba(150, 200, 255, 0.4)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = Math.random() * 100 + 'vw';
        ripple.style.top = Math.random() * 100 + 'vh';
        ripple.style.boxShadow = '0 0 15px rgba(150, 200, 255, 0.2)';
        
        const duration = Math.random() * 3 + 3; // 3s to 6s
        ripple.style.animation = `timeRipple ${duration}s ease-out forwards`;
        
        layer.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, duration * 1000);
    }, 1200); 
}

function startApocalypseFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    fxInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle-ash';
        particle.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 5 + 5;
        particle.style.animation = `floatAsh ${duration}s linear infinite`;
        layer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, duration * 1000);
    }, 400);
}

function startSteampunkFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    fxInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle-gear';
        particle.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 8 + 7;
        const size = Math.random() * 20 + 15;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animation = `floatGear ${duration}s linear infinite`;
        layer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, duration * 1000);
    }, 600);
}

function startMagicFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    fxInterval = setInterval(() => {
        const mote = document.createElement('div');
        mote.style.position = 'absolute';
        const size = Math.random() * 4 + 2; // 2-6px
        mote.style.width = size + 'px';
        mote.style.height = size + 'px';
        mote.style.borderRadius = '50%';
        mote.style.background = Math.random() > 0.5 ? '#eab308' : '#a855f7'; // gold or purple
        mote.style.boxShadow = `0 0 10px ${mote.style.background}`;
        mote.style.left = Math.random() * 100 + 'vw';
        mote.style.bottom = '-10px';
        mote.style.opacity = Math.random() * 0.5 + 0.5;
        
        const duration = Math.random() * 6 + 6; // 6-12s floating up
        mote.style.animation = `magicFloat ${duration}s ease-in-out forwards`;
        
        layer.appendChild(mote);
        
        setTimeout(() => {
            if (mote.parentNode) mote.parentNode.removeChild(mote);
        }, duration * 1000);
    }, 400); // spawn every 400ms
}

function startDeepSpaceFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    // Twinkling stars
    fxInterval = setInterval(() => {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        const size = Math.random() * 3 + 1; // 1-4px
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.borderRadius = '50%';
        star.style.background = '#ffffff';
        star.style.boxShadow = '0 0 5px #fff';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        
        const duration = Math.random() * 3 + 2; // 2-5s
        star.style.animation = `starTwinkle ${duration}s ease-in-out forwards`;
        
        layer.appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) star.parentNode.removeChild(star);
        }, duration * 1000);
    }, 200); // spawn rapidly

    // Shooting stars
    fxInterval2 = setInterval(() => {
        const shooting = document.createElement('div');
        shooting.style.position = 'absolute';
        shooting.style.width = '100px';
        shooting.style.height = '2px';
        shooting.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(56,189,248,1) 100%)';
        shooting.style.left = (Math.random() * 80 - 20) + 'vw'; // spawn left-ish
        shooting.style.top = (Math.random() * 50 - 30) + 'vh'; // spawn top-ish
        shooting.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.8)';
        
        shooting.style.animation = `shootingStar 1.5s linear forwards`;
        
        layer.appendChild(shooting);
        
        setTimeout(() => {
            if (shooting.parentNode) shooting.parentNode.removeChild(shooting);
        }, 1500);
    }, 3500); // spawn every few seconds
}

function changeTheme() {
    const selector = document.getElementById('theme-selector');
    const theme = selector.value;
    appData.theme = theme;
    saveData();
    applyTheme(theme);
}


function toggleFx() {
    fxEnabled = !fxEnabled;
    appData.fxEnabled = fxEnabled;
    saveData();
    const btn = document.getElementById('toggle-fx-btn');
    if (btn) {
        btn.style.opacity = fxEnabled ? '1' : '0.5';
    }
    if (fxEnabled) {
        const selector = document.getElementById('theme-selector');
        applyTheme(selector ? selector.value : 'default');
    } else {
        clearFx();
    }
}

function applyTheme(theme) {
    document.body.className = '';
    
    clearFx();
    if (fxEnabled) {
        if(theme === 'default') startTimeTravelFx();
        else if(theme === 'apocalyptic') startApocalypseFx();
        else if(theme === 'steampunk') startSteampunkFx();
        else if(theme === 'cyberpunk') startCyberpunkFx();
        else if(theme === 'mafia') startMafiaFx();
        else if(theme === 'lovecraft') startLovecraftFx();
        else if(theme === 'magic') startMagicFx();
        else if(theme === 'deepspace') startDeepSpaceFx();
    }
    
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
        } else if (theme === 'cyberpunk') {
            imgPaths = {
                'icon-handeln': 'assets/icon_handeln_cyberpunk.jpg',
                'icon-wissen': 'assets/icon_wissen_cyberpunk.jpg',
                'icon-soziales': 'assets/icon_soziales_cyberpunk.jpg',
                'icon-inventar': 'assets/icon_inventar_cyberpunk.jpg',
                'icon-notizen': 'assets/icon_notizen_cyberpunk.jpg',
                'icon-hp': 'assets/icon_hp_cyberpunk.jpg',
                'icon-waffen': 'assets/icon_handeln_cyberpunk.jpg',
                'main-theme-logo': 'assets/logo_cyberpunk.jpg'
            };
        }
    }

    // Handle main logo visibility
    const mainLogoWrapper = document.getElementById('main-logo-wrapper');
    const mainLogoImg = document.getElementById('main-theme-logo');
    const removeBtn = document.getElementById('btn-remove-custom-logo');
    
    let logoSrc = null;
    if (appData.customThemeLogo) {
        logoSrc = appData.customThemeLogo;
    } else if (imgPaths['main-theme-logo']) {
        logoSrc = imgPaths['main-theme-logo'];
    }

    if (logoSrc) {
        if (mainLogoWrapper) mainLogoWrapper.style.display = 'flex';
        if (mainLogoImg) mainLogoImg.src = logoSrc;
        if (removeBtn) removeBtn.style.display = appData.customThemeLogo ? 'flex' : 'none';
    } else {
        if (mainLogoWrapper) mainLogoWrapper.style.display = 'none';
    }

    // Apply images to DOM
    for (const [id, path] of Object.entries(imgPaths)) {
        if (id === 'main-theme-logo') continue; // Handled above
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
            if (confirm(`Möchtest du den Status "${statusObj.name}" wirklich löschen?`)) {
                removeStatus(statusObj.id);
            }
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
    const listEl = document.getElementById('weapons-list');
    listEl.innerHTML = '';
    
    if (!appData.weapons) appData.weapons = [];
    
    appData.weapons.forEach((weapon, index) => {
        const div = document.createElement('div');
        div.className = 'weapon-item inv-item card-layout';
        div.draggable = true;
        
        div.addEventListener('dragstart', (e) => handleDragStart(e, index, 'weapons'));
        div.addEventListener('dragover', handleDragOver);
        div.addEventListener('dragleave', handleDragLeave);
        div.addEventListener('drop', (e) => handleDrop(e, index, 'weapons'));
        div.addEventListener('dragend', handleDragEnd);

        // Header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'inv-card-header';

        const dragHandle = document.createElement('i');
        dragHandle.className = 'fa-solid fa-bars drag-handle';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = weapon.name;
        nameInput.className = 'inv-item-name';
        nameInput.oninput = (e) => {
            weapon.name = e.target.value;
            saveData();
        };
        
        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete-icon';
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        delBtn.style.marginLeft = '1rem';
        delBtn.onclick = () => {
            if (confirm(`Möchtest du die Waffe "${weapon.name || 'Unbenannt'}" wirklich löschen?`)) {
                removeWeapon(weapon.id);
            }
        };

        headerDiv.appendChild(dragHandle);
        headerDiv.appendChild(nameInput);
        headerDiv.appendChild(delBtn);

        // Controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'inv-card-controls';

        const dmgDiv = document.createElement('div');
        dmgDiv.className = 'weapon-dmg-wrapper';
        dmgDiv.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-secondary); margin-right: 0.3rem;">Schaden</span>';
        
        const dmgInput = document.createElement('input');
        dmgInput.type = 'text';
        dmgInput.value = weapon.damage;
        dmgInput.className = 'weapon-dmg-input';
        dmgInput.placeholder = 'z.B. 1w10';
        dmgInput.oninput = (e) => {
            weapon.damage = e.target.value;
            saveData();
        };
        dmgDiv.appendChild(dmgInput);

        const rollBtn = document.createElement('button');
        rollBtn.className = 'btn-icon-small weapon-damage-btn';
        rollBtn.innerHTML = '<i class="fa-solid fa-dice"></i>';
        rollBtn.title = 'Schaden würfeln';
        rollBtn.onclick = () => {
            rollWeaponDamage(weapon.damage, weapon.name);
        };
        dmgDiv.appendChild(rollBtn);

        const toggleDescBtn = document.createElement('button');
        toggleDescBtn.className = 'item-desc-toggle';
        toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Details';
        
        controlsDiv.appendChild(dmgDiv);
        controlsDiv.appendChild(toggleDescBtn);

        // Description
        const descArea = document.createElement('textarea');
        descArea.className = 'item-description';
        descArea.placeholder = 'Beschreibung / Effekte...';
        descArea.value = weapon.description || '';
        if (weapon.showDesc) descArea.classList.add('show');
        
        descArea.oninput = (e) => {
            weapon.description = e.target.value;
            saveData();
        };
        
        toggleDescBtn.onclick = () => {
            weapon.showDesc = !weapon.showDesc;
            if (weapon.showDesc) {
                descArea.classList.add('show');
                toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Details';
            } else {
                descArea.classList.remove('show');
                toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Details';
            }
            saveData();
        };
        if (weapon.showDesc) toggleDescBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Details';
        
        div.appendChild(headerDiv);
        div.appendChild(controlsDiv);
        div.appendChild(descArea);
        
        listEl.appendChild(div);
    });
}

function addWeaponItem() {
    const nameInput = document.getElementById('new-weapon-name');
    const dmgInput = document.getElementById('new-weapon-dmg');
    const descInput = document.getElementById('new-weapon-desc');
    
    const name = nameInput.value.trim();
    const dmg = dmgInput.value.trim();
    
    if (name && dmg) {
        if (!appData.weapons) appData.weapons = [];
        
        let desc = '';
        if(descInput) desc = descInput.value.trim();
        
        appData.weapons.push({ 
            id: 'w_' + Date.now(), 
            name: name, 
            damage: dmg,
            description: desc,
            showDesc: !!desc
        });
        
        nameInput.value = '';
        dmgInput.value = '';
        if(descInput) descInput.value = '';
        
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

function rollWeaponDamage(damageString, weaponName) {
    if (!damageString) return;
    const parsed = parseDiceFormula(damageString);
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
    displayRes.querySelector('.result-label').textContent = weaponName + " Schaden";
    displayRes.className = 'dice-result-display active damage-roll';
    
    setTimeout(() => {
        displayRes.classList.remove('active');
        displayRes.classList.remove('damage-roll');
    }, 400);
    
    let rollStr = `[${rolls.join('+')}]` + (parsed.mod !== 0 ? (parsed.mod > 0 ? '+'+parsed.mod : parsed.mod) : '');
    
    lastRollTimestamp = Date.now();
    updateLiveTimers();
    
    // Crit/Fumble logic for weapons
    const isMax = (total - parsed.mod === parsed.count * parsed.sides);
    const isMin = (total - parsed.mod === parsed.count);
    
    if (isMax) {
        fireConfetti();
        addToLog(`<i class="fa-solid fa-burst"></i> ${weaponName} Schaden`, `<b class="crit-success">${total} (Max!)</b> <span style="font-size:0.75rem;opacity:0.7">(${damageString} = ${rollStr})</span>`, lastRollTimestamp);
    } else if (isMin) {
        fireFumble();
        addToLog(`<i class="fa-solid fa-burst"></i> ${weaponName} Schaden`, `<b class="crit-fail">${total} (Min!)</b> <span style="font-size:0.75rem;opacity:0.7">(${damageString} = ${rollStr})</span>`, lastRollTimestamp);
    } else {
        addToLog(`<i class="fa-solid fa-burst"></i> ${weaponName} Schaden`, `<b>${total}</b> <span style="font-size:0.75rem;opacity:0.7">(${damageString} = ${rollStr})</span>`, lastRollTimestamp);
    }
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
        fireConfetti();
        if (typeof AudioController !== 'undefined') AudioController.play('crit');
    } else if (result === 100) {
        statusText = '💀 Patzer!';
        statusClass = 'crit-fail';
        fireFumble();
        if (typeof AudioController !== 'undefined') AudioController.play('fail');
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

function handleThemeLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_SIZE = 300;
                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                
                appData.customThemeLogo = compressedDataUrl;
                saveData();
                applyTheme(appData.theme || 'default');
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function removeCustomLogo(event) {
    event.preventDefault();
    event.stopPropagation();
    if (confirm("Möchtest du das eigene Logo entfernen und zum Theme-Logo zurückkehren?")) {
        delete appData.customThemeLogo;
        saveData();
        applyTheme(appData.theme || 'default');
    }
}
