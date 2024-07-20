<script setup lang="ts">
import Card from './components/Card.vue';

</script>

<template>
    <!-- Denotes what Chai can do, so some exposition on how the Client works.-->
    <!-- The centered image (preview) of Chai should be right below the "Chai in action" or call to info-->
    <div class="flex flex-row items-center justify-center w-full px-10">
        <img src="@/assets/ChaiPreview.png" alt="Chai Preview" class="rounded-xl w-full object-cover" />
    </div>

    <div class="flex flex-row items-baseline justify-center w-full gap-2">
        <i class="pi pi-arrow-up text-white" />
        <h2 class="title-2 text-center">Chai in Action. What Happened?</h2>
    </div>

    <!-- And some exposition into what is happening in the preview - so the user can get an idea of what 
     the Client can do. -->
    <div class="px-5 w-full space-y-5">
        <!-- Holds the cards denoting that happened. The user reads from left to right so this naturally
         shows the story.-->
        <div class="flex flex-row items-start justify-around gap-5">
            <!-- TODO: Maybe better branding background gradients-->
            <Card title="A user managed their accounts:"
                body="The user requested to managed their linked Fortnite accounts. Chai pulled live data from the user's connected Fortnite account and obtained all the accounts the user has linked. Users can manage friends, including sending and receiving friend requests; change Fortnite settings; and more!"
                background-color="bg-gradient-to-br from-discord-100 to-discord-200"
                class="max-w-xl transition-all duration-200 ease-in-out hover:scale-[1.03]" />

            <Card title="The user then viewed their locker:"
                body="The user requested to see all of their Fortnite locker. Chai pulled live data from the user's connected Fortnite account and obtained all the cosmetics the user owns. Users can filter by type, rarity, and cosmetic set to find the perfect outfit."
                background-color="bg-gradient-to-br from-discord-100 to-discord-200"
                class="max-w-xl transition-all duration-200 ease-in-out hover:scale-[1.03]" />
        </div>

        <!-- Some exposition below the cards that note Chai can do much more than this, but this is just the tip of the surface-->
        <p class="subtitle w-full">
            Of course, this is just the tip of the iceberg. Chai is capable of so much more, and new features are being
            added all the time!
        </p>
    </div>
</template>