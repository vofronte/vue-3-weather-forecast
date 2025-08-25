import type { GeocodingResult } from './types'
import { readonly, ref } from 'vue'
import { useDebounce } from '@/shared/lib/useDebounce'

export function useGeocoding() {
  const results = ref<GeocodingResult[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const searchCities = async (query: string) => {
    if (query.length < 2) {
      results.value = []
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=ru&format=json`
      const response = await fetch(url)

      if (!response.ok)
        throw new Error('Не удалось получить список городов')

      const data = await response.json()
      results.value = data.results || []
    }
    catch (e) {
      results.value = []
      if (e instanceof Error)
        error.value = e
      else
        error.value = new Error('Произошла неизвестная ошибка при поиске города')
    }
    finally {
      isLoading.value = false
    }
  }

  const [debouncedSearch, cancelSearch] = useDebounce(searchCities, 300)

  const clearResults = () => {
    cancelSearch()
    results.value = []
  }

  return {
    results: readonly(results),
    isLoading: readonly(isLoading),
    error: readonly(error),
    search: debouncedSearch,
    clearResults,
  }
}
