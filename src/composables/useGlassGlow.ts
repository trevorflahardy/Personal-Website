import { onBeforeUnmount, onMounted } from "vue";

// Every surface that should catch the pointer light. [data-glow] lets plain
// (non-glass) elements opt in — e.g. the work-experience cards, which render
// their own accent-tinted overlay from the same --gx/--gy variables.
const GLOW_SELECTOR =
    ".glass-thin, .glass-regular, .glass-semithick, .glass-thick, .glass-card, [data-glow]";

/**
 * One delegated, rAF-throttled pointermove listener that keeps the innermost
 * glass surface under the cursor lit: sets --gx/--gy (percent position of the
 * pointer inside the surface) and --glare-o (1 while hovered, 0 after leave).
 * The actual light is painted in CSS (see "POINTER GLARE" in index.css).
 *
 * Mount once at the app root. Desktop-pointer only.
 */
export function useGlassGlow() {
    let current: HTMLElement | null = null;
    let target: HTMLElement | null = null;
    let px = 0;
    let py = 0;
    let raf = 0;

    const apply = () => {
        raf = 0;
        if (target !== current && current) {
            current.style.setProperty("--glare-o", "0");
        }
        current = target;
        if (current) {
            const rect = current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                const gx = ((px - rect.left) / rect.width) * 100;
                const gy = ((py - rect.top) / rect.height) * 100;
                current.style.setProperty("--gx", `${gx.toFixed(2)}%`);
                current.style.setProperty("--gy", `${gy.toFixed(2)}%`);
                current.style.setProperty("--glare-o", "1");
            }
        }
    };

    const onMove = (e: PointerEvent) => {
        px = e.clientX;
        py = e.clientY;
        const t = e.target;
        target =
            t instanceof Element
                ? (t.closest(GLOW_SELECTOR) as HTMLElement | null)
                : null;
        if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
        target = null;
        if (!raf) raf = requestAnimationFrame(apply);
    };

    onMounted(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        document.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
    });

    onBeforeUnmount(() => {
        cancelAnimationFrame(raf);
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
    });
}
