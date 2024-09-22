<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
	<!-- The main intro to the website. Holds my name in large bold text, caption below it, and an image of myself next to it. -->
	<div class="w-full">
		<div class="w-full flex flex-row justify-evenly items-center mb-0 px-5 md:px-0">
			<!-- Holds the Hi and my name-->
			<div class="self-end mb-3 sm:mb-5">
				<p class="subtitle mb-0 animate-fade-down duration-700 animate-delay-0">Hi, I'm</p>
				<h1 class="hero-title mb-1 lg:mb-3 2xl:mb-5 animate-fade-right">Trevor Flahardy</h1>
				<p class="subtitle text-right animate-fade-up animate-delay-[800ms]">
					A full stack developer working to change lives.
				</p>
			</div>

			<!-- Holds my PFP alongside it-->
			<div
				class="rounded-full overflow-hidden bg-gray-950/20 dark:bg-gray-200/5 p-1 shadow-md shrink-0 w-1/5 h-auto">
				<img src="/ProfilePicNoBG.png" class="w-full h-full" />
			</div>
		</div>

		<!-- Holds some main link buttons for the user to easily see.-->
		<div class="relative flex items-center mt-3 px-5">
			<div class="flex-grow border-t border-gray-300"></div>
			<div class="flex-shrink mx-4 space-x-2">
				<Button link="https://github.com/trevorflahardy" icon="pi-github" />
				<Button link="https://www.linkedin.com/in/trevorflahardy/" icon="pi-linkedin" />
			</div>
			<div class="flex-grow border-t border-gray-300"></div>
		</div>

		<!--Next shows the "About Me" section. This holds a bit of a backstory about how my mission came to be.-->
		<div class="w-full px-5 py-2 animate-fade-up animate-duration-700 animate-delay-[1600ms]">
			<h1 class="title-3">
				It's nice to meet you,
			</h1>
			<p class="body">
				I'm currently a student at the <span class="text-emerald-200 dark:text-emerald-400">University of South
					Florida</span> for my Bachelor's in Computer Science. Tech has always been a part of my life, but as
				I've grown, I've come to realize the meaningful impact it can have on people's lives. For me, it's not
				just about users—it's about real people with real stories. I create with that in mind, driven by the
				idea that tech should serve, not just function. After all, technology without people is meaningless.
			</p>
		</div>

		<!-- More information about who I am, outside of the coding (down to earth) -->
		<div class="w-full px-5 py-2 animate-fade-up animate-duration-700 animate-delay-[3000ms]">
			<h1 class="title-4">
				What makes me tick,
			</h1>
			<div class="body">
				When I'm not buried in a project or deep in academics, I'm probably under the hood of a car, playing
				pickleball, or pushing myself at the gym. Growing up, I was always drawn to helping others, and
				discovering programming felt like a natural way to extend that. I know it sounds cliché, but this isn't
				just a hobby—it's woven into who I am. Programming is my way of life, a labor of love, and I'm
				constantly looking for ways to use it to make a real impact.
				<br>
				<br>
				One day, I hope to work at Apple, particularly on the Apple Watch team. Their approach to creating tech
				that genuinely enhances lives aligns with my values, and I see it as the ultimate intersection of
				technology and human connection.
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
