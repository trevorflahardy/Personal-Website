<script setup lang="ts">
import { originImg } from './fury-data';
</script>

<template>
    <section class="fury-act" data-act="ACT I — ORIGIN">
        <div class="act-inner">
            <h2 class="act-title">THE FIRST OF ITS KIND</h2>
            <p class="act-body">
                When I joined FLVS's eSports club as lead student, the job was odd:
                build a thriving competitive gaming community <em>inside</em> an accredited
                K-12 school. Policy demanded strict moderation, organized teams, and total
                accountability — and no off-the-shelf bot was built for any of it.
            </p>
            <p class="act-body">
                So I built <strong>Fury</strong> from scratch. Purpose-made for the
                constraints and responsibilities of a school environment.
            </p>
            <div class="act-screenshot">
                <img :src="originImg" alt="Fury /about command showing live server stats" />
                <span class="shot-cap">/about — live stats from the FLVS server</span>
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

.act-body em { color: var(--gold); font-style: normal; }
.act-body strong { color: var(--neon); font-weight: inherit; }

.act-screenshot {
    margin-top: 2rem;
    max-width: 560px;
    border: 2px solid var(--rule);
    padding: 0.6rem;
    background: rgba(10, 5, 20, 0.6);
}

.act-screenshot img { width: 100%; display: block; }

.shot-cap {
    display: block;
    margin-top: 0.5rem;
    font-family: "VT323", monospace;
    font-size: 0.9rem;
    color: var(--faint);
    text-align: center;
    letter-spacing: 0.05em;
}
</style>
