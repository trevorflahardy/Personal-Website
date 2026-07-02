<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The site's one-off: a single serpentine thread that draws itself down the
// entire page as you scroll, shifting through the section accent colors,
// with a glowing comet riding the head of the line. Mount it inside a
// position:relative container that spans the whole scrollable content.

const host = useTemplateRef<HTMLElement>('host');
const d = ref('');
const size = ref({ w: 0, h: 0 });
let ro: ResizeObserver | null = null;

function buildPath() {
    const parent = host.value?.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.scrollHeight;
    if (!w || !h) return;
    size.value = { w, h };

    // Serpentine: alternate between the left and right gutters every ~850px,
    // smoothed with cubic beziers so the line breathes instead of zig-zagging.
    const n = Math.max(3, Math.round(h / 850));
    const step = h / n;
    let x = w * 0.68;
    let y = 0;
    let path = `M ${x.toFixed(1)} 0`;
    for (let i = 1; i <= n; i++) {
        const nx = i % 2 === 1 ? w * 0.055 : w * 0.945;
        const ny = i * step;
        path += ` C ${x.toFixed(1)} ${(y + step * 0.55).toFixed(1)}, ${nx.toFixed(1)} ${(ny - step * 0.55).toFixed(1)}, ${nx.toFixed(1)} ${ny.toFixed(1)}`;
        x = nx;
        y = ny;
    }
    d.value = path;
}

let st: ScrollTrigger | null = null;
let introTween: gsap.core.Tween | null = null;
let contentRo: ResizeObserver | null = null;

onMounted(async () => {
    buildPath();
    const parent = host.value?.parentElement;
    if (parent && 'ResizeObserver' in window) {
        ro = new ResizeObserver(() => buildPath());
        ro.observe(parent);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The SVG is gated behind v-if="size.h" — it does not exist in the DOM
    // until the patch after buildPath(). Querying it in the same tick was a
    // silent no-op that left the thread permanently fully-drawn.
    await nextTick();
    setupScene();
});

onBeforeUnmount(() => {
    ro?.disconnect();
    contentRo?.disconnect();
    introTween?.kill();
    st?.kill();
});

function setupScene() {
    const pathEl = host.value?.querySelector<SVGPathElement>('.thread-path');
    const comet = host.value?.querySelector<SVGCircleElement>('.thread-comet');
    const parent = host.value?.parentElement;
    const scroller = document.querySelector('#main-content');
    if (!pathEl || !comet || !parent || !scroller) return;

    let length = pathEl.getTotalLength();

    // A short "peek" of thread is always drawn, even before any scroll — the
    // line introduces itself instead of looking like a stray artifact, and
    // the comet rests at its head like a firefly waiting to lead the way.
    const peek = () => Math.min(240, length * 0.05);
    const drawnFor = (p: number) => peek() + (length - peek()) * p;
    const offsetFor = (p: number) => Math.max(0, length - drawnFor(p));

    const placeComet = (drawn: number) => {
        const pt = pathEl.getPointAtLength(Math.min(length, Math.max(0, drawn)));
        comet.setAttribute('cx', pt.x.toFixed(1));
        comet.setAttribute('cy', pt.y.toFixed(1));
    };

    gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });

    // Playful boot draw: the peek sketches itself in and the comet fades on.
    const intro = { t: 0 };
    introTween = gsap.to(intro, {
        t: 1,
        duration: 1.4,
        delay: 0.5,
        ease: 'power3.out',
        onUpdate() {
            pathEl.style.strokeDashoffset = String(length - peek() * intro.t);
            placeComet(peek() * intro.t);
            comet.style.opacity = String(Math.min(1, intro.t * 2));
        },
    });

    st = ScrollTrigger.create({
        trigger: parent,
        scroller,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        // Content grows after mount (async chapters) — the path is rebuilt
        // longer, so dash metrics MUST resync to the current progress or a
        // stale offset exposes a random segment of line.
        onRefresh(self) {
            length = pathEl.getTotalLength();
            gsap.set(pathEl, { strokeDasharray: length });
            if (!introTween?.isActive()) {
                pathEl.style.strokeDashoffset = String(offsetFor(self.progress));
                placeComet(drawnFor(self.progress));
            }
        },
        onUpdate(self) {
            if (introTween?.isActive()) {
                if (self.progress <= 0.005) return; // let the intro finish at rest
                introTween.kill();
                comet.style.opacity = '1';
            }
            pathEl.style.strokeDashoffset = String(offsetFor(self.progress));
            placeComet(drawnFor(self.progress));
        },
    });

    // ScrollTrigger only auto-refreshes on window resize — watch the content
    // itself so async growth (chapter stage, live stats) resyncs everything.
    contentRo = new ResizeObserver(() => ScrollTrigger.refresh());
    contentRo.observe(parent);
}
</script>

<template>
    <div ref="host" class="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <svg v-if="size.h" :width="size.w" :height="size.h" :viewBox="`0 0 ${size.w} ${size.h}`"
            class="absolute top-0 left-0">
            <defs>
                <linearGradient id="thread-grad" x1="0" y1="0" x2="0" :y2="size.h" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#0a84ff" />
                    <stop offset="0.33" stop-color="#f59e0b" />
                    <stop offset="0.66" stop-color="#fb7185" />
                    <stop offset="1" stop-color="#4ade80" />
                </linearGradient>
            </defs>
            <path class="thread-path" :d="d" fill="none" stroke="url(#thread-grad)" stroke-width="2"
                stroke-linecap="round" />
            <circle class="thread-comet" r="5" cx="-30" cy="-30" style="opacity: 0" />
        </svg>
    </div>
</template>

<style scoped>
.thread-path {
    opacity: 0.5;
}

html:not(.dark) .thread-path {
    opacity: 0.55;
}

/* On phones the gutters are gone — the line crosses content, so it whispers. */
@media (max-width: 640px) {
    .thread-path {
        opacity: 0.22;
    }
}

.thread-comet {
    fill: #fff;
    filter: drop-shadow(0 0 8px rgba(10, 132, 255, 0.9)) drop-shadow(0 0 18px rgba(10, 132, 255, 0.55));
    transition: opacity 0.3s ease;
    transform-box: fill-box;
    transform-origin: center;
    animation: comet-pulse 2.4s ease-in-out infinite;
}

@keyframes comet-pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.4);
    }
}

html:not(.dark) .thread-comet {
    fill: #0a84ff;
    filter: drop-shadow(0 0 8px rgba(10, 132, 255, 0.55));
}

/* Reduced motion: the fully-drawn thread stays as quiet decoration. */
@media (prefers-reduced-motion: reduce) {
    .thread-path {
        opacity: 0.16;
    }

    .thread-comet {
        display: none;
    }
}
</style>
