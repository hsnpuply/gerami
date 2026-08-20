<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import MobileMenuSection from './MobileMenuSection.vue'
import { mainNavigation, rulesNavigation, supportNavigation } from './headerNavigation'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const activeSection = ref<string | null>(null)

function toggleSection(section: string) {
  activeSection.value = activeSection.value === section ? null : section
}

function closeMenu() {
  activeSection.value = null
  appStore.closeMobileMenu()
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div v-if="appStore.isMobileMenuOpen" id="mobile-menu" class="border-t border-gray-mid bg-white lg:hidden" role="navigation" aria-label="منوی موبایل">
      <AppContainer>
        <div class="space-y-1 py-4">
          <router-link
            v-for="link in mainNavigation"
            :key="link.to"
            :to="link.to"
            class="block rounded-lg px-3 py-2.5 text-[14px] leading-6 text-dim transition-colors duration-200 hover:text-primary"
            @click="closeMenu"
          >
            {{ link.label }}
          </router-link>

          <MobileMenuSection label="پشتیبانی" section="support" :active-section="activeSection" :links="supportNavigation" @toggle="toggleSection" @close="closeMenu" />
          <MobileMenuSection label="قوانین" section="rules" :active-section="activeSection" :links="rulesNavigation" @toggle="toggleSection" @close="closeMenu" />

          <div class="pt-4">
            <router-link to="/login" class="flex w-full items-center justify-center rounded-xl bg-dim px-4 py-3 text-base font-normal leading-6 text-white transition-colors duration-200 hover:bg-dim/90" @click="closeMenu">
              ورود یا ثبت‌نام
            </router-link>
          </div>
        </div>
      </AppContainer>
    </div>
  </Transition>
</template>
