<script setup lang="ts">
import { computed } from 'vue'
import type { MetalPriceItem } from '@/types/hero'
import { formatPrice } from '@/utils/formatters'

const props = defineProps<{
  item: MetalPriceItem
}>()

const formattedPrice = computed(() => {
  return formatPrice(props.item.price)
})
</script>

<template>
  <div
    class=" border-solid rounded-xl transition-all duration-300 relative border-2 border-background-mid text-dim bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 w-[165px] sm:w-[195px] p-2.5 sm:p-3.5 flex items-center justify-between gap-2.5 sm:gap-3 select-none backdrop-blur-xs"
  >
    <div class="flex flex-col text-right min-w-0">
      <span class="text-[10px] sm:text-xs text-gray-dark font-medium leading-none mb-1 sm:mb-1.5 truncate">
        {{ item.name }}
      </span>
      <div class="flex items-baseline gap-1">
        <span class="text-xs sm:text-sm md:text-base !font-body text-dim tracking-tight">
          {{ formattedPrice }}
        </span>
        <span class="text-[9px] sm:text-[11px] font-normal text-gray-dark/80 whitespace-nowrap">
          {{ item.unit }}
        </span>
      </div>
    </div>

    <!-- Metal Color Badge -->
    <div
      class="w-6 h-6 sm:w-8 sm:h-8 rounded-full shrink-0 shadow-inner ring-2 ring-white transition-transform duration-300 group-hover:scale-110"
      :style="{ backgroundColor: item.color }"
      :aria-label="item.name"
    />
  </div>
</template>
