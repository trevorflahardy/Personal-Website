<script setup lang="ts">
import Button from '@/components/Button.vue';
import InfoCard from '@/components/InfoCard.vue';
</script>

<template>
	<!-- The main intro to the website. Holds my name in large bold text, caption below it, and an image of myself next to it. -->
	<div class="w-full">
		<div class="w-full flex flex-row justify-around items-center mb-0">
			<!-- Holds the Hi and my name-->
			<div class="inner self-end">
				<p class="subtitle mb-0 animate-fade-down duration-700 animate-delay-0">Hi, I'm</p>
				<h1 class="hero-title mb-1 xl:mb-2 animate-fade-right">Trevor Flahardy</h1>
				<p class="subtitle mb-3 sm:mb-5 text-right animate-fade-up animate-delay-[800ms]">
					A full stack developer working to change lives.
				</p>
			</div>

			<!-- Holds my PFP alongside it-->
			<div
				class="rounded-full overflow-hidden bg-gray-950/20 dark:bg-gray-200/5 p-1 shadow-md shrink-0 md:block hidden">
				<img src="/ProfilePicNoBG.png"
					class="md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 w-14 h-14" />
			</div>
		</div>

		<!--Next shows the "About Me" section. This holds a bit of a backstory about how my mission came to be.-->
		<div class="w-full px-5 py-2 rounded-lg shadow-sm">
			<h1 class="title-2 animate-fade-up animate-duration-700 animate-delay-[1600ms]">
				It's nice to meet you.
			</h1>
			<p class="body animate-fade-up animate-duration-700 animate-delay-[2200ms]">
				I'm currently a student at the <span class="text-emerald-400">University of South
					Florida</span> for my Bachelor's in Computer Science. I've always been into tech, but
				as I grew into who I am today I now see the remarkable difference I can have in peoples lives through
				what I
				love. For me, it's
				not about users—it's about people. Every person who interacts with what I
				build has a story, and I create with that in mind. I'm driven by the idea that tech should serve, not
				just function, because technology without people is meaningless.
			</p>
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
