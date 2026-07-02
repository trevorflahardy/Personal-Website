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
  return `text-white text-sm font-medium flex flex-row items-center justify-center gap-2 py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl shadow transition-all duration-300 hover:scale-105 active:scale-95 ease-out ${buttonBackground.value} ${props.textExtra ?? ''}`;
});

const shouldOpenInNewTab = computed(() => props.openInNewTab ?? true);
</script>

<template>
  <a v-if="link"
    :href="link"
    :target="shouldOpenInNewTab ? '_blank' : ''"
    :class="buttonClass">
    <i v-if="icon" :class="`pi ${icon}`"></i>
    <span v-if="content">{{ content }}</span>
  </a>
  <button v-else type="button" :class="buttonClass">
    <i v-if="icon" :class="`pi ${icon}`"></i>
    <span v-if="content">{{ content }}</span>
  </button>
</template>
