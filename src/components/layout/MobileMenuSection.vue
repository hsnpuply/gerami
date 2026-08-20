<script setup lang="ts">
import type { NavigationLink } from './headerNavigation'

defineProps<{
  label: string
  section: string
  activeSection: string | null
  links: NavigationLink[]
}>()

const emit = defineEmits<{
  toggle: [section: string]
  close: []
}>()
</script>

<template>
  <div class="pt-2">
    <button
      type="button"
      class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[14px] leading-6 text-dim transition-colors duration-(--default-transition-duration) hover:text-primary"
      :aria-expanded="activeSection === section"
      @click="emit('toggle', section)"
    >
      <span>{{ label }}</span>
      <span class="text-lg leading-none" aria-hidden="true">{{ activeSection === section ? '−' : '+' }}</span>
    </button>
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-40"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 max-h-40"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="activeSection === section" class="overflow-hidden pr-4">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block py-1.5 text-[13px] leading-6 text-gray-dark transition-colors duration-(--default-transition-duration) hover:text-primary"
          @click="emit('close')"
        >
          {{ link.label }}
        </router-link>
      </div>
    </Transition>
  </div>
</template>