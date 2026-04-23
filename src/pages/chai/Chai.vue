<script setup lang="ts">
import ServerRail from './ServerRail.vue';
import ChannelRail from './ChannelRail.vue';
import ChatMain from './ChatMain.vue';
import MemberRail from './MemberRail.vue';
</script>

<template>
    <div class="chai-world">
        <div class="discord-shell">
            <ServerRail />
            <ChannelRail />
            <ChatMain />
            <MemberRail />
        </div>
    </div>
</template>

<style scoped>
.chai-world {
    --bg-darkest: #1e1f22;
    --bg-dark: #2b2d31;
    --bg-mid: #313338;
    --bg-hover: #35373c;
    --bg-active: #404249;
    --text: #dbdee1;
    --text-mute: #949ba4;
    --text-faint: #80848e;
    --accent: #997DFF;
    --accent-2: #5fb3ff;
    --border: #232428;
    --link: #00a8fc;

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

.discord-shell {
    display: grid;
    grid-template-columns: 72px 240px 1fr 260px;
    height: 100vh;
    min-height: 600px;
}

@media (max-width: 1100px) {
    .discord-shell { grid-template-columns: 72px 220px 1fr; }
}

@media (max-width: 720px) {
    .discord-shell { grid-template-columns: 200px 1fr; }
}
</style>
