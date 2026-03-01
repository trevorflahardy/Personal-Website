<script setup lang="ts">
import Sidebar from "./sidebar/Sidebar.vue";
import { useSidebar } from "@/composables/useSidebar";

const { isCollapsed, toggle } = useSidebar();
</script>

<template>
	<!-- The main hero element/page for the website. This holds all the main content.
   On desktop: There appears a side window ("floating in 3d space") next to the hero
   window, and on mobile, there appears a hamburger in the hero so the user can select it-->
	<div
		class="flex items-center justify-center rounded-3xl h-full w-full no-scrollbar transition-all duration-500 ease-in-out"
		:class="isCollapsed ? 'gap-0' : 'gap-4 lg:gap-5'">

		<!-- The desktop only sidebar element. -->
		<div class="hidden xl:flex h-full shrink-0 transition-all duration-500 ease-in-out overflow-hidden"
			:class="isCollapsed ? 'w-0 opacity-0' : 'w-[300px] 2xl:w-[340px] opacity-100'">
			<Sidebar />
		</div>

		<!-- The main content of the page -->
		<div id="main-content"
			class="w-full h-full relative overflow-y-scroll no-scrollbar transform-gpu outline-1 outline-white/10 rounded-3xl"
			data-tilt data-tilt-max="0.5" style="transform-style: preserve-3d; transform: perspective(1000px)">

			<!-- Sidebar collapse toggle button (desktop only) -->
			<button type="button" @click="toggle()"
				class="hidden xl:flex absolute z-30 top-4 left-4 h-8 w-8 items-center justify-center rounded-xl
				       glass-thin bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
				       transition-all duration-300 ease-in-out cursor-pointer group"
				:title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
				<i class="pi text-white/50 group-hover:text-white/80 text-xs transition-all duration-300"
					:class="isCollapsed ? 'pi-chevron-right' : 'pi-chevron-left'" />
			</button>

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
