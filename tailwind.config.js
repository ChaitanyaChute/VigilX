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
        // Sets Josefin Sans as the default 'sans' font
        sans: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        // --- Hero text animation ---
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // --- Glowing background blobs ---
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        // --- Window border pulse ---
        'border-pulse': {
          '0%, 100%': { 'border-color': 'rgba(59, 130, 246, 0.4)' },
          '50%': { 'border-color': 'rgba(59, 130, 246, 0.8)' },
        },
        // --- Testimonial marquee scroll ---
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        blob: 'blob 7s infinite ease-in-out',
        'border-pulse': 'border-pulse 4s infinite ease-in-out',
        // --- Defines a slow 40-second scroll ---
        'scroll-slow': 'scroll 40s linear infinite',
      },
    },
  },
  plugins: [],
}