<script setup lang="ts">
interface Props {
  link?: string | null,
  content?: string | null,
  icon?: string | null,
  background?: string | null,
}

const props = defineProps<Props>();

const buttonBackground = props.background || "bg-gray-300/10";
const buttonClass = `py-3 px-5 rounded-xl shadow transition-all duration-400 hover:scale-105 ease-in-out ${buttonBackground}`;
</script>

<template>
  <!-- If the props.link is not null, we can wrap the button in it -->
  <button :class="buttonClass">
    <a v-if="link" :href="link" class="text-white subtitle m-0 flex flex-row items-center justify-center gap-2">
      <i v-if="icon" :class="`pi ${icon}`"></i>
      <p v-if="content">{{ content }}</p>
    </a>
    <div v-else class="text-white subtitle m-0 flex flex-row items-center justify-center gap-2">
      <i v-if="icon" :class="`pi ${icon}`"></i>
      <p v-if="content">{{ content }}</p>
    </div>
  </button>
</template>
