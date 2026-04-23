<script setup lang="ts">
import { computed } from 'vue';
import { beds } from './bed-fleet';
import SgHeader from './SgHeader.vue';
import SgTitleBlock from './SgTitleBlock.vue';
import SgHero from './SgHero.vue';
import SgPlanView from './SgPlanView.vue';
import SgCallouts from './SgCallouts.vue';
import SgSpecs from './SgSpecs.vue';
import SgRevs from './SgRevs.vue';

const bedCount = computed(() => beds.length);
</script>

<template>
    <article class="sg-plate">
        <SgHeader />
        <SgTitleBlock />
        <SgHero :bed-count="bedCount" />
        <SgPlanView />
        <SgCallouts />
        <SgSpecs />
        <SgRevs />
    </article>
</template>

<style scoped>
.sg-plate {
    --paper: #0a3d6e;
    --paper-2: #0d4a84;
    --ink: #e8eef7;
    --ink-dim: rgba(232, 238, 247, 0.55);
    --cyan: #38bdf8;
    --cyan-dim: #075985;
    --error: #f87171;
    --error-bg: rgba(248, 113, 113, 0.08);
    --queue: rgba(232, 238, 247, 0.55);

    background: var(--paper);
    background-image:
        repeating-linear-gradient(0deg, rgba(56, 189, 248, 0.045) 0 1px, transparent 1px 32px),
        repeating-linear-gradient(90deg, rgba(56, 189, 248, 0.045) 0 1px, transparent 1px 32px),
        radial-gradient(ellipse at top, rgba(255, 255, 255, 0.04), transparent 60%);
    color: var(--ink);
    font-family: "IBM Plex Sans", "Inter", "SF Pro Display", sans-serif;
    padding: 3rem 2.5rem 4rem;
    position: relative;
    min-height: 100%;
}

.sg-plate,
.sg-plate * {
    font-feature-settings: "tnum" 1;
}
</style>
