/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rarity colors
        'rarity-3': '#60a5fa',
        'rarity-4': '#a855f7',
        'rarity-5': '#fbbf24',
        // Gaming theme colors
        'game-bg': '#0f172a',
        'game-card': '#1e293b',
        'game-border': '#334155',
        'game-accent': '#8b5cf6',
        'game-text': '#f1f5f9',
        'game-text-secondary': '#94a3b8'
      },
      fontFamily: {
        'gaming': ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'spin-glow': 'spin-glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'spin-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        }
      }
    },
  },
  plugins: [],
}

