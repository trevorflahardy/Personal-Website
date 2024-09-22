<script setup lang="ts">
import { defineAsyncComponent, Suspense } from "vue";

const ProfileWaka = defineAsyncComponent(
    () => import("./Waka.vue")
);

const ProfileDiscord = defineAsyncComponent(
    () => import("./Discord.vue")
);
</script>

<template>
    <div class="w-full px-5">
        <h2 class="title-2 !mb-1">
            Extras
        </h2>
        <p class="subtitle mb-5">
            Some fun information about what's going on during my day to day. The WakaTime profile shows my up-to-date
            coding statistics, and the Discord profile shows my current status and activities - everything changes
            automatically!
        </p>

        <div class="flex flex-row items-center justify-around flex-wrap gap-3">
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
    </div>
</template>