<script setup>
import { defineAsyncComponent } from "vue";

import HeroProfileIntro from "./HeroProfileIntro.vue";
import SlamTransition from "./SlamTransition.vue";

const DiscordPresenceAsync = defineAsyncComponent(
  () => import("./DiscordPresence.vue")
);
</script>

<template>
  <SlamTransition
    class="p-5 space-y-5"
    opacity-duration="0.6s"
    transform-duration="1.2s"
  >
    <HeroProfileIntro />
  </SlamTransition>
</template>
