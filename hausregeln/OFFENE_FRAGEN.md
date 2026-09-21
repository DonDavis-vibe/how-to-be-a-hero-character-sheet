# Offene Fragen zum Eldara-Talentbaum

Für das Gespräch mit dem Spielleiter der Eldara-Runde. Der Talentbaum-Rebuild
(`talentbaum.js`, `hausregeln/eldora-arrrrr.js`) ist bereits mit den unten
dokumentierten *Annahmen* fertig gebaut und im Tool nutzbar — die Antworten
hier ändern höchstens Details, keine Grundarchitektur. Fundstellen sind jetzt
Seitenzahlen in RW 4.3 (`hausregeln/quellen/rw43.txt`, Stand 2026-07-22) -
ursprünglich stammten die Fragen aus RW 4.1 (`rw41.txt`), sind aber seit dem
Update unten alle nachgeprüft.

**Update RW 4.3 (2026-07-22):** Alle neun Fragen wurden gegen das neue
Regelwerk durchgeprüft. Erledigt: Frage 5 (Punktebudget, durch den PDF-Text
selbst), Frage 9 (Rüstungsstufen-Mali, durch den PDF-Text selbst - jetzt als
saubere Tabelle) und Frage 2 (Skillpunkte pro Rang, durch direkte Bestätigung
des SL). Die restlichen sechs Fragen (1, 3, 4, 6, 7, 8) stehen im PDF-Text
selbst **wortgleich oder sinngleich zu RW 4.1** - das neue Regelwerk klärt sie
nicht von sich aus, bleiben also offen bis der SL sie beantwortet.

Dabei sind nebenbei drei Bugs in der alten (aus einem Beispiel-Charakterbogen
übernommenen) Talentliste aufgefallen und stillschweigend behoben, keine
Ansichtssache, deshalb hier nur zur Info statt als Frage:
- „Agilität" stand als Basis-Talent auf dem Bogen (mit Beschreibung „Test")
  - existiert im Regelwerk gar nicht als Talent, nur als Talentbaum-Name
  (siehe Frage 1). Entfernt.
- „Medizin" verwies auf eine nicht existierende Würfeltabelle
  (`table_medizin`) - laut RW 4.3 S.12 gibt es nur Tabellen für Kochen,
  Musizieren und Zechen. Verweis entfernt.
- „Musizieren" und „Zechen" verwiesen auf falsch geschriebene Tabellen-IDs
  (`table_musician`, `table_saufen`) statt der tatsächlichen
  (`table_musizieren`, `table_zechen`) - der Würfeln-Knopf am Talent ist
  dadurch bisher nie aufgetaucht. Korrigiert.

Sortiert nach Wichtigkeit (die erste Frage betrifft am meisten).

---

## 1. Welcher Bogen-Talentwert treibt welchen Hauptbaum? (wichtigste Frage)

Das Regelwerk sagt: „Um Ränge freizuschalten … muss dein Attribut-Grundwert
dem entsprechenden Rang haben" (RW 4.3 S.17), nennt aber **nirgends
explizit**, welcher Talentwert das für die elf Hauptbäume (Nahkampf Klingen,
Nahkampf Fäuste, Stärke, Fernkampf, Agilität, Voodoo Ritualklinge, Voodoo
Fluchspucker, Einschüchtern, Heimlich, Medizin, Motivieren - Schreibweise
S.14) konkret ist. Die Basis-Talentliste (RW 4.3 S.8-11: Athletik, Entern,
Fernkampf, Handwerk, Heimlich, Zähigkeit, Kochen, **Nahkampf**, Reiten,
Schiffe steuern, Stärke, Wahrnehmung, **Voodoo** …) enthält **kein**
„Nahkampf Klingen" oder „Voodoo Ritualklinge" - nur die generischen Talente
„Nahkampf" und „Voodoo".

**Meine Annahme im Code** (`hausregeln/konvertiere-eldora.py`, Konstante
`BAUM_TALENT`): Die beiden Nahkampf-Bäume teilen sich das Talent „Nahkampf",
die beiden Voodoo-Bäume teilen sich „Voodoo", die übrigen sieben sind 1:1
(Stärke→Stärke, Fernkampf→Fernkampf, Agilität→Agilität, Einschüchtern→
Einschüchtern, Heimlich→Heimlich, Medizin→Medizin, Motivieren→Motivieren).

**Frage an den SL:** Stimmt das? Falls nicht - gibt es eine eigene,
separate Punkteverteilung nur für die elf Baum-Werte, unabhängig von den
39 Basis-Talenten auf dem Bogen?

**Neu seit RW 4.3 - Namens-Stolperstein:** Der exportierte Talentbaum der
Gruppe (`quellen/eldora-arrrrr.roh.json`, 562 Skills) benennt zwei Äste noch
„Heimlichkeit" und „Voodoo Ritual Klinge" (mit Leerzeichen). RW 4.3 S.14
schreibt diese Äste jetzt „Heimlich" und „Voodoo Ritualklinge". Das Tool
zeigt weiterhin die alten Ast-Namen aus der Rohdatei (`HAUPTBAEUME` in
`konvertiere-eldora.py`) - sonst würden diese beiden Äste ihre Skills
verlieren, weil `Ast` in der Rohdatei nicht mitgeändert wurde.

**Frage an den SL:** Ist das nur eine Schreibweisen-Auffrischung im PDF, oder
sollen die beiden Äste in eurem eigenen Tool/Export tatsächlich umbenannt
werden? Falls letzteres: sag Bescheid, dann benenne ich `Ast` in einer neuen
Rohdaten-Lieferung passend um (oder lege eine Alias-Tabelle an).

---

## 2. "2 Skillpunkte auf dem Rang darunter verteilt" - wie genau gezählt? — ERLEDIGT (SL bestätigt)

RW 4.1 und RW 4.3 (S.17) sagen wortgleich: „muss dein Attribut-Grundwert dem
entsprechenden Rang haben, und du musst mindestens 2 Skillpunkte auf dem Rang
darunter verteilt haben." Der PDF-Text selbst klärt die genaue Zählweise
nicht - das kam jetzt direkt vom SL: **„Du musst pro Rang 2 Skillpunkte
ausgeben."**

**Umgesetzt (unverändert, schon vorher richtig):** Skillpunkte = nur die
Punkte, die für ein *zweites oder drittes* Level eines Skills ausgegeben
wurden (das *erste* Level kostet ja einen Rangpunkt, keinen Skillpunkt). Für
Rang 2 in einem Baum braucht es also insgesamt mindestens 2 solcher
Zweit-/Drittlevel-Käufe unter den Rang-1-Skills desselben Baums - egal ob auf
einen Skill verteilt (Lvl 1→3) oder auf zwei (je Lvl 1→2). Das entspricht
genau der SL-Antwort, `talentbaum.js` (`freischaltung: {modus: 'vorRang',
benoetigt: 2}`) bleibt wie es ist.

---

## 3. Eigenschaften: zählt Wesen als "Talentbaum" bei der Freischaltung?

*Gegen RW 4.3 (S.18) geprüft: Text unverändert zu RW 4.1, Frage bleibt offen.*

RW 4.3 S.18: Eine Eigenschaft von Rang R braucht „mindestens zwei
Talentbäumen den gleichen Rang erreicht". Beim Rangpunkte-Absatz eine Zeile
vorher steht explizit „einer der **drei** Talentbäume" (Wesen ausdrücklich
ausgenommen) - hier bei den Eigenschaften fehlt das Wort "drei".

**Meine Annahme:** Hier zählt der Wesen-Ast mit (bis zu vier Bäume insgesamt
für diese Prüfung), weil das Wort "drei" hier bewusst weggelassen wurde.

**Frage an den SL:** Korrekt, oder soll auch hier nur unter den drei
Hauptbäumen gezählt werden?

---

## 4. Eigenschaften mit mehreren Werten (z.B. "10/15/20 %") - wie oft wählbar?

*Gegen RW 4.3 (S.18f, "Besondere Eigenschaften") geprüft: dort jetzt als
ordentliche Tabelle statt Fließtext, aber inhaltlich unverändert - immer noch
Schrägstrich-Werte in einer Zelle, keine "St1/St2/St3"-Notation. Frage bleibt
offen.*

Die Eigenschaften-Tabelle zeigt viele Einträge mit Schrägstrich-Werten wie
"Fluchtreflex: 10/15/20 %" oder "Langes Leben: +20/40/60/80/100 HP" - keine
"St1/St2/St3"-Notation wie bei den Skills.

**Meine Annahme:** Jede Zahl ist ein eigener Pick derselben Eigenschaft
(z.B. "Langes Leben" fünfmal wählbar, jedes Mal +1 Rangpunkt, nächste Zahl in
der Reihe). Bei Eigenschaften mit nur einem Wert (z.B. "Krieger": „+1 Attacke
pro Angriffsaktion") ist entsprechend nur ein Pick möglich.

**Frage an den SL:** Stimmt das, oder ist z.B. bei "Langes Leben" gemeint,
dass man sich beim Wählen einmalig auf einen der fünf Werte festlegt (nicht
nacheinander alle durchläuft)?

---

## 5. Budget: 400 oder 500 Talentpunkte? — ERLEDIGT (RW 4.3)

Regelwerk RW 4.1 (Zeile ~248) und jetzt RW 4.3 (S.6 **und** S.8, zwei
unabhängige Stellen): „Verteilt 400 Punkte auf die Talente der drei
Gruppen." Die von der Gruppe gelieferten Beispiel-Charakterdaten
(`eldora-arrrrr.roh.json`) hatten `max_talent_points: 500` - das war
offenbar nur der Stand eines einzelnen Beispiel-Charakters, nicht die Regel.

**Umgesetzt:** Das Tool nutzt jetzt fest **400** (`PUNKTE.maxTalentpunkte`
in `konvertiere-eldora.py`), unabhängig davon, was in der Rohdatei steht.
Falls die Runde tatsächlich mit 500 spielt, bitte Bescheid geben.

---

## 6. Monsterpunkte: feste Menge pro Vergabe, Obergrenze, Rückgang?

*Gegen RW 4.3 (S.17) geprüft: Text unverändert zu RW 4.1, Frage bleibt offen.*

RW 4.3 S.17: „Stattdessen vergibt der Spielleiter Monsterpunkte, wenn der
Charakter seine dunkle Natur erforscht, ein uraltes Ritual überlebt oder
einen gewaltigen Gegner bezwingt." Keine Angabe, wie viele Punkte pro
Ereignis, ob sie je wieder sinken, oder ob es eine Obergrenze unter 99 gibt.

**Meine Umsetzung:** Der SL kann im Eingriff-Dialog eine beliebige Zahl
(positiv oder negativ) eingeben, gedeckelt auf 0-99 (wie ein normaler
Talentwert).

**Frage an den SL:** Passt das so, oder sollen Monsterpunkte in festen
Schritten (z.B. immer +1) vergeben werden?

---

## 7. Kreuz-Leveln: Summe oder Maximum?

*Gegen RW 4.3 (S.17) geprüft: Text unverändert zu RW 4.1 (nahezu wortgleiches
Beispiel), Frage bleibt offen.*

RW 4.3 S.17: „Habt ihr einen Skill doppelt, könnt ihr ihn auch kreuz leveln.
(z.B. Habt ihr Nahkampf und Stärke, könnt ihr auch Spott auf LvL2 bekommen,
indem ihr den Skill in den beiden Talentbäumen jeweils einmal levelt.)"

**Meine Umsetzung:** Effektives Level = Summe der Käufe in allen Ästen, in
denen der Skill gelernt wurde (im Beispiel: 1 + 1 = effektiv Level 2) -
gedeckelt auf das Maximum des Skills (meist 3).

**Frage an den SL:** Das Beispiel legt Summe nahe und passt zu meiner
Umsetzung - nur zur Bestätigung, falls es doch anders gemeint war.

---

## 8. NSC-/Monster-Talentbäume für Spieler (Ausnahmefall)?

*Gegen RW 4.3 (S.14f, "Nicht-Spieler-Spezialisierungen") geprüft: Text
unverändert zu RW 4.1, Frage bleibt offen.*

RW 4.3 S.15: „Wollt ihr einen Talentbaum aus diesem Bereich [Werwolf, Vampir,
Zombie, …], kontaktiert bitte den Spielleiter." Das klingt, als könnte ein
Spieler in Ausnahmefällen doch Zugriff auf einen der 19 NSC/Monster-Bäume
bekommen (mit SL-Erlaubnis) statt sie kategorisch auszuschließen.

**Aktuell:** Diese 19 Äste sind im Tool nicht wählbar (nur die 11 normalen
Hauptbäume + 11 Wesen stehen in den Dropdowns).

**Frage an den SL:** Kommt das in der Praxis vor? Falls ja, sag Bescheid -
das ließe sich als seltene SL-Sonderfreigabe nachrüsten (ähnlich den
Monsterpunkten), ist aber aktuell nicht gebaut.

---

## 9. Rüstungsstufen-Mali (Bewegung/Handeln/Heimlichkeit) — ERLEDIGT (RW 4.3, Tabellen-Extraktion war das Problem, nicht das Regelwerk)

Die alte RW-4.1-Extraktion (`rw41.txt`) hatte die Tabelle durch PDF→Text
zerrissen und eine Zeile war nicht sicher zuzuordnen - siehe Zitat unten.
RW 4.3 (S.27) lässt sich dagegen sauber und eindeutig lesen:

```
Status         Rüstungswert   Bewegung   Handeln   Heimlichkeit
Ungepanzert    0              –          –         –
Leicht         1–10           -1m        –         -10
Mittel         11–20          -1m        -5        -15
Schwer         21+            -2m        -7        -20
```

(gilt laut RW 4.3 nur für **getragene** Rüstung, Art 3 - nicht für
Schiffspanzerung.)

**Noch nicht umgesetzt:** Das Tool bildet aktuell nur den Rucksack-Platz-Malus
ab (-1 Mittel/-2 Schwer, separates Inventar-Kapitel S.25f.) - diese Bewegungs-
/Handeln-/Heimlichkeit-Mali fehlen noch, weil Bewegung und Heimlichkeit im
Tool aktuell gar keine eigenen Bogen-Werte sind (Heimlich ist nur ein Talent
unter Handeln, kein separater Meter-Wert wie beim Rüstungsmalus nötig).

**Frage/Ansage an den SL:** Die Werte sind jetzt klar - sag Bescheid, ob ihr
diese Mali am Tisch tatsächlich nutzt, dann bauen wir sie nach (braucht
vermutlich einen neuen Bogen-Wert "Bewegung" plus einen Abzug auf Heimlich je
nach angelegter Rüstung).

<details>
<summary>Alte RW-4.1-Extraktion, nur zur Historie</summary>

```
Status         Rüstungswert  Bewegung  Handeln  Heimlichkeit
Ungepanzert    0             -1m       –        -10
                              -1m       -5       -15
Leicht         1–10          -2m       -7       -20
Mittel         11–20
Schwer         21+
```
</details>

---

*Nach der Klärung: Antworten in dieses Dokument eintragen oder mir schicken,
dann ziehe ich `hausregeln/konvertiere-eldora.py` und `talentbaum.js`
entsprechend nach.*
