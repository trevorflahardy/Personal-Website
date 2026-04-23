<script setup lang="ts">
import { computed } from 'vue';
import { drivers } from './driver-data';
import { useLenis } from '@/composables/useLenis';
import DriverHero from './DriverHero.vue';
import DriverSpec from './DriverSpec.vue';
import DriverFeatures from './DriverFeatures.vue';
import DriverCode from './DriverCode.vue';
import DriverIntegration from './DriverIntegration.vue';
import DriverFleet from './DriverFleet.vue';

const props = defineProps<{ driverId: string }>();

const driver = computed(() => drivers[props.driverId]);
const otherDrivers = computed(() =>
    Object.values(drivers).filter((d) => d.id !== props.driverId),
);

// Per-driver theme — keeps the graphite canvas but swaps the accent hue in
// every place that references `var(--dc)`.
const themeStyle = computed(() => ({
    '--dc': driver.value?.color ?? '#f59e0b',
}));

useLenis();
</script>

<template>
    <div v-if="driver" class="drv" :style="themeStyle">
        <DriverHero :driver="driver" />
        <DriverSpec :driver="driver" />
        <DriverFeatures :driver="driver" />
        <DriverCode :driver="driver" />
        <DriverIntegration :driver="driver" />
        <DriverFleet :other-drivers="otherDrivers" />
    </div>
</template>

<style scoped>
.drv {
    --graphite: #0b0e10;
    --graphite-2: #12161b;
    --amber: #f59e0b;
    --bone: #f8fafc;
    --grid-line: rgba(245, 158, 11, 0.04);

    min-height: 100vh;
    background: var(--graphite);
    color: var(--bone);
    font-family: "SF Mono", "JetBrains Mono", ui-monospace, monospace;
    background-image:
        linear-gradient(var(--grid-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    background-size: 48px 48px;
    padding-top: 4rem;
    padding-bottom: 6rem;
}

/* Shared `.act` layout box (centred column + positioning) applies to every
   subsection. Padding is owned by each child's own `.act-X` rule so that
   the per-section overrides (e.g. act-hero uses 5rem top/bottom instead of
   4rem) aren't lost to cross-component specificity battles. */
.drv :deep(.act) {
    position: relative;
    max-width: 72rem;
    margin: 0 auto;
}

.drv :deep(.act-label) {
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--dc);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
