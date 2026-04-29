<script setup lang="ts">
import { lemmas } from './regviz-data';
</script>

<template>
    <section class="lemmas">
        <h2 class="section-head">§ 1. &nbsp; Theoretical foundations</h2>
        <div class="lemma" v-for="l in lemmas" :key="l.tag">
            <div class="lemma-tag">{{ l.tag }}.</div>
            <div class="lemma-body">
                <p class="lemma-title"><em>{{ l.title }}</em></p>
                <p class="lemma-text">{{ l.body }}</p>
            </div>
        </div>
    </section>

    <div class="equation">
        <div class="equation-box">
            <span class="eq-label">(1)</span>
            <span class="eq-body">
                <span class="eq-lhs">L(r₁ · r₂)</span>
                <span class="eq-eq">=</span>
                <span class="eq-rhs">{ uv : u ∈ L(r₁), v ∈ L(r₂) }</span>
            </span>
        </div>
    </div>
</template>

<style scoped>
.section-head {
    font-size: 1.25rem;
    font-variant: small-caps;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin: 3.5rem 0 1.5rem;
    text-align: center;
}

.lemma {
    display: grid;
    grid-template-columns: 4.5rem 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
}

.lemma-tag {
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: var(--ink-soft);
    padding-top: 0.15rem;
    text-align: right;
    font-size: 0.95rem;
}

.lemma-title {
    font-size: 1.05rem;
    margin: 0 0 0.3rem;
    line-height: 1.45;
}

.lemma-text {
    font-size: 0.98rem;
    line-height: 1.65;
    color: var(--ink-soft);
    margin: 0;
    text-align: justify;
}

.equation {
    margin: 3rem 0;
    text-align: center;
}

.equation-box {
    display: inline-flex;
    align-items: baseline;
    gap: 2rem;
    padding: 1rem 2rem;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    font-size: 1.1rem;
    font-style: italic;
}

.eq-label {
    color: var(--ink-soft);
    font-style: normal;
    font-size: 0.9rem;
}

.eq-body {
    display: inline-flex;
    gap: 0.8rem;
    align-items: baseline;
}

@media (max-width: 720px) {
    .lemma { grid-template-columns: 1fr; }
    .lemma-tag { text-align: left; }
}
</style>
