// Core character attributes
export const ELEMENTS = ["Fire", "Water", "Electro", "Geo", "Wind", "Ice", "Void"];
export const WEAPON_TYPES = ["Sword", "Claymore", "Spear", "Bow", "Catalyst"];
export const ROLES = ["DPS", "BurstDPS", "Support", "Tank", "Control"];
export const STATS = ["STR", "SPEED", "HP", "DEF", "EM"];
export const RARITIES = [3, 4, 5];

// Name generation data
export const NAME_PREFIXES = [
  "Storm", "Shadow", "Dawn", "Night", "Flame", "Frost", "Void",
  "Light", "Dark", "Thunder", "Crystal", "Moon", "Sun", "Star",
  "Iron", "Steel", "Silver", "Golden", "Azure", "Crimson"
];

export const NAME_SUFFIXES = [
  "blade", "walker", "seeker", "bringer", "warden", "vanguard",
  "keeper", "hunter", "guardian", "champion", "destroyer", "bearer",
  "weaver", "caller", "master", "lord", "servant", "knight"
];

// Title generation templates
export const TITLE_TEMPLATES = [
  "Scion of {Element}",
  "The {Adjective} {Noun}",
  "Bearer of {Element}",
  "{Element}'s {Noun}",
  "The {Element} {Adjective}",
  "Master of {Weapon}",
  "Champion of the {Element}"
];

export const TITLE_ADJECTIVES = [
  "Fallen", "Ascendant", "Eternal", "Void-touched", "Star-blessed",
  "Crimson", "Azure", "Shadow", "Divine", "Mortal", "Ancient",
  "Fierce", "Silent", "Swift", "Steadfast", "Relentless"
];

export const TITLE_NOUNS = [
  "Flame", "Blade", "Guardian", "Seeker", "Champion", "Destroyer",
  "Warden", "Keeper", "Hunter", "Master", "Lord", "Servant",
  "Knight", "Bearer", "Caller", "Weaver", "Vanguard", "Bringer"
];

// Flavor text templates
export const FLAVOR_TEXT_TEMPLATES = [
  "A mysterious wanderer wielding the power of {element}.",
  "Born from the ashes of war, they seek redemption through {weapon} mastery.",
  "The chosen one destined to balance the elements with unmatched {role} prowess.",
  "Once lost to time, now returned to shape the fate of the realm.",
  "Their {weapon} sings with ancient power, echoing through the battlefield.",
  "A legend whispered in taverns, their name inspiring both hope and fear.",
  "Bound by oath to protect the innocent, they walk the path of the {role}.",
  "The last of their kind, carrying the weight of generations.",
  "Through trials of fire and ice, they emerged stronger than steel.",
  "Their destiny intertwines with the ancient prophecies of old."
];

// Skill name pools
export const SKILL_NAME_POOLS = {
  normalAttack: [
    "Strike", "Slash", "Thrust", "Shot", "Blast", "Pierce", "Smash",
    "Swipe", "Jab", "Firebolt", "Ice Shard", "Rock Throw", "Wind Slash"
  ],
  skill: [
    "Elemental Burst", "Power Strike", "Swift Blade", "Energy Wave",
    "Phantom Strike", "Void Ripper", "Flame Dance", "Ice Cascade",
    "Thunder Storm", "Earth Shake", "Wind Fury", "Crystal Shard"
  ],
  burst: [
    "Ultimate Strike", "Final Judgment", "Apocalypse", "Ragnarok",
    "Divine Intervention", "Void Annihilation", "Phoenix Rising",
    "Frost Devastation", "Storm of the Century", "Earth's End",
    "Cyclone Fury", "Crystal Prison"
  ]
};

// Skill description templates
export const SKILL_DESCRIPTION_TEMPLATES = {
  normalAttack: [
    "A standard {weapon} attack dealing {element} damage.",
    "Quick strike with the {weapon}, infused with {element} power.",
    "Basic attack using the {weapon} with moderate damage.",
    "Swift {weapon} technique enhanced by {element} energy."
  ],
  skill: [
    "Unleashes a powerful {element} attack using the {weapon}.",
    "Channels {element} energy through the {weapon} for devastating damage.",
    "Advanced technique combining {weapon} mastery with {element} control.",
    "Signature move that overwhelms enemies with {element} force."
  ],
  burst: [
    "Ultimate technique that summons catastrophic {element} power.",
    "Transcendent ability altering the very fabric of the battlefield.",
    "Legendary technique passed down through generations of {role} masters.",
    "The culmination of all {element} and {weapon} training."
  ]
};

// Rarity weighting for random selection
export const RARITY_WEIGHTS = {
  3: 60, // 60% chance
  4: 30, // 30% chance
  5: 10  // 10% chance
};

// Base stat values for different roles
export const ROLE_BASE_STATS = {
  DPS: { hp: 100, atk: 80, def: 50 },
  BurstDPS: { hp: 90, atk: 90, def: 40 },
  Support: { hp: 110, atk: 40, def: 70 },
  Tank: { hp: 120, atk: 30, def: 90 },
  Control: { hp: 100, atk: 50, def: 60 }
};

// Rarity stat multipliers
export const RARITY_MULTIPLIERS = {
  3: 1.0,   // 100%
  4: 1.2,   // 120%
  5: 1.5    // 150%
};

// Difficulty modifiers based on element/weapon combinations
export const DIFFICULTY_MODIFIERS = {
  "Sword": 0,
  "Claymore": 1,
  "Spear": 1,
  "Bow": 2,
  "Catalyst": 3,
  "Void": 2,
  "Electro": 1,
  "Geo": 1
};

// Element color mappings for UI
export const ELEMENT_COLORS = {
  "Fire": "text-red-500",
  "Water": "text-blue-500",
  "Electro": "text-purple-500",
  "Geo": "text-yellow-600",
  "Wind": "teal-500",
  "Ice": "text-cyan-500",
  "Void": "text-indigo-500"
};