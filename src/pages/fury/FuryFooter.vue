<template>
    <footer class="fury-footer">
        <span>© TREVOR FLAHARDY · FLVS eSPORTS</span>
        <span class="footer-dot">●</span>
        <span>ALL RIGHTS RESERVED</span>
        <span class="footer-dot">●</span>
        <span>PLAYER 1 READY</span>
    </footer>
</template>

<style scoped>
.fury-footer {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    padding: 1.4rem 1rem;
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    color: var(--faint);
    border-top: 1px solid var(--rule);
    flex-wrap: wrap;
}

.footer-dot { color: var(--neon); }
</style>
