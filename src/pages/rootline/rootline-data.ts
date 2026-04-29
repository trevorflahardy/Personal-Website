export interface TreeNode {
    id: string;
    label: string;
    x: number;
    y: number;
    side: 'left' | 'right' | 'center';
}

export interface Callout {
    idx: string;
    title: string;
    body: string;
}

export interface Plate {
    num: string;
    src: string;
    caption: string;
    latin: string;
}

export interface Method {
    part: string;
    value: string;
}

export interface HabitatEntry {
    k: string;
    v: string;
}

const BASE = import.meta.env.BASE_URL;

export const nodes: TreeNode[] = [
    { id: 'a', label: 'Grandparent', x: 200, y: 20, side: 'center' },
    { id: 'b', label: 'Parent', x: 140, y: 88, side: 'left' },
    { id: 'c', label: 'Parent', x: 260, y: 88, side: 'right' },
    { id: 'd', label: 'Sibling', x: 80, y: 164, side: 'left' },
    { id: 'e', label: 'Self', x: 180, y: 164, side: 'center' },
    { id: 'f', label: 'Cousin', x: 300, y: 164, side: 'right' },
];

export const callouts: Callout[] = [
    {
        idx: 'I.',
        title: 'Pathfinding between souls',
        body: 'Select any two members and Rootline draws the exact line between them — great-uncle, second cousin once removed — in fine green ink.',
    },
    {
        idx: 'II.',
        title: 'Editing only what is yours',
        body: 'Owners, editors, viewers. Branch-scoped permissions enforced at UI, server, and row-level security so no relative rewrites another’s corner of the garden.',
    },
    {
        idx: 'III.',
        title: 'Import from the old books',
        body: 'GEDCOM 5.5.1 import and export. Bring your Ancestry or MyHeritage tree in; carry it back out. The garden is portable.',
    },
];

export const plates: Plate[] = [
    {
        num: 'II.',
        src: `${BASE}rootline/demo1.png`,
        caption: 'Canopy view — five generations pressed onto a single pane',
        latin: 'vista plena · five generations',
    },
    {
        num: 'III.',
        src: `${BASE}rootline/demo2.png`,
        caption: 'Node detail — photograph, date stones, living narrative',
        latin: 'folium personale · in situ',
    },
    {
        num: 'IV.',
        src: `${BASE}rootline/demo3.png`,
        caption: 'Two cursors at once — editing in live company',
        latin: 'collaboratio viva · realtime.supabase',
    },
    {
        num: 'V.',
        src: `${BASE}rootline/demo4.png`,
        caption: 'Relationship finder — the green line between any two souls',
        latin: 'via consanguinitatis · bfs',
    },
];

export const methods: Method[] = [
    { part: 'Fronds', value: 'Vue 3 · TypeScript · Vite · Tailwind CSS v4' },
    { part: 'Rootstock', value: 'Supabase (Postgres · Auth · Realtime · RLS)' },
    { part: 'Pollination', value: 'live cursors · broadcast channels · optimistic writes' },
    { part: 'Provenance', value: 'GEDCOM 5.5.1 import + export · reversible' },
    { part: 'Warding', value: 'row-level security · branch-scoped roles · invite codes' },
    { part: 'Soil test', value: 'unit · integration (vitest) · playwright for cursor e2e' },
];

export const habitat: HabitatEntry[] = [
    { k: 'habitat', v: 'web · modern browsers · mobile responsive' },
    { k: 'first cutting', v: '2025-03-04' },
    { k: 'current season', v: 'v0.7.2 · 2025-10-18' },
    { k: 'status', v: 'private beta · extended family pilot' },
    { k: 'cultivators', v: '1 (solo)' },
    { k: 'line count', v: '≈ 18,400' },
];
