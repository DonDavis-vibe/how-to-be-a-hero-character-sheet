# Spieler-Beiträge für den Zufallsgenerator

Grundlage dafür, wie Spieler Inhalte beisteuern können, die später in den
SL-Zufallsgenerator (`randomizer.js`) einfließen. Zwei Teile: unten der
Abschnitt "Kurzfassung zum Weiterreichen" kann 1:1 an die Runde raus. Der Rest
ist für dich, um zu verstehen, wo die Beiträge technisch landen.

## Warum das überhaupt funktioniert

Der Generator würfelt nie ganze vorgeschriebene NSCs, sondern setzt sie aus
kleinen, unabhängigen Tabellen zusammen (aktuell: Rolle+Ort, Haltung,
Auffälligkeit, Motivation – jede für sich zufällig gezogen). Jede Tabelle ist
technisch nur eine Liste von Einträgen mit einem Haupttext und optional einem
kleinen Zusatztext. Das heißt: praktisch jede kurze, in sich geschlossene Idee
lässt sich aufnehmen, ganz gleich ob Name, Ort, Gerücht oder Gegenstand –
solange sie kurz und ohne Kontext aus dem Rest des Satzes verständlich ist.

Ganze, druckreife Sätze wie dein Beispiel ("Sätze, die NSC beschreiben")
passen nicht direkt in die vier bestehenden Bauteil-Tabellen (die sind bewusst
atomar: nur "Haltung" oder nur "Auffälligkeit"). Dafür braucht es eine
zusätzliche, neue Tabelle "komplette Beschreibung", die einen ganzen
Satz unverändert als optionale Fluff-Zeile beim Würfeln mit ausgibt. Das ist
unten als eigene Kategorie aufgeführt.

## Kurzfassung zum Weiterreichen an die Spieler

**Eine Idee pro Zeile. Kein Rollenspiel-Fachchinesisch nötig, kein Bezug zu
Werten/Zahlen – reiner Text.** Optional lässt sich ein Haupttext von einer
kurzen Zusatzinfo trennen, per `|`. Wenn nicht klar ist, ob eine Idee zu
Eldara passt oder generisch ist: einfach dazuschreiben, notfalls raten – wird
beim Sichten sortiert.

### 1. NSC-Beschreibungen (ganze Sätze)

Ein bis zwei Sätze, die eine Figur greifbar machen. Kein Name nötig (der wird
separat gewürfelt), lieber Auffälligkeit + Motivation/Geheimnis in einem Satz.

```
Ein misstrauischer Hafenmeister mit einer Vorliebe fürs Glücksspiel und einer alten Kriegsnarbe im Gesicht.
Eine junge Kartografin, die mehr über die Karten weiß, als sie zugibt.
Trunkener Kapitän a.D. | erzählt jedem, der zuhört, von seiner letzten großen Schlacht
```

### 2. Namen (Vor-/Nachnamen, Beinamen)

```
Vorname männlich: Bartholomäus
Vorname weiblich: Isolde
Nachname: Krähenmoor
Beiname: Schwarzzahn
```

### 3. Orte & Fundorte

Kurzer Ortsname, optional mit einer Zeile, was einen dort erwartet.

```
Die verrostete Ankerbucht | verlassener Hafen, halb im Sand versunken
Klippenkloster von Sankt Morwenna
```

### 4. Gerüchte / Nebenjobs

Ein Satz, den man in einer Taverne aufschnappen könnte.

```
Man munkelt, der Leuchtturmwärter von Graukap sei seit Wochen nicht mehr gesehen worden.
```

### 5. Gegenstände (auch magisch)

```
Kompass, der immer zum nächsten Ärger zeigt | magisch
Angelaufene Silberpfeife ohne erkennbare Funktion
```

### 6. Begegnungen

Kurz, was der Gruppe unterwegs begegnet.

```
Ein Schwarm Leuchtquallen versperrt die einzige Furt.
```

### 7. Sonstiges

Alles, was in keine der obigen Schubladen passt, aber trotzdem Flair bringt
(Schiffsnamen, Aberglauben, Redewendungen der Insulaner, ...).

---

**Sammel-Vorlage** (z.B. als Zeile in einem gemeinsamen Pad/Sheet/Discord-Thread):

```
Kategorie: [NSC-Beschreibung / Name / Ort / Gerücht / Gegenstand / Begegnung / Sonstiges]
Text: ...
Zusatzinfo (optional): ...
Setting: [Eldara-kanonisch / generisch Piraten / setting-neutral]
```

## Technischer Weg von Beitrag zu Tabelle (für dich)

1. Beiträge sammeln (Sheet/Pad/Discord – deine Wahl), du sichtest/kuratierst
   (Doppelungen raus, Ton passt, kein Spoiler auf eigene Kampagnengeheimnisse).
2. Kuratierte Einträge werden nach `randomizer/quellen/*.json` übertragen –
   liegt lokal und ist gitignored, genau wie die Randy-Randelsen-Rohdaten.
   Format pro Eintrag ist flexibel (reiner String, oder `{name, beschreibung}`,
   siehe `liste()` in `randomizer/konvertiere-randomizer.py`).
3. `python randomizer/konvertiere-randomizer.py` neu laufen lassen – baut
   `original.js` / `piraten.js` / `eldora.js` neu, inklusive der neuen
   Einträge.
4. Für die neue Kategorie "komplette NSC-Beschreibung" fehlt noch ein kleiner
   Hook in `randomizer.js` (`rzWuerfelNSC` müsste die neue Tabelle mit
   einbeziehen, plus ein Button, um nur einen kompletten Beschreibungssatz zu
   ziehen). Der ist schnell nachgezogen, sobald die ersten echten Beiträge da
   sind – sag einfach Bescheid.

Alles andere (Namen, Orte, Gerüchte, Gegenstände, Begegnungen) braucht keinen
neuen Code: die Tabellen existieren schon, da reicht Schritt 1–3.
