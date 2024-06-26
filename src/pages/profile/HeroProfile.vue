<script setup>
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import SlamTransition from "@/components/SlamTransition.vue";
import WakaLoading from "./WakaLoading.vue";
import DiscordLoading from "./DiscordLoading.vue";
// import DriftingCarsCanvas from "./DriftingCarsCanvas.vue";

const ProfileWaka = defineAsyncComponent(
  () => import("./Waka.vue")
);

const ProfileDiscord = defineAsyncComponent(
  () => import("./Discord.vue")
);
</script>

<template>
  <SlamTransition class="md:px-5 md:py-7 space-y-5">
    <Intro class="snap-center" />

    <div class="flex flex-row items-center justify-around snap-center flex-wrap gap-5">
      <Suspense>
        <ProfileWaka />

        <template #fallback>
          <WakaLoading />
        </template>
      </Suspense>

      <Suspense>
        <ProfileDiscord />

        <template #fallback>
          <DiscordLoading />
        </template>
      </Suspense>

      <!-- <div class="w-full p-5 h-80">
        <Suspense>
          <DriftingCarsCanvas />
        </Suspense>
      </div> -->
    </div>
  </SlamTransition>
</template>
