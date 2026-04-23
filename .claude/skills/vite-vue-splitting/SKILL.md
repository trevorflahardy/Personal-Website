---
name: vite-vue-splitting
description: Rules for breaking monolithic Vue SFCs into focused subcomponents in this Vite + Vue 3 portfolio. Covers decomposition shape, async loading, data colocation, and scoped-style placement. Use whenever a page under `src/pages/` exceeds ~300 lines or is being refactored.
---

# Vite + Vue component splitting

When a page SFC under `src/pages/` grows past ~300 lines, it stops reading like a single idea.  This skill codifies how to split it.  It is **not** a general Vue style guide — it is the local convention.

## Decomposition shape

The root component becomes a thin orchestrator.  Subsections live in sibling files under the same page directory.  Two canonical examples:

```
src/pages/profile/
  Profile.vue          # thin: renders <Intro/>, <WorkExperience/>, <Extras/>
  Intro.vue
  WorkExperience.vue
  extras/
    Extras.vue
    Waka.vue
    Discord.vue
    DiscordActivity.vue
  info.ts              # router name, metadata

src/pages/baro-rs/
  BaroRs.vue           # internal route switch (v-if on route name)
  BaroRsHome.vue
  act-data.ts
  drivers/
    DriverPage.vue
    driver-data.ts
```

Every new page follows this shape.  Don't invent a new pattern.

## When to extract a subcomponent

Extract when **any** of:

- The section has its own visual identity (a hero vs. a feature grid vs. a CTA).
- It has its own state or composable usage.
- It has >40 lines of template or >60 lines of scoped CSS.
- It would be named with a different noun than the page as a whole.

Don't extract:

- A single `<h1>` or a three-line subtree — inlining is fine.
- Anything that only exists to satisfy a lint rule about template length.

## Static vs. async imports

Default to **static** imports (`import Foo from './Foo.vue'`).

Switch to **`defineAsyncComponent` + `<Suspense>`** when:

- The section is below-the-fold and heavy (pulls GSAP, marked, or a large data file).
- The section makes a network call (Discord, Waka, GitHub) — wrap in `<Suspense>` so the fallback is visible before data arrives.
- Example: `src/pages/profile/Profile.vue` uses `<Suspense>` around `<Extras>` because Extras fetches Discord + Waka.

Never async-import above-the-fold hero content — the user paid a network cost to see it first.

## Data colocation

Long data literals (arrays of feature cards, driver metadata, step lists) go in a **sibling `.ts` file**, not inline in the template.  Existing examples:

- `src/pages/baro-rs/act-data.ts`
- `src/pages/baro-rs/drivers/driver-data.ts`
- `src/pages/slice-guard/bed-fleet.ts`

Naming: `<topic>-data.ts` when the data is exported.  Export named consts, not defaults — it keeps imports explicit.

## Scoped style placement

Each subcomponent owns its own `<style scoped>` block **iff** it has styles that only apply to it.  Rules:

- If two siblings share a rule, promote it to the parent's scoped block or to `src/index.css` (`@layer components`), not duplicated.
- Don't rely on cascading from the parent's scoped block to the child — `scoped` doesn't cross that boundary reliably.  If the child needs a style, give it a copy or move it to a global layer.
- Keep keyframes in the component that owns the element that animates.  If multiple components use the same keyframe, promote to `src/index.css`.

## Props vs. composable vs. data-file

Default to props for static configuration (what to render).  Use a composable (`src/composables/useFoo.ts`) when multiple components need shared reactive state.  Use a data file (`foo-data.ts`) when the configuration is static and doesn't need to be reactive.

Avoid prop-drilling through >2 levels — if a grandchild needs data, either give it its own data-file import or lift to a composable.

## Router & `info.ts`

Every page directory has an `info.ts` exporting at least `routerLinkName`.  The router (`src/router.ts`) imports these so the page's slug is one authoritative string.  When creating a new subpage, follow this pattern — don't hardcode route names in the template.

## After splitting

1. Run `bun run dev` and click through the page — make sure the orchestrator renders all sections in the right order.
2. Run `bun run test:visual -- --grep <page-slug>` — the visual-regression harness should still pass (decomposition is a no-op at the rendered level).
3. If the test fails, the decomposition leaked (scope loss, ordering changed, async boundary exposed a flash).  Fix before committing.
