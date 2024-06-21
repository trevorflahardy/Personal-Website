<template>
  <div class="flex flex-row items-center justify-center snap-center gap-5">
    <div
    class="flex flex-col items-center justify-center space-y-2 "
  >
    <div>
      <div>
        <span class="text-3xl font-bold text-white"> Hi, I'm </span>
      </div>

      <div class="text-6xl font-bold text-white">Trevor Flahardy</div>
    </div>

    <Transition name="slide-up-appear" appear>
      <div class="text-center text-fancy text-pretty">
        <span class="text-white font-light">
          Welcome to my personal website! This is some sort of description about
          who I am, what I like, and what I want to do! Honestly.. uh.. not sure
          what to set here yet so we're gonna leave this for now.
        </span>
      </div>
    </Transition>
  </div>

    <!-- Holds the profile picture preview -->
    <div class="w-fit max-w-64 rounded-full overflow-hidden glass-thick p-1 shadow-xl">
      <img src="../assets/ProfilePicNoBG.png" class="scale-110"/>
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
