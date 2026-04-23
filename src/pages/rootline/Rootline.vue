<script setup lang="ts">
import PlateHeader from './PlateHeader.vue';
import HeroTree from './HeroTree.vue';
import SpecimenBody from './SpecimenBody.vue';
import CalloutsSection from './CalloutsSection.vue';
import FieldPlates from './FieldPlates.vue';
import MethodsSection from './MethodsSection.vue';
import HabitatSection from './HabitatSection.vue';
import SpecimenFrame from './SpecimenFrame.vue';
import RootlineSignature from './RootlineSignature.vue';
</script>

<template>
    <article class="root-plate">
        <PlateHeader />
        <HeroTree />
        <SpecimenBody />
        <CalloutsSection />
        <FieldPlates />
        <MethodsSection />
        <HabitatSection />
        <SpecimenFrame />
        <RootlineSignature />
    </article>
</template>

<style scoped>
.root-plate {
    --paper: #1a1814;
    --ink: #eae2d2;
    --ink-dim: rgba(234, 226, 210, 0.66);
    --forest: #4ade80;
    --forest-deep: #166534;
    --walnut: #a58a63;
    --moss: #65a30d;

    background: var(--paper);
    background-image:
        radial-gradient(ellipse at 20% 10%, rgba(234, 226, 210, 0.03), transparent 55%),
        url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23g)' opacity='0.35'/></svg>");
    background-size: auto, 240px 240px;
    color: var(--ink);
    font-family: "Georgia", "Source Serif Pro", "Iowan Old Style", serif;
    padding: 3rem 2.5rem 5rem;
    min-height: 100%;
    line-height: 1.55;
}

/* Light mode — warm parchment, walnut ink, forest accents. */
html:not(.dark) .root-plate {
    --paper: #f3ead7;
    --ink: #2a2218;
    --ink-dim: rgba(42, 34, 24, 0.62);
    --forest: #15803d;
    --forest-deep: #14532d;
    --walnut: #6b4f2f;
    background-image:
        radial-gradient(ellipse at 20% 10%, rgba(107, 79, 47, 0.06), transparent 55%),
        url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23g)' opacity='0.18'/></svg>");
}
</style>

<style>
/* Unscoped light-mode overrides. The html:not(.dark) selector must reach
   into each subcomponent's rendered element, so these rules live in an
   unscoped block with !important to beat scoped child styles. Colours only
   — no layout — per the page-rootline design thesis. */
html:not(.dark) .root-plate {
    --paper: #f3ead7 !important;
    --ink: #2a2218 !important;
    --ink-dim: rgba(42, 34, 24, 0.62) !important;
    --forest: #15803d !important;
    --forest-deep: #14532d !important;
    --walnut: #6b4f2f !important;
}

html:not(.dark) .root-plate .col-prose p { color: rgba(42, 34, 24, 0.88) !important; }
html:not(.dark) .root-plate .callout-body p { color: rgba(42, 34, 24, 0.78) !important; }
html:not(.dark) .root-plate .frame-inner { background: rgba(255, 255, 255, 0.5) !important; }
html:not(.dark) .root-plate .plate-frame { background: rgba(255, 255, 255, 0.55) !important; }
html:not(.dark) .root-plate .plate-mount figcaption { color: rgba(42, 34, 24, 0.82) !important; }
html:not(.dark) .root-plate .methods-val { color: rgba(42, 34, 24, 0.82) !important; }
html:not(.dark) .root-plate .habitat-row dd { color: rgba(42, 34, 24, 0.85) !important; }
html:not(.dark) .root-plate .plates-lede,
html:not(.dark) .root-plate .methods-lede { color: rgba(42, 34, 24, 0.68) !important; }
</style>
