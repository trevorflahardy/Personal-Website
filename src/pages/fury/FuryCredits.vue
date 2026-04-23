<script setup lang="ts">
import { credits } from './fury-data';
</script>

<template>
    <section class="fury-act" data-act="ACT III — HIGH SCORES">
        <div class="act-inner">
            <h2 class="act-title">CREDITS</h2>
            <p class="act-body act-body--tight">Built with —</p>
            <div class="credits-roll">
                <div v-for="c in credits" :key="c.role" class="credit-row">
                    <span class="credit-role">{{ c.role }}</span>
                    <span class="credit-dots" />
                    <span class="credit-val">{{ c.val }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fury-act {
    position: relative;
    z-index: 2;
    padding: 5rem clamp(1.25rem, 4vw, 3rem);
}

.fury-act::before {
    content: attr(data-act);
    position: absolute;
    top: 2rem;
    left: clamp(1.25rem, 4vw, 3rem);
    font-size: 0.58rem;
    letter-spacing: 0.3em;
    color: var(--neon);
    text-shadow: 0 0 8px rgba(255, 45, 122, 0.6);
}

.act-inner { max-width: 1080px; margin: 0 auto; }

.act-title {
    font-size: clamp(1.4rem, 3vw, 2rem);
    letter-spacing: 0.08em;
    margin: 1.5rem 0 1.5rem;
    color: var(--ink);
    text-shadow: 0 0 10px rgba(78, 219, 252, 0.4);
}

.act-body {
    font-family: "VT323", "SF Mono", monospace;
    font-size: 1.15rem;
    line-height: 1.55;
    letter-spacing: 0.03em;
    color: var(--mute);
    max-width: 62ch;
    margin: 0 0 1rem;
}

.act-body--tight { margin-bottom: 0.5rem; }

.credits-roll {
    margin-top: 1.25rem;
    border-top: 1px dashed var(--rule);
}

.credit-row {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.85rem 0;
    border-bottom: 1px dashed var(--rule);
}

.credit-role {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    color: var(--neon);
    min-width: 6.5rem;
}

.credit-dots {
    flex: 1;
    border-bottom: 1px dotted var(--faint);
    transform: translateY(-2px);
}

.credit-val {
    font-family: "VT323", monospace;
    font-size: 1.15rem;
    color: var(--ink);
    letter-spacing: 0.05em;
}
</style>
