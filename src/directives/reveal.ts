import type { Directive } from "vue";

export interface RevealOptions {
    /** Extra transition delay in ms — use for staggering siblings. */
    delay?: number;
    /** Starting Y offset in px (default 22). */
    y?: number;
    /** Starting blur in px. Only safe on elements that do NOT contain
     *  backdrop-filter glass (ancestor filter breaks descendant backdrop blur). */
    blur?: number;
    /** Starting scale (default 1). */
    scale?: number;
}

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-revealed");
                        observer?.unobserve(entry.target);
                    }
                }
            },
            // Reveal slightly before the element fully enters so the motion is
            // felt mid-scroll, not after arrival.
            { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
        );
    }
    return observer;
}

/**
 * v-reveal — scroll-into-view reveal.
 *
 * Usage:
 *   <div v-reveal>…</div>
 *   <div v-reveal="{ delay: 120, y: 28, blur: 6 }">…</div>
 *
 * Pairs with the `[data-reveal]` CSS in src/index.css. Falls back to fully
 * visible (no attribute, no observation) under prefers-reduced-motion.
 */
export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
    created(el, binding) {
        if (prefersReducedMotion()) return;
        el.dataset.reveal = "";
        const opts = binding.value ?? {};
        if (opts.delay) el.style.setProperty("--reveal-delay", `${opts.delay}ms`);
        if (opts.y !== undefined) el.style.setProperty("--reveal-y", `${opts.y}px`);
        if (opts.blur) el.style.setProperty("--reveal-blur", `${opts.blur}px`);
        if (opts.scale !== undefined)
            el.style.setProperty("--reveal-scale", `${opts.scale}`);
    },
    mounted(el) {
        if (prefersReducedMotion()) return;
        getObserver().observe(el);
    },
    unmounted(el) {
        observer?.unobserve(el);
    },
};
