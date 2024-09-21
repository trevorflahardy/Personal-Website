<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Preview from './Preview.vue';
import DeepDive from './DeepDive.vue';
import Button from "@/components/Button.vue";
import { icon as chaiIcon } from "./info";

const chaiInviteLink = "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311";
</script>

<template>
  <PageLayoutSpacer>
    <div class="w-full flex flex-row items-center justify-around">
      <!-- Holds the header and "call to action" button(s)-->
      <div
        class="flex flex-col items-center justify-center max-w-6xl pt-3 bg-gray-950/30 dark:bg-gray-200/5 glass-thick rounded-[40px] py-5 px-2">

        <!-- The introduction-->
        <h1 class="title text-center mb-3 text-pretty max-w-[80%]">
          Meet <span class="text-chai-200">Chai</span> <span
            class="inline-block w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7 align-baseline"><img :src="chaiIcon" /></span>,
          the
          Fortnite authentication Discord Bot.
        </h1>

        <p class="subtitle text-center mb-3 px-2">
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
