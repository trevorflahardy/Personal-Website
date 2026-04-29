<template>
    <section class="fury-coin">
        <div class="coin-blink">▸ INSERT COIN TO CONTINUE ◂</div>
        <div class="coin-links">
            <a class="coin-btn coin-btn--primary" href="https://github.com/trevorflahardy/Fury-Bot" target="_blank" rel="noreferrer noopener">
                <span class="coin-btn__pulse" /> PRESS START · SOURCE
            </a>
            <a class="coin-btn" href="https://github.com/trevorflahardy/Fury-Bot" target="_blank" rel="noreferrer noopener">
                SELECT · DEV BOARD
            </a>
        </div>
    </section>
</template>

<style scoped>
.fury-coin {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem 1rem 2.5rem;
}

.coin-blink {
    font-size: 0.82rem;
    letter-spacing: 0.18em;
    color: var(--gold);
    text-shadow: 0 0 8px rgba(255, 212, 71, 0.65);
    animation: coin-blink 1.1s steps(2, end) infinite;
    margin-bottom: 1.25rem;
}

@keyframes coin-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0.25; }
}

.coin-links {
    display: inline-flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
}

.coin-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.4rem;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    color: var(--ink);
    background: rgba(78, 219, 252, 0.06);
    border: 2px solid rgba(78, 219, 252, 0.45);
    border-radius: 0;
    text-decoration: none;
    transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
    box-shadow: 0 0 0 0 rgba(78, 219, 252, 0);
}

.coin-btn:hover {
    transform: translate(-2px, -2px);
    background: rgba(78, 219, 252, 0.14);
    box-shadow: 4px 4px 0 rgba(78, 219, 252, 0.5);
}

.coin-btn--primary {
    color: var(--bg);
    background: var(--neon);
    border-color: var(--neon);
}

.coin-btn--primary:hover {
    background: var(--gold);
    border-color: var(--gold);
    box-shadow: 4px 4px 0 rgba(255, 212, 71, 0.6);
}

.coin-btn__pulse {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 9999px;
    background: var(--bg);
    animation: coin-pulse 1s ease-in-out infinite;
}

@keyframes coin-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
}

@media (prefers-reduced-motion: reduce) {
    .coin-blink,
    .coin-btn__pulse { animation: none !important; }
}
</style>
