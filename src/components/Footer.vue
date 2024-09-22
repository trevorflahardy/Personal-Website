<script setup>
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

const theme = useLocalStorage('theme', 'dark');

function toggleTheme() {
	theme.value = theme.value === 'dark' ? 'light' : 'dark';
	document.documentElement.classList.toggle('dark');
}

const toggleThemeIcon = computed(() => {
	return theme.value === 'dark' ? 'pi-moon' : 'pi-sun';
});

</script>

<template>
	<footer
		class="w-64 lg:w-96 h-14 glass-thick bg-gray-300/50 rounded-full relative -top-6 shadow-xl flex-row items-center justify-start p-4 flex xl:ml-[30%]">
		<!-- Lightswitch for light and dark mode -->

		<button
			class="glass-semithick rounded-full h-9 w-9 flex flex-row items-center justify-center overflow-hidden relative"
			@click="toggleTheme()">
			<Transition name="slide-up">
				<i class="pi text-black absolute" :class="toggleThemeIcon" :key="theme" />
			</Transition>
		</button>
	</footer>
</template>


<style lang="css" scoped>
.slide-up-enter-active,
.slide-up-leave-active {
	transition: all 0.25s ease-out;
}

.slide-up-enter-from {
	opacity: 0;
	transform: translateY(30px);
}

.slide-up-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}
</style>