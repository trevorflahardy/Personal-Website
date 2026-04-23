<script setup lang="ts">
import { habitat } from './rootline-data';
</script>

<template>
    <section class="habitat">
        <h2 class="section-head"><i>Habitat</i> &amp; season.</h2>
        <dl class="habitat-list">
            <div v-for="h in habitat" :key="h.k" class="habitat-row">
                <dt>{{ h.k }}</dt>
                <dd>{{ h.v }}</dd>
            </div>
        </dl>
    </section>
</template>

<style scoped>
.habitat {
    max-width: 44rem;
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

.habitat-list {
    margin: 0;
    padding: 0;
    border-top: 1px solid rgba(234, 226, 210, 0.14);
    border-bottom: 1px solid rgba(234, 226, 210, 0.14);
}

.habitat-row {
    display: grid;
    grid-template-columns: 14rem 1fr;
    gap: 1rem;
    padding: 0.55rem 0;
    border-bottom: 1px dashed rgba(234, 226, 210, 0.08);
}

.habitat-row:last-child {
    border-bottom: none;
}

.habitat-row dt {
    font-family: "Georgia", serif;
    font-style: italic;
    color: var(--ink-dim);
    font-size: 0.92rem;
    margin: 0;
}

.habitat-row dd {
    margin: 0;
    font-family: "Georgia", serif;
    color: rgba(234, 226, 210, 0.88);
    font-size: 0.98rem;
    letter-spacing: 0.01em;
}
</style>
