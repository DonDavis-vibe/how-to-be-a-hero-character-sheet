# HeroHQ - JSON Export Format

This document describes the structure of the `.json` files exported by **HeroHQ**, the character sheet tool for "How to be a Hero". 
Other applications (like Virtual Tabletops, Dice Rollers, or Campaign Managers) can use this format to seamlessly import or generate character sheets for this tool.

## Basic Structure

The root object of the JSON file represents a single character's state.

```json
{
  "vorname": "Angus",
  "name": "MacGyver",
  "geschlecht": "M",
  "beruf": "Problemlöser",
  "alter": "42",
  "statur": "Sportlich",
  
  "hpCurrent": 100,
  "hpMax": 100,
  
  "attr_handeln": 17,
  "gbp_handeln": 2,
  "skills_handeln": [
    { "id": "h1", "name": "DIY Basteln", "invested": 87 },
    { "id": "h2", "name": "Fahr- und Fluggeräte", "invested": 60 }
  ],
  
  "attr_wissen": 16,
  "gbp_wissen": 2,
  "skills_wissen": [
    { "id": "w1", "name": "angewandte Physik", "invested": 90 }
  ],
  
  "attr_soziales": 8,
  "gbp_soziales": 1,
  "skills_soziales": [
    { "id": "s1", "name": "Überreden", "invested": 48 }
  ],
  
  "inventory": [
    { "id": "i1", "name": "Kaugummi", "description": "Schmeckt nach Pfefferminz", "showDesc": true },
    { "id": "i2", "name": "Gaffa Tape" }
  ],
  
  "weapons": [
    { "id": "w1", "name": "Rostiger Revolver", "damage": "1w10+2", "description": "Ladehemmung bei einer 1", "showDesc": true }
  ],

  "statuses": [
    { "id": "st_1", "name": "Verstrahlt", "value": "60%", "type": "malus" },
    { "id": "st_2", "name": "Fokussiert", "value": "", "type": "bonus" }
  ],
  
  "activityLog": [
    { "time": "15:23", "cssClass": "activity-good", "iconHtml": "<i class=\"fa-solid fa-heart\"></i>", "message": "Heilung um 4 HP" }
  ],
  
  "currency": { "name": "Credits", "amount": 150 },
  "notes": "Hat Höhenangst...",
  "questlog": [
    { "id": "sl_1", "npc": "Bürgermeister Voss", "zeitpunkt": "Tag 2, Rathaus", "text": "Warnte vor den Lichtern im Sumpf, wollte aber nicht sagen wovor genau." }
  ],
  "theme": "mafia",
  "fxEnabled": true,
  "soundEnabled": true,
  "maxPoints": 400,
  "portrait": "data:image/jpeg;base64,/9j/4AAQSk..."
}
```

## Field Reference

### General Info
- `vorname` (String): Character's first name.
- `name` (String): Character's last name.
- `geschlecht` (String): Gender / Pronouns.
- `beruf` (String): Profession.
- `alter` (String): Age.
- `statur` (String): Build/Physique.
- `portrait` (String, Optional): Base64 Data URI of the character's avatar image.

### Attributes and Skills
The HTBAH system has three primary categories: **handeln** (Action), **wissen** (Knowledge), and **soziales** (Social).

For each category `<cat>` (`handeln`, `wissen`, `soziales`), the following keys exist:
- `attr_<cat>` (Number): The base attribute value. (Calculated dynamically as `Sum of invested / 10`, kaufmännisch gerundet). *Note: The app recalculates this on load, so it does not strictly need to be accurate in the JSON.*
- `gbp_<cat>` (Number): The currently available Geistesblitzpunkte (GBP) for this category.
- `skills_<cat>` (Array of Objects): The list of skills in this category.
  - `id` (String): A unique identifier for the skill in the DOM.
  - `name` (String): The name of the skill.
  - `invested` (Number): The amount of points invested into this specific skill. *(Legacy support: if a file contains `value` instead of `invested`, the app will automatically migrate it on import).*
  - `excludeBonus` (Boolean, Optional): If `true`, the category's attribute bonus is *not* added to this skill's total (per the rulebook, a player may opt out of the bonus for a specific skill). Default `false`.
  - `paketTalent` (String, Optional): Set when the skill was taken from a rule package's fixed talent list (see *House Rules* below). Holds the talent's `id` in the package.
  - `beschreibung` (String, Optional): Talent description from the package, shown as a tooltip.
  - `tabelle` (String, Optional): ID of a special roll table in the package (e.g. `table_kochen`); the sheet shows a roll button next to the skill.

### Stats & Settings
- `hpCurrent` (Number): Current Health Points.
- `hpMax` (Number): Maximum Health Points.
- `maxPoints` (Number): The overall point budget for the character (default is 400).
- `inventory` (Array of Objects): The character's inventory list.
  - `id` (String): Unique identifier.
  - `name` (String): Name of the item.
  - `description` (String, Optional): Detailed text/effect description of the item.
  - `showDesc` (Boolean, Optional): UI state determining if the description is expanded.
- `weapons` (Array of Objects): The character's weapons list.
  - `id` (String): Unique identifier.
  - `name` (String): Name of the weapon.
  - `damage` (String): Dice formula (e.g. `1w10+2`) for the 1-click roll feature.
  - `description` (String, Optional): Detailed text/effect description of the weapon.
  - `showDesc` (Boolean, Optional): UI state determining if the description is expanded.
- `statuses` (Array of Objects): The active status effects/conditions.
  - `id` (String): Unique identifier.
  - `name` (String): Name of the status (e.g. "Wahnsinn").
  - `value` (String, Optional): Intensity or duration (e.g. "60%").
  - `type` (String): Defines the badge color. Supported: `malus` (red), `bonus` (green), `neutral` (gray).
- `activityLog` (Array of Objects, Optional): The persistent action history of the character.
  - `time` (String): The timestamp (HH:MM).
  - `cssClass` (String): The visual color class (`activity-good`, `activity-bad`, `activity-neutral`).
  - `iconHtml` (String): The raw HTML string for the FontAwesome icon.
  - `message` (String): The log text.
- `currency` (Object, Optional): The character's primary currency.
  - `name` (String): The name of the currency (e.g. "Credits").
  - `amount` (Number): The current amount.
- `notes` (String): Free text area for character notes, backstory, or quest logs.
- `questlog` (Array of Objects, Optional): The player's own structured adventure journal (separate from the GM's quest log, see *Quest-Logbuch* below) - which NPC was met when, and what they said or hinted at. Never transmitted to the GM's dashboard.
  - `id` (String): Unique identifier.
  - `npc` (String, Optional): Free-text name of the NPC involved.
  - `zeitpunkt` (String, Optional): Free-text point in time (e.g. "Tag 2, Rathaus").
  - `text` (String): The note itself - what was said, what hints were given.
- `theme` (String): The UI theme selected by the user. Supported values: `default`, `steampunk`, `cyberpunk`, `apocalyptic`, `mafia`, `lovecraft`, `magic`, `deepspace`.
- `fxEnabled` (Boolean, Optional): Whether visual CSS/JS effects are enabled for the theme (default `true`).
- `soundEnabled` (Boolean, Optional): Whether UI sound effects are enabled (default `true`).
- `customThemeLogo` (String, Optional): Base64 Data URI of a custom faction/team logo that overrides the default theme logo.

## Live-Sync Messages: Tischmitte (Shared Loot)

The shared loot area ("Tischmitte") is not part of the character file. The GM client is the authority; its full list (including hidden entries) lives in the GM's browser (`localStorage`, key `htbah_gm_tischmitte`). Hidden entries never leave the GM's machine. Messages over the PeerJS connection:

| Direction | Message | Meaning |
|---|---|---|
| GM -> players | `{ "type": "tischmitte", "items": [...] }` | Complete *visible* state, sent after every change and on join |
| player -> GM | `{ "type": "tischmitteNehmen", "itemId": "tm_..." }` | Request to take an entry |
| GM -> player | `{ "type": "tischmitteGeben", "item": {...} }` | The entry is yours; the player adds it to inventory / weapons / currency |
| GM -> player | `{ "type": "tischmitteAbgelehnt", "itemId": "tm_..." }` | Already gone (someone else took it or it was hidden/removed) |
| player -> GM | `{ "type": "tischmitteAblegen", "item": {...} }` | Player puts one of their own items into the middle |

Entry shape: `{ "id", "art": "gegenstand" | "waffe" | "waehrung", "name", "amount", "damage", "description", "hidden", "von" }` - `amount` for items and currency, `damage` for weapons, `von` = character name when a player dropped it.

## Live-Sync Messages: GM Intervention

The GM can change a player's sheet directly, optionally *silently* (`still: true` - no activity-log entry and no notice on the player's side; the GM's own feed always records it):

| Message | Meaning |
|---|---|
| `{ "type": "eingriff", "aktion": "geben", "still", "item": { "art", "name", "amount", "damage", "description" } }` | Add an item / weapon / currency (negative `amount` subtracts currency) |
| `{ "type": "eingriff", "aktion": "status", "still", "status": { "name", "value", "type" } }` | Add a status effect |
| `{ "type": "eingriff", "aktion": "statusWeg", "still", "statusId" }` | Remove a status effect by its `id` |

## Live-Sync Messages: Group Overview

Players get a compact view of their fellow players. The GM relays it (players are not connected to each other), debounced after every sheet update, on join, and when the GM changes a player's color:

`{ "type": "gruppe", "spieler": [ { "peerId", "name", "bild", "hpCurrent", "hpMax", "statuses": [ { "name", "value", "type" } ], "farbe" } ] }`

`bild` is a 72 px JPEG thumbnail the GM client renders from the player's portrait and caches per peer (the original portrait is not relayed - base64 bloat). No skills/inventory/notes. The receiving client hides its own entry by `peerId`.

## Live-Sync Messages: Quest Log

Like Tischmitte, quests are GM-only until shared - the GM's full list (including hidden quests, hints and goals) lives in `localStorage` (key `htbah_gm_queste`) and never leaves the GM's machine unfiltered. One-way, GM to players only (no player actions):

| Direction | Message | Meaning |
|---|---|---|
| GM -> players | `{ "type": "quests", "quests": [...] }` | Complete *visible* state, sent after every change and on join |

Each quest the GM keeps has the shape `{ "id", "name", "beschreibung", "nscId", "hidden", "hinweise": [ { "id", "text", "hidden" } ], "ziele": [ { "id", "text", "hidden", "erledigt" } ] }` - `nscId` optionally references an entry in the GM's NSC list. Visibility nests three levels deep: the whole quest, and independently each hint and each goal, so the GM can share a quest while still holding back a specific clue or the true final objective.

What players actually receive is filtered down to only what's visible: `{ "id", "name", "beschreibung", "nscName", "hinweise": ["..."], "ziele": [ { "id", "text", "erledigt" } ] }` - hidden quests are omitted entirely, and within a visible quest, hidden hints/goals are stripped out rather than sent with a hidden flag. `nscId` becomes a plain `nscName` string (the player has no access to the GM's NSC list). Players never see anything from this feature at all until the GM shares at least one quest - the client-side section stays absent (not just empty) until then.
## Randomizer Packages

GM-only prep tool (`randomizer.js`), no network messages - nothing here ever reaches players automatically. Packages live in `randomizer/<id>.js`; the built-in `original` package loads the first time the GM opens the panel. A package registers itself with `randomizerPaketRegistrieren({...})`:

```json
{
  "id": "original",
  "name": "Allgemein",
  "beschreibung": "...",
  "tabellen": {
    "npc_auffaelligkeiten": {
      "name": "NSC: Auffälligkeit", "kategorie": "npc",
      "eintraege": [ { "haupt": "Ein auffälliges Muttermal", "neben": "am Hals" } ],
      "attribution": "optional, shown under a rolled result (e.g. CC-BY credit)"
    }
  }
}
```

- `tabellen` (Object): flat roll tables. Every entry is normalized to `{ haupt, neben? }` regardless of its raw shape (a plain string, `{name, beschreibung}`, `{name, kategorie}`, `{text, ton}`, or a flattened `{ort, rollen}` combo) - `randomizer.js` never branches on the source shape. `kategorie` groups tables in the UI (`namen`, `npc`, `orte_items`, `begegnungen`, `geruechte`, `items`, `sonstiges`) and also decides whether a rolled result can be pushed straight to Tischmitte (`items`/`waffen`). `attribution`, when present, is shown under every result rolled from that table (used for the SRD-derived `trinkets` table, CC-BY-4.0).

Rolling a result from an `items`/`waffen`-category table offers "In Tischmitte legen", which calls straight into `tischmitte.js` (`tischmitteCommit`) with a hidden entry - no protocol of its own.

`randomizer/konvertiere-randomizer.py` regenerates `original.js` from a separate source tree (`randomizer/quellen/`, kept out of the repository) via `python randomizer/konvertiere-randomizer.py`.

## Importing Rules

If you are generating JSON files to be loaded into this tool, simply provide an object with any subset of the keys above. The tool uses `Object.assign()` during import, meaning missing keys will retain their default blank state or the state of the currently loaded character, and provided keys will overwrite existing data. The tool automatically recalculates all base attributes and maximum Geistesblitzpunkte upon loading the file.
