<script setup lang="ts">
import { jobs } from './work-data';
</script>

<template>
    <div class="w-full">
        <div v-reveal class="mb-8">
            <h2 class="title-2 mb-2">Work &amp; experience</h2>
            <p class="subtitle">Where the projects came from.</p>
        </div>

        <div class="relative flex flex-col gap-0">
            <!-- Timeline spine — draws itself downward when the section enters. -->
            <div v-reveal="{ y: 0 }"
                class="spine-draw absolute left-[19px] top-3 bottom-3 w-px bg-white/12 hidden sm:block pointer-events-none" />

            <div v-for="(job, ji) in jobs" :key="job.company"
                class="relative flex flex-col sm:flex-row gap-0 sm:gap-6 mb-8 last:mb-0">

                <div class="hidden sm:flex flex-col items-center flex-none w-10 pt-1">
                    <div v-reveal="{ y: 0, scale: 0.3, delay: 150 + ji * 120 }"
                        class="w-3.5 h-3.5 rounded-full border-2 flex-none z-10"
                        :style="{ backgroundColor: job.color + '40', borderColor: job.color }" />
                </div>

                <div v-reveal="{ delay: ji * 110 }" data-glow
                    class="relative flex-1 rounded-2xl border bg-white/[0.02] overflow-hidden transition-colors duration-300"
                    :style="{ borderColor: job.color + '25' }">

                    <!-- Accent light that follows the cursor across the card —
                         driven by the same --gx/--gy vars as the glass glare. -->
                    <div class="glow-tint" aria-hidden="true"
                        :style="{ background: `radial-gradient(280px circle at var(--gx, 50%) var(--gy, 50%), ${job.color}1f, transparent 70%)` }" />

                    <!-- Company header — only shows company-level period if there are multiple roles -->
                    <div class="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b"
                        :style="{ borderColor: job.color + '20', backgroundColor: job.color + '08' }">
                        <div class="flex items-center gap-2.5">
                            <div class="w-2 h-2 rounded-full flex-none" :style="{ backgroundColor: job.color }" />
                            <a v-if="job.url" :href="job.url" target="_blank" rel="noreferrer"
                                class="font-semibold text-white text-sm hover:underline underline-offset-2">
                                {{ job.company }}
                            </a>
                            <span v-else class="font-semibold text-white text-sm">{{ job.company }}</span>
                        </div>
                    </div>

                    <div>
                        <div v-for="(role, ri) in job.roles" :key="role.title"
                            class="px-5 py-4"
                            :style="ri > 0 ? { borderTop: `1px solid ${job.color}12` } : {}">
                            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-2">
                                <p class="text-sm font-medium text-white/85">{{ role.title }}</p>
                                <span class="text-xs font-mono flex-none" :style="{ color: job.color + 'aa' }">{{ role.period }}</span>
                            </div>
                            <ul class="flex flex-col gap-1.5">
                                <li v-for="b in role.bullets" :key="b"
                                    class="flex gap-2.5 items-start text-sm text-white/55 leading-relaxed">
                                    <span class="mt-[7px] w-1 h-1 rounded-full flex-none" :style="{ backgroundColor: job.color + '80' }" />
                                    {{ b }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Spine draw-in: overrides the generic v-reveal transform with a top-anchored
   scaleY so the line appears to be drawn down the page. The extra class in the
   selector out-specifies the base `[data-reveal]` rules from index.css. */
[data-reveal].spine-draw {
    transform: scaleY(0);
    transform-origin: top;
}

[data-reveal].spine-draw.is-revealed {
    transform: scaleY(1);
    transition-duration: 1.6s;
}

/* Pointer-following accent tint — visible only while the cursor is on the
   card (the glow composable flips --glare-o between 0 and 1). */
.glow-tint {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: var(--glare-o, 0);
    transition: opacity 0.45s ease;
}
</style>
