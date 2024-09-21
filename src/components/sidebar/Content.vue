<script setup lang="ts">
import { useRoute } from "vue-router";

import Project, { ProjectProps } from "./Project.vue";
import { routerLinkName as chaiRouterLink, profilePic as chaiProfilePic } from "@/pages/chai/info";
import { routerLinkName as docuflowRouterLink } from "@/pages/docuflow/info";

const isHamburgerOpen = defineModel();
const route = useRoute();

// Marked raw so it doesn't get wrapped in a proxy (which causes unessecary performance overhead)
const projects: ProjectProps[] = [
    {
        icon: chaiProfilePic,
        displayName: "Chai",
        routerLinkName: chaiRouterLink,
    },
    {
        icon: './docuflow-logo.svg',
        displayName: 'Docuflow',
        routerLinkName: docuflowRouterLink,
    }
];

function toggleHamburger() {
    isHamburgerOpen.value = !isHamburgerOpen.value;
}
</script>

<template>
    <!-- Holds the platform-less sidebar content. This will display the same on mobile and desktop. The only difference
 is that the mobile content is hidden behind the hamburger. -->
    <div class="rounded-[40px] glass-thick h-full pt-12 p-5 xl:pt-5 w-full md:min-w-72 xl:min-w-80">
        <div class="mb-5 mt-4">
            <h4 class="title-4 font-medium mb-0">
                Welcome,
            </h4>
            <p class="subtitle">
                Come view some of my work:
            </p>
        </div>

        <!-- The profile tab. This is separate from the other projects, ie a special component, so it'll be managed manually -->
        <router-link :to="{ name: 'profile' }">
            <button
                class="flex flex-row p-2 w-full rounded-xl gap-3 items-center mb-5 hover:glass-thin hover:bg-gray-300/10 transition duration-300 ease-in-out"
                :class="{
                    'glass-thin shadow-md bg-gray-300/10': route.name == 'profile'
                }" @click="toggleHamburger()">
                <!-- Holds the PFP -->
                <img src="@/assets/ProfilePic.png"
                    class="w-10 h-10 xl:w-14 xl:h-14 rounded-full object-cover flex-none" />

                <!-- Holds my name and title -->
                <div>
                    <p class="body font-semibold mb-0 text-left">
                        Trevor Flahardy
                    </p>
                    <p class="text-xs text-gray-200 font-light text-left">
                        Full Stack Developer
                    </p>
                </div>
            </button>
        </router-link>

        <!-- Small title for the projects-->
        <h2 class="w-full text-sm text-white font-light mb-1">
            My Favorite Projects
        </h2>

        <!-- All other project components handled under their own component, they are the same essentially -->
        <div class="flex flex-col gap-2">
            <button v-for="{ icon, displayName, routerLinkName } in projects" :key="routerLinkName">
                <router-link :to="{ name: routerLinkName }">
                    <Project :icon="icon" :display-name="displayName" :router-link-name="routerLinkName"
                        @click="toggleHamburger()" />
                </router-link>
            </button>
        </div>
    </div>

</template>