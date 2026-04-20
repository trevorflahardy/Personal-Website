<script setup lang="ts">
import { computed } from "vue";
import { beds, specs, revisions } from "./bed-fleet";

// Status glyph — minimal datasheet icons.
const statusGlyph = (s: string) =>
    ({ idle: "—", printing: "◉", error: "✕", queue: "▢" } as const)[s as keyof typeof beds[0]["status"]] ?? "—";

// The fleet is deliberately variable-sized.  Slice Guard is built for N-bed
// labs — whatever the makerspace has, the UI auto-fits.  The dimension line
// reports the *current* deployment count, not a hardcoded 12.
const bedCount = computed(() => beds.length);
const statusCounts = computed(() => {
    const c = { idle: 0, printing: 0, error: 0, queue: 0 } as Record<string, number>;
    for (const b of beds) c[b.status] = (c[b.status] ?? 0) + 1;
    return c;
});
</script>

<template>
    <article class="sg-plate">
        <!-- Top ruled line + project marker -->
        <header class="sg-top">
            <span class="sg-topline" />
            <span class="sg-topmark">SLICE-GUARD · PRINT FLEET MANAGEMENT · PLATE I</span>
            <span class="sg-topline" />
        </header>

        <!-- Zone A: Title block (corner, like a real blueprint) -->
        <section class="sg-titleblock">
            <div class="tb-row"><span>project</span><b>slice-guard</b></div>
            <div class="tb-row"><span>revision</span><b>C / 2025-09-02</b></div>
            <div class="tb-row"><span>drawn by</span><b>t. flahardy</b></div>
            <div class="tb-row"><span>scale</span><b>1 : 64</b></div>
            <div class="tb-row"><span>sheet</span><b>01 / 03</b></div>
        </section>

        <!-- Zone B: Hero statement -->
        <section class="sg-hero">
            <h1 class="sg-h1">
                A MANAGEMENT<br>
                SYSTEM FOR<br>
                <span class="sg-accent">N-BED PRINT LABS</span>.
            </h1>
            <p class="sg-lede">
                Slice Guard runs the 3D print fleet at a university makerspace &mdash; scales from a
                handful of beds to forty-plus without touching the UI.  Students submit files; staff
                approve, queue, and track. Parses <code>.3mf</code> and <code>gcode</code> on upload,
                reads filament usage before anyone loads a spool.
            </p>
            <p class="sg-sub-lede">
                <b>SHOWN:</b> sample deployment, {{ bedCount }} beds.
                <span class="sg-sub-sep">&middot;</span>
                grid auto-fits any count.
            </p>
        </section>

        <!-- Zone C: Plan view — 4×3 bed grid, wireframe, labeled -->
        <section class="sg-planview">
            <div class="sg-section-head">
                <span class="sg-label">PLAN · 01</span>
                <span class="sg-sublabel">floor layout · {{ bedCount }} beds · live status</span>
            </div>
            <div class="sg-beds">
                <div v-for="bed in beds" :key="bed.id" :class="['bed', 'bed-' + bed.status]">
                    <div class="bed-top">
                        <span class="bed-id">{{ bed.id }}</span>
                        <span class="bed-glyph" :class="'glyph-' + bed.status">{{ statusGlyph(bed.status) }}</span>
                    </div>
                    <div class="bed-body">
                        <div v-if="bed.job" class="bed-job">{{ bed.job }}</div>
                        <div v-if="bed.material" class="bed-material">{{ bed.material }}</div>
                        <div v-if="bed.elapsed" class="bed-elapsed">{{ bed.elapsed }}</div>
                        <div v-if="!bed.job" class="bed-idle">— bed available —</div>
                    </div>
                </div>
            </div>
            <!-- Dimension line under the fleet -->
            <div class="sg-dim">
                <svg viewBox="0 0 1000 24" preserveAspectRatio="none" class="sg-dim-svg">
                    <line x1="2" y1="12" x2="998" y2="12" stroke="currentColor" stroke-width="0.8" />
                    <polyline points="8,6 2,12 8,18" fill="none" stroke="currentColor" stroke-width="0.8" />
                    <polyline points="992,6 998,12 992,18" fill="none" stroke="currentColor" stroke-width="0.8" />
                </svg>
                <span class="sg-dim-label">
                    {{ bedCount }} UNITS · AUTO-FIT GRID ·
                    <span class="sg-dim-num">{{ statusCounts.printing }}</span> PRINTING ·
                    <span class="sg-dim-num">{{ statusCounts.queue }}</span> QUEUED ·
                    <span class="sg-dim-num">{{ statusCounts.idle }}</span> IDLE ·
                    <span class="sg-dim-num">{{ statusCounts.error }}</span> ERROR
                </span>
            </div>
        </section>

        <!-- Zone D: Callouts referencing the plan -->
        <section class="sg-callouts">
            <div class="sg-section-head">
                <span class="sg-label">CALLOUTS · 02</span>
                <span class="sg-sublabel">annotated detail</span>
            </div>
            <ol class="callout-list">
                <li>
                    <span class="num">①</span>
                    <div>
                        <b>FILE INGEST</b>
                        A custom TypeScript parser reads <code>.3mf</code> and <code>gcode</code> on upload.
                        Pulls filament weight, layer count, estimated print time — flags submissions
                        that exceed cost caps before staff ever sees them.
                    </div>
                </li>
                <li>
                    <span class="num">②</span>
                    <div>
                        <b>STUDENT PORTAL</b>
                        Single-page request form with real-time status. No spreadsheets. No email threads.
                        Student sees exactly where their job sits in the queue.
                    </div>
                </li>
                <li>
                    <span class="num">③</span>
                    <div>
                        <b>STAFF DASHBOARD</b>
                        Role-based queue with one-click approve / deny, filament-consumption analytics,
                        per-student history, and WebSocket-pushed updates so the lab stays in sync.
                    </div>
                </li>
            </ol>
        </section>

        <!-- Zone E: Spec table -->
        <section class="sg-specs">
            <div class="sg-section-head">
                <span class="sg-label">SPEC · 03</span>
                <span class="sg-sublabel">implementation detail</span>
            </div>
            <table class="spec-table">
                <tbody>
                    <tr v-for="(s, i) in specs" :key="s.k" :class="{ alt: i % 2 === 1 }">
                        <th>{{ s.k }}</th>
                        <td>{{ s.v }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- Zone F: Revisions footer -->
        <section class="sg-revs">
            <div class="sg-section-head">
                <span class="sg-label">REVISIONS · 04</span>
                <span class="sg-sublabel">change log</span>
            </div>
            <table class="rev-table">
                <thead>
                    <tr>
                        <th>rev</th><th>date</th><th>note</th><th>by</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in revisions" :key="r.date">
                        <td>{{ r.rev }}</td>
                        <td>{{ r.date }}</td>
                        <td>{{ r.note }}</td>
                        <td>{{ r.by }}</td>
                    </tr>
                </tbody>
            </table>
            <a href="https://github.com/trevorflahardy/slice-guard" target="_blank" rel="noopener" class="sg-source">
                SOURCE · github.com/trevorflahardy/slice-guard &rarr;
            </a>
        </section>
    </article>
</template>

<style scoped>
.sg-plate {
    --paper: #0a3d6e;
    --paper-2: #0d4a84;
    --ink: #e8eef7;
    --ink-dim: rgba(232, 238, 247, 0.55);
    --cyan: #38bdf8;
    --cyan-dim: #075985;

    background: var(--paper);
    background-image:
        repeating-linear-gradient(0deg, rgba(56,189,248,0.045) 0 1px, transparent 1px 32px),
        repeating-linear-gradient(90deg, rgba(56,189,248,0.045) 0 1px, transparent 1px 32px),
        radial-gradient(ellipse at top, rgba(255,255,255,0.04), transparent 60%);
    color: var(--ink);
    font-family: "IBM Plex Sans", "Inter", "SF Pro Display", sans-serif;
    padding: 3rem 2.5rem 4rem;
    position: relative;
    min-height: 100%;
}

.sg-plate, .sg-plate * { font-feature-settings: "tnum" 1; }

/* Top header rule */
.sg-top {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2.5rem;
}
.sg-topline { flex: 1; height: 1px; background: var(--ink-dim); }
.sg-topmark {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem; letter-spacing: 0.28em;
    color: var(--ink-dim);
}

/* Title block — small rectangle, top-right */
.sg-titleblock {
    position: absolute; top: 2.5rem; right: 2.5rem;
    width: 17rem;
    border: 1px solid var(--cyan);
    background: rgba(7, 89, 133, 0.4);
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
}
.tb-row {
    display: grid; grid-template-columns: 5.5rem 1fr;
    padding: 0.35rem 0.7rem;
    border-bottom: 1px solid rgba(56, 189, 248, 0.25);
}
.tb-row:last-child { border-bottom: none; }
.tb-row span { color: var(--ink-dim); text-transform: uppercase; letter-spacing: 0.1em; }
.tb-row b { color: var(--ink); font-weight: 500; }

/* Hero */
.sg-hero { max-width: 38rem; margin: 1rem 0 3.5rem; }
.sg-h1 {
    font-size: clamp(2rem, 4vw, 3.3rem);
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.05;
    text-transform: uppercase;
    margin: 0 0 1.5rem;
    color: var(--ink);
}
.sg-h1 .sg-accent {
    color: var(--cyan);
    border-bottom: 2px solid var(--cyan);
    padding-bottom: 0.15rem;
}
.sg-lede {
    max-width: 34rem;
    font-size: 0.95rem;
    line-height: 1.65;
    color: rgba(232, 238, 247, 0.78);
    margin: 0 0 1rem 0;
}

/* Sub-lede sits directly under the prose: a datasheet line noting that the
   rendered fleet is a *sample*, not a fixed deployment size. */
.sg-sub-lede {
    max-width: 34rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cyan);
    margin: 0;
}
.sg-sub-lede b { color: var(--ink); font-weight: 600; margin-right: 0.35rem; }
.sg-sub-sep { color: rgba(56, 189, 248, 0.4); margin: 0 0.55rem; }

/* Status counts inside the dimension label — the numeric stands out against
   the dim rule text so glanceable counts survive shrinking down. */
.sg-dim-num {
    color: var(--cyan);
    font-weight: 700;
    margin: 0 0.15rem;
}
.sg-lede code {
    font-family: "SF Mono", ui-monospace, monospace;
    padding: 0.05rem 0.35rem;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: var(--ink);
    font-size: 0.85em;
}

/* Section header */
.sg-section-head {
    display: flex; align-items: baseline; gap: 1rem;
    border-bottom: 1px solid rgba(232, 238, 247, 0.2);
    padding-bottom: 0.6rem;
    margin-bottom: 1.5rem;
}
.sg-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem; letter-spacing: 0.25em;
    color: var(--cyan);
}
.sg-sublabel {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem; color: var(--ink-dim); letter-spacing: 0.1em;
}

/* Plan view — bed grid */
.sg-planview { margin: 3rem 0 3.5rem; }
.sg-beds {
    /* Auto-fit grid — the lab scales from a handful of beds to forty-plus
       without the layout ever needing a config change.  Each bed reserves
       ≥16rem so the wireframe cells stay legible at any count. */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 0;
    border: 1px solid var(--cyan);
}
.bed {
    min-height: 7rem;
    padding: 0.7rem 0.85rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem;
    position: relative;
    /* Individual per-cell dividers — works with auto-fit because each bed
       paints its own right + bottom line instead of relying on a fixed
       column-count background gradient. */
    border-right: 1px solid rgba(56, 189, 248, 0.25);
    border-bottom: 1px solid rgba(56, 189, 248, 0.25);
    transition: background-color 0.25s ease, outline 0.25s ease;
    outline: 0 solid transparent;
}
.bed:hover { background: rgba(56, 189, 248, 0.08); outline: 1px solid var(--cyan); z-index: 1; }
.bed-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem; }
.bed-id { color: var(--ink-dim); letter-spacing: 0.1em; }
.bed-glyph { font-size: 0.85rem; }
.glyph-idle     { color: rgba(232, 238, 247, 0.3); }
.glyph-printing { color: var(--cyan); animation: blink 3s ease-in-out infinite; }
.glyph-error    { color: #f87171; }
.glyph-queue    { color: rgba(232, 238, 247, 0.55); }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.bed-job { color: var(--ink); margin-bottom: 0.15rem; letter-spacing: 0.01em; }
.bed-material, .bed-elapsed { color: var(--ink-dim); font-size: 0.65rem; line-height: 1.4; }
.bed-idle { color: rgba(232, 238, 247, 0.35); font-style: italic; }

/* Dimension line */
.sg-dim { margin-top: 0.75rem; color: var(--cyan); display: flex; flex-direction: column; gap: 0.4rem; }
.sg-dim-svg { width: 100%; height: 1.2rem; }
.sg-dim-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.65rem; letter-spacing: 0.2em;
    color: var(--ink-dim);
    text-align: center;
}

/* Callouts */
.sg-callouts { margin: 3.5rem 0; }
.callout-list {
    list-style: none; padding: 0; margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}
.callout-list li {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 1.25rem;
    padding: 0.75rem 1rem;
    border-left: 1px solid rgba(56, 189, 248, 0.35);
    background: rgba(56, 189, 248, 0.03);
}
.callout-list li:nth-child(2) { margin-left: 8%; }
.callout-list li:nth-child(3) { margin-left: 4%; }
.callout-list .num {
    font-size: 1.6rem;
    font-family: "IBM Plex Serif", Georgia, serif;
    color: var(--cyan);
    line-height: 1;
    align-self: start;
    padding-top: 0.1rem;
}
.callout-list b {
    display: block;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--cyan);
    margin-bottom: 0.45rem;
}
.callout-list div {
    font-size: 0.9rem;
    line-height: 1.55;
    color: rgba(232, 238, 247, 0.82);
}
.callout-list code {
    font-family: "SF Mono", ui-monospace, monospace;
    padding: 0.02rem 0.3rem;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.32);
    font-size: 0.85em;
}

/* Spec table */
.sg-specs { margin: 3.5rem 0; }
.spec-table {
    width: 100%;
    border-collapse: collapse;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.78rem;
    border: 1px solid rgba(56, 189, 248, 0.25);
}
.spec-table th, .spec-table td {
    padding: 0.4rem 0.9rem;
    text-align: left;
    border-bottom: 1px solid rgba(56, 189, 248, 0.18);
}
.spec-table th { color: var(--ink-dim); font-weight: 400; width: 14rem; letter-spacing: 0.05em; }
.spec-table td { color: var(--ink); }
.spec-table tr.alt { background: rgba(56, 189, 248, 0.035); }
.spec-table tr:last-child th, .spec-table tr:last-child td { border-bottom: none; }

/* Revisions */
.sg-revs { margin: 3.5rem 0 0; }
.rev-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--cyan);
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.74rem;
}
.rev-table th {
    background: rgba(56, 189, 248, 0.1);
    color: var(--cyan);
    text-align: left;
    padding: 0.4rem 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-right: 1px solid rgba(56, 189, 248, 0.25);
    border-bottom: 1px solid var(--cyan);
    font-weight: 500;
    font-size: 0.68rem;
}
.rev-table th:last-child { border-right: none; }
.rev-table td {
    padding: 0.4rem 0.75rem;
    border-right: 1px solid rgba(56, 189, 248, 0.18);
    border-bottom: 1px solid rgba(56, 189, 248, 0.18);
    color: var(--ink);
}
.rev-table td:last-child { border-right: none; }
.rev-table tr:last-child td { border-bottom: none; }

.sg-source {
    display: inline-block;
    margin-top: 1.5rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    color: var(--cyan);
    text-decoration: none;
    border-bottom: 1px solid rgba(56, 189, 248, 0.4);
    padding-bottom: 0.2rem;
    transition: color 0.2s ease;
}
.sg-source:hover { color: var(--ink); border-color: var(--ink); }
</style>
