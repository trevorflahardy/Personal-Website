<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const score = ref(0);
const hiScore = ref(137420);
let scoreTimer: number | undefined;

onMounted(() => {
    scoreTimer = window.setInterval(() => {
        score.value += Math.floor(Math.random() * 90) + 10;
    }, 140);
});

onBeforeUnmount(() => {
    if (scoreTimer) window.clearInterval(scoreTimer);
});
</script>

<template>
    <header class="fury-marquee">
        <div class="marquee-side marquee-side--l">
            <span class="marquee-label">1UP</span>
            <span class="marquee-score">{{ score.toLocaleString().padStart(9, '0') }}</span>
        </div>
        <div class="marquee-center">
            <span class="marquee-kicker">FLORIDA VIRTUAL SCHOOL · eSPORTS</span>
            <h1 class="marquee-title">
                <span class="mt-char" style="--d: 0ms">F</span><span class="mt-char" style="--d: 60ms">U</span><span class="mt-char" style="--d: 120ms">R</span><span class="mt-char" style="--d: 180ms">Y</span>
            </h1>
            <span class="marquee-sub">— a moderation &amp; team-management bot for a school gaming community —</span>
        </div>
        <div class="marquee-side marquee-side--r">
            <span class="marquee-label">HI-SCORE</span>
            <span class="marquee-score marquee-score--hi">{{ hiScore.toLocaleString().padStart(9, '0') }}</span>
        </div>
    </header>
</template>

<style scoped>
.fury-marquee {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem clamp(1.25rem, 4vw, 3rem) 1.5rem;
    border-bottom: 1px solid var(--rule);
}

.marquee-side {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.marquee-side--l { align-items: flex-start; }
.marquee-side--r { align-items: flex-end; }

.marquee-label {
    font-size: 0.62rem;
    letter-spacing: 0.25em;
    color: var(--neon);
    text-shadow: 0 0 8px rgba(255, 45, 122, 0.8);
}

.marquee-score {
    font-size: 1rem;
    letter-spacing: 0.14em;
    color: var(--gold);
    text-shadow: 0 0 10px rgba(255, 212, 71, 0.7);
    font-variant-numeric: tabular-nums;
}

.marquee-score--hi {
    color: var(--neon-2);
    text-shadow: 0 0 10px rgba(78, 219, 252, 0.7);
}

.marquee-center { text-align: center; }

.marquee-kicker {
    display: block;
    font-size: 0.58rem;
    letter-spacing: 0.3em;
    color: var(--neon-2);
    margin-bottom: 0.9rem;
    text-shadow: 0 0 6px rgba(78, 219, 252, 0.6);
}

.marquee-title {
    margin: 0;
    font-size: clamp(3rem, 10vw, 6.5rem);
    line-height: 1;
    letter-spacing: 0.04em;
    color: var(--ink);
    text-shadow:
        0 0 8px rgba(255, 45, 122, 0.9),
        0 0 24px rgba(255, 45, 122, 0.5),
        0 0 48px rgba(78, 219, 252, 0.3);
}

.mt-char {
    display: inline-block;
    animation: fury-bob 2.4s ease-in-out infinite;
    animation-delay: var(--d, 0ms);
}

@keyframes fury-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-0.18em); }
}

.marquee-sub {
    display: block;
    margin-top: 0.9rem;
    font-family: "VT323", "SF Mono", monospace;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
    color: var(--mute);
}

@media (prefers-reduced-motion: reduce) {
    .mt-char { animation: none !important; }
}
</style>
