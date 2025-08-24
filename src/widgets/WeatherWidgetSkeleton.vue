<script setup lang="ts">
import Skeleton from '@/shared/ui/skeletons/Skeleton.vue'
</script>

<template>
  <div class="flex flex-col gap-12">
    <!-- Skeleton для CurrentWeatherSummary -->
    <div>
      <div class="mb-6 text-center md:text-left">
        <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold md:text-4xl">
          <Skeleton width="350px" />
        </h2>
        <p class="text-xl text-white/60 leading-[1.2] tracking-tightest md:text-2xl">
          <Skeleton width="250px" />
        </p>
      </div>
      <!-- Основная информация -->
      <section class="text-center flex flex-col gap-6 items-center md:text-left md:flex-row md:gap-14">
        <div class="flex gap-4 items-center">
          <Skeleton circle height="80px" width="80px" />
          <h1 class="text-7xl leading-[1.3] tracking-tightest font-semibold md:text-8xl">
            <Skeleton width="120px" />
          </h1>
        </div>
        <div class="text-2xl text-white tracking-tightest mt-2 flex flex-col gap-2 md:text-xl">
          <p><Skeleton width="200px" /></p>
          <p><Skeleton width="180px" /></p>
          <p><Skeleton width="160px" /></p>
        </div>
      </section>
    </div>

    <!-- Skeleton для популярных городов -->
    <section class="flex flex-col gap-4">
      <h2 class="text-2xl leading-[1.3] tracking-tightest font-semibold text-center md:text-[36px] md:text-left">
        <Skeleton width="400px" />
      </h2>
      <div class="gap-4 grid grid-cols-1 md:gap-9 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
        <Skeleton v-for="i in 5" :key="i" height="250px" />
      </div>
    </section>
  </div>
</template>
