<script setup lang="ts">
import type { LicenseBadgeItem } from '@/types/features'

defineProps<{
  badges: LicenseBadgeItem[]
}>()
</script>

<template>
  <div
    class="marquee-container relative w-full h-full flex items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] select-none"
  >
    <!-- Gradient Fade Edges (Top & Bottom) -->
    <div
      class="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background-light via-background-light/70 to-transparent pointer-events-none z-10"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background-light via-background-light/70 to-transparent pointer-events-none z-10"
    />

    <!-- 2 Column Vertical Infinite Marquee -->
    <div class="marquee-track flex items-center justify-center gap-2.5 sm:gap-3 w-full h-fit">
      <!-- Column 1: Moves UP -->
      <div class="marquee-column flex flex-col gap-2.5 sm:gap-3 animate-marquee-up">
        <!-- Primary Items -->
        <div
          v-for="badge in badges"
          :key="`c1-${badge.id}`"
          class="relative group/badge flex items-center justify-center shrink-0"
        >
          <!-- Badge Card without border -->
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center p-2 transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:shadow-md cursor-pointer border-0"
          >
            <img
              :src="badge.image"
              :alt="badge.alt"
              class="max-w-full max-h-full object-contain filter drop-shadow-xs"
              loading="lazy"
            />
          </div>

          <!-- Custom Rich Tooltip (Hidden natively, smooth fade in on hover) -->
          <div
            class="absolute bottom-full mb-1.5 opacity-0 group-hover/badge:opacity-100 transition-all duration-200 pointer-events-none z-30 transform translate-y-1 group-hover/badge:translate-y-0 whitespace-nowrap bg-dim text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-lg"
          >
            {{ badge.title }}
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dim" />
          </div>
        </div>

        <!-- Cloned Items for Seamless Infinite Loop -->
        <div
          v-for="badge in badges"
          :key="`c1-clone-${badge.id}`"
          aria-hidden="true"
          class="relative group/badge flex items-center justify-center shrink-0"
        >
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center p-2 transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:shadow-md cursor-pointer border-0"
          >
            <img
              :src="badge.image"
              :alt="badge.alt"
              class="max-w-full max-h-full object-contain filter drop-shadow-xs"
              loading="lazy"
            />
          </div>

          <div
            class="absolute bottom-full mb-1.5 opacity-0 group-hover/badge:opacity-100 transition-all duration-200 pointer-events-none z-30 transform translate-y-1 group-hover/badge:translate-y-0 whitespace-nowrap bg-dim text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-lg"
          >
            {{ badge.title }}
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dim" />
          </div>
        </div>
      </div>

      <!-- Column 2: Moves DOWN -->
      <div class="marquee-column flex flex-col gap-2.5 sm:gap-3 animate-marquee-down">
        <!-- Reverse order for visual variation -->
        <div
          v-for="badge in [...badges].reverse()"
          :key="`c2-${badge.id}`"
          class="relative group/badge flex items-center justify-center shrink-0"
        >
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center p-2 transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:shadow-md cursor-pointer border-0"
          >
            <img
              :src="badge.image"
              :alt="badge.alt"
              class="max-w-full max-h-full object-contain filter drop-shadow-xs"
              loading="lazy"
            />
          </div>

          <div
            class="absolute bottom-full mb-1.5 opacity-0 group-hover/badge:opacity-100 transition-all duration-200 pointer-events-none z-30 transform translate-y-1 group-hover/badge:translate-y-0 whitespace-nowrap bg-dim text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-lg"
          >
            {{ badge.title }}
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dim" />
          </div>
        </div>

        <!-- Cloned Items for Seamless Infinite Loop -->
        <div
          v-for="badge in [...badges].reverse()"
          :key="`c2-clone-${badge.id}`"
          aria-hidden="true"
          class="relative group/badge flex items-center justify-center shrink-0"
        >
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center p-2 transition-all duration-300 group-hover/badge:scale-110 group-hover/badge:shadow-md cursor-pointer border-0"
          >
            <img
              :src="badge.image"
              :alt="badge.alt"
              class="max-w-full max-h-full object-contain filter drop-shadow-xs"
              loading="lazy"
            />
          </div>

          <div
            class="absolute bottom-full mb-1.5 opacity-0 group-hover/badge:opacity-100 transition-all duration-200 pointer-events-none z-30 transform translate-y-1 group-hover/badge:translate-y-0 whitespace-nowrap bg-dim text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-lg"
          >
            {{ badge.title }}
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dim" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marqueeUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes marqueeDown {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-marquee-up {
  animation: marqueeUp 14s linear infinite;
}

.animate-marquee-down {
  animation: marqueeDown 14s linear infinite;
}

/* Pause ALL animation columns when hovering anywhere on the marquee container */
.marquee-container:hover .marquee-column {
  animation-play-state: paused !important;
}
</style>
