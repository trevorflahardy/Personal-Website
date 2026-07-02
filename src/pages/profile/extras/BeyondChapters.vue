<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { useScrollScene } from '@/composables/useScrollScene';

gsap.registerPlugin(MotionPathPlugin);

interface Chapter {
    id: string;
    num: string;
    kicker: string;
    title: string;
    body: string;
    accent: string;
    caption: string;
}

const chapters: Chapter[] = [
    {
        id: 'car',
        num: '01',
        kicker: 'The Garage',
        title: 'I think with my hands.',
        body: 'Time under the hood is how I decompress. There\'s something grounding about working with your hands on mechanical problems — it sharpens the same problem-solving instincts I bring to code.',
        accent: '#f59e0b',
        caption: 'redline therapy',
    },
    {
        id: 'gym',
        num: '02',
        kicker: 'The Iron',
        title: 'Discipline compounds.',
        body: 'Discipline in the gym translates directly to discipline in engineering. Consistency, progressive overload, and showing up even when you don\'t feel like it — sounds a lot like shipping software.',
        accent: '#fb7185',
        caption: 'progressive overload',
    },
    {
        id: 'pickle',
        num: '03',
        kicker: 'The Court',
        title: 'I play to win.',
        body: 'I\'m competitive by nature, and pickleball is where that comes out. The fast-paced strategy and reading opponents keeps my mind sharp in a completely different way than writing code.',
        accent: '#4ade80',
        caption: 'kitchen-line strategy',
    },
];

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const root = useTemplateRef<HTMLElement>('root');
const activeIdx = ref(0);

// Pinned chapter sequence — the stage stays sticky while ~3 viewports of
// scroll scrub through the three worlds. Each chapter: slide in → line-art
// draws → its signature motion plays (needle sweeps / plates load / ball
// flies) → hand off to the next.
useScrollScene(({ gsap: g }) => {
    const el = root.value;
    if (!el) return;

    const chapterEls = Array.from(el.querySelectorAll<HTMLElement>('.chapter'));
    if (!chapterEls.length) return;

    const tl = g.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            onUpdate(self) {
                activeIdx.value = Math.min(
                    chapters.length - 1,
                    Math.floor(self.progress * chapters.length),
                );
            },
        },
    });

    chapterEls.forEach((ch, i) => {
        const t0 = i; // one timeline-unit per chapter
        // Chapter 1 is visible at rest (before the trigger starts); the rest
        // slide in when the scrub reaches their slot.
        if (i > 0) {
            tl.fromTo(
                ch,
                { autoAlpha: 0, y: 70 },
                { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power2.out' },
                t0,
            );
        }

        // Line-art draw-in.
        tl.fromTo(
            ch.querySelectorAll('.draw'),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.4, stagger: 0.04 },
            t0 + 0.08,
        );

        // Accent bloom breathes in behind the art.
        tl.fromTo(
            ch.querySelector('.chapter-bloom'),
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
            t0 + 0.12,
        );

        // Ghost numeral drifts across the whole chapter.
        tl.fromTo(
            ch.querySelector('.chapter-num'),
            { yPercent: 14 },
            { yPercent: -14, duration: 1 },
            t0,
        );

        // Signature motion per chapter.
        const id = chapters[i].id;
        if (id === 'car') {
            // Needle sweeps from idle to redline. The needle is NOT part of
            // the draw set — drawing and rotating the same line reads broken.
            tl.fromTo(
                ch.querySelector('.tach-needle'),
                { rotate: 0, svgOrigin: '110 116' },
                { rotate: 145, duration: 0.45, ease: 'power3.inOut' },
                t0 + 0.3,
            );
        } else if (id === 'gym') {
            tl.from(
                ch.querySelectorAll('.plate-left'),
                { x: -46, opacity: 0, duration: 0.28, stagger: 0.08, ease: 'power2.out' },
                t0 + 0.3,
            );
            tl.from(
                ch.querySelectorAll('.plate-right'),
                { x: 46, opacity: 0, duration: 0.28, stagger: 0.08, ease: 'power2.out' },
                t0 + 0.3,
            );
        } else if (id === 'pickle') {
            const ball = ch.querySelector('.pickle-ball');
            const arc = ch.querySelector('.ball-arc');
            if (ball && arc) {
                tl.to(
                    ball,
                    {
                        motionPath: {
                            path: arc as SVGPathElement,
                            align: arc as SVGPathElement,
                            alignOrigin: [0.5, 0.5],
                        },
                        opacity: 1,
                        duration: 0.45,
                        ease: 'power1.inOut',
                    },
                    t0 + 0.3,
                );
            }
        }

        if (i < chapterEls.length - 1) {
            tl.to(ch, { autoAlpha: 0, y: -60, duration: 0.18, ease: 'power2.in' }, t0 + 0.82);
        }
    });
});
</script>

<template>
    <div class="w-full">
        <div v-reveal class="mb-2">
            <p class="font-mono text-xs uppercase tracking-[0.28em] text-white/40 mb-3">Off hours</p>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight text-white text-pretty mb-2">
                Beyond the Code
            </h2>
            <p class="subtitle mb-0">
                What occupies my time when the laptop closes — scroll through it.
            </p>
        </div>

        <!-- Reduced motion fallback: plain stacked chapters, art fully drawn. -->
        <div v-if="prefersReducedMotion" class="flex flex-col gap-10 py-8">
            <section v-for="ch in chapters" :key="ch.id" class="max-w-3xl">
                <p class="text-xs uppercase tracking-[0.22em] font-medium mb-2" :style="{ color: ch.accent }">
                    {{ ch.num }} — {{ ch.kicker }}
                </p>
                <h3 class="title-3 mb-2">{{ ch.title }}</h3>
                <p class="body mb-0">{{ ch.body }}</p>
            </section>
        </div>

        <!-- Scroll-driven stage: tall wrapper provides the scrub distance, the
             sticky stage inside holds one chapter at a time. -->
        <div v-else ref="root" class="relative h-[400vh]">
            <div class="sticky top-2 h-[calc(100dvh-9rem)] min-h-[430px] flex items-center overflow-hidden">

                <!-- Chapter progress dots -->
                <div class="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10">
                    <span v-for="(ch, i) in chapters" :key="ch.id"
                        class="chapter-dot w-1.5 rounded-full transition-all duration-500"
                        :class="i === activeIdx ? 'h-7' : 'h-1.5'"
                        :style="i === activeIdx ? { backgroundColor: ch.accent } : {}" />
                </div>

                <div v-for="(ch, ci) in chapters" :key="ch.id"
                    class="chapter absolute inset-0 flex items-center"
                    :class="ci > 0 ? 'opacity-0 invisible' : ''"
                    :style="{ '--ch-accent': ch.accent }">

                    <!-- Ghost numeral — oversized, drifts vertically across the chapter -->
                    <span class="chapter-num absolute right-2 md:right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none
                                 text-[9rem] md:text-[15rem] lg:text-[19rem] font-bold leading-none tracking-tighter text-white/4"
                        aria-hidden="true">
                        {{ ch.num }}
                    </span>

                    <div class="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-8 md:px-14">
                        <div class="lg:col-span-6 max-w-xl">
                            <p class="chapter-kicker font-mono text-xs uppercase tracking-[0.28em] mb-3">
                                {{ ch.num }} — {{ ch.kicker }}
                            </p>
                            <h3
                                class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-white mb-5 text-pretty">
                                {{ ch.title }}
                            </h3>
                            <p class="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-lg">
                                {{ ch.body }}
                            </p>
                        </div>

                        <div class="lg:col-span-6 relative hidden sm:flex flex-col items-center justify-center chapter-art">
                            <!-- Accent bloom — a pool of the chapter's color behind the art -->
                            <div class="chapter-bloom" aria-hidden="true" />

                            <!-- Car — tachometer. The dial draws in, then the needle
                                 sweeps from idle to the redline as you scroll. -->
                            <svg v-if="ch.id === 'car'" viewBox="0 0 220 160" class="relative w-full max-w-[420px]"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <!-- Dial arc (top semicircle) -->
                                <path class="draw stroke-line" pathLength="1" stroke-width="2"
                                    d="M 40 116 A 70 70 0 0 1 180 116" />
                                <!-- Redline segment -->
                                <path class="draw accent-pop" pathLength="1" stroke-width="4.5"
                                    d="M 167.3 75.9 A 70 70 0 0 1 180 116" />
                                <!-- Ticks -->
                                <path class="draw stroke-line" pathLength="1" stroke-width="1.8"
                                    d="M40 116 h8 M60.5 66.5 l5.7 5.7 M110 46 v8 M159.5 66.5 l-5.7 5.7 M180 116 h-8" />
                                <!-- Needle: anchored at the hub, rotated by GSAP (never dash-drawn) -->
                                <line class="tach-needle accent-pop" stroke-width="3.5" x1="110" y1="116" x2="56.8"
                                    y2="106.6" />
                                <circle class="draw accent-pop" pathLength="1" stroke-width="3" cx="110" cy="116"
                                    r="6" />
                                <path class="draw stroke-line" pathLength="1" stroke-width="1.8" d="M 92 138 h 36"
                                    opacity="0.5" />
                            </svg>

                            <!-- Gym — barbell, plates load in from the sides -->
                            <svg v-else-if="ch.id === 'gym'" viewBox="0 0 220 150" class="relative w-full max-w-[420px]"
                                fill="none" stroke-linecap="round">
                                <line class="draw stroke-line" pathLength="1" stroke-width="2" x1="14" y1="75" x2="206"
                                    y2="75" />
                                <rect class="draw accent-pop plate-left accent-fill" pathLength="1" stroke-width="2"
                                    x="52" y="39" width="15" height="72" rx="5" />
                                <rect class="draw accent-pop plate-left accent-fill" pathLength="1" stroke-width="2"
                                    x="34" y="51" width="13" height="48" rx="5" />
                                <rect class="draw accent-pop plate-right accent-fill" pathLength="1" stroke-width="2"
                                    x="153" y="39" width="15" height="72" rx="5" />
                                <rect class="draw accent-pop plate-right accent-fill" pathLength="1" stroke-width="2"
                                    x="173" y="51" width="13" height="48" rx="5" />
                                <path class="draw stroke-line" pathLength="1" stroke-width="1.8"
                                    d="M74 68 v14 M146 68 v14" />
                            </svg>

                            <!-- Pickleball — court plan, ball flies the arc -->
                            <svg v-else viewBox="0 0 220 150" class="relative w-full max-w-[420px]" fill="none"
                                stroke-linecap="round">
                                <rect class="draw stroke-line" pathLength="1" stroke-width="1.8" x="20" y="30"
                                    width="180" height="90" rx="3" />
                                <!-- Kitchen (non-volley zone) tinted in accent -->
                                <rect class="kitchen-fill" x="82" y="30" width="56" height="90" />
                                <line class="draw stroke-line" pathLength="1" stroke-width="2.4" x1="110" y1="22"
                                    x2="110" y2="128" />
                                <line class="draw stroke-line" pathLength="1" stroke-width="1.8" x1="82" y1="30" x2="82"
                                    y2="120" />
                                <line class="draw stroke-line" pathLength="1" stroke-width="1.8" x1="138" y1="30"
                                    x2="138" y2="120" />
                                <path class="draw stroke-line" pathLength="1" stroke-width="1.8"
                                    d="M20 75 H 82 M138 75 H 200" />
                                <path class="ball-arc" stroke-width="1.4" d="M 34 44 Q 110 -2 186 48"
                                    stroke-dasharray="3 5" opacity="0.5" />
                                <circle class="pickle-ball" cx="34" cy="44" r="5.5" opacity="0" />
                            </svg>

                            <p class="chapter-kicker font-mono text-[11px] uppercase tracking-[0.28em] mt-5 opacity-70">
                                {{ ch.caption }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Accent-colored elements per chapter, with an ink-darkened cousin on light
   glass so the neon-ish dark-mode accents stay readable. */
.chapter-kicker {
    color: var(--ch-accent);
}

html:not(.dark) .chapter-kicker {
    color: color-mix(in srgb, var(--ch-accent) 60%, rgb(28, 28, 30));
}

/* Art strokes: structure lines in soft white, signature elements in accent
   with a gentle glow — the "pop of color" against the reserved line work. */
.stroke-line {
    stroke: rgba(255, 255, 255, 0.65);
}

html:not(.dark) .stroke-line {
    stroke: rgba(28, 28, 30, 0.55);
}

.accent-pop {
    stroke: var(--ch-accent);
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--ch-accent) 55%, transparent));
}

.accent-fill {
    fill: color-mix(in srgb, var(--ch-accent) 16%, transparent);
}

.ball-arc {
    stroke: rgba(255, 255, 255, 0.55);
}

html:not(.dark) .ball-arc {
    stroke: rgba(28, 28, 30, 0.45);
}

.pickle-ball {
    fill: var(--ch-accent);
    filter: drop-shadow(0 0 8px color-mix(in srgb, var(--ch-accent) 70%, transparent));
}

.kitchen-fill {
    fill: color-mix(in srgb, var(--ch-accent) 10%, transparent);
}

/* Line-art strokes draw in via dashoffset (pathLength=1 normalizes lengths). */
.draw {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
}

/* Accent bloom behind the art — colored light pooling through the glass. */
.chapter-bloom {
    position: absolute;
    width: 340px;
    height: 340px;
    border-radius: 9999px;
    background: radial-gradient(closest-side,
            color-mix(in srgb, var(--ch-accent) 26%, transparent),
            transparent 72%);
    filter: blur(30px);
    pointer-events: none;
}

html:not(.dark) .chapter-bloom {
    background: radial-gradient(closest-side,
            color-mix(in srgb, var(--ch-accent) 20%, transparent),
            transparent 72%);
}

/* Ghost numeral needs a touch more presence on light glass. */
html:not(.dark) .chapter-num {
    color: rgba(28, 28, 30, 0.05);
}

.chapter-dot {
    background-color: rgba(255, 255, 255, 0.25);
}

html:not(.dark) .chapter-dot {
    background-color: rgba(28, 28, 30, 0.22);
}
</style>
