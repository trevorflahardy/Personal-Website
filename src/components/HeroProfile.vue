<script setup>
import { defineAsyncComponent, defineComponent, Suspense } from "vue";

import HeroProfileIntro from "./HeroProfileIntro.vue";
import SlamTransition from "./SlamTransition.vue";
import HeroProfileWakaLoading from "./HeroProfileWakaLoading.vue";
import HeroProfileDiscordLoading from "./HeroProfileDiscordLoading.vue";

const HeroProfileWaka = defineAsyncComponent(
  () => import("./HeroProfileWaka.vue")
);

const HeroProfileDiscord = defineAsyncComponent(
  () => import("./HeroProfileDiscord.vue")
);
</script>

<template>
  <SlamTransition
    class="px-5 py-7 space-y-3"
    opacity-duration="0.6s"
    transform-duration="1.2s"
  >
    <HeroProfileIntro class="snap-center" />

    <div class="flex flex-row items-center justify-center snap-center gap-5">
      <Suspense>
        <HeroProfileWaka class="basis-1/2" />

        <template #fallback>
          <HeroProfileWakaLoading class="basis-1/2" />
        </template>
      </Suspense>

      <Suspense>
        <HeroProfileDiscord class="basis-1/2" />

        <template #fallback>
          <HeroProfileDiscordLoading />
        </template>
      </Suspense>
    </div>
  </SlamTransition>
</template>
