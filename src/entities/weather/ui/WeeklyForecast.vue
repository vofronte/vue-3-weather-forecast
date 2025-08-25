<script setup lang="ts">
import type { DailyWeather } from '../model/types'
import { computed } from 'vue'
import DailyWeatherCard from './DailyWeatherCard.vue'

const props = defineProps<{
  daily: DailyWeather
}>()

const forecastDays = computed(() => props.daily.time.map((time, index) => ({
  time,
  weather_code: props.daily.weather_code[index]!,
  temperature_2m_max: props.daily.temperature_2m_max[index]!,
  temperature_2m_min: props.daily.temperature_2m_min[index]!,
})))
</script>

<template>
  <ul class="m-0 p-0 list-none gap-x-5 gap-y-4 grid grid-cols-2 lg:grid-cols-7 sm:grid-cols-4">
    <DailyWeatherCard
      v-for="day in forecastDays"
      :key="day.time"
      :date="day.time"
      :weather-code="day.weather_code"
      :temperature-max="day.temperature_2m_max"
      :temperature-min="day.temperature_2m_min"
    />
  </ul>
</template>
