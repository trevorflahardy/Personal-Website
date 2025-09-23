<script setup lang="ts">
import Glass from "@/components/ui/Glass.vue";
import SidebarWelcome from "./SidebarWelcome.vue";
</script>

<template>
  <!-- Holds our sidebar, which contains navigation links and other relevant information.

   The whole goal here is to mimic apple's settings theme here-->

  <Glass class="w-full h-full rounded-xl text-white p-5">
    <SidebarWelcome />
  </Glass>
</template>
