<script setup lang="ts">
import { routerLinkName as baroRs } from '../baro-rs/info';
import { routerLinkName as kew } from '../kew/info';
import { routerLinkName as rootline } from '../rootline/info';
import { routerLinkName as sliceGuard } from '../slice-guard/info';
import { routerLinkName as regViz } from '../regviz/info';
import { routerLinkName as picklePockets } from '../pickle-pockets/info';

interface Featured {
    name: string;
    to: string;
    accent: string;
    blurb: string;
}

const featured: Featured[] = [
    { name: 'Baro-RS', to: baroRs, accent: '#f59e0b', blurb: 'Environmental monitoring in embedded Rust' },
    { name: 'kew', to: kew, accent: '#f97316', blurb: 'Local AI agents in one Rust binary' },
    { name: 'Rootline', to: rootline, accent: '#4ade80', blurb: 'A family tree drawn as botanical art' },
    { name: 'Slice Guard', to: sliceGuard, accent: '#38bdf8', blurb: 'Print-lab management, blueprint style' },
    { name: 'RegViz', to: regViz, accent: '#a78bfa', blurb: 'Regex internals, visualized end to end' },
    { name: 'Pickle Pockets', to: picklePockets, accent: '#dfff00', blurb: '3D-printed pickleball gear, sold for real' },
];
</script>

<template>
    <div class="w-full">
        <div v-reveal class="mb-8">
            <p class="font-mono text-xs uppercase tracking-[0.28em] text-white/40 mb-3">Selected work</p>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight text-white text-pretty">
                Projects
            </h2>
        </div>

        <!-- Outline-type index: names render as hollow strokes and flood with
             the project's accent on hover. Each row routes into that
             project's own world. -->
        <nav class="flex flex-col">
            <router-link v-for="(p, i) in featured" :key="p.name" :to="{ name: p.to }" v-reveal="{ delay: i * 60 }"
                class="proj group relative flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4 md:py-5 pr-12"
                :style="{ '--pa': p.accent }">
                <span
                    class="proj-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                    {{ p.name }}
                </span>
                <span class="proj-blurb font-mono text-[11px] md:text-xs uppercase tracking-wider text-white/40
                             group-hover:text-white/75 transition-colors duration-300">
                    {{ p.blurb }}
                </span>
                <i class="pi pi-arrow-right proj-arrow absolute right-2 top-1/2 -translate-y-1/2 text-lg" aria-hidden="true" />
            </router-link>
        </nav>

        <p v-reveal class="mt-6 font-mono text-xs uppercase tracking-wider text-white/35">
            + four more in the sidebar
        </p>
    </div>
</template>

<style scoped>
/* Hollow display type — stroke only until hovered, then the accent floods in.
   The row nudges right and the arrow arrives with the color. */
.proj-name {
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.5);
    transition: color 0.35s ease, -webkit-text-stroke-color 0.35s ease, transform 0.35s ease;
}

.proj:hover .proj-name {
    color: var(--pa);
    -webkit-text-stroke-color: transparent;
    transform: translateX(6px);
}

html:not(.dark) .proj-name {
    -webkit-text-stroke-color: rgba(28, 28, 30, 0.45);
}

html:not(.dark) .proj:hover .proj-name {
    color: color-mix(in srgb, var(--pa) 55%, rgb(28, 28, 30));
}

.proj-arrow {
    color: var(--pa);
    opacity: 0;
    transform: translate(-10px, -50%);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.proj:hover .proj-arrow {
    opacity: 1;
    transform: translate(0, -50%);
}

html:not(.dark) .proj-arrow {
    color: color-mix(in srgb, var(--pa) 55%, rgb(28, 28, 30));
}
</style>
