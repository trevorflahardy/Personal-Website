<script setup lang="ts">
import { dfaStates, dfaEdges, stateById, edgePath, labelPos } from './regviz-data';
</script>

<template>
    <figure class="figure figure--main">
        <svg viewBox="0 0 620 260" class="dfa-svg" role="img" aria-label="DFA diagram for a(b|c)*d">
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 Z" fill="#2a1f18" />
                </marker>
            </defs>
            <g class="edges">
                <g v-for="(e, i) in dfaEdges" :key="i">
                    <path :d="edgePath(stateById(e.from), stateById(e.to))"
                        class="dfa-edge" marker-end="url(#arrow)" />
                    <text :x="labelPos(stateById(e.from), stateById(e.to)).x"
                        :y="labelPos(stateById(e.from), stateById(e.to)).y"
                        class="dfa-edge-label">{{ e.label }}</text>
                </g>
            </g>
            <g class="states">
                <g v-for="s in dfaStates" :key="s.id">
                    <circle :cx="s.x" :cy="s.y" r="22" class="dfa-state"
                        :class="{ 'is-start': s.start, 'is-accept': s.accept }" />
                    <circle v-if="s.accept" :cx="s.x" :cy="s.y" r="17" class="dfa-state-inner" />
                    <text :x="s.x" :y="s.y + 5" class="dfa-state-label">{{ s.label }}</text>
                    <text v-if="s.start" :x="s.x - 34" :y="s.y + 4" class="dfa-start-arrow">→</text>
                </g>
            </g>
        </svg>
        <figcaption>
            <span class="figure-tag">Figure I.</span>
            DFA accepting <code>a(b|c)*d</code>. States <code>q₀</code>–<code>q₄</code> form the transition graph; ε-edges mark NFA-to-DFA subset identifications. The accepting state <code>q₄</code> carries a double boundary per convention.
        </figcaption>
        <aside class="margin-note margin-note--figure">
            <span class="underline-wave">accepting state</span><br>
            <span class="margin-arrow">↖</span>
        </aside>
    </figure>
</template>

<style scoped>
.figure {
    position: relative;
    margin: 3.5rem 0 3rem;
}

.figure--main { text-align: center; }

.dfa-svg {
    width: 100%;
    max-width: 640px;
    height: auto;
    margin: 0 auto 1rem;
    display: block;
}

.dfa-state { fill: var(--paper-hi); stroke: var(--ink); stroke-width: 1.5; }
.dfa-state.is-accept { stroke-width: 2; }
.dfa-state-inner { fill: none; stroke: var(--ink); stroke-width: 1.2; }
.dfa-state-label {
    font-family: "EB Garamond", serif;
    font-size: 16px;
    font-style: italic;
    fill: var(--ink);
    text-anchor: middle;
}
.dfa-edge { fill: none; stroke: var(--ink); stroke-width: 1.1; }
.dfa-edge-label {
    font-family: "EB Garamond", serif;
    font-size: 13px;
    font-style: italic;
    fill: var(--ink);
    text-anchor: middle;
}
.dfa-start-arrow {
    font-size: 16px;
    fill: var(--ink);
    font-style: italic;
}

figcaption {
    text-align: center;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--ink-soft);
    max-width: 34rem;
    margin: 0 auto;
    padding: 0 1rem;
}
figcaption code {
    font-family: "Courier New", monospace;
    font-size: 0.9em;
    font-style: normal;
    background: rgba(168, 48, 31, 0.07);
    padding: 0.05em 0.35em;
    border-radius: 2px;
}
.figure-tag {
    font-variant: small-caps;
    font-style: normal;
    letter-spacing: 0.06em;
}

.margin-note--figure {
    position: absolute;
    font-family: "Caveat", cursive;
    font-size: 1rem;
    color: var(--red);
    line-height: 1.2;
    pointer-events: none;
    bottom: 2rem;
    right: -4.5rem;
    transform: rotate(4deg);
}

.margin-arrow {
    font-size: 1.3rem;
    display: inline-block;
}

.underline-wave {
    background-image: linear-gradient(transparent 85%, var(--red) 85%, var(--red) 100%);
    background-size: 100% 4px;
    background-repeat: no-repeat;
    background-position: 0 100%;
}

@media (max-width: 720px) {
    .margin-note--figure { display: none; }
}
</style>
