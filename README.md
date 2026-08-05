<div align="center">
  <img src="https://howtobeahero.de/skins/wiki.png" alt="How to be a Hero Logo" width="200" />
  <h1>🎲 How to be a Hero - Digital Character Sheet 🎲</h1>

  <p>
    <strong>A highly customizable, responsive, and beautiful digital character sheet for the "How to be a Hero" Pen & Paper roleplaying system.</strong><br>
    <em>Von der Community, für die Community gebaut!</em>
  </p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![HTBAH Rules](https://img.shields.io/badge/Rules-CC%20BY--NC--SA%204.0-blue)](https://howtobeahero.de)
  [![Live Demo](https://img.shields.io/badge/Demo-Live%20Now-success?style=for-the-badge)](https://dondavis-vibe.github.io/how-to-be-a-hero-character-sheet/)
</div>

<hr />

## 🚀 Live Demo
Spiele sofort los und erstelle deinen Charakter direkt im Browser:
👉 **[Hier geht's zur Live-Demo](https://dondavis-vibe.github.io/how-to-be-a-hero-character-sheet/)**

![App Preview](assets/preview.png)

## 📖 Über dieses Tool
Dieses Projekt wurde ins Leben gerufen, um Spielern von **How to be a Hero** eine moderne, digitale Alternative zu klassischen Excel-Tabellen und statischen PDFs zu bieten. 
Es vereint eine fehlerfreie Automatisierung (Berechnung von Basiswerten) mit einem absolut immersiven Erlebnis durch interaktive Themes, Sound-Effekte und Partikel-Animationen. Das Tool läuft zu 100% lokal in deinem Browser – es gibt keine Accounts, keine Datenbanken und deine Daten gehören nur dir!

## ✨ Core Features

### 🛠️ Charakter-Verwaltung & Automatisierung
- **Offizielle Regelwerks-Kalkulation:** Basiswerte (Handeln, Wissen, Soziales) werden **automatisch berechnet** (Summe / 10, kaufmännisch gerundet).
- **GBP-Tracking:** Maximale Geistesblitzpunkte (GBP) werden regelkonform abgeleitet. Ein interaktives Widget in der Werkzeugleiste hilft beim Verbrauchen und Tracken.
- **Dynamische Status-Effekte:** Lege eigene Status-Effekte an (z.B. "Wahnsinn", "Verstrahlt"), weise ihnen Werte zu und klassifiziere sie als Malus (Rot), Bonus (Grün) oder Neutral (Grau). 
- **Notizen & Details:** Ein modernes, einklappbares Notizen-System bietet perfekten Platz für Lore, Quests oder Geheimnisse.
- **Profilbild:** Lade ein Bild oder sogar ein GIF als Avatar für deinen Helden hoch!

### 🎲 Smartes Würfel- & Log-System
- **1-Klick Proben:** Klicke einfach auf das `=` neben einem Skill, um sofort darauf zu würfeln.
- **Automatisches Log:** Jeder Wurf (Erfolg, Fehlschlag) wird live ausgewertet und im Log vermerkt.
- **Kritische Effekte:** Bei einer absoluten 1 (Kritischer Erfolg) regnet es Konfetti. Bei einer glatten 100 (Patzer) wackelt der Bildschirm und Totenköpfe (☠️) fallen von der Decke!
- **Waffen-Schaden:** Klicke im Inventar auf das Würfel-Icon neben dem Waffenschaden (z.B. `1W6+2`), um diesen sofort automatisiert auszuwürfeln.
- **Custom Dice:** Ein eingebauter Würfel-Generator für alle denkbaren Kombinationen (z.B. `2w10`, `3d8`).

### 🎒 Interaktives Inventar
- **Kachel-Design:** Modernes Grid-Design für Gegenstände und Waffen.
- **Drag & Drop:** Sortiere dein komplettes Equipment einfach per Drag & Drop!
- **Aufklappbare Beschreibungen:** Jedes Item und jede Waffe hat einklappbare Details, damit dein Inventar übersichtlich bleibt.
- **Sicherheits-Check:** Ein Lösch-Schutz verhindert, dass du aus Versehen Items, Waffen, Skills oder Status-Effekte löschst.

## 🎨 Epische Themes & Animationen (Highlight)
Warum sollte ein Charakterbogen langweilig aussehen? Wähle aus 8 völlig unterschiedlichen, animierten Themes, die das komplette Interface (Hintergründe, Farben, UI-Icons, Layout) verändern! Alle Animationen lassen sich mit einem Klick auf den Zauberstab (🪄) oben rechts an- und ausschalten.

- ⏳ **Zeitreise (Standard)** - Wabernde Zeitrisse.
- ⚙️ **Steampunk** - Langsam rotierende, schwebende Zahnräder im Hintergrund.
- ☢️ **Apokalypse** - Leuchtend grüne Strahlungs-Asche weht quer über den Bildschirm.
- 🦾 **Cyberpunk** - Vertikaler digitaler Matrix-Regen im Neon-Look.
- 🕵️‍♂️ **1920s Mafia** - Prasselnder Regen und aufsteigender Zigarrenrauch im Film Noir-Stil.
- 🐙 **Lovecraft (Cthulhu)** - Grüner Eldritch-Nebel, beobachtende Augen und seltene "Sanity Twitches" (Bildschirmverzerrungen).
- 🏰 **Royal Magic** - Schwebende, leuchtende Magie-Partikel in Gold und Violett, wie verzauberte Glühwürmchen.
- 🚀 **Deep Space** - Funkelnde Sterne im Hintergrund und blitzschnelle, leuchtend blaue Sternschnuppen.

## 🚀 Quick Start / Nutzung

1. **Öffnen:** Besuche die **[Live Demo](https://dondavis-vibe.github.io/how-to-be-a-hero-character-sheet/)**.
2. **Befüllen:** Trage Name, Beruf und deine Skills ein. Die Punkteverteilung wird oben in Echtzeit (z.B. `400 / 400`) mitgetrackt.
3. **Spielen:** Wähle dein Lieblings-Theme und würfle direkt aus dem Bogen heraus.
4. **Speichern:** Klicke oben rechts auf "Speichern (JSON)".
5. **Laden:** Beim nächsten Spiel klickst du auf "Laden (JSON)" und wählst deine Datei wieder aus. Alles ist sofort wieder da!

*Tipp:* Lade dir den Beispiel-Charakter `test_character.json` (im `assets/` Ordner) in die App, um alle Features (Waffen, Themes, Status) sofort live in Aktion zu sehen!

## 💻 Für Entwickler & Contribution

Da dieses Tool komplett clientseitig (nur HTML, CSS und pures JavaScript) gebaut ist, kannst du es dir extrem einfach lokal anpassen:
```bash
# Repo klonen
git clone https://github.com/DonDavis-vibe/how-to-be-a-hero-character-sheet.git

# In den Ordner wechseln und einfach die index.html in deinem Browser öffnen!
```

👉 **Willst du die JSON-Dateien auslesen oder für deine eigene App generieren?** Schau dir die [JSON Datenstruktur & Export Regeln (DATA_FORMAT.md)](DATA_FORMAT.md) an!

## 📜 Lizenz

- **Code:** Der Quellcode dieses Tools ist unter der [MIT License](LICENSE) veröffentlicht.
- **Regelwerk:** Das Pen & Paper Regelsystem "How to be a Hero" stammt von den *Rocket Beans* und der großartigen Community und steht unter der **CC BY-NC-SA 4.0** Lizenz. Erfahre mehr auf dem offiziellen Wiki: [howtobeahero.de](https://howtobeahero.de/)
