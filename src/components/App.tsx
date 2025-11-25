import type React from "react"
import { useState, useCallback, useEffect, useMemo } from "react"
import type { Character, RollingPhase } from "../types/character"
import { Routes, Route, useNavigate, useParams, useSearchParams } from "react-router-dom"
import {
  completeCharacterWithAI,
  getRandomElement,
  getRandomWeightedRarity,
  rollRandomAttributes,
} from "../utils/generateCharacter"
import { ELEMENTS, WEAPON_TYPES, ROLES } from "../data/characterOptions"
import Roulette from "./Roulette"
import Landing from "./Landing"
import CharacterDisplay from "./CharacterDisplay"
import GachaAnimation from "./GachaAnimation"
import NotFound from "./NotFound"
import { parseSeed } from "../utils/seed"

const App: React.FC = () => {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
  const [history, setHistory] = useState<Character[]>([])
  const [rollingPhase, setRollingPhase] = useState<RollingPhase>("idle")
  const [characterName, setCharacterName] = useState<string>("")
  const [rolledValues, setRolledValues] = useState<{
    element?: string
    weaponType?: string
    role?: string
    rarity?: import("../types/character").RarityGrade
  }>({})
  const navigate = useNavigate()

  // Load persisted
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("af_history")
      const savedCharacter = localStorage.getItem("af_current")
      if (savedHistory) setHistory(JSON.parse(savedHistory))
      if (savedCharacter) setCurrentCharacter(JSON.parse(savedCharacter))
    } catch (e) {
      /* ignore */
    }
  }, [])

  // Persist on changes
  useEffect(() => {
    try {
      localStorage.setItem("af_history", JSON.stringify(history))
    } catch (e) {
      /* ignore */
    }
  }, [history])
  useEffect(() => {
    try {
      if (currentCharacter) {
        localStorage.setItem("af_current", JSON.stringify(currentCharacter))
      }
    } catch (e) {
      /* ignore */
    }
  }, [currentCharacter])

  // Easing helper (easeOutCubic)
  const easingWait = (ms: number) =>
    new Promise<void>((resolve) => {
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms)
        const eased = 1 - Math.pow(1 - t, 3)
        if (eased < 1) requestAnimationFrame(step)
        else resolve()
      }
      requestAnimationFrame(step)
    })

  const phaseDurations: Record<string, number> = {
    element: 900,
    weaponType: 850,
    role: 850,
    rarity: 1200,
    stats: 500,
  }

  const handleSpin = useCallback(async () => {
    if (rollingPhase !== "idle" && rollingPhase !== "complete") return
    navigate("/roll")
    setCharacterName("")
    setRolledValues({})

    setRollingPhase("element")
    await easingWait(phaseDurations.element)
    const element = getRandomElement(ELEMENTS)
    setRolledValues((prev) => ({ ...prev, element }))

    setRollingPhase("weaponType")
    await easingWait(phaseDurations.weaponType)
    const weaponType = getRandomElement(WEAPON_TYPES)
    setRolledValues((prev) => ({ ...prev, weaponType }))

    setRollingPhase("role")
    await easingWait(phaseDurations.role)
    const role = getRandomElement(ROLES)
    setRolledValues((prev) => ({ ...prev, role }))

    setRollingPhase("rarity")
    await easingWait(phaseDurations.rarity)
    const rarity = getRandomWeightedRarity()
    setRolledValues((prev) => ({ ...prev, rarity }))

    setRollingPhase("stats")
    await easingWait(phaseDurations.stats)
    const rolled = rollRandomAttributes()
    rolled.element = element
    rolled.weaponType = weaponType
    rolled.role = role
    rolled.rarity = rarity

    setRollingPhase("generating")
    try {
      const newCharacter = await completeCharacterWithAI(rolled, characterName || "Unnamed Hero")
      setCurrentCharacter(newCharacter)
      setHistory((prev) => [newCharacter, ...prev].slice(0, 10))
      setRollingPhase("complete")
      navigate(`/character/${newCharacter.id}`)
    } catch (error) {
      console.error("Failed to generate character:", error)
      setRollingPhase("idle")
    }
  }, [rollingPhase])

  // Legacy handler no longer required (history selection handled inside views)

  const rouletteValues = rolledValues

  // Character lookup map for memo efficiency
  const characterMap = useMemo(() => {
    const map: Record<string, Character> = {}
    history.forEach((c) => {
      map[c.id] = c
    })
    if (currentCharacter) map[currentCharacter.id] = currentCharacter
    return map
  }, [history, currentCharacter])

  // Deep link character page wrapper
  const CharacterPage: React.FC = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const seedParam = searchParams.get("seed")
    const found = id ? characterMap[id] : undefined

    // If we have id but not found attempt hydration from localStorage (one-time)
    useEffect(() => {
      if (id && !found) {
        try {
          const savedHistory = localStorage.getItem("af_history")
          const savedCharacter = localStorage.getItem("af_current")
          const tempList: Character[] = []
          if (savedHistory) tempList.push(...JSON.parse(savedHistory))
          if (savedCharacter) {
            const parsed = JSON.parse(savedCharacter)
            if (parsed?.id) tempList.push(parsed)
          }
          const match = tempList.find((c) => c.id === id)
          if (match) {
            setCurrentCharacter(match)
            setHistory((prev) => (prev.find((p) => p.id === match.id) ? prev : [match, ...prev].slice(0, 10)))
            return
          }
          // Attempt seed hydration
          if (seedParam) {
            const parsedSeed = parseSeed(seedParam)
            if (parsedSeed) {
              const { element, weaponType, role, rarity, timestamp } = parsedSeed
              const rolled = rollRandomAttributes(timestamp)
              rolled.element = element
              rolled.weaponType = weaponType
              rolled.role = role
              rolled.rarity = rarity
              completeCharacterWithAI(rolled, "Seed Hero")
                .then((newCharacter) => {
                  if (id) newCharacter.id = id // enforce id from URL
                  setCurrentCharacter(newCharacter)
                  setHistory((prev) => [newCharacter, ...prev].slice(0, 10))
                })
                .catch(() => {
                  /* ignore */
                })
            }
          }
        } catch (e) {
          /* ignore */
        }
      }
    }, [id, found, seedParam])

    const character = found || currentCharacter

    if (!character && !seedParam) {
      return <NotFound />
    }
    return (
      <CharacterDisplay
        character={character || null}
        history={history}
        onSelectHistory={(c) => navigate(`/character/${c.id}`)}
        onBackToLanding={() => navigate("/")}
        onSpinAgain={() => {
          setRollingPhase("idle")
          handleSpin()
        }}
      />
    )
  }

  // Rolling view component
  const RollingView: React.FC = () => {
    const isSpinning = rollingPhase !== "idle" && rollingPhase !== "complete"
    return (
      <div className="min-h-screen bg-game-bg py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-5xl sm:text-6xl font-bold font-gaming text-game-accent mb-3 tracking-widest">
                ASHEN FATE
              </h1>
              <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-game-accent to-transparent mx-auto"></div>
            </div>
            <p className="text-game-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Spin the wheel of destiny and generate legendary characters. Each roll reveals unique abilities and rarity
              tiers.
            </p>
          </header>

          {/* Main content container with improved spacing */}
          <div className="mb-12">
            <Roulette rollingPhase={rollingPhase} finalValues={rouletteValues} />
            <div className="mt-12 px-2 sm:px-6">
              <GachaAnimation
                items={["SS", "S", "A", "B", "C", "D", "E"]}
                target={currentCharacter?.rarity}
                active={rollingPhase === "rarity" || rollingPhase === "stats" || rollingPhase === "generating"}
              />
            </div>

            {/* Name input section with enhanced styling */}
            <div className="mt-12 bg-gradient-to-b from-game-card/80 to-[#0f1824]/80 rounded-xl p-8 border border-game-border shadow-2xl shadow-game-accent/15 backdrop-blur-sm">
              <label
                htmlFor="character-name"
                className="block text-center font-gaming text-lg font-semibold text-game-accent mb-4 tracking-widest uppercase"
              >
                Name Your Legend
              </label>
              <div className="flex flex-col items-center gap-4">
                <input
                  id="character-name"
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Enter a legendary name..."
                  disabled={isSpinning}
                  maxLength={30}
                  className="
                    px-6 py-3 bg-[#0a0e17]/60 border-2 border-game-border rounded-lg
                    text-game-text text-center font-medium backdrop-blur-sm
                    focus:outline-none focus:border-game-accent focus:ring-2 focus:ring-game-accent/50
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200 hover:border-game-border/80
                    max-w-md w-full placeholder:text-game-text-secondary/40
                  "
                />
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className={`
                    game-button text-lg px-12 py-4 font-bold uppercase tracking-widest
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:hover:scale-100 transition-all duration-200 shadow-xl
                    ${isSpinning ? "animate-pulse shadow-2xl shadow-game-accent/50" : "hover:shadow-2xl"}
                  `}
                >
                  {isSpinning ? "⟳ SPINNING FATE" : rollingPhase === "complete" ? "SPIN AGAIN" : "SPIN FATE"}
                </button>
              </div>
            </div>

            <div className="text-center mt-10 text-xs text-game-text-secondary font-mono tracking-widest uppercase">
              {isSpinning ? "◆ Destiny Weaving ◆" : `${history.length} legends forged`}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // removed unused isSpinning at root scope (handled inside RollingView)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            onStartSpin={() => {
              setRollingPhase("idle")
              handleSpin()
            }}
            history={history}
            onSelectCharacter={(c) => navigate(`/character/${c.id}`)}
          />
        }
      />
      <Route path="/roll" element={<RollingView />} />
      <Route path="/character/:id" element={<CharacterPage />} />
    </Routes>
  )
}

export default App
