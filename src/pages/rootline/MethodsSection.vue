<script setup lang="ts">
import { methods } from './rootline-data';
</script>

<template>
    <section class="methods">
        <h2 class="section-head"><i>Methods &amp; materials.</i></h2>
        <p class="methods-lede">
            How the garden was raised. Each row names a part of the organism
            and the substances used in its growing.
        </p>
        <dl class="methods-list">
            <div v-for="m in methods" :key="m.part" class="methods-row">
                <dt><i>{{ m.part }}</i></dt>
                <dd class="methods-dots" />
                <dd class="methods-val">{{ m.value }}</dd>
            </div>
        </dl>
    </section>
</template>

<style scoped>
.methods {
    max-width: 52rem;
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

.methods-lede {
    max-width: 38rem;
    margin: 0 auto 2rem;
    text-align: center;
    font-family: "Georgia", serif;
    font-style: italic;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--ink-dim);
}

.methods-list {
    margin: 0;
    padding: 0;
}

.methods-row {
    display: grid;
    grid-template-columns: 10rem 1fr auto;
    align-items: baseline;
    gap: 1rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid rgba(234, 226, 210, 0.1);
}

.methods-row dt {
    font-family: "Georgia", serif;
    font-size: 1.02rem;
    color: var(--forest);
    letter-spacing: 0.01em;
    margin: 0;
}

.methods-dots {
    border-bottom: 1px dotted rgba(234, 226, 210, 0.22);
    transform: translateY(-0.35em);
    margin: 0;
}

.methods-val {
    margin: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.8rem;
    color: rgba(234, 226, 210, 0.85);
    text-align: right;
    letter-spacing: 0.02em;
}
</style>
