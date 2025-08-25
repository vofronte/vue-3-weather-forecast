<script setup lang="ts">
import Skeleton from '@/shared/ui/skeletons/Skeleton.vue'
import WeatherIcon from '../ui/WeatherIcon.vue'

defineProps<{
  temperature?: number
  weatherCode?: number
  weatherDescription?: string
  humidity?: number
  windSpeed?: number
  loading?: boolean
}>()
</script>

<template>
  <section class="flex flex-col gap-4 items-center md:flex-row md:gap-14 md:items-start">
    <div class="flex gap-4 items-center">
      <Skeleton
        :loading="loading || weatherCode === undefined" circle height="80px" width="80px"
        class="md:size-[120px]"
      >
        <WeatherIcon :code="weatherCode!" :wind-speed="windSpeed!" class="size-20 md:size-[120px]" />
      </Skeleton>
      <h1 class="text-7xl leading-[1.3] tracking-tightest font-semibold md:text-8xl">
        <Skeleton :loading="loading || temperature === undefined" width="120px">
          {{ Math.round(temperature!) }}°
        </Skeleton>
      </h1>
    </div>
    <div class="text-center flex flex-col gap-2 md:text-left">
      <div class="text-xl text-white tracking-tightest mt-2 md:text-2xl">
        <p>
          <Skeleton :loading="loading || !weatherDescription" width="200px">
            {{ weatherDescription }}
          </Skeleton>
        </p>
        <p>
          <Skeleton :loading="loading || humidity === undefined" width="180px">
            Влажность: {{ Math.round(humidity!) }}%
          </Skeleton>
        </p>
        <p>
          <Skeleton :loading="loading || windSpeed === undefined" width="160px">
            Ветер: {{ Math.round(windSpeed!) }} м/с
          </Skeleton>
        </p>
      </div>
    </div>
  </section>
</template>
