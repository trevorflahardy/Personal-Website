<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const base = import.meta.env.BASE_URL;

const features = [
    {
        icon: "📄",
        title: "Typed Class Notes",
        sub: "Typst → PDF, in-browser viewer",
        body: "All 8 chapters of CNT 4419 authored in Typst, compiled to a crisp PDF, and viewable directly in the browser — zoom, search, and page navigation included.",
        img: `${base}cnt_4419_study_hub/homepage.png`,
        imgAlt: "Study Hub homepage with PDF viewer",
        chapters: [
            "Foundations — policy, mechanism, traces",
            "CIA triad, safety & liveness properties",
            "Enforcers — static/dynamic, sound/complete/precise",
            "Mechanism categories — preventative, detective, containment",
            "Secure Design Principles — PoLP, TOCTOU, defense in depth",
            "Attack Vectors — confused deputy, phishing, DoS/DDoS",
            "Access Control — RBAC, MAC, Bell-LaPadula, Biba",
            "Memory & Buffers — overflow, ROP, ASLR, stack guards, CFI",
        ],
    },
    {
        icon: "🧠",
        title: "Practice Quiz Engine",
        sub: "500+ questions, AI explanations, XP system",
        body: "Multiple-choice, true/false, and short-answer questions across all 8 chapters. Wrong answers trigger an on-device LLM explanation grounded in the actual notes. Earn XP, level up.",
        img: `${base}cnt_4419_study_hub/ai_quiz_gen_question.png`,
        imgAlt: "Quiz engine with AI explanations",
        chapters: [],
    },
    {
        icon: "💬",
        title: "AI Chat Assistant",
        sub: "On-device RAG — nothing leaves your browser",
        body: "Transformers.js embeds query semantics; a WebGPU-accelerated on-device LLM generates answers grounded in the retrieved note passages. No API keys. No data collection. Fully offline after first load.",
        img: `${base}cnt_4419_study_hub/ai_flashcard_answer.png`,
        imgAlt: "AI Chat with grounded answers",
        chapters: [],
    },
    {
        icon: "📇",
        title: "Flashcards",
        sub: "Key concepts, spaced repetition",
        body: "Flip-card decks derived from definitions and key claims in the notes. Review the terms that matter — CIA triad, PoLP, TOCTOU, ASLR, Bell-LaPadula — in a quick-fire format.",
        img: `${base}cnt_4419_study_hub/ai_flashcard_question.png`,
        imgAlt: "Flashcard review interface",
        chapters: [],
    },
];

const stack = [
    { k: "FRAMEWORK",  v: "Nuxt 3 + Nuxt UI" },
    { k: "NOTES",      v: "Typst → PDF" },
    { k: "EMBEDDINGS", v: "Transformers.js (in-browser)" },
    { k: "CHAT",       v: "WebGPU on-device LLM" },
    { k: "HOSTING",    v: "GitHub Pages (fully static)" },
    { k: "PRIVACY",    v: "No server, no data collection" },
];
</script>

<template>
    <div class="chalk-hall">
        <!-- Animated chalk-drawing background -->
        <div class="chalk-bg" aria-hidden="true">
            <svg class="chalk-doodles" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
                <!-- CIA triad triangle -->
                <path class="doodle doodle--a" d="M80 200 L140 100 L200 200 Z" fill="none" />
                <!-- Arrow pointing down -->
                <path class="doodle doodle--b" d="M680 80 L680 180 M665 160 L680 180 L695 160" fill="none" />
                <!-- Stack frame diagram -->
                <rect class="doodle doodle--c" x="820" y="300" width="120" height="20" />
                <rect class="doodle doodle--c" x="820" y="325" width="120" height="20" />
                <rect class="doodle doodle--c" x="820" y="350" width="120" height="20" />
                <!-- Bell-LaPadula lattice -->
                <circle class="doodle doodle--d" cx="150" cy="480" r="18" fill="none" />
                <circle class="doodle doodle--d" cx="150" cy="540" r="18" fill="none" />
                <path  class="doodle doodle--d" d="M150 462 L150 522" />
                <!-- Equation: y = mx + b -->
                <text class="doodle-text doodle--e" x="500" y="120">CIA = {C, I, A}</text>
                <!-- Access control -->
                <text class="doodle-text doodle--f" x="350" y="580">subject → object</text>
                <!-- Buffer overflow arrow -->
                <path class="doodle doodle--g" d="M700 450 C 750 400 800 420 830 450" fill="none" />
                <!-- Circle representing a trust boundary -->
                <ellipse class="doodle doodle--h" cx="480" cy="420" rx="90" ry="55" fill="none" />
            </svg>
            <div class="chalk-bg__vignette" />
        </div>

        <header class="chalk-head">
            <div class="chalk-head__meta">
                <span class="meta-label">CNT 4419 · SECURE CODING · SPRING 2026</span>
                <span class="meta-label">USF · Tampa, FL</span>
            </div>
            <h1 class="chalk-title">
                CNT<span class="chalk-title__accent"> 4419 </span>Study Hub
            </h1>
            <p class="chalk-sub">
                A complete AI-powered study platform for Secure Coding — typed notes, quiz engine,
                and on-device chat, all running in your browser. No server. No data leaves your machine.
            </p>
            <div class="chalk-ctas">
                <a class="chalk-btn chalk-btn--primary" href="https://trevorflahardy.github.io/cnt_4419_class_notes/" target="_blank" rel="noreferrer">
                    Open Study Hub
                </a>
                <a class="chalk-btn" href="https://github.com/trevorflahardy/cnt_4419_class_notes" target="_blank" rel="noreferrer">
                    GitHub →
                </a>
            </div>
        </header>

        <!-- Feature cards -->
        <section class="chalk-features">
            <div v-for="(f, i) in features" :key="f.title" class="feature-row" :class="i % 2 === 1 ? 'feature-row--flip' : ''">
                <div class="feature-text">
                    <div class="feature-eyebrow">
                        <span class="feature-icon">{{ f.icon }}</span>
                        <span class="feature-sub">{{ f.sub }}</span>
                    </div>
                    <h2 class="feature-title">{{ f.title }}</h2>
                    <p class="feature-body">{{ f.body }}</p>
                    <ul v-if="f.chapters.length" class="chapter-list">
                        <li v-for="ch in f.chapters" :key="ch">{{ ch }}</li>
                    </ul>
                </div>
                <div class="feature-shot">
                    <img :src="f.img" :alt="f.imgAlt" loading="lazy" />
                </div>
            </div>
        </section>

        <!-- RAG technical deep-dive -->
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

        <!-- Tech stack -->
        <section class="chalk-stack">
            <h2 class="stack-head">Tech Stack</h2>
            <div class="stack-grid">
                <div v-for="s in stack" :key="s.k" class="stack-item">
                    <span class="stack-k">{{ s.k }}</span>
                    <span class="stack-v">{{ s.v }}</span>
                </div>
            </div>
        </section>

        <footer class="chalk-foot">
            <span class="erase-line" aria-hidden="true" />
            <p class="foot-txt">
                — end of lecture.
                <a href="https://trevorflahardy.github.io/cnt_4419_class_notes/">open study hub</a>
                ·
                <a href="https://github.com/trevorflahardy/cnt_4419_class_notes">source</a> —
            </p>
        </footer>

        <div class="ledge" aria-hidden="true">
            <span class="chalk-stick chalk-stick--a" />
            <span class="chalk-stick chalk-stick--b" />
            <span class="eraser" />
        </div>
    </div>
</template>

<style scoped>
.chalk-hall {
    --board: #16362b;
    --chalk: #f0ece0;
    --chalk-soft: rgba(240, 236, 224, 0.78);
    --chalk-mute: rgba(240, 236, 224, 0.52);
    --chalk-faint: rgba(240, 236, 224, 0.28);
    --chalk-yellow: #f2d46b;
    --chalk-pink: #e8a2b8;
    --chalk-blue: #9ec7e5;
    --rule: rgba(240, 236, 224, 0.18);

    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--board);
    color: var(--chalk);
    padding-bottom: 6rem;
    overflow: hidden;
}

/* ─── Animated chalk doodles ─── */
.chalk-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.chalk-doodles {
    position: absolute; inset: 0; width: 100%; height: 100%;
    opacity: 0.12;
    filter: blur(1.5px);
}
.doodle {
    stroke: var(--chalk);
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 600;
    stroke-dashoffset: 600;
}
.doodle--a { animation: chalk-draw 3.5s 0.2s ease-out forwards; }
.doodle--b { animation: chalk-draw 2.8s 1.0s ease-out forwards; }
.doodle--c { animation: chalk-draw 4.0s 0.5s ease-out forwards; }
.doodle--d { animation: chalk-draw 3.0s 1.8s ease-out forwards; }
.doodle--e { animation: chalk-draw 2.5s 2.5s ease-out forwards; }
.doodle--f { animation: chalk-draw 2.2s 3.0s ease-out forwards; }
.doodle--g { animation: chalk-draw 3.2s 0.8s ease-out forwards; }
.doodle--h { stroke-dasharray: 400; stroke-dashoffset: 400; animation: chalk-draw 3.8s 1.4s ease-out forwards; }
.doodle-text {
    font-family: "Caveat", cursive;
    font-size: 22px;
    fill: var(--chalk);
    opacity: 0;
    animation: chalk-fade 1.2s ease-out forwards;
}
.doodle--e { animation-delay: 2.5s; }
.doodle--f { animation-delay: 3.0s; }
@keyframes chalk-draw {
    to { stroke-dashoffset: 0; }
}
@keyframes chalk-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
}
.chalk-bg__vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.45) 100%);
}

/* ─── Header ─── */
.chalk-head {
    position: relative; z-index: 2;
    padding: 4rem clamp(1.5rem, 6vw, 5rem) 3rem;
    border-bottom: 1px dashed var(--rule);
}
.chalk-head__meta {
    display: flex; justify-content: space-between;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--chalk-mute); margin-bottom: 1.5rem;
}
.chalk-title {
    font-family: "Caveat", cursive;
    font-size: clamp(2.8rem, 7vw, 5rem);
    margin: 0 0 0.65rem; line-height: 1.05;
    color: var(--chalk);
    text-shadow: 0 1px 0 rgba(0,0,0,0.15);
}
.chalk-title__accent { color: var(--chalk-yellow); }
.chalk-sub {
    font-size: 1rem; line-height: 1.65;
    color: var(--chalk-soft);
    max-width: 60ch; margin: 0 0 1.75rem;
    font-family: ui-sans-serif, system-ui, sans-serif;
}
.chalk-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.chalk-btn {
    display: inline-flex; align-items: center;
    padding: 0.6rem 1.1rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.75rem; letter-spacing: 0.1em;
    color: var(--chalk);
    border: 1px dashed var(--rule);
    border-radius: 4px;
    text-decoration: none;
    transition: background 180ms ease, border-color 180ms ease;
}
.chalk-btn:hover { background: rgba(240,236,224,0.06); border-color: rgba(240,236,224,0.4); }
.chalk-btn--primary {
    background: rgba(242, 212, 107, 0.12);
    border-color: rgba(242, 212, 107, 0.5);
    color: var(--chalk-yellow);
}
.chalk-btn--primary:hover { background: rgba(242, 212, 107, 0.2); }

/* ─── Features ─── */
.chalk-features {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; gap: 0;
}
.feature-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 5rem);
    align-items: center;
    padding: 4rem clamp(1.5rem, 6vw, 5rem);
    border-bottom: 1px dashed var(--rule);
}
.feature-row--flip { direction: rtl; }
.feature-row--flip > * { direction: ltr; }
@media (max-width: 900px) {
    .feature-row, .feature-row--flip { grid-template-columns: 1fr; direction: ltr; }
    .feature-shot { order: -1; }
}
.feature-eyebrow {
    display: flex; align-items: center; gap: 0.65rem;
    margin-bottom: 0.75rem;
}
.feature-icon { font-size: 1.4rem; }
.feature-sub {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--chalk-blue);
}
.feature-title {
    font-family: "Caveat", cursive;
    font-size: 2.2rem; margin: 0 0 0.75rem;
    color: var(--chalk);
}
.feature-body {
    font-size: 0.95rem; line-height: 1.7;
    color: var(--chalk-soft);
    margin: 0 0 1rem;
    font-family: ui-sans-serif, system-ui, sans-serif;
}
.chapter-list {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 0.3rem;
}
.chapter-list li {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.76rem; letter-spacing: 0.04em;
    color: var(--chalk-mute); padding-left: 1rem;
    position: relative;
}
.chapter-list li::before {
    content: "·";
    position: absolute; left: 0;
    color: var(--chalk-yellow);
}
.feature-shot {
    border: 1px dashed var(--rule);
    border-radius: 6px;
    overflow: hidden;
    background: rgba(0,0,0,0.25);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.feature-shot img {
    width: 100%; height: auto; display: block;
    transition: transform 300ms ease;
}
.feature-shot:hover img { transform: scale(1.02); }

/* ─── RAG deep-dive ─── */
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
.rag-step:last-child { border-bottom: 1px dashed var(--rule); }
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
.rag-step__body code {
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
.rag-privacy__icon { font-size: 1.6rem; align-self: start; margin-top: 0.15rem; }
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

/* ─── Stack ─── */
.chalk-stack {
    position: relative; z-index: 2;
    padding: 3.5rem clamp(1.5rem, 6vw, 5rem);
    border-bottom: 1px dashed var(--rule);
}
.stack-head {
    font-family: "Caveat", cursive;
    font-size: 1.9rem; margin: 0 0 1.5rem;
    color: var(--chalk);
}
.stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 0.75rem;
}
.stack-item {
    display: flex; flex-direction: column; gap: 0.2rem;
    padding: 0.85rem 1rem;
    border: 1px dashed var(--rule);
    border-radius: 4px;
    background: rgba(240,236,224,0.03);
}
.stack-k {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--chalk-yellow);
}
.stack-v {
    font-size: 0.9rem; color: var(--chalk-soft);
    font-family: ui-sans-serif, system-ui, sans-serif;
}

/* ─── Footer & ledge ─── */
.chalk-foot {
    position: relative; z-index: 2;
    padding: 3rem clamp(1.5rem, 5vw, 4rem) 2rem;
    text-align: center;
}
.erase-line {
    display: block; height: 8px; margin: 0 auto 1.25rem; max-width: 420px;
    background: linear-gradient(90deg, transparent 0%, rgba(240,236,224,0.15) 20%, rgba(240,236,224,0.3) 50%, rgba(240,236,224,0.15) 80%, transparent 100%);
    filter: blur(1px);
}
.foot-txt {
    font-family: "Caveat", cursive;
    font-size: 1.2rem; color: var(--chalk-mute); margin: 0;
}
.foot-txt a { color: var(--chalk-blue); text-decoration: underline; text-decoration-style: dotted; }
.ledge {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 2.25rem; z-index: 3;
    background: linear-gradient(to bottom, #3a2a1c 0%, #2b1d12 45%, #1a110a 100%);
    box-shadow: 0 -6px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
    display: flex; align-items: center; gap: 1rem;
    padding: 0 clamp(1.5rem, 5vw, 4rem);
}
.chalk-stick {
    display: inline-block; width: 3rem; height: 0.55rem; border-radius: 1px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.4);
}
.chalk-stick--a { background: #f1ede0; transform: rotate(-4deg); }
.chalk-stick--b { background: var(--chalk-yellow); transform: rotate(3deg); width: 2.3rem; }
.eraser {
    display: inline-block; width: 2.2rem; height: 1rem;
    background: linear-gradient(to bottom, #5d3c22 0%, #3d2614 100%);
    border-radius: 2px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 3px rgba(0,0,0,0.5);
    margin-left: auto;
}

@media (prefers-reduced-motion: reduce) {
    .doodle, .doodle-text { animation: none; stroke-dashoffset: 0; opacity: 1; }
}
</style>
