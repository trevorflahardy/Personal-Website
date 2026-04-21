<script setup lang="ts">
const servers = [
    { id: 'home', letter: '🏠', active: false },
    { id: 'chai', letter: 'C', active: true, colored: true },
    { id: 's2', letter: 'D', active: false },
    { id: 's3', letter: 'R', active: false },
    { id: 's4', letter: '+', active: false, ghost: true },
];

const channels = [
    { cat: 'INFORMATION', items: [
        { name: 'welcome', kind: 'hash' },
        { name: 'announcements', kind: 'announce' },
        { name: 'rules', kind: 'hash' },
    ]},
    { cat: 'BOT FEATURES', items: [
        { name: 'reminders', kind: 'hash', active: true },
        { name: 'time-tracking', kind: 'hash' },
        { name: 'tag-database', kind: 'hash' },
        { name: 'moderation', kind: 'hash' },
    ]},
    { cat: 'DEVELOPMENT', items: [
        { name: 'changelog', kind: 'hash' },
        { name: 'support', kind: 'hash' },
    ]},
];

const messages = [
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

const sidebarPills = [
    { icon: 'pi-github', label: 'source', href: 'https://github.com/trevorflahardy/chai' },
    { icon: 'pi-book', label: 'readme', href: 'https://github.com/trevorflahardy/chai#readme' },
];
</script>

<template>
    <div class="chai-world">
        <!-- Discord-esque chrome: server rail, channel rail, main, member rail -->
        <div class="discord-shell">

            <!-- SERVER RAIL -->
            <nav class="server-rail" aria-label="Servers">
                <div v-for="s in servers" :key="s.id"
                    class="server-pill"
                    :class="{ 'is-active': s.active, 'is-ghost': s.ghost }">
                    <span v-if="s.colored" class="server-glyph server-glyph--chai">C</span>
                    <span v-else class="server-glyph">{{ s.letter }}</span>
                    <span v-if="s.active" class="server-indicator" />
                </div>
            </nav>

            <!-- CHANNEL RAIL -->
            <aside class="channel-rail">
                <header class="channel-header">
                    <span class="channel-server-name">Chai · dev lounge</span>
                    <span class="channel-caret">⌄</span>
                </header>
                <div class="channel-scroll">
                    <div v-for="g in channels" :key="g.cat" class="channel-cat">
                        <div class="channel-cat-head">
                            <span class="caret">▾</span>
                            <span>{{ g.cat }}</span>
                        </div>
                        <button v-for="c in g.items" :key="c.name"
                            class="channel-row"
                            :class="{ 'is-active': c.active }">
                            <span class="channel-icon">{{ c.kind === 'announce' ? '📣' : '#' }}</span>
                            <span class="channel-name">{{ c.name }}</span>
                        </button>
                    </div>
                </div>
                <div class="channel-user">
                    <div class="avatar avatar--me">T</div>
                    <div class="user-meta">
                        <div class="user-name">trevor</div>
                        <div class="user-status">maintainer · online</div>
                    </div>
                </div>
            </aside>

            <!-- MAIN CHAT AREA -->
            <main class="chat-main">
                <header class="chat-header">
                    <span class="chat-hash">#</span>
                    <span class="chat-channel">reminders</span>
                    <span class="chat-topic">— what chai does, in its own words</span>
                    <div class="chat-tools">
                        <span class="chat-tool pi pi-bell" />
                        <span class="chat-tool pi pi-bookmark" />
                        <span class="chat-tool pi pi-users" />
                    </div>
                </header>

                <div class="chat-scroll">
                    <!-- Day divider -->
                    <div class="day-divider"><span>April 19, 2025</span></div>

                    <div v-for="(m, i) in messages" :key="i" class="message"
                        :class="{ 'is-bot': m.bot, 'is-grouped': i > 0 && messages[i-1].author === m.author }">
                        <div class="msg-gutter">
                            <div v-if="!(i > 0 && messages[i-1].author === m.author)" class="avatar"
                                :style="{ background: m.color }">
                                {{ m.author[0].toUpperCase() }}
                            </div>
                        </div>
                        <div class="msg-body">
                            <div v-if="!(i > 0 && messages[i-1].author === m.author)" class="msg-meta">
                                <span class="msg-author" :style="{ color: m.color }">{{ m.author }}</span>
                                <span v-if="m.bot" class="msg-bot-badge">BOT</span>
                                <span class="msg-time">{{ m.time }}</span>
                            </div>
                            <div v-if="m.content" class="msg-content" v-html="m.content" />
                            <!-- Embed -->
                            <div v-if="m.embed" class="msg-embed">
                                <div class="embed-title">{{ m.embed.title }}</div>
                                <div class="embed-fields">
                                    <div v-for="f in m.embed.fields" :key="f.name" class="embed-field">
                                        <div class="embed-field-name">{{ f.name }}</div>
                                        <div class="embed-field-value">{{ f.value }}</div>
                                    </div>
                                </div>
                                <div class="embed-footer">
                                    <span>chai · v2.4.1</span>
                                    <span class="dot">·</span>
                                    <span>python 3.11</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Slash command entry -->
                    <div class="slash-preview">
                        <span class="slash-tag">/</span>
                        <span class="slash-cmd">help</span>
                        <span class="slash-arg">show available commands</span>
                    </div>
                </div>

                <!-- Message input -->
                <div class="chat-input">
                    <div class="input-box">
                        <span class="input-plus pi pi-plus" />
                        <span class="input-placeholder">Message #reminders</span>
                        <span class="input-tools">
                            <span class="pi pi-microphone" />
                            <span class="pi pi-face-smile" />
                        </span>
                    </div>
                </div>
            </main>

            <!-- MEMBER RAIL -->
            <aside class="member-rail">
                <div class="member-section">
                    <div class="member-head">ONLINE — 2</div>
                    <div class="member-row">
                        <div class="avatar avatar--bot">C</div>
                        <div><div class="member-name">chai <span class="msg-bot-badge">BOT</span></div>
                        <div class="member-activity">🎵 listening to rustc</div></div>
                    </div>
                    <div class="member-row">
                        <div class="avatar avatar--me">T</div>
                        <div><div class="member-name">trevor</div>
                        <div class="member-activity">💻 Visual Studio Code</div></div>
                    </div>
                </div>

                <div class="member-section">
                    <div class="member-head">LINKS</div>
                    <a v-for="p in sidebarPills" :key="p.label" class="member-pill" :href="p.href" target="_blank" rel="noopener">
                        <i :class="`pi ${p.icon}`" />
                        <span>{{ p.label }}</span>
                    </a>
                </div>

                <div class="member-section">
                    <div class="member-head">STATS</div>
                    <div class="stat-row"><span>uptime</span><span class="stat-val">100% · 14mo</span></div>
                    <div class="stat-row"><span>stack</span><span class="stat-val">py · pg</span></div>
                    <div class="stat-row"><span>commands</span><span class="stat-val">42</span></div>
                </div>
            </aside>
        </div>
    </div>
</template>

<style scoped>
.chai-world {
    --bg-darkest: #1e1f22;
    --bg-dark:    #2b2d31;
    --bg-mid:     #313338;
    --bg-hover:   #35373c;
    --bg-active:  #404249;
    --text:       #dbdee1;
    --text-mute:  #949ba4;
    --text-faint: #80848e;
    --accent:     #997DFF;
    --accent-2:   #5fb3ff;
    --border:     #232428;
    --link:       #00a8fc;

    position: relative;
    min-height: 100%;
    width: 100%;
    background: var(--bg-darkest);
    color: var(--text);
    font-family: "gg sans", "Inter", "Segoe UI", sans-serif;
    isolation: isolate;
    overflow: hidden;
    color-scheme: dark;
}

/* Override all text-white utilities don't apply (this page uses its own). */
.discord-shell {
    display: grid;
    grid-template-columns: 72px 240px 1fr 260px;
    height: 100vh;
    min-height: 600px;
}

/* SERVER RAIL */
.server-rail {
    background: var(--bg-darkest);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    gap: 8px;
    overflow-y: auto;
}
.server-pill {
    position: relative;
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--bg-dark);
    color: var(--text);
    display: flex; align-items: center; justify-content: center;
    font-weight: 600;
    transition: border-radius 180ms, background 180ms;
    cursor: pointer;
}
.server-pill:hover { border-radius: 16px; background: var(--accent); }
.server-pill.is-active { border-radius: 16px; }
.server-pill.is-active .server-glyph--chai { background: var(--accent); }
.server-glyph {
    display: inline-flex; align-items: center; justify-content: center;
    width: 48px; height: 48px; border-radius: inherit;
}
.server-glyph--chai { background: var(--accent); border-radius: inherit; color: white; font-weight: 700; }
.server-pill.is-ghost { background: transparent; border: 1.5px dashed var(--text-faint); color: var(--text-faint); }
.server-indicator {
    position: absolute; left: -16px; top: 50%;
    transform: translateY(-50%);
    width: 4px; height: 24px;
    background: white; border-radius: 0 4px 4px 0;
}

/* CHANNEL RAIL */
.channel-rail {
    background: var(--bg-dark);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
}
.channel-header {
    padding: 0 16px;
    height: 48px;
    display: flex; align-items: center; justify-content: space-between;
    font-weight: 600;
    font-size: 15px;
    color: #fff;
    border-bottom: 1px solid var(--border);
    box-shadow: 0 1px 0 rgba(0,0,0,0.2);
}
.channel-scroll { flex: 1; overflow-y: auto; padding: 8px 0; }
.channel-cat { padding: 8px 8px 4px; }
.channel-cat-head {
    display: flex; align-items: center; gap: 4px;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-mute);
    letter-spacing: 0.02em;
    cursor: pointer;
}
.channel-cat-head .caret { font-size: 10px; }
.channel-row {
    display: flex; align-items: center; gap: 8px;
    width: 100%;
    padding: 6px 8px;
    margin: 2px 0;
    border-radius: 4px;
    background: transparent;
    border: 0;
    color: var(--text-mute);
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    transition: background 120ms, color 120ms;
}
.channel-row:hover { background: var(--bg-hover); color: var(--text); }
.channel-row.is-active { background: var(--bg-active); color: #fff; }
.channel-icon { font-size: 18px; color: var(--text-faint); line-height: 1; }
.channel-name { flex: 1; }

.channel-user {
    background: #232428;
    padding: 8px;
    display: flex; align-items: center; gap: 8px;
}
.user-meta { flex: 1; min-width: 0; }
.user-name { font-size: 13px; font-weight: 600; color: #fff; }
.user-status { font-size: 11px; color: var(--text-mute); }

/* AVATARS */
.avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    flex: none;
}
.avatar--me  { background: var(--accent-2); }
.avatar--bot { background: var(--accent); }

/* CHAT MAIN */
.chat-main {
    background: var(--bg-mid);
    display: flex;
    flex-direction: column;
    min-width: 0;
}
.chat-header {
    height: 48px;
    padding: 0 16px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid var(--border);
    box-shadow: 0 1px 0 rgba(0,0,0,0.2);
}
.chat-hash { color: var(--text-mute); font-size: 22px; line-height: 1; }
.chat-channel { font-weight: 600; color: #fff; }
.chat-topic { color: var(--text-mute); font-size: 13px; margin-left: 8px; }
.chat-tools {
    margin-left: auto;
    display: flex; gap: 16px;
    color: var(--text-mute);
    font-size: 18px;
}

.chat-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 16px 0;
}

.day-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 16px 16px;
    color: var(--text-mute);
    font-size: 12px;
    font-weight: 600;
}
.day-divider::before, .day-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
}

/* MESSAGES */
.message {
    display: grid;
    grid-template-columns: 72px 1fr;
    padding: 2px 16px;
    margin-top: 16px;
}
.message.is-grouped { margin-top: 0; }
.message:hover { background: rgba(0,0,0,0.06); }
.msg-gutter { display: flex; justify-content: center; padding-top: 2px; }
.msg-meta { display: flex; align-items: baseline; gap: 8px; }
.msg-author { font-weight: 600; font-size: 15px; }
.msg-bot-badge {
    background: var(--accent);
    color: white;
    font-size: 10px;
    font-weight: 600;
    padding: 1px 5px;
    border-radius: 3px;
    letter-spacing: 0.02em;
}
.msg-time { font-size: 12px; color: var(--text-mute); }
.msg-content {
    font-size: 15px;
    line-height: 1.45;
    color: var(--text);
    margin-top: 2px;
}
.msg-content :deep(code), .msg-content code {
    background: var(--bg-darkest);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 0.9em;
}

/* EMBED */
.msg-embed {
    margin-top: 6px;
    background: var(--bg-dark);
    border-left: 4px solid var(--accent);
    border-radius: 4px;
    padding: 12px 16px;
    max-width: 520px;
}
.embed-title {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 8px;
}
.embed-fields { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 24px; }
.embed-field-name { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
.embed-field-value { font-size: 13px; color: var(--text); line-height: 1.4; font-family: ui-monospace, Menlo, monospace; }
.embed-footer {
    margin-top: 10px;
    display: flex; gap: 6px;
    font-size: 11px;
    color: var(--text-mute);
}

.slash-preview {
    margin: 16px;
    padding: 8px 12px;
    background: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: 6px;
    display: flex; gap: 10px; align-items: center;
    font-family: ui-monospace, Menlo, monospace;
    font-size: 13px;
    color: var(--text-mute);
}
.slash-tag { color: var(--accent); font-weight: 700; }
.slash-cmd { color: #fff; font-weight: 600; }

.chat-input { padding: 0 16px 16px; }
.input-box {
    background: var(--bg-active);
    border-radius: 8px;
    padding: 12px 16px;
    display: flex; align-items: center; gap: 12px;
    color: var(--text-mute);
}
.input-plus {
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--text-mute);
    color: var(--bg-active);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
}
.input-placeholder { flex: 1; font-size: 15px; }
.input-tools { display: flex; gap: 10px; font-size: 18px; }

/* MEMBER RAIL */
.member-rail {
    background: var(--bg-dark);
    padding: 16px 8px;
    overflow-y: auto;
}
.member-section { margin-bottom: 24px; }
.member-head {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-mute);
    padding: 0 8px 6px;
    letter-spacing: 0.02em;
}
.member-row {
    display: flex; align-items: center; gap: 12px;
    padding: 6px 8px;
    border-radius: 4px;
}
.member-row:hover { background: var(--bg-hover); }
.member-name { font-size: 14px; font-weight: 500; color: #fff; display: flex; align-items: center; gap: 6px; }
.member-activity { font-size: 12px; color: var(--text-mute); }

.member-pill {
    display: flex; align-items: center; gap: 10px;
    padding: 8px;
    border-radius: 4px;
    color: var(--text-mute);
    font-size: 14px;
    text-decoration: none;
    transition: background 120ms, color 120ms;
}
.member-pill:hover { background: var(--bg-hover); color: #fff; }
.member-pill i { font-size: 16px; }

.stat-row {
    display: flex; justify-content: space-between;
    padding: 4px 8px;
    font-size: 12px;
    color: var(--text-mute);
    font-family: ui-monospace, Menlo, monospace;
}
.stat-val { color: #fff; }

@media (max-width: 1100px) {
    .member-rail { display: none; }
    .discord-shell { grid-template-columns: 72px 220px 1fr; }
}
@media (max-width: 720px) {
    .server-rail { display: none; }
    .discord-shell { grid-template-columns: 200px 1fr; }
}
</style>
