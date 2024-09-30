<script setup lang="ts">

const highlightedTool = "font-semibold text-chai-200";
</script>

<template>
    <!-- Holds the "Let's get Nerdy" section of Chai. This describes the internal workings of how Chai works and what's going
     to be upcoming in the near future.-->

    <!--HISTORY: Originally this section was all in one big card, but as time went on I thought this looked.. frankly.. very
     ugly. So to combat this we're going to split it up into sections to help the reader digest everything.-->
    <div class="w-full px-5">
        <!-- The heading for this section-->
        <div class="mb-5 flex flex-col items-center justify-center">
            <div class="flex flex-row items-center gap-2">
                <i class="pi pi-arrow-down text-white" />

                <h2 class="title-2 mb-1">
                    Deep Dive
                </h2>
            </div>

            <p class="subtitle">
                So, how does Chai work? And what is the Image Generation API?
            </p>
        </div>

        <!-- Holds all the information about the deep dive into each section.-->
        <div class="grid grid-cols-2 xl:grid-cols-3 gap-3 items-start justify-evenly"
            v-motion-slide-visible-once-bottom>
            <!-- The Discord bot element of this section -->
            <div class="text-center max-w-md">
                <h3 class="title-3">Discord Front End</h3>
                <p class="text-center max-w-lg body text-pretty">
                    The Discord bot integration is built completely in Python using the <a
                        href="https://github.com/Rapptz/discord.py" class="underline"
                        :class="highlightedTool">discord.py</a>
                    library.
                    All user data is kept lock tight in a <a :class="highlightedTool">PostgreSQL</a> database.
                </p>
            </div>

            <!-- The Rust backend section-->
            <div class="max-w-md text-center">
                <h3 class="title-3">Rust API Backend</h3>
                <p class="text-xs md:text-sm italic text-pretty text-gray-300 font-light">
                    The Rust API offloads slow image manipulation to a faster, more efficient API. This gives
                    Chai the ability for more complex features.
                </p>
                <p class="body text-pretty">
                    The Rust API backend is built using the <a href="https://github.com/tokio-rs/axum" class="underline"
                        :class="highlightedTool">Axum web</a>
                    framework. Doubling down on <a :class="highlightedTool">PostgresSQL</a>, the API also uses <a
                        :class="highlightedTool">Redis</a> for long term and short term storage, respectively.
                </p>
            </div>

            <!-- Deployment -->
            <div class="max-w-md text-center">
                <h3 class="title-3">
                    Deployment
                </h3>
                <p class="body text-pretty">
                    Chai is managed using <a :class="highlightedTool">Docker</a> containers with Docker Compose. This
                    allows
                    Chai's dynamic rollout system to gradually rollout new features to
                    servers and fall back to stable versions if needed.
                </p>
            </div>

        </div>
    </div>
</template>