<template>
    <div class="fury-bg" aria-hidden="true">
        <div class="fury-bg__horizon" />
        <div class="fury-bg__grid" />
        <div class="fury-bg__scanlines" />
        <div class="fury-bg__vignette" />
    </div>
</template>

<style scoped>
.fury-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}

.fury-bg__horizon {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at 50% 0%, rgba(78, 219, 252, 0.18), transparent 55%),
        radial-gradient(ellipse at 50% 100%, rgba(255, 45, 122, 0.18), transparent 55%),
        linear-gradient(to bottom, #0a0514 0%, #180a2a 50%, #0a0514 100%);
}

.fury-bg__grid {
    position: absolute;
    left: -10%;
    right: -10%;
    bottom: 0;
    height: 55vh;
    background-image:
        linear-gradient(rgba(78, 219, 252, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(78, 219, 252, 0.4) 1px, transparent 1px);
    background-size: 60px 40px;
    transform: perspective(600px) rotateX(65deg);
    transform-origin: bottom;
    mask-image: linear-gradient(to top, black 10%, transparent 90%);
    opacity: 0.4;
}

.fury-bg__scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0, 0, 0, 0.18) 2px 3px);
    mix-blend-mode: overlay;
    pointer-events: none;
}

.fury-bg__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.55) 100%);
}
</style>
