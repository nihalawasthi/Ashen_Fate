import React, { useState, useCallback } from 'react';
import { Character } from '../types/character';
import { generateRandomCharacter } from '../utils/generateCharacter';
import Roulette from './Roulette';
import CharacterCard from './CharacterCard';
import HistoryList from './HistoryList';

const App: React.FC = () => {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [history, setHistory] = useState<Character[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = useCallback(() => {
    if (isSpinning) return; // Prevent multiple spins

    setIsSpinning(true);

    // Simulate spinning animation duration
    setTimeout(() => {
      const newCharacter = generateRandomCharacter();

      setCurrentCharacter(newCharacter);
      setHistory(prev => {
        const newHistory = [newCharacter, ...prev];
        // Keep only the last 10 characters
        return newHistory.slice(0, 10);
      });

      setIsSpinning(false);
    }, 2000); // 2 second animation
  }, [isSpinning]);

  const handleSelectFromHistory = useCallback((character: Character) => {
    setCurrentCharacter(character);
    // Scroll to character card on mobile
    const characterCardElement = document.getElementById('character-card');
    if (characterCardElement) {
      characterCardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const getRouletteValues = useCallback(() => {
    if (!currentCharacter) return undefined;

    return {
      element: currentCharacter.element,
      weapon: currentCharacter.weaponType,
      role: currentCharacter.role,
      rarity: currentCharacter.rarity
    };
  }, [currentCharacter]);

  return (
    <div className="min-h-screen bg-game-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold font-gaming text-game-accent mb-4">
            Ashen Fate Roulette
          </h1>
          <p className="text-game-text-secondary text-lg max-w-2xl mx-auto">
            Spin the wheel and generate unlimited demo characters.
            These are NOT linked to the real game – just a preview.
          </p>
        </header>

        {/* Roulette + Actions Section */}
        <div className="mb-8">
          <Roulette
            isSpinning={isSpinning}
            finalValues={getRouletteValues()}
          />

          {/* Spin Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`
                game-button text-lg px-8 py-4 text-xl font-bold
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100 transition-all duration-200
                ${isSpinning ? 'animate-pulse' : ''}
              `}
            >
              {isSpinning ? 'SPINNING...' : 'SPIN FATE'}
            </button>
          </div>
        </div>

        {/* Character Card Section */}
        <div id="character-card" className="mb-8">
          <CharacterCard character={currentCharacter} />
        </div>

        {/* History Section */}
        <div className="mb-8">
          <HistoryList
            history={history}
            onSelectCharacter={handleSelectFromHistory}
          />
        </div>

        {/* Info Section / Disclaimer */}
        <footer className="text-center">
          <div className="game-card p-6 rounded-lg border border-game-border max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-game-accent mb-3">Demo Disclaimer</h3>
            <p className="text-game-text-secondary text-sm leading-relaxed">
              This is a demo. Characters generated here are <strong>NOT saved</strong> and will
              <strong> NOT exist</strong> in the final game. The official character minting will be
              server-side and limited per person.
            </p>
            <div className="mt-4 text-xs text-game-text-secondary">
              <p>Built with React • TypeScript • Tailwind CSS</p>
              <p className="mt-1">
                Generated Characters: <span className="font-bold text-game-accent">{history.length}</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;