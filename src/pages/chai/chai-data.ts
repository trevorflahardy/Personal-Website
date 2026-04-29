export interface ChaiServer {
    id: string;
    letter: string;
    active?: boolean;
    colored?: boolean;
    ghost?: boolean;
}

export interface ChaiChannel {
    name: string;
    kind: 'hash' | 'announce';
    active?: boolean;
}

export interface ChaiChannelGroup {
    cat: string;
    items: ChaiChannel[];
}

export interface ChaiEmbedField {
    name: string;
    value: string;
}

export interface ChaiEmbed {
    title: string;
    fields: ChaiEmbedField[];
}

export interface ChaiMessage {
    author: string;
    time: string;
    color: string;
    bot?: boolean;
    content?: string;
    embed?: ChaiEmbed;
}

export interface ChaiSidebarPill {
    icon: string;
    label: string;
    href: string;
}

export const servers: ChaiServer[] = [
    { id: 'home', letter: '🏠', active: false },
    { id: 'chai', letter: 'C', active: true, colored: true },
    { id: 's2', letter: 'D', active: false },
    { id: 's3', letter: 'R', active: false },
    { id: 's4', letter: '+', active: false, ghost: true },
];

export const channels: ChaiChannelGroup[] = [
    {
        cat: 'INFORMATION', items: [
            { name: 'welcome', kind: 'hash' },
            { name: 'announcements', kind: 'announce' },
            { name: 'rules', kind: 'hash' },
        ],
    },
    {
        cat: 'BOT FEATURES', items: [
            { name: 'reminders', kind: 'hash', active: true },
            { name: 'time-tracking', kind: 'hash' },
            { name: 'tag-database', kind: 'hash' },
            { name: 'moderation', kind: 'hash' },
        ],
    },
    {
        cat: 'DEVELOPMENT', items: [
            { name: 'changelog', kind: 'hash' },
            { name: 'support', kind: 'hash' },
        ],
    },
];

export const messages: ChaiMessage[] = [
    {
        author: 'trevor',
        time: 'Today at 3:42 PM',
        color: '#5fb3ff',
        content: 'Chai is a personal Discord companion I built for my own server. It started as a weekend project and grew into a full productivity layer — reminders, time tracking, a tag database, and a lightweight moderation toolkit.',
    },
    {
        author: 'chai',
        bot: true,
        time: 'Today at 3:43 PM',
        color: '#997DFF',
        embed: {
            title: 'Features, briefly.',
            fields: [
                { name: '⏰  reminders', value: '/remind me in 2h read the rust book' },
                { name: '📊  time tracking', value: '/track start · /track report · auto-graphs' },
                { name: '🏷️  tags', value: 'create, query, share short notes inside a channel' },
                { name: '🛡️  moderation', value: 'soft-locks, nuke filters, role-based bans' },
            ],
        },
    },
    {
        author: 'trevor',
        time: 'Today at 3:44 PM',
        color: '#5fb3ff',
        content: 'Written in Python with discord.py 2.x. Postgres for persistence. Runs on a small VPS — uptime has been 100% across the past 14 months.',
    },
    {
        author: 'chai',
        bot: true,
        time: 'Today at 3:45 PM',
        color: '#997DFF',
        content: '`∞` use `/help` for the full command list, or check pinned messages in <#bot-features>.',
    },
];

export const sidebarPills: ChaiSidebarPill[] = [
    { icon: 'pi-github', label: 'source', href: 'https://github.com/trevorflahardy/chai' },
    { icon: 'pi-book', label: 'readme', href: 'https://github.com/trevorflahardy/chai#readme' },
];
