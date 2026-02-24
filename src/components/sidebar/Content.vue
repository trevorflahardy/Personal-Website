<script setup lang="ts">
import { useRoute } from "vue-router";

import Project, { ProjectProps } from "./Project.vue";
import { routerLinkName as chaiRouterLink, icon as chaiIcon } from "@/pages/chai/info";
import { routerLinkName as docuflowRouterLink, icon as docuflowIcon } from "@/pages/docuflow/info";
import { routerLinkName as furyRouterLink, icon as furyIcon } from "@/pages/fury/info";

const isHamburgerOpen = defineModel();
const route = useRoute();

const projects: ProjectProps[] = [
    {
        icon: chaiIcon,
        displayName: "Chai",
        routerLinkName: chaiRouterLink,
    },
    {
        icon: docuflowIcon,
        displayName: 'Docuflow',
        routerLinkName: docuflowRouterLink,
    },
    {
        icon: furyIcon,
        displayName: 'Fury',
        routerLinkName: furyRouterLink,
    }
];

function toggleHamburger() {
    isHamburgerOpen.value = !isHamburgerOpen.value;
}
</script>

<template>
    <div class="rounded-3xl glass-thick bg-white/4 h-full p-5 xl:p-6 pt-14 xl:pt-7 w-full">
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

        <div class="flex flex-col gap-1.5">
            <button type="button" v-for="{ icon, displayName, routerLinkName } in projects" :key="routerLinkName">
                <router-link :to="{ name: routerLinkName }">
                    <Project :icon="icon" :display-name="displayName" :router-link-name="routerLinkName"
                        @click="toggleHamburger()" />
                </router-link>
            </button>
        </div>
    </div>
</template>
