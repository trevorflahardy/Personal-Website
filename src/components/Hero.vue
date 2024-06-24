<script setup lang="ts">
import {  Transition, shallowRef, ref } from "vue";
import Sidebar from "./sidebar/Sidebar.vue";
import HeroProfile from "@/pages/profile/HeroProfile.vue";

const activeComponent = ref(shallowRef(HeroProfile));
</script>

<template>
  <div class="glass-regular-base rounded-[40px] h-[95%] sm:h-[70%] max-w-[90%] stroke-[#CBCBCB] relative">
    <div class="w-full flex flex-row items-center h-full rounded-l-[40px]">
      <Sidebar class="h-full" v-model="activeComponent" />

      <div
        class="h-full overflow-y-scroll no-scrollbar scroll-smooth snap-y sm:p-5 sm:px-2 py-12 sm:py-12 md:py-16 xl:py-5 px-3">
        <Transition name="fade">
          <component :is="activeComponent" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style>
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition:
    opacity 0.3s,
    /* transform 0.3s; */
  ;
  transition-delay: 0.3s;
}

.fade-enter-from {
  opacity: 0;
  /*transform: scale(0.95); */
}

.fade-enter-to {
  /*transform: scale(1); */
  opacity: 1;
}
</style>
