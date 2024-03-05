/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        house: "url('/src/assets/HouseBG.jpg')"
      },
      fontSize: {
        xss: ['10px', '12px']
      }
    },
    fontFamily: {
      'sf-pro-display': ['SF Pro Display', 'Helvetica Neue', 'sans-serif']
    },
  },
  plugins: [
    require('tailwindcss-3d'),
  ]
}
