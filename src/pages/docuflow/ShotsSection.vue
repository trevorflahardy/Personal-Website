<template>
    <section class="ds-section ds-section--dark ds-section--shots">
        <div class="ds-section__inner ds-section__inner--wide">
            <p class="ds-kicker ds-kicker--light">In the browser</p>
            <h2 class="ds-heading ds-heading--light">What it looks like.</h2>
            <p class="ds-sub ds-sub--light">The generated output is a clean static site — fast, accessible, and completely yours to style.</p>

            <div class="ds-screenshots">
                <figure class="ds-fig">
                    <img src="/docuflow-home.png" alt="Docuflow project home page screenshot" class="ds-fig__img" />
                    <figcaption class="ds-fig__cap">Home page — project landing generated from <code>index.mdx</code></figcaption>
                </figure>
                <figure class="ds-fig">
                    <img src="/docuflow-docs.png" alt="Docuflow docs page screenshot" class="ds-fig__img" />
                    <figcaption class="ds-fig__cap">Docs page — sidebar nav + MDX content with component islands</figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ds-section {
    padding: 5rem 2rem;
    border-top: 1px solid var(--rule);
}

.ds-section--dark {
    background: var(--ink);
    border-top-color: rgba(255, 255, 255, 0.08);
}

.ds-section__inner {
    max-width: 900px;
    margin: 0 auto;
}

.ds-section__inner--wide {
    max-width: none;
}

.ds-kicker {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 0.75rem;
}

.ds-kicker--light {
    color: rgba(255, 255, 255, 0.45);
}

.ds-heading {
    font-family: "Fraunces", "Times New Roman", serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--ink);
    margin: 0 0 0.85rem;
}

.ds-heading--light {
    color: rgba(255, 255, 255, 0.92);
}

.ds-sub {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--mute);
    margin: 0 0 3rem;
    max-width: 56ch;
}

.ds-sub--light {
    color: rgba(255, 255, 255, 0.52);
}

.ds-screenshots {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
}

@media (min-width: 1000px) {
    .ds-screenshots {
        grid-template-columns: repeat(2, 1fr);
    }
}

.ds-fig { margin: 0; }

.ds-fig__img {
    width: 100%;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: block;
}

.ds-fig__cap {
    font-family: "SF Mono", ui-monospace, monospace;
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.38);
    margin-top: 0.75rem;
    letter-spacing: 0.04em;
}

.ds-fig__cap :deep(code) {
    background: rgba(255, 255, 255, 0.07);
    padding: 0.1em 0.35em;
    border-radius: 0.25rem;
}
</style>
