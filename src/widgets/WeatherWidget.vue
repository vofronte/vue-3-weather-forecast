<script setup lang="ts">
import type { DailyWeather, HourlyWeather } from '@/entities/weather/model/types'
import type { GeocodingResult } from '@/features/city-search/model/types'
import { getWeatherDescription } from '@/entities/weather/lib/weatherCodes'
import { useWeather } from '@/entities/weather/model/useWeather'
import CurrentWeatherSummary from '@/entities/weather/ui/CurrentWeatherSummary.vue'
import HourlyForecast from '@/entities/weather/ui/HourlyForecast.vue'
import WeatherCard from '@/entities/weather/ui/WeatherCard.vue'
import WeeklyForecast from '@/entities/weather/ui/WeeklyForecast.vue'

const props = defineProps<{
  city: GeocodingResult
  activeTab: 'today' | 'week'
}>()

const { weather, error, fetchWeather } = useWeather()

await fetchWeather(props.city.latitude, props.city.longitude)

if (error.value)
  throw error.value
</script>

<template>
  <div v-if="weather" class="flex flex-col gap-8 md:gap-12">
    <div class="text-center md:text-left">
      <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold md:text-4xl">
        Погода в городе {{ city.name }}
      </h2>
      <p class="text-xl text-white/60 leading-[1.2] tracking-tightest md:text-2xl">
        сегодня, {{ new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) }}
      </p>
    </div>

    <!-- Блок для вкладки "Главная" -->
    <div v-if="activeTab === 'today'" class="gap-8 grid grid-cols-1 lg:gap-14 lg:grid-cols-2">
      <CurrentWeatherSummary
        :temperature="weather.current.temperature_2m"
        :weather-description="getWeatherDescription(weather.current.weather_code, weather.current.wind_speed_10m)"
        :humidity="weather.current.relative_humidity_2m" :wind-speed="weather.current.wind_speed_10m"
        :weather-code="weather.current.weather_code"
      />
      <HourlyForecast :hourly="weather.hourly as Readonly<HourlyWeather>" />
    </div>

    <!-- Блок для вкладки "Неделя" -->
    <WeeklyForecast v-if="activeTab === 'week'" :daily="weather.daily as Readonly<DailyWeather>" />

    <section class="flex flex-col gap-4">
      <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold text-center md:text-[36px] md:text-left">
        Погода в популярных городах
      </h2>
      <div class="gap-4 grid grid-cols-1 md:gap-9 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
        <WeatherCard
          city="Москва" :weather-code="3" description="Облачно" :temperature="24" :humidity="80"
          :wind-speed="4"
        />
        <WeatherCard
          city="Новосибирск" :weather-code="0" description="Солнечно" :temperature="34" :humidity="80"
          :wind-speed="2"
        />
        <WeatherCard
          city="Краснодар" :weather-code="1" description="Ветрено" :temperature="34" :humidity="80"
          :wind-speed="8"
        />
        <WeatherCard
          city="Красноярск" :weather-code="61" description="Дождь" :temperature="18" :humidity="90"
          :wind-speed="9"
        />
        <WeatherCard
          city="Тула" :weather-code="3" description="Облачно" :temperature="22" :humidity="80"
          :wind-speed="3"
        />
      </div>
    </section>
  </div>
</template>
