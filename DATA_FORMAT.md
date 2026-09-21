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
    "paket": "eldora-arrrrr",
    "hauptbaeume": ["Nahkampf Klingen", "Fernkampf", "Medizin"],
    "wesen": "Tiefseepirat",
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

A rule package bundles a group's house rules so the sheet can apply them: a fixed talent list, progressive talent costs, a talent tree with rank/skill points, per-Wesen effects and special roll tables. Packages live in `hausregeln/<id>.js` and are loaded on demand; a group can also load its own package as plain JSON via *Hausregeln -> Aus Datei*. The GM distributes the setting to all connected players over the live sync.

**Which package is active is not part of the character file** - it is stored per browser (`localStorage`, key `htbah_hausregeln`) and sent by the GM. Only the character's *choices* (`hausregeln` above) travel with the JSON.

```json
{
  "id": "eldora-arrrrr",
  "name": "Eldara - Version Arrrrr",
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

The Eldara package is generated from the group's raw data with `python hausregeln/konvertiere-eldora.py` (source: `hausregeln/quellen/eldora-arrrrr.roh.json`, kept out of the repository).

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
| `{ "type": "eingriff", "aktion": "monsterpunkte", "still", "betrag" }` | Eldara house rule: raise/lower `hausregeln.wesenWert` by `betrag` (clamped 0-99) - the Wesen branch's rank-driving value, granted by the GM rather than spent from the player's own points |

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

## Eldara House Rule: Grid Inventory & Ship Stash

Two related features, both only active while the "eldora-arrrrr" rule package is selected (see `eldaraAktiv()` in hausregeln.js). Unlike most other extras in this tool, this one *does* mirror an official rule - RW 4.1's "Inventar & Rucksack" chapter (p.25f, see `hausregeln/quellen/rw41.txt` around line 1100) and its ship table (p.32, around line 1502) - rather than being an invented addition.

**Grid inventory** (`inventarraster.js`) replaces the free-form inventory list with slotted carry zones: Gürtel (6), Gürtelbeutel (2), Rucksack (12, reduced by armor), plus up to 3 optional Zusatztaschen (small: +3 slots/-3 Handeln, large: +5/-5, while worn). `appData.inventory` items gain an `irGroesse` field (0.5/1/2/3, per the rulebook's item-size table, p.26); slot cost is that value rounded up. Two new fields drive available capacity: `appData.eldaraRuestungsteile` and `appData.eldaraZusatztaschen` (array of `'klein'|'gross'`, max 3 entries). Placement lives in `appData.inventarRaster`: `{ "<zone>_<index>": { "itemId" } | { "itemId", "cont": true } | null }`, e.g. `rucksack_0`..`rucksack_11`. An item may anchor at any index within its zone as long as enough contiguous cells are free (no fixed pair table). Items without a valid slot (e.g. after an armor/pouch change shrinks a zone) get auto-placed at the first free fit on next render; if nothing fits, adding a new item is refused outright rather than leaving one that exists in `inventory` but nowhere in the grid.

**Worn armor** (`appData.eldaraRuestungsteile`, p.27f) has six real equipment slots - `{ "helm", "schulter_1", "schulter_2", "brust", "bein_1", "bein_2" }`, each `null | "leder" | "kette" | "platte"`. Each slot/material combination carries its own Rüstungswert and Gold price (`IR_RUESTUNG_WERTE` in `inventarraster.js`, transcribed directly from the rulebook's price table). The sum of worn values (`irRuestungswert()`) determines the tier (`irRuestungsstufe()`: Ungepanzert 0 / Leicht 1-10 / Mittel 11-20 / Schwer 21+ - clean, unambiguous thresholds from the source), which drives the same Rucksack-slot reduction as before (-1 Mittel, -2 Schwer). The rulebook's separate table of additional Bewegung/Handeln/Heimlichkeit penalties per tier (p.27) is **not** implemented - the extracted source text for that specific table has ambiguous row/column alignment (see `hausregeln/OFFENE_FRAGEN.md`), and none of those three stats exist elsewhere in the tool as tracked values to apply a malus to anyway.

Known simplifications vs. the actual rule (documented in-code and in the in-app help): 0.5-sized items (dagger, potion) take a full slot here instead of pairing two-to-a-slot; the rulebook's dedicated "2 weapons" belt/rucksack allowance isn't modeled as its own zone - a weapon just occupies its normal 1-3 cells in whichever zone it's placed; Gürteltaschen (a further sub-mechanic in the same table) aren't modeled, only Zusatztaschen; the Handeln penalty from worn Zusatztaschen is surfaced as a hint, not auto-applied to rolls.

**Weapons merge into the grid while Eldara is active.** `appData.weapons` (the classic always-on weapon list with its damage-roll button) and this grid are treated as one pool, not two independent ones. `renderInventory()` in app.js calls `irWaffenNachRasterMigrieren()` on every render while Eldara is active: any entry still in `appData.weapons` gets converted to an `appData.inventory` item with `istWaffe: true`, `schaden` (copied from `damage`), defaulting to `irGroesse: 2`, and auto-placed in the grid; `appData.weapons` is left holding only whatever didn't fit (surfaced as a warning). The classic weapons section (`#weapons-section`) is hidden outright. Grid cards for `istWaffe` items get a damage-formula input and a dice button wired to the same `rollWeaponDamage()` used by the classic panel - no separate roll logic. Deactivating Eldara runs the mirror function, `irWaffenAusRasterMigrieren()`, moving any `istWaffe` grid items back into `appData.weapons` and re-showing the classic section. Both directions are idempotent (a no-op once their source list is empty), so they're safe to call unconditionally every render rather than needing to track a "did this just toggle" flag.

**Ship stash** (`schiffsinventar.js`) is the crew's shared home-base pool - unlike Tischmitte, always visible to everyone (no hidden/reveal), GM-authoritative and persisted at `htbah_gm_schiff` as `{ "klasse", "items": [...] }`. The GM picks a ship class from `SCHIFF_KLASSEN` (Kanonenboot 20 / Schoner 50 / Brigg 100 / Fregatte 150 / Kriegsschiff 250 - the rulebook's "Lager" column), which caps total item slot-cost aboard:

| Direction | Message | Meaning |
|---|---|---|
| GM -> players | `{ "type": "schiff", "klasse", "items": [...] }` | Complete state, sent after every change and on join |
| player -> GM | `{ "type": "schiffNehmen", "itemId": "schiff_..." }` | Request to take an entry |
| GM -> player | `{ "type": "schiffGeben", "item": {...} }` | Granted - the player auto-places it in their own grid. Also used to *return* an item when a `schiffAblegen` can't fit in the hold |
| GM -> player | `{ "type": "schiffAbgelehnt", "itemId": "schiff_...", "grund": "weg" \| "keinPlatz" }` | Already gone, or no matching free slot in the requester's own grid |
| player -> GM | `{ "type": "schiffAblegen", "item": {...} }` | Player puts one of their own items on the ship (removed from their own inventory optimistically; returned via `schiffGeben` if the hold is full) |

Entry shape: `{ "id", "name", "amount", "groesse", "description" }` - `groesse` uses the same 0.5/1/2/3 catalog as the grid. "How much you can take" from the ship has two independent limits: the ship's own Lager capacity (enforced GM-side against the sum of item slot-costs aboard), and whether the *requesting player's own grid* has a free matching slot (checked against that player's last-synced `inventarRaster`, accounting for their own armor/pouches). The rulebook doesn't specify how Lager capacity converts to personal item-slot sizes - this reuses the same size table for both as a documented approximation.

## Eldara House Rule: Karte (Multi-Map VTT)

GM-authoritative multi-map tabletop, `karten.js`, only active while `eldaraAktiv()`. Generalizes what used to be Seekampf's single private battle map into a library: the GM creates any number of named maps (`karten`, an array of `{ id, name, kategorie, zustand }`, `kategorie` one of `land`/`see`/`schiff`/`sonstiges` - display-only grouping, nothing gates behavior on it), switches which one is "active"/live, and each holds its own independent `battlemap.js` state. Persisted as one blob at `localStorage["htbah_gm_karten"]` (`{ karten, aktivId }`).

The map engine itself is `battlemap.js`, copied unmodified from the sister project at `E:\vibe_coding\demonslayer\battlemap.js` (a Canvas2D-rendered grid/token/pan-zoom/drawing/fog-of-war module, deliberately rule-system-agnostic - see its own header comment) - **never edit this file**, per its own comment, so improvements can flow both ways between the two projects. Only ONE `BattleMap` instance is ever live at a time (`karteMap`, bound to `#kt-canvas`); switching maps calls `karteAktuelleZurueckschreiben()` (writes the outgoing map's `getState()` + its `bild` back into `karten[]`) then `karteMap.applyState(eintrag.zustand, eintrag.zustand.bild)` on the incoming one - the same instance, re-hydrated, not a new one (re-running `BattleMap.create()` would drop pan/zoom/closure state). `getState()` deliberately excludes `bild` (large, changes rarely) - callers must carry it alongside separately, which `karteAktuelleZurueckschreiben()`/`karteZustandFuerSpieler()` both do via `Object.assign(karteMap.getState(), { bild: karteMap.bild })`. There's no chunked image transfer (unlike the sister project's `mapImageStart/Chunk/End` protocol) - the whole state including the background image data-URL goes out in one message, downsized client-side first via `BattleMap.bildVerkleinern()` (max 1800px, JPEG q=0.72) to keep it reasonable.

Figures (`karteMap.figuren`) use three id namespaces: `'spieler:'+peerId` (one per connected player, auto-created by `karteSpielerFigurenAbgleichen()`, `besitzer` = that peerId), `'nsc:'+nscId` (placed via the "Auf Karte platzieren" button on an NSC-Liste entry, `nscliste.js` → `karteNsPlatzieren()`, `besitzer: 'sl'`), and `'frei:'+uid` (ad-hoc GM markers, `besitzer: 'sl'`). `besitzer: 'sl'` is a literal string `battlemap.js`'s own `fuerSpieler()` checks for fog-of-war filtering (see below) - anything else (including `null`) is treated as *not* GM-owned and stays visible regardless of fog, which is why NSC/marker figures specifically use `'sl'` and not `null`.

**Movement**: identical mechanism for every figure regardless of namespace - `battlemap.js`'s own confirm-required drag flow (`bestaetigungNoetig`, `geplantX/geplantY`, `offeneZuege()`, `zugBestaetigen()`/`zugVerwerfen()`). A player drags their own figure -> `{ type: 'karteZugVorschlag', karteId, figurId, x, y }` to the GM. `karteAnfrageVerarbeiten()` handles it if `figurId === 'spieler:'+peerId`; otherwise it returns `false` so `multiplayer.js`'s dispatch chain falls through to `skAnfrageVerarbeiten()` (seekampf.js), which handles the same message shape for ship figures (see below) - both checks independently verify `payload.karteId === karteAktivId` first, so a stale proposal for a map the GM has since switched away from is silently dropped by both. The GM's own "Offene Zugvorschläge" panel (`renderKarteGm()`) lists *all* pending proposals via `karteMap.offeneZuege()` regardless of namespace, and routes each row's Bestätigen/Verwerfen button to `skZugBestaetigen`/`skZugVerwerfen` (if `skEinheit(v.id)` finds a matching ship - keeps the ship-specific log line) or the generic `karteZugBestaetigen`/`karteZugVerwerfen` otherwise. `karteZuegeFrei` (GM toggle, broadcast as `zuegeFrei`) sets `bestaetigungNoetig: false` on every player's engine instead, for tables that don't want the confirm step.

**Fog of war**: `battlemap.js`'s own two-stage reveal (`nebel.entwurf` = GM-only draft, `nebel.aufgedeckt` = released to players, toggled via `nebelAktiv()`/`nebelFreigeben()`/`nebelEntwurfVerwerfen()`) - dormant/unused before this feature existed. The broadcast uses `karteMap.getStateFuerSpieler()` (filters `verdeckt` figures and `besitzer:'sl'` figures standing in un-revealed fog, strips `entwurf`) instead of the raw `getState()`, so hidden figures/undrafted fog never leave the GM's browser in the first place.

**Live-Sync Messages: Karte**

| Direction | Message | Meaning |
|---|---|---|
| GM -> players | `{ "type": "karte", "karteId", "name", "kategorie", "zuegeFrei", "zustand": {...getStateFuerSpieler(), "bild"} }` | Active map's player-filtered state, sent after every change (debounced 300ms, `karteVerteilen()`) and on join |
| player -> GM | `{ "type": "karteZugVorschlag", "karteId", "figurId", "x", "y" }` | Proposed new position for a figure the sending player may move (own character token, or - if handled by seekampf.js instead - a ship they're assigned/captain of) |

Player side mirrors the GM: a single `karteSpielerMap` instance, created lazily on first `type: 'karte'` receipt (`karteEmpfangen()` must render the shell *before* `applyState()`, same ordering gotcha as everywhere else in this codebase that lazily creates a `battlemap.js` instance on first sync). Portraits (player character images) aren't part of the synced state (by `battlemap.js`'s own design) - re-applied locally after every sync via `setFigurBild()`, same pattern seekampf.js already used for ship icons.

## Eldara House Rule: Seekampf (Ship Combat Tracker)

GM-authoritative rules/bookkeeping layer for RW 4.1's "Seekampf" chapter (p.3-5, `hausregeln/quellen/rw41.txt` line ~109-245) - `seekampf.js`, only active while `eldaraAktiv()`. State lives at `localStorage["htbah_gm_seekampf"]` (units, wind, initiative, log - no map data, see Karte above). Unlike the fully GM-local NSC-Liste, this feature *does* reach players (unfiltered): every mutation is broadcast live, debounced.

Seekampf holds no map/canvas of its own - ships and markers are just figures on whichever map is currently active in the shared `karten.js` engine (`karteMap`/`karteSpielerMap`), added/removed by `skFigurenAbgleichen()` (id = the ship's own `id`, prefix `sk_`; `skm_...` for markers). Each ship/marker carries its own `karteId` - the one map it's actually placed on, set at creation to whatever map was active then, and otherwise unchanged by simply switching maps (older saved ships/markers predating this field load with `karteId: null` and self-claim whatever map happens to be active the next time `skFigurenAbgleichen()` runs, a one-time migration side effect). Because switching the active map wholesale-replaces `karteMap.figuren` via `applyState()`, `karten.js`'s `karteEinhaengen()`/`karteWechseln()`/`karteNeu()` all call `skFigurenAbgleichen()` (if defined) right after - it adds a figure back only if `karteId` matches the now-active map and removes it if not (at whatever `x`/`y` it last had), so a ship only ever shows up on its own map, not every map the GM switches to; its combat state (structure, crew, log) is untouched either way. The GM can explicitly move a ship to a different map via `skEinheitAufAktiveKarteVersetzen(id)` (a "Hierher versetzen" button on the ship's card, shown only while a different map than the ship's own is active) - sets `karteId` to `karteAktivId` and re-syncs, for when a ship arrives somewhere the GM has a separate prepared map for (e.g. docking at an island). `skFigurenAbgleichen()`'s own cleanup pass only ever removes figures with an `sk_`/`skm_` id that no longer match a live ship/marker (stale leftovers, e.g. a deleted ship) - it deliberately leaves every other figure (`spieler:`/`nsc:`/`frei:` from `karten.js`) alone, so a map switch never drops player or NSC tokens. `renderSeekampfGm()` calls `renderKarteGm()` first thing to guarantee `karteMap` exists before trying to sync figures onto it.

State shape (`seekampf` in seekampf.js):

```json
{
  "runde": 3,
  "wind": { "richtung": 2, "naechsterWechsel": 4 },
  "einheiten": [
    {
      "id": "sk_...", "name": "Schwarze Möwe", "seite": "spieler", "farbe": "#57c2f0",
      "klasse": "schoner", "spielerIds": ["peer-abc123", "peer-def456"], "kapitaen": null, "karteId": "kt_...",
      "struktur": { "aktuell": 150, "max": 200 },
      "geschwindigkeit": "w8", "kanonen": 18, "lager": 50,
      "effekte": [ { "text": "Segel zerstört (Geschwindigkeit halbiert)", "rundenUebrig": null } ]
    }
  ],
  "marker": [ { "id": "skm_...", "name": "Riff / Untiefe", "farbe": "#8b5e34", "typ": "riff" } ],
  "initiative": [ { "id": "sk_...", "wurf": 8 } ],
  "initiativeIndex": 0,
  "log": [ "..." ]
}
```

`wind.richtung` is an index 0-7 into `SK_WIND_RICHTUNGEN` (N/NO/O/SO/S/SW/W/NW, matching the rulebook's 1W8 table). `struktur` are Trefferpunkte/Strukturpunkte; hitting 0 flags the unit as sinking (`skStruktur` clamps at 0 and logs it) but doesn't remove it - the GM removes sunk ships manually. `geschwindigkeit` is a dice-formula string (`w8+1` etc., parsed by `skWuerfelFormel` - more tolerant than `parseDiceFormula` in app.js since it allows an omitted leading count, matching how the rulebook writes ship speeds). `klasse` (optional) only pre-fills stats at creation time from `SCHIFF_KLASSEN` (schiffsinventar.js, now extended beyond `lager` with `trefferpunkte`/`geschwindigkeit`/`kanonen`/`crew`/`preis` straight from the same p.32 table) - it isn't kept in sync afterward, exactly like Schiffs-Inventar item sizes aren't re-derived from a catalog after creation.

`effekte` entries are free-form status badges (`{ text, rundenUebrig }`); `rundenUebrig: null` means permanent until the GM removes it by hand (used for the two critical-hit statuses that only clear "bis repariert"). Every other effect ticks down by 1 at the start of each new round (`skRundeWeiter`) and is auto-removed at 0, logging its expiry. One effect type additionally carries `revertGeschwindigkeit`: the Kettenmanöver effect mutates `geschwindigkeit` down one die-step (`skWuerfelstufeSenken`, ladder W4 < W6 < W8 per the rulebook's own "W8→W6→W4" notation) for its rolled 1W4-round duration, and restores the saved original value when that specific effect expires - the only effect that mutates a stat directly rather than just displaying as a reminder.

`marker` are map-only decorations (reefs, islands, wreckage - `SK_MARKER_TYPEN`, each with a `label`/`farbe`/`icon` emoji) with no combat stats: same `BattleMap.addFigur` token mechanism as ships (smaller, `groesse: 0.75`), kept in sync by `skFigurenAbgleichen()` alongside `einheiten`, but deliberately absent from `initiative`/the unit cards/the combat log - purely spatial reference.

Both markers and ships get an icon "portrait" via `karteMap.setFigurBild()` instead of the plain color-plus-initials `battlemap.js` falls back to otherwise: `skIconBild(icon, farbe)` renders one emoji onto a small offscreen-canvas circle in the given color and returns a cached data URL (cache key `icon+farbe`, so e.g. all Spieler-side ships share one cached image). Ships all use the same sailboat emoji (`SK_SCHIFF_ICON`, colored by `seite`) - `battlemap.js` has no per-class icon concept, and the name label under the token plus the side color already distinguish individual ships. Portraits aren't part of the map's own persisted state (by that module's own design - see its header comment), so `skFigurenAbgleichen()` re-applies every unit's and marker's icon on every sync rather than only at creation, which is cheap since `setFigurBild` already no-ops on an unchanged data URL. **This applies on both sides of the wire**: the GM's `skFigurenAbgleichen()` re-applies icons to `karteMap`, and `skEmpfangen()` does the same for `karteSpielerMap` (if it already exists) right after receiving a `seekampf` message (portraits travel over neither `getState()` nor the `seekampf` message, so each side must render them locally from the same `farbe`/`typ` data it already has) - the player-side call was missing in an earlier pass, which silently left every player-visible token as a plain colored circle with no icon even though the GM's own view looked correct. `battlemap.js` also exposes freehand/line/circle/rectangle drawing (`setWerkzeug('malen')`, `setMalArt`, `setMalFarbe`) and those shapes (`formen` in the map's own state, not in `seekampf`) for the same purpose - marking a reef zone, cannon range, or fog bank without a discrete token. Both markers and drawn shapes survive `skGefechtZuruecksetzen()` (which only clears `einheiten`/`initiative`/`log` and the matching map figures) since they represent map geography that outlives any one encounter, not combat participants.

**Grid appearance** (raster color/size/offset, background image) is no longer a Seekampf-specific concern - it's part of whichever `karten.js` map is currently active (see Karte above: `renderKtRasterWerkzeuge()`, plain number/color inputs calling `karteMap.setRaster({...})`), set once via that map's own GM tools and shared by land maps, islands and ship decks alike rather than configured per-ship-fight.

**Deliberately not automated**: the maneuver table's own required Probe (Steuern/Schießen/Entern/Heimlichkeit, `SK_MANOEVER`) needs a character skill value this GM-side ship tracker has no access to (skills live on individual character sheets, not on a ship) - so maneuvers render as a reference card (name, probe, malus, effect text) rather than a roll button, with a "Versuch loggen" button that only writes the attempt to the log, and an "Erfolg → Effekt" button the GM clicks after the real roll happens elsewhere, adding the effect as a badge. Percentage-based maneuver effects (e.g. "+10% Trefferchance") are surfaced this way but never factored into the `skKanonenfeuerWuerfeln` roll automatically - the GM adjusts by eye, the same pattern already used for the Zusatztaschen Handeln-malus in the grid inventory. The only maneuver with a fully self-contained numeric effect is "Ramme voraus" (`skRammeSchaden`: 2W10 + 1W10 per 20t of the ramming ship's `lager`, half to self) since it needs no skill value at all. The rulebook's separate Bewegungs-/Handeln-/Heimlichkeit-malus-per-Rüstungsstufe table (p.27) is not modeled anywhere for the same reason noted under Grid Inventory above - the extracted source text is ambiguous there.

**Live-Sync Messages: Seekampf**

| Direction | Message | Meaning |
|---|---|---|
| GM -> players | `{ "type": "seekampf", "wind", "runde", "einheiten": [...], "marker": [...] }` | Complete, unfiltered rules state (no map data - see Karte above) - sent after every change (debounced 300ms via `skVerteilen()`/`skJetztVerteilen()`) and on join (`skAnVerbindung`) |
| player -> GM | `{ "type": "karteZugVorschlag", "karteId", "figurId", "x", "y" }` | Proposed new position for a ship the sending player is crew/captain of - same message shape `karten.js` uses for player-character moves; `karteAnfrageVerarbeiten()` ignores it (unknown `figurId` namespace) and `multiplayer.js`'s dispatch chain falls through to `skAnfrageVerarbeiten()` |

`einheiten[].spielerIds` (array of peerIds, possibly empty) are the GM-assigned crew - toggled via per-player name chips on each unit card (only shown once players are connected; click adds/removes that peerId via `skEinheitSpielerToggle`), so a shared crew ship (the normal Eldara case - the whole party usually shares one ship, not one each) can have several owners at once. `einheiten[].kapitaen` (a single peerId or `null`) optionally narrows that down further: when set, only that one crew member may move the ship at all, everyone else in `spielerIds` is reduced to view-only - toggled via a crown-icon button next to each crew chip (`skEinheitKapitaenUmschalten`), and cleared automatically if that player is removed from the crew (`skEinheitSpielerToggle`) or a different crew member is made captain. `null` (the default, and what older saved ships migrate to in `skLaden()`) preserves the original "anyone in the crew may steer" behavior.

`battlemap.js`'s own `besitzer`/`setBesitzer()` mechanism only supports a single value compared by strict equality, and is deliberately left unmodified - so ownership/captaincy is resolved **client-side, per player**, against the shared `karteSpielerMap` from `karten.js` (ships have no map instance of their own anymore): after every `seekampf`-message sync, `skEmpfangen()` computes locally whether `meinPeer` may move a given ship (`e.kapitaen ? e.kapitaen === meinPeer : e.spielerIds.includes(meinPeer)`) and calls `karteSpielerMap.addFigur({ id: e.id, besitzer: gehoertMir ? meinPeer : null })` - so a ship shared by three players ends up with `besitzer` set to *different* values across three different browsers, each matching only that browser's own call. The GM's own `karteMap` never sets `besitzer` on ships at all (irrelevant there - the GM's map has no `nurEigene` restriction and can drag anything). Movement itself rides entirely on `karten.js`'s generic proposal flow (`bestaetigungNoetig`, `geplantX/geplantY`, `onZugVorschlag` -> `karteZugVorschlag`) - only an owned/captained ship is draggable client-side, and even that only produces a proposal. `skAnfrageVerarbeiten` (GM side) re-checks crew/captain membership server-side (rejected silently if `darf` is false) before merging `geplantX/geplantY` onto the GM's own copy of that figure via `karteMap.addFigur()` - reusing `battlemap.js`'s own pending-move rendering (the dashed preview) and `offeneZuege()`/`zugBestaetigen()`/`zugVerwerfen()` API unmodified, just fed by network messages instead of local drags. Pending ship proposals show up in `karten.js`'s own "Offene Zugvorschläge" panel (`renderKarteGm()`) alongside player-character ones - `skEinheit(v.id)` matching routes that row's Bestätigen/Verwerfen to `skZugBestaetigen`/`skZugVerwerfen` instead of the generic `karteZugBestaetigen`/`karteZugVerwerfen`, so confirming a ship move still writes the ship-specific log line. Older saved state from before crew existed used a single `spielerId` - `skLaden()` migrates it into a one-element `spielerIds` array (and, from before captain existed, defaults a missing `kapitaen` to `null`).

Players get a headless, canvas-less render (`renderSeekampfSpieler()`, `#seekampf-section` in index.html) - the actual map/tokens are drawn by `karten.js`'s own player panel (`#karte-section`), not duplicated here. Seekampf's player view is just the wind/round header and a read-only ship roster (`skEinheitKarteSpielerHtml`, no inputs, no delete, no effect-removal, crew/captain shown as plain text). `skEmpfangen()` no longer creates or touches a `BattleMap` instance itself; it only re-renders this roster and (via `karteSpielerMap`, if that panel has already been built) re-applies ship icon portraits and per-player `besitzer`/captain state onto the figures `karten.js` already manages.

## Randomizer Packages

GM-only prep tool (`randomizer.js`), no network messages - nothing here ever reaches players automatically. Packages live in `randomizer/<id>.js`, all three built-in ones (`original`, `piraten`, `eldora`) load together the first time the GM opens the panel. A package registers itself with `randomizerPaketRegistrieren({...})`:

```json
{
  "id": "eldora",
  "name": "Eldara (kanonisch)",
  "beschreibung": "...",
  "tabellen": {
    "gegenstaende_magisch": {
      "name": "Magischer Gegenstand", "kategorie": "items",
      "eintraege": [ { "haupt": "Anker der Erinnerung", "neben": "Amulett" } ],
      "attribution": "optional, shown under a rolled result (e.g. CC-BY credit)"
    }
  },
  "wortlisten": { "vornamen_erdig_maennlich": ["Bill", "..."] },
  "wesen": ["Tiefseepirat", "..."],
  "eigenschaften": [ { "name": "Fluchtreflex", "rang": 1, "wirkungen": ["10% ...", "15% ...", "20% ..."] } ]
}
```

- `tabellen` (Object): flat roll tables. Every entry is normalized to `{ haupt, neben? }` regardless of its raw shape (a plain string, `{name, beschreibung}`, `{name, kategorie}`, `{text, ton}`, or a flattened `{ort, rollen}` combo) - `randomizer.js` never branches on the source shape. `kategorie` groups tables in the UI (`namen`, `npc`, `orte_items`, `begegnungen`, `geruechte`, `items`, `sonstiges`). `attribution`, when present, is shown under every result rolled from that table (used for the SRD-derived `trinkets` table, CC-BY-4.0).
- `wortlisten` (Object, optional): plain word lists for a composite generator that isn't a flat table (currently only the piraten package's "erdig" crew-name generator, combining adjective/prefix banks with first names).
- `wesen` (Array of Strings, optional): playable Wesen/Monster archetypes for the NSC generator's "Wesen einbeziehen" roll (Eldara only).
- `eigenschaften` (Array, optional): the Eldara rulebook's "Besondere Eigenschaften" (RW 4.1 p.18f), transcribed by hand in `konvertiere-randomizer.py` (no source file has them). `wirkungen[]` holds one line per pick (the rulebook shows this as "10/15/20%" etc. - each number is one pick). **Display-only** in the NSC generator right now, not wired into the talent-tree point economy - that rebuild is a separate, still-open task (see the "Eldara Hausregeln" memory note).

Rolling a result from a `gegenstaende_magisch` entry offers "In Tischmitte legen", which calls straight into `tischmitte.js` (`tischmitteCommit`) with a hidden entry - no protocol of its own.

The Eldara package is generated together with the source-data package `hausregeln/eldora-arrrrr.js` conceptually, but from a separate source tree (`randomizer/quellen/`, kept out of the repository) via `python randomizer/konvertiere-randomizer.py`.

## Importing Rules

If you are generating JSON files to be loaded into this tool, simply provide an object with any subset of the keys above. The tool uses `Object.assign()` during import, meaning missing keys will retain their default blank state or the state of the currently loaded character, and provided keys will overwrite existing data. The tool automatically recalculates all base attributes and maximum Geistesblitzpunkte upon loading the file.
