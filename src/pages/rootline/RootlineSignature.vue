<template>
    <footer class="signature">
        <div class="sig-line">catalogued by <i>T. Flahardy</i></div>
        <div class="sig-line">specimen · rootline</div>
        <div class="sig-line">
            <a href="https://github.com/trevorflahardy/rootline" target="_blank" rel="noopener">
                github.com/trevorflahardy/rootline &rarr;
            </a>
        </div>
    </footer>
</template>

<style scoped>
.signature {
    max-width: 62rem;
    margin: 0 auto;
    text-align: right;
    border-top: 1px solid rgba(234, 226, 210, 0.18);
    padding: 1.5rem 1rem 0;
}

.sig-line {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    color: var(--ink-dim);
    letter-spacing: 0.1em;
}

.sig-line i {
    font-family: "Georgia", serif;
    font-size: 0.9rem;
    color: var(--ink);
}

.sig-line a {
    color: var(--forest);
    text-decoration: none;
    border-bottom: 1px solid rgba(74, 222, 128, 0.35);
}

.sig-line a:hover {
    color: var(--ink);
    border-color: var(--ink);
}
</style>
