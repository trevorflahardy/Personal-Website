<script setup>
import HeroChaiDescription from "./HeroChaiDescription.vue";
import HeroChaiCardsInfo from "./HeroChaiCardsInfo.vue";
import HeroChaiPreview from "./HeroChaiPreview.vue";
import HeroChaiCardsFuture from "./HeroChaiCardsFuture.vue";
</script>

<template>
  <TransitionGroup name="slam" appear tag="div" class="p-5 space-y-5">
    <HeroChaiDescription key="1" />
    <HeroChaiCardsInfo key="2" />
    <HeroChaiPreview key="3" />
    <HeroChaiCardsFuture key="4" />
  </TransitionGroup>
</template>

<style scoped>
.slam-enter-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.6s ease-in-out;
}
.slam-enter-from {
  opacity: 0;
  transform: scale(1.05);
}
.slam-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* Apply different delays based on the order of the elements */
.slam-enter-active:nth-child(1) {
  transition-delay: 0.1s;
}
.slam-enter-active:nth-child(2) {
  transition-delay: 0.2s;
}
.slam-enter-active:nth-child(3) {
  transition-delay: 0.3s;
}
.slam-enter-active:nth-child(4) {
  transition-delay: 0.4s;
}
</style>
