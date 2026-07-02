<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import gsap from 'gsap';
import SplitType from 'split-type';
import Button from '@/components/Button.vue';

const heroRoot = useTemplateRef<HTMLElement>('heroRoot');

let nameSplit: SplitType | null = null;
let taglineSplit: SplitType | null = null;
let tl: gsap.core.Timeline | null = null;

onMounted(() => {
	const root = heroRoot.value;
	if (!root) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const name = root.querySelector<HTMLElement>('.hero-name');
	const tagline = root.querySelector<HTMLElement>('.hero-tagline');
	nameSplit = name ? new SplitType(name, { types: 'chars' }) : null;
	taglineSplit = tagline ? new SplitType(tagline, { types: 'words' }) : null;

	// One orchestrated entrance: overline → name cascade → tagline → portrait →
	// divider draw → intro card. A single timeline keeps the rhythm coherent.
	tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
	tl.from(root.querySelector('.hero-overline'), { y: -12, opacity: 0, duration: 0.55 }, 0.05);
	if (nameSplit?.chars?.length) {
		tl.from(nameSplit.chars, {
			y: '0.55em',
			opacity: 0,
			rotateX: -50,
			filter: 'blur(7px)',
			duration: 0.85,
			stagger: 0.026,
		}, 0.15);
	}
	if (taglineSplit?.words?.length) {
		tl.from(taglineSplit.words, { y: 14, opacity: 0, duration: 0.6, stagger: 0.045 }, 0.6);
	}
	tl.from(root.querySelector('.hero-pic'), {
		scale: 0.82,
		opacity: 0,
		filter: 'blur(10px)',
		duration: 0.9,
		ease: 'back.out(1.4)',
	}, 0.35);
	tl.from(root.querySelectorAll('.divider-line'), { scaleX: 0, duration: 0.8 }, 0.8);
	tl.from(root.querySelectorAll('.divider-btn'), {
		scale: 0.5,
		opacity: 0,
		duration: 0.5,
		ease: 'back.out(2)',
		stagger: 0.08,
	}, 0.85);
	tl.from(root.querySelector('.intro-card'), { y: 26, opacity: 0, duration: 0.8 }, 1.0);
});

onBeforeUnmount(() => {
	tl?.kill();
	nameSplit?.revert();
	taglineSplit?.revert();
});
</script>

<template>
	<div ref="heroRoot" class="w-full">
		<!-- Hero section - name and profile picture -->
		<div
			class="w-full flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-12 mb-10 lg:mb-12">
			<div class="text-center sm:text-left">
				<p class="hero-overline text-sm md:text-base text-white/60 font-light tracking-[0.18em] uppercase mb-2">
					Hi, I'm
				</p>
				<h1 class="hero-name hero-title mb-3 lg:mb-4">
					Trevor Flahardy
				</h1>
				<p class="hero-tagline text-base md:text-lg lg:text-xl text-white/70 font-light">
					A full stack developer working to change lives.
				</p>
			</div>

			<!-- Portrait — halo ring rotates slowly behind, the whole cluster idles
			     on a gentle float once mounted. -->
			<div class="relative shrink-0 float-soft">
				<div class="hero-halo" aria-hidden="true" />
				<img src="/ProfilePic.png" alt="Trevor PFP."
					class="hero-pic relative object-cover w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 2xl:w-40 2xl:h-40 rounded-full ring-2 ring-white/15 shadow-2xl" />
			</div>
		</div>

		<!-- Social links divider -->
		<div class="relative flex items-center mb-8">
			<div class="divider-line origin-right grow h-px bg-linear-to-r from-transparent via-white/20 to-white/25"></div>
			<div class="shrink mx-5 flex gap-2">
				<span v-magnetic class="divider-btn inline-flex">
					<Button link="https://github.com/trevorflahardy" icon="pi-github"
						background="bg-white/6 hover:bg-white/12 border border-white/10" />
				</span>
				<span v-magnetic class="divider-btn inline-flex">
					<Button link="https://www.linkedin.com/in/trevorflahardy/" icon="pi-linkedin"
						background="bg-white/6 hover:bg-white/12 border border-white/10" />
				</span>
			</div>
			<div class="divider-line origin-left grow h-px bg-linear-to-l from-transparent via-white/20 to-white/25"></div>
		</div>

		<!-- About me sections in glass cards -->
		<div class="intro-card glass-card hover-lift p-5 md:p-6 lg:p-8">
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
</template>

<style scoped>
/* Perspective so the character cascade's rotateX reads as depth. */
.hero-name {
	perspective: 520px;
}

.hero-name :deep(.char) {
	transform-style: preserve-3d;
	will-change: transform;
}

/* Soft rotating halo behind the portrait — barely-there conic sheen that
   makes the glass world feel lit from within. */
.hero-halo {
	position: absolute;
	inset: -10px;
	border-radius: 9999px;
	background: conic-gradient(from 0deg,
			rgba(255, 255, 255, 0) 0deg,
			rgba(255, 255, 255, 0.22) 70deg,
			rgba(147, 197, 253, 0.18) 140deg,
			rgba(255, 255, 255, 0) 220deg,
			rgba(255, 255, 255, 0.12) 300deg,
			rgba(255, 255, 255, 0) 360deg);
	filter: blur(10px);
	animation: halo-spin 26s linear infinite;
	pointer-events: none;
}

@keyframes halo-spin {
	to {
		transform: rotate(360deg);
	}
}

@media (prefers-reduced-motion: reduce) {
	.hero-halo {
		animation: none;
	}
}
</style>
