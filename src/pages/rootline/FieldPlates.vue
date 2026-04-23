<script setup lang="ts">
import { plates } from './rootline-data';
</script>

<template>
    <section class="field-plates">
        <h2 class="section-head"><i>Field plates</i> II &ndash; V.</h2>
        <p class="plates-lede">
            Further views of the specimen, collected from the live application
            across the spring and summer seasons. Each plate bears its own
            legend &mdash; what the observer saw, and what it told them.
        </p>
        <div class="plate-grid">
            <figure v-for="p in plates" :key="p.num" class="plate-mount">
                <span class="plate-num">Plate&nbsp;{{ p.num }}</span>
                <div class="plate-frame">
                    <img :src="p.src" :alt="p.caption"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
                    <div class="plate-fallback" style="display:none">
                        <i>specimen pending</i>
                    </div>
                </div>
                <figcaption>
                    <div class="plate-caption">{{ p.caption }}</div>
                    <div class="plate-latin"><i>{{ p.latin }}</i></div>
                </figcaption>
            </figure>
        </div>
    </section>
</template>

<style scoped>
.field-plates {
    max-width: none;
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

.plates-lede {
    max-width: 42rem;
    margin: 0 auto 2.5rem;
    text-align: center;
    font-family: "Georgia", "Times New Roman", serif;
    font-style: italic;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--ink-dim);
}

.plate-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 2.5rem;
}

.plate-mount {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}

.plate-num {
    font-family: "Georgia", serif;
    font-style: italic;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    color: var(--ink-dim);
    border-bottom: 1px solid rgba(234, 226, 210, 0.18);
    padding-bottom: 0.3rem;
}

.plate-frame {
    position: relative;
    border: 1px solid rgba(165, 138, 99, 0.35);
    padding: 0.55rem;
    background: rgba(26, 24, 20, 0.55);
    box-shadow: inset 0 0 0 1px rgba(234, 226, 210, 0.05);
}

.plate-frame img {
    width: 100%;
    display: block;
    opacity: 0.9;
}

.plate-fallback {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--ink-dim);
    font-style: italic;
}

.plate-mount figcaption {
    font-family: "Georgia", serif;
    font-size: 0.88rem;
    line-height: 1.45;
    color: rgba(234, 226, 210, 0.72);
}

.plate-caption { display: block; }

.plate-latin {
    font-size: 0.78rem;
    color: var(--forest);
    margin-top: 0.2rem;
    letter-spacing: 0.02em;
}

@media (max-width: 900px) {
    .plate-grid { grid-template-columns: 1fr; }
}
</style>
