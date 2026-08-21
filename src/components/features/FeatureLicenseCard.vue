<script setup lang="ts">
import type { LicenseBadgeItem } from '@/types/features'
import LicenseMarquee from './LicenseMarquee.vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    badges: LicenseBadgeItem[]
  }>(),
  {
    title: 'دارای مجوزها و نمادهای رسمی',
    description: 'تمامی فعالیت‌های گرمی تحت مجوزهای معتبر انجام می‌شود و امنیت معاملات شما تضمین شده است.'
  }
)
</script>

<template>
  <div
    class="border-solid rounded-xl transition-all duration-300 p-5 sm:p-6 relative border-white text-dim bg-background-light h-full min-h-[210px] sm:min-h-[230px] overflow-hidden max-md:p-4 border-2 shadow-xs hover:shadow-md select-none"
  >
    <div class="flex flex-row items-stretch justify-between h-full gap-3 sm:gap-6">
      <!-- Side 1 (Right in RTL): Title, Description & Top Icon -->
      <div class="flex-1 flex flex-col justify-between items-start text-right min-w-0 z-10">
        <!-- Top Icon -->
        <div
          class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-dim text-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm shrink-0"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
        </div>

        <!-- Content Area -->
        <div class="mt-auto">
          <h3 class="font-heading font-bold text-sm sm:text-base lg:text-lg text-dim mb-1.5 sm:mb-2 leading-snug">
            {{ title }}
          </h3>
          <p class="font-body text-xs sm:text-sm text-gray-dark font-medium leading-relaxed">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Side 2 (Left in RTL): 2-Column Vertical Scrolling License Marquee -->
      <div
        class="w-[140px] sm:w-[180px] lg:w-[210px] shrink-0 h-full max-h-[190px] sm:max-h-[200px] my-auto flex items-center justify-center relative overflow-hidden"
      >
        <LicenseMarquee :badges="badges" />
      </div>
    </div>
  </div>
</template>
