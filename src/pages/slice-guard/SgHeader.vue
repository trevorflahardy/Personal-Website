<template>
    <header class="sg-top">
        <span class="sg-topline" />
        <span class="sg-topmark">SLICE-GUARD · PRINT FLEET MANAGEMENT · PLATE I</span>
        <span class="sg-topline" />
    </header>
</template>

<style scoped>
.sg-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
}

.sg-topline {
    flex: 1;
    height: 1px;
    background: var(--ink-dim);
}

.sg-topmark {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.28em;
    color: var(--ink-dim);
}
</style>
