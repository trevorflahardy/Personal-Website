// Rust syntax highlighting. Token-first scan avoids nested-replacement bugs;
// comments and strings win over keywords/types, numbers are claimed last.
export function highlightRust(code: string): string {
    const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    const tokens: { start: number; end: number; html: string }[] = [];

    function scan(regex: RegExp, cls: string) {
        for (const m of escaped.matchAll(regex)) {
            const start = m.index!;
            const end = start + m[0].length;
            if (tokens.some((t) => start < t.end && end > t.start)) continue;
            tokens.push({ start, end, html: `<span class="${cls}">${m[0]}</span>` });
        }
    }

    scan(/(\/\/.*$)/gm, 'c-comment');
    scan(/("(?:[^"\\]|\\.)*")/g, 'c-string');
    scan(/\b(println|format|vec)!/g, 'c-macro');
    scan(/\b(use|let|mut|if|fn|pub|struct|impl|return|async|await|move|self|true|false)\b/g, 'c-kw');
    scan(/\b([A-Z][A-Za-z0-9_]*)\b/g, 'c-type');
    scan(/\b(\d+)\b/g, 'c-num');
    scan(/(::|\?|&amp;)/g, 'c-punct');

    tokens.sort((a, b) => a.start - b.start);
    let result = '';
    let cursor = 0;
    for (const t of tokens) {
        result += escaped.slice(cursor, t.start) + t.html;
        cursor = t.end;
    }
    result += escaped.slice(cursor);
    return result;
}
