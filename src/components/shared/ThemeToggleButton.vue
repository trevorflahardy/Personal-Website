<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { useTheme } from "@/composables/useTheme";
import { computed } from "vue";

const { colorMode, toggleTheme } = useTheme();

const currentIcon = computed(() => {
  return colorMode.value === "dark" ? "pi-sun" : "pi-moon";
});
</script>

<template>
  <Button :icon="currentIcon" @click="toggleTheme" />
</template>
