# Offene Fragen zum Eldara-Talentbaum

Für das Gespräch mit dem Spielleiter der Eldara-Runde. Der Talentbaum-Rebuild
(`talentbaum.js`, `hausregeln/eldora-arrrrr.js`) ist bereits mit den unten
dokumentierten *Annahmen* fertig gebaut und im Tool nutzbar — die Antworten
hier ändern höchstens Details, keine Grundarchitektur. Fundstellen beziehen
sich auf `hausregeln/quellen/rw41.txt` (Volltext des Regelwerks RW 4.1).

Sortiert nach Wichtigkeit (die erste Frage betrifft am meisten).

---

## 1. Welcher Bogen-Talentwert treibt welchen Hauptbaum? (wichtigste Frage)

Das Regelwerk sagt: „Um Ränge freizuschalten … muss dein Attribut-Grundwert
dem entsprechenden Rang haben" (Zeile ~735), nennt aber **nirgends explizit**,
welcher Talentwert das für die elf Hauptbäume (Nahkampf Klingen, Nahkampf
Fäuste, Stärke, Fernkampf, Agilität, Voodoo Ritualklinge, Voodoo Fluchspucker,
Einschüchtern, Heimlichkeit, Medizin, Motivieren) konkret ist. Die Basis-
Talentliste (Zeile ~277ff: Athletik, Entern, Fernkampf, Handwerk, Heimlich,
Zähigkeit, Kochen, **Nahkampf**, Reiten, Schiffe steuern, Stärke, Wahrnehmung,
**Vodoo** …) enthält **kein** „Nahkampf Klingen" oder „Voodoo Ritualklinge" -
nur die generischen Talente „Nahkampf" und „Vodoo".

**Meine Annahme im Code** (`hausregeln/konvertiere-eldora.py`, Konstante
`BAUM_TALENT`): Die beiden Nahkampf-Bäume teilen sich das Talent „Nahkampf",
die beiden Voodoo-Bäume teilen sich „Vodoo", die übrigen sieben sind 1:1
(Stärke→Stärke, Fernkampf→Fernkampf, Agilität→Agilität, Einschüchtern→
Einschüchtern, Heimlichkeit→Heimlich, Medizin→Medizin, Motivieren→Motivieren).

**Frage an den SL:** Stimmt das? Falls nicht - gibt es eine eigene,
separate Punkteverteilung nur für die elf Baum-Werte, unabhängig von den
40 Basis-Talenten auf dem Bogen?

---

## 2. "2 Skillpunkte auf dem Rang darunter verteilt" - wie genau gezählt?

Zeile ~736f: „muss dein Attribut-Grundwert dem entsprechenden Rang haben, und
du musst mindestens 2 Skillpunkte auf dem Rang darunter verteilt haben."

**Meine Umsetzung:** Skillpunkte = nur die Punkte, die für ein *zweites oder
drittes* Level eines Skills ausgegeben wurden (das *erste* Level kostet ja
einen Rangpunkt, keinen Skillpunkt). Für Rang 2 in einem Baum braucht es also
insgesamt mindestens 2 solcher Zweit-/Drittlevel-Käufe unter den Rang-1-Skills
desselben Baums - egal ob auf einen Skill verteilt (Lvl 1→3) oder auf zwei
(je Lvl 1→2).

**Frage an den SL:** Ist das die richtige Lesart, oder zählt z.B. auch das
*erste* Level eines Skills als "ein Skillpunkt" im Sinne dieses Satzes?

---

## 3. Eigenschaften: zählt Wesen als "Talentbaum" bei der Freischaltung?

Zeile ~817f: Eine Eigenschaft von Rang R braucht „mindestens zwei
Talentbäumen den gleichen Rang erreicht". Beim Rangpunkte-Absatz eine Zeile
vorher steht explizit „einer der **drei** Talentbäume" (Wesen ausdrücklich
ausgenommen) - hier bei den Eigenschaften fehlt das Wort "drei".

**Meine Annahme:** Hier zählt der Wesen-Ast mit (bis zu vier Bäume insgesamt
für diese Prüfung), weil das Wort "drei" hier bewusst weggelassen wurde.

**Frage an den SL:** Korrekt, oder soll auch hier nur unter den drei
Hauptbäumen gezählt werden?

---

## 4. Eigenschaften mit mehreren Werten (z.B. "10/15/20 %") - wie oft wählbar?

Die Eigenschaften-Tabelle (Zeile ~825-900) zeigt viele Einträge mit
Schrägstrich-Werten wie "Fluchtreflex: 10/15/20 %" oder "Langes Leben:
+20/40/60/80/100 HP" - keine "St1/St2/St3"-Notation wie bei den Skills.

**Meine Annahme:** Jede Zahl ist ein eigener Pick derselben Eigenschaft
(z.B. "Langes Leben" fünfmal wählbar, jedes Mal +1 Rangpunkt, nächste Zahl in
der Reihe). Bei Eigenschaften mit nur einem Wert (z.B. "Krieger": „+1 Attacke
pro Angriffsaktion") ist entsprechend nur ein Pick möglich.

**Frage an den SL:** Stimmt das, oder ist z.B. bei "Langes Leben" gemeint,
dass man sich beim Wählen einmalig auf einen der fünf Werte festlegt (nicht
nacheinander alle durchläuft)?

---

## 5. Budget: 400 oder 500 Talentpunkte?

Regelwerk (Zeile ~248): „Jede Spielerfigur startet mit 400
Fähigkeitspunkten." Die von der Gruppe gelieferten Beispiel-Charakterdaten
(`eldora-arrrrr.roh.json`) haben `max_talent_points: 500`.

**Frage an den SL:** Gilt für die laufende Runde 400 (Regelwerk) oder 500
(wie im Beispiel-Bogen)? Das Tool übernimmt aktuell den Wert aus den
Bogen-Rohdaten (also 500) - sag Bescheid, falls das falsch ist.

---

## 6. Monsterpunkte: feste Menge pro Vergabe, Obergrenze, Rückgang?

Zeile ~782: „Stattdessen vergibt der Spielleiter Monsterpunkte, wenn der
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

Zeile ~815: „Habt ihr einen Skill doppelt, könnt ihr ihn auch kreuz leveln.
(z.B. Habt ihr Nahkampf und Stärke, könnt ihr auch Spott auf LvL2 bekommen,
indem ihr den Skill in den beiden Talentbäumen jeweils einmal levelt.)"

**Meine Umsetzung:** Effektives Level = Summe der Käufe in allen Ästen, in
denen der Skill gelernt wurde (im Beispiel: 1 + 1 = effektiv Level 2) -
gedeckelt auf das Maximum des Skills (meist 3).

**Frage an den SL:** Das Beispiel legt Summe nahe und passt zu meiner
Umsetzung - nur zur Bestätigung, falls es doch anders gemeint war.

---

## 8. NSC-/Monster-Talentbäume für Spieler (Ausnahmefall)?

Zeile ~653: „Wollt ihr einen Talentbaum aus diesem Bereich [Werwolf, Vampir,
Zombie, …], kontaktiert bitte den Spielleiter." Das klingt, als könnte ein
Spieler in Ausnahmefällen doch Zugriff auf einen der 19 NSC/Monster-Bäume
bekommen (mit SL-Erlaubnis) statt sie kategorisch auszuschließen.

**Aktuell:** Diese 19 Äste sind im Tool nicht wählbar (nur die 11 normalen
Hauptbäume + 11 Wesen stehen in den Dropdowns).

**Frage an den SL:** Kommt das in der Praxis vor? Falls ja, sag Bescheid -
das ließe sich als seltene SL-Sonderfreigabe nachrüsten (ähnlich den
Monsterpunkten), ist aber aktuell nicht gebaut.

---

## 9. Rüstungsstufen-Mali (Bewegung/Handeln/Heimlichkeit) - Zeile ~1226-1234

Die Tabelle direkt unter "Rüstungsstufen und Mali" (S.27, `rw41.txt:1224-1234`)
ist im Rohextrakt nicht eindeutig einer Zeile pro Stufe zuzuordnen:

```
Status         Rüstungswert  Bewegung  Handeln  Heimlichkeit
Ungepanzert    0             -1m       –        -10
                              -1m       -5       -15
Leicht         1–10          -2m       -7       -20
Mittel         11–20
Schwer         21+
```

Die zweite, namenlose Zahlenzeile direkt unter "Ungepanzert" lässt sich nicht
sicher zuordnen (gehört sie noch zu Ungepanzert, oder ist es eine verrutschte
Leicht-Zeile?), und für Mittel/Schwer fehlen die Werte in der Extraktion
komplett. Das Tool bildet aktuell nur den (eindeutigen) Rucksack-Platz-Malus
ab (-1 Mittel/-2 Schwer, aus dem separaten Inventar-Kapitel S.25f.) - diese
zusätzlichen Bewegungs-/Handeln-/Heimlichkeit-Mali sind **nicht** umgesetzt,
zumal Bewegung und Heimlichkeit im Tool aktuell auch gar keine eigenen
Bogen-Werte sind.

**Frage an den SL:** Könntest du die Originaltabelle aus dem PDF (S.27) kurz
abtippen oder ein Foto schicken? Falls die Gruppe diese Mali tatsächlich
nutzt, baue ich sie nach - aktuell landen sie sonst im Nirvana.

---

*Nach der Klärung: Antworten in dieses Dokument eintragen oder mir schicken,
dann ziehe ich `hausregeln/konvertiere-eldora.py` und `talentbaum.js`
entsprechend nach.*
