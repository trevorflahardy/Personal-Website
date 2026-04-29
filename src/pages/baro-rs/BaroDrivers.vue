<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { drivers } from './drivers/driver-data';

const driverList = Object.values(drivers);
</script>

<template>
    <section class="act act-drivers" id="drivers" data-act="02 · drivers">
        <div class="drivers-label section-label">// 06 drivers · embedded-hal 1.0</div>
        <h2 class="drivers-title">six instruments, one bus.</h2>
        <p class="drivers-kicker">each driver is its own crate, tested in isolation, shared by anyone on crates.io. click through for the full implementation notes.</p>
        <div class="drivers-stack">
            <RouterLink v-for="(d, i) in driverList" :key="d.id"
                :to="{ name: 'baro-rs-driver', params: { driverId: d.id } }"
                class="driver-row" :style="{ '--dc': d.color }">
                <span class="driver-idx">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="driver-swatch" />
                <div class="driver-body">
                    <div class="driver-name">{{ d.name }}</div>
                    <div class="driver-tag">{{ d.tagline }}</div>
                </div>
                <div class="driver-meta">
                    <span>{{ d.protocol }}</span>
                    <span>{{ d.keyMetric }}</span>
                </div>
                <span class="driver-arrow">&rarr;</span>
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>
.act-drivers { padding: 6rem 2.5rem; }

.drivers-title {
    font-size: clamp(1.7rem, 3vw, 2.8rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0 0 0.75rem;
    color: var(--ink);
}

.drivers-kicker {
    max-width: 36rem;
    font-size: 0.95rem;
    color: rgba(248, 250, 252, 0.65);
    margin: 0 0 2.5rem;
    line-height: 1.6;
}

.drivers-stack {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.driver-row {
    display: grid;
    grid-template-columns: 2.5rem 0.5rem 1fr auto 1.5rem;
    gap: 1.25rem;
    align-items: center;
    padding: 1.15rem 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    text-decoration: none;
    color: inherit;
    transition: background-color 0.25s ease, padding 0.25s ease;
    position: relative;
}

.driver-row::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--dc, var(--amber));
    transform: scaleY(0.2);
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.driver-row:hover {
    background: rgba(245, 158, 11, 0.04);
    padding-left: 1rem;
}

.driver-row:hover::before { transform: scaleY(1); }

.driver-idx {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(248, 250, 252, 0.35);
    letter-spacing: 0.12em;
}

.driver-swatch {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--dc, var(--amber));
    box-shadow: 0 0 12px color-mix(in srgb, var(--dc, var(--amber)) 60%, transparent);
}

.driver-name {
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: -0.005em;
    margin-bottom: 0.15rem;
}

.driver-tag {
    font-size: 0.85rem;
    color: rgba(248, 250, 252, 0.55);
    line-height: 1.45;
}

.driver-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: rgba(248, 250, 252, 0.5);
}

.driver-arrow {
    font-family: "SF Mono", ui-monospace, monospace;
    color: rgba(248, 250, 252, 0.35);
    transition: transform 0.25s ease, color 0.25s ease;
}

.driver-row:hover .driver-arrow {
    transform: translateX(4px);
    color: var(--dc, var(--amber));
}
</style>
