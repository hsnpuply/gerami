<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import type { LicenseBadgeItem } from '@/types/features'

defineProps<{
  badges: LicenseBadgeItem[]
}>()

defineEmits<{
  (e: 'view-all'): void
}>()

const modules = [Autoplay, FreeMode]
</script>

<template>
  <div class="w-full mt-8 pt-6 border-t border-gray-mid/60 select-none">
    <!-- Header: Title + Link to view (with cursor-pointer) -->
    <div class="flex items-center justify-between mb-5 px-1">
      <h3 class="font-heading font-bold text-sm sm:text-base text-dim">
        مجوزهای رسمی
      </h3>

      <button
        type="button"
        class="inline-flex items-center gap-1 text-xs font-medium text-gray-dark hover:text-dim transition-colors group cursor-pointer"
        @click="$emit('view-all')"
      >
        <span>مشاهده</span>
        <svg
          class="w-3.5 h-3.5 text-gray-dark group-hover:text-dim transition-transform group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    </div>

    <!-- Official Licenses Swiper Infinite Marquee -->
    <div
      class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-2"
    >
      <!-- Gradient Fade Edges -->
      <div
        class="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background-mid via-background-mid/70 to-transparent pointer-events-none z-10"
      />
      <div
        class="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background-mid via-background-mid/70 to-transparent pointer-events-none z-10"
      />

      <Swiper
        :modules="modules"
        :slides-per-view="3.5"
        :space-between="20"
        :loop="true"
        :speed="3500"
        :free-mode="{ enabled: true, momentum: false }"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :grab-cursor="true"
        :breakpoints="{
          '480': {
            slidesPerView: 4.5,
            spaceBetween: 24
          },
          '640': {
            slidesPerView: 5.5,
            spaceBetween: 28
          }
        }"
        class="w-full"
      >
        <!-- Repeated items for smooth continuous loop -->
        <SwiperSlide
          v-for="(badge, idx) in [...badges, ...badges, ...badges]"
          :key="`${badge.id}-${idx}`"
          class="!flex items-center justify-center"
        >
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
            :title="badge.title"
          >
            <img
              :src="badge.image"
              :alt="badge.alt"
              class="max-w-full max-h-full object-contain filter drop-shadow-xs"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
</style>
