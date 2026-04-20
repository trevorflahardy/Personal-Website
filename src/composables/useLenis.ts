import { onBeforeUnmount, onMounted } from "vue";
import Lenis from "lenis";

// Lenis bound to a specific scrollable element (#main-content in Hero.vue).
// The app's scroller is NOT window — Hero.vue makes #main-content overflow-y-scroll.
// Pass a selector or element ref; Lenis wraps it. Cleans up on unmount.
export function useLenis(targetSelector = "#main-content") {
    let lenis: Lenis | null = null;
    let rafId = 0;

    const prefersReducedMotion = () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    onMounted(() => {
        if (prefersReducedMotion()) return;
        const el = document.querySelector<HTMLElement>(targetSelector);
        if (!el) return;

        lenis = new Lenis({
            wrapper: el,
            content: el.firstElementChild as HTMLElement | undefined ?? el,
            lerp: 0.08,
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.3,
        });

        const tick = (time: number) => {
            lenis?.raf(time);
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
    });

    onBeforeUnmount(() => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
        lenis = null;
    });

    return {
        get lenis() { return lenis; },
    };
}
