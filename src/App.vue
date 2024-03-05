<script setup>
import HeroComponent from './components/HeroComponent.vue'
import BottomElement from './components/BottomElement.vue'
</script>

<template>
  <main
    class="bg-house bg-cover bg-clip-border h-screen w-full overflow-hidden"
  >
    <div data-tilt data-tilt-max="0.4" data-tilt-perspective="1000" data-tilt-speed="500" data-tilt-reverse="true" class="h-screen w-screen absolute flex flex-col items-center justify-center content-center [transform-style: preserve-3d] [transform: perspective(1000px)]">
      <HeroComponent />
      <BottomElement />

    </div>
  </main>
</template>
