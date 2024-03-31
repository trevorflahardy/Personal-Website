<script setup>
import { onBeforeMount, ref, TransitionGroup } from 'vue';

const colors = [
  "rose",
  "pink",
  "purple",
  "indigo",
  "blue",
  "sky",
  "cyan",
  "teal",
  "emerald",
  "green",
  "yellow",
  "orange",
  "red",
]

const colorValues = [
  "400", "500", "600",
]

function randomColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomColorValue = colorValues[Math.floor(Math.random() * colorValues.length)];
  return `${randomColor}-${randomColorValue}`
}


function backgroundColor(color) {
  return `bg-${color}`;
}

const imageCount = 20;
const blocks = ref([]);

onBeforeMount(() => {
  for (let i = 0; i < imageCount; i++) {
    let color = randomColor();

    blocks.value.push({
      id: i,
      label: i + 1,
      color: color,
      backgroundColor: backgroundColor(color)
    });
  }
});

function changeBlockColor(index, color) {
  let block = blocks.value[index];
  block.color = color;
  block.backgroundColor = backgroundColor(color);
}

function swapWithRandomBlock(index) {
  // Get a random block that isn't the current block
  let randomBlockIndex = Math.floor(Math.random() * imageCount);
  while (randomBlockIndex === index) {
    randomBlockIndex = Math.floor(Math.random() * imageCount);
  }

  // Swap these two blocks in the array
  const tempBlock = blocks.value[index];
  blocks.value[index] = blocks.value[randomBlockIndex];
  blocks.value[randomBlockIndex] = tempBlock;
}

function doRandomAction() {
  // Get a random number between 1 and 100
  const action = Math.floor(Math.random() * 100) + 1;

  const randomBlockIndex = Math.floor(Math.random() * imageCount);

  if (action >= 1 && action <= 50) {
    changeBlockColor(randomBlockIndex, randomColor())
  }
  else {
    swapWithRandomBlock(randomBlockIndex);
  }
}

setInterval(doRandomAction, 2000);
</script>

<template>
    <div class="grid grid-cols-5 gap-2">
      <TransitionGroup name="fade-swap">
        <div v-for="block in blocks" :key="block.id"
          class="shadow rounded-xl text-center flex items-center justify-center w-20 h-20 transition-all duration-500 ease-in-out"
          :class="block.backgroundColor">
          <span class="text-white font-semibold text-2xl">
            {{ block.label }}
          </span>
        </div>
      </TransitionGroup>
    </div>
</template>

<style>
.fade-swap-enter-active,
.fade-swap-leave-active,
.fade-swap-move {
  transition: all 1s ease;
}

.fade-swap-enter-from,
.fade-swap-leave-to {
  opacity: 0;
}

.fade-swap-enter-to,
.fade-swap-leave-from {
  opacity: 1;
}

.fade-swap-leave-active {
  position: absolute;
}
</style>