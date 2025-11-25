import type { Character, RolledAttributes, RarityGrade, StatRank, CharacterStats } from '../types/character';
import {
  ELEMENTS,
  WEAPON_TYPES,
  ROLES,
  RARITY_WEIGHTS,
  ROLE_BASE_STATS,
  RARITY_STAT_MULTIPLIERS
} from '../data/characterOptions';
import { generateCharacterWithAI } from './aiService';
import { SeededRandom } from './seededRandom';

// Helper function to get random element from array
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Weighted random selection for rarity grade
export function getRandomWeightedRarity(): RarityGrade {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const [grade, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight;
    if (random <= cumulative) {
      return grade as RarityGrade;
    }
  }

  return 'C'; // fallback
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Calculate stats based on role and rarity (deterministic if seed provided)
export function calculateStats(role: string, rarity: RarityGrade, seed?: number): CharacterStats {
  const baseStats = ROLE_BASE_STATS[role as keyof typeof ROLE_BASE_STATS];
  const multiplier = RARITY_STAT_MULTIPLIERS[rarity];

  // Add some randomness (±10%)
  const randomize = seed !== undefined
    ? (() => {
        const rng = new SeededRandom(seed);
        return () => rng.nextFloat(0.9, 1.1);
      })()
    : () => 0.9 + Math.random() * 0.2;

  return {
    hp: Math.round(baseStats.hp * multiplier * randomize()),
    atk: Math.round(baseStats.atk * multiplier * randomize()),
    def: Math.round(baseStats.def * multiplier * randomize()),
    speed: Math.round(baseStats.speed * multiplier * randomize()),
    em: Math.round(baseStats.em * multiplier * randomize())
  };
}

// Determine stat rank based on value
export function calculateStatRank(stat: number, baseStat: number, rarity: RarityGrade): string {
  const expected = baseStat * RARITY_STAT_MULTIPLIERS[rarity];
  const ratio = stat / expected;

  if (ratio >= 1.12) return 'divine';
  if (ratio >= 1.04) return 'excellent';
  if (ratio >= 0.96) return 'good';
  if (ratio >= 0.88) return 'average';
  return 'below average';
}

// Calculate stat ranks for all stats
export function calculateStatRanks(stats: CharacterStats, role: string, rarity: RarityGrade): StatRank {
  const baseStats = ROLE_BASE_STATS[role as keyof typeof ROLE_BASE_STATS];

  return {
    hp: calculateStatRank(stats.hp, baseStats.hp, rarity),
    atk: calculateStatRank(stats.atk, baseStats.atk, rarity),
    def: calculateStatRank(stats.def, baseStats.def, rarity),
    speed: calculateStatRank(stats.speed, baseStats.speed, rarity),
    em: calculateStatRank(stats.em, baseStats.em, rarity)
  };
}

// Create seed string
export function createSeed(element: string, weapon: string, role: string, rarity: RarityGrade): string {
  const timestamp = Date.now();
  const elementCode = element.substring(0, 3).toUpperCase();
  const weaponCode = weapon.substring(0, 3).toUpperCase();
  const roleCode = role.substring(0, 3).toUpperCase();

  return `${rarity}-${elementCode}-${weaponCode}-${roleCode}-${timestamp}`;
}

// Roll random attributes (no AI generation yet)
export function rollRandomAttributes(seed?: number): RolledAttributes {
  const element = getRandomElement(ELEMENTS);
  const weaponType = getRandomElement(WEAPON_TYPES);
  const role = getRandomElement(ROLES);
  const rarity = getRandomWeightedRarity();
  const stats = calculateStats(role, rarity, seed);
  const statRanks = calculateStatRanks(stats, role, rarity);

  return {
    element,
    weaponType,
    role,
    rarity,
    stats,
    statRanks
  };
}

// Complete character with AI-generated content and user-provided name
export async function completeCharacterWithAI(rolled: RolledAttributes, userName: string): Promise<Character> {
  const { element, weaponType, role, rarity, stats, statRanks } = rolled;
  
  console.log('Rolled rarity:', rarity);
  console.log('Rolled stats:', stats);
  console.log('Stat ranks:', statRanks);
  
  // Call AI service to generate title, class, flavor text, and skills
  const aiContent = await generateCharacterWithAI({
    element,
    weaponType,
    role,
    rarity,
    statRanks
  });
  
  const seed = createSeed(element, weaponType, role, rarity);
  const id = generateId();

  const character = {
    id,
    element,
    weaponType,
    role,
    name: userName || 'Unnamed Hero',
    stats,
    statRanks,
    seed,
    ...aiContent,
    rarity // Put rarity AFTER spread to ensure it's never overwritten
  };
  
  console.log('Final character rarity:', character.rarity);
  
  return character;
}
