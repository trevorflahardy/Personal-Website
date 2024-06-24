<script setup lang="ts">
interface Props {
  link?: string;
  content?: string;
  icon?: string;
}

defineProps<Props>();
</script>

<template>
  <!-- If the props.link is not null, we can wrap the button in it -->
  <div v-if="link">
    <a :href="link">
      <div class="button-glass text-white">
        <i v-if="icon" :class="`pi ${icon}`"></i>

        <p v-if="content" class="subtitle m-0">
          {{ content }}
        </p>
      </div>
    </a>
  </div>

  <!-- If the props.link is null, we can just render the button -->
  <div v-else class="button-glass text-white subtitle m-0">
    <p v-if="content">
      {{ content }}
    </p>
  </div>
</template>
