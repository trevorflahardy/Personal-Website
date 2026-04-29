<script setup lang="ts">
import { computed, onMounted, nextTick, ref, watch } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
    'update:modelValue': [value: string];
    'cursor-change': [position: { line: number; col: number }];
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const lineNumsRef = ref<HTMLPreElement | null>(null);

const lineNumsContent = computed(() =>
    props.modelValue.split('\n').map((_, i) => String(i + 1).padStart(2, ' ')).join('\n'),
);

function updateCursor() {
    const el = textareaRef.value;
    if (!el) return;
    const text = el.value.substring(0, el.selectionStart);
    const lines = text.split('\n');
    emit('cursor-change', {
        line: lines.length,
        col: lines[lines.length - 1].length + 1,
    });
}

function syncLineNums() {
    if (lineNumsRef.value && textareaRef.value) {
        lineNumsRef.value.scrollTop = textareaRef.value.scrollTop;
    }
}

function onInput(e: Event) {
    emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
}

onMounted(async () => {
    await nextTick();
    updateCursor();
});

watch(() => props.modelValue, () => {
    // Rebroadcast cursor in case content changed programmatically.
    nextTick(updateCursor);
});
</script>

<template>
    <section class="docuflow-pane docuflow-pane--source" aria-label="Source">
        <header class="pane-head">
            <span class="pane-head__label">source</span>
            <span class="pane-head__path">docs / index.mdx</span>
        </header>
        <div class="source-edit-wrap">
            <pre class="line-nums" ref="lineNumsRef" aria-hidden="true">{{ lineNumsContent }}</pre>
            <textarea ref="textareaRef" :value="modelValue" class="source-textarea"
                @input="onInput"
                @scroll="syncLineNums" @keyup="updateCursor" @mouseup="updateCursor" @click="updateCursor"
                spellcheck="false" autocomplete="off" autocorrect="off" />
        </div>
    </section>
</template>

<style scoped>
.docuflow-pane {
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
}

.docuflow-pane--source {
    background: var(--paper);
    border-right: 1px solid var(--rule);
}

.pane-head {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 0.65rem 1rem;
    border-bottom: 1px solid var(--rule);
    background: rgba(236, 230, 216, 0.5);
    flex-shrink: 0;
}

.pane-head__label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
}

.pane-head__path {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    color: var(--mute);
}

.source-edit-wrap {
    position: relative;
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.line-nums {
    flex-shrink: 0;
    width: 3rem;
    padding: 1.25rem 0.5rem 6rem 0.25rem;
    margin: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82rem;
    line-height: 1.72;
    color: rgba(26, 29, 36, 0.28);
    text-align: right;
    user-select: none;
    overflow: hidden;
    white-space: pre;
    background: var(--paper);
    border-right: 1px solid rgba(26, 29, 36, 0.07);
}

.source-textarea {
    flex: 1;
    min-width: 0;
    padding: 1.25rem 1.25rem 6rem 0.75rem;
    margin: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82rem;
    line-height: 1.72;
    color: var(--ink-2);
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    overflow-y: auto;
    tab-size: 2;
    caret-color: var(--accent);
}

.source-textarea::selection {
    background: rgba(47, 107, 255, 0.18);
}
</style>
