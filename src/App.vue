<script setup>
// Load prime icons for the use around the application
import "primeicons/primeicons.css";
import Background from "@/components/layout/Background.vue";
import Glass from "./components/ui/Glass.vue";
import Sidebar from "./components/layout/Sidebar.vue";

import { RouterView } from "vue-router";
</script>

<template>
  <main class="h-screen w-screen">
    <!-- The background for the app -->
    <Background class="z-10 absolute top-0 left-0" />

    <div
      class="z-20 h-screen w-screen relative flex items-center justify-start content-center sm:p-10 md:p-12 lg:p-24 overflow-y-clip antialiased gap-5"
    >
      <!--Keep a default glass pane + sizebar - the vue router will only point to the content of the selected item.-->
      <Sidebar class="basis-1/3 hidden md:block" />

      <Glass class="basis-full size-full" roundedAmount="xl">
        <RouterView class="p-5 overflow-y-scroll no-scrollbar" />
      </Glass>
    </div>
  </main>
</template>
