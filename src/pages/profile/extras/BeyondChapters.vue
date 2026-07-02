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
}

const chapters: Chapter[] = [
    {
        id: 'car',
        num: '01',
        kicker: 'The Garage',
        title: 'I think with my hands.',
        body: 'Time under the hood is how I decompress. There\'s something grounding about working with your hands on mechanical problems — it sharpens the same problem-solving instincts I bring to code.',
        accent: '#f59e0b',
    },
    {
        id: 'gym',
        num: '02',
        kicker: 'The Iron',
        title: 'Discipline compounds.',
        body: 'Discipline in the gym translates directly to discipline in engineering. Consistency, progressive overload, and showing up even when you don\'t feel like it — sounds a lot like shipping software.',
        accent: '#fb7185',
    },
    {
        id: 'pickle',
        num: '03',
        kicker: 'The Court',
        title: 'I play to win.',
        body: 'I\'m competitive by nature, and pickleball is where that comes out. The fast-paced strategy and reading opponents keeps my mind sharp in a completely different way than writing code.',
        accent: '#4ade80',
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
            tl.fromTo(
                ch.querySelector('.gauge-needle'),
                { rotate: -95, svgOrigin: '110 118' },
                { rotate: 18, duration: 0.42, ease: 'power3.inOut' },
                t0 + 0.32,
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
            <h2 class="title-2 mb-2">Beyond the Code</h2>
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
        <div v-else ref="root" class="relative h-[300vh]">
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
                            <p class="chapter-kicker text-xs uppercase tracking-[0.22em] font-medium mb-3">
                                {{ ch.num }} — {{ ch.kicker }}
                            </p>
                            <h3
                                class="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 text-pretty">
                                {{ ch.title }}
                            </h3>
                            <p class="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-lg">
                                {{ ch.body }}
                            </p>
                        </div>

                        <div class="lg:col-span-6 relative hidden sm:flex items-center justify-center chapter-art">
                            <!-- Accent bloom — a pool of the chapter's color behind the art -->
                            <div class="chapter-bloom" aria-hidden="true" />

                            <!-- Car — instrument gauge, needle sweeps on scroll -->
                            <svg v-if="ch.id === 'car'" viewBox="0 0 220 150" class="relative w-full max-w-[420px]"
                                fill="none" stroke-linecap="round">
                                <path class="draw stroke-line" pathLength="1" stroke-width="1.8"
                                    d="M 38 128 A 78 78 0 1 1 182 128" />
                                <!-- Redline segment -->
                                <path class="draw accent-pop" pathLength="1" stroke-width="4"
                                    d="M 160 74 A 78 78 0 0 1 182 128" />
                                <path class="draw stroke-line" pathLength="1" stroke-width="1.8"
                                    d="M110 36 v12 M52 60 l8 8 M168 60 l-8 -8 M34 104 h12 M186 104 h-12" />
                                <line class="draw gauge-needle accent-pop" pathLength="1" stroke-width="3" x1="110"
                                    y1="118" x2="154" y2="72" />
                                <circle class="draw accent-pop" pathLength="1" stroke-width="3" cx="110" cy="118"
                                    r="7" />
                                <path class="draw stroke-line" pathLength="1" stroke-width="1.8" d="M 92 140 h 36"
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
