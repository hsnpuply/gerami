<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { FaqItem } from '@/types/faq'

const props = defineProps<{
  item: FaqItem
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const contentRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)

function updateHeight() {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight
  }
}

watch(
  () => props.isOpen,
  async () => {
    await nextTick()
    updateHeight()
  },
)
</script>

<template>
  <div
    class="border-b border-gray-mid/50 transition-all duration-300"
  >
    <!-- Question Row -->
    <div
      class="flex items-center justify-between py-8 cursor-pointer pb-4 select-none"
      role="button"
      :aria-expanded="isOpen"
      @click="emit('toggle')"
    >
      <span
        class="font-heading font-semibold text-dim text-sm sm:text-base leading-relaxed pr-1"
      >
        {{ item.question }}
      </span>

      <!-- Toggle Icon -->
      <span
        class="shrink-0 w-8 h-8 flex items-center justify-center transition-transform duration-300"
        :class="isOpen ? 'rotate-0' : 'rotate-0'"
      >
        <!-- Minus when open -->
        <svg
          v-if="isOpen"
          class="w-5 h-5 text-dim transition-all duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h14"
          />
        </svg>

        <!-- Plus when closed -->
        <svg
          v-else
          class="w-5 h-5 text-dim transition-all duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </span>
    </div>

    <!-- Answer Body (animated collapse) -->
    <div
      ref="contentRef"
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :style="{
        maxHeight: isOpen ? `${contentHeight}px` : '0px',
        opacity: isOpen ? 1 : 0,
      }"
    >
      <p
        class="text-sm text-gray-dark font-medium transition-all leading-relaxed pb-8 pr-1"
      >
        {{ item.answer }}
      </p>
    </div>
  </div>
</template>
