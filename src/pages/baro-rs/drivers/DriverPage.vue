<script setup lang="ts">
import { computed } from "vue";
import { drivers } from "./driver-data";
import { useLenis } from "@/composables/useLenis";

const props = defineProps<{ driverId: string }>();

const driver = computed(() => drivers[props.driverId]);
const otherDrivers = computed(() =>
    Object.values(drivers).filter((d) => d.id !== props.driverId),
);

// Per-driver theme — keeps the graphite canvas but swaps the accent hue in
// every place that references `var(--dc)`.
const themeStyle = computed(() => ({
    "--dc": driver.value?.color ?? "#f59e0b",
}));

useLenis();

// Rust syntax highlighting.  Token-first scan avoids nested-replacement bugs;
// comments and strings win over keywords/types, numbers are claimed last.
function highlightRust(code: string): string {
    const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const tokens: { start: number; end: number; html: string }[] = [];
    function scan(regex: RegExp, cls: string) {
        for (const m of escaped.matchAll(regex)) {
            const start = m.index!;
            const end = start + m[0].length;
            if (tokens.some((t) => start < t.end && end > t.start)) continue;
            tokens.push({ start, end, html: `<span class="${cls}">${m[0]}</span>` });
        }
    }
    scan(/(\/\/.*$)/gm, "c-comment");
    scan(/("(?:[^"\\]|\\.)*")/g, "c-string");
    scan(/\b(println|format|vec)!/g, "c-macro");
    scan(/\b(use|let|mut|if|fn|pub|struct|impl|return|async|await|move|self|true|false)\b/g, "c-kw");
    scan(/\b([A-Z][A-Za-z0-9_]*)\b/g, "c-type");
    scan(/\b(\d+)\b/g, "c-num");
    scan(/(::|\?|&amp;)/g, "c-punct");
    tokens.sort((a, b) => a.start - b.start);
    let result = "";
    let cursor = 0;
    for (const t of tokens) {
        result += escaped.slice(cursor, t.start) + t.html;
        cursor = t.end;
    }
    result += escaped.slice(cursor);
    return result;
}
</script>

<template>
    <div v-if="driver" class="drv" :style="themeStyle">

        <!-- ACT · HEADER.  Breadcrumb, protocol chip, massive driver name. -->
        <section class="act act-hero">
            <router-link :to="{ name: 'project-baro-rs' }" class="crumb">
                <span class="crumb-chev">&larr;</span>
                <span class="crumb-root">// baro.rs</span>
                <span class="crumb-slash">/</span>
                <span class="crumb-leaf">{{ driver.id }}</span>
            </router-link>

            <div class="proto-chip">
                <span class="chip-dot" />
                <span>{{ driver.protocol }} · no_std · embedded-hal 1.0</span>
            </div>

            <h1 class="drv-title">{{ driver.name.toLowerCase() }}</h1>
            <p class="drv-subtitle">{{ driver.fullName }}</p>

            <p class="drv-lede">{{ driver.description }}</p>

            <div class="hero-meta">
                <span>&bull; open source</span>
                <span class="sep">/</span>
                <span>MIT</span>
                <span class="sep">/</span>
                <span>embedded-hal 1.0</span>
                <span class="sep">/</span>
                <span>crates.io ready</span>
            </div>
        </section>

        <!-- ACT · SPEC READOUT.  Dotted-leader key/value rows, datasheet feel. -->
        <section class="act act-spec">
            <div class="act-label">// datasheet · readout</div>
            <div class="spec-list">
                <div v-if="driver.i2cAddress" class="spec-row">
                    <span class="spec-key">i2c address</span>
                    <span class="spec-dots" />
                    <span class="spec-val">{{ driver.i2cAddress }}</span>
                </div>
                <div class="spec-row">
                    <span class="spec-key">protocol</span>
                    <span class="spec-dots" />
                    <span class="spec-val">{{ driver.protocol }}</span>
                </div>
                <div v-for="m in driver.measurements" :key="m.name" class="spec-row">
                    <span class="spec-key">{{ m.name.toLowerCase() }}</span>
                    <span class="spec-dots" />
                    <span class="spec-val">{{ m.range || m.unit }}</span>
                </div>
            </div>
        </section>

        <!-- ACT · FEATURES.  Numbered list, minimal punctuation. -->
        <section class="act act-feat">
            <div class="act-label">// capabilities</div>
            <ol class="feat-list">
                <li v-for="(f, i) in driver.features" :key="f">
                    <span class="feat-idx">{{ String(i + 1).padStart(2, "0") }}</span>
                    <span class="feat-txt">{{ f }}</span>
                </li>
            </ol>
        </section>

        <!-- ACT · CODE.  Rust excerpt in a framed editor pane. -->
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

        <!-- ACT · INTEGRATION.  How this driver fits into Baro-RS. -->
        <section class="act act-integration">
            <div class="act-label">// integration · baro.rs</div>
            <p class="integration-prose">{{ driver.usedInBaroRs }}</p>
            <a :href="driver.repo" target="_blank" rel="noopener" class="source-link">
                view source on github &rarr;
            </a>
        </section>

        <!-- ACT · OTHER DRIVERS.  Row of siblings in the fleet. -->
        <section class="act act-other">
            <div class="act-label">// fleet · other drivers</div>
            <ul class="other-list">
                <router-link v-for="d in otherDrivers" :key="d.id"
                    :to="{ name: 'baro-rs-driver', params: { driverId: d.id } }"
                    class="other-row" :style="{ '--odc': d.color }">
                    <span class="other-idx">&rarr;</span>
                    <span class="other-swatch" />
                    <span class="other-name">{{ d.id }}</span>
                    <span class="other-full">{{ d.fullName }}</span>
                </router-link>
            </ul>
        </section>
    </div>
</template>

<style scoped>
/* ==================================================================
   DRIVER PAGE · instrument aesthetic, amber on graphite
   Per-driver accent colour lives in `--dc` (set via themeStyle above).
================================================================== */
.drv {
    --graphite:    #0b0e10;
    --graphite-2:  #12161b;
    --amber:       #f59e0b;
    --bone:        #f8fafc;
    --grid-line:   rgba(245, 158, 11, 0.04);

    min-height: 100vh;
    background: var(--graphite);
    color: var(--bone);
    font-family: "SF Mono", "JetBrains Mono", ui-monospace, monospace;
    background-image:
        linear-gradient(var(--grid-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    background-size: 48px 48px;
    padding-top: 4rem;
    padding-bottom: 6rem;
}

.act {
    position: relative;
    max-width: 72rem;
    margin: 0 auto;
    padding: 4rem 2.5rem;
}
.act-label {
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--dc);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* HERO */
.act-hero {
    padding-top: 5rem;
    padding-bottom: 5rem;
}
.crumb {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    color: rgba(248, 250, 252, 0.55);
    text-decoration: none;
    margin-bottom: 2rem;
    transition: color 200ms ease;
}
.crumb:hover { color: var(--bone); }
.crumb:hover .crumb-chev { transform: translateX(-2px); }
.crumb-chev { transition: transform 200ms ease; }
.crumb-root { color: var(--dc); }
.crumb-slash { color: rgba(248, 250, 252, 0.25); }
.crumb-leaf { color: var(--bone); font-weight: 600; }

.proto-chip {
    display: inline-flex;
    gap: 0.55rem;
    align-items: center;
    padding: 0.4rem 0.85rem;
    border: 1px solid color-mix(in srgb, var(--dc) 45%, transparent);
    background: color-mix(in srgb, var(--dc) 10%, transparent);
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--dc);
    margin-bottom: 2.5rem;
}
.chip-dot {
    width: 0.35rem; height: 0.35rem; border-radius: 50%;
    background: var(--dc);
    box-shadow: 0 0 8px var(--dc);
    animation: chip-pulse 2s ease-in-out infinite;
}
@keyframes chip-pulse { 50% { opacity: 0.45; } }

.drv-title {
    font-family: "Geist", "Inter", system-ui, sans-serif;
    font-weight: 800;
    font-size: clamp(3rem, 10vw, 7rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin: 0 0 0.5rem 0;
    color: var(--bone);
}
.drv-subtitle {
    font-size: 0.88rem;
    letter-spacing: 0.05em;
    color: color-mix(in srgb, var(--dc) 75%, rgba(248, 250, 252, 0.6));
    margin: 0 0 1.5rem 0;
}
.drv-lede {
    max-width: 48rem;
    font-size: 1rem;
    line-height: 1.65;
    color: rgba(248, 250, 252, 0.72);
    margin: 0 0 2rem 0;
}
.hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(248, 250, 252, 0.4);
}
.hero-meta .sep { color: rgba(248, 250, 252, 0.18); }

/* SPEC */
.spec-list { display: flex; flex-direction: column; }
.spec-row {
    display: grid;
    grid-template-columns: 14rem 1fr auto;
    align-items: baseline;
    gap: 1rem;
    padding: 0.6rem 0;
    font-size: 0.9rem;
}
.spec-key {
    color: rgba(248, 250, 252, 0.55);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.72rem;
}
.spec-dots {
    border-bottom: 1px dotted rgba(248, 250, 252, 0.18);
    transform: translateY(-0.35em);
}
.spec-val {
    color: var(--dc);
    font-weight: 600;
    text-align: right;
}

/* FEATURES */
.feat-list { list-style: none; padding: 0; margin: 0; }
.feat-list li {
    display: grid;
    grid-template-columns: 3.5rem 1fr;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.95rem;
    line-height: 1.5;
}
.feat-idx { color: var(--dc); font-size: 0.75rem; letter-spacing: 0.15em; padding-top: 0.15rem; }
.feat-txt { color: rgba(248, 250, 252, 0.82); }

/* CODE */
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
    width: 0.55rem; height: 0.55rem; border-radius: 50%;
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
:deep(.c-string)  { color: #86efac; }
:deep(.c-macro)   { color: #7dd3fc; }
:deep(.c-kw)      { color: #c084fc; }
:deep(.c-type)    { color: var(--amber); }
:deep(.c-num)     { color: #fb923c; }
:deep(.c-punct)   { color: rgba(248, 250, 252, 0.4); }

/* INTEGRATION */
.integration-prose {
    font-family: "Geist", "Inter", system-ui, sans-serif;
    font-size: 1.05rem;
    line-height: 1.7;
    color: rgba(248, 250, 252, 0.82);
    max-width: 52rem;
    margin: 0 0 2rem 0;
}
.source-link {
    display: inline-block;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--dc);
    text-decoration: none;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid color-mix(in srgb, var(--dc) 40%, transparent);
    transition: border-color 200ms ease;
}
.source-link:hover { border-bottom-color: var(--dc); }

/* OTHER DRIVERS */
.other-list {
    list-style: none; padding: 0; margin: 0;
    display: grid;
    gap: 0;
}
.other-row {
    display: grid;
    grid-template-columns: 1.5rem 0.75rem 6rem 1fr;
    gap: 1rem;
    align-items: baseline;
    padding: 0.9rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    text-decoration: none;
    color: var(--bone);
    font-size: 0.9rem;
    transition: background 200ms ease, padding-left 200ms ease;
}
.other-row:hover {
    background: rgba(255, 255, 255, 0.02);
    padding-left: 0.5rem;
}
.other-idx { color: rgba(248, 250, 252, 0.35); }
.other-row:hover .other-idx { color: var(--odc); transform: translateX(3px); }
.other-swatch {
    width: 0.55rem; height: 0.55rem; border-radius: 50%;
    background: var(--odc);
    box-shadow: 0 0 10px color-mix(in srgb, var(--odc) 55%, transparent);
    transform: translateY(0.25rem);
}
.other-name {
    color: var(--bone);
    font-weight: 600;
    letter-spacing: 0.02em;
}
.other-full {
    color: rgba(248, 250, 252, 0.5);
    font-size: 0.78rem;
}

@media (max-width: 700px) {
    .spec-row { grid-template-columns: 1fr auto; }
    .spec-dots { display: none; }
    .other-row { grid-template-columns: 1rem 0.55rem 1fr; }
    .other-full { display: none; }
    .act { padding: 2.5rem 1.25rem; }
}
</style>
