<script setup lang="ts">
import { messages } from './chai-data';
</script>

<template>
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
            <div class="day-divider"><span>April 19, 2025</span></div>

            <div v-for="(m, i) in messages" :key="i" class="message"
                :class="{ 'is-bot': m.bot, 'is-grouped': i > 0 && messages[i - 1].author === m.author }">
                <div class="msg-gutter">
                    <div v-if="!(i > 0 && messages[i - 1].author === m.author)" class="avatar"
                        :style="{ background: m.color }">
                        {{ m.author[0].toUpperCase() }}
                    </div>
                </div>
                <div class="msg-body">
                    <div v-if="!(i > 0 && messages[i - 1].author === m.author)" class="msg-meta">
                        <span class="msg-author" :style="{ color: m.color }">{{ m.author }}</span>
                        <span v-if="m.bot" class="msg-bot-badge">BOT</span>
                        <span class="msg-time">{{ m.time }}</span>
                    </div>
                    <div v-if="m.content" class="msg-content" v-html="m.content" />
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

            <div class="slash-preview">
                <span class="slash-tag">/</span>
                <span class="slash-cmd">help</span>
                <span class="slash-arg">show available commands</span>
            </div>
        </div>

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
</template>

<style scoped>
.chat-main {
    background: var(--bg-mid);
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.chat-header {
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--border);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}

.chat-hash {
    color: var(--text-mute);
    font-size: 22px;
    line-height: 1;
}

.chat-channel {
    font-weight: 600;
    color: #fff;
}

.chat-topic {
    color: var(--text-mute);
    font-size: 13px;
    margin-left: 8px;
}

.chat-tools {
    margin-left: auto;
    display: flex;
    gap: 16px;
    color: var(--text-mute);
    font-size: 18px;
}

.chat-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 16px 0;
}

.day-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 16px;
    color: var(--text-mute);
    font-size: 12px;
    font-weight: 600;
}

.day-divider::before,
.day-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--border);
}

.message {
    display: grid;
    grid-template-columns: 72px 1fr;
    padding: 2px 16px;
    margin-top: 16px;
}

.message.is-grouped { margin-top: 0; }

.message:hover { background: rgba(0, 0, 0, 0.06); }

.msg-gutter {
    display: flex;
    justify-content: center;
    padding-top: 2px;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    flex: none;
}

.msg-meta {
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.msg-author {
    font-weight: 600;
    font-size: 15px;
}

.msg-bot-badge {
    background: var(--accent);
    color: white;
    font-size: 10px;
    font-weight: 600;
    padding: 1px 5px;
    border-radius: 3px;
    letter-spacing: 0.02em;
}

.msg-time {
    font-size: 12px;
    color: var(--text-mute);
}

.msg-content {
    font-size: 15px;
    line-height: 1.45;
    color: var(--text);
    margin-top: 2px;
}

.msg-content :deep(code),
.msg-content code {
    background: var(--bg-darkest);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 0.9em;
}

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

.embed-fields {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 24px;
}

.embed-field-name {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 2px;
}

.embed-field-value {
    font-size: 13px;
    color: var(--text);
    line-height: 1.4;
    font-family: ui-monospace, Menlo, monospace;
}

.embed-footer {
    margin-top: 10px;
    display: flex;
    gap: 6px;
    font-size: 11px;
    color: var(--text-mute);
}

.slash-preview {
    margin: 16px;
    padding: 8px 12px;
    background: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: 6px;
    display: flex;
    gap: 10px;
    align-items: center;
    font-family: ui-monospace, Menlo, monospace;
    font-size: 13px;
    color: var(--text-mute);
}

.slash-tag {
    color: var(--accent);
    font-weight: 700;
}

.slash-cmd {
    color: #fff;
    font-weight: 600;
}

.chat-input { padding: 0 16px 16px; }

.input-box {
    background: var(--bg-active);
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-mute);
}

.input-plus {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--text-mute);
    color: var(--bg-active);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.input-placeholder {
    flex: 1;
    font-size: 15px;
}

.input-tools {
    display: flex;
    gap: 10px;
    font-size: 18px;
}
</style>
