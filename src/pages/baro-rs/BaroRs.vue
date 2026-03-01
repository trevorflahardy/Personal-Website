<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaroRsHome from './BaroRsHome.vue';
import DriverPage from './drivers/DriverPage.vue';

const props = defineProps<{ driverId?: string }>();
const route = useRoute();

const isDriverPage = computed(() => route.name === 'baro-rs-driver');
const currentDriverId = computed(() => (route.params.driverId as string) || '');
</script>

<template>
    <transition name="driver-transition" mode="out-in">
        <DriverPage v-if="isDriverPage" :driver-id="currentDriverId" :key="currentDriverId" />
        <BaroRsHome v-else key="home" />
    </transition>
</template>

<style>
.driver-transition-enter-active,
.driver-transition-leave-active {
    transition: opacity 250ms ease, transform 250ms ease;
}

.driver-transition-enter-from {
    opacity: 0;
    transform: translateY(8px);
}

.driver-transition-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
