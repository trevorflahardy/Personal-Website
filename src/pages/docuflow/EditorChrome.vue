<template>
    <div class="docuflow-chrome">
        <div class="chrome-dots">
            <span class="chrome-dot chrome-dot--r" />
            <span class="chrome-dot chrome-dot--y" />
            <span class="chrome-dot chrome-dot--g" />
        </div>
        <div class="chrome-tabs">
            <span class="chrome-tab chrome-tab--active">README.mdx</span>
            <span class="chrome-tab">preview</span>
        </div>
        <div class="chrome-meta">
            <span class="chrome-meta-pill">utf-8</span>
            <span class="chrome-meta-pill">mdx</span>
            <span class="chrome-meta-pill chrome-meta-pill--live">● live</span>
        </div>
    </div>
</template>

<style scoped>
.docuflow-chrome {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.25rem;
    background: var(--paper-2);
    border-bottom: 1px solid var(--rule);
}

.chrome-dots {
    display: inline-flex;
    gap: 0.4rem;
}

.chrome-dot {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 9999px;
    display: inline-block;
}

.chrome-dot--r { background: #e56765; }
.chrome-dot--y { background: #e5c265; }
.chrome-dot--g { background: #80c97a; }

.chrome-tabs {
    display: inline-flex;
    gap: 0.35rem;
    flex: 1;
    margin-left: 0.75rem;
}

.chrome-tab {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    padding: 0.28rem 0.7rem;
    border-radius: 0.45rem 0.45rem 0 0;
    color: var(--mute);
    border: 1px solid transparent;
    border-bottom: none;
}

.chrome-tab--active {
    color: var(--ink);
    background: var(--paper);
    border-color: var(--rule);
}

.chrome-meta {
    display: inline-flex;
    gap: 0.35rem;
}

.chrome-meta-pill {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.22rem 0.55rem;
    border-radius: 9999px;
    border: 1px solid var(--rule);
    color: var(--mute);
    background: var(--paper);
}

.chrome-meta-pill--live {
    color: var(--accent);
    border-color: rgba(47, 107, 255, 0.3);
}
</style>
