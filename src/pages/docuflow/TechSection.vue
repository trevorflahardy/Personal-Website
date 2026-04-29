<script setup lang="ts">
import { tech } from './docuflow-data';
</script>

<template>
    <section class="ds-section">
        <div class="ds-section__inner">
            <p class="ds-kicker">Under the hood</p>
            <h2 class="ds-heading">Built on things that last.</h2>
            <p class="ds-sub">No abandoned dependencies, no bespoke build graphs. Docuflow sits on top of the React and Vite ecosystems — tools with a long runway.</p>

            <div class="ds-tech-grid">
                <div v-for="t in tech" :key="t.name" class="ds-tech">
                    <span class="ds-tech__name">{{ t.name }}</span>
                    <p class="ds-tech__desc">{{ t.desc }}</p>
                </div>
            </div>

            <div class="ds-cta">
                <a href="https://github.com/trevorflahardy/docuflow" target="_blank" rel="noreferrer"
                    class="ds-cta__link">
                    <span class="ds-cta__arrow">→</span>
                    View on GitHub
                </a>
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

.ds-tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 3rem;
}

.ds-tech {
    padding: 1.25rem 1.35rem;
    border: 1px solid var(--rule);
    border-radius: 0.65rem;
    background: rgba(255, 255, 255, 0.55);
}

.ds-tech__name {
    display: block;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    color: var(--accent);
    margin-bottom: 0.55rem;
}

.ds-tech__desc {
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--mute);
    margin: 0;
}

.ds-cta { text-align: center; }

.ds-cta__link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82rem;
    color: var(--accent);
    text-decoration: none;
    padding: 0.65rem 1.25rem;
    border: 1px solid rgba(47, 107, 255, 0.35);
    border-radius: 9999px;
    background: var(--accent-soft);
    transition: transform 180ms ease, background 180ms ease;
}

.ds-cta__link:hover {
    transform: translateY(-2px);
    background: #d6e3ff;
}

.ds-cta__arrow {
    transition: transform 180ms ease;
}

.ds-cta__link:hover .ds-cta__arrow {
    transform: translateX(3px);
}
</style>
