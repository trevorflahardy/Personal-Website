<template>
    <div class="docuflow-bg" aria-hidden="true">
        <div class="docuflow-bg__grid" />
        <div class="docuflow-bg__gradient" />
    </div>
</template>

<style scoped>
.docuflow-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}

.docuflow-bg__grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(to right, rgba(26, 29, 36, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(26, 29, 36, 0.04) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}

.docuflow-bg__gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(1100px 600px at 70% 0%, rgba(47, 107, 255, 0.08), transparent 60%);
}
</style>
