#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Konvertiert die Rohdaten aus quellen/*.json (Export aus dem Randy-Randelsen-
Projekt, siehe randomizer/quellen) in die drei Zufallsgenerator-Pakete des
Tools: original.js (setting-neutral), piraten.js, eldora.js.

Aufruf (aus dem Repo-Wurzelverzeichnis):

    python randomizer/konvertiere-randomizer.py

Jede Ausgabedatei ruft randomizerPaketRegistrieren({...}) auf und wird von
randomizer.js bei Bedarf nachgeladen (siehe DATA_FORMAT.md, Abschnitt
"Zufallsgenerator-Pakete"). Alle Tabellen werden auf eine einheitliche Form
gebracht: eine Liste von Einträgen mit `haupt` (Haupttext) und optional
`neben` (Zusatzinfo, klein angezeigt) - so muss randomizer.js beim Anzeigen
nicht wissen, aus welcher Rohform ein Eintrag kam.
"""

import json
import sys
from pathlib import Path

HIER = Path(__file__).resolve().parent
QUELLEN = HIER / 'quellen'


def liste(eintraege):
    """Rohliste (Strings oder Objekte) -> einheitliche {haupt, neben?}-Form."""
    out = []
    for e in eintraege:
        if isinstance(e, str):
            out.append({'haupt': e})
        elif isinstance(e, dict):
            if 'name' in e and 'beschreibung' in e:
                out.append({'haupt': e['name'], 'neben': e['beschreibung']})
            elif 'name' in e and 'kategorie' in e:
                out.append({'haupt': e['name'], 'neben': e['kategorie']})
            elif 'text' in e:
                out.append({'haupt': e['text'], 'neben': e.get('ton')})
            else:
                raise ValueError(f'Unbekannte Eintragsform: {e!r}')
        else:
            raise ValueError(f'Unbekannter Eintragstyp: {e!r}')
    return out


def trefforte_flach(eintraege):
    """{ort, rollen:[...]} -> ein Eintrag je (Ort, Rolle)-Kombination."""
    out = []
    for e in eintraege:
        for rolle in e.get('rollen', []):
            out.append({'haupt': rolle, 'neben': e['ort']})
    return out


def tabelle(name, kategorie, eintraege, attribution=None):
    t = {'name': name, 'kategorie': kategorie, 'eintraege': eintraege}
    if attribution:
        t['attribution'] = attribution
    return t


def schreibe(datei_id, name, beschreibung, tabellen, generatoren=None):
    paket = {'id': datei_id, 'name': name, 'beschreibung': beschreibung, 'tabellen': tabellen}
    if generatoren:
        paket['generatoren'] = generatoren
    ziel = HIER / f'{datei_id}.js'
    kopf = (
        f'// Zufallsgenerator-Paket "{name}" - GENERIERT durch\n'
        f'// randomizer/konvertiere-randomizer.py aus randomizer/quellen/*.json.\n'
        f'// Nicht von Hand bearbeiten: Änderungen in die Rohdateien bzw. ins Skript\n'
        f'// und neu generieren.\n'
        f'//\n'
        f'// Wird von randomizer.js bei Bedarf nachgeladen (nicht in index.html eingebunden).\n'
    )
    body = json.dumps(paket, ensure_ascii=False, indent=1, separators=(',', ': '))
    body = body.replace('</script', '<\\/script')
    ziel.write_text(kopf + 'randomizerPaketRegistrieren(' + body + ');\n', encoding='utf-8', newline='\n')
    print(f'OK: {ziel.name} - {sum(len(t["eintraege"]) for t in tabellen.values())} Einträge in {len(tabellen)} Tabellen'
          + (f', {len(generatoren)} Generatoren' if generatoren else ''))


# --- Wesen-Liste & Besondere Eigenschaften (Eldara) --------------------------
# Beides existiert nirgends in den randy_randelsen-Rohdaten - Single Source of
# Truth ist die von hausregeln/konvertiere-eldora.py generierte
# hausregeln/eldora-arrrrr.js (dort `talentbaum.wesen` / `talentbaum.
# eigenschaften`, dort auch aus dem Regelwerk transkribiert). Wird hier nur
# ausgelesen, nicht dupliziert - randomizer.js selbst bleibt trotzdem
# unabhängig von einem aktiven Regelpaket, weil das Ergebnis fest ins
# generierte eldora.js-Paket geschrieben wird.
ELDORA_PAKET_DATEI = HIER.parent / 'hausregeln' / 'eldora-arrrrr.js'


def lade_eldora_regelpaket():
    text = ELDORA_PAKET_DATEI.read_text(encoding='utf-8')
    start = text.index('hausregelPaketRegistrieren(') + len('hausregelPaketRegistrieren(')
    ende = text.rindex(');')
    return json.loads(text[start:ende])


def bauen():
    original = json.loads((QUELLEN / 'original_de.json').read_text(encoding='utf-8'))
    npc = json.loads((QUELLEN / 'npc_eigenschaften_de.json').read_text(encoding='utf-8'))
    trinkets = json.loads((QUELLEN / 'trinkets_srd_en.json').read_text(encoding='utf-8'))
    piraten = json.loads((QUELLEN / 'settings_piraten_de.json').read_text(encoding='utf-8'))
    eldora = json.loads((QUELLEN / 'eldora_de.json').read_text(encoding='utf-8'))

    # --- Original (setting-neutral) ------------------------------------------
    trink_attr = (f"{trinkets['source']['title']} – {trinkets['source']['publisher']}, "
                  f"lizenziert unter {trinkets['source']['license']} ({trinkets['source']['license_url']})")
    original_tabellen = {
        'namen_maennlich': tabelle('Vornamen (männlich)', 'namen', liste(original['vornamen_maennlich'])),
        'namen_weiblich': tabelle('Vornamen (weiblich)', 'namen', liste(original['vornamen_weiblich'])),
        'nachnamen': tabelle('Nachnamen', 'namen', liste(original['nachnamen'])),
        'items_zauberkammer': tabelle('Gegenstände: Zauberkammer', 'orte_items', liste(original['items_zauberkammer'])),
        'items_banditenlager': tabelle('Gegenstände: Banditenlager', 'orte_items', liste(original['items_banditenlager'])),
        'items_toter_abenteurer': tabelle('Gegenstände: toter Abenteurer', 'orte_items', liste(original['items_toter_abenteurer'])),
        'encounter_wald': tabelle('Begegnung: Wald', 'begegnungen', liste(original['encounter_wald'])),
        'encounter_sumpf': tabelle('Begegnung: Sumpf', 'begegnungen', liste(original['encounter_sumpf'])),
        'geruechte_nebenjobs': tabelle('Gerücht / Nebenjob', 'geruechte', liste(original['geruechte_nebenjobs'])),
        'npc_auffaelligkeiten': tabelle('NSC: Auffälligkeit', 'npc', liste(npc['npc_auffaelligkeiten'])),
        'npc_motivationen': tabelle('NSC: Motivation', 'npc', liste(npc['npc_motivationen'])),
        'npc_haltungen': tabelle('NSC: Haltung', 'npc', liste(npc['npc_haltungen'])),
        'npc_trefforte': tabelle('Wer ist hier?', 'npc', trefforte_flach(npc['npc_trefforte'])),
        'trinkets': tabelle('Kleinkram (Trinket)', 'items', liste(trinkets['table']), attribution=trink_attr),
    }
    schreibe('original', 'Allgemein', 'Setting-neutrale Namen, Orte, Gegenstände, NSC-Bausteine und Begegnungen.',
             original_tabellen, generatoren=['name', 'nsc'])

    # --- Piraten (generisches Piraten-Flair, kein Eldara-Kanon) ---------------
    piraten_tabellen = {
        'vornamen_maennlich': tabelle('Vornamen (männlich)', 'namen', liste(piraten['piraten_vornamen_maennlich'])),
        'vornamen_weiblich': tabelle('Vornamen (weiblich)', 'namen', liste(piraten['piraten_vornamen_weiblich'])),
        'nachnamen': tabelle('Nachnamen', 'namen', liste(piraten['piraten_nachnamen'])),
        'beinamen': tabelle('Beinamen', 'namen', liste(piraten['piraten_beinamen'])),
        'schiffsnamen': tabelle('Schiffsnamen', 'sonstiges', liste(piraten['schiffsnamen'])),
    }
    crew = piraten['crew_erdig']
    piraten_wortlisten = {
        'vornamen_erdig_maennlich': crew['vornamen_erdig_maennlich'],
        'vornamen_erdig_weiblich': crew['vornamen_erdig_weiblich'],
        'beinamen_adjektiv': crew['beinamen_adjektiv'],
        'beinamen_praefix': crew['beinamen_praefix'],
    }
    paket = {'id': 'piraten', 'name': 'Piraten (allgemein)',
             'beschreibung': 'Generisches Piraten-Flair ohne Eldara-Kanon: Namen, Beinamen, Schiffe, einfache Crew.',
             'tabellen': piraten_tabellen, 'wortlisten': piraten_wortlisten, 'generatoren': ['piratenname', 'crewErdig']}
    (HIER / 'piraten.js').write_text(
        '// Zufallsgenerator-Paket "Piraten (allgemein)" - GENERIERT durch\n'
        '// randomizer/konvertiere-randomizer.py aus randomizer/quellen/*.json.\n'
        '// Nicht von Hand bearbeiten: Änderungen in die Rohdateien bzw. ins Skript\n'
        '// und neu generieren.\n'
        'randomizerPaketRegistrieren(' + json.dumps(paket, ensure_ascii=False, indent=1).replace('</script', '<\\/script') + ');\n',
        encoding='utf-8', newline='\n')
    print(f'OK: piraten.js - {sum(len(t["eintraege"]) for t in piraten_tabellen.values())} Einträge in '
          f'{len(piraten_tabellen)} Tabellen, {sum(len(v) for v in piraten_wortlisten.values())} Wörter für Crew-Generator')

    # --- Eldara (kanonisch, an das Regelpaket eldora-arrrrr gekoppelt) --------
    eldora_regelpaket = lade_eldora_regelpaket()
    eldora_talentbaum = eldora_regelpaket.get('talentbaum', {})
    eldora_tabellen = {
        'orte': tabelle('Insel / Ort', 'orte_items', liste(eldora['orte'])),
        'gegenstaende_magisch': tabelle('Magischer Gegenstand', 'items', liste(eldora['gegenstaende_magisch'])),
        'waffen_shop': tabelle('Waffe (Preisliste)', 'waffen', liste(eldora['waffen_shop'])),
        'herstellbare_gegenstaende': tabelle('Herstellbarer Gegenstand', 'items', liste(eldora['herstellbare_gegenstaende'])),
    }
    eldora_wortlisten = {
        'vornamen_maennlich': eldora['npc_vornamen_maennlich'],
        'vornamen_weiblich': eldora['npc_vornamen_weiblich'],
        'nachnamen': eldora['npc_nachnamen'],
    }
    paket = {'id': 'eldora', 'name': 'Eldara (kanonisch)',
             'beschreibung': 'Orte, magische Gegenstände und NSC-Namen aus dem Eldara-Regelwerk. Passt zum Regelpaket "eldora-arrrrr".',
             'tabellen': eldora_tabellen, 'wortlisten': eldora_wortlisten,
             # Aus hausregeln/eldora-arrrrr.js ausgelesen, nicht dupliziert (s.o.)
             'wesen': eldora_talentbaum.get('wesen', []),
             'eigenschaften': eldora_talentbaum.get('eigenschaften', []),
             'generatoren': ['name', 'nsc', 'magischerGegenstand']}
    (HIER / 'eldora.js').write_text(
        '// Zufallsgenerator-Paket "Eldara (kanonisch)" - GENERIERT durch\n'
        '// randomizer/konvertiere-randomizer.py aus randomizer/quellen/eldora_de.json\n'
        '// plus wesen/eigenschaften ausgelesen aus hausregeln/eldora-arrrrr.js.\n'
        '// Nicht von Hand bearbeiten: Änderungen in die Rohdateien bzw. ins Skript\n'
        '// und neu generieren.\n'
        'randomizerPaketRegistrieren(' + json.dumps(paket, ensure_ascii=False, indent=1).replace('</script', '<\\/script') + ');\n',
        encoding='utf-8', newline='\n')
    print(f'OK: eldora.js - {sum(len(t["eintraege"]) for t in eldora_tabellen.values())} Einträge, '
          f'{len(paket["wesen"])} Wesen, {len(paket["eigenschaften"])} Eigenschaften (aus eldora-arrrrr.js)')


if __name__ == '__main__':
    bauen()
