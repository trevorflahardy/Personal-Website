<script setup lang="ts">
import type { CntFeature } from './cnt-data';

defineProps<{
    feature: CntFeature;
    flip?: boolean;
}>();
</script>

<template>
    <div class="feature-row" :class="flip ? 'feature-row--flip' : ''">
        <div class="feature-text">
            <div class="feature-eyebrow">
                <span class="feature-icon">{{ feature.icon }}</span>
                <span class="feature-sub">{{ feature.sub }}</span>
            </div>
            <h2 class="feature-title">{{ feature.title }}</h2>
            <p class="feature-body">{{ feature.body }}</p>
            <ul v-if="feature.chapters.length" class="chapter-list">
                <li v-for="ch in feature.chapters" :key="ch">{{ ch }}</li>
            </ul>
        </div>
        <div class="feature-shot">
            <img :src="feature.img" :alt="feature.imgAlt" loading="lazy" />
        </div>
    </div>
</template>

<style scoped>
.feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 5rem);
    align-items: center;
    padding: 4rem clamp(1.5rem, 6vw, 5rem);
    border-bottom: 1px dashed var(--rule);
}

.feature-row--flip {
    direction: rtl;
}

.feature-row--flip > * {
    direction: ltr;
}

@media (max-width: 900px) {
    .feature-row,
    .feature-row--flip {
        grid-template-columns: 1fr;
        direction: ltr;
    }

    .feature-shot {
        order: -1;
    }
}

.feature-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 0.75rem;
}

.feature-icon {
    font-size: 1.4rem;
}

.feature-sub {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--chalk-blue);
}

.feature-title {
    font-family: "Caveat", cursive;
    font-size: 2.2rem;
    margin: 0 0 0.75rem;
    color: var(--chalk);
}

.feature-body {
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--chalk-soft);
    margin: 0 0 1rem;
    font-family: ui-sans-serif, system-ui, sans-serif;
}

.chapter-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.chapter-list li {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.76rem;
    letter-spacing: 0.04em;
    color: var(--chalk-mute);
    padding-left: 1rem;
    position: relative;
}

.chapter-list li::before {
    content: "·";
    position: absolute;
    left: 0;
    color: var(--chalk-yellow);
}

.feature-shot {
    border: 1px dashed var(--rule);
    border-radius: 6px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.feature-shot img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 300ms ease;
}

.feature-shot:hover img {
    transform: scale(1.02);
}
</style>
