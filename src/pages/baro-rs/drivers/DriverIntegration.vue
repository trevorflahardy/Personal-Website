<script setup lang="ts">
import type { Driver } from './driver-data';

defineProps<{ driver: Driver }>();
</script>

<template>
    <section class="act act-integration">
        <div class="act-label">// integration · baro.rs</div>
        <p class="integration-prose">{{ driver.usedInBaroRs }}</p>
        <a :href="driver.repo" target="_blank" rel="noopener" class="source-link">
            view source on github &rarr;
        </a>
    </section>
</template>

<style scoped>
.act-integration { padding: 4rem 2.5rem; }

@media (max-width: 700px) {
    .act-integration { padding: 2.5rem 1.25rem; }
}

.integration-prose {
    font-family: "Geist", "Inter", system-ui, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: rgba(248, 250, 252, 0.82);
    max-width: 52rem;
    margin: 0 0 2rem 0;
}

.source-link {
    display: inline-block;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--dc);
    text-decoration: none;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid color-mix(in srgb, var(--dc) 40%, transparent);
    transition: border-color 200ms ease;
}

.source-link:hover { border-bottom-color: var(--dc); }
</style>
