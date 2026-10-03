// How to be a Hero - Handy-Statusleiste
//
// Ergänzt mobilenav.js (Sprungleiste unten): eine schlanke Leiste oben, die
// beim Scrollen stehen bleibt und die Lebenspunkte immer zeigt - damit man
// auf dem langen, gestapelten Handy-Layout nicht erst zum Lebenspunkte-Panel
// zurückscrollen muss, um zu wissen, wie es gerade steht. Bewusst nur HP,
// nicht mehr - die Leiste soll auf einen Blick lesbar bleiben, kein zweites
// Dashboard. Tippen springt zum Lebenspunkte-Panel (dort sitzen auch die
// +/- Knöpfe, die bleiben bewusst NICHT in der Leiste selbst, damit sie
// niemand aus Versehen im Vorbeiscrollen antippt).
//
// Aktualisiert wird sie über einen einzigen Hook in updateHpBarVisual()
// (app.js) - der läuft bei jeder HP-Änderung (adjustHp/updateHp/updateHpMax)
// ohnehin schon durch, kein zusätzlicher Beobachter nötig.

function mobilestatusRender(perc) {
    const bar = document.getElementById('mobile-status-bar');
    if (!bar || typeof appData === 'undefined') return;
    if (typeof isGmMode !== 'undefined' && isGmMode) { bar.style.display = 'none'; return; }

    if (!bar.dataset.aufgebaut) {
        bar.innerHTML = `
            <i class="fa-solid fa-heart"></i>
            <div class="mobile-status-track"><div class="mobile-status-fill" id="mobile-status-fill"></div></div>
            <span id="mobile-status-text">– / –</span>`;
        bar.addEventListener('click', () => {
            if (typeof mobilenavSpringenZu === 'function') mobilenavSpringenZu('hp-panel');
            else document.getElementById('hp-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        bar.dataset.aufgebaut = '1';
    }

    const p = perc != null ? perc : Math.max(0, Math.min(100, (appData.hpCurrent / appData.hpMax) * 100 || 0));
    const fill = document.getElementById('mobile-status-fill');
    const text = document.getElementById('mobile-status-text');
    if (fill) {
        fill.style.width = p + '%';
        fill.style.backgroundColor = p > 50 ? 'var(--color-heal)' : (p > 20 ? '#f59e0b' : 'var(--color-dmg)');
    }
    if (text) text.textContent = `${appData.hpCurrent} / ${appData.hpMax}`;
    bar.classList.toggle('mobile-status-warnung', appData.hpCurrent <= 10);
}

document.addEventListener('DOMContentLoaded', () => mobilestatusRender());
