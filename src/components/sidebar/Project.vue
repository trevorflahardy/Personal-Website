<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

export interface ProjectProps {
  displayName: string;
  routerLinkName: string;
  /** Path to a project-owned icon SVG. When provided, the icon image is rendered. */
  icon?: string;
  /** CSS color (token, var, or raw) used for the typographic accent bar. */
  accent?: string;
}

const route = useRoute();
const props = defineProps<ProjectProps>();

const isActive = computed(() => {
  return route.name === props.routerLinkName ||
    route.matched.some(r => r.meta?.projectName === props.routerLinkName);
});

const accentColor = computed(() => props.accent ?? "rgba(255,255,255,0.35)");
</script>

<template>
  <button type="button"
    class="group flex flex-row items-center gap-3 rounded-xl hover:bg-white/6 transition duration-200 py-2.5 px-3 w-full"
    :class="{ 'bg-white/8 border border-white/10': isActive }">

    <!-- Icon variant — only for projects with a dedicated icon (Chai). -->
    <template v-if="icon">
      <span class="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-white/10 flex-none">
        <img :src="icon" alt="" class="object-fill w-full h-full" />
      </span>
    </template>

    <!-- Typographic variant — accent bar grows + glows on hover/active, name takes focus. -->
    <template v-else>
      <span class="accent-bar flex-none h-5 rounded-full"
        :class="{ 'accent-bar--active': isActive }"
        :style="{ '--accent': accentColor }" />
    </template>

    <span class="text-sm font-normal text-left transition-[color,transform] duration-200 group-hover:translate-x-0.5"
      :class="isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'">
      {{ displayName }}
    </span>
  </button>
</template>

<style scoped>
.accent-bar {
  width: 2px;
  opacity: 0.65;
  background-color: var(--accent);
  transition: width 0.2s ease, opacity 0.2s ease, box-shadow 0.3s ease;
}

.group:hover .accent-bar {
  width: 3px;
  opacity: 0.9;
  box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 55%, transparent);
}

.accent-bar--active {
  width: 3px;
  opacity: 1;
  box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 70%, transparent);
}
</style>
