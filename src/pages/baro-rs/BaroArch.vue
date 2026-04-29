<script setup lang="ts">
import { computed } from 'vue';
import { architectureNodes, architectureLinks, type ArchNode } from './act-data';

const nodeById = (id: string): ArchNode =>
    architectureNodes.find((n) => n.id === id) as ArchNode;

// Nodes are placed with CSS `top: n.y + '%'` (0-100 space). The SVG uses
// viewBox "0 0 100 100" so SVG y coordinates map 1:1 to CSS percentages.
// The ±4 offset is an approximate half-height of a node card in percentage
// units (~4% of 34rem container).
const archEdges = computed(() =>
    architectureLinks.map(([a, b]) => {
        const s = nodeById(a);
        const t = nodeById(b);
        const sy = s.y + 4;
        const ty = t.y - 4;
        const midY = (sy + ty) / 2;
        return {
            d: `M ${s.x} ${sy} L ${s.x} ${midY} L ${t.x} ${midY} L ${t.x} ${ty}`,
            sx: s.x, sy, tx: t.x, ty,
        };
    }),
);
</script>

<template>
    <section class="act act-arch" data-act="03 · architecture">
        <div class="arch-label section-label">// architecture · internal topology</div>
        <p class="arch-lede">
            four levels, async end-to-end. every edge is a typed channel;
            every node a polled future that yields when its work is done.
        </p>
        <div class="arch-canvas">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="arch-svg">
                <template v-for="(e, i) in archEdges" :key="i">
                    <path :d="e.d" class="arch-edge" />
                    <circle :cx="e.sx" :cy="e.sy" r="0.55" class="arch-dot" />
                    <circle :cx="e.tx" :cy="e.ty" r="0.55" class="arch-dot" />
                </template>
            </svg>
            <div v-for="n in architectureNodes" :key="n.id"
                class="arch-node" :class="`arch-node--${n.kind}`"
                :style="{ left: n.x + '%', top: n.y + '%' }">
                <span class="arch-node-label">{{ n.label }}</span>
                <span class="arch-node-sub">{{ n.sub }}</span>
            </div>
        </div>

        <div class="arch-legend">
            <div class="legend-item"><span class="legend-chip legend-chip--root" />compute root</div>
            <div class="legend-item"><span class="legend-chip legend-chip--hub" />async runtime · bus</div>
            <div class="legend-item"><span class="legend-chip legend-chip--leaf" />driver cluster</div>
        </div>
    </section>
</template>

<style scoped>
.act-arch { padding: 6rem 2.5rem; }

.arch-lede {
    max-width: 48rem;
    margin: 0.75rem 0 2.25rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.88rem;
    line-height: 1.6;
    color: rgba(248, 250, 252, 0.55);
}

.arch-canvas {
    position: relative;
    height: 34rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: var(--graphite-2);
    background-image:
        linear-gradient(rgba(245, 158, 11, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(245, 158, 11, 0.04) 1px, transparent 1px);
    background-size: 24px 24px;
    overflow: visible;
    border-radius: 2px;
}

.arch-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
}

.arch-edge {
    fill: none;
    stroke: rgba(245, 158, 11, 0.55);
    stroke-width: 0.28;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
}

.arch-dot {
    fill: var(--amber);
    filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.8));
}

.arch-node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.55rem 0.9rem;
    background: var(--graphite);
    font-family: "SF Mono", ui-monospace, monospace;
    width: 11rem;
    text-align: center;
    border: 1px solid rgba(245, 158, 11, 0.45);
    box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.5),
        0 8px 24px rgba(0, 0, 0, 0.35);
}

.arch-node--root {
    border-color: var(--amber);
    box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.5),
        0 0 24px rgba(245, 158, 11, 0.22),
        0 8px 28px rgba(0, 0, 0, 0.45);
}

.arch-node--hub {
    border-color: rgba(245, 158, 11, 0.6);
}

.arch-node--leaf {
    border-color: rgba(245, 158, 11, 0.28);
    background: rgba(15, 17, 21, 0.85);
}

.arch-node-label {
    font-size: 0.74rem;
    letter-spacing: 0.22em;
    color: var(--amber);
    font-weight: 600;
}

.arch-node-sub {
    font-size: 0.64rem;
    color: rgba(248, 250, 252, 0.55);
    letter-spacing: 0.04em;
    line-height: 1.35;
}

.arch-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1.5rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    color: rgba(248, 250, 252, 0.45);
    text-transform: uppercase;
}

.legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.legend-chip {
    display: inline-block;
    width: 0.85rem;
    height: 0.85rem;
    border: 1px solid rgba(245, 158, 11, 0.45);
    background: var(--graphite);
}

.legend-chip--root {
    border-color: var(--amber);
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}

.legend-chip--hub {
    border-color: rgba(245, 158, 11, 0.6);
}

.legend-chip--leaf {
    border-color: rgba(245, 158, 11, 0.28);
    background: rgba(15, 17, 21, 0.85);
}
</style>
