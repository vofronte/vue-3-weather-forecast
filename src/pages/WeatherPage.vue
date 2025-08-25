<script setup lang="ts">
import type { GeocodingResult } from '@/features/city-search/model/types'
import { computed, onErrorCaptured, ref, watch } from 'vue'
import CitySearch from '@/features/city-search/ui/CitySearch.vue'
import WeatherTabs from '@/features/weather-tabs/ui/WeatherTabs.vue'
import { POPULAR_CITIES } from '@/shared/config/cities'
import { useRecentCities } from '@/shared/lib/useRecentCities'
import WeatherWidget from '@/widgets/WeatherWidget.vue'
import WeatherWidgetSkeleton from '@/widgets/WeatherWidgetSkeleton.vue'

type Tab = 'today' | 'week'
const activeTab = ref<Tab>('today')

const { recentCities, addCity } = useRecentCities()

const selectedCity = ref<GeocodingResult>(POPULAR_CITIES[0]!)

const pageError = ref<Error | null>(null)
onErrorCaptured((err) => {
  pageError.value = err
  return true
})

watch(selectedCity, (_newCity, oldCity) => {
  if (oldCity) {
    addCity(oldCity)
  }
})

const popularCitiesForDisplay = POPULAR_CITIES

const recentCitiesForDisplay = computed(() =>
  recentCities.value.filter(c => c.id !== selectedCity.value.id),
)

function handleCitySelection(city: GeocodingResult) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  pageError.value = null
  selectedCity.value = city
}
</script>

<template>
  <div class="text-white font-sans p-4 bg-main-gradient min-h-screen w-full md:p-8">
    <div class="mx-auto flex flex-col gap-10 max-w-7xl md:gap-14">
      <header class="flex flex-col gap-4 items-center justify-center md:flex-row md:justify-between">
        <WeatherTabs v-model="activeTab" />
        <CitySearch :city-name="selectedCity.name" @select-city="handleCitySelection" />
      </header>

      <main v-if="pageError" class="text-xl text-red-400 text-center">
        Не удалось загрузить данные о погоде: {{ pageError.message }}
      </main>

      <main v-else>
        <Suspense>
          <template #default>
            <WeatherWidget
              :key="selectedCity.id" :city="selectedCity" :active-tab="activeTab"
              :popular-cities="popularCitiesForDisplay" :recent-cities="recentCitiesForDisplay"
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
