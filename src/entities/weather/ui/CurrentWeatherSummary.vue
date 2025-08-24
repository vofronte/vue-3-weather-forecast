<script setup lang="ts">
import WeatherIcon from './WeatherIcon.vue'

defineProps<{
  cityName: string
  temperature: number
  weatherCode: number
  weatherDescription: string
  humidity: number
  windSpeed: number
}>()
</script>

<template>
  <div class="text-center md:text-left">
    <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold md:text-4xl">
      Погода в городе {{ cityName }}
    </h2>
    <p class="text-xl text-white/60 leading-[1.2] tracking-tightest md:text-2xl">
      сегодня, {{ new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) }}
    </p>
  </div>
  <section class="text-center flex flex-col gap-6 items-center md:text-left md:flex-row md:gap-14">
    <div class="flex gap-4 items-center">
      <WeatherIcon :code="weatherCode" class="h-20 w-20 md:h-auto md:w-auto" />
      <h1 class="text-7xl leading-[1.3] tracking-tightest font-semibold md:text-8xl">
        {{ Math.round(temperature) }}°
      </h1>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-2xl text-white tracking-tightest mt-2 md:text-xl">
        <p>{{ weatherDescription }}</p>
        <p>Влажность: {{ Math.round(humidity) }}%</p>
        <p>Ветер: {{ Math.round(windSpeed) }} м/с</p>
      </div>
    </div>
  </section>
</template>
