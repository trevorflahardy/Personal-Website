export type BedStatus = "idle" | "printing" | "error" | "queue";

export interface Bed {
    id: string;
    status: BedStatus;
    job?: string;
    material?: string;
    elapsed?: string;
}

export const beds: Bed[] = [
    { id: "BED-01", status: "printing", job: "cantilever bracket v3", material: "PLA · matte black",    elapsed: "2h 14m / 6h 40m" },
    { id: "BED-02", status: "idle" },
    { id: "BED-03", status: "printing", job: "enclosure lid",          material: "PETG · clear",         elapsed: "42m / 3h 10m" },
    { id: "BED-04", status: "error",    job: "nozzle clog · level 2",  material: "PLA · hazard orange",  elapsed: "halted @ 18m" },
    { id: "BED-05", status: "queue",    job: "impeller rev.B",         material: "PETG · white",         elapsed: "queued · slot 3" },
    { id: "BED-06", status: "printing", job: "thumb drive shell",      material: "PLA · cobalt",         elapsed: "5h 02m / 5h 50m" },
    { id: "BED-07", status: "idle" },
    { id: "BED-08", status: "printing", job: "sensor housing",         material: "ABS · industrial grey", elapsed: "1h 11m / 4h 25m" },
    { id: "BED-09", status: "queue",    job: "gear module",            material: "PLA · pine green",     elapsed: "queued · slot 1" },
    { id: "BED-10", status: "idle" },
    { id: "BED-11", status: "printing", job: "chassis rail L",         material: "PETG · translucent",   elapsed: "38m / 2h 05m" },
    { id: "BED-12", status: "idle" },
];

export const specs: { k: string; v: string }[] = [
    { k: "stack",              v: "vue 3 · typescript · bun · postgres" },
    { k: "object store",       v: "minio → cloudflare r2" },
    { k: "realtime",           v: "websocket, channel-per-lab" },
    { k: "parsers",            v: ".3mf, gcode, prusa-slicer, orca" },
    { k: "auth",               v: "ssr session, rbac, invite codes" },
    { k: "deploy",             v: "docker compose · ci via gh actions" },
    { k: "metrics",            v: "filament used / cost / failure rate" },
    { k: "supported printers", v: "bambu x1, prusa mk4, ender 3 v2" },
    { k: "line count",         v: "≈ 42,300" },
    { k: "first commit",       v: "2025-06-18" },
    { k: "latest release",     v: "v0.9.1 · 2025-09-02" },
    { k: "status",             v: "pilot, usf makerspace" },
];

export const revisions: { rev: string; date: string; note: string; by: string }[] = [
    { rev: "—",  date: "2025-06-18", note: "initial scaffold + auth",         by: "tf" },
    { rev: "A",  date: "2025-07-22", note: "request queue + mock data",       by: "tf" },
    { rev: "B",  date: "2025-08-11", note: "ws channels, avatars, invites",   by: "tf" },
    { rev: "C",  date: "2025-09-02", note: "rbac, theme overhaul, pilot cut", by: "tf" },
];
