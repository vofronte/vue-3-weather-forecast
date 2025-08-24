<script setup lang="ts">
type Tab = 'today' | 'week'

defineProps<{
  modelValue: Tab
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Tab): void
}>()

const tabs = [
  { id: 'today', name: 'Главная' },
  { id: 'week', name: 'Погода за неделю' },
] as const

function selectTab(tabId: Tab) {
  emit('update:modelValue', tabId)
}
</script>

<template>
  <div class="rounded-lg bg-white/10 flex w-full md:w-auto">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="text-[22px] leading-[1.2] tracking-tightest font-medium px-4 py-2.5 w-1/2 cursor-pointer transition-colors duration-300 md:w-auto"
      :class="{
        'text-white': modelValue === tab.id,
        'text-white/40 hover:text-white/70': modelValue !== tab.id,
        'border-r border-white/20': tab.id === 'today',
      }" @click="selectTab(tab.id)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>
