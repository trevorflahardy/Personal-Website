<script setup lang="ts">
import { onBeforeMount, ref, TransitionGroup } from 'vue';

interface Block {
  id: number;
  label: number;
  color: string | null;
  backgroundColor: string;
}

function backgroundColor(color: string | null): string {
  if (color != null) {
    return `bg-${color}`;
  }

  return "glass-thin"
}

const imageCount: number = 20;
const blocks = ref<Block[]>([]);

onBeforeMount(() => {
  for (let i = 0; i < imageCount; i++) {
    let color = null;

    blocks.value.push({
      id: i,
      label: i + 1,
      color: color,
      backgroundColor: backgroundColor(color)
    });
  }
});

function changeBlockColor(index: number, color: string | null) {
  let block = blocks.value[index];
  block.color = color;
  block.backgroundColor = backgroundColor(color);
}

function nextColor(color: string | null) {
  switch (color) {
    case "green-400":
      return "yellow-400";
    case "yellow-400":
      return "orange-500";
    case "orange-500":
      return "red-500";
    case "red-500":
      return "red-500";
    default:
      return "green-400";
  }
}

function swapWithRandomBlock(index: number) {
  // Get a random block that isn't the current block
  let randomBlockIndex = Math.floor(Math.random() * imageCount);

  while (randomBlockIndex === index) {
    randomBlockIndex = Math.floor(Math.random() * imageCount);
  }

  // Set the current block and the random block to new colors depending on their current.
  // If a block is green, set it to yellow. If it's yellow, set it to red. And if it's red do nothing.
  let currentBlock = blocks.value[index];
  changeBlockColor(index, nextColor(currentBlock.color));

  let randomBlock = blocks.value[randomBlockIndex];
  changeBlockColor(randomBlockIndex, nextColor(randomBlock.color));

  // Swap these two blocks in the array
  const tempBlock = blocks.value[index];
  blocks.value[index] = blocks.value[randomBlockIndex];
  blocks.value[randomBlockIndex] = tempBlock;
}

function swapBlocks() {
  const randomBlockIndex = Math.floor(Math.random() * imageCount);
  swapWithRandomBlock(randomBlockIndex);

  // If all the blocks are green, reset them
  if (blocks.value.every(block => block.color === "red-500")) {
    blocks.value.forEach((block, index) => {
      changeBlockColor(index, null);
    });
  }
}

setInterval(swapBlocks, 2000);
</script>

<template>
    <div class="grid grid-cols-5 gap-1 flex-shrink-0">
      <TransitionGroup name="fade-swap">
        <div v-for="block in blocks" :key="block.id"
          class="shadow rounded-xl text-center flex items-center justify-center transition-all duration-500 ease-in-out w-16 h-16"
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