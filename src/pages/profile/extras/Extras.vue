<script setup lang="ts">
import { defineAsyncComponent, Suspense } from "vue";

const ProfileWaka = defineAsyncComponent(
    () => import("./Waka.vue")
);

const ProfileDiscord = defineAsyncComponent(
    () => import("./Discord.vue")
);

const interests = [
    {
        icon: "pi-wrench",
        title: "Car Enthusiast",
        body: "Time under the hood is how I decompress. There's something grounding about working with your hands on mechanical problems — it sharpens the same problem-solving instincts I bring to code."
    },
    {
        icon: "pi-bolt",
        title: "Fitness & the Gym",
        body: "Discipline in the gym translates directly to discipline in engineering. Consistency, progressive overload, and showing up even when you don't feel like it — sounds a lot like shipping software."
    },
    {
        icon: "pi-star",
        title: "Competitive Pickleball",
        body: "I'm competitive by nature, and pickleball is where that comes out. The fast-paced strategy and reading opponents keeps my mind sharp in a completely different way than writing code."
    }
];
</script>

<template>
    <div class="w-full">
        <h2 class="title-2 mb-2">
            Beyond the Code
        </h2>
        <p class="subtitle mb-8">
            What occupies my time when the laptop closes — interests, habits, and live stats from my day-to-day.
        </p>

        <!-- Personal interest cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mb-6">
            <div
                v-for="{ icon, title, body } in interests"
                :key="title"
                class="glass-card p-6 flex flex-col gap-3"
            >
                <div class="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0">
                    <i class="pi text-white/80 text-lg" :class="icon" />
                </div>
                <div>
                    <h3 class="card-title mb-2">{{ title }}</h3>
                    <p class="card-body mb-0">{{ body }}</p>
                </div>
            </div>
        </div>

        <!-- Live stats -->
        <h3 class="title-3 mb-2">Live Stats</h3>
        <p class="subtitle mb-5">
            Real-time data from WakaTime and Discord — updated automatically.
        </p>

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
