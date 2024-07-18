<script setup lang="ts">
import PageLayoutSpacer from "@/components/PageLayoutSpacer.vue";
import Card, { CardProps } from "./components/Card.vue";
import Preview from './Preview.vue';
import DeepDive from './DeepDive.vue';

const chaiMetadata: CardProps[] = [
  {
    title: "What is a Chai?",
    body: "Chai is a Discord bot that is powered by Python. It is designed to help Fortnite players with various tasks such as checking the current item shop, checking their stats, and more.",
    backgroundColor: `bg-gradient-to-t from-chai via-blue-400 to-emerald-400`,
    textColor: "text-white"
  },
  {
    title: "How does Chai Work?",
    body: "Chai uses the undocumented Epic Games API to allow users to link their Fortnite account to Discord. This gives Chai the ability to pull data from the user's Fortnite account and display it in Discord!",
    backgroundColor: "bg-glass-thick"
  }
]
</script>

<template>
  <PageLayoutSpacer>
    <div class="w-full">
      <h1 class="hero-title text-center">
        Chai
      </h1>

      <h2 class="subtitle text-center">
        The Python and Rust-powered Fortnite Discord bot.
      </h2>
    </div>

    <!-- Holds the information cards about the bot -->
    <div class="flex flex-row flex-wrap content-around items-stretch justify-around gap-2">
      <Card :title="meta.title" :body="meta.body" :backgroundColor="meta.backgroundColor" :textColor="meta.textColor"
        v-for="meta in chaiMetadata" :id="meta" />
    </div>

    <div class="w-full h-fit flex flex-row items-center justify-center">
      <Preview />
    </div>
    <DeepDive />
  </PageLayoutSpacer>
</template>
