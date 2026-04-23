<script setup lang="ts">
import { features } from './regviz-data';
</script>

<template>
    <section class="capabilities">
        <h2 class="section-head">§ 5. &nbsp; What the instrument does</h2>
        <ol class="caps-list">
            <li v-for="f in features" :key="f.k">
                <span class="caps-k">{{ f.k }}</span>
                <span class="caps-v">{{ f.v }}</span>
            </li>
        </ol>
    </section>
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

.caps-list {
    list-style: none;
    padding: 0;
    margin: 1rem auto;
    max-width: 36rem;
}

.caps-list li {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px dotted var(--rule);
    font-size: 1rem;
    line-height: 1.6;
}

.caps-k {
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: var(--ink-soft);
    text-align: right;
}

.caps-v {
    color: var(--ink);
}
</style>
