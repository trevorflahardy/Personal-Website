export const initialMarkdown = `# Docuflow

> Write MDX. Run a command. Ship docs.

## Why it exists

Documentation tools force you to choose between **flexibility** and **simplicity**. Docuflow refuses the trade — it is *both*, by design.

\`\`\`bash
$ npx docuflow init
$ npx docuflow build
\`\`\`

<h2> Pillars </h2>

- Author in MDX — Markdown + JSX.
- Built on React + Vite (HMR in milliseconds).
- Single CLI, zero webpack configs.
- Static output — deploy anywhere.

## Status

Docuflow is in early development. Some features represent the planned final state — they are still being built.

[→ github.com/trevorflahardy/docuflow](https://github.com/trevorflahardy/docuflow)
`;

export interface Step {
    n: string;
    title: string;
    body: string;
    bodyHtml?: string;
}

export const steps: Step[] = [
    {
        n: '01',
        title: 'Author in MDX',
        body: "Write prose in Markdown, drop in JSX components when static text won't cut it. Import shared React components, embed interactive examples, keep docs alive alongside the code.",
    },
    {
        n: '02',
        title: 'Instant hot reload',
        body: "Vite's HMR means every keystroke reflects in the browser in milliseconds — no full refresh, no lost scroll position, no waiting.",
    },
    {
        n: '03',
        title: 'One command to ship',
        body: '',
        bodyHtml: '<code class="ds-inline-code">docuflow build</code> emits a folder of HTML, CSS, and JS. Drop it on GitHub Pages, Netlify, Vercel, S3, or a Raspberry Pi in your closet.',
    },
];

export interface TechItem {
    name: string;
    desc: string;
}

export const tech: TechItem[] = [
    { name: 'React 19', desc: 'Component model for dynamic doc islands — tabs, code playgrounds, interactive diagrams.' },
    { name: 'Vite 6', desc: 'Sub-100ms HMR, tree-shaking, and production builds. Zero webpack config — ever.' },
    { name: 'MDX 3', desc: 'Markdown that compiles to JSX. Import components, export data, keep prose readable.' },
    { name: 'Static output', desc: 'Pure HTML/CSS/JS. No server required. Serve from any CDN or static host.' },
];
