import type { CharacterSkills, RarityGrade, StatRank } from "../types/character"
import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

let genAI: GoogleGenerativeAI | null = null

// Initialize Google Generative AI if API key is available
if (API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY)
  } catch (error) {
    console.warn("Google Generative AI not available:", error)
  }
}

export interface AIGenerationRequest {
  element: string
  weaponType: string
  role: string
  rarity: RarityGrade
  statRanks: StatRank
}

export interface AIGenerationResponse {
  title: string
  className: string
  flavorText: string
  skills: CharacterSkills
}

/**
 * Main AI generation function using Google Gemini
 */
export async function generateCharacterWithAI(request: AIGenerationRequest): Promise<AIGenerationResponse> {
  const { element, weaponType, role, rarity, statRanks } = request

  if (!genAI || !API_KEY) {
    console.warn("Gemini API key not found, using fallback generation")
    return generateFallback(request)
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    const prompt = generatePrompt(element, weaponType, role, rarity, statRanks)

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract JSON from response (handles markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.warn("Failed to parse AI response, using fallback")
      return generateFallback(request)
    }

    const parsed = JSON.parse(jsonMatch[0])

    // Only extract the fields we need, ignore any extra fields from AI
    return {
      title: parsed.title || generateTitle(element, weaponType, rarity, statRanks),
      className: parsed.className || generateClassName(element, weaponType, role, rarity),
      flavorText: parsed.flavorText || generateFlavorText(element, weaponType, role),
      skills: parsed.skills || generateSkills(element, weaponType, role),
    }
  } catch (error) {
    console.error("Error generating character with AI:", error)
    return generateFallback(request)
  }
}

/**
 * Fallback generation when AI is unavailable
 */
function generateFallback(request: AIGenerationRequest): AIGenerationResponse {
  const { element, weaponType, role, rarity, statRanks } = request

  return {
    title: generateTitle(element, weaponType, rarity, statRanks),
    className: generateClassName(element, weaponType, role, rarity),
    flavorText: generateFlavorText(element, weaponType, role),
    skills: generateSkills(element, weaponType, role),
  }
}

/**
 * Generate AI prompt for character creation
 */
export function generatePrompt(
  element: string,
  weaponType: string,
  role: string,
  rarity: RarityGrade,
  statRanks: StatRank,
): string {
  const rarityDescriptor = {
    SS: "SS Rank (0.1% drop rate - Mythical)",
    S: "S Rank (1% drop rate - Legendary)",
    A: "A Rank (5% drop rate - Epic)",
    B: "B Rank (10% drop rate - Rare)",
    C: "C Rank (40% drop rate - Uncommon)",
    D: "D Rank (40% drop rate - Common)",
    E: "E Rank (3.9% drop rate - Poor)",
  }[rarity]

  return `Create a unique RPG character with the following attributes:

CORE ATTRIBUTES:
- Rank: ${rarityDescriptor}
- Element: ${element}
- Weapon: ${weaponType}
- Role: ${role}

STAT DISTRIBUTION:
- HP (Health): ${statRanks.hp}
- ATK (Attack/Strength): ${statRanks.atk}  
- DEF (Defense): ${statRanks.def}
- SPEED (Agility): ${statRanks.speed}
- EM (Elemental Mastery): ${statRanks.em}

Based on these stats and attributes, provide:

1. TITLE: An epic, unique title that reflects their rank, dominant stats, and element
   (e.g., "The Divine Flame Sovereign" for high EM/ATK fire character)
   
2. CLASS: A creative class name that combines their weapon and element
   (e.g., "Pyroclastic Blade Master", "Cryogenic Archer")

3. FLAVOR TEXT: 2-3 sentences describing their background and how their stats reflect their fighting style

4. THREE SKILLS that match their element, weapon, and stat distribution:
   - Normal Attack: Basic attack using ${weaponType}
   - Skill: A signature technique (cooldown ability)
   - Burst: Ultimate ability that showcases their strengths

Make each skill reflect their stat distribution. For example:
- High SPEED characters should have quick, multi-hit skills
- High EM characters should have powerful elemental reactions
- High DEF characters should have defensive/counter skills

Return ONLY valid JSON (no markdown code blocks):
{
  "title": "Character Title",
  "className": "Class Name",
  "flavorText": "Background story...",
  "skills": {
    "normalAttack": {
      "name": "Skill Name",
      "description": "What it does..."
    },
    "skill": {
      "name": "Skill Name",
      "description": "What it does..."
    },
    "burst": {
      "name": "Skill Name",
      "description": "What it does..."
    }
  }
}`
}

// Template-based fallback generation functions

function generateTitle(element: string, _weaponType: string, rarity: RarityGrade, statRanks: StatRank): string {
  // Find dominant stat
  const statValues = {
    hp: statRanks.hp,
    atk: statRanks.atk,
    def: statRanks.def,
    speed: statRanks.speed,
    em: statRanks.em,
  }

  const dominantStat = Object.entries(statValues).reduce((a, b) => (getRankValue(a[1]) > getRankValue(b[1]) ? a : b))[0]

  const rankTitles = {
    SS: ["The Mythical", "The Transcendent", "The Divine"],
    S: ["The Legendary", "The Supreme", "The Exalted"],
    A: ["The Epic", "The Renowned", "The Illustrious"],
    B: ["The Skilled", "The Adept", "The Proficient"],
    C: ["The Capable", "The Trained", "The Competent"],
    D: ["The Aspiring", "The Novice", "The Developing"],
    E: ["The Struggling", "The Untested", "The Fledgling"],
  }

  const statModifiers = {
    hp: ["Enduring", "Resilient", "Undying", "Eternal"],
    atk: ["Devastating", "Crushing", "Obliterating", "Annihilating"],
    def: ["Unbreakable", "Impenetrable", "Stalwart", "Adamant"],
    speed: ["Swift", "Lightning", "Blazing", "Phantom"],
    em: ["Elemental", "Arcane", "Mystical", "Primordial"],
  }

  const rankTitle = rankTitles[rarity][Math.floor(Math.random() * 3)]
  const statMod = statModifiers[dominantStat as keyof typeof statModifiers][Math.floor(Math.random() * 4)]
  const elementNoun = `${element} ${["Sovereign", "Warden", "Champion", "Master"][Math.floor(Math.random() * 4)]}`

  return `${rankTitle} ${statMod} ${elementNoun}`
}

function getRankValue(rank: string): number {
  const values: Record<string, number> = {
    divine: 5,
    excellent: 4,
    good: 3,
    average: 2,
    "below average": 1,
  }
  return values[rank.toLowerCase()] || 2
}

function generateClassName(element: string, weaponType: string, _role: string, rarity: RarityGrade): string {
  const elementAdjectives = {
    Fire: ["Pyroclastic", "Infernal", "Volcanic", "Scorching"],
    Water: ["Torrential", "Tidal", "Aquatic", "Oceanic"],
    Electro: ["Voltaic", "Thunderous", "Galvanic", "Storm-born"],
    Geo: ["Tectonic", "Crystalline", "Terran", "Lithic"],
    Wind: ["Tempestuous", "Zephyr", "Cyclonic", "Aeolian"],
    Ice: ["Cryogenic", "Glacial", "Frost-bound", "Boreal"],
    Void: ["Abyssal", "Shadow-touched", "Void-born", "Umbral"],
  }

  const weaponTitles = {
    Sword: ["Blade", "Fencer", "Duelist", "Swordsman"],
    Claymore: ["Berserker", "Crusher", "Titan", "Colossus"],
    Spear: ["Lancer", "Dragoon", "Impaler", "Sentinel"],
    Bow: ["Archer", "Marksman", "Ranger", "Sniper"],
    Catalyst: ["Mage", "Sorcerer", "Arcanist", "Sage"],
  }

  const prefix =
    elementAdjectives[element as keyof typeof elementAdjectives]?.[Math.floor(Math.random() * 4)] || element
  const suffix = weaponTitles[weaponType as keyof typeof weaponTitles]?.[Math.floor(Math.random() * 4)] || weaponType

  // Add rank modifier for high rarities
  if (rarity === "SS" || rarity === "S") {
    return `${prefix} ${suffix} Supreme`
  } else if (rarity === "A") {
    return `Elite ${prefix} ${suffix}`
  }

  return `${prefix} ${suffix}`
}

function generateFlavorText(element: string, weaponType: string, role: string): string {
  const templates = [
    `A legendary warrior who harnesses the raw power of ${element} through their ${weaponType}. As a ${role}, they stand ready to defend the realm against any threat.`,
    `Blessed by the ancient spirits of ${element}, this ${role} wields their ${weaponType} with unmatched skill and precision.`,
    `From the depths of forgotten lands comes a ${role} whose mastery over ${element} and ${weaponType} is unparalleled in the realm.`,
    `Trained in the sacred arts of ${element} manipulation, this ${role} has dedicated their life to perfecting the way of the ${weaponType}.`,
    `A mysterious figure cloaked in ${element} energy, their ${weaponType} strikes fear into the hearts of those who dare oppose them.`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

function generateSkills(element: string, weaponType: string, _role: string): CharacterSkills {
  const elementLower = element.toLowerCase()
  const weaponLower = weaponType.toLowerCase()

  return {
    normalAttack: {
      name: `${element} ${weaponType} Strike`,
      description: `Performs a swift ${weaponLower} attack infused with ${elementLower} energy, dealing moderate damage to enemies.`,
    },
    skill: {
      name: `${element} Tempest`,
      description: `Channels the power of ${elementLower} to unleash a devastating ${weaponLower} technique, dealing heavy damage and applying ${elementLower} status effects.`,
    },
    burst: {
      name: `Ultimate ${element} Cataclysm`,
      description: `Unleashes the full potential of ${elementLower} mastery, combining ${weaponLower} techniques with elemental fury to devastate all enemies in the area. This legendary technique can turn the tide of any battle.`,
    },
  }
}
