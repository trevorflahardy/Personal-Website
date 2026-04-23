<script setup lang="ts">
import { stack } from './cnt-data';
</script>

<template>
    <section class="chalk-stack">
        <h2 class="stack-head">Tech Stack</h2>
        <div class="stack-grid">
            <div v-for="s in stack" :key="s.k" class="stack-item">
                <span class="stack-k">{{ s.k }}</span>
                <span class="stack-v">{{ s.v }}</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.chalk-stack {
    position: relative;
    z-index: 2;
    padding: 3.5rem clamp(1.5rem, 6vw, 5rem);
    border-bottom: 1px dashed var(--rule);
}

.stack-head {
    font-family: "Caveat", cursive;
    font-size: 1.9rem;
    margin: 0 0 1.5rem;
    color: var(--chalk);
}

.stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 0.75rem;
}

.stack-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.85rem 1rem;
    border: 1px dashed var(--rule);
    border-radius: 4px;
    background: rgba(240, 236, 224, 0.03);
}

.stack-k {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--chalk-yellow);
}

.stack-v {
    font-size: 0.9rem;
    color: var(--chalk-soft);
    font-family: ui-sans-serif, system-ui, sans-serif;
}
</style>
