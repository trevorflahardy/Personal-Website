<script setup lang="ts">
import { ref, computed } from "vue";
import Content from "./Content.vue";

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
  <nav class="w-full">
    <!-- Represents the desktop sidebar. This sidebar is always visible on desktop-->
    <div
      class="hidden xl:flex h-full w-full transform-gpu outline outline-1 outline-gray-300 dark:outline-gray-500 rounded-[40px]"
      data-tilt data-tilt-max="3" data-tilt-reverse="true">
      <Content v-model="isHamburgerOpen" />
    </div>

    <!-- Represents a mobile sidebar. This is a hamburger shown in the top left that then opens a desktop-like menu but
        with some optimizations. -->
    <div class="flex xl:hidden h-full">
      <!-- Shows the hamburger. When disabled it's rotated 0 but when enabled it's rotated 90 -->
      <Transition name="spin">
        <button type="button" class="absolute z-20 top-0 left-0 p-5" :key="hamburgerRotation" :class="hamburgerRotation"
          @click="toggleHamburger()">
          <i class="pi pi-bars text-white" />
        </button>
      </Transition>

      <!-- Shows the actual sidebar that slides in on click OVER the other content-->
      <Transition name="fade-in">
        <div class="z-10 top-0 left-0 w-fill h-full rounded-[40px]" v-if="isHamburgerOpen">
          <Content v-model="isHamburgerOpen" />
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
/* Ensures that the hamburger rotates 90deg every time it's clicked */
.spin-enter-active {
  transition: all .5s;
}

.spin-enter-from {
  transform: rotate(-90deg);
}

.spin-enter-to {
  transform: rotate(0);
}

/* The fade in transition for the sidebar in mobile view. This will simply
update the opacity from 0 to 100 over the animation, and gradually add the backdrop
blur so it isn't harsh when showing the sidebar.*/
@keyframes fade-in {

  /* Backdrop filter cannot be animated properly yet due to it being
  a newer item in CSS. Thus, we're going to animate the opacity as
  we go from->to. */
  from {
    opacity: 0;
    backdrop-filter: blur(0px) opacity(0%);
  }

  to {
    opacity: 1;
    backdrop-filter: blur(24px) opacity(100%);
  }
}

.fade-in-enter-active {
  animation: fade-in .5s;
}

.fade-in-leave-active {
  animation: fade-in .5s reverse;
}
</style>