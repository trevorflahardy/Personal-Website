<script setup>
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
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
  <PageLayoutSpacer>
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
    </div>
  </PageLayoutSpacer>
</template>
