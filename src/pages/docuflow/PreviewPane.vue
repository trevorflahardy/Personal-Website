<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps<{ markdown: string }>();
const renderedHtml = computed(() => marked.parse(props.markdown) as string);
</script>

<template>
    <section class="docuflow-pane docuflow-pane--preview" aria-label="Preview">
        <header class="pane-head">
            <span class="pane-head__label">preview</span>
            <span class="pane-head__path">rendered</span>
        </header>
        <div class="preview-scroll">
            <div v-html="renderedHtml" class="preview-doc" />
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

.docuflow-pane--preview {
    background: var(--paper);
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

.preview-scroll {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
}

.preview-scroll::-webkit-scrollbar {
    width: 10px;
}

.preview-scroll::-webkit-scrollbar-thumb {
    background: rgba(26, 29, 36, 0.18);
    border-radius: 9999px;
}

.preview-doc {
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 2.5rem 6rem;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--ink-2);
}

.preview-doc :deep(h1) {
    font-family: "Fraunces", "Times New Roman", serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--ink);
    margin: 0 0 0.9rem;
}

.preview-doc :deep(h2) {
    font-family: "Fraunces", "Times New Roman", serif;
    font-size: 1.45rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 2rem 0 0.75rem;
}

.preview-doc :deep(h3) {
    font-family: "Fraunces", serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ink);
    margin: 1.5rem 0 0.5rem;
}

.preview-doc :deep(p) {
    margin: 0 0 1rem;
}

.preview-doc :deep(blockquote) {
    border-left: 3px solid var(--accent);
    margin: 1.25rem 0;
    padding: 0.6rem 1rem;
    background: rgba(47, 107, 255, 0.05);
    border-radius: 0 0.4rem 0.4rem 0;
    font-style: italic;
    color: var(--mute);
}

.preview-doc :deep(ul),
.preview-doc :deep(ol) {
    margin: 0 0 1rem;
    padding-left: 1.5rem;
}

.preview-doc :deep(li) {
    margin-bottom: 0.3rem;
}

.preview-doc :deep(code) {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82em;
    background: rgba(26, 29, 36, 0.07);
    padding: 0.15em 0.4em;
    border-radius: 0.3rem;
    color: var(--syntax-heading);
}

.preview-doc :deep(pre) {
    background: var(--ink);
    color: #d7dce6;
    border-radius: 0.6rem;
    padding: 0.95rem 1.1rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82rem;
    line-height: 1.7;
    margin: 0 0 1.25rem;
    overflow-x: auto;
}

.preview-doc :deep(pre code) {
    background: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
}

.preview-doc :deep(a) {
    color: var(--accent);
    text-decoration: none;
}

.preview-doc :deep(a:hover) {
    text-decoration: underline;
}

.preview-doc :deep(hr) {
    border: none;
    border-top: 1px solid var(--rule);
    margin: 1.75rem 0;
}

.preview-doc :deep(strong) {
    color: var(--ink);
}

.preview-doc :deep(em) {
    color: var(--accent-ink);
}
</style>
