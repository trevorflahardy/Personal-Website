<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Button from "@/components/Button.vue";

// Pipeline: two phases tell the story
const phase1 = [
    {
        n: '01',
        icon: 'pi-file-edit',
        label: 'Typst Source',
        sub: '.typ files',
        desc: 'Class notes authored in Typst — structured, semantic, version-controlled markup.',
    },
    {
        n: '02',
        icon: 'pi-cog',
        label: 'Compiler',
        sub: 'typst compile',
        desc: 'Typst compiles the source to a pixel-perfect PDF in milliseconds.',
    },
    {
        n: '03',
        icon: 'pi-file',
        label: 'PDF Output',
        sub: '14 pages',
        desc: 'A clean, structured PDF with headings, definitions, and code blocks intact.',
    },
];

const phase2 = [
    {
        n: '04',
        icon: 'pi-sitemap',
        label: 'Chunking',
        sub: 'semantic splits',
        desc: 'PDF text is parsed and split into overlapping semantic chunks for retrieval.',
    },
    {
        n: '05',
        icon: 'pi-chart-scatter',
        label: 'Embeddings',
        sub: 'text-embedding-3',
        desc: 'Each chunk is encoded into a high-dimensional vector via the OpenAI embedding model.',
    },
    {
        n: '06',
        icon: 'pi-database',
        label: 'Vector Index',
        sub: 'FAISS',
        desc: 'Vectors are stored in a FAISS index for sub-millisecond cosine similarity search.',
    },
    {
        n: '07',
        icon: 'pi-sparkles',
        label: 'AI Features',
        sub: 'RAG-powered',
        desc: 'Chat, quizzes, and flashcards — all grounded in retrieved class note context.',
    },
];

const features = [
    {
        icon: 'pi-comment',
        title: 'AI Chat',
        subtitle: 'Ask anything about the course.',
        desc: 'The AI assistant has full retrieval access to all 14 pages of Secure Coding notes. Ask about mechanisms, cryptography, access control, or design principles — and get answers grounded in the actual lecture material, not hallucinations.',
        screenshot: `$cnt_4419_study_hub/homepage.png`,
        bullets: [
            'RAG pipeline retrieves the most relevant note chunks per query',
            'Answers cite concepts directly from the source material',
            'Understands course-specific terminology and definitions',
            'Persistent conversation context across the session',
        ],
        flip: false,
    },
    {
        icon: 'pi-check-square',
        title: 'AI Quiz Generator',
        subtitle: 'Exam prep that knows your notes.',
        desc: 'Generates multi-choice fill-in-the-blank questions pulled directly from the Typst source. Each question includes a difficulty tag, topic label, and quotes from actual lecture content — making every question genuinely relevant.',
        screenshot: `cnt_4419_study_hub/ai_quiz_gen_question.png`,
        bullets: [
            'Configurable question count with real-time generation progress',
            'Fill-in-the-blank questions with direct note quotes as context',
            'Difficulty tags: easy / medium / hard per question',
            'Four answer choices generated from course concepts',
        ],
        flip: true,
    },
    {
        icon: 'pi-clone',
        title: 'AI Flashcards',
        subtitle: 'Spaced repetition, auto-generated.',
        desc: 'Flashcards generated from key concepts, definitions, and principles in the notes. Rate each card to track recall confidence. The flip animation reveals the full answer with full topic context.',
        screenshot: `cnt_4419_study_hub/ai_flashcard_answer.png`,
        bullets: [
            'Auto-generated from course definitions and key concepts',
            'Recall rating system: Again / Good / Easy',
            'Flip animation reveals answer with topic label',
            'Delete cards you have mastered',
        ],
        flip: false,
    },
];

const techStack = [
    { name: 'Typst', icon: 'pi-file-edit', desc: 'Note authoring & PDF compilation' },
    { name: 'Python', icon: 'pi-code', desc: 'Embedding pipeline & backend' },
    { name: 'OpenAI API', icon: 'pi-sparkles', desc: 'Embeddings + chat completion' },
    { name: 'FAISS', icon: 'pi-database', desc: 'Vector similarity index' },
    { name: 'FastAPI', icon: 'pi-bolt', desc: 'REST API layer' },
    { name: 'React', icon: 'pi-desktop', desc: 'Frontend web application' },
];

const typstLines = [
    { type: 'heading1', text: '= Access Control Mechanisms' },
    { type: 'blank', text: '' },
    { type: 'body', text: 'Access control determines ' },
    { type: 'body-em', text: '_who_' },
    { type: 'body', text: ' can access ' },
    { type: 'body-em', text: '_what_' },
    { type: 'body', text: ' resources.' },
    { type: 'blank', text: '' },
    { type: 'heading2', text: '== Mandatory Access Control (MAC)' },
    { type: 'body', text: 'The system enforces access policy — users cannot override it.' },
    { type: 'blank', text: '' },
    { type: 'func', text: '#definition[' },
    { type: 'func-body', text: '  *Bell-LaPadula*: "No read up, no write down."' },
    { type: 'func-body', text: '  Designed to preserve *confidentiality*.' },
    { type: 'func', text: ']' },
    { type: 'blank', text: '' },
    { type: 'list', text: '- Subject label must *dominate* object label to read' },
    { type: 'list', text: '- Write-down is prohibited to prevent data leakage' },
];
</script>

<template>
    <PageLayoutSpacer>

        <!-- ============================================================
             HERO
        ============================================================ -->
        <div class="relative w-full overflow-hidden rounded-2xl border border-white/8 shadow-2xl">

            <!-- Dark base + green tinted bg -->
            <div class="absolute inset-0 bg-[#080f0a]" />
            <div class="absolute inset-0 bg-linear-to-br from-cnt-400/10 via-transparent to-cnt-400/4" />

            <!-- Hex/diamond grid texture -->
            <div class="absolute inset-0 opacity-25"
                style="background-image: linear-gradient(rgba(52,211,153,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.15) 1px, transparent 1px); background-size: 32px 32px;" />

            <!-- Glow orbs -->
            <div
                class="pointer-events-none absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-cnt-400/20 blur-3xl" />
            <div class="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cnt-400/10 blur-3xl" />

            <!-- Top edge line -->
            <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cnt-400/70 to-transparent" />

            <div class="relative z-10 px-8 py-12 sm:px-12 sm:py-14 md:px-14 md:py-16">

                <!-- Course badge -->
                <div
                    class="mb-6 inline-flex items-center gap-2 rounded-full border border-cnt-400/30 bg-cnt-400/10 px-4 py-1.5 backdrop-blur-sm">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-cnt-400" />
                    <span class="font-mono text-xs font-semibold uppercase tracking-widest text-cnt-400">
                        CNT 4419 · Secure Coding · University of South Florida
                    </span>
                </div>

                <!-- Title -->
                <h1 class="mb-4 text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl md:text-7xl">
                    Study<span class="text-cnt-400">.</span>Hub
                </h1>

                <!-- Tagline -->
                <p class="mb-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                    I took Typst class notes, compiled them to PDF, chunked and embedded the content,
                    and built a RAG-powered study tool — complete with AI chat, adaptive quiz generation,
                    and auto-generated flashcards.
                </p>

                <!-- Status chips -->
                <div class="mb-8 flex flex-wrap gap-2">
                    <span v-for="tag in ['AI Chat', 'Quiz Generator', 'Flashcards', 'RAG Pipeline', 'Typst + PDF']"
                        :key="tag"
                        class="inline-flex items-center gap-1.5 rounded-lg border border-cnt-400/20 bg-cnt-400/8 px-2.5 py-1 font-mono text-xs text-cnt-400/70">
                        <span class="h-1 w-1 rounded-full bg-cnt-400/50" />{{ tag }}
                    </span>
                </div>

                <!-- CTAs -->
                <div class="flex flex-row flex-wrap gap-3">
                    <Button link="https://github.com/trevorflahardy/cnt_4419_class_notes" content="View on GitHub"
                        icon="pi-github" background="bg-cnt-400/20 hover:bg-cnt-400/30 border border-cnt-400/40" />
                </div>
            </div>
        </div>

        <!-- ============================================================
             STATS
        ============================================================ -->
        <div class="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <div v-for="stat in [
                { value: '14', label: 'Pages of Notes', icon: 'pi-file' },
                { value: '3', label: 'AI Study Modes', icon: 'pi-sparkles' },
                { value: 'RAG', label: 'Retrieval Model', icon: 'pi-chart-scatter' },
                { value: '100%', label: 'Note Coverage', icon: 'pi-check-circle' },
            ]" :key="stat.label" class="glass-card flex flex-col items-center gap-1.5 px-4 py-5 text-center">
                <div
                    class="mb-1 flex h-8 w-8 items-center justify-center rounded-xl border border-cnt-400/20 bg-cnt-400/10">
                    <i class="pi text-cnt-400 text-sm" :class="stat.icon" />
                </div>
                <span class="font-mono text-2xl font-bold leading-none tracking-tight text-cnt-400 sm:text-3xl">{{
                    stat.value }}</span>
                <span class="text-xs leading-tight text-white/55">{{ stat.label }}</span>
            </div>
        </div>

        <!-- ============================================================
             ORIGIN
        ============================================================ -->
        <div class="glass-card flex w-full flex-col items-start gap-7 p-6 sm:p-8 md:flex-row md:gap-10">
            <div class="min-w-0 flex-1">
                <div class="mb-4 flex items-center gap-2.5">
                    <div class="h-0.5 w-6 rounded-full bg-cnt-400" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-cnt-400">The Problem</span>
                </div>
                <h2 class="title-2 mb-0">Notes that actually study back.</h2>
                <p class="body mt-3">
                    Taking good notes is only half the battle. For CNT 4419: Secure Coding at USF, I wrote
                    structured Typst notes throughout the semester — but reviewing them for exams meant scrolling
                    through a static PDF with no way to query, quiz, or reinforce the material interactively.
                </p>
                <p class="body mb-0">
                    So I built the Study Hub: a pipeline that takes those Typst sources, compiles them to PDF,
                    embeds every chunk, and wraps it all in an AI study interface. Your notes become a tutor.
                </p>
            </div>
            <!-- Accent visual -->
            <div class="flex w-full shrink-0 flex-col gap-3 md:w-56">
                <div class="rounded-xl border border-cnt-400/20 bg-cnt-400/6 p-4">
                    <p class="mb-1 font-mono text-xs text-cnt-400/60 uppercase tracking-widest">Before</p>
                    <p class="text-sm font-medium text-white/80">Static PDF. Ctrl+F. Pray.</p>
                </div>
                <div class="flex items-center justify-center">
                    <i class="pi pi-arrow-down text-cnt-400/40 text-lg" />
                </div>
                <div class="rounded-xl border border-cnt-400/40 bg-cnt-400/12 p-4">
                    <p class="mb-1 font-mono text-xs text-cnt-400/80 uppercase tracking-widest">After</p>
                    <p class="text-sm font-medium text-white/90">Ask it anything. Quiz yourself. Ship.</p>
                </div>
            </div>
        </div>

        <!-- ============================================================
             THE PIPELINE — signature section
        ============================================================ -->
        <div class="w-full">
            <div class="mb-8 text-center">
                <div class="mb-3 flex items-center justify-center gap-3">
                    <div class="h-px w-10 rounded-full bg-cnt-400/40" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-cnt-400">End-to-End
                        Pipeline</span>
                    <div class="h-px w-10 rounded-full bg-cnt-400/40" />
                </div>
                <h2 class="title-2 mb-2">From Typst to Intelligence.</h2>
                <p class="subtitle">Seven steps turn raw class notes into a queryable AI knowledge base.</p>
            </div>

            <!-- Phase label -->
            <div class="mb-3 flex items-center gap-3">
                <span
                    class="rounded-full border border-cnt-400/30 bg-cnt-400/10 px-3 py-0.5 text-xs font-semibold text-cnt-400 tracking-wide">Phase
                    1 — Authoring & Compilation</span>
                <div class="h-px flex-1 bg-cnt-400/15" />
            </div>

            <!-- Phase 1 nodes -->
            <div class="relative mb-2 flex flex-col gap-3 sm:flex-row sm:gap-0">
                <!-- Mobile: vertical connector lines drawn with pseudo approach -->
                <template v-for="(step, i) in phase1" :key="step.n">
                    <div class="relative flex flex-col sm:flex-1 sm:items-center sm:text-center">
                        <!-- Node card -->
                        <div
                            class="flex flex-row items-start gap-3 rounded-xl border border-cnt-400/20 bg-cnt-400/6 p-4 sm:flex-col sm:items-center sm:gap-2 sm:p-5 backdrop-blur-sm">
                            <div
                                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cnt-400/25 bg-cnt-400/12 sm:mb-1">
                                <i class="pi text-cnt-400 text-base sm:text-lg" :class="step.icon" />
                            </div>
                            <div class="min-w-0">
                                <div class="mb-0.5 flex items-center gap-2 sm:justify-center">
                                    <span class="font-mono text-xs text-cnt-400/50">{{ step.n }}</span>
                                    <span class="text-sm font-semibold text-white/90">{{ step.label }}</span>
                                </div>
                                <span class="font-mono text-xs text-cnt-400/60 sm:block">{{ step.sub }}</span>
                                <p class="mt-1.5 text-xs leading-relaxed text-white/50 sm:mt-2">{{ step.desc }}</p>
                            </div>
                        </div>
                        <!-- Mobile vertical line -->
                        <div v-if="i < phase1.length - 1" class="ml-[21px] h-3 w-px bg-cnt-400/20 sm:hidden" />
                    </div>

                    <!-- Desktop horizontal arrow connector -->
                    <div v-if="i < phase1.length - 1" class="hidden shrink-0 items-center px-1 sm:flex">
                        <div class="h-px w-6 bg-cnt-400/30" />
                        <svg width="8" height="10" viewBox="0 0 8 10" class="text-cnt-400/40" fill="currentColor">
                            <path d="M0 0 L8 5 L0 10 Z" />
                        </svg>
                    </div>
                </template>
            </div>

            <!-- Phase turn-down connector -->
            <div class="my-2 flex items-center gap-3 pl-2 sm:justify-end sm:pr-2">
                <div class="h-px flex-1 bg-cnt-400/10 sm:flex-none sm:w-0" />
                <div class="flex items-center gap-1.5 text-xs text-cnt-400/40 font-mono">
                    <i class="pi pi-arrow-down text-xs" />
                    <span>pipeline continues</span>
                </div>
                <div class="h-px flex-1 bg-cnt-400/10" />
            </div>

            <!-- Phase 2 label -->
            <div class="mb-3 flex items-center gap-3">
                <span
                    class="rounded-full border border-cnt-400/30 bg-cnt-400/10 px-3 py-0.5 text-xs font-semibold text-cnt-400 tracking-wide">Phase
                    2 — Embedding & Retrieval</span>
                <div class="h-px flex-1 bg-cnt-400/15" />
            </div>

            <!-- Phase 2 nodes -->
            <div class="relative flex flex-col gap-3 sm:flex-row sm:gap-0">
                <template v-for="(step, i) in phase2" :key="step.n">
                    <div class="relative flex flex-col sm:flex-1 sm:items-center sm:text-center">
                        <div class="flex flex-row items-start gap-3 rounded-xl border border-cnt-400/25 bg-cnt-400/8 p-4 sm:flex-col sm:items-center sm:gap-2 sm:p-5 backdrop-blur-sm"
                            :class="step.n === '07' ? 'border-cnt-400/50 bg-cnt-400/15' : ''">
                            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cnt-400/25 bg-cnt-400/12 sm:mb-1"
                                :class="step.n === '07' ? 'border-cnt-400/60 bg-cnt-400/25' : ''">
                                <i class="pi text-cnt-400 text-base sm:text-lg" :class="step.icon" />
                            </div>
                            <div class="min-w-0">
                                <div class="mb-0.5 flex items-center gap-2 sm:justify-center">
                                    <span class="font-mono text-xs text-cnt-400/50">{{ step.n }}</span>
                                    <span class="text-sm font-semibold"
                                        :class="step.n === '07' ? 'text-cnt-400' : 'text-white/90'">{{ step.label
                                        }}</span>
                                </div>
                                <span class="font-mono text-xs text-cnt-400/60 sm:block">{{ step.sub }}</span>
                                <p class="mt-1.5 text-xs leading-relaxed text-white/50 sm:mt-2">{{ step.desc }}</p>
                            </div>
                        </div>
                        <div v-if="i < phase2.length - 1" class="ml-[21px] h-3 w-px bg-cnt-400/20 sm:hidden" />
                    </div>

                    <div v-if="i < phase2.length - 1" class="hidden shrink-0 items-center px-1 sm:flex">
                        <div class="h-px w-6 bg-cnt-400/30" />
                        <svg width="8" height="10" viewBox="0 0 8 10" class="text-cnt-400/40" fill="currentColor">
                            <path d="M0 0 L8 5 L0 10 Z" />
                        </svg>
                    </div>
                </template>
            </div>
        </div>

        <!-- ============================================================
             TYPST SECTION
        ============================================================ -->
        <div class="glass-card w-full overflow-hidden p-0">
            <div class="flex flex-col lg:flex-row">
                <!-- Left: explanation -->
                <div class="flex-1 p-6 sm:p-8">
                    <div class="mb-4 flex items-center gap-2.5">
                        <div class="h-0.5 w-6 rounded-full bg-cnt-400" />
                        <span class="text-xs font-semibold uppercase tracking-widest text-cnt-400">The Source
                            Format</span>
                    </div>
                    <h2 class="title-2 mb-0">Why Typst?</h2>
                    <p class="body mt-3">
                        <strong class="text-white/90">Typst</strong> is a modern markup-based typesetting system —
                        think LaTeX but with a sane syntax. Notes written in <code
                            class="rounded bg-cnt-400/10 px-1.5 py-0.5 font-mono text-xs text-cnt-400">.typ</code>
                        files are version-controlled in Git, compile in milliseconds, and produce perfectly
                        consistent PDFs every time.
                    </p>
                    <p class="body mb-0">
                        The structured heading hierarchy (<code
                            class="rounded bg-cnt-400/10 px-1.5 py-0.5 font-mono text-xs text-cnt-400">=</code>, <code
                            class="rounded bg-cnt-400/10 px-1.5 py-0.5 font-mono text-xs text-cnt-400">==</code>)
                        and custom <code
                            class="rounded bg-cnt-400/10 px-1.5 py-0.5 font-mono text-xs text-cnt-400">#definition[]</code>
                        blocks
                        make the output semantically rich — which means better chunk boundaries when embedding.
                    </p>

                    <!-- Typst advantages -->
                    <div class="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div v-for="adv in [
                            { icon: 'pi-bolt', text: 'Millisecond compilation' },
                            { icon: 'pi-github', text: 'Git-native & diffable' },
                            { icon: 'pi-sitemap', text: 'Semantic heading structure' },
                            { icon: 'pi-code', text: 'Custom function blocks' },
                        ]" :key="adv.text" class="flex items-center gap-2 text-sm text-white/65">
                            <i class="pi text-cnt-400 text-xs shrink-0" :class="adv.icon" />
                            {{ adv.text }}
                        </div>
                    </div>
                </div>

                <!-- Right: styled code block -->
                <div class="lg:w-[52%] shrink-0 border-t border-white/6 lg:border-t-0 lg:border-l">
                    <!-- Fake editor chrome -->
                    <div class="flex items-center gap-1.5 border-b border-white/6 bg-white/2 px-4 py-2.5">
                        <div class="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <div class="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <div class="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <span class="ml-3 font-mono text-xs text-white/25">access_control.typ</span>
                        <span
                            class="ml-auto rounded bg-cnt-400/15 px-1.5 py-0.5 font-mono text-xs text-cnt-400/70">typst</span>
                    </div>
                    <!-- Code content -->
                    <div class="overflow-x-auto p-5 font-mono text-xs leading-6 sm:text-sm">
                        <div class="text-cnt-400 font-semibold">= Access Control Mechanisms</div>
                        <div class="h-2" />
                        <div class="text-white/65">Access control determines <span
                                class="italic text-white/85">who</span> can
                            access</div>
                        <div class="text-white/65"><span class="italic text-white/85">what</span> resources and under
                            <span class="italic text-white/85">what conditions</span>.
                        </div>
                        <div class="h-2" />
                        <div class="text-cnt-400/75 font-semibold">== Mandatory Access Control (MAC)</div>
                        <div class="text-white/65">The system enforces policy — users cannot override it.</div>
                        <div class="h-2" />
                        <div class="text-cnt-400/60">#definition[</div>
                        <div class="pl-4 text-white/75"> <span class="font-bold text-white/90">*Bell-LaPadula*</span>:
                            "No read
                            up, no write down."</div>
                        <div class="pl-4 text-white/65"> Designed to preserve <span
                                class="font-bold text-white/85">*confidentiality*</span>.</div>
                        <div class="text-cnt-400/60">]</div>
                        <div class="h-2" />
                        <div class="text-white/65"><span class="text-cnt-400/70">-</span> Subject label must <span
                                class="font-bold text-white/85">*dominate*</span> object label to read</div>
                        <div class="text-white/65"><span class="text-cnt-400/70">-</span> Write-down is prohibited to
                            prevent
                            data leakage</div>
                        <!-- Blinking cursor -->
                        <div class="mt-1 inline-block h-4 w-0.5 bg-cnt-400 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             AI FEATURES HEADER
        ============================================================ -->
        <div class="text-center">
            <div class="mb-3 flex items-center justify-center gap-3">
                <div class="h-px w-10 rounded-full bg-cnt-400/40" />
                <span class="text-xs font-semibold uppercase tracking-widest text-cnt-400">AI Features</span>
                <div class="h-px w-10 rounded-full bg-cnt-400/40" />
            </div>
            <h2 class="title-2 mb-2">Three ways to study smarter.</h2>
            <p class="subtitle">Each mode is powered by the same RAG pipeline — different interface, same grounded
                intelligence.
            </p>
        </div>

        <!-- ============================================================
             FEATURE CARDS
        ============================================================ -->
        <div class="flex w-full flex-col gap-5 sm:gap-6">
            <div v-for="feature in features" :key="feature.title" class="glass-card w-full overflow-hidden p-5 sm:p-7">
                <div class="flex flex-col items-start gap-6"
                    :class="feature.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'">
                    <!-- Text side -->
                    <div class="min-w-0 flex-1">
                        <div class="mb-4 flex items-center gap-3">
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cnt-400/25 bg-cnt-400/12">
                                <i class="pi text-cnt-400 text-base" :class="feature.icon" />
                            </div>
                            <div>
                                <h3 class="card-title mb-0 leading-snug">{{ feature.title }}</h3>
                                <p class="mt-0.5 text-xs font-medium tracking-wide text-cnt-400/70">{{ feature.subtitle
                                    }}</p>
                            </div>
                        </div>
                        <p class="card-body mb-5">{{ feature.desc }}</p>
                        <ul class="flex flex-col gap-2.5">
                            <li v-for="bullet in feature.bullets" :key="bullet"
                                class="flex items-start gap-2.5 text-sm leading-snug text-white/70">
                                <i class="pi pi-check-circle mt-0.5 shrink-0 text-sm text-cnt-400" />
                                <span>{{ bullet }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Screenshot side -->
                    <div class="w-full shrink-0 lg:w-[48%]">
                        <div
                            class="overflow-hidden rounded-xl border border-white/8 bg-[#0d1a10] shadow-xl shadow-black/50">
                            <!-- Fake app chrome -->
                            <div class="flex items-center gap-1.5 border-b border-white/6 px-3 py-2">
                                <div class="h-2 w-2 rounded-full bg-white/15" />
                                <div class="h-2 w-2 rounded-full bg-white/15" />
                                <div class="h-2 w-2 rounded-full bg-white/15" />
                                <span class="ml-2 font-mono text-xs text-white/20">CNT 4419 · Study Hub</span>
                                <div class="ml-auto flex items-center gap-1">
                                    <span class="h-1.5 w-1.5 rounded-full bg-cnt-400 animate-pulse" />
                                    <span class="font-mono text-xs text-cnt-400/60">AI Ready</span>
                                </div>
                            </div>
                            <img :src="feature.screenshot" :alt="`${feature.title} screenshot`" class="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             HOW RAG WORKS
        ============================================================ -->
        <div class="relative w-full overflow-hidden rounded-2xl border border-white/6 bg-[#080f0a] p-6 sm:p-8">
            <!-- Subtle grid -->
            <div class="absolute inset-0 opacity-15"
                style="background-image: linear-gradient(rgba(52,211,153,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.2) 1px, transparent 1px); background-size: 24px 24px;" />
            <div class="relative z-10">
                <div class="mb-6 text-center">
                    <div class="mb-3 flex items-center justify-center gap-3">
                        <div class="h-px w-8 rounded-full bg-cnt-400/35" />
                        <span class="text-xs font-semibold uppercase tracking-widest text-cnt-400/75">Under the
                            Hood</span>
                        <div class="h-px w-8 rounded-full bg-cnt-400/35" />
                    </div>
                    <h2 class="title-2 mb-2">How RAG Actually Works.</h2>
                    <p class="subtitle max-w-xl mx-auto">Every AI response is grounded in retrieved content from the
                        actual
                        notes — not hallucination.</p>
                </div>

                <!-- RAG flow diagram -->
                <div class="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                    <template v-for="(node, i) in [
                        { label: 'User Query', sub: 'natural language', icon: 'pi-comment', glow: false },
                        { label: 'Embed Query', sub: 'text-embedding-3', icon: 'pi-chart-scatter', glow: false },
                        { label: 'Search Index', sub: 'cosine similarity', icon: 'pi-database', glow: false },
                        { label: 'Top-K Chunks', sub: 'from class notes', icon: 'pi-file', glow: false },
                        { label: 'GPT-4o', sub: 'with context', icon: 'pi-sparkles', glow: true },
                    ]" :key="node.label">
                        <div class="flex shrink-0 flex-col items-center rounded-xl px-4 py-3 text-center sm:flex-1 sm:rounded-xl"
                            :class="node.glow ? 'border border-cnt-400/40 bg-cnt-400/12' : 'border border-white/8 bg-white/4'">
                            <i class="pi mb-1.5 text-lg"
                                :class="[node.icon, node.glow ? 'text-cnt-400' : 'text-white/50']" />
                            <p class="text-sm font-semibold" :class="node.glow ? 'text-cnt-400' : 'text-white/80'">{{
                                node.label }}</p>
                            <p class="font-mono text-xs text-white/35">{{ node.sub }}</p>
                        </div>
                        <!-- Arrow -->
                        <div v-if="i < 4" class="flex items-center justify-center py-0 sm:px-1">
                            <svg width="16" height="12" viewBox="0 0 16 12"
                                class="rotate-90 text-cnt-400/30 sm:rotate-0" fill="currentColor">
                                <path d="M0 6 H12 M8 2 L14 6 L8 10" stroke="currentColor" stroke-width="1.5" fill="none"
                                    stroke-linecap="round" />
                            </svg>
                        </div>
                    </template>
                </div>

                <!-- Note source annotation -->
                <div class="mt-5 flex items-center justify-center gap-2 text-xs text-white/35">
                    <div class="h-px w-8 rounded-full bg-white/10" />
                    <span>Context window filled with retrieved Typst-sourced content — model never guesses</span>
                    <div class="h-px w-8 rounded-full bg-white/10" />
                </div>
            </div>
        </div>

        <!-- ============================================================
             QUIZ GENERATION IN PROGRESS (bonus screenshot)
        ============================================================ -->
        <div class="glass-card w-full p-5 sm:p-7">
            <div class="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div class="flex-1">
                    <div
                        class="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-cnt-400/20 bg-cnt-400/8 px-2.5 py-1">
                        <span class="font-mono text-xs font-semibold text-cnt-400">Real-time generation</span>
                    </div>
                    <h3 class="card-title mb-1">Watch the AI work.</h3>
                    <p class="card-body mb-4">
                        Quiz generation is streamed in real time — a progress indicator shows each question
                        being built as the model processes retrieved context from the notes. No waiting for a
                        batch; the interface updates live.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span
                            class="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/55">Streamed
                            output</span>
                        <span
                            class="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/55">Live
                            progress bar</span>
                        <span
                            class="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/55">Configurable
                            count</span>
                    </div>
                </div>
                <div class="w-full shrink-0 md:w-[44%]">
                    <div
                        class="overflow-hidden rounded-xl border border-white/8 bg-[#0d1a10] shadow-xl shadow-black/50">
                        <div class="flex items-center gap-1.5 border-b border-white/6 px-3 py-2">
                            <div class="h-2 w-2 rounded-full bg-white/15" />
                            <div class="h-2 w-2 rounded-full bg-white/15" />
                            <div class="h-2 w-2 rounded-full bg-white/15" />
                            <span class="ml-2 font-mono text-xs text-white/20">Quiz Generator</span>
                        </div>
                        <img :src="`cnt_4419_study_hub/ai_quiz_gen_in_progress.png`" alt="Quiz generation in progress"
                            class="w-full" />
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             TECH STACK
        ============================================================ -->
        <div class="w-full">
            <div class="mb-5 flex items-center justify-center gap-3">
                <div class="h-px w-8 rounded-full bg-cnt-400/30" />
                <span class="text-xs font-semibold uppercase tracking-widest text-cnt-400/65">Built With</span>
                <div class="h-px w-8 rounded-full bg-cnt-400/30" />
            </div>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                <div v-for="tech in techStack" :key="tech.name" class="glass-card flex items-center gap-3 p-3.5 sm:p-4">
                    <div
                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cnt-400/20 bg-cnt-400/10">
                        <i class="pi text-cnt-400 text-sm" :class="tech.icon" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold leading-tight text-white/90">{{ tech.name }}</p>
                        <p class="mt-0.5 text-xs text-white/45">{{ tech.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             FOOTER
        ============================================================ -->
        <div class="pb-4">
            <p class="mx-auto max-w-xl text-center text-xs italic leading-relaxed text-white/35">
                Built for CNT 4419: Secure Coding at the University of South Florida.
                The Typst source notes, embedding pipeline, and AI interface are all open-source on GitHub.
            </p>
        </div>

    </PageLayoutSpacer>
</template>
