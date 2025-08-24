export enum WeatherCode {
  ClearSky = 0,
  MainlyClear = 1,
  PartlyCloudy = 2,
  Overcast = 3,
  Fog = 45,
  RimeFog = 48,
  DrizzleLight = 51,
  DrizzleModerate = 53,
  DrizzleDense = 55,
  FreezingDrizzleLight = 56,
  FreezingDrizzleDense = 57,
  RainSlight = 61,
  RainModerate = 63,
  RainHeavy = 65,
  FreezingRainLight = 66,
  FreezingRainHeavy = 67,
  SnowFallSlight = 71,
  SnowFallModerate = 73,
  SnowFallHeavy = 75,
  SnowGrains = 77,
  RainShowersSlight = 80,
  RainShowersModerate = 81,
  RainShowersViolent = 82,
  SnowShowersSlight = 85,
  SnowShowersHeavy = 86,
  ThunderstormSlight = 95,
  ThunderstormWithSlightHail = 96,
  ThunderstormWithHeavyHail = 99,
}

export interface WeatherInfo {
  description: string
  iconName: string
}

const WEATHER_DATA = new Map<WeatherCode, WeatherInfo>([
  [WeatherCode.ClearSky, { description: 'Ясно', iconName: 'SunnyIcon' }],
  [WeatherCode.MainlyClear, { description: 'В основном ясно', iconName: 'PartlyCloudyIcon' }],
  [WeatherCode.PartlyCloudy, { description: 'Переменная облачность', iconName: 'CloudyIcon' }],
  [WeatherCode.Overcast, { description: 'Пасмурно', iconName: 'CloudyIcon' }],
  [WeatherCode.RainSlight, { description: 'Дождь: слабый', iconName: 'RainIcon' }],
])

export function getWeatherInfo(code: number): WeatherInfo | undefined {
  if (Object.values(WeatherCode).includes(code)) {
    return WEATHER_DATA.get(code as WeatherCode)
  }
  return undefined
}

export function getWeatherDescription(code: number): string {
  return getWeatherInfo(code)?.description ?? 'Неизвестно'
}
