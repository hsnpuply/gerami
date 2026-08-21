<script setup lang="ts">
import { computed } from 'vue'
import type { MetalItem } from '@/types/metals'
import goldImg from '@/assets/images/metals/gold.png'
import silverImg from '@/assets/images/metals/silver.png'
import copperImg from '@/assets/images/metals/copper.png'

const props = defineProps<{
  metal: MetalItem
}>()

const metalImages: Record<string, string> = {
  gold: goldImg,
  silver: silverImg,
  copper: copperImg
}

const currentImage = computed(() => metalImages[props.metal.slug] || goldImg)
</script>

<template>
  <div
    class="relative w-full max-w-[500px] lg:max-w-[540px] aspect-[4/3] sm:aspect-[5/4] md:aspect-square max-h-[460px] mx-auto rounded-[32px] bg-white border border-gray-100 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] overflow-hidden flex items-center justify-center p-6 select-none group"
  >
    <!-- =========================================================
         1. BACKGROUND LAYER: Infinite Moving Grid with 10% Fade Mask
         Top 10% & Bottom 10% are smoothly faded to transparent
         ========================================================= -->
    <div
      class="absolute inset-x-[10%] inset-y-[10%] w-[80%] h-[80%] mx-auto my-auto rounded-2xl overflow-hidden pointer-events-none z-0 moving-grid-container"
    >
      <slot name="grid-background" :metal="metal">
        <!-- Default CSS Animated Grid Background (Top to Bottom) -->
        <div class="relative w-full h-full moving-grid-pattern" />
      </slot>
    </div>

    <!-- =========================================================
         2. 3D MODEL / IMAGE / CANVAS LAYER
         Plays explainFloat animation on card hover: scale(1.02) rotate(-3deg)
         ========================================================= -->
    <div
      class="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto"
    >
      <slot name="canvas" :metal="metal">
        <!-- High-Res Metal Card Image (Gold, Silver, Copper) with Hover Animation -->
        <div class="relative flex items-center justify-center w-full h-full">
          <img
            :src="currentImage"
            :alt="metal.title"
            class="metal-image max-h-[290px] sm:max-h-[330px] lg:max-h-[360px] w-auto max-w-[85%] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] pointer-events-none"
            loading="lazy"
            decoding="async"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
/* 10% Top and Bottom Fade Mask for the Infinite Grid */
.moving-grid-container {
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 90%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 90%,
    transparent 100%
  );
}

/* Infinite Top-to-Bottom Moving Grid Pattern */
.moving-grid-pattern {
  background-size: 24px 24px;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px);
  animation: moveGrid 8s linear infinite;
}

@keyframes moveGrid {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 48px;
  }
}

/* Card Hover Float Animation: scale(1.02) rotate(-3deg) */
.metal-image {
  transform: scale(1) rotate(0deg);
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
}

.group:hover .metal-image {
  animation: explainFloat 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes explainFloat {
  0% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(1.02) rotate(-3deg);
  }
}
</style>
