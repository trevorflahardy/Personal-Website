<script setup lang="ts">
import { lexTokens } from './regviz-data';
</script>

<template>
    <section>
        <h2 class="section-head">§ 2. &nbsp; The Lexer</h2>
        <p class="body-para">
            Before a regular expression can be compiled, it must be tokenised. The <code>regviz_core</code> lexer
            reads the input string one character at a time, producing a flat sequence of typed tokens.
            Tokens are yielded <em>lazily</em> — the next token is not fetched until the parser demands it,
            which avoids allocating the entire token stream upfront.
        </p>
        <aside class="margin-note margin-note--inline">
            lazy lex<br>
            <span class="margin-arrow">→</span>
        </aside>
        <table class="token-table">
            <thead>
                <tr>
                    <th>Token</th>
                    <th>Example</th>
                    <th>Meaning</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="t in lexTokens" :key="t.t">
                    <td><code>{{ t.t }}</code></td>
                    <td><code>{{ t.ex }}</code></td>
                    <td>{{ t.d }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.section-head {
    font-size: 1.25rem;
    font-variant: small-caps;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin: 3.5rem 0 1.5rem;
    text-align: center;
}

.body-para {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--ink);
    text-align: justify;
    text-indent: 2em;
    margin: 0 0 1.25rem;
}

.body-para :deep(code) {
    font-family: "Courier New", monospace;
    font-size: 0.9em;
    background: rgba(168, 48, 31, 0.07);
    padding: 0.05em 0.35em;
    border-radius: 2px;
}

section {
    position: relative;
}

.margin-note--inline {
    position: absolute;
    font-family: "Caveat", cursive;
    font-size: 1rem;
    color: var(--red);
    line-height: 1.2;
    transform: rotate(-3deg);
    pointer-events: none;
    top: 0.2rem;
    right: -4rem;
}

.margin-arrow {
    font-size: 1.3rem;
    display: inline-block;
}

.token-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin: 1.5rem 0;
    font-family: "EB Garamond", serif;
}

.token-table th {
    text-align: left;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    font-weight: 500;
    border-bottom: 1.5px solid var(--ink);
    padding: 0.4rem 0.6rem;
}

.token-table td {
    padding: 0.35rem 0.6rem;
    border-bottom: 1px dotted var(--rule);
    vertical-align: top;
}

.token-table :deep(code) {
    font-family: "Courier New", monospace;
    font-size: 0.85em;
    background: rgba(168, 48, 31, 0.06);
    padding: 0.05em 0.3em;
    border-radius: 2px;
}

.token-table tr:last-child td {
    border-bottom: none;
}

@media (max-width: 720px) {
    .margin-note--inline { display: none; }
}
</style>
