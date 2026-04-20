<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { marked } from "marked";

const initialMarkdown = `# Docuflow

> Write MDX. Run a command. Ship docs.

## Why it exists

Documentation tools force you to choose between **flexibility** and **simplicity**. Docuflow refuses the trade — it is *both*, by design.

\`\`\`bash
$ npx docuflow init
$ npx docuflow build
\`\`\`

## Pillars

- Author in MDX — Markdown + JSX.
- Built on React + Vite (HMR in milliseconds).
- Single CLI, zero webpack configs.
- Static output — deploy anywhere.

## Status

Docuflow is in early development. Some features represent the planned final state — they are still being built.

[→ github.com/trevorflahardy/docuflow](https://github.com/trevorflahardy/docuflow)
`;

const markdownSource = ref(initialMarkdown);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const lineNumsRef = ref<HTMLPreElement | null>(null);

const renderedHtml = computed(() => marked.parse(markdownSource.value) as string);

const cursorLine = ref(1);
const cursorCol = ref(1);

function updateCursor() {
	const el = textareaRef.value;
	if (!el) return;
	const text = el.value.substring(0, el.selectionStart);
	const lines = text.split("\n");
	cursorLine.value = lines.length;
	cursorCol.value = lines[lines.length - 1].length + 1;
}

function syncLineNums() {
	if (lineNumsRef.value && textareaRef.value) {
		lineNumsRef.value.scrollTop = textareaRef.value.scrollTop;
	}
}

const lineNumsContent = computed(() =>
	markdownSource.value.split("\n").map((_, i) => String(i + 1).padStart(2, " ")).join("\n")
);

onMounted(async () => {
	await nextTick();
	updateCursor();
});
</script>

<template>
	<div class="docuflow-world">
		<div class="docuflow-bg" aria-hidden="true">
			<div class="docuflow-bg__grid" />
			<div class="docuflow-bg__gradient" />
		</div>

		<!-- Editor section — fills one full viewport height -->
		<div class="docuflow-editor-section">
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
				<!-- Editable source pane -->
				<section class="docuflow-pane docuflow-pane--source" aria-label="Source">
					<header class="pane-head">
						<span class="pane-head__label">source</span>
						<span class="pane-head__path">docs / index.mdx</span>
					</header>
					<div class="source-edit-wrap">
						<pre class="line-nums" ref="lineNumsRef" aria-hidden="true">{{ lineNumsContent }}</pre>
						<textarea
							ref="textareaRef"
							v-model="markdownSource"
							class="source-textarea"
							@scroll="syncLineNums"
							@keyup="updateCursor"
							@mouseup="updateCursor"
							@click="updateCursor"
							spellcheck="false"
							autocomplete="off"
							autocorrect="off"
						/>
					</div>
				</section>

				<div class="docuflow-divider" aria-hidden="true">
					<span class="divider-grab" />
				</div>

				<!-- Live preview pane -->
				<section class="docuflow-pane docuflow-pane--preview" aria-label="Preview">
					<header class="pane-head">
						<span class="pane-head__label">preview</span>
						<span class="pane-head__path">rendered</span>
					</header>
					<div class="preview-scroll">
						<div v-html="renderedHtml" class="preview-doc" />
					</div>
				</section>
			</div>

			<footer class="docuflow-statusbar">
				<div class="sb-cluster">
					<span class="sb-item sb-item--ok">● compiled</span>
					<span class="sb-item">Ln {{ cursorLine }}, Col {{ cursorCol }}</span>
					<span class="sb-item">Spaces: 2</span>
				</div>
				<div class="sb-cluster">
					<span class="sb-item">MDX</span>
					<span class="sb-item">v0.4.2</span>
					<span class="sb-item sb-item--accent">docuflow</span>
				</div>
			</footer>
		</div>

		<!-- Content sections below the editor -->
		<div class="docuflow-sections">

			<!-- How it works -->
			<section class="ds-section">
				<div class="ds-section__inner">
					<p class="ds-kicker">The loop</p>
					<h2 class="ds-heading">Write, preview, ship.</h2>
					<p class="ds-sub">Docuflow collapses the typical docs workflow — MDX authoring, live reload, and a static build — into a single tool with no configuration overhead.</p>

					<div class="ds-steps">
						<div class="ds-step">
							<span class="ds-step__n">01</span>
							<div>
								<p class="ds-step__title">Author in MDX</p>
								<p class="ds-step__body">Write prose in Markdown, drop in JSX components when static text won't cut it. Import shared React components, embed interactive examples, keep docs alive alongside the code.</p>
							</div>
						</div>
						<div class="ds-step">
							<span class="ds-step__n">02</span>
							<div>
								<p class="ds-step__title">Instant hot reload</p>
								<p class="ds-step__body">Vite's HMR means every keystroke reflects in the browser in milliseconds — no full refresh, no lost scroll position, no waiting.</p>
							</div>
						</div>
						<div class="ds-step">
							<span class="ds-step__n">03</span>
							<div>
								<p class="ds-step__title">One command to ship</p>
								<p class="ds-step__body"><code class="ds-inline-code">docuflow build</code> emits a folder of HTML, CSS, and JS. Drop it on GitHub Pages, Netlify, Vercel, S3, or a Raspberry Pi in your closet.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Screenshots -->
			<section class="ds-section ds-section--dark">
				<div class="ds-section__inner">
					<p class="ds-kicker ds-kicker--light">In the browser</p>
					<h2 class="ds-heading ds-heading--light">What it looks like.</h2>
					<p class="ds-sub ds-sub--light">The generated output is a clean static site — fast, accessible, and completely yours to style.</p>

					<div class="ds-screenshots">
						<figure class="ds-fig">
							<img src="/docuflow-home.png" alt="Docuflow project home page screenshot" class="ds-fig__img" />
							<figcaption class="ds-fig__cap">Home page — project landing generated from <code>index.mdx</code></figcaption>
						</figure>
						<figure class="ds-fig">
							<img src="/docuflow-docs.png" alt="Docuflow docs page screenshot" class="ds-fig__img" />
							<figcaption class="ds-fig__cap">Docs page — sidebar nav + MDX content with component islands</figcaption>
						</figure>
					</div>
				</div>
			</section>

			<!-- Tech stack -->
			<section class="ds-section">
				<div class="ds-section__inner">
					<p class="ds-kicker">Under the hood</p>
					<h2 class="ds-heading">Built on things that last.</h2>
					<p class="ds-sub">No abandoned dependencies, no bespoke build graphs. Docuflow sits on top of the React and Vite ecosystems — tools with a long runway.</p>

					<div class="ds-tech-grid">
						<div class="ds-tech">
							<span class="ds-tech__name">React 19</span>
							<p class="ds-tech__desc">Component model for dynamic doc islands — tabs, code playgrounds, interactive diagrams.</p>
						</div>
						<div class="ds-tech">
							<span class="ds-tech__name">Vite 6</span>
							<p class="ds-tech__desc">Sub-100ms HMR, tree-shaking, and production builds. Zero webpack config — ever.</p>
						</div>
						<div class="ds-tech">
							<span class="ds-tech__name">MDX 3</span>
							<p class="ds-tech__desc">Markdown that compiles to JSX. Import components, export data, keep prose readable.</p>
						</div>
						<div class="ds-tech">
							<span class="ds-tech__name">Static output</span>
							<p class="ds-tech__desc">Pure HTML/CSS/JS. No server required. Serve from any CDN or static host.</p>
						</div>
					</div>

					<div class="ds-cta">
						<a href="https://github.com/trevorflahardy/docuflow" target="_blank" rel="noreferrer" class="ds-cta__link">
							<span class="ds-cta__arrow">→</span>
							View on GitHub
						</a>
					</div>
				</div>
			</section>

		</div>
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

	position: relative;
	width: 100%;
	min-height: 100vh;
	background: var(--paper);
	color: var(--ink);
	font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
	overflow-y: auto;
}

.docuflow-bg {
	position: fixed;
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

/* Editor section — occupies at least one full viewport */
.docuflow-editor-section {
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
}

.docuflow-chrome {
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
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.25fr);
	min-height: 0;
}
@media (max-width: 960px) {
	.docuflow-split { grid-template-columns: 1fr; grid-template-rows: 400px auto 400px; }
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
	flex-shrink: 0;
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

/* Editable source pane */
.source-edit-wrap {
	position: relative;
	display: flex;
	flex: 1;
	min-height: 0;
	overflow: hidden;
}

.line-nums {
	flex-shrink: 0;
	width: 3rem;
	padding: 1.25rem 0.5rem 6rem 0.25rem;
	margin: 0;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.82rem;
	line-height: 1.72;
	color: rgba(26, 29, 36, 0.28);
	text-align: right;
	user-select: none;
	overflow: hidden;
	white-space: pre;
	background: var(--paper);
	border-right: 1px solid rgba(26, 29, 36, 0.07);
}

.source-textarea {
	flex: 1;
	min-width: 0;
	padding: 1.25rem 1.25rem 6rem 0.75rem;
	margin: 0;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.82rem;
	line-height: 1.72;
	color: var(--ink-2);
	background: transparent;
	border: none;
	outline: none;
	resize: none;
	white-space: pre;
	overflow-wrap: normal;
	overflow-x: auto;
	overflow-y: auto;
	tab-size: 2;
	caret-color: var(--accent);
}
.source-textarea::selection {
	background: rgba(47, 107, 255, 0.18);
}

/* Preview pane */
.preview-scroll { overflow-y: auto; flex: 1; min-height: 0; }
.preview-scroll::-webkit-scrollbar { width: 10px; }
.preview-scroll::-webkit-scrollbar-thumb {
	background: rgba(26, 29, 36, 0.18); border-radius: 9999px;
}

/* Rendered markdown styles (via v-html) */
.preview-doc {
	max-width: 720px;
	margin: 0 auto;
	padding: 3rem 2.5rem 6rem;
	font-size: 0.95rem;
	line-height: 1.7;
	color: var(--ink-2);
}
.preview-doc :deep(h1) {
	font-family: "Fraunces", "Times New Roman", serif;
	font-size: clamp(2rem, 4vw, 3rem);
	font-weight: 600;
	letter-spacing: -0.02em;
	line-height: 1.1;
	color: var(--ink);
	margin: 0 0 0.9rem;
}
.preview-doc :deep(h2) {
	font-family: "Fraunces", "Times New Roman", serif;
	font-size: 1.45rem;
	font-weight: 600;
	letter-spacing: -0.01em;
	color: var(--ink);
	margin: 2rem 0 0.75rem;
}
.preview-doc :deep(h3) {
	font-family: "Fraunces", serif;
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--ink);
	margin: 1.5rem 0 0.5rem;
}
.preview-doc :deep(p) {
	margin: 0 0 1rem;
}
.preview-doc :deep(blockquote) {
	border-left: 3px solid var(--accent);
	margin: 1.25rem 0;
	padding: 0.6rem 1rem;
	background: rgba(47, 107, 255, 0.05);
	border-radius: 0 0.4rem 0.4rem 0;
	font-style: italic;
	color: var(--mute);
}
.preview-doc :deep(ul), .preview-doc :deep(ol) {
	margin: 0 0 1rem;
	padding-left: 1.5rem;
}
.preview-doc :deep(li) {
	margin-bottom: 0.3rem;
}
.preview-doc :deep(code) {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.82em;
	background: rgba(26, 29, 36, 0.07);
	padding: 0.15em 0.4em;
	border-radius: 0.3rem;
	color: var(--syntax-heading);
}
.preview-doc :deep(pre) {
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
.preview-doc :deep(pre code) {
	background: none;
	padding: 0;
	color: inherit;
	font-size: inherit;
}
.preview-doc :deep(a) {
	color: var(--accent);
	text-decoration: none;
}
.preview-doc :deep(a:hover) {
	text-decoration: underline;
}
.preview-doc :deep(hr) {
	border: none;
	border-top: 1px solid var(--rule);
	margin: 1.75rem 0;
}
.preview-doc :deep(strong) { color: var(--ink); }
.preview-doc :deep(em) { color: var(--accent-ink); }

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

.docuflow-statusbar {
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

/* ===== Content sections ===== */
.docuflow-sections {
	position: relative;
	z-index: 1;
}

.ds-section {
	padding: 5rem 2rem;
	border-top: 1px solid var(--rule);
}
.ds-section--dark {
	background: var(--ink);
	border-top-color: rgba(255, 255, 255, 0.08);
}

.ds-section__inner {
	max-width: 900px;
	margin: 0 auto;
}

.ds-kicker {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.68rem;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: var(--accent);
	margin: 0 0 0.75rem;
}
.ds-kicker--light { color: rgba(255, 255, 255, 0.45); }

.ds-heading {
	font-family: "Fraunces", "Times New Roman", serif;
	font-size: clamp(1.8rem, 3.5vw, 2.8rem);
	font-weight: 600;
	letter-spacing: -0.02em;
	line-height: 1.1;
	color: var(--ink);
	margin: 0 0 0.85rem;
}
.ds-heading--light { color: rgba(255, 255, 255, 0.92); }

.ds-sub {
	font-size: 1rem;
	line-height: 1.65;
	color: var(--mute);
	margin: 0 0 3rem;
	max-width: 56ch;
}
.ds-sub--light { color: rgba(255, 255, 255, 0.52); }

/* Steps */
.ds-steps {
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
}
.ds-step {
	display: flex;
	gap: 1.75rem;
	align-items: flex-start;
}
.ds-step__n {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.68rem;
	letter-spacing: 0.12em;
	color: var(--accent);
	background: var(--accent-soft);
	border: 1px solid rgba(47, 107, 255, 0.25);
	border-radius: 0.4rem;
	padding: 0.3rem 0.55rem;
	flex-shrink: 0;
	margin-top: 0.15rem;
}
.ds-step__title {
	font-size: 1.05rem;
	font-weight: 600;
	color: var(--ink);
	margin: 0 0 0.35rem;
}
.ds-step__body {
	font-size: 0.92rem;
	line-height: 1.65;
	color: var(--mute);
	margin: 0;
}
.ds-inline-code {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.82em;
	background: rgba(26, 29, 36, 0.07);
	padding: 0.15em 0.4em;
	border-radius: 0.3rem;
	color: var(--syntax-heading);
}

/* Screenshots */
.ds-screenshots {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
	gap: 1.5rem;
}
.ds-fig {
	margin: 0;
}
.ds-fig__img {
	width: 100%;
	border-radius: 0.75rem;
	border: 1px solid rgba(255, 255, 255, 0.12);
	display: block;
}
.ds-fig__cap {
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.68rem;
	color: rgba(255, 255, 255, 0.38);
	margin-top: 0.75rem;
	letter-spacing: 0.04em;
}
.ds-fig__cap code {
	background: rgba(255,255,255,0.07);
	padding: 0.1em 0.35em;
	border-radius: 0.25rem;
}

/* Tech grid */
.ds-tech-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin-bottom: 3rem;
}
.ds-tech {
	padding: 1.25rem 1.35rem;
	border: 1px solid var(--rule);
	border-radius: 0.65rem;
	background: rgba(255, 255, 255, 0.55);
}
.ds-tech__name {
	display: block;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.78rem;
	letter-spacing: 0.06em;
	color: var(--accent);
	margin-bottom: 0.55rem;
}
.ds-tech__desc {
	font-size: 0.84rem;
	line-height: 1.55;
	color: var(--mute);
	margin: 0;
}

/* CTA */
.ds-cta { text-align: center; }
.ds-cta__link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.82rem;
	color: var(--accent);
	text-decoration: none;
	padding: 0.65rem 1.25rem;
	border: 1px solid rgba(47, 107, 255, 0.35);
	border-radius: 9999px;
	background: var(--accent-soft);
	transition: transform 180ms ease, background 180ms ease;
}
.ds-cta__link:hover { transform: translateY(-2px); background: #d6e3ff; }
.ds-cta__arrow { transition: transform 180ms ease; }
.ds-cta__link:hover .ds-cta__arrow { transform: translateX(3px); }
</style>
