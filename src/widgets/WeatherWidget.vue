<script setup lang="ts">
import type { DailyWeather, HourlyWeather } from '@/entities/weather/model/types'
import type { GeocodingResult } from '@/features/city-search/model/types'
import { getWeatherDescription } from '@/entities/weather/lib/weatherCodes'
import { useWeather } from '@/entities/weather/model/useWeather'
import CurrentWeatherSummary from '@/entities/weather/ui/CurrentWeatherSummary.vue'
import HourlyForecast from '@/entities/weather/ui/HourlyForecast.vue'
import WeeklyForecast from '@/entities/weather/ui/WeeklyForecast.vue'
import Skeleton from '@/shared/ui/skeletons/Skeleton.vue'
import PopularCityCard from '@/widgets/PopularCityCard.vue'

const props = defineProps<{
  city: GeocodingResult
  activeTab: 'today' | 'week'
  popularCities: GeocodingResult[]
  recentCities: GeocodingResult[]
}>()

const emit = defineEmits<{
  (e: 'selectCity', city: GeocodingResult): void
}>()

const { weather, error, fetchWeather } = useWeather()

await fetchWeather(props.city.latitude, props.city.longitude)
</script>

<template>
  <div v-if="weather" :key="city.id" class="flex flex-col gap-10 md:gap-14">
    <div class="text-center md:text-left">
      <h1 class="text-2xl leading-[1.3] tracking-tightest font-semibold md:text-4xl">
        Погода в городе {{ city.name }}
      </h1>
      <p class="text-xl text-white/60 leading-[1.2] tracking-tightest md:text-2xl">
        сегодня, {{ new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) }}
      </p>
    </div>

    <!-- Блок для вкладки "Главная" и "Неделя" с переходом -->
    <Transition name="slide-horizontal" mode="out-in">
      <div v-if="activeTab === 'today'" class="gap-8 grid grid-cols-1 lg:gap-14 lg:grid-cols-2">
        <CurrentWeatherSummary
          :temperature="weather.current.temperature_2m"
          :weather-description="getWeatherDescription(weather.current.weather_code, weather.current.wind_speed_10m)"
          :humidity="weather.current.relative_humidity_2m" :wind-speed="weather.current.wind_speed_10m"
          :weather-code="weather.current.weather_code"
        />
        <HourlyForecast :hourly="weather.hourly as Readonly<HourlyWeather>" />
      </div>

      <WeeklyForecast v-else :daily="weather.daily as Readonly<DailyWeather>" />
    </Transition>

    <!-- Блок "Недавно просмотренные" -->
    <Transition name="fade-slide">
      <section v-if="recentCities.length > 0" class="flex flex-col gap-4">
        <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold text-center md:text-[36px] md:text-left">
          Недавно просмотренные
        </h2>
        <div class="gap-4 grid grid-cols-1 md:gap-9 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
          <Suspense v-for="cityItem in recentCities" :key="cityItem.id">
            <template #default>
              <PopularCityCard :city="cityItem" @select-city="emit('selectCity', $event)" />
            </template>
            <template #fallback>
              <div class="p-6 text-center rounded-lg bg-card-gradient flex min-h-[226px] items-center justify-center">
                <Skeleton height="202px" width="100%" />
              </div>
            </template>
          </Suspense>
        </div>
      </section>
    </Transition>

    <!-- Блок "Популярные города" -->
    <Transition name="fade-slide">
      <section v-if="popularCities.length > 0" class="flex flex-col gap-4">
        <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold text-center md:text-[36px] md:text-left">
          Популярные города
        </h2>
        <div class="gap-4 grid grid-cols-1 md:gap-9 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
          <Suspense v-for="cityItem in popularCities" :key="cityItem.id">
            <template #default>
              <PopularCityCard :city="cityItem" @select-city="emit('selectCity', $event)" />
            </template>
            <template #fallback>
              <div class="p-6 text-center rounded-lg bg-card-gradient flex min-h-[226px] items-center justify-center">
                <Skeleton height="202px" width="100%" />
              </div>
            </template>
          </Suspense>
        </div>
      </section>
    </Transition>
  </div>
  <div v-else-if="error" class="text-red-400 text-center">
    Не удалось загрузить данные: {{ error.message }}
  </div>
</template>

<style>
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-in-out;
}

/* Анимация для смены табов */
.slide-horizontal-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-horizontal-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-horizontal-enter-active,
.slide-horizontal-leave-active {
  transition: all 0.25s ease-in-out;
}
</style>
