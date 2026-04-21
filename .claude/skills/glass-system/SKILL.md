---
name: glass-system
description: "Personal-website glass/liquid-glass design system. Ported from the CampusEvents glassmorphism-ui skill and adapted to this Vue + Tailwind v4 repo. Use when building, restyling, reviewing, or nesting any glass surface — sidebars, cards, hero panels, inputs, overlays. Enforces the tiered treatment (elevated outer glass, pressed-in nested glass) that prevents the fog-on-fog problem."
disable-model-invocation: false
---

# Glass System — Personal Website

> You are a UI implementation agent. Produce Vue 3 + Tailwind v4 code that follows every rule below.
> Reference: this repo is Vue 3 + TS + Tailwind v4 (config lives in `src/index.css` via `@theme`, NO `tailwind.config.js`).

## 1. The Orb Principle (non-negotiable)

Glassmorphism only works when there is multi-color depth behind the glass. `backdrop-filter: blur()` smears whatever sits behind. A flat background produces grey fog. This site's background is the **room image** (`/AptNight.png` in `App.vue`) — which naturally provides warm lamp bloom + cool shadow contrast. Never replace the room with a flat color.

## 2. The Three-Tier Recipe

Every glass surface has **four layers**: gradient fill (directional light), `saturate()` inside `backdrop-filter` (richness), `inset 0 1px 0 rgba(255,255,255,X)` (top-edge specular — the "this is glass" cue), and an outer shadow (depth separation).

| Tier | Class(es) | `blur` | `saturate` | Use for |
| --- | --- | --- | --- | --- |
| **Light** | `glass-thin` | 8px | 180% | Chrome overlays, marquees, toast surfaces |
| **Regular** | `glass-regular` | 20px | 180% | Secondary panels, inline containers |
| **Medium** | `glass-semithick` | 24px | 180% | Headers, compact cards |
| **Heavy** | `glass-card` / `glass-thick` | 28-32px | 180% | Primary cards, hero panels, page-level containers |

All five classes already exist in [`src/index.css`](src/index.css). Pick the thinnest tier that reads as glass for the context — more blur is not better.

## 3. Nested Glass — the pocket rule (most commonly broken)

**NEVER** place a `glass-*` card inside another `glass-*` card with the same treatment. The inner one will replicate the outer's raised specular rim + outer shadow, and both panels read as equal-weight fog.

**The rule:** inner glass is a **pocket** — darker fill, inset shadow, no specular rim, no outer shadow. Reads as a depression carved into the parent.

### How it works

Two paths — both already wired in `src/index.css`:

1. **Automatic (preferred):** Any `.glass-*` class nested inside another `.glass-*` class is auto-downgraded by a CSS descendant selector. Just nest naturally — no extra class needed.
2. **Explicit:** Use `class="glass-pocket"` when you need a pocket look on an element that isn't auto-matched (e.g. a plain `div` nested inside a glass panel, or a sibling that should read as depressed).

### What the pocket gives you

- `background-color: rgba(0,0,0,0.22)` (dark) / `rgba(0,0,0,0.04)` (light-mode)
- `backdrop-filter: blur(6px)` — minimal; the parent already blurred
- `inset 0 1px 2px rgba(0,0,0,0.35)` — pressed-in shadow instead of raised
- No `::before` specular gradient — the parent owns the light
- No outer shadow

### Anti-pattern — what the screenshot caught

Two `.glass-card` containers, one inside the other, same translucent white, same outer drop-shadow, same top specular. The eye sees two equally-weighted panels instead of parent + child. **Fix is automatic now** — but never manually stack `glass-card > glass-card` with explicit extra white tint classes (e.g. `bg-white/10` inside a card); trust the nested-glass rule.

## 4. Content Hierarchy — when NOT to use glass at all

If content already has a natural container (a hero with a prominent title, a paragraph of body text), glass is overhead. Use glass when:

- Grouping heterogeneous content visually
- Floating over a busy background (the room image)
- Creating a tap target (buttons, nav items)

Do NOT use glass for:

- Prose paragraphs under a heading
- Section dividers
- Tiny inline pills (use `rounded-full bg-white/6` instead — no blur cost)

## 5. Motion Primitives

Ported from the `emilkowalski/skill` design-engineering skill. Rules:

- Use `transform` and `opacity` only (GPU-accelerated, off main thread)
- Prefer `%` over `px` for translates that cross breakpoints
- Use `cubic-bezier(0.16, 1, 0.3, 1)` for entrance (already defined in `.rise-in`)
- Use `cubic-bezier(0.32, 0.72, 0, 1)` for panel/drawer motion (the Vercel Vaul curve)
- Animate on intent, not arrival

### Classes already available

- `.hover-lift` — adds a translateY(-3px) lift + deep shadow on hover. Wrap any card.
- `.rise-in` + `.rise-1` … `.rise-5` — staggered fade-up on mount. Apply directly; they're animation-delay-based, no JS needed.
- `.orb-drift` — slow background orb drift (18s ease-in-out infinite). Decoration only.

All respect `prefers-reduced-motion`.

## 6. Breaking the Card Grid

Every portfolio-site page defaults to 3-col uniform card grids. Kill that pattern with:

- **Asymmetric spans** — 12-col CSS grid with hero spanning 7-8 cols, secondary 4-5, one tile breaking out
- **Staggered offsets** — `odd:-translate-y-2 even:translate-y-2` on siblings
- **Full-bleed sections** — negative-margin out of `PageLayoutSpacer`'s padding (`-mx-6 md:-mx-10`)
- **SVG decoration escaping edges** — absolute-positioned SVGs with `overflow-visible` on the parent, extending past the card
- **Clip-path dividers** — `clip-path: polygon(...)` on a section to create an angled or curved edge

## 7. Accessibility Checklist

- [ ] Text contrast ≥ 4.5:1 against the glass (use `text-white/90` on dark glass, not `text-white/60`)
- [ ] `prefers-reduced-motion` respected (already handled for provided primitives)
- [ ] `prefers-reduced-transparency` respected (provided — solid fallback for `.lg-surface`)
- [ ] Focus rings visible on glass buttons — `focus:ring-2 ring-white/40`

## 8. Anti-Patterns (never do these)

- Two `glass-card`s nested with the same tier — use nesting rule above
- `bg-white/10` or similar Tailwind utility INSIDE a glass card as a "pseudo-pocket" — use the `glass-pocket` class
- Monochromatic background behind glass — always the room image or an orb-gradient
- Flat `rgba()` glass fill — always the `lg-surface` gradient
- Missing `saturate()` — blur alone is grey smear
- Missing inset top specular on raised surfaces — reads as plastic
- Vibrant neon colors stacked on glass — muted palette only, accent colors come from `@theme` tokens
- Layout-shifting hover transforms like `scale(1.05)` on in-flow cards — only `translateY`
- `tailwind.config.js` — this is Tailwind v4, use `@theme {}` in `src/index.css`

## 9. Reference Files

| File | Purpose |
| ---- | ------- |
| `src/index.css` — `@layer components` | All glass utility classes, pocket rule, motion primitives |
| `src/components/sidebar/Sidebar.vue` | Canonical `lg-sidebar` use (heavy blur, full panel) |
| `src/components/PageLayoutSpacer.vue` | Standard page padding + mount animation wrapper |
| `src/components/Button.vue` | Glass button with `.button-glass` class |

## 10. Sourcing

- Tiered glass recipe — ported from `CampusEvents/frontend/src/index.css` + the `glassmorphism-ui` skill
- Motion primitives — adapted from `emilkowalski/skill` (Emil Kowalski, Vercel)
- Nesting / pocket rule — observed problem in this repo's homepage screenshot, synthesized from pressed-in pattern in iOS settings panels + macOS Sonoma
- Broken-grid technique — HTMLBurger's broken-grid examples + Rauno Freiberg's `devouringdetails.com`

When building a new page, read this skill first. When reviewing an existing page for glass usage, diff against §3 (nesting) and §6 (grid) first — those are where problems cluster.
