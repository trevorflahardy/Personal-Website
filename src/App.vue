<script setup lang="ts">
// Load prime icons for the use around the application
import 'primeicons/primeicons.css';

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Hero from './components/Hero.vue';
import Footer from './components/Footer.vue';
import Background from './components/Background.vue';

const route = useRoute();
// Full-bleed routes take over the entire viewport — the page's own world
// becomes the chrome.  Outer padding, background grain, and the footer all
// drop out so the page paints directly to every edge of the screen.
const isFullBleed = computed(() => Boolean(route.meta?.fullBleed));
</script>

<template>
	<main class="h-screen w-screen" :class="isFullBleed ? '' : 'grain-overlay'">
		<!-- The default ambient background is hidden when a page takes over. -->
		<Background v-if="!isFullBleed" class="z-10 absolute" />

		<!-- Outer shell: default has responsive padding + footer; full-bleed strips
		     all of it so #main-content can paint edge-to-edge. -->
		<div
			class="z-20 h-screen w-screen relative flex flex-col overflow-y-clip no-scrollbar antialiased transition-[padding] duration-500 ease-in-out"
			:class="isFullBleed
				? 'p-0'
				: 'pt-6 px-4 pb-6 sm:pt-8 sm:px-6 md:pt-8 md:px-6 md:pb-6 lg:px-8 lg:pt-8 xl:pt-6 xl:px-8 xl:pb-6 2xl:px-10 2xl:pt-8'">
			<Hero class="flex-1 min-h-0" />
			<Footer v-if="!isFullBleed" />
		</div>
	</main>
</template>
