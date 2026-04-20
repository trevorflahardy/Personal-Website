<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const caretOn = ref(true);
let caretTimer: number | undefined;

onMounted(() => {
	caretTimer = window.setInterval(() => {
		caretOn.value = !caretOn.value;
	}, 560);
});
onBeforeUnmount(() => {
	if (caretTimer) window.clearInterval(caretTimer);
});

const sourceLines = [
	{ n: 1, t: "# Docuflow", c: "h1" },
	{ n: 2, t: "", c: "empty" },
	{ n: 3, t: "> Write MDX. Run a command. Ship docs.", c: "quote" },
	{ n: 4, t: "", c: "empty" },
	{ n: 5, t: "## Why it exists", c: "h2" },
	{ n: 6, t: "", c: "empty" },
	{ n: 7, t: "Documentation tools force you to choose between", c: "p" },
	{ n: 8, t: "**flexibility** and **simplicity**. Docuflow refuses", c: "p" },
	{ n: 9, t: "the trade — it is *both*, by design.", c: "p" },
	{ n: 10, t: "", c: "empty" },
	{ n: 11, t: "```bash", c: "fence" },
	{ n: 12, t: "$ npx docuflow init", c: "code" },
	{ n: 13, t: "$ npx docuflow build", c: "code" },
	{ n: 14, t: "```", c: "fence" },
	{ n: 15, t: "", c: "empty" },
	{ n: 16, t: "## Pillars", c: "h2" },
	{ n: 17, t: "", c: "empty" },
	{ n: 18, t: "- Author in MDX — Markdown + JSX.", c: "li" },
	{ n: 19, t: "- Built on React + Vite (HMR in ms).", c: "li" },
	{ n: 20, t: "- Single CLI, zero webpack configs.", c: "li" },
	{ n: 21, t: "- Static output — deploy anywhere.", c: "li" },
	{ n: 22, t: "", c: "empty" },
	{ n: 23, t: "[→ github.com/trevorflahardy/docuflow]", c: "link" },
];

const pillars = [
	{ title: "Author in MDX", body: "Markdown for prose, JSX when static text won't cut it. Import shared components, embed interactive examples, keep docs alive." },
	{ title: "React + Vite", body: "HMR in milliseconds, production builds in seconds. The full React ecosystem is one import away." },
	{ title: "One CLI", body: "`docuflow init`, `docuflow build`. No webpack config, no boilerplate, no bikeshedding." },
	{ title: "Static Output", body: "A folder of HTML, CSS, and JS. Drop it on Pages, Netlify, Vercel, S3, or a Raspberry Pi in your closet." },
];
</script>

<template>
	<div class="docuflow-world">
		<div class="docuflow-bg" aria-hidden="true">
			<div class="docuflow-bg__grid" />
			<div class="docuflow-bg__gradient" />
		</div>

		<div class="docuflow-chrome">
			<div class="chrome-dots">
				<span class="chrome-dot chrome-dot--r" />
				<span class="chrome-dot chrome-dot--y" />
				<span class="chrome-dot chrome-dot--g" />
			</div>
			<div class="chrome-tabs">
				<span class="chrome-tab chrome-tab--active">README.mdx</span>
				<span class="chrome-tab">preview</span>
			</div>
			<div class="chrome-meta">
				<span class="chrome-meta-pill">utf-8</span>
				<span class="chrome-meta-pill">mdx</span>
				<span class="chrome-meta-pill chrome-meta-pill--live">● live</span>
			</div>
		</div>

		<div class="docuflow-split">
			<section class="docuflow-pane docuflow-pane--source" aria-label="Source">
				<header class="pane-head">
					<span class="pane-head__label">source</span>
					<span class="pane-head__path">docs / index.mdx</span>
				</header>
				<div class="source-scroll">
					<pre class="source-code"><code><template v-for="line in sourceLines" :key="line.n"><span class="ln">{{ String(line.n).padStart(2, " ") }}</span><span class="src-line" :class="`src-line--${line.c}`">{{ line.t || " " }}</span><br/></template><span class="ln">{{ String(sourceLines.length + 1).padStart(2, " ") }}</span><span class="caret" :class="{ 'caret--off': !caretOn }">▌</span></code></pre>
				</div>
			</section>

			<div class="docuflow-divider" aria-hidden="true">
				<span class="divider-grab" />
			</div>

			<section class="docuflow-pane docuflow-pane--preview" aria-label="Preview">
				<header class="pane-head">
					<span class="pane-head__label">preview</span>
					<span class="pane-head__path">rendered</span>
				</header>
				<div class="preview-scroll">
					<article class="preview-doc">
						<p class="preview-kicker">Open Source Project</p>
						<h1 class="preview-h1">Docuflow</h1>
						<p class="preview-lede">
							A documentation generator for developers who want to ship great docs
							without fighting their toolchain.
						</p>

						<hr class="preview-rule" />

						<h2 class="preview-h2">Why it exists</h2>
						<p class="preview-p">
							Documentation tools force you to choose between
							<strong>flexibility</strong> and <strong>simplicity</strong>.
							Docuflow refuses the trade — it is <em>both</em>, by design.
						</p>

						<pre class="preview-code"><code><span class="preview-code__prompt">$</span> npx docuflow init
<span class="preview-code__prompt">$</span> npx docuflow build</code></pre>

						<h2 class="preview-h2">Pillars</h2>
						<div class="preview-pillars">
							<div v-for="p in pillars" :key="p.title" class="preview-pillar">
								<h3 class="preview-pillar__title">{{ p.title }}</h3>
								<p class="preview-pillar__body">{{ p.body }}</p>
							</div>
						</div>

						<h2 class="preview-h2">Status</h2>
						<p class="preview-p preview-p--muted">
							Docuflow is in early development. Some features shown here
							represent the planned final state — they are still being built.
						</p>

						<div class="preview-links">
							<a class="preview-link" href="https://github.com/trevorflahardy/docuflow" target="_blank" rel="noreferrer noopener">
								<span class="preview-link__arrow">→</span>
								github.com / trevorflahardy / docuflow
							</a>
						</div>
					</article>
				</div>
			</section>
		</div>

		<footer class="docuflow-statusbar">
			<div class="sb-cluster">
				<span class="sb-item sb-item--ok">● compiled</span>
				<span class="sb-item">Ln 24, Col 1</span>
				<span class="sb-item">Spaces: 2</span>
			</div>
			<div class="sb-cluster">
				<span class="sb-item">MDX</span>
				<span class="sb-item">v0.4.2</span>
				<span class="sb-item sb-item--accent">docuflow</span>
			</div>
		</footer>
	</div>
</template>

<style scoped>
.docuflow-world {
	--paper: #f3efe7;
	--paper-2: #ece6d8;
	--ink: #1a1d24;
	--ink-2: #303540;
	--mute: #6a6f7a;
	--rule: rgba(26, 29, 36, 0.12);
	--accent: #2f6bff;
	--accent-soft: #e6eeff;
	--accent-ink: #0b2b7a;
	--syntax-heading: #8b2a1f;
	--syntax-punct: #a87e2a;
	--syntax-str: #2a6b3b;
	--syntax-kw: #2f6bff;
	--syntax-mute: #9a8e73;

	position: relative;
	width: 100%;
	min-height: 100vh;
	background: var(--paper);
	color: var(--ink);
	font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
	display: grid;
	grid-template-rows: auto 1fr auto;
	overflow: hidden;
}

.docuflow-bg {
	position: absolute;
	inset: 0;
	z-index: 0;
	pointer-events: none;
}
.docuflow-bg__grid {
	position: absolute;
	inset: 0;
	background-image:
		linear-gradient(to right, rgba(26, 29, 36, 0.04) 1px, transparent 1px),
		linear-gradient(to bottom, rgba(26, 29, 36, 0.04) 1px, transparent 1px);
	background-size: 28px 28px;
	mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}
.docuflow-bg__gradient {
	position: absolute;
	inset: 0;
	background: radial-gradient(1100px 600px at 70% 0%, rgba(47, 107, 255, 0.08), transparent 60%);
}

.docuflow-chrome {
	position: relative;
	z-index: 2;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0.75rem 1.25rem;
	background: var(--paper-2);
	border-bottom: 1px solid var(--rule);
}
.chrome-dots { display: inline-flex; gap: 0.4rem; }
.chrome-dot { width: 0.65rem; height: 0.65rem; border-radius: 9999px; display: inline-block; }
.chrome-dot--r { background: #e56765; }
.chrome-dot--y { background: #e5c265; }
.chrome-dot--g { background: #80c97a; }

.chrome-tabs { display: inline-flex; gap: 0.35rem; flex: 1; margin-left: 0.75rem; }
.chrome-tab {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.72rem;
	padding: 0.28rem 0.7rem;
	border-radius: 0.45rem 0.45rem 0 0;
	color: var(--mute);
	border: 1px solid transparent;
	border-bottom: none;
}
.chrome-tab--active {
	color: var(--ink);
	background: var(--paper);
	border-color: var(--rule);
}
.chrome-meta { display: inline-flex; gap: 0.35rem; }
.chrome-meta-pill {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.65rem;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 0.22rem 0.55rem;
	border-radius: 9999px;
	border: 1px solid var(--rule);
	color: var(--mute);
	background: var(--paper);
}
.chrome-meta-pill--live { color: var(--accent); border-color: rgba(47, 107, 255, 0.3); }

.docuflow-split {
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.25fr);
	min-height: 0;
}
@media (max-width: 960px) {
	.docuflow-split { grid-template-columns: 1fr; grid-template-rows: auto auto auto; }
	.docuflow-divider { display: none; }
}

.docuflow-pane { display: flex; flex-direction: column; min-height: 0; min-width: 0; }
.docuflow-pane--source { background: var(--paper); border-right: 1px solid var(--rule); }
.docuflow-pane--preview { background: var(--paper); }

.pane-head {
	display: flex;
	align-items: baseline;
	gap: 0.6rem;
	padding: 0.65rem 1rem;
	border-bottom: 1px solid var(--rule);
	background: rgba(236, 230, 216, 0.5);
}
.pane-head__label {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.62rem;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--accent);
}
.pane-head__path {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.7rem;
	color: var(--mute);
}

.source-scroll, .preview-scroll { overflow-y: auto; flex: 1; min-height: 0; }
.source-scroll::-webkit-scrollbar, .preview-scroll::-webkit-scrollbar { width: 10px; }
.source-scroll::-webkit-scrollbar-thumb, .preview-scroll::-webkit-scrollbar-thumb {
	background: rgba(26, 29, 36, 0.18); border-radius: 9999px;
}

.source-code {
	margin: 0;
	padding: 1.25rem 1.25rem 6rem 0.5rem;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.82rem;
	line-height: 1.72;
	color: var(--ink-2);
	white-space: pre-wrap;
	word-break: break-word;
}
.ln {
	display: inline-block;
	width: 2.5rem;
	text-align: right;
	padding-right: 0.9rem;
	color: rgba(26, 29, 36, 0.28);
	user-select: none;
}
.src-line--h1 { color: var(--syntax-heading); font-weight: 700; }
.src-line--h2 { color: var(--syntax-heading); font-weight: 600; }
.src-line--quote { color: var(--syntax-mute); font-style: italic; }
.src-line--li { color: var(--ink-2); }
.src-line--fence { color: var(--syntax-punct); }
.src-line--code { color: var(--syntax-str); }
.src-line--link { color: var(--accent); }
.src-line--empty { color: transparent; }

.caret { color: var(--accent); margin-left: 0.1rem; transition: opacity 120ms; }
.caret--off { opacity: 0; }

.docuflow-divider {
	width: 1px;
	background: var(--rule);
	position: relative;
}
.divider-grab {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 4px;
	height: 36px;
	border-radius: 9999px;
	background: rgba(26, 29, 36, 0.18);
}

.preview-doc {
	max-width: 720px;
	margin: 0 auto;
	padding: 3rem 2.5rem 6rem;
}
.preview-kicker {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.68rem;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--mute);
	margin: 0 0 0.7rem;
}
.preview-h1 {
	font-family: "Fraunces", "Times New Roman", serif;
	font-size: clamp(2.2rem, 5vw, 3.4rem);
	font-weight: 600;
	letter-spacing: -0.02em;
	line-height: 1.05;
	color: var(--ink);
	margin: 0 0 0.9rem;
}
.preview-lede {
	font-size: 1.05rem;
	line-height: 1.6;
	color: var(--ink-2);
	margin: 0 0 1.5rem;
	max-width: 56ch;
}
.preview-rule {
	border: none;
	border-top: 1px solid var(--rule);
	margin: 1.75rem 0;
}
.preview-h2 {
	font-family: "Fraunces", "Times New Roman", serif;
	font-size: 1.45rem;
	font-weight: 600;
	letter-spacing: -0.01em;
	color: var(--ink);
	margin: 2rem 0 0.75rem;
}
.preview-p {
	font-size: 0.95rem;
	line-height: 1.7;
	color: var(--ink-2);
	margin: 0 0 1rem;
}
.preview-p--muted { color: var(--mute); font-style: italic; }
.preview-p strong { color: var(--ink); }
.preview-p em { color: var(--accent-ink); }

.preview-code {
	background: var(--ink);
	color: #d7dce6;
	border-radius: 0.6rem;
	padding: 0.95rem 1.1rem;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.82rem;
	line-height: 1.7;
	margin: 0 0 1.25rem;
	overflow-x: auto;
}
.preview-code__prompt { color: #7aa6ff; margin-right: 0.5rem; }

.preview-pillars {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 0.85rem;
	margin: 0.5rem 0 1.5rem;
}
.preview-pillar {
	padding: 1rem 1.1rem;
	border: 1px solid var(--rule);
	border-radius: 0.55rem;
	background: rgba(255, 255, 255, 0.55);
}
.preview-pillar__title {
	font-family: "Fraunces", serif;
	font-size: 1rem;
	font-weight: 600;
	margin: 0 0 0.35rem;
	color: var(--ink);
}
.preview-pillar__body {
	font-size: 0.84rem;
	line-height: 1.55;
	color: var(--ink-2);
	margin: 0;
}

.preview-links { margin-top: 1.5rem; }
.preview-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.8rem;
	color: var(--accent);
	text-decoration: none;
	padding: 0.55rem 0.9rem;
	border: 1px solid rgba(47, 107, 255, 0.3);
	border-radius: 9999px;
	background: var(--accent-soft);
	transition: transform 180ms ease, background 180ms ease;
}
.preview-link:hover { transform: translateX(3px); background: #d6e3ff; }
.preview-link__arrow { transition: transform 180ms ease; }
.preview-link:hover .preview-link__arrow { transform: translateX(3px); }

.docuflow-statusbar {
	position: relative;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	padding: 0.4rem 1.25rem;
	background: var(--ink);
	color: #c9cfda;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.7rem;
}
.sb-cluster { display: inline-flex; gap: 1rem; }
.sb-item { letter-spacing: 0.04em; }
.sb-item--ok { color: #80c97a; }
.sb-item--accent { color: #7aa6ff; }

@media (prefers-reduced-motion: reduce) {
	.caret { animation: none; }
}
</style>
