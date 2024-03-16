<script setup>
const cardContents = [
  {
    title: "Why Chai?",
    description:
      "Some long text about why I made chai and why I think it's important and groundbreaking.",
    id: 1,
  },
  {
    title: "What's to Come?",
    description:
      "Some long text about what I plan to do with Chai in the future.",
    id: 2,
  },
];
</script>

<template>
  <div class="flex flex-row gap-5 justify-center items-stretch snap-center">
    <div v-for="content in cardContents" :key="content.id">
      <div
        class="basis-1/2 glass-thick p-5 rounded-xl shadow-xl text-center space-y-2 translation hover:scale-[1.03] duration-300 ease-out"
      >
        <div>
          <span class="text-white text-2xl font-semibold">
            {{ content.title }}
          </span>
        </div>

        <div>
          <span class="text-gray-300">
            {{ content.description }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
