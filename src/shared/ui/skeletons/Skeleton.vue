<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import type { SkeletonProps } from './types'
import { computed, inject, useSlots } from 'vue'
import { ThemeInjectionKey } from './keys'

const props = withDefaults(defineProps<SkeletonProps>(), {
  count: 1,
  loading: undefined,
})

const theme = inject(ThemeInjectionKey, {})
const slots: any = useSlots()

const isLoading = computed<boolean>(() => {
  if (props.loading !== undefined)
    return props.loading
  return !slots.default
})

function getStyles(): CSSProperties {
  const style = {} as CSSProperties
  const width = props.width ?? theme.width ?? null
  const height = props.height ?? theme.height ?? null
  const borderRadius = props.borderRadius ?? theme.borderRadius ?? null
  const baseColor = props.baseColor ?? theme.baseColor ?? null
  const highlightColor = props.highlightColor ?? theme.highlightColor ?? null
  const circle = props.circle

  if (width)
    style.width = typeof width === 'number' ? `${width}px` : width
  if (height)
    style.height = typeof height === 'number' ? `${height}px` : height
  if (borderRadius)
    style.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
  if (circle)
    style.borderRadius = '50%'

  if (baseColor)
    style['--base-color'] = baseColor
  if (highlightColor)
    style['--highlight-color'] = highlightColor

  return style
}
</script>

<template>
  <span v-if="isLoading" class="skeleton-container">
    <template v-for="_ in count" :key="_">
      <span :style="getStyles()" class="skeleton-loading" v-html="'&zwnj;'" />
    </template>
  </span>
  <slot v-else />
</template>

<style>
@keyframes loading-skeleton {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-loading {
  --base-color: rgba(255, 255, 255, 0.1);
  --highlight-color: rgba(255, 255, 255, 0.2);
  --animation-duration: 1.5s;

  background-color: var(--base-color);
  width: 100%;
  border-radius: 0.25rem;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
}

.skeleton-loading::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(90deg, var(--base-color), var(--highlight-color), var(--base-color));
  transform: translateX(-100%);
  animation-name: loading-skeleton;
  animation-duration: var(--animation-duration);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
</style>
