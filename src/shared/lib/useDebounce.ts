export function useDebounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: number | null = null
  return (...args: any[]) => {
    if (timeoutId)
      clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
