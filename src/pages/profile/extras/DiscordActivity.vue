<script setup lang="ts">
import { computed } from 'vue';

interface DiscordActivity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  created_at: number;
  application_id?: string;
  assets?: {
    large_image?: string;
    small_image?: string;
    large_text?: string;
    small_text?: string;
  };
}

const props = defineProps<{
  data: DiscordActivity;
}>();

function determineHeader(data: DiscordActivity): string {
  switch (data.type) {
    case 0: return `Playing ${data.name}`;
    case 1: return `Streaming ${data.name}`;
    case 2: return `Listening to ${data.details}`;
    case 3: return `Watching ${data.name}`;
    case 4: return data.state || "Custom Status";
    case 5: return `Competing in ${data.name}`;
    default: return data.name;
  }
}

function relativeTime(timestamp: number | Date): string {
  const now = new Date();
  const then = new Date(timestamp as number);
  const diff = Math.abs(then.getTime() - now.getTime());
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 3600) % 24;
  const days = Math.floor(seconds / 86400);
  const suffix = then > now ? "from now" : "ago";
  const parts = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  return parts.join(", ") + ` ${suffix}`;
}

function parseImage(applicationId: string, imageUrl: string): string {
  if (imageUrl.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${imageUrl.split(":")[1]}`;
  }
  return `https://cdn.discordapp.com/app-assets/${applicationId}/${imageUrl}.png`;
}

function determineTimestamps(data: DiscordActivity): string {
  if (data.timestamps) {
    const { start: startTimestamp, end: endTimestamp } = data.timestamps;
    if (endTimestamp) return `Ends in ${relativeTime(endTimestamp)}`;
    if (startTimestamp) return `Started ${relativeTime(startTimestamp)}`;
  }
  return `Started ${relativeTime(data.created_at)}`;
}

const header = computed(() => determineHeader(props.data));
const timestamps = computed(() => determineTimestamps(props.data));
const largeImageSrc = computed(() => {
  const { assets, application_id } = props.data;
  if (!assets?.large_image || !application_id) return null;
  return parseImage(application_id, assets.large_image);
});
const smallImageSrc = computed(() => {
  const { assets, application_id } = props.data;
  if (!assets?.small_image || !application_id) return null;
  return parseImage(application_id, assets.small_image);
});
</script>

<template>
  <div class="px-5 py-2 glass-thick shadow-lg rounded-xl space-y-2">
    <div>
      <div class="card-title-2 font-semibold text-white">
        {{ header }}
      </div>
      <div class="card-body">
        {{ timestamps }}
      </div>
    </div>

    <div class="flex flex-row gap-3 items-center">
      <div v-if="largeImageSrc" class="relative">
        <img :src="largeImageSrc" alt="Discord app large image" class="w-12 h-12 rounded-lg" />
        <div v-if="smallImageSrc" class="absolute -right-2 -bottom-2">
          <img :src="smallImageSrc" alt="Discord app small image" class="w-6 h-6 rounded-lg" />
        </div>
      </div>
      <div>
        <div v-if="props.data.assets?.large_text" class="card-body">
          {{ props.data.assets.large_text }}
        </div>
        <div v-if="props.data.assets?.small_text" class="text-gray-300 text-xs">
          {{ props.data.assets.small_text }}
        </div>
      </div>
    </div>
  </div>
</template>
