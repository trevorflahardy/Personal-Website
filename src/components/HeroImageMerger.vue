<script setup>
import SlamTransition from "./SlamTransition.vue";
import HeroImageMergerIntro from "./HeroImageMergerIntro.vue";
import HeroImageMergerAbout from "./HeroImageMergerAbout.vue";
import HeroImageMergerStatistics from "./HeroImageMergerStatistics.vue";
</script>

<template>
  <SlamTransition tag="div" class="space-y-5">
    <HeroImageMergerIntro />
    <HeroImageMergerAbout />
    <HeroImageMergerStatistics />
  </SlamTransition>
</template>
