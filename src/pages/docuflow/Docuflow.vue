<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Button from "@/components/Button.vue";

const docuflowFeatures = [
    {
        title: "Powered by MDX",
        body: "Write documentation in MDX — Markdown with embedded JSX. Import shared components, add interactive examples, and keep your docs alive alongside your code.",
        icon: "pi-desktop",
    },
    {
        title: "Built on React + Vite",
        body: "Docuflow runs on React and Vite under the hood, so you get hot module replacement, fast builds, and the full React ecosystem available when you need it.",
        icon: "pi-cog",
    },
    {
        title: "One-Command CLI",
        body: "A single CLI command scaffolds, builds, and deploys your documentation site. No webpack configs, no boilerplate — just write and ship.",
        icon: "pi-sync",
    }
];

const howItWorks = [
    {
        step: "01",
        title: "Write in MDX",
        body: "Author your docs in .mdx files. Use standard Markdown for text, and drop in React components where static content isn't enough."
    },
    {
        step: "02",
        title: "Run the CLI",
        body: "Run `docuflow build` and the CLI scans your MDX files, resolves imports, and compiles the full site — in seconds."
    },
    {
        step: "03",
        title: "Deploy Anywhere",
        body: "The output is a standard static site. Drop it on any CDN, GitHub Pages, Vercel, or your own server — Docuflow doesn't lock you in."
    }
];
</script>

<template>
    <PageLayoutSpacer>
        <!-- Hero card -->
        <div class="glass-card px-8 py-8 md:px-12 md:py-10 w-full text-center">
            <p class="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">
                Open Source Project
            </p>
            <h1 class="text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-snug mb-4">
                Build
                <span class="text-docuflow-light dark:text-docuflow-dark">quick</span>,
                lightweight
                <span class="text-docuflow-light dark:text-docuflow-dark">documentation</span>
                — don't get bogged down by the process.
            </h1>
            <p class="text-sm md:text-base text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                Docuflow is a documentation generator built for developers who want to ship great docs without
                fighting their toolchain. Write MDX, run a command, done.
            </p>

            <div class="flex w-full items-center justify-center">
                <Button
                    content="View on Github"
                    icon="pi-github"
                    link="https://github.com/trevorflahardy/docuflow"
                    background="bg-docuflow-light/90 hover:bg-docuflow-light dark:bg-docuflow-dark/90 dark:hover:bg-docuflow-dark"
                    textExtra="text-white"
                />
            </div>
        </div>

        <!-- Features grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 w-full">
            <div
                v-for="{ title, body, icon } in docuflowFeatures"
                :key="title"
                class="glass-card p-5 lg:p-6 flex flex-col items-center text-center gap-4"
            >
                <div class="w-14 h-14 rounded-2xl bg-docuflow-light/10 border border-docuflow-light/20 flex items-center justify-center">
                    <i class="pi text-docuflow-light text-2xl" :class="icon" />
                </div>

                <h3 class="card-title tracking-tight">
                    {{ title }}
                </h3>

                <p class="card-body leading-relaxed">
                    {{ body }}
                </p>
            </div>
        </div>

        <!-- How It Works -->
        <div class="w-full">
            <div class="text-center mb-8">
                <h2 class="title-2 mb-2">How It Works</h2>
                <p class="subtitle">Three steps from blank file to deployed documentation.</p>
            </div>

            <div class="flex flex-col md:flex-row gap-5 lg:gap-6 items-stretch">
                <div
                    v-for="{ step, title, body } in howItWorks"
                    :key="step"
                    class="glass-card p-5 lg:p-6 flex-1 flex flex-col gap-3"
                >
                    <span class="text-3xl font-bold text-docuflow-light/40 tracking-tight leading-none">{{ step }}</span>
                    <h3 class="card-title mb-0">{{ title }}</h3>
                    <p class="card-body mb-0">{{ body }}</p>
                </div>
            </div>
        </div>

        <!-- Preview images -->
        <div class="w-full">
            <div class="text-center mb-6">
                <h2 class="title-2 mb-2">See It in Action</h2>
                <p class="subtitle">A preview of the generated documentation site.</p>
            </div>
            <div class="glass-card p-4 md:p-6 w-full">
                <div class="w-full h-fit space-y-5 relative xl:mb-16">
                    <img
                        src="/docuflow-home.png"
                        alt="Docuflow home page preview."
                        class="xl:w-[85%] z-10 rounded-xl xl:rounded-2xl shadow-lg"
                    />
                    <img
                        src="/docuflow-docs.png"
                        alt="Docuflow documentation page preview."
                        class="xl:absolute xl:w-[65%] z-20 rounded-xl xl:rounded-2xl shadow-lg xl:-bottom-[15%] xl:right-[5%]"
                    />
                </div>
            </div>
        </div>

        <!-- Disclaimer -->
        <div class="pb-6">
            <p class="text-center text-white/50 text-xs italic leading-relaxed max-w-2xl mx-auto">
                Docuflow is in early development. The features shown here represent the planned final state of the project — some are still being implemented.
            </p>
        </div>
    </PageLayoutSpacer>
</template>
