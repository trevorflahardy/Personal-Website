<script setup lang="ts">
const jobs = [
    {
        company: 'University of South Florida',
        url: 'https://www.usf.edu',
        color: '#006747',
        roles: [
            {
                title: 'Lead Teaching Assistant — 3D Printing Lab Operations',
                period: 'Nov 2025 – Present',
                bullets: [
                    'Led maintenance, upgrades, and repair operations for 12 course-operated FDM printers — full disassembly, diagnostics, part sourcing, reassembly, and cooling/calibration improvements.',
                    'Rewrote instructional materials to shift from checklist compliance to conceptual understanding; led full slicer migration to Orca Flashforge across all lab sections.',
                    'Produced and distributed 500+ durable 3D-printed STEM outreach items for elementary and middle school events.',
                    'Built SliceGuard — an internal web app to replace email submissions, manual file checks, and ad-hoc filament tracking with a unified request-management system.',
                ],
            },
            {
                title: 'Student Assistant — Foundations of Engineering Lab',
                period: 'Jan 2025 – Present',
                bullets: [
                    'Lead weekly lab sessions covering robotics, programming, circuit construction, and mechanical design for a 200-student engineering course.',
                    'Developed "The Foundations Resource Hub" — an open-source Sphinx/ReadTheDocs tutorial enabling consistent self-paced learning across all course sections.',
                    'Refactored Canvas assignments and provided structured feedback on technical presentations and written reports.',
                ],
            },
        ],
    },
    {
        company: 'Pickle Pockets',
        url: 'https://picklepockets.shop',
        color: '#dfff00',
        roles: [
            {
                title: 'Founder & Product Designer',
                period: 'Aug 2025 – Present',
                bullets: [
                    'Designed and launched the Tri Pickle Pocket — a lightweight, 3D-printed PETG carabiner holder for pickleballs — from first prototype through manufacturing to retail.',
                    'Built and managed a Shopify storefront with SEO, collections, and automated fulfillment; ran Meta Ads and Instagram campaigns.',
                    'Established wholesale partnerships with local pickleball clubs and retail outlets; implemented customer feedback loops to optimize product-market fit.',
                ],
            },
        ],
    },
    {
        company: 'Chai Designs',
        url: null,
        color: '#7f5cff',
        roles: [
            {
                title: 'Full Stack Developer',
                period: 'Aug 2024 – Dec 2025',
                bullets: [
                    'Designed and built production websites and web applications using Vue.js and React, leveraging Bun for fast builds and modern tooling.',
                    'Implemented full-stack architectures with live database-backed data — schema design, API development, and efficient querying.',
                    'Built and integrated secure user authentication and authorization systems; developed internal Rust tooling for performance-critical workflows.',
                ],
            },
        ],
    },
    {
        company: 'Self-employed — Cryptocurrency & Blockchain',
        url: null,
        color: '#f97316',
        roles: [
            {
                title: 'Full-Stack Software Developer',
                period: 'Feb 2020 – Jun 2024',
                bullets: [
                    'Developed custom user panels for NFT project launches — purchase, sale, and management of Solana and Ethereum NFTs — using Vue.js, React, and SQL.',
                    'Engineered Solana smart contracts in Rust for Discord integration to deliver NFT-gated perks.',
                    'Collaborated with 223 clients to build and deploy blockchain solutions; reached a community of 1M+ users across all systems.',
                ],
            },
        ],
    },
    {
        company: 'Florida Virtual School',
        url: 'https://www.flvs.net',
        color: '#38bdf8',
        roles: [
            {
                title: 'Software Engineering Tutor',
                period: 'Jun 2020 – Jun 2023',
                bullets: [
                    'Taught software engineering practices including designing, building, testing, and debugging Python programs.',
                    'Covered Object-Oriented principles — polymorphism, encapsulation, and abstraction — with high school students over 3 years.',
                ],
            },
        ],
    },
];
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
