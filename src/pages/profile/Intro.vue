<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
	<div>
		<!--Holds the intro section-->
		<div class="snap-center flex-shrink">
			<div class="flex flex-row justify-around items-center sm:mb-2 mb-0">
				<!-- Holds the Hi and my name-->
				<div class="inner self-end">
					<p class="subtitle mb-0">Hi, I'm</p>
					<h1 class="hero-title mb-1 xl:mb-2">Trevor Flahardy</h1>
					<Transition name="slide-up-appear" appear>
						<p class="subtitle mb-3 sm:mb-5 text-right">
							A full stack developer working to change lives.
						</p>
					</Transition>
				</div>

				<!-- Holds my PFP alongside it-->
				<div
					class="rounded-full overflow-hidden bg-gray-800/40 dark:bg-gray-200/5 p-1 shadow-xl shrink-0 md:block hidden">
					<img src="/ProfilePicNoBG.png"
						class="md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 w-14 h-14" />
				</div>
			</div>

			<!-- Holds the links to my pages -->
			<div class="flex flex-row gap-5 justify-center flex-wrap">
				<Button link="https://github.com/trevorflahardy" content="Github" icon="pi-github" class="w-fit" />
				<Button link="https://www.linkedin.com/in/trevorflahardy/" content="Linkedin" icon="pi-linkedin"
					class="w-fit" />
			</div>
		</div>
	</div>
</template>

<style>
.slide-up-appear-enter-active {
	transition: transform 0.7s;
	transform: translateY(0);
}

.slide-up-appear-enter-from {
	transform: translateY(100%);
}

.slide-up-appear-enter-to {
	transform: translateY(0);
}
</style>
