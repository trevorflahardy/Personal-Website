export interface CntFeature {
    icon: string;
    title: string;
    sub: string;
    body: string;
    img: string;
    imgAlt: string;
    chapters: string[];
}

export interface CntStackItem {
    k: string;
    v: string;
}

const base = import.meta.env.BASE_URL;

export const features: CntFeature[] = [
    {
        icon: '📄',
        title: 'Typed Class Notes',
        sub: 'Typst → PDF, in-browser viewer',
        body: 'All 8 chapters of CNT 4419 authored in Typst, compiled to a crisp PDF, and viewable directly in the browser — zoom, search, and page navigation included.',
        img: `${base}cnt_4419_study_hub/homepage.png`,
        imgAlt: 'Study Hub homepage with PDF viewer',
        chapters: [
            'Foundations — policy, mechanism, traces',
            'CIA triad, safety & liveness properties',
            'Enforcers — static/dynamic, sound/complete/precise',
            'Mechanism categories — preventative, detective, containment',
            'Secure Design Principles — PoLP, TOCTOU, defense in depth',
            'Attack Vectors — confused deputy, phishing, DoS/DDoS',
            'Access Control — RBAC, MAC, Bell-LaPadula, Biba',
            'Memory & Buffers — overflow, ROP, ASLR, stack guards, CFI',
        ],
    },
    {
        icon: '🧠',
        title: 'Practice Quiz Engine',
        sub: '500+ questions, AI explanations, XP system',
        body: 'Multiple-choice, true/false, and short-answer questions across all 8 chapters. Wrong answers trigger an on-device LLM explanation grounded in the actual notes. Earn XP, level up.',
        img: `${base}cnt_4419_study_hub/ai_quiz_gen_question.png`,
        imgAlt: 'Quiz engine with AI explanations',
        chapters: [],
    },
    {
        icon: '💬',
        title: 'AI Chat Assistant',
        sub: 'On-device RAG — nothing leaves your browser',
        body: 'Transformers.js embeds query semantics; a WebGPU-accelerated on-device LLM generates answers grounded in the retrieved note passages. No API keys. No data collection. Fully offline after first load.',
        img: `${base}cnt_4419_study_hub/ai_flashcard_answer.png`,
        imgAlt: 'AI Chat with grounded answers',
        chapters: [],
    },
    {
        icon: '📇',
        title: 'Flashcards',
        sub: 'Key concepts, spaced repetition',
        body: 'Flip-card decks derived from definitions and key claims in the notes. Review the terms that matter — CIA triad, PoLP, TOCTOU, ASLR, Bell-LaPadula — in a quick-fire format.',
        img: `${base}cnt_4419_study_hub/ai_flashcard_question.png`,
        imgAlt: 'Flashcard review interface',
        chapters: [],
    },
];

export const stack: CntStackItem[] = [
    { k: 'FRAMEWORK', v: 'Nuxt 3 + Nuxt UI' },
    { k: 'NOTES', v: 'Typst → PDF' },
    { k: 'EMBEDDINGS', v: 'Transformers.js (in-browser)' },
    { k: 'CHAT', v: 'WebGPU on-device LLM' },
    { k: 'HOSTING', v: 'GitHub Pages (fully static)' },
    { k: 'PRIVACY', v: 'No server, no data collection' },
];
