<script setup lang="ts">
import Sidebar from "./sidebar/Sidebar.vue";
</script>

<template>
  <div class="glass-regular-base rounded-[40px] h-[95%] sm:h-[80%] max-w-[90%] stroke-[#CBCBCB] relative">
    <div class="w-full flex flex-row items-center h-full rounded-l-[40px]">
      <Sidebar class="h-full" />

      <div
        class="h-full overflow-y-scroll no-scrollbar scroll-smooth snap-y sm:p-5 sm:px-2 py-12 sm:py-12 md:py-16 xl:py-5 px-3">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>
