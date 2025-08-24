<script setup lang="ts">
import AppCard from '@/shared/ui/AppCard.vue'
import SunnyIcon from '@/shared/ui/icons/SunnyIcon.vue'

defineProps<{
  city: string
  description: string
  temperature: number
  humidity: number
}>()
</script>

<template>
  <AppCard class="px-8 py-6 shrink-0 w-60">
    <div class="flex flex-col gap-4 items-center">
      <div class="flex flex-col gap-2 items-center self-stretch">
        <h3 class="text-[26px] leading-[31px] font-medium">
          {{ city }}
        </h3>
        <p class="text-lg leading-[22px] font-medium">
          {{ description }}
        </p>
      </div>

      <SunnyIcon />

      <h1 class="text-5xl leading-[62px] font-semibold">
        {{ Math.round(temperature) }}°
      </h1>

      <p class="text-lg leading-[22px] font-medium">
        Влажность: {{ humidity }}%
      </p>
    </div>
  </AppCard>
</template>
