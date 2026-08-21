<script setup lang="ts">
import type { HeroContentProps } from '@/types/hero'

withDefaults(defineProps<HeroContentProps>(), {
  titlePrimary: 'سرمایه‌گذاری هوشمند و امن',
  titleSecondary: 'در فلزات، هر لحظه و هر کجا',
  descriptionLine1: 'سرمایه‌گذاری آنلاین و هوشمند با گرمی',
  descriptionLine2: 'خرید و فروش در هر ساعت از شبانه‌روز، با امکان تحویل فیزیکی',
  ctaText: 'شروع سرمایه‌گذاری',
  ctaLink: '/buy'
})

defineEmits<{
  (e: 'cta-click'): void
}>()
</script>

<template>
  <article class="w-full flex flex-col items-center text-center lg:items-start lg:text-right">
    <div class="max-w-[480px] flex flex-col items-center lg:items-start">
      <!-- Main Heading -->
      <h1 class="font-heading font-black text-2xl sm:text-3xl md:text-3xl lg:text-[40px] text-dim leading-snug sm:leading-tight lg:leading-[1.5] tracking-tight">
        <span class="block text-[36px] leading-[1.6]">{{ titlePrimary }}</span>
        <span class="block text-[36px] leading-[1.6]">{{ titleSecondary }}</span>
      </h1>

      <!-- Description Subtitle -->
      <p class="font-body text-xs sm:text-sm text-gray-dark font-medium leading-relaxed sm:leading-loose max-md:leading-relaxed mt-4 sm:mt-5 mb-8 sm:mb-10 text-pretty">
        <span class="block">{{ descriptionLine1 }}</span>
        <span class="block">{{ descriptionLine2 }}</span>
      </p>

      <!-- CTA Button Area -->
      <slot name="cta">
        <router-link
          v-if="ctaLink"
          :to="ctaLink"
          class="inline-flex items-center justify-center rounded-full bg-dim px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:bg-background-dark hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          @click="$emit('cta-click')"
        >
          {{ ctaText }}
        </router-link>
        <button
          v-else
          type="button"
          class="inline-flex items-center justify-center rounded-full bg-dim px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:bg-background-dark hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          @click="$emit('cta-click')"
        >
          {{ ctaText }}
        </button>
      </slot>
    </div>
  </article>
</template>
