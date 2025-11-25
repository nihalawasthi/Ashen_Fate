export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gaming theme colors
        'game-bg': '#0a0e17',
        'game-card': '#1a2436',
        'game-border': '#2d3748',
        'game-accent': '#bcffff',
        'game-text': '#ffffff',
        'game-text-secondary': '#b8c1ec',
        'game-accent-glow': 'rgba(188, 255, 255, 0.5)',
      },
      fontFamily: {
        sans: ['Exo', 'sans-serif'],
        gaming: ['Rajdhani', 'sans-serif'],
        glitch: ['Rubik Glitch', 'cursive'],
      },
      animation: {
        float: 'float 3s infinite',
        glow: 'glow 2s infinite',
        'border-glow': 'borderGlow 2s infinite',
        'spin-glow': 'spin-glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { opacity: '0.8', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.2)' }
        },
        borderGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(216, 255, 255, 0.5), 0 0 10px rgba(216, 255, 255, 0.3)'
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(216, 255, 255, 0.7), 0 0 20px rgba(216, 255, 255, 0.5)'
          }
        },
        'spin-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(188, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(188, 255, 255, 0.8)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        }
      },
      boxShadow: {
        glow: '0 0 20px rgba(188, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
