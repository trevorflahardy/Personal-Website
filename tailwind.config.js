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
        chai: {
          50: "#f2efff",
          100: "#d7ccff",
          200: "#c4b4ff",
          300: "#a992ff",
          400: "#997dff",
          500: "#7f5cff",
          600: "#7454e8",
          700: "#5a41b5",
          800: "#46338c",
          900: "#35276b",
          "default": "#7f5cff",
        },
        discord: {
          100: "#424549",
          200: "#36393e",
          300: "#282b30",
          400: "#1e2124",
          "blurple": "#7289da",
        },
        docuflow: {
          light: "#FF4A33",
          dark: "#FF381F",
        }
      },
    },
    fontFamily: {
      "sf-pro-display": ["SF Pro Display", "Helvetica Neue", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-3d")],
};
