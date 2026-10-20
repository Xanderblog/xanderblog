/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wine: { DEFAULT: '#722F37', deep: '#4A0E1C', light: '#9B3B47', rose: '#F5E6E8' },
        gold: '#C9A227',
        cream: '#FAF7F5',
        ink: '#1F1416',
        muted: '#6B5B5E',
        night: { DEFAULT: '#140A0C', card: '#1F1215', line: '#2E1C20' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl: '12px', '2xl': '16px' },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(74,14,28,0.12)',
        lift: '0 18px 40px -12px rgba(74,14,28,0.28)',
      },
    },
  },
  plugins: [],
}
