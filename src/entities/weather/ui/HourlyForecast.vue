<script setup lang="ts">
import type { HourlyWeather } from '../model/types'
import { computed } from 'vue'
import HourlyWeatherItem from './HourlyWeatherItem.vue'

const props = defineProps<{
  hourly: HourlyWeather
}>()

const forecastHours = computed(() => {
  const allHours = props.hourly.time.map((time, index) => ({
    time,
    hour: new Date(time).getHours(),
    weather_code: props.hourly.weather_code[index]!,
    temperature_2m: props.hourly.temperature_2m[index]!,
    wind_speed_10m: props.hourly.wind_speed_10m[index]!,
    relative_humidity_2m: props.hourly.relative_humidity_2m[index]!,
  }))

  // Фильтруем, чтобы получить данные с шагом в 3 часа, и берем первые 8 записей
  return allHours
    .filter(hourData => hourData.hour % 3 === 0)
    .slice(0, 8)
})
</script>

<template>
  <ul class="m-0 p-0 list-none" v-bind="$attrs">
    <HourlyWeatherItem
      v-for="hour in forecastHours" :key="hour.time" :time="hour.time"
      :weather-code="hour.weather_code" :temperature="hour.temperature_2m" :wind-speed="hour.wind_speed_10m"
      :humidity="hour.relative_humidity_2m"
    />
  </ul>
</template>
