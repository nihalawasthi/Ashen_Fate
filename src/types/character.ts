export interface CharacterStats {
  hp: number;
  atk: number;
  def: number;
  difficulty: number; // 1-10 scale
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

export type Character = {
  id: string; // random UUID or timestamp
  element: string;
  weaponType: string;
  role: string;
  rarity: number; // 3, 4, or 5
  name: string;
  title: string;
  flavorText: string;
  stats: CharacterStats;
  skills: CharacterSkills;
  seed: string; // compact string representation of core attributes
};

export type RouletteColumn = 'element' | 'weapon' | 'role' | 'rarity';

export interface RouletteValues {
  element: string;
  weapon: string;
  role: string;
  rarity: number;
}