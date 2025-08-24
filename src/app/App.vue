<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeather } from '@/entities/weather/model/useWeather'
import WeatherCard from '@/entities/weather/ui/WeatherCard.vue'

const { weather, isLoading, error, fetchWeather } = useWeather()

onMounted(() => {
  fetchWeather(55.79, 49.12)
})
</script>

<template>
  <div class="text-white font-sans p-4 bg-main-gradient min-h-screen w-full">
    <div class="mx-auto max-w-7xl">
      <div v-if="isLoading">
        Loading...
      </div>
      <div v-else-if="error">
        Error: {{ error.message }}
      </div>
      <div v-else-if="weather" class="flex flex-col gap-8">
        <div>
          Основной блок
        </div>

        <section class="flex flex-col gap-4">
          <h2 class="text-3xl font-semibold">
            Погода в популярных городах
          </h2>
          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <WeatherCard
              city="Москва"
              description="Облачно"
              :temperature="24"
              :humidity="80"
            />
            <WeatherCard
              city="Новосибирск"
              description="Солнечно"
              :temperature="34"
              :humidity="80"
            />
            <WeatherCard
              city="Краснодар"
              description="Ветрено"
              :temperature="34"
              :humidity="80"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
