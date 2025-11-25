import React from 'react';
import { Character } from '../types/character';
import { ELEMENT_COLORS } from '../data/characterOptions';

interface HistoryListProps {
  history: Character[];
  onSelectCharacter: (character: Character) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectCharacter }) => {
  const getRarityStars = (rarity: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rarity
            ? (rarity === 5 ? 'text-yellow-400' :
               rarity === 4 ? 'text-purple-400' : 'text-blue-400')
            : 'text-gray-600'
        }`}
      >
        ★
      </span>
    ));
  };

  const getElementColor = (element: string) => {
    return ELEMENT_COLORS[element as keyof typeof ELEMENT_COLORS] || 'text-gray-500';
  };

  if (history.length === 0) {
    return (
      <div className="game-card p-6 rounded-lg shadow-xl border border-game-border text-center">
        <div className="text-game-text-secondary">
          No characters generated yet. Spin the roulette to build your collection!
        </div>
      </div>
    );
  }

  return (
    <div className="game-card p-6 rounded-lg shadow-xl border border-game-border">
      <h2 className="text-xl font-bold text-game-accent mb-4 text-center">
        Recent Characters (Last 10)
      </h2>

      {/* Mobile: Vertical stack, Desktop: Horizontal scroll */}
      <div className="space-y-3 sm:space-y-0 sm:overflow-x-auto sm:pb-2">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          {history.map((character) => (
            <div
              key={character.id}
              onClick={() => onSelectCharacter(character)}
              className={`
                game-card p-4 cursor-pointer transition-all duration-200 hover:scale-105
                min-w-0 sm:min-w-64 sm:flex-shrink-0 border border-game-border
                hover:border-game-accent hover:shadow-lg
              `}
            >
              {/* Mini Card Header */}
              <div className="text-center mb-3">
                <div className="font-bold text-game-text truncate">
                  {character.name}
                </div>
                <div className="text-xs text-game-text-secondary truncate">
                  {character.title}
                </div>
                <div className="flex justify-center mt-1">
                  {getRarityStars(character.rarity)}
                </div>
              </div>

              {/* Mini Card Badges */}
              <div className="flex flex-wrap justify-center gap-1 mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getElementColor(character.element)} bg-opacity-20 border border-current`}>
                  {character.element}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-game-accent bg-opacity-20 text-game-accent border border-game-accent">
                  {character.weaponType}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-20 text-green-400 border border-green-600">
                  {character.role}
                </span>
              </div>

              {/* Mini Stats Preview */}
              <div className="grid grid-cols-3 gap-1 text-center text-xs">
                <div>
                  <div className="text-game-text-secondary">HP</div>
                  <div className="font-bold font-gaming text-red-400">{character.stats.hp}</div>
                </div>
                <div>
                  <div className="text-game-text-secondary">ATK</div>
                  <div className="font-bold font-gaming text-orange-400">{character.stats.atk}</div>
                </div>
                <div>
                  <div className="text-game-text-secondary">DEF</div>
                  <div className="font-bold font-gaming text-blue-400">{character.stats.def}</div>
                </div>
              </div>

              {/* Click indicator */}
              <div className="text-center text-xs text-game-text-secondary mt-2">
                Click to view
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History note */}
      <div className="text-center text-xs text-game-text-secondary mt-4">
        History shows last {history.length} generated characters
      </div>
    </div>
  );
};

export default HistoryList;