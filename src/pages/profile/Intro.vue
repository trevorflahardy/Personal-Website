<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
	<div class="w-full">
		<!-- Hero section - name and profile picture -->
		<div class="w-full flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-12 mb-10 lg:mb-12">
			<div class="text-center sm:text-left">
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
		<div class="animate-fade-up animate-duration-700 animate-delay-1200">
			<div class="glass-card p-5 md:p-6 lg:p-8">
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
		</div>
	</div>
</template>
