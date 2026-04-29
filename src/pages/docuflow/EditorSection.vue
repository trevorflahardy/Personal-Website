<script setup lang="ts">
import { ref } from 'vue';
import EditorChrome from './EditorChrome.vue';
import SourcePane from './SourcePane.vue';
import PreviewPane from './PreviewPane.vue';
import { initialMarkdown } from './docuflow-data';

const markdownSource = ref(initialMarkdown);
const cursorLine = ref(1);
const cursorCol = ref(1);

function onCursorChange(position: { line: number; col: number }) {
    cursorLine.value = position.line;
    cursorCol.value = position.col;
}

const splitPct = ref(44.4);
const splitRef = ref<HTMLElement | null>(null);
let isDragging = false;

function startResize(e: MouseEvent) {
    e.preventDefault();
    isDragging = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMove = (me: MouseEvent) => {
        if (!isDragging || !splitRef.value) return;
        const rect = splitRef.value.getBoundingClientRect();
        const pct = ((me.clientX - rect.left) / rect.width) * 100;
        splitPct.value = Math.min(Math.max(pct, 22), 78);
    };

    const onUp = () => {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
}
</script>

<template>
    <div class="docuflow-editor-section">
        <EditorChrome />

        <div class="docuflow-split" ref="splitRef" :style="`--left-pct: ${splitPct}%`">
            <SourcePane v-model="markdownSource" @cursor-change="onCursorChange" />

            <div class="docuflow-divider" aria-hidden="true" @mousedown="startResize">
                <span class="divider-grab" />
            </div>

            <PreviewPane :markdown="markdownSource" />
        </div>

        <footer class="docuflow-statusbar">
            <div class="sb-cluster">
                <span class="sb-item sb-item--ok">● compiled</span>
                <span class="sb-item">Ln {{ cursorLine }}, Col {{ cursorCol }}</span>
                <span class="sb-item">Spaces: 2</span>
            </div>
            <div class="sb-cluster">
                <span class="sb-item">MDX</span>
                <span class="sb-item">v0.4.2</span>
                <span class="sb-item sb-item--accent">docuflow</span>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.docuflow-editor-section {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.docuflow-split {
    display: grid;
    grid-template-columns: var(--left-pct, 44.4%) auto 1fr;
    min-height: 0;
}

@media (max-width: 960px) {
    .docuflow-split {
        grid-template-columns: 1fr;
        grid-template-rows: 400px auto 400px;
    }

    .docuflow-divider { display: none; }
}

.docuflow-divider {
    width: 10px;
    background: transparent;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    transition: background 150ms ease;
}

.docuflow-divider::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    background: var(--rule);
}

.docuflow-divider:hover::before {
    background: rgba(47, 107, 255, 0.5);
}

.divider-grab {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 36px;
    border-radius: 9999px;
    background: rgba(26, 29, 36, 0.22);
    transition: background 150ms ease, height 150ms ease;
}

.docuflow-divider:hover .divider-grab {
    background: rgba(47, 107, 255, 0.55);
    height: 56px;
}

.docuflow-statusbar {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 1.25rem;
    background: var(--ink);
    color: #c9cfda;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
}

.sb-cluster {
    display: inline-flex;
    gap: 1rem;
}

.sb-item {
    letter-spacing: 0.04em;
}

.sb-item--ok { color: #80c97a; }
.sb-item--accent { color: #7aa6ff; }
</style>
