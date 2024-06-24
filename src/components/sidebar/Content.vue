<script setup lang="ts">
import { ref, markRaw } from "vue";

import HeroProfile from "@/pages/profile/HeroProfile.vue";
import Chai from "@/pages/chai/Chai.vue";
import HeroImageMerger from "@/pages/image_merger/HeroImageMerger.vue";
import Project from "./Project.vue";


const activeComponent = defineModel({
    required: true
});

// Marked raw so it doesn't get wrapped in a proxy (which causes unessecary performance overhead)
const projects = [
    // {
    //     icon: "https://cdn.discordapp.com/avatars/728115804826239017/0747ea1e75a2b294c8a7834bb31cd7ee.png?size=1024",
    //     name: "Chai",
    //     component: markRaw(Chai),
    //     id: 1,
    // },
    // {
    //     icon: "https://via.placeholder.com/150",
    //     name: "Image Merger",
    //     component: markRaw(HeroImageMerger),
    //     id: 2,
    // },
];

function changeComponent(component: any) {
    activeComponent.value = component;
}
</script>

<template>
    <!-- Holds the platform-less sidebar content. This will display the same on mobile and desktop. The only difference
 is that the mobile content is hidden behind the hamburger. -->
    <div class="rounded-[40px] xl:rounded-r-none glass-superthick xl:glass-thick h-full pt-12 p-5 xl:pt-5 w-full">
        <div class="mb-5">
            <p class="title-4 font-medium mb-0">
                Projects
            </p>
            <p class="caption">
                View some work
            </p>
        </div>

        <!-- The profile tab. This is separate from the other projects, ie a special component, so it'll be managed manually -->
        <button class="flex flex-row justify-around hover:bg-glass-thin p-2 pr-20 rounded-xl gap-3 items-center mb-5" :class="{
            'glass-thin shadow-md': activeComponent === HeroProfile,
        }" @click="changeComponent(HeroProfile)">
            <!-- Holds the PFP -->
            <img src="@/assets/ProfilePic.png" class="w-10 h-10 xl:w-14 xl:h-14 rounded-full object-cover flex-none" />

            <!-- Holds my name and title -->
            <div>
                <p class="body font-medium mb-0 text-left">
                    Trevor Flahardy
                </p>
                <p class="font-light text-gray-100 text-left">
                    Full Stack Developer
                </p>
            </div>
        </button>

        <!-- All other project components handeled under their own component, they are the same essentially -->
        <div class="space-y-1">
          <Project v-for="{ icon, name, component, id } in projects" :key="id" :title="name" class="w-full"
            :class="{ 'glass-thin shadow-md': activeComponent === component }" @click="changeComponent(component)">
            <template #image>
              <img :src="icon" />
            </template>
          </Project>
        </div>
    </div>

</template>