<template>
    <section class="chalk-rag">
        <div class="rag-inner">
            <div class="rag-header">
                <span class="rag-kicker">Under the Hood</span>
                <h2 class="rag-title">The AI Engine</h2>
                <p class="rag-sub">Retrieval-Augmented Generation, running entirely in your browser — no server, no API keys, no data ever leaving your machine.</p>
            </div>

            <div class="rag-pipeline">
                <div class="rag-step">
                    <span class="rag-step__n">01</span>
                    <div class="rag-step__content">
                        <h3 class="rag-step__title">Document Ingestion</h3>
                        <p class="rag-step__body">The CNT 4419 notes — 8 chapters of Typst-authored PDFs — are parsed and split into overlapping text chunks at build time. Each chunk is sized to preserve full concepts: a paragraph about Bell-LaPadula stays together, not split across two chunks where context evaporates.</p>
                    </div>
                </div>
                <div class="rag-connector" aria-hidden="true"><span class="rag-arrow">↓</span></div>
                <div class="rag-step">
                    <span class="rag-step__n">02</span>
                    <div class="rag-step__content">
                        <h3 class="rag-step__title">Embedding with Transformers.js</h3>
                        <p class="rag-step__body">Each chunk is converted to a 384-dimensional vector using <code>all-MiniLM-L6-v2</code> — a lightweight sentence transformer that runs entirely in the browser via Transformers.js and ONNX Runtime Web. The vectors are precomputed and bundled with the app so startup is instant.</p>
                    </div>
                </div>
                <div class="rag-connector" aria-hidden="true"><span class="rag-arrow">↓</span></div>
                <div class="rag-step">
                    <span class="rag-step__n">03</span>
                    <div class="rag-step__content">
                        <h3 class="rag-step__title">Semantic Retrieval</h3>
                        <p class="rag-step__body">When you ask a question, your query is embedded using the same model. Cosine similarity is computed against every stored chunk vector. The top-k most relevant passages are retrieved — so "what is the confused deputy problem?" surfaces exactly the right section on privilege escalation, not just keyword matches.</p>
                    </div>
                </div>
                <div class="rag-connector" aria-hidden="true"><span class="rag-arrow">↓</span></div>
                <div class="rag-step">
                    <span class="rag-step__n">04</span>
                    <div class="rag-step__content">
                        <h3 class="rag-step__title">On-Device LLM Generation</h3>
                        <p class="rag-step__body">The retrieved passages are assembled into a grounded prompt and fed to a WebGPU-accelerated on-device language model. The LLM generates an answer that's anchored to the actual notes — no hallucinations about CNT 4419 content. WebGPU inference runs at near-native speed on modern GPUs.</p>
                    </div>
                </div>
            </div>

            <div class="rag-privacy">
                <span class="rag-privacy__icon">🔒</span>
                <div>
                    <h3 class="rag-privacy__title">Why on-device matters</h3>
                    <p class="rag-privacy__body">Every step — embedding, retrieval, generation — runs in your browser's JavaScript runtime. Your questions, your notes, your answers: none of it ever reaches a server. There are no API keys to manage, no usage costs, no data collection. Once the model weights are cached after first load, it works completely offline. This isn't a privacy policy — it's an architectural guarantee.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.chalk-rag {
    position: relative;
    z-index: 2;
    padding: 4rem clamp(1.5rem, 6vw, 5rem);
    border-bottom: 1px dashed var(--rule);
    background: rgba(0, 0, 0, 0.2);
}

.rag-inner { max-width: 62rem; }
.rag-header { margin-bottom: 3rem; }

.rag-kicker {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--chalk-blue);
    display: block;
    margin-bottom: 0.6rem;
}

.rag-title {
    font-family: "Caveat", cursive;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    margin: 0 0 0.65rem;
    color: var(--chalk);
}

.rag-sub {
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--chalk-soft);
    max-width: 52ch;
    margin: 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
}

.rag-pipeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 3rem;
}

.rag-step {
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-top: 1px dashed var(--rule);
}

.rag-step:last-child {
    border-bottom: 1px dashed var(--rule);
}

.rag-step__n {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    color: var(--chalk-yellow);
    background: rgba(242, 212, 107, 0.1);
    border: 1px dashed rgba(242, 212, 107, 0.4);
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    flex-shrink: 0;
    margin-top: 0.1rem;
}

.rag-step__title {
    font-family: "Caveat", cursive;
    font-size: 1.4rem;
    margin: 0 0 0.5rem;
    color: var(--chalk);
}

.rag-step__body {
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--chalk-soft);
    margin: 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
}

.rag-step__body :deep(code) {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82em;
    color: var(--chalk-blue);
    background: rgba(158, 199, 229, 0.12);
    border: 1px dashed rgba(158, 199, 229, 0.35);
    padding: 0.1em 0.4em;
    border-radius: 3px;
}

.rag-connector {
    display: flex;
    align-items: center;
    padding: 0 0 0 1.1rem;
}

.rag-arrow {
    font-size: 1.2rem;
    color: var(--chalk-mute);
    opacity: 0.5;
}

.rag-privacy {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 1.25rem;
    padding: 1.5rem 1.5rem;
    background: rgba(158, 199, 229, 0.06);
    border: 1px dashed rgba(158, 199, 229, 0.28);
    border-radius: 4px;
}

.rag-privacy__icon {
    font-size: 1.6rem;
    align-self: start;
    margin-top: 0.15rem;
}

.rag-privacy__title {
    font-family: "Caveat", cursive;
    font-size: 1.3rem;
    margin: 0 0 0.5rem;
    color: var(--chalk);
}

.rag-privacy__body {
    font-size: 0.88rem;
    line-height: 1.7;
    color: var(--chalk-soft);
    margin: 0;
    font-family: ui-sans-serif, system-ui, sans-serif;
}
</style>
