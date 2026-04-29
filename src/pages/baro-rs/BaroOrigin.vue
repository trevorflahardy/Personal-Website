<script setup lang="ts">
import { specReadout } from './act-data';
</script>

<template>
    <section class="act act-origin" data-act="01 · origin / spec">
        <div class="origin-grid">
            <div class="origin-main">
                <div class="origin-label section-label">// origin</div>
                <h2 class="origin-title">
                    the question wasn't <em>can we sense the air?</em><br>
                    it was <em>can we keep sensing it, quietly, for half a year?</em>
                </h2>
                <p class="origin-body">
                    baro.rs is an esp32-s3 environmental station written entirely in rust. no arduino wrappers, no micropython fallback — just <code>no_std</code>, <code>embassy</code>, and six hand-rolled <code>embedded-hal</code> drivers. the target is not novelty. the target is <em>uptime</em>.
                </p>
            </div>
            <aside class="origin-side">
                <div class="spec-label section-label">// spec sheet</div>
                <ul class="spec-list">
                    <li v-for="row in specReadout" :key="row.label">
                        <span class="spec-k">{{ row.label }}</span>
                        <span class="spec-dots" aria-hidden="true" />
                        <span class="spec-v">{{ row.value }}</span>
                    </li>
                </ul>
            </aside>
        </div>
    </section>
</template>

<style scoped>
.act-origin { padding: 6rem clamp(1.5rem, 6vw, 6rem) 5rem; }

.origin-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 96rem;
    margin-left: clamp(1rem, 5vw, 4rem);
}

@media (min-width: 1024px) {
    .origin-grid {
        grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
        gap: clamp(3rem, 6vw, 7rem);
        align-items: start;
    }

    .origin-side {
        position: sticky;
        top: 3rem;
        padding-left: 2.5rem;
        border-left: 1px solid rgba(245, 158, 11, 0.18);
    }
}

.origin-title {
    font-size: clamp(1.4rem, 2.2vw, 2.1rem);
    font-weight: 500;
    line-height: 1.35;
    letter-spacing: -0.01em;
    max-width: 48rem;
    margin: 0 0 1.5rem;
    color: var(--ink);
}

.origin-title em {
    color: var(--amber);
    font-style: italic;
    font-weight: 600;
}

.origin-body {
    max-width: 42rem;
    font-size: 0.98rem;
    line-height: 1.7;
    color: rgba(248, 250, 252, 0.7);
    margin: 0;
}

.origin-body :deep(code) {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.9em;
    padding: 0.12rem 0.4rem;
    background: rgba(245, 158, 11, 0.08);
    border: 1px solid rgba(245, 158, 11, 0.18);
    border-radius: 3px;
    color: var(--ink);
}

.spec-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.88rem;
    max-width: 54rem;
}

.spec-list li {
    display: grid;
    grid-template-columns: 14rem 1fr auto;
    gap: 1rem;
    align-items: baseline;
    padding: 0.55rem 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.07);
}

.spec-k {
    color: rgba(248, 250, 252, 0.5);
    letter-spacing: 0.06em;
}

.spec-v { color: var(--ink); }

.spec-dots {
    display: block;
    height: 1px;
    background-image: radial-gradient(circle, rgba(248, 250, 252, 0.22) 1px, transparent 1px);
    background-size: 6px 2px;
    background-repeat: repeat-x;
    align-self: center;
}
</style>
