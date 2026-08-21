<script setup lang="ts">
import type { MetalItem } from '@/types/metals'

defineProps<{
  metal: MetalItem
}>()

defineEmits<{
  (e: 'cta-click', metal: MetalItem): void
}>()
</script>

<template>
  <div class="flex flex-col items-start text-right max-sm:items-center max-sm:text-center w-full max-w-[520px]">
    <!-- 1. Top Pill Badge -->
    <div
      class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-heading font-medium mb-4 sm:mb-5 transition-colors select-none"
      :style="{
        backgroundColor: metal.theme.badgeBg,
        borderColor: metal.theme.badgeBorder,
        color: metal.theme.badgeTextColor
      }"
    >
      <span>{{ metal.badgeText }}</span>
      <!-- Metal Badge Icon -->
      <svg
        class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" v-if="false" />
        <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm3 2v10h10V7H7zm2 2h6v6H9V9z" />
      </svg>
    </div>

    <!-- 2. Heading (Exact 28px) -->
    <h2
      class="font-heading font-black text-[24px] sm:text-[28px] text-dim leading-snug sm:leading-[1.4] mb-3 sm:mb-4 tracking-tight"
    >
      {{ metal.title }}
    </h2>

    <!-- 3. Description (Exact 14px) -->
    <p
      class="font-body text-[14px] text-gray-dark font-normal leading-[1.8] mb-6 sm:mb-8 text-pretty"
    >
      {{ metal.description }}
    </p>

    <!-- 4. Feature Checklist with Colored Circles -->
    <ul class="space-y-3 sm:space-y-3.5 w-full mb-7 sm:mb-8 list-none p-0 m-0">
      <li
        v-for="(feature, index) in metal.features"
        :key="index"
        class="flex items-center gap-3 text-dim font-heading font-medium text-[13px] sm:text-[14px] max-sm:justify-center"
      >
        <!-- Circular Checkmark Icon -->
        <span
          class="w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full flex items-center justify-center shrink-0 text-white shadow-xs"
          :style="{ backgroundColor: metal.theme.checkmarkBg }"
        >
          <svg
            class="w-3 h-3 sm:w-3.5 sm:h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </span>

        <!-- Feature Text -->
        <span class="leading-normal">{{ feature }}</span>
      </li>
    </ul>

    <!-- 5. Action Pill Button -->
    <router-link
      v-if="metal.ctaLink"
      :to="metal.ctaLink"
      class="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#f0f1f3] hover:bg-[#e4e6ea] active:bg-[#dbdde2] text-dim font-heading font-medium text-[14px] transition-all duration-200 hover:shadow-xs group/btn select-none"
      @click="$emit('cta-click', metal)"
    >
      <svg
        class="w-4 h-4 transition-transform duration-200 group-hover/btn:-translate-x-0.5 text-dim/70"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.2"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <span>{{ metal.ctaText }}</span>
    </router-link>
    <button
      v-else
      type="button"
      class="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#f0f1f3] hover:bg-[#e4e6ea] active:bg-[#dbdde2] text-dim font-heading font-medium text-[14px] transition-all duration-200 hover:shadow-xs group/btn select-none"
      @click="$emit('cta-click', metal)"
    >
      <svg
        class="w-4 h-4 transition-transform duration-200 group-hover/btn:-translate-x-0.5 text-dim/70"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.2"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <span>{{ metal.ctaText }}</span>
    </button>
  </div>
</template>
