<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import type { MetalMarketItem, Timeframe, ChartDataPoint } from '@/types/marketPrice'
import { formatPrice, toPersianDigits } from '@/utils/formatters'

const props = withDefaults(
  defineProps<{
    activeMetal: MetalMarketItem
    dataPoints: ChartDataPoint[]
    activeTimeframe: Timeframe
    isLoading?: boolean
  }>(),
  {
    isLoading: false
  }
)

defineEmits<{
  (e: 'update:timeframe', tf: Timeframe): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const hoveredPoint = ref<ChartDataPoint | null>(null)
const hoverPos = ref<{ x: number; y: number } | null>(null)

const timeframes: { id: Timeframe; label: string }[] = [
  { id: 'daily', label: 'روزانه' },
  { id: 'monthly', label: 'ماهانه' },
  { id: 'yearly', label: 'سالانه' }
]

// Current display price: either hovered point or latest metal price
const displayPrice = computed(() => {
  if (hoveredPoint.value) {
    return formatPrice(hoveredPoint.value.price)
  }
  return formatPrice(props.activeMetal.price)
})

const displayDate = computed(() => {
  if (hoveredPoint.value) {
    return toPersianDigits(hoveredPoint.value.label)
  }
  return 'قیمت لحظه‌ای'
})

let animationFrameId: number | null = null
let resizeObserver: ResizeObserver | null = null

// Canvas Drawing Logic
const drawChart = () => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const rect = container.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  const width = rect.width
  const height = rect.height

  if (width === 0 || height === 0) return

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, width, height)

  const data = props.dataPoints
  if (!data || data.length < 2) return

  const padding = { top: 25, bottom: 20, left: 15, right: 15 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const prices = data.map((d) => d.price)
  const minPrice = Math.min(...prices) * 0.995
  const maxPrice = Math.max(...prices) * 1.005
  const priceRange = maxPrice - minPrice || 1

  // Compute coordinate points
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartW
    const y = padding.top + chartH - ((d.price - minPrice) / priceRange) * chartH
    return { x, y, data: d }
  })

  // Draw Spline Smooth Curve
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
  }

  // Stroke Line
  ctx.strokeStyle = props.activeMetal.color
  ctx.lineWidth = 3.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()

  // Gradient Area Fill
  ctx.lineTo(points[points.length - 1].x, height)
  ctx.lineTo(points[0].x, height)
  ctx.closePath()

  const gradient = ctx.createLinearGradient(0, padding.top, 0, height)
  gradient.addColorStop(0, props.activeMetal.gradientColor)
  gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.05)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.fillStyle = gradient
  ctx.fill()

  // Latest Point Indicator Circle
  const lastPoint = points[points.length - 1]
  ctx.beginPath()
  ctx.arc(lastPoint.x, lastPoint.y, 5.5, 0, Math.PI * 2)
  ctx.fillStyle = props.activeMetal.color
  ctx.fill()
  ctx.lineWidth = 2.5
  ctx.strokeStyle = '#ffffff'
  ctx.stroke()

  // Interactive Hover Vertical Dashed Line
  if (hoverPos.value) {
    const { x, y } = hoverPos.value

    // Vertical dashed indicator line
    ctx.beginPath()
    ctx.setLineDash([4, 4])
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x, height - padding.bottom + 10)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.setLineDash([])

    // Active hover circle (Ring on curve)
    ctx.beginPath()
    ctx.arc(x, y, 6.5, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = props.activeMetal.color
    ctx.stroke()
  }
}

// Mouse / Touch Event Listeners for interactive point finding
const handlePointerMove = (e: MouseEvent | TouchEvent) => {
  if (props.isLoading) return
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const rect = canvas.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const mouseX = clientX - rect.left

  const data = props.dataPoints
  if (!data || data.length < 2) return

  const padding = { top: 25, bottom: 20, left: 15, right: 15 }
  const chartW = rect.width - padding.left - padding.right
  const chartH = rect.height - padding.top - padding.bottom

  const prices = data.map((d) => d.price)
  const minPrice = Math.min(...prices) * 0.995
  const maxPrice = Math.max(...prices) * 1.005
  const priceRange = maxPrice - minPrice || 1

  // Find closest point by X coordinate
  let closestIdx = 0
  let minDist = Infinity

  data.forEach((_, idx) => {
    const pointX = padding.left + (idx / (data.length - 1)) * chartW
    const dist = Math.abs(mouseX - pointX)
    if (dist < minDist) {
      minDist = dist
      closestIdx = idx
    }
  })

  const targetPoint = data[closestIdx]
  const targetX = padding.left + (closestIdx / (data.length - 1)) * chartW
  const targetY = padding.top + chartH - ((targetPoint.price - minPrice) / priceRange) * chartH

  hoveredPoint.value = targetPoint
  hoverPos.value = { x: targetX, y: targetY }

  drawChart()
}

const handlePointerLeave = () => {
  hoveredPoint.value = null
  hoverPos.value = null
  drawChart()
}

watch(
  () => [props.activeMetal, props.dataPoints, props.activeTimeframe, props.isLoading],
  () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    animationFrameId = requestAnimationFrame(drawChart)
  },
  { deep: true }
)

onMounted(() => {
  drawChart()
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      drawChart()
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
  <div class="w-full flex flex-col justify-between relative select-none">
    <!-- Top Price Header -->
    <div class="text-center mb-3 sm:mb-4">
      <span class="text-xs text-gray-dark font-medium block mb-1">
        {{ displayDate }}
      </span>
      <div class="flex items-baseline justify-center gap-1.5">
        <span class="text-2xl sm:text-3xl font-heading font-extrabold text-dim tracking-tight">
          {{ displayPrice }}
        </span>
        <span class="text-xs sm:text-sm text-gray-dark font-medium">
          {{ activeMetal.unit }}
        </span>
      </div>
    </div>

    <!-- Canvas Chart Container with Fixed Height and Zero Layout Shifts -->
    <div
      ref="containerRef"
      class="relative w-full h-[210px] sm:h-[230px] cursor-crosshair touch-none overflow-hidden rounded-2xl"
      @mousemove="handlePointerMove"
      @mouseleave="handlePointerLeave"
      @touchmove="handlePointerMove"
      @touchend="handlePointerLeave"
    >
      <canvas ref="canvasRef" class="w-full h-full block" />

      <!-- Smooth Non-shifting Loading State Overlay -->
      <transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isLoading"
          class="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-10"
        >
          <div class="flex flex-col items-center gap-2">
            <div
              class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"
            />
            <span class="text-xs text-gray-dark font-medium">
              در حال به‌روزرسانی...
            </span>
          </div>
        </div>
      </transition>

      <!-- Floating Price Tooltip Card -->
      <div
        v-if="hoverPos && hoveredPoint"
        class="absolute z-[9999999999] pointer-events-none transition-all duration-75 transform -translate-y-full mb-2 bg-white rounded-2xl p-3 shadow-lg border border-gray-mid/70 text-right min-w-[145px]"
        :style="{
          left: `${Math.max(10, Math.min(hoverPos.x - 70, (containerRef?.offsetWidth || 300) - 160))}px`,
          top: `${Math.max(10, hoverPos.y - 12)}px`
        }"
      >
        <div class="text-[11px] font-medium text-gray-dark mb-1">
          {{ toPersianDigits(hoveredPoint.label) }}
        </div>
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-bold font-heading text-dim">
              {{ formatPrice(hoveredPoint.price) }}
            </span>
            <span class="text-[10px] text-gray-dark">
              {{ activeMetal.unit }}
            </span>
          </div>

          <!-- Metal colored circle dot -->
          <span
            class="w-2.5 h-2.5 rounded-full border-2 bg-white shrink-0"
            :style="{ borderColor: activeMetal.color }"
          />
        </div>
      </div>
    </div>

    <!-- Stats Row (High / Low) with Persian Digits and Separators -->
    <div class="flex items-center justify-between text-xs text-gray-dark px-2 pt-3 pb-3">
      <!-- Right Side in RTL: کمترین -->
      <div class="flex items-center gap-1.5">
        <span>کمترین</span>
        <span class="font-bold text-dim font-heading">
          {{ formatPrice(activeMetal.lowPrice) }}
        </span>
      </div>

      <!-- Left Side in RTL: بیشترین -->
      <div class="flex items-center gap-1.5">
        <span>بیشترین</span>
        <span class="font-bold text-dim font-heading">
          {{ formatPrice(activeMetal.highPrice) }}
        </span>
      </div>
    </div>

    <!-- Timeframe Buttons (Capsule Group) -->
    <div class="flex items-center justify-center gap-2 pt-1 pb-2">
      <div
        class="inline-flex items-center gap-1 bg-background-light p-1 rounded-full border border-gray-mid/60"
      >
        <button
          v-for="tf in timeframes"
          :key="tf.id"
          type="button"
          class="py-1.5 px-4 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
          :class="
            activeTimeframe === tf.id
              ? 'bg-white text-dim shadow-xs font-bold'
              : 'text-gray-dark hover:text-dim'
          "
          @click="$emit('update:timeframe', tf.id)"
        >
          {{ tf.label }}
        </button>
      </div>
    </div>
  </div>
</template>
