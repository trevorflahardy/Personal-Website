<script setup lang="ts">
import { useRoute } from "vue-router";

export interface ProjectProps {
  icon: string;
  displayName: string;
  routerLinkName: string;
}

const route = useRoute();
const props = defineProps<ProjectProps>();
</script>

<template>
  <button type="button"
    class="flex flex-row items-center gap-3 rounded-xl hover:bg-white/8 transition duration-300 ease-in-out py-2.5 px-3 w-full"
    :class="{
      'bg-white/8 border border-white/10': route.name == props.routerLinkName
    }">
    <div class="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-white/10">
      <img :src="props.icon" alt="Project preview icon" class="object-fill w-full h-full" />
    </div>

    <span class="text-white/80 text-sm font-normal">{{ props.displayName }}</span>
  </button>
</template>
