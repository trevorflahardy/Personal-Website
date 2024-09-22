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
        class="flex items-center flex-col flex-nowrap space-y-7 px-3 sm:p-5 md:p-7 xl:p-10 sm:px-2 py-12 sm:py-12 md:py-16 xl:py-5 min-h-full w-full">
        <TransitionGroup name="slam" appear :tag="props.tag"
            class=" animate-fade-up animate-once animate-duration-[1200ms] animate-delay-0 animate-ease-in-out">
            <!-- Insert any slots from the page into the slam transition. -->
            <slot v-for="(slot, index) in $slots" :key="`slot-${index}`">
                <slot :name="slot" />
            </slot>
        </TransitionGroup>
    </div>
</template>


<style>
.slam-enter-active {
    transition:
        transform v-bind("props.transformDuration || '600ms'") ease-in-out;
}

.slam-enter-from {
    transform: scale(1.05);
}

.slam-enter-to {
    transform: scale(1);
}

/* Apply different delays based on the order of the elements */
.slam-enter-active:nth-child(1) {
    transition-delay: 0.1s;
}

.slam-enter-active:nth-child(2) {
    transition-delay: 0.2s;
}

.slam-enter-active:nth-child(3) {
    transition-delay: 0.3s;
}

.slam-enter-active:nth-child(4) {
    transition-delay: 0.4s;
}

.slam-enter-active:nth-child(5) {
    transition-delay: 0.5s;
}

.slam-enter-active:nth-child(6) {
    transition-delay: 0.6s;
}

.slam-enter-active:nth-child(7) {
    transition-delay: 0.7s;
}

.slam-enter-active:nth-child(8) {
    transition-delay: 0.8s;
}

.slam-enter-active:nth-child(9) {
    transition-delay: 0.9s;
}

.slam-enter-active:nth-child(10) {
    transition-delay: 1s;
}
</style>
