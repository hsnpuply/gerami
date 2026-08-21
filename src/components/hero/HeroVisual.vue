<script setup lang="ts">
import { computed } from 'vue'
import heroAsset from '@/assets/videos/hero.avif'
import type { MetalPriceItem } from '@/types/hero'
import HeroPriceCard from './HeroPriceCard.vue'

const props = withDefaults(
  defineProps<{
    prices: MetalPriceItem[]
    videoSrc?: string
    posterSrc?: string
  }>(),
  {
    videoSrc: '',
    posterSrc: ''
  }
)

const mediaSrc = computed(() => props.videoSrc || heroAsset)
const isVideo = computed(() => /\.(mp4|webm|ogg)(?:$|\?)/i.test(mediaSrc.value))
</script>

<template>
  <div class="relative w-full max-w-[480px] lg:max-w-[540px] mx-auto py-6 sm:py-8 lg:py-4 select-none">
    <!-- Visual / Video Container -->
    <div
      class="relative w-full aspect-square max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] mx-auto rounded-3xl overflow-hidden flex items-center justify-center"
    >
      <!-- Custom Video Slot / Tag -->
      <slot name="video">
        <video
          v-if="isVideo"
          :src="mediaSrc"
          :poster="props.posterSrc || undefined"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          class="w-full h-full object-contain [clip-path:inset(0_0_4%_0)]"
        />
        <img
          v-else
          :src="mediaSrc"
          alt=""
          class="w-full h-full object-contain [clip-path:inset(0_0_4%_0)]"
        />
      </slot>
    </div>

    <!-- Floating Live Price Cards -->
    <div
      v-for="item in prices"
      :key="item.id"
      class="absolute z-20 transition-all duration-300 
        hover:rotate-[0.1deg] "
      :class="item.positionClass"
    >
      <HeroPriceCard :item="item" />
    </div>
  </div>
</template>
