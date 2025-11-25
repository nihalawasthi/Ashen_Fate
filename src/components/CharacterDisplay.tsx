"use client"

import React from "react"
import type { Character } from "../types/character"
import HistoryList from "./HistoryList"
import BackGround from "./BackGround"
import { RARITY_COLORS, ELEMENT_COLORS } from "../data/characterOptions"

interface CharacterDisplayProps {
  character: Character | null
  onBackToLanding: () => void
  onSpinAgain: () => void
  history: Character[]
  onSelectHistory: (c: Character) => void
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  onBackToLanding,
  onSpinAgain,
  history,
  onSelectHistory,
}) => {
  const [copied, setCopied] = React.useState(false)

  const handleShare = () => {
    if (!character) return
    const shareUrl = `${window.location.origin}/character/${character.id}?seed=${character.seed}`
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement("textarea")
        textarea.value = shareUrl
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-game-bg text-center flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">No character selected.</p>
        <button
          onClick={onBackToLanding}
          className="px-6 py-3 bg-game-accent text-game-bg font-bold rounded shadow-glow"
        >
          Return Home
        </button>
      </div>
    )
  }

  const rarityColor = RARITY_COLORS[character.rarity]
  const getElementColor = (element: string) => ELEMENT_COLORS[element as keyof typeof ELEMENT_COLORS] || "text-gray-400"

  const statOrder: (keyof typeof character.stats)[] = ["hp", "atk", "def", "speed", "em"]

  return (
    <div className="min-h-screen bg-game-bg relative">
      <BackGround />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 flex flex-wrap gap-3 justify-center">
          <button
            onClick={onBackToLanding}
            className="px-6 py-2.5 border border-game-accent text-game-accent rounded-lg hover:bg-game-accent/10 transition-all duration-200 font-semibold tracking-wider text-sm uppercase hover:scale-105"
          >
            Home
          </button>
          <button
            onClick={onSpinAgain}
            className="px-6 py-2.5 bg-game-accent text-game-bg font-bold rounded-lg hover:bg-game-accent/90 transition-all duration-200 tracking-wider text-sm uppercase hover:scale-105 shadow-lg shadow-game-accent/30"
          >
            Spin Again
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-2.5 border border-game-accent text-game-accent rounded-lg hover:bg-game-accent/10 transition-all duration-200 font-semibold tracking-wider text-sm uppercase flex items-center gap-2 hover:scale-105"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Character Identity Panel */}
          <div
            className="lg:col-span-1 bg-gradient-to-br from-game-card to-[#0f1824] rounded-lg p-8 border border-game-border shadow-2xl shadow-game-accent/20 card-entrance"
            style={{ borderColor: rarityColor + "60" }}
          >
            <div>
              <div className="text-center mb-8">
                <div
                  className="text-6xl font-gaming font-bold mb-2 card-pulse"
                  style={{ color: rarityColor, textShadow: `0 0 20px ${rarityColor}, 0 0 40px ${rarityColor}40` }}
                >
                  {character.rarity}
                </div>
                <h1 className="text-3xl font-gaming font-bold text-white mb-1 truncate">{character.name}</h1>
                <div className="text-md italic text-game-text-secondary mb-2 truncate">{character.title}</div>
                <div className="text-game-accent text-xs tracking-widest uppercase font-mono">
                  {character.className}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${getElementColor(character.element)} bg-opacity-20 border border-current`}
                >
                  {character.element}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-game-accent bg-opacity-20 text-game-accent border border-game-accent">
                  {character.weaponType}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-600 bg-opacity-20 text-green-400 border border-green-600">
                  {character.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {statOrder.map((stat) => (
                  <div
                    key={stat}
                    className="bg-[#0a0e17] bg-opacity-80 p-3 rounded border border-game-border/30 hover:border-game-accent/30 transition-colors"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-game-text-secondary uppercase tracking-wide font-mono text-xs">{stat}</span>
                      <span className="font-bold text-white">{character.stats[stat]}</span>
                    </div>
                    <div className="text-[10px] tracking-wide text-game-accent/60">
                      {character.statRanks[stat]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flavor + Skills */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Lore Section */}
            <div
              className="bg-gradient-to-br from-game-card to-[#0f1824] rounded-lg p-16 border border-game-border shadow-2xl shadow-game-accent/20 card-entrance"
              style={{ borderColor: rarityColor + "60" }}
            >
              <h2 className="text-2xl font-gaming font-bold mb-4 text-game-accent tracking-widest uppercase">Lore</h2>
              <p className="text-sm leading-relaxed text-game-text-secondary whitespace-pre-line">
                {character.flavorText}
              </p>
            </div>

            {/* Skills Section */}
            <div
              className="bg-gradient-to-br from-game-card to-[#0f1824] rounded-lg p-8 border border-game-border shadow-2xl shadow-game-accent/20 card-entrance"
              style={{ borderColor: rarityColor + "60" }}
            >
              <h2 className="text-2xl font-gaming font-bold mb-6 text-game-accent tracking-widest uppercase">
                Abilities
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#0a0e17] bg-opacity-60 p-5 rounded border border-game-border/40 hover:border-game-accent/30 hover:shadow-md hover:shadow-game-accent/20 transition-all">
                  <h3 className="font-gaming font-bold text-white mb-2 text-sm uppercase tracking-wider">
                    {character.skills.normalAttack.name}
                  </h3>
                  <p className="text-xs text-game-text-secondary leading-relaxed">
                    {character.skills.normalAttack.description}
                  </p>
                </div>
                <div className="bg-[#0a0e17] bg-opacity-60 p-5 rounded border border-game-border/40 hover:border-game-accent/30 hover:shadow-md hover:shadow-game-accent/20 transition-all">
                  <h3 className="font-gaming font-bold text-white mb-2 text-sm uppercase tracking-wider">
                    {character.skills.skill.name}
                  </h3>
                  <p className="text-xs text-game-text-secondary leading-relaxed">
                    {character.skills.skill.description}
                  </p>
                </div>
                <div className="bg-[#0a0e17] bg-opacity-60 p-5 rounded border border-game-border/40 hover:border-game-accent/30 hover:shadow-md hover:shadow-game-accent/20 transition-all">
                  <h3 className="font-gaming font-bold text-white mb-2 text-sm uppercase tracking-wider">
                    {character.skills.burst.name}
                  </h3>
                  <p className="text-xs text-game-text-secondary leading-relaxed">
                    {character.skills.burst.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="mt-16 mb-8">
          <HistoryList history={history} onSelectCharacter={onSelectHistory} />
        </div>

        <div className="text-center text-xs text-game-text-secondary font-mono tracking-widest">
          Generated: {history.length} • Demo Mode
        </div>
      </div>
    </div>
  )
}

export default CharacterDisplay
