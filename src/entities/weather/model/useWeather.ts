import type { Weather } from './types'
import { fetchWeatherApi } from 'openmeteo'
import { readonly, ref } from 'vue'

// Создаём кэш на уровне модуля. Он будет общим для всех вызовов useWeather().
const cache = new Map<string, { data: Weather, timestamp: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 минут в миллисекундах

export function useWeather() {
  const weather = ref<Weather | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetchWeather = async (latitude: number, longitude: number) => {
    const cacheKey = `${latitude.toFixed(4)},${longitude.toFixed(4)}`
    const cachedEntry = cache.get(cacheKey)

    // Проверяем, есть ли действительная запись в кэше
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_TTL)) {
      weather.value = cachedEntry.data
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const params = {
        latitude,
        longitude,
        current: ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m'],
        hourly: ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m'],
        daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
        timezone: 'auto',
      }
      const url = 'https://api.open-meteo.com/v1/forecast'
      const responses = await fetchWeatherApi(url, params)

      const response = responses[0]

      if (!response) {
        throw new Error('Weather data not found for the specified location.')
      }

      const utcOffsetSeconds = response.utcOffsetSeconds()
      const timezone = response.timezone()!
      const timezoneAbbreviation = response.timezoneAbbreviation()!
      const latitudeResponse = response.latitude()
      const longitudeResponse = response.longitude()

      const current = response.current()!
      const hourly = response.hourly()!
      const daily = response.daily()!

      // Вспомогательная функция для формирования диапазонов времени
      const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

      // Примечание: Порядок переменных погоды в запросе URL и индексы ниже должны совпадать!
      const weatherData: Weather = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000).toISOString(),
          interval: current.interval(),
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          weather_code: current.variables(2)!.value(),
          wind_speed_10m: current.variables(3)!.value(),
        },
        hourly: {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            t => new Date((t + utcOffsetSeconds) * 1000).toISOString(),
          ),
          temperature_2m: Array.from(hourly.variables(0)!.valuesArray()!),
          relative_humidity_2m: Array.from(hourly.variables(1)!.valuesArray()!),
          weather_code: Array.from(hourly.variables(2)!.valuesArray()!),
          wind_speed_10m: Array.from(hourly.variables(3)!.valuesArray()!),
        },
        daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            t => new Date((t + utcOffsetSeconds) * 1000).toISOString(),
          ),
          weather_code: Array.from(daily.variables(0)!.valuesArray()!),
          temperature_2m_max: Array.from(daily.variables(1)!.valuesArray()!),
          temperature_2m_min: Array.from(daily.variables(2)!.valuesArray()!),
        },
        latitude: latitudeResponse,
        longitude: longitudeResponse,
        utc_offset_seconds: utcOffsetSeconds,
        timezone,
        timezone_abbreviation: timezoneAbbreviation,
        elevation: response.elevation(),
        current_units: {
          time: 'iso8601',
          interval: 'seconds',
          temperature_2m: String(response.current()!.variables(0)!.unit()),
          relative_humidity_2m: String(response.current()!.variables(1)!.unit()),
          weather_code: String(response.current()!.variables(2)!.unit()),
          wind_speed_10m: String(response.current()!.variables(3)!.unit()),
        },
        hourly_units: {
          time: 'iso8601',
          temperature_2m: String(response.hourly()!.variables(0)!.unit()),
          relative_humidity_2m: String(response.hourly()!.variables(1)!.unit()),
          weather_code: String(response.hourly()!.variables(2)!.unit()),
          wind_speed_10m: String(response.hourly()!.variables(3)!.unit()),
        },
        daily_units: {
          time: 'iso8601',
          weather_code: String(response.daily()!.variables(0)!.unit()),
          temperature_2m_max: String(response.daily()!.variables(1)!.unit()),
          temperature_2m_min: String(response.daily()!.variables(2)!.unit()),
        },
      }

      weather.value = weatherData
      cache.set(cacheKey, { data: weatherData, timestamp: Date.now() })
    }
    catch (e) {
      if (e instanceof Error)
        error.value = e
      else
        error.value = new Error('An unknown error occurred')
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    weather: readonly(weather),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchWeather,
  }
}
