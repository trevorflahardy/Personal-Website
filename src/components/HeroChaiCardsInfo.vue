<script setup>
const chaiUrl =
  "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311";
import DiscordIcon from "@/assets/DiscordIcon.vue";
</script>

<template>
  <div class="flex flex-row items-stretch justify-center gap-5 snap-center">
    <article
      class="basis-1/3 shadow-xl rounded-xl px-5 py-12 bg-gradient-to-br from-yellow-500 from-40 to-red-600 h-full"
    >
      <span class="text-white text-4xl font-semibold text-balance">
        Built in Python, expanded in Rust.
      </span>
    </article>

    <article
      class="basis-2/3 bg-gradient-to-br from-blue-500 to-indigo-800 shadow rounded-xl overflow-hidden p-5 space-y-5 flex flex-col items-center justify-center"
    >
      <div class="space-y-1">
        <div>
          <span class="text-white text-2xl font-semibold">
            Try on Discord
          </span>
        </div>

        <div>
          <span class="text-gray-300 text-md">
            Some sort of descripiton about trying the bot on Discord. This can
            be super duper long and take up multiple lines so that the card
            looks super duper good.
          </span>
        </div>
      </div>

      <div class="self-end">
        <a :href="chaiUrl">
          <button class="button-glass">
            <DiscordIcon class="w-5 h-5 fill-white" />
            <span class="text-white font-semibold"> Try on Discord </span>
          </button>
        </a>
      </div>
    </article>
  </div>
</template>
