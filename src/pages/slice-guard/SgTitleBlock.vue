<template>
    <section class="sg-titleblock">
        <div class="tb-row"><span>project</span><b>slice-guard</b></div>
        <div class="tb-row"><span>revision</span><b>C / 2025-09-02</b></div>
        <div class="tb-row"><span>drawn by</span><b>t. flahardy</b></div>
        <div class="tb-row"><span>scale</span><b>1 : 64</b></div>
        <div class="tb-row"><span>sheet</span><b>01 / 03</b></div>
    </section>
</template>

<style scoped>
.sg-titleblock {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    width: 17rem;
    border: 1px solid var(--cyan);
    background: rgba(7, 89, 133, 0.4);
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
}

.tb-row {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    padding: 0.35rem 0.7rem;
    border-bottom: 1px solid rgba(56, 189, 248, 0.25);
}

.tb-row:last-child {
    border-bottom: none;
}

.tb-row span {
    color: var(--ink-dim);
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.tb-row b {
    color: var(--ink);
    font-weight: 500;
}
</style>
