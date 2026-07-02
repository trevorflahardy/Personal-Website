import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Tracks read progress (0–1) of a scroll container — used by the hairline
 * progress indicator at the top of the glass content shell in Hero.vue.
 * Works with Lenis since Lenis drives the element's native scrollTop.
 */
export function useScrollProgress(targetSelector = "#main-content") {
    const progress = ref(0);
    let el: HTMLElement | null = null;

    const recompute = () => {
        if (!el) return;
        const max = el.scrollHeight - el.clientHeight;
        progress.value = max > 4 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    };

    onMounted(() => {
        el = document.querySelector<HTMLElement>(targetSelector);
        el?.addEventListener("scroll", recompute, { passive: true });
        recompute();
    });

    onBeforeUnmount(() => {
        el?.removeEventListener("scroll", recompute);
        el = null;
    });

    return { progress, recompute };
}
