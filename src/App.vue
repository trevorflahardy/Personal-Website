<script setup>
// Load prime icons for the use around the application
import 'primeicons/primeicons.css';

import Hero from "./components/Hero.vue";
import Footer from "./components/Footer.vue";
import Background from './components/Background.vue';
</script>

<template>
  <main class="h-screen w-screen">
    <!-- The background for the app -->
    <Background class="z-10 absolute" />

    <div
      class="z-20 h-screen w-screen relative flex flex-col items-center justify-start content-center [transform-style: preserve-3d] [transform: perspective(1000px)] pt-10 px-5 xl:pt-[5%] xl:pb-[13%] xl:px-[5%] overflow-hidden">
      <!-- We're using Vue Router here. Thus, to ensure that we always have a proper footer and sidebar, we're going to embed the router view in the Hero. -->
      <Hero />
      <Footer />
    </div>
  </main>
</template>