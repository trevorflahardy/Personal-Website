<script setup>
import HeroChaiDescription from "./HeroChaiDescription.vue";
import HeroChaiCardsInfo from "./HeroChaiCardsInfo.vue";
import HeroChaiPreview from "./HeroChaiPreview.vue";
import HeroChaiCardsFuture from "./HeroChaiCardsFuture.vue";
import SlamTransition from "./SlamTransition.vue";
</script>

<template>
  <SlamTransition class="space-y-5">
    <HeroChaiDescription />
    <HeroChaiCardsInfo />
    <HeroChaiPreview />
    <HeroChaiCardsFuture />
  </SlamTransition>
</template>
