<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: String,
});
</script>

<template>
  <div
    class="glass-thick rounded-xl text-center flex items-center justify-center w-20 h-20"
  >
    <span class="text-white font-semibold text-2xl">
      {{ props.label }}
    </span>
  </div>
</template>
