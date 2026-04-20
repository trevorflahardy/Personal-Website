<script setup lang="ts">
const base = import.meta.env.BASE_URL;

const pipeline = [
	{ n: "i.",   k: "TYPST SOURCE",   s: ".typ",                b: "Class notes authored in Typst — structured, semantic, version-controlled markup." },
	{ n: "ii.",  k: "COMPILER",       s: "typst compile",       b: "Compiles to a pixel-perfect PDF in milliseconds." },
	{ n: "iii.", k: "PDF OUTPUT",     s: "14 pp.",              b: "A clean, structured artifact — headings, definitions, and code blocks intact." },
	{ n: "iv.",  k: "CHUNKING",       s: "semantic splits",     b: "PDF text parsed & split into overlapping semantic chunks for retrieval." },
	{ n: "v.",   k: "EMBEDDINGS",     s: "text-embedding-3",    b: "Each chunk encoded into a high-dimensional vector via OpenAI." },
	{ n: "vi.",  k: "VECTOR INDEX",   s: "FAISS",               b: "Stored in a FAISS index for sub-millisecond cosine similarity search." },
	{ n: "vii.", k: "AI FEATURES",    s: "RAG-powered",         b: "Chat, quizzes, flashcards — grounded in retrieved class-note context." },
];

const features = [
	{ title: "Chat",       body: "Ask a question; the retriever pulls the relevant passages; the model answers with inline citations back to the source PDF." },
	{ title: "Quizzes",    body: "Auto-generated multiple-choice questions drawn from lecture chunks. Graded locally, explanations on demand." },
	{ title: "Flashcards", body: "Spaced-repetition decks derived from definitions & key claims in the notes. Flip, grade, review tomorrow." },
];

const stack = [
	{ k: "AUTHORING", v: "Typst" },
	{ k: "COMPILE",   v: "typst-cli → PDF" },
	{ k: "PARSING",   v: "PyMuPDF" },
	{ k: "EMBEDS",    v: "OpenAI text-embedding-3" },
	{ k: "INDEX",     v: "FAISS" },
	{ k: "CHAT",      v: "GPT-4 + RAG" },
	{ k: "FRONTEND",  v: "Next.js" },
];

const roster = [
	{ seat: "A1", name: "Trevor Flahardy", role: "Lead · Pipeline & RAG" },
	{ seat: "A2", name: "UF CNT 4007",     role: "Source course" },
	{ seat: "B1", name: "OpenAI API",      role: "Embeds + chat" },
	{ seat: "B2", name: "FAISS",           role: "Vector retrieval" },
	{ seat: "C1", name: "Typst",           role: "Authoring format" },
	{ seat: "C2", name: "Next.js",         role: "UI layer" },
];
</script>

<template>
	<div class="chalk-hall">
		<div class="chalk-bg" aria-hidden="true">
			<div class="chalk-bg__noise" />
			<div class="chalk-bg__vignette" />
		</div>

		<header class="chalk-head">
			<div class="chalk-head__course">
				<span class="course-label">CNT 4007 · COMPUTER NETWORKS</span>
				<span class="course-date">LECTURE XIV · Apr. 19</span>
			</div>
			<h1 class="chalk-title">
				<span class="underline-wave">C·N·T</span> Study Hub
			</h1>
			<p class="chalk-sub">
				a Typst-to-RAG pipeline for class notes — authored in markup,
				compiled to PDF, embedded into a vector store, served as a tutor.
			</p>
		</header>

		<section class="chalk-section">
			<h2 class="section-title">
				<span class="section-num">§1</span> Pipeline
			</h2>
			<p class="section-lede">
				The idea: write once, read seven ways. Source → compiler → PDF → chunks →
				vectors → index → features. Each arrow is a boundary; every boundary is
				an invariant we can test.
			</p>

			<ol class="pipeline-board">
				<li v-for="(p, i) in pipeline" :key="p.k" class="pipe-step" :style="{ '--i': i }">
					<div class="pipe-step__num">{{ p.n }}</div>
					<div class="pipe-step__body">
						<div class="pipe-step__row">
							<span class="pipe-step__k">{{ p.k }}</span>
							<span class="pipe-step__s">— {{ p.s }}</span>
						</div>
						<p class="pipe-step__b">{{ p.b }}</p>
					</div>
					<svg v-if="i !== pipeline.length - 1" class="pipe-arrow" viewBox="0 0 40 14" fill="none" aria-hidden="true">
						<path d="M 1 7 C 8 2, 14 12, 20 7 S 32 2, 38 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
						<path d="M 34 3 L 38 7 L 34 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</li>
			</ol>
		</section>

		<section class="chalk-section">
			<h2 class="section-title">
				<span class="section-num">§2</span> Features
			</h2>

			<div class="feature-board">
				<article v-for="(f, i) in features" :key="f.title" class="feature-card">
					<span class="feature-card__pin" aria-hidden="true" />
					<h3 class="feature-card__title">{{ f.title }}</h3>
					<p class="feature-card__body">{{ f.body }}</p>
					<span class="feature-card__tag">Ex. {{ i + 1 }}</span>
				</article>
			</div>

			<aside class="chalk-margin">
				<span class="chalk-margin__arrow">↵</span>
				<p>
					Every answer is <em>grounded</em>: the retriever returns exact passages
					& pages so citations aren't hallucinated — they point back to the PDF.
				</p>
			</aside>
		</section>

		<section class="chalk-section">
			<h2 class="section-title">
				<span class="section-num">§3</span> Tech Stack
			</h2>
			<div class="stack-board">
				<div v-for="s in stack" :key="s.k" class="stack-row">
					<span class="stack-k">{{ s.k }}</span>
					<span class="stack-dots" />
					<span class="stack-v">{{ s.v }}</span>
				</div>
			</div>
		</section>

		<section class="chalk-section">
			<h2 class="section-title">
				<span class="section-num">§4</span> Seating Chart
			</h2>
			<p class="section-lede">Who (and what) is in the room.</p>

			<div class="seating">
				<div v-for="r in roster" :key="r.seat" class="seat">
					<span class="seat__num">{{ r.seat }}</span>
					<span class="seat__name">{{ r.name }}</span>
					<span class="seat__role">{{ r.role }}</span>
				</div>
			</div>
		</section>

		<footer class="chalk-foot">
			<span class="erase-line" aria-hidden="true" />
			<p class="foot-txt">
				— end of lecture. see <a :href="`https://github.com/trevorflahardy`">github.com / trevorflahardy</a> for the full source. —
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
	--board: #14342a;
	--board-2: #0e261f;
	--chalk: #f1ede0;
	--chalk-soft: rgba(241, 237, 224, 0.72);
	--chalk-mute: rgba(241, 237, 224, 0.5);
	--chalk-faint: rgba(241, 237, 224, 0.3);
	--chalk-yellow: #f2d46b;
	--chalk-pink: #e8a2b8;
	--chalk-blue: #9ec7e5;
	--rule: rgba(241, 237, 224, 0.2);

	position: relative;
	width: 100%;
	min-height: 100vh;
	background: var(--board);
	color: var(--chalk);
	font-family: "Caveat", "Segoe Script", "Marker Felt", cursive;
	overflow: hidden;
	padding-bottom: 6rem;
}

.chalk-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.chalk-bg__noise {
	position: absolute; inset: 0;
	background:
		radial-gradient(ellipse at 20% 30%, rgba(241, 237, 224, 0.05), transparent 40%),
		radial-gradient(ellipse at 80% 70%, rgba(241, 237, 224, 0.04), transparent 40%),
		radial-gradient(circle at 40% 80%, rgba(241, 237, 224, 0.03), transparent 30%);
}
.chalk-bg__vignette {
	position: absolute; inset: 0;
	background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.35) 100%);
}

.chalk-head {
	position: relative; z-index: 2;
	padding: 4rem clamp(1.5rem, 5vw, 4rem) 2rem;
	border-bottom: 1px dashed var(--rule);
}
.chalk-head__course {
	display: flex; justify-content: space-between; align-items: baseline;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.7rem; letter-spacing: 0.22em;
	color: var(--chalk-mute);
	text-transform: uppercase;
	margin-bottom: 1.25rem;
}
.chalk-title {
	font-family: "Caveat", cursive;
	font-size: clamp(3rem, 8vw, 5.5rem);
	margin: 0 0 0.75rem;
	color: var(--chalk);
	letter-spacing: 0.01em;
	line-height: 1;
	text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
}
.underline-wave {
	position: relative;
	padding-bottom: 0.1em;
	color: var(--chalk-yellow);
}
.underline-wave::after {
	content: "";
	position: absolute; left: 0; right: 0; bottom: -0.05em;
	height: 10px;
	background-image: radial-gradient(circle, var(--chalk-yellow) 20%, transparent 22%);
	background-size: 8px 8px;
	background-repeat: repeat-x;
	opacity: 0.75;
}
.chalk-sub {
	font-family: "Caveat", cursive;
	font-size: 1.35rem;
	color: var(--chalk-soft);
	max-width: 56ch;
	line-height: 1.35;
	margin: 0;
}

.chalk-section {
	position: relative; z-index: 2;
	padding: 3rem clamp(1.5rem, 5vw, 4rem);
	border-bottom: 1px dashed var(--rule);
}
.section-title {
	display: flex; align-items: baseline; gap: 0.8rem;
	font-family: "Caveat", cursive;
	font-size: 2.2rem;
	margin: 0 0 0.75rem;
	color: var(--chalk);
}
.section-num {
	font-family: "SF Mono", monospace;
	font-size: 0.85rem;
	letter-spacing: 0.18em;
	color: var(--chalk-pink);
	align-self: start;
	margin-top: 0.7rem;
}
.section-lede {
	font-family: "Caveat", cursive;
	font-size: 1.25rem;
	color: var(--chalk-soft);
	max-width: 60ch;
	line-height: 1.4;
	margin: 0 0 1.75rem;
}

.pipeline-board {
	list-style: none;
	margin: 0; padding: 0;
	display: flex;
	flex-direction: column;
	gap: 0;
}
.pipe-step {
	position: relative;
	display: grid;
	grid-template-columns: 2.8rem 1fr;
	gap: 1rem;
	padding: 1.1rem 0;
	border-top: 1px dashed var(--rule);
	animation: chalk-draw 520ms ease-out both;
	animation-delay: calc(var(--i, 0) * 80ms);
}
.pipe-step:last-child { border-bottom: 1px dashed var(--rule); }
@keyframes chalk-draw {
	from { opacity: 0; transform: translateX(-6px); }
	to   { opacity: 1; transform: translateX(0); }
}
.pipe-step__num {
	font-family: "Caveat", cursive;
	font-size: 1.6rem;
	color: var(--chalk-yellow);
	line-height: 1;
	padding-top: 0.3rem;
}
.pipe-step__row { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.6rem; }
.pipe-step__k {
	font-family: "SF Mono", monospace;
	font-size: 0.78rem;
	letter-spacing: 0.18em;
	color: var(--chalk);
}
.pipe-step__s {
	font-family: "Caveat", cursive;
	font-size: 1.2rem;
	color: var(--chalk-blue);
}
.pipe-step__b {
	font-family: "Caveat", cursive;
	font-size: 1.2rem;
	line-height: 1.4;
	color: var(--chalk-soft);
	margin: 0.35rem 0 0;
	max-width: 64ch;
}
.pipe-arrow {
	position: absolute;
	left: 1rem; bottom: -0.65rem;
	width: 40px; height: 14px;
	color: var(--chalk-pink);
	z-index: 3;
}

.feature-board {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 1.5rem;
}
.feature-card {
	position: relative;
	padding: 1.5rem 1.25rem 1.1rem;
	background: rgba(241, 237, 224, 0.04);
	border: 1px dashed var(--rule);
	border-radius: 2px;
	transform: rotate(-0.4deg);
}
.feature-card:nth-child(2) { transform: rotate(0.6deg); }
.feature-card:nth-child(3) { transform: rotate(-0.2deg); }
.feature-card__pin {
	position: absolute; top: -0.5rem; left: 50%;
	transform: translateX(-50%);
	width: 0.65rem; height: 0.65rem;
	border-radius: 9999px;
	background: var(--chalk-pink);
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.35);
}
.feature-card__title {
	font-family: "Caveat", cursive;
	font-size: 1.7rem;
	margin: 0 0 0.35rem;
	color: var(--chalk-yellow);
}
.feature-card__body {
	font-family: "Caveat", cursive;
	font-size: 1.15rem;
	line-height: 1.35;
	color: var(--chalk-soft);
	margin: 0 0 0.9rem;
}
.feature-card__tag {
	font-family: "SF Mono", monospace;
	font-size: 0.65rem;
	letter-spacing: 0.2em;
	color: var(--chalk-faint);
}

.chalk-margin {
	display: flex;
	gap: 0.75rem;
	margin-top: 2rem;
	padding-left: 1rem;
	border-left: 2px solid var(--chalk-pink);
	max-width: 58ch;
}
.chalk-margin__arrow {
	font-family: "Caveat", cursive;
	font-size: 1.8rem;
	color: var(--chalk-pink);
	line-height: 1;
}
.chalk-margin p {
	font-family: "Caveat", cursive;
	font-size: 1.2rem;
	color: var(--chalk-pink);
	margin: 0;
	line-height: 1.4;
}
.chalk-margin em { color: var(--chalk-yellow); font-style: normal; }

.stack-board {
	max-width: 620px;
}
.stack-row {
	display: flex; align-items: baseline; gap: 0.75rem;
	padding: 0.7rem 0;
	border-bottom: 1px dashed var(--rule);
}
.stack-k {
	font-family: "SF Mono", monospace;
	font-size: 0.72rem;
	letter-spacing: 0.22em;
	color: var(--chalk-blue);
	min-width: 7.5rem;
}
.stack-dots {
	flex: 1;
	border-bottom: 1px dotted var(--chalk-faint);
	transform: translateY(-3px);
}
.stack-v {
	font-family: "Caveat", cursive;
	font-size: 1.35rem;
	color: var(--chalk);
}

.seating {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 0.9rem;
}
.seat {
	display: flex; flex-direction: column; gap: 0.25rem;
	padding: 0.9rem 1rem;
	border: 1px dashed var(--rule);
	border-radius: 3px;
	background: rgba(241, 237, 224, 0.03);
}
.seat__num {
	font-family: "SF Mono", monospace;
	font-size: 0.68rem; letter-spacing: 0.2em;
	color: var(--chalk-yellow);
}
.seat__name {
	font-family: "Caveat", cursive;
	font-size: 1.4rem;
	color: var(--chalk);
	line-height: 1;
}
.seat__role {
	font-family: "Caveat", cursive;
	font-size: 1.1rem;
	color: var(--chalk-soft);
}

.chalk-foot {
	position: relative; z-index: 2;
	padding: 3rem clamp(1.5rem, 5vw, 4rem) 2rem;
	text-align: center;
}
.erase-line {
	display: block;
	height: 8px;
	margin: 0 auto 1.25rem;
	max-width: 420px;
	background:
		linear-gradient(90deg,
			transparent 0%,
			rgba(241, 237, 224, 0.15) 20%,
			rgba(241, 237, 224, 0.3) 50%,
			rgba(241, 237, 224, 0.15) 80%,
			transparent 100%);
	filter: blur(1px);
}
.foot-txt {
	font-family: "Caveat", cursive;
	font-size: 1.3rem;
	color: var(--chalk-mute);
	margin: 0;
}
.foot-txt a {
	color: var(--chalk-blue);
	text-decoration: underline;
	text-decoration-style: dotted;
}

.ledge {
	position: absolute;
	bottom: 0; left: 0; right: 0;
	height: 2.25rem;
	z-index: 3;
	background:
		linear-gradient(to bottom, #3a2a1c 0%, #2b1d12 45%, #1a110a 100%);
	box-shadow:
		0 -6px 16px rgba(0, 0, 0, 0.45),
		inset 0 1px 0 rgba(255, 255, 255, 0.06);
	display: flex; align-items: center; gap: 1rem;
	padding: 0 clamp(1.5rem, 5vw, 4rem);
}
.chalk-stick {
	display: inline-block;
	width: 3rem; height: 0.55rem;
	border-radius: 1px;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4);
}
.chalk-stick--a { background: #f1ede0; transform: rotate(-4deg); }
.chalk-stick--b { background: var(--chalk-yellow); transform: rotate(3deg); width: 2.3rem; }
.eraser {
	display: inline-block;
	width: 2.2rem; height: 1rem;
	background: linear-gradient(to bottom, #5d3c22 0%, #3d2614 100%);
	border-radius: 2px;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 1px 3px rgba(0, 0, 0, 0.5);
	margin-left: auto;
}

@media (prefers-reduced-motion: reduce) {
	.pipe-step { animation: none; }
}
</style>
