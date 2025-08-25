<script setup lang="ts">
import type { DailyWeather, HourlyWeather } from '@/entities/weather/model/types'
import type { GeocodingResult } from '@/features/city-search/model/types'
import { getWeatherDescription } from '@/entities/weather/lib/weatherCodes'
import { useWeather } from '@/entities/weather/model/useWeather'
import CurrentWeatherSummary from '@/entities/weather/ui/CurrentWeatherSummary.vue'
import HourlyForecast from '@/entities/weather/ui/HourlyForecast.vue'
import WeeklyForecast from '@/entities/weather/ui/WeeklyForecast.vue'
import { POPULAR_CITIES } from '@/shared/config/cities'
import Skeleton from '@/shared/ui/skeletons/Skeleton.vue'
import PopularCityCard from '@/widgets/PopularCityCard.vue'

const props = defineProps<{
  city: GeocodingResult
  activeTab: 'today' | 'week'
}>()

const emit = defineEmits<{
  (e: 'selectCity', city: GeocodingResult): void
}>()

const { weather, error, fetchWeather } = useWeather()

await fetchWeather(props.city.latitude, props.city.longitude)

if (error.value)
  throw error.value
</script>

<template>
  <div v-if="weather" class="flex flex-col gap-8 md:gap-12">
    <div class="text-center md:text-left">
      <h1 class="text-2xl leading-[1.3] tracking-tightest font-semibold md:text-4xl">
        Погода в городе {{ city.name }}
      </h1>
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
        <Suspense v-for="popularCity in POPULAR_CITIES" :key="popularCity.id">
          <template #default>
            <PopularCityCard :city="popularCity" @select-city="emit('selectCity', $event)" />
          </template>
          <template #fallback>
            <div class="p-6 text-center rounded-lg bg-card-gradient flex min-h-[226px] items-center justify-center">
              <Skeleton height="202px" width="100%" />
            </div>
          </template>
        </Suspense>
      </div>
    </section>
  </div>
</template>
