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
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'text-reveal': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
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
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'text-reveal': 'text-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        blob: 'blob 8s infinite ease-in-out',
        'border-pulse': 'border-pulse 4s infinite ease-in-out',
        'scroll-slow': 'scroll 40s linear infinite',
        'shine': 'shine 1.5s infinite linear',
      },
    },
  },
  plugins: [],
}