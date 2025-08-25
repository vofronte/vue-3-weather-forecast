import { fetchWeatherApi } from 'openmeteo'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useWeather } from './useWeather'

// Мокаем библиотеку openmeteo
vi.mock('openmeteo', () => ({
  fetchWeatherApi: vi.fn(),
}))

// Вспомогательная функция для создания мок-ответа API
// Структура имитирует сложный ответ от реальной библиотеки
function createMockApiResponse() {
  return {
    utcOffsetSeconds: () => 0,
    timezone: () => 'GMT',
    timezoneAbbreviation: () => 'GMT',
    latitude: () => 55.75,
    longitude: () => 37.61,
    elevation: () => 155,
    current: vi.fn().mockReturnValue({
      time: () => 1724587200, // Пример времени в Unix seconds: 2025-08-25 12:00:00 GMT
      interval: () => 900,
      variables: (idx: number) => ({
        value: () => {
          switch (idx) {
            case 0: return 25.5 // temperature_2m
            case 1: return 60 // relative_humidity_2m
            case 2: return 3 // weather_code
            case 3: return 5.2 // wind_speed_10m
            default: return Number.NaN
          }
        },
        unit: () => 'test_unit',
      }),
    }),
    hourly: vi.fn().mockReturnValue({
      time: () => 1724544000, // 2025-08-25 00:00:00
      timeEnd: () => 1724630400, // 2025-08-26 00:00:00
      interval: () => 3600,
      variables: (idx: number) => ({
        valuesArray: () => new Float32Array(24).fill(10 + idx),
        unit: () => 'test_unit',
      }),
    }),
    daily: vi.fn().mockReturnValue({
      time: () => 1724544000,
      timeEnd: () => 1725148800, // +7 дней
      interval: () => 86400,
      variables: (idx: number) => ({
        valuesArray: () => new Float32Array(7).fill(20 + idx),
        unit: () => 'test_unit',
      }),
    }),
  }
}

describe('useWeather', () => {
  // Очищаем все моки после каждого теста
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('должен иметь корректное начальное состояние', () => {
    const { weather, isLoading, error } = useWeather()
    expect(weather.value).toBeNull()
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('должен успешно получать и обрабатывать данные о погоде', async () => {
    const mockResponse = createMockApiResponse()
    vi.mocked(fetchWeatherApi).mockResolvedValue([mockResponse as any])

    const { weather, isLoading, error, fetchWeather } = useWeather()
    const promise = fetchWeather(55.75, 37.61)

    // Проверяем состояние во время загрузки
    expect(isLoading.value).toBe(true)
    expect(weather.value).toBeNull()
    expect(error.value).toBeNull()

    await promise

    // Проверяем конечное состояние после успешной загрузки
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeNull()
    expect(weather.value).not.toBeNull()

    // Проверяем несколько ключевых полей, чтобы убедиться в правильности трансформации
    expect(weather.value?.current.temperature_2m).toBe(25.5)
    expect(weather.value?.current.weather_code).toBe(3)
    expect(weather.value?.daily.time.length).toBe(7)
    expect(weather.value?.hourly.time.length).toBe(24)
    expect(weather.value?.latitude).toBe(55.75)
  })

  it('должен корректно обрабатывать ошибки API', async () => {
    const testError = new Error('Сетевой запрос не удался')
    vi.mocked(fetchWeatherApi).mockRejectedValue(testError)

    const { weather, isLoading, error, fetchWeather } = useWeather()
    const promise = fetchWeather(0, 0)

    expect(isLoading.value).toBe(true)

    await promise

    expect(isLoading.value).toBe(false)
    expect(weather.value).toBeNull()
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toBe('Сетевой запрос не удался')
  })

  it('должен обрабатывать пустой ответ от API как ошибку', async () => {
    vi.mocked(fetchWeatherApi).mockResolvedValue([])

    const { weather, isLoading, error, fetchWeather } = useWeather()
    await fetchWeather(1, 1)

    expect(isLoading.value).toBe(false)
    expect(weather.value).toBeNull()
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toBe('Weather data not found for the specified location.')
  })

  it('должен обрабатывать исключения, не являющиеся объектом Error', async () => {
    const testError = 'Что-то пошло не так'
    vi.mocked(fetchWeatherApi).mockRejectedValue(testError)

    const { weather, isLoading, error, fetchWeather } = useWeather()
    await fetchWeather(0, 0)

    expect(isLoading.value).toBe(false)
    expect(weather.value).toBeNull()
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toBe('An unknown error occurred')
  })
})
