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
        <div v-reveal>
            <h2 class="title-2 mb-2">
                Beyond the Code
            </h2>
            <p class="subtitle mb-8">
                What occupies my time when the laptop closes — interests, habits, and live stats from my day-to-day.
            </p>
        </div>

        <!-- Personal interest cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mb-6">
            <div
                v-for="({ icon, title, body }, i) in interests"
                :key="title"
                v-reveal="{ delay: i * 110 }"
                class="group glass-card hover-lift p-6 flex flex-col gap-3 overflow-hidden"
            >
                <!-- Ghost icon — an oversized watermark of the card's icon that
                     the cursor "uncovers" as it moves across the glass. -->
                <i class="pi ghost-icon" :class="icon" aria-hidden="true" />

                <div
                    class="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0
                           transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
                    <i class="pi text-white/80 text-lg" :class="icon" />
                </div>
                <div>
                    <h3 class="card-title mb-2">{{ title }}</h3>
                    <p class="card-body mb-0">{{ body }}</p>
                </div>
            </div>
        </div>

        <!-- Live stats -->
        <div v-reveal>
            <h3 class="title-3 mb-2">Live Stats</h3>
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

<style scoped>
/* Oversized icon watermark revealed by the pointer light. Position tracks the
   same --gx/--gy variables the glass glare uses, so the icon sits exactly
   under the cursor like something caught in a flashlight beam. */
.ghost-icon {
    position: absolute;
    left: var(--gx, 50%);
    top: var(--gy, 50%);
    transform: translate(-50%, -50%) rotate(-8deg);
    font-size: 7.5rem;
    color: rgba(255, 255, 255, 0.05);
    opacity: var(--glare-o, 0);
    transition: opacity 0.5s ease;
    pointer-events: none;
}

html:not(.dark) .ghost-icon {
    color: rgba(15, 23, 42, 0.06);
}

@media (prefers-reduced-motion: reduce) {
    .ghost-icon {
        display: none;
    }
}
</style>
