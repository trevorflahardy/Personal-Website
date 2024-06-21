<script setup>
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import SlamTransition from "@/components/SlamTransition.vue";
import WakaLoading from "./WakaLoading.vue";
import DiscordLoading from "./DiscordLoading.vue";

const ProfileWaka = defineAsyncComponent(
  () => import("./Waka.vue")
);

const ProfileDiscord = defineAsyncComponent(
  () => import("./Discord.vue")
);
</script>

<template>
  <SlamTransition class="px-5 py-7 space-y-5">
    <Intro class="snap-center" />

    <div class="flex flex-row items-center justify-center snap-center gap-5">
      <Suspense>
        <ProfileWaka class="basis-1/2" />

        <template #fallback>
          <WakaLoading class="basis-1/2" />
        </template>
      </Suspense>

      <Suspense>
        <ProfileDiscord class="basis-1/2" />

        <template #fallback>
          <DiscordLoading />
        </template>
      </Suspense>
    </div>
  </SlamTransition>
</template>
