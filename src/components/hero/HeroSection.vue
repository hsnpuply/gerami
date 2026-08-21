<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import HeroContent from './HeroContent.vue'
import HeroVisual from './HeroVisual.vue'
import { useHeroPrices } from '@/composables/useHeroPrices'
import type { MetalPriceItem, HeroContentProps } from '@/types/hero'

interface HeroSectionProps extends HeroContentProps {
  prices?: MetalPriceItem[]
  videoSrc?: string
  posterSrc?: string
}

const props = withDefaults(defineProps<HeroSectionProps>(), {
  titlePrimary: 'سرمایه‌گذاری هوشمند و امن',
  titleSecondary: 'در فلزات، هر لحظه و هر کجا',
  descriptionLine1: 'سرمایه‌گذاری آنلاین و هوشمند با گرمی',
  descriptionLine2: 'خرید و فروش در هر ساعت از شبانه‌روز، با امکان تحویل فیزیکی',
  ctaText: 'شروع سرمایه‌گذاری',
  ctaLink: '/buy',
  videoSrc: '',
  posterSrc: ''
})

defineEmits<{
  (e: 'cta-click'): void
}>()

const { prices: defaultPrices } = useHeroPrices()
const activePrices = props.prices || defaultPrices.value
</script>

<template>
  <section class="relative overflow-hidden py-8 sm:py-12 lg:py-6">
    <AppContainer>
      <div
        class="flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-8 w-full"
      >
        <!-- Content Side (Top on Mobile, Right side in RTL Desktop) -->
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <slot name="content">
            <HeroContent
              :title-primary="titlePrimary"
              :title-secondary="titleSecondary"
              :description-line1="descriptionLine1"
              :description-line2="descriptionLine2"
              :cta-text="ctaText"
              :cta-link="ctaLink"
              @cta-click="$emit('cta-click')"
            >
              <template #cta>
                <slot name="cta" />
              </template>
            </HeroContent>
          </slot>
        </div>

        <!-- Visual / Video Side (Bottom on Mobile, Left side in RTL Desktop) -->
        <div class="w-full lg:w-1/2 flex justify-center">
          <slot name="visual">
            <HeroVisual
              :prices="activePrices"
              :video-src="videoSrc"
              :poster-src="posterSrc"
            >
              <template #video>
                <slot name="video" />
              </template>
            </HeroVisual>
          </slot>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
