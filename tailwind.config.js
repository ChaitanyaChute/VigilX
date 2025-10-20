const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      },
      // --- Custom Animations for glowing effects ---
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'border-pulse': {
          '0%, 100%': { 'border-color': 'rgba(59, 130, 246, 0.4)' }, /* blue-500 */
          '50%': { 'border-color': 'rgba(59, 130, 246, 0.8)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite ease-in-out',
        'border-pulse': 'border-pulse 4s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}