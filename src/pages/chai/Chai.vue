<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Preview from './Preview.vue';
import DeepDive from './DeepDive.vue';
import Button from "@/components/Button.vue";

const chaiInviteLink = "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311";
</script>

<template>
  <PageLayoutSpacer>
    <!-- Holds the intro to Chai. 
    TODO; Refactor this so that it's:
    1. in its own component, ands
    2. so that it has "Chai" and stuff on the side of some sort of logo or SVG-icon. Create a modern
    feel with it, and have the preview below it for separation.-->
    <div class="w-full flex flex-row items-center justify-around">
      <!-- Holds the header and "call to action" button(s)-->
      <div class="flex flex-col items-center justify-center max-w-6xl pt-3">
        <h1 class="title text-center mb-3 text-pretty">
          Meet <a class="text-chai-200 dark:text-chai-400">Chai</a>, the Fortnite authentication Discord Bot.
        </h1>

        <p class="subtitle text-center mb-3">
          Chai is a Discord bot that allows users to authenticate their Fortnite accounts and manage their in-game data,
          all within Discord.
        </p>

        <!-- Some action buttons -->
        <div class="flex flex-row gap-5">
          <Button :link="chaiInviteLink" content="Invite Chai" icon="pi-discord" />
          <Button link="https://github.com/users/trevorflahardy/projects/11" content="Development Board"
            icon="pi-book" />
        </div>
      </div>
    </div>

    <Preview />
    <DeepDive />
  </PageLayoutSpacer>
</template>
