<script setup lang="ts">
import { useTemplateRef } from 'vue';
import SplitType from 'split-type';
import { useScrollScene } from '@/composables/useScrollScene';

const root = useTemplateRef<HTMLElement>('root');

// Apple-style progressive text reveal: every word starts dim and brightens as
// the paragraph scrolls through the reading zone, scrubbed to scroll position.
useScrollScene(({ gsap }) => {
    const el = root.value?.querySelector<HTMLElement>('.story-text');
    if (!el) return;

    const split = new SplitType(el, { types: 'words' });
    if (!split.words?.length) return;

    gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
            opacity: 1,
            stagger: 0.045,
            ease: 'none',
            scrollTrigger: {
                trigger: root.value,
                start: 'top 80%',
                end: 'top 28%',
                scrub: 0.5,
            },
        },
    );

    return () => split.revert();
});
</script>

<template>
    <div ref="root" class="w-full py-6 md:py-10">
        <p class="text-xs uppercase tracking-[0.22em] text-white/45 font-medium mb-5">
            About
        </p>
        <p
            class="story-text max-w-5xl text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-snug lg:leading-[1.25] font-medium tracking-tight text-white text-pretty">
            I'm a Computer Science student at the
            <span class="text-emerald-400">University of South Florida</span>,
            and tech has been part of my life for as long as I can remember.
            It's not just about users — it's about real people with real
            stories. I build with that in mind: technology should serve,
            not just function. Technology without people is meaningless.
        </p>
    </div>
</template>
