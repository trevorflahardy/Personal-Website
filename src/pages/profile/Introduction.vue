<script setup lang="ts">
import Button from "@/components/ui/Button.vue";

const GITHUB_LINK = "https://github.com/trevorflahardy";
const LINKEDIN_LINK = "https://www.linkedin.com/in/trevorflahardy/";
</script>

<template>
  <div>
    <div class="flex gap-5 items-center justify-evenly lg:px-24">
      <!-- Intro content-->
      <div class="w-fit h-fit flex flex-col gap-2 items-start">
        <p class="text-white text-md font-medium w-full leading-none">
          Hi, I'm
        </p>
        <h1
          class="text-[3rem] lg:text-[4rem] font-bold text-white w-full leading-none"
        >
          Trevor Flahardy
        </h1>
        <p class="text-sm text-left sm:text-right text-gray-100 w-full">
          A passionate developer with a love for creating intuitive user
          experiences.
        </p>
      </div>

      <!-- Headshot -->
      <div class="w-fit h-full max-h-52">
        <img
          src="/headshot.png"
          alt="Headshot of Trevor Flahardy"
          class="rounded-full object-cover max-h-40 shadow-md shadow-yellow-100/10"
        />
      </div>
    </div>

    <!-- Below the main introduction is a separation line with buttons in the middle -->
    <div class="w-full h-fit flex items-center justify-center gap-5 mt-5">
      <div class="flex-grow border-t border-gray-300" />
      <!-- buttons to some social media links -->
      <div class="flex gap-3">
        <Button :link="GITHUB_LINK" icon="pi-github"></Button>
        <Button :link="LINKEDIN_LINK" icon="pi-linkedin"></Button>
      </div>
      <div class="flex-grow border-t border-gray-300" />
    </div>
  </div>
</template>
