<script setup lang="ts">
import FrontMatter from './FrontMatter.vue';
import DfaFigure from './DfaFigure.vue';
import TheorySection from './TheorySection.vue';
import LexerSection from './LexerSection.vue';
import ParserSection from './ParserSection.vue';
import Screenshots from './Screenshots.vue';
import CapabilitiesSection from './CapabilitiesSection.vue';
import Colophon from './Colophon.vue';
</script>

<template>
    <div class="regviz-world">
        <div class="paper" aria-hidden="true"></div>

        <article class="manuscript">
            <FrontMatter />
            <DfaFigure />
            <TheorySection />
            <LexerSection />
            <ParserSection />
            <Screenshots />
            <CapabilitiesSection />
            <Colophon />
        </article>
    </div>
</template>

<style scoped>
.regviz-world {
    --paper: #f3ead3;
    --paper-hi: #f8f0d8;
    --ink: #2a1f18;
    --ink-soft: rgba(42, 31, 24, 0.72);
    --ink-faint: rgba(42, 31, 24, 0.45);
    --rule: rgba(42, 31, 24, 0.28);
    --red: #a8301f;

    position: relative;
    min-height: 100%;
    width: 100%;
    background: var(--paper);
    color: var(--ink);
    font-family: "EB Garamond", "Garamond", "Georgia", serif;
    font-feature-settings: "onum" 1, "dlig" 1, "liga" 1;
    isolation: isolate;
    overflow-x: hidden;
}

.paper {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(198, 160, 100, 0.2), transparent 55%),
        radial-gradient(ellipse at 85% 80%, rgba(180, 120, 60, 0.15), transparent 55%);
    mix-blend-mode: multiply;
}

.paper::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 20% 30%, rgba(80, 40, 10, 0.035) 1px, transparent 1px),
        radial-gradient(circle at 70% 60%, rgba(80, 40, 10, 0.03) 1px, transparent 1px);
    background-size: 13px 13px, 19px 19px;
    mix-blend-mode: multiply;
}

.manuscript {
    position: relative;
    z-index: 1;
    max-width: 48rem;
    margin: 0 auto;
    padding: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) 6rem;
}
</style>
