<script setup lang="ts">
import type { GeocodingResult } from '@/features/city-search/model/types'
import { getWeatherDescription } from '@/entities/weather/lib/weatherCodes'
import { useWeather } from '@/entities/weather/model/useWeather'
import CurrentWeatherSummary from '@/entities/weather/ui/CurrentWeatherSummary.vue'
import WeatherCard from '@/entities/weather/ui/WeatherCard.vue'

const props = defineProps<{
  city: GeocodingResult
}>()

const { weather, error, fetchWeather } = useWeather()

await fetchWeather(props.city.latitude, props.city.longitude)

if (error.value)
  throw error.value
</script>

<template>
  <div v-if="weather" class="flex flex-col gap-12">
    <CurrentWeatherSummary
      :city-name="city.name"
      :temperature="weather.current.temperature_2m"
      :weather-description="getWeatherDescription(weather.current.weather_code, weather.current.wind_speed_10m)"
      :humidity="weather.current.relative_humidity_2m"
      :wind-speed="weather.current.wind_speed_10m"
      :weather-code="weather.current.weather_code"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold text-center md:text-[36px] md:text-left">
        Погода в популярных городах
      </h2>
      <div class="gap-4 grid grid-cols-1 md:gap-9 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
        <WeatherCard
          city="Москва" :weather-code="3" description="Облачно" :temperature="24" :humidity="80" :wind-speed="4"
        />
        <WeatherCard
          city="Новосибирск" :weather-code="0" description="Солнечно" :temperature="34" :humidity="80" :wind-speed="2"
        />
        <WeatherCard
          city="Краснодар" :weather-code="1" description="Ветрено" :temperature="34" :humidity="80" :wind-speed="8"
        />
        <WeatherCard
          city="Красноярск" :weather-code="61" description="Дождь" :temperature="18" :humidity="90" :wind-speed="9"
        />
        <WeatherCard
          city="Тула" :weather-code="3" description="Облачно" :temperature="22" :humidity="80" :wind-speed="3"
        />
      </div>
    </section>
  </div>
</template>
