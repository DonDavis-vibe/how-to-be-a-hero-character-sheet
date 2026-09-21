#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Konvertiert die Eldara-Regeln in das Regelpaket-Format des Tools (siehe
DATA_FORMAT.md, Abschnitt "Regelpakete / Hausregeln"). Zwei Quellen fließen
ein:

  - quellen/eldora-arrrrr.roh.json - Export-Format des Gruppen-Prototyps.
    Liefert den Talentbaum (Skills je Ast, Wesen, Ränge) - diesen Teil kann
    das Tool nicht sinnvoll von Hand transkribieren, dafür ist er zu groß.
  - quellen/rw43.txt - Volltext-Extrakt des offiziellen Regelwerks (RW 4.3,
    Stand 2026-07-22). Liefert die Basis-Talentliste (Handeln/Wissen/
    Soziales, S.8-11), das Punktebudget und die "Besonderen Eigenschaften" -
    diese Teile sind als Konstanten von Hand aus dem PDF abgetippt (siehe
    TALENTE, PUNKTE, EIGENSCHAFTEN unten), weil die Rohdatei der Gruppe hier
    nachweislich abweicht (Test-Einträge, veraltete Werte - siehe
    hausregeln/OFFENE_FRAGEN.md Frage 5).

Aufruf (aus dem Repo-Wurzelverzeichnis):

    python hausregeln/konvertiere-eldora.py

Schreibt hausregeln/eldora-arrrrr.js. Die Rohdatei bleibt unverändert - wenn die
Gruppe eine neue Fassung schickt, einfach ersetzen und das Skript erneut laufen
lassen. Alles, was im Rohformat uneinheitlich ist (Groß-/Kleinschreibung von
"Art", leere Felder, Tippfehler in Schlüsseln), wird hier geglättet, damit das
JavaScript im Tool nie raten muss.
"""

import json
import sys
from pathlib import Path

HIER = Path(__file__).resolve().parent
QUELLE = HIER / 'quellen' / 'eldora-arrrrr.roh.json'
ZIEL = HIER / 'eldora-arrrrr.js'

PAKET_ID = 'eldora-arrrrr'
PAKET_NAME = 'Eldara – Version Arrrrr'

# Die Rohdatei der Gruppe (roh.json, Export ihres eigenen Prototyps) benennt
# zwei Äste noch nach alter Schreibweise ("Heimlichkeit", "Voodoo Ritual
# Klinge" mit Leerzeichen). RW 4.3 S.14 schreibt sie "Heimlich"/"Voodoo
# Ritualklinge" - laut SL (siehe OFFENE_FRAGEN.md Frage 1) ist das nur eine
# Schreibweisen-Auffrischung, kein neuer/anderer Ast. Wird hier beim
# Einlesen normalisiert, damit im Tool überall die aktuelle RW-4.3-Schreibweise
# steht, ohne die Skill-Zuordnung aus der Rohdatei zu verlieren.
AST_SCHREIBWEISE_RW43 = {
    'Heimlichkeit': 'Heimlich',
    'Voodoo Ritual Klinge': 'Voodoo Ritualklinge',
}

# Welche Äste des Talentbaums Spieler als Hauptbaum wählen dürfen (nach obiger
# Normalisierung, also in RW-4.3-Schreibweise).
HAUPTBAEUME = [
    'Nahkampf Klingen', 'Nahkampf Fäuste', 'Stärke', 'Fernkampf', 'Agilität',
    'Voodoo Ritualklinge', 'Voodoo Fluchspucker', 'Einschüchtern',
    'Heimlich', 'Medizin', 'Motivieren',
]

# Die Rangpunkt-/Skillpunkt-Regeln, jetzt gegen das vollständige Regelwerk
# (RW 4.1, S.17-19 - siehe hausregeln/quellen/rw41.txt Zeile ~640-830) geprüft
# statt gegen den ersten Prototyp der Gruppe. Bewusst als Daten im Paket, nicht
# als Code im Tool - so kann die Gruppe nachjustieren, ohne dass jemand JS
# anfasst. Ein offener Fragenkatalog für die Runde liegt in
# hausregeln/OFFENE_FRAGEN.md - die dort genannten Punkte sind noch NICHT vom
# Regelwerk-Text zweifelsfrei geklärt, sondern meine dokumentierte Lesart.
PUNKTE = {
    # Obergrenze der Talentpunkte. RW 4.3 S.6 + S.8 sagen an ZWEI Stellen
    # unabhängig "400 Punkte" ("Verteilt 400 Punkte auf die Talente der drei
    # Gruppen"). Klärt die alte Frage 5 aus OFFENE_FRAGEN.md (400 vs. 500):
    # die 500 kamen nur aus einem einzelnen Beispiel-Charakterbogen der
    # Gruppe (eldora-arrrrr.roh.json), nicht aus dem Regelwerk selbst.
    'maxTalentpunkte': 400,
    # Progressive Kosten je Talentpunkt UND Rang-Schwellen eines Talentbaums in
    # einem: Punkt/Wert 1-30 = Rang 1 (kostet 1/Punkt), 31-60 = Rang 2 (kostet
    # 2), 61-90 = Rang 3 (kostet 4), 91-99 = Rang 4 (kostet 10). RW 4.1 S.17.
    'kostenStaffel': [
        {'bis': 30, 'kosten': 1},
        {'bis': 60, 'kosten': 2},
        {'bis': 90, 'kosten': 4},
        {'bis': 99, 'kosten': 10},
    ],
    # Jede erreichte Schwelle EINES Talentwerts bringt in dessen Baum einen
    # Skillpunkt (RW 4.1 S.17, "Wie erhalte ich Skillpunkte?") - gilt pro Baum,
    # nicht als ein Gesamttopf über alle Bäume.
    'skillpunktSchwellen': [1, 10, 20, 30, 40, 50, 60, 70, 80, 90,
                            91, 92, 93, 94, 95, 96, 97, 98, 99],
}

# ANNAHME (nicht im Regelwerk-Text explizit bestätigt, siehe OFFENE_FRAGEN.md):
# welcher Bogen-Talentwert den Rang/die Skillpunkte je Hauptbaum treibt.
# KEYS = Ast-Namen wie in HAUPTBAEUME (RW-4.3-Schreibweise). VALUES = Name in
# appData.skills_*[].name (aus TALENTE unten).
# Die Talentbaum-Namen (S.14) sind NICHT identisch mit den Basis-Talenten
# (S.8ff) - "Nahkampf Klingen" und "Nahkampf Fäuste" gibt es als Talent nur
# einmal ("Nahkampf"), ebenso "Voodoo Ritualklinge"/"Voodoo Fluchspucker"
# ("Voodoo"). Die übrigen sechs sind 1:1-Treffer ("Agilität" ist dort bewusst
# NICHT als Basis-Talent gelistet, siehe OFFENE_FRAGEN.md Frage 1).
BAUM_TALENT = {
    'Nahkampf Klingen': 'Nahkampf',
    'Nahkampf Fäuste': 'Nahkampf',
    'Stärke': 'Stärke',
    'Fernkampf': 'Fernkampf',
    'Agilität': 'Agilität',
    'Voodoo Ritualklinge': 'Voodoo',
    'Voodoo Fluchspucker': 'Voodoo',
    'Einschüchtern': 'Einschüchtern',
    'Heimlich': 'Heimlich',
    'Medizin': 'Medizin',
    'Motivieren': 'Motivieren',
}

TALENTBAUM_REGELN = {
    'anzahlHauptbaeume': 3,
    'anzahlWesen': 1,
    'maxLevel': 3,
    # Kosten im Baum: JEDES Level eines Skills (auch das erste) = 1
    # Skillpunkt AUS DEM SP-TOPF DIESES ASTS. Rangpunkte (der gemeinsame Topf
    # über alle Bäume) bezahlen ausschließlich Besondere Eigenschaften, nie
    # Skills - korrigiert 2026-09-21 nach Bug-Report von JohoSaft (Discord),
    # vorher fälschlich 'erstesLevel': 'rangpunkt'. Feld selbst ist nur
    # Dokumentation, talentbaum.js liest es nicht (Logik ist dort fest
    # verdrahtet).
    'kosten': {'jedesLevel': 'skillpunkt'},
    # Höheren Rang freischalten: KUMULATIV mind. `benoetigt * (rang - 1)`
    # Skillpunkte DIESES Asts insgesamt ausgegeben, egal auf welche Skills
    # des Asts verteilt (RW 4.1 S.17, wörtlich "mindestens 2 Skillpunkte auf
    # dem Rang darunter verteilt" - vom SL präzisiert auf 2/4/6 für Rang
    # 2/3/4 statt "genau 2 am jeweiligen Vor-Rang", korrigiert 2026-09-21).
    # 'imAst'/'frei' bleiben als Alternativen für andere Pakete nutzbar,
    # falls eine Runde etwas anderes will - für Eldara gilt 'vorRang'.
    'freischaltung': {'modus': 'vorRang', 'benoetigt': 2},
}

# Die 20 "Besonderen Eigenschaften" (RW 4.1 S.18f) - existieren in keiner
# Rohdatei der Gruppe, von Hand aus rw41.txt transkribiert (siehe dort
# Zeile ~800-900). `wirkungen`: eine Wirkung je Mal, das die Eigenschaft
# gewählt werden kann (das Regelwerk zeigt das als "10/15/20%" o.ä. - jede
# Zahl ein Pick, mit einem eigenen Rangpunkt bezahlt). Wird auch vom
# Zufallsgenerator (randomizer/konvertiere-randomizer.py) genutzt, der diese
# Liste aus der generierten eldora-arrrrr.js ausliest statt sie zu duplizieren.
EIGENSCHAFTEN = [
    {'name': 'Fluchtreflex', 'rang': 1, 'wirkungen': [
        '10% Chance, Fernkampfangriffen auszuweichen (nur, wenn du dich diese Runde bewegt hast)',
        '15% Chance, Fernkampfangriffen auszuweichen (nur, wenn du dich diese Runde bewegt hast)',
        '20% Chance, Fernkampfangriffen auszuweichen (nur, wenn du dich diese Runde bewegt hast)']},
    {'name': 'Guter Esser', 'rang': 1, 'wirkungen': ['Du erhältst 2 Würfel pro Nacht für Essen']},
    {'name': 'Koordination', 'rang': 1, 'wirkungen': [
        'In Monsterform +1m Bewegung', 'In Monsterform +2m Bewegung', 'In Monsterform +3m Bewegung']},
    {'name': 'Langes Leben', 'rang': 1, 'wirkungen': [
        '+20 HP', '+40 HP', '+60 HP', '+80 HP', '+100 HP']},
    {'name': 'Ruhiger Schlaf', 'rang': 1, 'wirkungen': ['Du erhältst 2 Würfel pro Nacht fürs Schlafen']},
    {'name': 'Taktiker', 'rang': 1, 'wirkungen': [
        'Initiative +1 / +1m Bewegung / zusätzlich 1W10 Schaden in deiner ersten Kampfrunde']},
    {'name': 'Athlet', 'rang': 2, 'wirkungen': [
        'Rüstungsmalus wird um 1 reduziert', 'Rüstungsmalus wird um 2 reduziert', 'Rüstungsmalus wird um 3 reduziert']},
    {'name': 'Gesegneter Heiler', 'rang': 2, 'wirkungen': [
        'Alle Heilungszauber heilen zusätzlich +1W10', 'Alle Heilungszauber heilen zusätzlich +2W10', 'Alle Heilungszauber heilen zusätzlich +3W10']},
    {'name': 'Instinktive Parade', 'rang': 2, 'wirkungen': ['+1 Parade pro Runde', '+2 Paraden pro Runde']},
    {'name': 'Krieger', 'rang': 2, 'wirkungen': ['+1 Attacke pro Angriffsaktion (Aktion A)']},
    {'name': 'Stahlmagen', 'rang': 2, 'wirkungen': [
        'Erhaltenes Gift wird um 1 Stufe reduziert', 'Erhaltenes Gift wird um 2 Stufen reduziert', 'Erhaltenes Gift wird um 3 Stufen reduziert']},
    {'name': 'Kampfsanitäter', 'rang': 3, 'wirkungen': [
        '1-mal im Kampf Heilzauber als Extra-Aktion', '2-mal im Kampf Heilzauber als Extra-Aktion', '3-mal im Kampf Heilzauber als Extra-Aktion']},
    {'name': 'Magier', 'rang': 3, 'wirkungen': [
        'Reichweite deiner Fähigkeiten +1m, Wirkungsradius +0m', 'Reichweite +3m, Wirkungsradius +1m', 'Reichweite +5m, Wirkungsradius +2m']},
    {'name': 'Perfekter Konter', 'rang': 3, 'wirkungen': [
        'Immer wenn du einen Angriff kritisch parierst, darfst du zurückschlagen (Standardangriff)']},
    {'name': 'Schildbrecher', 'rang': 3, 'wirkungen': [
        'Deine normalen Nahkampfangriffe ignorieren 5 Rüstung', 'ignorieren 7 Rüstung', 'ignorieren 10 Rüstung']},
    {'name': 'Unbrennbar', 'rang': 3, 'wirkungen': ['Jede Runde verlierst du automatisch 1 Feuermarke']},
    {'name': 'Damage Dealer', 'rang': 4, 'wirkungen': [
        'Alle deine aktiven Fähigkeiten verursachen +1W10 Schaden', '+2W10 Schaden', '+3W10 Schaden']},
    {'name': 'Held', 'rang': 4, 'wirkungen': ['+1 Attacke pro Angriffsaktion (Aktion A)']},
    {'name': 'Ledrige Haut', 'rang': 4, 'wirkungen': [
        'Nachdem deine Blutungen abgehandelt wurden, schließt sich eine Wunde automatisch']},
    {'name': 'Tödliche Präsenz', 'rang': 4, 'wirkungen': [
        'Kritische Treffer verursachen +1W10 zusätzlichen Schaden; Krit-Chance +10%',
        '+2W10 zusätzlichen Schaden; Krit-Chance +15%',
        '+3W10 zusätzlichen Schaden; Krit-Chance +20%']},
]

# Die feste Basis-Talentliste je Kategorie (RW 4.3 S.8-11, "Talentgruppen &
# Talente"), von Hand aus dem PDF abgetippt statt aus der Rohdatei der Gruppe
# abgeleitet - die Rohdatei ist der Export EINES Charakterbogens und enthält
# dessen eigene Test-/Custom-Einträge (z.B. "Agilität" mit description "Test",
# das im Regelwerk als Basis-Talent gar nicht existiert - "Agilität" ist dort
# nur ein Talentbaum-Name, siehe HAUPTBAEUME). id = Slug des Namens, damit
# appData.skills_*[].paketTalent stabil bleibt (siehe hausregeln.js).
# 'tabelle' verweist auf einen Schlüssel in wuerfelTabellen (nur Kochen,
# Musizieren, Zechen haben laut RW 4.3 S.12f eine Sondertabelle - Medizin
# NICHT, das ist eine Wurf-Formel, keine Tabelle).
TALENTE = {
    'handeln': [
        {'id': 'athletik', 'name': 'Athletik',
         'beschreibung': 'Ausdauer, Rennen, Reflexe, Springen'},
        {'id': 'angel', 'name': 'Angel',
         'beschreibung': '1W4 Nahrungsrationen pro zwei Stunden (Angeln-Wurf)'},
        {'id': 'entern', 'name': 'Entern',
         'beschreibung': 'Treffer: Startposition auf dem feindlichen Deck frei wählen. '
                          'Kritischer Treffer: zusätzlicher Angriff vor Kampfbeginn.'},
        {'id': 'fernkampf', 'name': 'Fernkampf',
         'beschreibung': 'Bogen, Armbrust, Pistolen, Wurfwaffen, Werfen und Zielen'},
        {'id': 'handwerk', 'name': 'Handwerk',
         'beschreibung': 'Umgang mit Werkzeugen'},
        {'id': 'heimlich', 'name': 'Heimlich',
         'beschreibung': 'Schleichen, Stehlen, Verkleiden'},
        {'id': 'zaehigkeit', 'name': 'Zähigkeit',
         'beschreibung': 'Gift, Essen, Flüche widerstehen'},
        {'id': 'kochen', 'name': 'Kochen',
         'beschreibung': 'Kochprobe → anschließend Tabelle „Kochen"',
         'tabelle': 'table_kochen'},
        {'id': 'nahkampf', 'name': 'Nahkampf',
         'beschreibung': 'Faustkampf, Schwertkampf, Hieb- & Stichwaffen'},
        {'id': 'reiten', 'name': 'Reiten',
         'beschreibung': 'Sitz, Führung, Manöver'},
        {'id': 'schiffe-steuern', 'name': 'Schiffe steuern',
         'beschreibung': 'Ruder, Segel, Crewführung im Manöver'},
        {'id': 'schloesser-knacken', 'name': 'Schlösser knacken',
         'beschreibung': 'Dietriche, Mechaniken, Fingergefühl'},
        {'id': 'schwimmen', 'name': 'Schwimmen',
         'beschreibung': 'Schwimmen, Tauchen'},
        {'id': 'staerke', 'name': 'Stärke',
         'beschreibung': 'Kraft, Heben, Zerbrechen'},
        {'id': 'wahrnehmung', 'name': 'Wahrnehmung',
         'beschreibung': 'Sehen, Hören, Spüren von Gefahr'},
    ],
    'wissen': [
        {'id': 'chemie', 'name': 'Chemie',
         'beschreibung': 'Reaktionen, Pulver, Mischungen'},
        {'id': 'gassenwissen', 'name': 'Gassenwissen',
         'beschreibung': 'Gerüchte, dubiose Kontakte, Informationen'},
        {'id': 'heraldik', 'name': 'Heraldik',
         'beschreibung': 'Hofprotokolle & edle Häuser'},
        {'id': 'lesen-schreiben', 'name': 'Lesen/Schreiben',
         'beschreibung': 'Ab 20: Lesen & Schreiben (Grundfertigkeit). '
                          'Ab 30/60/90/95/99 zusätzlich Muttersprache +1/+2/+3/+4/+5.'},
        {'id': 'medizin', 'name': 'Medizin',
         'beschreibung': 'Schulmedizin, Behandlung, Operationen. Heilwurf: 1W10 + 1W10 '
                          'pro vollen 10 Punkten unter dem Medizinwert; krit. Erfolg ×2.'},
        {'id': 'naturkunde', 'name': 'Naturkunde',
         'beschreibung': 'Flora & Fauna (theoretisch)'},
        {'id': 'nautik', 'name': 'Nautik',
         'beschreibung': 'Karten lesen, Strecken berechnen, Position bestimmen'},
        {'id': 'ueberleben', 'name': 'Überleben',
         'beschreibung': 'Shelterbau, Nahrung, Feuer'},
        {'id': 'technik', 'name': 'Technik',
         'beschreibung': 'Maschinen & Apparate'},
        {'id': 'tiere-zaehmen', 'name': 'Tiere zähmen',
         'beschreibung': 'Beruhigen, Dressieren, Vertrauen'},
        {'id': 'voodoo', 'name': 'Voodoo',
         'beschreibung': 'Rituale & Zauber der alten Wege'},
    ],
    'soziales': [
        {'id': 'auftritt', 'name': 'Auftritt',
         'beschreibung': 'Präsenz, Haltung, Wirkung'},
        {'id': 'beruhigen', 'name': 'Beruhigen',
         'beschreibung': 'Eskalation verhindern, Ruhe finden'},
        {'id': 'verhandeln', 'name': 'Verhandeln',
         'beschreibung': 'Konflikte, Diplomatie'},
        {'id': 'einschuechtern', 'name': 'Einschüchtern',
         'beschreibung': 'Angst als Werkzeug. Bei Erfolg: Betroffene (10m Umkreis) '
                          'erhalten -1m Bewegung für 1W4 Runden.'},
        {'id': 'feilschen', 'name': 'Feilschen',
         'beschreibung': 'Beim (Ver-)Kauf das beste Angebot'},
        {'id': 'flirten', 'name': 'Flirten',
         'beschreibung': 'Charme & Verführung'},
        {'id': 'willenskraft', 'name': 'Willenskraft',
         'beschreibung': 'Standhaftigkeit & innere Stärke - Widerstand gegen '
                          'Einschüchtern, Überreden, Motivieren, Wesens-/Monster-'
                          'Instinkte und übernatürliche Anblicke.'},
        {'id': 'luegen', 'name': 'Lügen',
         'beschreibung': 'Täuschung & Ablenkung'},
        {'id': 'menschenkenntnis', 'name': 'Menschenkenntnis',
         'beschreibung': 'Motive erkennen, Einschätzen'},
        {'id': 'motivieren', 'name': 'Motivieren',
         'beschreibung': 'Feuer entfachen. Bei Erfolg: Verbündete (10m Umkreis) '
                          'erhalten Boni.'},
        {'id': 'musizieren', 'name': 'Musizieren',
         'beschreibung': 'Auftrittsprobe → anschließend Tabelle „Musizieren"',
         'tabelle': 'table_musizieren'},
        {'id': 'ueberreden', 'name': 'Überreden',
         'beschreibung': 'Zunge statt Klinge. Bei Erfolg: Du hältst jemanden von '
                          'einer Aktion ab oder lenkst sie um.'},
        {'id': 'zechen', 'name': 'Zechen',
         'beschreibung': 'Zechprobe → anschließend Tabelle „Zechen"',
         'tabelle': 'table_zechen'},
    ],
}


def art_normalisieren(roh):
    a = (roh or '').strip().lower()
    if a.startswith('pass'):
        return 'passiv'
    if a == 'extra':
        return 'extra'
    # 'Aktiv', 'heilung' und alles andere: aktive Fähigkeit
    return 'aktiv'


def schadentyp_normalisieren(roh):
    s = (roh or '').strip().lower()
    return s if s in ('physisch', 'magisch', 'heilung') else 'keiner'


def leer_zu_none(wert):
    if wert is None:
        return None
    if isinstance(wert, str):
        w = wert.strip()
        return None if w == '' or w.lower() == 'keiner' else w
    return wert


def konvertiere():
    roh = json.loads(QUELLE.read_text(encoding='utf-8'))
    ch = roh['charakter']
    sheet = ch.get('charakter_sheet', {})

    # --- Talente (feste Liste je Kategorie) --------------------------------
    # Kommt aus der TALENTE-Konstante oben (RW 4.3 S.8-11), NICHT aus
    # ch['talents'] - siehe Kommentar dort.
    talente = {kat: [dict(t) for t in eintraege] for kat, eintraege in TALENTE.items()}

    # --- Talentbaum ---------------------------------------------------------
    skills = []
    gesehen = set()
    for s in ch['Talentbaum']['skills']:
        name = (s.get('Name') or '').strip()
        ast = (s.get('Ast') or '').strip()
        ast = AST_SCHREIBWEISE_RW43.get(ast, ast)
        if not name or not ast:
            print(f'WARNUNG: Skill ohne Name/Ast übersprungen: {s!r:.80}', file=sys.stderr)
            continue
        # Skill-Namen kommen in mehreren Ästen vor (z.B. "Blutiger Zorn"); der
        # Schlüssel im Charakterbogen ist deshalb immer "Ast::Name".
        schluessel = f'{ast}::{name}'
        if schluessel in gesehen:
            print(f'WARNUNG: Doppelter Skill {schluessel!r} - zweites Vorkommen übersprungen', file=sys.stderr)
            continue
        gesehen.add(schluessel)

        stufen = []
        for lvl in s.get('skill_level', []):
            stufe = {
                'level': int(lvl.get('level') or (len(stufen) + 1)),
                'reichweite': leer_zu_none(lvl.get('reichweite')),
                'schaden': leer_zu_none(lvl.get('Schaden')),
                'schadenArt': leer_zu_none(lvl.get('Schaden_special')),
                'effekt': leer_zu_none(lvl.get('special')),
            }
            if lvl.get('value') is not None:
                stufe['wert'] = lvl['value']
            stufen.append({k: v for k, v in stufe.items() if v is not None})

        eintrag = {
            'name': name,
            'ast': ast,
            'art': art_normalisieren(s.get('Art')),
            'schadenTyp': schadentyp_normalisieren(s.get('schaden_typ')),
            'rang': int(s.get('rang') or 1),
            'info': (s.get('info') or '').strip(),
            'stufen': stufen,
        }
        if s.get('morph_form'):
            eintrag['morphForm'] = s['morph_form']
        skills.append(eintrag)

    aeste = sorted({s['ast'] for s in skills})
    wesen = list(ch.get('wesen_effekte', {}).keys())
    fehlende_haupt = [h for h in HAUPTBAEUME if h not in aeste]
    if fehlende_haupt:
        print(f'WARNUNG: Hauptbäume ohne Skills in den Daten: {fehlende_haupt}', file=sys.stderr)
    fehlende_wesen = [w for w in wesen if w not in aeste]
    if fehlende_wesen:
        print(f'WARNUNG: Wesen ohne eigenen Ast: {fehlende_wesen}', file=sys.stderr)
    weitere = [a for a in aeste if a not in HAUPTBAEUME and a not in wesen]

    # --- Wesen-Effekte --------------------------------------------------------
    wesen_effekte = {}
    for w, effekte in ch.get('wesen_effekte', {}).items():
        wesen_effekte[w] = [{
            'typ': 'buff' if (e.get('effekt_typ') or '').lower() == 'buff' else 'debuff',
            'ziel': e.get('ziel_attribut') or '',
            'wert': e.get('wert'),
            'beschreibung': (e.get('beschreibung') or '').strip(),
        } for e in effekte]

    # --- Würfeltabellen -------------------------------------------------------
    # Zwei Formen im Rohformat: Sondertabellen (success/no_success mit
    # 'ergebnis'/'text'/'buffs') und Orakel-Tabellen (Spalten mit 'wurf'/'begriff').
    tabellen = {}
    for tid, t in roh.get('roll_tables', {}).items():
        spalten = {}
        for spalte, zeilen in t.items():
            if spalte == 'dice' or not isinstance(zeilen, list):
                continue
            spalten[spalte] = [{
                'wurf': z.get('ergebnis', z.get('wurf')),
                'text': (z.get('text') or z.get('begriff') or '').strip(),
                **({'buffs': z['buffs']} if z.get('buffs') else {}),
            } for z in zeilen]
        art = 'probe' if ('success' in spalten and 'no_success' in spalten) else 'orakel'
        # 'table_kochen' -> 'Kochen', 'oracle_piraten_events' -> 'Orakel: Piraten Events'
        woerter = tid.replace('table_', '').replace('oracle_', '').split('_')
        name = ' '.join(w.capitalize() for w in woerter if w)
        tabellen[tid] = {
            'id': tid,
            'name': ('Orakel: ' + name) if tid.startswith('oracle_') else name,
            'wuerfel': t.get('dice') or '1W10',
            'art': art,
            'spalten': spalten,
        }

    punkte = dict(PUNKTE)

    paket = {
        'id': PAKET_ID,
        'name': PAKET_NAME,
        # Gemischte Herkunft: Talentbaum/Wesen kommen weiter aus der
        # Rohdatei der Gruppe (roh['meta']['lastSave']), Talente/Punkte
        # wurden gerade gegen RW 4.3 (Stand 2026-07-22) geprüft/korrigiert.
        'version': '2026-07-22 (RW 4.3, Talentbaum-Daten von %s)' % (roh.get('meta', {}).get('lastSave') or 'unbekannt'),
        'system': roh.get('meta', {}).get('system') or '',
        'beschreibung': (
            'Piraten-Hausregeln einer HTBAH-Runde: feste Talentliste, progressive '
            'Talentkosten, Rang- und Skillpunkte sowie ein Talentbaum mit drei '
            'Hauptbäumen und einem Wesen je Charakter.'
        ),
        'waehrung': 'Tchambas' if 'Tchambas' in sheet else None,
        'lebenspunkte': sheet.get('Lebenspunkte'),
        'talente': talente,
        'punkte': punkte,
        'talentbaum': {
            **TALENTBAUM_REGELN,
            'hauptbaeume': HAUPTBAEUME,
            'baumTalent': BAUM_TALENT,
            'wesen': wesen,
            'weitereAeste': weitere,
            'skills': skills,
            'eigenschaften': EIGENSCHAFTEN,
        },
        'wesenEffekte': wesen_effekte,
        'wuerfelTabellen': tabellen,
    }
    paket = {k: v for k, v in paket.items() if v is not None}

    kopf = (
        '// Regelpaket "%s" - GENERIERT aus quellen/eldora-arrrrr.roh.json\n'
        '// durch hausregeln/konvertiere-eldora.py. Nicht von Hand bearbeiten: Änderungen\n'
        '// in die Rohdatei bzw. ins Skript und neu generieren.\n'
        '//\n'
        '// Wird von hausregeln.js bei Bedarf nachgeladen (nicht in index.html eingebunden).\n'
        % PAKET_NAME
    )
    body = json.dumps(paket, ensure_ascii=False, indent=1, separators=(',', ': '))
    # Gegen versehentliches Schließen eines <script>-Blocks, falls das Paket
    # jemals inline landet.
    body = body.replace('</script', '<\\/script')
    ZIEL.write_text(kopf + 'hausregelPaketRegistrieren(' + body + ');\n', encoding='utf-8', newline='\n')

    print(f'OK: {ZIEL.name} geschrieben')
    print(f'  Talente: ' + ', '.join(f'{k} {len(v)}' for k, v in talente.items()))
    print(f'  Talentbaum: {len(skills)} Skills in {len(aeste)} Ästen '
          f'({len(HAUPTBAEUME)} Hauptbäume, {len(wesen)} Wesen, {len(weitere)} weitere Äste)')
    print(f'  Wesen-Effekte: {len(wesen_effekte)}, Würfeltabellen: {len(tabellen)}, '
          f'Besondere Eigenschaften: {len(EIGENSCHAFTEN)}')
    fehlende_mapping = [b for b in HAUPTBAEUME if b not in BAUM_TALENT]
    if fehlende_mapping:
        print(f'WARNUNG: Hauptbäume ohne Talent-Zuordnung: {fehlende_mapping}', file=sys.stderr)
    if weitere:
        print(f'  Weitere Äste (nicht wählbar): {", ".join(weitere)}')


if __name__ == '__main__':
    konvertiere()
