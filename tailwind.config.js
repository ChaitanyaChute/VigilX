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
      keyframes: {
        // --- NEW: Keyframe for the typing cursor ---
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#3b82f6' }, // blue-500
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'border-pulse': {
          '0%, 100%': { 'border-color': 'rgba(59, 130, 246, 0.4)' },
          '50%': { 'border-color': 'rgba(59, 130, 246, 0.8)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)' },
          '100%': { transform: 'translateX(200%) skewX(-20deg)' },
        },
      },
      animation: {
        // --- NEW: Animation utility for the cursor ---
        'blink-caret': 'blink-caret 1s step-end infinite',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        blob: 'blob 8s infinite ease-in-out',
        'border-pulse': 'border-pulse 4s infinite ease-in-out',
        'scroll-slow': 'scroll 40s linear infinite',
        'shine': 'shine 1.5s infinite linear',
      },
    },
  },
  plugins: [],
}