import type React from "react"
import type { RouletteValues, RollingPhase } from "../types/character"
import { ELEMENTS, WEAPON_TYPES, ROLES, RARITY_GRADES, RARITY_COLORS } from "../data/characterOptions"
import AttributeReel from "./AttributeReel"

interface RouletteProps {
  rollingPhase: RollingPhase
  finalValues?: RouletteValues
}

const Roulette: React.FC<RouletteProps> = ({ rollingPhase, finalValues }) => {
  const order: (keyof RouletteValues)[] = ["element", "weaponType", "role", "rarity"]

  const isLocked = (key: keyof RouletteValues): boolean => {
    if (["stats", "generating", "complete"].includes(rollingPhase)) return true
    const phaseIndex = order.indexOf(rollingPhase as keyof RouletteValues)
    const keyIndex = order.indexOf(key)
    return keyIndex < phaseIndex
  }

  const isActive = (key: keyof RouletteValues): boolean => rollingPhase === key

  const rarityColor = finalValues?.rarity ? RARITY_COLORS[finalValues.rarity] : undefined

  const statusMessages = {
    idle: "Ready to spin the wheel of fate",
    element: "Rolling element attribute...",
    weaponType: "Rolling weapon type...",
    role: "Rolling role archetype...",
    rarity: "Determining rarity grade...",
    stats: "Calculating power metrics...",
    generating: "AI generating character...",
    complete: "Character generated!",
  }

  return (
    <div className="w-full card-entrance">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold font-gaming text-game-accent mb-3 tracking-widest animate-glow">
          FATE ROULETTE
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-game-accent to-transparent mx-auto mb-4"></div>
        <p className="text-game-text-secondary text-sm font-mono tracking-wide">Spin to forge your destiny</p>
      </div>

      {/* Attribute Reels Container */}
      <div className="bg-gradient-to-br from-game-card to-[#0f1824] rounded-xl p-8 border border-game-border shadow-2xl shadow-game-accent/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <AttributeReel
            label="Element"
            options={ELEMENTS}
            target={isLocked("element") ? finalValues?.element : undefined}
            active={isActive("element")}
            locked={isLocked("element")}
          />
          <AttributeReel
            label="Weapon"
            options={WEAPON_TYPES}
            target={isLocked("weaponType") ? finalValues?.weaponType : undefined}
            active={isActive("weaponType")}
            locked={isLocked("weaponType")}
          />
          <AttributeReel
            label="Role"
            options={ROLES}
            target={isLocked("role") ? finalValues?.role : undefined}
            active={isActive("role")}
            locked={isLocked("role")}
          />
          <AttributeReel
            label="Rank"
            options={RARITY_GRADES as unknown as string[]}
            target={isLocked("rarity") ? finalValues?.rarity : undefined}
            active={isActive("rarity")}
            locked={isLocked("rarity")}
            highlightColor={rarityColor}
          />
        </div>

        {/* Status Display */}
        <div className="mt-8 pt-6 border-t border-game-border/30">
          <p className="text-sm text-game-text-secondary font-mono tracking-widest transition-all duration-300 uppercase">
            {statusMessages[rollingPhase as keyof typeof statusMessages]}
          </p>
          {(rollingPhase === "generating" || rollingPhase === "stats") && (
            <div className="mt-4 flex justify-center gap-2">
              <span
                className="w-2 h-2 bg-game-accent rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-2 h-2 bg-game-accent rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-2 h-2 bg-game-accent rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Roulette
