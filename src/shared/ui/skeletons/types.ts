// Общие props для темы и самого скелетона
export interface SkeletonThemeProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  baseColor?: string
  highlightColor?: string
}

// Уникальные props для компонента Skeleton
export interface SkeletonProps extends SkeletonThemeProps {
  count?: number
  circle?: boolean
  loading?: boolean
}
