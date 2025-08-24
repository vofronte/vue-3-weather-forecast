<script lang="ts" setup>
import type { SkeletonThemeProps } from './types'
import { provide } from 'vue'
import { ThemeInjectionKey } from './keys'

const props = defineProps<SkeletonThemeProps>()
provide(ThemeInjectionKey, props)
</script>

<template>
  <slot />
</template>
