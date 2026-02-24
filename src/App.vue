<script setup lang="ts">
// Load prime icons for the use around the application
import 'primeicons/primeicons.css';

import Hero from './components/Hero.vue';
import Footer from './components/Footer.vue';
import Background from './components/Background.vue';
</script>

<template>
	<main class="h-screen w-screen">
		<!-- The background for the app -->
		<Background class="z-10 absolute" />

		<div
			class="z-20 h-screen w-screen relative flex flex-col pt-6 px-4 pb-6 sm:pt-8 sm:px-6 md:pt-8 md:px-6 md:pb-6 lg:px-8 lg:pt-8 xl:pt-6 xl:px-8 xl:pb-6 2xl:px-10 2xl:pt-8 overflow-y-clip no-scrollbar antialiased">
			<!-- We're using Vue Router here. Thus, to ensure that we always have a proper footer and sidebar, we're going to embed the router view in the Hero. -->
			<Hero class="flex-1 min-h-0" />
			<Footer />
		</div>
	</main>
</template>
