<script setup>
import { ref, shallowRef, markRaw, Transition } from "vue";
import HeroProfile from "./HeroProfile.vue";
import HeroChai from "./HeroChai.vue";
import HeroTixte from "./HeroTixte.vue";
import HeroImageMerger from "./HeroImageMerger.vue";

const projects = ref([
  {
    icon: "https://via.placeholder.com/150",
    name: "Chai",
    component: markRaw(HeroChai), // Marked raw so it doesn't get wrapped in a proxy (which causes unessecary performance overhead)
  },
  {
    icon: "https://via.placeholder.com/150",
    name: "Tixte",
    component: markRaw(HeroTixte),
  },
  {
    icon: "https://via.placeholder.com/150",
    name: "Image Merger",
    component: markRaw(HeroImageMerger),
  },
]);

// Hold the active component so that it can be changed
const activeComponent = shallowRef(HeroProfile);

function changeComponent(component) {
  activeComponent.value = component;
}
</script>

<template>
  <div class="glass-regular rounded-[49px] w-4/5 h-3/4 shadow-xl">
    <div class="w-full flex flex-row items-center h-full rounded-l-[49px]">
      <!-- Holds "settings" on the page -->
      <div
        class="basis-1/4 h-full space-y-5 px-5 py-7 glass-thin rounded-l-[49px] [transform: translateZ(20px)]"
      >
        <div class="h-fit">
          <p class="text-white text-md font-semibold text-lg">Projects</p>
          <p class="text-gray-300 text-sm">View Some Work</p>
        </div>

        <!-- Holds the PFP and name -->
        <!-- NOTE, eventually add transition here using <transition/> -->
        <button
          class="h-18 rounded-xl grid grid-cols-1 w-full glass-regular hover:glass-thick transition duration-200 ease-out shadow-xl [transform: translateZ(30px)]"
          @click="changeComponent(HeroProfile)"
        >
          <div class="flex flex-row items-center rounded-xl">
            <!-- Holds the PFP -->
            <div class="h-full flex justify-center items-center px-3 py-2">
              <img
                src="../assets/ProfilePic.png"
                class="w-12 h-12 rounded-full object-cover"
              />

              <div class="px-3 text-left">
                <p class="text-white text-md">Trevor Flahardy</p>
                <p class="font-light text-white text-xs">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </div>
        </button>

        <!-- Holds each project -->
        <div
          class="rounded-xl grid grid-cols-1 w-full divide-y divide-gray-400 shadow-xl overflow-hidden [transform: translateZ(30px)]"
        >
          <button
            v-for="{ icon, name, component } in projects"
            :key="name"
            class="flex flex-row items-center transition duration-200 glass-regular hover:glass-thick"
            @click="changeComponent(component)"
          >
            <!-- Holds the image for the project -->
            <div class="flex flex-row items-center pl-3 pr-2 py-2">
              <img :src="icon" class="w-6 h-6 rounded-md" />
            </div>

            <!-- Holds the project name -->
            <p class="text-white text-xs">{{ name }}</p>
          </button>
        </div>
      </div>

      <div
        class="basis-3/5 md:basis-3/4 h-full overflow-y-scroll no-scrollbar scroll-smooth snap-y"
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
