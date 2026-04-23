<script setup lang="ts">
import DocuflowBackground from './DocuflowBackground.vue';
import EditorSection from './EditorSection.vue';
import StepsSection from './StepsSection.vue';
import ShotsSection from './ShotsSection.vue';
import TechSection from './TechSection.vue';
</script>

<template>
    <div class="docuflow-world">
        <DocuflowBackground />

        <EditorSection />

        <div class="docuflow-sections">
            <StepsSection />
            <ShotsSection />
            <TechSection />
        </div>
    </div>
</template>

<style scoped>
.docuflow-world {
    --paper: #f3efe7;
    --paper-2: #ece6d8;
    --ink: #1a1d24;
    --ink-2: #303540;
    --mute: #6a6f7a;
    --rule: rgba(26, 29, 36, 0.12);
    --accent: #2f6bff;
    --accent-soft: #e6eeff;
    --accent-ink: #0b2b7a;
    --syntax-heading: #8b2a1f;
    --syntax-punct: #a87e2a;
    --syntax-str: #2a6b3b;

    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--paper);
    color: var(--ink);
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    overflow-y: auto;
}

.docuflow-sections {
    position: relative;
    z-index: 1;
}
</style>
