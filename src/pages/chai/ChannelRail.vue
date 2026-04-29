<script setup lang="ts">
import { channels } from './chai-data';
</script>

<template>
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
</template>

<style scoped>
.channel-rail {
    background: var(--bg-dark);
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border);
}

.channel-header {
    padding: 0 16px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 15px;
    color: #fff;
    border-bottom: 1px solid var(--border);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}

.channel-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
}

.channel-cat { padding: 8px 8px 4px; }

.channel-cat-head {
    display: flex;
    align-items: center;
    gap: 4px;
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
    display: flex;
    align-items: center;
    gap: 8px;
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

.channel-row:hover {
    background: var(--bg-hover);
    color: var(--text);
}

.channel-row.is-active {
    background: var(--bg-active);
    color: #fff;
}

.channel-icon {
    font-size: 18px;
    color: var(--text-faint);
    line-height: 1;
}

.channel-name { flex: 1; }

.channel-user {
    background: #232428;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-meta {
    flex: 1;
    min-width: 0;
}

.user-name {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
}

.user-status {
    font-size: 11px;
    color: var(--text-mute);
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

.avatar--me { background: var(--accent-2); }
</style>
