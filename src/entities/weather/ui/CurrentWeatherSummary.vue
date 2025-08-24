<script setup lang="ts">
import Skeleton from '@/shared/ui/skeletons/Skeleton.vue'
import WeatherIcon from './WeatherIcon.vue'

defineProps<{
  cityName?: string
  temperature?: number
  weatherCode?: number
  weatherDescription?: string
  humidity?: number
  windSpeed?: number
}>()
</script>

<template>
  <div class="text-center md:text-left">
    <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold md:text-4xl">
      <Skeleton :loading="!cityName" width="350px">
        Погода в городе {{ cityName }}
      </Skeleton>
    </h2>
    <p class="text-xl text-white/60 leading-[1.2] tracking-tightest md:text-2xl">
      <Skeleton :loading="!cityName" width="250px">
        сегодня, {{ new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) }}
      </Skeleton>
    </p>
  </div>
  <section class="text-center flex flex-col gap-6 items-center md:text-left md:flex-row md:gap-14">
    <div class="flex gap-4 items-center">
      <Skeleton :loading="weatherCode === undefined" circle height="80px" width="80px">
        <WeatherIcon :code="weatherCode!" :wind-speed="windSpeed!" class="h-20 w-20 md:h-auto md:w-auto" />
      </Skeleton>
      <h1 class="text-7xl leading-[1.3] tracking-tightest font-semibold md:text-8xl">
        <Skeleton :loading="temperature === undefined" width="120px">
          {{ Math.round(temperature!) }}°
        </Skeleton>
      </h1>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-2xl text-white tracking-tightest mt-2 md:text-xl">
        <p>
          <Skeleton :loading="!weatherDescription" width="200px">
            {{ weatherDescription }}
          </Skeleton>
        </p>
        <p>
          <Skeleton :loading="humidity === undefined" width="180px">
            Влажность: {{ Math.round(humidity!) }}%
          </Skeleton>
        </p>
        <p>
          <Skeleton :loading="windSpeed === undefined" width="160px">
            Ветер: {{ Math.round(windSpeed!) }} м/с
          </Skeleton>
        </p>
      </div>
    </div>
  </section>
</template>
