<script setup>
import axios from "axios";
import DiscordActivity from "./DiscordActivity.vue";

const userId = "146348630926819328";
const lanyardUrl = `https://api.lanyard.rest/v1/users/${userId}`;

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data.data;
}

function determineAvatarOutline(status) {
  switch (status) {
    case "online":
      return "border-green-500";
    case "offline":
      return "border-gray-300";
    case "dnd":
      return "border-red-500";
    case "idle":
      return "border-yellow-500";
    default:
      return "border-gray-500";
  }
}

const data = await fetchData(lanyardUrl);
const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${data.discord_user.avatar}.png`;
const avatarOutline = determineAvatarOutline(data.discord_status);
</script>

<template>
  <div class="glass-thick rounded-xl space-y-3 shadow-xl p-5">
    <div class="flex flex-row justify-around items-center">
      <!-- The Discord image -->
      <div class="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2" :class="avatarOutline">
        <img :src="avatarUrl" alt="Discord Avatar" />
      </div>

      <div class="ml-3">
        <h1 class="card-title">
          {{ data.discord_user.display_name }}
        </h1>

        <p class="card-body">
          {{ data.discord_user.username }} on Discord
        </p>
      </div>
    </div>

    <!-- The Discord activities, if any-->
    <div class="space-y-2" v-if="data.activities && data.activities.length != 0">
      <p class="card-title-2">Current Activities</p>

      <div v-for="activity in data.activities" :key="activity.name + activity.type + activity.created_at"
        class="flex flex-col gap-2">
        <DiscordActivity :data="activity" />
      </div>
    </div>
  </div>
</template>
