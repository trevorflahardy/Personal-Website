---
name: ui-audit
description: Opinionated, research-backed audit pass for this personal website — flags contrast bugs, motion excess, layout collisions, and generic aesthetics; produces a short punch list instead of a wall of prose.
---

# UI Audit Skill

Run this whenever a batch of visual work is about to ship, or the user says
"audit" / "review the UI" / "something feels off".  It exists to catch the
bugs screenshots hide — contrast failures on text over translucent glass,
chrome that collides with page content, motion that fights instead of
reinforces, grids that still feel generic even after a redesign.

## When to invoke

- After a design pass on one or more pages.
- When the user reports "something feels off" without a specific bug.
- Before declaring a full-bleed page "done" — the takeover metaphor can hide
  accessibility problems that the glass frame previously masked.
- Before a release or deploy.

## Method (fast, opinionated)

Do a single pass across the live site, one concern at a time.  For each
finding: **one line, file:line, why it matters.**  No prose essays.

### 1. Contrast & legibility
- Run every `text-white/X` utility through the light-mode override (the
  `html:not(.dark) .text-white\/X` blanket in `src/index.css`).  Any text
  that relies on a specific dark-mode opacity *and* doesn't get a light-mode
  rewrite should be flagged.
- Flag any glass surface with body text under `text-white/65` in dark mode
  (Nielsen Norman Group · 4.5:1 minimum for body text, 3:1 for large).
- Flag coloured text on coloured backgrounds where the computed contrast
  ratio (foreground vs. opaque-blended backdrop) dips below 4.5:1.

### 2. Layout collisions
- Any `absolute`-positioned chrome (toggles, pills, back links) must not
  overlap content that could start in the same corner.  The sidebar toggle
  sat at `top-4 left-4` and collided with every page's top-left heading —
  that class of bug shows up every time a new overlay lands.
- Check that scroll containers have visible overflow handling — missing
  overflow-y leaves the bottom of long pages clipped.

### 3. Motion polish
- Every transition under 150ms reads as a glitch; every one over 700ms
  feels sluggish.  Flag anything outside [150, 700] unless deliberately
  slow (modal enter, hero reveal).
- Every motion must respect `@media (prefers-reduced-motion: reduce)`.
  The Hero page-swap, Rootline plates, and Baro oscilloscope all have to.
- Entrance animations on already-visible content (`v-motion` on always-
  mounted sections) are noise.  Kill them.

### 4. "Still generic" check
- If two project pages use the same hero pattern (title + subtitle +
  description), they're not unique enough.  Each flagship should feel
  like a different application.
- 3-column card grids are a smell on a personal site.  If you see one
  outside of directory/index pages, ask whether it earns its keep.
- Mono type is the only thing some pages lean on — if the *layout* is
  still conventional, monofont alone doesn't make it distinctive.

### 5. Full-bleed takeover specifics
- The "return to site" pill (Hero.vue `.return-pill`) must read against
  every page's background.  Re-check on new pages.
- Pages using `meta.fullBleed: true` must not rely on `PageLayoutSpacer`
  or any of the glass-card utilities.  They paint their own world.
- The page's outermost element should be the only thing with a background
  — nothing should leak through from App.vue.

## Output shape

A punch list, grouped by page, under 40 lines total.  Example:

```
ROOTLINE
- plate-frame bg too light in dark mode — img opacity 0.9 washes out
- habitat-row dt text-white/62 fails 4.5:1 on paper #1a1814 → bump to /78

BARO-RS
- hero oscilloscope keeps drawing under reduced-motion → guard rAF

SITE-WIDE
- sidebar toggle at top-4 left-4 still fires on pages w/o PageLayoutSpacer
```

Each line is actionable in under 5 minutes.  If you find something that
isn't, it's a separate ticket, not an audit finding.

## What NOT to do

- Don't write a long essay about design philosophy.
- Don't re-litigate decisions the user has already made.
- Don't produce "nice-to-haves" — this is a bug sweep, not a wish list.
- Don't fix bugs inside the audit.  Report, then let the user triage.
