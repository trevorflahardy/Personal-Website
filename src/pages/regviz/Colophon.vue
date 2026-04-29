<script setup lang="ts">
import { commits } from './regviz-data';
</script>

<template>
    <footer class="colophon">
        <div class="colophon-rule"></div>

        <div class="commit-log">
            <p class="commit-log__head">recent commits</p>
            <div v-for="c in commits" :key="c.sha" class="commit-row">
                <code class="commit-sha">{{ c.sha }}</code>
                <span class="commit-msg">{{ c.msg }}</span>
                <span class="commit-date">{{ c.date }}</span>
            </div>
        </div>

        <p class="colophon-text">
            Written in <em>Rust</em>; desktop build with Iced, optional WASM build via Trunk.
            Typeset in <em>EB Garamond</em>. Developed as a final project for COT 4210 at USF.
        </p>
        <div class="colophon-actions">
            <a class="ink-link" href="https://github.com/trevorflahardy/RegViz" target="_blank" rel="noopener">
                <span class="pi pi-github"></span> view source
            </a>
            <a class="ink-link" href="https://trevorflahardy.github.io/RegViz/" target="_blank" rel="noopener">
                <span class="pi pi-external-link"></span> open in browser
            </a>
            <a class="ink-link" href="https://github.com/trevorflahardy/RegViz/tree/master/papers" target="_blank" rel="noopener">
                <span class="pi pi-file"></span> read the paper
            </a>
        </div>
    </footer>
</template>

<style scoped>
.colophon {
    margin-top: 4rem;
    text-align: center;
}

.colophon-rule {
    width: 50%;
    height: 1px;
    background: var(--rule);
    margin: 0 auto 2rem;
}

.commit-log {
    margin: 0 auto 2rem;
    max-width: 36rem;
    border: 1px solid var(--rule);
    border-radius: 3px;
    overflow: hidden;
    font-family: "Courier New", ui-monospace, monospace;
}

.commit-log__head {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-faint);
    padding: 0.4rem 0.75rem;
    border-bottom: 1px solid var(--rule);
    margin: 0;
    background: rgba(42, 31, 24, 0.04);
}

.commit-row {
    display: grid;
    grid-template-columns: 4rem 1fr auto;
    gap: 0.6rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.78rem;
    border-bottom: 1px dotted rgba(42, 31, 24, 0.1);
    align-items: baseline;
}

.commit-row:last-child {
    border-bottom: none;
}

.commit-sha {
    color: var(--red);
}

.commit-msg {
    color: var(--ink);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.commit-date {
    color: var(--ink-faint);
    white-space: nowrap;
    font-size: 0.72rem;
}

.colophon-text {
    font-style: italic;
    font-size: 0.95rem;
    color: var(--ink-soft);
    line-height: 1.6;
    max-width: 32rem;
    margin: 0 auto 1.5rem;
}

.colophon-actions {
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    flex-wrap: wrap;
}

.ink-link {
    color: var(--ink);
    text-decoration: none;
    font-size: 0.95rem;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 0.1rem;
    transition: color 200ms;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.ink-link:hover {
    color: var(--red);
    border-color: var(--red);
}

@media (max-width: 720px) {
    .commit-row { grid-template-columns: 3.5rem 1fr; }
    .commit-date { display: none; }
}
</style>
