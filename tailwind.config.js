/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./index.html"],
  theme: {
    fontFamily: {
      "sf-pro-display": ["SF Pro Display", "Helvetica Neue", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-3d"), require('tailwindcss-animated')],
};
