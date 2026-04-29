<template>
    <header class="chalk-head">
        <div class="chalk-head__meta">
            <span class="meta-label">CNT 4419 · SECURE CODING · SPRING 2026</span>
            <span class="meta-label">USF · Tampa, FL</span>
        </div>
        <h1 class="chalk-title">
            CNT<span class="chalk-title__accent"> 4419 </span>Study Hub
        </h1>
        <p class="chalk-sub">
            A complete AI-powered study platform for Secure Coding — typed notes, quiz engine,
            and on-device chat, all running in your browser. No server. No data leaves your machine.
        </p>
        <div class="chalk-ctas">
            <a class="chalk-btn chalk-btn--primary" href="https://trevorflahardy.github.io/cnt_4419_class_notes/" target="_blank" rel="noreferrer">
                Open Study Hub
            </a>
            <a class="chalk-btn" href="https://github.com/trevorflahardy/cnt_4419_class_notes" target="_blank" rel="noreferrer">
                GitHub →
            </a>
        </div>
    </header>
</template>

<style scoped>
.chalk-head {
    position: relative;
    z-index: 2;
    padding: 4rem clamp(1.5rem, 6vw, 5rem) 3rem;
    border-bottom: 1px dashed var(--rule);
}

.chalk-head__meta {
    display: flex;
    justify-content: space-between;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--chalk-mute);
    margin-bottom: 1.5rem;
}

.chalk-title {
    font-family: "Caveat", cursive;
    font-size: clamp(2.8rem, 7vw, 5rem);
    margin: 0 0 0.65rem;
    line-height: 1.05;
    color: var(--chalk);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
}

.chalk-title__accent {
    color: var(--chalk-yellow);
}

.chalk-sub {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--chalk-soft);
    max-width: 60ch;
    margin: 0 0 1.75rem;
    font-family: ui-sans-serif, system-ui, sans-serif;
}

.chalk-ctas {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.chalk-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.1rem;
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: var(--chalk);
    border: 1px dashed var(--rule);
    border-radius: 4px;
    text-decoration: none;
    transition: background 180ms ease, border-color 180ms ease;
}

.chalk-btn:hover {
    background: rgba(240, 236, 224, 0.06);
    border-color: rgba(240, 236, 224, 0.4);
}

.chalk-btn--primary {
    background: rgba(242, 212, 107, 0.12);
    border-color: rgba(242, 212, 107, 0.5);
    color: var(--chalk-yellow);
}

.chalk-btn--primary:hover {
    background: rgba(242, 212, 107, 0.2);
}
</style>
