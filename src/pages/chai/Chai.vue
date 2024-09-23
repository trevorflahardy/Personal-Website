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
      <!-- Holds the header and "call to action" button(s)-->
      <div
        class="py-5 px-2 bg-gray-950/30 dark:bg-gray-200/5 shadow-md rounded-[40px] w-full">

        <!-- The introduction-->
        <h1 class="title text-center mb-3 text-pretty w-full">
          Meet <span class="text-chai-200">Chai</span> <span
            class="inline-block w-4 md:w-5 lg:w-7 2xl:w-10 h-4 md:h-5 lg:h-7 2xl:h-10 align-baseline"><img
              :src="chaiIcon" alt="Chai logo icon." /></span>,
          the
          Fortnite authentication Discord Bot.
        </h1>

        <p class="subtitle text-center mb-3 px-2">
          Chai is a Discord bot that allows users to authenticate their Fortnite accounts and manage their in-game data,
          all within Discord.
        </p>

        <!-- Some action buttons -->
        <div class="flex flex-row gap-5 flex-wrap items-center justify-center">
          <Button :link="chaiInviteLink" content="Invite Chai" icon="pi-discord" />
          <Button link="https://github.com/users/trevorflahardy/projects/11" content="Development Board"
            icon="pi-book" />
        </div>
      </div>

    <Preview />
    <DeepDive />
  </PageLayoutSpacer>
</template>
