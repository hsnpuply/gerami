import { ref, computed } from 'vue'
import type { MetalMarketItem, Timeframe, MetalId } from '@/types/marketPrice'
import { formatPrice } from '@/utils/formatters'

export function useMarketPrices() {
  const activeMetalId = ref<MetalId>('gold')
  const activeTimeframe = ref<Timeframe>('monthly')
  const isLoading = ref(false)

  const metals = ref<MetalMarketItem[]>([
    {
      id: 'gold',
      name: 'طلای ۱۸ عیار',
      fullName: 'قیمت طلای ۱۸ عیار',
      price: 19787932,
      unit: 'تومان',
      color: '#F59E0B', // Amber Gold
      gradientColor: 'rgba(245, 158, 11, 0.22)',
      highPrice: 19968000,
      lowPrice: 10556533,
      dataByTimeframe: {
        daily: [
          { label: '۰۹:۰۰', price: 19650000 },
          { label: '۱۱:۰۰', price: 19520000 },
          { label: '۱۳:۰۰', price: 19710000 },
          { label: '۱۵:۰۰', price: 19680000 },
          { label: '۱۷:۰۰', price: 19740000 },
          { label: '۱۹:۰۰', price: 19765000 },
          { label: '۲۱:۰۰', price: 19787932 }
        ],
        monthly: [
          { label: '۱ اردیبهشت', price: 11200000 },
          { label: '۵ اردیبهشت', price: 10556533 },
          { label: '۱۰ اردیبهشت', price: 13400000 },
          { label: '۲۵ اردیبهشت', price: 15800000 },
          { label: '۱۲ خرداد', price: 16932507 },
          { label: '۲۲ خرداد', price: 18200000 },
          { label: '۳۰ خرداد', price: 19787932 }
        ],
        yearly: [
          { label: 'فروردین', price: 10556533 },
          { label: 'خرداد', price: 13200000 },
          { label: 'مرداد', price: 15400000 },
          { label: 'مهر', price: 16800000 },
          { label: 'دی', price: 18100000 },
          { label: 'اسفند', price: 19787932 }
        ]
      }
    },
    {
      id: 'silver',
      name: 'نقره',
      fullName: 'قیمت نقره',
      price: 409981,
      unit: 'تومان',
      color: '#64748B', // Silver Slate
      gradientColor: 'rgba(100, 116, 139, 0.22)',
      highPrice: 425000,
      lowPrice: 285000,
      dataByTimeframe: {
        daily: [
          { label: '۰۹:۰۰', price: 402000 },
          { label: '۱۱:۰۰', price: 399000 },
          { label: '۱۳:۰۰', price: 405000 },
          { label: '۱۵:۰۰', price: 403000 },
          { label: '۱۷:۰۰', price: 407000 },
          { label: '۱۹:۰۰', price: 408500 },
          { label: '۲۱:۰۰', price: 409981 }
        ],
        monthly: [
          { label: '۱ اردیبهشت', price: 295000 },
          { label: '۵ اردیبهشت', price: 285000 },
          { label: '۱۰ اردیبهشت', price: 320000 },
          { label: '۲۵ اردیبهشت', price: 355000 },
          { label: '۱۲ خرداد', price: 372000 },
          { label: '۲۲ خرداد', price: 395000 },
          { label: '۳۰ خرداد', price: 409981 }
        ],
        yearly: [
          { label: 'فروردین', price: 285000 },
          { label: 'خرداد', price: 315000 },
          { label: 'مرداد', price: 340000 },
          { label: 'مهر', price: 365000 },
          { label: 'دی', price: 388000 },
          { label: 'اسفند', price: 409981 }
        ]
      }
    },
    {
      id: 'copper',
      name: 'مس',
      fullName: 'قیمت مس',
      price: 2460,
      unit: 'تومان',
      color: '#C67D43', // Copper Bronze
      gradientColor: 'rgba(198, 125, 67, 0.22)',
      highPrice: 2650,
      lowPrice: 1650,
      dataByTimeframe: {
        daily: [
          { label: '۰۹:۰۰', price: 2410 },
          { label: '۱۱:۰۰', price: 2390 },
          { label: '۱۳:۰۰', price: 2430 },
          { label: '۱۵:۰۰', price: 2420 },
          { label: '۱۷:۰۰', price: 2445 },
          { label: '۱۹:۰۰', price: 2455 },
          { label: '۲۱:۰۰', price: 2460 }
        ],
        monthly: [
          { label: '۱ اردیبهشت', price: 1720 },
          { label: '۵ اردیبهشت', price: 1650 },
          { label: '۱۰ اردیبهشت', price: 1890 },
          { label: '۲۵ اردیبهشت', price: 2050 },
          { label: '۱۲ خرداد', price: 2210 },
          { label: '۲۲ خرداد', price: 2380 },
          { label: '۳۰ خرداد', price: 2460 }
        ],
        yearly: [
          { label: 'فروردین', price: 1650 },
          { label: 'خرداد', price: 1820 },
          { label: 'مرداد', price: 2010 },
          { label: 'مهر', price: 2180 },
          { label: 'دی', price: 2340 },
          { label: 'اسفند', price: 2460 }
        ]
      }
    }
  ])

  const activeMetal = computed(() => {
    return metals.value.find((m) => m.id === activeMetalId.value) || metals.value[0]
  })

  const currentChartData = computed(() => {
    return activeMetal.value.dataByTimeframe[activeTimeframe.value] || []
  })

  const formatPriceFormatted = (price: number): string => {
    return formatPrice(price)
  }

  const setMetal = (id: MetalId) => {
    if (activeMetalId.value === id) return
    isLoading.value = true
    activeMetalId.value = id
    setTimeout(() => {
      isLoading.value = false
    }, 280)
  }

  const setTimeframe = (tf: Timeframe) => {
    if (activeTimeframe.value === tf) return
    isLoading.value = true
    activeTimeframe.value = tf
    setTimeout(() => {
      isLoading.value = false
    }, 220)
  }

  return {
    metals,
    activeMetalId,
    activeTimeframe,
    activeMetal,
    currentChartData,
    isLoading,
    formatPrice: formatPriceFormatted,
    setMetal,
    setTimeframe
  }
}
