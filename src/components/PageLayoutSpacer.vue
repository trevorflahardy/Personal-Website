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
/* Transform-only entrance (rise + settle). Deliberately no opacity/filter —
   animating either on an ancestor of backdrop-filter glass breaks the glass
   blur in Chromium for the duration of the transition. */
:deep(.slam-enter-active) {
    transition: transform v-bind("props.transformDuration || '550ms'") cubic-bezier(0.16, 1, 0.3, 1);
}

:deep(.slam-enter-from) {
    transform: translateY(16px) scale(0.985);
}

:deep(.slam-enter-to) {
    transform: translateY(0) scale(1);
}

/* Apply different delays based on the order of the elements */
:deep(.slam-enter-active:nth-child(1)) { transition-delay: 0.05s; }
:deep(.slam-enter-active:nth-child(2)) { transition-delay: 0.13s; }
:deep(.slam-enter-active:nth-child(3)) { transition-delay: 0.21s; }
:deep(.slam-enter-active:nth-child(4)) { transition-delay: 0.29s; }
:deep(.slam-enter-active:nth-child(5)) { transition-delay: 0.37s; }
:deep(.slam-enter-active:nth-child(6)) { transition-delay: 0.45s; }
:deep(.slam-enter-active:nth-child(7)) { transition-delay: 0.53s; }
:deep(.slam-enter-active:nth-child(8)) { transition-delay: 0.61s; }
:deep(.slam-enter-active:nth-child(9)) { transition-delay: 0.69s; }
:deep(.slam-enter-active:nth-child(10)) { transition-delay: 0.77s; }

@media (prefers-reduced-motion: reduce) {
    :deep(.slam-enter-active) {
        transition: none;
    }
}
</style>
