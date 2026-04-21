---
name: liquid-glass
description: "DEPRECATED — superseded by the glass-system skill. Kept only so existing references don't 404. All glass/liquid-glass guidance has moved to .claude/skills/glass-system/SKILL.md, which ports the CampusEvents glassmorphism system with proper nested-pocket handling, motion primitives, and broken-grid guidance."
disable-model-invocation: true
---

# Liquid Glass (deprecated)

This skill has been **replaced** by `glass-system` at `.claude/skills/glass-system/SKILL.md`.

The replacement covers everything this skill did — tiered blur/saturate/specular-rim recipe, room-background orb principle, reduced-motion fallback — plus the pieces this one was missing:

- **Nested-glass pocket rule** (the biggest bug: stacking `glass-card > glass-card` now produces a pressed-in inner panel, not duplicate fog)
- **Motion primitives** (`.hover-lift`, `.rise-in` staggers, `cubic-bezier(0.16, 1, 0.3, 1)`)
- **Broken-grid guidance** (asymmetric spans, staggered offsets, full-bleed escapes)

Follow `glass-system` for any new work. Do not reference this file.
