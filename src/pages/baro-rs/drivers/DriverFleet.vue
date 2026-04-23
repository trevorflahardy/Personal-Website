<script setup lang="ts">
import type { Driver } from './driver-data';

defineProps<{ otherDrivers: Driver[] }>();
</script>

<template>
    <section class="act act-other">
        <div class="act-label">// fleet · other drivers</div>
        <ul class="other-list">
            <router-link v-for="d in otherDrivers" :key="d.id"
                :to="{ name: 'baro-rs-driver', params: { driverId: d.id } }"
                class="other-row" :style="{ '--odc': d.color }">
                <span class="other-idx">&rarr;</span>
                <span class="other-swatch" />
                <span class="other-name">{{ d.id }}</span>
                <span class="other-full">{{ d.fullName }}</span>
            </router-link>
        </ul>
    </section>
</template>

<style scoped>
.act-other { padding: 4rem 2.5rem; }

@media (max-width: 700px) {
    .act-other { padding: 2.5rem 1.25rem; }
}

.other-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0;
}

.other-row {
    display: grid;
    grid-template-columns: 1.5rem 0.75rem 6rem 1fr;
    gap: 1rem;
    align-items: baseline;
    padding: 0.9rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    text-decoration: none;
    color: var(--bone);
    font-size: 0.9rem;
    transition: background 200ms ease, padding-left 200ms ease;
}

.other-row:hover {
    background: rgba(255, 255, 255, 0.02);
    padding-left: 0.5rem;
}

.other-idx { color: rgba(248, 250, 252, 0.35); }

.other-row:hover .other-idx {
    color: var(--odc);
    transform: translateX(3px);
}

.other-swatch {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--odc);
    box-shadow: 0 0 10px color-mix(in srgb, var(--odc) 55%, transparent);
    transform: translateY(0.25rem);
}

.other-name {
    color: var(--bone);
    font-weight: 600;
    letter-spacing: 0.02em;
}

.other-full {
    color: rgba(248, 250, 252, 0.5);
    font-size: 0.78rem;
}

@media (max-width: 700px) {
    .other-row { grid-template-columns: 1rem 0.55rem 1fr; }
    .other-full { display: none; }
}
</style>
