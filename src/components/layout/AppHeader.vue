<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import AppContainer from '@/components/ui/AppContainer.vue'
import DesktopNavigation from './DesktopNavigation.vue'
import HeaderLogo from './HeaderLogo.vue'
import MobileMenu from './MobileMenu.vue'

const appStore = useAppStore()
</script>

<template>
  <header class="sticky right-0 top-0 z-50 border-b border-gray-mid bg-white/95 backdrop-blur-[96px]">
    <AppContainer>
      <div class="flex items-center justify-between py-3">
        <HeaderLogo @click="appStore.closeMobileMenu()" />
        <DesktopNavigation />

        <div class="hidden items-center lg:flex">
          <router-link to="/login" class="flex h-10 items-center justify-center rounded-full bg-dim px-5 text-sm font-medium text-white transition-all hover:scale-[1.05] hover:bg-background-dark">
            ورود یا ثبت‌نام
          </router-link>
        </div>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-dim transition-colors duration-200 hover:bg-gray-light lg:hidden"
          :aria-expanded="appStore.isMobileMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="appStore.isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'"
          @click="appStore.toggleMobileMenu()"
        >
          <svg v-if="!appStore.isMobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </AppContainer>

    <MobileMenu />
  </header>
</template>
