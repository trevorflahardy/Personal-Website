<template>
    <section class="sg-callouts">
        <div class="sg-section-head">
            <span class="sg-label">CALLOUTS · 02</span>
            <span class="sg-sublabel">annotated detail</span>
        </div>
        <ol class="callout-list">
            <li>
                <span class="num">①</span>
                <div>
                    <b>FILE INGEST</b>
                    A custom TypeScript parser reads <code>.3mf</code> and <code>gcode</code> on upload.
                    Pulls filament weight, layer count, estimated print time — flags submissions
                    that exceed cost caps before staff ever sees them.
                </div>
            </li>
            <li>
                <span class="num">②</span>
                <div>
                    <b>STUDENT PORTAL</b>
                    Single-page request form with real-time status. No spreadsheets. No email threads.
                    Student sees exactly where their job sits in the queue.
                </div>
            </li>
            <li>
                <span class="num">③</span>
                <div>
                    <b>STAFF DASHBOARD</b>
                    Role-based queue with one-click approve / deny, filament-consumption analytics,
                    per-student history, and WebSocket-pushed updates so the lab stays in sync.
                </div>
            </li>
        </ol>
    </section>
</template>

<style scoped>
.sg-callouts {
    margin: 3.5rem 0;
}

.sg-section-head {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid rgba(232, 238, 247, 0.2);
    padding-bottom: 0.6rem;
    margin-bottom: 1.5rem;
}

.sg-label {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    color: var(--cyan);
}

.sg-sublabel {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    color: var(--ink-dim);
    letter-spacing: 0.1em;
}

.callout-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}

.callout-list li {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 1.25rem;
    padding: 0.75rem 1rem;
    border-left: 1px solid rgba(56, 189, 248, 0.35);
    background: rgba(56, 189, 248, 0.03);
}

.callout-list li:nth-child(2) { margin-left: 8%; }
.callout-list li:nth-child(3) { margin-left: 4%; }

.callout-list .num {
    font-size: 1.6rem;
    font-family: "IBM Plex Serif", Georgia, serif;
    color: var(--cyan);
    line-height: 1;
    align-self: start;
    padding-top: 0.1rem;
}

.callout-list :deep(b) {
    display: block;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--cyan);
    margin-bottom: 0.45rem;
}

.callout-list div {
    font-size: 0.9rem;
    line-height: 1.55;
    color: rgba(232, 238, 247, 0.82);
}

.callout-list :deep(code) {
    font-family: "SF Mono", ui-monospace, monospace;
    padding: 0.02rem 0.3rem;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.32);
    font-size: 0.85em;
}
</style>
