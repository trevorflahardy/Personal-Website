import { onBeforeUnmount, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register plugin once at module load — GSAP idempotently handles repeat calls
// but this keeps the registration co-located with the consumer.
gsap.registerPlugin(ScrollTrigger);

type SceneSetup = (ctx: {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
}) => void | (() => void);

// Wires up a GSAP scroll scene tied to #main-content as the scroller.
// Accepts a setup callback that receives gsap + ScrollTrigger. Cleans up
// all triggers + timelines on unmount. Respects prefers-reduced-motion.
export function useScrollScene(setup: SceneSetup) {
    const scope = gsap.context(() => {});
    let cleanup: void | (() => void);

    const prefersReducedMotion = () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    onMounted(() => {
        if (prefersReducedMotion()) return;

        const scroller = document.querySelector("#main-content");
        if (scroller) {
            ScrollTrigger.defaults({ scroller });
        }

        scope.add(() => {
            cleanup = setup({ gsap, ScrollTrigger }) ?? undefined;
        });

        // Forces all registered triggers to recalculate against the bound scroller.
        ScrollTrigger.refresh();
    });

    onBeforeUnmount(() => {
        if (typeof cleanup === "function") cleanup();
        scope.revert();
    });
}
