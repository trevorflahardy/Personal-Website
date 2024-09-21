<script setup>
import { useLocalStorage } from '@vueuse/core';

const theme = useLocalStorage('theme', 'dark');

function toggleTheme() {
	theme.value = theme.value === 'dark' ? 'light' : 'dark';
	document.documentElement.classList.toggle('dark');
}
</script>

<template>
	<div
		class="w-96 h-14 glass-thick bg-gray-300/50 rounded-full relative -top-6 shadow-xl flex-row items-center justify-start p-4 flex"
	>
		<!-- Lightswitch for light and dark mode -->

		<button
			class="glass-semithick rounded-full h-9 w-9 flex flex-row items-center justify-center overflow-hidden"
			@click="toggleTheme()"
		>
			<i class="pi pi-pencil text-black" />
		</button>
	</div>
</template>
