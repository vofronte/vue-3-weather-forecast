<script setup lang="ts">
import { onMounted } from 'vue'
import { getWeatherDescription } from '@/entities/weather/lib/weatherCodes'
import { useWeather } from '@/entities/weather/model/useWeather'
import CurrentWeatherSummary from '@/entities/weather/ui/CurrentWeatherSummary.vue'
import WeatherCard from '@/entities/weather/ui/WeatherCard.vue'
import CitySelector from '@/features/city-selector/ui/CitySelector.vue'
import WeatherTabs from '@/features/weather-tabs/ui/WeatherTabs.vue'

const { weather, isLoading, error, fetchWeather } = useWeather()

onMounted(() => {
  fetchWeather(55.79, 49.12)
})
</script>

<template>
  <div class="text-white font-sans p-4 bg-main-gradient min-h-screen w-full md:p-8">
    <div class="mx-auto flex flex-col gap-10 max-w-7xl md:gap-14">
      <header
        class="flex flex-col gap-4 items-center justify-center md:flex-row md:justify-between"
      >
        <WeatherTabs />
        <CitySelector />
      </header>

      <main v-if="isLoading" class="text-xl text-center">
        Загрузка данных о погоде...
      </main>
      <main v-else-if="error" class="text-xl text-red-400 text-center">
        Ошибка: {{ error.message }}
      </main>
      <main v-else-if="weather" class="flex flex-col gap-12">
        <!-- Блок с основной погодой -->
        <CurrentWeatherSummary
          :temperature="weather.current.temperature_2m"
          :weather-description="getWeatherDescription(weather.current.weather_code)"
          :humidity="weather.current.relative_humidity_2m"
          :wind-speed="weather.current.wind_speed_10m"
          :weather-code="0"
        />

        <!-- Блок "Погода в популярных городах" -->
        <section class="flex flex-col gap-4">
          <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold text-center md:text-[36px] md:text-left">
            Погода в популярных городах
          </h2>
          <div class="gap-4 grid grid-cols-1 md:gap-9 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
            <WeatherCard
              city="Москва"
              :weather-code="0"
              description="Облачно"
              :temperature="24"
              :humidity="80"
            />
            <WeatherCard
              city="Новосибирск"
              :weather-code="0"
              description="Солнечно"
              :temperature="34"
              :humidity="80"
            />
            <WeatherCard
              city="Краснодар"
              :weather-code="0"
              description="Ветрено"
              :temperature="34"
              :humidity="80"
            />
            <WeatherCard
              city="Красноярск"
              :weather-code="0"
              description="Ветрено"
              :temperature="34"
              :humidity="80"
            />
            <WeatherCard
              city="Тула"
              :weather-code="0"
              description="Облачно"
              :temperature="34"
              :humidity="80"
            />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
