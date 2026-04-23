<script setup lang="ts">
import ChalkBackground from './ChalkBackground.vue';
import ChalkHeader from './ChalkHeader.vue';
import FeatureRow from './FeatureRow.vue';
import RagSection from './RagSection.vue';
import StackSection from './StackSection.vue';
import ChalkFooter from './ChalkFooter.vue';
import { features } from './cnt-data';
</script>

<template>
    <div class="chalk-hall">
        <ChalkBackground />

        <ChalkHeader />

        <section class="chalk-features">
            <FeatureRow
                v-for="(f, i) in features"
                :key="f.title"
                :feature="f"
                :flip="i % 2 === 1"
            />
        </section>

        <RagSection />

        <StackSection />

        <ChalkFooter />
    </div>
</template>

<style scoped>
.chalk-hall {
    --board: #16362b;
    --chalk: #f0ece0;
    --chalk-soft: rgba(240, 236, 224, 0.78);
    --chalk-mute: rgba(240, 236, 224, 0.52);
    --chalk-faint: rgba(240, 236, 224, 0.28);
    --chalk-yellow: #f2d46b;
    --chalk-pink: #e8a2b8;
    --chalk-blue: #9ec7e5;
    --rule: rgba(240, 236, 224, 0.18);

    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--board);
    color: var(--chalk);
    padding-bottom: 6rem;
    overflow: hidden;
}

.chalk-features {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 0;
}
</style>
