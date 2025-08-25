<script setup lang="ts">
import type { GeocodingResult } from '@/features/city-search/model/types'
import { onErrorCaptured, ref } from 'vue'
import CitySearch from '@/features/city-search/ui/CitySearch.vue'
import WeatherTabs from '@/features/weather-tabs/ui/WeatherTabs.vue'
import WeatherWidget from '@/widgets/WeatherWidget.vue'
import WeatherWidgetSkeleton from '@/widgets/WeatherWidgetSkeleton.vue'

type Tab = 'today' | 'week'

const activeTab = ref<Tab>('today')

const selectedCity = ref<GeocodingResult>({
  id: 551487,
  name: 'Казань',
  latitude: 55.7887,
  longitude: 49.1221,
  country: 'Россия',
  admin1: 'Республика Татарстан',
})

const pageError = ref<Error | null>(null)

onErrorCaptured((err) => {
  pageError.value = err
  return true
})

function handleCitySelection(city: GeocodingResult) {
  pageError.value = null
  selectedCity.value = city
}
</script>

<template>
  <div class="text-white font-sans p-4 bg-main-gradient min-h-screen w-full md:p-8">
    <div class="mx-auto flex flex-col gap-10 max-w-7xl md:gap-14">
      <header class="flex flex-col gap-4 items-center justify-center md:flex-row md:justify-between">
        <WeatherTabs v-model="activeTab" />
        <CitySearch @select-city="handleCitySelection" />
      </header>

      <main>
        <Suspense>
          <template #default>
            <WeatherWidget
              :key="selectedCity.id" :city="selectedCity" :active-tab="activeTab"
              @select-city="handleCitySelection"
            />
          </template>

          <template #fallback>
            <WeatherWidgetSkeleton />
          </template>
        </Suspense>
      </main>
    </div>
  </div>
</template>
