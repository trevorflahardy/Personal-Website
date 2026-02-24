<script setup lang="ts">
import { computed } from "vue";

export interface InfoCardProps {
    imagePosition?: "left" | "right" | "top" | "bottom";
    background?: string;
}

const props = defineProps<InfoCardProps>();

const isRow = computed(() => props.imagePosition === "left" || props.imagePosition === "right");
const isCol = computed(() => !props.imagePosition || props.imagePosition === "top" || props.imagePosition === "bottom");
const imageFirst = computed(() => !props.imagePosition || props.imagePosition === "left" || props.imagePosition === "top");

const backgroundClass = computed(() => {
    return props.background || "bg-white/4";
});
</script>

<template>
    <div v-motion-slide-visible-once-bottom :delay="0" :duration="50"
        class="flex transition-all duration-500 ease-in-out rounded-2xl border border-white/8 shadow-lg overflow-clip backdrop-blur-xl hover:border-white/15 hover:bg-white/6 hover:shadow-xl"
        :class="[
            backgroundClass,
            isRow ? 'flex-row' : 'flex-col',
        ]">
        <div :class="imageFirst ? 'order-1' : 'order-2'">
            <slot name="image" />
        </div>

        <div class="flex-auto w-full p-5 md:p-6 lg:p-7 flex flex-col items-start justify-between"
            :class="imageFirst ? 'order-2' : 'order-1'">
            <slot />

            <div v-if="$slots.buttons" class="mt-4 flex flex-row items-center justify-start flex-wrap gap-2">
                <slot name="buttons" />
            </div>
        </div>
    </div>
</template>
