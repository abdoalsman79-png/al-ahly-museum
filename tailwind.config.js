export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ahly: { red: '#c8102e', deep: '#7a0a1c', gold: '#d4a94f', brass: '#b8893a', ink: '#120a0c', paper: '#f3e9d2' } },
      fontFamily: { sans: ['Cairo', 'system-ui', 'sans-serif'], display: ['"Playfair Display"', 'Cairo', 'serif'] }
    }
  },
  plugins: []
};
