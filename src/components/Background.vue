<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

const theme = useLocalStorage("theme", "dark");

const isDark = computed(() => theme.value === "dark");
</script>

<template>
    <!-- This Background component represents the "toggle-able" background on the app. It gives
     gradual shifting between light and dark. Additionally, the z-index of this item is below
     the other app (hero) content so that the glass background-blur is a real glass feel.-->
    <transition name="fade" class="absolute">
        <div v-if="isDark" class="h-screen w-screen bg-center bg-clip-border bg-cover bg-apt-night" />
        <div v-else class="h-screen w-screen bg-center bg-clip-border bg-cover bg-apt-day" />
    </transition>
</template>

<style scoped>
/* Denotes the fade transition between the backgrounds */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0.1;
}
</style>