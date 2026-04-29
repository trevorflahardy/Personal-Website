<script setup lang="ts">
export interface PageLayoutSpacerProps {
    tag?: string;
    opacityDuration?: string;
    transformDuration?: string;
}

const props = defineProps<PageLayoutSpacerProps>();
</script>

<template>
    <!-- This layout spacer has two main key elements:
     1. Ensuring that page layouts are consistent
     2. Giving a nice "fade-in" animation to all slots within this page -->
    <div
        class="flex items-center flex-col flex-nowrap space-y-6 lg:space-y-8 px-5 sm:px-7 md:px-8 lg:px-10 xl:px-10 2xl:px-12 py-5 sm:py-6 md:py-7 lg:py-8 min-h-full w-full">
        <TransitionGroup name="slam" appear :tag="props.tag">
            <slot />
        </TransitionGroup>
    </div>
</template>

<style scoped>
:deep(.slam-enter-active) {
    transition: transform v-bind("props.transformDuration || '600ms'") ease-in-out;
}

:deep(.slam-enter-from) {
    transform: scale(1.05);
}

:deep(.slam-enter-to) {
    transform: scale(1);
}

/* Apply different delays based on the order of the elements */
:deep(.slam-enter-active:nth-child(1)) { transition-delay: 0.1s; }
:deep(.slam-enter-active:nth-child(2)) { transition-delay: 0.2s; }
:deep(.slam-enter-active:nth-child(3)) { transition-delay: 0.3s; }
:deep(.slam-enter-active:nth-child(4)) { transition-delay: 0.4s; }
:deep(.slam-enter-active:nth-child(5)) { transition-delay: 0.5s; }
:deep(.slam-enter-active:nth-child(6)) { transition-delay: 0.6s; }
:deep(.slam-enter-active:nth-child(7)) { transition-delay: 0.7s; }
:deep(.slam-enter-active:nth-child(8)) { transition-delay: 0.8s; }
:deep(.slam-enter-active:nth-child(9)) { transition-delay: 0.9s; }
:deep(.slam-enter-active:nth-child(10)) { transition-delay: 1s; }
</style>
