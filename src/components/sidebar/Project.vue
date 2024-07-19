<script setup lang="ts">
import { useRoute } from "vue-router";

export interface ProjectProps {
  icon: string;
  displayName: string;
  routerLinkName: string;
}

const route = useRoute();
const props = defineProps < ProjectProps > ();
</script>

<template>
  <button
    class="flex flex-row items-center space-x-2 rounded-lg hover:glass-thin transition duration-300 ease-in-out hover:shadow-lg py-2 px-3 w-full"
    :class="{
      'glass-thin shadow-md bg-gray-300/10': route.name == props.routerLinkName
    }">
    <!-- Grab the image slot, if it exists and insert it in a circle so that it fills the width and height of the button-->
    <div class="w-7 h-7 rounded-full overflow-hidden shadow">
      <img :src="$props.icon" class="object-cover">
    </div>

    <p class="text-white text-sm">{{ props.displayName }}</p>
  </button>
</template>