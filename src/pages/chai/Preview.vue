<script setup lang="ts">
import Button from '@/components/Button.vue';

const chaiInviteLink = "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311"
</script>

<template>
    <!-- Below the cards we'll show a preview of something Chai can do and why this matters-->
    <div class="rounded-2xl mx-10 md:mx-20 glass-thick max-w-2xl mb-5">
        <!-- The image for the ChaiPreview on top of this card. The card will span basically the width of the page-->
        <img src="@/assets/ChaiPreview.png" alt="Chai Preview" class="rounded-xl w-full max-w-2xl object-cover" />

        <!-- The content of this card, showing the bot and having a link to invite the bot -->
        <div class="p-5 max-w-2xl">
            <div class="mb-2">
                <h1 class="card-title">
                    Chai in Action
                </h1>

                <p class="card-body mb-2">
                    Here is a preview of Chai in action. So what's happening here?
                </p>

                <!-- Shows a small bullet list of the things that are happening -->
                <ul class="list-disc list-inside card-body mb-2">
                    <li>The user requested to manage their linked Fortnite accounts, and,</li>
                    <li>the user requested to see all of the Fortnite cosmetics they have purchased.</li>
                </ul>

                <p class="card-body">
                    Chai pulled live data data from the user's Fortnite account, built a custom image of all the
                    cosmetics they
                    have purchased, and sent it back to the user in Discord. This is just one of the many things Chai
                    can do!
                </p>
            </div>

            <!-- A sub section that invites users to try Chai -->
            <div>
                <h2 class="card-title-2">
                    Want to try Chai?
                </h2>

                <p class="card-body mb-5">
                    Chai is completely free to use, and you can invite it to your Discord server by clicking
                    the button below! All you need is a Discord account and a Fortnite account to get started.
                </p>

                <Button content="Invite to Discord" icon="pi-discord" :link="chaiInviteLink" />
            </div>
        </div>
    </div>

</template>