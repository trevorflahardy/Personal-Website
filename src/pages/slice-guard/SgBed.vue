<script setup lang="ts">
import type { Bed } from './bed-fleet';
import { statusGlyph, statusLabel } from './slice-guard-utils';

defineProps<{ bed: Bed }>();
</script>

<template>
    <div :class="['bed', 'bed-' + bed.status]">
        <!-- REST STATE: only bed ID + glyph + context label -->
        <div class="bed-rest">
            <div class="bed-rest-top">
                <span class="bed-id">{{ bed.id }}</span>
                <span class="bed-glyph" :class="'glyph-' + bed.status">{{ statusGlyph(bed.status) }}</span>
            </div>
            <span class="bed-status-label" :class="'label-' + bed.status">{{ statusLabel(bed.status) }}</span>
        </div>

        <!-- HOVER POPUP: full details, slides up from bottom of cell -->
        <div class="bed-popup" :class="'popup-' + bed.status">
            <div class="popup-header">
                <span class="popup-bed-id">{{ bed.id }}</span>
                <span class="popup-glyph" :class="'glyph-' + bed.status">{{ statusGlyph(bed.status) }}</span>
            </div>
            <span class="popup-status-tag" :class="'tag-' + bed.status">{{ statusLabel(bed.status) }}</span>
            <div class="popup-details">
                <template v-if="bed.job">
                    <div class="popup-row">
                        <span class="popup-key">JOB</span>
                        <span class="popup-val">{{ bed.job }}</span>
                    </div>
                </template>
                <template v-if="bed.material">
                    <div class="popup-row">
                        <span class="popup-key">MAT</span>
                        <span class="popup-val">{{ bed.material }}</span>
                    </div>
                </template>
                <template v-if="bed.elapsed">
                    <div class="popup-row">
                        <span class="popup-key">TIME</span>
                        <span class="popup-val popup-val-time">{{ bed.elapsed }}</span>
                    </div>
                </template>
                <template v-if="!bed.job">
                    <div class="popup-row popup-row-idle">
                        <span class="popup-idle-msg">bed available · no job assigned</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bed {
    height: 7rem;
    padding: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    position: relative;
    overflow: hidden;
    border-right: 1px solid rgba(56, 189, 248, 0.25);
    border-bottom: 1px solid rgba(56, 189, 248, 0.25);
    cursor: default;
    transition: background-color 0.2s ease;
}

.bed-idle:hover { background: rgba(56, 189, 248, 0.05); }
.bed-printing:hover { background: rgba(56, 189, 248, 0.10); }
.bed-error:hover { background: var(--error-bg); }
.bed-queue:hover { background: rgba(56, 189, 248, 0.07); }

.bed::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px transparent;
    pointer-events: none;
    transition: box-shadow 0.2s ease;
    z-index: 3;
}

.bed:hover::after {
    box-shadow: inset 0 0 0 1px var(--cyan);
}

.bed-error:hover::after {
    box-shadow: inset 0 0 0 1px var(--error);
}

/* REST STATE */
.bed-rest {
    position: absolute;
    inset: 0;
    padding: 0.65rem 0.85rem 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.18s ease;
    z-index: 1;
}

.bed:hover .bed-rest { opacity: 0; }

.bed-rest-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bed-id {
    color: var(--ink-dim);
    letter-spacing: 0.1em;
    font-size: 0.7rem;
}

.bed-glyph {
    font-size: 0.9rem;
    line-height: 1;
}

.glyph-idle { color: rgba(232, 238, 247, 0.28); }
.glyph-printing { color: var(--cyan); animation: blink 3s ease-in-out infinite; }
.glyph-error { color: var(--error); }
.glyph-queue { color: rgba(232, 238, 247, 0.5); }

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.bed-status-label {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    line-height: 1;
}

.label-idle { color: rgba(232, 238, 247, 0.28); }
.label-printing { color: var(--cyan); }
.label-error { color: var(--error); }
.label-queue { color: rgba(232, 238, 247, 0.5); }

/* HOVER POPUP */
.bed-popup {
    position: absolute;
    inset: 0;
    background: rgba(10, 35, 66, 0.96);
    border-top: 2px solid var(--cyan);
    padding: 0.55rem 0.85rem 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.32rem;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 2;
    pointer-events: none;
}

.bed:hover .bed-popup {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

.popup-error { border-top-color: var(--error); }

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.1rem;
}

.popup-bed-id {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--ink-dim);
}

.popup-glyph {
    font-size: 0.8rem;
    line-height: 1;
}

.popup-status-tag {
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.1rem 0.4rem;
    border: 1px solid currentColor;
    align-self: flex-start;
    line-height: 1.6;
}

.tag-idle { color: rgba(232, 238, 247, 0.35); border-color: rgba(232, 238, 247, 0.2); }
.tag-printing { color: var(--cyan); border-color: rgba(56, 189, 248, 0.45); }
.tag-error { color: var(--error); border-color: rgba(248, 113, 113, 0.45); }
.tag-queue { color: rgba(232, 238, 247, 0.55); border-color: rgba(232, 238, 247, 0.28); }

.popup-details {
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
    margin-top: 0.1rem;
    flex: 1;
    justify-content: flex-end;
}

.popup-row {
    display: grid;
    grid-template-columns: 2.6rem 1fr;
    gap: 0.4rem;
    align-items: baseline;
}

.popup-key {
    font-size: 0.56rem;
    letter-spacing: 0.14em;
    color: var(--ink-dim);
    text-transform: uppercase;
}

.popup-val {
    font-size: 0.63rem;
    color: var(--ink);
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
}

.popup-val-time { color: var(--cyan); }

.popup-error .popup-val { color: rgba(248, 113, 113, 0.9); }
.popup-error .popup-val-time { color: var(--error); }

.popup-row-idle {
    grid-template-columns: 1fr;
}

.popup-idle-msg {
    font-size: 0.6rem;
    color: rgba(232, 238, 247, 0.3);
    font-style: italic;
    letter-spacing: 0.05em;
}
</style>
