<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<style scoped>
/* visionOS-blue gradient pop on the closing word. */
.pop {
    background: linear-gradient(120deg, #64d2ff, #0a84ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
</style>

<template>
    <div class="w-full py-10 md:py-16 flex flex-col items-center text-center">
        <p v-reveal class="text-xs uppercase tracking-[0.22em] text-white/45 font-medium mb-4">
            Say hello
        </p>
        <h2 v-reveal="{ delay: 80 }"
            class="max-w-3xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white text-pretty mb-8">
            Let's build something that <span class="pop">matters.</span>
        </h2>
        <div v-reveal="{ delay: 180 }" class="flex flex-wrap items-center justify-center gap-3">
            <span v-magnetic class="inline-flex">
                <Button link="mailto:trevorflahardy@gmail.com" icon="pi-envelope" content="Email me"
                    :open-in-new-tab="false"
                    background="bg-white/6 hover:bg-white/12 border border-white/10" />
            </span>
            <span v-magnetic class="inline-flex">
                <Button link="https://github.com/trevorflahardy" icon="pi-github" content="GitHub"
                    background="bg-white/6 hover:bg-white/12 border border-white/10" />
            </span>
            <span v-magnetic class="inline-flex">
                <Button link="https://www.linkedin.com/in/trevorflahardy/" icon="pi-linkedin" content="LinkedIn"
                    background="bg-white/6 hover:bg-white/12 border border-white/10" />
            </span>
        </div>
    </div>
</template>
