<script setup>
import Description from "./Description.vue";
import Info from "./Info.vue";
import Preview from "./Preview.vue";
import Future from "./Future.vue";
import SlamTransition from "@/components/SlamTransition.vue";
</script>

<template>
  <SlamTransition class="space-y-5">
    <Description />
    <Info />
    <Preview />
    <Future />
  </SlamTransition>
</template>
