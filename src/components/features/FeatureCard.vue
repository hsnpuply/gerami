<script setup lang="ts">
import type { FeatureItem } from '@/types/features'

defineProps<{
  feature: FeatureItem
}>()
</script>

<template>
  <div
    class="border-solid rounded-xl transition-all duration-300 p-5 sm:p-6 relative border-white text-dim bg-background-light h-full min-h-[210px] sm:min-h-[230px] overflow-hidden max-md:p-4 border-2 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between group select-none"
  >
    <!-- Top Icon Badge -->
    <div
      class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-dim text-white flex items-center justify-center shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <!-- Guarantee / Authenticity Icon -->
      <svg
        v-if="feature.iconName === 'guarantee'"
        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
      </svg>

      <!-- Fee / Percent Icon -->
      <svg
        v-else-if="feature.iconName === 'fee'"
        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <!-- Delivery / Box Icon -->
      <svg
        v-else-if="feature.iconName === 'delivery'"
        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>

      <!-- Lightning / Instant Trade Icon -->
      <svg
        v-else-if="feature.iconName === 'lightning'"
        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>

      <!-- 24/7 Support Icon -->
      <svg
        v-else-if="feature.iconName === 'support'"
        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>

      <!-- Wallet Icon -->
      <svg
        v-else-if="feature.iconName === 'wallet'"
        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
        />
      </svg>

      <!-- Chart / Trend Icon -->
      <svg
        v-else
        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        />
      </svg>
    </div>

    <!-- Content Area -->
    <div class="mt-auto">
      <h3 class="font-heading font-bold text-sm sm:text-base lg:text-lg text-dim mb-1.5 sm:mb-2 leading-snug">
        {{ feature.title }}
      </h3>
      <p class="font-body text-xs sm:text-sm text-gray-dark font-medium leading-relaxed">
        {{ feature.description }}
      </p>
    </div>
  </div>
</template>
