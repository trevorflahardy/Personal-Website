<script setup lang="ts">
import { servers } from './chai-data';
</script>

<template>
    <nav class="server-rail" aria-label="Servers">
        <div v-for="s in servers" :key="s.id"
            class="server-pill"
            :class="{ 'is-active': s.active, 'is-ghost': s.ghost }">
            <span v-if="s.colored" class="server-glyph server-glyph--chai">C</span>
            <span v-else class="server-glyph">{{ s.letter }}</span>
            <span v-if="s.active" class="server-indicator" />
        </div>
    </nav>
</template>

<style scoped>
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
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg-dark);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: border-radius 180ms, background 180ms;
    cursor: pointer;
}

.server-pill:hover {
    border-radius: 16px;
    background: var(--accent);
}

.server-pill.is-active { border-radius: 16px; }
.server-pill.is-active .server-glyph--chai { background: var(--accent); }

.server-glyph {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: inherit;
}

.server-glyph--chai {
    background: var(--accent);
    border-radius: inherit;
    color: white;
    font-weight: 700;
}

.server-pill.is-ghost {
    background: transparent;
    border: 1.5px dashed var(--text-faint);
    color: var(--text-faint);
}

.server-indicator {
    position: absolute;
    left: -16px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: white;
    border-radius: 0 4px 4px 0;
}

@media (max-width: 720px) {
    .server-rail { display: none; }
}
</style>
