<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from "vue";

const theme = useLocalStorage("theme", "dark");

const isDark = computed(() => theme.value === "dark");

// Pointer parallax — the room drifts gently against the cursor so the glass
// panels have a physical world to refract. Slightly overscaled so the edges
// never show, lerped in a rAF loop so the movement has weight.
const parallax = useTemplateRef<HTMLElement>("parallax");
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let rafId = 0;
let running = false;

const step = () => {
    currentX += (targetX - currentX) * 0.055;
    currentY += (targetY - currentY) * 0.055;
    if (parallax.value) {
        parallax.value.style.transform = `scale(1.06) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    }
    if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(step);
    } else {
        running = false;
    }
};

const onMove = (e: PointerEvent) => {
    targetX = -(e.clientX / window.innerWidth - 0.5) * 18;
    targetY = -(e.clientY / window.innerHeight - 0.5) * 12;
    if (!running) {
        running = true;
        rafId = requestAnimationFrame(step);
    }
};

onMounted(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    window.addEventListener("pointermove", onMove, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener("pointermove", onMove);
    cancelAnimationFrame(rafId);
});
</script>

<template>
    <!-- This Background component represents the "toggle-able" background on the app. It gives
     gradual shifting between light and dark. Additionally, the z-index of this item is below
     the other app (hero) content so that the glass background-blur is a real glass feel.-->
    <div class="h-screen w-screen overflow-hidden">
        <div ref="parallax" class="absolute inset-0 will-change-transform" style="transform: scale(1.06)">
            <transition name="fade" mode="in-out">
                <div v-if="isDark" class="absolute inset-0 bg-center bg-clip-border bg-cover bg-apt-night" />
                <div v-else class="absolute inset-0 bg-center bg-clip-border bg-cover bg-apt-day" />
            </transition>
        </div>

        <!-- Vignette — darkens the corners so the eye settles on the glass panels
             and the room reads as deep space instead of flat wallpaper. -->
        <div class="absolute inset-0 pointer-events-none vignette" :class="isDark ? 'vignette--dark' : 'vignette--light'" />
    </div>
</template>

<style scoped>
/* Denotes the fade transition between the backgrounds */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0.01;
}

.vignette--dark {
    background: radial-gradient(120% 90% at 50% 40%,
            transparent 52%,
            rgba(0, 0, 0, 0.42) 100%);
}

.vignette--light {
    background: radial-gradient(120% 90% at 50% 40%,
            transparent 60%,
            rgba(15, 23, 42, 0.16) 100%);
}
</style>
