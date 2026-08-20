<script setup lang="ts">
import type { NavigationLink } from './headerNavigation'

defineProps<{
  label: string
  links: NavigationLink[]
  isOpen: boolean
}>()

const emit = defineEmits<{
  open: []
  close: []
  toggle: []
}>()
</script>

<template>
  <div class="relative" @mouseenter="emit('open')" @mouseleave="emit('close')">
    <button
      type="button"
      class="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] leading-6 text-dim transition-colors duration-[var(--default-transition-duration)] hover:text-primary"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      @click="emit('toggle')"
    >
      {{ label }}
      <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 top-full z-50 mt-1 w-48 rounded-xl border border-gray-mid bg-white py-2 shadow-lg"
        role="menu"
        @mouseenter="emit('open')"
        @mouseleave="emit('close')"
      >
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block px-4 py-2.5 text-[14px] leading-6 text-dim transition-colors duration-[var(--default-transition-duration)] hover:bg-gray-light/60 hover:text-primary"
          role="menuitem"
          @click="emit('close')"
        >
          {{ link.label }}
        </router-link>
      </div>
    </Transition>
  </div>
</template>