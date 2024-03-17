<script setup>
import axios from "axios";
import Button from "./Button.vue";

const wakaProfileUrl = "https://wakatime.com/@trevorflahardy";

const wakaUrl =
  "https://wakatime.com/share/embeddable/trevorflahardy/969ad792-7d1c-4aaf-a45c-8b4b95858fdf.json";

const response = await axios.get(wakaUrl);
const allData = response.data;
const data = allData["data"];

const startDate = data["range"]["start"]; // Such as "2022-11-08T05:00:00Z"

// Parse the date string into a Date object so we can get the days since the start date
const startDateTime = new Date(startDate);
const now = new Date();
const daysSinceStart = Math.floor(
  (now - startDateTime) / (1000 * 60 * 60 * 24)
);
const humanReadableDaysSinceStart = daysSinceStart.toLocaleString();

const humanReadableDailyAverage =
  data["grand_total"]["human_readable_daily_average_including_other_language"];
const humanReadableTotal =
  data["grand_total"]["human_readable_total_including_other_language"];

const humanReadableBestDayTime = data["best_day"]["text"];

const bestDayDate = new Date(data["best_day"]["date"]);
// Parse this date string into a Date object so we can get the day of the week and the month and year in the format, "Month, Day, Year"
const bestDayDateTime = new Date(bestDayDate);
const humanReadableBestDay = bestDayDateTime.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
</script>

<template>
  <div class="glass-thick rounded-xl space-y-2 shadow-xl">
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
        <span class="text-white font-semibold text-lg"> My Best Day </span>
      </div>
      <div>
        <span class="text-white">
          On {{ humanReadableBestDay }}, I logged
          {{ humanReadableBestDayTime }} of coding.
        </span>
      </div>
    </div>

    <div class="flex items-center justify-end">
      <Button class="w-fit">
        <a :href="wakaProfileUrl" target="_blank" rel="noopener noreferrer">
          View My WakaTime Profile
        </a>
      </Button>
    </div>
  </div>
</template>
