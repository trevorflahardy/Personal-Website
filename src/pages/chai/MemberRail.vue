<script setup lang="ts">
import { sidebarPills } from './chai-data';
</script>

<template>
    <aside class="member-rail">
        <div class="member-section">
            <div class="member-head">ONLINE — 2</div>
            <div class="member-row">
                <div class="avatar avatar--bot">C</div>
                <div>
                    <div class="member-name">chai <span class="msg-bot-badge">BOT</span></div>
                    <div class="member-activity">🎵 listening to rustc</div>
                </div>
            </div>
            <div class="member-row">
                <div class="avatar avatar--me">T</div>
                <div>
                    <div class="member-name">trevor</div>
                    <div class="member-activity">💻 Visual Studio Code</div>
                </div>
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
</template>

<style scoped>
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
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 8px;
    border-radius: 4px;
}

.member-row:hover { background: var(--bg-hover); }

.member-name {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
}

.member-activity {
    font-size: 12px;
    color: var(--text-mute);
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

.member-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: 4px;
    color: var(--text-mute);
    font-size: 14px;
    text-decoration: none;
    transition: background 120ms, color 120ms;
}

.member-pill:hover {
    background: var(--bg-hover);
    color: #fff;
}

.member-pill i { font-size: 16px; }

.stat-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    font-size: 12px;
    color: var(--text-mute);
    font-family: ui-monospace, Menlo, monospace;
}

.stat-val { color: #fff; }

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
.avatar--bot { background: var(--accent); }

@media (max-width: 1100px) {
    .member-rail { display: none; }
}
</style>
