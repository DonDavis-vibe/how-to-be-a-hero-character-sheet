const helpData = {
    skills: "<h3>🎲 1-Klick Würfeln</h3><p>Du kannst jederzeit direkt auf deine <b>Basiswerte</b> (Handeln, Wissen, Soziales) oder auf einzelne <b>Skills</b> klicken, um eine automatische Probe auf diesen Wert abzulegen!</p><p>Bei <b>Skills</b> werden kritische Erfolge (die unteren 10%) und Patzer (die oberen 10%) automatisch anhand deines aktuellen Wertes mitberechnet. Auf <b>Basiswerte</b> sind laut Regelwerk keine kritischen Erfolge möglich, Patzer können hier aber weiterhin auftreten.</p>",
    
    logs: "<h3>📝 Drag & Drop Notizen</h3><p>Du kannst jeden Eintrag aus deinem <b>Aktions-Logbuch</b> oder den <b>Letzten Würfen</b> einfach mit der Maus greifen (klicken & gedrückt halten) und direkt rüber in dein <b>Notizfeld</b> ziehen!</p><p>So kannst du besondere Ereignisse oder knappe Würfe blitzschnell dokumentieren und musst sie nicht abtippen.</p>",
    
    gbp: "<h3>💡 Geistesblitzpunkte (GBP)</h3><p>Geistesblitze sind seltene Meta-Punkte, die dir der Spielleiter für besonders kreatives Spielen oder gute Ideen geben kann. Du kannst sie jederzeit ausgeben, um die Story zu deinen Gunsten zu verändern (z.B. einen verpatzten Wurf doch noch zu schaffen oder einen versteckten Hinweis zu bekommen).</p>",
    
    inventory: "<h3>🎒 Sortieren & Löschen</h3><p>Du kannst deine Items und Waffen ganz einfach per <b>Drag & Drop</b> sortieren! Klicke auf das kleine Anfasser-Symbol (<i class='fa-solid fa-bars'></i>) auf der linken Seite eines Items, halte die Maus gedrückt und ziehe es an die gewünschte Position.</p>",
    
    dice: "<h3>✨ Bonus & Custom Würfel</h3><p><b>Bonus/Malus:</b> Hat dir der Spielleiter einen situativen Bonus (z.B. +10) oder Malus (z.B. -15) gegeben? Trage ihn hier ein! Der Wert wird automatisch in deinen <i>nächsten</i> Skill-Wurf eingerechnet und danach direkt wieder zurückgesetzt.</p><p><b>Custom:</b> Hier kannst du unübliche Würfelkombinationen werfen, z.B. <code>3w8</code> für drei achtseitige Würfel.</p>",
    
    status: "<h3>🎭 Status-Effekte</h3><p>Hier kannst du dir temporäre Effekte wie <i>Krankheit</i>, <i>Vergiftet</i> oder <i>Rausch</i> notieren. Du kannst ihnen einen Wert geben (z.B. <i>1W6</i> oder <i>-10</i>) und sie farblich markieren (Rot = Malus, Grün = Bonus).</p><p>Klicke auf einen bestehenden Status-Tag, um ihn wieder zu löschen.</p>",
    
    gmSync: "<h3>🎨 Theme Sync</h3><p>Wenn du den Haken bei <b>Sync to Players</b> setzt, wird das von dir hier ausgewählte Vibe-Theme <b>automatisch auf alle Bildschirme deiner Spieler erzwungen</b>.</p><p>Das ist ein tolles Werkzeug, um in besonderen Momenten (z.B. bei einem Szenenwechsel in die Unterwelt) die Stimmung am virtuellen Tisch für alle gleichzeitig zu lenken!</p>",
    
    gmNotes: "<h3>📚 Notizen-Archiv & Save/Load</h3><p>Das Dashboard speichert zu jedem verbundenen Charakter automatisch ein eigenes, für die Spieler geheimes Notizfeld in deinem Browser.</p><p>Klicke auf <b>Notizen-Archiv</b>, um auch die Notizen von Spielern einzusehen, die gerade offline sind.</p><p>Da die Notizen lokal im Browser liegen, solltest du sie nach jeder Session mit <b>Save</b> als Backup herunterladen und vor der nächsten Session mit <b>Load</b> wiederherstellen!</p>",
    
    multiplayer: "<h3>📡 Live-Sync & 🤖 Discord</h3><p><b><i class='fa-solid fa-satellite-dish'></i> Live-Sync (Multiplayer):</b> Dies ist das GM-Dashboard Feature! Ein Spieler oder der Spielleiter klickt auf diesen Button, um einen Server-Code zu generieren. Die anderen Spieler geben diesen Code ein und verbinden sich live (Peer-to-Peer, ohne echten Server). Der Host sieht alle Spieler-Bögen, HP und Würfe in Echtzeit!</p><p><b><i class='fa-brands fa-discord'></i> Discord Sync:</b> Du kannst hier eine Discord-Webhook-URL eintragen. Dann werden alle deine Würfe (und auf Wunsch auch HP-Verluste) vollautomatisch direkt in euren Discord-Kanal gepostet, sodass alle sie lesen können.</p>",
    
    gmDice: "<h3>🎲 GM Würfel-Box</h3><p><b>Schnelle Würfe:</b> Als Spielleiter hast du hier direkten Zugriff auf die wichtigsten Würfel (1W100 für allgemeine Proben, 1W6 für einfachen Schaden).</p><p><b>Custom Würfel:</b> Brauchst du etwas Spezielles (z.B. für Monster-Schaden oder Zufallstabellen)? Gib einfach dein gewünschtes Format ein, z.B. <code>2w8</code> oder <code>1w20+5</code>.</p><p><i>Hinweis: Deine Würfe tauchen sofort live im Feed auf und lösen bei Krits (1-10) oder Patzern (91-100) beim W100 auch bei dir die passenden visuellen Effekte aus!</i></p>"
,

    customSound: "<h3>🔒 Eigener privater Sound</h3><p>Hast du einen Song oder Sound, den du <b>nicht öffentlich verwenden darfst</b> (z.B. nur für den privaten Rahmen lizenziert), aber trotzdem in eurer Runde nutzen willst? Lade ihn hier hoch!</p><p>Die Datei wird <b>ausschließlich lokal in deinem Browser</b> gespeichert (nie im Repository, nie auf der öffentlich gehosteten Seite). Beim Klick auf \"Für alle abspielen\" wird sie direkt per WebRTC an die aktuell verbundenen Spieler übertragen, genau wie eure Würfe und HP-Updates auch - es findet keine Veröffentlichung auf irgendeiner Plattform statt.</p><p><i>Hinweis: Die Datei bleibt auf diesem Gerät gespeichert, bis du sie über den Papierkorb-Button wieder entfernst. Bei einem Wechsel des Browsers/Geräts musst du sie erneut hochladen.</i></p>"
,

    general: "<h3><i class='fa-solid fa-circle-info'></i> Willkommen beim How to be a Hero - Tool</h3>" +
             "<p>Dieser interaktive Charakterbogen nimmt dir die Rechenarbeit am Pen&Paper-Tisch ab und bietet ein nahtloses Multiplayer-Erlebnis.</p>" +
             "<h4>Top Features:</h4>" +
             "<ul>" +
             "<li><b>1-Klick-Würfeln:</b> Klicke einfach auf deine Basis- oder Skill-Werte. Krits und Patzer (10%) werden automatisch erkannt!</li>" +
             "<li><b>Multiplayer (Live-Sync):</b> Der Spielleiter (GM) generiert einen Code, Spieler treten bei. Der GM sieht alle Würfe, Lebenspunkte und Inventar-Updates sofort auf seinem Bildschirm (GM Dashboard).</li>" +
             "<li><b>Integriertes Soundboard:</b> Der GM kann live Sounds & Ambient-Tracks für alle Spieler abspielen, mixen und faden.</li>" +
             "<li><b>Vibe-Themes:</b> Wähle dein Lieblings-Theme (Cyberpunk, Steampunk, Mafia...). Der GM kann als Host das Theme sogar für alle Spieler synchron erzwingen!</li>" +
             "<li><b>Drag & Drop Notizen:</b> Ziehe Einträge aus dem Logbuch oder deine gewürfelten Ergebnisse einfach mit der Maus rüber in dein Notizfeld.</li>" +
             "<li><b>Discord-Integration:</b> Verbinde einen Webhook, um alle Würfe direkt in euren Discord-Channel zu posten.</li>" +
             "</ul>" +
             "<p><i>Lokaler Speicher: Deine Eingaben werden live im Browser gespeichert. Dennoch solltest du vor/nach einer Session über 'Speichern (JSON)' ein Backup deiner Charakterdaten herunterladen!</i></p>"
};
