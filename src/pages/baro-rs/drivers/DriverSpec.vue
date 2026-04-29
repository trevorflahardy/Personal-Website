<script setup lang="ts">
import type { Driver } from './driver-data';

defineProps<{ driver: Driver }>();
</script>

<template>
    <section class="act act-spec">
        <div class="act-label">// datasheet · readout</div>
        <div class="spec-list">
            <div v-if="driver.i2cAddress" class="spec-row">
                <span class="spec-key">i2c address</span>
                <span class="spec-dots" />
                <span class="spec-val">{{ driver.i2cAddress }}</span>
            </div>
            <div class="spec-row">
                <span class="spec-key">protocol</span>
                <span class="spec-dots" />
                <span class="spec-val">{{ driver.protocol }}</span>
            </div>
            <div v-for="m in driver.measurements" :key="m.name" class="spec-row">
                <span class="spec-key">{{ m.name.toLowerCase() }}</span>
                <span class="spec-dots" />
                <span class="spec-val">{{ m.range || m.unit }}</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.act-spec { padding: 4rem 2.5rem; }

@media (max-width: 700px) {
    .act-spec { padding: 2.5rem 1.25rem; }
}

.spec-list {
    display: flex;
    flex-direction: column;
}

.spec-row {
    display: grid;
    grid-template-columns: 14rem 1fr auto;
    align-items: baseline;
    gap: 1rem;
    padding: 0.6rem 0;
    font-size: 0.9rem;
}

.spec-key {
    color: rgba(248, 250, 252, 0.55);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.72rem;
}

.spec-dots {
    border-bottom: 1px dotted rgba(248, 250, 252, 0.18);
    transform: translateY(-0.35em);
}

.spec-val {
    color: var(--dc);
    font-weight: 600;
    text-align: right;
}

@media (max-width: 700px) {
    .spec-row { grid-template-columns: 1fr auto; }
    .spec-dots { display: none; }
}
</style>
