<script setup lang="ts">
import SlamTransition from "./SlamTransition.vue";
</script>

<template>
    <!-- The purpose of this layout spacer is to ensure that each individual item
    on the page is always centered horizontally in its box. Sometimes, there are elements
    that do not take up the entire available space so this ensures consistency.-->
    <SlamTransition
        class="flex items-center flex-col flex-nowrap space-y-7 px-3 sm:p-5 md:p-7 xl:p-10 sm:px-2 py-12 sm:py-12 md:py-16 xl:py-5 min-h-full">
        <!-- Insert any slots from the page into the slam transition. -->
        <slot />
    </SlamTransition>
</template>