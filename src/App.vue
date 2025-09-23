<script setup>
// Load prime icons for the use around the application
import "primeicons/primeicons.css";
import Background from "@/components/layout/Background.vue";
import Glass from "./components/ui/Glass.vue";
import Sidebar from "./components/layout/sidebar/Sidebar.vue";
import ToggleThemeButton from "@/components/shared/ThemeToggleButton.vue";

import { RouterView } from "vue-router";
</script>

<template>
  <main class="h-screen w-screen">
    <!-- The background for the app -->
    <Background class="z-10 absolute top-0 left-0" />

    <div
      class="z-20 h-screen w-screen relative flex items-center justify-start content-center sm:px-10 md:px-12 lg:px-24 sm:py-10 md:py-12 lg:py-20 overflow-y-clip antialiased gap-5 transition-colors"
    >
      <!--Keep a default glass pane + sizebar - the vue router will only point to the content of the selected item.-->
      <Sidebar class="basis-1/3 hidden md:block" />

      <Glass
        class="basis-full size-full overflow-y-scroll no-scrollbar p-10"
        roundedAmount="2xl"
      >
        <RouterView />
      </Glass>

      <ToggleThemeButton class="absolute top-0 left-0 w-10 h-10" />
    </div>
  </main>
</template>
