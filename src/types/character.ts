export interface CharacterStats {
  hp: number;
  atk: number;
  def: number;
  speed: number;
  em: number; // Elemental Mastery
}

export interface StatRank {
  hp: string; // 'divine' | 'excellent' | 'good' | 'average' | 'below average'
  atk: string;
  def: string;
  speed: string;
  em: string;
}

export interface CharacterSkill {
  name: string;
  description: string;
}

export interface CharacterSkills {
  normalAttack: CharacterSkill;
  skill: CharacterSkill;
  burst: CharacterSkill;
}

export type RarityGrade = 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

// Attributes that are rolled
export interface RolledAttributes {
  element: string;
  weaponType: string;
  role: string;
  rarity: RarityGrade;
  stats: CharacterStats;
  statRanks: StatRank;
}

// Full character including AI-generated content
export type Character = {
  id: string;
  element: string;
  weaponType: string;
  role: string;
  rarity: RarityGrade;
  name: string; // User-provided name
  title: string; // AI-generated
  className: string; // AI-generated
  flavorText: string;
  stats: CharacterStats;
  statRanks: StatRank;
  skills: CharacterSkills;
  seed: string;
};

export type RouletteColumn = 'element' | 'weaponType' | 'role' | 'rarity' | 'stats';

export interface RouletteValues {
  element?: string;
  weaponType?: string;
  role?: string;
  rarity?: RarityGrade;
}

export type RollingPhase = 'idle' | 'element' | 'weaponType' | 'role' | 'rarity' | 'stats' | 'generating' | 'complete';
