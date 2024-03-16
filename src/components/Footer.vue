<script setup>
import placeholderImgContent from "../assets/PlaceholderImgContent.vue";

function toggleTheme() {
  localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark");
}
</script>

<template>
  <div
    class="w-96 h-14 glass-thin-base rounded-full relative -top-6 shadow-xl flex flex-row items-center justify-start p-4 [transform: translateZ(40px)]"
  >
    <!-- Lightswitch for light and dark mode -->
    <button
      class="glass-semithick rounded-full h-9 w-9 flex flex-row items-center justify-center overflow-hidden"
      @click="toggleTheme()"
    >
      <placeholderImgContent />
    </button>
  </div>
</template>
