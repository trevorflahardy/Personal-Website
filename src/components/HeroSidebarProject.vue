<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="flex flex-row items-center space-x-2 rounded-lg hover:glass-thin transition duration-300 ease-in-out hover:shadow-lg [transform: translateZ(30px)] py-2 px-3"
  >
    <!-- Grab the image slot, if it exists and insert it in a circle so that it fills the width and height of the button-->
    <div class="w-7 h-7 rounded-full overflow-hidden">
      <slot name="image" class="rounded-full object-cover overflow-hidden" />
    </div>

    <p class="text-white text-sm">{{ props.title }}</p>
  </button>
</template>
