import { fileURLToPath, URL } from "node:url";
import svgLoader from 'vite-svg-loader'

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Personal-Website/",
  plugins: [vue(), tailwindcss(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
