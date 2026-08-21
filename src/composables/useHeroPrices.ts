import { ref, computed } from 'vue'
import type { MetalPriceItem } from '@/types/hero'
import { formatPrice as formatPriceUtil } from '@/utils/formatters'

export function useHeroPrices() {
  const prices = ref<MetalPriceItem[]>([
    {
      id: 'gold',
      metal: 'gold',
      name: 'قیمت لحظه‌ای طلا',
      price: 19930892,
      unit: 'تومان',
      color: '#F9BC06', // Gold yellow matching design
      positionClass: 'top-2 right-2 sm:top-4 sm:right-6 lg:top-6 lg:right-4'
    },
    {
      id: 'copper',
      metal: 'copper',
      name: 'قیمت لحظه‌ای مس',
      price: 2470,
      unit: 'تومان',
      color: '#C67D43', // Copper bronze matching design
      positionClass: 'top-1/2 -translate-y-1/2 -left-2 sm:-left-4 lg:-left-6'
    },
    {
      id: 'silver',
      metal: 'silver',
      name: 'قیمت لحظه‌ای نقره',
      price: 408891,
      unit: 'تومان',
      color: '#CBD5E1', // Silver gray matching design
      positionClass: 'bottom-2 right-4 sm:bottom-4 sm:right-8 lg:bottom-6 lg:right-6'
    }
  ])

  const formatPrice = (price: number): string => {
    return formatPriceUtil(price)
  }

  const updatePrice = (id: string, newPrice: number) => {
    const item = prices.value.find((p) => p.id === id)
    if (item) {
      item.price = newPrice
    }
  }

  const goldPrice = computed(() => prices.value.find((p) => p.metal === 'gold'))
  const copperPrice = computed(() => prices.value.find((p) => p.metal === 'copper'))
  const silverPrice = computed(() => prices.value.find((p) => p.metal === 'silver'))

  return {
    prices,
    formatPrice,
    updatePrice,
    goldPrice,
    copperPrice,
    silverPrice
  }
}
