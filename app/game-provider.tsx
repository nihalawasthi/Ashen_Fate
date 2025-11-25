import type React from "react"
import { createContext, useState, useCallback } from "react"
import BackGround from "../src/components/BackGround"
import type { Character, RolledAttributes, RollingPhase } from "../src/types/character"
import { rollRandomAttributes, completeCharacterWithAI } from "../src/utils/generateCharacter"

export interface GameContextType {
  rollingPhase: RollingPhase
  characterName: string
  setCharacterName: (name: string) => void
  rolledValues: RolledAttributes | null
  currentCharacter: Character | null
  history: Character[]
  handleSpin: () => Promise<void>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [rollingPhase, setRollingPhase] = useState<RollingPhase>("idle")
  const [characterName, setCharacterName] = useState("")
  const [rolledValues, setRolledValues] = useState<RolledAttributes | null>(null)
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
  const [history, setHistory] = useState<Character[]>([])

  const handleSpin = useCallback(async () => {
    try {
      setRollingPhase("element")
      await new Promise((resolve) => setTimeout(resolve, 800))

      setRollingPhase("weaponType")
      await new Promise((resolve) => setTimeout(resolve, 800))

      setRollingPhase("role")
      await new Promise((resolve) => setTimeout(resolve, 800))

      setRollingPhase("rarity")
      await new Promise((resolve) => setTimeout(resolve, 800))

      setRollingPhase("stats")
      await new Promise((resolve) => setTimeout(resolve, 800))

      const rolled = rollRandomAttributes()
      setRolledValues(rolled)

      setRollingPhase("generating")
      const character = await completeCharacterWithAI(rolled, characterName)
      setCurrentCharacter(character)
      setHistory((prev) => [character, ...prev])

      setRollingPhase("complete")
      setCharacterName("")
    } catch (error) {
      console.error("[v0] Error during spin:", error)
      setRollingPhase("idle")
    }
  }, [characterName])

  return (
    <GameContext.Provider
      value={{
        rollingPhase,
        characterName,
        setCharacterName,
        rolledValues,
        currentCharacter,
        history,
        handleSpin,
      }}
    >
      <BackGround />
      {children}
    </GameContext.Provider>
  )
}
