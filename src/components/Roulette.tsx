import React, { useEffect, useState } from 'react';
import { RouletteValues } from '../types/character';
import { ELEMENTS, WEAPON_TYPES, ROLES } from '../data/characterOptions';

interface RouletteProps {
  isSpinning: boolean;
  finalValues?: RouletteValues;
}

const Roulette: React.FC<RouletteProps> = ({ isSpinning, finalValues }) => {
  const [currentValues, setCurrentValues] = useState<RouletteValues>({
    element: 'Fire',
    weapon: 'Sword',
    role: 'DPS',
    rarity: 3
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isSpinning) {
      interval = setInterval(() => {
        setCurrentValues({
          element: ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)],
          weapon: WEAPON_TYPES[Math.floor(Math.random() * WEAPON_TYPES.length)],
          role: ROLES[Math.floor(Math.random() * ROLES.length)],
          rarity: Math.floor(Math.random() * 3) + 3 // 3, 4, or 5
        });
      }, 100);
    } else if (finalValues) {
      setCurrentValues(finalValues);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSpinning, finalValues]);

  const renderStars = (rarity: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span
        key={i}
        className={`text-xl transition-all duration-300 ${
          i < rarity ? 'text-yellow-400' : 'text-gray-600'
        }`}
      >
        ★
      </span>
    ));
  };

  const getColumnClassName = (isSpinning: boolean) => `
    game-card p-4 text-center transition-all duration-300
    ${isSpinning ? 'animate-pulse border-game-accent' : 'border-game-border'}
    border rounded-lg flex-1 mx-1
  `;

  return (
    <div className="bg-game-card p-6 rounded-lg shadow-xl border border-game-border">
      <h2 className="text-2xl font-gaming font-bold text-center mb-6 text-game-accent">
        Fate Roulette
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Element Column */}
        <div className={getColumnClassName(isSpinning)}>
          <div className="text-xs font-semibold text-game-text-secondary uppercase tracking-wider mb-2">
            Element
          </div>
          <div className={`text-lg font-bold capitalize transition-all duration-300 ${
            isSpinning ? 'animate-pulse text-game-accent' : 'text-game-text'
          }`}>
            {currentValues.element}
          </div>
        </div>

        {/* Weapon Column */}
        <div className={getColumnClassName(isSpinning)}>
          <div className="text-xs font-semibold text-game-text-secondary uppercase tracking-wider mb-2">
            Weapon
          </div>
          <div className={`text-lg font-bold capitalize transition-all duration-300 ${
            isSpinning ? 'animate-pulse text-game-accent' : 'text-game-text'
          }`}>
            {currentValues.weapon}
          </div>
        </div>

        {/* Role Column */}
        <div className={getColumnClassName(isSpinning)}>
          <div className="text-xs font-semibold text-game-text-secondary uppercase tracking-wider mb-2">
            Role
          </div>
          <div className={`text-lg font-bold uppercase transition-all duration-300 ${
            isSpinning ? 'animate-pulse text-game-accent' : 'text-game-text'
          }`}>
            {currentValues.role}
          </div>
        </div>

        {/* Rarity Column */}
        <div className={getColumnClassName(isSpinning)}>
          <div className="text-xs font-semibold text-game-text-secondary uppercase tracking-wider mb-2">
            Rarity
          </div>
          <div className="flex justify-center space-x-1 transition-all duration-300">
            {renderStars(currentValues.rarity)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roulette;