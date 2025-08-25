<script setup lang="ts">
import { computed } from 'vue'
import { useBreakpoint } from '@/shared/lib/useBreakpoint'
import { getWeatherDescription } from '../lib/weatherCodes'
import WeatherIcon from './WeatherIcon.vue'

const props = defineProps<{
  time: string
  weatherCode: number
  temperature: number
  windSpeed: number
  humidity: number
}>()

const { isDesktop } = useBreakpoint()

const formattedTime = new Date(props.time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

const summary = computed(
  () => `В ${formattedTime}, ${Math.round(props.temperature)} градусов, ${getWeatherDescription(props.weatherCode, props.windSpeed)}`,
)

function timeOfDay(dateString: string) {
  const hour = new Date(dateString).getHours()
  if (hour >= 22 || hour < 5)
    return 'Ночь'
  if (hour >= 5 && hour < 12)
    return 'Утро'
  if (hour >= 12 && hour < 17)
    return 'День'
  return 'Вечер'
}
</script>

<template>
  <li class="py-2 border-b border-white/10 lg:pl-4 last:border-none" :aria-label="summary">
    <div class="flex flex-col lg:gap-x-4 lg:grid lg:grid-cols-[2fr_2fr_1fr_1fr] lg:items-center">
      <div class="flex w-full items-center justify-between lg:gap-x-4">
        <!-- Время -->
        <div class="text-lg text-left flex flex-col lg:text-center lg:order-1">
          <span class="tracking-tightest font-normal">{{ formattedTime }}</span>
          <span class="text-white/60 tracking-tightest font-normal">{{ timeOfDay(time) }}</span>
        </div>
        <!-- Температура -->
        <span class="text-5xl tracking-tightest font-semibold relative lg:text-center lg:flex lg:gap-1 lg:order-2">
          {{ Math.round(temperature) }}
          <span class="tracking-tightest right-[-0.5em] top-0 absolute lg:static">°</span>
        </span>
        <!-- Иконка на мобильных -->
        <WeatherIcon v-if="!isDesktop" :code="weatherCode" :wind-speed="windSpeed" class="shrink-0 size-15" />
      </div>

      <div class="mt-2 text-center gap-2 grid grid-cols-3 lg:mt-0 lg:contents">
        <div class="flex gap-3 col-span-3 items-center justify-center lg:col-span-1 lg:justify-start lg:order-3">
          <!-- Иконка для десктопа -->
          <WeatherIcon v-if="isDesktop" :code="weatherCode" :wind-speed="windSpeed" class="shrink-0 size-15" />
          <span class="text-lg leading-[1.2] tracking-tightest font-normal lg:text-left">{{
            getWeatherDescription(weatherCode, windSpeed) }}</span>
        </div>
        <!-- Ветер -->
        <div class="text-left flex flex-col lg:text-center lg:order-4">
          <span class="text-sm text-white/60 tracking-tightest font-medium lg:hidden">Ветер</span>
          <span class="text-lg tracking-tightest font-medium">{{ Math.round(windSpeed) }} м/с</span>
        </div>
        <!-- Влажность -->
        <div class="flex flex-col lg:order-5">
          <span class="text-sm text-white/60 tracking-tightest font-medium lg:hidden">Влажность</span>
          <span class="text-lg tracking-tightest font-medium">{{ Math.round(humidity) }}%</span>
        </div>
      </div>
    </div>
  </li>
</template>
