export interface DfaState {
    id: string;
    x: number;
    y: number;
    label: string;
    start?: boolean;
    accept?: boolean;
}

export interface DfaEdge {
    from: string;
    to: string;
    label: string;
}

export const dfaStates: DfaState[] = [
    { id: 'q0', x: 60, y: 140, label: 'q₀', start: true },
    { id: 'q1', x: 220, y: 140, label: 'q₁' },
    { id: 'q2', x: 380, y: 80, label: 'q₂' },
    { id: 'q3', x: 380, y: 200, label: 'q₃' },
    { id: 'q4', x: 540, y: 140, label: 'q₄', accept: true },
];

export const dfaEdges: DfaEdge[] = [
    { from: 'q0', to: 'q1', label: 'a' },
    { from: 'q1', to: 'q2', label: 'b' },
    { from: 'q1', to: 'q3', label: 'c' },
    { from: 'q2', to: 'q1', label: 'ε' },
    { from: 'q3', to: 'q1', label: 'ε' },
    { from: 'q1', to: 'q4', label: 'd' },
];

export const stateById = (id: string) => dfaStates.find(s => s.id === id)!;

export const edgePath = (a: DfaState, b: DfaState) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const r = 22;
    const sx = a.x + ux * r, sy = a.y + uy * r;
    const ex = b.x - ux * r, ey = b.y - uy * r;
    const mx = (sx + ex) / 2 - uy * 22;
    const my = (sy + ey) / 2 + ux * 22;
    return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
};

export const labelPos = (a: DfaState, b: DfaState) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: mx - (dy / len) * 18, y: my + (dx / len) * 18 };
};

export const lemmas = [
    {
        tag: 'Lemma 1',
        title: 'Every regular expression has an equivalent NFA.',
        body: "Thompson's construction transforms any pattern into a non-deterministic finite automaton in linear time. RegViz renders the NFA intermediate alongside the final DFA so the translation is visible, not magic.",
    },
    {
        tag: 'Lemma 2',
        title: 'Every NFA has an equivalent DFA via subset construction.',
        body: 'Powerset construction walks the NFA, grouping reachable state sets into DFA states. RegViz traces the construction step-by-step, highlighting each ε-closure computation.',
    },
    {
        tag: 'Lemma 3',
        title: "Minimization is Hopcroft's O(n log n).",
        body: 'Partition refinement collapses indistinguishable states. The minimized DFA is unique up to isomorphism — RegViz surfaces the partition classes so you can see equivalence at work.',
    },
];

export const lexTokens = [
    { t: 'LITERAL', ex: "'a', '0', '\\n'", d: 'A single character to match.' },
    { t: 'STAR', ex: "'*'", d: 'Kleene star — zero or more repetitions.' },
    { t: 'PLUS', ex: "'+'", d: 'One or more repetitions.' },
    { t: 'QUESTION', ex: "'?'", d: 'Zero or one occurrence.' },
    { t: 'PIPE', ex: "'|'", d: 'Alternation between two expressions.' },
    { t: 'LPAREN', ex: "'('", d: 'Open grouping.' },
    { t: 'RPAREN', ex: "')'", d: 'Close grouping.' },
    { t: 'DOT', ex: "'.'", d: 'Wildcard — matches any single character.' },
    { t: 'ESCAPE', ex: "'\\\\d', '\\\\w'", d: 'Named character class shorthand.' },
];

export const parseRules = [
    { rule: 'expr', body: "term ( '|' term )*", note: 'alternation is lowest precedence' },
    { rule: 'term', body: 'factor factor*', note: 'concatenation by adjacency' },
    { rule: 'factor', body: "atom ( '*' | '+' | '?' )?", note: 'postfix quantifiers bind tightest' },
    { rule: 'atom', body: "'(' expr ')' | literal", note: 'recursion handles nesting' },
];

export const features = [
    { k: 'I.', v: 'Thompson NFA construction with ε-closures visible' },
    { k: 'II.', v: 'Subset construction animated step-by-step' },
    { k: 'III.', v: 'Hopcroft minimization with partition overlay' },
    { k: 'IV.', v: 'Live input-string simulation — watch states pulse as characters feed' },
    { k: 'V.', v: 'GraphViz DOT export for papers and homework' },
    { k: 'VI.', v: 'Shareable URL — regex compiles and renders on paste' },
];

export const commits = [
    { sha: 'ec575c7', msg: 'Merge pull request #16 from hunglongtrangithub/master', date: '2026-02-11' },
    { sha: '7e44e79', msg: 'perf(core): allow non-alphanumeric literals; lex next tokens lazily', date: '2026-01-04' },
    { sha: '3c88e1b', msg: 'chore: update versions to v1.0.0', date: '2025-11-18' },
    { sha: '017e459', msg: 'feat: Add cargo dist for building', date: '2025-11-18' },
    { sha: 'adeb39f', msg: 'docs(min): add explanatory comments for DFA minimization code', date: '2025-11-18' },
];
