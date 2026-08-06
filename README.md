<div align="center">
  <img src="https://howtobeahero.de/skins/wiki.png" alt="How to be a Hero Logo" width="200" />
  <h1>🎲 HTBAH - Digital Character Sheet 🎲</h1>

  <p>
    <strong>Dein interaktiver, regelkonformer und animierter Charakterbogen für "How to be a Hero".</strong><br>
    <em>Läuft 100% lokal im Browser. Ohne Account. Ohne Datenbank.</em>
  </p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![HTBAH Rules](https://img.shields.io/badge/Rules-CC%20BY--NC--SA%204.0-blue)](https://howtobeahero.de)
  [![Live Demo](https://img.shields.io/badge/Demo-Live%20Now-success?style=for-the-badge)](https://dondavis-vibe.github.io/how-to-be-a-hero-character-sheet/)
</div>

<hr />

## 🚀 Live Demo & Start
👉 **[Spiele direkt los!](https://dondavis-vibe.github.io/how-to-be-a-hero-character-sheet/)**

1. Eintragen & Spielen.
2. Oben rechts als `.json` speichern.
3. Beim nächsten Mal wieder laden!

*(Tipp: Nutze unsere `test_character.json` aus dem Repo zum Ausprobieren aller Features.)*

## ✨ Core Features (Regelkonform)
- **Vollautomatisierung:** Basiswerte (durch 10), Geistesblitzpunkte (GBP) und Skill-Boni werden automatisch kaufmännisch gerundet und verrechnet.
- **1-Klick Proben & Initiative:** Würfle Skills, Waffen oder deine **Initiative** (`1W10 + Handeln`) direkt per Klick aus dem Bogen.
- **Dynamische Krits:** Kritische Erfolge (die ersten 10% des Skillwerts) und Patzer (die oberen 10%) werden **exakt** nach den offiziellen HTBAH-Regeln dynamisch berechnet! (Mit Konfetti & Audio).
- **HP & Status:** Modernes Inventar-System (Drag & Drop), Custom-Status-Effekte und eine dramatische **visuelle HP-Warnung**, wenn du ≤ 10 Lebenspunkte (Bewusstlosigkeit) fällst.
- **Smartes Würfel-Log:** Speichert alle Würfe live mit. Integrierter "Custom Dice" Roller (`xWy`).
- **Geistesblitze:** Nutze GBP über einen simplen Button (verrechnet sich sofort & loggt mit).

## 🎨 10 Epische Themes
Gestalte deinen Bogen passend zu deinem Abenteuer. Voll animiert mit CSS & JS (jederzeit ausschaltbar 🪄):
* ⏳ **Zeitreise** (Wabernde Risse) | ⚙️ **Steampunk** (Zahnräder)
* ☢️ **Apokalypse** (Grüne Asche) | 🦾 **Cyberpunk** (Neon-Matrix)
* 🕵️‍♂️ **1920s Mafia** (Regen & Rauch) | 🐙 **Lovecraft** (Nebel & Sanity Twitches)
* 🏰 **Magic** (Leuchtpartikel) | 🚀 **Deep Space** (Sternschnuppen)
* 🤠 **Wild West** (Tumbleweed) | 🏴‍☠️ **Piraten** (Meereswellen & Kraken)

## 💻 Für Entwickler
Das Tool ist zu 100% Vanilla (HTML, CSS, JS). Keine Frameworks, kein Build-Step!
```bash
git clone https://github.com/DonDavis-vibe/how-to-be-a-hero-character-sheet.git
# Einfach die index.html in deinem Browser öffnen!
```
Siehe auch: [JSON Datenstruktur](DATA_FORMAT.md).

## 📜 Lizenzen
- **Code:** [MIT License](LICENSE)
- **HTBAH-Regelwerk:** **CC BY-NC-SA 4.0** (Siehe [howtobeahero.de](https://howtobeahero.de/))
