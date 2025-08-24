<script setup lang="ts">
import type { GeocodingResult } from '../model/types'
import { ref, watch } from 'vue'
import ArrowDownIcon from '@/shared/ui/icons/ArrowDownIcon.vue'
import { useGeocoding } from '../model/useGeocoding'

const emit = defineEmits<{
  (e: 'selectCity', city: GeocodingResult): void
}>()

const popularCities: GeocodingResult[] = [
  { id: 524901, name: 'Москва', latitude: 55.7522, longitude: 37.6156, country: 'Россия', admin1: 'Москва' },
  { id: 1496747, name: 'Новосибирск', latitude: 55.0415, longitude: 82.9346, country: 'Россия', admin1: 'Новосибирская область' },
  { id: 542420, name: 'Краснодар', latitude: 45.0448, longitude: 38.976, country: 'Россия', admin1: 'Краснодарский край' },
  { id: 1502026, name: 'Красноярск', latitude: 56.0097, longitude: 92.8526, country: 'Россия', admin1: 'Красноярский край' },
  { id: 480562, name: 'Уфа', latitude: 54.7431, longitude: 55.9678, country: 'Россия', admin1: 'Республика Башкортостан' },
]

const { results, isLoading, search, clearResults } = useGeocoding()
const searchQuery = ref('')
const isDropdownVisible = ref(false)
const selectedCityName = ref('Казань')

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 1)
    search(newQuery)
  else
    clearResults()
})

function selectCity(city: GeocodingResult) {
  selectedCityName.value = city.name
  searchQuery.value = ''
  isDropdownVisible.value = false
  emit('selectCity', city)
}

function showDropdown() {
  isDropdownVisible.value = true
}

function hideDropdown() {
  setTimeout(() => {
    isDropdownVisible.value = false
  }, 200)
}
</script>

<template>
  <div class="w-full relative md:min-w-60 md:w-auto">
    <div
      class="px-4 py-2.5 rounded-lg bg-white/10 flex gap-2.5 w-full items-center justify-between"
    >
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="selectedCityName"
        class="text-[22px] text-white leading-[1.2] tracking-tightest font-medium outline-none bg-transparent w-full placeholder:text-white"
        @focus="showDropdown"
        @blur="hideDropdown"
      >

      <ArrowDownIcon
        class="transition-transform duration-300" :class="[{ 'rotate-180': isDropdownVisible }]"
      />
    </div>

    <div
      v-if="isDropdownVisible"
      class="mt-2 rounded-lg bg-[#1a669c] w-full shadow-lg top-full absolute z-10 overflow-hidden"
    >
      <!-- Показываем популярные города, если инпут пустой -->
      <ul v-if="searchQuery.length < 2">
        <li
          v-for="city in popularCities"
          :key="city.id"
          class="text-[22px] text-white px-4 py-2.5 bg-white/10 cursor-pointer hover:bg-white/20"
          @click="selectCity(city)"
        >
          {{ city.name }}
        </li>
      </ul>
      <!-- Иначе показываем результаты поиска -->
      <ul v-else-if="results.length > 0">
        <li
          v-for="city in results"
          :key="city.id"
          class="text-[22px] text-white px-4 py-2.5 bg-white/10 cursor-pointer hover:bg-white/20"
          @click="selectCity(city)"
        >
          {{ city.name }}{{ city.admin1 ? `, ${city.admin1}` : '' }}
        </li>
      </ul>
      <div v-else-if="isLoading" class="text-white/60 px-4 py-3">
        Поиск...
      </div>
      <div v-else class="text-white/60 px-4 py-3">
        Город не найден
      </div>
    </div>
  </div>
</template>
