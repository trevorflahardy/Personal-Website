<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useSidebarGuide } from "@/composables/useSidebarGuide";

const { showGuide, dismiss } = useSidebarGuide();

const visible = ref(false);
const leaving = ref(false);
let showTimer: ReturnType<typeof setTimeout> | null = null;
let autoTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
    if (!showGuide.value) return;
    // Delayed appearance — let the page settle first
    showTimer = setTimeout(() => {
        visible.value = true;
        // Auto-dismiss after 9 seconds if user hasn't interacted
        autoTimer = setTimeout(() => leave(), 9000);
    }, 1600);
});

onBeforeUnmount(() => {
    if (showTimer) clearTimeout(showTimer);
    if (autoTimer) clearTimeout(autoTimer);
});

function leave() {
    if (!visible.value || leaving.value) return;
    leaving.value = true;
    setTimeout(() => {
        visible.value = false;
        leaving.value = false;
        dismiss();
    }, 420);
}

function handleDismiss() {
    if (autoTimer) clearTimeout(autoTimer);
    leave();
}
</script>

<template>
    <Teleport to="body">
        <Transition name="guide">
            <div v-if="visible && showGuide" class="sg-wrap" :class="{ 'sg-wrap--leaving': leaving }" aria-live="polite">
                <!-- Backdrop pulse rings — centered on the tooltip -->
                <span class="sg-ring sg-ring--1" aria-hidden="true" />
                <span class="sg-ring sg-ring--2" aria-hidden="true" />

                <div class="sg-card" role="tooltip">
                    <!-- Arrow pointing up-left toward the sidebar items -->
                    <div class="sg-arrow" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16 16 L4 4 M4 4 L10 4 M4 4 L4 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>

                    <div class="sg-content">
                        <p class="sg-label">PORTFOLIO NAVIGATION</p>
                        <p class="sg-heading">Explore my work ←</p>
                        <p class="sg-body">Each project in the sidebar loads a unique showcase — click any entry to dive in.</p>
                    </div>

                    <button class="sg-dismiss" @click="handleDismiss" aria-label="Dismiss navigation guide">
                        Got it
                        <span class="sg-dismiss__arrow">→</span>
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* Fixed bottom-left position — always near the sidebar on desktop */
.sg-wrap {
    position: fixed;
    bottom: clamp(1.25rem, 3vh, 2.5rem);
    left: clamp(1rem, 2vw, 1.5rem);
    z-index: 9000;
    pointer-events: none;
}

/* Pulse rings — centered on the card */
.sg-ring {
    position: absolute;
    bottom: -0.25rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.22);
    pointer-events: none;
}
.sg-ring--1 {
    width: 180px; height: 180px;
    margin-bottom: -90px; margin-left: -90px;
    animation: sg-pulse 3s ease-out 2.2s infinite;
    opacity: 0;
}
.sg-ring--2 {
    width: 280px; height: 280px;
    margin-bottom: -140px; margin-left: -140px;
    animation: sg-pulse 3s ease-out 2.8s infinite;
    opacity: 0;
}
@keyframes sg-pulse {
    0%   { opacity: 0.35; transform: translateX(-50%) scale(0.7); }
    100% { opacity: 0; transform: translateX(-50%) scale(1); }
}

/* Main glass card */
.sg-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    width: clamp(240px, 28vw, 320px);
    padding: 1.1rem 1.25rem;
    background: rgba(20, 20, 30, 0.72);
    backdrop-filter: blur(24px) saturate(1.4);
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 1rem;
    box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.06),
        0 16px 48px rgba(0, 0, 0, 0.55),
        0 4px 12px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    pointer-events: all;
    /* Shimmer border animation */
    animation: sg-border-glow 4s ease-in-out 2.5s infinite;
}

@keyframes sg-border-glow {
    0%, 100% { border-color: rgba(255, 255, 255, 0.14); }
    50%      { border-color: rgba(255, 255, 255, 0.28); box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.04); }
}

/* Arrow — sits at top-left of the card */
.sg-arrow {
    position: absolute;
    top: 0.85rem;
    right: 1rem;
    color: rgba(255, 255, 255, 0.35);
    animation: sg-nudge 2.5s ease-in-out 3s infinite;
}
@keyframes sg-nudge {
    0%, 100% { transform: translate(0, 0); opacity: 0.35; }
    50%      { transform: translate(-3px, -3px); opacity: 0.65; }
}

.sg-content { display: flex; flex-direction: column; gap: 0.3rem; }

.sg-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.6rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
}

.sg-heading {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: -0.01em;
    margin: 0;
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
}

.sg-body {
    font-size: 0.8rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.55);
    margin: 0;
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
}

/* Dismiss CTA */
.sg-dismiss {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 9999px;
    padding: 0.35rem 0.8rem;
    cursor: pointer;
    transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
}
.sg-dismiss:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.22);
    color: rgba(255, 255, 255, 0.9);
}
.sg-dismiss__arrow { transition: transform 180ms ease; }
.sg-dismiss:hover .sg-dismiss__arrow { transform: translateX(3px); }

/* Vue Transition classes */
.guide-enter-active {
    animation: sg-enter 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.guide-leave-active {
    animation: sg-leave 380ms cubic-bezier(0.55, 0, 1, 0.45) both;
}
@keyframes sg-enter {
    from { opacity: 0; transform: translateY(12px) scale(0.94); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
@keyframes sg-leave {
    from { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    to   { opacity: 0; transform: translateY(8px) scale(0.96); filter: blur(3px); }
}

@media (prefers-reduced-motion: reduce) {
    .sg-ring, .sg-card, .sg-arrow { animation: none !important; }
    .guide-enter-active, .guide-leave-active { animation: none !important; }
}
</style>
