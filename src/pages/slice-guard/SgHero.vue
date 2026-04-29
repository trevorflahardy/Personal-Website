<script setup lang="ts">
defineProps<{ bedCount: number }>();
</script>

<template>
    <section class="sg-hero">
        <h1 class="sg-h1">
            A MANAGEMENT<br>
            SYSTEM FOR<br>
            <span class="sg-accent">N-BED PRINT LABS</span>.
        </h1>
        <p class="sg-lede">
            Slice Guard runs the 3D print fleet at a university makerspace &mdash; scales from a
            handful of beds to forty-plus without touching the UI. Students submit files; staff
            approve, queue, and track. Parses <code>.3mf</code> and <code>gcode</code> on upload,
            reads filament usage before anyone loads a spool.
        </p>
        <p class="sg-sub-lede">
            <b>SHOWN:</b> sample deployment, {{ bedCount }} beds.
            <span class="sg-sub-sep">&middot;</span>
            grid auto-fits any count.
        </p>
    </section>
</template>

<style scoped>
.sg-hero {
    max-width: 38rem;
    margin: 1rem 0 3.5rem;
}

.sg-h1 {
    font-size: clamp(2rem, 4vw, 3.3rem);
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.05;
    text-transform: uppercase;
    margin: 0 0 1.5rem;
    color: var(--ink);
}

.sg-h1 .sg-accent {
    color: var(--cyan);
    border-bottom: 2px solid var(--cyan);
    padding-bottom: 0.15rem;
}

.sg-lede {
    max-width: 34rem;
    font-size: 0.95rem;
    line-height: 1.65;
    color: rgba(232, 238, 247, 0.78);
    margin: 0 0 1rem 0;
}

.sg-sub-lede {
    max-width: 34rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cyan);
    margin: 0;
}

.sg-sub-lede b {
    color: var(--ink);
    font-weight: 600;
    margin-right: 0.35rem;
}

.sg-sub-sep {
    color: rgba(56, 189, 248, 0.4);
    margin: 0 0.55rem;
}

.sg-lede :deep(code) {
    font-family: "SF Mono", ui-monospace, monospace;
    padding: 0.05rem 0.35rem;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: var(--ink);
    font-size: 0.85em;
}
</style>
