import { Character } from '../types/character';
import {
  ELEMENTS,
  WEAPON_TYPES,
  ROLES,
  RARITY_WEIGHTS,
  NAME_PREFIXES,
  NAME_SUFFIXES,
  TITLE_TEMPLATES,
  TITLE_ADJECTIVES,
  TITLE_NOUNS,
  FLAVOR_TEXT_TEMPLATES,
  SKILL_NAME_POOLS,
  SKILL_DESCRIPTION_TEMPLATES,
  ROLE_BASE_STATS,
  RARITY_MULTIPLIERS
} from '../data/characterOptions';

// Helper function to get random element from array
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Weighted random selection for rarity
export function getRandomWeightedRarity(): number {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight;
    if (random <= cumulative) {
      return parseInt(rarity);
    }
  }

  return 3; // fallback
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Generate character name
export function generateName(): string {
  const prefix = getRandomElement(NAME_PREFIXES);
  const suffix = getRandomElement(NAME_SUFFIXES);
  return `${prefix}${suffix.charAt(0).toUpperCase() + suffix.slice(1)}`;
}

// Generate character title
export function generateTitle(element: string): string {
  const template = getRandomElement(TITLE_TEMPLATES);

  if (template.includes('{Element}')) {
    return template.replace('{Element}', element);
  }

  if (template.includes('{Adjective}') && template.includes('{Noun}')) {
    const adjective = getRandomElement(TITLE_ADJECTIVES);
    const noun = getRandomElement(TITLE_NOUNS);
    return template
      .replace('{Adjective}', adjective)
      .replace('{Noun}', noun);
  }

  if (template.includes('{Weapon}')) {
    const weapon = getRandomElement(WEAPON_TYPES);
    return template.replace('{Weapon}', weapon);
  }

  return template; // fallback
}

// Generate flavor text
export function generateFlavorText(element: string, weapon: string, role: string): string {
  const template = getRandomElement(FLAVOR_TEXT_TEMPLATES);
  return template
    .replace('{element}', element.toLowerCase())
    .replace('{weapon}', weapon.toLowerCase())
    .replace('{role}', role.toLowerCase());
}

// Generate skill
export function generateSkill(type: 'normalAttack' | 'skill' | 'burst', element: string, weapon: string) {
  const namePool = SKILL_NAME_POOLS[type];
  const descriptionPool = SKILL_DESCRIPTION_TEMPLATES[type];

  const name = getRandomElement(namePool);
  const description = getRandomElement(descriptionPool)
    .replace('{weapon}', weapon.toLowerCase())
    .replace('{element}', element.toLowerCase());

  return { name, description };
}

// Calculate stats based on role and rarity
export function calculateStats(role: string, rarity: number) {
  const baseStats = ROLE_BASE_STATS[role as keyof typeof ROLE_BASE_STATS];
  const multiplier = RARITY_MULTIPLIERS[rarity as keyof typeof RARITY_MULTIPLIERS];

  // Calculate difficulty based on role and random variation
  let difficulty = role === 'DPS' ? 5 : role === 'BurstDPS' ? 7 : role === 'Support' ? 4 : role === 'Tank' ? 3 : 6;
  difficulty += Math.floor(Math.random() * 3) - 1; // +/- 1 variation
  difficulty = Math.max(1, Math.min(10, difficulty));

  return {
    hp: Math.round(baseStats.hp * multiplier),
    atk: Math.round(baseStats.atk * multiplier),
    def: Math.round(baseStats.def * multiplier),
    difficulty
  };
}

// Create seed string
export function createSeed(element: string, weapon: string, role: string, rarity: number): string {
  const timestamp = Date.now();
  const elementCode = element.substring(0, 3).toUpperCase();
  const weaponCode = weapon.substring(0, 3).toUpperCase();
  const roleCode = role.substring(0, 3).toUpperCase();

  return `${elementCode}-${weaponCode}-${roleCode}-${rarity}-${timestamp}`;
}

// Main character generation function
export function generateRandomCharacter(): Character {
  const element = getRandomElement(ELEMENTS);
  const weaponType = getRandomElement(WEAPON_TYPES);
  const role = getRandomElement(ROLES);
  const rarity = getRandomWeightedRarity();

  const name = generateName();
  const title = generateTitle(element);
  const flavorText = generateFlavorText(element, weaponType, role);
  const stats = calculateStats(role, rarity);

  const skills = {
    normalAttack: generateSkill('normalAttack', element, weaponType),
    skill: generateSkill('skill', element, weaponType),
    burst: generateSkill('burst', element, weaponType)
  };

  const seed = createSeed(element, weaponType, role, rarity);
  const id = generateId();

  return {
    id,
    element,
    weaponType,
    role,
    rarity,
    name,
    title,
    flavorText,
    stats,
    skills,
    seed
  };
}