<script setup lang="ts">
const highlightedTool = "font-medium text-chai-200 underline decoration-chai-400/40 underline-offset-2 hover:decoration-chai-400/80 transition-colors duration-300";

const techTags = {
    frontend: ["Python", "discord.py", "PostgreSQL", "Alembic"],
    backend: ["Rust", "Axum", "PostgreSQL", "Redis", "image-merger"],
    deployment: ["Docker", "Docker Compose", "GitHub Actions"]
};
</script>

<template>
    <div class="w-full">
        <!-- Section heading -->
        <div class="mb-8 md:mb-10 text-center">
            <h2 class="title-2 mb-2">Under the Hood</h2>
            <p class="subtitle">
                Chai is a multi-service system — a Discord bot front end, a high-performance Rust API for image generation, and a containerized deployment pipeline.
            </p>
        </div>

        <div
            class="flex flex-col gap-6 md:gap-8"
            v-motion-slide-visible-once-bottom
        >
            <!-- Discord Front End -->
            <div class="glass-card p-8 md:p-10">
                <div class="flex items-start gap-5 mb-5">
                    <div class="w-12 h-12 rounded-2xl bg-chai-400/15 border border-chai-400/20 flex items-center justify-center shrink-0">
                        <i class="pi pi-discord text-chai-200 text-xl" />
                    </div>
                    <div>
                        <h3 class="card-title mb-1">Discord Front End</h3>
                        <p class="card-caption mb-0">The user-facing layer — slash commands, interactive menus, and account management.</p>
                    </div>
                </div>
                <p class="card-body mb-4">
                    The Discord bot is built entirely in Python using the
                    <a href="https://github.com/Rapptz/discord.py" :class="highlightedTool">discord.py</a>
                    library. It handles slash commands, interactive UI components (buttons, dropdowns, modals), and
                    the full user authentication and account management flow. All user data — linked Fortnite
                    accounts, privacy settings, and preferences — is stored in a
                    <a :class="highlightedTool">PostgreSQL</a> database managed with
                    <a :class="highlightedTool">Alembic</a> migrations.
                </p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in techTags.frontend" :key="tag"
                        class="text-xs font-medium px-3 py-1 rounded-full bg-chai-400/10 border border-chai-400/20 text-chai-200">
                        {{ tag }}
                    </span>
                </div>
            </div>

            <!-- Rust API Backend -->
            <div class="glass-card p-8 md:p-10">
                <div class="flex items-start gap-5 mb-5">
                    <div class="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0">
                        <i class="pi pi-server text-orange-300 text-xl" />
                    </div>
                    <div>
                        <h3 class="card-title mb-1">Rust Image Generation API</h3>
                        <p class="card-caption mb-0">A dedicated, high-performance microservice that handles all image rendering for Chai.</p>
                    </div>
                </div>
                <p class="card-body mb-4">
                    Heavy image manipulation is offloaded from the Python bot to a dedicated
                    <a :class="highlightedTool">Rust</a> API, built on the
                    <a href="https://github.com/tokio-rs/axum" :class="highlightedTool">Axum</a> web framework.
                    This handles cosmetic locker image generation — taking a list of Fortnite cosmetics, rendering
                    them in parallel using multi-threaded image processing (powered by my own
                    <a href="https://github.com/trevorflahardy/image-merger" :class="highlightedTool">image-merger</a>
                    crate), and returning the final composed image to Discord.
                    <a :class="highlightedTool">Redis</a> caches frequently requested cosmetics to avoid redundant
                    API calls, while <a :class="highlightedTool">PostgreSQL</a> handles persistent storage.
                </p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in techTags.backend" :key="tag"
                        class="text-xs font-medium px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300">
                        {{ tag }}
                    </span>
                </div>
            </div>

            <!-- Deployment -->
            <div class="glass-card p-8 md:p-10">
                <div class="flex items-start gap-5 mb-5">
                    <div class="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <i class="pi pi-cloud text-blue-300 text-xl" />
                    </div>
                    <div>
                        <h3 class="card-title mb-1">Deployment & Rollout</h3>
                        <p class="card-caption mb-0">Containerized from day one, with gradual feature rollout to protect stability.</p>
                    </div>
                </div>
                <p class="card-body mb-4">
                    Every service in Chai's stack runs in a
                    <a :class="highlightedTool">Docker</a> container orchestrated via Docker Compose. This enables
                    Chai's dynamic rollout system: new features are gradually enabled for a subset of servers first,
                    allowing real-world validation before a full release. If anything goes wrong,
                    the system can fall back to the last stable image instantly — no downtime, no scrambling.
                    CI/CD pipelines via <a :class="highlightedTool">GitHub Actions</a> handle testing and image builds automatically on every merge.
                </p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in techTags.deployment" :key="tag"
                        class="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
