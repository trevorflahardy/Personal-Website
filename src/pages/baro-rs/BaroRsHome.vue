<script setup lang="ts">
import BaroHero from './BaroHero.vue';
import BaroOrigin from './BaroOrigin.vue';
import BaroDrivers from './BaroDrivers.vue';
import BaroArch from './BaroArch.vue';
import BaroLog from './BaroLog.vue';
import { useLenis } from '@/composables/useLenis';

useLenis();
</script>

<template>
    <article class="baro-page">
        <BaroHero />
        <BaroOrigin />
        <BaroDrivers />
        <BaroArch />
        <BaroLog />
    </article>
</template>

<style scoped>
.baro-page {
    --ink: #f8fafc;
    --amber: #f59e0b;
    --amber-glow: rgba(245, 158, 11, 0.65);
    --copper: #b87333;
    --graphite: #0b0e10;
    --graphite-2: #14181c;

    display: block;
    background: var(--graphite);
    color: var(--ink);
    font-family: "SF Pro Display", "Inter", sans-serif;
    background-image:
        linear-gradient(rgba(245, 158, 11, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(245, 158, 11, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    min-height: 100%;
}

/* The shared .act chrome is applied to every section across the child
   components. :deep() is required because scoped CSS on .baro-page would
   otherwise be scoped to elements inside this component, not to those
   rendered by the Baro-* children. The writing-mode vertical gutter
   numbering is the thesis-defining pattern — see .claude/skills/page-baro-rs. */
.baro-page :deep(.act) {
    position: relative;
    padding: 6rem clamp(1.5rem, 6vw, 6rem);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.baro-page :deep(.act::before) {
    content: attr(data-act);
    position: absolute;
    left: clamp(1rem, 3vw, 3rem);
    top: 4.2rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.28em;
    color: rgba(245, 158, 11, 0.4);
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-transform: uppercase;
    pointer-events: none;
}

/* Small section label shared by every act */
.baro-page :deep(.section-label) {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    color: var(--amber);
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: inline-block;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.35);
}
</style>
