<script setup lang="ts">
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
		class="w-64 lg:w-96 h-12 backdrop-blur-2xl bg-white/8 dark:bg-white/5 border border-white/10 rounded-full relative -top-4 shadow-xl flex-row items-center justify-start p-3 flex xl:ml-auto xl:mr-auto">
		<!-- Lightswitch for light and dark mode -->

		<button type="button"
			class="backdrop-blur-xl bg-white/10 rounded-full h-8 w-8 flex flex-row items-center justify-center overflow-hidden relative border border-white/10 hover:bg-white/15 transition-colors"
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