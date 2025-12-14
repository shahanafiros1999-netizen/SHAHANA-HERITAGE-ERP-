/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        shahana: {
          900: '#0f172a', // Deep Navy
          800: '#1e293b',
          gold: '#d4af37', // Heritage Gold
          accent: '#0ea5e9', // Tech Blue
          surface: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}