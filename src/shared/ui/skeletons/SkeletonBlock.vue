<script setup lang="ts">
defineProps<{
  height?: string
  width?: string
  shape?: 'rect' | 'circle'
}>()
</script>

<template>
  <div
    class="bg-white/10 animate-pulse"
    :class="{ 'rounded-full': shape === 'circle', 'rounded-md': shape !== 'circle' }" :style="{ height, width }"
  />
</template>
