<script setup lang="ts">
import SlamTransition from "@/components/SlamTransition.vue";
import Intro from "./Intro.vue";
import About from "./About.vue";
import Statistics from "./Statistics.vue";
import Future from "./Future.vue";
</script>

<template>
  <SlamTransition tag="div" class="space-y-5">
    <Intro />
    <About />
    <Statistics />
    <Future />
  </SlamTransition>
</template>
