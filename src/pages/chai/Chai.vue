<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Preview from './Preview.vue';
import DeepDive from './DeepDive.vue';
import Button from "@/components/Button.vue";
import { icon as chaiIcon } from "./info";

const chaiInviteLink = "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311";

const glassButton = "bg-white/6 hover:bg-white/10 border border-white/10";
</script>

<template>
  <PageLayoutSpacer>
    <!-- Hero section -->
    <div class="glass-card w-full px-6 sm:px-10 md:px-14 lg:px-16 py-10 sm:py-14 md:py-16 lg:py-20 text-center">

      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold tracking-tight text-white/90 mb-4 md:mb-6">
        Meet <span class="text-chai-200">Chai</span>
        <span class="inline-flex items-center justify-center align-middle w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 mx-1 md:mx-1.5 -mt-1">
          <img :src="chaiIcon" alt="Chai logo icon." />
        </span>,
        the Fortnite Authentication Discord Bot.
      </h1>

      <!-- Subtitle -->
      <p class="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-8 md:mb-10">
        Chai is a Discord bot that allows users to authenticate their Fortnite accounts and manage their in-game data,
        all within Discord.
      </p>

      <!-- Action buttons -->
      <div class="flex flex-row gap-4 flex-wrap items-center justify-center">
        <Button :link="chaiInviteLink" content="Invite Chai" icon="pi-discord" :background="glassButton" />
        <Button link="https://github.com/users/trevorflahardy/projects/11" content="Development Board" icon="pi-book" :background="glassButton" />
      </div>
    </div>

    <Preview />
    <DeepDive />
  </PageLayoutSpacer>
</template>
