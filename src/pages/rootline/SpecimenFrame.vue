<template>
    <section class="specimen-frame">
        <h2 class="section-head"><i>Plate I</i>, the principal specimen.</h2>
        <figure>
            <div class="frame-inner">
                <img src="/rootline/hero.png" alt="Rootline tree view"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
                <div class="frame-fallback" style="display:none">
                    <i>plate unavailable — specimen in preparation</i>
                </div>
            </div>
            <figcaption>
                <i>collected MMXXV · south florida · screen capture from live instance</i>
            </figcaption>
        </figure>
    </section>
</template>

<style scoped>
.specimen-frame {
    max-width: 62rem;
    margin: 0 auto 4rem;
    padding: 0 1rem;
}

.section-head {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0 0 2rem;
    border-bottom: 1px solid rgba(234, 226, 210, 0.18);
    padding-bottom: 0.75rem;
}

.section-head i { color: var(--forest); }

.frame-inner {
    border: 1px solid rgba(165, 138, 99, 0.4);
    padding: 0.8rem;
    background: rgba(26, 24, 20, 0.6);
    box-shadow: inset 0 0 0 1px rgba(234, 226, 210, 0.06);
}

.frame-inner img {
    width: 100%;
    display: block;
    opacity: 0.85;
}

.frame-fallback {
    padding: 3rem 2rem;
    text-align: center;
    color: var(--ink-dim);
    font-style: italic;
    background: rgba(74, 222, 128, 0.04);
    border: 1px dashed rgba(74, 222, 128, 0.18);
}

.specimen-frame figcaption {
    margin-top: 0.8rem;
    text-align: center;
    color: var(--ink-dim);
    font-size: 0.85rem;
    font-style: italic;
}
</style>
