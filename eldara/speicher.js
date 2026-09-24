// How to be a Hero - Sicheres localStorage (Warnung statt stillem Datenverlust)
//
// Fast jedes Feature-Modul (Karte, Seekampf, Kampf, NSC-Liste, Schiffs-
// Inventar, Hausregeln, Quest-Log, Tischmitte, SL-Notizen, ...) speichert
// seinen eigenen Stand direkt in localStorage. Bisher hat jedes das für sich
// in einem try/catch verschluckt ("voll oder blockiert") - das Problem
// dabei: der SL bekommt NICHTS davon mit. Schlägt localStorage fehl (voller
// Speicher durch große Kartenbilder/Porträts, privates Browserfenster,
// "Cookies blockieren" o.ä. Privatsphäre-Einstellung, Speicher vom Browser
// deaktiviert), wirken alle weiteren Änderungen völlig normal - bis die
// Seite neu geladen wird und alles seit dem letzten erfolgreichen Speichern
// weg ist. Genau das wurde aus der Runde zurückgemeldet (Mac-Nutzer, weder
// Safari noch Chrome speicherten - beides sehr wahrscheinlich privates
// Fenster oder eine Speicher-blockierende Einstellung, aber das Tool selbst
// hätte das nie angezeigt).
//
// sicherSpeichern() ersetzt jeden einzelnen try/catch-Aufruf: bei einem
// Fehlschlag erscheint eine bleibende Warnung oben in der Seite, die erst
// wieder verschwindet, sobald ein Speichern erneut klappt (z.B. nach
// Verlassen des privaten Fensters oder Platz-Schaffen) - kein manuelles
// Wegklicken nötig, das wäre bei einem echten Datenverlust-Risiko falsch.
//
// appData (der Charakterbogen selbst) ist davon separat - der speichert sich
// laut app.js (saveData()) bewusst NIE automatisch in localStorage, das war
// eine explizite Entscheidung von Anfang an ("Speichern (JSON)" ist dort der
// einzige Weg). Diese Datei ändert daran nichts.

let speicherProblem = false;

// Ersetzt `try { localStorage.setItem(schluessel, wert); } catch (e) {}`.
// Gibt true/false zurück, falls ein Aufrufer selbst reagieren will - die
// meisten ignorieren den Rückgabewert einfach, die Warnung läuft automatisch.
function sicherSpeichern(schluessel, wert) {
    try {
        localStorage.setItem(schluessel, wert);
        if (speicherProblem) { speicherProblem = false; speicherWarnungAktualisieren(); }
        return true;
    } catch (e) {
        speicherProblem = true;
        speicherWarnungAktualisieren();
        return false;
    }
}

function speicherWarnungAktualisieren() {
    const vorhanden = document.getElementById('speicher-warnung-banner');
    if (!speicherProblem) {
        if (vorhanden) vorhanden.remove();
        return;
    }
    if (vorhanden) return;
    const banner = document.createElement('div');
    banner.id = 'speicher-warnung-banner';
    banner.className = 'speicher-warnung-banner';
    banner.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' +
        'Deine Änderungen werden gerade NICHT im Browser gespeichert (Speicher voll oder vom Browser blockiert - z.B. privates/inkognito Fenster). ' +
        'Sichere wichtige Stände jetzt manuell (Charakterbogen: „Speichern (JSON)“, SL-Dashboard: „SL-Sitzung sichern“), bis das Problem behoben ist.';
    document.body.prepend(banner);
}

document.addEventListener('DOMContentLoaded', () => {
    // Beim Laden einmal aktiv prüfen statt nur reaktiv beim ersten Schreiben -
    // zeigt die Warnung sofort, auch wenn eine Sitzung rein lesend beginnt.
    const testSchluessel = '__htbah_speichertest__';
    try {
        localStorage.setItem(testSchluessel, '1');
        localStorage.removeItem(testSchluessel);
    } catch (e) {
        speicherProblem = true;
        speicherWarnungAktualisieren();
    }
});
