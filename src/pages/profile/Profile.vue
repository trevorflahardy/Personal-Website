<script setup lang="ts">
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import WorkExperience from "./WorkExperience.vue";
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import { useLenis } from "@/composables/useLenis";

// Inertial smooth-scroll — same treatment the Baro-RS pages get.
useLenis();

const Extras = defineAsyncComponent(() => {
  return import("./extras/Extras.vue");
});
</script>

<template>
  <PageLayoutSpacer>
    <Intro />

    <WorkExperience />

    <Suspense>
      <Extras />
    </Suspense>
  </PageLayoutSpacer>
</template>
