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
  "portrait": "data:image/jpeg;base64,/9j/4AAQSk...",

  "hausregeln": {
    "paket": "meine-runde",
    "hauptbaeume": ["Nahkampf Klingen", "Fernkampf", "Medizin"],
    "wesen": "Wolf",
    "wesenWert": 45,
    "gelernt": { "Nahkampf Klingen::Schlitzer": 2, "Fernkampf::Sniper": 1 },
    "verbraucht": { "Nahkampf Klingen::Schlitzer": true },
    "eigenschaften": { "Fluchtreflex": 1, "Athlet": 2 }
  }
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

### House Rules (Optional)
- `hausregeln` (Object, Optional): Only present when the character is played with a **rule package** (house-rule extension, see below). Everything in here is ignored when no package is active; the base sheet keeps working.
  - `paket` (String): ID of the rule package the sheet was saved with. If that package is not active when the file is loaded, the sheet shows a hint instead of the talent tree.
  - `hauptbaeume` (Array of Strings): Chosen main branches of the talent tree (branch names as in the package).
  - `wesen` (String or null): Chosen "Wesen" (creature/archetype branch).
  - `wesenWert` (Number, Optional): The Wesen branch's own rank-driving value. Unlike the three main branches (driven by a matching sheet talent, see `baumTalent` below), this one is *not* spent from the character's own talent points - the GM raises/lowers it via the GM Dashboard's per-player "Eingriff" action (`{ "type": "eingriff", "aktion": "monsterpunkte", "betrag": 5 }`, see below). Defaults to 0.
  - `gelernt` (Object): Learned tree skills, `"<Ast>::<Skillname>" -> level`. The key includes the branch because the same skill name exists in several branches. A skill's *effective* level for damage/effect purposes is the sum across every branch it's been bought in (cross-leveling, RW 4.1 p.17) - `talentbaum.js`'s `tbEffektivesLevel()` computes this; the per-key value here always stays what was actually purchased in that one branch.
  - `verbraucht` (Object): Skills marked as used in the current fight, `"<Ast>::<Skillname>" -> true`.
  - `eigenschaften` (Object, Optional): Picked "Besondere Eigenschaften" (RW 4.1 p.18f, package field `talentbaum.eigenschaften`), `"<Name>" -> stufe` (how many times it's been picked, 1-based). Paid from the same shared rank-point pool as a branch's first skill level, not from a branch's own skill points.

## Rule Packages / House Rules

A rule package bundles a group's house rules so the sheet can apply them: a fixed talent list, progressive talent costs, a talent tree with rank/skill points, per-Wesen effects and special roll tables. HeroHQ itself ships with **no built-in package** (`HAUSREGEL_PAKETE_EINGEBAUT` is empty) - a group loads its own package as plain JSON via *Hausregeln -> Aus Datei*. The GM distributes the setting to all connected players over the live sync.

**Which package is active is not part of the character file** - it is stored per browser (`localStorage`, key `htbah_hausregeln`) and sent by the GM. Only the character's *choices* (`hausregeln` above) travel with the JSON.

Illustrative example package (field names/values below are just one possible package, not anything bundled with the tool):

```json
{
  "id": "meine-runde",
  "name": "Meine Hausregeln",
  "version": "2026-05-18",
  "beschreibung": "...",
  "waehrung": "Tchambas",

  "talente": {
    "handeln":  [ { "id": "athletik", "name": "Athletik", "beschreibung": "Klettern, Rennen, Springen" },
                  { "id": "kochen", "name": "Kochen", "beschreibung": "...", "tabelle": "table_kochen" } ],
    "wissen":   [ ],
    "soziales": [ ]
  },

  "punkte": {
    "maxTalentpunkte": 500,
    "kostenStaffel": [ { "bis": 30, "kosten": 1 }, { "bis": 60, "kosten": 2 }, { "bis": 90, "kosten": 4 }, { "bis": 99, "kosten": 10 } ],
    "skillpunktSchwellen": [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  },

  "talentbaum": {
    "anzahlHauptbaeume": 3,
    "anzahlWesen": 1,
    "maxLevel": 3,
    "kosten": { "erstesLevel": "rangpunkt", "weiteresLevel": "skillpunkt" },
    "freischaltung": { "modus": "vorRang", "benoetigt": 2 },
    "hauptbaeume": ["Nahkampf Klingen", "Fernkampf"],
    "baumTalent": { "Nahkampf Klingen": "Nahkampf", "Fernkampf": "Fernkampf" },
    "wesen": ["Tiefseepirat", "Kultist"],
    "weitereAeste": ["Zombie"],
    "skills": [
      {
        "name": "Bodyslam", "ast": "Agilität", "art": "aktiv", "schadenTyp": "physisch", "rang": 1,
        "info": "Schaden: Nahkampf + 2/3/4w10 an 2/2/3 Zielen in einer Reihe",
        "stufen": [
          { "level": 1, "reichweite": "Nahkampf", "schaden": "2W10", "schadenArt": "Nahkampf", "effekt": "Trifft 2 Ziele in einer Reihe" },
          { "level": 2, "reichweite": "Nahkampf", "schaden": "3W10", "schadenArt": "Nahkampf", "effekt": "Trifft 2 Ziele in einer Reihe" }
        ]
      }
    ],
    "eigenschaften": [
      { "name": "Fluchtreflex", "rang": 1, "wirkungen": ["10% Ausweichchance gegen Fernkampf (nach Bewegung)", "15% ...", "20% ..."] }
    ]
  },

  "wesenEffekte": {
    "Tiefseepirat": [ { "typ": "buff", "ziel": "bewegungsweite_wasser_konditionell", "wert": "plus 2 Meter", "beschreibung": "Du erhältst plus 2 Meter Bewegungsweite im Wasser" } ]
  },

  "wuerfelTabellen": {
    "table_kochen": {
      "id": "table_kochen", "name": "Kochen", "wuerfel": "1W10", "art": "probe",
      "spalten": {
        "success":    [ { "wurf": 1, "text": "Schlecht aber essbar - satt" }, { "wurf": 2, "text": "Einfaches Essen.", "buffs": [ { "name": "Satt und glücklich.", "targetType": "category", "targetID": "soziales", "value": 3 } ] } ],
        "no_success": [ { "wurf": 1, "text": "Angebranntes Essen" } ]
      }
    },
    "oracle_piraten_events": { "id": "oracle_piraten_events", "name": "Orakel: Piraten Events", "wuerfel": "1W100", "art": "orakel", "spalten": { "spalte_A_aktion": [ { "wurf": 1, "text": "Angriff" } ], "spalte_B_fokus": [ { "wurf": 1, "text": "Gold" } ] } }
  }
}
```

### Package Field Reference
- `id`, `name`, `version`, `beschreibung` (String): Identity. `id` must be stable - character files reference it.
- `waehrung` (String, Optional): Suggested currency name; applied when the talent list is taken over and the sheet still has the default currency.
- `talente` (Object, Optional): Fixed talent list per category. Applied to the sheet only on explicit click (*Talentliste übernehmen*); existing skills with the same name keep their points, unknown skills are kept.
- `punkte` (Object, Optional): Point economy.
  - `maxTalentpunkte`: budget that replaces `maxPoints` while the package is active.
  - `kostenStaffel`: progressive cost *and* the talent-tree rank thresholds in one: point `n` costs the `kosten` of the first entry with `n <= bis`, and that same entry's position (1st, 2nd, ...) is the tree rank a talent of value `n` has reached. Points above the last entry cost/rank like the last entry. "Verteilte Punkte" on the sheet shows *cost*, not raw points, while `talentbaum.js` reuses the same table for each branch's rank.
  - `skillpunktSchwellen`: each threshold reached by a branch's driving talent value yields one skill point *for that branch specifically* - branches don't share a skill-point pool.
- `talentbaum` (Object, Optional): The tree. `hauptbaeume` / `wesen` are the branch names players may pick, `weitereAeste` lists branches that exist in `skills` but are not selectable (NPC/monster branches). `baumTalent` (Object, Optional) maps a main branch name to the sheet talent whose invested value drives that branch's rank/skill-points (several branches can point at the same talent, e.g. two combat styles sharing one talent) - the Wesen branch has no entry here since it's driven by `wesenWert` instead (see the character-file section above). Rank points are a single pool shared by every branch (1 per rank achieved in a *main* branch, Wesen excluded) and pay for a skill's first level (any branch) or an `eigenschaften` pick; skill points are per-branch and pay for a skill's 2nd/3rd level only. `freischaltung.modus`: `vorRang` (rank N in a branch needs `benoetigt` skill points *of that same branch* spent on rank-(N-1) skills), `imAst` (needs `benoetigt` learned skills in the branch of any rank, or the same skill learned in another branch), `frei` (no gating). Each skill: `name`, `ast`, `art` (`aktiv` | `passiv` | `extra`), `schadenTyp` (`physisch` | `magisch` | `heilung` | `keiner`), `rang`, `info`, `stufen[]` (one entry per level; `schaden` in dice notation like `2W10` gets a roll button, anything else is display-only), optional `morphForm`. The same skill name in two of a character's chosen branches cross-levels: its effective level (used for the roll button and the "learned skills" list) is the sum of what was bought in each branch. `eigenschaften[]` (Object, Optional): passive traits bought with rank points instead of skill points - `name`, `rang`, `wirkungen[]` (one string per time it can be picked; picking it again spends another rank point). A rang-R eigenschaft needs 2+ of the character's chosen branches (main + Wesen) at rank R or higher, and 2 already-picked eigenschaften of rank R-1.
- `wesenEffekte` (Object, Optional): `Wesen name -> [ { typ: "buff"|"debuff", ziel, wert, beschreibung } ]`. Currently display-only.
- `wuerfelTabellen` (Object, Optional): `art: "probe"` tables have `success` / `no_success` columns and ask whether the preceding check succeeded; `art: "orakel"` tables roll every column at once. `buffs` are carried along and shown in the log but not applied automatically yet.

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
| `{ "type": "eingriff", "aktion": "monsterpunkte", "still", "betrag" }` | Only relevant when the active package has a Wesen branch: raise/lower `hausregeln.wesenWert` by `betrag` (clamped 0-99) - the Wesen branch's rank-driving value, granted by the GM rather than spent from the player's own points |
| `{ "type": "eingriff", "aktion": "sonderAst", "still", "ast" }` | Grants one branch from the active package's `talentbaum.weitereAeste` as an extra Wesen option for this one player |
| `{ "type": "eingriff", "aktion": "sonderAstWeg", "still" }` | Revokes that extra Wesen option again |

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
