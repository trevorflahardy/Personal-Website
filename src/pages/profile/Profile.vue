<script setup lang="ts">
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";

const Extras = defineAsyncComponent(() => {
  return import("./extras/Extras.vue");
});
</script>

<template>
  <PageLayoutSpacer>
    <Intro />

    <Suspense>
      <Extras />
    </Suspense>
  </PageLayoutSpacer>
</template>
