<script setup lang="ts">
import { jobs } from './work-data';
</script>

<template>
    <div class="w-full">
        <div v-reveal class="mb-10">
            <p class="font-mono text-xs uppercase tracking-[0.28em] text-white/40 mb-3">Career</p>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight text-white text-pretty">
                Work &amp; experience
            </h2>
        </div>

        <!-- Editorial ledger — no boxes. Each entry is a full-width row cut by
             hairlines, oversized company names doing the visual work, and the
             job's accent color arriving on hover (rail + name + glow). -->
        <div class="flex flex-col">
            <article v-for="(job, ji) in jobs" :key="job.company" v-reveal="{ delay: ji * 90 }" data-glow
                class="group relative border-t border-white/10 last:border-b py-8 md:py-10 pl-4 md:pl-6"
                :style="{ '--job-color': job.color }">

                <!-- Accent rail — draws down the entry on hover -->
                <span class="job-rail absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0
                             group-hover:scale-y-100 transition-transform duration-500 ease-out" aria-hidden="true" />

                <!-- Pointer-following accent light (same --gx/--gy pipeline as glass) -->
                <div class="glow-tint" aria-hidden="true"
                    :style="{ background: `radial-gradient(340px circle at var(--gx, 50%) var(--gy, 50%), ${job.color}14, transparent 70%)` }" />

                <div class="relative grid grid-cols-12 gap-x-6">
                    <div class="hidden md:block md:col-span-1 pt-3 font-mono text-sm text-white/30
                                group-hover:text-white/60 transition-colors duration-300">
                        {{ String(ji + 1).padStart(2, '0') }}
                    </div>

                    <div class="col-span-12 md:col-span-11">
                        <div class="mb-5">
                            <a v-if="job.url" :href="job.url" target="_blank" rel="noreferrer"
                                class="company inline-block text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight leading-[1.05] text-white text-pretty">
                                {{ job.company }}
                            </a>
                            <span v-else
                                class="company inline-block text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight leading-[1.05] text-white text-pretty">
                                {{ job.company }}
                            </span>
                        </div>

                        <div v-for="role in job.roles" :key="role.title" class="mb-6 last:mb-0">
                            <div
                                class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6 gap-y-0.5 mb-2.5">
                                <h3 class="text-base md:text-lg font-semibold text-white/90">{{ role.title }}</h3>
                                <span class="job-period font-mono text-xs md:text-sm uppercase tracking-wider flex-none"
                                    :style="{ color: job.color + 'aa', '--job-color': job.color }">
                                    {{ role.period }}
                                </span>
                            </div>
                            <ul class="flex flex-col gap-1.5 max-w-4xl">
                                <li v-for="b in role.bullets" :key="b"
                                    class="flex gap-3 items-start text-sm text-white/55 font-light leading-relaxed">
                                    <span class="bullet-dash mt-[0.65em] h-px w-4 flex-none" aria-hidden="true" />
                                    {{ b }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<style scoped>
.job-rail,
.bullet-dash {
    background-color: var(--job-color);
}

.bullet-dash {
    opacity: 0.65;
}

/* Company name takes the job's accent on hover — brightened against dark
   glass, ink-darkened against light glass, so even deep colors like USF
   green and neon Pickle-Pockets yellow stay legible. */
.company {
    transition: color 0.3s ease;
}

.group:hover .company {
    color: color-mix(in srgb, var(--job-color) 65%, white);
}

html:not(.dark) .group:hover .company {
    color: color-mix(in srgb, var(--job-color) 55%, rgb(28, 28, 30));
}

/* Project accent colors are tuned for dark glass — darken them with ink for
   readable period stamps on light glass. */
html:not(.dark) .job-period {
    color: color-mix(in srgb, var(--job-color) 55%, rgb(28, 28, 30)) !important;
}

/* Pointer-following accent tint — visible only while the cursor is on the
   entry (the glow composable flips --glare-o between 0 and 1). */
.glow-tint {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: var(--glare-o, 0);
    transition: opacity 0.45s ease;
}
</style>
