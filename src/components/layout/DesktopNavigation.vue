<script setup lang="ts">
import HeaderDropdown from './HeaderDropdown.vue'
import { mainNavigation, rulesNavigation, supportNavigation } from './headerNavigation'
import { useHeaderMenu } from './useHeaderMenu'

const { activeDropdown, openDropdown, closeDropdown, closeDropdownWithDelay } = useHeaderMenu()

function toggleDropdown(name: string) {
  if (activeDropdown.value === name) closeDropdown()
  else openDropdown(name)
}
</script>

<template>
  <nav class="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
    <router-link
      v-for="link in mainNavigation"
      :key="link.to"
      :to="link.to"
      class="rounded-lg px-3 py-2 text-[14px] leading-6 text-dim transition-colors duration-[var(--default-transition-duration)] hover:text-primary"
    >
      {{ link.label }}
    </router-link>
    <HeaderDropdown
      label="پشتیبانی"
      :links="supportNavigation"
      :is-open="activeDropdown === 'support'"
      @open="openDropdown('support')"
      @close="closeDropdownWithDelay"
      @toggle="toggleDropdown('support')"
    />
    <HeaderDropdown
      label="قوانین"
      :links="rulesNavigation"
      :is-open="activeDropdown === 'rules'"
      @open="openDropdown('rules')"
      @close="closeDropdownWithDelay"
      @toggle="toggleDropdown('rules')"
    />
  </nav>
</template>