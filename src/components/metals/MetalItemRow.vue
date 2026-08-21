<script setup lang="ts">
import type { MetalItem } from '@/types/metals'
import MetalVisualCard from './MetalVisualCard.vue'
import MetalDetails from './MetalDetails.vue'

defineProps<{
  metal: MetalItem
}>()

defineEmits<{
  (e: 'cta-click', metal: MetalItem): void
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-between gap-10 lg:gap-16"
    :class="[
      metal.visualSide === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
    ]"
  >
    <!-- 1. Text & Details Column -->
    <div class="w-full lg:w-1/2 flex justify-center lg:justify-start">
      <MetalDetails :metal="metal" @cta-click="$emit('cta-click', $event)" />
    </div>

    <!-- 2. Visual / Canvas Card Column -->
    <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
      <MetalVisualCard :metal="metal">
        <!-- Re-expose Grid Background Slot -->
        <template #grid-background="slotProps">
          <slot name="grid-background" v-bind="slotProps" />
        </template>

        <!-- Re-expose 3D Canvas Slot -->
        <template #canvas="slotProps">
          <slot name="canvas" v-bind="slotProps" />
        </template>
      </MetalVisualCard>
    </div>
  </div>
</template>
