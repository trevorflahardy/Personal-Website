<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
	<div class="w-full">
		<!-- Hero section - name and profile picture -->
		<div class="w-full flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-8 mb-10 lg:mb-12">
			<div class="text-center sm:text-left flex-1">
				<p class="text-sm md:text-base text-white/60 font-light tracking-wide uppercase mb-2 animate-fade-down animate-duration-700">
					Hi, I'm
				</p>
				<h1 class="hero-title mb-3 lg:mb-4 animate-fade-right animate-duration-700">
					Trevor Flahardy
				</h1>
				<p class="text-base md:text-lg lg:text-xl text-white/70 font-light animate-fade-up animate-delay-600 animate-duration-700">
					A full stack developer working to change lives.
				</p>
			</div>

			<img src="/ProfilePic.png" alt="Trevor PFP."
				class="object-cover w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 2xl:w-40 2xl:h-40 rounded-full ring-2 ring-white/15 shadow-2xl animate-fade-left animate-duration-700 shrink-0" />
		</div>

		<!-- Social links divider -->
		<div class="relative flex items-center mb-8 animate-fade animate-duration-700 animate-delay-800">
			<div class="grow h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
			<div class="shrink mx-5 flex gap-2">
				<Button link="https://github.com/trevorflahardy" icon="pi-github"
					background="bg-white/6 hover:bg-white/12 border border-white/10" />
				<Button link="https://www.linkedin.com/in/trevorflahardy/" icon="pi-linkedin"
					background="bg-white/6 hover:bg-white/12 border border-white/10" />
			</div>
			<div class="grow h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
		</div>

		<!-- About me sections in glass cards -->
		<div class="space-y-6 animate-fade-up animate-duration-700 animate-delay-1200">
			<div class="glass-card p-6 md:p-8 lg:p-10">
				<h2 class="title-3 mb-3">
					It's Nice to Meet You
				</h2>
				<p class="body mb-0 max-w-4xl">
					I'm currently a student at the
					<span class="text-emerald-400 font-medium">University of South Florida</span>
					for my Bachelor's in Computer Science. Tech has always been a part of my life, but as
					I've grown, I've come to realize the meaningful impact it can have on people's lives. For me, it's not
					just about users—it's about real people with real stories. I create with that in mind, driven by the
					idea that tech should serve, not just function. After all, technology without people is meaningless.
				</p>
			</div>

			<div class="glass-card p-6 md:p-8 lg:p-10 animate-fade-up animate-duration-700 animate-delay-1800">
				<h3 class="title-4 mb-3">
					What Makes Me Tick
				</h3>
				<p class="body mb-0 max-w-4xl">
					When I'm not buried in a project or deep in academics, I'm probably under the hood of a car, playing
					pickleball, or pushing myself at the gym. Growing up, I was always drawn to helping others, and
					discovering programming felt like a natural way to extend that. I know it sounds cliché, but this isn't
					just a hobby—<span class="font-medium text-white/90">it's woven into who I am</span>. Programming is
					my way of life, a labor of love, and I'm constantly looking for ways to use it to make a real impact.
				</p>
				<p class="body mb-0 mt-4 max-w-4xl">
					One day, I hope to work at Apple, particularly on the Apple Watch team. Their approach to creating tech
					that genuinely enhances lives aligns with my values, and I see it as the ultimate intersection of
					technology and human connection.
				</p>
			</div>
		</div>
	</div>
</template>
