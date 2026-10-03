// How to be a Hero - Aktuelle Werte (freie Tag-Liste für Waffenschaden,
// Bewegung, Rüstung, Fertigkeiten, Attributwerte, ...)
//
// Auf Wunsch der Runde: statt jede Änderung durch Items/Ausrüstung/Zauber im
// Kopf mitzurechnen, trägt der Spieler den aktuellen effektiven Wert hier
// einmal ein und hat ihn dann griffbereit - ändert sich was, einfach den Wert
// im Tag anpassen. Bewusst KEINE automatische Verrechnung (anders als die
// "Wirkt auf"-Fertigkeit bei Status-Effekten, siehe app.js) - das ist hier
// eine reine, freie Gedächtnisstütze ohne festes Schema, genau wie
// Status-Effekte selbst. appData.aktuelleWerte: [{id, name, wert}].

function renderAktuelleWerte() {
    const container = document.getElementById('aktuelle-werte-container');
    if (!container) return;
    container.innerHTML = '';

    if (!appData.aktuelleWerte) appData.aktuelleWerte = [];

    appData.aktuelleWerte.forEach(eintrag => {
        const badge = document.createElement('span');
        badge.className = 'status-badge neutral av-badge';
        badge.style.display = 'inline-flex';
        badge.style.alignItems = 'center';
        badge.style.cursor = 'default';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = eintrag.name;
        badge.appendChild(nameSpan);

        badge.appendChild(document.createTextNode(': '));
        const valInput = document.createElement('input');
        valInput.type = 'text';
        valInput.value = eintrag.wert || '';
        valInput.className = 'av-wert-input';
        valInput.style = 'background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; color: inherit; width: 90px; font-family: inherit; font-size: inherit; outline: none; text-align: center; margin-left: 4px; padding: 0.15rem 0.3rem;';
        valInput.onchange = (e) => {
            eintrag.wert = e.target.value;
            saveData();
        };
        badge.appendChild(valInput);

        const delIcon = document.createElement('i');
        delIcon.className = 'fa-solid fa-times';
        delIcon.style = 'margin-left: 0.5rem; opacity: 0.7; cursor: pointer; padding: 0.2rem;';
        delIcon.onclick = (e) => {
            e.stopPropagation();
            if (confirm(`"${eintrag.name}" wirklich löschen?`)) removeAktuellerWert(eintrag.id);
        };
        badge.appendChild(delIcon);

        container.appendChild(badge);
    });
}

function addAktuellerWert() {
    const nameInput = document.getElementById('new-aktueller-wert-name');
    const valInput = document.getElementById('new-aktueller-wert-val');
    if (!nameInput) return;
    const name = nameInput.value.trim();
    const wert = valInput ? valInput.value.trim() : '';
    if (!name) { nameInput.focus(); return; }
    if (!appData.aktuelleWerte) appData.aktuelleWerte = [];
    appData.aktuelleWerte.push({ id: 'aw_' + Date.now(), name, wert });
    nameInput.value = '';
    if (valInput) valInput.value = '';
    saveData();
    renderAktuelleWerte();
    nameInput.focus();
}

function removeAktuellerWert(id) {
    if (!appData.aktuelleWerte) return;
    appData.aktuelleWerte = appData.aktuelleWerte.filter(w => w.id !== id);
    saveData();
    renderAktuelleWerte();
}
