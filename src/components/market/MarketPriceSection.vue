<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import MarketPriceChart from './MarketPriceChart.vue'
import MarketPriceList from './MarketPriceList.vue'
import { useMarketPrices } from '@/composables/useMarketPrices'

const {
  metals,
  activeMetalId,
  activeTimeframe,
  activeMetal,
  currentChartData,
  isLoading,
  setMetal,
  setTimeframe
} = useMarketPrices()

defineEmits<{
  (e: 'trade-click'): void
  (e: 'details-click'): void
}>()
</script>

<template>
  <section class="bg-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
    <AppContainer>
      <!-- =======================================================
           Desktop Layout (lg and above - 2 Columns)
           In RTL flex-row:
           1st Child = RIGHT side of screen (Info & 3-Metal Selector)
           2nd Child = LEFT side of screen (Live Canvas Chart Card)
           ======================================================= -->
      <div
        class="hidden lg:flex flex-row items-center justify-between gap-12 xl:gap-16 w-full"
      >
        <!-- 1. Right Side in RTL: Information & Metal Selection List -->
        <div class="w-1/2 flex flex-col items-start text-right">
          <!-- Market Price Badge -->
          <div
            class="inline-flex items-center gap-2 bg-background-light border border-gray-mid/80 rounded-full px-3.5 py-1.5 text-xs font-medium text-dim mb-4 shadow-2xs"
          >
            <span
              class="w-4.5 h-4.5 rounded-md bg-amber-400/20 text-amber-600 flex items-center justify-center"
            >
              <svg
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            </span>
            <span>قیمت بازار</span>
          </div>

          <!-- Section Heading -->
          <h2
            class="font-heading font-extrabold text-3xl text-dim mb-3 tracking-tight leading-snug"
          >
            قیمت لحظه‌ای و دقیق بازار
          </h2>

          <!-- Description Subtitle -->
          <p class="font-body text-sm text-gray-dark font-medium mb-8 leading-relaxed">
            نرخ‌ها همیشه از بازار واقعی به‌روزرسانی می‌شوند.
          </p>

          <!-- Selectable Metal List (Unified 3-Item Card Matching Design) -->
          <MarketPriceList
            :metals="metals"
            :active-metal-id="activeMetalId"
            @select-metal="setMetal"
          />

          <!-- Action Buttons Area -->
          <div class="flex items-center justify-start gap-3 mt-8 w-full">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-dim px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:bg-background-dark hover:shadow-md active:scale-[0.98] cursor-pointer"
              @click="$emit('trade-click')"
            >
              خرید و فروش
            </button>

            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-gray-light px-7 py-3.5 text-sm font-semibold text-dim border border-gray-mid/50 transition-all duration-200 hover:bg-gray-mid active:scale-[0.98] cursor-pointer"
              @click="$emit('details-click')"
            >
              {{ activeMetal.fullName }}
            </button>
          </div>
        </div>

        <!-- 2. Left Side in RTL: Live Canvas Chart Card -->
        <div class="w-1/2 flex justify-start">
          <div
            class="w-full max-w-[480px] border-2 border-background-mid bg-white rounded-3xl p-6 sm:p-8 shadow-xs"
          >
            <MarketPriceChart
              :active-metal="activeMetal"
              :data-points="currentChartData"
              :active-timeframe="activeTimeframe"
              :is-loading="isLoading"
              @update:timeframe="setTimeframe"
            />
          </div>
        </div>
      </div>

      <!-- =======================================================
           Mobile & Tablet Layout (below lg - Stacked)
           ======================================================= -->
      <div class="flex lg:hidden flex-col items-center w-full max-w-[520px] mx-auto select-none">
        <!-- Market Price Badge -->
        <div
          class="inline-flex items-center gap-2 bg-background-light border border-gray-mid/80 rounded-full px-3.5 py-1.5 text-xs font-medium text-dim mb-3 shadow-2xs"
        >
          <span
            class="w-4.5 h-4.5 rounded-md bg-amber-400/20 text-amber-600 flex items-center justify-center"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
          </span>
          <span>قیمت بازار</span>
        </div>

        <!-- Section Heading -->
        <h2
          class="font-heading font-extrabold text-2xl sm:text-3xl text-dim mb-2 text-center tracking-tight leading-snug"
        >
          قیمت لحظه‌ای و دقیق بازار
        </h2>

        <!-- Description Subtitle -->
        <p class="font-body text-xs sm:text-sm text-gray-dark font-medium mb-6 text-center leading-relaxed">
          نرخ‌ها همیشه از بازار واقعی به‌روزرسانی می‌شوند.
        </p>

        <!-- Metal Selector Capsule Tabs (Gold / Silver / Copper) -->
        <div
          class="bg-background-light p-1.5 rounded-2xl flex items-center justify-between gap-1.5 w-full border border-gray-mid/50 mb-6"
        >
          <button
            v-for="metal in metals"
            :key="metal.id"
            type="button"
            class="flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-heading transition-all duration-200 cursor-pointer text-center"
            :class="
              activeMetalId === metal.id
                ? 'bg-white text-dim font-bold shadow-xs'
                : 'text-gray-dark hover:text-dim font-medium'
            "
            @click="setMetal(metal.id)"
          >
            {{ metal.name }}
          </button>
        </div>

        <!-- Live Canvas Chart Card -->
        <div class="w-full border-2 border-background-mid bg-white rounded-3xl p-5 sm:p-7 shadow-xs">
          <MarketPriceChart
            :active-metal="activeMetal"
            :data-points="currentChartData"
            :active-timeframe="activeTimeframe"
            :is-loading="isLoading"
            @update:timeframe="setTimeframe"
          />
        </div>

        <!-- Bottom Action Buttons Area -->
        <div class="flex items-center gap-3 w-full mt-4">
          <button
            type="button"
            class="flex-1 py-3.5 px-6 rounded-full bg-dim text-white text-xs sm:text-sm font-semibold hover:bg-background-dark transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer text-center"
            @click="$emit('trade-click')"
          >
            خرید و فروش
          </button>

          <button
            type="button"
            class="flex-1 py-3.5 px-6 rounded-full bg-gray-light text-dim text-xs sm:text-sm font-semibold hover:bg-gray-mid transition-all duration-200 border border-gray-mid/50 active:scale-[0.98] cursor-pointer text-center"
            @click="$emit('details-click')"
          >
            {{ activeMetal.fullName }}
          </button>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
