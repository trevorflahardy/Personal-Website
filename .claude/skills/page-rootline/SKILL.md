---
name: page-rootline
description: Design thesis and implementation directives for the Rootline page — a collaborative family-tree app shown as a living botanical illustration. Use when editing src/pages/rootline.
---

# Rootline — The Garden

## Thesis

Rootline is a collaborative family-tree application. The page should feel like a **botanical plate from a vintage field guide**: warm paper, hand-inked strokes, roots reaching across the page, labeled with serif italics. Not a product grid. Not glass tiles.

The old layout uses the standard 3-column feature grid. The redesign **breaks the grid** into an asymmetric tree composition with roots (metaphorical AND literal — SVG root paths) crossing between sections.

## Visual palette

- **Canvas**: warm paper (`#f5efe4` in light, `#1a1814` in dark — this page looks good in either, and *should* invert nicely because the skill writes token-driven styles that use `html:not(.dark)` overrides). A faint paper-grain SVG overlay (`feTurbulence`, 4% opacity).
- **Ink**: deep forest green (`--color-rootline: #4ade80` dim → `#166534` for ink strokes) and walnut brown (`#4a3b2c`) for serif headers.
- **Accent for links/interactions**: bright moss (`#65a30d`).
- **Type**: serif for titles (`"Fraunces"` / fallback `"Playfair Display"` / fallback `Georgia`). Sans for body. Italic serif for plant-name-style labels.

## Structure — botanical plate

Single long page composition, **not a grid**. Content flows organically around an SVG root system that spans the full page height.

### Layout (top to bottom)

1. **Plate header**. Serif italic "Plate I · Rootline" top-left; edition date top-right. A thin ruled line across the page separates header from body.
2. **Hero illustration**. A large SVG family-tree sketch (top-center, 40% viewport height). Branches end in 6-8 labeled nodes ("Mother", "Uncle", etc.) with italic serif labels. The SVG animates on scroll — roots draw in via `stroke-dasharray`.
3. **Specimen description**. Two-column prose layout (like a book): left column is body text explaining the problem; right column is a pull-quote in italic serif at 1.4× size with a large decorative first letter.
4. **Three feature callouts — NOT a grid**. Instead: three paragraphs staggered across the page at different left offsets, each connected to a small inline sketch by a curved SVG root. Paragraph 1 at `margin-left: 0`, paragraph 2 at `margin-left: 30%`, paragraph 3 at `margin-left: 15%`.
5. **Screenshot panel** of the app, framed as a herbarium specimen with a handwritten-style caption underneath ("*collected MMXXV · south florida*"). Caption in italic serif at low opacity.
6. **Signature footer**. Three lines of mono in the bottom-right corner: `catalogued by T. Flahardy`, `repo: rootline`, date. Reads like a naturalist's signature.

## Motion

- **Root strokes draw in** via `stroke-dasharray` when scrolled into view. Timing: 1.8s, cubic-bezier(0.16, 1, 0.3, 1).
- **Serif titles fade-and-settle**: opacity 0→1 with `translateY(8px)→0`, 700ms.
- **No parallax.** A field guide doesn't parallax.
- **Honor `prefers-reduced-motion`**: all drawing completes instantly.

## Do / don't

- **Don't** use `glass-card`, `glass-regular`, uniform card grids, rounded-3xl frames, or the shared `PageLayoutSpacer` defaults. Override the inner padding on this page.
- **Don't** use the 3-column `grid md:grid-cols-3 gap-4` feature layout. That's the "block architecture" we're escaping.
- **Do** use serif type extensively — both for titles and decorative elements.
- **Do** write at least one SVG path by hand (for the hero tree) rather than importing a decorative library.
- **Do** include a dropped capital on the first specimen paragraph (CSS `::first-letter { font-size: 4rem; float: left; ... }`).

## Files to touch

- `src/pages/rootline/Rootline.vue` — full rewrite.
- `src/pages/rootline/tree-svg.ts` (optional) — extract the large inline SVG for the hero tree if it grows past ~100 lines.
- `src/pages/rootline/specimen-data.ts` — content: the three callout paragraphs + the pull-quote + the naturalist-signature fields.

## Note on light/dark

This page should **look equally natural in light and dark mode**. The warm paper ↔ warm parchment inversion is part of the concept. Use `html:not(.dark)` selectors from `src/index.css` to flip the canvas, ink, and serif color. Test both modes before marking done.
