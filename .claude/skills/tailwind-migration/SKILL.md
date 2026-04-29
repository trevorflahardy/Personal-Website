---
name: tailwind-migration
description: House rules for migrating page-level scoped CSS to Tailwind utilities in this Vue + Tailwind v4 portfolio. Clarifies what is safe to migrate, what must stay as CSS, and how to handle page-specific CSS custom properties. Use whenever editing a file under `src/pages/`.
---

# Tailwind migration (Vue + Tailwind v4)

This project uses Vue 3 + Tailwind v4 (`@theme`-based config in `src/index.css`, no `tailwind.config.js`).  Pages under `src/pages/` historically grew large scoped `<style>` blocks.  The goal is to push CSS toward Tailwind where that's a real simplification — **not** a wholesale rewrite.

## Safe-to-migrate checklist

A CSS rule is "safe" to replace with a Tailwind utility only if **all** of:

1. It maps 1:1 to a single utility (or a short arbitrary value like `px-[18px]`, `bg-[color:var(--paper)]`) — no loss of intent.
2. It is **not** part of a keyframe, pseudo-element, `:deep()`, `mix-blend-mode`, `mask-image`, `writing-mode`, clip-path, or 3D-transform rule.
3. It is not a `html:not(.dark) .foo { … }` light-mode override — those stay centralized in `src/index.css`.
4. If the page has a design-thesis skill (`page-baro-rs`, `page-rootline`, `page-slice-guard`), the rule is not one the thesis calls out as load-bearing.

If any check fails, **leave it as scoped CSS.**  Don't torture a utility stack to emulate custom CSS.

## What definitely stays as scoped CSS

- `@keyframes` + `animation:` (e.g. `fury-bob`, `coin-blink`, `noise-shift`, `kew-drift-a`)
- Pseudo-element decorations (`::before`/`::after`) with custom `content`, gradients, or clip-paths
- `:deep()` penetrations into slot or markdown-rendered HTML (Docuflow's `.preview-doc :deep(h1)` etc.)
- Backdrop-filter combos (we already have glass utilities — use those)
- 3D transforms, `perspective`, `rotateX` / `rotateY`
- `repeating-linear-gradient` + `mix-blend-mode` overlays
- `writing-mode` gutters (BaroRs act numbers)

## CSS custom properties (`--foo`) strategy

Page-local vars (`--paper`, `--ink`, `--dc`, `--amber-glow`) show up everywhere.  Three tiers:

1. **Shared across pages** (e.g. a token that matches `@theme` entries in `src/index.css`): delete the page-local definition, reference the `@theme` token directly via a `bg-<token>` utility or `var(--color-foo)`.
2. **Per-page theme palette** (e.g. `--paper`, `--ink` for Rootline, `--board` for CNT): keep on the page root element as a `style="--paper: …;"` or scoped `:root`/component CSS, **and** promote to `@theme` if another page can reuse the palette.
3. **Per-instance dynamic** (e.g. `--dc` for baro-rs drivers, set via inline `style`): keep the inline style — don't generate N Tailwind variants.

Never duplicate an `@theme` token into a page-local `--var`.

## Typography

`src/index.css` already owns the typography scale (`.hero-title`, `.title`, `.title-2/3/4`, `.subtitle`, `.body`, `.card-title`, `.card-body`, `.card-caption`).  Migration should **route to these classes**, not re-express `font-size: 2rem` via Tailwind.  If a page needs a one-off size, use a Tailwind utility but prefer the semantic class.

## Component extraction pairs with migration

Decomposing a monolithic `.vue` file is the bigger quality win.  When extracting a subcomponent, ask: does this sub-section have its own scoped `<style>` still?  If yes:

- Move the scoped CSS into the subcomponent so each child owns its local styles.
- If two children share a rule, promote it to `src/index.css` (`@layer components`) or to the parent's scoped block.
- Re-run the visual-regression test (`bun run test:visual -- --grep <page>`) after each extraction to make sure the cascade still resolves the same.

## Verification loop

The repo has Playwright visual-regression tests (`tests/visual/pages.spec.ts`).  For every page-editing session:

1. Make the edit.
2. Run `bun run test:visual -- --grep <page-slug>`.
3. If it fails with >1% pixel diff or a computed-styles mismatch, **don't update snapshots** — investigate.  The point of the harness is to catch silent regressions.
4. Only `bun run test:visual:update` when you've confirmed the diff is intentional and explain it in the commit body.

## Follow existing patterns

- `src/pages/profile/` and `src/pages/baro-rs/` show the decomposition shape.
- `src/pages/baro-rs/act-data.ts`, `slice-guard/bed-fleet.ts` show the data-colocation pattern.
- Don't touch `src/components/` (shared layer) in a page-level migration.
