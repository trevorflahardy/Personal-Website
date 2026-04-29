import type { BedStatus } from './bed-fleet';

const glyphMap: Record<BedStatus, string> = {
    idle: '—',
    printing: '◉',
    error: '✕',
    queue: '▢',
};

const labelMap: Record<BedStatus, string> = {
    idle: 'AVAILABLE',
    printing: 'ACTIVE JOB',
    error: 'FAULT',
    queue: 'QUEUED',
};

export const statusGlyph = (s: BedStatus) => glyphMap[s];
export const statusLabel = (s: BedStatus): string => labelMap[s];
