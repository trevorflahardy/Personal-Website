<script setup lang="ts">
// Six specimen nodes for the hero tree — labels in italic serif, like a
// naturalist's field guide. Positions are % of viewBox (400 × 220).
const nodes = [
    { id: "a", label: "Grandparent",    x: 200, y: 20,  side: "center" },
    { id: "b", label: "Parent",          x: 140, y: 88,  side: "left"   },
    { id: "c", label: "Parent",          x: 260, y: 88,  side: "right"  },
    { id: "d", label: "Sibling",         x: 80,  y: 164, side: "left"   },
    { id: "e", label: "Self",            x: 180, y: 164, side: "center" },
    { id: "f", label: "Cousin",          x: 300, y: 164, side: "right"  },
];

const callouts = [
    {
        idx: "I.",
        title: "Pathfinding between souls",
        body: "Select any two members and Rootline draws the exact line between them — great-uncle, second cousin once removed — in fine green ink.",
    },
    {
        idx: "II.",
        title: "Editing only what is yours",
        body: "Owners, editors, viewers. Branch-scoped permissions enforced at UI, server, and row-level security so no relative rewrites another's corner of the garden.",
    },
    {
        idx: "III.",
        title: "Import from the old books",
        body: "GEDCOM 5.5.1 import and export. Bring your Ancestry or MyHeritage tree in; carry it back out. The garden is portable.",
    },
];

// Plates II-V: supplementary specimens.  Each is drawn from a separate view of
// the live application, presented as a herbarium mount with a plate number and
// a latin-ish caption in the naturalist's voice.
//
// NOTE: dynamic `src` strings bypass Vite's template asset rewriting, so we
// prepend `import.meta.env.BASE_URL` ourselves.  Without it, the path resolves
// at the site root instead of the app's base path.
const BASE = import.meta.env.BASE_URL;
const plates = [
    {
        num: "II.",
        src: `${BASE}rootline/demo1.png`,
        caption: "Canopy view — five generations pressed onto a single pane",
        latin: "vista plena · five generations",
    },
    {
        num: "III.",
        src: `${BASE}rootline/demo2.png`,
        caption: "Node detail — photograph, date stones, living narrative",
        latin: "folium personale · in situ",
    },
    {
        num: "IV.",
        src: `${BASE}rootline/demo3.png`,
        caption: "Two cursors at once — editing in live company",
        latin: "collaboratio viva · realtime.supabase",
    },
    {
        num: "V.",
        src: `${BASE}rootline/demo4.png`,
        caption: "Relationship finder — the green line between any two souls",
        latin: "via consanguinitatis · bfs",
    },
];

// Methods: tech stack presented as an apothecary-plate ingredient list.
const methods = [
    { part: "Fronds",      value: "Vue 3 · TypeScript · Vite · Tailwind CSS v4" },
    { part: "Rootstock",   value: "Supabase (Postgres · Auth · Realtime · RLS)" },
    { part: "Pollination", value: "live cursors · broadcast channels · optimistic writes" },
    { part: "Provenance",  value: "GEDCOM 5.5.1 import + export · reversible" },
    { part: "Warding",     value: "row-level security · branch-scoped roles · invite codes" },
    { part: "Soil test",   value: "unit · integration (vitest) · playwright for cursor e2e" },
];

// Habitat: project-level vitals — where the garden is planted, how it grows.
const habitat = [
    { k: "habitat",        v: "web · modern browsers · mobile responsive" },
    { k: "first cutting",  v: "2025-03-04" },
    { k: "current season", v: "v0.7.2 · 2025-10-18" },
    { k: "status",         v: "private beta · extended family pilot" },
    { k: "cultivators",    v: "1 (solo)" },
    { k: "line count",     v: "≈ 18,400" },
];
</script>

<template>
    <article class="root-plate">

        <!-- Plate header: naturalist book style -->
        <header class="plate-head">
            <span class="plate-series">Plate I · <i>Rootline</i></span>
            <span class="plate-rule" />
            <span class="plate-edition">Edition MMXXV · from life</span>
        </header>

        <!-- Hero specimen illustration -->
        <section class="hero-specimen">
            <h1 class="specimen-title">
                A family tree,<br/>
                <i>cultivated together.</i>
            </h1>
            <p class="specimen-sub">
                Collaborative genealogy — pan, zoom, edit in live company, and trace the green line between any two names.
            </p>

            <div class="tree-wrap">
                <svg viewBox="0 0 400 220" class="tree-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <!-- root/branch lines: hand-feel curves -->
                    <path d="M200 30 Q200 58 140 88" class="branch" />
                    <path d="M200 30 Q200 58 260 88" class="branch" />
                    <path d="M140 88 Q120 128 80 164" class="branch" />
                    <path d="M140 88 Q160 128 180 164" class="branch" />
                    <path d="M260 88 Q280 128 300 164" class="branch" />
                    <!-- roots drifting below -->
                    <path d="M80 172 Q60 200 50 220" class="root" />
                    <path d="M180 172 Q180 200 180 220" class="root" />
                    <path d="M300 172 Q320 200 340 220" class="root" />
                    <!-- nodes -->
                    <g v-for="n in nodes" :key="n.id">
                        <circle :cx="n.x" :cy="n.y" r="5.5" class="node" />
                        <text :x="n.x" :y="n.y - 10" class="node-label"
                              :text-anchor="n.side === 'left' ? 'end' : n.side === 'right' ? 'start' : 'middle'">
                            {{ n.label }}
                        </text>
                    </g>
                </svg>
            </div>
        </section>

        <!-- Specimen description — two columns, drop cap -->
        <section class="specimen-body">
            <div class="col-prose">
                <p class="drop">
                    Rootline began with a simple observation: no one in a family owns the tree alone. The branches belong to everyone who walks them. Yet most genealogy software — Ancestry, MyHeritage, FamilySearch — treats each account as a separate garden, with no easy way to share the cultivation.
                </p>
                <p>
                    So Rootline is the opposite: <em>one tree, many hands</em>. Powered by Supabase Realtime, a live cursor drifts next to every relative who's reading along. Changes ripple out as they happen. It feels less like a database and more like a shared notebook left open on the kitchen table.
                </p>
            </div>
            <aside class="col-quote">
                <span class="q-mark">&ldquo;</span>
                A tree is never finished.<br/>
                It grows because someone tends it.
                <div class="q-attrib">— field note, 2025</div>
            </aside>
        </section>

        <!-- Three callouts, staggered (NOT a grid) -->
        <section class="callouts">
            <h2 class="section-head"><i>Three Features</i>, in brief.</h2>
            <ol class="callout-list">
                <li v-for="(c, i) in callouts" :key="c.idx" :class="'stag-' + i">
                    <svg class="tendril" viewBox="0 0 60 80" aria-hidden="true">
                        <path d="M0 0 Q10 30 30 40 T60 78" />
                    </svg>
                    <div class="callout-body">
                        <span class="callout-idx">{{ c.idx }}</span>
                        <h3>{{ c.title }}</h3>
                        <p>{{ c.body }}</p>
                    </div>
                </li>
            </ol>
        </section>

        <!-- Field Plates: supplementary specimens, each a herbarium mount -->
        <section class="field-plates">
            <h2 class="section-head"><i>Field plates</i> II &ndash; V.</h2>
            <p class="plates-lede">
                Further views of the specimen, collected from the live application
                across the spring and summer seasons. Each plate bears its own
                legend &mdash; what the observer saw, and what it told them.
            </p>
            <div class="plate-grid">
                <figure v-for="p in plates" :key="p.num" class="plate-mount">
                    <span class="plate-num">Plate&nbsp;{{ p.num }}</span>
                    <div class="plate-frame">
                        <img :src="p.src" :alt="p.caption"
                            onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
                        <div class="plate-fallback" style="display:none">
                            <i>specimen pending</i>
                        </div>
                    </div>
                    <figcaption>
                        <div class="plate-caption">{{ p.caption }}</div>
                        <div class="plate-latin"><i>{{ p.latin }}</i></div>
                    </figcaption>
                </figure>
            </div>
        </section>

        <!-- Methods & Materials — tech stack as an apothecary's ingredient list -->
        <section class="methods">
            <h2 class="section-head"><i>Methods &amp; materials.</i></h2>
            <p class="methods-lede">
                How the garden was raised. Each row names a part of the organism
                and the substances used in its growing.
            </p>
            <dl class="methods-list">
                <div v-for="m in methods" :key="m.part" class="methods-row">
                    <dt><i>{{ m.part }}</i></dt>
                    <dd class="methods-dots" />
                    <dd class="methods-val">{{ m.value }}</dd>
                </div>
            </dl>
        </section>

        <!-- Habitat: project vitals in the voice of a garden record -->
        <section class="habitat">
            <h2 class="section-head"><i>Habitat</i> &amp; season.</h2>
            <dl class="habitat-list">
                <div v-for="h in habitat" :key="h.k" class="habitat-row">
                    <dt>{{ h.k }}</dt>
                    <dd>{{ h.v }}</dd>
                </div>
            </dl>
        </section>

        <!-- Primary specimen: the hero screenshot, full-width herbarium mount -->
        <section class="specimen-frame">
            <h2 class="section-head"><i>Plate I</i>, the principal specimen.</h2>
            <div class="frame-inner">
                <img src="/rootline/hero.png" alt="Rootline tree view"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
                <div class="frame-fallback" style="display:none">
                    <i>plate unavailable — specimen in preparation</i>
                </div>
            </div>
            <figcaption>
                <i>collected MMXXV · south florida · screen capture from live instance</i>
            </figcaption>
        </section>

        <!-- Naturalist's signature footer -->
        <footer class="signature">
            <div class="sig-line">catalogued by <i>T. Flahardy</i></div>
            <div class="sig-line">specimen · rootline</div>
            <div class="sig-line">
                <a href="https://github.com/trevorflahardy/rootline" target="_blank" rel="noopener">
                    github.com/trevorflahardy/rootline &rarr;
                </a>
            </div>
        </footer>
    </article>
</template>

<style scoped>
.root-plate {
    --paper: #1a1814;
    --ink: #eae2d2;
    --ink-dim: rgba(234, 226, 210, 0.66);
    --forest: #4ade80;
    --forest-deep: #166534;
    --walnut: #a58a63;
    --moss: #65a30d;

    background: var(--paper);
    background-image:
        radial-gradient(ellipse at 20% 10%, rgba(234,226,210,0.03), transparent 55%),
        url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23g)' opacity='0.35'/></svg>");
    background-size: auto, 240px 240px;
    color: var(--ink);
    font-family: "Georgia", "Source Serif Pro", "Iowan Old Style", serif;
    padding: 3rem 2.5rem 5rem;
    min-height: 100%;
    line-height: 1.55;
}

/* Plate header */
.plate-head {
    display: flex; align-items: center; gap: 1.5rem;
    font-style: italic; font-size: 0.85rem;
    color: var(--ink-dim);
    margin-bottom: 3rem;
}
.plate-series { letter-spacing: 0.04em; }
.plate-rule { flex: 1; height: 1px; background: rgba(234,226,210,0.24); }
.plate-edition { font-variant: small-caps; letter-spacing: 0.12em; font-style: normal; }

/* Hero specimen */
.hero-specimen { max-width: 64rem; margin: 0 auto 4rem; }
.specimen-title {
    font-size: clamp(2.6rem, 5.5vw, 4.6rem);
    font-weight: 400;
    line-height: 1.02;
    letter-spacing: -0.015em;
    color: var(--ink);
    margin: 0 0 1rem;
}
.specimen-title i { color: var(--forest); font-style: italic; font-weight: 400; }
.specimen-sub {
    max-width: 30rem;
    font-size: 1rem;
    color: var(--ink-dim);
    margin: 0 0 2.5rem;
    line-height: 1.6;
    font-style: italic;
}

.tree-wrap { max-width: 50rem; margin: 0 auto; }
.tree-svg { width: 100%; height: auto; display: block; }
.tree-svg .branch, .tree-svg .root {
    fill: none;
    stroke: var(--forest);
    stroke-width: 1;
    stroke-linecap: round;
    opacity: 0.85;
}
.tree-svg .root { stroke: var(--forest-deep); opacity: 0.6; stroke-dasharray: 2 3; }
.tree-svg .node {
    fill: var(--paper);
    stroke: var(--forest);
    stroke-width: 1.5;
}
.tree-svg .node-label {
    font-family: "Georgia", serif;
    font-style: italic;
    font-size: 8px;
    fill: var(--ink);
    letter-spacing: 0.02em;
}

/* Specimen body: two columns + drop cap */
.specimen-body {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    max-width: 60rem;
    margin: 0 auto 4.5rem;
    padding: 0 1rem;
}
.col-prose p {
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(234,226,210,0.88);
    margin: 0 0 1.25rem;
}
.col-prose em { color: var(--forest); font-style: italic; }
.col-prose .drop::first-letter {
    font-size: 3.6rem;
    float: left;
    line-height: 0.9;
    font-weight: 400;
    padding: 0.4rem 0.55rem 0 0;
    color: var(--walnut);
    font-family: "Georgia", serif;
}
.col-quote {
    position: relative;
    font-style: italic;
    font-size: 1.35rem;
    line-height: 1.45;
    color: rgba(234,226,210,0.92);
    padding: 1rem 0 0 2rem;
    border-left: 1px solid rgba(74, 222, 128, 0.35);
    align-self: start;
}
.col-quote .q-mark {
    position: absolute;
    left: 0; top: -0.5rem;
    font-size: 4rem; line-height: 1;
    color: var(--forest); opacity: 0.5;
    font-family: "Georgia", serif;
}
.col-quote .q-attrib {
    margin-top: 1rem;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: var(--ink-dim);
    font-style: normal;
    font-variant: small-caps;
}

/* Callouts */
.callouts { max-width: 62rem; margin: 0 auto 4.5rem; padding: 0 1rem; }
.section-head {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0 0 2rem;
    border-bottom: 1px solid rgba(234,226,210,0.18);
    padding-bottom: 0.75rem;
}
.section-head i { color: var(--forest); }
.callout-list { list-style: none; padding: 0; margin: 0; }
.callout-list li {
    position: relative;
    display: grid;
    grid-template-columns: 4rem 1fr;
    gap: 1rem;
    margin-bottom: 2.5rem;
    max-width: 34rem;
}
.stag-0 { margin-left: 0; }
.stag-1 { margin-left: 30%; }
.stag-2 { margin-left: 15%; }
.tendril {
    width: 4rem; height: 5rem;
    overflow: visible;
}
.tendril path {
    fill: none;
    stroke: var(--forest-deep);
    stroke-width: 1;
    opacity: 0.6;
    stroke-dasharray: 1 3;
}
.callout-idx {
    display: block;
    font-family: "Georgia", serif;
    font-size: 0.85rem;
    font-style: italic;
    letter-spacing: 0.08em;
    color: var(--walnut);
    margin-bottom: 0.3rem;
}
.callout-body h3 {
    font-size: 1.25rem;
    font-weight: 400;
    font-style: italic;
    color: var(--ink);
    margin: 0 0 0.5rem;
}
.callout-body p {
    font-size: 0.95rem;
    line-height: 1.65;
    color: rgba(234,226,210,0.78);
    margin: 0;
}

/* =============================================================
   FIELD PLATES — 4 supplementary screenshots as herbarium mounts
============================================================= */
.field-plates { max-width: 66rem; margin: 0 auto 4.5rem; padding: 0 1rem; }
.plates-lede {
    max-width: 42rem;
    margin: 0 auto 2.5rem;
    text-align: center;
    font-family: "Georgia", "Times New Roman", serif;
    font-style: italic;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--ink-dim);
}
.plate-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    gap: 2.5rem 2rem;
}
.plate-mount {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}
.plate-num {
    font-family: "Georgia", serif;
    font-style: italic;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    color: var(--ink-dim);
    border-bottom: 1px solid rgba(234,226,210,0.18);
    padding-bottom: 0.3rem;
}
.plate-frame {
    position: relative;
    border: 1px solid rgba(165, 138, 99, 0.35);
    padding: 0.55rem;
    background: rgba(26, 24, 20, 0.55);
    box-shadow: inset 0 0 0 1px rgba(234,226,210,0.05);
}
.plate-frame img {
    width: 100%; display: block;
    opacity: 0.9;
}
.plate-fallback {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--ink-dim);
    font-style: italic;
}
.plate-mount figcaption {
    font-family: "Georgia", serif;
    font-size: 0.88rem;
    line-height: 1.45;
    color: rgba(234,226,210,0.72);
}
.plate-caption { display: block; }
.plate-latin {
    font-size: 0.78rem;
    color: var(--forest);
    margin-top: 0.2rem;
    letter-spacing: 0.02em;
}

/* =============================================================
   METHODS & MATERIALS — apothecary-style ingredient list
============================================================= */
.methods { max-width: 52rem; margin: 0 auto 4.5rem; padding: 0 1rem; }
.methods-lede {
    max-width: 38rem;
    margin: 0 auto 2rem;
    text-align: center;
    font-family: "Georgia", serif;
    font-style: italic;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--ink-dim);
}
.methods-list { margin: 0; padding: 0; }
.methods-row {
    display: grid;
    grid-template-columns: 10rem 1fr auto;
    align-items: baseline;
    gap: 1rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid rgba(234,226,210,0.1);
}
.methods-row dt {
    font-family: "Georgia", serif;
    font-size: 1.02rem;
    color: var(--forest);
    letter-spacing: 0.01em;
    margin: 0;
}
.methods-dots {
    border-bottom: 1px dotted rgba(234,226,210,0.22);
    transform: translateY(-0.35em);
    margin: 0;
}
.methods-val {
    margin: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.8rem;
    color: rgba(234,226,210,0.85);
    text-align: right;
    letter-spacing: 0.02em;
}

/* =============================================================
   HABITAT — project vitals as a garden record
============================================================= */
.habitat { max-width: 44rem; margin: 0 auto 4.5rem; padding: 0 1rem; }
.habitat-list {
    margin: 0; padding: 0;
    border-top: 1px solid rgba(234,226,210,0.14);
    border-bottom: 1px solid rgba(234,226,210,0.14);
}
.habitat-row {
    display: grid;
    grid-template-columns: 14rem 1fr;
    gap: 1rem;
    padding: 0.55rem 0;
    border-bottom: 1px dashed rgba(234,226,210,0.08);
}
.habitat-row:last-child { border-bottom: none; }
.habitat-row dt {
    font-family: "Georgia", serif;
    font-style: italic;
    color: var(--ink-dim);
    font-size: 0.92rem;
    margin: 0;
}
.habitat-row dd {
    margin: 0;
    font-family: "Georgia", serif;
    color: rgba(234,226,210,0.88);
    font-size: 0.98rem;
    letter-spacing: 0.01em;
}

/* Specimen frame (herbarium-style screenshot) */
.specimen-frame { max-width: 62rem; margin: 0 auto 4rem; padding: 0 1rem; }
.frame-inner {
    border: 1px solid rgba(165, 138, 99, 0.4);
    padding: 0.8rem;
    background: rgba(26, 24, 20, 0.6);
    box-shadow: inset 0 0 0 1px rgba(234,226,210,0.06);
}
.frame-inner img { width: 100%; display: block; opacity: 0.85; }
.frame-fallback {
    padding: 3rem 2rem;
    text-align: center;
    color: var(--ink-dim);
    font-style: italic;
    background: rgba(74, 222, 128, 0.04);
    border: 1px dashed rgba(74, 222, 128, 0.18);
}
.specimen-frame figcaption {
    margin-top: 0.8rem;
    text-align: center;
    color: var(--ink-dim);
    font-size: 0.85rem;
    font-style: italic;
}

/* Signature */
.signature {
    max-width: 62rem;
    margin: 0 auto;
    text-align: right;
    border-top: 1px solid rgba(234,226,210,0.18);
    padding: 1.5rem 1rem 0;
}
.sig-line {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    color: var(--ink-dim);
    letter-spacing: 0.1em;
}
.sig-line i { font-family: "Georgia", serif; font-size: 0.9rem; color: var(--ink); }
.sig-line a { color: var(--forest); text-decoration: none; border-bottom: 1px solid rgba(74,222,128,0.35); }
.sig-line a:hover { color: var(--ink); border-color: var(--ink); }

/* Light mode — warm parchment, walnut ink, forest accents */
html:not(.dark) .root-plate {
    --paper: #f3ead7;
    --ink: #2a2218;
    --ink-dim: rgba(42, 34, 24, 0.62);
    --forest: #15803d;
    --forest-deep: #14532d;
    --walnut: #6b4f2f;
    background-image:
        radial-gradient(ellipse at 20% 10%, rgba(107, 79, 47, 0.06), transparent 55%),
        url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23g)' opacity='0.18'/></svg>");
}
html:not(.dark) .root-plate .col-prose p { color: rgba(42, 34, 24, 0.88); }
html:not(.dark) .root-plate .callout-body p { color: rgba(42, 34, 24, 0.78); }
html:not(.dark) .root-plate .frame-inner { background: rgba(255,255,255,0.5); }

@media (max-width: 900px) {
    .specimen-body { grid-template-columns: 1fr; }
    .callout-list li { grid-template-columns: 1fr; margin-left: 0 !important; }
    .tendril { display: none; }
}
</style>

<style>
/* Light-mode overrides (unscoped so html:not(.dark) selector works) */
html:not(.dark) .root-plate {
    --paper: #f3ead7 !important;
    --ink: #2a2218 !important;
    --ink-dim: rgba(42, 34, 24, 0.62) !important;
    --forest: #15803d !important;
    --forest-deep: #14532d !important;
    --walnut: #6b4f2f !important;
}
html:not(.dark) .root-plate .col-prose p { color: rgba(42, 34, 24, 0.88) !important; }
html:not(.dark) .root-plate .callout-body p { color: rgba(42, 34, 24, 0.78) !important; }
html:not(.dark) .root-plate .frame-inner { background: rgba(255,255,255,0.5) !important; }
html:not(.dark) .root-plate .plate-frame { background: rgba(255,255,255,0.55) !important; }
html:not(.dark) .root-plate .plate-mount figcaption { color: rgba(42, 34, 24, 0.82) !important; }
html:not(.dark) .root-plate .methods-val { color: rgba(42, 34, 24, 0.82) !important; }
html:not(.dark) .root-plate .habitat-row dd { color: rgba(42, 34, 24, 0.85) !important; }
html:not(.dark) .root-plate .plates-lede,
html:not(.dark) .root-plate .methods-lede { color: rgba(42, 34, 24, 0.68) !important; }
</style>
