<script setup lang="ts">
import type { GeocodingResult } from '@/features/city-search/model/types'
import { getWeatherDescription } from '@/entities/weather/lib/weatherCodes'
import { useWeather } from '@/entities/weather/model/useWeather'
import WeatherCard from '@/entities/weather/ui/WeatherCard.vue'

const props = defineProps<{
  city: GeocodingResult
}>()

const emit = defineEmits<{
  (e: 'selectCity', city: GeocodingResult): void
}>()

const { weather, error, fetchWeather } = useWeather()
await fetchWeather(props.city.latitude, props.city.longitude)

function handleClick() {
  emit('selectCity', props.city)
}

if (error.value)
  throw error.value
</script>

<template>
  <button
    v-if="weather" type="button" class="text-left h-full w-full cursor-pointer"
    :aria-label="`Посмотреть погоду в городе ${city.name}`" @click="handleClick"
  >
    <WeatherCard
      :city="city.name"
      :weather-code="weather.current.weather_code"
      :description="getWeatherDescription(weather.current.weather_code, weather.current.wind_speed_10m)"
      :temperature="weather.current.temperature_2m"
      :humidity="weather.current.relative_humidity_2m"
      :wind-speed="weather.current.wind_speed_10m"
      class="h-full"
    />
  </button>
</template>
