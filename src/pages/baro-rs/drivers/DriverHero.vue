<script setup lang="ts">
import type { Driver } from './driver-data';

defineProps<{ driver: Driver }>();
</script>

<template>
    <section class="act act-hero">
        <router-link :to="{ name: 'project-baro-rs' }" class="crumb">
            <span class="crumb-chev">&larr;</span>
            <span class="crumb-root">// baro.rs</span>
            <span class="crumb-slash">/</span>
            <span class="crumb-leaf">{{ driver.id }}</span>
        </router-link>

        <div class="proto-chip">
            <span class="chip-dot" />
            <span>{{ driver.protocol }} · no_std · embedded-hal 1.0</span>
        </div>

        <h1 class="drv-title">{{ driver.name.toLowerCase() }}</h1>
        <p class="drv-subtitle">{{ driver.fullName }}</p>

        <p class="drv-lede">{{ driver.description }}</p>

        <div class="hero-meta">
            <span>&bull; open source</span>
            <span class="sep">/</span>
            <span>MIT</span>
            <span class="sep">/</span>
            <span>embedded-hal 1.0</span>
            <span class="sep">/</span>
            <span>crates.io ready</span>
        </div>
    </section>
</template>

<style scoped>
.act-hero {
    padding: 5rem 2.5rem;
}

@media (max-width: 700px) {
    .act-hero { padding: 2.5rem 1.25rem; }
}

.crumb {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    color: rgba(248, 250, 252, 0.55);
    text-decoration: none;
    margin-bottom: 2rem;
    transition: color 200ms ease;
}

.crumb:hover { color: var(--bone); }
.crumb:hover .crumb-chev { transform: translateX(-2px); }
.crumb-chev { transition: transform 200ms ease; }
.crumb-root { color: var(--dc); }
.crumb-slash { color: rgba(248, 250, 252, 0.25); }
.crumb-leaf { color: var(--bone); font-weight: 600; }

.proto-chip {
    display: inline-flex;
    gap: 0.55rem;
    align-items: center;
    padding: 0.4rem 0.85rem;
    border: 1px solid color-mix(in srgb, var(--dc) 45%, transparent);
    background: color-mix(in srgb, var(--dc) 10%, transparent);
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--dc);
    margin-bottom: 2.5rem;
}

.chip-dot {
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
    background: var(--dc);
    box-shadow: 0 0 8px var(--dc);
    animation: chip-pulse 2s ease-in-out infinite;
}

@keyframes chip-pulse {
    50% { opacity: 0.45; }
}

.drv-title {
    font-family: "Geist", "Inter", system-ui, sans-serif;
    font-weight: 800;
    font-size: clamp(3rem, 10vw, 7rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin: 0 0 0.5rem 0;
    color: var(--bone);
}

.drv-subtitle {
    font-size: 0.88rem;
    letter-spacing: 0.05em;
    color: color-mix(in srgb, var(--dc) 75%, rgba(248, 250, 252, 0.6));
    margin: 0 0 1.5rem 0;
}

.drv-lede {
    max-width: 48rem;
    font-size: 1rem;
    line-height: 1.65;
    color: rgba(248, 250, 252, 0.72);
    margin: 0 0 2rem 0;
}

.hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(248, 250, 252, 0.4);
}

.hero-meta .sep { color: rgba(248, 250, 252, 0.18); }

@media (prefers-reduced-motion: reduce) {
    .chip-dot { animation: none !important; }
}
</style>
