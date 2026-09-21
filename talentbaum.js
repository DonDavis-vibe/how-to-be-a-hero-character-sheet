// How to be a Hero - Talentbaum (Hausregel-Erweiterung)
//
// Ein Regelpaket (hausregeln.js) kann einen Talentbaum mitbringen: Skills, die
// in "Ästen" hängen und mit Rang- und Skillpunkten gelernt werden. Der Spieler
// wählt eine feste Zahl Hauptbäume und ein Wesen; nur deren Äste sind sichtbar.
//
// Stand der Regeln (RW 4.1 S.17-19, siehe hausregeln/quellen/rw41.txt Zeile
// ~640-830 - dort steht der verbindliche Wortlaut):
//   - Jeder Hauptbaum-Ast hängt an EINEM Bogen-Talentwert ("Attribut-
//     Grundwert"). Rang des Asts = Wertebereich (01-30 -> #1, 31-60 -> #2,
//     61-90 -> #3, 91-99 -> #4), Skillpunkte = erreichte Schwellen (1,10,20…99)
//     - beides GILT NUR FÜR DIESEN AST, kein gemeinsamer Topf über alle Bäume.
//   - Rangpunkte (RP) sind dagegen EIN gemeinsamer Topf: 1 RP je Rangaufstieg
//     in einem der DREI Hauptbäume (Wesen zählt nicht mit), max. 12 insgesamt.
//     RP bezahlt entweder das erste Level eines Skills (in jedem Ast,
//     Wesen eingeschlossen) oder eine "Besondere Eigenschaft".
//   - Skillpunkte (SP) eines Asts bezahlen nur das 2./3. Level von SKILLS
//     DESSELBEN Asts.
//   - Höheren Rang in einem Ast freischalten: mind. `benoetigt` SP DIESES
//     Asts auf Skills des Rangs darunter ausgegeben (RW: "mindestens 2
//     Skillpunkte auf dem Rang darunter verteilt").
//   - Kreuz-Leveln: hat ein Charakter denselben Skill-Namen in zwei gewählten
//     Ästen gelernt, gilt sein EFFEKTIVES Level als Summe beider Käufe.
//   - Wesen/Monster ist ein vierter, separater Ast: sein "Attribut-Grundwert"
//     ist keine Talentpunkte-Investition, sondern vom SL vergebene
//     "Monsterpunkte" (siehe eingriff.js, Aktion 'monsterpunkte').
//   - Besondere Eigenschaften: pro Pick 1 Rangpunkt. Eine Eigenschaft von
//     Rang R erst wählbar, wenn mind. 2 der gewählten Äste (Hauptbäume+Wesen)
//     Rang R erreicht haben UND bereits 2 Eigenschaften von Rang R-1 gewählt
//     wurden.
//
// ANNAHME, vom Regelwerk nicht wörtlich bestätigt (siehe hausregeln/
// OFFENE_FRAGEN.md und Memory "Eldara Hausregeln Vorbereitung"): welcher
// Bogen-Talentwert zu welchem Hauptbaum-Ast gehört (`regeln.baumTalent` in
// hausregeln/eldora-arrrrr.js, siehe BAUM_TALENT im Konverter-Skript). Diese
// Zuordnung ist meine plausibelste Lesart, keine bestätigte Regel - bis die
// Runde das klärt, kann sie sich noch ändern.
//
// Charakterdaten (appData.hausregeln, siehe DATA_FORMAT.md):
//   { paket: 'eldora-arrrrr', hauptbaeume: ['Fernkampf', ...], wesen: 'Tiefseepirat',
//     wesenWert: 0, gelernt: { 'Ast::Skillname': level },
//     verbraucht: { 'Ast::Skillname': true }, eigenschaften: { 'Name': stufe } }
//
// Der Schlüssel ist "Ast::Name", weil derselbe Skillname in mehreren Ästen
// vorkommt (z.B. "Blutiger Zorn" bei Klingen, Fäusten und Einschüchtern).

// --- Reine Regel-Engine -----------------------------------------------------

function talentbaumRegeln(paket) {
    const p = paket || (typeof aktivesPaket === 'function' ? aktivesPaket() : null);
    if (!p || !p.talentbaum || !Array.isArray(p.talentbaum.skills)) return null;
    if (!paket && typeof hausregelOption === 'function' && !hausregelOption('talentbaum')) return null;
    return p.talentbaum;
}

function tbSchluessel(skill) {
    return `${skill.ast}::${skill.name}`;
}

function tbSkillZuSchluessel(schluessel, regeln) {
    const i = schluessel.indexOf('::');
    if (i < 0) return null;
    const ast = schluessel.slice(0, i), name = schluessel.slice(i + 2);
    return regeln.skills.find(s => s.ast === ast && s.name === name) || null;
}

// Sorgt dafür, dass der Charakter einen Talentbaum-Block hat, und liefert ihn.
function tbDaten(daten) {
    const d = daten || appData;
    if (!d.hausregeln || typeof d.hausregeln !== 'object') d.hausregeln = {};
    const h = d.hausregeln;
    if (!Array.isArray(h.hauptbaeume)) h.hauptbaeume = [];
    if (h.wesen === undefined) h.wesen = null;
    if (h.wesenWert === undefined) h.wesenWert = 0;
    // Vom SL per Sonderfreigabe (Eingriff-Dialog) zusätzlich zu den normalen
    // Wesen-Optionen freigeschalteter NSC-/Monster-Ast (RW 4.3 S.15: "Wollt
    // ihr einen Talentbaum aus diesem Bereich, kontaktiert bitte den
    // Spielleiter" - siehe eingriff.js).
    if (h.sonderAst === undefined) h.sonderAst = null;
    if (!h.gelernt || typeof h.gelernt !== 'object') h.gelernt = {};
    if (!h.verbraucht || typeof h.verbraucht !== 'object') h.verbraucht = {};
    if (!h.eigenschaften || typeof h.eigenschaften !== 'object') h.eigenschaften = {};
    return h;
}

// Gewählte Äste in Anzeigereihenfolge: Hauptbäume, dann Wesen
function tbGewaehlteAeste(h) {
    const aeste = h.hauptbaeume.filter(Boolean);
    if (h.wesen) aeste.push(h.wesen);
    return aeste;
}

// Der Bogen-Talentwert, der Rang & Skillpunkte eines Hauptbaum-Asts treibt.
// ANNAHME (regeln.baumTalent) - siehe Kommentar am Dateianfang.
function tbBasistalentWert(ast, regeln, appDataObj) {
    const basis = regeln.baumTalent && regeln.baumTalent[ast];
    if (!basis) return 0;
    const kategorien = ['handeln', 'wissen', 'soziales'];
    for (const kat of kategorien) {
        const treffer = (appDataObj[`skills_${kat}`] || []).find(s => (s.name || '').trim() === basis);
        if (treffer) return Math.max(0, parseInt(treffer.invested !== undefined ? treffer.invested : treffer.value) || 0);
    }
    return 0;
}

// Wert, der Rang & Skillpunkte EINES Asts bestimmt: bei den Hauptbäumen der
// zugeordnete Talentwert, beim gewählten Wesen die vom SL vergebenen
// Monsterpunkte (appData.hausregeln.wesenWert).
function tbAstWert(ast, h, regeln, appDataObj) {
    if (h.wesen && ast === h.wesen) return Math.max(0, parseInt(h.wesenWert) || 0);
    return tbBasistalentWert(ast, regeln, appDataObj);
}

function tbRangFuerWert(wert, kostenStaffel) {
    if (!(wert > 0) || !Array.isArray(kostenStaffel) || !kostenStaffel.length) return 0;
    const stufen = kostenStaffel.slice().sort((a, b) => a.bis - b.bis);
    for (let i = 0; i < stufen.length; i++) {
        if (wert <= stufen[i].bis) return i + 1;
    }
    return stufen.length; // über der letzten Schwelle -> höchster Rang
}

// Rang/Skillpunkte EINES Asts. spAusgegeben zählt nur Level 2+ (Level 1 kostet
// einen Rangpunkt aus dem gemeinsamen Topf, siehe tbGesamtOekonomie).
function tbAstOekonomie(ast, h, regeln, appDataObj) {
    const wert = tbAstWert(ast, h, regeln, appDataObj);
    const rang = tbRangFuerWert(wert, regeln.kostenStaffelQuelle);
    const schwellen = regeln.skillpunktSchwellen || [];
    const skillpunkte = schwellen.filter(t => wert >= t).length;
    let spAusgegeben = 0;
    regeln.skills.filter(s => s.ast === ast).forEach(s => {
        const lvl = parseInt(h.gelernt[tbSchluessel(s)]) || 0;
        if (lvl > 0) spAusgegeben += lvl - 1;
    });
    return { wert, rang, skillpunkte, spAusgegeben, spFrei: skillpunkte - spAusgegeben };
}

// Gemeinsamer Rangpunkte-Topf: 1 RP je erreichtem Rang in einem der DREI
// Hauptbäume (nicht Wesen), ausgegeben für jedes erste Skill-Level (überall,
// Wesen eingeschlossen) und jeden Eigenschaften-Pick.
function tbGesamtOekonomie(h, regeln, appDataObj) {
    const rangpunkte = h.hauptbaeume.filter(Boolean)
        .reduce((summe, ast) => summe + tbAstOekonomie(ast, h, regeln, appDataObj).rang, 0);

    let rpAusgegeben = 0;
    Object.values(h.gelernt).forEach(level => { if ((parseInt(level) || 0) > 0) rpAusgegeben += 1; });
    Object.values(h.eigenschaften).forEach(stufe => { rpAusgegeben += Math.max(0, parseInt(stufe) || 0); });

    return { rangpunkte, rpAusgegeben, rpFrei: rangpunkte - rpAusgegeben };
}

// Höheren Rang in `ast` freischalten: mind. `benoetigt` Skillpunkte DIESES
// Asts auf Skills des Rangs darunter ausgegeben (RW 4.1 S.17).
function tbRangFreigeschaltet(ast, rang, h, regeln, appDataObj) {
    if (rang <= 1) return true;
    const f = regeln.freischaltung || {};
    const modus = f.modus || 'vorRang';
    const benoetigt = f.benoetigt || 2;
    if (modus === 'frei') return true;

    if (modus === 'imAst') {
        const gelerntImAst = regeln.skills.filter(s => s.ast === ast && (parseInt(h.gelernt[tbSchluessel(s)]) || 0) > 0);
        if (gelerntImAst.length >= benoetigt) return true;
        return regeln.skills.some(s => s.ast === ast && s.rang === rang &&
            Object.keys(h.gelernt).some(k => k !== tbSchluessel(s) && k.endsWith('::' + s.name) && (parseInt(h.gelernt[k]) || 0) > 0));
    }
    // 'vorRang' (Regelwerk): Skillpunkte DIESES Asts, die auf Skills des
    // Vor-Rangs verteilt wurden (nur Level 2+, siehe tbAstOekonomie).
    let spAufVorRang = 0;
    regeln.skills.filter(s => s.ast === ast && s.rang === rang - 1).forEach(s => {
        const lvl = parseInt(h.gelernt[tbSchluessel(s)]) || 0;
        if (lvl > 0) spAufVorRang += lvl - 1;
    });
    return spAufVorRang >= benoetigt;
}

function tbFreigeschaltet(skill, h, regeln, appDataObj) {
    if (skill.rang <= 1) return true;
    return tbRangFreigeschaltet(skill.ast, skill.rang, h, regeln, appDataObj) &&
        tbAstOekonomie(skill.ast, h, regeln, appDataObj).rang >= skill.rang;
}

function tbMaxLevel(skill, regeln) {
    if (Array.isArray(skill.stufen) && skill.stufen.length) return skill.stufen.length;
    return regeln.maxLevel || 3;
}

// Kreuz-Leveln (RW 4.1 S.17): derselbe Skill-Name in mehreren gewählten Ästen
// zählt zusammen. Effektives Level = Summe der Käufe in allen Ästen, in denen
// der Charakter diesen Skill hat.
function tbEffektivesLevel(skillName, h, regeln) {
    let summe = 0;
    Object.keys(h.gelernt).forEach(k => {
        if (k.endsWith('::' + skillName) && (parseInt(h.gelernt[k]) || 0) > 0) summe += parseInt(h.gelernt[k]) || 0;
    });
    return summe;
}

// --- Besondere Eigenschaften -------------------------------------------------

function tbEigenschaftGewaehlteProRang(h, regeln) {
    const zaehler = {};
    (regeln.eigenschaften || []).forEach(e => {
        if ((parseInt(h.eigenschaften[e.name]) || 0) > 0) zaehler[e.rang] = (zaehler[e.rang] || 0) + 1;
    });
    return zaehler;
}

// Eine Eigenschaft von Rang R ist wählbar, wenn mind. 2 der gewählten Äste
// (Hauptbäume + Wesen) Rang R erreicht haben und im Rang darunter schon 2
// Eigenschaften gewählt wurden (RW 4.1 S.18, "Wichtige Einschränkung").
function tbEigenschaftFreigeschaltet(eigenschaft, h, regeln, appDataObj) {
    if (eigenschaft.rang <= 1) return true;
    const aeste = tbGewaehlteAeste(h);
    const aufRang = aeste.filter(a => tbAstOekonomie(a, h, regeln, appDataObj).rang >= eigenschaft.rang).length;
    if (aufRang < 2) return false;
    const zaehler = tbEigenschaftGewaehlteProRang(h, regeln);
    return (zaehler[eigenschaft.rang - 1] || 0) >= 2;
}

function tbEigenschaftWaehlen(name) {
    const regeln = talentbaumRegeln();
    if (!regeln || !Array.isArray(regeln.eigenschaften)) return;
    const eig = regeln.eigenschaften.find(e => e.name === name);
    if (!eig) return;
    const h = tbDaten();
    const aktuell = parseInt(h.eigenschaften[name]) || 0;
    if (aktuell >= eig.wirkungen.length) return;
    if (aktuell === 0 && !tbEigenschaftFreigeschaltet(eig, h, regeln, appData)) {
        tbHinweis('Noch gesperrt – Voraussetzungen für diesen Rang noch nicht erfüllt.');
        return;
    }
    const eco = tbGesamtOekonomie(h, regeln, appData);
    if (eco.rpFrei < 1) { tbHinweis('Kein Rangpunkt frei.'); return; }

    h.eigenschaften[name] = aktuell + 1;
    if (typeof addActivityLog === 'function') {
        addActivityLog(`Besondere Eigenschaft gewählt: ${name} (Rang ${eig.rang}, ${aktuell + 1}/${eig.wirkungen.length}).`, 'activity-good', '<i class="fa-solid fa-star"></i>');
    }
    tbNachAenderung();
}

function tbEigenschaftZurueckgeben(name) {
    const h = tbDaten();
    const aktuell = parseInt(h.eigenschaften[name]) || 0;
    if (aktuell <= 0) return;
    if (aktuell === 1) delete h.eigenschaften[name];
    else h.eigenschaften[name] = aktuell - 1;
    tbNachAenderung();
}

// --- Aktionen ---------------------------------------------------------------

function tbLernen(schluessel) {
    const regeln = talentbaumRegeln();
    if (!regeln) return;
    const skill = tbSkillZuSchluessel(schluessel, regeln);
    if (!skill) return;
    const h = tbDaten();
    const aktuell = parseInt(h.gelernt[schluessel]) || 0;
    const max = tbMaxLevel(skill, regeln);
    if (aktuell >= max) return;
    if (aktuell === 0 && !tbFreigeschaltet(skill, h, regeln, appData)) {
        tbHinweis('Noch gesperrt – erst die Voraussetzungen im Ast erfüllen.');
        return;
    }
    if (aktuell === 0) {
        const gesamt = tbGesamtOekonomie(h, regeln, appData);
        if (gesamt.rpFrei < 1) { tbHinweis('Kein Rangpunkt frei. Rangpunkte entstehen aus Rangaufstiegen in deinen Hauptbäumen.'); return; }
    } else {
        const astEco = tbAstOekonomie(skill.ast, h, regeln, appData);
        if (astEco.spFrei < 1) { tbHinweis(`Kein Skillpunkt in "${skill.ast}" frei. Skillpunkte entstehen aus erreichten Schwellen dieses Astes.`); return; }
    }

    h.gelernt[schluessel] = aktuell + 1;
    if (typeof addActivityLog === 'function') {
        addActivityLog(`${skill.name} (${skill.ast}) auf Level ${aktuell + 1} gelernt.`, 'activity-good', '<i class="fa-solid fa-diagram-project"></i>');
    }
    tbNachAenderung();
}

function tbZurueckgeben(schluessel) {
    const h = tbDaten();
    const aktuell = parseInt(h.gelernt[schluessel]) || 0;
    if (aktuell <= 0) return;
    if (aktuell === 1) { delete h.gelernt[schluessel]; delete h.verbraucht[schluessel]; }
    else h.gelernt[schluessel] = aktuell - 1;
    tbNachAenderung();
}

// Aktive Skills sind oft einmal pro Kampf nutzbar - der Spieler hakt sie ab.
function tbVerbrauchtToggle(schluessel) {
    const h = tbDaten();
    if (h.verbraucht[schluessel]) delete h.verbraucht[schluessel];
    else h.verbraucht[schluessel] = true;
    tbNachAenderung();
}

function tbAlleAuffrischen() {
    const h = tbDaten();
    h.verbraucht = {};
    if (typeof addActivityLog === 'function') addActivityLog('Alle Talentbaum-Skills wieder verfügbar.', 'activity-neutral', '<i class="fa-solid fa-rotate"></i>');
    tbNachAenderung();
}

function tbHauptbaumWaehlen(index, wert) {
    const h = tbDaten();
    h.hauptbaeume[index] = wert || null;
    tbNachAenderung();
}

function tbWesenWaehlen(wert) {
    const h = tbDaten();
    h.wesen = wert || null;
    tbNachAenderung();
}

function tbNachAenderung() {
    if (typeof saveData === 'function') saveData();
    renderTalentbaum();
}

function tbHinweis(text) {
    const el = document.getElementById('tb-hinweis');
    if (!el) { alert(text); return; }
    el.textContent = text;
    el.style.opacity = '1';
    clearTimeout(tbHinweis._t);
    tbHinweis._t = setTimeout(() => { el.style.opacity = '0'; }, 3500);
}

// Schaden eines aktiven Skills würfeln - auf dem EFFEKTIVEN Level (Kreuz-
// Leveln eingerechnet), über die Waffenschaden-Logik, damit Krit-Verdopplung
// und Log gleich mitkommen.
function tbSchadenWuerfeln(schluessel) {
    const regeln = talentbaumRegeln();
    if (!regeln || typeof rollWeaponDamage !== 'function') return;
    const skill = tbSkillZuSchluessel(schluessel, regeln);
    if (!skill) return;
    const h = tbDaten();
    const level = Math.min(tbEffektivesLevel(skill.name, h, regeln), tbMaxLevel(skill, regeln));
    if (!level) return;
    const stufe = (skill.stufen || [])[level - 1] || {};
    if (!stufe.schaden || !parseDiceFormula(String(stufe.schaden))) { tbHinweis('Dieser Skill hat auf diesem Level keinen Würfelschaden.'); return; }
    rollWeaponDamage(String(stufe.schaden), `${skill.name} (Lvl ${level})`);
}

// --- Darstellung ------------------------------------------------------------

function tbStufenText(skill, regeln) {
    const zeilen = [skill.info || ''];
    (skill.stufen || []).forEach(st => {
        const teile = [];
        if (st.reichweite) teile.push(st.reichweite);
        if (st.schaden) teile.push(st.schaden + (st.schadenArt ? ' ' + st.schadenArt : ''));
        if (st.effekt) teile.push(st.effekt);
        zeilen.push(`Lvl ${st.level}: ${teile.join(' · ')}`);
    });
    return zeilen.filter(Boolean).join('\n');
}

function tbArtBadge(skill) {
    const art = skill.art || 'aktiv';
    const icon = art === 'passiv' ? 'fa-shield-halved' : (art === 'extra' ? 'fa-star' : 'fa-bolt');
    return `<span class="tb-art tb-art-${art}" title="${art}"><i class="fa-solid ${icon}"></i></span>`;
}

function renderTalentbaum() {
    const section = document.getElementById('talentbaum-section');
    if (!section || typeof appData === 'undefined') return;
    const regeln = talentbaumRegeln();
    const paket = typeof aktivesPaket === 'function' ? aktivesPaket() : null;
    const hRoh = appData.hausregeln;

    // Bogen wurde mit einem Paket gespeichert, das hier gerade nicht aktiv ist
    if (!regeln) {
        if (hRoh && hRoh.paket && (!paket || paket.id !== hRoh.paket)) {
            const info = typeof hausregelPaketInfo === 'function' ? hausregelPaketInfo(hRoh.paket) : null;
            section.style.display = '';
            section.innerHTML = `
                <div class="tb-hinweis-box">
                    <i class="fa-solid fa-scroll"></i>
                    Dieser Charakter wurde mit dem Regelpaket <strong>${escapeHtml(info ? info.name : hRoh.paket)}</strong> gespeichert, das gerade nicht aktiv ist.
                    <button class="tool-btn" onclick="openHausregeln()"><i class="fa-solid fa-scroll"></i> Hausregeln öffnen</button>
                </div>`;
        } else {
            section.style.display = 'none';
            section.innerHTML = '';
        }
        return;
    }

    section.style.display = '';
    const h = tbDaten();
    h.paket = paket.id;
    // kostenStaffel/skillpunktSchwellen liegen unter paket.punkte, nicht im
    // talentbaum-Block selbst - hier einmal kurzschließen, damit die
    // Ast-Ökonomie-Funktionen nicht jedes Mal durchs Paket wandern müssen.
    regeln.kostenStaffelQuelle = (paket.punkte && paket.punkte.kostenStaffel) || [];
    regeln.skillpunktSchwellen = (paket.punkte && paket.punkte.skillpunktSchwellen) || [];
    const gesamt = tbGesamtOekonomie(h, regeln, appData);
    const anzahlHaupt = regeln.anzahlHauptbaeume || 3;
    const anzahlWesen = regeln.anzahlWesen === undefined ? 1 : regeln.anzahlWesen;

    // Auswahl der Äste
    const hauptSelects = [];
    for (let i = 0; i < anzahlHaupt; i++) {
        const gewaehlt = h.hauptbaeume[i] || '';
        const optionen = [`<option value="">– Hauptbaum ${i + 1} –</option>`].concat((regeln.hauptbaeume || []).map(b =>
            // In einem anderen Slot schon gewählt -> hier nicht nochmal anbieten
            `<option value="${escapeHtml(b)}" ${b === gewaehlt ? 'selected' : ''} ${(b !== gewaehlt && h.hauptbaeume.includes(b)) ? 'disabled' : ''}>${escapeHtml(b)}</option>`));
        hauptSelects.push(`<select class="x-select tb-select" onchange="tbHauptbaumWaehlen(${i}, this.value)">${optionen.join('')}</select>`);
    }
    let wesenSelect = '';
    if (anzahlWesen > 0) {
        // Vom SL sonderfreigeschalteter NSC-/Monster-Ast (h.sonderAst) kommt als
        // zusätzliche Option dazu, falls er nicht ohnehin schon in regeln.wesen steht.
        const wesenOptionen = (regeln.wesen || []).slice();
        if (h.sonderAst && !wesenOptionen.includes(h.sonderAst)) wesenOptionen.push(h.sonderAst);
        const optionen = [`<option value="">– Wesen –</option>`].concat(wesenOptionen.map(w =>
            `<option value="${escapeHtml(w)}" ${w === h.wesen ? 'selected' : ''}>${escapeHtml(w)}${w === h.sonderAst ? ' ⭐ Sonderfreigabe' : ''}</option>`));
        wesenSelect = `<select class="x-select tb-select tb-select-wesen" onchange="tbWesenWaehlen(this.value)">${optionen.join('')}</select>`;
    }

    // Wesen-Effekte
    let wesenHtml = '';
    const effekte = h.wesen && paket.wesenEffekte ? paket.wesenEffekte[h.wesen] : null;
    if (effekte && effekte.length) {
        wesenHtml = `<div class="tb-wesen-effekte">${effekte.map(e =>
            `<span class="tb-effekt tb-effekt-${e.typ === 'buff' ? 'buff' : 'debuff'}" title="${escapeHtml(e.beschreibung)}">
                <i class="fa-solid ${e.typ === 'buff' ? 'fa-arrow-up' : 'fa-arrow-down'}"></i> ${escapeHtml(e.beschreibung)}</span>`).join('')}</div>`;
    }
    if (h.wesen) {
        const astEco = tbAstOekonomie(h.wesen, h, regeln, appData);
        wesenHtml += `<p class="hr-hint" style="margin-top:0.4rem" title="Der Spielleiter vergibt sie über den Eingriff-Knopf in seinem Dashboard, nicht du selbst.">
            <i class="fa-solid fa-hand-sparkles"></i> Monsterpunkte: <strong>${h.wesenWert}</strong> (Rang ${astEco.rang || '–'})
        </p>`;
    }

    // Die Bäume
    const aeste = tbGewaehlteAeste(h);
    let baeumeHtml = '';
    if (!aeste.length) {
        baeumeHtml = `<div class="x-leer">Wähle oben deine Hauptbäume${anzahlWesen > 0 ? ' und dein Wesen' : ''}, um den Talentbaum zu sehen.</div>`;
    } else {
        baeumeHtml = aeste.map(ast => {
            const astEco = tbAstOekonomie(ast, h, regeln, appData);
            const skills = regeln.skills.filter(s => s.ast === ast);
            const istWesen = ast === h.wesen;
            const kopfBadges = `<div class="tb-ast-stand" title="Skillpunkte gelten nur für diesen Ast">
                Rang ${astEco.rang || 0} <span class="tb-dim">·</span> SP <span class="${astEco.spFrei < 0 ? 'tb-ueber' : ''}">${astEco.spFrei}/${astEco.skillpunkte}</span>
            </div>`;
            if (!skills.length) return `<div class="tb-ast card-layout"><div class="tb-ast-titel">${escapeHtml(ast)}</div>${kopfBadges}<div class="x-leer">Keine Skills im Paket.</div></div>`;
            const raenge = [...new Set(skills.map(s => s.rang))].sort((a, b) => a - b);
            const gruppen = raenge.map(r => {
                const knoten = skills.filter(s => s.rang === r).map(s => {
                    const key = tbSchluessel(s);
                    const level = parseInt(h.gelernt[key]) || 0;
                    const effektiv = tbEffektivesLevel(s.name, h, regeln);
                    const max = tbMaxLevel(s, regeln);
                    const frei = level > 0 || tbFreigeschaltet(s, h, regeln, appData);
                    const klasse = !frei ? 'tb-node-gesperrt' : (level >= max ? 'tb-node-max' : (level > 0 ? 'tb-node-aktiv' : ''));
                    const kostenText = level === 0 ? '1 Rangpunkt (gemeinsamer Topf)' : (level < max ? `1 Skillpunkt (${ast})` : 'Max');
                    const kreuz = effektiv > level ? `\nKreuz-Level: effektiv Lvl ${Math.min(effektiv, max)} (auch in anderem Ast gelernt)` : '';
                    const titel = `${s.name} – Rang ${s.rang}, ${s.art || 'aktiv'}${s.schadenTyp && s.schadenTyp !== 'keiner' ? ', ' + s.schadenTyp : ''}\nNächstes Level: ${kostenText}${kreuz}\n\n${tbStufenText(s, regeln)}`;
                    const stufe = (s.stufen || [])[Math.max(0, Math.min(effektiv, max) - 1)] || {};
                    const wuerfelbar = level > 0 && stufe.schaden && typeof parseDiceFormula === 'function' && parseDiceFormula(String(stufe.schaden));
                    return `
                        <div class="tb-node ${klasse}" data-tbkey="${escapeHtml(key)}" title="${escapeHtml(titel)}">
                            <div class="tb-node-kopf">${tbArtBadge(s)}<span class="tb-node-name">${escapeHtml(s.name)}</span></div>
                            <div class="tb-node-fuss">
                                <span class="tb-node-level">${level}/${max}${effektiv > level ? ' ⚡' : ''}</span>
                                ${wuerfelbar ? `<button class="x-mini" data-tbroll="${escapeHtml(key)}" title="Schaden ${escapeHtml(stufe.schaden)} würfeln"><i class="fa-solid fa-dice"></i></button>` : ''}
                                ${level > 0 ? `<button class="x-mini x-mini-danger tb-mini-minus" data-tbminus="${escapeHtml(key)}" title="Ein Level zurückgeben">−</button>` : ''}
                            </div>
                        </div>`;
                }).join('');
                return `<div class="tb-rang"><div class="tb-rang-label">Rang ${r}</div><div class="tb-rang-knoten">${knoten}</div></div>`;
            }).join('<div class="tb-verbinder"></div>');
            return `<div class="tb-ast card-layout ${istWesen ? 'tb-ast-wesen' : ''}">
                <div class="tb-ast-titel">${istWesen ? '<i class="fa-solid fa-dragon"></i> ' : ''}${escapeHtml(ast)}</div>
                ${kopfBadges}
                ${gruppen}
            </div>`;
        }).join('');
    }

    // Besondere Eigenschaften (RW 4.1 S.18f) - je Rang, mit Rangpunkten gekauft
    let eigenschaftenHtml = '';
    if (Array.isArray(regeln.eigenschaften) && regeln.eigenschaften.length) {
        const raenge = [...new Set(regeln.eigenschaften.map(e => e.rang))].sort((a, b) => a - b);
        const gruppen = raenge.map(r => {
            const knoten = regeln.eigenschaften.filter(e => e.rang === r).map(e => {
                const stufe = parseInt(h.eigenschaften[e.name]) || 0;
                const max = e.wirkungen.length;
                const frei = stufe > 0 || tbEigenschaftFreigeschaltet(e, h, regeln, appData);
                const klasse = !frei ? 'tb-node-gesperrt' : (stufe >= max ? 'tb-node-max' : (stufe > 0 ? 'tb-node-aktiv' : ''));
                const titel = `${e.name} – Rang ${e.rang}\nNächste Wirkung (1 Rangpunkt): ${escapeHtml(e.wirkungen[stufe] || 'Maximum erreicht')}\n\nBereits gewählt: ${stufe > 0 ? escapeHtml(e.wirkungen[stufe - 1]) : '–'}`;
                return `
                    <div class="tb-node ${klasse}" data-tbeigenschaft="${escapeHtml(e.name)}" title="${titel}">
                        <div class="tb-node-kopf"><span class="tb-node-name">${escapeHtml(e.name)}</span></div>
                        <div class="tb-node-fuss">
                            <span class="tb-node-level">${stufe}/${max}</span>
                            ${stufe > 0 ? `<button class="x-mini x-mini-danger" data-tbeigenschaftminus="${escapeHtml(e.name)}" title="Zurückgeben">−</button>` : ''}
                        </div>
                    </div>`;
            }).join('');
            return `<div class="tb-rang"><div class="tb-rang-label">Rang ${r}</div><div class="tb-rang-knoten">${knoten}</div></div>`;
        }).join('<div class="tb-verbinder"></div>');
        eigenschaftenHtml = `
            <details class="x-details tb-details" open>
                <summary><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-star"></i> Besondere Eigenschaften</summary>
                <p class="hr-hint">1 Rangpunkt pro Pick - ab Rang 2 an Bedingungen geknüpft, siehe <i class="fa-solid fa-circle-question help-icon" onclick="event.preventDefault(); showHelp('talentbaum')" title="Hilfe zum Talentbaum öffnen"></i>.</p>
                <div class="tb-ast card-layout" style="width:100%">${gruppen}</div>
            </details>`;
    }

    // Gelernte Skills als Kampf-Liste (auch aus abgewählten Ästen, damit nichts verschwindet)
    const gelerntKeys = Object.keys(h.gelernt).filter(k => (parseInt(h.gelernt[k]) || 0) > 0);
    let gelerntHtml = '';
    if (gelerntKeys.length) {
        gelerntHtml = gelerntKeys.map(key => {
            const s = tbSkillZuSchluessel(key, regeln);
            const level = parseInt(h.gelernt[key]) || 0;
            const name = s ? s.name : key.split('::')[1];
            const ast = s ? s.ast : key.split('::')[0];
            const effektiv = s ? Math.min(tbEffektivesLevel(s.name, h, regeln), tbMaxLevel(s, regeln)) : level;
            const verwaist = !aeste.includes(ast);
            const verbraucht = !!h.verbraucht[key];
            const stufe = s ? ((s.stufen || [])[effektiv - 1] || {}) : {};
            const detail = [stufe.reichweite, stufe.schaden ? stufe.schaden + (stufe.schadenArt ? ' ' + stufe.schadenArt : '') : '', stufe.effekt].filter(Boolean).join(' · ');
            return `<div class="tb-gelernt ${verbraucht ? 'tb-gelernt-verbraucht' : ''} ${verwaist ? 'tb-gelernt-verwaist' : ''}" title="${escapeHtml(s ? tbStufenText(s, regeln) : '')}">
                <button class="tb-check" data-tbtoggle="${escapeHtml(key)}" title="${verbraucht ? 'Wieder verfügbar machen' : 'Als verbraucht markieren'}"><i class="fa-solid ${verbraucht ? 'fa-square-check' : 'fa-square'}"></i></button>
                <div class="tb-gelernt-text">
                    <div><strong>${escapeHtml(name)}</strong> <span class="tb-dim">Lvl ${level}${effektiv !== level ? ` (effektiv ${effektiv} ⚡)` : ''} · ${escapeHtml(ast)}${verwaist ? ' · Ast nicht mehr gewählt' : ''}</span></div>
                    ${detail ? `<div class="tb-dim tb-gelernt-detail">${escapeHtml(detail)}</div>` : ''}
                </div>
                ${stufe.schaden && typeof parseDiceFormula === 'function' && parseDiceFormula(String(stufe.schaden)) ? `<button class="x-mini" data-tbroll="${escapeHtml(key)}" title="Schaden würfeln"><i class="fa-solid fa-dice"></i></button>` : ''}
                ${verwaist ? `<button class="x-mini x-mini-danger tb-mini-minus" data-tbminus="${escapeHtml(key)}" title="Level zurückgeben">−</button>` : ''}
            </div>`;
        }).join('');
    }

    // Sondertabellen
    const tabellen = typeof hausregelnTabellen === 'function' ? hausregelnTabellen() : {};
    const tabellenHtml = Object.values(tabellen).length
        ? `<div class="tb-tabellen">${Object.values(tabellen).map(t =>
            `<button class="tool-btn tb-tabelle-btn" onclick="hausregelnTabelleWuerfeln('${escapeHtml(t.id)}')" title="${escapeHtml(t.wuerfel)} – ${t.art === 'probe' ? 'fragt nach Erfolg/Misserfolg der Probe' : 'Orakel'}"><i class="fa-solid fa-table-list"></i> ${escapeHtml(t.name)}</button>`).join('')}</div>`
        : '';

    section.innerHTML = `
        <div class="tb-kopf">
            <h2 class="cat-title" style="margin:0"><i class="fa-solid fa-diagram-project category-icon-fa"></i> Talentbaum
                <i class="fa-solid fa-circle-question help-icon" onclick="showHelp('talentbaum')" title="Hilfe zum Talentbaum"></i></h2>
            <div class="tb-punkte">
                <span class="tb-pill ${gesamt.rpFrei < 0 ? 'tb-ueber' : ''}" title="Rangpunkte: 1 je Rangaufstieg in einem deiner drei Hauptbäume. Bezahlt das erste Level eines Skills (jeder Ast) oder eine Besondere Eigenschaft."><i class="fa-solid fa-ranking-star"></i> RP ${gesamt.rpFrei} / ${gesamt.rangpunkte}</span>
            </div>
        </div>
        <p class="hr-hint">Skillpunkte entstehen getrennt je Ast, kein gemeinsamer Topf.</p>
        <div class="tb-auswahl">${hauptSelects.join('')}${wesenSelect}</div>
        ${wesenHtml}
        <div id="tb-hinweis" class="x-hint"></div>
        <div class="tb-baeume">${baeumeHtml}</div>
        ${eigenschaftenHtml}
        <details class="x-details tb-details" ${gelerntKeys.length ? 'open' : ''}>
            <summary><i class="fa-solid fa-chevron-right x-chevron"></i> <i class="fa-solid fa-list-check"></i> Gelernte Fähigkeiten (${gelerntKeys.length})
                ${gelerntKeys.length ? `<button class="tool-btn tb-refresh" onclick="event.preventDefault(); event.stopPropagation(); tbAlleAuffrischen()" title="Alle als verfügbar markieren (z.B. nach dem Kampf)"><i class="fa-solid fa-rotate"></i> Alle auffrischen</button>` : ''}
            </summary>
            <div class="tb-gelernt-liste">${gelerntHtml || '<div class="x-leer">Noch nichts gelernt – klicke im Baum auf einen Skill.</div>'}</div>
        </details>
        ${tabellenHtml}`;

    // Bedienung per Delegation - die Knoten werden bei jeder Änderung neu gebaut
    section.querySelectorAll('.tb-node[data-tbkey]').forEach(n => n.addEventListener('click', () => tbLernen(n.dataset.tbkey)));
    section.querySelectorAll('.tb-node[data-tbeigenschaft]').forEach(n => n.addEventListener('click', () => tbEigenschaftWaehlen(n.dataset.tbeigenschaft)));
    section.querySelectorAll('[data-tbminus]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); tbZurueckgeben(b.dataset.tbminus); }));
    section.querySelectorAll('[data-tbeigenschaftminus]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); tbEigenschaftZurueckgeben(b.dataset.tbeigenschaftminus); }));
    section.querySelectorAll('[data-tbroll]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); tbSchadenWuerfeln(b.dataset.tbroll); }));
    section.querySelectorAll('[data-tbtoggle]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); tbVerbrauchtToggle(b.dataset.tbtoggle); }));
}

// --- SL-Dashboard -----------------------------------------------------------

// Kurzfassung für die Spielerkarte im Dashboard.
function talentbaumDashboardHtml(pData) {
    const h = pData && pData.hausregeln;
    if (!h || (!h.hauptbaeume && !h.wesen && !h.gelernt)) return '';
    const paket = typeof aktivesPaket === 'function' ? aktivesPaket() : null;
    const regeln = paket && paket.id === h.paket ? talentbaumRegeln(paket) : null;

    const aeste = (h.hauptbaeume || []).filter(Boolean);
    const kopf = [
        aeste.length ? `<span>${aeste.map(escapeHtml).join(' · ')}</span>` : '',
        h.wesen ? `<span><i class="fa-solid fa-dragon"></i> ${escapeHtml(h.wesen)}${h.wesenWert ? ` (${escapeHtml(h.wesenWert)})` : ''}</span>` : ''
    ].filter(Boolean).join(' &nbsp;|&nbsp; ');

    let eco = '';
    if (regeln) {
        regeln.kostenStaffelQuelle = (paket.punkte && paket.punkte.kostenStaffel) || [];
        regeln.skillpunktSchwellen = (paket.punkte && paket.punkte.skillpunktSchwellen) || [];
        const g = tbGesamtOekonomie(h, regeln, pData);
        const warn = g.rpFrei < 0 ? ' style="color:#ed4245"' : '';
        eco = `<div${warn} style="font-size:0.75rem; opacity:0.85; margin-top:0.2rem;">RP ${g.rpFrei}/${g.rangpunkte}</div>`;
    }

    const gelernt = Object.keys(h.gelernt || {}).filter(k => (parseInt(h.gelernt[k]) || 0) > 0);
    const zeilen = gelernt.map(k => {
        const teile = k.split('::');
        const verbraucht = h.verbraucht && h.verbraucht[k];
        return `<div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.1rem 0; ${verbraucht ? 'opacity:0.45; text-decoration:line-through;' : ''}">
            <span>${escapeHtml(teile[1] || k)} <span style="opacity:0.5; font-size:0.75rem;">${escapeHtml(teile[0] || '')}</span></span>
            <strong>Lvl ${escapeHtml(h.gelernt[k])}</strong></div>`;
    }).join('');

    const eigZeilen = Object.entries(h.eigenschaften || {}).filter(([, s]) => (parseInt(s) || 0) > 0)
        .map(([name, s]) => `<div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.1rem 0;"><span><i class="fa-solid fa-star" style="opacity:0.6"></i> ${escapeHtml(name)}</span><strong>Stufe ${escapeHtml(s)}</strong></div>`).join('');

    return `<div style="font-size:0.8rem; opacity:0.8;">${kopf || '<i>Noch keine Bäume gewählt</i>'}</div>${eco}<div style="margin-top:0.3rem;">${zeilen}${eigZeilen}${(zeilen || eigZeilen) ? '' : '<i>Noch nichts gelernt</i>'}</div>`;
}
