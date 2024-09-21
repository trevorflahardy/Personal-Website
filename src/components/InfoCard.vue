<script setup lang="ts">
export interface InfoCardProps {
	imagePosition?: 'left' | 'right' | 'top' | 'bottom';
}

const props = defineProps<InfoCardProps>();

function shouldFlexRow() {
	return props.imagePosition === 'left' || props.imagePosition === 'right';
}

function shouldFlexCol() {
	return props.imagePosition === 'top' || props.imagePosition === 'bottom';
}

function imageOrder(): number {
	return props.imagePosition === 'left' || props.imagePosition === 'top' ? 1 : 2;
}

function contentOrder(): number {
	return props.imagePosition === 'left' || props.imagePosition === 'top' ? 2 : 1;
}
</script>

<template>
	<div
		class="flex glass-regular bg-gray-800/40 dark:bg-gray-200/5 transition-all duration-500 ease-in-out rounded-xl drop-shadow-md overflow-clip"
		:class="{
			'flex-row': shouldFlexRow(),
			'flex-col': shouldFlexCol(),
		}"
	>
		<!-- Holds the image of this card. Takes up as much width as possible on the card
         and has its height auto adjust (unless the user wants to choose otherwise)-->
		<slot name="image" :class="`flex-auto w-full h-auto order-${imageOrder()}`" />

		<!--Holds the actual content of this card, in the slot-->
		<div class="flex-auto w-full p-3" :class="`order-${contentOrder()}`">
			<!-- The default slot that contains the content -->
			<slot />
		</div>
	</div>
</template>
