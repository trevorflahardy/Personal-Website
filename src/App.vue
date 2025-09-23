<script setup>
// Load prime icons for the use around the application
import "primeicons/primeicons.css";
</script>

<template>
  <main class="h-screen w-screen">
    <!-- The background for the app -->
    <Background class="z-10 absolute" />

    <div
      class="z-20 h-screen w-screen relative flex flex-col items-center justify-start content-center pt-10 px-5 pb-[10%] xl:pt-[5%] md:pb-[10%] md:px-[5%] overflow-y-clip no-scrollbar antialiased"
    >
      <!-- We're using Vue Router here. Thus, to ensure that we always have a proper footer and sidebar, we're going to embed the router view in the Hero. -->
    </div>
  </main>
</template>
