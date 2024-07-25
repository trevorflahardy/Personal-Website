<script setup>
import { defineAsyncComponent, Suspense } from "vue";

import Intro from "./Intro.vue";
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Projects from "./Projects.vue";

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

        <!-- If we have to fallback we'll just do a pulsing gray outline with some random padding, let's say 36 -->
        <template #fallback>
          <div
            class="basis-1/2 w-full h-full rounded-xl animate-pulse bg-inherit outline-gray-600 dark:outline-gray-300 outline-dashed p-36">
          </div>
        </template>
      </Suspense>

      <Suspense>
        <ProfileDiscord />

        <template #fallback>
          <div
            class="basis-1/2 w-full h-full rounded-xl animate-pulse bg-inherit outline-gray-600 dark:outline-gray-300 outline-dashed p-36">
          </div>
        </template>
      </Suspense>
    </div>

    <Projects />
  </PageLayoutSpacer>
</template>
