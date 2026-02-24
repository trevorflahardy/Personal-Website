<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  link?: string | null,
  content?: string | null,
  icon?: string | null,
  background?: string | null,
  textExtra?: string,
  openInNewTab?: boolean | null
}

const props = defineProps<Props>();

const buttonBackground = computed(() => {
  return props.background || "bg-gray-950/30 dark:bg-gray-200/5 hover:bg-gray-800/50 dark:hover:bg-gray-200/10";
});

const buttonClass = computed(() => {
  return `py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl shadow font-medium transition-all duration-500 hover:scale-105 ease-in-out ${buttonBackground.value}`;
});

// Want the default behavior to open in a new tab
const _shouldOpenInNewTab = props.openInNewTab ?? true;
</script>

<template>
  <!-- If the props.link is not null, we can wrap the button in it -->
  <button :class="buttonClass" type="button">
    <a v-if="link" :href="link" :target="_shouldOpenInNewTab ? '_blank' : ''"
      class="text-white text-sm font-medium flex flex-row items-center justify-center gap-2" :class="textExtra">
      <i v-if="icon" :class="`pi ${icon}`"></i>
      <span v-if="content">{{ content }}</span>
    </a>
    <div v-else class="text-white text-sm font-medium flex flex-row items-center justify-center gap-2" :class="textExtra">
      <i v-if="icon" :class="`pi ${icon}`"></i>
      <span v-if="content">{{ content }}</span>
    </div>
  </button>
</template>
