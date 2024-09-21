<script setup lang="ts">
import Sidebar from './sidebar/Sidebar.vue';
</script>

<template>
	<!-- The main hero element/page for the website. This holds all the main content.
   On desktop: There appears a side window ("floating in 3d space") next to the hero
   window, and on mobile, there appears a hamburger in the hero so the user can select it-->
	<div class="flex items-center justify-center rounded-[40px] sm:h-[80%] min-h-full w-full no-scrollbar">
		<!-- The desktop only sidebar element. -->
		<div class="hidden xl:flex h-full mr-5 basis-0 xl:basis-1/4">
			<Sidebar />
		</div>

		<!-- The main content of the page -->
		<div class="rounded-[40px] w-full h-full relative overflow-y-scroll no-scrollbar transform-gpu outline outline-1 outline-slate-300 dark:outline-gray-500"
			data-tilt data-tilt-max="2" style="transform-style: preserve-3d; transform: perspective(1000px)">
			<!-- If on mobile only, display the sidebar inside of the hero element such that
       the user can press the hamburger to show the sidebar-->
			<Sidebar class="xl:hidden absolute h-full" />

			<!-- The main content of the page. We place the background on the component itself because, if not done otherwise, the transition duration would apply to the tilt, which we do not want.  -->
			<router-view v-slot="{ Component }">
				<div class="w-full glass-thick">
					<component :is="Component" class="transition-all duration-500 ease-in-out" />
				</div>
			</router-view>
		</div>
	</div>
</template>
