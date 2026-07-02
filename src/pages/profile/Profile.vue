<script setup lang="ts">
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import StoryReveal from "./StoryReveal.vue";
import WorkExperience from "./WorkExperience.vue";
import Outro from "./Outro.vue";
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import { useLenis } from "@/composables/useLenis";

// Inertial smooth-scroll — same treatment the Baro-RS pages get.
useLenis();

const Extras = defineAsyncComponent(() => {
  return import("./extras/Extras.vue");
});
</script>

<template>
  <div class="relative">
    <!-- Ambient color orbs — soft pools of light drifting behind the content,
         giving the glass real color to refract (the "orb principle"). -->
    <div class="page-orb page-orb--blue orb-drift" aria-hidden="true" />
    <div class="page-orb page-orb--amber orb-drift" style="animation-delay: -9s" aria-hidden="true" />
    <div class="page-orb page-orb--green orb-drift" style="animation-delay: -5s" aria-hidden="true" />

    <PageLayoutSpacer class="relative z-10">
      <Intro />

      <StoryReveal />

      <WorkExperience />

      <Suspense>
        <Extras />
      </Suspense>

      <Outro />
    </PageLayoutSpacer>
  </div>
</template>

<style scoped>
.page-orb {
  position: absolute;
  width: clamp(260px, 34vw, 480px);
  height: clamp(260px, 34vw, 480px);
  border-radius: 9999px;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}

.page-orb--blue {
  top: 4%;
  right: 6%;
  background: radial-gradient(closest-side, rgba(10, 132, 255, 0.32), transparent 70%);
}

.page-orb--amber {
  top: 38%;
  left: 2%;
  background: radial-gradient(closest-side, rgba(245, 158, 11, 0.24), transparent 70%);
}

.page-orb--green {
  bottom: 6%;
  right: 10%;
  background: radial-gradient(closest-side, rgba(74, 222, 128, 0.22), transparent 70%);
}

/* Light glass needs quieter pools. */
html:not(.dark) .page-orb {
  opacity: 0.55;
}
</style>
