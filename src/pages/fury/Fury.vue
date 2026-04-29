<script setup lang="ts">
import FuryBackground from './FuryBackground.vue';
import FuryMarquee from './FuryMarquee.vue';
import FuryCoin from './FuryCoin.vue';
import FuryHud from './FuryHud.vue';
import FuryOrigin from './FuryOrigin.vue';
import FurySystems from './FurySystems.vue';
import FuryCredits from './FuryCredits.vue';
import FuryFooter from './FuryFooter.vue';
</script>

<template>
    <div class="fury-cabinet">
        <FuryBackground />
        <FuryMarquee />
        <FuryCoin />
        <FuryHud />
        <FuryOrigin />
        <FurySystems />
        <FuryCredits />
        <FuryFooter />
    </div>
</template>

<style scoped>
.fury-cabinet {
    --bg: #0a0514;
    --bg-2: #1a0a2e;
    --ink: #e8f9ff;
    --mute: rgba(232, 249, 255, 0.55);
    --faint: rgba(232, 249, 255, 0.28);
    --neon: #ff2d7a;
    --neon-2: #4edbfc;
    --gold: #ffd447;
    --rule: rgba(78, 219, 252, 0.25);

    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    color: var(--ink);
    font-family: "Press Start 2P", "VT323", "SF Mono", ui-monospace, monospace;
    overflow: hidden;
}

/* Restore the dashed rule between successive .fury-act sections. Because each
   Act is its own component, the "+ .fury-act" sibling selector can't cross
   the component boundary, so we use :deep() to target rendered sections. */
.fury-cabinet :deep(.fury-act + .fury-act) {
    border-top: 1px dashed var(--rule);
}
</style>
