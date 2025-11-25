"use client"

import type React from "react"
import type { Character, RarityGrade } from "../types/character"
import { ELEMENT_COLORS, RARITY_COLORS } from "../data/characterOptions"

interface HistoryListProps {
  history: Character[]
  onSelectCharacter: (character: Character) => void
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectCharacter }) => {
  const getRarityColor = (rarity: RarityGrade) => RARITY_COLORS[rarity]
  const getElementColor = (element: string) => ELEMENT_COLORS[element as keyof typeof ELEMENT_COLORS] || "text-gray-500"

  if (!history.length) {
    return (
      <div className="text-center text-game-text-secondary py-10">
        <p>No characters summoned yet...</p>
      </div>
    )
  }

  return (
    <div className="space-y-10 fade-in">
      <div className="text-center">
        <h2 className="text-5xl font-gaming font-bold mb-3 tracking-widest text-white">
          SUMMONED <span className="text-game-accent">LEGENDS</span>
        </h2>
        <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-game-accent to-transparent mx-auto mb-4" />
        <p className="text-sm text-game-text-secondary font-mono tracking-wide">
          Last {Math.min(history.length, 10)} legendary characters forged
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {history.map((character, idx) => (
          <div
            key={character.id}
            onClick={() => onSelectCharacter(character)}
            className="group relative cursor-pointer transition-all duration-300 card-entrance"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Card background */}
            <div
              className="bg-gradient-to-br from-game-card to-[#0f1824] rounded-lg p-6 border transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl h-full flex flex-col"
              style={{
                borderColor: getRarityColor(character.rarity) + "60",
                boxShadow: `0 0 20px ${getRarityColor(character.rarity)}30`,
              }}
            >
              {/* Rarity badge */}
              <div className="flex justify-center mb-4">
                <span
                  className="text-3xl font-bold font-gaming px-6 py-2 rounded-lg border-2 transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: getRarityColor(character.rarity),
                    borderColor: getRarityColor(character.rarity),
                    background: `${getRarityColor(character.rarity)}20`,
                    textShadow: `0 0 15px ${getRarityColor(character.rarity)}, 0 0 30px ${getRarityColor(character.rarity)}40`,
                    boxShadow: `0 0 20px ${getRarityColor(character.rarity)}40`,
                  }}
                >
                  {character.rarity}
                </span>
              </div>

              {/* Character name and title */}
              <h3 className="text-lg font-bold text-white font-gaming truncate text-center group-hover:text-game-accent transition-colors">
                {character.name}
              </h3>
              <p className="text-xs text-game-text-secondary italic truncate text-center mt-1">{character.title}</p>
              <p className="text-[10px] text-game-accent mt-2 tracking-widest uppercase font-mono text-center font-bold">
                {character.className}
              </p>

              {/* Attribute badges */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-4 mb-4">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${getElementColor(character.element)} bg-opacity-20 border border-current transition-all hover:scale-110`}
                >
                  {character.element}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-game-accent bg-opacity-20 text-game-accent border border-game-accent transition-all hover:scale-110">
                  {character.weaponType}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-600 bg-opacity-20 text-green-300 border border-green-600 transition-all hover:scale-110">
                  {character.role}
                </span>
              </div>

              {/* Stat bars */}
              <div className="grid grid-cols-3 gap-1.5 flex-grow">
                <div className="bg-[#0a0e17] bg-opacity-60 p-2.5 rounded border border-red-600/30 group-hover:border-red-600/60 transition-all">
                  <div className="text-gray-400 font-mono text-[9px] mb-1">HP</div>
                  <div className="font-bold text-red-400 font-gaming text-sm">{character.stats.hp}</div>
                </div>
                <div className="bg-[#0a0e17] bg-opacity-60 p-2.5 rounded border border-orange-600/30 group-hover:border-orange-600/60 transition-all">
                  <div className="text-gray-400 font-mono text-[9px] mb-1">ATK</div>
                  <div className="font-bold text-orange-400 font-gaming text-sm">{character.stats.atk}</div>
                </div>
                <div className="bg-[#0a0e17] bg-opacity-60 p-2.5 rounded border border-blue-600/30 group-hover:border-blue-600/60 transition-all">
                  <div className="text-gray-400 font-mono text-[9px] mb-1">DEF</div>
                  <div className="font-bold text-blue-400 font-gaming text-sm">{character.stats.def}</div>
                </div>
              </div>

              {/* Click indicator */}
              <div className="text-center text-[9px] text-game-text-secondary font-mono group-hover:text-game-accent transition-colors mt-3">
                Click to view
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryList
