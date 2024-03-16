/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "apt-day": "url('./assets/AptDay.png')",
        "apt-night": "url('./assets/AptNight.png')",
      },
      fontSize: {
        xss: ["10px", "12px"],
      },
      colors: {
        glass: {
          regular: "#D9D9D9",
          thin: "#c9c9c9",
          semithick: "#5E5E5E",
          thick: "#403f3f",
        },
      },
    },
    fontFamily: {
      "sf-pro-display": ["SF Pro Display", "Helvetica Neue", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-3d")],
};
