<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
  <div>
    <!--Holds the intro section-->
    <div class="snap-center flex-shrink">
      <div class="flex flex-row justify-around items-center sm:mb-2 mb-0">
        <!-- Holds the Hi and my name-->
        <div class="self-end">
          <p class="subtitle mb-0"> Hi, I'm </p>
          <p class="title">Trevor Flahardy</p>
        </div>

        <!-- Holds my PFP alongside it-->
        <div class="rounded-full overflow-hidden glass-thick p-1 shadow-xl shrink-0 md:block hidden">
          <img src="@/assets/ProfilePicNoBG.png" class="md:w-28 md:h-28 lg:w-32 lg:h-32 w-14 h-14" />
        </div>
      </div>

      <Transition name="slide-up-appear" appear>
        <p class="caption text-center">
          Welcome to my personal website! I am a passionate full stack developer
          with a love for creating beautiful and functional applications. I am
          currently a student studying Computer Science, Mathematics, and AI.
        </p>
      </Transition>

      <!-- Holds the links to my pages -->
      <div class="flex flex-row gap-5 justify-center flex-wrap">
        <Button link="https://github.com/trevorflahardy" content="Github" icon="pi-github" class="w-fit" />
        <Button link="https://www.linkedin.com/in/trevorflahardy/" content="Linkedin" icon="pi-linkedin"
          class="w-fit" />
      </div>
    </div>
  </div>
</template>

<style>
.slide-up-appear-enter-active {
  transition: transform 0.7s;
  transform: translateY(0);
}

.slide-up-appear-enter-from {
  transform: translateY(100%);
}

.slide-up-appear-enter-to {
  transform: translateY(0);
}
</style>
