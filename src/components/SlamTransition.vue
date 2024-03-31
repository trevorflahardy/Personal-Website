<script setup>
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "div",
  },
  opacityDuration: {
    type: String,
    default: "0.6s",
    required: false,
  },
  transformDuration: {
    type: String,
    default: "1.2s",
    required: false,
  },
});
</script>

<template>
  <TransitionGroup name="slam" appear :tag="props.tag" :class="props.class">
    <!-- Walk through the slots and give a key to each one -->
    <slot v-for="(slot, index) in $slots" :key="'slot-' + index">
      <slot :name="slot" />
    </slot>
  </TransitionGroup>
</template>

<style>
.slam-enter-active {
  transition:
    opacity v-bind("props.opacityDuration") ease-in-out,
    transform v-bind("props.transformDuration") ease-in-out;
}
.slam-enter-from {
  opacity: 0;
  transform: scale(1.05);
}
.slam-enter-to {
  opacity: 1;
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
