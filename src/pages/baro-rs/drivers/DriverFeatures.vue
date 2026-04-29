<script setup lang="ts">
import type { Driver } from './driver-data';

defineProps<{ driver: Driver }>();
</script>

<template>
    <section class="act act-feat">
        <div class="act-label">// capabilities</div>
        <ol class="feat-list">
            <li v-for="(f, i) in driver.features" :key="f">
                <span class="feat-idx">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="feat-txt">{{ f }}</span>
            </li>
        </ol>
    </section>
</template>

<style scoped>
.act-feat { padding: 4rem 2.5rem; }

@media (max-width: 700px) {
    .act-feat { padding: 2.5rem 1.25rem; }
}

.feat-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.feat-list li {
    display: grid;
    grid-template-columns: 3.5rem 1fr;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.95rem;
    line-height: 1.5;
}

.feat-idx {
    color: var(--dc);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    padding-top: 0.15rem;
}

.feat-txt { color: rgba(248, 250, 252, 0.82); }
</style>
