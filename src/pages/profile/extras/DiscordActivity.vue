<script setup>
const props = defineProps({
  data: Object,
});

function determineHeader(data) {
  switch (data.type) {
    case 0:
      return `Playing ${data.name}`;
    case 1:
      return `Streaming ${data.name}`;
    case 2:
      return `Listening to ${data.details}`;
    case 3:
      return `Watching ${data.name}`;
    case 4:
      return data.state || "Custom Status";
    case 5:
      return `Competing in ${data.name}`;
  }
}

// Takes in a timestamp and returns its relative time to/from now. So "7 hours ago" or "in 2 hours"
function relativeTime(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);

  const diff = Math.abs(then - now); // Calculate the absolute difference between the future timestamp and now
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(minutes / 60) % 24;
  const days = Math.floor(hours / 24);

  if (then > now) {
    return formatRelativeTime(days, hours, minutes, "from now");
  } else {
    return formatRelativeTime(days, hours, minutes, "ago");
  }
}

function formatRelativeTime(days, hours, minutes, suffix) {
  const timeParts = [];

  if (days > 0) {
    timeParts.push(`${days} ${days === 1 ? "day" : "days"}`);
  }

  if (hours > 0) {
    timeParts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }

  if (minutes > 0) {
    timeParts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }

  return timeParts.join(", ") + ` ${suffix}`;
}

function parseImage(applicationId, imageUrl) {
  // If the image starts with "spotify:", it's a Spotify image, so we need to use a different URL
  if (imageUrl.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${imageUrl.split(":")[1]}`;
  }

  return `https://cdn.discordapp.com/app-assets/${applicationId}/${imageUrl}.png`;
}

function determineTimestamps(data) {
  if (data.timestamps) {
    const startTimestamp = data.timestamps.start;
    const endTimestamp = data.timestamps.end;

    if (endTimestamp) {
      const end = new Date(endTimestamp);
      return `Ends in ${relativeTime(end)}`;
    } else if (startTimestamp) {
      const start = new Date(startTimestamp);
      return `Started ${relativeTime(start)}`;
    }

    const start = new Date(data.timestamps.start);
    return `Started ${relativeTime(start)}`;
  }

  const createdAt = new Date(data.created_at);
  return `Started ${relativeTime(createdAt)}`;
}

const data = props.data;
</script>

<template>
  <div class="px-5 py-2 glass-thick shadow-lg rounded-xl space-y-2">
    <div>
      <div class="card-title-2 font-semibold text-white">
        {{ determineHeader(data) }}
      </div>
      <div class="card-body">
        {{ determineTimestamps(data) }}
      </div>
    </div>

    <div class="flex flex-row gap-3 items-center">
      <div v-if="data.assets">
        <div v-if="data.assets.large_image" class="relative">
          <img :src="parseImage(data.application_id, data.assets.large_image)" alt="Discord app large image"
            class="w-12 h-12 rounded-lg" />

          <div v-if="data.assets.small_image" class="absolute -right-2 -bottom-2">
            <img :src="parseImage(data.application_id, data.assets.small_image)" alt="Discord app small image"
              class="w-6 h-6 rounded-lg" />
          </div>
        </div>
      </div>
      <div>
        <div v-if="data.assets && data.assets.large_text" class="card-body">
          {{ data.assets.large_text }}
        </div>
        <div v-if="data.assets && data.assets.small_text" class="text-gray-300 text-xs">
          {{ data.assets.small_text }}
        </div>
      </div>
    </div>
  </div>
</template>
