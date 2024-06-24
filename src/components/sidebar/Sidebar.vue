<script setup lang="ts">
import { ref, computed } from "vue";
import Content from "./Content.vue";

const activeComponent = defineModel({
  required: true
});

// Holds if the hamburger is open or not on mobile
const isHamburgerOpen = ref(false);
const hamburgerRotation = computed(() => {
  return isHamburgerOpen.value ? "rotate-90" : "rotate-0";
});

function toggleHamburger() {
  isHamburgerOpen.value = !isHamburgerOpen.value;
}

</script>

<template>
  <div>
    <!-- Represents the desktop sidebar. This sidebar is always visible on desktop-->
    <div class="hidden xl:flex h-full w-full">
      <Content v-model="activeComponent" />
    </div>

    <!-- Represents a mobile sidebar. This is a hamburger shown in the top left that then opens a desktop-like menu but
        with some optimizations. -->
    <div class="flex xl:hidden h-full w-fill">
      <!-- Shows the hamburger. When disabled it's rotated 0 but when enabled it's rotated 90 -->
      <Transition name="spin">
        <button class="absolute z-20 top-0 left-0 p-5" :key="hamburgerRotation" :class="hamburgerRotation"
          @click="toggleHamburger()">
          <i class="pi pi-bars text-white" />
        </button>
      </Transition>

      <!-- Shows the actual sidebar that slides in on click OVER the other content-->
      <div class="absolute z-10 top-0 left-0 w-fill h-full rounded-[40px]" v-if="isHamburgerOpen">
        <Content v-model="activeComponent" />
      </div>
    </div>
  </div>

</template>
