<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const heroCanvas = ref<HTMLCanvasElement | null>(null);

// Oscilloscope — amber sine wave that lives in the hero. Frequency breathes
// slowly; a secondary high-frequency line adds texture. Runs on rAF and
// pauses when the user prefers reduced motion.
let rafId = 0;
onMounted(() => {
    const cvs = heroCanvas.value;
    if (!cvs) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        cvs.width = cvs.clientWidth * dpr;
        cvs.height = cvs.clientHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
        const w = cvs.clientWidth;
        const h = cvs.clientHeight;
        ctx.clearRect(0, 0, w, h);

        // primary sine
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(245,158,11,0.75)';
        ctx.shadowBlur = 14;
        ctx.shadowColor = 'rgba(245,158,11,0.45)';
        for (let x = 0; x <= w; x += 2) {
            const freq = 0.012 + Math.sin(t * 0.0007) * 0.003;
            const y = h / 2 + Math.sin(x * freq + t * 0.015) * (h * 0.14);
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // echo/texture line
        ctx.beginPath();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(245,158,11,0.22)';
        for (let x = 0; x <= w; x += 2) {
            const y = h / 2 + Math.sin(x * 0.03 + t * 0.008) * (h * 0.05) + Math.cos(x * 0.08 + t * 0.02) * 6;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();

        t += reduced ? 0 : 16;
        rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    onBeforeUnmount(() => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
    });
});
</script>

<template>
    <section class="act act-hero">
        <canvas ref="heroCanvas" class="hero-scope" />
        <div class="hero-stack">
            <div class="hero-meta">
                <span class="dot" /> ESP32-S3 · RUST · NO_STD · LIVE
            </div>
            <h1 class="hero-title">BARO<span class="dot-char">.</span>RS</h1>
            <p class="hero-kicker">a precision environmental instrument, written in rust, running unattended for months.</p>
            <div class="hero-ruler">
                <span>0</span><span>45</span><span>90</span><span>135</span><span>180d</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.act-hero {
    min-height: 88vh;
    padding-top: 7rem;
    overflow: hidden;
}
.act-hero::before { display: none; }

.hero-scope {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.55;
}

.hero-stack {
    position: relative;
    z-index: 1;
    max-width: 64rem;
}

.hero-meta {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    color: var(--amber);
    text-transform: uppercase;
    margin-bottom: 2rem;
}

.hero-meta .dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: var(--amber);
    box-shadow: 0 0 12px var(--amber-glow);
    animation: pulse 2.2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(0.85); }
}

.hero-title {
    font-size: clamp(4rem, 14vw, 11rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.88;
    margin: 0 0 1.5rem;
    color: var(--ink);
}

.hero-title .dot-char {
    color: var(--amber);
}

.hero-kicker {
    max-width: 30rem;
    font-size: 1.05rem;
    line-height: 1.55;
    color: rgba(248, 250, 252, 0.7);
    margin: 0 0 3rem;
}

.hero-ruler {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: end;
    max-width: 34rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(248, 250, 252, 0.4);
    padding-top: 0.5rem;
    border-top: 1px solid rgba(248, 250, 252, 0.18);
    position: relative;
}

.hero-ruler::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 0;
    width: 18%;
    height: 1px;
    background: var(--amber);
}

@media (prefers-reduced-motion: reduce) {
    .hero-meta .dot { animation: none !important; }
}
</style>
