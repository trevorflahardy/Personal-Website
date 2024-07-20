<script setup lang="ts">
export interface InfoCardProps {
    image?: string,
    imagePosition?: "left" | "right" | "top" | "bottom",
}

const props = defineProps<InfoCardProps>();

function shouldFlexRow() {
    return props.imagePosition === "left" || props.imagePosition === "right";
}

function shouldFlexCol() {
    return props.imagePosition === "top" || props.imagePosition === "bottom";
}

function imageOrder(): number {
    return props.imagePosition === "left" || props.imagePosition === "top" ? 1 : 2;
}

function contentOrder(): number {
    return props.imagePosition === "left" || props.imagePosition === "top" ? 2 : 1;
}

</script>

<template>
    <div class="flex glass-regular bg-gray-200/5 rounded-xl" :class="{
        'flex-row': shouldFlexRow(),
        'flex-col': shouldFlexCol()
    }">
        <!-- Holds the image of this card. Takes up as much width as possible on the card
         and has its height auto adjust (unless the user wants to choose otherwise)-->
        <div v-if="image" class="flex-auto w-full" :class="`order-${imageOrder()}`">
            <img :src="image" class="rounded-xl w-full" />
        </div>

        <!--Holds the actual content of this card, in the slot-->
        <div class="flex-auto w-full sm:p-5 p-3" :class="`order-${contentOrder()}`">
            <slot />
        </div>

    </div>
</template>