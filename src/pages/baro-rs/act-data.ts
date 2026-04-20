export const specReadout: { label: string; value: string }[] = [
    { label: "target",          value: "esp32-s3 / xtensa lx7" },
    { label: "rust edition",    value: "2024, no_std, nightly" },
    { label: "boot time",       value: "2-3s  from cold" },
    { label: "sample interval", value: "10s  per sensor tick" },
    { label: "display refresh", value: "200ms async frame" },
    { label: "heap usage",      value: "~80kb  embassy + ui" },
    { label: "drivers",         value: "6 × embedded-hal 1.0" },
    { label: "bus",             value: "i2c, shared via tca9548a" },
    { label: "storage",         value: "microsd, fat32, circular log" },
    { label: "uptime target",   value: "180 days, unattended" },
];

// Architecture tree — 4 levels, orthogonal edge routing.
//   level 0: MCU
//   level 1: EMBASSY (async executor / RTOS-lite)
//   level 2: three subsystem buses  (i2c · spi · sd)
//   level 3: leaf groups (actual driver clusters)
// Coordinates are in a 100 × 80 viewBox, addressed from the box CENTER.
// Box footprint is 18 × 8 (see `.arch-node` CSS).  The SVG renders edges from
// each source's bottom edge to each target's top edge with a midpoint bend.
export interface ArchNode {
    id: string;
    label: string;
    sub: string;
    x: number;  // center x, viewBox units (0–100)
    y: number;  // center y, viewBox units (0–80)
    kind: "root" | "hub" | "leaf";
}

export const architectureNodes: ArchNode[] = [
    // L0 · mcu
    { id: "mcu",      label: "MCU",        sub: "esp32-s3 · xtensa lx7",   x: 50, y: 6,  kind: "root" },
    // L1 · runtime
    { id: "embassy",  label: "EMBASSY",    sub: "async executor · no_std", x: 50, y: 22, kind: "hub" },
    // L2 · subsystem buses
    { id: "i2c",      label: "I2C BUS",    sub: "400 khz · tca9548a mux",  x: 18, y: 42, kind: "hub" },
    { id: "spi",      label: "SPI",        sub: "40 mhz · dma-backed",     x: 50, y: 42, kind: "hub" },
    { id: "sd",       label: "SD / FS",    sub: "fat32 · embedded-sdmmc",  x: 82, y: 42, kind: "hub" },
    // L3 · driver clusters
    { id: "env",      label: "ENV",        sub: "scd41 · bh1750 · bmp390", x: 8,  y: 66, kind: "leaf" },
    { id: "sys",      label: "SYS",        sub: "axp2101 · ft6336u · aw9523", x: 28, y: 66, kind: "leaf" },
    { id: "display",  label: "DISPLAY",    sub: "ili9342c · rgb565 · 320²", x: 50, y: 66, kind: "leaf" },
    { id: "logger",   label: "LOGGER",     sub: "circular · crash-safe",   x: 82, y: 66, kind: "leaf" },
];

// Directed edges (parent → child).  Rendered as orthogonal polylines so each
// connection meets its target's top-center rather than slicing through boxes.
export const architectureLinks: [string, string][] = [
    ["mcu",     "embassy"],
    ["embassy", "i2c"],
    ["embassy", "spi"],
    ["embassy", "sd"],
    ["i2c",     "env"],
    ["i2c",     "sys"],
    ["spi",     "display"],
    ["sd",      "logger"],
];

export const commitLog = [
    { sha: "e9a1f03", date: "2025-11-14", msg: "scd41: wake-on-ready, drop tight poll loop" },
    { sha: "c4712ab", date: "2025-11-02", msg: "axp2101: battery curve calibration, +4% uptime" },
    { sha: "91aa200", date: "2025-10-21", msg: "display: async frame-blit via embassy channels" },
    { sha: "7ba3dd9", date: "2025-10-09", msg: "bh1750: one-shot mode w/ configurable integration" },
    { sha: "40ef182", date: "2025-09-27", msg: "sd logger: round-robin files, crash-safe rollover" },
    { sha: "1f25c90", date: "2025-09-15", msg: "ft6336u: interrupt-driven touch, debounce fsm" },
    { sha: "a0ddc4e", date: "2025-08-30", msg: "tca9548a: lock-free channel switch, async" },
    { sha: "82c6f01", date: "2025-08-18", msg: "boot: fs-check + safe-mode if sd missing" },
];
