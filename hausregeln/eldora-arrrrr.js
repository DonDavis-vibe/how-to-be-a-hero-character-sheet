// Regelpaket "Eldara – Version Arrrrr" - GENERIERT aus quellen/eldora-arrrrr.roh.json
// durch hausregeln/konvertiere-eldora.py. Nicht von Hand bearbeiten: Änderungen
// in die Rohdatei bzw. ins Skript und neu generieren.
//
// Wird von hausregeln.js bei Bedarf nachgeladen (nicht in index.html eingebunden).
hausregelPaketRegistrieren({
 "id": "eldora-arrrrr",
 "name": "Eldara – Version Arrrrr",
 "version": "2026-05-18",
 "system": "How to be a hero - Eldora Version Arrrrr",
 "beschreibung": "Piraten-Hausregeln einer HTBAH-Runde: feste Talentliste, progressive Talentkosten, Rang- und Skillpunkte sowie ein Talentbaum mit drei Hauptbäumen und einem Wesen je Charakter.",
 "waehrung": "Tchambas",
 "lebenspunkte": 100,
 "talente": {
  "handeln": [
   {
    "id": "agilitaet",
    "name": "Agilität",
    "beschreibung": "Test"
   },
   {
    "id": "athletik",
    "name": "Athletik",
    "beschreibung": "Klettern, Rennen, Springen"
   },
   {
    "id": "angeln",
    "name": "Angeln",
    "beschreibung": "1W4 Rationen aus See, Fluss oder Lagune"
   },
   {
    "id": "entern",
    "name": "Entern",
    "beschreibung": "Treffer: Startposition auf dem feindlichen Deck frei wählen. Kritischer Treffer: Zusätzlicher Angriff vor Kampfbeginn!"
   },
   {
    "id": "fernkampf",
    "name": "Fernkampf",
    "beschreibung": "Bogen, Armbrust, Pistolen, Wurfwaffen, Werfen und Zielen Alle Distanzangriffe samt Zielen, Werfen, Wind/Entfernung einschätzen. Beeinflusst Treffer, Präzision und besondere Manöver (z. B. Gliedmaßen, Seile, Lampen abschießen)."
   },
   {
    "id": "handwerk",
    "name": "Handwerk",
    "beschreibung": "Umgang mit Werkzeugen"
   },
   {
    "id": "heimlichkeit",
    "name": "Heimlichkeit",
    "beschreibung": "Schleichen, stehlen, verkleiden"
   },
   {
    "id": "zaehigkeit",
    "name": "Zähigkeit",
    "beschreibung": "Gift, Essen, Flüche widerstehen"
   },
   {
    "id": "kochen",
    "name": "Kochen",
    "beschreibung": "Kochen - Spezial-Aktion",
    "tabelle": "table_kochen"
   },
   {
    "id": "nahkampf",
    "name": "Nahkampf",
    "beschreibung": "Faustkampf, Schwertkampf, Hieb- & Stichwaffen"
   },
   {
    "id": "reiten",
    "name": "Reiten",
    "beschreibung": "Sitz, Führung, Manöver"
   },
   {
    "id": "schiffe-steuern",
    "name": "Schiffe steuern",
    "beschreibung": "Ruder, Segel, Crewführung im Manöver"
   },
   {
    "id": "schloesser-knacken",
    "name": "Schlösser knacken",
    "beschreibung": "Dietriche, Mechaniken, Fingergefühl"
   },
   {
    "id": "schwimmen",
    "name": "Schwimmen",
    "beschreibung": "Schwimmen, Tauchen"
   },
   {
    "id": "staerke",
    "name": "Stärke",
    "beschreibung": "Kraft, Heben, Zerbrechen"
   },
   {
    "id": "wahrnehmung",
    "name": "Wahrnehmung",
    "beschreibung": "Sehen, hören, Spüren von Gefahr"
   }
  ],
  "wissen": [
   {
    "id": "chemie",
    "name": "Chemie",
    "beschreibung": "Reaktionen, Pulver, Mischungen"
   },
   {
    "id": "gassenwissen",
    "name": "Gassenwissen",
    "beschreibung": "Gerüchte, dubiose Kontakte, Informationen"
   },
   {
    "id": "heraldik",
    "name": "Heraldik",
    "beschreibung": "Hofprotokoll, edle Häuser"
   },
   {
    "id": "lesen-schreiben",
    "name": "Lesen, Schreiben",
    "beschreibung": "ab 20 Grundfertigkeit, 30 Muttersprache +1, 60 Muttersprache +2, 90 Muttersprache +3, 95 Muttersprache +4, 99 Muttersprache +5"
   },
   {
    "id": "medizin",
    "name": "Medizin",
    "beschreibung": "Schulmedizin, Behandlung, Operationen, Wunden versorgen, Blutungen stillen, Schienen, Salben, Amputationen.",
    "tabelle": "table_medizin"
   },
   {
    "id": "naturkunde",
    "name": "Naturkunde",
    "beschreibung": "Giftpflanzen, Heilkräuter, Fährten, Tierverhalten - auf dem Papier und im Kopf."
   },
   {
    "id": "nautik",
    "name": "Nautik",
    "beschreibung": "Karten lesen, Strecken berechnen, Position bestimmen, Störungen, Winde, Routenplanung, Tiefen."
   },
   {
    "id": "ueberleben",
    "name": "Überleben",
    "beschreibung": "Shelterbau, Nahrung, Feuerlager, Fallen, essbare Pflanzen, Feuer bei Regen, macht unabhängig von Häfen"
   },
   {
    "id": "technik",
    "name": "Technik",
    "beschreibung": "Maschinen, Apperate, Flaschenzüge, Zahnräder, Federn, einfache Mechaniken, komplexe Basteleien"
   },
   {
    "id": "tiere-zaehmen",
    "name": "Tiere zähmen",
    "beschreibung": "Beruhigen, dressieren, vertrauen. Vom Lasttier bis zum Raubvogel: Erziehung, Pflege, Kommandos, Handzeichen"
   },
   {
    "id": "vodoo",
    "name": "Vodoo",
    "beschreibung": "Rituale, Zauber der alten Wege: Schutzkreise, Ahnenrufe, Flüche, Puppen, Masken, Grundlage für magische Spezialmanöver"
   }
  ],
  "soziales": [
   {
    "id": "auftritt",
    "name": "Auftritt",
    "beschreibung": "Präsenz, Haltung, Wirkung"
   },
   {
    "id": "beruhigen",
    "name": "Beruhigen",
    "beschreibung": "Eskalation verhindern, Ruhe finden, Hitze kühlen, Angst lösen, Stimmen dämpfen, Ein sanfter Blick, ein ruhiges Wort, eine Geste des Vertrauens"
   },
   {
    "id": "verhandeln",
    "name": "Verhandeln",
    "beschreibung": "Friedensbrücken, Waffenstillstände, Bedingungen. Das leise Ende einer aluten Fehde"
   },
   {
    "id": "einschuechtern",
    "name": "Einschüchtern",
    "beschreibung": "Angst als Werkzeug. Drohgebärden, blutige Klingen, ungebrochener Blick. Bei Erfolg: Betroffene in 10m Umkreis erhalten -1 Bewegung für 1W4 Runden"
   },
   {
    "id": "feilschen",
    "name": "Feilschen",
    "beschreibung": "Beim An- und Verkauf das beste Angebot. Preise drücken, Extras rausschlagen, Gebühren wegreden, oder die andere Seite zum Zahlen bringen."
   },
   {
    "id": "flirten",
    "name": "Flirten",
    "beschreibung": "Charme und Verführung."
   },
   {
    "id": "willenskraft",
    "name": "Willenskraft",
    "beschreibung": "Standhaftigkeit, innere Stärke. Widerstand gegen Einschüchtern, Überreden, Motivieren, Wesen/Monsterinstinkte und gegen übernatürliche Anblicke"
   },
   {
    "id": "luegen",
    "name": "Lügen",
    "beschreibung": "Täuschung, Ablenkung."
   },
   {
    "id": "menschenkenntnis",
    "name": "Menschenkenntnis",
    "beschreibung": "Motive erkennen oder einschätzen"
   },
   {
    "id": "motivieren",
    "name": "Motivieren",
    "beschreibung": "Bei Erfolg: Verbündete 10m Umkreis erhalten Boni. Schlachtrufe, Gesänge, Versprechen"
   },
   {
    "id": "musizieren",
    "name": "Musizieren",
    "beschreibung": "Auftrittsprobe",
    "tabelle": "table_musician"
   },
   {
    "id": "ueberreden",
    "name": "Überreden",
    "beschreibung": "Erfolg: Du hältst jemanden von einer Aktion ab, oder lenkst sie auf eine andere Bahn."
   },
   {
    "id": "zechen",
    "name": "Zechen",
    "beschreibung": "Saufen, große Mengen saufen!",
    "tabelle": "table_saufen"
   }
  ]
 },
 "punkte": {
  "maxTalentpunkte": 500,
  "kostenStaffel": [
   {
    "bis": 30,
    "kosten": 1
   },
   {
    "bis": 60,
    "kosten": 2
   },
   {
    "bis": 90,
    "kosten": 4
   },
   {
    "bis": 99,
    "kosten": 10
   }
  ],
  "skillpunktSchwellen": [
   1,
   10,
   20,
   30,
   40,
   50,
   60,
   70,
   80,
   90,
   91,
   92,
   93,
   94,
   95,
   96,
   97,
   98,
   99
  ]
 },
 "talentbaum": {
  "anzahlHauptbaeume": 3,
  "anzahlWesen": 1,
  "maxLevel": 3,
  "kosten": {
   "erstesLevel": "rangpunkt",
   "weiteresLevel": "skillpunkt"
  },
  "freischaltung": {
   "modus": "vorRang",
   "benoetigt": 2
  },
  "hauptbaeume": [
   "Nahkampf Klingen",
   "Nahkampf Fäuste",
   "Stärke",
   "Fernkampf",
   "Agilität",
   "Voodoo Ritual Klinge",
   "Voodoo Fluchspucker",
   "Einschüchtern",
   "Heimlichkeit",
   "Medizin",
   "Motivieren"
  ],
  "baumTalent": {
   "Nahkampf Klingen": "Nahkampf",
   "Nahkampf Fäuste": "Nahkampf",
   "Stärke": "Stärke",
   "Fernkampf": "Fernkampf",
   "Agilität": "Agilität",
   "Voodoo Ritual Klinge": "Vodoo",
   "Voodoo Fluchspucker": "Vodoo",
   "Einschüchtern": "Einschüchtern",
   "Heimlichkeit": "Heimlichkeit",
   "Medizin": "Medizin",
   "Motivieren": "Motivieren"
  },
  "wesen": [
   "Arkaner Freibeuter",
   "Dämonenjäger",
   "Fluchbrecher",
   "Hitzeklinge",
   "Kultist",
   "Pestbringer",
   "Rum-Prediger",
   "Seher der Tiefsee",
   "Sturmwüter",
   "Tiefseepirat",
   "Wellenringer"
  ],
  "weitereAeste": [
   "Abgrund Jäger",
   "Blutmagier",
   "Brandstifter der See",
   "Divinus Chimäre",
   "Echsenmensch",
   "Eismeister der See",
   "Geist",
   "Guhl",
   "Magie",
   "OrcraLord",
   "Schattenskellet",
   "Seelenrufer",
   "Sirene",
   "Steintroll",
   "Sturmrufer",
   "Traumaturge",
   "Wertitan",
   "Willenskraft",
   "Zombie"
  ],
  "skills": [
   {
    "name": "Bodyslam",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden: Nahkampf + 2/3/4w10 an 2/2/3 Zielen in einer Reihe",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "Nahkampf",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "Nahkampf",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "Nahkampf",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Agilität",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent: +1/2/3m Bewegung",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "movement",
      "wert": 1
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "movement",
      "wert": 2
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "movement",
      "wert": 3
     }
    ]
   },
   {
    "name": "Fliegender Bulle",
    "ast": "Agilität",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "+10/20/30% Willenskraft, immun gegen Schlaf, +5/10/15 auf Willenskraft-Wurf",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "+10% Willenskraft, immun gegen Schlaf, +5 auf WW"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "+20% Willenskraft, immun gegen Schlaf, +10 auf WW"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "+30% Willenskraft, immun gegen Schlaf, +15 auf WW"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung: 2/3/4W10 an 1 Ziel zu Beginn deiner nächsten 2/3/4 Runden",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "1 Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "1 Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Ich bin dann mal weg",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Effekt: Du wirst für 1/2/3 Runden Unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Selbst",
      "effekt": "Wirst für 1 Runde Unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab"
     },
     {
      "level": 2,
      "reichweite": "Selbst",
      "effekt": "Wirst für 2 Runden Unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab"
     },
     {
      "level": 3,
      "reichweite": "Selbst",
      "effekt": "Wirst für 3 Runden Unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab"
     }
    ]
   },
   {
    "name": "Ablenken",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Effekt: Gegner im Umkreis laufen zu 30/60/90% für 1/1/2 Runden auf dich zu und greifen an. Gewährt +10/15/20 magische Rüstung für diese Zeit",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3m Umkreis",
      "effekt": "Zu 30% laufen Gegner für 1 Runde auf dich zu und greifen an. Du erhältst +10 magische Rüstung (RÜ)"
     },
     {
      "level": 2,
      "reichweite": "7m Umkreis",
      "effekt": "Zu 60% laufen Gegner für 1 Runde auf dich zu und greifen an. Du erhältst +15 magische Rüstung (RÜ)"
     },
     {
      "level": 3,
      "reichweite": "10m Umkreis",
      "effekt": "Zu 90% laufen Gegner für 2 Runden auf dich zu und greifen an. Du erhältst +20 magische Rüstung (RÜ)"
     }
    ]
   },
   {
    "name": "Letzte Chance",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilung: +3/4/5W10 an dich selbst + 10 magische Rüstung (RÜ), wenn deine Lebenspunkte <= 10 sind.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Selbst (2 SE)",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung: LP <= 10. Heilt 3W10 und gewährt +10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "Selbst (2 SE)",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung: LP <= 10. Heilt 4W10 und gewährt +10 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "Selbst (2 SE)",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung: LP <= 10. Heilt 5W10 und gewährt +10 magische Rüstung"
     }
    ]
   },
   {
    "name": "Ruckzuckhieb",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden: Physisch + 3/4/5W10. Du springst zum Gegner (2/4/6m), fügst Schaden zu und kannst zurückspringen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2m",
      "schaden": "3W10",
      "schadenArt": "Physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 2,
      "reichweite": "4m",
      "schaden": "4W10",
      "schadenArt": "Physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 3,
      "reichweite": "6m",
      "schaden": "5W10",
      "schadenArt": "Physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     }
    ]
   },
   {
    "name": "Wirbeltritt",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden: Physisch + 3/4/5W10 an 2/3/4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei misslungenem -15 SW werden Ziele 1W4m weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf (Halbkreis)",
      "schaden": "3W10",
      "schadenArt": "Physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem -15 SW: 1W4m Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf (Halbkreis)",
      "schaden": "4W10",
      "schadenArt": "Physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem -15 SW: 1W4m Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf (Halbkreis)",
      "schaden": "5W10",
      "schadenArt": "Physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem -15 SW: 1W4m Stoß"
     }
    ]
   },
   {
    "name": "Blitzangriff",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden: Magisch + 5/6/7W10 an 3/4/5 Gegnern im Laufweg. Gewährt +1 Statusveränderung (ST) und stunnt Ziele zu 20/30/40%.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3m",
      "schaden": "5W10",
      "schadenArt": "Magisch",
      "effekt": "Trifft bis zu 3 Gegner im Laufweg. +1 ST. 20% Stun-Chance"
     },
     {
      "level": 2,
      "reichweite": "6m",
      "schaden": "6W10",
      "schadenArt": "Magisch",
      "effekt": "Trifft bis zu 4 Gegner im Laufweg. +1 ST. 30% Stun-Chance"
     },
     {
      "level": 3,
      "reichweite": "9m",
      "schaden": "7W10",
      "schadenArt": "Magisch",
      "effekt": "Trifft bis zu 5 Gegner im Laufweg. +1 ST. 40% Stun-Chance"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden: Physisch (2/3/4 Nahkampf-Angriffe) auf ein Ziel. Reduziert Rüstung um 10/15/20 rüstungsbrechend (RB).",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampf-Angriffe",
      "schadenArt": "Physisch",
      "effekt": "Nur auf ein Ziel. 10 RB (rüstungsbrechend)"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampf-Angriffe",
      "schadenArt": "Physisch",
      "effekt": "Nur auf ein Ziel. 15 RB (rüstungsbrechend)"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampf-Angriffe",
      "schadenArt": "Physisch",
      "effekt": "Nur auf ein Ziel. 20 RB (rüstungsbrechend)"
     }
    ]
   },
   {
    "name": "Klon",
    "ast": "Magie",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Effekt: Erschafft 1/2/2 Klone für 2/2/3 Runden mit 50/75/100% deiner Lebenspunkte (LP). Klone machen 4/5/6W10 Schaden und können keine Skills nutzen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Ziel (SE)",
      "schaden": "4W10",
      "schadenArt": "Klon-Schaden",
      "effekt": "1 Klon für 2 Runden. Klon hat 50% LP. Kann keine Skills nutzen"
     },
     {
      "level": 2,
      "reichweite": "1 Ziel (SE)",
      "schaden": "5W10",
      "schadenArt": "Klon-Schaden",
      "effekt": "2 Klone für 2 Runden. Klone haben 75% LP. Können keine Skills nutzen"
     },
     {
      "level": 3,
      "reichweite": "1 Ziel (SE)",
      "schaden": "6W10",
      "schadenArt": "Klon-Schaden",
      "effekt": "2 Klone für 3 Runden. Klone haben 100% LP. Können keine Skills nutzen"
     }
    ]
   },
   {
    "name": "Lichtgeschwindigkeit",
    "ast": "Agilität",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Effekt: Du kannst 2/3/4 deiner Fähigkeiten hintereinander einsetzen. Die Stufe der Fähigkeiten entspricht der Stufe von Lichtgeschwindigkeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Selbst",
      "effekt": "Erlaubt das Aneinanderreihen von 2 Fähigkeiten auf Stufe 1"
     },
     {
      "level": 2,
      "reichweite": "Selbst",
      "effekt": "Erlaubt das Aneinanderreihen von 3 Fähigkeiten auf Stufe 2"
     },
     {
      "level": 3,
      "reichweite": "Selbst",
      "effekt": "Erlaubt das Aneinanderreihen von 4 Fähigkeiten auf Stufe 3"
     }
    ]
   },
   {
    "name": "Zweite Dimension",
    "ast": "Willenskraft",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Effekt: Gewährt dauerhaft +10/15/20 magische Rüstung (RÜ).",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Selbst",
      "effekt": "+10 magische Rüstung (RÜ)"
     },
     {
      "level": 2,
      "reichweite": "Selbst",
      "effekt": "+15 magische Rüstung (RÜ)"
     },
     {
      "level": 3,
      "reichweite": "Selbst",
      "effekt": "+20 magische Rüstung (RÜ)"
     }
    ]
   },
   {
    "name": "Blutiger Zorn",
    "ast": "Einschüchtern",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Effekt: Du erhältst für 1/2/3 Runden eine zusätzliche Attacke in Aktion A, erleidest dafür aber sofort 2/1/0 Blutungen (BL).",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Selbst (1 SE)",
      "effekt": "+1 Angriff in Aktion A für 1 Runde. Erhältst sofort 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "Selbst (1 SE)",
      "effekt": "+1 Angriff in Aktion A für 2 Runden. Erhältst sofort 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Selbst (1 SE)",
      "effekt": "+1 Angriff in Aktion A für 3 Runden. Erhältst sofort 0 Blutungen"
     }
    ]
   },
   {
    "name": "Schrecken der Meere",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Effekt: 1/2/3 Gegner fliehen für 1/1/2 Runden nach einem misslungenen Willenskraft-Wurf (WW) mit einem Malus von -5/10/15.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2m",
      "effekt": "1 Gegner flieht für 1 Runde bei misslungenem WW (-5)"
     },
     {
      "level": 2,
      "reichweite": "4m",
      "effekt": "2 Gegner fliehen für 1 Runde bei misslungenem WW (-10)"
     },
     {
      "level": 3,
      "reichweite": "6m",
      "effekt": "3 Gegner fliehen für 2 Runden bei misslungenem WW (-15)"
     }
    ]
   },
   {
    "name": "Wunden aufreißen",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden: Physisch + 2/3/4W10 und +1/2/3 Blutung. Ist eine Extra-Aktion, wenn das Ziel bereits verletzt ist.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "Physisch",
      "effekt": "+1 BL. Gilt als Extra-Aktion, wenn das Ziel verletzt ist"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "Physisch",
      "effekt": "+2 BL. Gilt als Extra-Aktion, wenn das Ziel verletzt ist"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "Physisch",
      "effekt": "+3 BL. Gilt als Extra-Aktion, wenn das Ziel verletzt ist"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden: Physisch + 2/3/4W10 im Nah- oder Fernkampf. Verringert die Bewegungsweite (BW) um 2/3/4m und das Handeln um 5/10/15 für 1/2/3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf / Fernkampf",
      "schaden": "2W10",
      "schadenArt": "Physisch",
      "effekt": "-2m BW und -5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf / Fernkampf",
      "schaden": "3W10",
      "schadenArt": "Physisch",
      "effekt": "-3m BW und -10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf / Fernkampf",
      "schaden": "4W10",
      "schadenArt": "Physisch",
      "effekt": "-4m BW und -15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Ablenken",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Effekt: Gegner im Umkreis laufen zu 30/60/90% für 1/1/2 Runden auf dich zu und greifen an. Gewährt +10/15/20 magische Rüstung (RÜ) für diese Zeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3m Umkreis",
      "effekt": "Zu 30% laufen Gegner für 1 Runde auf dich zu und greifen an. Du erhältst +10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7m Umkreis",
      "effekt": "Zu 60% laufen Gegner für 1 Runde auf dich zu und greifen an. Du erhältst +15 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10m Umkreis",
      "effekt": "Zu 90% laufen Gegner für 2 Runden auf dich zu und greifen an. Du erhältst +20 magische Rüstung"
     }
    ]
   },
   {
    "name": "Respektschelle",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden: Physisch + 1/2/3W10 im Nahkampf. Verursacht +1/1/2 Blutung (BL) und das Ziel ist zu 20/40/60% gestunnt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "1W10",
      "schadenArt": "Physisch",
      "effekt": "+1 Blutungen, 20% Stun-Chance"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "Physisch",
      "effekt": "+1 Blutungen, 40% Stun-Chance"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "Physisch",
      "effekt": "+2 Blutungen, 60% Stun-Chance"
     }
    ]
   },
   {
    "name": "Wirbeltritt",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden: Physisch + 3/4/5W10 an 2/3/4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei misslungenem -15 SW werden Ziele 1W4m weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf (Halbkreis)",
      "schaden": "3W10",
      "schadenArt": "Physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem -15 SW: 1W4m Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf (Halbkreis)",
      "schaden": "4W10",
      "schadenArt": "Physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem -15 SW: 1W4m Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf (Halbkreis)",
      "schaden": "5W10",
      "schadenArt": "Physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem -15 SW: 1W4m Stoß"
     }
    ]
   },
   {
    "name": "Spot",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Effekt: Ein Gegner in Reichweite greift für 2/2/3 Runden nur dich an (Aggro). Gegen dieses Ziel erhältst du +10/15/20 Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5m",
      "effekt": "Zwingt Gegner für 2 Runden dich anzugreifen. Du hast +10 Rüstung gegen ihn"
     },
     {
      "level": 2,
      "reichweite": "7m",
      "effekt": "Zwingt Gegner für 2 Runden dich anzugreifen. Du hast +15 Rüstung gegen ihn"
     },
     {
      "level": 3,
      "reichweite": "10m",
      "effekt": "Zwingt Gegner für 3 Runden dich anzugreifen. Du hast +20 Rüstung gegen ihn"
     }
    ]
   },
   {
    "name": "Fluch der Schwächung",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Effekt: Reduziert den physischen Schaden eines Ziels in Reichweite für 1/2/3 Runden um 50%.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2m",
      "effekt": "Ziel verursacht für 1 Runde -50% physischen Schaden"
     },
     {
      "level": 2,
      "reichweite": "4m",
      "effekt": "Ziel verursacht für 2 Runden -50% physischen Schaden"
     },
     {
      "level": 3,
      "reichweite": "6m",
      "effekt": "Ziel verursacht für 3 Runden -50% physischen Schaden"
     }
    ]
   },
   {
    "name": "Schneise",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden: Physisch + 4/5/6W10 mit 10/15/20 rüstungsbrechend (RB). Erfordert eine ganze Runde Aufladezeit, trifft dann alle Gegner in einer 5m langen Linie vor dir.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5m Linie",
      "schaden": "4W10",
      "schadenArt": "Physisch",
      "effekt": "Muss 1 Runde aufladen. Trifft alle Ziele in der Linie. 10 RB"
     },
     {
      "level": 2,
      "reichweite": "5m Linie",
      "schaden": "5W10",
      "schadenArt": "Physisch",
      "effekt": "Muss 1 Runde aufladen. Trifft alle Ziele in der Linie. 15 RB"
     },
     {
      "level": 3,
      "reichweite": "5m Linie",
      "schaden": "6W10",
      "schadenArt": "Physisch",
      "effekt": "Muss 1 Runde aufladen. Trifft alle Ziele in der Linie. 20 RB"
     }
    ]
   },
   {
    "name": "Zweite Lunge",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Effekt: Gewährt +25/50/100 temporäre Lebenspunkte (LP) für 2/3/4 Runden, belegt dich danach aber mit einem -1/1/2 Debuff.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Selbst (1 SE)",
      "effekt": "+25 temporäre LP für 2 Runden. Danach -1 Debuff"
     },
     {
      "level": 2,
      "reichweite": "Selbst (1 SE)",
      "effekt": "+50 temporäre LP für 3 Runden. Danach -1 Debuff"
     },
     {
      "level": 3,
      "reichweite": "Selbst (1 SE)",
      "effekt": "+100 temporäre LP für 4 Runden. Danach -2 Debuff"
     }
    ]
   },
   {
    "name": "Raserei",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden: Bis zu 4/5/6 physische Angriffe mit 5/10/15 rüstungsbrechend (RB). Angriffe gehen weiter bis zum ersten Verfehlen (mit -5 NK pro folgendem Angriff). Danach verfällt der Charakter für 1W4 Runden in tiefen Schlaf. Macht +1W4 Schaden, wenn das Ziel blutet.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 4 Angriffe",
      "schadenArt": "Physisch",
      "effekt": "5 RB. -5 NK pro Folgeantriff. Bei Fehlschlag/Ende: 1W4 Runden Schlaf. +1W4 Schaden gegen blutende Ziele"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 5 Angriffe",
      "schadenArt": "Physisch",
      "effekt": "10 RB. -5 NK pro Folgeantriff. Bei Fehlschlag/Ende: 1W4 Runden Schlaf. +1W4 Schaden gegen blutende Ziele"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 6 Angriffe",
      "schadenArt": "Physisch",
      "effekt": "15 RB. -5 NK pro Folgeantriff. Bei Fehlschlag/Ende: 1W4 Runden Schlaf. +1W4 Schaden gegen blutende Ziele"
     }
    ]
   },
   {
    "name": "Zermalmen",
    "ast": "Einschüchtern",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden: Physisch + 5/6/7W10 im Nahkampf. Ignoriert jegliche Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "Physisch",
      "effekt": "Ignoriert jegliche Rüstung komplett"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "Physisch (Rüstungsbypass)",
      "effekt": "Ignoriert jegliche Rüstung komplett"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "Physisch (Rüstungsbypass)",
      "effekt": "Ignoriert jegliche Rüstung komplett"
     }
    ]
   },
   {
    "name": "Angelegter Schuss",
    "ast": "Fernkampf",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Fernkampf. Gewährt plus 10 Fernkampf und verursacht plus 1 oder 1 oder 2 Blutungen. Du musst zusätzlich deine komplette Bewegung opfern.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "plus 10 Fernkampf und plus 1 Blutung. Bewegung wird komplett geopfert"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 10 Fernkampf und plus 1 Blutung. Bewegung wird komplett geopfert"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 10 Fernkampf und plus 2 Blutungen. Bewegung wird komplett geopfert"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Fernkampf",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Sniper",
    "ast": "Fernkampf",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Der Schaden und die Reichweite deiner Fernkampfangriffe verbessern sich. Reichweite wird mit 1,5 oder 2 oder 3 multipliziert und der Schaden steigt um plus 0 oder 1 oder 2W10.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf Reichweite mal 1,5",
      "schaden": "plus 0W10",
      "schadenArt": "physisch",
      "effekt": "Multipliziert Fernkampf Reichweite mit 1,5"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf Reichweite mal 2",
      "schaden": "plus 1W10",
      "schadenArt": "physisch",
      "effekt": "Multipliziert Fernkampf Reichweite mit 2 und erhöht Fernkampfschaden um 1W10"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf Reichweite mal 3",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Multipliziert Fernkampf Reichweite mit 3 und erhöht Fernkampfschaden um 2W10"
     }
    ]
   },
   {
    "name": "Splitterschuss",
    "ast": "Fernkampf",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Fernkampfangriff verursacht zusätzlich plus 1 oder 1 oder 2 Blutungen für 1 oder 2 oder 2 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen für 2 Runden"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Fernkampf",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 or 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Trugbild",
    "ast": "Fernkampf",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du wirst unsichtbar für 1 oder 1 oder 2 Runden und lässt ein Spiegelbild an deiner Position, das deine Feinde zu 30 oder 60 oder 90 Prozent für eine Runde angreifen. Wenn du angreifst oder ähnliches tust wirst du sichtbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild wird zu 30 Prozent für eine Runde angegriffen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild wird zu 60 Prozent für eine Runde angegriffen"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "2 Runden unsichtbar. Spiegelbild wird zu 90 Prozent für eine Runde angegriffen"
     }
    ]
   },
   {
    "name": "Gekreuzte Revolver",
    "ast": "Fernkampf",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Greife während deiner Aktion A auch mit deiner Off-Hand Knarre an. Dies ist 2 oder 3 oder 4-mal pro Kampf möglich. Der Modifikator beträgt minus 10 oder minus 5 oder 0 Fernkampf und es gibt keine Buffs.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "2-mal pro Kampf in Aktion A nutzbar. Modifikator minus 10 Fernkampf. Keine Buffs"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "3-mal pro Kampf in Aktion A nutzbar. Modifikator minus 5 Fernkampf. Keine Buffs"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "4-mal pro Kampf in Aktion A nutzbar. Modifikator 0 Fernkampf. Keine Buffs"
     }
    ]
   },
   {
    "name": "Schrapnell",
    "ast": "Fernkampf",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schuss auf ein 1 mal 2 oder 1 mal 2 oder 2 mal 2 großes Feld. Verursacht Fernkampfschaden plus 1 oder 2 oder 3 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf auf Feld 1 mal 2 Meter",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft Feld von 1 mal 2 Meter. Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf auf Feld 1 mal 2 Meter",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft Feld von 1 mal 2 Meter. Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf auf Feld 2 mal 2 Meter",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft Feld von 2 mal 2 Meter. Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Wache!",
    "ast": "Fernkampf",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Erlaubt 2 oder 3 oder 4 Gelegenheitsangriffe pro Kampf. Ermöglicht Angriffe auf Gegner, die deine Kampfreichweite betreten, verlassen oder durchqueren.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "2 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "3 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "4 Gelegenheitsangriffe pro Kampf"
     }
    ]
   },
   {
    "name": "Rikoschettenschuss",
    "ast": "Fernkampf",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Dein Fernkampfschuss trifft 1 oder 2 oder 3 zusätzliche Ziele im Umkreis von 2 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 zusätzliches Ziel im Umkreis von 2 Meter"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 zusätzliche Ziele im Umkreis von 2 Meter"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 zusätzliche Ziele im Umkreis von 2 Meter"
     }
    ]
   },
   {
    "name": "Schnellladen",
    "ast": "Fernkampf",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Erlaubt schnelleres Nachladen. Lädt 1 oder 1 oder 2 Munition pro Aktion nach. Genutzte Aktion ist B oder Extra oder Extra Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "Lädt 1 Munition pro B Aktion"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "Lädt 1 Munition pro Extra Aktion"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "Lädt 2 Munition pro Extra Aktion"
     }
    ]
   },
   {
    "name": "Schnellschuss",
    "ast": "Fernkampf",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Feuert 3 oder 4 or 5 Fernkampfangriffe in 1 Aktion A ab. Munition beachten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf",
      "schaden": "3 Fernkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Munition beachten"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf",
      "schaden": "4 Fernkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Munition beachten"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf",
      "schaden": "5 Fernkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Munition beachten"
     }
    ]
   },
   {
    "name": "Bleihagel",
    "ast": "Fernkampf",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden auf einer großen Fläche von 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter auf eine Distanz von 6 oder 9 oder 12 Meter. Verursacht 6 oder 7 oder 8W10 Schaden und ist rüstungsbrechend mit dem Wert 5 oder 10 oder 15.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "6 Meter Distanz auf Feld 2 mal 2 Meter",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "Flächenschaden und 5 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "9 Meter Distanz auf Feld 2 mal 2 Meter",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Flächenschaden und 10 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "12 Meter Distanz auf Feld 3 mal 3 Meter",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Flächenschaden und 15 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Meisterschütze",
    "ast": "Fernkampf",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Deine Fernkampfangriffe machen permanent mehr Schaden. Erhöht den Schaden um plus 2 oder 3 oder 4W10.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Erhöht permanent den Fernkampfschaden"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Erhöht permanent den Fernkampfschaden"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Erhöht permanent den Fernkampfschaden"
     }
    ]
   },
   {
    "name": "Berauben",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 1 oder 2 oder 3W10 im Nahkampf. Hat 5 oder 10 oder 15 rüstungsbrechend. Gewährt plus 2 oder 4 oder 6W10 Gold bei einer Verwundung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "1W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend und plus 2W10 Gold bei Verwundung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend und plus 4W10 Gold bei Verwundung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend und plus 6W10 Gold bei Verwundung"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Heimlichkeit",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Giftmischer",
    "ast": "Heimlichkeit",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Macht Schaden magisch auf ein einzelnes Ziel. Die nächsten 1 oder 2 or 3 Nahkampfangriffe und Fernkampfangriffe verursachen für 1 oder 2 oder 3 Runden Gift mit Giftstufe 1 oder 2 oder 3.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "1 Angriff verursacht Giftstufe 1 für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "2 Angriffe verursachen Giftstufe 2 für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "3 Angriffe verursachen Giftstufe 3 für 3 Runden"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Ich bin dann mal weg",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Du wirst für 1 oder 2 oder 3 Runden unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "Wirst für 1 Runde unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "Wirst für 2 Runden unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "Wirst für 3 Runden unsichtbar. Bricht bei Schaden, Angriff oder Aktion ab"
     }
    ]
   },
   {
    "name": "Trugbild",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du wirst unsichtbar für 1 oder 1 oder 2 Runden und lässt ein Spiegelbild an deiner Position, das deine Feinde zu 30 oder 60 oder 90 Prozent für eine Runde angreifen. Wenn du angreifst oder ähnliches tust wirst du sichtbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild wird zu 30 Prozent für eine Runde angegriffen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild wird zu 60 Prozent für eine Runde angegriffen"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "2 Runden unsichtbar. Spiegelbild wird zu 90 Prozent für eine Runde angegriffen"
     }
    ]
   },
   {
    "name": "Dunkle Rüstung",
    "ast": "Heimlichkeit",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du hast für 1 oder 2 oder 3 Runden lang eine magische Rüstung von plus 10 oder 15 oder 20 auf ein einzelnes Ziel. Du bist um 10 oder 20 oder 30 weniger gut zu erkennen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 1 Runde. plus 10 Rüstung und du bist um 10 weniger gut zu erkennen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 2 Runden. plus 15 Rüstung und du bist um 20 weniger gut zu erkennen"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 3 Runden. plus 20 Rüstung und du bist um 30 weniger gut zu erkennen"
     }
    ]
   },
   {
    "name": "Ablenken",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Gegner im Umkreis laufen zu 30 oder 60 oder 90 Prozent für 1 oder 1 oder 2 Runden auf dich zu und greifen an. Gewährt plus 10 oder 15 oder 20 magische Rüstung für diese Zeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Zu 30 Prozent laufen Gegner für 1 Runde auf dich zu. plus 10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Umkreis",
      "effekt": "Zu 60 Prozent laufen Gegner für 1 Runde auf dich zu. plus 15 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Umkreis",
      "effekt": "Zu 90 Prozent laufen Gegner für 2 Runden auf dich zu. plus 20 magische Rüstung"
     }
    ]
   },
   {
    "name": "Ruckzuckhieb",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10. Du springst auf eine Distanz von 2 oder 4 oder 6 Meter zum Gegner, fügst Schaden zu und kannst dann zurückspringen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     }
    ]
   },
   {
    "name": "Angriff aus dem Dunkeln",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 im Nahkampf oder Fernkampf. Verursacht plus 1 oder 1 oder 2 Blutungen. Nur nutzbar wenn du versteckt bist. Du bleibst zu 25 oder 50 oder 75 Prozent unentdeckt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Du bleibst zu 25 Prozent unentdeckt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Du bleibst zu 50 Prozent unentdeckt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen. Du bleibst zu 75 Prozent unentdeckt"
     }
    ]
   },
   {
    "name": "Meuchelmörder",
    "ast": "Heimlichkeit",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verursacht Giftstufe 2 oder 3 oder 4 für 1 oder 2 oder 3 Runden. Die Giftstufe ist eine Stufe höher, wenn das Ziel blutet.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Giftstufe 2 für 1 Runde. Eine Giftstufe höher wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Giftstufe 3 für 2 Runden. Eine Giftstufe höher wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Giftstufe 4 für 3 Runden. Eine Giftstufe höher wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Schattenschritt",
    "ast": "Heimlichkeit",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Du löst dich in Rauch auf und materialisierst dich wieder auf eine Distanz von 5 oder 10 oder 20 Meter. Du bleibst zu 25 oder 50 oder 75 Prozent heimlich unentdeckt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "Du bleibst zu 25 Prozent heimlich unentdeckt"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "Du bleibst zu 50 Prozent heimlich unentdeckt"
     },
     {
      "level": 3,
      "reichweite": "20 Meter",
      "effekt": "Du bleibst zu 75 Prozent heimlich unentdeckt"
     }
    ]
   },
   {
    "name": "Seelenpakt",
    "ast": "Heimlichkeit",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Kostet sofort 50 Prozent deiner Lebenspunkte auf ein einzelnes Ziel. Deine Fähigkeiten machen für 1 oder 2 oder 3 Runden den doppelten Effekt bei Schaden, Heilung, Blutung, Gift und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Verliere 50 Prozent Lebenspunkte. Doppelter Effekt für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Verliere 50 Prozent Lebenspunkte. Doppelter Effekt für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Verliere 50 Prozent Lebenspunkte. Doppelter Effekt für 3 Runden"
     }
    ]
   },
   {
    "name": "Zweite Dimension",
    "ast": "Heimlichkeit",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Gewährt dauerhaft plus 10 oder 15 oder 20 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 15 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 20 magische Rüstung"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Medizin",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Heilende Hand",
    "ast": "Medizin",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 im Nahkampf. Du heilst einen Verbündeten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Medizin",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Seelenreinigung",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Entfernt alle negativen Statuseffekte wie Giftstufe, Feuermarker und Blutungen bei allen Verbündeten im Umkreis von 1 oder 2 oder 3 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     }
    ]
   },
   {
    "name": "Verarzten",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilt ein einzelnes Ziel im Nahkampf um 3 oder 4 oder 5W10 und entfernt alle Blutungen und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf auf einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Entfernt alle Blutungen und Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf auf einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Entfernt alle Blutungen und Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf auf einzelnes Ziel",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Entfernt alle Blutungen und Feuermarker"
     }
    ]
   },
   {
    "name": "Aura der Rast",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Erschafft für 2 oder 3 oder 4 Runden eine Aura mit einem Umkreis von 2 oder 3 oder 4 Meter. Du heilst jeden Freund um 2 oder 3 oder 4W10, der seine Runde in deiner Aura startet. Ein negativer Statuseffekt seiner Wahl wird um 1 oder 2 oder 3 Stufen schwächer.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 2 Runden. Reduziert einen gewählten Statuseffektstapel um 1"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 3 Runden. Reduziert einen gewählten Statuseffektstapel um 2"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 4 Runden. Reduziert einen gewählten Statuseffektstapel um 3"
     }
    ]
   },
   {
    "name": "Heilendes Wort",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilt 1 oder 2 oder 3 Ziele in einer Reichweite von 3 oder 5 oder 7 Meter um 4 oder 5 oder 6W10.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt 1 Ziel in Reichweite"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Heile bis zu 2 Ziele in Reichweite"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heile bis zu 3 Ziele in Reichweite"
     }
    ]
   },
   {
    "name": "Letzte Chance",
    "ast": "Medizin",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilung von plus 3 oder 4 oder 5W10 an dich selbst und gewährt plus 10 magische Rüstung, wenn deine Lebenspunkte kleiner oder gleich 10 sind.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung Lebenspunkte kleiner gleich 10. Heilt 3W10 und gewährt plus 10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung Lebenspunkte kleiner gleich 10. Heilt 4W10 und gewährt plus 10 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung Lebenspunkte kleiner gleich 10. Heilt 5W10 und gewährt plus 10 magische Rüstung"
     }
    ]
   },
   {
    "name": "Kriegsschrei",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Alle Verbündeten im Umkreis von 1 oder 3 oder 5 Meter erhalten für 1 oder 2 oder 3 Runden plus 5 oder 5 oder 10 magische Rüstung und machen Nahkampfschaden plus 1 oder 1 oder 2W10 mehr Schaden mit ihren Nahkampfangriffen. Dieser Effekt ist nicht stapelbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schaden": "plus 1W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Gewährt Verbündeten für 1 Runde plus 5 magische Rüstung. Nicht stapelbar"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "plus 1W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Gewährt Verbündeten für 2 Runden plus 5 magische Rüstung. Nicht stapelbar"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Umkreis",
      "schaden": "plus 2W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Gewährt Verbündeten für 3 Runden plus 10 magische Rüstung. Nicht stapelbar"
     }
    ]
   },
   {
    "name": "Knochenspeer",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Hat 5 oder 10 oder 15 rüstungsbrechend. Ist 1 oder 1 oder 2-mal pro Kampf nutzbar. Du schleuderst einen Knochenspeer, der 2 oder 3 oder 4 Ziele in einer Linie aufspießt. Nach Anwendung des Skills hast du 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "5 rüstungsbrechend. Spießt 2 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "10 rüstungsbrechend. Spießt 3 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Linie",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "15 rüstungsbrechend. Spießt 4 Ziele auf. 2-mal pro Kampf. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Letzte Reserven",
    "ast": "Medizin",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Heilung von plus 2 oder 3 oder 4W10 an dich selbst und plus 5 oder 10 oder 20 magische Rüstung für eine Dauer von 2 oder 3 oder 4 Runden. Danach verfällt der Charakter für 1W4 Runden in tiefen Schlaf.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 2 Runden. plus 5 magische Rüstung. Danach 1W4 Runden tiefer Schlaf"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 3 Runden. plus 10 magische Rüstung. Danach 1W4 Runden tiefer Schlaf"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 4 Runden. plus 20 magische Rüstung. Danach 1W4 Runden tiefer Schlaf"
     }
    ]
   },
   {
    "name": "Welle der Heilung",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Aura heilt jeden Verbündeten im Umkreis von 2 oder 4 oder 6 Meter um 4 oder 5 oder 6W10 Heilung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     }
    ]
   },
   {
    "name": "Neues Leben",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 4,
    "info": "Wiederbelebung im Nahkampf um 8 oder 9 oder 10W10 Heilung. Ist 1-mal pro Tag nutzbar. Belebt ein totes Ziel nach 1 oder 1 oder 2 Runden mit ein paar Lebenspunkten wieder oder heilt einfach auch nur ein lebendes Ziel.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "Heilung",
      "effekt": "Belebt nach 1 Runde tot wieder oder heilt normal. 1-mal pro Tag"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "Heilung",
      "effekt": "Belebt nach 1 Runde tot wieder oder heilt normal. 1-mal pro Tag"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "10W10",
      "schadenArt": "Heilung",
      "effekt": "Belebt nach 2 Runden tot wieder oder heilt normal. 1-mal pro Tag"
     }
    ]
   },
   {
    "name": "Beifall",
    "ast": "Medizin",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Erschafft eine Aura im Umkreis von 3 oder 6 oder 9 Meter für eine Dauer von 1 oder 2 oder 3 Runden. Alle Freunde im Umkreis dürfen jeden Angriff parieren und machen dabei einen Konterschlag mit 2 oder 3 oder 4W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "schaden": "2W10 Konterschlagschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. Erlaubt allen Freunden das Parieren von Angriffen"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Umkreis",
      "schaden": "3W10 Konterschlagschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. Erlaubt allen Freunden das Parieren von Angriffen"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Umkreis",
      "schaden": "4W10 Konterschlagschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. Erlaubt allen Freunden das Parieren von Angriffen"
     }
    ]
   },
   {
    "name": "Beruhigende Aura",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 1 oder 2 oder 3W10 im Umkreis von 2 oder 4 oder 6 Meter. Verbündete heilen Lebenspunkte und können 1 oder 1 oder 2 negative Statuseffekte entfernen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "1W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 2 negative Statuseffekte"
     }
    ]
   },
   {
    "name": "Heilende Hand",
    "ast": "Motivieren",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 im Nahkampf. Du heilst einen Verbündeten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     }
    ]
   },
   {
    "name": "Kopfnuss",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Das Ziel erhält 1 Statusveränderung und ist zu 25 oder 50 oder 75 Prozent für 1 Runde gestunnt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "1 Statusveränderung und 25 Prozent Stun-Chance für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "1 Statusveränderung und 50 Prozent Stun-Chance für 1 Runde"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "1 Statusveränderung und 75 Prozent Stun-Chance für 1 Runde"
     }
    ]
   },
   {
    "name": "Seelenreinigung",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Entfernt alle negativen Statuseffekte wie Giftstufe, Feuermarker und Blutungen bei allen Verbündeten im Umkreis von 1 oder 2 oder 3 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     }
    ]
   },
   {
    "name": "Verstärker der Leiden",
    "ast": "Motivieren",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Du machst plus 1 oder 2 oder 3W10 zusätzlichen Schaden pro verschiedenen negativen Statuseffekt auf dem Ziel wie Blutung, Giftstufe und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 1W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 2W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 3W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     }
    ]
   },
   {
    "name": "Ablenken",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Gegner im Umkreis laufen zu 30 oder 60 oder 90 Prozent für 1 oder 1 oder 2 Runden auf dich zu und greifen an. Gewährt plus 10 oder 15 oder 20 magische Rüstung für diese Zeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Zu 30 Prozent laufen Gegner für 1 Runde auf dich zu. plus 10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Umkreis",
      "effekt": "Zu 60 Prozent laufen Gegner für 1 Runde auf dich zu. plus 15 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Umkreis",
      "effekt": "Zu 90 Prozent laufen Gegner für 2 Runden auf dich zu. plus 20 magische Rüstung"
     }
    ]
   },
   {
    "name": "Ansporn",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Macht Schaden magisch im Umkreis von 2 oder 4 oder 6 Meter. Alle Verbündeten im Umkreis bekommen für 1 oder 2 oder 3 Runden plus 10 oder 15 oder 20 auf Handeln und plus 1 oder 2 oder 3 Meter mehr Bewegungsweite. Dieser Effekt ist nicht stapelbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "plus 10 auf Handeln und plus 1 Meter Bewegungsweite für 1 Runde. Nicht stapelbar"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "plus 15 auf Handeln und plus 2 Meter Bewegungsweite für 2 Runden. Nicht stapelbar"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "plus 20 auf Handeln und plus 3 Meter Bewegungsweite für 3 Runden. Nicht stapelbar"
     }
    ]
   },
   {
    "name": "Kriegsschrei",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Alle Verbündeten im Umkreis von 1 oder 3 oder 5 Meter erhalten für 1 oder 2 oder 3 Runden plus 5 oder 5 oder 10 magische Rüstung und machen Nahkampfschaden plus 1 oder 1 oder 2W10 mehr Schaden mit ihren Nahkampfangriffen. Dieser Effekt ist nicht stapelbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schaden": "plus 1W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Gewährt Verbündeten für 1 Runde plus 5 magische Rüstung. Nicht stapelbar"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "plus 1W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Gewährt Verbündeten für 2 Runden plus 5 magische Rüstung. Nicht stapelbar"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Umkreis",
      "schaden": "plus 2W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Gewährt Verbündeten für 3 Runden plus 10 magische Rüstung. Nicht stapelbar"
     }
    ]
   },
   {
    "name": "Uppercut",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 im Nahkampf. Der Angriff besitzt 5 oder 10 oder 15 rüstungsbrechend. Das Ziel vor dir erleidet Schaden und wird 1 oder 2 oder 3W4 Meter zurückgeschleudert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. Schleudert das Ziel 2W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. Schleudert das Ziel 3W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Aufpumpen",
    "ast": "Motivieren",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Gewährt für eine Dauer von 1 oder 2 oder 3 Runden auf ein einzelnes Ziel plus 3 oder 4 oder 5W10 Nahkampfschaden, plus 0 oder 5 oder 10 Rüstung und 5 oder 10 oder 15 rüstungsbrechend. Verringert in dieser Zeit das Handeln um minus 20 oder 15 oder 10.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 3W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. plus 0 Rüstung, 5 rüstungsbrechend, minus 20 Handeln"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 4W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. plus 5 Rüstung, 10 rüstungsbrechend, minus 15 Handeln"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 5W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. plus 10 Rüstung, 15 rüstungsbrechend, minus 10 Handeln"
     }
    ]
   },
   {
    "name": "Schädelklirren",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Gegner im Umkreis von 3 oder 5 oder 7 Meter müssen einen Willenskraftwurf gegen den Schwierigkeitsgrad 5 oder 10 oder 15 bestehen, ansonsten haben sie 1 Aktion weniger zur Verfügung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "effekt": "Gegner brauchen einen Willenskraftwurf Schwierigkeitsgrad 5 oder verlieren 1 Aktion"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "effekt": "Gegner brauchen einen Willenskraftwurf Schwierigkeitsgrad 10 oder verlieren 1 Aktion"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "effekt": "Gegner brauchen einen Willenskraftwurf Schwierigkeitsgrad 15 oder verlieren 1 Aktion"
     }
    ]
   },
   {
    "name": "Mentale Welle",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Radius von 2 oder 3 oder 4 Meter. Alle im Radius außer dir selbst erleiden diesen Schaden und haben einen Malus von 5 oder 10 oder 15 auf alle Proben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Radius",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Alle im Radius außer dir erhalten einen Malus von 5 auf alle Proben"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Radius",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Alle im Radius außer dir erhalten einen Malus von 10 auf alle Proben"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Radius",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle im Radius außer dir erhalten einen Malus von 15 auf alle Proben"
     }
    ]
   },
   {
    "name": "Beifall",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Erschafft eine Aura im Umkreis von 3 oder 6 oder 9 Meter für eine Dauer von 1 oder 2 oder 3 Runden. Alle Freunde im Umkreis dürfen jeden Angriff parieren und machen dabei einen Konterschlag mit 2 oder 3 oder 4W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "schaden": "2W10 Konterschlagschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. Erlaubt allen Freunden das Parieren von Angriffen"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Umkreis",
      "schaden": "3W10 Konterschlagschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. Erlaubt allen Freunden das Parieren von Angriffen"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Umkreis",
      "schaden": "4W10 Konterschlagschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. Erlaubt allen Freunden das Parieren von Angriffen"
     }
    ]
   },
   {
    "name": "Ketten des Jenseits",
    "ast": "Motivieren",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Trifft 2 oder 3 oder 4 Ziele in einer Reichweite von 2 oder 4 oder 6 Meter. Verringert die Bewegungsweite und belegt die Ziele für 5 Runden mit einem Malus von minus 10 auf Handeln. Ziele müssen einen Willenskraftwurf mit einem Malus von minus 20 bestehen um den Effekt abzuwehren.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Trifft 2 Ziele. Verringert Bewegungsweite und gibt für 5 Runden minus 10 auf Handeln. Willenskraftwurf minus 20 zum Abwehren"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Trifft 3 Ziele. Verringert Bewegungsweite und gibt für 5 Runden minus 10 auf Handeln. Willenskraftwurf minus 20 zum Abwehren"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Trifft 4 Ziele. Verringert Bewegungsweite und gibt für 5 Runden minus 10 auf Handeln. Willenskraftwurf minus 20 zum Abwehren"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Blutiger Zorn",
    "ast": "Nahkampf Fäuste",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Du erhältst für 1 oder 2 oder 3 Runden eine zusätzliche Attacke in Aktion A auf ein einzelnes Ziel. Du erleidest dafür sofort 2 oder 1 oder 0 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 1 Runde. Erhältst sofort 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 2 Runden. Erhältst sofort 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 3 Runden. Erhältst sofort 0 Blutungen"
     }
    ]
   },
   {
    "name": "Kopfnuss",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Das Ziel erhält 1 Statusveränderung und ist zu 25 oder 50 oder 75 Prozent für 1 Runde gestunnt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "1 Statusveränderung und 25 Prozent Stun-Chance für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "1 Statusveränderung und 50 Prozent Stun-Chance für 1 Runde"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "1 Statusveränderung und 75 Prozent Stun-Chance für 1 Runde"
     }
    ]
   },
   {
    "name": "Feuerfaust",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch im Nahkampf. Fügt dem Hauptziel Nahkampfschaden und plus 1 Feuermarker zu. Ziele links und rechts neben dem Hauptziel sowie dahinter erhalten 1 oder 2 oder 3W10 Schaden und plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "wie Waffe",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten 1W10 Schaden und plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "wie Waffe",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten 2W10 Schaden und plus 1 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "wie Waffe",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten 3W10 Schaden und plus 1 Feuermarker"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Der Weg der zwei Fäuste Doppelte Klingen",
    "ast": "Nahkampf Fäuste",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Greife während deiner Aktion A auch mit deiner Off-Hand Klinge im Nahkampf an. Dies ist 2 oder 3 oder 4-mal pro Kampf möglich. Der Modifikator beträgt minus 10 oder minus 5 oder 0 Nahkampf. Es gibt keine Buffs durch die Klinge.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "2-mal pro Kampf in Aktion A nutzbar. Modifikator minus 10 Nahkampf. Keine Buffs"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "3-mal pro Kampf in Aktion A nutzbar. Modifikator minus 5 Nahkampf. Keine Buffs"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "4-mal pro Kampf in Aktion A nutzbar. Modifikator 0 Nahkampf. Keine Buffs"
     }
    ]
   },
   {
    "name": "Spot",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Ein Gegner in einer Reichweite von 5 oder 7 oder 10 Meter greift für 2 oder 2 oder 3 Runden nur dich an. Gegen dieses Ziel erhältst du plus 10 oder 15 oder 20 Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "Zwingt Gegner für 2 Runden in die Aggro. Du hast plus 10 Rüstung gegen ihn"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "effekt": "Zwingt Gegner für 2 Runden in die Aggro. Du hast plus 15 Rüstung gegen ihn"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "Zwingt Gegner für 3 Runden in die Aggro. Du hast plus 20 Rüstung gegen ihn"
     }
    ]
   },
   {
    "name": "Wache!",
    "ast": "Nahkampf Fäuste",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Erlaubt 2 oder 3 oder 4 Gelegenheitsangriffe im Nahkampf oder Fernkampf pro Kampf. Ermöglicht Angriffe auf Gegner, die deine Kampfreichweite betreten, verlassen oder durchqueren.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "2 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "3 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "4 Gelegenheitsangriffe pro Kampf"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Letzte Reserven",
    "ast": "Nahkampf Fäuste",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Heilung von plus 2 oder 3 oder 4W10 an dich selbst auf ein einzelnes Ziel. Gewährt plus 5 oder 10 oder 20 Rüstung für eine Dauer von 2 oder 3 oder 4 Runden. Danach verfällt der Charakter für 1W4 Runden in tiefen Schlaf.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 2 Runden. plus 5 Rüstung. Danach 1W4 Runden tiefer Schlaf"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 3 Runden. plus 10 Rüstung. Danach 1W4 Runden tiefer Schlaf"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Danach 1W4 Runden tiefer Schlaf"
     }
    ]
   },
   {
    "name": "Risikoschlag",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch plus 5 oder 6 oder 7W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen und erhöht die kritische Trefferchance um plus 5 oder 10 oder 15 Prozent. Der Anwender kann für eine Dauer von 2 oder 2 oder 1 Runden nicht blocken.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung, plus 5 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen, plus 10 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen, plus 15 Prozent kritische Trefferchance. Anwender kann 1 Runde nicht blocken"
     }
    ]
   },
   {
    "name": "Stampfer",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch von 5 oder 6 oder 7W10 im Nahkampf. Hat 5 oder 10 oder 15 rüstungsbrechend. Alle angrenzenden Gegner werden um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "angrenzende Felder",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. Stößt alle angrenzenden Gegner 1W4 Meter weg"
     },
     {
      "level": 2,
      "reichweite": "angrenzende Felder",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. Stößt alle angrenzenden Gegner 1W4 Meter weg"
     },
     {
      "level": 3,
      "reichweite": "angrenzende Felder",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. Stößt alle angrenzenden Gegner 1W4 Meter weg"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Konterposition",
    "ast": "Nahkampf Fäuste",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf. Für eine Dauer von 1 oder 2 oder 3 Runden kannst du nur kontern, dich bewegen und Extra-Aktionen nutzen. Du kannst 4 oder 5 oder 6 Angriffe zusätzlich parieren. Bei einem erfolgreichen Konter erfolgt ein sofortiger Gegenschlag mit Nahkampfschaden plus 3 oder 4 oder 5W10 und plus 1 oder 1 oder 2 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. Erlaubt 4 zusätzliche Paraden. Gegenschlag verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 4W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. Erlaubt 5 zusätzliche Paraden. Gegenschlag verursacht plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 5W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. Erlaubt 6 zusätzliche Paraden. Gegenschlag verursacht plus 2 Blutungen"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Blutiger Zorn",
    "ast": "Nahkampf Klingen",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Du erhältst für 1 oder 2 oder 3 Runden eine zusätzliche Attacke in Aktion A auf ein einzelnes Ziel. Du erleidest dafür sofort 2 oder 1 oder 0 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 1 Runde. Erhältst sofort 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 2 Runden. Erhältst sofort 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 3 Runden. Erhältst sofort 0 Blutungen"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Verstärker der Leiden",
    "ast": "Nahkampf Klingen",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Du machst plus 1 oder 2 oder 3W10 zusätzlichen Schaden pro verschiedenen negativen Statuseffekt auf dem Ziel wie Blutung, Giftstufe und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 1W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 2W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 3W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     }
    ]
   },
   {
    "name": "Doppelte Klingen Der Weg der zwei Fäuste",
    "ast": "Nahkampf Klingen",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Greife während deiner Aktion A auch mit deiner Off-Hand Klinge im Nahkampf an. Dies ist 2 oder 3 oder 4-mal pro Kampf möglich. Der Modifikator beträgt minus 10 oder minus 5 oder 0 Nahkampf. Es gibt keine Buffs durch die Klinge.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "2-mal pro Kampf in Aktion A nutzbar. Modifikator minus 10 Nahkampf. Keine Buffs"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "3-mal pro Kampf in Aktion A nutzbar. Modifikator minus 5 Nahkampf. Keine Buffs"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Off-Hand Waffe",
      "schadenArt": "physisch",
      "effekt": "4-mal pro Kampf in Aktion A nutzbar. Modifikator 0 Nahkampf. Keine Buffs"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Spot",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Ein Gegner in einer Reichweite von 5 oder 7 oder 10 Meter greift für 2 oder 2 oder 3 Runden nur dich an. Gegen dieses Ziel erhältst du plus 10 oder 15 oder 20 Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "Zwingt Gegner für 2 Runden in die Aggro. Du hast plus 10 Rüstung gegen ihn"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "effekt": "Zwingt Gegner für 2 Runden in die Aggro. Du hast plus 15 Rüstung gegen ihn"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "Zwingt Gegner für 3 Runden in die Aggro. Du hast plus 20 Rüstung gegen ihn"
     }
    ]
   },
   {
    "name": "Wache!",
    "ast": "Nahkampf Klingen",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Erlaubt 2 oder 3 oder 4 Gelegenheitsangriffe im Nahkampf oder Fernkampf pro Kampf. Ermöglicht Angriffe auf Gegner, die deine Kampfreichweite betreten, verlassen oder durchqueren.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "2 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "3 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "4 Gelegenheitsangriffe pro Kampf"
     }
    ]
   },
   {
    "name": "Klingen Klauensturm",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft alle angrenzenden 1 oder 1 oder 2 Felder um den Anwender herum mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "2 angrenzende Felder Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 2. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Risikoschlag",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch plus 5 oder 6 oder 7W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen und erhöht die kritische Trefferchance um plus 5 oder 10 oder 15 Prozent. Der Anwender kann für eine Dauer von 2 oder 2 oder 1 Runden nicht blocken.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung, plus 5 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen, plus 10 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen, plus 15 Prozent kritische Trefferchance. Anwender kann 1 Runde nicht blocken"
     }
    ]
   },
   {
    "name": "Schneise",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch plus 4 oder 5 oder 6W10 im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Du musst eine ganze Runde den Skill aufladen, dann triffst du alle Gegner in einer 5 Meter langen Linie vor dir.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Konterposition",
    "ast": "Nahkampf Klingen",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf. Für eine Dauer von 1 oder 2 oder 3 Runden kannst du nur kontern, dich bewegen und Extra-Aktionen nutzen. Du kannst 4 oder 5 oder 6 Angriffe zusätzlich parieren. Bei einem erfolgreichen Konter erfolgt ein sofortiger Gegenschlag mit Nahkampfschaden plus 3 oder 4 oder 5W10 und plus 1 oder 1 oder 2 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. Erlaubt 4 zusätzliche Paraden. Gegenschlag verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 4W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. Erlaubt 5 zusätzliche Paraden. Gegenschlag verursacht plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 5W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. Erlaubt 6 zusätzliche Paraden. Gegenschlag verursacht plus 2 Blutungen"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Berserker",
    "ast": "Stärke",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Gewährt für eine Dauer von 1 oder 2 oder 3 Runden plus 2 oder 3 oder 4W10 physischen Nahkampfschaden und 0 oder 5 oder 10 rüstungsbrechend. Verringert in dieser Zeit den Nahkampf-Wert um minus 15 oder 10 oder 5.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. 0 rüstungsbrechend und minus 15 Nahkampf"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. 5 rüstungsbrechend und minus 10 Nahkampf"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. 10 rüstungsbrechend und minus 5 Nahkampf"
     }
    ]
   },
   {
    "name": "Bodyslam",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch von 2 oder 3 oder 4W10 im Nahkampf. Funktioniert nur, wenn du dich in dieser Runde mindestens 2 Meter bewegt hast. Das Ziel fliegt nach einem misslungenen Schwellenwert-Wurf um 1 oder 2 oder 3W4 Meter zurück.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 2W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 3W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Profi-Boxer",
    "ast": "Stärke",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Deine Faustangriffe verursachen permanent mehr Schaden. Erhöht den Schaden um plus 1 oder 2 or 3W10.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schaden": "plus 1W10",
      "schadenArt": "physisch",
      "effekt": "Erhöht permanent den Faustschaden"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Erhöht permanent den Faustschaden"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Erhöht permanent den Faustschaden"
     }
    ]
   },
   {
    "name": "Wunden aufreißen",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen. Gilt als Extra-Aktion, wenn das Ziel bereits verletzt ist.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     }
    ]
   },
   {
    "name": "Körper aus Stein",
    "ast": "Stärke",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 3 oder 5 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 3 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Sprungangriff",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch von 3 oder 4 oder 5W10. Springe auf dein Ziel über eine Distanz von 3 oder 5 oder 7 Meter und verursache Schaden in einem Radius von 1 oder 2 oder 2 Meter um den Aufprallpunkt herum. Angrenzende Ziele erhalten die Hälfte des Schadens.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Sprungdistanz auf 1 Meter Radius",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Ziele im Radius erhalten halben Schaden"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Sprungdistanz auf 2 Meter Radius",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Ziele im Radius erhalten halben Schaden"
     },
     {
      "level": 3,
      "reichweite": "7 Meter Sprungdistanz auf 2 Meter Radius",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Ziele im Radius erhalten halben Schaden"
     }
    ]
   },
   {
    "name": "Sternenfaust",
    "ast": "Stärke",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Deine Nahkampfangriffe betäuben Gegner zu 10 oder 20 oder 30 Prozent. Im Gegenzug verursachst du permanent minus 2 oder 1 oder 1W10 weniger Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "minus 2W10",
      "schadenArt": "physisch",
      "effekt": "Nahkampfangriffe betäuben Gegner zu 10 Prozent"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "minus 1W10",
      "schadenArt": "physisch",
      "effekt": "Nahkampfangriffe betäuben Gegner zu 20 Prozent"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "minus 1W10",
      "schadenArt": "physisch",
      "effekt": "Nahkampfangriffe betäuben Gegner zu 30 Prozent"
     }
    ]
   },
   {
    "name": "Respektschelle",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 1 oder 2 oder 3W10 im Nahkampf. Verursacht plus 1 oder 1 or 2 Blutungen und das Ziel wird zu 20 oder 40 oder 60 Prozent betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 1W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung und 20 Prozent Betäubungschance"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung und 40 Prozent Betäubungschance"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen und 60 Prozent Betäubungschance"
     }
    ]
   },
   {
    "name": "Aufpumpen",
    "ast": "Stärke",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Gewährt für eine Dauer von 1 oder 2 oder 3 Runden auf ein einzelnes Ziel plus 3 oder 4 oder 5W10 Nahkampfschaden, plus 0 oder 5 oder 10 Rüstung und 5 oder 10 oder 15 rüstungsbrechend. Verringert in dieser Zeit das Handeln um minus 20 oder 15 oder 10.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 3W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. plus 0 Rüstung, 5 rüstungsbrechend, minus 20 Handeln"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 4W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. plus 5 Rüstung, 10 rüstungsbrechend, minus 15 Handeln"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 5W10 Nahkampfschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. plus 10 Rüstung, 15 rüstungsbrechend, minus 10 Handeln"
     }
    ]
   },
   {
    "name": "Panzerbrecher",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Das Ziel verliert für eine Dauer von 1 oder 2 oder 3 Runden minus 10 oder 20 oder 30 Rüstung auf eine Reichweite von 2 oder 4 oder 6 Meter. Dieser Effekt ist nicht stapelbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Ziel verliert 10 Rüstung für 1 Runde. Nicht stapelbar"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Ziel verliert 20 Rüstung für 2 Runden. Nicht stapelbar"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Ziel verliert 30 Rüstung für 3 Runden. Nicht stapelbar"
     }
    ]
   },
   {
    "name": "Kometeneinschlag",
    "ast": "Stärke",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Gewährt permanent einen stärkeren Nahkampfschaden mit Durchschlag. Erhöht den Schaden um plus 1 oder 2 oder 3W10 und gibt plus 0 oder 5 oder 10 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schaden": "plus 1W10",
      "schadenArt": "physisch",
      "effekt": "0 rüstungsbrechend mit Durchschlag permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend mit Durchschlag permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend mit Durchschlag permanent"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Zermalmen",
    "ast": "Stärke",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch plus 5 oder 6 oder 7W10 im Nahkampf. Ignoriert jegliche Rüstung komplett.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung komplett"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung komplett"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung komplett"
     }
    ]
   },
   {
    "name": "Dornenhaut",
    "ast": "Voodoo Fluchspucker",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch. Gewährt plus 5 Rüstung für eine Dauer von 1 oder 2 oder 3 Runden. Gegner, die dich im Nahkampf angreifen, erleiden automatisch 1 oder 2 oder 3W10 Schaden. Kann auch aktiv genutzt werden, um auf einen Verbündeten in einer Reichweite von 1 oder 3 oder 5 Meter die Dornenhaut zu zaubern.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 1 Runde. Angreifer erleiden 1W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 2 Runden. Angreifer erleiden 2W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung for 3 Runden. Angreifer erleiden 3W10 Schaden"
     }
    ]
   },
   {
    "name": "Knochengriff",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Ein Ziel in einer Reichweite von 10 Meter erhält für eine Dauer von 1 oder 2 oder 3 Runden minus 1 oder 2 oder 3 Meter Bewegung und minus 10 auf Handeln.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "effekt": "minus 1 Meter Bewegung und minus 10 auf Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "minus 2 Meter Bewegung und minus 10 auf Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "minus 3 Meter Bewegung und minus 10 auf Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Heilendes Blut",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Du fügst dir selbst 1W6 physischen Schaden zu und heilst ein Ziel in einer Reichweite von 3 oder 5 oder 7 Meter um 4 oder 5 oder 6W10 Heilung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Anwender erleidet 1W6 Eigenschaden"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Anwender erleidet 1W6 Eigenschaden"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Anwender erleidet 1W6 Eigenschaden"
     }
    ]
   },
   {
    "name": "Schrecken der Meere",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "1 oder 2 oder 3 Gegner in einer Reichweite von 2 oder 4 oder 6 Meter fliehen für eine Dauer von 1 oder 1 oder 2 Runden nach einem misslungenen Willenskraft-Wurf mit einem Malus von minus 5 oder 10 oder 15.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "1 Gegner flieht für 1 Runde bei misslungenem Willenskraft-Wurf minus 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "2 Gegner fliehen für 1 Runde bei misslungenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "3 Gegner fliehen für 2 Runden bei misslungenem Willenskraft-Wurf minus 15"
     }
    ]
   },
   {
    "name": "Seelenreinigung",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Entfernt alle negativen Statuseffekte wie Giftstufe, Feuermarker und Blutungen bei allen Verbündeten im Umkreis von 1 oder 2 oder 3 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Entfernt alle negativen Effekte bei allen Verbündeten im Umkreis"
     }
    ]
   },
   {
    "name": "Aura der Rast",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Erschafft für eine Dauer von 2 oder 3 oder 4 Runden eine Aura mit einem Umkreis von 2 oder 3 oder 4 Meter. Du heilst jeden Freund um plus 2 oder 3 oder 4W10 Heilung, der seine Runde in deiner Aura startet. Ein negativer Statuseffektstapel seiner Wahl wird um 1 oder 2 oder 3 schwächer.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "plus 2W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 2 Runden. Reduziert einen Statuseffektstapel der Wahl um 1"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "plus 3W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 3 Runden. Reduziert einen Statuseffektstapel der Wahl um 2"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "plus 4W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 4 Runden. Reduziert einen Statuseffektstapel der Wahl um 3"
     }
    ]
   },
   {
    "name": "Flüstern der Schatten",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Es besteht eine 70 oder 80 oder 90 Prozent Chance, dass dein Ziel für 1 Runde schläft und zu Beginn seiner nächsten Runde wieder aufwacht. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "effekt": "70 Prozent Chance auf Schlaf für 1 Runde. Keine Kontrolle durch Spielleitung"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "effekt": "80 Prozent Chance auf Schlaf für 1 Runde. Keine Kontrolle durch Spielleitung"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "effekt": "90 Prozent Chance auf Schlaf für 1 Runde. Keine Kontrolle durch Spielleitung"
     }
    ]
   },
   {
    "name": "Knochenmauer",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erschaffe eine 3 oder 4 oder 5 Meter lange Mauer in einer Reichweite von 6 oder 9 oder 12 Meter, die 1 oder 2 oder 3 feindliche Angriffe komplett blockt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "6 Meter Distanz auf 3 Meter lange Mauer",
      "effekt": "Blockt 1 Angriff"
     },
     {
      "level": 2,
      "reichweite": "9 Meter Distanz auf 4 Meter lange Mauer",
      "effekt": "Blockt 2 Angriffe"
     },
     {
      "level": 3,
      "reichweite": "12 Meter Distanz auf 5 Meter lange Mauer",
      "effekt": "Blockt 3 Angriffe"
     }
    ]
   },
   {
    "name": "Lebensentzug",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Verursacht 4 oder 5 oder 6W10 magischen Schaden auf eine Reichweite von 3 oder 5 oder 10 Meter bei 1 oder 1 oder 2 Zielen. Du wirst um 50 Prozent des zugefügten Schadens geheilt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Ziel",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Ziel",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 3,
      "reichweite": "10 Meter auf 2 Ziele",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     }
    ]
   },
   {
    "name": "Fluch der Schwächung",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Ein Ziel in einer Reichweite von 2 oder 4 oder 6 Meter verursacht für eine Dauer von 1 oder 2 oder 3 Runden minus 50 Prozent weniger physischen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Ziel verursacht minus 50 Prozent physischen Schaden für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Ziel verursacht minus 50 Prozent physischen Schaden für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Ziel verursacht minus 50 Prozent physischen Schaden für 3 Runden"
     }
    ]
   },
   {
    "name": "Schattenschritt",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Du löst dich in Rauch auf und materialisierst dich wieder auf eine Distanz von 5 oder 10 oder 20 Meter. Du bleibst zu 25 oder 50 oder 75 Prozent heimlich unentdeckt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "Du bleibst zu 25 Prozent heimlich unentdeckt"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "Du bleibst zu 50 Prozent heimlich unentdeckt"
     },
     {
      "level": 3,
      "reichweite": "20 Meter",
      "effekt": "Du bleibst zu 75 Prozent heimlich unentdeckt"
     }
    ]
   },
   {
    "name": "Verfluchter Kreis",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Erschafft für eine Dauer von 1 oder 2 oder 3 Runden eine Zone der Größe 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter in einer Reichweite von 3 oder 6 oder 9 Meter. Verursacht plus 1 oder 1 oder 2W10 Schaden. Alle Ziele in der Zone erleiden einen Malus von minus 5 oder minus 10 oder minus 15 auf all ihre Proben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "Hält 1 Runde. minus 5 auf alle Proben in der Zone"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. minus 10 auf alle Proben in der Zone"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. minus 15 auf alle Proben in der Zone"
     }
    ]
   },
   {
    "name": "Seelentausch",
    "ast": "Voodoo Fluchspucker",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Überträgt 1 oder 2 oder 3 deiner eigenen negativen Statuseffektstapel auf einen Feind in einer Reichweite von 3 oder 5 oder 7 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "effekt": "Überträgt 1 negativen Statuseffektstapel auf einen Feind"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "effekt": "Überträgt 2 negative Statuseffektstapel auf einen Feind"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "effekt": "Überträgt 3 negative Statuseffektstapel auf einen Feind"
     }
    ]
   },
   {
    "name": "Kettenblitz der Heilung",
    "ast": "Voodoo Fluchspucker",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 4,
    "info": "Kettenheilung von 6 oder 7 oder 8W10 Heilung für 3 oder 4 oder 5 Ziele, die jeweils einen maximalen Abstand von 2 oder 3 oder 4 Meter zueinander haben. Es gibt keinen Hin- und Her-Effekt zwischen zwei gleichen Zielen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Abstand zwischen den Zielen",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Trifft maximal 3 Ziele. Kein Pingpong-Effekt"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Abstand zwischen den Zielen",
      "schaden": "7W10",
      "schadenArt": "Heilung",
      "effekt": "Trifft maximal 4 Ziele. Kein Pingpong-Effekt"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Abstand zwischen den Zielen",
      "schaden": "8W10",
      "schadenArt": "Heilung",
      "effekt": "Trifft maximal 5 Ziele. Kein Pingpong-Effekt"
     }
    ]
   },
   {
    "name": "Fluch",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Du selbst bekommst 3 oder 2 oder 1W10 Schaden. 1 oder 1 oder 2 Ziele bekommen Schaden und schlafen zu 20 oder 40 oder 60 Prozent für 1W4 Runden. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 3W10 Eigenschaden. 1 Ziel schläft zu 20 Prozent für 1W4 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 2W10 Eigenschaden. 1 Ziel schläft zu 40 Prozent für 1W4 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 1W10 Eigenschaden. 2 Ziele schlafen zu 60 Prozent für 1W4 Runden"
     }
    ]
   },
   {
    "name": "Blutschuss",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch in einer Reichweite von 5 Meter. Erzeuge aus deinem Blut durch das Opfern von 1W8 Lebenspunkten pro Kugel insgesamt 2 oder 3 oder 4 Blutkugeln. Jede Kugel verursacht 2W10 Schaden. Du kannst die Kugeln auf bis zu 3 verschiedene Ziele schießen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 2 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "3 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 3 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "4 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 4 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Schrecken der Meere",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "1 oder 2 oder 3 Gegner in einer Reichweite von 2 oder 4 oder 6 Meter fliehen für eine Dauer von 1 oder 1 oder 2 Runden nach einem misslungenen Willenskraft-Wurf mit einem Malus von minus 5 oder 10 oder 15.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "1 Gegner flieht für 1 Runde bei misslungenem Willenskraft-Wurf minus 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "2 Gegner fliehen für 1 Runde bei misslungenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "3 Gegner fliehen für 2 Runden bei misslungenem Willenskraft-Wurf minus 15"
     }
    ]
   },
   {
    "name": "Verstärker der Leiden",
    "ast": "Voodoo Ritual Klinge",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Du machst plus 1 oder 2 oder 3W10 zusätzlichen Schaden pro verschiedenen negativen Statuseffekt auf dem Ziel wie Blutung, Giftstufe und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 1W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 2W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 3W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     }
    ]
   },
   {
    "name": "Atem der Verwesung",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Feuert einen Strahl, der 1 oder 2 oder 3 Gegnern Schaden verursacht und diese zusätzlich mit Giftstufe 2 oder 3 oder 4 vergiftet. Angrenzende Personen erhalten ebenfalls das Gift.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Strahl",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 1 Gegner. Verursacht Giftstufe 2. Angrenzende Personen werden vergiftet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Strahl",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 2 Gegner. Verursacht Giftstufe 3. Angrenzende Personen werden vergiftet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Strahl",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 3 Gegner. Verursacht Giftstufe 4. Angrenzende Personen werden vergiftet"
     }
    ]
   },
   {
    "name": "Kadaverexplosion",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 5 oder 10 oder 20 Meter. Alle Ziele im Umkreis von 1 oder 2 oder 3 Meter um den Kadaver herum erleiden den Schaden und erhalten Giftstufe 2 oder 3 oder 4.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf 1 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Schaden und Giftstufe 2 im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "10 Meter Distanz auf 2 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Schaden und Giftstufe 3 im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "20 Meter Distanz auf 3 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Schaden und Giftstufe 4 im Umkreis"
     }
    ]
   },
   {
    "name": "Lebensentzug",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Verursacht 4 oder 5 oder 6W10 magischen Schaden auf eine Reichweite von 3 oder 5 oder 10 Meter bei 1 oder 1 oder 2 Zielen. Du wirst um 50 Prozent des zugefügten Schadens geheilt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Ziel",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Ziel",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 3,
      "reichweite": "10 Meter auf 2 Ziele",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     }
    ]
   },
   {
    "name": "Toxischer Ausbruch",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Du schädigst einem Ziel in Reichweite und verursachst Giftstufe 2 oder 3 oder 4. Hat das Ziel mindestens 1 Blutung erhält es zusätzlich plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Knochenspeer",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Hat 5 oder 10 oder 15 rüstungsbrechend. Ist 1 oder 1 oder 2-mal pro Kampf nutzbar. Du schleuderst einen Knochenspeer, der 2 oder 3 oder 4 Ziele in einer Linie aufspießt. Nach Anwendung des Skills hast du 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "5 rüstungsbrechend. Spießt 2 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "10 rüstungsbrechend. Spießt 3 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Linie",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "15 rüstungsbrechend. Spießt 4 Ziele auf. 2-mal pro Kampf. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Ruf des Grabes",
    "ast": "Voodoo Ritual Klinge",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Bei einem eigenen Kill im Nahkampf besteht eine 25 oder 50 oder 75 Prozent Chance, dass das getötete Ziel als plus 1 treues Skelett der Stufe 1 aufersteht.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "effekt": "25 Prozent Chance auf Skelettauferstehung nach Kill"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "effekt": "50 Prozent Chance auf Skelettauferstehung nach Kill"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "effekt": "75 Prozent Chance auf Skelettauferstehung nach Kill"
     }
    ]
   },
   {
    "name": "Welle der Korrosion",
    "ast": "Voodoo Ritual Klinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einem Umkreis von 2 oder 3 oder 4 Meter. Alle Personen im Umkreis erleiden diesen Schaden und erhalten zusätzlich Giftstufe 3 oder 4 oder 5.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erleiden Schaden und Giftstufe 3"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erleiden Schaden und Giftstufe 4"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erleiden Schaden und Giftstufe 5"
     }
    ]
   },
   {
    "name": "Blutexpansion",
    "ast": "Voodoo Ritual Klinge",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 im Nahkampf. Verursacht plus 2 oder 3 oder 4 Blutungen. Du fügst dir selbst sofort 2 oder 1 oder 1W10 Schaden und ohne einen Rettungswurf sofort plus 1 eigene Blutung zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "plus 2 Blutungen auf das Ziel. Anwender erleidet 2W10 Eigenschaden und plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "plus 3 Blutungen auf das Ziel. Anwender erleidet 1W10 Eigenschaden und plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "plus 4 Blutungen auf das Ziel. Anwender erleidet 1W10 Eigenschaden und plus 1 Blutung"
     }
    ]
   },
   {
    "name": "Seelenpakt",
    "ast": "Voodoo Ritual Klinge",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Kostet sofort 50 Prozent deiner Lebenspunkte auf ein einzelnes Ziel. Deine Fähigkeiten machen für 1 oder 2 oder 3 Runden den doppelten Effekt bei Schaden, Heilung, Blutung, Gift und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Verliere 50 Prozent Lebenspunkte. Doppelter Effekt für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Verliere 50 Prozent Lebenspunkte. Doppelter Effekt für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Verliere 50 Prozent Lebenspunkte. Doppelter Effekt für 3 Runden"
     }
    ]
   },
   {
    "name": "Arkaner Funke",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Diesen Zauber kannst du 2 oder 3 oder 4-mal pro Kampf einsetzen. Nach der Anwendung hat der Skill 1 Runde Abklingzeit. Ignoriert physische Rüstung komplett.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "4-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Arkaner Freibeuter",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Wasserpeitsche",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das getroffene Ziel wird um 1W4 Meter zurückgeschleudert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Feuerfaust",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch im Nahkampf. Fügt dem Hauptziel Nahkampfschaden und plus 1 Feuermarker zu. Ziele links und rechts neben dem Hauptziel sowie dahinter erhalten 1 oder 2 oder 3W10 Schaden und plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "wie Waffe",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten 1W10 Schaden und plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "wie Waffe",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten 2W10 Schaden und plus 1 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "wie Waffe",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten 3W10 Schaden und plus 1 Feuermarker"
     }
    ]
   },
   {
    "name": "Arkanes Schwert",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 10 oder 15 Meter. Diesen Zauber kannst du 1 oder 2 oder 3-mal pro Kampf einsetzen. Der Strahl trifft bis zu 2 Gegner in einer 3 oder 4 oder 5 Meter langen, geraden Linie. Nach Anwendung des Skills hat der Zauber 1 Runde Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf 3 Meter Linie",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter Distanz auf 4 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter Distanz auf 5 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Ruckzuckhieb",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10. Du springst auf eine Distanz von 2 oder 4 oder 6 Meter zum Gegner, fügst Schaden zu und kannst dann zurückspringen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Dunkle Rüstung",
    "ast": "Arkaner Freibeuter",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du hast für 1 oder 2 oder 3 Runden lang eine magische Rüstung von plus 10 oder 15 oder 20 auf ein einzelnes Ziel. Du bist um 10 oder 20 oder 30 weniger gut zu erkennen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 1 Runde. plus 10 Rüstung und du bist um 10 weniger gut zu erkennen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 2 Runden. plus 15 Rüstung und du bist um 20 weniger gut zu erkennen"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 3 Runden. plus 20 Rüstung und du bist um 30 weniger gut zu erkennen"
     }
    ]
   },
   {
    "name": "Arkanes Geschoss",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 auf eine Distanz von 5 oder 10 oder 15 Meter. Kann 1 oder 1 oder 2-mal pro Kampf gezaubert werden. Du erschaffst 3 oder 4 oder 5 Kugeln, die du entweder sofort auf ein Ziel in Reichweite schießt, oder die Kugeln bis zu 3 oder 4 oder 5 Runden hinter dir schweben lässt. Pro Aktion A oder Aktion B oder Extra-Aktion kannst du dann 1 oder 2 oder 3 Kugeln abfeuern. Nach der Anwendung hat der Skill 2 Runden Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 3 Kugeln. Schweben für 3 Runden. Feuert 1 Kugel pro Aktion. 1-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "4W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 4 Kugeln. Schweben für 4 Runden. Feuert 2 Kugeln pro Aktion. 1-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "5W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 5 Kugeln. Schweben für 5 Runden. Feuert 3 Kugeln pro Aktion. 2-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Risikoschlag",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch plus 5 oder 6 oder 7W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen und erhöht die kritische Trefferchance um plus 5 oder 10 oder 15 Prozent. Der Anwender kann für eine Dauer von 2 oder 2 oder 1 Runden nicht blocken.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung, plus 5 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen, plus 10 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen, plus 15 Prozent kritische Trefferchance. Anwender kann 1 Runde nicht blocken"
     }
    ]
   },
   {
    "name": "Zweite Lunge",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Gewährt plus 25 oder 50 oder 100 temporäre Lebenspunkte für eine Dauer von 2 oder 3 oder 4 Runden auf ein einzelnes Ziel. Belegt dich danach mit einem minus 1 oder 1 oder 2 Debuff.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 25 temporäre Lebenspunkte für 2 Runden. Danach minus 1 Debuff"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 50 temporäre Lebenspunkte für 3 Runden. Danach minus 1 Debuff"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 100 temporäre Lebenspunkte für 4 Runden. Danach minus 2 Debuff"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Arkaner Sturm",
    "ast": "Arkaner Freibeuter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Reichweite von 6 oder 9 oder 12 Meter. Kann 1-mal pro Kampf gezaubert werden und trifft eine Zone von 2 mal 2 oder 3 mal 3 oder 3 mal 3 Meter. Personen im Sturm verlieren zu 20 oder 40 oder 60 Prozent eine Aktion in ihrer nächsten Runde. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "6 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. 20 Prozent Chance auf Aktionsverlust. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "9 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. 40 Prozent Chance auf Aktionsverlust. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "12 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. 60 Prozent Chance auf Aktionsverlust. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Berserker",
    "ast": "Dämonenjäger",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Gewährt für eine Dauer von 1 oder 2 oder 3 Runden plus 2 oder 3 oder 4W10 physischen Nahkampfschaden und 0 oder 5 oder 10 rüstungsbrechend. Verringert in dieser Zeit den Nahkampf-Wert um minus 15 oder 10 oder 5.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. 0 rüstungsbrechend und minus 15 Nahkampf"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. 5 rüstungsbrechend und minus 10 Nahkampf"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. 10 rüstungsbrechend und minus 5 Nahkampf"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Dämonenjäger",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Dämonenjäger",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Wunden aufreißen",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen. Gilt als Extra-Aktion, wenn das Ziel bereits verletzt ist.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     }
    ]
   },
   {
    "name": "Bluthund",
    "ast": "Dämonenjäger",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch. Für eine Dauer von 1 oder 2 oder 3 Runden visierst du ein verletztes Ziel in einer Reichweite von 5 oder 10 oder 15 Meter an. Gewährt plus 5 oder 10 oder 15 auf Angriffe gegen dieses Ziel und plus 2 oder 3 oder 4W10 Schaden. Angriffe auf andere Ziele erhalten einen Malus von minus 20. Hat das anvisierte Ziel eine Blutung, verursacht der Skill zusätzlichen 1W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. plus 5 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. plus 10 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. plus 15 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     }
    ]
   },
   {
    "name": "Körper aus Stahl",
    "ast": "Dämonenjäger",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 5 oder 10 oder 15 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 15 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Schrapnell",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schuss auf ein 1 mal 2 oder 1 mal 2 oder 2 mal 2 großes Feld. Verursacht Fernkampfschaden plus 1 oder 2 oder 3 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf auf Feld 1 mal 2 Meter",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft Feld von 1 mal 2 Meter. Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf auf Feld 1 mal 2 Meter",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft Feld von 1 mal 2 Meter. Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf auf Feld 2 mal 2 Meter",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Trifft Feld von 2 mal 2 Meter. Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Letzte Reserven",
    "ast": "Dämonenjäger",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Heilung von plus 2 oder 3 oder 4W10 an dich selbst auf ein einzelnes Ziel. Gewährt plus 5 oder 10 oder 20 Rüstung für eine Dauer von 2 oder 3 oder 4 Runden. Danach verfällt der Charakter für 1W4 Runden in tiefen Schlaf.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 2 Runden. plus 5 Rüstung. Danach 1W4 Runden tiefer Schlaf"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 3 Runden. plus 10 Rüstung. Danach 1W4 Runden tiefer Schlaf"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Danach 1W4 Runden tiefer Schlaf"
     }
    ]
   },
   {
    "name": "Risikoschlag",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch plus 5 oder 6 oder 7W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen und erhöht die kritische Trefferchance um plus 5 oder 10 oder 15 Prozent. Der Anwender kann für eine Dauer von 2 oder 2 oder 1 Runden nicht blocken.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung, plus 5 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen, plus 10 Prozent kritische Trefferchance. Anwender kann 2 Runden nicht blocken"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen, plus 15 Prozent kritische Trefferchance. Anwender kann 1 Runde nicht blocken"
     }
    ]
   },
   {
    "name": "Schnellschuss",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Feuert 3 oder 4 oder 5 Fernkampfangriffe in 1 Aktion A ab. Munition beachten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Fernkampf",
      "schaden": "3 Fernkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Munition beachten"
     },
     {
      "level": 2,
      "reichweite": "Fernkampf",
      "schaden": "4 Fernkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Munition beachten"
     },
     {
      "level": 3,
      "reichweite": "Fernkampf",
      "schaden": "5 Fernkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Munition beachten"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Konterposition",
    "ast": "Dämonenjäger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf. Für eine Dauer von 1 oder 2 oder 3 Runden kannst du nur kontern, dich bewegen und Extra-Aktionen nutzen. Du kannst 4 oder 5 oder 6 Angriffe zusätzlich parieren. Bei einem erfolgreichen Konter erfolgt ein sofortiger Gegenschlag mit Nahkampfschaden plus 3 oder 4 oder 5W10 und plus 1 oder 1 oder 2 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. Erlaubt 4 zusätzliche Paraden. Gegenschlag verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 4W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. Erlaubt 5 zusätzliche Paraden. Gegenschlag verursacht plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 5W10 Konterschaden",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. Erlaubt 6 zusätzliche Paraden. Gegenschlag verursacht plus 2 Blutungen"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Doppelhieb",
    "ast": "Fluchbrecher",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Erlaubt dir 1 oder 2 oder 3-mal pro Kampf einen Nahkampfangriff als Extra-Aktion auszuführen. Nach der Anwendung hat der Skill 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "1-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "2-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "3-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Fliegender Bulle",
    "ast": "Fluchbrecher",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Erhöht deine Willenskraft permanent um plus 10 oder 20 oder 30 Prozent. Macht dich immun gegen Schlaf und gewährt plus 5 oder 10 oder 15 auf Willenskraft-Würfe. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 Prozent Willenskraft, immun gegen Schlaf, plus 5 auf Willenskraft-Würfe"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 20 Prozent Willenskraft, immun gegen Schlaf, plus 10 auf Willenskraft-Würfe"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 30 Prozent Willenskraft, immun gegen Schlaf, plus 15 auf Willenskraft-Würfe"
     }
    ]
   },
   {
    "name": "Verstärker der Leiden",
    "ast": "Fluchbrecher",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Du machst plus 1 oder 2 oder 3W10 zusätzlichen Schaden pro verschiedenen negativen Statuseffekt auf dem Ziel wie Blutung, Giftstufe und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 1W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf and Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 2W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 3W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     }
    ]
   },
   {
    "name": "Wunden aufreißen",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen. Gilt als Extra-Aktion, wenn das Ziel bereits verletzt ist.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     }
    ]
   },
   {
    "name": "Buße",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilung von 3 oder 4 oder 5W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Funktioniert nur, wenn der Anwender selbst mindestens einen negativen Statuseffekt hat. 1 oder 2 oder 3 Ziele in Reichweite werden geheilt und verlieren all ihre negativen Statuseffekte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter auf 1 Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Erfordert negativen Statuseffekt auf Anwender. Entfernt alle Effekte vom Ziel"
     },
     {
      "level": 2,
      "reichweite": "4 Meter auf 2 Ziele",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Erfordert negativen Statuseffekt auf Anwender. Entfernt alle Effekte von den Zielen"
     },
     {
      "level": 3,
      "reichweite": "6 Meter auf 3 Ziele",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Erfordert negativen Statuseffekt auf Anwender. Entfernt alle Effekte von den Zielen"
     }
    ]
   },
   {
    "name": "Bluthund",
    "ast": "Fluchbrecher",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch. Für eine Dauer von 1 oder 2 oder 3 Runden visierst du ein verletztes Ziel in einer Reichweite von 5 oder 10 oder 15 Meter an. Gewährt plus 5 oder 10 oder 15 auf Angriffe gegen dieses Ziel und plus 2 oder 3 oder 4W10 Schaden. Angriffe auf andere Ziele erhalten einen Malus von minus 20. Hat das anvisierte Ziel eine Blutung, verursacht der Skill zusätzlichen 1W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. plus 5 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. plus 10 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. plus 15 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     }
    ]
   },
   {
    "name": "Lebensentzug",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Verursacht 4 oder 5 oder 6W10 magischen Schaden auf eine Reichweite von 3 oder 5 oder 10 Meter bei 1 oder 1 oder 2 Zielen. Du wirst um 50 Prozent des zugefügten Schadens geheilt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Ziel",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Ziel",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 3,
      "reichweite": "10 Meter auf 2 Ziele",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Seelenverkrustung",
    "ast": "Fluchbrecher",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Belegt ein einzelnes Ziel für eine Dauer von 2 oder 3 oder 4 Runden mit einem Effekt, der erlittenen magischen Schaden um minus 50 Prozent reduziert. In dieser Zeit kann sich das Ziel nur selbst heilen, externe Heilung funktioniert nicht.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 2 Runden. Reduziert magischen Schaden um 50 Prozent. Nur Selbstheilung erlaubt"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 3 Runden. Reduziert magischen Schaden um 50 Prozent. Nur Selbstheilung erlaubt"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 4 Runden. Reduziert magischen Schaden um 50 Prozent. Nur Selbstheilung erlaubt"
     }
    ]
   },
   {
    "name": "Ultraschall",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Erschafft eine Schallwelle im Umkreis von 3 oder 5 oder 10 Meter. Alle betroffenen Personen im Umkreis können für eine Dauer von 1 oder 2 oder 2 Runden keinerlei aktive Fähigkeiten einsetzen. Nur passive Fähigkeiten bleiben aktiv.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Blockiert alle aktiven Fähigkeiten im Umkreis für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Umkreis",
      "effekt": "Blockiert alle aktiven Fähigkeiten im Umkreis für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Umkreis",
      "effekt": "Blockiert alle aktiven Fähigkeiten im Umkreis für 2 Runden"
     }
    ]
   },
   {
    "name": "Zurückspulen",
    "ast": "Fluchbrecher",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Effekt auf ein einzelnes Ziel, der nach 1 oder 2 oder 3 Runden ausgelöst wird. Auf Stufe 1 springst du an deinen geografischen Ursprung zurück. Auf Stufe 2 werden zusätzlich alle Statuseffekte auf den damaligen Stand wiederhergestellt. Auf Stufe 3 werden auch alle Lebenspunkte auf den damaligen Stand zurückgesetzt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Wirkung nach 1 Runde. Springt an den geografischen Ursprungspunkt zurück"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Wirkung nach 2 Runden. Setzt Position und alle Statuseffektstapel zurück"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Wirkung nach 3 Runden. Setzt Position, Statuseffektstapel und Lebenspunkte zurück"
     }
    ]
   },
   {
    "name": "Auflösung",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Du hast eine Chance von 30 oder 60 oder 90 Prozent, einen aktiven Zauber in einer Reichweite von 3 oder 6 oder 9 Meter komplett aufzulösen und zu beenden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "effekt": "30 Prozent Chance einen aktiven Zauber aufzulösen"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "effekt": "60 Prozent Chance einen aktiven Zauber aufzulösen"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "effekt": "90 Prozent Chance einen aktiven Zauber aufzulösen"
     }
    ]
   },
   {
    "name": "Ketten des Jenseits",
    "ast": "Fluchbrecher",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Trifft 2 oder 3 oder 4 Ziele in einer Reichweite von 2 oder 4 oder 6 Meter. Belegt die Ziele für 5 Runden mit einem Malus von minus 10 auf Handeln. Ziele müssen einen Willenskraftwurf mit einem Malus von minus 20 ablegen, ansonsten wird ihre Bewegungsweite reduziert und sie können sich für eine Dauer von 1 oder 2 oder 3 Runden überhaupt nicht bewegen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Trifft 2 Ziele. 5 Runden lang minus 10 Handeln. Willenskraftwurf minus 20 oder 1 Runde bewegungsunfähig"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Trifft 3 Ziele. 5 Runden lang minus 10 Handeln. Willenskraftwurf minus 20 oder 2 Runden bewegungsunfähig"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Trifft 4 Ziele. 5 Runden lang minus 10 Handeln. Willenskraftwurf minus 20 oder 3 Runden bewegungsunfähig"
     }
    ]
   },
   {
    "name": "Feuerfaust",
    "ast": "Hitzeklinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch im Nahkampf. Ziele links und rechts neben deinem Hauptziel sowie dahinter erhalten 1 oder 2 oder 3W10 Schaden und plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "Trifft Felder links, rechts und hinter dem Ziel. Gewährt plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Trifft Felder links, rechts und hinter dem Ziel. Gewährt plus 1 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft Felder links, rechts und hinter dem Ziel. Gewährt plus 1 Feuermarker"
     }
    ]
   },
   {
    "name": "Funke",
    "ast": "Hitzeklinge",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch auf eine Reichweite von 2 oder 4 oder 6 Meter. Du belegst ein Ziel mit plus 1 oder 2 oder 3 Feuermarkern und kannst es so in Brand setzen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schadenArt": "magisch",
      "effekt": "Setzt ein Ziel in Brand und gewährt plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schadenArt": "magisch",
      "effekt": "Setzt ein Ziel in Brand und gewährt plus 2 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Setzt ein Ziel in Brand und gewährt plus 3 Feuermarker"
     }
    ]
   },
   {
    "name": "Körper aus Stein",
    "ast": "Hitzeklinge",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 3 oder 5 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 3 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Wirbeltritt",
    "ast": "Hitzeklinge",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 an 2 oder 3 oder 4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei einem misslungenem Schwellenwert-Wurf von minus 15 werden Ziele um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     }
    ]
   },
   {
    "name": "Brandstifter",
    "ast": "Hitzeklinge",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch. Hast du zu Beginn deiner Runde selbst mindestens 2 oder 1 oder 1 Feuermarker auf dir aktiv, erhalten alle noch nicht brennenden Ziele in einer Reichweite von 1 oder 1 oder 2 Meter automatisch plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter",
      "schadenArt": "magisch",
      "effekt": "Erfordert mindestens 2 eigene Feuermarker. Gewährt Zielen plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "1 Meter",
      "schadenArt": "magisch",
      "effekt": "Erfordert mindestens 1 eigenen Feuermarker. Gewährt Zielen plus 1 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "2 Meter",
      "schadenArt": "magisch",
      "effekt": "Erfordert mindestens 1 eigenen Feuermarker. Gewährt Zielen plus 1 Feuermarker"
     }
    ]
   },
   {
    "name": "Brandverstärker",
    "ast": "Hitzeklinge",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 or 3W4 zusätzlichen Schaden pro auf dem Ziel aktivem Feuermarker. Das Ganze ist auf maximal 5 Feuermarker begrenzt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Feuermarker",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Feuermarker begrenzt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Feuermarker",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Feuermarker begrenzt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Feuermarker",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Feuermarker begrenzt"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Hitzeklinge",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch ausgeführt als 2 oder 3 oder 4 Nahkampfangriffe auf ein einziges Ziel. Besitzt 10 oder 15 oder 20 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Entfacher",
    "ast": "Hitzeklinge",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch im Nahkampf. In den nächsten 3 oder 4 oder 5 Runden verursachen all deine Angriffe zusätzlich plus 1 oder 2 oder 2 Feuermarker. Nach der Aktivierung des Skills erhältst du selbst sofort plus 2 oder 2 oder 1 Feuermarker. Fängt ein Ziel durch diesen Skill neu an zu brennen, erhält es zusätzlich sofort 2 oder 3 or 4W10 Schaden. Geht das Feuer an dir selbst aus bevor die Wirkungsdauer vorbei ist erlischt auch der gesamte Skill.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10 bei Entzündung",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. Angriffe geben plus 1 Feuermarker. Anwender erhält plus 2 Feuermarker. Erlischt wenn eigenes Feuer ausgeht"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10 bei Entzündung",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. Angriffe geben plus 2 Feuermarker. Anwender erhält plus 2 Feuermarker. Erlischt wenn eigenes Feuer ausgeht"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 4W10 bei Entzündung",
      "schadenArt": "magisch",
      "effekt": "Hält 5 Runden. Angriffe geben plus 2 Feuermarker. Anwender erhält plus 1 Feuermarker. Erlischt wenn eigenes Feuer ausgeht"
     }
    ]
   },
   {
    "name": "Brennender Kreis",
    "ast": "Hitzeklinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 im Umkreis von 1 oder 2 oder 3 Meter. Alle Personen im Umkreis erhalten Feuerschaden und plus 1 oder 2 oder 3 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 2 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 3 Feuermarker"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Hitzeklinge",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Inferno",
    "ast": "Hitzeklinge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 auf eine Distanz von 10 oder 15 oder 20 Meter. Du kannst diesen Skill 1 oder 2 oder 3-mal pro Kampf einsetzen. Das Ziel erleidet Schaden und erhält zusätzlich plus 2 Feuermarker. Nach der Anwendung hat der Skill 3 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf nutzbar. Gewährt plus 2 Feuermarker. 3 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "15 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf nutzbar. Gewährt plus 2 Feuermarker. 3 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "20 Meter",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf nutzbar. Gewährt plus 2 Feuermarker. 3 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Blutschuss",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch in einer Reichweite von 5 Meter. Erzeuge aus deinem Blut durch das Opfern von 1W8 Lebenspunkten pro Kugel insgesamt 2 oder 3 oder 4 Blutkugeln. Jede Kugel verursacht 2W10 Schaden. Du kannst die Kugeln auf bis zu 3 verschiedene Ziele schießen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 2 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "3 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 3 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "4 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 4 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     }
    ]
   },
   {
    "name": "Körper aus Stein",
    "ast": "Kultist",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 3 oder 5 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 3 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Wirbeltritt",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 an 2 oder 3 oder 4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei einem misslungenem Schwellenwert-Wurf von minus 15 werden Ziele um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     }
    ]
   },
   {
    "name": "Blutdurst",
    "ast": "Kultist",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 oder 3W4 zusätzlichen Schaden pro auf dem Ziel aktivem Blutmarker beziehungsweise aktiver Blutung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     }
    ]
   },
   {
    "name": "Bluthund",
    "ast": "Kultist",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch. Für eine Dauer von 1 oder 2 oder 3 Runden visierst du ein verletztes Ziel in einer Reichweite von 5 oder 10 oder 15 Meter an. Gewährt plus 5 oder 10 oder 15 auf Angriffe gegen dieses Ziel und plus 2 oder 3 oder 4W10 Schaden. Angriffe auf andere Ziele erhalten einen Malus von minus 20. Hat das anvisierte Ziel eine Blutung, verursacht der Skill zusätzlichen 1W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. plus 5 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. plus 10 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. plus 15 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch ausgeführt als 2 oder 3 oder 4 Nahkampfangriffe auf ein einziges Ziel. Besitzt 10 oder 15 oder 20 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Klingen Klauensturm",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft alle angrenzenden 1 oder 1 oder 2 Felder um den Anwender herum mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "2 angrenzende Felder Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 2. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Nur eine Fleischwunde",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Fügt dem anvisierten Ziel heftige Blutungen im Wert von plus 4 oder 5 oder 6 Blutungsmarkern zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 4 Blutungsmarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 5 Blutungsmarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 6 Blutungsmarker"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Kultist",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Blutexpansion",
    "ast": "Kultist",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 im Nahkampf. Verursacht plus 2 oder 3 oder 4 Blutungen. Du fügst dir selbst sofort 2 oder 1 oder 1W10 Schaden und ohne einen Rettungswurf sofort plus 1 eigene Blutung zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "plus 2 Blutungen auf das Ziel. Anwender erleidet 2W10 Eigenschaden und plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "plus 3 Blutungen auf das Ziel. Anwender erleidet 1W10 Eigenschaden und plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "plus 4 Blutungen auf das Ziel. Anwender erleidet 1W10 Eigenschaden und plus 1 Blutung"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Giftmischer",
    "ast": "Pestbringer",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Macht Schaden magisch auf ein einzelnes Ziel. Die nächsten 1 oder 2 oder 3 Nahkampfangriffe und Fernkampfangriffe verursachen für 1 oder 2 oder 3 Runden Gift mit Giftstufe 1 oder 2 oder 3.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "1 Angriff verursacht Giftstufe 1 für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "2 Angriffe verursachen Giftstufe 2 für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "3 Angriffe verursachen Giftstufe 3 für 3 Runden"
     }
    ]
   },
   {
    "name": "Verstärker der Leiden",
    "ast": "Pestbringer",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Du machst plus 1 oder 2 oder 3W10 zusätzlichen Schaden pro verschiedenen negativen Statuseffekt auf dem Ziel wie Blutung, Giftstufe und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 1W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 2W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 3W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     }
    ]
   },
   {
    "name": "Körper aus Stein",
    "ast": "Pestbringer",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 3 oder 5 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 3 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Wirbeltritt",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 an 2 oder 3 oder 4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei einem misslungenem Schwellenwert-Wurf von minus 15 werden Ziele um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     }
    ]
   },
   {
    "name": "Seuchenstoß",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 im Nahkampf oder Fernkampf. Verursacht zusätzlich Giftstufe 2 oder 3 oder 4. Hat das Ziel bereits mindestens eine Blutung oder einen Feuermarker, erhöht sich das applizierte Gift um plus 1 zusätzliche Stufe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2. Giftstufe steigt um plus 1 wenn das Ziel blutet oder brennt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3. Giftstufe steigt um plus 1 wenn das Ziel blutet oder brennt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4. Giftstufe steigt um plus 1 wenn das Ziel blutet oder brennt"
     }
    ]
   },
   {
    "name": "Giftsymbiose",
    "ast": "Pestbringer",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 oder 3W4 zusätzlichen Schaden pro auf dem Ziel aktiver Giftstufe. Der Bonus ist auf maximal 5 Giftstufen begrenzt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch ausgeführt als 2 oder 3 oder 4 Nahkampfangriffe auf ein einziges Ziel. Besitzt 10 oder 15 oder 20 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Klingen Klauensturm",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft alle angrenzenden 1 oder 1 oder 2 Felder um den Anwender herum mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "2 angrenzende Felder Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 2. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Giftwolke",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch. Erschafft in einer Reichweite von 5 oder 7 oder 10 Meter eine Wolke mit einer Fläche von 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter. Alle Personen in der Wolke werden mit Giftstufe 4 oder 5 oder 6 vergiftet. Zudem erleiden sie in der Wolke einen Malus von minus 10 auf Wahrnehmung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf Zone 2 mal 2 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4. minus 10 Wahrnehmung in der Wolke"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Distanz auf Zone 2 mal 2 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 5. minus 10 Wahrnehmung in der Wolke"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Distanz auf Zone 3 mal 3 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 6. minus 10 Wahrnehmung in der Wolke"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Fauler Atem",
    "ast": "Pestbringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch im Umkreis von 1 oder 2 oder 3 Meter. Alle Personen im Umkreis werden mit Giftstufe 3 oder 4 oder 5 vergiftet, erhalten plus 2 oder 3 oder 4 Feuermarker und fangen an zu bluten mit plus 1 oder 2 oder 3 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3, plus 2 Feuermarker und plus 1 Blutung bei allen Zielen"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4, plus 3 Feuermarker und plus 2 Blutungen bei allen Zielen"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 5, plus 4 Feuermarker und plus 3 Blutungen bei allen Zielen"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Beruhigende Aura",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 1 oder 2 oder 3W10 im Umkreis von 2 oder 4 oder 6 Meter. Verbündete heilen Lebenspunkte und können 1 oder 1 oder 2 negative Statuseffekte entfernen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "1W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 2 negative Statuseffekte"
     }
    ]
   },
   {
    "name": "Bodyslam",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch von 2 oder 3 oder 4W10 im Nahkampf. Funktioniert nur, wenn du dich in dieser Runde mindestens 2 Meter bewegt hast. Das Ziel fliegt nach einem misslungenen Schwellenwert-Wurf um 1 oder 2 oder 3W4 Meter zurück.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 2W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 3W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Rum-Prediger",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Heilende Hand",
    "ast": "Rum-Prediger",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 im Nahkampf. Du heilst einen Verbündeten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt einen Verbündeten"
     }
    ]
   },
   {
    "name": "Aura der Rast",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Erschafft für eine Dauer von 2 oder 3 oder 4 Runden eine Aura mit einem Umkreis von 2 oder 3 oder 4 Meter. Du heilst jeden Freund um plus 2 oder 3 oder 4W10 Heilung, der seine Runde in deiner Aura startet. Ein negativer Statuseffektstapel seiner Wahl wird um 1 oder 2 oder 3 schwächer.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "plus 2W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 2 Runden. Reduziert einen Statuseffektstapel der Wahl um 1"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "plus 3W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 3 Runden. Reduziert einen Statuseffektstapel der Wahl um 2"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "plus 4W10",
      "schadenArt": "Heilung",
      "effekt": "Hält 4 Runden. Reduziert einen Statuseffektstapel der Wahl um 3"
     }
    ]
   },
   {
    "name": "Letzte Chance",
    "ast": "Rum-Prediger",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilung von plus 3 oder 4 oder 5W10 an dich selbst auf ein einzelnes Ziel. Gewährt plus 10 Rüstung, wenn deine Lebenspunkte kleiner oder gleich 10 sind.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung Lebenspunkte kleiner gleich 10. Heilt 3W10 und gewährt plus 10 Rüstung"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung Lebenspunkte kleiner gleich 10. Heilt 4W10 und gewährt plus 10 Rüstung"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Bedingung Lebenspunkte kleiner gleich 10. Heilt 5W10 und gewährt plus 10 Rüstung"
     }
    ]
   },
   {
    "name": "Uppercut",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 im Nahkampf. Der Angriff besitzt 5 oder 10 oder 15 rüstungsbrechend. Das Ziel vor dir erleidet Schaden und wird 1 oder 2 oder 3W4 Meter zurückgeschleudert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. Schleudert das Ziel 2W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. Schleudert das Ziel 3W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Wache!",
    "ast": "Rum-Prediger",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Erlaubt 2 oder 3 oder 4 Gelegenheitsangriffe im Nahkampf oder Fernkampf pro Kampf. Ermöglicht Angriffe auf Gegner, die deine Kampfreichweite betreten, verlassen oder durchqueren.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "2 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "3 Gelegenheitsangriffe pro Kampf"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "4 Gelegenheitsangriffe pro Kampf"
     }
    ]
   },
   {
    "name": "Göttlicher Schild",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Heilung von 4 oder 5 oder 6W10 auf eine Distanz von 3 oder 5 oder 7 Meter. Gewährt plus 5 oder 10 oder 15 Rüstung für 1 oder 2 oder 3 Ziele über eine Dauer von 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Trifft 1 Ziel. Gewährt plus 5 Rüstung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Trifft bis zu 2 Ziele. Gewährt plus 10 Rüstung für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Trifft bis zu 3 Ziele. Gewährt plus 15 Rüstung für 3 Runden"
     }
    ]
   },
   {
    "name": "Welle der Heilung",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Aura heilt jeden Verbündeten im Umkreis von 2 oder 4 oder 6 Meter um 4 oder 5 oder 6W10 Heilung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     }
    ]
   },
   {
    "name": "Panzerbrecher",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Das Ziel verliert für eine Dauer von 1 oder 2 oder 3 Runden minus 10 oder 20 oder 30 Rüstung auf eine Reichweite von 2 oder 4 oder 6 Meter. Dieser Effekt ist nicht stapelbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Ziel verliert 10 Rüstung für 1 Runde. Nicht stapelbar"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Ziel verliert 20 Rüstung für 2 Runden. Nicht stapelbar"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Ziel verliert 30 Rüstung für 3 Runden. Nicht stapelbar"
     }
    ]
   },
   {
    "name": "Strahl der Gebete",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 4,
    "info": "Heilung von 5 oder 6 oder 7W10. Ein Strahl mit einer Länge von 4 oder 8 oder 12 Meter heilt alle getroffenen Ziele und entfernt zusätzlich 1 oder 2 oder 3 negative Statuseffekte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "4 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt die Linie und entfernt 1 negativen Statuseffekt"
     },
     {
      "level": 2,
      "reichweite": "8 Meter Linie",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt die Linie und entfernt 2 negative Statuseffekte"
     },
     {
      "level": 3,
      "reichweite": "12 Meter Linie",
      "schaden": "7W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt die Linie und entfernt 3 negative Statuseffekte"
     }
    ]
   },
   {
    "name": "Raserei",
    "ast": "Rum-Prediger",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf. Führe bis zu 4 oder 5 oder 6 Angriffe aus, die 5 oder 10 oder 15 rüstungsbrechend besitzen. Die Angriffskette läuft so lange weiter, bis der erste Angriff verfehlt. Jeder Folgeantriff erhält einen Malus von minus 5 auf Nahkampf. Nach dem Ende der Raserei verfällt der Charakter für 1W4 Runden in tiefen Schlaf. Blutet das Ziel, verursacht der Skill plus 1W4 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 4 Angriffe",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 5 Angriffe",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 6 Angriffe",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Beruhigende Aura",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung im Umkreis. Verbündete heilen Lebenspunkte und können 1 oder 1 oder 2 negative Statuseffekte entfernen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Umkreis",
      "schaden": "wie Basis",
      "schadenArt": "Heilung",
      "effekt": "Verbündete können 1 negativen Statuseffekt entfernen"
     },
     {
      "level": 2,
      "reichweite": "Umkreis",
      "schaden": "wie Basis",
      "schadenArt": "Heilung",
      "effekt": "Verbündete können 1 negativen Statuseffekt entfernen"
     },
     {
      "level": 3,
      "reichweite": "Umkreis",
      "schaden": "wie Basis",
      "schadenArt": "Heilung",
      "effekt": "Verbündete können 2 negative Statuseffekte entfernen"
     }
    ]
   },
   {
    "name": "Dornenhaut",
    "ast": "Seher der Tiefsee",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch. Gewährt plus 5 Rüstung für eine Dauer von 1 oder 2 oder 3 Runden. Gegner, die dich im Nahkampf angreifen, erleiden automatisch 1 oder 2 oder 3W10 Schaden. Kann auch aktiv genutzt werden, um auf einen Verbündeten in einer Reichweite von 1 oder 3 oder 5 Meter die Dornenhaut zu zaubern.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 1 Runde. Angreifer erleiden 1W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 2 Runden. Angreifer erleiden 2W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 3 Runden. Angreifer erleiden 3W10 Schaden"
     }
    ]
   },
   {
    "name": "Fluch",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Du selbst bekommst 3 oder 2 oder 1W10 Schaden. 1 oder 1 oder 2 Ziele bekommen Schaden und schlafen zu 20 oder 40 oder 60 Prozent für 1W4 Runden. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 3W10 Eigenschaden. 1 Ziel schläft zu 20 Prozent für 1W4 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 2W10 Eigenschaden. 1 Ziel schläft zu 40 Prozent für 1W4 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 1W10 Eigenschaden. 2 Ziele schlafen zu 60 Prozent für 1W4 Runden"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Seher der Tiefsee",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Knochengriff",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Ein Ziel in einer Reichweite von 10 Meter erhält für eine Dauer von 1 oder 2 oder 3 Runden minus 1 oder 2 oder 3 Meter Bewegung und minus 10 auf Handeln.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "effekt": "minus 1 Meter Bewegung und minus 10 auf Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "minus 2 Meter Bewegung und minus 10 auf Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "minus 3 Meter Bewegung und minus 10 auf Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Atem der Verwesung",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Feuert einen Strahl, der 1 oder 2 oder 3 Gegnern Schaden verursacht und diese zusätzlich mit Giftstufe 2 oder 3 oder 4 vergiftet. Angrenzende Personen erhalten ebenfalls das Gift.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Strahl",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 1 Gegner. Verursacht Giftstufe 2. Angrenzende Personen werden vergiftet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Strahl",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 2 Gegner. Verursacht Giftstufe 3. Angrenzende Personen werden vergiftet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Strahl",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 3 Gegner. Verursacht Giftstufe 4. Angrenzende Personen werden vergiftet"
     }
    ]
   },
   {
    "name": "Giftsymbiose",
    "ast": "Seher der Tiefsee",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 oder 3W4 zusätzlichen Schaden pro auf dem Ziel aktiver Giftstufe. Der Bonus ist auf maximal 5 Giftstufen begrenzt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     }
    ]
   },
   {
    "name": "Toxischer Ausbruch",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Du schädigst einem Ziel in Reichweite und verursachst Giftstufe 2 oder 3 oder 4. Hat das Ziel mindestens 1 Blutung erhält es zusätzlich plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Wurzelwucher",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Fügt einem Ziel in einer Reichweite von 2 oder 4 oder 6 Meter Giftstufe 1 oder 2 oder 3 und plus 1 oder 1 oder 2 Blutungen zu. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad 5 oder 10 oder 15 bestehen, um sich aus dem Wucher zu befreien.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 1 und plus 1 Blutung. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2 und plus 1 Blutung. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3 und plus 2 Blutungen. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad 15"
     }
    ]
   },
   {
    "name": "Dornenpanzer",
    "ast": "Seher der Tiefsee",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Gewährt einem einzelnen Ziel plus 10 oder 15 oder 20 Rüstung für eine Dauer von 2 oder 3 oder 4 Runden. Gegner erleiden automatisch 3 oder 4 oder 5W10 Schaden bei Nahkampfangriffen gegen das geschützte Ziel.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. plus 10 Rüstung. Angreifer erleiden 3W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 15 Rüstung. Angreifer erleiden 4W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Angreifer erleiden 5W10 Schaden"
     }
    ]
   },
   {
    "name": "Geisterflamme",
    "ast": "Seher der Tiefsee",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Deine magischen Fähigkeiten verursachen permanent plus 1 Feuermarker und erhalten einen rüstungsbrechenden Durchschlag von plus 5 oder 10 oder 15 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 5 rüstungsbrechend permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 10 rüstungsbrechend permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 15 rüstungsbrechend permanent"
     }
    ]
   },
   {
    "name": "Verfluchter Kreis",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Erschafft für eine Dauer von 1 oder 2 oder 3 Runden eine Zone der Größe 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter in einer Reichweite von 3 oder 6 oder 9 Meter. Verursacht plus 1 oder 1 oder 2W10 Schaden. Alle Ziele in der Zone erleiden einen Malus von minus 5 oder minus 10 oder minus 15 auf all ihre Proben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "Hält 1 Runde. minus 5 auf alle Proben in der Zone"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. minus 10 auf alle Proben in der Zone"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. minus 15 auf alle Proben in der Zone"
     }
    ]
   },
   {
    "name": "Fauler Atem",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch im Umkreis von 1 oder 2 oder 3 Meter. Alle Personen im Umkreis werden mit Giftstufe 3 oder 4 oder 5 vergiftet, erhalten plus 2 oder 3 oder 4 Feuermarker und fangen an zu bluten mit plus 1 oder 2 oder 3 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3, plus 2 Feuermarker und plus 1 Blutung bei allen Zielen"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4, plus 3 Feuermarker und plus 2 Blutungen bei allen Zielen"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 5, plus 4 Feuermarker und plus 3 Blutungen bei allen Zielen"
     }
    ]
   },
   {
    "name": "Waldgedicht",
    "ast": "Seher der Tiefsee",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch auf eine Reichweite von 2 oder 4 oder 6 Meter. Alle Feinde im betroffenen Umkreis werden mit Giftstufe 4 oder 5 oder 6 infiziert und erleiden zusätzlich plus 2 oder 3 oder 4 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Alle Feinde im Umkreis erhalten Giftstufe 4 und plus 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Alle Feinde im Umkreis erhalten Giftstufe 5 und plus 3 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Alle Feinde im Umkreis erhalten Giftstufe 6 und plus 4 Blutungen"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite and minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Donnerwelle",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Bei einer Verwundung besteht eine Chance von 15 oder 20 oder 25 Prozent, dass das Ziel für 3 Runden minus 1 oder 2 oder 3 Meter seiner Bewegung verliert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 15 Prozent Chance auf minus 1 Meter Bewegung für 3 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 20 Prozent Chance auf minus 2 Meter Bewegung für 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 25 Prozent Chance auf minus 3 Meter Bewegung für 3 Runden"
     }
    ]
   },
   {
    "name": "Stromstoß",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Nahkampfreichweite von 2 Meter. Du machst plus 2W10 zusätzlichen Schaden pro Rüstungsklasse des Gegners.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     },
     {
      "level": 2,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     },
     {
      "level": 3,
      "reichweite": "2 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     }
    ]
   },
   {
    "name": "Körper aus Stein",
    "ast": "Sturmwüter",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 3 oder 5 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 3 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Wirbeltritt",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 an 2 oder 3 oder 4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei einem misslungenem Schwellenwert-Wurf von minus 15 werden Ziele um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     }
    ]
   },
   {
    "name": "Kettenblitz",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10. Trifft 2 oder 3 oder 4 Gegner, die sich jeweils in einem Umkreis von maximal 3 Meter zueinander befinden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 2 Gegner nacheinander"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 3 Gegner nacheinander"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 4 Gegner nacheinander"
     }
    ]
   },
   {
    "name": "Hochspannung",
    "ast": "Sturmwüter",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Nahkampfangriffe machen permanent mehr Schaden basierend auf der gegnerischen Rüstungsklasse. Du verursachst plus 1 oder 2 oder 3W8 zusätzlichen Schaden pro Rüstungsklasse des Ziels.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch ausgeführt als 2 oder 3 oder 4 Nahkampfangriffe auf ein einziges Ziel. Besitzt 10 oder 15 oder 20 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Klingen Klauensturm",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft alle angrenzenden 1 oder 1 oder 2 Felder um den Anwender herum mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "2 angrenzende Felder Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 2. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Blitzangriff",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Du stürmst nach vorn und alle 3 oder 4 oder 5 Gegner im Laufweg werden getroffen. Jeder erleidet Schaden und erhält 1 Statusveränderung, durch die er zu 20 oder 30 oder 40 Prozent betäubt wird.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Ansturm",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 3 Gegner im Laufweg. 1 Statusveränderung mit 20 Prozent Betäubungschance"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Ansturm",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 4 Gegner im Laufweg. 1 Statusveränderung mit 30 Prozent Betäubungschance"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Ansturm",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 5 Gegner im Laufweg. 1 Statusveränderung mit 40 Prozent Betäubungschance"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Sturmwüter",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Sturmfokus",
    "ast": "Sturmwüter",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Effekt auf ein einzelnes Ziel. Für eine Dauer von 2 oder 3 oder 4 Runden machst du zusätzlichen magischen Blitzschaden von plus 2 oder 3 oder 4W10. Du verursachst zudem plus 1 oder 2 oder 3W8 zusätzlichen Blitzschaden pro Rüstungsklasse des Ziels. Ist das Ziel bereits betäubt, machst du plus 2W10 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 2W10 Blitzschaden",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. plus 1W8 pro Rüstungsklasse. plus 2W10 Schaden bei Betäubung"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 3W10 Blitzschaden",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 2W8 pro Rüstungsklasse. plus 2W10 Schaden bei Betäubung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 4W10 Blitzschaden",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 3W8 pro Rüstungsklasse. plus 2W10 Schaden bei Betäubung"
     }
    ]
   },
   {
    "name": "Monster Form",
    "ast": "Tiefseepirat",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt dir in deiner Monsterform permanent zusätzliche plus 25 oder 50 oder 75 Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 25 Lebenspunkte in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 50 Lebenspunkte in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 75 Lebenspunkte in Monsterform"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Donnerwelle",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Bei einer Verwundung besteht eine Chance von 15 oder 20 oder 25 Prozent, dass das Ziel für 3 Runden minus 1 oder 2 oder 3 Meter seiner Bewegung verliert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 15 Prozent Chance auf minus 1 Meter Bewegung für 3 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 20 Prozent Chance auf minus 2 Meter Bewegung für 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 25 Prozent Chance auf minus 3 Meter Bewegung für 3 Runden"
     }
    ]
   },
   {
    "name": "Wasserpeitsche",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das getroffene Ziel wird um 1W4 Meter zurückgeschleudert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Blutiger Zorn",
    "ast": "Tiefseepirat",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Du erhältst für 1 oder 2 oder 3 Runden eine zusätzliche Attacke in Aktion A auf ein einzelnes Ziel. Du erleidest dafür sofort 2 oder 1 oder 0 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 1 Runde. Erhältst sofort 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 2 Runden. Erhältst sofort 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 3 Runden. Erhältst sofort 0 Blutungen"
     }
    ]
   },
   {
    "name": "Aquaknarre",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad 5 oder 10 oder 15 bestehen, ansonsten wird es 1W4 Meter weggespült. Bei der Benutzung löschst du alle Feuermarker bei dir selbst und deinem Ziel komplett. Nach Anwendung des Skills hast du 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 5 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 10 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 15 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Blutdurst",
    "ast": "Tiefseepirat",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 oder 3W4 zusätzlichen Schaden pro auf dem Ziel aktivem Blutmarker beziehungsweise aktiver Blutung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     }
    ]
   },
   {
    "name": "Gieriger Biss",
    "ast": "Tiefseepirat",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 im Nahkampf. Besitzt 0 oder 5 oder 10 rüstungsbrechend. Nur nutzbar, wenn du dich selbst unter 50 Prozent deiner maximalen Lebenspunkte befindest. Du erhältst den gesamten verursachten Schaden als Heilung gutgeschrieben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 0 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 5 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 10 rüstungsbrechend. Heilt dich um den Schaden"
     }
    ]
   },
   {
    "name": "Ruckzuckhieb",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10. Du springst auf eine Distanz von 2 oder 4 oder 6 Meter zum Gegner, fügst Schaden zu und kannst dann zurückspringen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     }
    ]
   },
   {
    "name": "Dornenpanzer",
    "ast": "Tiefseepirat",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Gewährt einem einzelnen Ziel plus 10 oder 15 oder 20 Rüstung für eine Dauer von 2 oder 3 oder 4 Runden. Gegner erleiden automatisch 3 oder 4 oder 5W10 Schaden bei Nahkampfangriffen gegen das geschützte Ziel.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. plus 10 Rüstung. Angreifer erleiden 3W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 15 Rüstung. Angreifer erleiden 4W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Angreifer erleiden 5W10 Schaden"
     }
    ]
   },
   {
    "name": "Meuchelmörder",
    "ast": "Tiefseepirat",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Erhöht deinen Schaden für 1 oder 2 oder 3 Runden um plus 2 oder 3 oder 4W10 und verursacht zusätzlich Giftstufe 2 oder 3 oder 4. Das applizierte Gift ist um eine Giftstufe höher, wenn das Ziel bereits eine Blutung hat.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W10",
      "schadenArt": "magisch",
      "effekt": "Hält 1 Runde. Verursacht Giftstufe 2. Giftstufe plus 1 wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W10",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. Verursacht Giftstufe 3. Giftstufe plus 1 wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 4W10",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. Verursacht Giftstufe 4. Giftstufe plus 1 wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Ultraschall",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Erschafft eine Schallwelle im Umkreis von 3 oder 5 oder 10 Meter. Alle betroffenen Personen im Umkreis können für eine Dauer von 1 oder 2 oder 2 Runden keinerlei aktive Fähigkeiten einsetzen. Nur passive Fähigkeiten bleiben aktiv.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Blockiert alle aktiven Fähigkeiten im Umkreis für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Umkreis",
      "effekt": "Blockiert alle aktiven Fähigkeiten im Umkreis für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Umkreis",
      "effekt": "Blockiert alle aktiven Fähigkeiten im Umkreis für 2 Runden"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Raserei",
    "ast": "Tiefseepirat",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf. Führe bis zu 4 oder 5 oder 6 Angriffe aus, die 5 oder 10 oder 15 rüstungsbrechend besitzen. Die Angriffskette läuft so lange weiter, bis der erste Angriff verfehlt. Jeder Folgeantriff erhält einen Malus von minus 5 auf Nahkampf. Nach dem Ende der Raserei verfällt der Charakter für 1W4 Runden in tiefen Schlaf. Blutet das Ziel, verursacht der Skill plus 1W4 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 4 Angriffe",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 5 Angriffe",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 6 Angriffe",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Frosthauch",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das Ziel verliert für seine nächste Runde minus 1 oder 2 oder 3 Meter seiner Bewegung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 1 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 2 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 3 Meter Bewegung für die nächste Runde"
     }
    ]
   },
   {
    "name": "Wasserpeitsche",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das getroffene Ziel wird um 1W4 Meter zurückgeschleudert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Körper aus Stein",
    "ast": "Wellenringer",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 3 oder 5 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 3 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Wirbeltritt",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 an 2 oder 3 oder 4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei einem misslungenem Schwellenwert-Wurf von minus 15 werden Ziele um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     }
    ]
   },
   {
    "name": "Aquaknarre",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad 5 oder 10 oder 15 bestehen, ansonsten wird es 1W4 Meter weggespült. Bei der Benutzung löschst du alle Feuermarker bei dir selbst und deinem Ziel komplett. Nach Anwendung des Skills hast du 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 5 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 10 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 15 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Eisfeld",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 2 oder 3 oder 4W10. Erschafft in einer Reichweite von 5 oder 7 oder 10 Meter ein Eisfeld mit einer Fläche von 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter. Gegner, die ihre Runde dort starten, erleiden den Schaden und ihre Bewegungsweite wird um die Hälfte verringert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch ausgeführt als 2 oder 3 oder 4 Nahkampfangriffe auf ein einziges Ziel. Besitzt 10 oder 15 oder 20 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Klingen Klauensturm",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft alle angrenzenden 1 oder 1 oder 2 Felder um den Anwender herum mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "1 angrenzendes Feld Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 1. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "2 angrenzende Felder Radius",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft alle angrenzenden Felder im Radius 2. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Wasserschild",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Ein Ziel in einer Reichweite von 3 oder 6 oder 9 Meter erhält für eine Dauer von 3 oder 4 oder 5 Runden eine magische Rüstung von plus 10 oder 20 oder 30 Rüstung. Alle aktiven Feuermarker auf dem Ziel erlöschen sofort und erlittener Feuerschaden wird um minus 50 Prozent reduziert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 10 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 5 Runden. plus 30 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     }
    ]
   },
   {
    "name": "Hinrichtung",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch von 7 oder 8 oder 9W10 im Nahkampf. Nur auf verletzte Ziele anwendbar. Stirbt das Ziel durch diesen Angriff, war die Hinrichtung keine Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "9W10",
      "schadenArt": "physisch",
      "effekt": "Nur auf verletzte Ziele. Kostet keine Aktion wenn das Ziel stirbt"
     }
    ]
   },
   {
    "name": "Welle",
    "ast": "Wellenringer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Ist 1 oder 1 oder 2-mal pro Kampf nutzbar. Eine Welle mit einer Breite von 2 oder 3 oder 4 Meter trifft die ersten Gegner in ihrer Bahn. Die betroffenen Gegner werden bei einem misslungenen Stärkewurf um 1 oder 2 oder 3W4 Meter mitgerissen. Nach Anwendung des Skills hat der Zauber 3 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Distanz auf 2 Meter breite Welle",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Bei misslungenem Stärkewurf 1W4 Meter mitgerissen. 3 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Distanz auf 3 Meter breite Welle",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Bei misslungenem Stärkewurf 2W4 Meter mitgerissen. 3 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Distanz auf 4 Meter breite Welle",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Bei misslungenem Stärkewurf 3W4 Meter mitgerissen. 3 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Blutschuss",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch in einer Reichweite von 5 Meter. Erzeuge aus deinem Blut durch das Opfern von 1W8 Lebenspunkten pro Kugel insgesamt 2 oder 3 oder 4 Blutkugeln. Jede Kugel verursacht 2W10 Schaden. Du kannst die Kugeln auf bis zu 3 verschiedene Ziele schießen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 2 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "3 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 3 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "4 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 4 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     }
    ]
   },
   {
    "name": "Doppelhieb",
    "ast": "Blutmagier",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Erlaubt dir 1 oder 2 oder 3-mal pro Kampf einen Nahkampfangriff als Extra-Aktion auszuführen. Nach der Anwendung hat der Skill 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "1-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "2-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "3-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Monster",
    "ast": "Blutmagier",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt dir in deiner Monsterform permanent zusätzliche plus 25 oder 50 oder 75 Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 25 Lebenspunkte in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 50 Lebenspunkte in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 75 Lebenspunkte in Monsterform"
     }
    ]
   },
   {
    "name": "Wunden aufreißen",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen. Gilt als Extra-Aktion, wenn das Ziel bereits verletzt ist.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Blutdurst",
    "ast": "Blutmagier",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 oder 3W4 zusätzlichen Schaden pro auf dem Ziel aktivem Blutmarker beziehungsweise aktiver Blutung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Blutmarker",
      "schadenArt": "physisch",
      "effekt": "Erhöht den Schaden basierend auf den Blutungen des Ziels"
     }
    ]
   },
   {
    "name": "Bluthund",
    "ast": "Blutmagier",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch. Für eine Dauer von 1 oder 2 oder 3 Runden visierst du ein verletztes Ziel in einer Reichweite von 5 oder 10 oder 15 Meter an. Gewährt plus 5 oder 10 oder 15 auf Angriffe gegen dieses Ziel und plus 2 oder 3 oder 4W10 Schaden. Angriffe auf andere Ziele erhalten einen Malus von minus 20. Hat das anvisierte Ziel eine Blutung, verursacht der Skill zusätzlichen 1W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. plus 5 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. plus 10 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. plus 15 Angriff gegen das Ziel, minus 20 gegen andere. plus 1W10 Schaden bei Blutung"
     }
    ]
   },
   {
    "name": "Blutpeitsche",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 or 5W10 auf eine Distanz von 2 oder 4 oder 6 Meter. Das getroffene Ziel wird um 2 Meter näher zu dir gezogen und erleidet plus 1 oder 2 oder 3 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Zieht das Ziel 2 Meter näher. Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Zieht das Ziel 2 Meter näher. Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Zieht das Ziel 2 Meter näher. Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Lebensentzug",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Verursacht 4 oder 5 oder 6W10 magischen Schaden auf eine Reichweite von 3 oder 5 oder 10 Meter bei 1 oder 1 oder 2 Zielen. Du wirst um 50 Prozent des zugefügten Schadens geheilt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Ziel",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Ziel",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 3,
      "reichweite": "10 Meter auf 2 Ziele",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     }
    ]
   },
   {
    "name": "Nur eine Fleischwunde",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Fügt dem anvisierten Ziel heftige Blutungen im Wert von plus 4 oder 5 oder 6 Blutungsmarkern zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 4 Blutungsmarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 5 Blutungsmarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 6 Blutungsmarker"
     }
    ]
   },
   {
    "name": "Schneise",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf von plus 4 oder 5 oder 6W10. Besitzt 10 oder 15 oder 20 rüstungsbrechend. Du musst eine ganze Aktion beziehungsweise Runde lang diesen Skill aufladen. Danach triffst du alle Personen in einer 5 Meter langen, geraden Linie vor dir.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 10 rüstungsbrechend. Trifft alle Ziele in der Linie"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "plus 5W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 15 rüstungsbrechend. Trifft alle Ziele in der Linie"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "plus 6W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 20 rüstungsbrechend. Trifft alle Ziele in der Linie"
     }
    ]
   },
   {
    "name": "Teleport",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Teleportiere dich auf ein einzelnes Ziel oder freien Platz in einer Reichweite von 10 oder 15 oder 20 Meter. Dies ist 1 oder 2 oder 3-mal pro Kampf möglich. Bei 2 verbrauchten Aufladungen ist auch ein direkter Hin- und Rücksprung möglich.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter einzelnes Ziel",
      "effekt": "1-mal pro Kampf nutzbar"
     },
     {
      "level": 2,
      "reichweite": "15 Meter einzelnes Ziel",
      "effekt": "2-mal pro Kampf nutzbar. Hin- und Rückweg mit 2 Aufladungen möglich"
     },
     {
      "level": 3,
      "reichweite": "20 Meter einzelnes Ziel",
      "effekt": "3-mal pro Kampf nutzbar. Hin- und Rückweg mit 2 Aufladungen möglich"
     }
    ]
   },
   {
    "name": "Blutexpansion",
    "ast": "Blutmagier",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 im Nahkampf. Verursacht plus 2 oder 3 oder 4 Blutungen. Du fügst dir selbst sofort 2 oder 1 oder 1W10 Schaden und ohne einen Rettungswurf sofort plus 1 eigene Blutung zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "plus 2 Blutungen auf das Ziel. Anwender erleidet 2W10 Eigenschaden und plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "plus 3 Blutungen auf das Ziel. Anwender erleidet 1W10 Eigenschaden und plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "plus 4 Blutungen auf das Ziel. Anwender erleidet 1W10 Eigenschaden und plus 1 Blutung"
     }
    ]
   },
   {
    "name": "Federschritt",
    "ast": "Blutmagier",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von plus 5 oder 6 oder 7W10. Du greifst 3 oder 4 oder 5 Gegner nacheinander an und teleportierst diese jeweils auf eine Distanz von bis zu 5 Meter in eine gewünschte Richtung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Teleportdistanz",
      "schaden": "plus 5W10",
      "schadenArt": "magisch",
      "effekt": "Greift 3 Gegner nacheinander an und versetzt sie"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Teleportdistanz",
      "schaden": "plus 6W10",
      "schadenArt": "magisch",
      "effekt": "Greift 4 Gegner nacheinander an und versetzt sie"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Teleportdistanz",
      "schaden": "plus 7W10",
      "schadenArt": "magisch",
      "effekt": "Greift 5 Gegner nacheinander an und versetzt sie"
     }
    ]
   },
   {
    "name": "Magischer Schild",
    "ast": "Brandstifter der See",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt einem einzelnen Ziel für eine Dauer von 1 oder 2 oder 3 Runden plus 3 oder 5 oder 10 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 3 magische Rüstung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 5 magische Rüstung für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 10 magische Rüstung für 3 Runden"
     }
    ]
   },
   {
    "name": "Funke",
    "ast": "Brandstifter der See",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch auf eine Reichweite von 2 oder 4 oder 6 Meter. Du belegst ein Ziel mit plus 1 oder 2 oder 3 Feuermarkern und kannst es so in Brand setzen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schadenArt": "magisch",
      "effekt": "Setzt ein Ziel in Brand und gewährt plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schadenArt": "magisch",
      "effekt": "Setzt ein Ziel in Brand und gewährt plus 2 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Setzt ein Ziel in Brand und gewährt plus 3 Feuermarker"
     }
    ]
   },
   {
    "name": "Flamme",
    "ast": "Brandstifter der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 3 oder 5 oder 7 Meter. Du kannst 1 oder 2 oder 3-mal pro Kampf eine kleine Flamme auf deine Gegner werfen. Das getroffene Ziel erhält plus 1 Feuermarker. Nach Anwendung des Skills hast du 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf nutzbar. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf nutzbar. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf nutzbar. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Brandstifter der See",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Brandstifter der See",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Brandverstärker",
    "ast": "Brandstifter der See",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 oder 3W4 zusätzlichen Schaden pro auf dem Ziel aktivem Feuermarker. Das Ganze ist auf maximal 5 Feuermarker begrenzt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Feuermarker",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Feuermarker begrenzt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Feuermarker",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Feuermarker begrenzt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Feuermarker",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Feuermarker begrenzt"
     }
    ]
   },
   {
    "name": "Dunkle Rüstung",
    "ast": "Brandstifter der See",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du hast für 1 oder 2 oder 3 Runden lang eine magische Rüstung von plus 10 oder 15 oder 20 auf ein einzelnes Ziel. Du bist um 10 oder 20 oder 30 weniger gut zu erkennen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 1 Runde. plus 10 Rüstung und du bist um 10 weniger gut zu erkennen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 2 Runden. plus 15 Rüstung und du bist um 20 weniger gut zu erkennen"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 3 Runden. plus 20 Rüstung und du bist um 30 weniger gut zu erkennen"
     }
    ]
   },
   {
    "name": "Feuerball",
    "ast": "Brandstifter der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Das getroffene Ziel erhält plus 1 oder 1 oder 2 Feuermarker. Nach der Aktivierung hat der Skill 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Gewährt plus 2 Feuermarker. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Elementargeist Kleiner Teufel",
    "ast": "Brandstifter der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Beschwört auf ein einzelnes Ziel für eine Dauer von 2 oder 2 oder 3 Runden einen kleinen Teufel. Der Geist besitzt 30 oder 60 oder 90 Lebenspunkte und greift im Nahkampf mit einem Wert von 30 oder 40 oder 50 an um 2 oder 3 oder 4W10 Schaden zu verursachen. Je nach gewähltem Element von 1 oder 1 oder 2 Elementen parallel erhält er Zusatzeffekte. Eis-Element: Gewährt 0 oder 10 oder 15 rüstungsbrechend und verringert gegnerische Bewegung um minus 1 Meter. Baum-Element: Verursacht plus 1 Blutung und plus 1 Giftstufe. Feuer-Element: Verursacht plus 1 Feuermarker und plus 1W10 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10 Geist-Angriff",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. Geist hat 30 Lebenspunkte und 30 Nahkampf-Wert. Nutzt 1 Element"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10 Geist-Angriff",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. Geist hat 60 Lebenspunkte und 40 Nahkampf-Wert. Nutzt 1 Element"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10 Geist-Angriff",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. Geist hat 90 Lebenspunkte und 50 Nahkampf-Wert. Nutzt bis zu 2 Elemente gleichzeitig"
     }
    ]
   },
   {
    "name": "Brennender Kreis",
    "ast": "Brandstifter der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 im Umkreis von 1 oder 2 oder 3 Meter. Alle Personen im Umkreis erhalten Feuerschaden und plus 1 oder 2 oder 3 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 2 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 3 Feuermarker"
     }
    ]
   },
   {
    "name": "Feuersturm",
    "ast": "Brandstifter der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 auf eine Distanz von 5 oder 10 or 15 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Der Sturm hinterlässt plus 1 oder 1 oder 2 Feuermarker auf den getroffenen Zielen. Nach der Anwendung hat der Skill 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Gewährt plus 1 Feuermarker. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Gewährt plus 1 Feuermarker. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Gewährt plus 2 Feuermarker. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Geisterflamme",
    "ast": "Brandstifter der See",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Deine magischen Fähigkeiten verursachen permanent plus 1 Feuermarker und erhalten einen rüstungsbrechenden Durchschlag von plus 5 oder 10 oder 15 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 5 rüstungsbrechend permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 10 rüstungsbrechend permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 15 rüstungsbrechend permanent"
     }
    ]
   },
   {
    "name": "Inferno",
    "ast": "Brandstifter der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 auf eine Distanz von 10 oder 15 oder 20 Meter. Du kannst diesen Skill 1 oder 2 oder 3-mal pro Kampf einsetzen. Das Ziel erleidet Schaden und erhält zusätzlich plus 2 Feuermarker. Nach der Anwendung hat der Skill 3 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf nutzbar. Gewährt plus 2 Feuermarker. 3 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "15 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf nutzbar. Gewährt plus 2 Feuermarker. 3 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "20 Meter",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf nutzbar. Gewährt plus 2 Feuermarker. 3 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Divinus Chimäre",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Kopfnuss",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch von 2 oder 3 or 4W10 im Nahkampf. Das Ziel ist nach dem Treffer zu 25 oder 50 oder 75 Prozent für 1 Runde betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "25 Prozent Chance auf Betäubung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "50 Prozent Chance auf Betäubung für 1 Runde"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "75 Prozent Chance auf Betäubung für 1 Runde"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Regeneration Extra",
    "ast": "Divinus Chimäre",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Wunden aufreißen",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen. Gilt als Extra-Aktion, wenn das Ziel bereits verletzt ist.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Sternenfaust",
    "ast": "Divinus Chimäre",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Deine normalen Nahkampfangriffe betäuben Gegner zu 10 oder 20 oder 30 Prozent. Im Gegenzug verringert sich all dein verursachter Nahkampfschaden permanent um minus 2 oder 1 oder 1W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "minus 2W10",
      "schadenArt": "physisch",
      "effekt": "Nahkampfangriffe betäuben zu 10 Prozent. Permanenter Eigenschadensabzug"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "minus 1W10",
      "schadenArt": "physisch",
      "effekt": "Nahkampfangriffe betäuben zu 20 Prozent. Permanenter Eigenschadensabzug"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "minus 1W10",
      "schadenArt": "physisch",
      "effekt": "Nahkampfangriffe betäuben zu 30 Prozent. Permanenter Eigenschadensabzug"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Ruckzuckhieb",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10. Du springst auf eine Distanz von 2 oder 4 oder 6 Meter zum Gegner, fügst Schaden zu und kannst dann zurückspringen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Wirbeltritt",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 an 2 oder 3 oder 4 Gegner im Halbkreis vor dir. Stoßeffekt: Bei einem misslungenem Schwellenwert-Wurf von minus 15 werden Ziele um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf Halbkreis",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 4 Gegner. Bei misslungenem Schwellenwert-Wurf minus 15 erfolgt ein 1W4 Meter Stoß"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Schallschuss",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Linienreichweite von 3 oder 6 oder 9 Meter. Alle getroffenen Ziele in der geraden Linie müssen einen Betäubungswurf von 40 oder 60 oder 80 Prozent bestehen, ansonsten sind sie für eine Dauer von 1 oder 1 oder 2 Runden betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Linie",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "40 Prozent Betäubungswurf erforderlich oder 1 Runde betäubt"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Linie",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "60 Prozent Betäubungswurf erforderlich oder 1 Runde betäubt"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "80 Prozent Betäubungswurf erforderlich oder 2 Runden betäubt"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Speicher",
    "ast": "Divinus Chimäre",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Ermöglicht es dir, in einer Reichweite von 10 oder 15 oder 20 Meter insgesamt 1 oder 2 oder 3 gerade eben gewirkte Fähigkeiten zu stehlen, abzuspeichern und selbst zu benutzen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "effekt": "Kann 1 Fähigkeit speichern und benutzen"
     },
     {
      "level": 2,
      "reichweite": "15 Meter",
      "effekt": "Kann bis zu 2 Fähigkeiten speichern und benutzen"
     },
     {
      "level": 3,
      "reichweite": "20 Meter",
      "effekt": "Kann bis zu 3 Fähigkeiten speichern und benutzen"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Lichtgeschwindigkeit",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Erlaubt es dir, sofort 2 oder 3 oder 4 deiner eigenen Fähigkeiten direkt nacheinander in einer Kette einzusetzen. Die Stufe der genutzten Fähigkeiten skaliert dabei exakt mit der aktuellen Skillstufe von Lichtgeschwindigkeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "Setze 2 Fähigkeiten nacheinander ein. Fähigkeiten besitzen Stufe 1"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "Setze 3 Fähigkeiten nacheinander ein. Fähigkeiten besitzen Stufe 2"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "Setze 4 Fähigkeiten nacheinander ein. Fähigkeiten besitzen Stufe 3"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Zweite Dimension",
    "ast": "Divinus Chimäre",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Gewährt dir permanent eine mystische magische Rüstung von plus 10 oder 15 oder 20 Punkten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 magische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 15 magische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 20 magische Rüstung permanent"
     }
    ],
    "morphForm": "Basis"
   },
   {
    "name": "Magischer Schild",
    "ast": "Divinus Chimäre",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt einem einzelnen Ziel für eine Dauer von 1 oder 2 oder 3 Runden plus 3 oder 5 oder 10 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 3 magische Rüstung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 5 magische Rüstung für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 10 magische Rüstung für 3 Runden"
     }
    ],
    "morphForm": "Arkane Chimäre"
   },
   {
    "name": "Arkanes Schwert",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 10 oder 15 Meter. Diesen Zauber kannst du 1 oder 2 oder 3-mal pro Kampf einsetzen. Der Strahl trifft bis zu 2 Gegner in einer 3 oder 4 oder 5 Meter langen, geraden Linie. Nach Anwendung des Skills hat der Zauber 1 Runde Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf 3 Meter Linie",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter Distanz auf 5 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     }
    ],
    "morphForm": "Arkane Chimäre"
   },
   {
    "name": "Arkanes Geschoss",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 auf eine Distanz von 5 oder 10 oder 15 Meter. Kann 1 oder 1 oder 2-mal pro Kampf gezaubert werden. Du erschaffst 3 oder 4 oder 5 Kugeln, die du entweder sofort auf ein Ziel in Reichweite schießt, oder die Kugeln bis zu 3 oder 4 oder 5 Runden hinter dir schweben lässt. Pro Aktion A oder Aktion B oder Extra-Aktion kannst du dann 1 oder 2 oder 3 Kugeln abfeuern. Nach der Anwendung hat der Skill 2 Runden Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 3 Kugeln. Schweben für 3 Runden. Feuert 1 Kugel pro Aktion. 1-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "4W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 4 Kugeln. Schweben für 4 Runden. Feuert 2 Kugeln pro Aktion. 1-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "5W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 5 Kugeln. Schweben für 5 Runden. Feuert 3 Kugeln pro Aktion. 2-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     }
    ],
    "morphForm": "Arkane Chimäre"
   },
   {
    "name": "Knochengriff",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Ein Ziel in einer Reichweite von 10 Meter erhalten für eine Dauer von 1 oder 2 oder 3 Runden minus 1 oder 2 oder 3 Meter Bewegung und minus 10 auf Handeln.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "effekt": "minus 1 Meter Bewegung und minus 10 auf Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "minus 2 Meter Bewegung und minus 10 auf Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "minus 3 Meter Bewegung und minus 10 auf Handeln für 3 Runden"
     }
    ],
    "morphForm": "Skelett Chimäre"
   },
   {
    "name": "Knochenrüstung",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Ein einzelnes Ziel in einer Reichweite von 5 oder 10 oder 15 Meter erhält plus 5 oder 10 oder 15 physische Rüstung über eine Dauer von 3 oder 4 oder 5 Runden. Gleichzeitig verringert sich die Bewegung des Ziels um minus 1 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "plus 5 physische Rüstung für 3 Runden. Belegt das Ziel mit minus 1 Meter Bewegung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "plus 10 physische Rüstung für 4 Runden. Belegt das Ziel mit minus 1 Meter Bewegung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "effekt": "plus 15 physische Rüstung für 5 Runden. Belegt das Ziel mit minus 1 Meter Bewegung"
     }
    ],
    "morphForm": "Skelett Chimäre"
   },
   {
    "name": "Knochenspeer",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Hat 5 oder 10 oder 15 rüstungsbrechend. Ist 1 oder 1 oder 2-mal pro Kampf nutzbar. Du schleuderst einen Knochenspeer, der 2 oder 3 oder 4 Ziele in einer Linie aufspießt. Nach Anwendung des Skills hast du 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "5 rüstungsbrechend. Spießt 2 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "10 rüstungsbrechend. Spießt 3 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Linie",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "15 rüstungsbrechend. Spießt 4 Ziele auf. 2-mal pro Kampf. 2 Runden Abklingzeit"
     }
    ],
    "morphForm": "Skelett Chimäre"
   },
   {
    "name": "Wasserpeitsche",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das getroffene Ziel wird um 1W4 Meter zurückgeschleudert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     }
    ],
    "morphForm": "Wasser Chimäre"
   },
   {
    "name": "Aquaknarre",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad minus 5 oder 10 oder 15 bestehen, ansonsten wird es 1W4 Meter weggespült. Bei der Benutzung löschst du alle Feuermarker bei dir selbst und deinem Ziel komplett. Nach Anwendung des Skills hast du 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad minus 5 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad minus 10 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad minus 15 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     }
    ],
    "morphForm": "Wasser Chimäre"
   },
   {
    "name": "Wasserschild",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Ein Ziel in einer Reichweite von 3 oder 6 oder 9 Meter erhält für eine Dauer von 3 oder 4 oder 5 Runden eine magische Rüstung von plus 10 oder 20 oder 30 Rüstung. Alle aktiven Feuermarker auf dem Ziel erlöschen sofort und erlittener Feuerschaden wird um minus 50 Prozent reduziert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 10 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 5 Runden. plus 30 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     }
    ],
    "morphForm": "Wasser Chimäre"
   },
   {
    "name": "Giftmischer",
    "ast": "Divinus Chimäre",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Macht Schaden magisch auf ein einzelnes Ziel. Die nächsten 1 oder 2 oder 3 Nahkampfangriffe und Fernkampfangriffe verursachen für 1 oder 2 oder 3 Runden Gift mit Giftstufe 1 oder 2 oder 3.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "1 Angriff verursacht Giftstufe 1 für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "2 Angriffe verursachen Giftstufe 2 für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "magisch",
      "effekt": "3 Angriffe verursachen Giftstufe 3 für 3 Runden"
     }
    ],
    "morphForm": "Gift Chimäre"
   },
   {
    "name": "Atem der Verwesung",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 5 oder 6W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Feuert einen Strahl, der 1 oder 2 oder 3 Gegnern Schaden verursacht und diese zusätzlich mit Giftstufe 2 oder 3 oder 4 vergiftet. Angrenzende Personen erhalten ebenfalls das Gift.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Strahl",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 1 Gegner. Verursacht Giftstufe 2. Angrenzende Personen werden vergiftet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Strahl",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 2 Gegner. Verursacht Giftstufe 3. Angrenzende Personen werden vergiftet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Strahl",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 3 Gegner. Verursacht Giftstufe 4. Angrenzende Personen werden vergiftet"
     }
    ],
    "morphForm": "Gift Chimäre"
   },
   {
    "name": "Welle der Korrosion",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einem Umkreis von 2 oder 3 oder 4 Meter. Alle Personen im Umkreis erleiden diesen Schaden und erhalten zusätzlich Giftstufe 3 oder 4 oder 5.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis"
     }
    ],
    "morphForm": "Gift Chimäre"
   },
   {
    "name": "Feuerfaust",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch im Nahkampf von plus 1 oder 2 or 3W10. Fügt dem Hauptziel Nahkampfschaden und plus 1 Feuermarker zu. Ziele links und rechts neben dem Hauptziel sowie dahinter erhalten ebenfalls den Schaden und plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten Schaden und plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten Schaden und plus 1 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und angrenzende Felder",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 1 Feuermarker. Angrenzende Ziele erhalten Schaden und plus 1 Feuermarker"
     }
    ],
    "morphForm": "Feuer Chimäre"
   },
   {
    "name": "Feuerball",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Das getroffene Ziel erhält plus 1 oder 1 oder 2 Feuermarker. Nach der Aktivierung hat der Skill 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Gewährt plus 2 Feuermarker. 1 Runde Abklingzeit"
     }
    ],
    "morphForm": "Feuer Chimäre"
   },
   {
    "name": "Brennender Kreis",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 im Umkreis von 1 oder 2 oder 3 Meter. Alle Personen im Umkreis erhalten Feuerschaden und plus 1 oder 2 oder 3 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 1 Feuermarker"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 2 Feuermarker"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Alle Personen im Umkreis erleiden Schaden und erhalten plus 3 Feuermarker"
     }
    ],
    "morphForm": "Feuer Chimäre"
   },
   {
    "name": "Frosthauch",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das Ziel verliert für seine nächste Runde minus 1 oder 2 oder 3 Meter seiner Bewegung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 1 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 2 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 3 Meter Bewegung für die nächste Runde"
     }
    ],
    "morphForm": "Frost Chimäre"
   },
   {
    "name": "Eisfeld",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 2 oder 3 oder 4W10. Erschafft in einer Reichweite von 5 oder 7 oder 10 Meter ein Eisfeld mit einer Fläche von 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter. Gegner, die ihre Runde dort starten, erleiden den Schaden und ihre Bewegungsweite wird um die Hälfte verringert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     }
    ],
    "morphForm": "Frost Chimäre"
   },
   {
    "name": "Eisstachel",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf einsetzbar. Das Ziel verliert minus 10 oder 15 oder 20 Rüstung über eine Dauer von 1W6 Runden. Nach der Anwendung hat der Skill 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Reduziert Rüstung um minus 10 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Reduziert Rüstung um minus 15 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Reduziert Rüstung um minus 20 für 1W6 Runden. 2 Runden Abklingzeit"
     }
    ],
    "morphForm": "Frost Chimäre"
   },
   {
    "name": "Stromstoß",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Nahkampfreichweite von 2 Meter. Du machst plus 2W10 zusätzlichen Schaden pro Rüstungsklasse des Gegners.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     },
     {
      "level": 2,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     },
     {
      "level": 3,
      "reichweite": "2 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     }
    ],
    "morphForm": "Elektro Chimäre"
   },
   {
    "name": "Hochspannung",
    "ast": "Divinus Chimäre",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Nahkampfangriffe machen permanent mehr Schaden basierend auf der gegnerischen Rüstungsklasse. Du verursachst plus 1 oder 2 oder 3W8 zusätzlichen Schaden pro Rüstungsklasse des Ziels.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     }
    ],
    "morphForm": "Elektro Chimäre"
   },
   {
    "name": "Zorn der Wolken",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Distanz von 3 oder 5 oder 7 Meter. Der Blitz springt auf 1 oder 2 oder 3 Ziele in einem Umkreis von jeweils 1 oder 2 oder 3 Meter über. Betroffene Einheiten werden zu 20 oder 40 oder 60 Prozent betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Distanz auf 1 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Springt auf 1 Ziel über. 20 Prozent Betäubungschance"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Distanz auf 2 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Springt auf bis zu 2 Ziele über. 40 Prozent Betäubungschance"
     },
     {
      "level": 3,
      "reichweite": "7 Meter Distanz auf 3 Meter Umkreis",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "Springt auf bis zu 3 Ziele über. 60 Prozent Betäubungschance"
     }
    ],
    "morphForm": "Elektro Chimäre"
   },
   {
    "name": "Dornenhaut",
    "ast": "Divinus Chimäre",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch. Gewährt plus 5 Rüstung für eine Dauer von 1 oder 2 oder 3 Runden. Gegner, die dich im Nahkampf angreifen, erleiden automatisch 1 oder 2 oder 3W10 Schaden. Kann auch aktiv genutzt werden, um auf einen Verbündeten in einer Reichweite von 1 oder 3 oder 5 Meter die Dornenhaut zu zaubern.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 1 Runde. Angreifer erleiden 1W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 2 Runden. Angreifer erleiden 2W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 3 Runden. Angreifer erleiden 3W10 Schaden"
     }
    ],
    "morphForm": "Wald Chimäre"
   },
   {
    "name": "Wurzelwucher",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Fügt einem Ziel in einer Reichweite von 2 oder 4 oder 6 Meter Giftstufe 1 oder 2 oder 3 und plus 1 oder 1 oder 2 Blutungen zu. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad minus 5 oder 10 oder 15 bestehen, um sich aus dem Wucher zu befreien.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 1 und plus 1 Blutung. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad minus 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2 and plus 1 Blutung. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad minus 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3 und plus 2 Blutungen. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad minus 15"
     }
    ],
    "morphForm": "Wald Chimäre"
   },
   {
    "name": "Wucherfaust",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch im Nahkampf von plus 1 oder 2 oder 3W10. Verursacht zusätzlich plus 1 oder 2 oder 3 Blutungen. Triffst du deinen Gegner, kann er sich für eine Dauer von 1 oder 1 oder 2 Runden nicht von dir wegbewegen. Wenn er es dennoch versucht, muss er einen Schwellenwert-Wurf von Schwierigkeitsgrad minus 15 erfolgreich bestehen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 1W10",
      "schadenArt": "magisch",
      "effekt": "plus 1 Blutung. Ziel für 1 Runde fixiert außer bei bestandenem Schwellenwert-Wurf minus 15"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10",
      "schadenArt": "magisch",
      "effekt": "plus 2 Blutungen. Ziel für 1 Runde fixiert außer bei bestandenem Schwellenwert-Wurf minus 15"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10",
      "schadenArt": "magisch",
      "effekt": "plus 3 Blutungen. Ziel für 2 Runden fixiert außer bei bestandenem Schwellenwert-Wurf minus 15"
     }
    ],
    "morphForm": "Wald Chimäre"
   },
   {
    "name": "Beruhigende Aura",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 1 oder 2 oder 3W10 im Umkreis von 2 oder 4 oder 6 Meter. Verbündete heilen Lebenspunkte und können 1 oder 1 oder 2 negative Statuseffekte entfernen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "1W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 2 negative Statuseffekte"
     }
    ],
    "morphForm": "Heilige Chimäre"
   },
   {
    "name": "Buße",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilung von 3 oder 4 oder 5W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Funktioniert nur, wenn der Anwender selbst mindestens einen negativen Statuseffekt hat. 1 oder 2 oder 3 Ziele in Reichweite werden geheilt und verlieren all ihre negativen Statuseffekte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter auf 1 Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Erfordert negativen Statuseffekt auf Anwender. Entfernt alle Effekte vom Ziel"
     },
     {
      "level": 2,
      "reichweite": "4 Meter auf 2 Ziele",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Erfordert negativen Statuseffekt auf Anwender. Entfernt alle Effekte von den Zielen"
     },
     {
      "level": 3,
      "reichweite": "6 Meter auf 3 Ziele",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Erfordert negativen Statuseffekt auf Anwender. Entfernt alle Effekte von den Zielen"
     }
    ],
    "morphForm": "Heilige Chimäre"
   },
   {
    "name": "Welle der Heilung",
    "ast": "Divinus Chimäre",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Aura heilt jeden Verbündeten im Umkreis von 2 oder 4 oder 6 Meter um 4 oder 5 oder 6W10 Heilung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     }
    ],
    "morphForm": "Heilige Chimäre"
   },
   {
    "name": "Dornenhaut",
    "ast": "Echsenmensch",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch. Gewährt plus 5 Rüstung für eine Dauer von 1 oder 2 oder 3 Runden. Gegner, die dich im Nahkampf angreifen, erleiden automatisch 1 oder 2 oder 3W10 Schaden. Kann auch aktiv genutzt werden, um auf einen Verbündeten in einer Reichweite von 1 oder 3 oder 5 Meter die Dornenhaut zu zaubern.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter",
      "schaden": "1W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 1 Runde. Angreifer erleiden 1W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 2 Runden. Angreifer erleiden 2W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 5 Rüstung für 3 Runden. Angreifer erleiden 3W10 Schaden"
     }
    ]
   },
   {
    "name": "Biss",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch basierend auf Stärke plus 2 oder 3 oder 4W10 im Nahkampf. Du beißt ein direkt angrenzendes Ziel. Der Angriff besitzt 0 oder 5 oder 10 rüstungsbrechend und verursacht plus 1 oder 1 oder 2 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 2W10",
      "schadenArt": "physisch",
      "effekt": "0 rüstungsbrechend. Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 3W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. Verursacht plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 4W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. Verursacht plus 2 Blutungen"
     }
    ]
   },
   {
    "name": "Pure Muskeln",
    "ast": "Echsenmensch",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Erhöht deinen Stärke-Wert in deiner Monsterform zusätzlich um plus 10 oder 20 oder 30 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 Stärke in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 20 Stärke in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 30 Stärke in Monsterform"
     }
    ]
   },
   {
    "name": "Verstärker der Leiden",
    "ast": "Echsenmensch",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Du machst plus 1 oder 2 oder 3W10 zusätzlichen Schaden pro verschiedenen negativen Statuseffekt auf dem Ziel wie Blutung, Giftstufe und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 1W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 2W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 3W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Giftsymbiose",
    "ast": "Echsenmensch",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Angriffe verursachen plus 1 oder 2 oder 3W4 zusätzlichen Schaden pro auf dem Ziel aktiver Giftstufe. Der Bonus ist auf maximal 5 Giftstufen begrenzt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W4 pro Giftstufe",
      "schadenArt": "magisch",
      "effekt": "Zusätzlicher Schaden ist auf maximal 5 Giftstufen begrenzt"
     }
    ]
   },
   {
    "name": "Gieriger Biss",
    "ast": "Echsenmensch",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 im Nahkampf. Besitzt 0 oder 5 oder 10 rüstungsbrechend. Nur nutzbar, wenn du dich selbst unter 50 Prozent deiner maximalen Lebenspunkte befindest. Du erhältst den gesamten verursachten Schaden als Heilung gutgeschrieben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 0 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 5 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 10 rüstungsbrechend. Heilt dich um den Schaden"
     }
    ]
   },
   {
    "name": "Körper aus Stahl",
    "ast": "Echsenmensch",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 5 oder 10 oder 15 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 15 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Toxischer Ausbruch",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Du schädigst einem Ziel in Reichweite und verursachst Giftstufe 2 oder 3 oder 4. Hat das Ziel mindestens 1 Blutung erhält es zusätzlich plus 1 Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4. Gewährt plus 1 Feuermarker wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch ausgeführt als 2 oder 3 oder 4 Nahkampfangriffe auf ein einziges Ziel. Besitzt 10 oder 15 oder 20 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Nur eine Fleischwunde",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf. Fügt dem anvisierten Ziel heftige Blutungen im Wert von plus 4 oder 5 oder 6 Blutungsmarkern zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 4 Blutungsmarker"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 5 Blutungsmarker"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 6 Blutungsmarker"
     }
    ]
   },
   {
    "name": "Knochenspeer",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Hat 5 oder 10 oder 15 rüstungsbrechend. Ist 1 oder 1 or 2-mal pro Kampf nutzbar. Du schleuderst einen Knochenspeer, der 2 oder 3 oder 4 Ziele in einer Linie aufspießt. Nach Anwendung des Skills hast du 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "5 rüstungsbrechend. Spießt 2 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "10 rüstungsbrechend. Spießt 3 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Linie",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "15 rüstungsbrechend. Spießt 4 Ziele auf. 2-mal pro Kampf. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Raserei",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf. Führe bis zu 4 oder 5 oder 6 Angriffe aus, die 5 oder 10 oder 15 rüstungsbrechend besitzen. Die Angriffskette läuft so lange weiter, bis der erste Angriff verfehlt. Jeder Folgeantriff erhält einen Malus von minus 5 auf Nahkampf. Nach dem Ende der Raserei verfällt der Charakter für 1W4 Runden in tiefen Schlaf. Blutet das Ziel, verursacht der Skill plus 1W4 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 4 Angriffe",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 5 Angriffe",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 6 Angriffe",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Verschlingen",
    "ast": "Echsenmensch",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch im Nahkampf. Es besteht eine Chance von 20 oder 40 oder 60 Prozent, ein angrenzendes Ziel für eine Dauer von 1W4 Runden komplett zu verschlingen. Währenddessen erhält das Ziel Giftstufe 4 oder 5 oder 6 sowie plus 3 oder 4 oder 5 Blutungen. Misslingt der Verschlingungsversuch komplett, erleidet der Anwender selbst sofort 4W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schadenArt": "magisch",
      "effekt": "20 Prozent Erfolgschance für 1W4 Runden Verschlingen. Ziel erhält Giftstufe 4 und plus 3 Blutungen. Fehlschlag gibt Anwender 4W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schadenArt": "magisch",
      "effekt": "40 Prozent Erfolgschance für 1W4 Runden Verschlingen. Ziel erhält Giftstufe 5 und plus 4 Blutungen. Fehlschlag gibt Anwender 4W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schadenArt": "magisch",
      "effekt": "60 Prozent Erfolgschance für 1W4 Runden Verschlingen. Ziel erhält Giftstufe 6 und plus 5 Blutungen. Fehlschlag gibt Anwender 4W10 Schaden"
     }
    ]
   },
   {
    "name": "Frosthauch",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das Ziel verliert für seine nächste Runde minus 1 oder 2 oder 3 Meter seiner Bewegung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 1 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 2 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 3 Meter Bewegung für die nächste Runde"
     }
    ]
   },
   {
    "name": "Magischer Schild",
    "ast": "Eismeister der See",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt einem einzelnen Ziel für eine Dauer von 1 oder 2 oder 3 Runden plus 3 oder 5 oder 10 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 3 magische Rüstung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 5 magische Rüstung für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 10 magische Rüstung für 3 Runden"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Eismeister der See",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Wasserpeitsche",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das getroffene Ziel wird um 1W4 Meter zurückgeschleudert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Schleudert das Ziel 1W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Eismeister der See",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Aquaknarre",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad 5 oder 10 oder 15 bestehen, ansonsten wird es 1W4 Meter weggespült. Bei der Benutzung löschst du alle Feuermarker bei dir selbst und deinem Ziel komplett. Nach Anwendung des Skills hast du 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 5 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 10 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad 15 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Eisfeld",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 2 oder 3 oder 4W10. Erschafft in einer Reichweite von 5 oder 7 oder 10 Meter ein Eisfeld mit einer Fläche von 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter. Gegner, die ihre Runde dort starten, erleiden den Schaden und ihre Bewegungsweite wird um die Hälfte verringert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     }
    ]
   },
   {
    "name": "Elementargeist Eispanther",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Beschwört auf ein einzelnes Ziel für eine Dauer von 2 oder 2 oder 3 Runden einen Eispanther als Elementargeist. Der Geist besitzt 30 oder 60 oder 90 Lebenspunkte und greift im Nahkampf mit einem Wert von 30 oder 40 oder 50 an um 2 oder 3 oder 4W10 Schaden zu verursachen. Je nach gewähltem Element von 1 oder 1 oder 2 Elementen parallel erhält er Zusatzeffekte. Eis-Element: Gewährt 0 oder 10 oder 15 rüstungsbrechend und verringert gegnerische Bewegung um minus 1 Meter Bewegungsweite. Baum-Element: Verursacht plus 1 Blutung und plus 1 Giftstufe. Feuer-Element: Verursacht plus 1 Feuermarker und plus 1W10 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10 Geist-Angriff",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. Geist hat 30 Lebenspunkte und 30 Nahkampf-Wert. Nutzt 1 Element"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10 Geist-Angriff",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. Geist hat 60 Lebenspunkte und 40 Nahkampf-Wert. Nutzt 1 Element"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10 Geist-Angriff",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. Geist hat 90 Lebenspunkte und 50 Nahkampf-Wert. Nutzt bis zu 2 Elemente gleichzeitig"
     }
    ]
   },
   {
    "name": "Heilendes Wort",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilung von 4 oder 5 oder 6W10 auf eine Distanz von 3 oder 5 oder 7 Meter. Heilt 1 oder 2 oder 3 ausgewählte Ziele im Bereich der Reichweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt 1 einzelnes Ziel"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt bis zu 2 ausgewählte Ziele"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt bis zu 3 ausgewählte Ziele"
     }
    ]
   },
   {
    "name": "Eisstachel",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf einsetzbar. Das Ziel verliert minus 10 oder 15 oder 20 Rüstung über eine Dauer von 1W6 Runden. Nach der Anwendung hat der Skill 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Reduziert Rüstung um minus 10 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Reduziert Rüstung um minus 15 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Reduziert Rüstung um minus 20 für 1W6 Runden. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Geisterflamme",
    "ast": "Eismeister der See",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Deine magischen Fähigkeiten verursachen permanent plus 1 Feuermarker und erhalten einen rüstungsbrechenden Durchschlag von plus 5 oder 10 oder 15 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 5 rüstungsbrechend permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 10 rüstungsbrechend permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schadenArt": "magisch",
      "effekt": "Skills geben plus 1 Feuermarker und haben 15 rüstungsbrechend permanent"
     }
    ]
   },
   {
    "name": "Wasserschild",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Ein Ziel in einer Reichweite von 3 oder 6 oder 9 Meter erhält für eine Dauer von 3 oder 4 oder 5 Runden eine magische Rüstung von plus 10 oder 20 oder 30 Rüstung. Alle aktiven Feuermarker auf dem Ziel erlöschen sofort und erlittener Feuerschaden wird um minus 50 Prozent reduziert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 10 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 5 Runden. plus 30 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     }
    ]
   },
   {
    "name": "Stoppuhr Eissphäre",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Erschafft in einer Reichweite von 5 oder 7 oder 10 Meter eine Zeitschleifen-Eiszone mit einer Fläche von 2 mal 2 oder 3 mal 3 oder 3 mal 3 Meter. Alles innerhalb dieses Radius wird für eine Dauer von 1 oder 1 oder 2 Runden komplett in Raum und Zeit eingefroren. Dies gilt auch für nachträglich eindringende Personen sowie mitten im Flug befindliche Zauber.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf Zone 2 mal 2 Meter",
      "effekt": "Einfrierungseffekt stoppt Raum und Zeit für 1 Runde für alle Einheiten und Zauber"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Distanz auf Zone 3 mal 3 Meter",
      "effekt": "Einfrierungseffekt stoppt Raum und Zeit für 1 Runde für alle Einheiten und Zauber"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Distanz auf Zone 3 mal 3 Meter",
      "effekt": "Einfrierungseffekt stoppt Raum und Zeit für 2 Runden für alle Einheiten und Zauber"
     }
    ]
   },
   {
    "name": "Welle",
    "ast": "Eismeister der See",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Ist 1 oder 1 oder 2-mal pro Kampf nutzbar. Eine Welle mit einer Breite von 2 oder 3 oder 4 Meter trifft die ersten Gegner in ihrer Bahn. Die betroffenen Gegner werden bei einem misslungenen Stärkewurf um 1 oder 2 oder 3W4 Meter mitgerissen. Nach Anwendung des Skills hat der Zauber 3 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Distanz auf 2 Meter breite Welle",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Bei misslungenem Stärkewurf 1W4 Meter mitgerissen. 3 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Distanz auf 3 Meter breite Welle",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Bei misslungenem Stärkewurf 2W4 Meter mitgerissen. 3 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Distanz auf 4 Meter breite Welle",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Bei misslungenem Stärkewurf 3W4 Meter mitgerissen. 3 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Geist",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Fluch",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Du selbst bekommst 3 oder 2 oder 1W10 Schaden. 1 oder 1 oder 2 Ziele bekommen Schaden und schlafen zu 20 oder 40 oder 60 Prozent für 1W4 Runden. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 3W10 Eigenschaden. 1 Ziel schläft zu 20 Prozent für 1W4 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 2W10 Eigenschaden. 1 Ziel schläft zu 40 Prozent für 1W4 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 1W10 Eigenschaden. 2 Ziele schlafen zu 60 Prozent für 1W4 Runden"
     }
    ]
   },
   {
    "name": "Frosthauch",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Das Ziel verliert für seine nächste Runde minus 1 oder 2 oder 3 Meter seiner Bewegung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 1 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 2 Meter Bewegung für die nächste Runde"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Ziel verliert minus 3 Meter Bewegung für die nächste Runde"
     }
    ]
   },
   {
    "name": "Geist",
    "ast": "Geist",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Macht dich teilweise immateriell. Du erleidest permanent minus 20 oder 40 oder 60 Prozent weniger physischen Schaden. Im Gegenzug erleidest du plus 50 oder 75 oder 100 Prozent mehr magischen Schaden gegen dich selbst. Du erhältst einen permanenten Proben-Bonus von plus 10 oder 20 oder 30 auf Heimlichkeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "minus 20 Prozent physischer Schaden. plus 50 Prozent erlittener magischer Schaden. plus 10 Proben-Bonus Heimlichkeit"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "minus 40 Prozent physischer Schaden. plus 75 Prozent erlittener magischer Schaden. plus 20 Proben-Bonus Heimlichkeit"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "minus 60 Prozent physischer Schaden. plus 100 Prozent erlittener magischer Schaden. plus 30 Proben-Bonus Heimlichkeit"
     }
    ]
   },
   {
    "name": "Schrecken der Meere",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Zwingt 1 oder 2 or 3 Gegner in einer Reichweite von 2 oder 4 oder 6 Meter zur Flucht. Nach einem misslungenen Willenskraft-Wurf mit einem Malus von minus 5 oder 10 oder 15 müssen die Ziele für eine Dauer von 1 oder 1 oder 2 Runden fliehen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Trifft 1 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Trifft 2 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Trifft 3 Gegner. Flucht für 2 Runden nach misslungenem Willenskraft-Wurf minus 15"
     }
    ]
   },
   {
    "name": "Ablenken",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Provoziert Gegner im Umkreis auf eine Reichweite von 3 oder 7 oder 10 Meter. Zu einer Wahrscheinlichkeit von 30 oder 60 oder 90 Prozent laufen deine Gegner für eine Dauer von 1 oder 1 oder 2 Runden direkt auf dich zu und versuchen dich mit Nahkampfangriffen zu attackieren. Für diese Zeit erhältst du plus 10 oder 15 oder 20 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "effekt": "30 Prozent Spottchance für 1 Runde. Gewährt plus 10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Umkreis",
      "effekt": "60 Prozent Spottchance für 1 Runde. Gewährt plus 15 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Umkreis",
      "effekt": "90 Prozent Spottchance für 2 Runden. Gewährt plus 20 magische Rüstung"
     }
    ]
   },
   {
    "name": "Atem der Verwesung",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 5 oder 6W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Feuert einen Strahl, der 1 oder 2 oder 3 Gegner nacheinander schädigt und diese zusätzlich mit Giftstufe 2 oder 3 oder 4 vergiftet. Direkt angrenzende Personen erhalten ebenfalls dieses Gift.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Strahl",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 1 Gegner. Verursacht Giftstufe 2. Angrenzende Einheiten werden vergiftet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Strahl",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 2 Gegner. Verursacht Giftstufe 3. Angrenzende Einheiten werden vergiftet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Strahl",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 3 Gegner. Verursacht Giftstufe 4. Angrenzende Einheiten werden vergiftet"
     }
    ]
   },
   {
    "name": "Lebensentzug",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Verursacht 4 oder 5 oder 6W10 magischen Schaden auf eine Reichweite von 3 oder 5 oder 10 Meter bei 1 oder 1 oder 2 Zielen. Du wirst um 50 Prozent des zugefügten Schadens geheilt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Ziel",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Ziel",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 3,
      "reichweite": "10 Meter auf 2 Ziele",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     }
    ]
   },
   {
    "name": "Trugbild",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du wirst für eine Dauer von 1 oder 1 oder 2 Runden komplett unsichtbar. Gleichzeitig lässt du an deiner aktuellen Position ein Spiegelbild als einzelnes Ziel zurück. Dieses Trugbild zieht die Aufmerksamkeit auf sich, sodass Feinde es zu 30 oder 60 oder 90 Prozent für eine Runde lang prioritär angreifen. Sobald du selbst angreifst oder eine ähnliche Aktion ausführst, wirst du sofort wieder sichtbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 30 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 60 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "2 Runden unsichtbar. Spiegelbild lenkt Gegner zu 90 Prozent ab. Bricht bei eigenem Angriff"
     }
    ]
   },
   {
    "name": "Eisstachel",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf einsetzbar. Das Ziel verliert minus 10 oder 15 oder 20 Rüstung über eine Dauer von 1W6 Runden. Nach der Anwendung hat der Skill 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Reduziert Rüstung um minus 10 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Reduziert Rüstung um minus 15 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Reduziert Rüstung um minus 20 für 1W6 Runden. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Fluch der Schwächung",
    "ast": "Geist",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Ein Ziel in einer Reichweite von 2 oder 4 oder 6 Meter wird verflucht. Das getroffene Opfer verursacht für eine Dauer von 1 oder 2 oder 3 Runden permanent minus 50 Prozent weniger physischen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Reduziert gegnerischen physischen Schaden für 1 Runde um 50 Prozent"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Reduziert gegnerischen physischen Schaden für 2 Runden um 50 Prozent"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Reduziert gegnerischen physischen Schaden für 3 Runden um 50 Prozent"
     }
    ]
   },
   {
    "name": "Seelenverkrustung",
    "ast": "Geist",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Belegt ein einzelnes Ziel für eine Dauer von 2 oder 3 oder 4 Runden mit einem Effekt, der erlittenen magischen Schaden um minus 50 Prozent reduziert. In dieser Zeit kann sich das Ziel nur selbst heilen, externe Heilung funktioniert nicht.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 2 Runden. Reduziert magischen Schaden um 50 Prozent. Nur Selbstheilung erlaubt"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 3 Runden. Reduziert magischen Schaden um 50 Prozent. Nur Selbstheilung erlaubt"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 4 Runden. Reduziert magischen Schaden um 50 Prozent. Nur Selbstheilung erlaubt"
     }
    ]
   },
   {
    "name": "Seelentausch",
    "ast": "Geist",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Du überträgst 1 oder 2 oder 3 deiner aktuell auf dir selbst liegenden negativen Statuseffektstapel direkt auf einen Feind in einer Reichweite von 3 oder 5 oder 7 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "effekt": "Überträgt 1 eigenen negativen Statuseffektstapel auf den Feind"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "effekt": "Überträgt bis zu 2 eigene negative Statuseffektstapel auf den Feind"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "effekt": "Überträgt bis zu 3 eigene negative Statuseffektstapel auf den Feind"
     }
    ]
   },
   {
    "name": "Zweite Dimension",
    "ast": "Geist",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Gewährt dir permanent eine mystische magische Rüstung von plus 10 oder 15 oder 20 Punkten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 magische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 15 magische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 20 magische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Blutiger Zorn",
    "ast": "Guhl",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Du erhältst für 1 oder 2 oder 3 Runden eine zusätzliche Attacke in Aktion A auf ein einzelnes Ziel. Du erleidest dafür sofort 2 oder 1 oder 0 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 1 Runde. Erhältst sofort 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 2 Runden. Erhältst sofort 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 3 Runden. Erhältst sofort 0 Blutungen"
     }
    ]
   },
   {
    "name": "Blutschuss",
    "ast": "Guhl",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch in einer Reichweite von 5 Meter. Erzeuge aus deinem Blut durch das Opfern von 1W8 Lebenspunkten pro Kugel insgesamt 2 oder 3 oder 4 Blutkugeln. Jede Kugel verursacht 2W10 Schaden. Du kannst die Kugeln auf bis zu 3 verschiedene Ziele schießen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 2 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "3 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 3 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "4 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 4 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     }
    ]
   },
   {
    "name": "Doppelhieb",
    "ast": "Guhl",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Erlaubt dir 1 oder 2 oder 3-mal pro Kampf einen Nahkampfangriff als Extra-Aktion auszuführen. Nach der Anwendung hat der Skill 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "1-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "2-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "3-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Monster",
    "ast": "Guhl",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt dir in deiner Monsterform permanent zusätzliche plus 25 oder 50 oder 75 Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 25 Lebenspunkte in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 50 Lebenspunkte in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 75 Lebenspunkte in Monsterform"
     }
    ]
   },
   {
    "name": "Verkrüppeln",
    "ast": "Guhl",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf oder Fernkampf. Verringert die Bewegungsweite um 2 oder 3 oder 4 Meter und das Handeln um 5 oder 10 oder 15 für 1 oder 2 oder 3 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "minus 2 Meter Bewegungsweite und minus 5 Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "minus 3 Meter Bewegungsweite und minus 10 Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "minus 4 Meter Bewegungsweite und minus 15 Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Atem der Verwesung",
    "ast": "Guhl",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 5 oder 6W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Feuert einen Strahl, der 1 oder 2 oder 3 Gegner nacheinander schädigt und diese zusätzlich mit Giftstufe 2 oder 3 oder 4 vergiftet. Direkt angrenzende Personen erhalten ebenfalls dieses Gift.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Strahl",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 1 Gegner. Verursacht Giftstufe 2. Angrenzende Einheiten werden vergiftet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Strahl",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 2 Gegner. Verursacht Giftstufe 3. Angrenzende Einheiten werden vergiftet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Strahl",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 3 Gegner. Verursacht Giftstufe 4. Angrenzende Einheiten werden vergiftet"
     }
    ]
   },
   {
    "name": "Gieriger Biss",
    "ast": "Guhl",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 im Nahkampf. Besitzt 0 oder 5 oder 10 rüstungsbrechend. Nur nutzbar, wenn du dich selbst unter 50 Prozent deiner maximalen Lebenspunkte befindest. Du erhältst den gesamten verursachten Schaden als Heilung gutgeschrieben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 0 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 5 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 10 rüstungsbrechend. Heilt dich um den Schaden"
     }
    ]
   },
   {
    "name": "Körper aus Stahl",
    "ast": "Guhl",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 5 oder 10 oder 15 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 15 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Sprungangriff",
    "ast": "Guhl",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch von 3 oder 4 oder 5W10. Du springst über eine Distanz von 3 oder 5 oder 7 Meter auf dein Ziel und verursachst Schaden in einem Radius von 1 oder 2 oder 2 Meter um den Aufprallpunkt herum. Direkt angrenzende Ziele erleiden die Hälfte des Schadens.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Distanz auf 1 Meter Radius",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft den Radius beim Aufprall. Angrenzende Ziele erhalten halben Schaden"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Distanz auf 2 Meter Radius",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft den Radius beim Aufprall. Angrenzende Ziele erhalten halben Schaden"
     },
     {
      "level": 3,
      "reichweite": "7 Meter Distanz auf 2 Meter Radius",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft den Radius beim Aufprall. Angrenzende Ziele erhalten halben Schaden"
     }
    ]
   },
   {
    "name": "Mentale Welle",
    "ast": "Guhl",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einem Radius von 2 oder 3 oder 4 Meter um dich herum. Alle betroffenen Personen im Radius außer dir selbst erhalten einen Malus von minus 5 oder 10 oder 15 auf all ihre Proben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Radius",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Belegt alle getroffenen Ziele mit minus 5 auf alle Proben"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Radius",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Belegt alle getroffenen Ziele mit minus 10 auf alle Proben"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Radius",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Belegt alle getroffenen Ziele mit minus 15 auf alle Proben"
     }
    ]
   },
   {
    "name": "Giftwolke",
    "ast": "Guhl",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch. Erschafft in einer Reichweite von 5 oder 7 oder 10 Meter eine Wolke mit einer Fläche von 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter. Alle Personen in der Wolke werden mit Giftstufe 4 oder 5 oder 6 vergiftet. Zudem erleiden sie in der Wolke einen Malus von minus 10 auf Wahrnehmung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf Zone 2 mal 2 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4. minus 10 Wahrnehmung in der Wolke"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Distanz auf Zone 2 mal 2 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 5. minus 10 Wahrnehmung in der Wolke"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Distanz auf Zone 3 mal 3 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 6. minus 10 Wahrnehmung in der Wolke"
     }
    ]
   },
   {
    "name": "Arkaner Funke",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Du kannst diesen Zauber 2 oder 3 oder 4-mal pro Kampf einsetzen. Nach der Anwendung hat der Skill 1 Runde Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "4-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Befreiender Schlag",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 im Nahkampf. Mache Schaden und entferne 1 oder 2 oder 3 negative Statuseffekte. Du machst plus 1W10 zusätzlichen Schaden pro entfernten negativen Statuseffekt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 1 negativen Statuseffekt. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 2 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Entfernt 3 negative Statuseffekte. plus 1W10 Schaden pro entfernten Effekt"
     }
    ]
   },
   {
    "name": "Beruhigende Aura",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 1 oder 2 oder 3W10 im Umkreis von 2 oder 4 oder 6 Meter. Verbündete heilen Lebenspunkte und können 1 oder 1 oder 2 negative Statuseffekte entfernen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "1W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 1 negativen Statuseffekt"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Verbündete heilen Lebenspunkte und entfernen 2 negative Statuseffekte"
     }
    ]
   },
   {
    "name": "Fluch",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Du selbst bekommst 3 oder 2 oder 1W10 Schaden. 1 oder 1 oder 2 Ziele bekommen Schaden und schlafen zu 20 oder 40 oder 60 Prozent für 1W4 Runden. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 3W10 Eigenschaden. 1 Ziel schläft zu 20 Prozent für 1W4 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 2W10 Eigenschaden. 1 Ziel schläft zu 40 Prozent für 1W4 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 1W10 Eigenschaden. 2 Ziele schlafen zu 60 Prozent für 1W4 Runden"
     }
    ]
   },
   {
    "name": "Schrecken der Meere",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Zwingt 1 oder 2 oder 3 Gegner in einer Reichweite von 2 oder 4 oder 6 Meter zur Flucht. Nach einem misslungenen Willenskraft-Wurf mit einem Malus von minus 5 oder 10 oder 15 müssen die Ziele für eine Dauer von 1 oder 1 oder 2 Runden fliehen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Trifft 1 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Trifft 2 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Trifft 3 Gegner. Flucht für 2 Runden nach misslungenem Willenskraft-Wurf minus 15"
     }
    ]
   },
   {
    "name": "Atem der Verwesung",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 5 oder 6W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Feuert einen Strahl, der 1 oder 2 oder 3 Gegner nacheinander schädigt und diese zusätzlich mit Giftstufe 2 oder 3 oder 4 vergiftet. Direkt angrenzende Personen erhalten ebenfalls dieses Gift.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Strahl",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 1 Gegner. Verursacht Giftstufe 2. Angrenzende Einheiten werden vergiftet"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Strahl",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 2 Gegner. Verursacht Giftstufe 3. Angrenzende Einheiten werden vergiftet"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Strahl",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft 3 Gegner. Verursacht Giftstufe 4. Angrenzende Einheiten werden vergiftet"
     }
    ]
   },
   {
    "name": "Rauch Rüstung",
    "ast": "Abgrund Jäger",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du hast für 1 oder 2 oder 3 Runden lang eine magische Rüstung von plus 10 oder 15 oder 20 auf ein einzelnes Ziel. Du bist um 10 oder 20 oder 30 weniger gut zu erkennen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 1 Runde. plus 10 Rüstung und du bist um 10 weniger gut zu erkennen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 2 Runden. plus 15 Rüstung und du bist um 20 weniger gut zu erkennen"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 3 Runden. plus 20 Rüstung und du bist um 30 weniger gut zu erkennen"
     }
    ]
   },
   {
    "name": "Lebensentzug",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Verursacht 4 oder 5 oder 6W10 magischen Schaden auf eine Reichweite von 3 oder 5 oder 10 Meter bei 1 oder 1 oder 2 Zielen. Du wirst um 50 Prozent des zugefügten Schadens geheilt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Ziel",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Ziel",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 3,
      "reichweite": "10 Meter auf 2 Ziele",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     }
    ]
   },
   {
    "name": "Trugbild",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du wirst für eine Dauer von 1 oder 1 oder 2 Runden komplett unsichtbar. Gleichzeitig lässt du an deiner aktuellen Position ein Spiegelbild als einzelnes Ziel zurück. Dieses Trugbild zieht die Aufmerksamkeit auf sich, sodass Feinde es zu 30 oder 60 oder 90 Prozent für eine Runde lang prioritär angreifen. Sobald du selbst angreifst oder eine ähnliche Aktion ausführst, wirst du sofort wieder sichtbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 30 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 60 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "2 Runden unsichtbar. Spiegelbild lenkt Gegner zu 90 Prozent ab. Bricht bei eigenem Angriff"
     }
    ]
   },
   {
    "name": "Eisstachel",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf einsetzbar. Das Ziel verliert minus 10 oder 15 oder 20 Rüstung über eine Dauer von 1W6 Runden. Nach der Anwendung hat der Skill 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Reduziert Rüstung um minus 10 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Reduziert Rüstung um minus 15 für 1W6 Runden. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Reduziert Rüstung um minus 20 für 1W6 Runden. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Schädelklirren",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Erschafft eine Druckwelle im Umkreis von 3 oder 5 oder 7 Meter. Gegner im Umkreis müssen einen Willenskraft-Wurf gegen einen Schwierigkeitsgrad von 5 oder 10 oder 15 bestehen. Misslingt dieser Wurf, verlieren die betroffenen Ziele sofort 1 Aktion.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "effekt": "Willenskraft-Wurf Schwierigkeitsgrad 5 oder Verlust von 1 Aktion"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Umkreis",
      "effekt": "Willenskraft-Wurf Schwierigkeitsgrad 10 oder Verlust von 1 Aktion"
     },
     {
      "level": 3,
      "reichweite": "7 Meter Umkreis",
      "effekt": "Willenskraft-Wurf Schwierigkeitsgrad 15 oder Verlust von 1 Aktion"
     }
    ]
   },
   {
    "name": "Welle der Heilung",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 3,
    "info": "Aura heilt jeden Verbündeten im Umkreis von 2 oder 4 oder 6 Meter um 4 oder 5 oder 6W10 Heilung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt jeden Verbündeten im Umkreis"
     }
    ]
   },
   {
    "name": "Gedankenkontrolle",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Übernimmt die volle Kontrolle über 1 oder 1 oder 2 Gegner in einer Reichweite von 3 oder 5 oder 7 Meter für eine Dauer von 2 Runden. Betroffene Einheiten müssen einen Willenskraft-Wurf mit einem Malus von minus 15 oder 10 oder 5 bestehen, um dem Effekt zu widerstehen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Gegner",
      "effekt": "Kontrolle für 2 Runden außer bei bestandenem Willenskraft-Wurf minus 15"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Gegner",
      "effekt": "Kontrolle für 2 Runden außer bei bestandenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "7 Meter auf 2 Gegner",
      "effekt": "Kontrolle für 2 Runden außer bei bestandenem Willenskraft-Wurf minus 5"
     }
    ]
   },
   {
    "name": "Arkaner Rauch",
    "ast": "Abgrund Jäger",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch auf eine Reichweite von 2 oder 4 oder 6 Meter. Alle Feinde im betroffenen Umkreis werden mit Giftstufe 4 oder 5 oder 6 infiziert und erleiden zusätzlich plus 2 oder 3 oder 4 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Alle Feinde im Umkreis erhalten Giftstufe 4 und plus 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Alle Feinde im Umkreis erhalten Giftstufe 5 und plus 3 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Alle Feinde im Umkreis erhalten Giftstufe 6 und plus 4 Blutungen"
     }
    ]
   },
   {
    "name": "Biss",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch basierend auf Stärke plus 2 oder 3 oder 4W10 im Nahkampf. Du beißt ein direkt angrenzendes Ziel. Der Angriff besitzt 0 oder 5 oder 10 rüstungsbrechend und verursacht plus 1 oder 1 oder 2 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 2W10",
      "schadenArt": "physisch",
      "effekt": "0 rüstungsbrechend. Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 3W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. Verursacht plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 4W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. Verursacht plus 2 Blutungen"
     }
    ]
   },
   {
    "name": "Bodyslam",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch von 2 oder 3 oder 4W10 im Nahkampf. Funktioniert nur, wenn du dich in dieser Runde mindestens 2 Meter bewegt hast. Das Ziel fliegt nach einem misslungenen Schwellenwert-Wurf um 1 oder 2 oder 3W4 Meter zurück.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 1W4 Meter zurück"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 2W4 Meter zurück"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 2 Meter Bewegung. Bei misslungenem Schwellenwert fliegt das Ziel 3W4 Meter zurück"
     }
    ]
   },
   {
    "name": "Monster Lord",
    "ast": "OrcraLord",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt dir in deiner Monsterform permanent zusätzliche plus 50 oder 75 oder 100 Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 50 Lebenspunkte in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 75 Lebenspunkte in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 100 Lebenspunkte in Monsterform"
     }
    ]
   },
   {
    "name": "Pure Muskeln",
    "ast": "OrcraLord",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Erhöht deinen Stärke-Wert in deiner Monsterform zusätzlich um plus 10 oder 20 oder 30 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 Stärke in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 20 Stärke in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 30 Stärke in Monsterform"
     }
    ]
   },
   {
    "name": "Schrecken der Meere",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Zwingt 1 oder 2 oder 3 Gegner in einer Reichweite von 2 oder 4 oder 6 Meter zur Flucht. Nach einem misslungenen Willenskraft-Wurf mit einem Malus von minus 5 oder 10 oder 15 müssen die Ziele für eine Dauer von 1 oder 1 oder 2 Runden fliehen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Trifft 1 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Trifft 2 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Trifft 3 Gegner. Flucht für 2 Runden nach misslungenem Willenskraft-Wurf minus 15"
     }
    ]
   },
   {
    "name": "Aquaknarre",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Ist 1 oder 2 oder 3-mal pro Kampf nutzbar. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad minus 5 oder 10 oder 15 bestehen, ansonsten wird es 1W4 Meter weggespült. Bei der Benutzung löschst du alle Feuermarker bei dir selbst und deinem Ziel komplett. Nach Anwendung des Skills hast du 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad minus 5 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad minus 10 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Schwellenwert-Wurf Schwierigkeitsgrad minus 15 oder 1W4 Meter wegspülen. Löscht alle Feuermarker. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Respektschelle",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf um plus 1 oder 2 oder 3W10. Verursacht zusätzlich plus 1 oder 1 oder 2 Blutungen. Bei einem Treffer besteht eine Chance von 20 oder 40 oder 60 Prozent, dass der Gegner für 1 Runde betäubt wird.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 1W10",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung. 20 Prozent Chance auf Betäubung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung. 40 Prozent Chance auf Betäubung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen. 60 Prozent Chance auf Betäubung"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Spot",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erzwingt die Aufmerksamkeit eines Gegners in einer Reichweite von 5 oder 7 oder 10 Meter. Das Ziel besitzt für eine Dauer von 2 oder 2 oder 3 Runden Aggro und darf ausschließlich dich angreifen. Gegen Angriffe dieses Ziels erhältst du einen Bonus von plus 10 oder 15 oder 20 Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "Zwingt Ziel für 2 Runden zum Angriff. Gewährt plus 10 Rüstung gegen dieses Ziel"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "effekt": "Zwingt Ziel für 2 Runden zum Angriff. Gewährt plus 15 Rüstung gegen dieses Ziel"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "Zwingt Ziel für 3 Runden zum Angriff. Gewährt plus 20 Rüstung gegen dieses Ziel"
     }
    ]
   },
   {
    "name": "Schallschuss",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Linienreichweite von 3 oder 6 oder 9 Meter. Alle getroffenen Ziele in der geraden Linie müssen einen Betäubungswurf von 40 oder 60 oder 80 Prozent bestehen, ansonsten sind sie für eine Dauer von 1 oder 1 oder 2 Runden betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Linie",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "40 Prozent Betäubungswurf erforderlich oder 1 Runde betäubt"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Linie",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "60 Prozent Betäubungswurf erforderlich oder 1 Runde betäubt"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "80 Prozent Betäubungswurf erforderlich oder 2 Runden betäubt"
     }
    ]
   },
   {
    "name": "Wasserschild",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Ein Ziel in einer Reichweite von 3 oder 6 oder 9 Meter erhält für eine Dauer von 3 oder 4 oder 5 Runden eine magische Rüstung von plus 10 oder 20 oder 30 Rüstung. Alle aktiven Feuermarker auf dem Ziel erlöschen sofort und erlittener Feuerschaden wird um minus 50 Prozent reduziert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 10 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 20 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schadenArt": "magisch",
      "effekt": "Hält 5 Runden. plus 30 Rüstung. Löscht alle Feuermarker. minus 50 Prozent Feuerschaden"
     }
    ]
   },
   {
    "name": "Welle der Korrosion",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einem Umkreis von 2 oder 3 oder 4 Meter. Alle Personen im Umkreis erleiden diesen Schaden und erhalten zusätzlich Giftstufe 3 oder 4 oder 5.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 3"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 4"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 5"
     }
    ]
   },
   {
    "name": "Verschlingen",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch im Nahkampf. Es besteht eine Chance von 20 oder 40 oder 60 Prozent, ein angrenzendes Ziel für eine Dauer von 1W4 Runden komplett zu verschlingen. Währenddessen erhält das Ziel Giftstufe 4 oder 5 oder 6 sowie plus 3 oder 4 oder 5 Blutungen. Misslingt der Verschlingungsversuch komplett, erleidet der Anwender selbst sofort 4W10 Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schadenArt": "magisch",
      "effekt": "20 Prozent Erfolgschance für 1W4 Runden Verschlingen. Ziel erhält Giftstufe 4 und plus 3 Blutungen. Fehlschlag gibt Anwender 4W10 Schaden"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schadenArt": "magisch",
      "effekt": "40 Prozent Erfolgschance für 1W4 Runden Verschlingen. Ziel erhält Giftstufe 5 und plus 4 Blutungen. Fehlschlag gibt Anwender 4W10 Schaden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schadenArt": "magisch",
      "effekt": "60 Prozent Erfolgschance für 1W4 Runden Verschlingen. Ziel erhält Giftstufe 6 und plus 5 Blutungen. Fehlschlag gibt Anwender 4W10 Schaden"
     }
    ]
   },
   {
    "name": "Welle",
    "ast": "OrcraLord",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 6 oder 7 oder 8W10 in einer Reichweite von 2 oder 4 oder 6 Meter. Ist 1 oder 1 oder 2-mal pro Kampf nutzbar. Eine Welle mit einer Breite von 2 oder 3 oder 4 Meter trifft die ersten Gegner in ihrer Bahn. Die betroffenen Gegner werden bei einem misslungenen Stärkewurf um 1 oder 2 oder 3W4 Meter mitgerissen. Nach Anwendung des Skills hat der Zauber 3 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Distanz auf 2 Meter breite Welle",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Bei misslungenem Stärkewurf 1W4 Meter mitgerissen. 3 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Distanz auf 3 Meter breite Welle",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Bei misslungenem Stärkewurf 2W4 Meter mitgerissen. 3 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Distanz auf 4 Meter breite Welle",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Bei misslungenem Stärkewurf 3W4 Meter mitgerissen. 3 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Monster",
    "ast": "Schattenskellet",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt dir in deiner Monsterform permanent zusätzliche plus 25 oder 50 oder 75 Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 25 Lebenspunkte in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 50 Lebenspunkte in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 75 Lebenspunkte in Monsterform"
     }
    ]
   },
   {
    "name": "Ich bin dann mal weg",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Du wirst auf ein einzelnes Ziel für eine Dauer von 1 oder 2 oder 3 Runden komplett unsichtbar. Dieser Zustand bricht sofort ab sobald du Schaden erleidest, einen Angriff ausführst oder eine aktive Aktion startest.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Unsichtbarkeit für 1 Runde. Bricht bei Schaden, Angriff oder Aktion ab"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Unsichtbarkeit für 2 Runden. Bricht bei Schaden, Angriff oder Aktion ab"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Unsichtbarkeit für 3 Runden. Bricht bei Schaden, Angriff oder Aktion ab"
     }
    ]
   },
   {
    "name": "Verstärker der Leiden",
    "ast": "Schattenskellet",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf und Fernkampf. Du machst plus 1 oder 2 oder 3W10 zusätzlichen Schaden pro verschiedenen negativen Statuseffekt auf dem Ziel wie Blutung, Giftstufe und Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 1W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 2W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "plus 3W10 Schaden pro verschiedenen Statuseffekt auf dem Ziel"
     }
    ]
   },
   {
    "name": "Schlitzer",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Fügt einem Gegner Nahkampfschaden und plus 1 oder 2 oder 3 Blutungen zu.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Waffe",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen"
     }
    ]
   },
   {
    "name": "Fluch",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Du selbst bekommst 3 oder 2 oder 1W10 Schaden. 1 oder 1 oder 2 Ziele bekommen Schaden und schlafen zu 20 oder 40 oder 60 Prozent für 1W4 Runden. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 3W10 Eigenschaden. 1 Ziel schläft zu 20 Prozent für 1W4 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 2W10 Eigenschaden. 1 Ziel schläft zu 40 Prozent für 1W4 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 1W10 Eigenschaden. 2 Ziele schlafen zu 60 Prozent für 1W4 Runden"
     }
    ]
   },
   {
    "name": "Knochenmauer",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erschafft in einer Reichweite von 6 oder 9 oder 12 Meter eine physische, 3 oder 4 oder 5 Meter lange Knochenmauer im Raum. Die Mauer blockiert zuverlässig insgesamt 1 oder 2 oder 3 Angriffe komplett, bevor sie zerbricht.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "6 Meter Distanz auf 3 Meter Länge",
      "effekt": "Blockiert insgesamt 1 Angriff"
     },
     {
      "level": 2,
      "reichweite": "9 Meter Distanz auf 4 Meter Länge",
      "effekt": "Blockiert insgesamt 2 Angriffe"
     },
     {
      "level": 3,
      "reichweite": "12 Meter Distanz auf 5 Meter Länge",
      "effekt": "Blockiert insgesamt 3 Angriffe"
     }
    ]
   },
   {
    "name": "Trugbild",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du wirst für eine Dauer von 1 oder 1 oder 2 Runden komplett unsichtbar. Gleichzeitig lässt du an deiner aktuellen Position ein Spiegelbild als einzelnes Ziel zurück. Dieses Trugbild zieht die Aufmerksamkeit auf sich, sodass Feinde es zu 30 oder 60 oder 90 Prozent für eine Runde lang prioritär angreifen. Sobald du selbst angreifst oder eine ähnliche Aktion ausführst, wirst du sofort wieder sichtbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 30 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 60 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "2 Runden unsichtbar. Spiegelbild lenkt Gegner zu 90 Prozent ab. Bricht bei eigenem Angriff"
     }
    ]
   },
   {
    "name": "Dunkle Rüstung",
    "ast": "Schattenskellet",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du hast für 1 oder 2 oder 3 Runden lang eine magische Rüstung von plus 10 oder 15 oder 20 auf ein einzelnes Ziel. Du bist um 10 oder 20 oder 30 weniger gut zu erkennen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 1 Runde. plus 10 Rüstung und du bist um 10 weniger gut zu erkennen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 2 Runden. plus 15 Rüstung und du bist um 20 weniger gut zu erkennen"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Hält 3 Runden. plus 20 Rüstung und du bist um 30 weniger gut zu erkennen"
     }
    ]
   },
   {
    "name": "Schlafstörung",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Ein bereits schlafendes Ziel in einer Reichweite von 3 oder 6 oder 9 Meter erleidet einen Albtraumeffekt. Das Ziel erleidet in den nächsten 1 oder 1 oder 2 Runden plus 1 oder 2 oder 3W10 zusätzlichen Schaden aus absolut allen Schadensquellen. Das Ziel wacht durch diesen erlittenen Schaden nicht vorzeitig auf, sondern erwacht erst regulär am Ende des Skills Schlafstörung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "plus 1W10",
      "effekt": "Hält 1 Runde. Schaden aller Quellen wird erhöht. Ziel bleibt bis zum Ende im Schlaf"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "plus 2W10",
      "effekt": "Hält 1 Runde. Schaden aller Quellen wird erhöht. Ziel bleibt bis zum Ende im Schlaf"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "plus 3W10",
      "effekt": "Hält 2 Runden. Schaden aller Quellen wird erhöht. Ziel bleibt bis zum Ende im Schlaf"
     }
    ]
   },
   {
    "name": "Angriff aus dem Dunkeln",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10 im Nahkampf oder Fernkampf. Verursacht zusätzlich plus 1 oder 1 oder 2 Blutungen. Dieser Angriff ist ausschließlich nutzbar, wenn du aktiv versteckt bist. Du bleibst trotz der Attacke zu einer Chance von 25 oder 50 oder 75 Prozent unentdeckt verborgen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Bedingung versteckt. plus 1 Blutung. 25 Prozent Chance unentdeckt zu bleiben"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Bedingung versteckt. plus 1 Blutung. 50 Prozent Chance unentdeckt zu bleiben"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf oder Fernkampf",
      "schaden": "plus 5W10",
      "schadenArt": "physisch",
      "effekt": "Bedingung versteckt. plus 2 Blutungen. 75 Prozent Chance unentdeckt zu bleiben"
     }
    ]
   },
   {
    "name": "Meuchelmörder",
    "ast": "Schattenskellet",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Erhöht deinen Schaden für 1 oder 2 oder 3 Runden um plus 2 oder 3 oder 4W10 und verursacht zusätzlich Giftstufe 2 oder 3 oder 4. Das applizierte Gift ist um eine Giftstufe höher, wenn das Ziel bereits eine Blutung hat.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W10",
      "schadenArt": "magisch",
      "effekt": "Hält 1 Runde. Verursacht Giftstufe 2. Giftstufe plus 1 wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W10",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. Verursacht Giftstufe 3. Giftstufe plus 1 wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 4W10",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. Verursacht Giftstufe 4. Giftstufe plus 1 wenn das Ziel blutet"
     }
    ]
   },
   {
    "name": "Schattenschritt",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Du löst dich an deinem Standort komplett in Rauch auf und materialisierst dich in einer Reichweite von 5 oder 10 oder 20 Meter neu. Du bleibst nach dem Auftauchen zu 25 oder 50 oder 75 Prozent heimlich und unentdeckt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "25 Prozent Chance unentdeckt zu bleiben"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "50 Prozent Chance unentdeckt zu bleiben"
     },
     {
      "level": 3,
      "reichweite": "20 Meter",
      "effekt": "75 Prozent Chance unentdeckt zu bleiben"
     }
    ]
   },
   {
    "name": "Schwarze Kugel",
    "ast": "Schattenskellet",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von heftigen 8 oder 9 oder 10W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Die gewaltige Entladung fordert jedoch einen harten Tribut: Der Anwender erleidet selbst sofort unaufhaltsamen physischen Eigenschaden von 1W20 oder 1W12 oder 1W10 Lebenspunkten.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "8W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erleidet sofort 1W20 Eigenschaden"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "9W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erleidet sofort 1W12 Eigenschaden"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "10W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erleidet sofort 1W10 Eigenschaden"
     }
    ]
   },
   {
    "name": "Seelenpakt",
    "ast": "Schattenskellet",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Du opferst auf ein einzelnes Ziel sofort 50 Prozent deiner aktuellen Lebenspunkte. Als Gegenleistung wird deine gesamte finstere Macht entfesselt: Für eine Dauer von 1 oder 2 oder 3 Runden verdoppelst du den exakten Effekt all deiner Fähigkeiten. Dies gilt gleichermaßen für verursachten Schaden, Heilung, applizierte Blutungen, verabreichte Giftstufen und gesetzte Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Kostet sofort 50 Prozent eigene Lebenspunkte. Alle Effekte sind für 1 Runde komplett verdoppelt"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Kostet sofort 50 Prozent eigene Lebenspunkte. Alle Effekte sind für 2 Runden komplett verdoppelt"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Kostet sofort 50 Prozent eigene Lebenspunkte. Alle Effekte sind für 3 Runden komplett verdoppelt"
     }
    ]
   },
   {
    "name": "Fluch",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Du selbst bekommst 3 oder 2 oder 1W10 Schaden. 1 oder 1 oder 2 Ziele bekommen Schaden und schlafen zu 20 oder 40 oder 60 Prozent für 1W4 Runden. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 3W10 Eigenschaden. 1 Ziel schläft zu 20 Prozent für 1W4 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 2W10 Eigenschaden. 1 Ziel schläft zu 40 Prozent für 1W4 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 1W10 Eigenschaden. 2 Ziele schlafen zu 60 Prozent für 1W4 Runden"
     }
    ]
   },
   {
    "name": "Knochengriff",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Ein Ziel in einer Reichweite von 10 Meter erhält für eine Dauer von 1 oder 2 oder 3 Runden minus 1 oder 2 oder 3 Meter Bewegung und minus 10 auf Handeln.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "effekt": "minus 1 Meter Bewegung und minus 10 auf Handeln für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "minus 2 Meter Bewegung und minus 10 auf Handeln für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "minus 3 Meter Bewegung und minus 10 auf Handeln für 3 Runden"
     }
    ]
   },
   {
    "name": "Blutschuss",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch in einer Reichweite von 5 Meter. Erzeuge aus deinem Blut durch das Opfern von 1W8 Lebenspunkten pro Kugel insgesamt 2 oder 3 oder 4 Blutkugeln. Jede Kugel verursacht 2W10 Schaden. Du kannst die Kugeln auf bis zu 3 verschiedene Ziele schießen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 2 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "3 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 3 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     },
     {
      "level": 3,
      "reichweite": "5 Meter",
      "schaden": "4 mal 2W10",
      "schadenArt": "magisch",
      "effekt": "Erzeugt 4 Blutkugeln. Kostet 1W8 Lebenspunkte pro Kugel. Bis zu 3 Ziele"
     }
    ]
   },
   {
    "name": "Schrecken der Meere",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Zwingt 1 oder 2 oder 3 Gegner in einer Reichweite von 2 oder 4 oder 6 Meter zur Flucht. Nach einem misslungenen Willenskraft-Wurf mit einem Malus von minus 5 oder 10 oder 15 müssen die Ziele für eine Dauer von 1 oder 1 oder 2 Runden fliehen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Trifft 1 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Trifft 2 Gegner. Flucht für 1 Runde nach misslungenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Trifft 3 Gegner. Flucht für 2 Runden nach misslungenem Willenskraft-Wurf minus 15"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Seelenrufer",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Guhl Diener",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Beschwört in einer Reichweite von 5 oder 10 oder 15 Meter insgesamt 1 oder 1 oder 2 dienende Ghule für eine Dauer von 2 oder 2 oder 3 Runden. Jeder beschworene Ghul besitzt 30 oder 60 oder 90 Lebenspunkte und einen Nahkampf-Wert von 30 oder 40 or 50. Die Angriffe der Ghule verursachen 2 oder 3 oder 4W10 Schaden und infizieren Ziele automatisch mit Giftstufe 2 oder 3 oder 4.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2W10 Diener-Schaden",
      "schadenArt": "magisch",
      "effekt": "Ruft 1 Ghul für 2 Runden. Diener hat 30 Lebenspunkte, 30 Nahkampf und appliziert Giftstufe 2"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "3W10 Diener-Schaden",
      "schadenArt": "magisch",
      "effekt": "Ruft 1 Ghul für 2 Runden. Diener hat 60 Lebenspunkte, 40 Nahkampf und appliziert Giftstufe 3"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "4W10 Diener-Schaden",
      "schadenArt": "magisch",
      "effekt": "Ruft 2 Ghule für 3 Runden. Diener haben 90 Lebenspunkte, 50 Nahkampf und applizieren Giftstufe 4"
     }
    ]
   },
   {
    "name": "Knochenmauer",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erschafft in einer Reichweite von 6 oder 9 oder 12 Meter eine physische, 3 oder 4 oder 5 Meter lange Knochenmauer im Raum. Die Mauer blockiert zuverlässig insgesamt 1 oder 2 oder 3 Angriffe komplett, bevor sie zerbricht.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "6 Meter Distanz auf 3 Meter Länge",
      "effekt": "Blockiert insgesamt 1 Angriff"
     },
     {
      "level": 2,
      "reichweite": "9 Meter Distanz auf 4 Meter Länge",
      "effekt": "Blockiert insgesamt 2 Angriffe"
     },
     {
      "level": 3,
      "reichweite": "12 Meter Distanz auf 5 Meter Länge",
      "effekt": "Blockiert insgesamt 3 Angriffe"
     }
    ]
   },
   {
    "name": "Knochenrüstung",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Ein einzelnes Ziel in einer Reichweite von 5 oder 10 oder 15 Meter erhält plus 5 oder 10 oder 15 physische Rüstung über eine Dauer von 3 oder 4 oder 5 Runden. Gleichzeitig verringert sich die Bewegung des Ziels um minus 1 Meter.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "plus 5 physische Rüstung für 3 Runden. Belegt das Ziel mit minus 1 Meter Bewegung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "effekt": "plus 10 physische Rüstung für 4 Runden. Belegt das Ziel mit minus 1 Meter Bewegung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "effekt": "plus 15 physische Rüstung für 5 Runden. Belegt das Ziel mit minus 1 Meter Bewegung"
     }
    ]
   },
   {
    "name": "Lebensentzug",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Verursacht 4 oder 5 oder 6W10 magischen Schaden auf eine Reichweite von 3 oder 5 oder 10 Meter bei 1 oder 1 oder 2 Zielen. Du wirst um 50 Prozent des zugefügten Schadens geheilt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Ziel",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Ziel",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     },
     {
      "level": 3,
      "reichweite": "10 Meter auf 2 Ziele",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Heilt den Anwender um 50 Prozent des Schadens"
     }
    ]
   },
   {
    "name": "Knochenspeer",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 4 oder 5 oder 6W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Hat 5 oder 10 oder 15 rüstungsbrechend. Ist 1 oder 1 oder 2-mal pro Kampf nutzbar. Du schleuderst einen Knochenspeer, der 2 oder 3 oder 4 Ziele in einer Linie aufspießt. Nach Anwendung des Skills hast du 2 Runden Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "5 rüstungsbrechend. Spießt 2 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "10 rüstungsbrechend. Spießt 3 Ziele auf. 1-mal pro Kampf. 2 Runden Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Linie",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "15 rüstungsbrechend. Spießt 4 Ziele auf. 2-mal pro Kampf. 2 Runden Abklingzeit"
     }
    ]
   },
   {
    "name": "Ruf des Grabes",
    "ast": "Seelenrufer",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Wenn du im Nahkampf einen Todesstoß beziehungsweise Kill erzielst, besteht eine Chance von 25 oder 50 oder 75 Prozent, dass das besiegte Ziel sofort als verbündetes Skelett auf Stufe 1 aufersteht.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "effekt": "25 Prozent Chance auf Skelettauferstehung bei Kill"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "effekt": "50 Prozent Chance auf Skelettauferstehung bei Kill"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "effekt": "75 Prozent Chance auf Skelettauferstehung bei Kill"
     }
    ]
   },
   {
    "name": "Skelettbeherrschung",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Ermöglicht es dir, in einer Reichweite von 7 oder 12 oder 15 Meter am Boden liegende Leichen anzuvisieren und sie für eine Dauer von 2 oder 3 oder 4 Runden in 2 oder 3 oder 4 treue Skelette zu verwandeln. Die gerufenen Skelette besitzen einen Nahkampf-Wert von 30 oder 40 oder 50, schlagen für 2 oder 3 oder 4W10 physischen Schaden zu und verursachen zusätzlich plus 1 oder 1 oder 2 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "7 Meter",
      "schaden": "2W10 Diener-Schaden",
      "schadenArt": "physisch",
      "effekt": "Erweckt 2 Skelette aus Leichen für 2 Runden. Skelett-Werte: 30 Nahkampf, plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "12 Meter",
      "schaden": "3W10 Diener-Schaden",
      "schadenArt": "physisch",
      "effekt": "Erweckt 3 Skelette aus Leichen für 3 Runden. Skelett-Werte: 40 Nahkampf, plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "4W10 Diener-Schaden",
      "schadenArt": "physisch",
      "effekt": "Erweckt 4 Skelette aus Leichen für 4 Runden. Skelett-Werte: 50 Nahkampf, plus 2 Blutungen"
     }
    ]
   },
   {
    "name": "Puppenspieler",
    "ast": "Seelenrufer",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Verstärkt permanent all deine gerufenen Kreaturen und Diener im Kampf. Ihre Lebensdauer erhöht sich um plus 1 oder 2 oder 2 Runden. Zusätzlich verursachen sie plus 1 oder 2 oder 3W10 zusätzlichen Schaden, erhalten plus 5 oder 10 or 15 Rüstung und besitzen permanent plus 5 oder 10 oder 20 zusätzliche maximale Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "schaden": "Kreaturen: plus 1W10",
      "effekt": "Kreaturen-Dauer: plus 1 Runde. Kreaturen-Rüstung: plus 5. Kreaturen-Lebenspunkte: plus 5"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "schaden": "Kreaturen: plus 2W10",
      "effekt": "Kreaturen-Dauer: plus 2 Runden. Kreaturen-Rüstung: plus 10. Kreaturen-Lebenspunkte: plus 10"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "schaden": "Kreaturen: plus 3W10",
      "effekt": "Kreaturen-Dauer: plus 2 Runden. Kreaturen-Rüstung: plus 15. Kreaturen-Lebenspunkte: plus 20"
     }
    ]
   },
   {
    "name": "Skelett Magier",
    "ast": "Seelenrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Beschwört in einer Reichweite von 5 oder 10 oder 15 Meter insgesamt 1 oder 2 oder 3 mächtige Skelettmagier für eine Dauer von 2 oder 3 oder 4 Runden. Ein Skelettmagier besitzt 10 oder 20 oder 30 Lebenspunkte und verfügt über einen Monster- bzw. Zauberwert von 40 oder 50 oder 60. Sie unterstützen dich aktiv mit Fernkampf-Magie und beherrschen die Zaubersprüche Funke, Feuerball sowie Feuersturm.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "skaliert über Zauber",
      "schadenArt": "magisch",
      "effekt": "Ruft 1 Magier für 2 Runden. Diener-Lebenspunkte: 10. Zauberwert: 40. Beherrscht Funke, Feuerball, Feuersturm"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "skaliert über Zauber",
      "schadenArt": "magisch",
      "effekt": "Ruft 2 Magier für 3 Runden. Diener-Lebenspunkte: 20. Zauberwert: 50. Beherrscht Funke, Feuerball, Feuersturm"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "skaliert über Zauber",
      "schadenArt": "magisch",
      "effekt": "Ruft 3 Magier für 4 Runden. Diener-Lebenspunkte: 30. Zauberwert: 60. Beherrscht Funke, Feuerball, Feuersturm"
     }
    ]
   },
   {
    "name": "Fluch",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Du selbst bekommst 3 oder 2 oder 1W10 Schaden. 1 oder 1 oder 2 Ziele bekommen Schaden und schlafen zu 20 oder 40 oder 60 Prozent für 1W4 Runden. Dieser Effekt unterliegt nicht der Spielleitung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 3W10 Eigenschaden. 1 Ziel schläft zu 20 Prozent für 1W4 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 2W10 Eigenschaden. 1 Ziel schläft zu 40 Prozent für 1W4 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Anwender erhält 1W10 Eigenschaden. 2 Ziele schlafen zu 60 Prozent für 1W4 Runden"
     }
    ]
   },
   {
    "name": "Wunden aufreißen",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch plus 2 oder 3 oder 4W10 im Nahkampf. Verursacht plus 1 oder 2 oder 3 Blutungen. Gilt als Extra-Aktion, wenn das Ziel bereits verletzt ist.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "plus 1 Blutung. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "plus 2 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "plus 3 Blutungen. Ist eine Extra-Aktion wenn das Ziel verletzt ist"
     }
    ]
   },
   {
    "name": "Monster",
    "ast": "Sirene",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt dir in deiner Monsterform permanent zusätzliche plus 25 oder 50 oder 75 Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 25 Lebenspunkte in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 50 Lebenspunkte in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 75 Lebenspunkte in Monsterform"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Sirene",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Kopfnuss",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch von 2 oder 3 oder 4W10 im Nahkampf. Das Ziel ist nach dem Treffer zu 25 oder 50 oder 75 Prozent für 1 Runde betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "25 Prozent Chance auf Betäubung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "50 Prozent Chance auf Betäubung für 1 Runde"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "75 Prozent Chance auf Betäubung für 1 Runde"
     }
    ]
   },
   {
    "name": "Alptraumbringer",
    "ast": "Sirene",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Wenn du Angriffe gegen bereits schlafende Ziele ausführst, verursachst du permanent plus 2 oder 3 oder 4W10 zusätzlichen magischen Alptraumschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W10 auf schlafende Ziele",
      "schadenArt": "magisch",
      "effekt": "Erhöht den Schaden ausschließlich gegen Ziele im Zustand Schlaf"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W10 auf schlafende Ziele",
      "schadenArt": "magisch",
      "effekt": "Erhöht den Schaden ausschließlich gegen Ziele im Zustand Schlaf"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 4W10 auf schlafende Ziele",
      "schadenArt": "magisch",
      "effekt": "Erhöht den Schaden ausschließlich gegen Ziele im Zustand Schlaf"
     }
    ]
   },
   {
    "name": "Flüstern der Schatten",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Lullt ein Ziel in einer Reichweite von 3 oder 6 oder 9 Meter ein. Es besteht eine harte Chance von 70 oder 80 oder 90 Prozent Schlafeffekt, dass das Ziel für 1 Runde in tiefen Schlaf verfällt. Das Ziel erwacht automatisch direkt zu Beginn seiner nächsten eigenen Runde. Auf diesen speziellen Skill findet die passive Fähigkeit Traumherrscher keine Anwendung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "effekt": "70 Prozent Schlafchance für 1 Runde. Erwacht bei Rundenstart. Traumherrscher wirkt nicht"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "effekt": "80 Prozent Schlafchance für 1 Runde. Erwacht bei Rundenstart. Traumherrscher wirkt nicht"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "effekt": "90 Prozent Schlafchance für 1 Runde. Erwacht bei Rundenstart. Traumherrscher wirkt nicht"
     }
    ]
   },
   {
    "name": "Schlafstörung",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Ein bereits schlafendes Ziel in einer Reichweite von 3 oder 6 oder 9 Meter erleidet einen Albtraumeffekt. Das Ziel erleidet in den nächsten 1 oder 1 oder 2 Runden plus 1 oder 2 oder 3W10 zusätzlichen Schaden aus absolut allen Schadensquellen. Das Ziel wacht durch diesen erlittenen Schaden nicht vorzeitig auf, sondern erwacht erst regulär am Ende des Skills Schlafstörung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "plus 1W10",
      "effekt": "Hält 1 Runde. Schaden aller Quellen wird erhöht. Ziel bleibt bis zum Ende im Schlaf"
     },
     {
      "level": 2,
      "reichweite": "6 Meter",
      "schaden": "plus 2W10",
      "effekt": "Hält 1 Runde. Schaden aller Quellen wird erhöht. Ziel bleibt bis zum Ende im Schlaf"
     },
     {
      "level": 3,
      "reichweite": "9 Meter",
      "schaden": "plus 3W10",
      "effekt": "Hält 2 Runden. Schaden aller Quellen wird erhöht. Ziel bleibt bis zum Ende im Schlaf"
     }
    ]
   },
   {
    "name": "Traumherrscher",
    "ast": "Sirene",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine Schlafeffekt-Chancen im Kampf. Du erhältst einen Bonus von plus 5 oder 10 oder 15 Prozent Einschlafchance auf deine Schlaffähigkeiten. Dieser Bonus wird separat für jeden einzelnen auf dem Gegner aktiven negativen Statuseffekt wie Blutung, Giftstufe oder Feuermarker hinzugerechnet.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 5 Prozent Einschlafchance pro aktivem Debuff auf dem Ziel"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 10 Prozent Einschlafchance pro aktivem Debuff auf dem Ziel"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 15 Prozent Einschlafchance pro aktivem Debuff auf dem Ziel"
     }
    ]
   },
   {
    "name": "Schallwelle",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Erschafft ein schlafbringendes Lied im Umkreis von 2 oder 4 oder 6 Meter. Alle Personen im betroffenen Radius verfallen zu einer Wahrscheinlichkeit von 20 oder 40 oder 60 Prozent Schlafeffekt für eine Dauer von 1W4 Runden in tiefen Schlaf.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "effekt": "20 Prozent Schlafeffekt-Chance für 1W4 Runden im Radius"
     },
     {
      "level": 2,
      "reichweite": "4 Meter Umkreis",
      "effekt": "40 Prozent Schlafeffekt-Chance für 1W4 Runden im Radius"
     },
     {
      "level": 3,
      "reichweite": "6 Meter Umkreis",
      "effekt": "60 Prozent Schlafeffekt-Chance für 1W4 Runden im Radius"
     }
    ]
   },
   {
    "name": "Welle der Korrosion",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einem Umkreis von 2 oder 3 oder 4 Meter. Alle Personen im Umkreis erleiden diesen Schaden und erhalten zusätzlich Giftstufe 3 oder 4 oder 5.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 3"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 4"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 5"
     }
    ]
   },
   {
    "name": "Traumfresser",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von heftigen 5 oder 6 oder 7W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Dieser Skill ist ausschließlich gegen bereits schlafende Ziele in Reichweite einsetzbar. Sollte der Angriff das Ziel töten und einen Kill erzielen, erhältst du sofort plus 1 zusätzliche Aktion geschenkt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Nur gegen schlafende Ziele. Gewährt plus 1 Aktion bei einem Kill"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Nur gegen schlafende Ziele. Gewährt plus 1 Aktion bei einem Kill"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "Nur gegen schlafende Ziele. Gewährt plus 1 Aktion bei einem Kill"
     }
    ]
   },
   {
    "name": "Gedankenkontrolle",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Übernimmt die volle Kontrolle über 1 oder 1 oder 2 Gegner in einer Reichweite von 3 oder 5 oder 7 Meter für eine Dauer von 2 Runden. Betroffene Einheiten müssen einen Willenskraft-Wurf mit einem Malus von minus 15 oder 10 oder 5 bestehen, um dem Effekt zu widerstehen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter auf 1 Gegner",
      "effekt": "Kontrolle für 2 Runden außer bei bestandenem Willenskraft-Wurf minus 15"
     },
     {
      "level": 2,
      "reichweite": "5 Meter auf 1 Gegner",
      "effekt": "Kontrolle für 2 Runden außer bei bestandenem Willenskraft-Wurf minus 10"
     },
     {
      "level": 3,
      "reichweite": "7 Meter auf 2 Gegner",
      "effekt": "Kontrolle für 2 Runden außer bei bestandenem Willenskraft-Wurf minus 5"
     }
    ]
   },
   {
    "name": "Ketten des Jenseits",
    "ast": "Sirene",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Belegt 2 oder 3 oder 4 Ziele in einer Reichweite von 2 oder 4 oder 6 Meter mit Geisterketten. Betroffene Einheiten verlieren permanent für eine lange Dauer von 5 Runden minus 10 auf Handeln und erleiden Abzüge auf ihre Bewegungsweite. Zusätzlich müssen alle Ziele sofort einen schweren Willenskraft-Wurf gegen einen Schwierigkeitsgrad von 20 ablegen; misslingt dieser, können sie sich für eine Dauer von 1 oder 2 oder 3 Runden überhaupt nicht mehr bewegen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter auf 2 Ziele",
      "effekt": "Malus für 5 Runden: minus 10 Handeln und verringerte Bewegung. Willenskraft-Wurf 20 oder 1 Runde komplett unbeweglich"
     },
     {
      "level": 2,
      "reichweite": "4 Meter auf 3 Ziele",
      "effekt": "Malus für 5 Runden: minus 10 Handeln und verringerte Bewegung. Willenskraft-Wurf 20 oder 2 Runden komplett unbeweglich"
     },
     {
      "level": 3,
      "reichweite": "6 Meter auf 4 Ziele",
      "effekt": "Malus für 5 Runden: minus 10 Handeln und verringerte Bewegung. Willenskraft-Wurf 20 oder 3 Runden komplett unbeweglich"
     }
    ]
   },
   {
    "name": "Bis bald",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch von 3 oder 4 oder 5W10 im Nahkampf. Du schleuderst ein direkt angrenzendes Ziel 3 oder 5 oder 10 Meter weit weg. Die weggeschleuderte Person aktiviert bei ihrer Landung automatisch den Flächeneffekt von Sprungangriff auf Stufe 1 oder 2 oder 3.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Schleudert das Ziel 3 Meter weit. Aktiviert bei Landung Sprungangriff-Effekt Stufe 1"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Schleudert das Ziel 5 Meter weit. Aktiviert bei Landung Sprungangriff-Effekt Stufe 2"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Schleudert das Ziel 10 Meter weit. Aktiviert bei Landung Sprungangriff-Effekt Stufe 3"
     }
    ]
   },
   {
    "name": "Pure Muskeln +",
    "ast": "Steintroll",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Erhöht deinen Stärke-Wert in deiner Monsterform massiv um plus 15 oder 30 oder 50 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 15 Stärke in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 30 Stärke in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 50 Stärke in Monsterform"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Steintroll",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Riese",
    "ast": "Steintroll",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Verleiht dir gigantische Ausmaße. Erhöht deine maximalen Lebenspunkte permanent um plus 250 oder 500 oder 1000 Lebenspunkte. Aufgrund deiner Masse verringert sich deine Bewegungsweite dauerhaft um minus 2 oder 1 oder 1 Meter und dein Handeln-Wert sinkt um minus 30 oder 20 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 250 maximale Lebenspunkte. minus 2 Meter Bewegungsweite. minus 30 Handeln"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 500 maximale Lebenspunkte. minus 1 Meter Bewegungsweite. minus 20 Handeln"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 1000 maximale Lebenspunkte. minus 1 Meter Bewegungsweite. minus 10 Handeln"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Ablenken",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Provoziert Gegner im Umkreis auf eine Reichweite von 3 oder 7 oder 10 Meter. Zu einer Wahrscheinlichkeit von 30 oder 60 oder 90 Prozent laufen deine Gegner für eine Dauer von 1 oder 1 oder 2 Runden direkt auf dich zu und versuchen dich anzugreifen. Für diese Zeit erhältst du plus 10 oder 15 oder 20 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Umkreis",
      "effekt": "30 Prozent Spottchance für 1 Runde. Gewährt plus 10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Umkreis",
      "effekt": "60 Prozent Spottchance für 1 Runde. Gewährt plus 15 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Umkreis",
      "effekt": "90 Prozent Spottchance für 2 Runden. Gewährt plus 20 magische Rüstung"
     }
    ]
   },
   {
    "name": "Körper aus Titan",
    "ast": "Steintroll",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 10 oder 15 oder 20 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 15 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 20 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Spot",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erzwingt die Aufmerksamkeit eines Gegners in einer Reichweite von 5 oder 7 oder 10 Meter. Das Ziel besitzt für eine Dauer von 2 oder 2 oder 3 Runden Aggro und darf ausschließlich dich angreifen. Gegen Angriffe dieses Ziels erhältst du einen Bonus von plus 10 oder 15 oder 20 Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "Zwingt Ziel für 2 Runden zum Angriff. Gewährt plus 10 Rüstung gegen dieses Ziel"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "effekt": "Zwingt Ziel für 2 Runden zum Angriff. Gewährt plus 15 Rüstung gegen dieses Ziel"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "Zwingt Ziel für 3 Runden zum Angriff. Gewährt plus 20 Rüstung gegen dieses Ziel"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Schneise",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf von plus 4 oder 5 oder 6W10. Besitzt 10 oder 15 oder 20 rüstungsbrechend. Du musst eine ganze Aktion beziehungsweise Runde lang diesen Skill aufladen. Danach triffst du alle Personen in einer 5 Meter langen, geraden Linie vor dir.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 10 rüstungsbrechend. Trifft alle Ziele in der Linie"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "plus 5W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 15 rüstungsbrechend. Trifft alle Ziele in der Linie"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "plus 6W10",
      "schadenArt": "physisch",
      "effekt": "Erfordert 1 Runde Aufladezeit. 20 rüstungsbrechend. Trifft alle Ziele in der Linie"
     }
    ]
   },
   {
    "name": "Kometeneinschlag",
    "ast": "Steintroll",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Deine normalen Nahkampfangriffe schlagen erheblich härter ein. Du verursachst permanent plus 1 oder 2 oder 3W10 zusätzlichen physischen Schaden und erhältst einen Rüstungsdurchschlag von 0 oder 5 oder 10 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 1W10",
      "schadenArt": "physisch",
      "effekt": "0 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Stampfer",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch von 5 oder 6 oder 7W10 im Nahkampf. Besitzt 5 oder 10 oder 15 rüstungsbrechend. Du stampfst wuchtig auf den Boden; alle direkt angrenzenden Gegner erleiden den Schaden und werden unaufhaltsam um 1W4 Meter weggestoßen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf angrenzend",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. Stößt alle angrenzenden Gegner 1W4 Meter weg"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf angrenzend",
      "schaden": "6W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. Stößt alle angrenzenden Gegner 1W4 Meter weg"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf angrenzend",
      "schaden": "7W10",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. Stößt alle angrenzenden Gegner 1W4 Meter weg"
     }
    ]
   },
   {
    "name": "Fäuste wie Kutschen",
    "ast": "Steintroll",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Erhöht die Reichweite deiner unbewaffneten Faustangriffe permanent auf eine Distanz von 2 Feldern. Auf dem ersten Feld wird normaler Schaden appliziert, während Angriffe auf das weiter entfernte 2. Feld noch knackige 50 oder 75 oder 100 Prozent des vollen Schadens verursachen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Felder Distanz",
      "effekt": "Faustangriffe verursachen auf dem 2. Feld noch 50 Prozent Schaden"
     },
     {
      "level": 2,
      "reichweite": "2 Felder Distanz",
      "effekt": "Faustangriffe verursachen auf dem 2. Feld noch 75 Prozent Schaden"
     },
     {
      "level": 3,
      "reichweite": "2 Felder Distanz",
      "effekt": "Faustangriffe verursachen auf dem 2. Feld die vollen 100 Prozent Schaden"
     }
    ]
   },
   {
    "name": "Zermalmen",
    "ast": "Steintroll",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf von unbändigen plus 5 oder 6 oder 7W10. Die Wucht ist so gewaltig, dass dieser Angriff jegliche gegnerische Rüstung beziehungsweise Schadensreduktion komplett ignoriert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 5W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung vollständig"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 6W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung vollständig"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 7W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung vollständig"
     }
    ]
   },
   {
    "name": "Donnerwelle",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 5 oder 7 oder 10 Meter. Bei einer Verwundung besteht eine Chance von 15 oder 20 oder 25 Prozent, dass das Ziel für 3 Runden minus 1 oder 2 oder 3 Meter seiner Bewegung verliert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 15 Prozent Chance auf minus 1 Meter Bewegung für 3 Runden"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 20 Prozent Chance auf minus 2 Meter Bewegung für 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Bei Verwundung zu 25 Prozent Chance auf minus 3 Meter Bewegung für 3 Runden"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Sturmrufer",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Magischer Schild",
    "ast": "Sturmrufer",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt einem einzelnen Ziel for eine Dauer von 1 oder 2 oder 3 Runden plus 3 oder 5 oder 10 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 3 magische Rüstung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 5 magische Rüstung für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 10 magische Rüstung für 3 Runden"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Sturmrufer",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Stromstoß",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Nahkampfreichweite von 2 Meter. Du machst plus 2W10 zusätzlichen Schaden pro Rüstungsklasse des Gegners.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     },
     {
      "level": 2,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     },
     {
      "level": 3,
      "reichweite": "2 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "plus 2W10 Schaden pro gegnerischer Rüstungsklasse"
     }
    ]
   },
   {
    "name": "Ruckzuckhieb",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch plus 3 oder 4 oder 5W10. Du springst auf eine Distanz von 2 oder 4 oder 6 Meter zum Gegner, fügst Schaden zu und kannst dann zurückspringen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Springt zum Gegner und erlaubt anschließenden Rücksprung"
     }
    ]
   },
   {
    "name": "Hochspannung",
    "ast": "Sturmrufer",
    "art": "passiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch im Nahkampf und Fernkampf. Deine Nahkampfangriffe machen permanent mehr Schaden basierend auf der gegnerischen Rüstungsklasse. Du verursachst plus 1 oder 2 oder 3W8 zusätzlichen Schaden pro Rüstungsklasse des Ziels.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 1W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 2W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W8 pro Rüstungsklasse",
      "schadenArt": "magisch",
      "effekt": "Nahkampfangriffe erhalten Schadensbonus basierend auf gegnerischer Rüstungsklasse"
     }
    ]
   },
   {
    "name": "Kettenblitz",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10. Trifft 2 oder 3 oder 4 Gegner, die sich jeweils in einem Umkreis von maximal 3 Meter zueinander befinden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft up zu 2 Gegner nacheinander"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 3 Gegner nacheinander"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 4 Gegner nacheinander"
     }
    ]
   },
   {
    "name": "Trugbild",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Du wirst für eine Dauer von 1 oder 1 oder 2 Runden komplett unsichtbar. Gleichzeitig lässt du an deiner aktuellen Position ein Spiegelbild als einzelnes Ziel zurück. Dieses Trugbild zieht die Aufmerksamkeit auf sich, sodass Feinde es zu 30 oder 60 oder 90 Prozent für eine Runde lang prioritär angreifen. Sobald du selbst angreifst oder eine ähnliche Aktion ausführst, wirst du sofort wieder sichtbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 30 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "1 Runde unsichtbar. Spiegelbild lenkt Gegner zu 60 Prozent ab. Bricht bei eigenem Angriff"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "2 Runden unsichtbar. Spiegelbild lenkt Gegner zu 90 Prozent ab. Bricht bei eigenem Angriff"
     }
    ]
   },
   {
    "name": "Donnerknall",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einem Umkreis von 2 oder 3 oder 4 Meter. Alle betroffenen Einheiten im Umkreis erleiden diesen Schaden und werden zu einer Wahrscheinlichkeit von 20 oder 40 oder 60 Prozent für 1 Runde betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "20 Prozent Betäubungschance für 1 Runde im Umkreis"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "40 Prozent Betäubungschance für 1 Runde im Umkreis"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "60 Prozent Betäubungschance für 1 Runde im Umkreis"
     }
    ]
   },
   {
    "name": "Blitzangriff",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Reichweite von 3 oder 6 oder 9 Meter. Du stürmst nach vorn und alle 3 oder 4 oder 5 Gegner im Laufweg werden getroffen. Jeder erleidet Schaden und erhält 1 Statusveränderung durch die er zu 20 oder 30 oder 40 Prozent betäubt wird.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Ansturm",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 3 Gegner im Laufweg. 1 Statusveränderung mit 20 Prozent Betäubungschance"
     },
     {
      "level": 2,
      "reichweite": "6 Meter Ansturm",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 4 Gegner im Laufweg. 1 Statusveränderung mit 30 Prozent Betäubungschance"
     },
     {
      "level": 3,
      "reichweite": "9 Meter Ansturm",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 5 Gegner im Laufweg. 1 Statusveränderung mit 40 Prozent Betäubungschance"
     }
    ]
   },
   {
    "name": "Zorn der Wolken",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 5 oder 6 oder 7W10 in einer Distanz von 3 oder 5 oder 7 Meter. Der Blitz springt auf 1 oder 2 oder 3 Ziele in einem Umkreis von jeweils 1 oder 2 oder 3 Meter über. Betroffene Einheiten werden zu 20 oder 40 oder 60 Prozent betäubt.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Distanz auf 1 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Springt auf 1 Ziel über. 20 Prozent Betäubungschance"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Distanz auf 2 Meter Umkreis",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "Springt auf bis zu 2 Ziele über. 40 Prozent Betäubungschance"
     },
     {
      "level": 3,
      "reichweite": "7 Meter Distanz auf 3 Meter Umkreis",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "Springt auf bis zu 3 Ziele über. 60 Prozent Betäubungschance"
     }
    ]
   },
   {
    "name": "Kettenblitz der Heilung",
    "ast": "Sturmrufer",
    "art": "aktiv",
    "schadenTyp": "heilung",
    "rang": 4,
    "info": "Heilung von harten 6 oder 7 oder 8W10 in einer Reichweite von 2 oder 3 oder 4 Meter. Die Kettenheilung springt nacheinander auf 3 oder 4 oder 5 befreundete Ziele über die sich in einem maximalen Abstand von jeweils 2 oder 3 oder 4 Meter zueinander befinden. Ein Pingpong-Effekt also das direkte Vor- und Zurückspringen zwischen denselben zwei Zielen ist ausgeschlossen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Abstand",
      "schaden": "6W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt nacheinander bis zu 3 Ziele. Kein Hin- und Herspringen erlaubt"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Abstand",
      "schaden": "7W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt nacheinander bis zu 4 Ziele. Kein Hin- und Herspringen erlaubt"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Abstand",
      "schaden": "8W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt nacheinander bis zu 5 Ziele. Kein Hin- und Herspringen erlaubt"
     }
    ]
   },
   {
    "name": "Sturmfokus",
    "ast": "Sturmrufer",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Effekt auf ein einzelnes Ziel. Für eine Dauer von 2 oder 3 oder 4 Runden machst du zusätzlichen magischen Blitzschaden von plus 2 oder 3 oder 4W10. Du verursachst zudem plus 1 oder 2 oder 3W8 zusätzlichen Blitzschaden pro Rüstungsklasse des Ziels. Ist das Ziel bereits betäubt machst du plus 2W10 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 2W10 Blitzschaden",
      "schadenArt": "magisch",
      "effekt": "Hält 2 Runden. plus 1W8 pro Rüstungsklasse. plus 2W10 Schaden bei Betäubung"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 3W10 Blitzschaden",
      "schadenArt": "magisch",
      "effekt": "Hält 3 Runden. plus 2W8 pro Rüstungsklasse. plus 2W10 Schaden bei Betäubung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "plus 4W10 Blitzschaden",
      "schadenArt": "magisch",
      "effekt": "Hält 4 Runden. plus 3W8 pro Rüstungsklasse. plus 2W10 Schaden bei Betäubung"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Traumaturge",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Regeneration Extra",
    "ast": "Traumaturge",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 1,
    "info": "Heilung von 2 oder 3 oder 4W10 an ein einzelnes Ziel zu Beginn deiner nächsten 2 oder 3 oder 4 Runden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schaden": "2W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 2 Runden"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schaden": "3W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 3 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schaden": "4W10",
      "schadenArt": "Heilung",
      "effekt": "Heilt zu Beginn deiner nächsten 4 Runden"
     }
    ]
   },
   {
    "name": "Flamme",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 in einer Reichweite von 3 oder 5 oder 7 Meter. Du kannst 1 oder 2 oder 3-mal pro Kampf eine kleine Flamme auf deine Gegner werfen. Das getroffene Ziel erhält plus 1 Feuermarker. Nach Anwendung des Skills hast du 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf nutzbar. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "5 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf nutzbar. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "7 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf nutzbar. Gewährt plus 1 Feuermarker. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Magischer Schild",
    "ast": "Traumaturge",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt einem einzelnen Ziel für eine Dauer von 1 oder 2 oder 3 Runden plus 3 oder 5 oder 10 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 3 magische Rüstung für 1 Runde"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 5 magische Rüstung für 2 Runden"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "plus 10 magische Rüstung für 3 Runden"
     }
    ]
   },
   {
    "name": "Arkaner Funke",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 1,
    "info": "Schaden magisch von 2 oder 3 oder 4W10 auf eine Distanz von 5 oder 7 oder 10 Meter. Du kannst diesen Zauber 2 oder 3 oder 4-mal pro Kampf einsetzen. Nach der Anwendung hat der Skill 1 Runde Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "4-mal pro Kampf nutzbar. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Eisfeld",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 2 oder 3 oder 4W10. Erschafft in einer Reichweite von 5 oder 7 oder 10 Meter ein Eisfeld mit einer Fläche von 2 mal 2 oder 2 mal 2 oder 3 mal 3 Meter. Gegner, die ihre Runde dort starten, erleiden den Schaden und ihre Bewegungsweite wird um die Hälfte verringert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "2W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 2,
      "reichweite": "7 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     },
     {
      "level": 3,
      "reichweite": "10 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Gegner beim Rundenstart: Schaden und halbierte Bewegungsweite"
     }
    ]
   },
   {
    "name": "Kettenblitz",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10. Trifft 2 oder 3 oder 4 Gegner, die sich jeweils in einem Umkreis von maximal 3 Meter zueinander befinden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 2 Gegner nacheinander"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 3 Gegner nacheinander"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Abstand zwischen Zielen",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Trifft bis zu 4 Gegner nacheinander"
     }
    ]
   },
   {
    "name": "Wurzelwucher",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Fügt einem Ziel in einer Reichweite von 2 oder 4 oder 6 Meter Giftstufe 1 oder 2 oder 3 und plus 1 oder 1 oder 2 Blutungen zu. Das Ziel muss einen Schwellenwert-Wurf von Schwierigkeitsgrad 5 oder 10 oder 15 bestehen, um sich aus dem Wucher zu befreien.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 1 und plus 1 Blutung. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad 5"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2 and plus 1 Blutung. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad 10"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3 und plus 2 Blutungen. Befreiung erfordert Schwellenwert-Wurf Schwierigkeitsgrad 15"
     }
    ]
   },
   {
    "name": "Arkanes Schwert",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einer Reichweite von 5 oder 10 oder 15 Meter. Diesen Zauber kannst du 1 oder 2 oder 3-mal pro Kampf einsetzen. Der Strahl trifft bis zu 2 Gegner in einer 3 oder 4 oder 5 Meter langen, geraden Linie. Nach Anwendung des Skills hat der Zauber 1 Runde Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Distanz auf 3 Meter Linie",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter Distanz auf 4 Meter Linie",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "2-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter Distanz auf 5 Meter Linie",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "3-mal pro Kampf. Trifft bis zu 2 Gegner in der Linie. 1 Runde Abklingzeit. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Arkanes Geschoss",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 auf eine Distanz von 5 oder 10 oder 15 Meter. Kann 1 oder 1 oder 2-mal pro Kampf gezaubert werden. Du erschaffst 3 oder 4 oder 5 Kugeln, die du entweder sofort auf ein Ziel in Reichweite schießt, oder die Kugeln bis zu 3 oder 4 oder 5 Runden hinter dir schweben lässt. Pro Aktion A oder Aktion B kannst du dann extra 1 oder 2 oder 3 Kugeln abfeuern. Nach der Anwendung hat der Skill 2 Runden Abklingzeit. Ignoriert physische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "schaden": "3W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 3 Kugeln. Schweben für 3 Runden. Feuert 1 Kugel pro Aktion. 1-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "10 Meter",
      "schaden": "4W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 4 Kugeln. Schweben für 4 Runden. Feuert 2 Kugeln pro Aktion. 1-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "15 Meter",
      "schaden": "5W10 pro Kugel",
      "schadenArt": "magisch",
      "effekt": "Erschafft 5 Kugeln. Schweben für 5 Runden. Feuert 3 Kugeln pro Aktion. 2-mal pro Kampf. 2 Runden Abklingzeit. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Teleport",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Teleportiere dich auf ein einzelnes Ziel oder freien Platz in einer Reichweite von 10 oder 15 oder 20 Meter. Dies ist 1 oder 2 oder 3-mal pro Kampf möglich. Bei 2 verbrauchten Aufladungen ist auch ein direkter Hin- und Rücksprung möglich.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter einzelnes Ziel",
      "effekt": "1-mal pro Kampf nutzbar"
     },
     {
      "level": 2,
      "reichweite": "15 Meter einzelnes Ziel",
      "effekt": "2-mal pro Kampf nutzbar. Hin- und Rückweg mit 2 Aufladungen möglich"
     },
     {
      "level": 3,
      "reichweite": "20 Meter einzelnes Ziel",
      "effekt": "3-mal pro Kampf nutzbar. Hin- und Rückweg mit 2 Aufladungen möglich"
     }
    ]
   },
   {
    "name": "Speicher",
    "ast": "Traumaturge",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Ermöglicht es dir, in einer Reichweite von 10 oder 15 oder 20 Meter insgesamt 1 oder 2 oder 3 gerade eben gewirkte Fähigkeiten zu stehlen, abzuspeichern und selbst zu benutzen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "10 Meter",
      "effekt": "Kann 1 Fähigkeit speichern und benutzen"
     },
     {
      "level": 2,
      "reichweite": "15 Meter",
      "effekt": "Kann bis zu 2 Fähigkeiten speichern und benutzen"
     },
     {
      "level": 3,
      "reichweite": "20 Meter",
      "effekt": "Kann bis zu 3 Fähigkeiten speichern und benutzen"
     }
    ]
   },
   {
    "name": "Arkaner Sturm",
    "ast": "Traumaturge",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch von 5 oder 6 oder 7W10. Erschafft in einer Reichweite von 6 oder 9 oder 12 Meter einen Sturm mit einer Fläche von 2 mal 2 oder 3 mal 3 oder 3 mal 3 Meter. Dieser Zauber ist genau 1-mal pro Kampf einsetzbar. Personen, die sich im betroffenen Sturm befinden, verlieren zu einer Wahrscheinlichkeit von 20 oder 40 oder 60 Prozent eine Aktion in ihrer nächsten Runde. Ignoriert physische Rüstung vollständig.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "6 Meter Distanz auf Zone 2 mal 2 Meter",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. 20 Prozent Chance auf Aktionsverlust für Personen im Sturm. Ignoriert physische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "9 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "6W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. 40 Prozent Chance auf Aktionsverlust für Personen im Sturm. Ignoriert physische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "12 Meter Distanz auf Zone 3 mal 3 Meter",
      "schaden": "7W10",
      "schadenArt": "magisch",
      "effekt": "1-mal pro Kampf. 60 Prozent Chance auf Aktionsverlust für Personen im Sturm. Ignoriert physische Rüstung"
     }
    ]
   },
   {
    "name": "Seelenpakt",
    "ast": "Traumaturge",
    "art": "extra",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Du opferst auf ein einzelnes Ziel sofort 50 Prozent deiner aktuellen Lebenspunkte. Als Gegenleistung wird deine gesamte Macht entfesselt: Für eine Dauer von 1 oder 2 oder 3 Runden verdoppelst du den exakten Effekt all deiner Fähigkeiten. Dies gilt gleichermaßen für verursachten Schaden, Heilung, applizierte Blutungen, verabreichte Giftstufen und gesetzte Feuermarker.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "effekt": "Kostet sofort 50 Prozent eigene Lebenspunkte. Alle Effekte sind für 1 Runde komplett verdoppelt"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "effekt": "Kostet sofort 50 Prozent eigene Lebenspunkte. Alle Effekte sind für 2 Runden komplett verdoppelt"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "effekt": "Kostet sofort 50 Prozent eigene Lebenspunkte. Alle Effekte sind für 3 Runden komplett verdoppelt"
     }
    ]
   },
   {
    "name": "Berserker",
    "ast": "Wertitan",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Gewährt dir für eine Dauer von 1 oder 2 oder 3 Runden einen physischen Schadensbonus im Nahkampf von plus 2 oder 3 oder 4W10 und besitzt 0 oder 5 oder 10 rüstungsbrechend. Im Gegenzug erhältst du einen Malus von minus 15 oder 10 oder 5 auf deine Nahkampf-Proben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf selbst",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. 0 rüstungsbrechend. minus 15 Nahkampf-Malus"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf selbst",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. 5 rüstungsbrechend. minus 10 Nahkampf-Malus"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf selbst",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. 10 rüstungsbrechend. minus 5 Nahkampf-Malus"
     }
    ]
   },
   {
    "name": "Backpfeifengewitter",
    "ast": "Wertitan",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf um plus 2 oder 3 oder 4W10. Trifft 2 oder 2 oder 3 Ziele in einer geraden Reihe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 2W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 2 Ziele in einer Reihe"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft 3 Ziele in einer Reihe"
     }
    ]
   },
   {
    "name": "Doppelhieb",
    "ast": "Wertitan",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch im Nahkampf. Erlaubt dir 1 oder 2 oder 3-mal pro Kampf einen Nahkampfangriff als Extra-Aktion auszuführen. Nach der Anwendung hat der Skill 1 Runde Abklingzeit.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "1-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "2-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "3-mal pro Kampf als Extra-Aktion nutzbar. 1 Runde Abklingzeit"
     }
    ]
   },
   {
    "name": "Monster Form",
    "ast": "Wertitan",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Gewährt dir in deiner Monsterform permanent zusätzliche plus 25 oder 50 oder 75 Lebenspunkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 25 Lebenspunkte in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 50 Lebenspunkte in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 75 Lebenspunkte in Monsterform"
     }
    ]
   },
   {
    "name": "Pure Muskeln +",
    "ast": "Wertitan",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Erhöht deinen Stärke-Wert in deiner Monsterform massiv um plus 15 oder 30 oder 50 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 15 Stärke in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 30 Stärke in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 50 Stärke in Monsterform"
     }
    ]
   },
   {
    "name": "Körper aus Stein",
    "ast": "Wertitan",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erhöht deine physische Rüstung permanent um plus 3 oder 5 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 3 physische Rüstung permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 5 physische Rüstung permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 10 physische Rüstung permanent"
     }
    ]
   },
   {
    "name": "Spalter",
    "ast": "Wertitan",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch im Nahkampf. Hat 10 oder 15 oder 20 rüstungsbrechend. Trifft 1 oder 2 oder 3 Gegner in einer Linie von maximal 5 Meter vor dir mit normalem Nahkampfschaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft 1 Gegner. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 2 Gegner. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "5 Meter Linie",
      "schaden": "wie Nahkampfangriff",
      "schadenArt": "physisch",
      "effekt": "Trifft bis zu 3 Gegner. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Spot",
    "ast": "Wertitan",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Erzwingt die Aufmerksamkeit eines Gegners in einer Reichweite von 5 oder 7 oder 10 Meter. Das Ziel besitzt für eine Dauer von 2 oder 2 oder 3 Runden Aggro und darf ausschließlich dich angreifen. Gegen Angriffe dieses Ziels erhältst du einen Bonus von plus 10 oder 15 oder 20 Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "5 Meter",
      "effekt": "Zwingt Ziel für 2 Runden zum Angriff. Gewährt plus 10 Rüstung gegen dieses Ziel"
     },
     {
      "level": 2,
      "reichweite": "7 Meter",
      "effekt": "Zwingt Ziel für 2 Runden zum Angriff. Gewährt plus 15 Rüstung gegen dieses Ziel"
     },
     {
      "level": 3,
      "reichweite": "10 Meter",
      "effekt": "Zwingt Ziel für 3 Runden zum Angriff. Gewährt plus 20 Rüstung gegen dieses Ziel"
     }
    ]
   },
   {
    "name": "Sprungangriff",
    "ast": "Wertitan",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 2,
    "info": "Schaden physisch von 3 oder 4 oder 5W10. Du springst über eine Distanz von 3 oder 5 oder 7 Meter auf dein Ziel und verursachst Schaden in einem Radius von 1 oder 2 oder 2 Meter um den Aufprallpunkt herum. Direkt angrenzende Ziele erleiden die Hälfte des Schadens.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "3 Meter Distanz auf 1 Meter Radius",
      "schaden": "3W10",
      "schadenArt": "physisch",
      "effekt": "Trifft den Radius beim Aufprall. Angrenzende Ziele erhalten halben Schaden"
     },
     {
      "level": 2,
      "reichweite": "5 Meter Distanz auf 2 Meter Radius",
      "schaden": "4W10",
      "schadenArt": "physisch",
      "effekt": "Trifft den Radius beim Aufprall. Angrenzende Ziele erhalten halben Schaden"
     },
     {
      "level": 3,
      "reichweite": "7 Meter Distanz auf 2 Meter Radius",
      "schaden": "5W10",
      "schadenArt": "physisch",
      "effekt": "Trifft den Radius beim Aufprall. Angrenzende Ziele erhalten halben Schaden"
     }
    ]
   },
   {
    "name": "Aufpumpen",
    "ast": "Wertitan",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Du pumpst deine Muskeln massiv auf ein einzelnes Ziel auf. Für eine Dauer von 1 oder 2 oder 3 Runden verursachen deine Nahkampfangriffe plus 3 oder 4 oder 5W10 zusätzlichen physischen Schaden, besitzen 5 oder 10 oder 15 rüstungsbrechend und gewähren dir plus 0 oder 5 oder 10 physische Rüstung. Während dieser Zeit verringert sich dein Handeln-Wert um minus 20 oder 15 oder 10 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel selbst",
      "schaden": "plus 3W10",
      "schadenArt": "physisch",
      "effekt": "Hält 1 Runde. 5 rüstungsbrechend. plus 0 Rüstung. Malus von minus 20 Handeln"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel selbst",
      "schaden": "plus 4W10",
      "schadenArt": "physisch",
      "effekt": "Hält 2 Runden. 10 rüstungsbrechend. plus 5 Rüstung. Malus von minus 15 Handeln"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel selbst",
      "schaden": "plus 5W10",
      "schadenArt": "physisch",
      "effekt": "Hält 3 Runden. 15 rüstungsbrechend. plus 10 Rüstung. Malus von minus 10 Handeln"
     }
    ]
   },
   {
    "name": "Panzerbrecher",
    "ast": "Wertitan",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Schwächt die gegnerische Verteidigung auf eine Reichweite von 2 oder 4 oder 6 Meter. Das anvisierte Ziel verliert sofort minus 10 oder 20 oder 30 Rüstung für eine Dauer von 1 oder 2 oder 3 Runden. Dieser Effekt ist ausdrücklich nicht stapelbar.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Reduziert Rüstung um minus 10 für 1 Runde. Nicht stapelbar"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Reduziert Rüstung um minus 20 für 2 Runden. Nicht stapelbar"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Reduziert Rüstung um minus 30 für 3 Runden. Nicht stapelbar"
     }
    ]
   },
   {
    "name": "Mehrfachschlag",
    "ast": "Wertitan",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch ausgeführt als 2 oder 3 oder 4 Nahkampfangriffe auf ein einziges Ziel. Besitzt 10 oder 15 oder 20 rüstungsbrechend.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "2 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 10 rüstungsbrechend"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "3 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 15 rüstungsbrechend"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "4 Nahkampfangriffe",
      "schadenArt": "physisch",
      "effekt": "Nur auf ein Ziel. 20 rüstungsbrechend"
     }
    ]
   },
   {
    "name": "Fäuste wie Kutschen",
    "ast": "Wertitan",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 4,
    "info": "Erhöht die Reichweite deiner unbewaffneten Faustangriffe permanent auf eine Distanz von 2 Feldern. Auf dem ersten Feld wird normaler Schaden appliziert, während Angriffe auf das weiter entfernte 2. Feld noch knackige 50 oder 75 oder 100 Prozent des vollen Schadens verursachen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Felder Distanz",
      "effekt": "Faustangriffe verursachen auf dem 2. Feld noch 50 Prozent Schaden"
     },
     {
      "level": 2,
      "reichweite": "2 Felder Distanz",
      "effekt": "Faustangriffe verursachen auf dem 2. Feld noch 75 Prozent Schaden"
     },
     {
      "level": 3,
      "reichweite": "2 Felder Distanz",
      "effekt": "Faustangriffe verursachen auf dem 2. Feld die vollen 100 Prozent Schaden"
     }
    ]
   },
   {
    "name": "Zermalmen",
    "ast": "Wertitan",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf von unbändigen plus 5 oder 6 oder 7W10. Die Wucht ist so gewaltig, dass dieser Angriff jegliche gegnerische Rüstung beziehungsweise Schadensreduktion komplett ignoriert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 5W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung vollständig"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 6W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung vollständig"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 7W10",
      "schadenArt": "physisch",
      "effekt": "Ignoriert jegliche Rüstung vollständig"
     }
    ]
   },
   {
    "name": "Flinke Füße",
    "ast": "Zombie",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Deine Bewegung erhöht sich permanent um plus 1 oder 2 oder 3 Meter Bewegungsweite.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 1 Meter Bewegungsweite permanent"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 2 Meter Bewegungsweite permanent"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 3 Meter Bewegungsweite permanent"
     }
    ]
   },
   {
    "name": "Blutiger Zorn",
    "ast": "Zombie",
    "art": "extra",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Du erhältst für 1 oder 2 oder 3 Runden eine zusätzliche Attacke in Aktion A auf ein einzelnes Ziel. Du erleidest dafür sofort 2 oder 1 oder 0 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 1 Runde. Erhältst sofort 2 Blutungen"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 2 Runden. Erhältst sofort 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel",
      "schadenArt": "physisch",
      "effekt": "plus 1 Angriff in Aktion A für 3 Runden. Erhältst sofort 0 Blutungen"
     }
    ]
   },
   {
    "name": "Pure Muskeln",
    "ast": "Zombie",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 1,
    "info": "Erhöht deinen Stärke-Wert in deiner Monsterform zusätzlich um plus 10 oder 20 oder 30 Punkte.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "plus 10 Stärke in Monsterform"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "plus 20 Stärke in Monsterform"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "plus 30 Stärke in Monsterform"
     }
    ]
   },
   {
    "name": "Seelenhunger",
    "ast": "Zombie",
    "art": "passiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Deine Angriffe gewähren dir im Nahkampf einen permanenten Lebensraub von 10 oder 20 oder 30 Prozent des verursachten Schadens. Die gärende Fäulnis fordert jedoch Tribut: Wenn du am Ende deiner Kampfrunde nicht über deine vollen maximalen Lebenspunkte verfügst, verlierst du stattdessen unaufhaltsam minus 2W8 oder 1W6 oder 1W4 Lebenspunkte durch den Hunger.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schadenArt": "physisch",
      "effekt": "10 Prozent Lebensraub. Endrunden-Abzug von minus 2W8 Lebenspunkten bei unvollständigem Leben"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schadenArt": "physisch",
      "effekt": "20 Prozent Lebensraub. Endrunden-Abzug von minus 1W6 Lebenspunkten bei unvollständigem Leben"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schadenArt": "physisch",
      "effekt": "30 Prozent Lebensraub. Endrunden-Abzug von minus 1W4 Lebenspunkten bei unvollständigem Leben"
     }
    ]
   },
   {
    "name": "Biss",
    "ast": "Zombie",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 1,
    "info": "Schaden physisch basierend auf Stärke plus 2 oder 3 oder 4W10 im Nahkampf. Du beißt ein direkt angrenzendes Ziel. Der Angriff besitzt 0 oder 5 oder 10 rüstungsbrechend und verursacht plus 1 oder 1 oder 2 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 2W10",
      "schadenArt": "physisch",
      "effekt": "0 rüstungsbrechend. Verursacht plus 1 Blutung"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 3W10",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. Verursacht plus 1 Blutung"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Stärke plus 4W10",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. Verursacht plus 2 Blutungen"
     }
    ]
   },
   {
    "name": "Gieriger Biss",
    "ast": "Zombie",
    "art": "extra",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 im Nahkampf. Besitzt 0 oder 5 oder 10 rüstungsbrechend. Nur nutzbar, wenn du dich selbst unter 50 Prozent deiner maximalen Lebenspunkte befindest. Du erhältst den gesamten verursachten Schaden als Heilung gutgeschrieben.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 0 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 5 rüstungsbrechend. Heilt dich um den Schaden"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Bedingung unter 50 Prozent Lebenspunkte. 10 rüstungsbrechend. Heilt dich um den Schaden"
     }
    ]
   },
   {
    "name": "Letzte Chance",
    "ast": "Zombie",
    "art": "extra",
    "schadenTyp": "heilung",
    "rang": 2,
    "info": "Heilung auf ein einzelnes Ziel von plus 3 oder 4 oder 5W10 Heilung. Dieser rettende Skill ist ausschließlich dann aktivierbar, wenn deine aktuellen Lebenspunkte kleiner oder exakt gleich 10 Punkte betragen. Bei Aktivierung heilst du dich sofort und erhältst zusätzlich plus 10 magische Rüstung.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "einzelnes Ziel selbst",
      "schaden": "plus 3W10",
      "schadenArt": "Heilung",
      "effekt": "Nur bei 10 oder weniger Lebenspunkten nutzbar. Gewährt plus 10 magische Rüstung"
     },
     {
      "level": 2,
      "reichweite": "einzelnes Ziel selbst",
      "schaden": "plus 4W10",
      "schadenArt": "Heilung",
      "effekt": "Nur bei 10 oder weniger Lebenspunkten nutzbar. Gewährt plus 10 magische Rüstung"
     },
     {
      "level": 3,
      "reichweite": "einzelnes Ziel selbst",
      "schaden": "plus 5W10",
      "schadenArt": "Heilung",
      "effekt": "Nur bei 10 oder weniger Lebenspunkten nutzbar. Gewährt plus 10 magische Rüstung"
     }
    ]
   },
   {
    "name": "Naturfluch",
    "ast": "Zombie",
    "art": "passiv",
    "schadenTyp": "keiner",
    "rang": 2,
    "info": "Umhüllt dich mit einer giftigen Aura. Jedes Mal, wenn du im Kampf direkten Nahkampfschaden von einer feindlichen Einheit erleidest, wird der Angreifer zu einer Wahrscheinlichkeit von 20 oder 40 oder 60 Prozent sofort mit Giftstufe 1 oder 2 oder 3 infiziert.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "selbst",
      "effekt": "Bei erlittenem Nahkampfschaden wird der Angreifer zu 20 Prozent mit Giftstufe 1 infiziert"
     },
     {
      "level": 2,
      "reichweite": "selbst",
      "effekt": "Bei erlittenem Nahkampfschaden wird der Angreifer zu 40 Prozent mit Giftstufe 2 infiziert"
     },
     {
      "level": 3,
      "reichweite": "selbst",
      "effekt": "Bei erlittenem Nahkampfschaden wird der Angreifer zu 60 Prozent mit Giftstufe 3 infiziert"
     }
    ]
   },
   {
    "name": "Seuchenstoß",
    "ast": "Zombie",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 2,
    "info": "Schaden magisch von plus 3 oder 4 oder 5W10 im Nahkampf und Fernkampf. Der gezielte Schlag attackiert das Opfer und appliziert zusätzlich Giftstufe 2 oder 3 oder 4. Sollte das Ziel zum Zeitpunkt des Treffers bereits unter einer aktiven Blutung oder einem Feuermarker leiden, erhöht sich die verabreichte Vergiftung automatisch um plus 1 zusätzliche Giftstufe.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 3W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 2. Giftstufe erhöht sich um 1 wenn das Ziel brennt oder blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 4W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3. Giftstufe erhöht sich um 1 wenn das Ziel brennt oder blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf und Fernkampf",
      "schaden": "plus 5W10",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4. Giftstufe erhöht sich um 1 wenn das Ziel brennt oder blutet"
     }
    ]
   },
   {
    "name": "Fluch der Schwächung",
    "ast": "Zombie",
    "art": "aktiv",
    "schadenTyp": "keiner",
    "rang": 3,
    "info": "Ein Ziel in einer Reichweite von 2 oder 4 oder 6 Meter wird verflucht. Das getroffene Opfer verursacht für eine Dauer von 1 oder 2 oder 3 Runden permanent minus 50 Prozent weniger physischen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter",
      "effekt": "Reduziert gegnerischen physischen Schaden für 1 Runde um 50 Prozent"
     },
     {
      "level": 2,
      "reichweite": "4 Meter",
      "effekt": "Reduziert gegnerischen physischen Schaden für 2 Runden um 50 Prozent"
     },
     {
      "level": 3,
      "reichweite": "6 Meter",
      "effekt": "Reduziert gegnerischen physischen Schaden für 3 Runden um 50 Prozent"
     }
    ]
   },
   {
    "name": "Risikoschlag",
    "ast": "Zombie",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 3,
    "info": "Schaden physisch im Nahkampf um plus 5 oder 6 oder 7W10. Ein risikoreicher Hieb, der dem Ziel plus 1 oder 2 oder 3 Blutungen zufügt und deine eigene kritische Trefferchance im selben Moment um plus 5 oder 10 oder 15 Prozent anhebt. Der riskante Einsatz hat jedoch eine harte Nebenwirkung: Der Anwender ist für eine Dauer von 2 oder 2 oder 1 Runden komplett unfähig feindliche Angriffe zu blocken.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "plus 5W10",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 1 Blutung. Erhöht kritische Trefferchance um 5 Prozent. Anwender kann für 2 Runden nicht blocken"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "plus 6W10",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 2 Blutungen. Erhöht kritische Trefferchance um 10 Prozent. Anwender kann für 2 Runden nicht blocken"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "plus 7W10",
      "schadenArt": "physisch",
      "effekt": "Verursacht plus 3 Blutungen. Erhöht kritische Trefferchance um 15 Prozent. Anwender kann für 1 Runde nicht blocken"
     }
    ]
   },
   {
    "name": "Welle der Korrosion",
    "ast": "Zombie",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 3,
    "info": "Schaden magisch von 3 oder 4 oder 5W10 in einem Umkreis von 2 oder 3 oder 4 Meter. Alle Personen im Umkreis erleiden diesen Schaden und erhalten zusätzlich Giftstufe 3 oder 4 oder 5.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "2 Meter Umkreis",
      "schaden": "3W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 3"
     },
     {
      "level": 2,
      "reichweite": "3 Meter Umkreis",
      "schaden": "4W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 4"
     },
     {
      "level": 3,
      "reichweite": "4 Meter Umkreis",
      "schaden": "5W10",
      "schadenArt": "magisch",
      "effekt": "Alle Ziele im Umkreis erhalten Giftstufe 5"
     }
    ]
   },
   {
    "name": "Fauler Atem",
    "ast": "Zombie",
    "art": "aktiv",
    "schadenTyp": "magisch",
    "rang": 4,
    "info": "Schaden magisch im Umkreis von 1 oder 2 oder 3 Meter. Alle Personen im Umkreis werden mit Giftstufe 3 oder 4 oder 5 vergiftet, erhalten plus 2 oder 3 oder 4 Feuermarker und fangen an zu bluten mit plus 1 oder 2 oder 3 Blutungen.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "1 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 3, plus 2 Feuermarker und plus 1 Blutung bei allen Zielen"
     },
     {
      "level": 2,
      "reichweite": "2 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 4, plus 3 Feuermarker und plus 2 Blutungen bei allen Zielen"
     },
     {
      "level": 3,
      "reichweite": "3 Meter Umkreis",
      "schadenArt": "magisch",
      "effekt": "Verursacht Giftstufe 5, plus 4 Feuermarker und plus 3 Blutungen bei allen Zielen"
     }
    ]
   },
   {
    "name": "Raserei",
    "ast": "Zombie",
    "art": "aktiv",
    "schadenTyp": "physisch",
    "rang": 4,
    "info": "Schaden physisch im Nahkampf. Führe bis zu 4 oder 5 oder 6 Angriffe aus, die 5 oder 10 oder 15 rüstungsbrechend besitzen. Die Angriffskette läuft so lange weiter, bis der erste Angriff verfehlt. Jeder Folgeantriff erhält einen Malus von minus 5 auf Nahkampf. Nach dem Ende der Raserei verfällt der Charakter für 1W4 Runden in tiefen Schlaf. Blutet das Ziel, verursacht der Skill plus 1W4 zusätzlichen Schaden.",
    "stufen": [
     {
      "level": 1,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 4 Angriffe",
      "schadenArt": "physisch",
      "effekt": "5 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 2,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 5 Angriffe",
      "schadenArt": "physisch",
      "effekt": "10 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     },
     {
      "level": 3,
      "reichweite": "Nahkampf",
      "schaden": "Bis zu 6 Angriffe",
      "schadenArt": "physisch",
      "effekt": "15 rüstungsbrechend. minus 5 Nahkampf pro Folgeantriff. Bei Ende: 1W4 Runden Schlaf. plus 1W4 Schaden wenn das Ziel blutet"
     }
    ]
   }
  ],
  "eigenschaften": [
   {
    "name": "Fluchtreflex",
    "rang": 1,
    "wirkungen": [
     "10% Chance, Fernkampfangriffen auszuweichen (nur, wenn du dich diese Runde bewegt hast)",
     "15% Chance, Fernkampfangriffen auszuweichen (nur, wenn du dich diese Runde bewegt hast)",
     "20% Chance, Fernkampfangriffen auszuweichen (nur, wenn du dich diese Runde bewegt hast)"
    ]
   },
   {
    "name": "Guter Esser",
    "rang": 1,
    "wirkungen": [
     "Du erhältst 2 Würfel pro Nacht für Essen"
    ]
   },
   {
    "name": "Koordination",
    "rang": 1,
    "wirkungen": [
     "In Monsterform +1m Bewegung",
     "In Monsterform +2m Bewegung",
     "In Monsterform +3m Bewegung"
    ]
   },
   {
    "name": "Langes Leben",
    "rang": 1,
    "wirkungen": [
     "+20 HP",
     "+40 HP",
     "+60 HP",
     "+80 HP",
     "+100 HP"
    ]
   },
   {
    "name": "Ruhiger Schlaf",
    "rang": 1,
    "wirkungen": [
     "Du erhältst 2 Würfel pro Nacht fürs Schlafen"
    ]
   },
   {
    "name": "Taktiker",
    "rang": 1,
    "wirkungen": [
     "Initiative +1 / +1m Bewegung / zusätzlich 1W10 Schaden in deiner ersten Kampfrunde"
    ]
   },
   {
    "name": "Athlet",
    "rang": 2,
    "wirkungen": [
     "Rüstungsmalus wird um 1 reduziert",
     "Rüstungsmalus wird um 2 reduziert",
     "Rüstungsmalus wird um 3 reduziert"
    ]
   },
   {
    "name": "Gesegneter Heiler",
    "rang": 2,
    "wirkungen": [
     "Alle Heilungszauber heilen zusätzlich +1W10",
     "Alle Heilungszauber heilen zusätzlich +2W10",
     "Alle Heilungszauber heilen zusätzlich +3W10"
    ]
   },
   {
    "name": "Instinktive Parade",
    "rang": 2,
    "wirkungen": [
     "+1 Parade pro Runde",
     "+2 Paraden pro Runde"
    ]
   },
   {
    "name": "Krieger",
    "rang": 2,
    "wirkungen": [
     "+1 Attacke pro Angriffsaktion (Aktion A)"
    ]
   },
   {
    "name": "Stahlmagen",
    "rang": 2,
    "wirkungen": [
     "Erhaltenes Gift wird um 1 Stufe reduziert",
     "Erhaltenes Gift wird um 2 Stufen reduziert",
     "Erhaltenes Gift wird um 3 Stufen reduziert"
    ]
   },
   {
    "name": "Kampfsanitäter",
    "rang": 3,
    "wirkungen": [
     "1-mal im Kampf Heilzauber als Extra-Aktion",
     "2-mal im Kampf Heilzauber als Extra-Aktion",
     "3-mal im Kampf Heilzauber als Extra-Aktion"
    ]
   },
   {
    "name": "Magier",
    "rang": 3,
    "wirkungen": [
     "Reichweite deiner Fähigkeiten +1m, Wirkungsradius +0m",
     "Reichweite +3m, Wirkungsradius +1m",
     "Reichweite +5m, Wirkungsradius +2m"
    ]
   },
   {
    "name": "Perfekter Konter",
    "rang": 3,
    "wirkungen": [
     "Immer wenn du einen Angriff kritisch parierst, darfst du zurückschlagen (Standardangriff)"
    ]
   },
   {
    "name": "Schildbrecher",
    "rang": 3,
    "wirkungen": [
     "Deine normalen Nahkampfangriffe ignorieren 5 Rüstung",
     "ignorieren 7 Rüstung",
     "ignorieren 10 Rüstung"
    ]
   },
   {
    "name": "Unbrennbar",
    "rang": 3,
    "wirkungen": [
     "Jede Runde verlierst du automatisch 1 Feuermarke"
    ]
   },
   {
    "name": "Damage Dealer",
    "rang": 4,
    "wirkungen": [
     "Alle deine aktiven Fähigkeiten verursachen +1W10 Schaden",
     "+2W10 Schaden",
     "+3W10 Schaden"
    ]
   },
   {
    "name": "Held",
    "rang": 4,
    "wirkungen": [
     "+1 Attacke pro Angriffsaktion (Aktion A)"
    ]
   },
   {
    "name": "Ledrige Haut",
    "rang": 4,
    "wirkungen": [
     "Nachdem deine Blutungen abgehandelt wurden, schließt sich eine Wunde automatisch"
    ]
   },
   {
    "name": "Tödliche Präsenz",
    "rang": 4,
    "wirkungen": [
     "Kritische Treffer verursachen +1W10 zusätzlichen Schaden; Krit-Chance +10%",
     "+2W10 zusätzlichen Schaden; Krit-Chance +15%",
     "+3W10 zusätzlichen Schaden; Krit-Chance +20%"
    ]
   }
  ]
 },
 "wesenEffekte": {
  "Arkaner Freibeuter": [
   {
    "typ": "buff",
    "ziel": "magischer_schaden_bonus",
    "wert": "plus 1W10",
    "beschreibung": "Du machst plus 1W10 magischen Schaden"
   },
   {
    "typ": "buff",
    "ziel": "magischer_schaden_reduktion",
    "wert": "minus 1W10",
    "beschreibung": "Du erleidest minus 1W10 magischen Schaden gegen dich"
   },
   {
    "typ": "debuff",
    "ziel": "physischer_schaden_erlitten_malus",
    "wert": "plus 1W10",
    "beschreibung": "Du erleidest plus 1W10 zusätzlichen physischen Schaden gegen dich"
   },
   {
    "typ": "debuff",
    "ziel": "zaehigkeit",
    "wert": -5,
    "beschreibung": "Malus von minus 5 auf das Talent Zähigkeit"
   }
  ],
  "Dämonenjäger": [
   {
    "typ": "buff",
    "ziel": "lebenspunkte_maximum",
    "wert": 25,
    "beschreibung": "Erhöht deine maximalen Lebenspunkte permanent um plus 25"
   },
   {
    "typ": "buff",
    "ziel": "schaden_spezifisch_bonus",
    "wert": "plus 2W10",
    "beschreibung": "Du machst plus 2W10 zusätzlichen Schaden gegen Dämonen, Untote und Monster"
   },
   {
    "typ": "debuff",
    "ziel": "schaden_allgemein_malus",
    "wert": "minus 1W10",
    "beschreibung": "Du machst minus 1W10 weniger Schaden gegen alle anderen Ziele"
   },
   {
    "typ": "debuff",
    "ziel": "kampfbeginn_vorbereitung",
    "wert": "1 extra Aktion",
    "beschreibung": "Du musst zu Beginn des Kampfes eine Aktion länger für Rituale oder Waffenpflege vorbereiten"
   }
  ],
  "Fluchbrecher": [
   {
    "typ": "buff",
    "ziel": "heilung_zusatzeffekt",
    "wert": "automatische Reinigung",
    "beschreibung": "Entfernt bei jeder deiner Heilaktionen automatisch eine Blutung, eine Giftstufe und einen Feuermarker"
   },
   {
    "typ": "buff",
    "ziel": "magischer_schaden_reduktion",
    "wert": "minus 2W6",
    "beschreibung": "Du erleidest minus 2W6 magischen Schaden weniger gegen dich"
   },
   {
    "typ": "debuff",
    "ziel": "statuseffekte_erlitten_malus",
    "wert": "plus 1 extra Stack",
    "beschreibung": "Du erhältst erlittene Blutungen, Giftstufen und Feuermarker um plus 1 zusätzlich erhöht"
   },
   {
    "typ": "debuff",
    "ziel": "bewegungsweite",
    "wert": -1,
    "beschreibung": "Deine Bewegungsweite verringert sich um minus 1 Meter"
   }
  ],
  "Hitzeklinge": [
   {
    "typ": "buff",
    "ziel": "feuer_schaden_bonus",
    "wert": "plus 1W10",
    "beschreibung": "Du machst plus 1W10 Schaden mit Angriffen, die Feuermarker verursachen"
   },
   {
    "typ": "buff",
    "ziel": "feuer_abklingzeit_vorteil",
    "wert": "minus 1 Feuermarker pro Runde",
    "beschreibung": "Du verlierst automatisch jede Runde minus 1 Feuermarker auf dir selbst"
   },
   {
    "typ": "debuff",
    "ziel": "elementar_schaden_erlitten_malus",
    "wert": "plus 1W10",
    "beschreibung": "Du erleidest plus 1W10 zusätzlichen Schaden von Wasser- und Eisfähigkeiten gegen dich"
   },
   {
    "typ": "debuff",
    "ziel": "heimlichkeit",
    "wert": -5,
    "beschreibung": "Malus von minus 5 auf das Talent Heimlichkeit"
   }
  ],
  "Kultist": [
   {
    "typ": "buff",
    "ziel": "erstangriff_bonus",
    "wert": "plus 1 Blutung",
    "beschreibung": "Dein erster Nahkampfangriff in deiner Kampfrunde verursacht plus 1 zusätzliche Blutung"
   },
   {
    "typ": "buff",
    "ziel": "soziales",
    "wert": 5,
    "beschreibung": "Bonus von plus 5 auf Proben im Bereich Soziales"
   },
   {
    "typ": "debuff",
    "ziel": "wesens_skill_nebenwirkung",
    "wert": "plus 1 eigene Blutung",
    "beschreibung": "Du erhältst plus 1 Blutung für dich selbst, wenn du eine Wesensfähigkeit zauberst"
   },
   {
    "typ": "debuff",
    "ziel": "heilung_erhalten_malus",
    "wert": "erschwert um 5",
    "beschreibung": "Heilungsfähigkeiten, die auf dich gewirkt werden, sind um 5 Punkte erschwert"
   }
  ],
  "Pestbringer": [
   {
    "typ": "buff",
    "ziel": "gift_schaden_bonus",
    "wert": "plus 1W10",
    "beschreibung": "Deine Giftfähigkeiten verursachen plus 1W10 zusätzlichen Schaden"
   },
   {
    "typ": "buff",
    "ziel": "physischer_schaden_bonus",
    "wert": "plus 1W6",
    "beschreibung": "Du verursachst permanent plus 1W6 zusätzlichen physischen Schaden"
   },
   {
    "typ": "buff",
    "ziel": "gift_abklingzeit_vorteil",
    "wert": "minus 1 Giftstufe alle 2 Runden",
    "beschreibung": "Deine eigene Giftstufe wird alle 2 Runden automatisch um minus 1 reduziert"
   },
   {
    "typ": "debuff",
    "ziel": "gegner_widerstand_vorteil",
    "wert": "plus 5 gegnerische Zähigkeit",
    "beschreibung": "Gegner erhalten einen Bonus von plus 5 auf ihre Zähigkeit gegen einen Vergiftungsversuch von dir"
   }
  ],
  "Rum-Prediger": [
   {
    "typ": "buff",
    "ziel": "kostenloser_skill",
    "wert": "1 mal pro Kampf Seelenreinigung Stufe 1",
    "beschreibung": "Du kannst einmal pro Kampf die Fähigkeit Seelenreinigung auf Stufe 1 komplett kostenlos einsetzen"
   },
   {
    "typ": "buff",
    "ziel": "heilung_ausgegeben_bonus",
    "wert": "plus 1W10",
    "beschreibung": "Du bewirkst plus 1W10 zusätzliche Heilung, wenn du Heilgegenstände oder Heilfähigkeiten einsetzt"
   },
   {
    "typ": "debuff",
    "ziel": "initiative",
    "wert": "-1W4",
    "beschreibung": "Deine Initiative verringert sich permanent um minus 1W4"
   },
   {
    "typ": "debuff",
    "ziel": "wahrnehmung_menschenkenntnis",
    "wert": -5,
    "beschreibung": "Malus von minus 5 auf die Talente Wahrnehmung und Menschenkenntnis"
   }
  ],
  "Seher der Tiefsee": [
   {
    "typ": "buff",
    "ziel": "geistesblitz_wiederholung",
    "wert": "25 Prozent kostenlose Chance",
    "beschreibung": "Du kannst einmal am Tag einen Geistesblitz zu 25 Prozent Chance komplett kostenlos wiederholen"
   },
   {
    "typ": "buff",
    "ziel": "schaden_zusatzeffekt",
    "wert": "plus 1 Giftstufe",
    "beschreibung": "Alle deine schadenverursachenden Fähigkeiten applizieren zusätzlich plus 1 Giftstufe auf dem Ziel"
   },
   {
    "typ": "debuff",
    "ziel": "nahkampf_schaden_malus",
    "wert": "minus 1W10",
    "beschreibung": "Dein verursachter Nahkampfschaden verringert sich um minus 1W10"
   },
   {
    "typ": "debuff",
    "ziel": "soziale_proben",
    "wert": -5,
    "beschreibung": "Malus von minus 5 auf alle sozialen Proben"
   }
  ],
  "Sturmwüter": [
   {
    "typ": "buff",
    "ziel": "blitz_schaden_bonus",
    "wert": "plus 1W10",
    "beschreibung": "Deine Blitzfähigkeiten verursachen plus 1W10 zusätzlichen Schaden"
   },
   {
    "typ": "buff",
    "ziel": "bewegungsweite_wetter_konditionell",
    "wert": "plus 1 Meter bei Regen oder Sturm",
    "beschreibung": "Du erhältst plus 1 Meter Bewegungsweite, wenn ein Regen oder ein Sturm aktiv ist"
   },
   {
    "typ": "debuff",
    "ziel": "ueberladung_nebenwirkung",
    "wert": "1W8 Eigenschaden nach 1W4 Runden",
    "beschreibung": "Nach der Wirkung einer Fähigkeit erleidest du nach einer Verzögerung von 1W4 Runden automatisch 1W8 Schaden durch Überladung"
   },
   {
    "typ": "debuff",
    "ziel": "blutungs_abrechnung_malus",
    "wert": "plus 1W8 erlittener Schaden",
    "beschreibung": "Du erleidest plus 1W8 zusätzlichen Schaden pro erfolgter Blutungsabrechnung"
   }
  ],
  "Tiefseepirat": [
   {
    "typ": "buff",
    "ziel": "bewegungsweite_wasser_konditionell",
    "wert": "plus 2 Meter",
    "beschreibung": "Du erhältst plus 2 Meter Bewegungsweite im Wasser"
   },
   {
    "typ": "buff",
    "ziel": "proben_wasser_konditionell",
    "wert": "plus 1W10",
    "beschreibung": "Du erhältst plus 1W10 auf alle Fähigkeiten und Proben im Wasser"
   },
   {
    "typ": "debuff",
    "ziel": "bewegungsweite_land_konditionell",
    "wert": -1,
    "beschreibung": "Deine Bewegungsweite an Land verringert sich um minus 1 Meter"
   },
   {
    "typ": "debuff",
    "ziel": "initiative_land_konditionell",
    "wert": -1,
    "beschreibung": "Deine Initiative verringert sich an Land permanent um minus 1"
   }
  ],
  "Wellenringer": [
   {
    "typ": "buff",
    "ziel": "wasser_schaden_bonus",
    "wert": "plus 1W10",
    "beschreibung": "Deine Wasserfähigkeiten verursachen plus 1W10 zusätzlichen Schaden"
   },
   {
    "typ": "buff",
    "ziel": "bewegungsweite_wasser_konditionell",
    "wert": "plus 1 Meter",
    "beschreibung": "Du erhältst plus 1 Meter Bewegungsweite auf oder im Wasser"
   },
   {
    "typ": "debuff",
    "ziel": "initiative_land_konditionell",
    "wert": -2,
    "beschreibung": "Du erhältst minus 2 Initiative an Land, dieser Malus gilt ausdrücklich nicht auf Schiffen"
   },
   {
    "typ": "debuff",
    "ziel": "gift_erlitten_malus",
    "wert": "plus 1W4 Schaden pro Giftstufe",
    "beschreibung": "Du erleidest plus 1W4 zusätzlichen Schaden durch aktive Giftstufen"
   }
  ]
 },
 "wuerfelTabellen": {
  "oracle_piraten_events": {
   "id": "oracle_piraten_events",
   "name": "Orakel: Piraten Events",
   "wuerfel": "1W100",
   "art": "orakel",
   "spalten": {
    "spalte_A_aktion": [
     {
      "wurf": 1,
      "text": "Angriff"
     },
     {
      "wurf": 2,
      "text": "Verrat"
     },
     {
      "wurf": 3,
      "text": "Diebstahl"
     },
     {
      "wurf": 4,
      "text": "Meuterei"
     },
     {
      "wurf": 5,
      "text": "Flucht"
     },
     {
      "wurf": 6,
      "text": "Fund"
     },
     {
      "wurf": 7,
      "text": "Entdeckung"
     },
     {
      "wurf": 8,
      "text": "Explosion"
     },
     {
      "wurf": 9,
      "text": "Sichtung"
     },
     {
      "wurf": 10,
      "text": "Erpressung"
     },
     {
      "wurf": 11,
      "text": "Mord"
     },
     {
      "wurf": 12,
      "text": "Giftanschlag"
     },
     {
      "wurf": 13,
      "text": "Sabotage"
     },
     {
      "wurf": 14,
      "text": "Entführung"
     },
     {
      "wurf": 15,
      "text": "Verlust"
     },
     {
      "wurf": 16,
      "text": "Tausch"
     },
     {
      "wurf": 17,
      "text": "Kauf"
     },
     {
      "wurf": 18,
      "text": "Betrug"
     },
     {
      "wurf": 19,
      "text": "Streit"
     },
     {
      "wurf": 20,
      "text": "Duell"
     },
     {
      "wurf": 21,
      "text": "Pakt"
     },
     {
      "wurf": 22,
      "text": "Fluch"
     },
     {
      "wurf": 23,
      "text": "Segen"
     },
     {
      "wurf": 24,
      "text": "Warnung"
     },
     {
      "wurf": 25,
      "text": "Befehl"
     },
     {
      "wurf": 26,
      "text": "Spionage"
     },
     {
      "wurf": 27,
      "text": "Überfall"
     },
     {
      "wurf": 28,
      "text": "Hinterhalt"
     },
     {
      "wurf": 29,
      "text": "Ausbruch"
     },
     {
      "wurf": 30,
      "text": "Einsturz"
     },
     {
      "wurf": 31,
      "text": "Brand"
     },
     {
      "wurf": 32,
      "text": "Flut"
     },
     {
      "wurf": 33,
      "text": "Sturm"
     },
     {
      "wurf": 34,
      "text": "Flaute"
     },
     {
      "wurf": 35,
      "text": "Strandung"
     },
     {
      "wurf": 36,
      "text": "Wrackbergung"
     },
     {
      "wurf": 37,
      "text": "Ausgrabung"
     },
     {
      "wurf": 38,
      "text": "Versteck"
     },
     {
      "wurf": 39,
      "text": "Unglück"
     },
     {
      "wurf": 40,
      "text": "Rettung"
     },
     {
      "wurf": 41,
      "text": "Befreiung"
     },
     {
      "wurf": 42,
      "text": "Jagd"
     },
     {
      "wurf": 43,
      "text": "Fang"
     },
     {
      "wurf": 44,
      "text": "Vergiftung"
     },
     {
      "wurf": 45,
      "text": "Krankheit"
     },
     {
      "wurf": 46,
      "text": "Fieber"
     },
     {
      "wurf": 47,
      "text": "Wahnsinn"
     },
     {
      "wurf": 48,
      "text": "Spuk"
     },
     {
      "wurf": 49,
      "text": "Erscheinung"
     },
     {
      "wurf": 50,
      "text": "Omen"
     },
     {
      "wurf": 51,
      "text": "Feier"
     },
     {
      "wurf": 52,
      "text": "Gelage"
     },
     {
      "wurf": 53,
      "text": "Glücksspiel"
     },
     {
      "wurf": 54,
      "text": "Schmuggel"
     },
     {
      "wurf": 55,
      "text": "Ubergabe"
     },
     {
      "wurf": 56,
      "text": "Abfangen"
     },
     {
      "wurf": 57,
      "text": "Verfolgung"
     },
     {
      "wurf": 58,
      "text": "Sperre"
     },
     {
      "wurf": 59,
      "text": "Belagerung"
     },
     {
      "wurf": 60,
      "text": "Entern"
     },
     {
      "wurf": 61,
      "text": "Kielholen"
     },
     {
      "wurf": 62,
      "text": "Auspeitschen"
     },
     {
      "wurf": 63,
      "text": "Hinrichtung"
     },
     {
      "wurf": 64,
      "text": "Geständnis"
     },
     {
      "wurf": 65,
      "text": "Lüge"
     },
     {
      "wurf": 66,
      "text": "Geheimnis"
     },
     {
      "wurf": 67,
      "text": "Aufruhr"
     },
     {
      "wurf": 68,
      "text": "Streik"
     },
     {
      "wurf": 69,
      "text": "Verhandlung"
     },
     {
      "wurf": 70,
      "text": "Bestechung"
     },
     {
      "wurf": 71,
      "text": "Inspektion"
     },
     {
      "wurf": 72,
      "text": "Razzia"
     },
     {
      "wurf": 73,
      "text": "Festnahme"
     },
     {
      "wurf": 74,
      "text": "Verhör"
     },
     {
      "wurf": 75,
      "text": "Folter"
     },
     {
      "wurf": 76,
      "text": "Urteil"
     },
     {
      "wurf": 77,
      "text": "Gnade"
     },
     {
      "wurf": 78,
      "text": "Opferung"
     },
     {
      "wurf": 79,
      "text": "Ritual"
     },
     {
      "wurf": 80,
      "text": "Beschwörung"
     },
     {
      "wurf": 81,
      "text": "Erwachen"
     },
     {
      "wurf": 82,
      "text": "Verwandlung"
     },
     {
      "wurf": 83,
      "text": "Heilung"
     },
     {
      "wurf": 84,
      "text": "Segnung"
     },
     {
      "wurf": 85,
      "text": "Weihe"
     },
     {
      "wurf": 86,
      "text": "Entweihung"
     },
     {
      "wurf": 87,
      "text": "Zerstörung"
     },
     {
      "wurf": 88,
      "text": "Plünderung"
     },
     {
      "wurf": 89,
      "text": "Kaperung"
     },
     {
      "wurf": 90,
      "text": "Blockade"
     },
     {
      "wurf": 91,
      "text": "Meuterei-Versuch"
     },
     {
      "wurf": 92,
      "text": "Friedensschluss"
     },
     {
      "wurf": 93,
      "text": "Allianz"
     },
     {
      "wurf": 94,
      "text": "Feindschaft"
     },
     {
      "wurf": 95,
      "text": "Herausforderung"
     },
     {
      "wurf": 96,
      "text": "Unterwerfung"
     },
     {
      "wurf": 97,
      "text": "Triumph"
     },
     {
      "wurf": 98,
      "text": "Niederlage"
     },
     {
      "wurf": 99,
      "text": "Begräbnis"
     },
     {
      "wurf": 100,
      "text": "Auferstehung"
     }
    ],
    "spalte_B_fokus": [
     {
      "wurf": 1,
      "text": "Gold"
     },
     {
      "wurf": 2,
      "text": "Schatzkarte"
     },
     {
      "wurf": 3,
      "text": "Logbuch"
     },
     {
      "wurf": 4,
      "text": "Kapitän"
     },
     {
      "wurf": 5,
      "text": "Steuermann"
     },
     {
      "wurf": 6,
      "text": "Quartiermeister"
     },
     {
      "wurf": 7,
      "text": "Smutje"
     },
     {
      "wurf": 8,
      "text": "Gouverneur"
     },
     {
      "wurf": 9,
      "text": "Gouverneurstochter"
     },
     {
      "wurf": 10,
      "text": "Zöllner"
     },
     {
      "wurf": 11,
      "text": "Kriegsschiff"
     },
     {
      "wurf": 12,
      "text": "Galeone"
     },
     {
      "wurf": 13,
      "text": "Wrack"
     },
     {
      "wurf": 14,
      "text": "Beiboot"
     },
     {
      "wurf": 15,
      "text": "Flotte"
     },
     {
      "wurf": 16,
      "text": "Fort"
     },
     {
      "wurf": 17,
      "text": "Leuchtturm"
     },
     {
      "wurf": 18,
      "text": "Hafen"
     },
     {
      "wurf": 19,
      "text": "Werft"
     },
     {
      "wurf": 20,
      "text": "Spelunke"
     },
     {
      "wurf": 21,
      "text": "Kombüse"
     },
     {
      "wurf": 22,
      "text": "Frachtraum"
     },
     {
      "wurf": 23,
      "text": "Kapitänskajüte"
     },
     {
      "wurf": 24,
      "text": "Großmast"
     },
     {
      "wurf": 25,
      "text": "Anker"
     },
     {
      "wurf": 26,
      "text": "Steuerrad"
     },
     {
      "wurf": 27,
      "text": "Kanone"
     },
     {
      "wurf": 28,
      "text": "Kanonenpulver"
     },
     {
      "wurf": 29,
      "text": "Muskete"
     },
     {
      "wurf": 30,
      "text": "Entermesser"
     },
     {
      "wurf": 31,
      "text": "Dolch"
     },
     {
      "wurf": 32,
      "text": "Kompass"
     },
     {
      "wurf": 33,
      "text": "Fernrohr"
     },
     {
      "wurf": 34,
      "text": "Medaillon"
     },
     {
      "wurf": 35,
      "text": "Amulett"
     },
     {
      "wurf": 36,
      "text": "Ring"
     },
     {
      "wurf": 37,
      "text": "Krone"
     },
     {
      "wurf": 38,
      "text": "Kelch"
     },
     {
      "wurf": 39,
      "text": "Schatztruhe"
     },
     {
      "wurf": 40,
      "text": "Fass"
     },
     {
      "wurf": 41,
      "text": "Rum"
     },
     {
      "wurf": 42,
      "text": "Zwieback"
     },
     {
      "wurf": 43,
      "text": "Pökelfleisch"
     },
     {
      "wurf": 44,
      "text": "Gewürze"
     },
     {
      "wurf": 45,
      "text": "Tabak"
     },
     {
      "wurf": 46,
      "text": "Seide"
     },
     {
      "wurf": 47,
      "text": "Zuckerrohr"
     },
     {
      "wurf": 48,
      "text": "Plantage"
     },
     {
      "wurf": 49,
      "text": "Sklave"
     },
     {
      "wurf": 50,
      "text": "Gefangener"
     },
     {
      "wurf": 51,
      "text": "Wache"
     },
     {
      "wurf": 52,
      "text": "Soldat"
     },
     {
      "wurf": 53,
      "text": "Offizier"
     },
     {
      "wurf": 54,
      "text": "Admiral"
     },
     {
      "wurf": 55,
      "text": "Richter"
     },
     {
      "wurf": 56,
      "text": "Priester"
     },
     {
      "wurf": 57,
      "text": "Medizinmann"
     },
     {
      "wurf": 58,
      "text": "Voodoo-Priesterin"
     },
     {
      "wurf": 59,
      "text": "Hexe"
     },
     {
      "wurf": 60,
      "text": "Skelett"
     },
     {
      "wurf": 61,
      "text": "Geist"
     },
     {
      "wurf": 62,
      "text": "Untoter"
     },
     {
      "wurf": 63,
      "text": "Sirene"
     },
     {
      "wurf": 64,
      "text": "Meerjungfrau"
     },
     {
      "wurf": 65,
      "text": "Krake"
     },
     {
      "wurf": 66,
      "text": "Seeschlange"
     },
     {
      "wurf": 67,
      "text": "Hai"
     },
     {
      "wurf": 68,
      "text": "Alligator"
     },
     {
      "wurf": 69,
      "text": "Riesenspinne"
     },
     {
      "wurf": 70,
      "text": "Harpyie"
     },
     {
      "wurf": 71,
      "text": "Papagei"
     },
     {
      "wurf": 72,
      "text": "Affe"
     },
     {
      "wurf": 73,
      "text": "Schiffsratte"
     },
     {
      "wurf": 74,
      "text": "Insel"
     },
     {
      "wurf": 75,
      "text": "Riff"
     },
     {
      "wurf": 76,
      "text": "Lagune"
     },
     {
      "wurf": 77,
      "text": "Grotte"
     },
     {
      "wurf": 78,
      "text": "Dschungel"
     },
     {
      "wurf": 79,
      "text": "Sumpf"
     },
     {
      "wurf": 80,
      "text": "Vulkan"
     },
     {
      "wurf": 81,
      "text": "Strand"
     },
     {
      "wurf": 82,
      "text": "Mangroven"
     },
     {
      "wurf": 83,
      "text": "Geisterschiff"
     },
     {
      "wurf": 84,
      "text": "Handelsboot"
     },
     {
      "wurf": 85,
      "text": "Kaperbrief"
     },
     {
      "wurf": 86,
      "text": "Steckbrief"
     },
     {
      "wurf": 87,
      "text": "Testament"
     },
     {
      "wurf": 88,
      "text": "Geheimbund"
     },
     {
      "wurf": 89,
      "text": "Schugglerring"
     },
     {
      "wurf": 90,
      "text": "Händlergilde"
     },
     {
      "wurf": 91,
      "text": "Bettler"
     },
     {
      "wurf": 92,
      "text": "Waisenkind"
     },
     {
      "wurf": 93,
      "text": "Hehler"
     },
     {
      "wurf": 94,
      "text": "Spion"
     },
     {
      "wurf": 95,
      "text": "Navigator"
     },
     {
      "wurf": 96,
      "text": "Schiffszimmermann"
     },
     {
      "wurf": 97,
      "text": "Schiffsarzt"
     },
     {
      "wurf": 98,
      "text": "Meeresgott"
     },
     {
      "wurf": 99,
      "text": "Voodoo-Götze"
     },
     {
      "wurf": 100,
      "text": "Totenkopf-Flagge"
     }
    ]
   }
  },
  "table_kochen": {
   "id": "table_kochen",
   "name": "Kochen",
   "wuerfel": "1W10",
   "art": "probe",
   "spalten": {
    "success": [
     {
      "wurf": 1,
      "text": "Schlecht aber essbar - satt"
     },
     {
      "wurf": 2,
      "text": "Einfaches Essen. Satt und Glücklich.",
      "buffs": [
       {
        "name": "Satt und glücklich.",
        "targetType": "category",
        "targetID": "soziales",
        "value": 3
       }
      ]
     },
     {
      "wurf": 3,
      "text": "Schmackhaft. Nicht edel, aber auch keine Maden.",
      "buffs": [
       {
        "name": "Schmackhaft gespeist",
        "targetType": "charakter",
        "targetID": "movement",
        "value": 1
       }
      ]
     },
     {
      "wurf": 4,
      "text": "Herzhaft lecker.",
      "buffs": [
       {
        "name": "Herzhaft gespeist. Lecker!",
        "targetType": "charakter",
        "targetID": "hp",
        "value": "2W10",
        "note": "Heilung in dieser Nacht"
       }
      ]
     },
     {
      "wurf": 5,
      "text": "Nahrhaft solides Essen.",
      "buffs": [
       {
        "name": "Nahrhaftes Essen",
        "targetType": "category",
        "targetID": "handeln",
        "value": 5
       }
      ]
     },
     {
      "wurf": 6,
      "text": "Würzig und etwas spicey. Lecker!",
      "buffs": [
       {
        "name": "Würzig & spicey",
        "targetType": "category",
        "targetID": "angriff",
        "value": 1
       }
      ]
     },
     {
      "wurf": 7,
      "text": "Stärkendes Essen.",
      "buffs": [
       {
        "name": "Stärkendes Essen",
        "targetType": "charakter",
        "targetID": "initiative",
        "value": 1
       }
      ]
     },
     {
      "wurf": 8,
      "text": "Wohlschmeckendes Essen.",
      "buffs": [
       {
        "name": "Wohlschmeckendes Essen",
        "targetType": "charakter",
        "targetID": "armor",
        "value": 5
       }
      ]
     },
     {
      "wurf": 9,
      "text": "Meisterhaftes Essen.",
      "buffs": [
       {
        "name": "Meisterhaftes Essen",
        "targetType": "charakter",
        "targetID": "hp",
        "value": "4W10",
        "note": "Heilung in dieser Nacht."
       }
      ]
     },
     {
      "wurf": 10,
      "text": "Festmahl.",
      "buffs": [
       {
        "name": "Festmahl.",
        "targetType": "charakter",
        "targetID": "attack_value",
        "value": "1W10"
       }
      ]
     }
    ],
    "no_success": [
     {
      "wurf": 1,
      "text": "Angebranntes Essen"
     },
     {
      "wurf": 2,
      "text": "Leicht verdorbenes Essen. Zähigkeitsprobe GS 1W6.",
      "buffs": [
       {
        "name": "Verdorbenes Essen",
        "targetType": "",
        "targetID": "",
        "value": 0
       }
      ]
     },
     {
      "wurf": 3,
      "text": "Holla die Waldfee, zu viel Salz",
      "buffs": [
       {
        "name": "Überwürztes Essen",
        "targetType": "charakter",
        "targetID": "movement",
        "value": -1
       }
      ]
     },
     {
      "wurf": 4,
      "text": "Geschmacklos, wo ist das Salz?",
      "buffs": [
       {
        "name": "Ungesalztes Essen",
        "targetType": "category",
        "targetID": "soziales",
        "value": -5
       }
      ]
     },
     {
      "wurf": 5,
      "text": "Völlig verdorbenes Essen - Bauchschmerzen",
      "buffs": [
       {
        "name": "Verdorbenes Essen",
        "targetType": "charakter",
        "targetID": "hp",
        "value": "-1W10"
       }
      ]
     },
     {
      "wurf": 6,
      "text": "Essen verschüttet, der Koch ist über eine Flasche gestolpert",
      "buffs": [
       {
        "name": "Essen verschüttet, hungrig",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 7,
      "text": "Rote Soße, Koch hat sich am Messer aufgeschlitzt.",
      "buffs": [
       {
        "name": "Satt",
        "targetType": "charakter",
        "targetID": "hp",
        "value": "1W10"
       }
      ]
     },
     {
      "wurf": 8,
      "text": "FEUER! Die Kombüse brennt. Schaden wird bestimmt.",
      "buffs": [
       {
        "name": "Kombüse brennt",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 9,
      "text": "Verlfuchtes Kraut - Maggie im Essen.",
      "buffs": [
       {
        "name": "Verfluchtes Essen",
        "targetType": "category",
        "targetID": "all_categories",
        "value": 3
       }
      ]
     },
     {
      "wurf": 10,
      "text": "Lebensmittelvergiftung, falscher Pilz. Zähigkeitsprobe GS 1W6",
      "buffs": [
       {
        "name": "Lebensmittelvergiftung.",
        "targetType": "charakter",
        "targetID": "hp",
        "value": "2W10"
       }
      ]
     }
    ]
   }
  },
  "oracle_piraten_gerüchte": {
   "id": "oracle_piraten_gerüchte",
   "name": "Orakel: Piraten Gerüchte",
   "wuerfel": "1W100",
   "art": "orakel",
   "spalten": {
    "spalte_A_ereignis": [
     {
      "wurf": 1,
      "text": "Ein geschmuggelter Seesack verbirgt"
     },
     {
      "wurf": 2,
      "text": "Ein blutiger Dolch lag neben"
     },
     {
      "wurf": 3,
      "text": "Ein verfluchter Kompass zeigt auf"
     },
     {
      "wurf": 4,
      "text": "Ein belauschter Steuermann flüsterte über"
     },
     {
      "wurf": 5,
      "text": "Ein heimlicher Pakt entstand durch"
     },
     {
      "wurf": 6,
      "text": "Ein gefälschter Steckbrief warnt vor"
     },
     {
      "wurf": 7,
      "text": "Ein lautstarker Kneipenstreit drehte sich um"
     },
     {
      "wurf": 8,
      "text": "Ein betrunkener Navigator schwört auf"
     },
     {
      "wurf": 9,
      "text": "Ein mysteriöser Chiffre-Brief verweist auf"
     },
     {
      "wurf": 10,
      "text": "Ein drohender Schiffbruch droht durch"
     },
     {
      "wurf": 11,
      "text": "Ein verlorener Logbuch-Eintrag berichtet von"
     },
     {
      "wurf": 12,
      "text": "Ein erpresster Quartiermeister verriet"
     },
     {
      "wurf": 13,
      "text": "Ein legendärer Prisen-Bericht verspricht"
     },
     {
      "wurf": 14,
      "text": "Ein schändlicher Giftmord geschah wegen"
     },
     {
      "wurf": 15,
      "text": "Ein rachesuchender Bootsmann jagt"
     },
     {
      "wurf": 16,
      "text": "Ein unfairer Würfelwurf entschied über"
     },
     {
      "wurf": 17,
      "text": "Ein schattenhafter Fremder sucht nach"
     },
     {
      "wurf": 18,
      "text": "Ein käuflicher Zöllner fälschte"
     },
     {
      "wurf": 19,
      "text": "Ein meuternder Matrose floh mit"
     },
     {
      "wurf": 20,
      "text": "Ein göttliches Zeichen am Himmel deutet auf"
     },
     {
      "wurf": 21,
      "text": "Ein sterbender Pirat zeichnete"
     },
     {
      "wurf": 22,
      "text": "Ein gestohlenes Amulett beschwört"
     },
     {
      "wurf": 23,
      "text": "Ein brennendes Wrack birgt"
     },
     {
      "wurf": 24,
      "text": "Ein rissiges Pergament beschreibt"
     },
     {
      "wurf": 25,
      "text": "Ein unheimliches Heulen nachts kündet von"
     },
     {
      "wurf": 26,
      "text": "Ein hoher Finderlohn steht auf"
     },
     {
      "wurf": 27,
      "text": "Ein im Sand vergrabener Käfig enthält"
     },
     {
      "wurf": 28,
      "text": "Ein seltener Edelstein fordert Opfer für"
     },
     {
      "wurf": 29,
      "text": "Ein versunkener Dreimaster bewacht"
     },
     {
      "wurf": 30,
      "text": "Ein meisterhafter Diebstahl drehte sich um"
     },
     {
      "wurf": 31,
      "text": "Ein eiskalter Verrat zerstörte"
     },
     {
      "wurf": 32,
      "text": "Ein betörender Sirenengesang lockt zu"
     },
     {
      "wurf": 33,
      "text": "Ein verlassenes Ruderboot trieb mit"
     },
     {
      "wurf": 34,
      "text": "Ein Geheimgang unter der Spelunke führt zu"
     },
     {
      "wurf": 35,
      "text": "Ein goldener Kelch fehlt bei"
     },
     {
      "wurf": 36,
      "text": "Ein folgenschwerer Fluch liegt auf"
     },
     {
      "wurf": 37,
      "text": "Ein gieriger Händler bezahlt für"
     },
     {
      "wurf": 38,
      "text": "Ein abgehackter Finger lag im Becher von"
     },
     {
      "wurf": 39,
      "text": "Ein geheimnisvoller Händler verkauft"
     },
     {
      "wurf": 40,
      "text": "Ein steckengebliebenes Kanonenrohr explodierte wegen"
     },
     {
      "wurf": 41,
      "text": "Ein finsterer Kult betet zu"
     },
     {
      "wurf": 42,
      "text": "Ein abgerissenes Stück Segeltuch zeigt"
     },
     {
      "wurf": 43,
      "text": "Ein verbeultes Medaillon erinnert an"
     },
     {
      "wurf": 44,
      "text": "Ein verräterisches Tattoo beweist"
     },
     {
      "wurf": 45,
      "text": "Ein verstaubtes Fernrohr offenbart"
     },
     {
      "wurf": 46,
      "text": "Ein seltener Tropenvogel krächzt über"
     },
     {
      "wurf": 47,
      "text": "Ein verbarrikadiertes Lagerhaus schützt"
     },
     {
      "wurf": 48,
      "text": "Ein entflohener Sklave weiß von"
     },
     {
      "wurf": 49,
      "text": "Ein schlafender Wachsoldat verlor"
     },
     {
      "wurf": 50,
      "text": "Ein plötzlich gekapptes Ankertau führte zu"
     },
     {
      "wurf": 51,
      "text": "Ein vergifteter Rum-Fass-Inhalt tötete"
     },
     {
      "wurf": 52,
      "text": "Ein künstliches Signalfeuer lockte in"
     },
     {
      "wurf": 53,
      "text": "Ein vergrabenes Skelett klammert sich an"
     },
     {
      "wurf": 54,
      "text": "Ein kühner Sabotageakt traf"
     },
     {
      "wurf": 55,
      "text": "Ein betrügerischer Hehler feilscht um"
     },
     {
      "wurf": 56,
      "text": "Ein schmutziges Testament vererbt"
     },
     {
      "wurf": 57,
      "text": "Ein stummer Bettler deutet auf"
     },
     {
      "wurf": 58,
      "text": "Ein eilig verlassenes Lagerfeuer zeugt von"
     },
     {
      "wurf": 59,
      "text": "Ein kopfloser Geist spukt wegen"
     },
     {
      "wurf": 60,
      "text": "Ein gezinktes Kartenspiel endete in"
     },
     {
      "wurf": 61,
      "text": "Ein reicher Plantagenbesitzer flieht vor"
     },
     {
      "wurf": 62,
      "text": "Ein blutiges Haifischgebiss warnt vor"
     },
     {
      "wurf": 63,
      "text": "Ein wertvolles Frachtschiff wartet auf"
     },
     {
      "wurf": 64,
      "text": "Ein unheimliches Glühen im Riff zeigt"
     },
     {
      "wurf": 65,
      "text": "Ein korrupter Gouverneur unterschrieb"
     },
     {
      "wurf": 66,
      "text": "Ein scharfes Entermesser ritzte"
     },
     {
      "wurf": 67,
      "text": "Ein verlorenes Medaillon gehört zu"
     },
     {
      "wurf": 68,
      "text": "Ein seltener Flaschenpost-Brief bittet um"
     },
     {
      "wurf": 69,
      "text": "Ein nasser Steckbrief klebte an"
     },
     {
      "wurf": 70,
      "text": "Ein zerbrochener Schiffskompass war der Grund für"
     },
     {
      "wurf": 71,
      "text": "Ein gezielter Schuss im Hafen traf"
     },
     {
      "wurf": 72,
      "text": "Ein uraltes Seemannslied beschreibt"
     },
     {
      "wurf": 73,
      "text": "Ein schwerer Eichenschrank verbirgt"
     },
     {
      "wurf": 74,
      "text": "Ein dunkler Fleck auf der Seekarte markiert"
     },
     {
      "wurf": 75,
      "text": "Ein schreiendes Findelkind trug"
     },
     {
      "wurf": 76,
      "text": "Ein nachts gestohlenes Beiboot brachte"
     },
     {
      "wurf": 77,
      "text": "Ein seltsames Schnitzen im Holz zeigt"
     },
     {
      "wurf": 78,
      "text": "Ein goldener Siegelring lag im Magen von"
     },
     {
      "wurf": 79,
      "text": "Ein verlassenes Fort birgt"
     },
     {
      "wurf": 80,
      "text": "Ein plötzlicher Sturm enthüllte"
     },
     {
      "wurf": 81,
      "text": "Ein rachedurstiger Schiffskoch sucht"
     },
     {
      "wurf": 82,
      "text": "Ein verrosteter Käfig baumelt über"
     },
     {
      "wurf": 83,
      "text": "Ein gestrandeter Wal verschluckte"
     },
     {
      "wurf": 84,
      "text": "Ein unheimlicher Priester warnt vor"
     },
     {
      "wurf": 85,
      "text": "Ein ausgeblichenes Flaggentuch signalisiert"
     },
     {
      "wurf": 86,
      "text": "Ein reicher Lösegeld-Brief fordert"
     },
     {
      "wurf": 87,
      "text": "Ein Geheimbund plant Sabotage gegen"
     },
     {
      "wurf": 88,
      "text": "Ein im Moor versunkener Karren enthält"
     },
     {
      "wurf": 89,
      "text": "Ein magisches Brandmal fordert"
     },
     {
      "wurf": 90,
      "text": "Ein im Rausch belauschtes Gespräch verriet"
     },
     {
      "wurf": 91,
      "text": "Ein eilig vergrabenes Fass schützt"
     },
     {
      "wurf": 92,
      "text": "Ein unvollständiges Logbuch klagt an"
     },
     {
      "wurf": 93,
      "text": "Ein Geisterleuchten am Kai warnt vor"
     },
     {
      "wurf": 94,
      "text": "Ein verratener Schugglerring sucht"
     },
     {
      "wurf": 95,
      "text": "Ein stummes Mädchen zeichnete"
     },
     {
      "wurf": 96,
      "text": "Ein von Maden zerfressener Seesack enthielt"
     },
     {
      "wurf": 97,
      "text": "Ein rostiger Schlüssel passt zu"
     },
     {
      "wurf": 98,
      "text": "Ein scharlachrotes Segel gehört zu"
     },
     {
      "wurf": 99,
      "text": "Ein rissiges Holzbein birgt Notizen über"
     },
     {
      "wurf": 100,
      "text": "Ein im Sterben liegender Smutje gestand"
     }
    ],
    "spalte_B_thema": [
     {
      "wurf": 1,
      "text": "den verlorenen Seemannsschatz im Korallenriff"
     },
     {
      "wurf": 2,
      "text": "einen geplanten Verrat unter Deck der Fregatte"
     },
     {
      "wurf": 3,
      "text": "einen uralten Pakt mit einer wilden Sirene"
     },
     {
      "wurf": 4,
      "text": "einen Hinterhalt der königlichen Marine am Kai"
     },
     {
      "wurf": 5,
      "text": "einen blutigen Spelunken-Streit um geraubtes Gold"
     },
     {
      "wurf": 6,
      "text": "einen nächtlichen Hafen-Hinterhalt im dichten Nebel"
     },
     {
      "wurf": 7,
      "text": "den geheimen Schmuggel-Weg durch die Mangroven"
     },
     {
      "wurf": 8,
      "text": "den grausamen Fluch einer Voodoo-Priesterin"
     },
     {
      "wurf": 9,
      "text": "den gefälschten Steckbrief auf einen Navigator"
     },
     {
      "wurf": 10,
      "text": "den illegalen Handel mit verbotener Ware im Fort"
     },
     {
      "wurf": 11,
      "text": "den brutalen Kielhol-Befehl des grausamen Kapitäns"
     },
     {
      "wurf": 12,
      "text": "einen verdeckten Giftmischer in der Kombüse"
     },
     {
      "wurf": 13,
      "text": "ein verfluchtes Geisterschiff am fernen Horizont"
     },
     {
      "wurf": 14,
      "text": "einen riskanten Gefängnis-Ausbruch im spanischen Fort"
     },
     {
      "wurf": 15,
      "text": "einen miesen Schatzkarten-Betrug auf Tortuga"
     },
     {
      "wurf": 16,
      "text": "eine feige Sabotage am mächtigen Großmast"
     },
     {
      "wurf": 17,
      "text": "einen alten Kompass der direkt ins Verderben führt"
     },
     {
      "wurf": 18,
      "text": "geheime Spionage-Berichte für den dicken Gouverneur"
     },
     {
      "wurf": 19,
      "text": "einen verheerenden Spelunken-Brand voller Absicht"
     },
     {
      "wurf": 20,
      "text": "den seltenen Segen des launischen Meeresgottes"
     },
     {
      "wurf": 21,
      "text": "eine im Dschungel versteckte Schatzgrotte"
     },
     {
      "wurf": 22,
      "text": "die geheime Hinrichtung des treuen Quartiermeisters"
     },
     {
      "wurf": 23,
      "text": "den Schmuggel von seltenem Kanonenpulver"
     },
     {
      "wurf": 24,
      "text": "ein im Sumpf verstecktes Voodoo-Heiligtum"
     },
     {
      "wurf": 25,
      "text": "eine gestohlene Truhe voller Diamanten"
     },
     {
      "wurf": 26,
      "text": "ein verlassenes Nest von blutrünstigen Harpyien"
     },
     {
      "wurf": 27,
      "text": "eine geheime Liebschaft der Gouverneurstochter"
     },
     {
      "wurf": 28,
      "text": "das Erbe eines legendären Piratenfürsten"
     },
     {
      "wurf": 29,
      "text": "den Fluchversuch auf das stolze Flaggschiff"
     },
     {
      "wurf": 30,
      "text": "eine illegale Sklavenbefreiung in der Plantage"
     },
     {
      "wurf": 31,
      "text": "die Vergiftung der Trinkwasserbrunnen im Hafen"
     },
     {
      "wurf": 32,
      "text": "den Diebstahl der goldenen Kirchenglocke"
     },
     {
      "wurf": 33,
      "text": "ein geheimes Treffen verfeindeter Piratenkapitäne"
     },
     {
      "wurf": 34,
      "text": "eine Kiste mit verfluchtem Aztekengold"
     },
     {
      "wurf": 35,
      "text": "die Meuterei auf einem königlichen Gefängnisschiff"
     },
     {
      "wurf": 36,
      "text": "die Entführung eines hochrangigen Seekadetten"
     },
     {
      "wurf": 37,
      "text": "ein Nest von tödlichen Riffhaien am Badestrand"
     },
     {
      "wurf": 38,
      "text": "die Fälschung von offiziellen Kaperbriefen"
     },
     {
      "wurf": 39,
      "text": "eine versteckte Rum-Brennerei tief im dichten Wald"
     },
     {
      "wurf": 40,
      "text": "das Tagebuch eines wahnsinnig gewordenen Schiffsarztes"
     },
     {
      "wurf": 41,
      "text": "den geheimnisvollen Kult des schlafenden Kraken"
     },
     {
      "wurf": 42,
      "text": "das Versteck eines verräterischen Spions im Dorf"
     },
     {
      "wurf": 43,
      "text": "eine wertvolle Ladung purer Seide auf Grund"
     },
     {
      "wurf": 44,
      "text": "den unheiligen Friedhof der namenlosen Piraten"
     },
     {
      "wurf": 45,
      "text": "ein gestrandetes Beiboot voller Leichen"
     },
     {
      "wurf": 46,
      "text": "die Sabotage der Verteidigungskanonen der Stadt"
     },
     {
      "wurf": 47,
      "text": "den Diebstahl des heiligen Kruzifixes im Kloster"
     },
     {
      "wurf": 48,
      "text": "ein uraltes Riesenei im warmen Vulkankrater"
     },
     {
      "wurf": 49,
      "text": "die Erpressung des dorfbekannten Hafenmeisters"
     },
     {
      "wurf": 50,
      "text": "das Wrack einer uralten spanischen Galeone"
     },
     {
      "wurf": 51,
      "text": "eine Karte zu den geheimen Perlenbänken"
     },
     {
      "wurf": 52,
      "text": "den Aufenthaltsort eines legendären Schiffszimmers"
     },
     {
      "wurf": 53,
      "text": "eine im Sand versunkene eiserne Schatztruhe"
     },
     {
      "wurf": 54,
      "text": "den verdeckten Schmuggel von seltenen Heilkräutern"
     },
     {
      "wurf": 55,
      "text": "das Erwachen einer uralten Seeschlange im Hafenbecken"
     },
     {
      "wurf": 56,
      "text": "eine Meuterei gegen den unfähigen Kapitän"
     },
     {
      "wurf": 57,
      "text": "die verbotene Grotte der leuchtenden Quallen"
     },
     {
      "wurf": 58,
      "text": "den feigen Diebstahl des Schiffsmaskottchens"
     },
     {
      "wurf": 59,
      "text": "einen Scharfschützen auf dem Dach der Werft"
     },
     {
      "wurf": 60,
      "text": "das geheime Logbuch des ersten Gouverneurs"
     },
     {
      "wurf": 61,
      "text": "eine Kiste voll mit geraubten Kirchenschätzen"
     },
     {
      "wurf": 62,
      "text": "den Fluch der unruhigen Geistermatrosen"
     },
     {
      "wurf": 63,
      "text": "einen kostbaren Smaragd im Auge des Götzenbilds"
     },
     {
      "wurf": 64,
      "text": "das Grab des allerersten Piratenkönigs"
     },
     {
      "wurf": 65,
      "text": "die illegale Jagd auf seltene Riesenschildkröten"
     },
     {
      "wurf": 66,
      "text": "einen Tunnel unter dem spanischen Fort"
     },
     {
      "wurf": 67,
      "text": "das Handelsmonopol für seltenen schwarzen Pfeffer"
     },
     {
      "wurf": 68,
      "text": "das Nest eines gewaltigen Donnervogels"
     },
     {
      "wurf": 69,
      "text": "die Flucht einer Gruppe von Meuterern"
     },
     {
      "wurf": 70,
      "text": "ein im Schlamm versunkenes Handelsboot"
     },
     {
      "wurf": 71,
      "text": "die Rettung eines im Riff gefangenen Händlers"
     },
     {
      "wurf": 72,
      "text": "eine Lieferung von feinstem, erbeutetem Tabak"
     },
     {
      "wurf": 73,
      "text": "ein Fluch-Amulett im Besitz des Kapitäns"
     },
     {
      "wurf": 74,
      "text": "das geheime Signalbuch der königlichen Kriegsflotte"
     },
     {
      "wurf": 75,
      "text": "eine Truhe voller seltener, antiker Münzen"
     },
     {
      "wurf": 76,
      "text": "den plötzlichen Tod des alten Leuchtturmwärters"
     },
     {
      "wurf": 77,
      "text": "ein Nest von aggressiven Riesenspinnen im Frachtraum"
     },
     {
      "wurf": 78,
      "text": "eine gefälschte Besitzurkunde für die ganze Insel"
     },
     {
      "wurf": 79,
      "text": "die Entführung der schwangeren Smutje-Frau"
     },
     {
      "wurf": 80,
      "text": "eine Kiste voll geladener Musketen im Unterholz"
     },
     {
      "wurf": 81,
      "text": "den geheimen Fluchtweg des feigen Plantagenbesitzers"
     },
     {
      "wurf": 82,
      "text": "das finstere Geheimnis des stummen Barkeepers"
     },
     {
      "wurf": 83,
      "text": "die Jagd auf einen sagenumwobenen weißen Wal"
     },
     {
      "wurf": 84,
      "text": "eine vergessene Toteninsel ohne Wiederkehr"
     },
     {
      "wurf": 85,
      "text": "das verlassene Versteck eines bekannten Schmugglers"
     },
     {
      "wurf": 86,
      "text": "die verbotenen Rituale des alten Medizinmanns"
     },
     {
      "wurf": 87,
      "text": "ein Komplott zur Ermordung des Richters"
     },
     {
      "wurf": 88,
      "text": "die Bergung einer schweren bronzenen Schiffskanone"
     },
     {
      "wurf": 89,
      "text": "den Giftanschlag auf die gesamte Besatzung"
     },
     {
      "wurf": 90,
      "text": "eine Kiste voller ungeschnittener roter Rubine"
     },
     {
      "wurf": 91,
      "text": "das unheimliche Skelett mit dem goldenen Zahn"
     },
     {
      "wurf": 92,
      "text": "die verlassene Ruine der alten Zuckermühle"
     },
     {
      "wurf": 93,
      "text": "eine Schatzkarte geritzt in menschliche Haut"
     },
     {
      "wurf": 94,
      "text": "das mysteriöse Verschwinden des Hafenarztes"
     },
     {
      "wurf": 95,
      "text": "einen wertvollen Ring im Magen eines Alligators"
     },
     {
      "wurf": 96,
      "text": "den geheimen Pakt der Händlergilde mit Piraten"
     },
     {
      "wurf": 97,
      "text": "die Sabotage an den Rudern der Beiboote"
     },
     {
      "wurf": 98,
      "text": "das leuchtende Algenbett voller seltener Perlen"
     },
     {
      "wurf": 99,
      "text": "den Racheplan des einbeinigen alten Seebären"
     },
     {
      "wurf": 100,
      "text": "die Wiederkehr des grausamen Geisterkapitäns"
     }
    ]
   }
  },
  "table_musizieren": {
   "id": "table_musizieren",
   "name": "Musizieren",
   "wuerfel": "1W10",
   "art": "probe",
   "spalten": {
    "success": [
     {
      "wurf": 1,
      "text": "Lied ist im Hintergrund untergegangen. Kein Effekt"
     },
     {
      "wurf": 2,
      "text": "Angenehmes Lied.",
      "buffs": [
       {
        "name": "Angenehmes Lied gehört.",
        "targetType": "category",
        "targetID": "handeln",
        "value": 3
       }
      ]
     },
     {
      "wurf": 3,
      "text": "Crew wippt zum Takt - heitere Stimmung",
      "buffs": [
       {
        "name": "Taktvolles Lied",
        "targetType": "category",
        "targetID": "soziales",
        "value": 5
       }
      ]
     },
     {
      "wurf": 4,
      "text": "Mutiges Lied, alle Verbündeten erhalten 20 Temporäre Trefferpunkte.",
      "buffs": [
       {
        "name": "Lied macht Mut!",
        "targetType": "charakter",
        "targetID": "hp",
        "value": 20
       }
      ]
     },
     {
      "wurf": 5,
      "text": "Inspirierendes Lied - +5 auf Kraft",
      "buffs": [
       {
        "name": "Inspiriert!",
        "targetType": "talent",
        "targetID": "Athletik",
        "value": 5
       }
      ]
     },
     {
      "wurf": 6,
      "text": "Lied stärkt den Kampfgeist!",
      "buffs": [
       {
        "name": "Kampfschrei",
        "targetType": "charakter",
        "targetID": "movement",
        "value": 1
       }
      ]
     },
     {
      "wurf": 7,
      "text": "Magische Worte im Lied.",
      "buffs": [
       {
        "name": "Magische Schwingungen",
        "targetType": "category",
        "targetID": "handeln",
        "value": 5
       }
      ]
     },
     {
      "wurf": 8,
      "text": "Heroisches Lied - jetzt gibts auf die Fresse. Crew in der ersten Kampfrunde +10 auf Angriffswürfe",
      "buffs": [
       {
        "name": "Heroisch.",
        "targetType": "category",
        "targetID": "all",
        "value": 10
       }
      ]
     },
     {
      "wurf": 9,
      "text": "Rhythmus im Blut - +1 Initiative",
      "buffs": [
       {
        "name": "Rhythmus im Blut",
        "targetType": "charakter",
        "targetID": "initiative",
        "value": 1
       }
      ]
     },
     {
      "wurf": 10,
      "text": "Meisterstück - Gegner sind sprachlos und abgelenkt. Alle Verbündete +1W10",
      "buffs": [
       {
        "name": "Meisterlied",
        "targetType": "charakter",
        "targetID": "attack_value",
        "value": "1W10"
       }
      ]
     }
    ],
    "no_success": [
     {
      "wurf": 1,
      "text": "Nerviges Rumgeklimpere"
     },
     {
      "wurf": 2,
      "text": "Falsche Töne, du kommst ins Schwitzen",
      "buffs": [
       {
        "name": "Falsche Töne",
        "targetType": "talent",
        "targetID": "Zähigkeit",
        "value": -5
       }
      ]
     },
     {
      "wurf": 3,
      "text": "Totale Blamage, falsches Lied zur falschen Zeit.",
      "buffs": [
       {
        "name": "Blamage!",
        "targetType": "category",
        "targetID": "soziales",
        "value": -10
       }
      ]
     },
     {
      "wurf": 4,
      "text": "Stimmgerät vergessen, Lieferung aus Thomannonien braucht 1W6 Tage zur Lieferung",
      "buffs": [
       {
        "name": "Instrument nicht spielbar",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 5,
      "text": "Eine Saite reißt und schlitzt deinen Finger auf.",
      "buffs": [
       {
        "name": "Aufgeschlitzter Finger",
        "targetType": "charakter",
        "targetID": "hp",
        "value": "-1W6"
       }
      ]
     },
     {
      "wurf": 6,
      "text": "Nervtötendes Lied.",
      "buffs": [
       {
        "name": "Alle blicke auf Dich.",
        "targetType": "charakter",
        "targetID": "initiative",
        "value": -1
       }
      ]
     },
     {
      "wurf": 7,
      "text": "Ein Lied von Helenus Angler gespielt. Ein Zuschauer flippt aus und geht und haut dir ins Gesicht.",
      "buffs": [
       {
        "name": "Helenus Angelus",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 8,
      "text": "Heute einfach keinen Rhythmus",
      "buffs": [
       {
        "name": "Rhythmus futsch",
        "targetType": "category",
        "targetID": "all_categories",
        "value": -5
       }
      ]
     },
     {
      "wurf": 9,
      "text": "Du bist voll im Fokus und verpasst den Kampf.",
      "buffs": [
       {
        "name": "Fokus!",
        "targetType": "charakter",
        "targetID": "initiative",
        "value": -1
       }
      ]
     },
     {
      "wurf": 10,
      "text": "Der Ton ist verflucht. Alle Verbündete bekommen 2W10 Schaden",
      "buffs": [
       {
        "name": "Verfluchter Ton.",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     }
    ]
   }
  },
  "table_zechen": {
   "id": "table_zechen",
   "name": "Zechen",
   "wuerfel": "1W10",
   "art": "probe",
   "spalten": {
    "success": [
     {
      "wurf": 1,
      "text": "Angenehm angeschwippst. Volle Kontrolle"
     },
     {
      "wurf": 2,
      "text": "Lustiger Suff, +5 Soziales",
      "buffs": [
       {
        "name": "Lustig angeschwippst!",
        "targetType": "category",
        "targetID": "soziales",
        "value": 5
       }
      ]
     },
     {
      "wurf": 3,
      "text": "Mut angetrunken - + 10 Einschüchtern",
      "buffs": [
       {
        "name": "Mutiger Suff",
        "targetType": "talent",
        "targetID": "Einschüchtern",
        "value": 10
       }
      ]
     },
     {
      "wurf": 4,
      "text": "In vino veritas. Gassenwissen +10",
      "buffs": [
       {
        "name": "In vino veritas.",
        "targetType": "talent",
        "targetID": "Gassenwissen",
        "value": 10
       }
      ]
     },
     {
      "wurf": 5,
      "text": "Alkohol desinfiziert! +10 auf Zähigkeitsprobe.",
      "buffs": [
       {
        "name": "Kehle desinfiziert!",
        "targetType": "talent",
        "targetID": "Zähigkeit",
        "value": 10
       }
      ]
     },
     {
      "wurf": 6,
      "text": "Betrunken. Ich spüre kein Schmerz! Nächster Schaden wird halbiert.",
      "buffs": [
       {
        "name": "Alkohol, halber Schmerz",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 7,
      "text": "Siegesrausch! + 5 auf alle Angriffe in der ersten Runde des nächsten Kampfs",
      "buffs": [
       {
        "name": "Siegesrausch!",
        "targetType": "category",
        "targetID": "Kampf",
        "value": 5
       }
      ]
     },
     {
      "wurf": 8,
      "text": "Trinkspiel gewonnen. +1 Initiative",
      "buffs": [
       {
        "name": "Trinkspieler!",
        "targetType": "charakter",
        "targetID": "initiative",
        "value": 1
       }
      ]
     },
     {
      "wurf": 9,
      "text": "Epischer Zecher, Crew erhält + 3 auf alle Proben.",
      "buffs": [
       {
        "name": "Zecher!",
        "targetType": "category",
        "targetID": "all_categories",
        "value": 3
       }
      ]
     },
     {
      "wurf": 10,
      "text": "LEgendenstatus, erste Kampfrunde machen alle Verbündete +1W10 mehr Schaden",
      "buffs": [
       {
        "name": "Legendäres Saufgelage.",
        "targetType": "charakter",
        "targetID": "attack_value",
        "value": "1W10"
       }
      ]
     }
    ],
    "no_success": [
     {
      "wurf": 1,
      "text": "Kater - -1 auf alle Proben für den nächsten Tag.",
      "buffs": [
       {
        "name": "Verkartert.",
        "targetType": "category",
        "targetID": "all_categories",
        "value": -1
       }
      ]
     },
     {
      "wurf": 2,
      "text": "Betrunken hingefallen - 1W10 Schaden",
      "buffs": [
       {
        "name": "Hingefallen",
        "targetType": "charakter",
        "targetID": "hp",
        "value": "-1W10"
       }
      ]
     },
     {
      "wurf": 3,
      "text": "In vino veritas. Verplappert. Spielleiter bestimmt das Geheimnis.",
      "buffs": [
       {
        "name": "Dicht verplappert!",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 4,
      "text": "Jemand hat aus Versehen dein Bier genommen, die Sau! Sofortiger Kampf!",
      "buffs": [
       {
        "name": "Großschnauze!",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 5,
      "text": "Ey Mann, wo sind meine Tchambas?",
      "buffs": [
       {
        "name": "Filmriss!",
        "targetType": "charakter",
        "targetID": "gold",
        "value": "-1W100"
       }
      ]
     },
     {
      "wurf": 6,
      "text": "Vergiftung - Du startest den nächsten Tag mit Giftstufe 1W6",
      "buffs": [
       {
        "name": "Vergiftet!",
        "targetType": "charakter",
        "targetID": "gift_stufe",
        "value": "1W6"
       }
      ]
     },
     {
      "wurf": 7,
      "text": "Du reierst um dich herum! Ist das ekelig, auch für Dich. -10 auf Soziales.",
      "buffs": [
       {
        "name": "Kreisreier!",
        "targetType": "category",
        "targetID": "soziales",
        "value": -10
       }
      ]
     },
     {
      "wurf": 8,
      "text": "Im Rausch in Schenkerlaune",
      "buffs": [
       {
        "name": "Schenker via Alkohol",
        "targetType": "",
        "targetID": "",
        "value": ""
       }
      ]
     },
     {
      "wurf": 9,
      "text": "Prügelei - du startest deinen nächsten Kampf mit -10 Lebenspunkte",
      "buffs": [
       {
        "name": "verprügelt!",
        "targetType": "charakter",
        "targetID": "hp",
        "value": -10
       }
      ]
     },
     {
      "wurf": 10,
      "text": "Du landest im Gefängnis, nicht über Los. Du bist so stramm. Du kannst kaum laufen",
      "buffs": [
       {
        "name": "Hackedicht im Knast",
        "targetType": "charakter",
        "targetID": "gold",
        "value": -100
       }
      ]
     }
    ]
   }
  }
 }
});
