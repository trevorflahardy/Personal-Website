<script setup>
import Description from "./Description.vue";
import CardsInfo from "./CardsInfo.vue";
import Preview from "./Preview.vue";
import CardsFuture from "./CardsFuture.vue";
import SlamTransition from "@/components/SlamTransition.vue";
</script>

<template>
  <SlamTransition class="space-y-5">
    <Description />
    <CardsInfo />
    <Preview />
    <CardsFuture />
  </SlamTransition>
</template>
