<template>
    <section class="specimen-body">
        <div class="col-prose">
            <p class="drop">
                Rootline began with a simple observation: no one in a family owns the tree alone. The branches belong to everyone who walks them. Yet most genealogy software — Ancestry, MyHeritage, FamilySearch — treats each account as a separate garden, with no easy way to share the cultivation.
            </p>
            <p>
                So Rootline is the opposite: <em>one tree, many hands</em>. Powered by Supabase Realtime, a live cursor drifts next to every relative who’s reading along. Changes ripple out as they happen. It feels less like a database and more like a shared notebook left open on the kitchen table.
            </p>
        </div>
        <aside class="col-quote">
            <span class="q-mark">&ldquo;</span>
            A tree is never finished.<br />
            It grows because someone tends it.
            <div class="q-attrib">— field note, 2025</div>
        </aside>
    </section>
</template>

<style scoped>
.specimen-body {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    max-width: 60rem;
    margin: 0 auto 4.5rem;
    padding: 0 1rem;
}

.col-prose p {
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(234, 226, 210, 0.88);
    margin: 0 0 1.25rem;
}

.col-prose em {
    color: var(--forest);
    font-style: italic;
}

.col-prose .drop::first-letter {
    font-size: 3.6rem;
    float: left;
    line-height: 0.9;
    font-weight: 400;
    padding: 0.4rem 0.55rem 0 0;
    color: var(--walnut);
    font-family: "Georgia", serif;
}

.col-quote {
    position: relative;
    font-style: italic;
    font-size: 1.35rem;
    line-height: 1.45;
    color: rgba(234, 226, 210, 0.92);
    padding: 1rem 0 0 2rem;
    border-left: 1px solid rgba(74, 222, 128, 0.35);
    align-self: start;
}

.col-quote .q-mark {
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 4rem;
    line-height: 1;
    color: var(--forest);
    opacity: 0.5;
    font-family: "Georgia", serif;
}

.col-quote .q-attrib {
    margin-top: 1rem;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: var(--ink-dim);
    font-style: normal;
    font-variant: small-caps;
}

@media (max-width: 900px) {
    .specimen-body { grid-template-columns: 1fr; }
}
</style>
