<script setup>
import { ref } from 'vue';

const imageCount = 20;
const blocks = ref([]);

for (let i = 0; i <= imageCount; i++) {
  blocks.value.push({
    label: i
  });
}
</script>

<template>
  <div class="flex flex-row items-center justify-center gap-7 pt-5">
    <div class="text-left text-6xl font-bold">
      <div>
        <span class="text-white">
          Image
        </span>
      </div>
      <div>
        <span class="text-white">
          Merger
        </span>
      </div>
    </div>

    <div class="grid grid-cols-5 gap-2">
      <div v-for="i in imageCount" :key="i">
        <div class="glass-thick shadow rounded-xl text-center flex items-center justify-center w-20 h-20">
          <span class="text-white font-semibold text-2xl">
            {{ blocks[i].label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
