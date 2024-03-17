<script setup>
import { defineAsyncComponent, defineComponent, Suspense } from "vue";

import HeroProfileIntro from "./HeroProfileIntro.vue";
import SlamTransition from "./SlamTransition.vue";
import HeroProfileWakaLoading from "./HeroProfileWakaLoading.vue";

const HeroProfileWaka = defineAsyncComponent(
  () => import("./HeroProfileWaka.vue")
);
</script>

<template>
  <SlamTransition
    class="p-5 space-y-5"
    opacity-duration="0.6s"
    transform-duration="1.2s"
  >
    <HeroProfileIntro class="snap-center" />

    <div class="flex flex-row items-stretch justify-center snap-center">
      <Suspense>
        <HeroProfileWaka class="basis-1/2 p-5" />

        <template #fallback>
          <HeroProfileWakaLoading />
        </template>
      </Suspense>
    </div>
  </SlamTransition>
</template>
