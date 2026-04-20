<script setup lang="ts">
const jobs = [
    {
        company: 'University of South Florida',
        url: 'https://www.usf.edu',
        period: '2023 – Present',
        color: '#006747',
        roles: [
            {
                title: 'Undergraduate Teaching Assistant — Theory of Computation (COT 4210)',
                period: 'Jan 2025 – Present',
                bullets: [
                    'Lead weekly office hours and review sessions for 100+ students covering formal languages, automata, and computability.',
                    'Designed RegViz — a Rust + WASM visualizer that traces the full RE → NFA → DFA → MinDFA pipeline — to give students interactive intuition for the algorithms.',
                ],
            },
            {
                title: '3D Printing Lab Teaching Assistant',
                period: 'Aug 2023 – Present',
                bullets: [
                    'Manage 12 production FDM printers. Review and approve student print requests, troubleshoot hardware failures, and maintain filament inventory.',
                    'Identified recurring workflow bottlenecks — email submissions, manual file checks, no filament tracking — and built SliceGuard to fix them.',
                ],
            },
        ],
    },
    {
        company: 'Pickle Pockets',
        url: 'https://picklepockets.shop',
        period: '2024 – Present',
        color: '#dfff00',
        roles: [
            {
                title: 'Founder',
                period: '2024 – Present',
                bullets: [
                    'Invented a pickleball with a built-in pocket, filed a provisional patent, and launched a direct-to-consumer Shopify storefront.',
                    'Handled brand identity, product photography, and everything from manufacturing sourcing to fulfillment.',
                ],
            },
        ],
    },
    {
        company: 'Chai Designs',
        url: null,
        period: '2022 – 2023',
        color: '#7f5cff',
        roles: [
            {
                title: 'Founder & Developer',
                period: '2022 – 2023',
                bullets: [
                    'Built and operated Chai, a Discord bot that served 250k+ users across 1,500+ servers with moderation, logging, and utility features.',
                    'Managed a Python + PostgreSQL backend, handled billing integrations, and grew the product organically to a paying user base.',
                ],
            },
        ],
    },
    {
        company: 'Independent — Crypto Trading Systems',
        url: null,
        period: '2021 – 2022',
        color: '#f97316',
        roles: [
            {
                title: 'Algorithm Developer',
                period: '2021 – 2022',
                bullets: [
                    'Developed and backtested automated trading strategies using Python. Integrated exchange APIs for live order execution.',
                    'Built real-time data pipelines and dashboards for monitoring market signals and position performance.',
                ],
            },
        ],
    },
    {
        company: 'Florida Virtual School',
        url: 'https://www.flvs.net',
        period: '2020 – 2021',
        color: '#38bdf8',
        roles: [
            {
                title: 'Student Instructor — Computer Science',
                period: '2020 – 2021',
                bullets: [
                    "Tutored high school students in AP Computer Science Principles and introductory programming as part of FLVS's peer learning program.",
                ],
            },
        ],
    },
];
</script>

<template>
    <div class="w-full">
        <!-- Header -->
        <div class="mb-8">
            <h2 class="title-2 mb-2">Work &amp; experience</h2>
            <p class="subtitle">Where the projects came from.</p>
        </div>

        <!-- Timeline -->
        <div class="relative flex flex-col gap-0">
            <!-- Vertical spine -->
            <div class="absolute left-[19px] top-3 bottom-3 w-px bg-white/8 hidden sm:block pointer-events-none" />

            <div v-for="(job, ji) in jobs" :key="job.company"
                class="relative flex flex-col sm:flex-row gap-0 sm:gap-6 mb-8 last:mb-0">

                <!-- Timeline dot -->
                <div class="hidden sm:flex flex-col items-center flex-none w-10 pt-1">
                    <div class="w-3.5 h-3.5 rounded-full border-2 flex-none z-10"
                        :style="{ backgroundColor: job.color + '40', borderColor: job.color }" />
                </div>

                <!-- Content card -->
                <div class="flex-1 rounded-2xl border bg-white/[0.02] overflow-hidden"
                    :style="{ borderColor: job.color + '25' }">

                    <!-- Company header bar -->
                    <div class="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b"
                        :style="{ borderColor: job.color + '20', backgroundColor: job.color + '08' }">
                        <div class="flex items-center gap-2.5">
                            <div class="w-2 h-2 rounded-full flex-none" :style="{ backgroundColor: job.color }" />
                            <span class="font-semibold text-white text-sm">{{ job.company }}</span>
                        </div>
                        <span class="text-xs font-mono text-white/40">{{ job.period }}</span>
                    </div>

                    <!-- Roles -->
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
