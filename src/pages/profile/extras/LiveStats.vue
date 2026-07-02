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
    <div class="w-full">
        <div v-reveal>
            <p class="font-mono text-xs uppercase tracking-[0.28em] text-white/40 mb-3">Telemetry</p>
            <h3 class="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">Live Stats</h3>
            <p class="subtitle mb-5">
                Real-time data from WakaTime and Discord — updated automatically.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <Suspense>
                <ProfileWaka />
                <template #fallback>
                    <div class="w-full h-48 rounded-2xl animate-pulse bg-white/4 border border-white/8" />
                </template>
            </Suspense>

            <Suspense>
                <ProfileDiscord />
                <template #fallback>
                    <div class="w-full h-48 rounded-2xl animate-pulse bg-white/4 border border-white/8" />
                </template>
            </Suspense>
        </div>
    </div>
</template>
