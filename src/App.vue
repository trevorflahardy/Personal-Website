<script setup>
// Load prime icons for the use around the application
import 'primeicons/primeicons.css';

import Hero from "./components/Hero.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <main class="bg-apt-day dark:bg-apt-night bg-cover bg-center bg-clip-border h-screen w-screen overflow-hidden">
    <div data-tilt data-tilt-max="0.4" data-tilt-perspective="1000" data-tilt-speed="500" data-tilt-reverse="true"
      class="h-screen w-screen absolute flex flex-col items-center justify-start content-center [transform-style: preserve-3d] [transform: perspective(1000px)] pt-10">
      <Hero />
      <Footer />
    </div>
  </main>
</template>