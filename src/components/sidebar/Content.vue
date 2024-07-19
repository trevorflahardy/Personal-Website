<script setup lang="ts">
import { useRoute } from "vue-router";

import Project, { ProjectProps } from "./Project.vue";

const route = useRoute();

// Marked raw so it doesn't get wrapped in a proxy (which causes unessecary performance overhead)
const projects: [ProjectProps] = [
    {
        icon: "https://cdn.discordapp.com/avatars/728115804826239017/0747ea1e75a2b294c8a7834bb31cd7ee.png?size=1024",
        displayName: "Chai",
        routerLinkName: 'project-chai',
    },
];
</script>

<template>
    <!-- Holds the platform-less sidebar content. This will display the same on mobile and desktop. The only difference
 is that the mobile content is hidden behind the hamburger. -->
    <div class="rounded-[40px] glass-thick h-full pt-12 p-5 xl:pt-5 w-full min-w-80">
        <div class="mb-5">
            <h4 class="title-4 font-medium mb-0">
                Projects
            </h4>
            <p class="subtitle">
                View some work
            </p>
        </div>

        <!-- The profile tab. This is separate from the other projects, ie a special component, so it'll be managed manually -->
        <router-link :to="{ name: 'profile' }">
            <button
                class="flex flex-row p-2 w-full rounded-xl gap-3 items-center mb-5 hover:glass-thin transition duration-300 ease-in-out"
                :class="{
                    'glass-thin shadow-md bg-gray-300/10': route.name == 'profile'
                }">
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

        <!-- All other project components handled under their own component, they are the same essentially -->
        <div class="space-y-1">
            <router-link v-for="{ icon, displayName, routerLinkName } in projects" :key="routerLinkName"
                :to="{ name: routerLinkName }">
                <Project :icon="icon" :display-name="displayName" :router-link-name="routerLinkName" />
            </router-link>
        </div>
    </div>

</template>