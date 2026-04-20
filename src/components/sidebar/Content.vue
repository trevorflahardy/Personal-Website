<script setup lang="ts">
import { useRoute } from "vue-router";

import Project, { ProjectProps } from "./Project.vue";
import { routerLinkName as chaiRouterLink, icon as chaiIcon } from "@/pages/chai/info";
import { routerLinkName as docuflowRouterLink } from "@/pages/docuflow/info";
import { routerLinkName as furyRouterLink } from "@/pages/fury/info";
import { routerLinkName as cntRouterLink } from "@/pages/cnt/info";
import { routerLinkName as baroRsRouterLink } from "@/pages/baro-rs/info";
import { routerLinkName as kewRouterLink } from "@/pages/kew/info";
import { routerLinkName as rootlineRouterLink } from "@/pages/rootline/info";
import { routerLinkName as sliceGuardRouterLink } from "@/pages/slice-guard/info";
import { routerLinkName as regVizRouterLink } from "@/pages/regviz/info";
import { routerLinkName as ppRouterLink } from "@/pages/pickle-pockets/info";

const isHamburgerOpen = defineModel();
const route = useRoute();

// Ordered by strength (visual impact, complexity, recency). Baro-RS / kew lead;
// Fury and Docuflow trail. Only Chai keeps a dedicated icon — the rest use a
// typography-forward bar accent in the project's theme color.
const projects: ProjectProps[] = [
    { displayName: 'Baro-RS',        routerLinkName: baroRsRouterLink,     accent: '#f59e0b' },
    { displayName: 'kew',            routerLinkName: kewRouterLink,        accent: '#f97316' },
    { displayName: 'Rootline',       routerLinkName: rootlineRouterLink,   accent: '#4ade80' },
    { displayName: 'Slice Guard',    routerLinkName: sliceGuardRouterLink, accent: '#38bdf8' },
    { displayName: 'RegViz',         routerLinkName: regVizRouterLink,     accent: '#a78bfa' },
    { displayName: 'Pickle Pockets', routerLinkName: ppRouterLink,         accent: '#dfff00' },
    { displayName: 'Study Hub',      routerLinkName: cntRouterLink,        accent: '#34d399' },
    { icon: chaiIcon, displayName: 'Chai', routerLinkName: chaiRouterLink },
    { displayName: 'Fury',           routerLinkName: furyRouterLink,       accent: '#4edbfc' },
    { displayName: 'Docuflow',       routerLinkName: docuflowRouterLink,   accent: '#ff4a33' },
];

function toggleHamburger() {
    isHamburgerOpen.value = !isHamburgerOpen.value;
}
</script>

<template>
    <div class="rounded-3xl glass-thick h-full w-full flex flex-col pt-14 xl:pt-7 overflow-hidden">
        <!-- Fixed top section: profile + heading -->
        <div class="flex-none px-5 xl:px-6">
            <router-link :to="{ name: 'profile' }">
                <button type="button"
                    class="flex flex-row p-3 w-full rounded-xl gap-3 items-center mb-4 hover:bg-white/8 transition duration-300 ease-in-out"
                    :class="{
                        'bg-white/8 border border-white/10': route.name == 'profile'
                    }" @click="toggleHamburger()">
                    <img src="/ProfilePic.png" alt="Trevor PFP"
                        class="w-[44px] h-[44px] xl:w-[52px] xl:h-[52px] rounded-full object-cover flex-none ring-1 ring-white/10" />

                    <div>
                        <p class="text-sm font-medium text-white/90 mb-0 text-left">
                            Trevor Flahardy
                        </p>
                        <p class="text-xs text-white/50 font-light text-left">
                            Full Stack Developer
                        </p>
                    </div>
                </button>
            </router-link>

            <h2 class="w-full text-xs text-white/40 font-medium uppercase tracking-wider mb-3">
                Projects
            </h2>
        </div>

        <!-- Scrollable project list -->
        <div class="flex-1 min-h-0 overflow-y-auto sidebar-scroll px-5 xl:px-6 pb-5 xl:pb-6">
            <div class="flex flex-col gap-1">
                <router-link v-for="project in projects" :key="project.routerLinkName"
                    :to="{ name: project.routerLinkName }">
                    <Project v-bind="project" @click="toggleHamburger()" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
}

.sidebar-scroll::-webkit-scrollbar {
    width: 6px;
}

.sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.12);
    border-radius: 3px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.22);
}
</style>
