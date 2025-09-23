<script setup lang="ts">
import Glass from "./Glass.vue";

export interface ButtonProps {
  label?: string;
  link?: string;
  icon?: string;
  onClick?: () => void;
}

defineProps<ButtonProps>();
</script>

<template>
  <Glass
    type="button"
    class="px-4 py-2 rounded-md hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-pointer select-none flex items-center justify-center text-white font-semibold"
    roundedAmount="md"
    @click="onClick"
  >
    <component
      :is="link ? 'a' : 'div'"
      v-if="link"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2"
    >
      <span v-if="label">{{ label }}</span>
      <slot v-else />
      <i v-if="icon" class="pi" :class="icon"></i>
    </component>
  </Glass>
</template>
