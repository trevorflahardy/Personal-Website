<script setup lang="ts">
import { computed } from 'vue';
import { beds } from './bed-fleet';
import SgBed from './SgBed.vue';

const bedCount = computed(() => beds.length);
const statusCounts = computed(() => {
    const c: Record<string, number> = { idle: 0, printing: 0, error: 0, queue: 0 };
    for (const b of beds) c[b.status] = (c[b.status] ?? 0) + 1;
    return c;
});
</script>

<template>
    <section class="sg-planview">
        <div class="sg-section-head">
            <span class="sg-label">PLAN · 01</span>
            <span class="sg-sublabel">floor layout · {{ bedCount }} beds · live status · hover to inspect</span>
        </div>
        <div class="sg-beds">
            <SgBed v-for="bed in beds" :key="bed.id" :bed="bed" />
        </div>
        <div class="sg-dim">
            <svg viewBox="0 0 1000 24" preserveAspectRatio="none" class="sg-dim-svg">
                <line x1="2" y1="12" x2="998" y2="12" stroke="currentColor" stroke-width="0.8" />
                <polyline points="8,6 2,12 8,18" fill="none" stroke="currentColor" stroke-width="0.8" />
                <polyline points="992,6 998,12 992,18" fill="none" stroke="currentColor" stroke-width="0.8" />
            </svg>
            <span class="sg-dim-label">
                {{ bedCount }} UNITS · AUTO-FIT GRID ·
                <span class="sg-dim-num">{{ statusCounts.printing }}</span> PRINTING ·
                <span class="sg-dim-num">{{ statusCounts.queue }}</span> QUEUED ·
                <span class="sg-dim-num">{{ statusCounts.idle }}</span> IDLE ·
                <span class="sg-dim-num">{{ statusCounts.error }}</span> ERROR
            </span>
        </div>
    </section>
</template>

<style scoped>
.sg-planview {
    margin: 3rem 0 3.5rem;
}

.sg-section-head {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid rgba(232, 238, 247, 0.2);
    padding-bottom: 0.6rem;
    margin-bottom: 1.5rem;
}

.sg-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    color: var(--cyan);
}

.sg-sublabel {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    color: var(--ink-dim);
    letter-spacing: 0.1em;
}

.sg-beds {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 0;
    border: 1px solid var(--cyan);
}

.sg-dim {
    margin-top: 0.75rem;
    color: var(--cyan);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.sg-dim-svg {
    width: 100%;
    height: 1.2rem;
}

.sg-dim-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: var(--ink-dim);
    text-align: center;
}

.sg-dim-num {
    color: var(--cyan);
    font-weight: 700;
    margin: 0 0.15rem;
}
</style>
