<script setup lang="ts">
const actionDescription = [
    {
        id: 1,
        title: "A user requested to see their accounts.",
        content: "Chai responded with the account management panel. Here, a user can logout of accounts, add more, or change privacy settings."
    },
    {
        id: 2,
        title: "The user requested to see their Fortnite locker.",
        content: "The user invoked a command to visualize their Fortnite locker."
    },
    {
        id: 3,
        title: "Chai fetched their cosmetics.",
        content: "Chai bot accessed the user's account, sorted their cosmetics for the filters the user selected, and handed the list of cosmetics off to the image generation API."
    },
    {
        id: 4,
        title: "The image generation API runs.",
        content: "The image generation API accepts the user's request and validates requested cosmetics. The image is merged together, and returned to the Discord client alongside some metadata."
    },
    {
        id: 5,
        title: "The image is displayed.",
        content: "Once received, the image is embedded and sent back to the user!"
    }
];

</script>

<template>
    <!-- Preview image with glass treatment -->
    <div class="w-full">
        <div class="glass-card p-2 sm:p-3 md:p-4">
            <img src="/chai-preview.png" alt="Chai Preview" class="rounded-xl w-full object-cover" />
        </div>
    </div>

    <!-- Section heading -->
    <div class="w-full text-center">
        <h2 class="title-2 mb-2">Chai in Action</h2>
        <p class="subtitle">What happened in the preview above? Here's the breakdown.</p>
    </div>

    <!-- Step-by-step breakdown -->
    <div class="flex flex-col w-full max-w-3xl mx-auto">
        <div
            v-for="(entry, index) in actionDescription"
            :key="entry.id"
            class="relative flex flex-row items-start gap-4 sm:gap-5 pb-8 last:pb-0"
            v-motion-slide-visible-once-left
        >
            <!-- Step indicator with connecting line -->
            <div class="flex flex-col items-center flex-none">
                <!-- Numbered circle -->
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-chai-400/15 border border-chai-400/30 flex items-center justify-center">
                    <span class="text-sm md:text-base font-semibold text-chai-200">{{ entry.id }}</span>
                </div>
                <!-- Connecting line -->
                <div
                    v-if="index < actionDescription.length - 1"
                    class="w-px flex-1 min-h-6 bg-white/8 mt-2"
                ></div>
            </div>

            <!-- Step content -->
            <div class="pt-1">
                <h3 class="title-4 mb-1">
                    {{ entry.title }}
                </h3>
                <p class="card-body">
                    {{ entry.content }}
                </p>
            </div>
        </div>
    </div>

    <!-- Closing note -->
    <p class="subtitle w-full text-center max-w-2xl mx-auto">
        Of course, this is just the tip of the iceberg. Chai is capable of so much more, and new features are being
        added all the time!
    </p>
</template>
