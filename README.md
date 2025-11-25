# Ashen Fate - Character Roulette Demo

A frontend-only web demo for generating infinite mock RPG characters through an interactive roulette interface.

## Features

- **Interactive Roulette**: Animated spinning wheel showing Element, Weapon, Role, and Rarity
- **Character Generation**: Fully randomized characters with stats, skills, and backstories
- **Gaming UI**: Dark theme with rarity-based color coding (3★ Blue, 4★ Purple, 5★ Gold)
- **Character History**: View and select from your last 10 generated characters
- **Seed System**: Copy character seeds for sharing or recreation
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** with **TypeScript** - Modern UI framework with type safety
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom gaming theme
- **No Backend Required** - All character generation happens client-side

## Quick Start

### Prerequisites

- Node.js 16+ and npm installed on your system

### Installation

1. **Clone or download** the project files
2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How to Use

1. **Spin the Roulette**: Click the "SPIN FATE" button to start character generation
2. **Watch the Animation**: The roulette will spin for 2 seconds, showing random combinations
3. **View Your Character**: A complete character card appears with:
   - Name, title, and rarity (★★★, ★★★★, or ★★★★★)
   - Element, weapon type, and role badges
   - Stats (HP, ATK, DEF, Difficulty)
   - Three skills with descriptions
   - Flavor text and seed code
4. **Copy Seed**: Click "Copy Seed" to copy the character's unique identifier
5. **Browse History**: Scroll through your last 10 characters in the history section

## Character Generation Details

### Attributes

- **Elements**: Fire, Water, Electro, Geo, Wind, Ice, Void
- **Weapons**: Sword, Claymore, Spear, Bow, Catalyst
- **Roles**: DPS, BurstDPS, Support, Tank, Control
- **Rarity**: 3★ (60% chance), 4★ (30% chance), 5★ (10% chance)

### Stats System

- Base stats scale by rarity (3★: 100%, 4★: 120%, 5★: 150%)
- Role-specific stat bonuses (DPS: higher ATK, Tank: higher HP/DEF)
- Difficulty rating from 1-10 based on complexity

### Seed Format

Each character has a unique seed: `{ELEMENT}-{WEAPON}-{ROLE}-{RARITY}-{TIMESTAMP}`
Example: `FIR-SWO-DPS-5-1700000000000`

## Project Structure

```
src/
├── components/          # React components
│   ├── App.tsx         # Main application component
│   ├── Roulette.tsx    # Spinning roulette interface
│   ├── CharacterCard.tsx # Character display card
│   └── HistoryList.tsx # Character history browser
├── data/               # Character generation data
│   └── characterOptions.ts # All character options and templates
├── types/              # TypeScript type definitions
│   └── character.ts    # Character interface definitions
├── utils/              # Utility functions
│   ├── generateCharacter.ts # Character generation logic
│   └── clipboard.ts    # Copy to clipboard utility
└── styles/             # Styling
    └── index.css       # Tailwind CSS with custom game theme
```

## Customization

### Adding New Content

Edit `src/data/characterOptions.ts` to add:

- **Elements**: Add to `ELEMENTS` array and update `ELEMENT_COLORS`
- **Weapons**: Add to `WEAPON_TYPES` array
- **Roles**: Add to `ROLES` array and update `ROLE_BASE_STATS`
- **Names**: Add to `NAME_PREFIXES` and `NAME_SUFFIXES`
- **Skills**: Expand `SKILL_NAME_POOLS` and `SKILL_DESCRIPTION_TEMPLATES`

### Styling

The gaming theme is defined in:
- `tailwind.config.js` - Custom colors and animations
- `src/index.css` - Component classes and base styles

Modify rarity colors by updating the `rarity-3`, `rarity-4`, and `rarity-5` color definitions.

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Important Notes

⚠️ **Demo Disclaimer**: This is a frontend demo only. Characters generated here are:
- **NOT saved** to any database
- **NOT linked** to any real game
- **TEMPORARY** and will be lost on page refresh
- For **demonstration purposes only**

The official character minting system will be server-side with proper validation and persistence.

## License

This project is open source and available under the terms specified in the LICENSE file.

---

Built with ❤️ for the Ashen Fate universe
