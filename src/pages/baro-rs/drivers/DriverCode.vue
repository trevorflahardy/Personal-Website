<script setup lang="ts">
import type { Driver } from './driver-data';
import { highlightRust } from './rust-highlight';

defineProps<{ driver: Driver }>();
</script>

<template>
    <section class="act act-code">
        <div class="act-label">// usage · main.rs</div>
        <div class="editor">
            <div class="editor-top">
                <span class="editor-dot" />
                <span class="editor-dot" />
                <span class="editor-dot" />
                <span class="editor-file">main.rs</span>
                <span class="editor-lang">rust</span>
            </div>
            <pre class="editor-body"><code v-html="highlightRust(driver.codeExample)" /></pre>
        </div>
    </section>
</template>

<style scoped>
.act-code { padding: 4rem 2.5rem; }

@media (max-width: 700px) {
    .act-code { padding: 2.5rem 1.25rem; }
}

.editor {
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: var(--graphite-2);
    overflow: hidden;
}

.editor-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.9rem;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.7rem;
}

.editor-dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);
}

.editor-file {
    color: rgba(248, 250, 252, 0.5);
    margin-left: 0.6rem;
    letter-spacing: 0.06em;
}

.editor-lang {
    margin-left: auto;
    padding: 0.1rem 0.5rem;
    border: 1px solid color-mix(in srgb, var(--dc) 35%, transparent);
    color: var(--dc);
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.editor-body {
    padding: 1rem 1.25rem;
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.65;
    color: rgba(248, 250, 252, 0.85);
    overflow-x: auto;
    white-space: pre;
}

:deep(.c-comment) { color: rgba(248, 250, 252, 0.35); font-style: italic; }
:deep(.c-string) { color: #86efac; }
:deep(.c-macro) { color: #7dd3fc; }
:deep(.c-kw) { color: #c084fc; }
:deep(.c-type) { color: var(--amber); }
:deep(.c-num) { color: #fb923c; }
:deep(.c-punct) { color: rgba(248, 250, 252, 0.4); }
</style>
