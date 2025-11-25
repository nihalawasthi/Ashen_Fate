import React, { useEffect, useRef, useState } from "react"

interface GachaAnimationProps {
  items: string[]
  target?: string
  active: boolean
}

const GachaAnimation: React.FC<GachaAnimationProps> = ({ items, target, active }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [landed, setLanded] = useState(false)

  useEffect(() => {
    if (active && target && containerRef.current) {
      setIsAnimating(true)
      setLanded(false)
      const el = containerRef.current

      let velocity = 35
      let frame = 0

      const targetIndex = items.indexOf(target)
      if (targetIndex === -1) {
        setIsAnimating(false)
        return
      }

      const animation = () => {
        if (!isAnimating) return
        frame++
        velocity *= 0.975
        el.scrollLeft += velocity

        if (velocity < 2) {
          const cardWidth = el.firstElementChild?.clientWidth || 100
          const targetOffset = targetIndex * cardWidth
          const centerOffset = targetOffset - (el.clientWidth - cardWidth) / 2
          const diff = centerOffset - el.scrollLeft

          el.scrollLeft += diff * 0.15

          if (Math.abs(diff) < 2) {
            setIsAnimating(false)
            setLanded(true)
            return
          }
        }
        requestAnimationFrame(animation)
      }
      requestAnimationFrame(animation)
      return () => setIsAnimating(false)
    }
  }, [active, target, items, isAnimating])

  const displayItems = React.useMemo(() => {
    const repeated = [...items, ...items, ...items, ...items]
    return repeated
  }, [items])

  return (
    <div className="w-full fade-in card-entrance">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-gaming font-bold text-game-accent tracking-widest drop-shadow-lg">
          RARITY REVEAL
        </h3>
        <div className="h-0.5 w-16 bg-game-accent/50 mx-auto mt-2"></div>
      </div>

      {/* Roulette Container */}
      <div className="relative">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden bg-gradient-to-b from-game-card to-[#0f1824] border border-game-border rounded-lg shadow-2xl shadow-game-accent/20 py-6 scroll-smooth"
          style={{ height: 140 }}
        >
          <div className="flex" style={{ width: displayItems.length * 160 }}>
            {displayItems.map((r, i) => {
              const highlighted = r === target && landed
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center w-40 transition-all duration-300 ${
                    highlighted ? "scale-125 brightness-150" : "opacity-50 hover:opacity-70"
                  } ${r === target && !landed ? "animate-pulse" : ""}`}
                >
                  <div
                    className={`text-4xl font-gaming font-bold tracking-wider ${
                      highlighted ? "text-game-accent" : "text-gray-600"
                    }`}
                    style={
                      highlighted
                        ? {
                            textShadow: `0 0 20px #bcffff, 0 0 40px #bcffff, 0 0 60px rgba(188,255,255,0.5), 0 0 80px rgba(188,255,255,0.3)`,
                          }
                        : { textShadow: "0 0 4px rgba(188,255,255,0.2)" }
                    }
                  >
                    {r}
                  </div>
                  {highlighted && (
                    <div className="mt-3 text-xs text-game-accent uppercase tracking-widest font-mono font-bold animate-glow">
                      ✦ RARITY ✦
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Glow effects around container */}
          <div
            className="pointer-events-none absolute inset-0 border border-game-accent rounded-lg"
            style={{ boxShadow: "0 0 25px rgba(188,255,255,0.4), inset 0 0 15px rgba(188,255,255,0.15)" }}
          />

          {/* Center indicator line */}
          <div
            className="absolute inset-y-0 left-1/2 w-1 bg-gradient-to-b from-game-accent via-game-accent to-transparent"
            style={{ boxShadow: "0 0 15px #bcffff, 0 0 30px #bcffff" }}
          />
        </div>
      </div>

      {/* Result Card */}
      {landed && target && (
        <div className="mt-8 fade-in">
          <div
            className="text-center px-8 py-4 inline-block rounded-lg border border-game-accent/60 backdrop-blur-sm glitch-border shadow-lg mx-auto block animate-glow"
            style={{
              background: "linear-gradient(135deg, rgba(188,255,255,0.15), rgba(127,254,240,0.1))",
              boxShadow: "0 0 30px rgba(188,255,255,0.4), 0 0 60px rgba(188,255,255,0.2)",
            }}
          >
            <div className="text-lg font-gaming text-game-accent font-bold tracking-widest">✦ FATE REVEALS ✦</div>
            <div className="text-2xl font-gaming text-game-accent font-bold mt-2 tracking-wide">{target}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GachaAnimation
