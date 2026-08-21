<script setup lang="ts">
import type { MetalMarketItem, MetalId } from '@/types/marketPrice'
import { formatPrice } from '@/utils/formatters'

defineProps<{
  metals: MetalMarketItem[]
  activeMetalId: MetalId
}>()

defineEmits<{
  (e: 'select-metal', id: MetalId): void
}>()
</script>

<template>
  <!-- Single Unified Container Card Matching Design Image 2 -->
  <div
    class="w-full bg-[#fbfbfa] border border-gray-mid/80 rounded-3xl p-2 sm:p-2.5 flex flex-col gap-1 select-none shadow-2xs"
  >
    <button
      v-for="item in metals"
      :key="item.id"
      type="button"
      class="w-full flex items-center justify-between px-5 sm:px-6 py-4 rounded-2xl transition-all duration-200 cursor-pointer text-right group"
      :class="
        activeMetalId === item.id
          ? 'bg-white shadow-xs ring-1 ring-black/5 text-dim'
          : 'hover:bg-white/60 text-dim/90'
      "
      @click="$emit('select-metal', item.id)"
    >
      <!-- Right Side in RTL: Metal Name (No dots, clean heading font) -->
      <span class="font-heading font-bold text-base sm:text-lg text-dim">
        {{ item.name }}
      </span>

      <!-- Left Side in RTL: Price + Unit + Chevron Arrow (Far Left) -->
      <div class="flex items-center gap-2.5">
        <span class="text-sm sm:text-base font-semibold font-heading text-dim tracking-tight">
          {{ formatPrice(item.price) }} {{ item.unit }}
        </span>
        <svg
          class="w-4 h-4 text-gray-dark/70 transition-transform duration-200 group-hover:-translate-x-0.5"
          :class="{ 'text-dim': activeMetalId === item.id }"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
    </button>
  </div>
</template>
