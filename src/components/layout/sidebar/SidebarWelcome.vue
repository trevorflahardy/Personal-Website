<script setup lang="ts">
import Glass from "@/components/ui/Glass.vue";
</script>

<template>
  <!-- An introduction to the portfolio-->
  <div>
    <h1 class="text-xl font-bold text-white">Welcome,</h1>
    <p class="text-gray-200">View some of my work!</p>
  </div>

  <!--As we are mimicking Apple OS's design, we're going to have the equivalent of
  'manage apple account' button that brings us to the homepage. On mobile and tablet,
  this is a horizontal element-->
  <Glass
    class="flex flex-col lg:flex-row p-3 max-h-fit w-full items-center gap-3 mt-3"
    rounded-amount="lg"
  >
    <!-- Profile picture, takes up only as big as the text will allow-->
    <div>
      <img
        src="/headshot.png"
        alt="Profile Picture"
        class="max-w-12 max-h-12 rounded-full object-cover"
      />
    </div>
    <!-- Name and title -->
    <div class="w-full max-h-fit flex flex-col justify-center items-start">
      <p class="text-white font-bold text-sm w-full text-center lg:text-left">
        Trevor Flahardy
      </p>
      <p
        class="text-gray-200 font-medium text-xs w-full text-center lg:text-left"
      >
        Full Stack Web Developer
      </p>
    </div>
  </Glass>
</template>
