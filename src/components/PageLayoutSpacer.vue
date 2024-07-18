<script setup lang="ts">
import SlamTransition from "./SlamTransition.vue";
</script>

<template>
    <!-- The purpose of this layout spacer is to ensure that each individual item
    on the page is always centered horizontally in its box. Sometimes, there are elements
    that do not take up the entire available space so this ensures consistency.-->
    <SlamTransition class="flex items-center flex-col flex-nowrap space-y-5">
        <!-- Insert any slots from the page into the slam transition. -->
        <slot />
    </SlamTransition>
</template>