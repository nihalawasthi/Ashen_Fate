import { ELEMENTS, WEAPON_TYPES, ROLES } from '../data/characterOptions';
import type { RarityGrade } from '../types/character';

// Build code maps from first 3 letters used in seed
const elementCodeMap: Record<string, string> = Object.fromEntries(
  ELEMENTS.map(e => [e.substring(0,3).toUpperCase(), e])
);
const weaponCodeMap: Record<string, string> = Object.fromEntries(
  WEAPON_TYPES.map(w => [w.substring(0,3).toUpperCase(), w])
);
const roleCodeMap: Record<string, string> = Object.fromEntries(
  ROLES.map(r => [r.substring(0,3).toUpperCase(), r])
);

export interface ParsedSeed {
  rarity: RarityGrade;
  element: string;
  weaponType: string;
  role: string;
  timestamp: number;
}

export function parseSeed(seed: string): ParsedSeed | null {
  // Expected format: RARITY-ELE-WEA-ROL-timestamp
  const parts = seed.split('-');
  if (parts.length < 5) return null;
  const [rarityRaw, elementCode, weaponCode, roleCode, timestampRaw] = parts;
  if (!rarityRaw || !elementCode || !weaponCode || !roleCode || !timestampRaw) return null;
  if (!['SS','S','A','B','C','D','E'].includes(rarityRaw)) return null;
  const element = elementCodeMap[elementCode.toUpperCase()];
  const weaponType = weaponCodeMap[weaponCode.toUpperCase()];
  const role = roleCodeMap[roleCode.toUpperCase()];
  const timestamp = Number(timestampRaw);
  if (!element || !weaponType || !role || Number.isNaN(timestamp)) return null;
  return { rarity: rarityRaw as RarityGrade, element, weaponType, role, timestamp };
}
