<script setup lang="ts">
import Button from "@/components/Button.vue";

const agents = [
    { name: 'developer', role: 'Production code writer', keywords: 'implement, build this, write code, add feature' },
    { name: 'debugger', role: 'Systematic root-cause analysis', keywords: 'debug, broken, not working, crash' },
    { name: 'tester', role: 'Test suite writer', keywords: 'write test, add test, unit test, test coverage' },
    { name: 'security', role: 'Vulnerability auditor', keywords: 'security, vulnerability, exploit, injection' },
    { name: 'docs-writer', role: 'Documentation generator', keywords: 'document, write docs, explain this, write readme' },
    { name: 'doc-audit', role: 'Documentation gap finder', keywords: 'doc audit, documentation gap, missing docs' },
    { name: 'error-finder', role: 'Adversarial bug detector', keywords: 'find error, potential bug, what could go wrong' },
    { name: 'watcher', role: 'Progress tracker', keywords: 'watch, track progress, status report' },
];

const features = [
    { title: 'Actually autonomous', body: 'kew init writes the MCP config, injects a CLAUDE.md, sets up a live status line, and wires the SQLite database. Claude Code discovers kew\'s tools automatically.' },
    { title: 'Saves tokens at scale', body: 'Every task kew handles locally is work Claude doesn\'t burn API tokens on. Code generation, test writing, security reviews — all run through Ollama on your hardware.' },
    { title: 'Real agents, not wrappers', body: 'kew agents run an agentic tool loop — they can read files, search codebases, list directories, and write files mid-generation. They explore and produce grounded results.' },
    { title: 'Zero infrastructure', body: 'Single Rust binary. SQLite database. No daemon, no Docker, no cloud subscription, no IPC. Tasks are rows. Context is rows. Embeddings are rows.' },
];
</script>

<template>
    <div class="kew-world font-mono">
        <!-- Animated swirl background layer -->
        <div class="kew-bg" aria-hidden="true">
            <div class="kew-bg__base" />
            <div class="kew-bg__orb kew-bg__orb--a" />
            <div class="kew-bg__orb kew-bg__orb--b" />
            <div class="kew-bg__orb kew-bg__orb--c" />
            <div class="kew-bg__grid" />
            <div class="kew-bg__scanlines" />
            <div class="kew-bg__vignette" />
        </div>

        <!-- Content column -->
        <div class="kew-content relative z-[1] mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14 py-12 lg:py-16 space-y-12">

            <!-- HERO TERMINAL -->
            <section class="kew-terminal rounded-lg border overflow-hidden shadow-2xl">
                <div class="kew-titlebar flex items-center gap-2 px-4 py-2 border-b">
                    <span class="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span class="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span class="ml-4 text-xs kew-dim">~/.kew — zsh — 120×36</span>
                </div>
                <div class="px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
                    <p class="text-sm kew-mute mb-1">
                        <span class="kew-faint">$</span> cargo install kew &amp;&amp; kew init
                    </p>
                    <p class="text-xs kew-faint mb-8">→ configured · ready.</p>

                    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-2 kew-fg kew-glow">
                        kew<span class="kew-cursor">_</span>
                    </h1>
                    <p class="text-sm kew-mute uppercase tracking-[0.3em] mb-8">local llm agent orchestration</p>

                    <p class="text-base sm:text-lg kew-prose max-w-2xl leading-relaxed mb-10">
                        Offloads code generation, debugging, testing, security audits, and docs from Claude Code to local Ollama models. Install it. Forget about it. Save tokens.
                    </p>

                    <div class="kew-ascii rounded border p-4 text-xs leading-relaxed mb-10 overflow-x-auto">
                        <div class="kew-faint mb-2">// architecture</div>
<pre class="kew-mute">Claude Code ──MCP──▶ kew_run / kew_context_* ──▶ Worker Pool (tokio)
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           Ollama   Claude API   (more)
              │
         Agentic Tool Loop
         ┌─ read_file ─┐
    ─────┤ list_dir    ├──▶ filesystem
         ├─ grep       │
         └─ write_file ┘
              │
         SQLite (.kew/kew.db)
         tasks · context · embeddings</pre>
                    </div>

                    <div class="flex flex-wrap gap-3">
                        <Button link="https://github.com/trevorflahardy/kew" content="Source Code" icon="pi-github"
                            background="bg-[rgba(249,115,22,0.2)] hover:bg-[rgba(249,115,22,0.3)] border border-[rgba(249,115,22,0.5)] !text-[#f59e0b]" />
                        <Button link="https://github.com/trevorflahardy/kew" content="brew install kew" icon="pi-download"
                            background="bg-black/40 hover:bg-black/60 border border-[rgba(249,115,22,0.25)] !text-[rgba(245,158,11,0.85)]" />
                    </div>
                </div>
            </section>

            <!-- FEATURES -->
            <section>
                <p class="text-xs kew-mute mb-3">
                    <span class="kew-faint">$</span> kew --describe
                </p>
                <div class="kew-panel rounded-lg border">
                    <div v-for="(f, i) in features" :key="f.title"
                        class="px-5 sm:px-6 py-5 grid grid-cols-[auto_1fr] gap-4"
                        :class="i < features.length - 1 ? 'kew-divide' : ''">
                        <span class="kew-mute text-sm select-none pt-0.5">[{{ String(i + 1).padStart(2, '0') }}]</span>
                        <div>
                            <p class="text-base font-bold kew-fg mb-1">&gt; {{ f.title }}</p>
                            <p class="text-sm kew-prose-soft leading-relaxed font-sans">{{ f.body }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- AGENTS -->
            <section>
                <p class="text-xs kew-mute mb-3">
                    <span class="kew-faint">$</span> kew agents --list
                </p>
                <div class="kew-panel rounded-lg border overflow-hidden">
                    <div class="grid grid-cols-[auto_1fr_1.5fr] text-xs kew-faint uppercase tracking-widest px-5 py-3 kew-divide kew-row-head">
                        <span class="w-32">NAME</span>
                        <span>ROLE</span>
                        <span class="hidden sm:block">TRIGGERS</span>
                    </div>
                    <div v-for="(agent, i) in agents" :key="agent.name"
                        class="grid grid-cols-[auto_1fr_1.5fr] items-center px-5 py-3 text-sm"
                        :class="i < agents.length - 1 ? 'kew-divide' : ''">
                        <span class="w-32 font-bold kew-fg">{{ agent.name }}</span>
                        <span class="kew-prose-soft font-sans">{{ agent.role }}</span>
                        <span class="hidden sm:block text-xs kew-mute truncate">{{ agent.keywords }}</span>
                    </div>
                </div>
            </section>

            <!-- INSTALL -->
            <section>
                <p class="text-xs kew-mute mb-3">
                    <span class="kew-faint">$</span> kew install --help
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div v-for="opt in [
                        { label: 'macOS / Linux', cmd: 'brew tap trevorflahardy/kew\nbrew install kew\nkew init' },
                        { label: 'Shell script', cmd: 'curl -fsSL install.sh | sh\nkew init' },
                        { label: 'From source', cmd: 'cargo install --path .\nkew init' },
                    ]" :key="opt.label"
                        class="kew-panel rounded-lg border p-4">
                        <p class="text-xs kew-faint uppercase tracking-widest mb-3">// {{ opt.label }}</p>
                        <pre class="text-sm kew-fg-soft whitespace-pre">{{ opt.cmd }}</pre>
                    </div>
                </div>
            </section>

            <!-- EXAMPLE -->
            <section>
                <p class="text-xs kew-mute mb-3">
                    <span class="kew-faint">$</span> # example session
                </p>
                <div class="kew-panel rounded-lg border p-6 text-sm">
                    <p class="kew-prose mb-4">
                        <span class="kew-mute">you:</span> "Add rate limiting to the API and make sure it's secure"
                    </p>
                    <div class="pl-4 kew-border-l space-y-1.5 mb-4">
                        <p class="kew-faint text-xs">// Claude orchestrates 3 parallel kew calls</p>
                        <p class="kew-fg">├─ kew_run { agent: "developer", ... }  ─┐</p>
                        <p class="kew-fg">├─ kew_run { agent: "security",  ... }  ─┤ parallel</p>
                        <p class="kew-fg">└─ kew_run { agent: "tester",    ... }  ─┘</p>
                    </div>
                    <p class="text-xs kew-faint">→ 3× Ollama (local, free) · Claude reviews · Claude commits.</p>
                </div>
            </section>

        </div>
    </div>
</template>

<style scoped>
/* Force our own palette regardless of html.dark class */
.kew-world {
    --kew-fg: #f59e0b;
    --kew-fg-soft: rgba(245, 158, 11, 0.9);
    --kew-mute: rgba(249, 115, 22, 0.6);
    --kew-faint: rgba(249, 115, 22, 0.38);
    --kew-prose: rgba(255, 236, 210, 0.88);
    --kew-prose-soft: rgba(255, 236, 210, 0.72);
    --kew-edge: rgba(249, 115, 22, 0.22);
    --kew-edge-strong: rgba(249, 115, 22, 0.42);
    --kew-panel: rgba(10, 8, 6, 0.55);

    position: relative;
    min-height: 100%;
    width: 100%;
    color-scheme: dark;
    font-family: "SF Mono", "JetBrains Mono", Consolas, Monaco, monospace;
    isolation: isolate;
}

/* Beat the html:not(.dark) .text-white/X !important overrides by NOT using them;
   these scoped classes win no matter which theme is active. */
.kew-fg        { color: var(--kew-fg); }
.kew-fg-soft   { color: var(--kew-fg-soft); }
.kew-mute      { color: var(--kew-mute); }
.kew-faint     { color: var(--kew-faint); }
.kew-prose     { color: var(--kew-prose); }
.kew-prose-soft{ color: var(--kew-prose-soft); }
.kew-dim       { color: rgba(249, 115, 22, 0.55); }

.kew-terminal,
.kew-panel,
.kew-ascii { border-color: var(--kew-edge); }
.kew-terminal { border-color: var(--kew-edge-strong); background: rgba(10, 8, 6, 0.72); }
.kew-panel { background: var(--kew-panel); }
.kew-ascii { background: rgba(0, 0, 0, 0.55); color: var(--kew-prose-soft); }
.kew-titlebar { border-color: var(--kew-edge); background: rgba(249, 115, 22, 0.06); }
.kew-divide { border-bottom: 1px solid rgba(249, 115, 22, 0.1); }
.kew-row-head { background: rgba(249, 115, 22, 0.05); }
.kew-border-l { border-left: 2px solid rgba(249, 115, 22, 0.3); }

.kew-glow {
    text-shadow: 0 0 18px rgba(249, 115, 22, 0.55), 0 0 2px rgba(249, 115, 22, 0.9);
}

.kew-cursor {
    display: inline-block;
    animation: kew-blink 1.1s steps(1) infinite;
    color: var(--kew-fg);
}

@keyframes kew-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
}

/* ─── Full-bleed animated CRT background ─────────────────────────────── */
.kew-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
}
.kew-bg__base {
    position: absolute; inset: 0;
    background:
        radial-gradient(ellipse 120% 80% at 50% 0%, #1a0f05 0%, #0a0806 55%, #050402 100%);
}
.kew-bg__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.55;
    mix-blend-mode: screen;
}
.kew-bg__orb--a {
    width: 55vmax; height: 55vmax;
    left: -15vmax; top: -10vmax;
    background: radial-gradient(circle, rgba(249,115,22,0.55), rgba(249,115,22,0) 65%);
    animation: kew-drift-a 32s ease-in-out infinite alternate;
}
.kew-bg__orb--b {
    width: 48vmax; height: 48vmax;
    right: -12vmax; top: 20vmax;
    background: radial-gradient(circle, rgba(234,88,12,0.4), rgba(234,88,12,0) 65%);
    animation: kew-drift-b 41s ease-in-out infinite alternate;
}
.kew-bg__orb--c {
    width: 60vmax; height: 60vmax;
    left: 20vmax; bottom: -20vmax;
    background: radial-gradient(circle, rgba(180, 60, 10, 0.35), rgba(180,60,10,0) 65%);
    animation: kew-drift-c 55s ease-in-out infinite alternate;
}
.kew-bg__grid {
    position: absolute; inset: 0;
    background-image:
        linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%);
    opacity: 0.55;
}
.kew-bg__scanlines {
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 2px,
        rgba(249,115,22,0.05) 3px,
        transparent 4px);
    opacity: 0.6;
    animation: kew-flicker 7s steps(30) infinite;
}
.kew-bg__vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%);
}

@keyframes kew-drift-a {
    0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
    100% { transform: translate3d(6vmax, 4vmax, 0) rotate(24deg) scale(1.15); }
}
@keyframes kew-drift-b {
    0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
    100% { transform: translate3d(-5vmax, 6vmax, 0) rotate(-18deg) scale(1.1); }
}
@keyframes kew-drift-c {
    0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
    100% { transform: translate3d(4vmax, -6vmax, 0) rotate(12deg) scale(1.08); }
}
@keyframes kew-flicker {
    0%, 100% { opacity: 0.55; }
    47%      { opacity: 0.6; }
    48%      { opacity: 0.35; }
    49%      { opacity: 0.6; }
}

@media (prefers-reduced-motion: reduce) {
    .kew-bg__orb--a,
    .kew-bg__orb--b,
    .kew-bg__orb--c,
    .kew-bg__scanlines,
    .kew-cursor { animation: none !important; }
}
</style>
