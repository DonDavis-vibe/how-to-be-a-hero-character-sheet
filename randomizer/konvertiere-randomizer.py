#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Konvertiert die Rohdaten aus quellen/*.json (Export aus dem Randy-Randelsen-
Projekt, siehe randomizer/quellen) in das eingebaute Zufallsgenerator-Paket
des Tools: original.js (setting-neutral).

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


def bauen():
    original = json.loads((QUELLEN / 'original_de.json').read_text(encoding='utf-8'))
    npc = json.loads((QUELLEN / 'npc_eigenschaften_de.json').read_text(encoding='utf-8'))
    trinkets = json.loads((QUELLEN / 'trinkets_srd_en.json').read_text(encoding='utf-8'))

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


if __name__ == '__main__':
    bauen()
