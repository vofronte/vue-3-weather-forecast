<script setup lang="ts">
import type { GeocodingResult } from '../model/types'
import { nextTick, ref, watch } from 'vue'
import { POPULAR_CITIES } from '@/shared/config/cities'
import ArrowDownIcon from '@/shared/ui/icons/ArrowDownIcon.vue'
import { useGeocoding } from '../model/useGeocoding'

defineProps<{
  cityName: string
}>()

const emit = defineEmits<{
  (e: 'selectCity', city: GeocodingResult): void
}>()

const popularCities = POPULAR_CITIES

const { results, isLoading, search, clearResults } = useGeocoding()
const searchQuery = ref('')
const isEditing = ref(false)
const isDropdownVisible = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 1) {
    search(newQuery)
    isDropdownVisible.value = true
  }
  else {
    clearResults()
    if (newQuery.length === 0) {
      isDropdownVisible.value = false
    }
    else {
      isDropdownVisible.value = true
    }
  }
})

watch(isEditing, (isNowEditing) => {
  if (isNowEditing) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

function startEditing() {
  isEditing.value = true
  isDropdownVisible.value = true
}

function stopEditing() {
  setTimeout(() => {
    isEditing.value = false
    isDropdownVisible.value = false
    searchQuery.value = ''
    clearResults()
  }, 200)
}

function selectCity(city: GeocodingResult) {
  stopEditing()
  emit('selectCity', city)
}
</script>

<template>
  <div class="w-full relative md:min-w-60 md:w-auto">
    <!-- Состояние 1: Отображение текущего города -->
    <button
      v-if="!isEditing" type="button"
      class="px-4 py-2.5 rounded-lg bg-white/10 flex gap-2.5 w-full cursor-pointer items-center justify-between"
      @click="startEditing"
    >
      <span class="text-[22px] text-white leading-[1.2] tracking-tightest font-medium">{{ cityName }}</span>
      <ArrowDownIcon />
    </button>

    <!-- Состояние 2: Редактирование и поиск -->
    <div v-else class="px-4 py-2.5 rounded-lg bg-white/10 flex gap-2.5 w-full items-center justify-between">
      <input
        ref="searchInput" v-model="searchQuery" type="text" placeholder="Поиск города..." role="combobox"
        :aria-expanded="isDropdownVisible" aria-autocomplete="list"
        :aria-controls="isDropdownVisible ? 'city-results-list' : undefined"
        class="text-[22px] text-white leading-[1.2] tracking-tightest font-medium outline-none bg-transparent w-full placeholder:text-white/60"
        @blur="stopEditing"
      >
      <ArrowDownIcon class="transition-transform duration-300" :class="[{ 'rotate-180': isDropdownVisible }]" />
    </div>

    <Transition name="dropdown">
      <div
        v-if="isEditing && isDropdownVisible"
        class="mt-2 rounded-lg bg-[#1a669c] w-full shadow-lg top-full absolute z-10 overflow-hidden"
      >
        <!-- Показываем популярные города, если инпут пустой или содержит 1 символ -->
        <ul v-if="searchQuery.length < 2" id="city-results-list" role="listbox" aria-label="Популярные города">
          <li
            v-for="city in popularCities" :key="city.id" role="option"
            class="text-[22px] text-white px-4 py-2.5 bg-white/10 cursor-pointer hover:bg-white/20"
            @mousedown.prevent="selectCity(city)"
          >
            {{ city.name }}
          </li>
        </ul>
        <!-- Иначе показываем результаты поиска -->
        <ul v-else-if="results.length > 0" id="city-results-list" role="listbox" aria-label="Результаты поиска">
          <li
            v-for="city in results" :key="city.id" role="option"
            class="text-[22px] text-white px-4 py-2.5 bg-white/10 cursor-pointer hover:bg-white/20"
            @mousedown.prevent="selectCity(city)"
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
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-out;
}
</style>
