<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import type { FeatureItem } from '@/types/features'
import FeatureCard from './FeatureCard.vue'

defineProps<{
  features: FeatureItem[]
}>()

const activeIndex = ref(0)
let swiperInstance: SwiperType | null = null

const onSwiper = (swiper: SwiperType) => {
  swiperInstance = swiper
}

const onSlideChange = (swiper: SwiperType) => {
  activeIndex.value = swiper.realIndex
}

const scrollToIndex = (index: number) => {
  if (swiperInstance) {
    swiperInstance.slideTo(index)
    activeIndex.value = index
  }
}
</script>

<template>
  <div class="w-full select-none">
    <!-- Swiper Container for Mobile Feature Cards -->
    <Swiper
      :slides-per-view="1.25"
      :space-between="12"
      :grab-cursor="true"
      :centered-slides="false"
      class="w-full !px-4 !py-1 -mx-4"
      :breakpoints="{
        '480': {
          slidesPerView: 1.6,
          spaceBetween: 14
        },
        '640': {
          slidesPerView: 2.2,
          spaceBetween: 16
        }
      }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide
        v-for="feature in features"
        :key="feature.id"
        class="!h-auto flex"
      >
        <div class="w-full h-full">
          <FeatureCard :feature="feature" />
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Custom Pagination Dots (Capsule Pill Container with Exact Gradient Active Dot) -->
    <div class="flex items-center justify-center mt-5">
      <div
        class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xs rounded-full px-3.5 py-1.5 shadow-xs border border-white/80"
      >
        <button
          v-for="(_, idx) in features"
          :key="idx"
          type="button"
          class="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer p-0"
          :style="
            activeIndex === idx
              ? 'background: linear-gradient(#80765e 0%, #21180e 100%) !important;'
              : 'background-color: #E5E7EB;'
          "
          :aria-label="`اسلاید شماره ${idx + 1}`"
          @click="scrollToIndex(idx)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.swiper-wrapper) {
  align-items: stretch;
}
</style>
