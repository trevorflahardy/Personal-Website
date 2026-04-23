<script setup lang="ts">
import FuryStage from './FuryStage.vue';
import { features } from './fury-data';
</script>

<template>
    <section class="fury-act fury-act--stages" data-act="ACT II — SYSTEMS">
        <div class="act-inner act-inner--wide">
            <h2 class="act-title">CORE SYSTEMS</h2>
            <div class="stage-list">
                <FuryStage
                    v-for="(f, i) in features"
                    :key="f.cmd"
                    :feature="f"
                    :index="i"
                />
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
.act-inner--wide { max-width: 860px; }

.act-title {
    font-size: clamp(1.4rem, 3vw, 2rem);
    letter-spacing: 0.08em;
    margin: 1.5rem 0 1.5rem;
    color: var(--ink);
    text-shadow: 0 0 10px rgba(78, 219, 252, 0.4);
}

.stage-list {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 4.5rem;
}

@media (max-width: 560px) {
    .stage-list { gap: 3rem; }
}
</style>
