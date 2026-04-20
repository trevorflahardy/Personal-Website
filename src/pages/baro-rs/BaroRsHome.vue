<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { drivers } from "./drivers/driver-data";
import { specReadout, architectureNodes, architectureLinks, commitLog, type ArchNode } from "./act-data";
import { useLenis } from "@/composables/useLenis";

const driverList = Object.values(drivers);
const heroCanvas = ref<HTMLCanvasElement | null>(null);

// Pre-compute SVG arch edges once — the template only reads, never calls.
const nodeById = (id: string): ArchNode =>
    architectureNodes.find((n) => n.id === id) as ArchNode;

const archEdges = computed(() =>
    architectureLinks.map(([a, b]) => {
        const s = nodeById(a);
        const t = nodeById(b);
        const sy = s.y + 4;
        const ty = t.y - 4;
        const midY = (sy + ty) / 2;
        return {
            d: `M ${s.x} ${sy} L ${s.x} ${midY} L ${t.x} ${midY} L ${t.x} ${ty}`,
            sx: s.x, sy, tx: t.x, ty,
        };
    })
);

useLenis();

// Oscilloscope — amber sine wave that lives in the hero. Frequency breathes
// slowly; a secondary high-frequency line adds texture. Runs on rAF and pauses
// when the user prefers reduced motion.
let rafId = 0;
onMounted(() => {
    const cvs = heroCanvas.value;
    if (!cvs) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        cvs.width = cvs.clientWidth * dpr;
        cvs.height = cvs.clientHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
        const w = cvs.clientWidth;
        const h = cvs.clientHeight;
        ctx.clearRect(0, 0, w, h);

        // primary sine
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(245,158,11,0.75)";
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(245,158,11,0.45)";
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
        ctx.strokeStyle = "rgba(245,158,11,0.22)";
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
        window.removeEventListener("resize", resize);
    });
});
</script>

<template>
    <article class="baro-page">
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

        <section class="act act-origin" data-act="01 · origin / spec">
            <div class="origin-grid">
                <div class="origin-main">
                    <div class="origin-label">// origin</div>
                    <h2 class="origin-title">
                        the question wasn't <em>can we sense the air?</em><br>
                        it was <em>can we keep sensing it, quietly, for half a year?</em>
                    </h2>
                    <p class="origin-body">
                        baro.rs is an esp32-s3 environmental station written entirely in rust. no arduino wrappers, no micropython fallback — just <code>no_std</code>, <code>embassy</code>, and six hand-rolled <code>embedded-hal</code> drivers. the target is not novelty. the target is <em>uptime</em>.
                    </p>
                </div>
                <aside class="origin-side">
                    <div class="spec-label">// spec sheet</div>
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

        <section class="act act-drivers" id="drivers" data-act="02 · drivers">
            <div class="drivers-label">// 06 drivers · embedded-hal 1.0</div>
            <h2 class="drivers-title">six instruments, one bus.</h2>
            <p class="drivers-kicker">each driver is its own crate, tested in isolation, shared by anyone on crates.io. click through for the full implementation notes.</p>
            <div class="drivers-stack">
                <RouterLink v-for="(d, i) in driverList" :key="d.id"
                    :to="{ name: 'baro-rs-driver', params: { driverId: d.id } }"
                    class="driver-row" :style="{ '--dc': d.color }">
                    <span class="driver-idx">{{ String(i + 1).padStart(2, '0') }}</span>
                    <span class="driver-swatch" />
                    <div class="driver-body">
                        <div class="driver-name">{{ d.name }}</div>
                        <div class="driver-tag">{{ d.tagline }}</div>
                    </div>
                    <div class="driver-meta">
                        <span>{{ d.protocol }}</span>
                        <span>{{ d.keyMetric }}</span>
                    </div>
                    <span class="driver-arrow">&rarr;</span>
                </RouterLink>
            </div>
        </section>

        <section class="act act-arch" data-act="03 · architecture">
            <div class="arch-label">// architecture · internal topology</div>
            <p class="arch-lede">
                four levels, async end-to-end.  every edge is a typed channel;
                every node a polled future that yields when its work is done.
            </p>
            <div class="arch-canvas">
                <!-- Grid backdrop inherits from .act-arch::before.  Edges drawn
                     below the nodes; dots placed at each endpoint. -->
                <svg viewBox="0 0 100 80" preserveAspectRatio="none" class="arch-svg">
                    <!-- Orthogonal connectors: source.bottom → midY → target.top -->
                    <template v-for="(e, i) in archEdges" :key="i">
                        <path :d="e.d" class="arch-edge" />
                        <circle :cx="e.sx" :cy="e.sy" r="0.55" class="arch-dot" />
                        <circle :cx="e.tx" :cy="e.ty" r="0.55" class="arch-dot" />
                    </template>
                </svg>
                <div v-for="n in architectureNodes" :key="n.id"
                    class="arch-node" :class="`arch-node--${n.kind}`"
                    :style="{ left: n.x + '%', top: n.y + '%' }">
                    <span class="arch-node-label">{{ n.label }}</span>
                    <span class="arch-node-sub">{{ n.sub }}</span>
                </div>
            </div>

            <!-- Legend: what the three node tiers actually are -->
            <div class="arch-legend">
                <div class="legend-item"><span class="legend-chip legend-chip--root" />compute root</div>
                <div class="legend-item"><span class="legend-chip legend-chip--hub" />async runtime · bus</div>
                <div class="legend-item"><span class="legend-chip legend-chip--leaf" />driver cluster</div>
            </div>
        </section>

        <section class="act act-log" data-act="04 · log">
            <div class="log-label">// commit log · recent</div>
            <ol class="log-list">
                <li v-for="c in commitLog" :key="c.sha" class="log-row">
                    <span class="log-sha">{{ c.sha }}</span>
                    <span class="log-date">{{ c.date }}</span>
                    <span class="log-msg">{{ c.msg }}</span>
                </li>
            </ol>
            <a href="https://github.com/trevorflahardy/baro.rs" target="_blank" rel="noopener" class="log-source">
                view full source on github &rarr;
            </a>
        </section>
    </article>
</template>

<style scoped>
.baro-page {
    --ink: #f8fafc;
    --amber: #f59e0b;
    --amber-glow: rgba(245, 158, 11, 0.65);
    --copper: #b87333;
    --graphite: #0b0e10;
    --graphite-2: #14181c;

    display: block;
    background: var(--graphite);
    color: var(--ink);
    font-family: "SF Pro Display", "Inter", sans-serif;
    background-image:
        linear-gradient(rgba(245, 158, 11, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(245, 158, 11, 0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    min-height: 100%;
}

.act {
    position: relative;
    padding: 6rem clamp(1.5rem, 6vw, 6rem);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* Numbered index markers along the left gutter — asymmetric anchor for each act. */
.act::before {
    content: attr(data-act);
    position: absolute;
    left: clamp(1rem, 3vw, 3rem);
    top: 4.2rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.28em;
    color: rgba(245, 158, 11, 0.4);
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-transform: uppercase;
    pointer-events: none;
}

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
    width: 0.45rem; height: 0.45rem; border-radius: 50%;
    background: var(--amber);
    box-shadow: 0 0 12px var(--amber-glow);
    animation: pulse 2.2s ease-in-out infinite;
}

@keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%     { opacity: 0.45; transform: scale(0.85); }
}

.hero-title {
    font-size: clamp(4rem, 14vw, 11rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.88;
    margin: 0 0 1.5rem;
    color: var(--ink);
}
.hero-title .dot-char { color: var(--amber); }

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
    position: absolute; top: -4px; left: 0;
    width: 18%; height: 1px; background: var(--amber);
}

/* shared small section label */
.origin-label, .spec-label, .drivers-label, .arch-label, .log-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    color: var(--amber);
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: inline-block;
    padding-bottom: 0.35rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.35);
}

/* ORIGIN + SPEC — asymmetric 2-col on wide screens; stacked on mobile */
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
.origin-title em { color: var(--amber); font-style: italic; font-weight: 600; }
.origin-body {
    max-width: 42rem;
    font-size: 0.98rem;
    line-height: 1.7;
    color: rgba(248, 250, 252, 0.7);
    margin: 0;
}
.origin-body code {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.9em;
    padding: 0.12rem 0.4rem;
    background: rgba(245, 158, 11, 0.08);
    border: 1px solid rgba(245, 158, 11, 0.18);
    border-radius: 3px;
    color: var(--ink);
}

/* SPEC LIST */
.act-spec { padding: 5rem 2.5rem; }
.spec-list {
    list-style: none; padding: 0; margin: 0;
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
.spec-k { color: rgba(248, 250, 252, 0.5); letter-spacing: 0.06em; }
.spec-v { color: var(--ink); }
.spec-dots {
    display: block; height: 1px;
    background-image: radial-gradient(circle, rgba(248,250,252,0.22) 1px, transparent 1px);
    background-size: 6px 2px;
    background-repeat: repeat-x;
    align-self: center;
}

/* DRIVERS */
.act-drivers { padding: 6rem 2.5rem; }
.drivers-title {
    font-size: clamp(1.7rem, 3vw, 2.8rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0 0 0.75rem;
    color: var(--ink);
}
.drivers-kicker {
    max-width: 36rem;
    font-size: 0.95rem;
    color: rgba(248, 250, 252, 0.65);
    margin: 0 0 2.5rem;
    line-height: 1.6;
}
.drivers-stack {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.driver-row {
    display: grid;
    grid-template-columns: 2.5rem 0.5rem 1fr auto 1.5rem;
    gap: 1.25rem;
    align-items: center;
    padding: 1.15rem 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    text-decoration: none;
    color: inherit;
    transition: background-color 0.25s ease, padding 0.25s ease;
    position: relative;
}
.driver-row::before {
    content: "";
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 2px; background: var(--dc, var(--amber));
    transform: scaleY(0.2); transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.driver-row:hover { background: rgba(245, 158, 11, 0.04); padding-left: 1rem; }
.driver-row:hover::before { transform: scaleY(1); }
.driver-idx {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(248, 250, 252, 0.35);
    letter-spacing: 0.12em;
}
.driver-swatch {
    width: 0.5rem; height: 0.5rem;
    border-radius: 50%;
    background: var(--dc, var(--amber));
    box-shadow: 0 0 12px color-mix(in srgb, var(--dc, var(--amber)) 60%, transparent);
}
.driver-name {
    font-weight: 600; font-size: 1rem; letter-spacing: -0.005em;
    margin-bottom: 0.15rem;
}
.driver-tag {
    font-size: 0.85rem;
    color: rgba(248, 250, 252, 0.55);
    line-height: 1.45;
}
.driver-meta {
    display: flex; flex-direction: column; align-items: flex-end; gap: 0.1rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: rgba(248, 250, 252, 0.5);
}
.driver-arrow {
    font-family: "SF Mono", ui-monospace, monospace;
    color: rgba(248, 250, 252, 0.35);
    transition: transform 0.25s ease, color 0.25s ease;
}
.driver-row:hover .driver-arrow { transform: translateX(4px); color: var(--dc, var(--amber)); }

/* ARCHITECTURE */
.act-arch { padding: 6rem 2.5rem; }
.arch-lede {
    max-width: 48rem;
    margin: 0.75rem 0 2.25rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.88rem;
    line-height: 1.6;
    color: rgba(248, 250, 252, 0.55);
}
.arch-canvas {
    position: relative;
    height: 34rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: var(--graphite-2);
    background-image:
        linear-gradient(rgba(245, 158, 11, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(245, 158, 11, 0.04) 1px, transparent 1px);
    background-size: 24px 24px;
    overflow: visible;
    border-radius: 2px;
}
.arch-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
}
.arch-edge {
    fill: none;
    stroke: rgba(245, 158, 11, 0.55);
    stroke-width: 0.28;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
}
.arch-dot {
    fill: var(--amber);
    filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.8));
}
.arch-node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
    padding: 0.55rem 0.9rem;
    background: var(--graphite);
    font-family: "SF Mono", ui-monospace, monospace;
    width: 11rem;          /* fixed so connectors always meet the same edge */
    text-align: center;
    border: 1px solid rgba(245, 158, 11, 0.45);
    box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.5),
        0 8px 24px rgba(0, 0, 0, 0.35);
}
.arch-node--root {
    border-color: var(--amber);
    box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.5),
        0 0 24px rgba(245, 158, 11, 0.22),
        0 8px 28px rgba(0, 0, 0, 0.45);
}
.arch-node--hub { border-color: rgba(245, 158, 11, 0.6); }
.arch-node--leaf {
    border-color: rgba(245, 158, 11, 0.28);
    background: rgba(15, 17, 21, 0.85);
}
.arch-node-label {
    font-size: 0.74rem;
    letter-spacing: 0.22em;
    color: var(--amber);
    font-weight: 600;
}
.arch-node-sub {
    font-size: 0.64rem;
    color: rgba(248, 250, 252, 0.55);
    letter-spacing: 0.04em;
    line-height: 1.35;
}

.arch-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1.5rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    color: rgba(248, 250, 252, 0.45);
    text-transform: uppercase;
}
.legend-item { display: inline-flex; align-items: center; gap: 0.5rem; }
.legend-chip {
    display: inline-block;
    width: 0.85rem; height: 0.85rem;
    border: 1px solid rgba(245, 158, 11, 0.45);
    background: var(--graphite);
}
.legend-chip--root { border-color: var(--amber); box-shadow: 0 0 8px rgba(245, 158, 11, 0.4); }
.legend-chip--hub  { border-color: rgba(245, 158, 11, 0.6); }
.legend-chip--leaf { border-color: rgba(245, 158, 11, 0.28); background: rgba(15, 17, 21, 0.85); }

/* COMMIT LOG */
.act-log { padding: 5rem 2.5rem 6rem; }
.log-list {
    list-style: none; padding: 0; margin: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.log-row {
    display: grid;
    grid-template-columns: 5rem 6rem 1fr;
    gap: 1rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: rgba(248, 250, 252, 0.7);
}
.log-sha { color: var(--amber); }
.log-date { color: rgba(248, 250, 252, 0.4); }
.log-source {
    display: inline-block;
    margin-top: 2.5rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    color: var(--amber);
    text-decoration: none;
    border-bottom: 1px solid rgba(245, 158, 11, 0.4);
    padding-bottom: 0.2rem;
    transition: color 0.2s ease;
}
.log-source:hover { color: var(--ink); border-color: var(--ink); }

/* light mode — the instrument keeps its graphite canvas even in light mode
   because it represents an actual physical device with a black housing. */
</style>


