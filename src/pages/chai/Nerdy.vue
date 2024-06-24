<script setup lang="ts">

const highlightedTool = "font-semibold text-chai";
</script>

<template>
    <!-- Holds the "Let's get Nerdy" section of Chai. This describes the internal workings of how Chai works and what's going
     to be upcoming in the near future.-->
    <div class="p-5 glass-thick rounded-xl">
        <!-- Title and caption-->
        <div>
            <h1 class="card-title">
                Let's get Nerdy!
            </h1>
            <p class="card-caption">
                So we know what Chai is and how it works, but what is it built in?
            </p>
        </div>

        <!-- About the Discord bot front end -->
        <div>
            <h2 class="card-title-2">
                Discord Bot Front End
            </h2>

            <!-- Shows a small bullet list of the things that makeup the front end -->
            <ul class="list-disc list-inside card-body mb-2">
                <li class="card-body">
                    The Discord bot integration is built completely in Python using the <a
                        href="https://github.com/Rapptz/discord.py" class="underline"
                        :class="highlightedTool">discord.py</a>
                    library.
                    This dynamic library allows for easy integration with the Discord API and allows for the bot to be
                    easily maintained and updated.</li>

                <li class="card-body">
                    The bot stores all of its user data in a <a :class="highlightedTool">PostgreSQL</a> database.
                    This
                    allows for safe, easy data retrieval and storage for the bot to use when needed.
                </li>
            </ul>
        </div>

        <!-- About the Rust API backend that's in testing -->
        <div>
            <h2 class="card-title-2">
                Rust API Backend
            </h2>

            <p class="card-caption italic">
                The Rust API's main purpose is to offload the slow image manipulation and generation from the Discord
                bot to a faster, more efficient API. This allows for faster image generation and storage for the bot to
                use when needed. This is currently only in testing and is not yet live.
            </p>

            <!-- Shows a small bullet list of the things that the API does - so Rust axum API for image generation.
             Uses the postgresSQL database for long term storage and redis for short term storage.-->
            <ul class="list-disc list-inside card-body mb-2">
                <li class="card-body">
                    The Rust API backend is built using the <a href="https://github.com/tokio-rs/axum" class="underline"
                        :class="highlightedTool">Axum web</a>
                    framework. This allows for easy and fast
                    integration with the Discord bot and allows for easy image generation and storage.
                </li>
                <li class="card-body">
                    The API uses a <a :class="highlightedTool">PostgresSQL</a> database for long term storage and <a
                        :class="highlightedTool">Redis</a>
                    for short term storage. This
                    allows for fast and easy data retrieval and storage for the API to use when needed.
                </li>
            </ul>
        </div>

        <!-- A brief section regarding how the bot is managed - via docker. -->
        <div>
            <h2 class="card-title-2">
                Bot Deployment
            </h2>

            <p class="card-caption">
                The bot is managed using <a :class="highlightedTool">Docker</a> containers via Docker Compose. With
                this, Chai has a dynamic rollout system for new updates that allows new features to gradually rollout to
                servers, and fall back to stable versions if needed.
            </p>
        </div>
    </div>
</template>