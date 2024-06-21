<script setup>
import { ref, shallowRef, markRaw, Transition } from "vue";
import HeroProfile from "@/pages/profile/HeroProfile.vue";
import Chai from "@/pages/chai/Chai.vue";
// import HeroTixte from "./HeroTixte.vue";
import HeroImageMerger from "@/pages/image_merger/HeroImageMerger.vue";
import HeroSidebarProject from "./HeroSidebarProject.vue";

// Marked raw so it doesn't get wrapped in a proxy (which causes unessecary performance overhead)
const projects = ref([
  {
    icon: "https://cdn.discordapp.com/avatars/728115804826239017/0747ea1e75a2b294c8a7834bb31cd7ee.png?size=1024",
    name: "Chai",
    component: markRaw(Chai),
    id: 1,
  },
  {
    icon: "https://via.placeholder.com/150",
    name: "Image Merger",
    component: markRaw(HeroImageMerger),
    id: 2,
  },
  // {
  //   icon: "https://via.placeholder.com/150",
  //   name: "Tixte",
  //   component: markRaw(HeroTixte),
  //   id: 3,
  // },
]);

// Hold the active component so that it can be changed
const activeComponent = shallowRef(markRaw(HeroProfile));

function changeComponent(component) {
  activeComponent.value = component;
}
</script>

<template>
  <div
    class="glass-regular-base rounded-[40px] w-4/5 h-[70%] stroke-[#CBCBCB] relative"
  >
    <div class="w-full flex flex-row items-center h-full rounded-l-[40px]">
      <!-- Holds "settings" on the page -->
      <div
        class="basis-1/4 h-full space-y-5 px-5 py-7 glass-semithick rounded-l-[40px] [transform: translateZ(20px)]"
      >
        <div class="h-fit">
          <p class="text-white text-md font-semibold text-lg">Projects</p>
          <p class="text-gray-300 text-sm">View Some Work</p>
        </div>

        <!-- Holds the PFP and name -->
        <!-- NOTE, eventually add transition here using <transition/> -->
        <button
          class="h-18 rounded-lg w-full hover:glass-thin transition duration-200 ease-in-out [transform: translateZ(30px)] flex flex-row items-center p-2 gap-3"
          :class="{
            'glass-thin shadow-md': activeComponent === HeroProfile,
          }"
          @click="changeComponent(HeroProfile)"
        >
          <!-- Holds the PFP -->
          <img
            src="../assets/ProfilePic.png"
            class="w-12 h-12 rounded-full object-cover"
          />

          <div class="text-left">
            <div class="text-white text-md">Trevor Flahardy</div>
            <div class="font-light text-white text-xs">
              Full Stack Developer
            </div>
          </div>
        </button>

        <!-- Holds the projects -->
        <div class="space-y-1">
          <HeroSidebarProject
            v-for="{ icon, name, component, id } in projects"
            :key="id"
            :title="name"
            class="w-full"
            :class="{ 'glass-thin shadow-md': activeComponent === component }"
            @click="changeComponent(component)"
          >
            <!-- the image for this project-->
            <template #image>
              <img :src="icon" />
            </template>
          </HeroSidebarProject>
        </div>
      </div>

      <div
        class="basis-3/5 md:basis-3/4 h-full overflow-y-scroll no-scrollbar scroll-smooth snap-y p-5"
      >
        <Transition name="fade">
          <component :is="activeComponent" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style>
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition:
    opacity 0.3s,
    /* transform 0.3s; */;
  transition-delay: 0.3s;
}

.fade-enter-from {
  opacity: 0;
  /*transform: scale(0.95); */
}
.fade-enter-to {
  /*transform: scale(1); */
  opacity: 1;
}
</style>
