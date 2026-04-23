<script setup lang="ts">
import { commitLog } from './act-data';
</script>

<template>
    <section class="act act-log" data-act="04 · log">
        <div class="log-label section-label">// commit log · recent</div>
        <ol class="log-list">
            <li v-for="c in commitLog" :key="c.sha" class="log-row">
                <span class="log-sha">{{ c.sha }}</span>
                <span class="log-date">{{ c.date }}</span>
                <span class="log-msg">{{ c.msg }}</span>
            </li>
        </ol>
        <a href="https://github.com/trevorflahardy/baro.rs" target="_blank" rel="noopener" class="log-source">
            view full source on github &rarr;
        </a>
    </section>
</template>

<style scoped>
.act-log { padding: 5rem 2.5rem 6rem; }

.log-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.82rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.log-row {
    display: grid;
    grid-template-columns: 5rem 6rem 1fr;
    gap: 1rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: rgba(248, 250, 252, 0.7);
}

.log-sha { color: var(--amber); }

.log-date { color: rgba(248, 250, 252, 0.4); }

.log-source {
    display: inline-block;
    margin-top: 2.5rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    color: var(--amber);
    text-decoration: none;
    border-bottom: 1px solid rgba(245, 158, 11, 0.4);
    padding-bottom: 0.2rem;
    transition: color 0.2s ease;
}

.log-source:hover {
    color: var(--ink);
    border-color: var(--ink);
}
</style>
