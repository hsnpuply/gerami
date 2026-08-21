<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import FeatureCard from './FeatureCard.vue'
import FeatureLicenseCard from './FeatureLicenseCard.vue'
import MobileFeaturesSlider from './MobileFeaturesSlider.vue'
import MobileLicensesBar from './MobileLicensesBar.vue'
import { useFeatures } from '@/composables/useFeatures'
import type { FeatureItem, LicenseBadgeItem } from '@/types/features'

interface FeaturesSectionProps {
  customFeatures?: FeatureItem[]
  customBadges?: LicenseBadgeItem[]
  title?: string
}

const props = defineProps<FeaturesSectionProps>()

const { features: defaultFeatures, licenseBadges: defaultBadges } = useFeatures()

const activeFeatures = computed(() => props.customFeatures || defaultFeatures.value)
const activeBadges = computed(() => props.customBadges || defaultBadges.value)

// Single feature cards for the mobile slider (excluding the double card)
const mobileSliderFeatures = computed(() =>
  activeFeatures.value.filter((item) => !item.isDouble)
)
</script>

<template>
  <section class="bg-background-mid py-10 sm:py-14 lg:py-16 relative overflow-hidden">
    <AppContainer>
      <!-- ========================================
           Desktop Layout (lg and above)
           ======================================== -->
      <div class="hidden lg:flex flex-wrap -m-2">
        <template v-for="item in activeFeatures" :key="item.id">
          <!-- Card 3: Large Double Card with License Marquee (lg:w-1/2 w-full) -->
          <div
            v-if="item.isDouble"
            class="p-2 lg:w-1/2 w-full"
          >
            <FeatureLicenseCard
              :title="item.title"
              :description="item.description"
              :badges="activeBadges"
            />
          </div>

          <!-- Standard Feature Card (p-2 lg:w-1/4 w-1/2) -->
          <div
            v-else
            class="p-2 lg:w-1/4 w-1/2"
          >
            <FeatureCard :feature="item" />
          </div>
        </template>
      </div>

      <!-- ========================================
           Mobile & Tablet Layout (below lg)
           ======================================== -->
      <div class="block lg:hidden">
        <!-- 1. Features Horizontal Slider with Pagination Dots -->
        <MobileFeaturesSlider :features="mobileSliderFeatures" />

        <!-- 2. Official Licenses Bar with "مشاهده <" Link and Logos Row -->
        <MobileLicensesBar :badges="activeBadges" />
      </div>
    </AppContainer>
  </section>
</template>
