<script setup>
import Button from "@/components/Button.vue";

const chaiUrl =
  "https://discord.com/oauth2/authorize?client_id=728115804826239017&scope=bot&permissions=422964311";
</script>

<template>
  <div class="flex flex-row flex-wrap items-stretch justify-center gap-5 snap-center">
    <article
      class="basis-1/3 shadow-xl rounded-xl p-5 bg-gradient-to-br from-yellow-500 from-40 to-red-600 h-full title-2">
      Built in Python, expanded in Rust.
    </article>

    <article
      class="basis-2/3 bg-gradient-to-br from-blue-500 to-indigo-800 shadow rounded-xl overflow-hidden p-5 flex flex-col items-start justify-center">
      <p class="card-title w-full">
        Try on Discord
      </p>

      <p class="card-body mb-4">
        Interested? Add Chai to your Discord server, login to your Epic
        Games account, and start using Fortnite stats commands now!
      </p>

      <Button :link="chaiUrl" content="Try on Discord" icon="pi-discord" />
    </article>
  </div>
</template>
