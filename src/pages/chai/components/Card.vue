<script setup lang="ts">
export interface CardProps {
    title?: String,
    body?: String,
    backgroundColor?: String,
    textColor?: String
}

defineProps<CardProps>()
</script>

<template>
    <div class="p-5 rounded-xl max-w-md flex-auto min-w-20"
        :class="[backgroundColor != null ? backgroundColor : '', textColor != null ? textColor : 'text-white']">
        <h1 class="card-title" v-if="title">
            {{ title }}
        </h1>

        <p class="card-body" v-if="body">
            {{ body }}
        </p>

        <!-- Include any extra slots -->
        <slot />
    </div>
</template>