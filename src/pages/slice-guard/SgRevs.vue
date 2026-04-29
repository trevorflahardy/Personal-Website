<script setup lang="ts">
import { revisions } from './bed-fleet';
</script>

<template>
    <section class="sg-revs">
        <div class="sg-section-head">
            <span class="sg-label">REVISIONS · 04</span>
            <span class="sg-sublabel">change log</span>
        </div>
        <table class="rev-table">
            <thead>
                <tr>
                    <th>rev</th><th>date</th><th>note</th><th>by</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in revisions" :key="r.date">
                    <td>{{ r.rev }}</td>
                    <td>{{ r.date }}</td>
                    <td>{{ r.note }}</td>
                    <td>{{ r.by }}</td>
                </tr>
            </tbody>
        </table>
        <a href="https://github.com/trevorflahardy/slice-guard" target="_blank" rel="noopener" class="sg-source">
            SOURCE · github.com/trevorflahardy/slice-guard &rarr;
        </a>
    </section>
</template>

<style scoped>
.sg-revs {
    margin: 3.5rem 0 0;
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

.rev-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--cyan);
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.74rem;
}

.rev-table th {
    background: rgba(56, 189, 248, 0.1);
    color: var(--cyan);
    text-align: left;
    padding: 0.4rem 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-right: 1px solid rgba(56, 189, 248, 0.25);
    border-bottom: 1px solid var(--cyan);
    font-weight: 500;
    font-size: 0.68rem;
}

.rev-table th:last-child {
    border-right: none;
}

.rev-table td {
    padding: 0.4rem 0.75rem;
    border-right: 1px solid rgba(56, 189, 248, 0.18);
    border-bottom: 1px solid rgba(56, 189, 248, 0.18);
    color: var(--ink);
}

.rev-table td:last-child {
    border-right: none;
}

.rev-table tr:last-child td {
    border-bottom: none;
}

.sg-source {
    display: inline-block;
    margin-top: 1.5rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    color: var(--cyan);
    text-decoration: none;
    border-bottom: 1px solid rgba(56, 189, 248, 0.4);
    padding-bottom: 0.2rem;
    transition: color 0.2s ease;
}

.sg-source:hover {
    color: var(--ink);
    border-color: var(--ink);
}
</style>
