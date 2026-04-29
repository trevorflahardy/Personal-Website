<script setup lang="ts">
import { parseRules } from './regviz-data';
</script>

<template>
    <section>
        <h2 class="section-head">§ 3. &nbsp; The Parser</h2>
        <p class="body-para">
            The parser is a hand-written <em>recursive-descent</em> LL(1) parser.
            It consumes the lazy token stream and builds a concrete syntax tree (CST)
            whose nodes map one-to-one onto the regex operators.
            Precedence is encoded in the grammar directly — alternation binds least
            tightly, then concatenation, then postfix quantifiers.
        </p>
        <div class="grammar-box">
            <div class="grammar-row" v-for="p in parseRules" :key="p.rule">
                <code class="grammar-lhs">{{ p.rule }}</code>
                <span class="grammar-arrow">⟶</span>
                <code class="grammar-rhs">{{ p.body }}</code>
                <span class="grammar-note">// {{ p.note }}</span>
            </div>
        </div>
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

.grammar-box {
    margin: 1.25rem 0;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    padding: 0.75rem 0;
}

.grammar-row {
    display: grid;
    grid-template-columns: 4.5rem 1.5rem 1fr auto;
    gap: 0.5rem;
    align-items: baseline;
    padding: 0.3rem 0;
    font-family: "Courier New", monospace;
    font-size: 0.85rem;
}

.grammar-lhs {
    color: var(--ink);
    font-style: italic;
}

.grammar-arrow { color: var(--ink-faint); }
.grammar-rhs { color: var(--ink); }

.grammar-note {
    color: var(--ink-faint);
    font-size: 0.8em;
    white-space: nowrap;
}

@media (max-width: 720px) {
    .grammar-row { grid-template-columns: 1fr; }
    .grammar-note { display: none; }
}
</style>
