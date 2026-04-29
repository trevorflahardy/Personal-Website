<script setup lang="ts">
import { steps } from './docuflow-data';
</script>

<template>
    <section class="ds-section">
        <div class="ds-section__inner">
            <p class="ds-kicker">The loop</p>
            <h2 class="ds-heading">Write, preview, ship.</h2>
            <p class="ds-sub">Docuflow collapses the typical docs workflow — MDX authoring, live reload, and a static build — into a single tool with no configuration overhead.</p>

            <div class="ds-steps">
                <div v-for="s in steps" :key="s.n" class="ds-step">
                    <span class="ds-step__n">{{ s.n }}</span>
                    <div>
                        <p class="ds-step__title">{{ s.title }}</p>
                        <p v-if="s.bodyHtml" class="ds-step__body" v-html="s.bodyHtml" />
                        <p v-else class="ds-step__body">{{ s.body }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ds-section {
    padding: 5rem 2rem;
    border-top: 1px solid var(--rule);
}

.ds-section__inner {
    max-width: 900px;
    margin: 0 auto;
}

.ds-kicker {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 0.75rem;
}

.ds-heading {
    font-family: "Fraunces", "Times New Roman", serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--ink);
    margin: 0 0 0.85rem;
}

.ds-sub {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--mute);
    margin: 0 0 3rem;
    max-width: 56ch;
}

.ds-steps {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.ds-step {
    display: flex;
    gap: 1.75rem;
    align-items: flex-start;
}

.ds-step__n {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    color: var(--accent);
    background: var(--accent-soft);
    border: 1px solid rgba(47, 107, 255, 0.25);
    border-radius: 0.4rem;
    padding: 0.3rem 0.55rem;
    flex-shrink: 0;
    margin-top: 0.15rem;
}

.ds-step__title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 0.35rem;
}

.ds-step__body {
    font-size: 0.92rem;
    line-height: 1.65;
    color: var(--mute);
    margin: 0;
}

.ds-step__body :deep(.ds-inline-code) {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82em;
    background: rgba(26, 29, 36, 0.07);
    padding: 0.15em 0.4em;
    border-radius: 0.3rem;
    color: var(--syntax-heading);
}
</style>
