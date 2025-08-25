import { onMounted, onUnmounted, ref } from 'vue'

const DESKTOP_BREAKPOINT = 1024

export function useBreakpoint() {
  const isDesktop = ref(window.innerWidth >= DESKTOP_BREAKPOINT)

  const update = () => {
    isDesktop.value = window.innerWidth >= DESKTOP_BREAKPOINT
  }

  onMounted(() => {
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isDesktop }
}
