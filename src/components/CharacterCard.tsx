import React, { useState } from 'react';
import { Character } from '../types/character';
import { copyToClipboard } from '../utils/clipboard';
import { ELEMENT_COLORS } from '../data/characterOptions';

interface CharacterCardProps {
  character: Character | null;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopySeed = async () => {
    if (character) {
      const success = await copyToClipboard(character.seed);
      if (success) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    }
  };

  const getRarityColor = (rarity: number) => {
    switch (rarity) {
      case 3: return 'rarity-3-bg';
      case 4: return 'rarity-4-bg';
      case 5: return 'rarity-5-bg';
      default: return 'rarity-3-bg';
    }
  };

  const getElementColor = (element: string) => {
    return ELEMENT_COLORS[element as keyof typeof ELEMENT_COLORS] || 'text-gray-500';
  };

  if (!character) {
    return (
      <div className="game-card p-8 rounded-lg shadow-xl border border-game-border text-center">
        <div className="text-game-text-secondary text-lg">
          Spin the roulette to generate your first character!
        </div>
      </div>
    );
  }

  return (
    <div className={`game-card p-6 rounded-lg shadow-xl border-2 overflow-hidden relative ${getRarityColor(character.rarity)}`}>
      {/* Rarity indicator border glow */}
      <div className={`absolute inset-0 opacity-20 ${
        character.rarity === 5 ? 'bg-yellow-400' :
        character.rarity === 4 ? 'bg-purple-400' : 'bg-blue-400'
      }`} />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-gaming text-game-text mb-2">
            {character.name}
          </h2>
          <div className="text-lg text-game-text-secondary italic">
            {character.title}
          </div>
          <div className="flex justify-center mt-3">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-2xl ${
                  i < character.rarity
                    ? (character.rarity === 5 ? 'text-yellow-400' :
                       character.rarity === 4 ? 'text-purple-400' : 'text-blue-400')
                    : 'text-gray-600'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className={`rarity-badge ${getElementColor(character.element)} bg-opacity-20 border border-current`}>
            {character.element}
          </span>
          <span className="rarity-badge bg-game-accent bg-opacity-20 text-game-accent border border-game-accent">
            {character.weaponType}
          </span>
          <span className="rarity-badge bg-green-600 bg-opacity-20 text-green-400 border border-green-600">
            {character.role}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-game-bg bg-opacity-50 rounded">
            <div className="text-xs text-game-text-secondary uppercase">HP</div>
            <div className="text-xl font-bold font-gaming text-red-400">{character.stats.hp}</div>
          </div>
          <div className="text-center p-3 bg-game-bg bg-opacity-50 rounded">
            <div className="text-xs text-game-text-secondary uppercase">ATK</div>
            <div className="text-xl font-bold font-gaming text-orange-400">{character.stats.atk}</div>
          </div>
          <div className="text-center p-3 bg-game-bg bg-opacity-50 rounded">
            <div className="text-xs text-game-text-secondary uppercase">DEF</div>
            <div className="text-xl font-bold font-gaming text-blue-400">{character.stats.def}</div>
          </div>
          <div className="text-center p-3 bg-game-bg bg-opacity-50 rounded">
            <div className="text-xs text-game-text-secondary uppercase">Difficulty</div>
            <div className="text-xl font-bold font-gaming text-purple-400">{character.stats.difficulty}/10</div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-game-accent mb-4 text-center">Skills</h3>
          <div className="space-y-3">
            {/* Normal Attack */}
            <div className="bg-game-bg bg-opacity-30 p-3 rounded">
              <div className="font-semibold text-green-400 mb-1">
                Normal Attack: {character.skills.normalAttack.name}
              </div>
              <div className="text-sm text-game-text-secondary">
                {character.skills.normalAttack.description}
              </div>
            </div>

            {/* Skill */}
            <div className="bg-game-bg bg-opacity-30 p-3 rounded">
              <div className="font-semibold text-blue-400 mb-1">
                Skill: {character.skills.skill.name}
              </div>
              <div className="text-sm text-game-text-secondary">
                {character.skills.skill.description}
              </div>
            </div>

            {/* Burst */}
            <div className="bg-game-bg bg-opacity-30 p-3 rounded">
              <div className="font-semibold text-purple-400 mb-1">
                Burst: {character.skills.burst.name}
              </div>
              <div className="text-sm text-game-text-secondary">
                {character.skills.burst.description}
              </div>
            </div>
          </div>
        </div>

        {/* Flavor Text */}
        <div className="text-center mb-4 text-game-text-secondary italic text-sm">
          {character.flavorText}
        </div>

        {/* Seed Section */}
        <div className="bg-game-bg bg-opacity-50 p-3 rounded flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs text-game-text-secondary uppercase mb-1">Seed</div>
            <div className="font-mono text-sm text-game-text truncate">
              {character.seed.substring(0, 30)}...
            </div>
          </div>
          <button
            onClick={handleCopySeed}
            className="ml-4 px-4 py-2 bg-game-accent hover:bg-opacity-80 text-white rounded transition-all duration-200 text-sm font-semibold"
          >
            {copySuccess ? 'Copied!' : 'Copy Seed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;