<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sidebar from "./sidebar/Sidebar.vue";
import { useSidebar } from "@/composables/useSidebar";

const { isCollapsed, toggle } = useSidebar();
const route = useRoute();
const router = useRouter();

const isFullBleed = computed(() => Boolean(route.meta?.fullBleed));

const mainContent = ref<HTMLElement | null>(null);

// Disable the VanillaTilt card-mouse effect on full-bleed pages — those pages
// paint their own worlds and the perspective distortion fights their layout.
watch(isFullBleed, async (bleed) => {
	await nextTick();
	const el = mainContent.value as any;
	if (!el) return;
	if (bleed) {
		el.vanillaTilt?.destroy();
		el.style.transform = "";
	} else {
		(window as any).VanillaTilt?.init([el], { max: 0.5 });
	}
}, { immediate: false });

onMounted(() => {
	if (isFullBleed.value) {
		const el = mainContent.value as any;
		el?.vanillaTilt?.destroy();
		if (el) el.style.transform = "";
	}
});

const exitFullBleed = () => {
	if (window.history.length > 1) {
		router.back();
	} else {
		router.push("/");
	}
};
</script>

<template>
	<!-- Shell container.  In full-bleed mode the sidebar track collapses to zero
	     and the gap vanishes so the page can claim the entire Hero area. -->
	<div
		class="flex items-center justify-center rounded-3xl h-full w-full no-scrollbar transition-all duration-500 ease-in-out"
		:class="[
			(isCollapsed || isFullBleed) ? 'gap-0' : 'gap-4 lg:gap-5',
		]">

		<!-- Desktop sidebar — hidden entirely in full-bleed mode. -->
		<div class="hidden xl:flex h-full shrink-0 transition-all duration-500 ease-in-out overflow-hidden"
			:class="(isCollapsed || isFullBleed) ? 'w-0 opacity-0' : 'w-[300px] 2xl:w-[340px] opacity-100'">
			<Sidebar />
		</div>

		<!-- Main content card.  The `page-shell` class carries the default
		     glass chrome; `page-shell--bleed` strips it so the page within
		     can paint its own universe. -->
		<div id="main-content"
			ref="mainContent"
			class="page-shell w-full h-full relative overflow-y-scroll no-scrollbar transform-gpu"
			:class="isFullBleed ? 'page-shell--bleed' : ''"
			data-tilt data-tilt-max="0.5" style="transform-style: preserve-3d; transform: perspective(1000px)">

			<!-- Sidebar collapse toggle — pinned top-right so it never collides
			     with page-level headers that start at top-left. -->
			<button type="button" @click="toggle()"
				v-show="!isFullBleed"
				class="hidden xl:flex absolute z-30 top-4 right-4 h-8 w-8 items-center justify-center rounded-xl
				       glass-thin bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
				       transition-all duration-300 ease-in-out cursor-pointer group"
				:title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
				<i class="pi text-white/50 group-hover:text-white/80 text-xs transition-all duration-300"
					:class="isCollapsed ? 'pi-chevron-right' : 'pi-chevron-left'" />
			</button>

			<!-- Mobile sidebar (hamburger-driven overlay). -->
			<Sidebar class="xl:hidden absolute h-full" />

			<!-- Full-bleed "return to site" pill.  Pinned top-left on every
			     takeover page so the user always has an escape hatch back to
			     the glass-themed main site.  The styling is deliberately
			     neutral (dark chip + white text + subtle border) so it reads
			     on any page background — parchment, graphite, cyanotype. -->
			<button v-show="isFullBleed" type="button" @click="exitFullBleed()"
				class="return-pill"
				title="Return to site"
				aria-label="Return to main site">
				<i class="pi pi-arrow-left text-[11px]" />
				<span>return to site</span>
			</button>

			<!-- Router view.
			     - Normal routes get the glass-thick wrapper.
			     - Full-bleed routes render bare so the page's own background fills.
			     The `page-swap` transition zooms the new page out of the old frame. -->
			<router-view v-slot="{ Component, route: viewRoute }">
				<div class="page-swap__content page-swap__content--anim"
					:class="isFullBleed ? 'page-swap__content--bleed' : 'glass-thick'"
					:key="viewRoute.fullPath">
					<component :is="Component" />
				</div>
			</router-view>
		</div>
	</div>
</template>

<style scoped>
/* Default card chrome — rounded corners + subtle outline.  Transitions so the
   shell dissolves cleanly when switching to full-bleed routes. */
.page-shell {
	border-radius: 1.5rem;
	outline: 1px solid rgba(255, 255, 255, 0.10);
	transition: border-radius 500ms ease, outline-color 500ms ease;
}
.page-shell--bleed {
	border-radius: 0;
	outline-color: transparent;
}

/* Return-to-site pill.  Fixed-position on the shell (which is 100vw/vh in
   full-bleed mode), top-left, above any page content.  Neutral palette so it
   reads on light parchment and dark graphite alike. */
.return-pill {
	position: fixed;
	top: 1.25rem;
	left: 1.25rem;
	z-index: 100;
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 0.9rem 0.5rem 0.75rem;
	font-family: "SF Mono", ui-monospace, monospace;
	font-size: 0.72rem;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.82);
	background: rgba(15, 17, 21, 0.72);
	border: 1px solid rgba(255, 255, 255, 0.14);
	border-radius: 9999px;
	backdrop-filter: blur(12px) saturate(1.2);
	-webkit-backdrop-filter: blur(12px) saturate(1.2);
	box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
	cursor: pointer;
	transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, color 200ms ease;
}
.return-pill:hover {
	background: rgba(15, 17, 21, 0.88);
	border-color: rgba(255, 255, 255, 0.28);
	color: rgba(255, 255, 255, 1);
	transform: translateX(-2px);
}
.return-pill:hover .pi { transform: translateX(-2px); }
.return-pill .pi { transition: transform 200ms ease; }

/* On light-mode full-bleed pages (Rootline parchment) the neutral dark chip
   still works, but we tweak contrast just slightly for a cleaner read. */
html:not(.dark) .return-pill {
	background: rgba(35, 28, 20, 0.82);
	border-color: rgba(255, 255, 255, 0.18);
}

/* Page-swap: zooms the incoming page out of the frame and the outgoing page back in.
   Full-bleed pages travel further (scale 0.86 → 1) so the "unfurl into its own
   world" feel lands; glass pages only nudge (0.97 → 1) to stay subtle. */
.page-swap__content {
	min-height: 100%;
	will-change: transform, opacity, filter;
}

/* Keyframe-based enter animation — keyed on the :key change so every
   route swap replays. No Vue <transition> wrapper means no stuck leave. */
.page-swap__content--anim.glass-thick {
	animation: page-swap-enter-glass 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.page-swap__content--anim.page-swap__content--bleed {
	animation: page-swap-enter-bleed 580ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes page-swap-enter-glass {
	from { opacity: 0; transform: scale(0.97); }
	to   { opacity: 1; transform: scale(1); }
}
@keyframes page-swap-enter-bleed {
	from { opacity: 0; transform: scale(0.88); filter: blur(5px); }
	to   { opacity: 1; transform: scale(1);    filter: blur(0); }
}

@media (prefers-reduced-motion: reduce) {
	.page-swap__content--anim.glass-thick,
	.page-swap__content--anim.page-swap__content--bleed {
		animation: page-swap-enter-reduced 200ms ease both;
	}
	@keyframes page-swap-enter-reduced {
		from { opacity: 0; }
		to   { opacity: 1; }
	}
}
</style>
