#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Konvertiert die Rohdaten der Eldara-Runde (quellen/eldora-arrrrr.roh.json, das
Export-Format ihres eigenen Prototyps) in das Regelpaket-Format des Tools
(siehe DATA_FORMAT.md, Abschnitt "Regelpakete / Hausregeln").

Aufruf (aus dem Repo-Wurzelverzeichnis):

    python hausregeln/konvertiere-eldora.py

Schreibt hausregeln/eldora-arrrrr.js. Die Rohdatei bleibt unverändert - wenn die
Gruppe eine neue Fassung schickt, einfach ersetzen und das Skript erneut laufen
lassen. Alles, was im Rohformat uneinheitlich ist (Groß-/Kleinschreibung von
"Art", leere Felder, Tippfehler in Schlüsseln), wird hier geglättet, damit das
JavaScript im Tool nie raten muss.
"""

import json
import re
import sys
from pathlib import Path

HIER = Path(__file__).resolve().parent
QUELLE = HIER / 'quellen' / 'eldora-arrrrr.roh.json'
ZIEL = HIER / 'eldora-arrrrr.js'

PAKET_ID = 'eldora-arrrrr'
PAKET_NAME = 'Eldara – Version Arrrrr'

# Welche Äste des Talentbaums Spieler als Hauptbaum wählen dürfen. Entspricht
# AVAILABLE_HAUPTBAEUME aus dem Prototyp der Gruppe, aber mit den exakten
# Ast-Namen aus den Daten (der Prototyp hat unscharf per "includes" gesucht).
HAUPTBAEUME = [
    'Nahkampf Klingen', 'Nahkampf Fäuste', 'Stärke', 'Fernkampf', 'Agilität',
    'Voodoo Ritual Klinge', 'Voodoo Fluchspucker', 'Einschüchtern',
    'Heimlichkeit', 'Medizin', 'Motivieren',
]

# Die Rangpunkt-/Skillpunkt-Regeln, jetzt gegen das vollständige Regelwerk
# (RW 4.1, S.17-19 - siehe hausregeln/quellen/rw41.txt Zeile ~640-830) geprüft
# statt gegen den ersten Prototyp der Gruppe. Bewusst als Daten im Paket, nicht
# als Code im Tool - so kann die Gruppe nachjustieren, ohne dass jemand JS
# anfasst. Ein offener Fragenkatalog für die Runde liegt in
# hausregeln/OFFENE_FRAGEN.md - die dort genannten Punkte sind noch NICHT vom
# Regelwerk-Text zweifelsfrei geklärt, sondern meine dokumentierte Lesart.
PUNKTE = {
    # Obergrenze der Talentpunkte. RW 4.1 S.6: "Jede Spielerfigur startet mit
    # 400 Fähigkeitspunkten" - die Rohdaten der Gruppe sagen 500 (siehe
    # OFFENE_FRAGEN.md). Bis geklärt: was im Charakterbogen der Gruppe steht.
    'maxTalentpunkte': None,  # wird aus den Rohdaten gefüllt
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
# welcher Bogen-Talentwert den Rang/die Skillpunkte je Hauptbaum treibt. Die
# Talentbaum-Namen (S.14) sind NICHT identisch mit den Basis-Talenten (S.6ff) -
# "Nahkampf Klingen" und "Nahkampf Fäuste" gibt es als Talent nur einmal
# ("Nahkampf"), ebenso "Voodoo Ritual Klinge"/"Voodoo Fluchspucker" ("Vodoo").
# Die übrigen sechs sind 1:1-Treffer (Name auf dem Bogen == Ast-Name, bis auf
# Schreibweise). Namen exakt wie appData.skills_*[].name auf dem Bogen.
BAUM_TALENT = {
    'Nahkampf Klingen': 'Nahkampf',
    'Nahkampf Fäuste': 'Nahkampf',
    'Stärke': 'Stärke',
    'Fernkampf': 'Fernkampf',
    'Agilität': 'Agilität',
    'Voodoo Ritual Klinge': 'Vodoo',
    'Voodoo Fluchspucker': 'Vodoo',
    'Einschüchtern': 'Einschüchtern',
    'Heimlichkeit': 'Heimlichkeit',
    'Medizin': 'Medizin',
    'Motivieren': 'Motivieren',
}

TALENTBAUM_REGELN = {
    'anzahlHauptbaeume': 3,
    'anzahlWesen': 1,
    'maxLevel': 3,
    # Kosten im Baum: erstes Level eines Skills = 1 Rangpunkt (aus dem
    # GEMEINSAMEN Rangpunkte-Topf alle Bäume), jedes weitere Level = 1
    # Skillpunkt AUS DEM SP-TOPF DIESES ASTS (RW 4.1 S.17f).
    'kosten': {'erstesLevel': 'rangpunkt', 'weiteresLevel': 'skillpunkt'},
    # Höheren Rang freischalten: mind. `benoetigt` Skillpunkte DIESES Asts auf
    # Skills des Rangs darunter ausgegeben (RW 4.1 S.17, wörtlich "mindestens 2
    # Skillpunkte auf dem Rang darunter verteilt"). 'imAst'/'frei' bleiben als
    # Alternativen für andere Pakete nutzbar, falls eine Runde etwas anderes
    # will - für Eldara gilt 'vorRang'.
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


def slug(text):
    t = text.lower()
    for a, b in (('ä', 'ae'), ('ö', 'oe'), ('ü', 'ue'), ('ß', 'ss')):
        t = t.replace(a, b)
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t


def konvertiere():
    roh = json.loads(QUELLE.read_text(encoding='utf-8'))
    ch = roh['charakter']
    sheet = ch.get('charakter_sheet', {})

    # --- Talente (feste Liste je Kategorie) --------------------------------
    talente = {'handeln': [], 'wissen': [], 'soziales': []}
    for schluessel, t in ch['talents'].items():
        kat = (t.get('category') or '').lower()
        if kat not in talente:
            print(f'WARNUNG: Talent {schluessel!r} hat unbekannte Kategorie {kat!r} - übersprungen', file=sys.stderr)
            continue
        eintrag = {
            'id': slug(t.get('name') or schluessel),
            'name': (t.get('name') or schluessel).strip(),
            'beschreibung': (t.get('description') or '').strip(),
        }
        if t.get('specialTableID'):
            eintrag['tabelle'] = t['specialTableID']
        talente[kat].append(eintrag)

    # --- Talentbaum ---------------------------------------------------------
    skills = []
    gesehen = set()
    for s in ch['Talentbaum']['skills']:
        name = (s.get('Name') or '').strip()
        ast = (s.get('Ast') or '').strip()
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
    punkte['maxTalentpunkte'] = int(sheet.get('max_talent_points') or 400)

    paket = {
        'id': PAKET_ID,
        'name': PAKET_NAME,
        'version': roh.get('meta', {}).get('lastSave') or 'unbekannt',
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
