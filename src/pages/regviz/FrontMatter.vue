<template>
    <header class="front">
        <div class="front-meta">
            <span class="meta-label">Applied Automata · Vol. I</span>
            <span class="meta-label">f. 01r</span>
        </div>
        <h1 class="front-title">
            <span class="front-n">On the Visualization of</span>
            <span class="front-m">Regular Expressions</span>
            <span class="front-n">as</span>
            <span class="front-m">Finite Automata</span>
        </h1>
        <p class="front-author">— T. Flahardy &amp; collaborators, 2025 —</p>
        <p class="front-affil">COT 4210 Automata Theory &amp; Formal Languages · University of South Florida</p>
        <div class="front-rule"></div>
        <p class="front-abstract">
            <em>Abstract.</em> RegViz is a browser-resident and native-desktop compiler from regular expressions to deterministic finite automata. Each phase of compilation — lexing, recursive-descent parsing, Thompson NFA construction, subset DFA expansion, and Hopcroft minimization — is rendered as an inspectable graph. The system is implemented in Rust (core library) with an Iced GUI for the desktop build and an optional WASM+Trunk web build. It exists to make the compilation pipeline <em>visible</em>, so that the reader may develop intuition where rote memorization once sufficed.
        </p>
        <aside class="margin-note margin-note--front">
            see fig. I<br>
            <span class="margin-arrow">↘</span>
        </aside>
    </header>
</template>

<style scoped>
.front {
    position: relative;
    text-align: center;
    padding-bottom: 3rem;
}

.front-meta {
    display: flex;
    justify-content: space-between;
    font-family: "Courier New", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
    border-bottom: 1px solid var(--rule);
    padding-bottom: 0.6rem;
    margin-bottom: 2.5rem;
}

.front-title {
    display: flex;
    flex-direction: column;
    gap: 0.1em;
    font-size: clamp(1.4rem, 3.5vw, 2.4rem);
    font-weight: 400;
    line-height: 1.15;
    margin: 0 0 1.2rem;
    letter-spacing: 0.01em;
}

.front-n {
    font-style: italic;
    font-size: 0.6em;
    color: var(--ink-soft);
}

.front-m {
    font-variant: small-caps;
    letter-spacing: 0.05em;
}

.front-author {
    font-style: italic;
    font-size: 1rem;
    color: var(--ink-soft);
    margin: 0 0 0.3rem;
}

.front-affil {
    font-family: "Courier New", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--ink-faint);
    margin: 0 0 1.5rem;
}

.front-rule {
    width: 6rem;
    height: 1px;
    background: var(--ink);
    margin: 0 auto 2rem;
    position: relative;
}

.front-rule::before,
.front-rule::after {
    content: "❦";
    position: absolute;
    top: 50%;
    transform: translateY(-55%);
    font-size: 0.8rem;
    color: var(--ink);
}

.front-rule::before { left: -1.6rem; }
.front-rule::after { right: -1.6rem; }

.front-abstract {
    text-align: justify;
    font-size: 1rem;
    line-height: 1.7;
    text-indent: 2em;
    margin: 0 auto;
    max-width: 38rem;
}

.front-abstract em {
    font-style: italic;
    font-weight: 500;
}

.margin-note--front {
    position: absolute;
    font-family: "Caveat", cursive;
    font-size: 1rem;
    color: var(--red);
    line-height: 1.2;
    transform: rotate(-3deg);
    pointer-events: none;
    top: 5rem;
    right: -4rem;
}

.margin-arrow {
    font-size: 1.3rem;
    display: inline-block;
}

@media (max-width: 720px) {
    .margin-note--front { display: none; }
}
</style>
