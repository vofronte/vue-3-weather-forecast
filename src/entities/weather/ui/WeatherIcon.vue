<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { getWeatherInfo } from '@/entities/weather/lib/weatherCodes'

const props = defineProps<{
  code: number
  windSpeed: number
}>()

const iconName = computed(() => getWeatherInfo(props.code, props.windSpeed)?.iconName)

const iconComponent = computed(() => {
  if (!iconName.value)
    return null

  return defineAsyncComponent(() => import(`@/shared/ui/icons/${iconName.value}.vue`))
})
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" />
</template>
