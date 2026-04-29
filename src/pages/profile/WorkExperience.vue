<script setup lang="ts">
import { jobs } from './work-data';
</script>

<template>
    <div class="w-full">
        <div class="mb-8">
            <h2 class="title-2 mb-2">Work &amp; experience</h2>
            <p class="subtitle">Where the projects came from.</p>
        </div>

        <div class="relative flex flex-col gap-0">
            <div class="absolute left-[19px] top-3 bottom-3 w-px bg-white/8 hidden sm:block pointer-events-none" />

            <div v-for="(job, ji) in jobs" :key="job.company"
                class="relative flex flex-col sm:flex-row gap-0 sm:gap-6 mb-8 last:mb-0">

                <div class="hidden sm:flex flex-col items-center flex-none w-10 pt-1">
                    <div class="w-3.5 h-3.5 rounded-full border-2 flex-none z-10"
                        :style="{ backgroundColor: job.color + '40', borderColor: job.color }" />
                </div>

                <div class="flex-1 rounded-2xl border bg-white/[0.02] overflow-hidden"
                    :style="{ borderColor: job.color + '25' }">

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
