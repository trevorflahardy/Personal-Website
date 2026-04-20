---
name: page-slice-guard
description: Design thesis and implementation directives for the Slice Guard page — a 3D-print lab management system shown as an engineering blueprint on a drafting table. Use when editing src/pages/slice-guard.
---

# Slice Guard — The Blueprint

## Thesis

Slice Guard manages a fleet of 3D printers in a university makerspace. The page should feel like a **shop-drawing blueprint tacked to a drafting table**. Not a product landing page. Not a portfolio card. A blueprint.

The old layout uses uniform rectangular tiles — "block architecture" in the user's words. The redesign **breaks the grid** into a technical-drawing layout: large numbered zones, dimension lines, callouts, plan-view schematics of the print lab with print beds labeled by status.

## Visual palette

- **Canvas**: cyanotype blueprint blue (`#0a3d6e` base, `#0d4a84` elevated). Not glass — a dense opaque wash, with a tight SVG cross-hatch pattern (25% alpha) on top to read as paper.
- **Ink**: off-white (`#e8eef7`) drafting ink. Titles in **draftsman's sans** (`"IBM Plex Sans"` / fallback `SF Pro Display`), all uppercase, wide tracking (`0.1em`).
- **Accent**: `--color-sliceguard: #38bdf8` (laser cyan) — used for dimension lines, callout circles, hover states.
- **Secondary**: `--color-sliceguard-dim: #075985` for dimmed rules and secondary labels.

## Structure — drafting plate

One long vertical plate split into three zones. No cards. No shadows. Dimension lines and callout arrows replace borders.

### Zone A — Title block (top-right, like a real blueprint)
A small corner block: project name, revision number, date, author, scale (e.g. `1:64`). Uses CSS grid for the fields with hairline borders. Fixed-size, 260px wide.

### Zone B — Plan view
A 2D schematic of the print lab: 12 rectangles representing print beds in a 4×3 grid, but rendered as **wireframe outlines** (1px cyan), each labeled with an ID (`BED-01`, `BED-02`, ...) and a status glyph (IDLE / PRINTING / ERROR). Hovering a bed highlights it and draws a dimension line to a callout panel on the right describing current job.

### Zone C — Feature callouts
Three numbered callouts, each annotated with a **leader line** (SVG polyline) connecting a number bubble (e.g. `①`, `②`, `③`) to the feature description in the margin. Callouts reference areas in Zone B.

### Zone D — Specification table
A dense tabular spec list — `mono`, 16 rows, two columns (property / value). Alternating row shading via `background-color: rgba(56,189,248,0.04)` on even rows. Row height 28px.

### Zone E — Revisions footer
A "revisions" table like the corner of real blueprints: rev / date / description / approved-by.

## Motion

Motion here is **restrained** — a blueprint doesn't animate. Exceptions:
- Leader lines **draw on** (SVG `stroke-dasharray` animation) when scrolled into view.
- Bed status glyphs **blink** slowly (3s pulse) for `PRINTING` beds.
- Hover on a bed triggers a 200ms cyan glow + dimension-line reveal.

## Do / don't

- **Don't** use `glass-card`, `glass-regular`, or any of the glass utility classes. This page is opaque paper, not transparent glass.
- **Don't** use `rounded-xl` / `rounded-2xl`. Blueprints have sharp corners — `rounded-none` or at most `rounded-sm`.
- **Don't** use the uniform 3-column features grid. Break the grid.
- **Do** use `border-cyan-500/20` hairline borders liberally.
- **Do** use monospace for every number, dimension, and label.
- **Do** include at least one real dimension line somewhere (SVG with arrowheads and a measurement label).

## Files to touch

- `src/pages/slice-guard/SliceGuard.vue` — full rewrite.
- `src/pages/slice-guard/bed-fleet.ts` — new, seed data for the 12 print beds (id, status, current job, material, elapsed).

## Color note

Slice Guard's existing cyan accent clashes visually with Baro-RS's amber when the pages sit next to each other in the sidebar. That's OK — the sidebar uses its own accent swatches. The page canvases should feel like entirely different workshops.
