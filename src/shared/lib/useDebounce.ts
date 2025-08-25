export function useDebounce(fn: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debouncedFn = (...args: any[]) => {
    if (timeoutId)
      clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return [debouncedFn, cancel] as const
}
