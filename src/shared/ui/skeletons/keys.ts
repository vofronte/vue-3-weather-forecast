import type { InjectionKey } from 'vue'
import type { SkeletonThemeProps } from './types'

export const ThemeInjectionKey: InjectionKey<SkeletonThemeProps> = Symbol('SkeletonTheme')
