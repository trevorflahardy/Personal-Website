<script setup lang="ts">
import { nodes } from './rootline-data';
</script>

<template>
    <section class="hero-specimen">
        <h1 class="specimen-title">
            A family tree,<br />
            <i>cultivated together.</i>
        </h1>
        <p class="specimen-sub">
            Collaborative genealogy — pan, zoom, edit in live company, and trace the green line between any two names.
        </p>

        <div class="tree-wrap">
            <svg viewBox="0 0 400 220" class="tree-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <path d="M200 30 Q200 58 140 88" class="branch" />
                <path d="M200 30 Q200 58 260 88" class="branch" />
                <path d="M140 88 Q120 128 80 164" class="branch" />
                <path d="M140 88 Q160 128 180 164" class="branch" />
                <path d="M260 88 Q280 128 300 164" class="branch" />
                <path d="M80 172 Q60 200 50 220" class="root" />
                <path d="M180 172 Q180 200 180 220" class="root" />
                <path d="M300 172 Q320 200 340 220" class="root" />
                <g v-for="n in nodes" :key="n.id">
                    <circle :cx="n.x" :cy="n.y" r="5.5" class="node" />
                    <text :x="n.x" :y="n.y - 10" class="node-label"
                        :text-anchor="n.side === 'left' ? 'end' : n.side === 'right' ? 'start' : 'middle'">
                        {{ n.label }}
                    </text>
                </g>
            </svg>
        </div>
    </section>
</template>

<style scoped>
.hero-specimen {
    max-width: 64rem;
    margin: 0 auto 4rem;
}

.specimen-title {
    font-size: clamp(2.6rem, 5.5vw, 4.6rem);
    font-weight: 400;
    line-height: 1.02;
    letter-spacing: -0.015em;
    color: var(--ink);
    margin: 0 0 1rem;
}

.specimen-title i {
    color: var(--forest);
    font-style: italic;
    font-weight: 400;
}

.specimen-sub {
    max-width: 30rem;
    font-size: 1rem;
    color: var(--ink-dim);
    margin: 0 0 2.5rem;
    line-height: 1.6;
    font-style: italic;
}

.tree-wrap {
    max-width: 50rem;
    margin: 0 auto;
}

.tree-svg {
    width: 100%;
    height: auto;
    display: block;
}

.tree-svg .branch,
.tree-svg .root {
    fill: none;
    stroke: var(--forest);
    stroke-width: 1;
    stroke-linecap: round;
    opacity: 0.85;
}

.tree-svg .root {
    stroke: var(--forest-deep);
    opacity: 0.6;
    stroke-dasharray: 2 3;
}

.tree-svg .node {
    fill: var(--paper);
    stroke: var(--forest);
    stroke-width: 1.5;
}

.tree-svg .node-label {
    font-family: "Georgia", serif;
    font-style: italic;
    font-size: 8px;
    fill: var(--ink);
    letter-spacing: 0.02em;
}
</style>
