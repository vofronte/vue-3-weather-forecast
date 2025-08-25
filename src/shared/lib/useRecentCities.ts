import type { GeocodingResult } from '@/features/city-search/model/types'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'recent_cities'
const MAX_CITIES = 5

export function useRecentCities() {
  const recentCities = ref<GeocodingResult[]>([])

  // Пытаемся загрузить города из localStorage при инициализации
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        recentCities.value = parsed
      }
    }
  }
  catch (error) {
    console.error('Failed to parse recent cities from localStorage:', error)
    recentCities.value = []
  }

  // Следим за изменениями и сохраняем в localStorage
  watch(
    recentCities,
    (cities) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cities))
      }
      catch (error) {
        console.error('Failed to save recent cities to localStorage:', error)
      }
    },
    { deep: true },
  )

  function addCity(newCity: GeocodingResult) {
    // Удаляем город, если он уже есть в списке, чтобы переместить его в начало
    const existingIndex = recentCities.value.findIndex(city => city.id === newCity.id)
    if (existingIndex !== -1) {
      recentCities.value.splice(existingIndex, 1)
    }

    // Добавляем новый город в начало списка
    recentCities.value.unshift(newCity)

    // Обрезаем список, если он превышает максимальное количество
    if (recentCities.value.length > MAX_CITIES) {
      recentCities.value.pop()
    }
  }

  return {
    recentCities,
    addCity,
  }
}
