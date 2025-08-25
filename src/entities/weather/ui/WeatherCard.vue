<script setup lang="ts">
import AppCard from '@/shared/ui/AppCard.vue'
import WeatherIcon from './WeatherIcon.vue'

defineProps<{
  city: string
  description: string
  weatherCode: number
  temperature: number
  humidity: number
  windSpeed: number
}>()
</script>

<template>
  <AppCard class="p-6">
    <div class="flex flex-col gap-4 h-full items-center">
      <div class="flex flex-col gap-2 items-center self-stretch">
        <h3 class="text-2xl leading-[1.2] tracking-tightest font-medium text-center">
          {{ city }}
        </h3>
        <p class="text-lg text-white/80 leading-[1.2] tracking-tightest font-medium text-center">
          {{ description }}
        </p>
      </div>

      <div class="mt-auto flex flex-col gap-4 items-center">
        <WeatherIcon :code="weatherCode" :wind-speed="windSpeed" class="size-16" />

        <p class="text-5xl leading-[1.3] tracking-tightest font-semibold">
          {{ Math.round(temperature) }}°
        </p>

        <p class="text-lg leading-[1.2] tracking-tightest font-medium">
          Влажность: {{ Math.round(humidity) }}%
        </p>
      </div>
    </div>
  </AppCard>
</template>
