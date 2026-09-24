# Offene Fragen zum geplanten Kampf-Tracker (Landkampf)

Idee: ein Gegenstück zum Seekampf-Tracker, aber für normale Kämpfe (Überfall,
Monster, Wache) - Initiative sammeln, Zugreihenfolge durchgehen, grobe HP-
Übersicht über NSCs/Monster im Kampf. **Noch nichts davon ist gebaut** - die
Fragen hier sollen vor dem Bauen klären, wie es aussehen soll, statt hinterher
wieder umzubauen. Sortiert nach Wichtigkeit.

---

## 1. Initiative-Formel: flach wie beim Seekampf, oder wie auf dem Bogen?

Auf dem eigenen Charakterbogen würfelt jeder Spieler Initiative als
**1W10 + Handeln-Wert** (`app.js`, `rollInitiative()`). Der Seekampf-Tracker
dagegen würfelt pro Schiff **flach 1W10**, ganz ohne Statwert - unter anderem,
weil NSCs/Monster im Tool aktuell **keine** numerischen Werte haben (die
NSC-Liste ist reiner Flavor-Text: Name, Rolle, Ort, Haltung, Auffälligkeit,
Motivation, Wesen - kein Handeln-Wert, keine HP).

**Zwei Möglichkeiten:**
- **Flach 1W10** für alle (Spieler UND NSCs) im Tracker - einfach, konsistent
  mit dem Seekampf-Muster, aber weicht vom Bogen-Wurf ab.
- **1W10 + Handeln** wie auf dem Bogen - für Spieler leicht per Klick zu
  übernehmen (ihr Handeln-Wert steht ja schon auf dem Charakterbogen), für
  NSCs müsste der SL den Handeln-Wert dann manuell eintippen (oder es bleibt
  bei denen bei flach 1W10).

**Frage an den SL:** Was ist dir wichtiger - Konsistenz mit dem
Bogen-Initiative-Wurf, oder Einfachheit (keine Stats für NSCs nötig)?

---

## 2. Wie viel Crunch für NSCs/Monster im Kampf - nur Name, oder auch HP?

**Minimal-Variante:** Der Tracker ist eine reine Zugreihenfolge-Liste (wer ist
dran, in welcher Reihenfolge) - HP/Schaden bleiben weiterhin Kopfsache des SL
oder laufen über die SL-Notizen, wie bisher.

**Mit HP-Leiste:** Jeder NSC-Eintrag im Kampf bekommt zusätzlich ein Trefferpunkte-Feld
(SL tippt beim Hinzufügen einen Wert ein, z.B. "Wache: 30 HP") mit +/- Buttons
während des Kampfes - ähnlich der Strukturpunkte-Leiste beim Seekampf, aber
ohne Rüstungsstufen/kritische Zonen (das wäre dann wohl too much für einen
normalen Straßenkampf).

**Frage an den SL:** Reicht euch eine reine Reihenfolge-Liste, oder wollt ihr
auch grobe HP fürs Gegner-Grüppchen direkt im Tracker sehen?

---

## 3. Einzel- oder Gruppen-Initiative?

Läuft eure Runde mit **Einzelinitiative** (jeder Charakter/NSC hat seinen
eigenen Platz in der Reihenfolge, wie im Seekampf-Tracker) oder eher
**Seiten-/Gruppeninitiative** (ein Wurf für "die Gruppe", ein Wurf für "die
Gegner", dann handeln erst alle Spieler, dann alle Gegner)? Das entscheidet
die Grundform der Liste.

**Frage an den SL:** Welches Format spielt ihr am Tisch tatsächlich?

---

## 4. Wohin im Dashboard - eigenes Panel oder Teil der NSC-Liste?

**Eigenes Panel** (wie Seekampf): unabhängig, aber NSCs müssten beim
Hinzufügen zum Kampf nochmal benannt werden, auch wenn sie schon in der
NSC-Liste stehen.

**Andockung an die NSC-Liste**: jeder NSC-Eintrag bekommt einen
"Ab in den Kampf"-Knopf, der ihn (mit Name/Auffälligkeit als Kurzinfo) in
den Tracker schiebt - weniger Doppeleingabe, dafür enger an die NSC-Liste
gekoppelt.

**Frage an den SL:** Nutzt ihr die NSC-Liste während eines Kampfes überhaupt
aktiv (z.B. um Namen/Auffälligkeiten der Gegner nachzuschlagen), oder ist die
eher reine Vorbereitung vor der Session?

---

## 5. Wiederkehrende Gegner-Vorlagen nötig, oder immer Ad-hoc?

Schiffe im Seekampf werden jedes Mal frisch eingetippt (kein
"Vorlagen"-System außer den festen Schiffsklassen aus der Preisliste). Bei
Monstern/NSCs könnte es sich lohnen, einen einmal eingetragenen Gegner (z.B.
eine wiederkehrende Rivalen-Crew) als Vorlage zu speichern, statt Name+HP
jedes Mal neu einzutippen.

**Frage an den SL:** Kommen bei euch öfter dieselben Gegner in mehreren
Sessions vor, oder ist praktisch jeder Kampf mit frischen NSCs?

---

*Nach der Klärung: Antworten hier eintragen oder mir schicken, dann baue ich
den Kampf-Tracker danach.*
