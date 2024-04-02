<script setup>
const props = defineProps({
  link: {
    type: String,
    required: false
  }
});

</script>

<template>
  <!-- If the props.link is not null, we can wrap the button in it -->
  <div v-if="link">
    <a :href="link">
      <div class="button-glass text-white">
        <slot></slot>
      </div>
    </a>
  </div>

  <!-- If the props.link is null, we can just render the button -->
  <div v-else class="button-glass text-white">
    <slot></slot>
  </div>
</template>
