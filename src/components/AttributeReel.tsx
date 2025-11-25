"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface AttributeReelProps {
  label: string
  options: string[]
  target?: string
  active: boolean
  locked: boolean
  highlightColor?: string
}

const AttributeReel: React.FC<AttributeReelProps> = ({ label, options, target, active, locked, highlightColor }) => {
  const [displayValue, setDisplayValue] = useState<string>("???")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (locked) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (target) setDisplayValue(target)
      return
    }

    if (active) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        const next = options[Math.floor(Math.random() * options.length)]
        setDisplayValue(next)
      }, 80)
    } else {
      if (!locked && !target) setDisplayValue("???")
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [active, locked, target, options])

  const isRolling = active && !locked
  const isLockedState = locked

  return (
    <div
      className={`
        relative group transition-all duration-300
        ${
          isRolling
            ? "bg-gradient-to-br from-game-accent/20 to-game-accent/10 border border-game-accent/60 scale-105 shadow-lg shadow-game-accent/30"
            : isLockedState
              ? "bg-gradient-to-br from-game-card to-[#0f1824] border border-game-accent/40 shadow-md shadow-game-accent/20"
              : "bg-game-card border border-game-border hover:border-game-border/60 hover:scale-102"
        }
        rounded-lg p-4 text-center
      `}
      style={
        isLockedState && highlightColor
          ? {
              boxShadow: `0 0 20px ${highlightColor}40, 0 0 40px ${highlightColor}20`,
            }
          : {}
      }
    >
      {/* Label */}
      <div className="text-xs font-semibold text-game-text-secondary uppercase tracking-widest mb-3 font-mono">
        {label}
      </div>

      {/* Value Display */}
      <div
        className={`transition-all duration-300 font-gaming ${label === "Rank" ? "text-3xl" : "text-2xl"} font-bold ${
          isRolling ? "text-game-accent scale-110 animate-pulse" : isLockedState ? "text-game-text" : "text-gray-500"
        }`}
        style={
          label === "Rank" && isLockedState
            ? {
                color: highlightColor,
                textShadow: `0 0 15px ${highlightColor}, 0 0 30px ${highlightColor}30`,
              }
            : {}
        }
      >
        {displayValue}
      </div>

      {/* Scanning indicator for rank */}
      {label === "Rank" && isRolling && (
        <div className="mt-2 text-[10px] tracking-widest text-game-accent animate-pulse font-mono">SCANNING...</div>
      )}

      {/* Locked indicator */}
      {isLockedState && <div className="mt-2 text-[10px] text-game-accent/60 tracking-widest font-mono">LOCKED</div>}

      {/* Hover glow effect for future phases */}
      {!isRolling && !isLockedState && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-game-accent/0 via-game-accent/5 to-game-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  )
}

export default AttributeReel
