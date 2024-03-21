<script setup>
/// The goal of this component is to display a grid of 2x10 images, mimicking how the image merger does it magic. It will be a grid of 100 images, and a constant animation running that does the following:
/// 1. Randomly select a cell in the grid.
/// 2. Randomly select a second cell in the grid.
/// 3. Swap the images in the two cells.
/// 4. Repeat

import HeroImageMergerImageAnimationImage from "./HeroImageMergerImageAnimationImage.vue";

const imageCount = 20;
</script>

<template>
  <div class="grid grid-cols-10 gap-2">
    <div v-for="i in imageCount" :key="i">
      <HeroImageMergerImageAnimationImage :label="i" />
    </div>
  </div>
</template>
