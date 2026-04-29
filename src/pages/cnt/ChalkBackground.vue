<template>
    <div class="chalk-bg" aria-hidden="true">
        <svg class="chalk-doodles" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
            <path class="doodle doodle--a" d="M80 200 L140 100 L200 200 Z" fill="none" />
            <path class="doodle doodle--b" d="M680 80 L680 180 M665 160 L680 180 L695 160" fill="none" />
            <rect class="doodle doodle--c" x="820" y="300" width="120" height="20" />
            <rect class="doodle doodle--c" x="820" y="325" width="120" height="20" />
            <rect class="doodle doodle--c" x="820" y="350" width="120" height="20" />
            <circle class="doodle doodle--d" cx="150" cy="480" r="18" fill="none" />
            <circle class="doodle doodle--d" cx="150" cy="540" r="18" fill="none" />
            <path class="doodle doodle--d" d="M150 462 L150 522" />
            <text class="doodle-text doodle--e" x="500" y="120">CIA = {C, I, A}</text>
            <text class="doodle-text doodle--f" x="350" y="580">subject → object</text>
            <path class="doodle doodle--g" d="M700 450 C 750 400 800 420 830 450" fill="none" />
            <ellipse class="doodle doodle--h" cx="480" cy="420" rx="90" ry="55" fill="none" />
        </svg>
        <div class="chalk-bg__vignette" />
    </div>
</template>

<style scoped>
.chalk-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}

.chalk-doodles {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.12;
    filter: blur(1.5px);
}

.doodle {
    stroke: var(--chalk);
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 600;
    stroke-dashoffset: 600;
}

.doodle--a { animation: chalk-draw 3.5s 0.2s ease-out forwards; }
.doodle--b { animation: chalk-draw 2.8s 1.0s ease-out forwards; }
.doodle--c { animation: chalk-draw 4.0s 0.5s ease-out forwards; }
.doodle--d { animation: chalk-draw 3.0s 1.8s ease-out forwards; }
.doodle--g { animation: chalk-draw 3.2s 0.8s ease-out forwards; }
.doodle--h { stroke-dasharray: 400; stroke-dashoffset: 400; animation: chalk-draw 3.8s 1.4s ease-out forwards; }

.doodle-text {
    font-family: "Caveat", cursive;
    font-size: 22px;
    fill: var(--chalk);
    opacity: 0;
    animation: chalk-fade 1.2s ease-out forwards;
}

.doodle--e { animation-delay: 2.5s; }
.doodle--f { animation-delay: 3.0s; }

@keyframes chalk-draw {
    to { stroke-dashoffset: 0; }
}

@keyframes chalk-fade {
    from { opacity: 0; }
    to { opacity: 1; }
}

.chalk-bg__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.45) 100%);
}

@media (prefers-reduced-motion: reduce) {
    .doodle,
    .doodle-text {
        animation: none;
        stroke-dashoffset: 0;
        opacity: 1;
    }
}
</style>
