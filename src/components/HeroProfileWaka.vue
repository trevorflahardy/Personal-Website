<script setup>
import axios from "axios";
import Button from "./Button.vue";

const wakaProfileUrl = "https://wakatime.com/@trevorflahardy";

const wakaUrl =
  "https://wakatime.com/share/embeddable/trevorflahardy/969ad792-7d1c-4aaf-a45c-8b4b95858fdf.json";

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data.data;
}

function calculateDaysSinceStart(startDate) {
  const startDateTime = new Date(startDate);
  const now = new Date();
  return Math.floor((now - startDateTime) / (1000 * 60 * 60 * 24));
}

const data = await fetchData(wakaUrl);
const { range, grand_total, best_day } = data;

const daysSinceStart = calculateDaysSinceStart(range.start);
const humanReadableDaysSinceStart = daysSinceStart.toLocaleString();

const humanReadableDailyAverage =
  grand_total.human_readable_daily_average_including_other_language;
const humanReadableTotal =
  grand_total.human_readable_total_including_other_language;

const humanReadableBestDayTime = best_day.text;

const bestDayDate = new Date(best_day.date);
const humanReadableBestDay = bestDayDate.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
</script>

<template>
  <div class="glass-thick rounded-xl space-y-2 shadow-xl p-5">
    <div>
      <div>
        <span class="text-white font-semibold text-xl">
          My Coding Statistics
        </span>
      </div>
      <div>
        <span class="text-gray-300 text-sm">
          {{ humanReadableDaysSinceStart }} days of total recorded data.
        </span>
      </div>
      <div>
        <span class="text-white">
          {{ humanReadableDailyAverage }} daily average.
        </span>
      </div>
      <div>
        <span class="text-white">
          {{ humanReadableTotal }} of total coding time.</span
        >
      </div>
    </div>
    <div>
      <div>
        <span class="text-white font-semibold text-lg text-pretty">
          My Best Day
        </span>
      </div>
      <div>
        <span class="text-white">
          On {{ humanReadableBestDay }}, I logged
          {{ humanReadableBestDayTime }} of coding!
        </span>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <Button class="w-fit">
        <a :href="wakaProfileUrl" target="_blank" rel="noopener noreferrer">
          My WakaTime Profile
        </a>
      </Button>
    </div>
  </div>
</template>
