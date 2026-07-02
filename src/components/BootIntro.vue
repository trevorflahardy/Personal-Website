<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import gsap from 'gsap';

// visionOS "power on": black veil, a soft blue-white core blooms awake, a
// ring of light expands past it, then the veil dissolves and the site mounts
// underneath (so every entrance animation plays AFTER the reveal).
// Click anywhere to skip.

const emit = defineEmits<{ done: [] }>();
const root = useTemplateRef<HTMLElement>('root');
let tl: gsap.core.Timeline | null = null;
let finished = false;

const finish = () => {
	if (finished) return;
	finished = true;
	tl?.kill();
	emit('done');
};

onMounted(() => {
	const el = root.value;
	if (!el) {
		finish();
		return;
	}
	const core = el.querySelector('.boot-core');
	const ring = el.querySelector('.boot-ring');

	tl = gsap.timeline({ onComplete: finish });
	tl.fromTo(core, { scale: 0.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.75, ease: 'power2.out' }, 0.15)
		.fromTo(ring, { scale: 0.35, opacity: 0 }, { scale: 1.5, opacity: 0.55, duration: 0.9, ease: 'power2.out' }, 0.3)
		.to(ring, { scale: 2.8, opacity: 0, duration: 0.55, ease: 'power2.in' }, 1.0)
		.to(core, { scale: 6, opacity: 0, duration: 0.6, ease: 'power2.in' }, 1.05)
		.to(el, { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 1.2);
});

onBeforeUnmount(() => tl?.kill());
</script>

<template>
	<div ref="root" class="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-pointer"
		role="presentation" aria-hidden="true" @click="finish">
		<div class="boot-ring absolute w-44 h-44 rounded-full" />
		<div class="boot-core w-28 h-28 rounded-full" />
	</div>
</template>

<style scoped>
.boot-core {
	background: radial-gradient(closest-side,
			rgba(255, 255, 255, 0.95),
			rgba(147, 197, 253, 0.55) 45%,
			rgba(10, 132, 255, 0.18) 72%,
			transparent);
	filter: blur(6px);
}

.boot-ring {
	border: 1px solid rgba(255, 255, 255, 0.35);
	box-shadow:
		0 0 30px rgba(10, 132, 255, 0.35),
		inset 0 0 22px rgba(10, 132, 255, 0.18);
}
</style>
