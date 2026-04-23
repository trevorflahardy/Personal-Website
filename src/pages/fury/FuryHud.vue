<script setup lang="ts">
import { stats } from './fury-data';
</script>

<template>
    <section class="fury-hud">
        <div v-for="s in stats" :key="s.l" class="hud-tile">
            <span class="hud-tile__v">{{ s.v }}</span>
            <span class="hud-tile__l">{{ s.l }}</span>
        </div>
    </section>
</template>

<style scoped>
.fury-hud {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    margin: 0 clamp(1.25rem, 4vw, 3rem);
    background: var(--rule);
    border: 1px solid var(--rule);
}

@media (max-width: 640px) {
    .fury-hud { grid-template-columns: repeat(2, 1fr); }
}

.hud-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.4rem 0.75rem;
    background: rgba(10, 5, 20, 0.7);
}

.hud-tile__v {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    color: var(--neon-2);
    text-shadow: 0 0 12px rgba(78, 219, 252, 0.6);
    font-variant-numeric: tabular-nums;
}

.hud-tile__l {
    font-size: 0.56rem;
    letter-spacing: 0.22em;
    color: var(--mute);
}
</style>
