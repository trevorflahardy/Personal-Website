<script setup lang="ts">
// DFA states for the theorem figure. Encodes the regex `a(b|c)*d`.
const dfaStates = [
    { id: 'q0', x: 60,  y: 140, label: 'q₀', start: true },
    { id: 'q1', x: 220, y: 140, label: 'q₁' },
    { id: 'q2', x: 380, y: 80,  label: 'q₂' },
    { id: 'q3', x: 380, y: 200, label: 'q₃' },
    { id: 'q4', x: 540, y: 140, label: 'q₄', accept: true },
];
const dfaEdges = [
    { from: 'q0', to: 'q1', label: 'a' },
    { from: 'q1', to: 'q2', label: 'b' },
    { from: 'q1', to: 'q3', label: 'c' },
    { from: 'q2', to: 'q1', label: 'ε' },
    { from: 'q3', to: 'q1', label: 'ε' },
    { from: 'q1', to: 'q4', label: 'd' },
];

const stateById = (id: string) => dfaStates.find(s => s.id === id)!;

const edgePath = (a: typeof dfaStates[number], b: typeof dfaStates[number]) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const r = 22;
    const sx = a.x + ux * r, sy = a.y + uy * r;
    const ex = b.x - ux * r, ey = b.y - uy * r;
    const mx = (sx + ex) / 2 - uy * 22;
    const my = (sy + ey) / 2 + ux * 22;
    return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
};

const labelPos = (a: typeof dfaStates[number], b: typeof dfaStates[number]) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: mx - (dy / len) * 18, y: my + (dx / len) * 18 };
};

const lemmas = [
    {
        tag: 'Lemma 1',
        title: 'Every regular expression has an equivalent NFA.',
        body: 'Thompson\'s construction transforms any pattern into a non-deterministic finite automaton in linear time. RegViz renders the NFA intermediate alongside the final DFA so the translation is visible, not magic.',
    },
    {
        tag: 'Lemma 2',
        title: 'Every NFA has an equivalent DFA via subset construction.',
        body: 'Powerset construction walks the NFA, grouping reachable state sets into DFA states. RegViz traces the construction step-by-step, highlighting each ε-closure computation.',
    },
    {
        tag: 'Lemma 3',
        title: 'Minimization is Hopcroft\'s O(n log n).',
        body: 'Partition refinement collapses indistinguishable states. The minimized DFA is unique up to isomorphism — RegViz surfaces the partition classes so you can see equivalence at work.',
    },
];

const features = [
    { k: 'I.',   v: 'Thompson NFA construction with ε-closures visible' },
    { k: 'II.',  v: 'Subset construction animated step-by-step' },
    { k: 'III.', v: 'Hopcroft minimization with partition overlay' },
    { k: 'IV.',  v: 'Live input-string simulation — watch states pulse as characters feed' },
    { k: 'V.',   v: 'GraphViz DOT export for papers and homework' },
    { k: 'VI.',  v: 'Shareable URL — regex compiles and renders on paste' },
];
</script>

<template>
    <div class="regviz-world">
        <div class="paper" aria-hidden="true"></div>

        <article class="manuscript">
            <header class="front">
                <div class="front-meta">
                    <span class="front-cat">Applied Automata · Vol. I</span>
                    <span class="front-folio">f. 01r</span>
                </div>
                <h1 class="front-title">
                    <span class="front-n">On the Visualization of</span>
                    <span class="front-m">Regular Expressions</span>
                    <span class="front-n">as</span>
                    <span class="front-m">Finite Automata</span>
                </h1>
                <p class="front-author">— T. Flahardy, 2025 —</p>
                <div class="front-rule"></div>
                <p class="front-abstract">
                    <em>Abstract.</em> RegViz is a browser-resident compiler from regular expressions to deterministic finite automata. Each phase of compilation — Thompson construction, subset expansion, Hopcroft minimization — is rendered as a graph on the page, and the intermediate forms remain inspectable. The system exists to make the translation <em>visible</em>, so that the reader may develop intuition where rote memorization once sufficed.
                </p>
                <aside class="margin-note margin-note--front">
                    see fig. I<br>
                    <span class="margin-arrow">↘</span>
                </aside>
            </header>

            <figure class="figure figure--main">
                <svg viewBox="0 0 620 260" class="dfa-svg" role="img" aria-label="DFA diagram">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
                            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#2a1f18" />
                        </marker>
                    </defs>
                    <g class="edges">
                        <g v-for="(e, i) in dfaEdges" :key="i">
                            <path :d="edgePath(stateById(e.from), stateById(e.to))"
                                class="dfa-edge" marker-end="url(#arrow)" />
                            <text :x="labelPos(stateById(e.from), stateById(e.to)).x"
                                :y="labelPos(stateById(e.from), stateById(e.to)).y"
                                class="dfa-edge-label">{{ e.label }}</text>
                        </g>
                    </g>
                    <g class="states">
                        <g v-for="s in dfaStates" :key="s.id">
                            <circle :cx="s.x" :cy="s.y" r="22" class="dfa-state"
                                :class="{ 'is-start': s.start, 'is-accept': s.accept }" />
                            <circle v-if="s.accept" :cx="s.x" :cy="s.y" r="17" class="dfa-state-inner" />
                            <text :x="s.x" :y="s.y + 5" class="dfa-state-label">{{ s.label }}</text>
                            <text v-if="s.start" :x="s.x - 34" :y="s.y + 4" class="dfa-start-arrow">→</text>
                        </g>
                    </g>
                </svg>
                <figcaption>
                    <span class="figure-tag">Figure I.</span>
                    Deterministic finite automaton accepting the language <code>a(b|c)*d</code>. States <code>q₀</code> through <code>q₄</code> form the transition graph; ε-edges mark subset-construction identifications. The accepting state <code>q₄</code> is drawn with a double boundary, per convention.
                </figcaption>
                <aside class="margin-note margin-note--figure">
                    <span class="underline-wave">accepting state</span><br>
                    <span class="margin-arrow">↖</span>
                </aside>
            </figure>

            <section class="lemmas">
                <h2 class="section-head">§ 1. &nbsp; Theoretical foundations</h2>
                <div class="lemma" v-for="l in lemmas" :key="l.tag">
                    <div class="lemma-tag">{{ l.tag }}.</div>
                    <div class="lemma-body">
                        <p class="lemma-title"><em>{{ l.title }}</em></p>
                        <p class="lemma-text">{{ l.body }}</p>
                    </div>
                </div>
            </section>

            <div class="equation">
                <div class="equation-box">
                    <span class="eq-label">(1)</span>
                    <span class="eq-body">
                        <span class="eq-lhs">L(r₁ · r₂)</span>
                        <span class="eq-eq">=</span>
                        <span class="eq-rhs">{ uv : u ∈ L(r₁), v ∈ L(r₂) }</span>
                    </span>
                </div>
            </div>

            <section class="capabilities">
                <h2 class="section-head">§ 2. &nbsp; What the instrument does</h2>
                <ol class="caps-list">
                    <li v-for="f in features" :key="f.k">
                        <span class="caps-k">{{ f.k }}</span>
                        <span class="caps-v">{{ f.v }}</span>
                    </li>
                </ol>
            </section>

            <footer class="colophon">
                <div class="colophon-rule"></div>
                <p class="colophon-text">
                    Written in <em>Rust</em> and compiled to WebAssembly. Typeset in <em>EB Garamond</em>. Rendered on paper the colour of old journals.
                </p>
                <div class="colophon-actions">
                    <a class="ink-link" href="https://github.com/trevorflahardy/regviz" target="_blank" rel="noopener">
                        <span class="pi pi-github"></span> view source
                    </a>
                    <a class="ink-link" href="https://regviz.trevorflahardy.com" target="_blank" rel="noopener">
                        <span class="pi pi-external-link"></span> open the instrument
                    </a>
                </div>
            </footer>
        </article>
    </div>
</template>

<style scoped>
.regviz-world {
    --paper: #f3ead3;
    --paper-hi: #f8f0d8;
    --ink: #2a1f18;
    --ink-soft: rgba(42, 31, 24, 0.72);
    --ink-faint: rgba(42, 31, 24, 0.45);
    --rule: rgba(42, 31, 24, 0.28);
    --red: #a8301f;

    position: relative;
    min-height: 100%;
    width: 100%;
    background: var(--paper);
    color: var(--ink);
    font-family: "EB Garamond", "Garamond", "Georgia", serif;
    font-feature-settings: "onum" 1, "dlig" 1, "liga" 1;
    isolation: isolate;
    overflow-x: hidden;
}

.paper {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(198, 160, 100, 0.2), transparent 55%),
        radial-gradient(ellipse at 85% 80%, rgba(180, 120, 60, 0.15), transparent 55%),
        radial-gradient(circle at 30% 50%, rgba(80, 40, 10, 0.05), transparent 80%);
    mix-blend-mode: multiply;
}
.paper::after {
    content: "";
    position: absolute; inset: 0;
    background-image:
        radial-gradient(circle at 20% 30%, rgba(80, 40, 10, 0.035) 1px, transparent 1px),
        radial-gradient(circle at 70% 60%, rgba(80, 40, 10, 0.03) 1px, transparent 1px);
    background-size: 13px 13px, 19px 19px;
    mix-blend-mode: multiply;
    opacity: 0.9;
}

.manuscript {
    position: relative;
    z-index: 1;
    max-width: 46rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) 6rem;
}

.front { position: relative; text-align: center; padding-bottom: 3rem; }
.front-meta {
    display: flex;
    justify-content: space-between;
    font-family: "Courier New", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    color: var(--ink-faint);
    text-transform: uppercase;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid var(--rule);
    padding-bottom: 0.6rem;
}
.front-title {
    display: flex;
    flex-direction: column;
    gap: 0.1em;
    font-size: clamp(1.4rem, 3.5vw, 2.4rem);
    font-weight: 400;
    line-height: 1.15;
    margin: 0 0 1.2rem;
    color: var(--ink);
    letter-spacing: 0.01em;
}
.front-n { font-style: italic; font-size: 0.6em; color: var(--ink-soft); }
.front-m { font-variant: small-caps; letter-spacing: 0.05em; font-size: 1em; }

.front-author {
    font-style: italic;
    font-size: 1rem;
    color: var(--ink-soft);
    margin: 0 0 1.5rem;
}
.front-rule {
    width: 6rem; height: 1px;
    background: var(--ink);
    margin: 0 auto 2rem;
    position: relative;
}
.front-rule::before, .front-rule::after {
    content: "❦";
    position: absolute;
    top: 50%; transform: translateY(-55%);
    font-size: 0.8rem; color: var(--ink);
}
.front-rule::before { left: -1.6rem; }
.front-rule::after  { right: -1.6rem; }

.front-abstract {
    text-align: justify;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--ink);
    text-indent: 2em;
    margin: 0 auto;
    max-width: 38rem;
}
.front-abstract em { font-style: italic; font-weight: 500; }

.margin-note {
    position: absolute;
    font-family: "Caveat", "Kalam", cursive;
    font-size: 1rem;
    color: var(--red);
    line-height: 1.2;
    transform: rotate(-3deg);
    pointer-events: none;
}
.margin-note--front { top: 5rem; right: -4rem; }
.margin-note--figure { bottom: 2rem; right: -4.5rem; transform: rotate(4deg); }
.margin-arrow { font-size: 1.3rem; display: inline-block; }
.underline-wave {
    background-image: linear-gradient(transparent 85%, var(--red) 85%, var(--red) 100%);
    background-size: 100% 4px;
    background-repeat: no-repeat;
    background-position: 0 100%;
}

.figure { position: relative; margin: 3.5rem 0 3rem; }
.figure--main { text-align: center; }
.dfa-svg {
    width: 100%;
    max-width: 640px;
    height: auto;
    margin: 0 auto 1rem;
    display: block;
}
.dfa-state { fill: var(--paper-hi); stroke: var(--ink); stroke-width: 1.5; }
.dfa-state.is-accept { stroke-width: 2; }
.dfa-state-inner { fill: none; stroke: var(--ink); stroke-width: 1.2; }
.dfa-state-label {
    font-family: "EB Garamond", Garamond, serif;
    font-size: 16px;
    font-style: italic;
    fill: var(--ink);
    text-anchor: middle;
}
.dfa-edge { fill: none; stroke: var(--ink); stroke-width: 1.1; }
.dfa-edge-label {
    font-family: "EB Garamond", Garamond, serif;
    font-size: 13px;
    font-style: italic;
    fill: var(--ink);
    text-anchor: middle;
}
.dfa-start-arrow { font-size: 16px; fill: var(--ink); font-style: italic; }

figcaption {
    text-align: center;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--ink-soft);
    max-width: 34rem;
    margin: 0 auto;
    padding: 0 1rem;
}
figcaption code {
    font-family: "Courier New", monospace;
    font-size: 0.9em;
    font-style: normal;
    background: rgba(168, 48, 31, 0.07);
    padding: 0.05em 0.35em;
    border-radius: 2px;
}
.figure-tag { font-variant: small-caps; font-style: normal; letter-spacing: 0.06em; }

.section-head {
    font-size: 1.25rem;
    font-variant: small-caps;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin: 3rem 0 1.5rem;
    color: var(--ink);
    text-align: center;
}

.lemma {
    display: grid;
    grid-template-columns: 4.5rem 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
}
.lemma-tag {
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: var(--ink-soft);
    padding-top: 0.15rem;
    text-align: right;
    font-size: 0.95rem;
}
.lemma-title {
    font-size: 1.05rem;
    margin: 0 0 0.3rem;
    color: var(--ink);
    line-height: 1.45;
}
.lemma-text {
    font-size: 0.98rem;
    line-height: 1.65;
    color: var(--ink-soft);
    margin: 0;
    text-align: justify;
}

.equation { margin: 3rem 0; text-align: center; }
.equation-box {
    display: inline-flex;
    align-items: baseline;
    gap: 2rem;
    padding: 1rem 2rem;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    font-size: 1.1rem;
    font-style: italic;
}
.eq-label { color: var(--ink-soft); font-style: normal; font-size: 0.9rem; }
.eq-body { display: inline-flex; gap: 0.8rem; align-items: baseline; }

.caps-list { list-style: none; padding: 0; margin: 1rem auto; max-width: 36rem; }
.caps-list li {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px dotted var(--rule);
    font-size: 1rem;
    line-height: 1.6;
}
.caps-k { font-variant: small-caps; letter-spacing: 0.05em; color: var(--ink-soft); text-align: right; }
.caps-v { color: var(--ink); }

.colophon { margin-top: 4rem; text-align: center; }
.colophon-rule { width: 50%; height: 1px; background: var(--rule); margin: 0 auto 2rem; }
.colophon-text {
    font-style: italic;
    font-size: 0.95rem;
    color: var(--ink-soft);
    line-height: 1.6;
    max-width: 32rem;
    margin: 0 auto 1.5rem;
}
.colophon-actions { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
.ink-link {
    color: var(--ink);
    text-decoration: none;
    font-size: 0.95rem;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 0.1rem;
    transition: color 200ms;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}
.ink-link:hover { color: var(--red); border-color: var(--red); }

@media (max-width: 720px) {
    .margin-note { display: none; }
    .lemma { grid-template-columns: 1fr; }
    .lemma-tag { text-align: left; }
}
</style>
