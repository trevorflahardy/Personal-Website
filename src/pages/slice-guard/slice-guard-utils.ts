const glyphMap: Record<string, string> = {
    idle: '—',
    printing: '◉',
    error: '✕',
    queue: '▢',
};

const labelMap: Record<string, string> = {
    idle: 'AVAILABLE',
    printing: 'ACTIVE JOB',
    error: 'FAULT',
    queue: 'QUEUED',
};

export const statusGlyph = (s: string) => glyphMap[s] ?? '—';
export const statusLabel = (s: string): string => labelMap[s] ?? s.toUpperCase();
