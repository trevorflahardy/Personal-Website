<script setup lang="ts">
import { callouts } from './rootline-data';
</script>

<template>
    <section class="callouts">
        <h2 class="section-head"><i>Three Features</i>, in brief.</h2>
        <ol class="callout-list">
            <li v-for="(c, i) in callouts" :key="c.idx" :class="'stag-' + i">
                <svg class="tendril" viewBox="0 0 60 80" aria-hidden="true">
                    <path d="M0 0 Q10 30 30 40 T60 78" />
                </svg>
                <div class="callout-body">
                    <span class="callout-idx">{{ c.idx }}</span>
                    <h3>{{ c.title }}</h3>
                    <p>{{ c.body }}</p>
                </div>
            </li>
        </ol>
    </section>
</template>

<style scoped>
.callouts {
    max-width: 62rem;
    margin: 0 auto 4.5rem;
    padding: 0 1rem;
}

.section-head {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0 0 2rem;
    border-bottom: 1px solid rgba(234, 226, 210, 0.18);
    padding-bottom: 0.75rem;
}

.section-head i { color: var(--forest); }

.callout-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.callout-list li {
    position: relative;
    display: grid;
    grid-template-columns: 4rem 1fr;
    gap: 1rem;
    margin-bottom: 2.5rem;
    max-width: 34rem;
}

.stag-0 { margin-left: 0; }
.stag-1 { margin-left: 30%; }
.stag-2 { margin-left: 15%; }

.tendril {
    width: 4rem;
    height: 5rem;
    overflow: visible;
}

.tendril path {
    fill: none;
    stroke: var(--forest-deep);
    stroke-width: 1;
    opacity: 0.6;
    stroke-dasharray: 1 3;
}

.callout-idx {
    display: block;
    font-family: "Georgia", serif;
    font-size: 0.85rem;
    font-style: italic;
    letter-spacing: 0.08em;
    color: var(--walnut);
    margin-bottom: 0.3rem;
}

.callout-body h3 {
    font-size: 1.25rem;
    font-weight: 400;
    font-style: italic;
    color: var(--ink);
    margin: 0 0 0.5rem;
}

.callout-body p {
    font-size: 0.95rem;
    line-height: 1.65;
    color: rgba(234, 226, 210, 0.78);
    margin: 0;
}

@media (max-width: 900px) {
    .callout-list li {
        grid-template-columns: 1fr;
        margin-left: 0 !important;
    }

    .tendril { display: none; }
}
</style>
