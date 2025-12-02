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
    <!-- Denotes what Chai can do, so some exposition on how the Client works.-->
    <!-- The centered image (preview) of Chai should be right below the "Chai in action" or call to info-->
    <div class="flex flex-row items-center justify-center w-full md:px-5 lg:px-10">
        <img src="/chai-preview.png" alt="Chai Preview" class="rounded-lg xl:rounded-3xl w-full object-cover" />
    </div>

    <div class="flex flex-row items-baseline justify-center w-full gap-2">
        <i class="pi pi-arrow-up text-white" />
        <h2 class="title-3 text-center">Chai in Action. What Happened?</h2>
    </div>

    <div class="flex flex-col gap-3 w-full">
        <!-- For each item in the action description, we're going to display an up arrow centered with the title
         on the left, the title to the right of it, and the description below the title-->
        <div v-for="entry in actionDescription" :key="entry.id" class="flex flex-row items-start justify-start"
            v-motion-slide-visible-once-left>
            <div class="flex flex-row items-start gap-3">
                <!-- The actual up arrow itself, on the left -->
                <div
                    class="bg-green-500 rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center flex-none mt-1">
                    <i class="pi pi-arrow-up text-xss md:text-xs text-gray-600 dark:text-gray-900"></i>
                </div>

                <!-- And to the right, the title + description combo. The arrow is lined with the title and the
                 description is inline with the title-->
                <div>
                    <h2 class="title-4 mb-0">
                        {{ entry.title }}
                    </h2>

                    <p class="body">
                        {{ entry.content }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Some exposition below the cards that note Chai can do much more than this, but this is just the tip of the surface-->
    <p class="subtitle w-full">
        Of course, this is just the tip of the iceberg. Chai is capable of so much more, and new features are being
        added all the time!
    </p>
</template>