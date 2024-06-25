<script setup lang="ts">
import { Transition } from "vue";
import Sidebar from "./sidebar/Sidebar.vue";
</script>

<template>
  <div class="glass-regular-base rounded-[40px] h-[95%] sm:h-[80%] max-w-[90%] stroke-[#CBCBCB] relative">
    <div class="w-full flex flex-row items-center h-full rounded-l-[40px]">
      <Sidebar class="h-full" />

      <div
        class="h-full overflow-y-scroll no-scrollbar scroll-smooth snap-y sm:p-5 sm:px-2 py-12 sm:py-12 md:py-16 xl:py-5 px-3">
        <router-view v-slot="{ Component }">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
