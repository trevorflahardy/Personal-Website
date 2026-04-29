<template>
    <section class="screenshots">
        <h2 class="section-head">§ 4. &nbsp; The instrument in use</h2>
        <p class="body-para">
            The desktop application (built with Iced) renders each pipeline stage as a live, pannable graph.
            An optional WASM build is deployed to GitHub Pages for in-browser use.
        </p>

        <figure class="screenshot-fig">
            <img
                src="https://github.com/user-attachments/assets/71d9c561-d87f-480e-8eb9-7d2105a3ef2f"
                alt="RegViz showing NFA and DFA graphs for a regular expression"
                class="screenshot-img"
                loading="lazy"
            />
            <figcaption>
                <span class="figure-tag">Figure II.</span>
                The RegViz desktop UI. Left panel: NFA produced by Thompson construction. Right: minimized DFA after subset expansion and Hopcroft partition refinement.
            </figcaption>
        </figure>

        <figure class="screenshot-fig">
            <img
                src="https://github.com/user-attachments/assets/75fef991-ebf2-470d-bcb3-3847a4508f1a"
                alt="RegViz showing step-by-step subset construction"
                class="screenshot-img"
                loading="lazy"
            />
            <figcaption>
                <span class="figure-tag">Figure III.</span>
                Subset construction in progress. Each DFA state is labeled with the set of NFA states it represents; ε-closures are highlighted.
            </figcaption>
        </figure>
    </section>
</template>

<style scoped>
.section-head {
    font-size: 1.25rem;
    font-variant: small-caps;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin: 3.5rem 0 1.5rem;
    text-align: center;
}

.body-para {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--ink);
    text-align: justify;
    text-indent: 2em;
    margin: 0 0 1.25rem;
}

.screenshot-fig {
    margin: 2.5rem 0;
    text-align: center;
}

.screenshot-img {
    width: 100%;
    border-radius: 4px;
    border: 1px solid var(--rule);
    box-shadow: 0 4px 16px rgba(42, 31, 24, 0.18);
    margin-bottom: 0.75rem;
}

figcaption {
    text-align: center;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--ink-soft);
    max-width: 34rem;
    margin: 0 auto;
    padding: 0 1rem;
}

.figure-tag {
    font-variant: small-caps;
    font-style: normal;
    letter-spacing: 0.06em;
}
</style>
