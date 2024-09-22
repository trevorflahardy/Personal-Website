<script setup>
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Projects from "./Projects.vue";

const Extras = defineAsyncComponent(() => {
  return import("./extras/Extras.vue");
});
</script>

<template>
  <PageLayoutSpacer>
    <Intro />
    <Projects />

    <Suspense>
      <Extras />
    </Suspense>
  </PageLayoutSpacer>
</template>
