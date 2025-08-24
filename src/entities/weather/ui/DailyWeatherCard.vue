<script setup lang="ts">
import WeatherIcon from './WeatherIcon.vue'

defineProps<{
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
}>()

function dayOfWeek(dateString: string) {
  const date = new Date(dateString)
  const day = date.toLocaleDateString('ru-RU', { weekday: 'long' })
  return day.charAt(0).toUpperCase() + day.slice(1)
}
</script>

<template>
  <div class="py-1 flex flex-col h-[120px] items-center justify-between">
    <p class="text-lg tracking-tightest font-normal">
      {{ dayOfWeek(date) }}
    </p>
    <WeatherIcon :code="weatherCode" :wind-speed="0" class="size-[60px]" />
    <p class="text-lg tracking-tightest">
      {{ Math.round(temperatureMax) }}° / {{ Math.round(temperatureMin) }}°
    </p>
  </div>
</template>
