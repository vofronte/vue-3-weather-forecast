<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { computed, ref } from 'vue'

const cardEl = ref<HTMLElement | null>(null)

const { elementX, elementY, isOutside } = useMouseInElement(cardEl)

const cardStyle = computed(() => ({
  '--x': `${elementX.value}px`,
  '--y': `${elementY.value}px`,
  '--opacity': isOutside.value ? '0' : '1',
}))
</script>

<template>
  <div
    ref="cardEl"
    :style="cardStyle"
    class="card-base card-glare-effect"
  >
    <slot />
  </div>
</template>

<style>
.card-glare-effect > :slotted(*) {
    position: relative;
    z-index: 1;
}
</style>
