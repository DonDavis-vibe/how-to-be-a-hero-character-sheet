<div align="center">
  <img src="https://howtobeahero.de/skins/wiki.png" alt="How to be a Hero Logo" width="200" />
  <h1>🎲 How to be a Hero - Digital Character Sheet 🎲</h1>

  <p>
    <strong>Ein interaktiver, regelkonformer und animierter Charakterbogen für das "How to be a Hero" Pen & Paper Rollenspielsystem.</strong><br>
    <em>Ein Community-Projekt für die fantastische Rocket Beans und HTBAH Community! ❤️</em>
  </p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![HTBAH Rules](https://img.shields.io/badge/Rules-CC%20BY--NC--SA%204.0-blue)](https://howtobeahero.de)
  [![Live Demo](https://img.shields.io/badge/Demo-Live%20Now-success?style=for-the-badge)](https://dondavis-vibe.github.io/how-to-be-a-hero-character-sheet/)
</div>

<hr />

## 📖 Projektübersicht
Moin Moin an alle Bohnen und Pen & Paper Fans! 🚀

Dieses Projekt ist aus reiner Leidenschaft für das *How to be a Hero* Regelwerk entstanden. Das Ziel war es, eine moderne, digitale Alternative zu statischen PDFs oder reinen Excel-Tabellen zu schaffen, die nicht nur rechnet, sondern auch beim Spielen richtig Spaß macht und für Immersion sorgt. 
Es ist zu 100% lokal (alles bleibt in deinem Browser, keine Accounts nötig) und absolut Open-Source. Fühlt euch frei, es für eure Runden zu nutzen, zu forken und zu erweitern!

## 🚀 Live Demo
👉 **[Hier geht's direkt zur App (Live-Demo)](https://dondavis-vibe.github.io/how-to-be-a-hero-character-sheet/)**

![App Preview](assets/preview.png)

**Kurzanleitung:**
1. Trage deine Werte ein, das Tool übernimmt alle Hintergrundberechnungen.
2. Wenn du aufhören möchtest, speichere deinen Charakter oben rechts als `.json`-Datei lokal auf deinem Rechner.
3. Beim nächsten Mal lädst du diese `.json` einfach wieder ein und bist sofort startklar!

## ✨ Core Features (Regelkonform)
Wir haben großen Wert darauf gelegt, die Mechaniken so exakt wie möglich nach dem offiziellen Regelwerk abzubilden:
- **Vollautomatisierung:** Basiswerte (Handeln, Wissen, Soziales), Geistesblitzpunkte (GBP) und Skill-Boni werden automatisch kaufmännisch gerundet und verrechnet.
- **1-Klick Proben & Initiative:** Klicke direkt auf deine Skills, Basiswerte (Handeln, Wissen, Soziales) oder den **Initiative-Button** (`1W10 + Handeln`), um blitzschnell zu würfeln.
- **Dynamische Krits:** Kritische Erfolge (die ersten 10% des Skillwerts) und Patzer (die oberen 10%) werden dynamisch anhand deines genauen Werts berechnet (inkl. Konfetti & Sounds!).
- **HP & Status:** Modernes Drag & Drop Inventar, flexibel anpassbare Status-Effekte und eine dramatische **visuelle HP-Warnung**, sobald dein Charakter auf ≤ 10 Lebenspunkte fällt.
- **Smartes Würfel-Tool & SL-Boni:** Jeder Wurf wird dokumentiert. Trage im Würfel-Tool schnell einen **Spielleiter-Bonus/Malus** ein, der völlig automatisch in deinen nächsten Wurf (inkl. Krit-Berechnung) eingerechnet wird! Für Spezielles gibt es den Custom-Dice Roller (z.B. `3w8`).
- **Aktions-Logbuch:** Ein eigenes, aufklappbares Logbuch dokumentiert automatisch chronologisch alle Änderungen an HP, Währung, Inventar, Waffen, Status-Effekten und Geistesblitzen. Nie wieder vergessen, ob man den Trank jetzt benutzt hat oder nicht!
- **Geistesblitze (GBP):** Ein dedizierter Button lässt dich deine verdienten Punkte taktisch einsetzen und trackt sie mit.

## 🎨 13 Epische Themes
Warum sollte ein Bogen wie ein Steuerformular aussehen? Wechsle das Design deines Charakterbogens passend zur Kampagne. Alle Themes verändern das Layout, die Farben, die Icons und bringen coole CSS/JS-Animationen mit (welche man für schwächere Geräte auch per Klick auf den 🪄 ausschalten kann):

* ⏳ **Zeitreise (Standard)** - Wabernde Risse im Raum-Zeit-Kontinuum.
* ⚙️ **Steampunk** - Langsam drehende, schwebende Zahnräder.
* ☢️ **Apokalypse** - Leuchtend grüne Strahlungsasche weht über den Screen.
* 💾 **Cyberpunk** - Vertikaler digitaler Neon-Matrix-Regen.
* 🕵️‍♂️ **1920s Mafia** - Prasselnder Regen und mysteriöser Zigarrenrauch.
* 🐙 **Lovecraft (Cthulhu)** - Eldritch-Nebel, wachende Augen und "Sanity Twitches".
* 🪄 **Royal Magic** - Schwebende, leuchtende Magie-Partikel.
* 🌌 **Deep Space** - Funkelnde Sterne und schnelle Sternschnuppen.
* 🏜️ **Wilder Westen** - Trockene Wüste mit rollendem Tumbleweed.
* 🏴‍☠️ **Piraten** - Sanft rollende Ozeanwellen und riesige Kraken-Tentakel.
* 🦸‍♂️ **Superhelden** - Knallige Comic-Farben und dynamische Halftone-Schatten.
* 🛡️ **Mittelalter** - Aufsteigende Funken und glühende Asche am Lagerfeuer.
* 💎 **Ultracore** - Schwebende Magitek-Energiekristalle aus dem Kern.

## 🤝 Kompatible Tools & Integrationen
Dieses Charakterbogen-Tool ist voll kompatibel mit dem **[PnPMaster](https://github.com/Rec0iL/PnPMaster)** – einem umfangreichen Spielleiter-Tool (GM Tool), entwickelt von **[@Rec0iL](https://github.com/Rec0iL)**. 
Du kannst deine hier erstellten Charaktere (via `.json` Export) direkt in PnPMaster einlesen, als Spielleiter zentral verwalten und bei Bedarf jederzeit wieder für dieses Charakter-Tool exportieren!

## 💻 Für Entwickler & Contribution
Da dieses Tool komplett clientseitig (nur HTML, CSS und pures JavaScript) gebaut ist, kannst du es dir extrem einfach lokal anpassen oder erweitern. Kein npm, kein webpack, keine Node-Abhängigkeiten!
```bash
# Repo klonen
git clone https://github.com/DonDavis-vibe/how-to-be-a-hero-character-sheet.git

# Einfach in den Ordner wechseln und die index.html im Browser öffnen!
```
Für Infos zur internen Datenstruktur: [DATA_FORMAT.md](DATA_FORMAT.md).

## 📜 Lizenzen
- **Code:** Der Quellcode dieses Tools steht unter der [MIT License](LICENSE).
- **Regelwerk:** Das P&P Regelsystem "How to be a Hero" der *Rocket Beans* Community steht unter der **CC BY-NC-SA 4.0** Lizenz. (Siehe [howtobeahero.de](https://howtobeahero.de/))
