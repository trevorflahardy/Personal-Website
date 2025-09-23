<script setup lang="ts">
export interface GlassProps {
  type?: "div" | "button";
  roundedAmount?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

const { type = "div", roundedAmount = "none" } = defineProps<GlassProps>();
const roundedClass = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
}[roundedAmount || "none"];
</script>

<!-- Represents a glass item. Each glass item builds on top of one another automatically. Wrapping an item in glass
 will create a frosted glass effect for the background.-->
<template>
  <component
    :is="type"
    class="w-full h-full bg-gray-50/30 outline-1 outline-gray-50/50 shadow-md backdrop-blur-xl dark:bg-gray-800/30 dark:outline-gray-700/40"
    :class="[roundedClass]"
  >
    <slot />
  </component>
</template>
