<script setup>
import HeroChaiDescription from "./HeroChaiDescription.vue";
import HeroChaiCardsInfo from "./HeroChaiCardsInfo.vue";
import HeroChaiPreview from "./HeroChaiPreview.vue";
import HeroChaiCardsFuture from "./HeroChaiCardsFuture.vue";
</script>

<template>
  <div class="p-5 space-y-5">
    <!--Description of Chai -->
    <HeroChaiDescription />

    <!-- Holds cards about the box -->
    <HeroChaiCardsInfo />

    <!-- Holds a preview of what Chai does (maybe macbook preview of it being used on Discord with some text next to it??)-->
    <HeroChaiPreview />

    <!-- Holds some additional information about what I made the bot for, and why it's important maybe? -->
    <HeroChaiCardsFuture />
  </div>
</template>
