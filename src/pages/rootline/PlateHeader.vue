<template>
    <header class="plate-head">
        <span class="plate-series">Plate I · <i>Rootline</i></span>
        <span class="plate-rule" />
        <span class="plate-edition">Edition MMXXV · from life</span>
    </header>
</template>

<style scoped>
.plate-head {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-style: italic;
    font-size: 0.85rem;
    color: var(--ink-dim);
    margin-bottom: 3rem;
}

.plate-series { letter-spacing: 0.04em; }

.plate-rule {
    flex: 1;
    height: 1px;
    background: rgba(234, 226, 210, 0.24);
}

.plate-edition {
    font-variant: small-caps;
    letter-spacing: 0.12em;
    font-style: normal;
}
</style>
