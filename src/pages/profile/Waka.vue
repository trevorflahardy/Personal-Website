<script setup>
import axios from "axios";
import Button from "@/components/Button.vue";

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
const { grand_total, best_day } = data;

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
  <div class="glass-thick bg-gray-300/10 rounded-xl shadow-xl sm:p-5 p-3">
    <h1 class="card-title">
      My Coding Statistics
    </h1>

    <p class="card-body">
      {{ humanReadableDailyAverage }} daily average.
    </p>

    <p class="card-body">
      {{ humanReadableTotal }} of total coding time.</p>

    <p class="card-title-2">
      My Best Day
    </p>

    <p class="card-body mb-3">
      On {{ humanReadableBestDay }}, I logged
      {{ humanReadableBestDayTime }} of coding!
    </p>

    <Button class="w-fit" :link="wakaProfileUrl" icon="pi-clock" content="View Waka Profile" />
  </div>
</template>
