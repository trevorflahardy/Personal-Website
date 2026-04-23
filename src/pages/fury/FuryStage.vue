<script setup lang="ts">
import type { FuryFeature } from './fury-data';

defineProps<{
    feature: FuryFeature;
    index: number;
}>();
</script>

<template>
    <article class="stage" :style="{ '--i': index } as any">
        <div class="stage-rule-row">
            <span class="stage-num">STAGE {{ String(index + 1).padStart(2, '0') }}</span>
            <span class="stage-rule" />
            <span class="stage-title-tag">{{ feature.title }}</span>
        </div>
        <template v-if="feature.img">
            <div class="stage-crt">
                <div class="stage-crt__feed-tag">● LIVE</div>
                <img :src="feature.img" :alt="`${feature.title} — ${feature.cmd}`" class="stage-crt__img" />
                <div class="stage-crt__scanlines" aria-hidden="true" />
                <div class="stage-crt__corners" aria-hidden="true"><span /><span /><span /><span /></div>
            </div>
        </template>
        <template v-else>
            <div class="stage-crt stage-crt--offline">
                <div class="stage-crt__noise" aria-hidden="true" />
                <div class="stage-crt__offline-text">
                    <span class="offline-label">SIGNAL LOST</span>
                    <span class="offline-sub">AUDIO CHANNEL ACTIVE</span>
                </div>
                <div class="stage-crt__scanlines" aria-hidden="true" />
                <div class="stage-crt__corners" aria-hidden="true"><span /><span /><span /><span /></div>
            </div>
        </template>
        <div class="stage-info">
            <code class="stage-cmd">{{ feature.cmd }}</code>
        </div>
        <p class="stage-body">{{ feature.body }}</p>
        <p v-if="feature.why" class="stage-why">{{ feature.why }}</p>
    </article>
</template>

<style scoped>
.stage {
    animation: sys-in 500ms ease-out both;
    animation-delay: calc(var(--i, 0) * 120ms);
}

@keyframes sys-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.stage-rule-row {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1.25rem;
}

.stage-num {
    font-size: 0.56rem;
    letter-spacing: 0.28em;
    color: var(--neon);
    text-shadow: 0 0 8px rgba(255, 45, 122, 0.6);
    flex-shrink: 0;
}

.stage-rule {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(78, 219, 252, 0.5), rgba(78, 219, 252, 0.04));
}

.stage-title-tag {
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    color: var(--neon-2);
    text-shadow: 0 0 8px rgba(78, 219, 252, 0.5);
    flex-shrink: 0;
}

.stage-crt {
    position: relative;
    background: #010108;
    border: 2px solid rgba(78, 219, 252, 0.18);
    box-shadow:
        0 0 0 1px rgba(78, 219, 252, 0.05),
        0 0 48px rgba(78, 219, 252, 0.05),
        inset 0 0 40px rgba(0, 0, 0, 0.7);
    overflow: hidden;
}

.stage-crt__feed-tag {
    position: absolute;
    top: 0.65rem;
    left: 0.85rem;
    z-index: 5;
    font-size: 0.52rem;
    letter-spacing: 0.18em;
    color: var(--neon);
    text-shadow: 0 0 6px rgba(255, 45, 122, 0.9);
    animation: feed-pulse 2s steps(2, end) infinite;
}

@keyframes feed-pulse {
    0%, 65% { opacity: 1; }
    66%, 100% { opacity: 0.25; }
}

.stage-crt__img {
    display: block;
    width: 100%;
    height: auto;
    opacity: 0.92;
    filter: saturate(0.82) brightness(0.93);
}

.stage-crt--offline {
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stage-crt__noise {
    position: absolute;
    inset: 0;
    background-image:
        repeating-linear-gradient(0deg, rgba(78, 219, 252, 0.03) 0 1px, transparent 1px 3px),
        repeating-linear-gradient(90deg, rgba(255, 45, 122, 0.02) 0 1px, transparent 1px 5px);
    animation: noise-shift 0.35s steps(3) infinite;
}

@keyframes noise-shift {
    0% { background-position: 0 0, 0 0; }
    33% { background-position: 0 -3px, 2px 0; }
    66% { background-position: 0 1px, -2px 0; }
    100% { background-position: 0 0, 0 0; }
}

.stage-crt__offline-text {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
}

.offline-label {
    font-size: 1.2rem;
    letter-spacing: 0.24em;
    color: rgba(78, 219, 252, 0.38);
    text-shadow: 0 0 14px rgba(78, 219, 252, 0.22);
}

.offline-sub {
    font-family: "VT323", monospace;
    font-size: 1.1rem;
    letter-spacing: 0.12em;
    color: rgba(78, 219, 252, 0.2);
}

.stage-crt__scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        to bottom,
        transparent 0 2px,
        rgba(0, 0, 0, 0.18) 2px 3px
    );
    pointer-events: none;
    z-index: 3;
}

.stage-crt__corners {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
}

.stage-crt__corners span {
    position: absolute;
    width: 16px;
    height: 16px;
    border-color: rgba(78, 219, 252, 0.55);
    border-style: solid;
}

.stage-crt__corners span:nth-child(1) { top: 7px; left: 7px; border-width: 2px 0 0 2px; }
.stage-crt__corners span:nth-child(2) { top: 7px; right: 7px; border-width: 2px 2px 0 0; }
.stage-crt__corners span:nth-child(3) { bottom: 7px; left: 7px; border-width: 0 0 2px 2px; }
.stage-crt__corners span:nth-child(4) { bottom: 7px; right: 7px; border-width: 0 2px 2px 0; }

.stage-info {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 0.85rem 0 0.5rem;
    border-top: 1px dashed var(--rule);
    margin-top: 0.75rem;
}

.stage-cmd {
    font-family: "VT323", monospace;
    font-size: 1.3rem;
    color: var(--gold);
    letter-spacing: 0.06em;
    text-shadow: 0 0 8px rgba(255, 212, 71, 0.4);
    white-space: nowrap;
    flex-shrink: 0;
}

.stage-body {
    font-family: "VT323", monospace;
    font-size: 1.18rem;
    line-height: 1.55;
    letter-spacing: 0.02em;
    color: var(--mute);
    margin: 0 0 0.75rem;
}

.stage-why {
    font-family: "VT323", monospace;
    font-size: 1.05rem;
    line-height: 1.6;
    letter-spacing: 0.01em;
    color: rgba(232, 249, 255, 0.42);
    margin: 0;
    padding: 0.75rem 1rem;
    border-left: 1px solid var(--rule);
    background: rgba(78, 219, 252, 0.025);
    border-radius: 0 2px 2px 0;
}

@media (prefers-reduced-motion: reduce) {
    .stage,
    .stage-crt__noise { animation: none !important; }
}
</style>
