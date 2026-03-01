<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="w-full min-h-full">
        <router-view v-slot="{ Component }">
            <transition name="driver-transition" mode="out-in">
                <component :is="Component" :key="route.fullPath" />
            </transition>
        </router-view>
    </div>
</template>

<style>
.driver-transition-enter-active,
.driver-transition-leave-active {
    transition: opacity 300ms ease, transform 300ms ease;
}

.driver-transition-enter-from {
    opacity: 0;
    transform: translateY(12px);
}

.driver-transition-leave-to {
    opacity: 0;
    transform: translateY(-12px);
}
</style>
