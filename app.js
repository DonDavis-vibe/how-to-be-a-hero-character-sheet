let saveTimeout;
let fxEnabled = true;
let appData = {};


let lastRollTimestamp = 0;

// Regelwerk S.15: kritische Treffer verdoppeln den nächsten Schadenswurf
let pendingCritDamage = false;
// Regelwerk S.4/S.5: GBP dürfen nicht nach einem kritischen Patzer für einen Reroll genutzt werden
let lastRollByCategory = { handeln: null, wissen: null, soziales: null };

// Initialization
function init() {
    // Start with a blank character by default, since we are not using localStorage anymore
    appData = JSON.parse(JSON.stringify(blankData));

    renderAll();
    setupEventListeners();
    setupMouseSpotlight();
    calculatePoints();

    setInterval(updateLiveTimers, 1000);

    // Assistenten beim allerersten Besuch automatisch anbieten (rein UI-seitiges Flag, keine Charakterdaten)
    try {
        if (!localStorage.getItem(WIZARD_SEEN_KEY)) {
            setTimeout(openWizard, 600);
        }
    } catch (e) { /* localStorage evtl. blockiert */ }
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

let isDirty = false;

function saveData() {
    isDirty = true;
    // Auto-save to cache is disabled per user request.
    // Data is kept in memory until the user clicks "Speichern (JSON)".
    if (typeof sendMultiplayerState === 'function') sendMultiplayerState();
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
    if (appData.name) {
        document.title = `${appData.name} - Charakterbogen (HTBAH)`;
    } else {
        document.title = "Charakterbogen (HTBAH)";
    }
    
    // Layout Mode
    const container = document.querySelector('.app-container');
    if (appData.layout3Col) {
        container.classList.add('layout-3col');
    } else {
        container.classList.remove('layout-3col');
    }

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
    renderActivityLog();
    if (appData.currency) {
        const cName = document.getElementById('currency-name');
        const cVal = document.getElementById('currency-val');
        if(cName) { cName.value = appData.currency.name || 'Credits'; autoSizeCurrencyName(cName); }
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

    const hpContainer = document.querySelector('.hp-bar-container');
    const hpInput = document.getElementById('hp-current');

    if (appData.hpCurrent <= 10) {
        if(hpContainer) hpContainer.classList.add('low-hp-warning');
        if(hpInput) hpInput.classList.add('hp-text-danger');
    } else {
        if(hpContainer) hpContainer.classList.remove('low-hp-warning');
        if(hpInput) hpInput.classList.remove('hp-text-danger');
    }

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
    const oldHp = appData.hpCurrent;
    appData.hpCurrent += amount;
    if (appData.hpCurrent > appData.hpMax) appData.hpCurrent = appData.hpMax;
    const diff = appData.hpCurrent - oldHp;
    if (diff > 0) addActivityLog(`Heilung um ${diff} HP`, 'activity-good', '<i class="fa-solid fa-heart"></i>');
    else if (diff < 0) addActivityLog(`Schaden erlitten: ${Math.abs(diff)} HP`, 'activity-bad', '<i class="fa-solid fa-heart-crack"></i>');
    
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
        totalSpan.id = 'total-' + skill.id;
        updateSkillTotalDisplay(totalSpan, skill, attrVal);
        totalSpan.onclick = () => {
            const currentAttrVal = parseInt(appData[`attr_${attr}`]) || 0;
            const currentTotal = (skill.excludeBonus ? 0 : currentAttrVal) + (skill.invested || 0);
            rollSkillCheck(skill.name, currentTotal, false, attr);
        };

        // Regelwerk S.4: "Der Bonus wird zu jeder Fähigkeit addiert, es sei denn, ein Spieler
        // möchte dies explizit nicht." - Toggle, um den Begabungs-Bonus für diesen Skill abzuwählen.
        const bonusToggleBtn = document.createElement('button');
        bonusToggleBtn.className = 'btn-bonus-toggle' + (skill.excludeBonus ? ' bonus-excluded' : '');
        bonusToggleBtn.textContent = 'B';
        bonusToggleBtn.title = skill.excludeBonus
            ? `Begabungs-Bonus (+${attrVal}) ist für diesen Skill deaktiviert. Klicken zum Aktivieren.`
            : `Begabungs-Bonus (+${attrVal}) ist aktiv. Klicken um ihn für diesen Skill abzuwählen.`;
        bonusToggleBtn.onclick = () => {
            skill.excludeBonus = !skill.excludeBonus;
            saveData();
            const currentAttrVal = parseInt(appData[`attr_${attr}`]) || 0;
            bonusToggleBtn.classList.toggle('bonus-excluded', !!skill.excludeBonus);
            bonusToggleBtn.title = skill.excludeBonus
                ? `Begabungs-Bonus (+${currentAttrVal}) ist für diesen Skill deaktiviert. Klicken zum Aktivieren.`
                : `Begabungs-Bonus (+${currentAttrVal}) ist aktiv. Klicken um ihn für diesen Skill abzuwählen.`;
            updateSkillTotalDisplay(totalSpan, skill, currentAttrVal);
        };

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
            const currentAttrVal = parseInt(appData[`attr_${attr}`]) || 0;
            appData[`skills_${attr}`].forEach(s => {
                const span = document.getElementById('total-' + s.id);
                if (span) {
                    updateSkillTotalDisplay(span, s, currentAttrVal);
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
        delBtn.style.marginLeft = 'auto';
        delBtn.onclick = () => {
            if (confirm(`Möchtest du den Skill "${skill.name || 'Unbenannt'}" wirklich löschen?`)) {
                appData[`skills_${attr}`].splice(index, 1);
                saveData();
                renderSkills(attr);
                calculatePoints();
            }
        };

        const controlsRow = document.createElement('div');
        controlsRow.className = 'skill-item-controls';
        controlsRow.appendChild(minusBtn);
        controlsRow.appendChild(valInput);
        controlsRow.appendChild(plusBtn);
        controlsRow.appendChild(bonusToggleBtn);
        controlsRow.appendChild(totalSpan);
        controlsRow.appendChild(delBtn);

        item.appendChild(nameInput);
        item.appendChild(controlsRow);
        listEl.appendChild(item);
    });
}

// Regelwerk S.8: "keine Fähigkeiten über 100 Punkte haben kann" - markiert Werte über 100 visuell.
function updateSkillTotalDisplay(span, skill, attrVal) {
    const total = (skill.excludeBonus ? 0 : attrVal) + (skill.invested || 0);
    span.textContent = '= ' + total;
    span.classList.toggle('over-cap', total > 100);
    span.title = total > 100
        ? 'Probe würfeln! Achtung: Laut Regelwerk darf ein Fähigkeitswert nicht über 100 liegen - investiere die überzähligen Punkte anderweitig.'
        : 'Probe würfeln!';
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
                    addActivityLog(`Verloren/Verbraucht: ${item.name || 'Item'}`, 'activity-bad', '<i class="fa-solid fa-trash"></i>');
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
                addActivityLog(`Verbraucht: 1x ${item.name || 'Item'}`, 'activity-bad', '<i class="fa-solid fa-minus"></i>');
                saveData();
                renderInventory();
            } else {
                if(confirm("Item löschen?")) {
                    addActivityLog(`Verloren/Verbraucht: ${item.name || 'Item'}`, 'activity-bad', '<i class="fa-solid fa-trash"></i>');
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
            addActivityLog(`Gefunden: 1x ${item.name || 'Item'}`, 'activity-good', '<i class="fa-solid fa-plus"></i>');
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
        addActivityLog(`Erhalten: ${amount}x ${name}`, 'activity-good', '<i class="fa-solid fa-box"></i>');
        
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
function consumeModifier() {
    const modInput = document.getElementById('roll-modifier');
    let mod = 0;
    let str = '';
    if (modInput && modInput.value !== '' && modInput.value !== '0') {
        mod = parseInt(modInput.value);
        if (!isNaN(mod)) {
            str = mod > 0 ? ` (+${mod})` : ` (${mod})`;
            if (mod > 0) {
                addActivityLog(`SL-Bonus: +${mod} auf Probe`, 'activity-good', '<i class="fa-solid fa-wand-magic-sparkles"></i>');
            } else if (mod < 0) {
                addActivityLog(`SL-Malus: ${mod} auf Probe`, 'activity-bad', '<i class="fa-solid fa-wand-magic-sparkles"></i>');
            }
        } else {
            mod = 0;
        }
        modInput.value = '';
    }
    return { mod, str };
}

function rollDice(sides) {
    // Add shake animation to the button
    const btn = document.querySelector(`.dice-btn.w${sides}`);
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 400);

    // Generate random number
    const result = Math.floor(Math.random() * sides) + 1;
    const modifier = consumeModifier();
    const finalResult = result + modifier.mod;
    
    // Update display
    const displayNum = document.querySelector('.result-number');
    const displayLabel = document.querySelector('.result-label');
    
    displayNum.textContent = finalResult;
    displayLabel.textContent = `Gewürfelt: 1W${sides}`;
    
    // Animate display text
    displayNum.classList.add('shake');
    setTimeout(() => displayNum.classList.remove('shake'), 400);

    lastRollTimestamp = Date.now();
    updateLiveTimers();

    // Add to log
    addToLog(`1W${sides}`, modifier.mod === 0 ? finalResult : `${result}${modifier.str} = <b>${finalResult}</b>`, lastRollTimestamp);

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
    const modifier = consumeModifier();
    const finalResult = sum + modifier.mod;
    
    const displayNum = document.querySelector('.result-number');
    const displayLabel = document.querySelector('.result-label');
    
    displayNum.textContent = finalResult;
    displayLabel.textContent = `Gewürfelt: ${count}W${sides} ${count > 1 ? '(' + results.join(', ') + ')' : ''}`;
    
    displayNum.classList.add('shake');
    setTimeout(() => displayNum.classList.remove('shake'), 400);

    lastRollTimestamp = Date.now();
    updateLiveTimers();

    let logDetail = results.length > 1 ? `[${results.join(', ')}] = ${sum}` : `${sum}`;
    if (modifier.mod !== 0) {
        logDetail += `${modifier.str} = <b>${finalResult}</b>`;
    }
    addToLog(`${count}W${sides}`, logDetail, lastRollTimestamp);

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

    li.setAttribute('draggable', 'true');
    li.style.cursor = 'grab';
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `${dice}: ${result}`;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    const dragText = `[Wurf] ${plainText.trim().replace(/\s+/g, ' ')}`;
    
    li.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', dragText);
    });

    logList.prepend(li);
    
    // Keep log max 10 entries
    if (logList.children.length > 10) {
        logList.removeChild(logList.lastChild);
    }
    
    sendToDiscord(dice + ": " + result);
    if (typeof sendMultiplayerLog === 'function') {
        const temp = document.createElement('div');
        temp.innerHTML = result;
        const cleanResult = temp.textContent || temp.innerText || "";
        let bigNum = cleanResult.match(/\d+/);
        bigNum = bigNum ? bigNum[0] : "--";
        sendMultiplayerLog(dice + ": " + cleanResult, "🎲", bigNum, dice);
    }
}

function addActivityLog(message, cssClass, iconHtml) {
    if (!appData.activityLog) appData.activityLog = [];
    const timeStr = new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'});
    
    appData.activityLog.unshift({
        time: timeStr,
        cssClass: cssClass,
        iconHtml: iconHtml,
        message: message
    });
    
    if (appData.activityLog.length > 30) {
        appData.activityLog.pop();
    }
    
    saveData();
    renderActivityLog();
    let emoji = "🎲";
    if (iconHtml) {
        if (iconHtml.includes('fa-heart-crack')) emoji = "💔";
        else if (iconHtml.includes('fa-heart')) emoji = "💚";
        else if (iconHtml.includes('fa-trash')) emoji = "🗑️";
        else if (iconHtml.includes('fa-minus')) emoji = "➖";
        else if (iconHtml.includes('fa-plus')) emoji = "➕";
        else if (iconHtml.includes('fa-box')) emoji = "📦";
        else if (iconHtml.includes('fa-wand-magic')) emoji = "🪄";
        else if (iconHtml.includes('fa-masks')) emoji = "🎭";
        else if (iconHtml.includes('fa-coins')) emoji = "🪙";
        else if (iconHtml.includes('fa-table')) emoji = "📐";
        else if (iconHtml.includes('fa-khanda')) emoji = "⚔️";
        else if (iconHtml.includes('fa-lightbulb')) emoji = "💡";
        else if (iconHtml.includes('fa-discord')) emoji = "🔗";
    }
    
    sendToDiscord(message, emoji);
    if (typeof sendMultiplayerLog === 'function') sendMultiplayerLog(message, emoji);
}

// --- Discord Sync ---
function openDiscordModal() {
    const modal = document.getElementById('discord-modal-overlay');
    document.getElementById('discord-webhook-input').value = appData.discordWebhookUrl || '';
    document.getElementById('discord-sync-toggle').checked = !!appData.discordSyncEnabled;
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeDiscordModal() {
    const modal = document.getElementById('discord-modal-overlay');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function saveDiscordSettings() {
    appData.discordWebhookUrl = document.getElementById('discord-webhook-input').value.trim();
    appData.discordSyncEnabled = document.getElementById('discord-sync-toggle').checked;
    saveData();
    closeDiscordModal();
    
    if (appData.discordSyncEnabled && appData.discordWebhookUrl) {
        sendToDiscord("Discord Sync erfolgreich aktiviert!", "🔗");
        if (!appData.activityLog) appData.activityLog = [];
        appData.activityLog.unshift({
            time: new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'}),
            cssClass: 'activity-good',
            iconHtml: '<i class="fa-brands fa-discord"></i>',
            message: 'Discord Sync aktiviert'
        });
        saveData();
        renderActivityLog();
    }
}

function sendToDiscord(message, emoji = "🎲") {
    if (!appData.discordSyncEnabled || !appData.discordWebhookUrl) return;
    
    const charName = appData.name || "Unbekannter Charakter";
    
    // Strip HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = message;
    const cleanMessage = tempDiv.textContent || tempDiv.innerText || "";
    
    fetch(appData.discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: charName,
            content: `${emoji} ${cleanMessage}`
        })
    }).catch(err => console.error("Discord Sync Error:", err));
}

function renderActivityLog() {
    const logList = document.getElementById('activity-log');
    if (!logList) return;
    logList.innerHTML = '';
    
    if (!appData.activityLog) appData.activityLog = [];
    
    appData.activityLog.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'activity-entry';
        li.innerHTML = `
            <div class="activity-time">${entry.time}</div>
            <div class="activity-icon ${entry.cssClass}">${entry.iconHtml}</div>
            <div class="activity-content">${entry.message}</div>
        `;
        
        li.setAttribute('draggable', 'true');
        li.style.cursor = 'grab';
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = entry.message;
        const plainMsg = tempDiv.textContent || tempDiv.innerText || "";
        const dragText = `[Log] ${entry.time} - ${plainMsg.trim().replace(/\s+/g, ' ')}`;
        
        li.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', dragText);
        });

        logList.appendChild(li);
    });
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
        if (typeof syncWizardMediaPreviews === 'function') syncWizardMediaPreviews();
    };
    reader.readAsDataURL(file);
}

// --- Import / Export ---
function exportData() {
    isDirty = false;
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
            isDirty = false;
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

window.addEventListener('beforeunload', function (e) {
    if (isDirty) {
        e.preventDefault();
        e.returnValue = ''; // Standard behavior to show prompt in modern browsers
    }
});

function resetData() {
    if (confirm("Möchtest du wirklich einen komplett neuen Charakter erstellen? Alle aktuellen Daten werden gelöscht!")) {
        appData = {
            vorname: '', name: '', geschlecht: '', beruf: '', alter: '', statur: '',
            hpCurrent: 100, hpMax: 100,
            attr_handeln: 0, gbp_handeln: 0, skills_handeln: [],
            attr_wissen: 0, gbp_wissen: 0, skills_wissen: [],
            attr_soziales: 0, gbp_soziales: 0, skills_soziales: [],
            inventory: [], weapons: [], statuses: [],
            currency: { name: 'Credits', amount: 0 },
            layout3Col: false,
            notes: '', theme: 'default', maxPoints: 400,
            fxEnabled: true, soundEnabled: true,
            discordWebhookUrl: '', discordSyncEnabled: false
        };
        document.getElementById('portrait-img').src = 'assets/giphy.gif'; // default placeholder
        saveData();
        renderAll();
        calculatePoints();
        openWizard();
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
let superheroClickHandler = null;

function clearFx() {
    const layer = document.getElementById('fx-layer');
    if(layer) layer.innerHTML = '';
    if(fxInterval) clearInterval(fxInterval);
    if(typeof fxInterval2 !== 'undefined' && fxInterval2) clearInterval(fxInterval2);
    if(typeof fxInterval3 !== 'undefined' && fxInterval3) clearInterval(fxInterval3);
    
    if (superheroClickHandler) {
        document.removeEventListener('click', superheroClickHandler);
        superheroClickHandler = null;
    }
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

function startWildWestFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    fxInterval = setInterval(() => {
        const tumbleweed = document.createElement('div');
        tumbleweed.style.position = 'absolute';
        const size = Math.random() * 40 + 30; // 30-70px
        tumbleweed.style.width = size + 'px';
        tumbleweed.style.height = size + 'px';
        tumbleweed.style.borderRadius = '50%';
        tumbleweed.style.background = `url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 30 Q50 10 80 30 T80 70 T20 70 T20 30" fill="none" stroke="%23a0522d" stroke-width="3"/><path d="M30 20 Q10 50 30 80 T70 80 T70 20 T30 20" fill="none" stroke="%23cd853f" stroke-width="2"/><path d="M10 50 Q50 90 90 50 T50 10 T10 50" fill="none" stroke="%238b4513" stroke-width="4"/><path d="M40 10 Q80 50 40 90 T10 50 T40 10" fill="none" stroke="%23d2b48c" stroke-width="2"/><circle cx="50" cy="50" r="45" fill="none" stroke="%238b4513" stroke-width="2" stroke-dasharray="5,5"/></svg>') center/contain no-repeat`;
        tumbleweed.style.border = 'none';
        tumbleweed.style.left = '100vw'; // Start off-screen right
        tumbleweed.style.bottom = (Math.random() * 20 + 5) + 'vh'; // Roll along the bottom
        tumbleweed.style.opacity = '0.8';
        
        const duration = Math.random() * 5 + 4; // 4-9s rolling across
        tumbleweed.style.animation = `tumbleweedRoll ${duration}s linear forwards`;
        
        layer.appendChild(tumbleweed);
        
        setTimeout(() => {
            if (tumbleweed.parentNode) tumbleweed.parentNode.removeChild(tumbleweed);
        }, duration * 1000);
    }, 4500); // spawn every few seconds
}

function startPiratesFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    // Create multiple waves for depth
    for(let i=0; i<3; i++) {
        const wave = document.createElement('div');
        wave.style.position = 'absolute';
        wave.style.bottom = '0';
        wave.style.left = '0';
        wave.style.width = '100vw'; 
        wave.style.height = (80 + i*30) + 'px'; // staggered heights
        
        // A nice curve for the wave using SVG
        const opacity = 0.2 + (i*0.1);
        const svg = `<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,50 C250,100 250,0 500,50 C750,100 750,0 1000,50 L1000,100 L0,100 Z" fill="rgba(10, 60, 80, ${opacity})"/></svg>`;
        
        // Encode the SVG properly
        const encodedSvg = svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23').replace(/"/g, "'");
        
        wave.style.background = `url("data:image/svg+xml;utf8,${encodedSvg}") repeat-x`;
        wave.style.backgroundSize = '1000px 100%';
        wave.style.backgroundPosition = 'bottom';
        wave.style.animation = `waveRoll ${8 + i*4}s linear infinite`;
        wave.style.pointerEvents = 'none';
        
        // Reverse direction for middle wave to make it look turbulent
        if (i === 1) {
            wave.style.animationDirection = 'reverse';
        }
        
        layer.appendChild(wave);
    }
    
    // Kraken tentacles!
    const spawnTentacle = () => {
        const tentacle = document.createElement('div');
        tentacle.style.position = 'absolute';
        tentacle.style.bottom = '-300px'; // Start below the screen
        tentacle.style.left = (Math.random() * 80 + 10) + 'vw'; // Random horizontal position
        tentacle.style.width = '150px';
        tentacle.style.height = '300px';
        
        // Detailed SVG Kraken tentacle (no newlines)
        const tentacleSvg = `<svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg"><g fill="#e25d6b" stroke="#2d132c" stroke-width="2"><circle cx="27" cy="120" r="8"/><circle cx="21" cy="95" r="7"/><circle cx="21" cy="70" r="6"/><circle cx="26" cy="45" r="5"/><circle cx="34" cy="25" r="4"/><circle cx="44" cy="10" r="3"/></g><g fill="#801336"><circle cx="26" cy="120" r="3"/><circle cx="20" cy="95" r="3"/><circle cx="20" cy="70" r="2"/><circle cx="25" cy="45" r="2"/><circle cx="33" cy="25" r="1.5"/><circle cx="43" cy="10" r="1"/></g><path d="M35,200 Q10,120 20,70 Q25,40 45,10 Q50,0 55,5 Q60,10 40,40 Q30,70 45,120 Q55,160 65,200 Z" fill="#2d132c"/><path d="M40,200 Q15,120 25,70 Q30,40 48,10" fill="none" stroke="#801336" stroke-width="4" stroke-linecap="round"/></svg>`;
        const encodedTentacle = tentacleSvg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23').replace(/"/g, "'");
        
        tentacle.style.background = `url("data:image/svg+xml;utf8,${encodedTentacle}") no-repeat bottom center`;
        tentacle.style.backgroundSize = 'contain';
        tentacle.style.animation = 'tentacleRise 4s ease-in-out forwards';
        tentacle.style.transformOrigin = 'bottom center';
        
        layer.appendChild(tentacle);
        
        setTimeout(() => {
            if (tentacle.parentNode) tentacle.parentNode.removeChild(tentacle);
        }, 4000);
    };

    // Spawn one immediately for the wow factor, then every 20 seconds
    spawnTentacle();
    fxInterval = setInterval(spawnTentacle, 20000);
}

function startSuperheroFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    const words = ["BAM!", "POW!", "ZAP!", "BOOM!", "SMASH!", "WHAM!"];
    const colors = ["#ffcc00", "#ff003c", "#00d2ff"];
    
    const spawnBubble = () => {
        const bubble = document.createElement('div');
        const text = words[Math.floor(Math.random() * words.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        bubble.textContent = text;
        bubble.style.position = 'absolute';
        bubble.style.left = (Math.random() * 80 + 10) + 'vw';
        bubble.style.top = (Math.random() * 80 + 10) + 'vh';
        bubble.style.color = '#fff';
        bubble.style.fontSize = (Math.random() * 3 + 3) + 'rem';
        bubble.style.fontFamily = "'Bangers', 'Comic Sans MS', sans-serif";
        bubble.style.fontWeight = 'bold';
        bubble.style.textShadow = `4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0px 4px 15px ${color}`;
        bubble.style.webkitTextStroke = '2px #000';
        bubble.style.transform = 'scale(0) rotate(0deg)';
        bubble.style.opacity = '0';
        bubble.style.pointerEvents = 'none';
        bubble.style.animation = 'comicPop 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        
        layer.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
        }, 1500);
    };
    
    superheroClickHandler = (e) => {
        if (!document.getElementById('fx-layer')) return;
        // Trigger only if a button or a clickable input/icon is clicked
        if (e.target.closest('button') || e.target.closest('.attr-val') || e.target.closest('.skill-val') || e.target.closest('.category-icon') || e.target.closest('.dice-btn')) {
            spawnBubble();
        }
    };
    
    document.addEventListener('click', superheroClickHandler);
}

function startMedievalFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    const spawnParticle = () => {
        const isFlame = Math.random() > 0.6; // 40% chance for a flame
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.bottom = '-20px';
        
        if (isFlame) {
            // Flame particle (larger, fast, stays lower)
            particle.style.width = Math.random() * 15 + 10 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? '#ff4500' : '#ff8c00';
            particle.style.borderRadius = '50% 0 50% 50%'; // Teardrop fire shape
            particle.style.boxShadow = `0 0 20px ${particle.style.background}`;
            particle.style.opacity = '0';
            particle.style.pointerEvents = 'none';
            particle.style.filter = 'blur(3px)';
            
            const duration = Math.random() * 1.5 + 1; // 1-2.5 seconds
            particle.style.animation = `flameFlicker ${duration}s ease-in forwards`;
            
            layer.appendChild(particle);
            setTimeout(() => { if (particle.parentNode) particle.parentNode.removeChild(particle); }, duration * 1000);
        } else {
            // Ember particle (small, rises high)
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            const colors = ['#ff4500', '#ff8c00', '#ffd700'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            particle.style.opacity = '0';
            particle.style.pointerEvents = 'none';
            
            const duration = Math.random() * 4 + 3; // 3-7 seconds
            particle.style.animation = `emberRise ${duration}s ease-in forwards`;
            
            const sway = (Math.random() - 0.5) * 100;
            particle.style.setProperty('--sway-amount', `${sway}px`);
            
            layer.appendChild(particle);
            setTimeout(() => { if (particle.parentNode) particle.parentNode.removeChild(particle); }, duration * 1000);
        }
    };
    
    // Initial burst
    for(let i=0; i<30; i++) setTimeout(spawnParticle, Math.random() * 1500);
    
    fxInterval = setInterval(spawnParticle, 100); // Spawn faster for dense fire
}

function startUltracoreFx() {
    clearFx();
    const layer = document.getElementById('fx-layer');
    if(!layer) return;
    
    // Spawn static "Magitek Data Nodes" that boot up and fade out
    const spawnNode = () => {
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.left = Math.random() * 90 + 5 + 'vw';
        node.style.top = Math.random() * 90 + 5 + 'vh';
        const size = Math.random() * 60 + 30; // 30px to 90px
        node.style.width = size + 'px';
        node.style.height = size + 'px';
        
        // Magitek colors (cyan, purple, blue)
        const colors = ['#38bdf8', '#a855f7', '#818cf8'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        node.style.setProperty('--node-color', color);
        
        // Outer mechanical ring
        node.style.border = `2px solid ${color}`;
        node.style.borderRadius = Math.random() > 0.5 ? '50%' : '15%'; // mix of rings and rounded squares
        node.style.pointerEvents = 'none';
        node.style.display = 'flex';
        node.style.justifyContent = 'center';
        node.style.alignItems = 'center';
        
        const duration = Math.random() * 4 + 4; // 4-8 seconds
        node.style.animation = `coreNodePulse ${duration}s ease-in-out forwards`;
        
        // Inner geometric core
        const inner = document.createElement('div');
        inner.style.width = '35%';
        inner.style.height = '35%';
        inner.style.background = color;
        inner.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        inner.style.animation = `coreNodeInner ${duration}s ease-in-out forwards`;
        node.appendChild(inner);
        
        layer.appendChild(node);
        setTimeout(() => { if (node.parentNode) node.parentNode.removeChild(node); }, duration * 1000);
    };
    
    // Initial burst of nodes waking up
    for(let i=0; i<6; i++) setTimeout(spawnNode, Math.random() * 2000);
    
    // Slower spawn rate for a more subtle effect
    fxInterval = setInterval(spawnNode, 2000);
}

function changeTheme(themeVal, fromSync = false) {
    let theme = themeVal;
    if (!theme) {
        // Find which selector triggered this or fallback to player selector
        const selector = document.getElementById('theme-selector');
        theme = selector ? selector.value : 'time';
    }
    
    // Sync both selectors so they show the same value
    const sel1 = document.getElementById('theme-selector');
    const sel2 = document.getElementById('gm-theme-select');
    if (sel1) sel1.value = theme;
    if (sel2) sel2.value = theme;

    appData.theme = theme;
    saveData();
    applyTheme(theme);
    
    // Broadcast to players if GM changed it
    if (!fromSync && typeof broadcastTheme === 'function') {
        const syncCheckbox = document.getElementById('gm-sync-theme-checkbox');
        // If the checkbox exists and is unchecked, don't broadcast. Otherwise, broadcast.
        if (!syncCheckbox || syncCheckbox.checked) {
            broadcastTheme(theme);
        }
    }
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
        else if(theme === 'wildwest') startWildWestFx();
        else if(theme === 'pirates') startPiratesFx();
        else if(theme === 'superhero') startSuperheroFx();
        else if(theme === 'medieval') startMedievalFx();
        else if(theme === 'ultracore') startUltracoreFx();
    }
    
    const themeKey = theme === 'apocalyptic' ? 'apokalypse' : theme;
    const suffix = (theme && theme !== 'default') ? '_' + themeKey : '';
    
    let imgPaths = {
        'icon-handeln': `assets/icon_handeln${suffix}.jpg`,
        'icon-wissen': `assets/icon_wissen${suffix}.jpg`,
        'icon-soziales': `assets/icon_soziales${suffix}.jpg`,
        'icon-inventar': `assets/icon_inventar${suffix}.jpg`,
        'icon-notizen': `assets/icon_notizen${suffix}.jpg`,
        'icon-hp': `assets/icon_hp${suffix}.jpg`,
        'icon-waffen': `assets/icon_handeln${suffix}.jpg`
    };

    if (theme && theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
    imgPaths['main-theme-logo'] = `assets/logo_${themeKey}.jpg`;

    // Handle main logo visibility
    const mainLogoWrapper = document.getElementById('main-logo-wrapper');
    const mainLogoImg = document.getElementById('main-theme-logo');
    const removeBtn = document.getElementById('btn-remove-custom-logo');
    
    // Immer sichtbar lassen: Auch ohne themen-eigenes Logo-Bild soll der Slot als
    // klickbare Upload-Fläche für ein eigenes (Fraktions-)Logo erreichbar bleiben.
    let logoSrc = appData.customThemeLogo || imgPaths['main-theme-logo'];

    if (mainLogoImg) {
        mainLogoImg.onerror = function() {
            this.onerror = null;
            this.src = 'assets/logo_default.jpg'; // Fallback, falls das Theme kein eigenes Logo mitbringt
        };
        mainLogoImg.src = logoSrc;
    }
    if (mainLogoWrapper) mainLogoWrapper.style.display = 'flex';
    if (removeBtn) removeBtn.style.display = appData.customThemeLogo ? 'flex' : 'none';

    // Apply images to DOM
    for (const [id, path] of Object.entries(imgPaths)) {
        if (id === 'main-theme-logo') continue; // Handled above
        const imgEl = document.getElementById(id);
        if (imgEl) {
            imgEl.onerror = function() {
                const defaultBase = id === 'icon-waffen' ? 'icon_handeln' : id.replace('-', '_');
                this.src = `assets/${defaultBase}.jpg`;
                this.onerror = null;
            };
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
    const st = appData.statuses.find(s => s.id === id);
    if(st) {
        let logClass = 'activity-neutral';
        if (st.type === 'malus') logClass = 'activity-good';
        else if (st.type === 'bonus') logClass = 'activity-bad';
        addActivityLog(`Status entfernt: ${st.name}`, logClass, '<i class="fa-solid fa-heart-circle-check"></i>');
    }
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
        const cssMap = { 'bonus': 'activity-good', 'malus': 'activity-bad', 'neutral': 'activity-neutral' };
        addActivityLog(`Neuer Status: ${name}`, cssMap[statusType] || 'activity-neutral', '<i class="fa-solid fa-masks-theater"></i>');
        nameInput.value = '';
        if (valInput) valInput.value = '';
        saveData();
        renderStatuses();
    }
}

function autoSizeCurrencyName(el) {
    if (!el) return;
    el.size = Math.max(4, el.value.length + 1);
}

function updateCurrency() {
    const oldAmt = appData.currency ? appData.currency.amount : 0;
    const newAmt = parseInt(document.getElementById('currency-val').value) || 0;
    const name = document.getElementById('currency-name').value;
    appData.currency = {
        name: name,
        amount: newAmt
    };
    const diff = newAmt - oldAmt;
    if(diff > 0) addActivityLog(`+${diff} ${name}`, 'activity-good', '<i class="fa-solid fa-coins"></i>');
    else if(diff < 0) addActivityLog(`${diff} ${name}`, 'activity-bad', '<i class="fa-solid fa-coins"></i>');
    saveData();
}

function toggleLayout() {
    appData.layout3Col = !appData.layout3Col;
    renderAll();
    saveData();
    const statusText = appData.layout3Col ? 'Notizen links angeheftet' : 'Notizen unten platziert';
    addActivityLog(`Layout geändert: ${statusText}`, 'activity-good', '<i class="fa-solid fa-table-columns"></i>');
    
    if (appData.layout3Col) {
        document.getElementById('notes-content').style.display = 'block';
        document.getElementById('notes-chevron').style.transform = 'rotate(180deg)';
    }
}

// --- Help System ---
function showHelp(key) {
    if (!helpData || !helpData[key]) return;
    const modal = document.getElementById('help-modal-overlay');
    const content = document.getElementById('help-modal-content');
    content.innerHTML = helpData[key];
    modal.style.display = 'flex';
    // Small delay to allow display:flex to apply before adding class for transition
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeHelp() {
    const modal = document.getElementById('help-modal-overlay');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Wait for transition
}

// --- Charaktererstellungs-Assistent ---
const WIZARD_SEEN_KEY = 'htbah_wizard_seen';
let wizardStepIndex = 0;

const wizardSteps = [
    {
        title: '👋 Willkommen bei How to be a Hero!',
        body: () => `
            <div class="wizard-step-body">
                <p>Dieser kurze Assistent führt dich in ein paar Schritten durch die Erstellung deines Charakters: Konzept, Bild &amp; Logo, und Fähigkeiten verteilen.</p>
                <p>Der Bogen im Hintergrund rechnet dabei schon live mit, du kannst also direkt lostippen, während dieses Fenster offen bleibt. Über "Überspringen" steigst du jederzeit aus, den Assistenten findest du später über den <i class="fa-solid fa-hat-wizard"></i>-Button oben erneut.</p>
            </div>
        `
    },
    {
        title: '🧑‍🎤 Wer ist dein Charakter?',
        body: () => `
            <div class="wizard-step-body">
                <p>Oben links im Bogen füllst du die Basics deines Charakters aus: Vorname, Name, Geschlecht, Beruf, Alter und Statur. Das sind reine Rollenspiel-Angaben, sie fließen in keine Berechnung ein, hier ist also Kreativität gefragt!</p>
                <div class="wizard-tip"><i class="fa-solid fa-lightbulb"></i> Für den Einstieg eignen sich vor allem Stereotype wie ein typischer Haudrauf, Forscher oder "Kumpel von nebenan".</div>
            </div>
        `,
        onEnter: () => {
            const header = document.querySelector('.character-header');
            if (header) {
                header.scrollIntoView({ behavior: 'smooth', block: 'center' });
                header.classList.add('wizard-highlight-pulse');
                setTimeout(() => header.classList.remove('wizard-highlight-pulse'), 3000);
            }
        }
    },
    {
        title: '🖼️ Portrait & Fraktions-Logo',
        body: () => `
            <div class="wizard-step-body">
                <p>Klicke auf dein Charakterbild, um ein eigenes Portrait hochzuladen.</p>
                <div class="wizard-tip"><i class="fa-solid fa-wand-magic-sparkles"></i> Tipp: Es muss kein Foto sein, auch ein <b>animiertes GIF</b> funktioniert wunderbar als Portrait (schau dir gerne den Standard-Platzhalter an)!</div>
                <p>Direkt daneben kannst du zusätzlich ein <b>Logo</b> hinterlegen, z.B. ein Fraktions-Wappen, ein Team-Symbol oder ein Firmenlogo. Nicht jedes Vibe-Theme bringt automatisch ein passendes Logo mit, aber der Slot ist immer da: Klick einfach drauf, um dein eigenes hochzuladen.</p>
                <div class="wizard-media-row">
                    <div class="wizard-media-item">
                        <span class="wizard-media-label">Portrait</span>
                        <img id="wizard-portrait-preview" src="assets/giphy.gif" alt="Portrait Vorschau">
                        <br>
                        <button class="tool-btn" onclick="document.getElementById('portrait-upload').click()"><i class="fa-solid fa-camera"></i> Portrait wählen</button>
                    </div>
                    <div class="wizard-media-item">
                        <span class="wizard-media-label">Logo (optional)</span>
                        <img id="wizard-logo-preview" src="assets/logo_default.jpg" alt="Logo Vorschau">
                        <br>
                        <button class="tool-btn" onclick="document.getElementById('theme-logo-upload').click()"><i class="fa-solid fa-shield-halved"></i> Logo wählen</button>
                    </div>
                </div>
            </div>
        `,
        onEnter: () => syncWizardMediaPreviews()
    },
    {
        title: '📊 Handeln, Wissen & Soziales',
        body: () => `
            <div class="wizard-step-body">
                <p>Jeder Charakter hat drei Begabungen: <b>Handeln</b> (körperlich/feinmotorisch), <b>Wissen</b> (analytisch/faktenbasiert) und <b>Soziales</b> (Interaktion mit anderen). Bei jeder Kategorie legst du über "+ Skill" konkrete Fähigkeiten an (z.B. "Klettern" unter Handeln) und verteilst Punkte darauf.</p>
                <p>Der Begabungswert und deine Geistesblitzpunkte werden automatisch aus der Summe deiner Skillpunkte berechnet, du musst nichts selbst ausrechnen.</p>
                <div class="wizard-tip"><i class="fa-solid fa-circle-exclamation"></i> Insgesamt stehen dir <b>${appData.maxPoints || 400} Punkte</b> zur Verfügung. Aktuell verteilt: <span class="wizard-live-points" id="wizard-live-points">0</span> / ${appData.maxPoints || 400}. Ein einzelner Fähigkeitswert darf laut Regelwerk nie über 100 liegen, das Tool markiert das automatisch rot, falls es passiert.</div>
            </div>
        `,
        onEnter: () => {
            const el = document.getElementById('wizard-live-points');
            const src = document.getElementById('points-total');
            if (el && src) el.textContent = src.textContent;
            const grid = document.querySelector('.attributes-grid');
            if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    {
        title: '📡 Zusammen spielen: Multiplayer & Discord',
        body: () => `
            <div class="wizard-step-body">
                <p>Spielst du in einer Gruppe? Über das <i class="fa-brands fa-discord"></i>- und <i class="fa-solid fa-satellite-dish"></i>-Icon oben in der Werkzeugleiste kannst du dich mit deinem Tisch verbinden:</p>
                <p><i class="fa-solid fa-satellite-dish"></i> <b>Live-Sync (Multiplayer):</b> Gib den Raum-Code deines Spielleiters ein und dein Charakterbogen (HP, Würfe, Inventar) wird live mit dem GM-Dashboard synchronisiert, ganz ohne Account oder Server-Setup.</p>
                <p><i class="fa-brands fa-discord"></i> <b>Discord Sync:</b> Trägst du hier optional die Webhook-URL eures Discord-Kanals ein, poppt jeder deiner Würfe automatisch dort im Chat auf, damit ihn auch alle im Call sehen.</p>
                <div class="wizard-tip"><i class="fa-solid fa-circle-info"></i> Beides ist komplett optional. Du kannst den Bogen auch ganz ohne Verbindung offline nutzen.</div>
            </div>
        `,
        onEnter: () => {
            [document.getElementById('btn-discord-sync'), document.getElementById('btn-multiplayer-sync')].forEach(btn => {
                if (!btn) return;
                btn.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                btn.classList.add('wizard-highlight-pulse');
                setTimeout(() => btn.classList.remove('wizard-highlight-pulse'), 3000);
            });
        }
    },
    {
        title: '🎉 Bereit fürs Abenteuer!',
        body: () => `
            <div class="wizard-step-body">
                <p>Das war's schon mit den Grundlagen! Vergiss nicht, deinen Charakter regelmäßig über "Speichern (JSON)" zu sichern, damit nichts verloren geht.</p>
                <p>Du kannst diesen Assistenten jederzeit über den <i class="fa-solid fa-hat-wizard"></i> "Assistent"-Button oben erneut öffnen.</p>
            </div>
        `
    }
];

function openWizard() {
    wizardStepIndex = 0;
    const modal = document.getElementById('wizard-modal-overlay');
    if (!modal) return;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    renderWizardStep();
}

function closeWizard(markSeen) {
    if (markSeen) {
        try { localStorage.setItem(WIZARD_SEEN_KEY, '1'); } catch (e) { /* localStorage evtl. blockiert */ }
    }
    const modal = document.getElementById('wizard-modal-overlay');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function renderWizardStep() {
    const step = wizardSteps[wizardStepIndex];
    if (!step) return;

    const contentEl = document.getElementById('wizard-step-content');
    contentEl.innerHTML = `<h3 class="wizard-step-title">${step.title}</h3>${step.body()}`;

    const progressEl = document.getElementById('wizard-progress');
    if (progressEl) {
        progressEl.innerHTML = wizardSteps.map((_, i) => {
            let cls = 'dot';
            if (i === wizardStepIndex) cls += ' active';
            else if (i < wizardStepIndex) cls += ' done';
            return `<span class="${cls}"></span>`;
        }).join('');
    }

    const prevBtn = document.getElementById('wizard-btn-prev');
    const nextBtn = document.getElementById('wizard-btn-next');
    const skipBtn = document.getElementById('wizard-btn-skip');
    const isLast = wizardStepIndex === wizardSteps.length - 1;
    if (prevBtn) prevBtn.style.visibility = wizardStepIndex === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.innerHTML = isLast ? '<i class="fa-solid fa-check"></i> Fertig' : 'Weiter <i class="fa-solid fa-arrow-right"></i>';
    if (skipBtn) skipBtn.style.display = isLast ? 'none' : 'inline-flex';

    if (typeof step.onEnter === 'function') {
        setTimeout(step.onEnter, 50); // kurz warten, bis der Schritt-Inhalt im DOM ist
    }
}

function wizardNext() {
    if (wizardStepIndex >= wizardSteps.length - 1) {
        closeWizard(true);
        return;
    }
    wizardStepIndex++;
    renderWizardStep();
}

function wizardPrev() {
    if (wizardStepIndex <= 0) return;
    wizardStepIndex--;
    renderWizardStep();
}

function syncWizardMediaPreviews() {
    const portraitPrev = document.getElementById('wizard-portrait-preview');
    if (portraitPrev) portraitPrev.src = appData.portrait || 'assets/giphy.gif';

    const logoPrev = document.getElementById('wizard-logo-preview');
    if (logoPrev) {
        const mainLogo = document.getElementById('main-theme-logo');
        logoPrev.src = appData.customThemeLogo || (mainLogo && mainLogo.src ? mainLogo.src : 'assets/logo_default.jpg');
    }
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
        addActivityLog(`Neue Waffe: ${name}`, 'activity-good', '<i class="fa-solid fa-khanda"></i>');
        
        nameInput.value = '';
        dmgInput.value = '';
        if(descInput) descInput.value = '';
        
        saveData();
        renderWeapons();
    }
}

function removeWeapon(id) {
    const wp = appData.weapons.find(w => w.id === id);
    if (wp) addActivityLog(`Waffe entfernt: ${wp.name}`, 'activity-bad', '<i class="fa-solid fa-trash"></i>');
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

    let rollStr = `[${rolls.join('+')}]` + (parsed.mod !== 0 ? (parsed.mod > 0 ? '+'+parsed.mod : parsed.mod) : '');

    // Regelwerk S.15: Trifft ein Spieler kritisch, wird der ausgewürfelte Schaden verdoppelt.
    const wasCritHit = pendingCritDamage;
    if (wasCritHit) {
        total *= 2;
        rollStr += ' &times;2 (Krit!)';
        pendingCritDamage = false;
    }

    const displayRes = document.getElementById('dice-result');
    displayRes.querySelector('.result-number').textContent = total;
    displayRes.querySelector('.result-label').textContent = weaponName + " Schaden";
    displayRes.className = 'dice-result-display active damage-roll';

    setTimeout(() => {
        displayRes.classList.remove('active');
        displayRes.classList.remove('damage-roll');
    }, 400);

    lastRollTimestamp = Date.now();
    updateLiveTimers();

    // Crit/Fumble logic for weapons
    const isMax = !wasCritHit && (total - parsed.mod === parsed.count * parsed.sides);
    const isMin = !wasCritHit && (total - parsed.mod === parsed.count);

    if (wasCritHit) {
        fireConfetti();
        addToLog(`<i class="fa-solid fa-burst"></i> ${weaponName} Schaden`, `<b class="crit-success">${total} (Kritischer Treffer, verdoppelt!)</b> <span style="font-size:0.75rem;opacity:0.7">(${damageString} = ${rollStr})</span>`, lastRollTimestamp);
    } else if (isMax) {
        fireConfetti();
        addToLog(`<i class="fa-solid fa-burst"></i> ${weaponName} Schaden`, `<b class="crit-success">${total} (Max!)</b> <span style="font-size:0.75rem;opacity:0.7">(${damageString} = ${rollStr})</span>`, lastRollTimestamp);
    } else if (isMin) {
        fireFumble();
        addToLog(`<i class="fa-solid fa-burst"></i> ${weaponName} Schaden`, `<b class="crit-fail">${total} (Min!)</b> <span style="font-size:0.75rem;opacity:0.7">(${damageString} = ${rollStr})</span>`, lastRollTimestamp);
    } else {
        addToLog(`<i class="fa-solid fa-burst"></i> ${weaponName} Schaden`, `<b>${total}</b> <span style="font-size:0.75rem;opacity:0.7">(${damageString} = ${rollStr})</span>`, lastRollTimestamp);
    }
}

function adjustGbp(category, amount) {
    let field = 'gbp_' + category;
    let baseAttrField = 'attr_' + category;
    let maxGbp = Math.round(appData[baseAttrField] / 10);
    
    let oldVal = parseInt(appData[field]) || 0;
    let newVal = oldVal + amount;
    if (newVal < 0) newVal = 0;
    if (newVal > maxGbp) newVal = maxGbp;
    
    if (oldVal !== newVal) {
        appData[field] = newVal;
        
        const inputEl = document.getElementById('gbp-current-' + category);
        if (inputEl) inputEl.value = newVal;
        
        if (newVal > oldVal) {
            addActivityLog(`Geistesblitz aufgefüllt (${category})`, 'activity-positive', '<i class="fa-solid fa-lightbulb"></i>');
        } else {
            addActivityLog(`Geistesblitz entfernt (${category})`, 'activity-negative', '<i class="fa-solid fa-lightbulb"></i>');
        }
        
        saveData();
    }
}

function useGBP(category) {
    let field = 'gbp_' + category;
    if (appData[field] > 0) {
        // Regelwerk S.4/S.5: Ein GBP darf nicht eingesetzt werden, wenn der letzte Wurf in dieser
        // Begabung ein kritischer Misserfolg (Patzer) war.
        if (lastRollByCategory[category] === 'crit-fail') {
            const override = confirm(`Laut Regelwerk kann nach einem kritischen Patzer kein Geistesblitzpunkt mehr eingesetzt werden, um den Wurf zu wiederholen.\n\nTrotzdem fortfahren?`);
            if (!override) return;
        }

        appData[field]--;
        document.getElementById('gbp-current-' + category).value = appData[field];
        addActivityLog(`Geistesblitz genutzt (${category})`, 'activity-neutral', '<i class="fa-solid fa-lightbulb"></i>');
        saveData();
        addToLog(`<i class="fa-solid fa-lightbulb"></i> Geistesblitzpunkt`, `für ${category.charAt(0).toUpperCase() + category.slice(1)} eingesetzt`);
    }
}

function rollInitiative() {
    const handlnAttr = parseInt(appData['attr_handeln']) || 0;
    const w10Result = Math.floor(Math.random() * 10) + 1;
    const modifier = consumeModifier();
    const total = w10Result + handlnAttr + modifier.mod;
    
    addToLog(`<i class="fa-solid fa-bolt"></i> Initiative`, `1W10 (${w10Result}) + Handeln (${handlnAttr})${modifier.str} = <b>${total}</b>`);
    
    const displayRes = document.getElementById('dice-result');
    if(displayRes) {
        displayRes.querySelector('.result-number').textContent = total;
        displayRes.querySelector('.result-label').textContent = "Initiative";
        displayRes.className = 'dice-result-display active success';
        if (typeof AudioController !== 'undefined') AudioController.play('dice');
        
        setTimeout(() => {
            displayRes.className = 'dice-result-display';
        }, 3000);
    }
}

function rollSkillCheck(skillName, skillValue, isBaseAttribute = false, category = null) {
    // Regelwerk S.8: "keine Fähigkeiten über 100 Punkte haben kann" - der Fähigkeitswert selbst
    // wird für den Wurf hart bei 100 gedeckelt, auch wenn auf dem Bogen mehr investiert ist.
    let capHint = '';
    if (!isBaseAttribute && skillValue > 100) {
        capHint = ` <span style="opacity:0.7">(Fähigkeit hat ${skillValue} Punkte, laut Regelwerk auf 100 gedeckelt!)</span>`;
        skillValue = 100;
    }

    const modifier = consumeModifier();
    if (modifier.mod !== 0) {
        modifier.str = modifier.mod > 0 ? ` (inkl. +${modifier.mod} Bonus)` : ` (inkl. ${modifier.mod} Malus)`;
    }
    skillValue += modifier.mod;

    const result = Math.floor(Math.random() * 100) + 1;
    let statusText = '';
    let statusClass = '';

    // Regelwerk S.3/S.21: Würfe auf Begabungen (Basiswerte) können keine kritischen Erfolge erzielen
    const critSuccessMax = isBaseAttribute ? 0 : Math.max(1, Math.round(skillValue / 10));
    const critFailMin = 90 + Math.round(skillValue / 10);

    if (!isBaseAttribute && result <= critSuccessMax) {
        statusText = '🌟 Kritischer Erfolg!';
        statusClass = 'crit-success';
        fireConfetti();
        if (typeof AudioController !== 'undefined') AudioController.play('crit');
        // Regelwerk S.15: Ein kritischer Treffer verdoppelt den nächsten Schadenswurf
        pendingCritDamage = true;
    } else if (result >= critFailMin) {
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

    if (category && lastRollByCategory.hasOwnProperty(category)) {
        lastRollByCategory[category] = statusClass;
    }

    const displayRes = document.getElementById('dice-result');
    displayRes.querySelector('.result-number').textContent = result;
    displayRes.querySelector('.result-label').textContent = skillName + " Probe";

    displayRes.className = 'dice-result-display active ' + statusClass;
    setTimeout(() => {
        displayRes.className = 'dice-result-display';
    }, 500);

    const critDamageHint = statusClass === 'crit-success' ? ` <span style="opacity:0.7">(nächster Schadenswurf wird verdoppelt!)</span>` : '';
    addToLog(`<i class="fa-solid fa-dice"></i> ${skillName}-Probe (Wert: ${skillValue}${modifier.str})`, `gewürfelt <b>${result}</b> &rarr; <span style="color:var(--accent)">${statusText}</span>${critDamageHint}${capHint}`);
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
                if (typeof syncWizardMediaPreviews === 'function') syncWizardMediaPreviews();
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
