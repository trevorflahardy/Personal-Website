<script setup lang="ts">
import { specs } from './bed-fleet';
</script>

<template>
    <section class="sg-specs">
        <div class="sg-section-head">
            <span class="sg-label">SPEC · 03</span>
            <span class="sg-sublabel">implementation detail</span>
        </div>
        <table class="spec-table">
            <tbody>
                <tr v-for="(s, i) in specs" :key="s.k" :class="{ alt: i % 2 === 1 }">
                    <th>{{ s.k }}</th>
                    <td>{{ s.v }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.sg-specs {
    margin: 3.5rem 0;
}

.sg-section-head {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid rgba(232, 238, 247, 0.2);
    padding-bottom: 0.6rem;
    margin-bottom: 1.5rem;
}

.sg-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    color: var(--cyan);
}

.sg-sublabel {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    color: var(--ink-dim);
    letter-spacing: 0.1em;
}

.spec-table {
    width: 100%;
    border-collapse: collapse;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.78rem;
    border: 1px solid rgba(56, 189, 248, 0.25);
}

.spec-table th,
.spec-table td {
    padding: 0.4rem 0.9rem;
    text-align: left;
    border-bottom: 1px solid rgba(56, 189, 248, 0.18);
}

.spec-table th {
    color: var(--ink-dim);
    font-weight: 400;
    width: 14rem;
    letter-spacing: 0.05em;
}

.spec-table td {
    color: var(--ink);
}

.spec-table tr.alt {
    background: rgba(56, 189, 248, 0.035);
}

.spec-table tr:last-child th,
.spec-table tr:last-child td {
    border-bottom: none;
}
</style>
