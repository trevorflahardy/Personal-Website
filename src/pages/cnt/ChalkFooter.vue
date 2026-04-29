<template>
    <footer class="chalk-foot">
        <span class="erase-line" aria-hidden="true" />
        <p class="foot-txt">
            — end of lecture.
            <a href="https://trevorflahardy.github.io/cnt_4419_class_notes/">open study hub</a>
            ·
            <a href="https://github.com/trevorflahardy/cnt_4419_class_notes">source</a> —
        </p>
    </footer>

    <div class="ledge" aria-hidden="true">
        <span class="chalk-stick chalk-stick--a" />
        <span class="chalk-stick chalk-stick--b" />
        <span class="eraser" />
    </div>
</template>

<style scoped>
.chalk-foot {
    position: relative;
    z-index: 2;
    padding: 3rem clamp(1.5rem, 5vw, 4rem) 2rem;
    text-align: center;
}

.erase-line {
    display: block;
    height: 8px;
    margin: 0 auto 1.25rem;
    max-width: 420px;
    background: linear-gradient(90deg, transparent 0%, rgba(240, 236, 224, 0.15) 20%, rgba(240, 236, 224, 0.3) 50%, rgba(240, 236, 224, 0.15) 80%, transparent 100%);
    filter: blur(1px);
}

.foot-txt {
    font-family: "Caveat", cursive;
    font-size: 1.2rem;
    color: var(--chalk-mute);
    margin: 0;
}

.foot-txt a {
    color: var(--chalk-blue);
    text-decoration: underline;
    text-decoration-style: dotted;
}

.ledge {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.25rem;
    z-index: 3;
    background: linear-gradient(to bottom, #3a2a1c 0%, #2b1d12 45%, #1a110a 100%);
    box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 clamp(1.5rem, 5vw, 4rem);
}

.chalk-stick {
    display: inline-block;
    width: 3rem;
    height: 0.55rem;
    border-radius: 1px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4);
}

.chalk-stick--a {
    background: #f1ede0;
    transform: rotate(-4deg);
}

.chalk-stick--b {
    background: var(--chalk-yellow);
    transform: rotate(3deg);
    width: 2.3rem;
}

.eraser {
    display: inline-block;
    width: 2.2rem;
    height: 1rem;
    background: linear-gradient(to bottom, #5d3c22 0%, #3d2614 100%);
    border-radius: 2px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 1px 3px rgba(0, 0, 0, 0.5);
    margin-left: auto;
}
</style>
