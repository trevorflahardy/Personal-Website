import type { Directive } from "vue";

export interface MagneticOptions {
    /** How strongly the element follows the cursor (0–1, default 0.3). */
    strength?: number;
}

interface MagneticElement extends HTMLElement {
    _magneticCleanup?: () => void;
}

const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * v-magnetic — the element leans toward the cursor while hovered and springs
 * back on leave. Desktop-pointer only; no-op for touch and reduced motion.
 *
 * Usage: <button v-magnetic>…</button> or v-magnetic="{ strength: 0.4 }"
 */
export const vMagnetic: Directive<MagneticElement, MagneticOptions | undefined> = {
    mounted(el, binding) {
        if (!canHover()) return;
        const strength = binding.value?.strength ?? 0.3;

        const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            el.style.transition = "transform 120ms ease-out";
            el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
        };

        const onLeave = () => {
            el.style.transition = "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)";
            el.style.transform = "";
        };

        el.addEventListener("pointermove", onMove, { passive: true });
        el.addEventListener("pointerleave", onLeave);
        el._magneticCleanup = () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
        };
    },
    unmounted(el) {
        el._magneticCleanup?.();
    },
};
