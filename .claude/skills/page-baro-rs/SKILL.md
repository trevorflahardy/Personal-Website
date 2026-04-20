---
name: page-baro-rs
description: Design thesis and implementation directives for the Baro-RS page — the flagship fluid-motion project. An instrument dashboard that behaves like a precision tool, built with scroll-driven animation via GSAP + Lenis + SplitType. Use when editing src/pages/baro-rs or its sub-pages.
---

# Baro-RS — The Instrument

## Thesis

Baro-RS is a **Rust embedded environmental monitor** that runs for months on bare silicon. Its page should **feel** like that: quiet, precise, engineered. No decorative glass tiles. No soft pastel gradients. No uniform 3-column card grid. This page is the website's **flagship** — the most ambitious single-page experience on the site.

The metaphor is a **laboratory instrument**: an oscilloscope, a pressure gauge, a thermal camera. Calibrated. Intentional. Every number on screen is there because it represents a real measurement.

## Visual palette

- **Canvas**: deep graphite (`#0b0e10` / `#14181c`) with a 1-pixel grid overlay (CSS repeating-linear-gradient, `rgba(245,158,11,0.04)` lines every 48px). Grid is the tell — instruments have grids.
- **Accent**: amber (`--color-baro-default: #f59e0b`) and copper (`--color-baro-copper: #b87333`). Amber is the "live" signal, copper is the housing.
- **Data color**: near-white ink (`#f8fafc`) for readings, pale amber glow (`rgba(245,158,11,0.65)`) for active pulses.
- **Type**: `JetBrains Mono` or the system monospace stack for all numeric readouts and units. Sans (current `SF Pro Display`) only for headline prose.

## Structure — six acts, scroll-pinned

The page is one long scroll divided into six acts. Each act **pins** (GSAP ScrollTrigger `pin: true`) while its internal animation plays, then releases. No conventional card grid.

1. **Hero / oscilloscope**. Full-viewport canvas showing a live amber sine wave that reacts to scroll velocity (faster scroll → higher frequency). Title "`BARO.RS`" typesets in display-weight serif at 20vw. Subtitle in mono.
2. **Origin**. The problem statement, pinned while a timeline of atmospheric events (wildfires, heatwaves) scrubs across the right side. Text reveals via SplitType word-stagger.
3. **Spec sheet**. 10 rows of numeric data (boot time, sample interval, heap usage, etc.) revealed in sequence as a terminal would print them. Each row types in at 30ms/char.
4. **The six drivers**. Six sticky panels stacked. Each panel pins as you scroll into it, showing the driver's color, a live-looking data visualization (sparkline / dial), and code excerpt. Panel releases, next one pins. Acts like a vertical slide-deck.
5. **System architecture**. A schematic — not a diagram. Hand-drawn-feeling connecting lines (SVG path animation on scroll-enter) between blocks labeled `MCU · BUS · STORAGE · DISPLAY · NETWORK`.
6. **Commit footer**. A scrollable git log of actual commits (from hardcoded data), one per line, mono, no icons. Ends with a "source" link.

## Motion primitives

- **Lenis** for smooth-scroll. Lerp coefficient `0.08`. Mount in `onMounted`, destroy in `onBeforeUnmount`.
- **GSAP ScrollTrigger** for pinning and scrub. Register plugin once in a module-level singleton file, not per-component.
- **SplitType** for letter/word reveals on prose titles. Always destroy instances on unmount.
- **No `v-motion` directives on this page** — they're too slow for scrub-driven work. Use raw GSAP.
- **Reduced motion**: detect `prefers-reduced-motion: reduce` and disable ScrollTrigger + Lenis entirely; render all sections statically.

## Do / don't

- **Do** use the existing `--color-baro-default`, `--color-baro-rust`, `--color-baro-copper` tokens.
- **Do** nest this page inside the existing `glass-thick` frame from `Hero.vue` — the frame is the instrument housing. Don't break out of it.
- **Do** use mono type for any numeric value: `"200ms"`, `"~80KB"`, `"2-3s"`.
- **Don't** reuse the 3-column feature card grid. If you catch yourself writing `grid-cols-3 gap-4`, stop.
- **Don't** add `glass-card` or `glass-regular` children. Use raw `border-t border-white/8` dividers and `rgba(245,158,11,0.06)` washes for sectioning.
- **Don't** add page-level `bg-white/X` tints. The canvas is graphite.

## Driver sub-pages

The six driver sub-pages (`drivers/DriverPage.vue`) inherit the same palette but each uses its driver's `--dc` custom property as the accent. Sub-page layout: hero with driver code + live spark → spec list → relevant code excerpt → "next driver" link. Single column, 720px max-width.

## Files to touch

- `src/pages/baro-rs/BaroRsHome.vue` — full rewrite against this thesis.
- `src/pages/baro-rs/drivers/DriverPage.vue` — align to same palette, simplify layout.
- `src/composables/useLenis.ts` — new, shared Lenis singleton.
- `src/composables/useScrollScene.ts` — new, helper that wires a section's `ref` into a GSAP timeline scrubbed by ScrollTrigger with proper cleanup.
