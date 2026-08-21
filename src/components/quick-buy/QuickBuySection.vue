<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import type { QuickBuyStep } from '@/types/steps'
import step1Img from '@/assets/images/steps/step-1.png'
import step2Img from '@/assets/images/steps/step-2.png'
import step3Img from '@/assets/images/steps/step-3.png'

const steps: QuickBuyStep[] = [
  {
    id: 'step-1',
    stepNumber: '۰۱',
    title: 'ثبت‌نام و احراز هویت',
    description: 'ساخت حساب کاربری در چند دقیقه',
    image: step1Img,
    imageAlt: 'ثبت‌نام و احراز هویت',
    side: 'right'
  },
  {
    id: 'step-2',
    stepNumber: '۰۲',
    title: 'واریز تومان',
    description: 'شارژ کیف پول از طریق درگاه بانکی',
    image: step2Img,
    imageAlt: 'واریز تومان',
    side: 'left'
  },
  {
    id: 'step-3',
    stepNumber: '۰۳',
    title: 'خرید و سرمایه‌گذاری آنی',
    description: 'خرید آنلاین با قیمت لحظه‌ای بازار',
    image: step3Img,
    imageAlt: 'خرید و سرمایه‌گذاری آنی',
    side: 'right'
  }
]

const timelineContainerRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
const visibleSteps = ref<Set<number>>(new Set())

// Calculate progress percentage through section on scroll
const handleScroll = () => {
  if (!timelineContainerRef.value) return

  const rect = timelineContainerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Start progress when the top of timeline enters middle of viewport
  const startOffset = windowHeight * 0.7
  const totalHeight = rect.height

  const currentScrolled = startOffset - rect.top
  const rawProgress = currentScrolled / totalHeight

  const clampedProgress = Math.max(0, Math.min(1, rawProgress))
  scrollProgress.value = clampedProgress

  // Update visible steps based on progress
  if (clampedProgress >= 0.1) visibleSteps.value.add(0)
  if (clampedProgress >= 0.45) visibleSteps.value.add(1)
  if (clampedProgress >= 0.8) visibleSteps.value.add(2)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  // Use IntersectionObserver for smooth step reveal
  const stepElements = document.querySelectorAll('.quick-buy-step-card')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-step-index'))
          if (!isNaN(index)) {
            visibleSteps.value.add(index)
          }
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  stepElements.forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) {
    observer.disconnect()
  }
})

// Check if a specific step dot is active
const isDotActive = (index: number) => {
  if (index === 0) return scrollProgress.value >= 0.05
  if (index === 1) return scrollProgress.value >= 0.45
  if (index === 2) return scrollProgress.value >= 0.8
  return false
}
</script>

<template>
  <section
    ref="sectionRef"
    class="py-16 sm:py-20 lg:py-28 relative bg-background-light overflow-hidden"
  >
    <AppContainer>
      <!-- =========================================================
           1. Header Area (Badge, 28px Heading, 16px MB, Text-sm P)
           ========================================================= -->
      <div class="flex flex-col items-center text-center max-w-[640px] mx-auto mb-16 sm:mb-20 lg:mb-24">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#FEEFBD] shadow-xs text-xs sm:text-sm font-heading font-medium text-dim mb-4 select-none"
        >
          <svg class="w-3.5 h-3.5 text-[#FFC107] fill-current" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span>خرید سریع</span>
        </div>

        <!-- 28px Heading with 16px bottom margin -->
        <h2
          class="font-heading font-black text-[24px] sm:text-[28px] text-dim leading-snug sm:leading-[1.4] mb-4 tracking-tight"
        >
          خرید سریع و آسان در چند دقیقه
        </h2>

        <!-- Text-sm Subtitle -->
        <p class="font-body text-sm text-gray-dark font-normal leading-relaxed">
          هر زمان که خواستید، به سادگی خریدتان را انجام دهید
        </p>
      </div>

      <!-- =========================================================
           2. Timeline & Steps (Desktop Center / Mobile Edge)
           ========================================================= -->
      <div
        ref="timelineContainerRef"
        class="relative max-w-[900px] mx-auto"
      >
        <!-- =========================================================
             A. DESKTOP TIMELINE LINE (Hidden on Mobile)
             ========================================================= -->
        <div
          class="hidden lg:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-[2px] bg-[#E5E7EB] z-0 pointer-events-none rounded-full"
        >
          <!-- Filled Progress Line (Smooth Scroll Growth) -->
          <div
            class="w-full bg-gradient-to-b from-[#FFC107] via-[#FFB300] to-[#FFA000] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(255,193,7,0.5)]"
            :style="{ height: `${scrollProgress * 100}%` }"
          />
        </div>

        <!-- =========================================================
             B. MOBILE TIMELINE LINE (Visible below lg)
             ========================================================= -->
        <div
          class="block lg:hidden absolute right-6 sm:right-8 top-4 bottom-8 w-[2px] bg-[#E5E7EB] z-0 pointer-events-none rounded-full"
        >
          <!-- Filled Progress Line (Mobile) -->
          <div
            class="w-full bg-gradient-to-b from-[#FFC107] via-[#FFB300] to-[#FFA000] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(255,193,7,0.5)]"
            :style="{ height: `${scrollProgress * 100}%` }"
          />
        </div>

        <!-- =========================================================
             C. STEP ITEMS LIST
             ========================================================= -->
        <div class="space-y-16 sm:space-y-24 lg:space-y-32 relative z-10">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            :data-step-index="index"
            class="quick-buy-step-card relative transition-all duration-700 ease-out"
            :class="[
              visibleSteps.has(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            ]"
          >
            <!-- =========================================================
                 DESKTOP ROW (lg and up: Alternating Left / Right)
                 ========================================================= -->
            <div class="hidden lg:flex items-center justify-between w-full">
              <!-- Right Side Content Slot (in RTL: right side is First child) -->
              <div class="w-[45%] flex flex-col" :class="step.side === 'right' ? 'items-end text-right' : 'opacity-0 pointer-events-none'">
                <template v-if="step.side === 'right'">
                  <!-- Step Number -->
                  <span class="font-heading font-bold text-xl sm:text-2xl text-[#EAB308] mb-2 leading-none">
                    {{ step.stepNumber }}
                  </span>
                  <!-- Step Title -->
                  <h3 class="font-heading font-black text-xl text-dim mb-2 leading-snug">
                    {{ step.title }}
                  </h3>
                  <!-- Step Description -->
                  <p class="font-body text-sm text-gray-dark font-normal leading-relaxed mb-6">
                    {{ step.description }}
                  </p>
                  <!-- 3D Step Image -->
                  <div class="relative w-[180px] sm:w-[220px] aspect-square flex items-center justify-center">
                    <img
                      :src="step.image"
                      :alt="step.imageAlt"
                      class="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:scale-105 floating-image"
                      loading="lazy"
                    />
                  </div>
                </template>
              </div>

              <!-- Desktop Center Dot Indicator -->
              <div class="w-[10%] flex items-center justify-center">
                <div
                  class="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-400 ease-out z-20 flex items-center justify-center"
                  :class="[
                    isDotActive(index)
                      ? 'bg-[#FFC107] border-[#FFC107] shadow-[0_0_10px_rgba(255,193,7,0.8)] scale-125'
                      : 'bg-[#524424] border-white shadow-xs'
                  ]"
                />
              </div>

              <!-- Left Side Content Slot (in RTL: left side is Second child) -->
              <div class="w-[45%] flex flex-col" :class="step.side === 'left' ? 'items-start text-left' : 'opacity-0 pointer-events-none'">
                <template v-if="step.side === 'left'">
                  <!-- Step Number -->
                  <span class="font-heading font-bold text-xl sm:text-2xl text-[#EAB308] mb-2 leading-none">
                    {{ step.stepNumber }}
                  </span>
                  <!-- Step Title -->
                  <h3 class="font-heading font-black text-xl text-dim mb-2 leading-snug">
                    {{ step.title }}
                  </h3>
                  <!-- Step Description -->
                  <p class="font-body text-sm text-gray-dark font-normal leading-relaxed mb-6">
                    {{ step.description }}
                  </p>
                  <!-- 3D Step Image -->
                  <div class="relative w-[180px] sm:w-[220px] aspect-square flex items-center justify-center">
                    <img
                      :src="step.image"
                      :alt="step.imageAlt"
                      class="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:scale-105 floating-image"
                      loading="lazy"
                    />
                  </div>
                </template>
              </div>
            </div>

            <!-- =========================================================
                 MOBILE ROW (below lg: Timeline on Right, Content on Left)
                 ========================================================= -->
            <div class="flex lg:hidden items-start gap-5 sm:gap-8 pr-3 sm:pr-5">
              <!-- Mobile Timeline Dot Indicator -->
              <div class="shrink-0 pt-1 relative z-20">
                <div
                  class="w-3.5 h-3.5 rounded-full border-2 transition-all duration-400 ease-out flex items-center justify-center"
                  :class="[
                    isDotActive(index)
                      ? 'bg-[#FFC107] border-[#FFC107] shadow-[0_0_10px_rgba(255,193,7,0.8)] scale-125'
                      : 'bg-[#524424] border-white shadow-xs'
                  ]"
                />
              </div>

              <!-- Mobile Step Content -->
              <div class="flex flex-col items-start text-right flex-1">
                <!-- Step Number -->
                <span class="font-heading font-bold text-lg text-[#EAB308] mb-1.5 leading-none">
                  {{ step.stepNumber }}
                </span>
                <!-- Step Title -->
                <h3 class="font-heading font-black text-lg sm:text-xl text-dim mb-1.5 leading-snug">
                  {{ step.title }}
                </h3>
                <!-- Step Description -->
                <p class="font-body text-xs sm:text-sm text-gray-dark font-normal leading-relaxed mb-4">
                  {{ step.description }}
                </p>
                <!-- 3D Step Image -->
                <div class="relative w-[150px] sm:w-[190px] aspect-square flex items-center justify-center self-center sm:self-start">
                  <img
                    :src="step.image"
                    :alt="step.imageAlt"
                    class="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)] floating-image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom End Dot -->
          <div class="hidden lg:flex items-center justify-center pt-4">
            <div
              class="w-3 h-3 rounded-full border transition-all duration-300"
              :class="scrollProgress >= 0.95 ? 'bg-[#FFC107] border-[#FFC107] shadow-sm' : 'bg-[#524424] border-white'"
            />
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Gentle 3D floating animation */
.floating-image {
  animation: floatStep 4s ease-in-out infinite alternate;
}

@keyframes floatStep {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-6px) rotate(-1deg);
  }
}
</style>
