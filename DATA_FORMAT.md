# How to be a Hero - JSON Export Format

This document describes the structure of the `.json` files exported by the **HTBAH Character Sheet Tool**. 
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
    { "id": "i1", "name": "Kaugummi" },
    { "id": "i2", "name": "Gaffa Tape" }
  ],
  
  "notes": "Hat Höhenangst...",
  "theme": "synthwave",
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

### Stats & Settings
- `hpCurrent` (Number): Current Health Points.
- `hpMax` (Number): Maximum Health Points.
- `maxPoints` (Number): The overall point budget for the character (default is 400).
- `inventory` (Array of Objects): The character's inventory list.
  - `id` (String): Unique identifier.
  - `name` (String): Name of the item.
- `notes` (String): Free text area for character notes, backstory, or quest logs.
- `theme` (String): The UI theme selected by the user. Supported values: `default`, `steampunk`, `cyberpunk`, `synthwave`, `deepspace`, `biohazard`, `magic`, `apokalypse`, `timetravel`.

## Importing Rules

If you are generating JSON files to be loaded into this tool, simply provide an object with any subset of the keys above. The tool uses `Object.assign()` during import, meaning missing keys will retain their default blank state or the state of the currently loaded character, and provided keys will overwrite existing data. The tool automatically recalculates all base attributes and maximum Geistesblitzpunkte upon loading the file.
