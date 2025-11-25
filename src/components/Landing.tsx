import { useEffect, useState } from "react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import BackGround from "./BackGround"
import HistoryList from "./HistoryList"
import type { Character } from "../types/character"

interface LandingProps {
  onStartSpin: () => void
  history: Character[]
  onSelectCharacter: (character: Character) => void
}

export default function Landing({ onStartSpin, history, onSelectCharacter }: LandingProps) {
  const [parallaxEffect, setParallaxEffect] = useState<[number, number]>([-100, 100])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setParallaxEffect([0, 0])
      } else {
        setParallaxEffect([-100, 100])
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <ParallaxProvider>
      <div className="antialiased text-gray-800 min-h-screen relative">
        <Parallax translateY={parallaxEffect}>
          <section
            id="hero"
            className="min-h-screen bg-[#0a0e17] text-white flex items-center relative overflow-hidden"
          >
            <BackGround />

            <div className="container mx-auto px-6 z-10 pt-24 lg:mb-0 mb-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-in">
                  <div className="mb-8 inline-block">
                    <div className="px-5 py-2 border-2 border-game-accent text-game-accent text-xs font-mono tracking-widest rounded-full hover:scale-110 transition-all shadow-lg shadow-game-accent/30 backdrop-blur-sm">
                      ⚡ FATE GENERATOR v1.0 ⚡
                    </div>
                  </div>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-gaming leading-tight tracking-wider text-white">
                    ASHEN
                    <br />
                    <span className="text-game-accent drop-shadow-lg animate-glow">FATE</span>
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-game-accent via-game-accent/50 to-transparent mb-8"></div>
                  <p className="text-lg text-game-text-secondary mb-10 font-sans max-w-2xl leading-relaxed">
                    Spin the celestial roulette and forge legendary characters with unique attributes, powers, and
                    destinies. Every roll unveils a new possibility.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={onStartSpin}
                      className="game-button text-base px-10 py-4 rounded-lg font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
                    >
                      Spin Your Fate
                    </button>
                    <button className="border-2 border-game-accent text-game-accent hover:bg-game-accent hover:bg-opacity-10 py-4 px-10 rounded-lg font-bold transition-all duration-300 ease-out uppercase tracking-wider backdrop-blur-sm hover:scale-105">
                      View Gallery
                    </button>
                  </div>
                </div>

                <div className="animate-slide-in hidden md:block">
                  <div className="relative mx-auto overflow-hidden flex justify-center h-full">
                    <div className="w-full max-w-sm">
                      <div className="relative aspect-square">
                        <div className="rounded-full absolute inset-0 bg-gradient-to-br from-game-accent via-game-accent/50 to-transparent opacity-40 blur-3xl animate-pulse"></div>
                        <div className="rounded-full absolute inset-8 bg-gradient-to-tr from-game-accent/20 to-transparent blur-2xl animate-float"></div>
                        <div className="relative z-10 flex items-center justify-center h-full">
                          <div
                            className="text-9xl font-gaming text-game-accent animate-glow drop-shadow-2xl"
                            style={{ textShadow: "0 0 40px #bcffff, 0 0 80px #bcffff" }}
                          >
                            ✦
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 w-full mx-auto flex justify-center">
                        <div className="text-center text-lg text-game-accent font-gaming italic animate-pulse tracking-widest">
                          FROM ASHES, LEGENDS RISE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
                  <svg
                    className="w-8 h-8 mx-auto text-game-accent drop-shadow-lg"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 100 125"
                  >
                    <path d="M56.6,79.6L50,86.2l-6.6-6.6c-0.8-0.8-2-0.8-2.8,0s-0.8,2,0,2.8l8,8C49,90.8,49.5,91,50,91s1-0.2,1.4-0.6l8-8  c0.8-0.8,0.8-2,0-2.8S57.4,78.8,56.6,79.6z" />
                    <path d="M59.4,68.6c-0.8-0.8-2-0.8-2.8,0L50,75.2l-6.6-6.6c-0.8-0.8-2-0.8-2.8,0s-0.8,2,0,2.8l8,8C49,79.8,49.5,80,50,80  s1-0.2,1.4-0.6l8-8C60.2,70.6,60.2,69.4,59.4,68.6z" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </Parallax>

        <section
          id="recent-characters"
          className="bg-[#0a0e17] border-t border-game-accent/30 z-40 py-24 text-white min-h-screen relative"
        >
          <BackGround />
          <div className="container mx-auto px-6 z-10 relative">
            {history.length > 0 ? (
              <HistoryList history={history} onSelectCharacter={onSelectCharacter} />
            ) : (
              <div className="text-center py-32 fade-in">
                <div className="text-8xl mb-6 animate-glow">✦</div>
                <p className="text-3xl font-gaming mb-3 text-game-accent tracking-widest">NO CHARACTERS SUMMONED YET</p>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-game-accent to-transparent mx-auto mb-6"></div>
                <p className="text-lg text-game-text-secondary font-sans">
                  Be the first to spin the wheel of fate and forge your legend!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </ParallaxProvider>
  )
}
