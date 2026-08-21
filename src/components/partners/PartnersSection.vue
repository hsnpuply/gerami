<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import type { PartnersSectionConfig } from '@/types/partners'
import coinKifpoolImg from '@/assets/images/partners/coin-kifpool.png'
import coinAsamImg from '@/assets/images/partners/coin-asam.png'
import partnerBgFrameImg from '@/assets/images/partners/partner-bg-frame.png'

const props = withDefaults(
  defineProps<{
    config?: Partial<PartnersSectionConfig>
  }>(),
  {}
)

const defaultConfig: PartnersSectionConfig = {
  badgeText: 'شرکای تجاری',
  title: 'در کنار بهترین‌ها، برای تجربه‌ای امن و پایدار',
  subtitle: 'ما باور داریم همکاری با حرفه‌ای‌ها، پایه‌ی اطمینان شماست.',
  backgroundColor: '#050606',
  partners: [
    {
      id: 'asam',
      name: 'گروه نرم‌افزاری آسام',
      domain: 'asam.company',
      url: 'https://asam.company',
      description:
        'با همراهی آسام، تمام فرآیندهای فنی، سرورها و خدمات پشتیبانی به‌صورت شبانه‌روزی پایش می‌شوند تا کاربران گرمی تجربه‌ای روان و بدون دغدغه داشته باشند.',
      coinImage: coinAsamImg,
      coinAlt: 'سکه گروه نرم‌افزاری آسام',
      coinPosition: 'left',
      stats: [
        { value: '+۱۵۰', label: 'وب‌سایت پشتیبانی شده' },
        { value: '+۳۰,۰۰۰,۰۰۰', label: 'ترافیک روزانه سایت ها' }
      ]
    },
    {
      id: 'kifpool',
      name: 'صرافی کیف پول من',
      domain: 'kifpool.me',
      url: 'https://kifpool.me',
      description:
        'همکاری گرمی با مجموعه کیف پول من امکان انجام تراکنش‌ها و تسویه‌حساب‌های امن و سریع را برای کاربران فراهم کرده تا مسیر خرید و فروش به ساده‌ترین شکل ممکن انجام شود.',
      coinImage: coinKifpoolImg,
      coinAlt: 'سکه صرافی کیف پول من',
      coinPosition: 'right',
      stats: [
        { value: '+۱,۵۰۰,۰۰۰', label: 'کاربر فعال' },
        { value: '+۳۰۰,۰۰۰,۰۰۰', label: 'تراکنش انجام شده' }
      ]
    }
  ]
}

const cfg = computed<PartnersSectionConfig>(() => ({
  ...defaultConfig,
  ...props.config,
  partners: props.config?.partners ?? defaultConfig.partners
}))
</script>

<template>
  <section
    id="partners-section"
    class="relative py-16 md:py-24 lg:py-28 overflow-hidden select-none"
    :style="{ backgroundColor: cfg.backgroundColor }"
  >
    <!-- Background polygon frame / grid overlay -->
    <div
      class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-35 mix-blend-screen"
      aria-hidden="true"
    >
      <img
        :src="partnerBgFrameImg"
        alt=""
        class="w-full max-w-[1280px] h-auto object-contain scale-105 md:scale-100 transform"
      />
    </div>

    <!-- Ambient radial glow behind the cards -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-primary/[0.035] blur-[120px] rounded-full pointer-events-none"
      aria-hidden="true"
    />

    <AppContainer custom-class="relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col items-center text-center mb-12 md:mb-16">
        <!-- Shield Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c0e10]/90 border border-white/10 text-gray-300 text-xs md:text-sm font-medium shadow-inner backdrop-blur-sm hover:border-white/20 transition-colors"
        >
          <!-- Shield Icon -->
          <svg
            class="w-4 h-4 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2ZM10.2 16.2L6.7 12.7L8.12 11.28L10.2 13.36L15.88 7.68L17.3 9.1L10.2 16.2Z"
            />
          </svg>
          <span>{{ cfg.badgeText }}</span>
        </div>

        <!-- Heading -->
        <h2
          class="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white mt-4 mb-3 tracking-tight"
        >
          {{ cfg.title }}
        </h2>

        <!-- Subtitle -->
        <p class="text-gray-400 text-sm sm:text-base font-normal max-w-xl">
          {{ cfg.subtitle }}
        </p>
      </div>

      <!-- Partners Grid -->
      <div class="relative max-w-[960px] mx-auto">
        <!-- Left Floating Coin (Behind Asam Card) -->
        <div
          class="hidden lg:block absolute -left-16 xl:-left-20 top-1/2 -translate-y-1/2 w-48 xl:w-56 pointer-events-none z-0 coin-float-left"
          aria-hidden="true"
        >
          <img
            :src="coinAsamImg"
            alt="Asam Coin"
            class="w-full h-auto drop-shadow-[0_15px_30px_rgba(255,193,7,0.18)]"
          />
        </div>

        <!-- Right Floating Coin (Behind Kifpool Card) -->
        <div
          class="hidden lg:block absolute -right-16 xl:-right-20 top-1/2 -translate-y-1/2 w-48 xl:w-56 pointer-events-none z-0 coin-float-right"
          aria-hidden="true"
        >
          <img
            :src="coinKifpoolImg"
            alt="Kifpool Coin"
            class="w-full h-auto drop-shadow-[0_15px_30px_rgba(255,193,7,0.18)]"
          />
        </div>

        <!-- Cards Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          <div
            v-for="partner in cfg.partners"
            :key="partner.id"
            class="group relative rounded-2xl bg-[#0b0d0e]/85 backdrop-blur-md border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#0e1012] transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 md:p-8 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,193,7,0.08)] cursor-pointer"
          >
            <!-- Card Header: Arrow Link Icon & Logo Slot/Placeholder -->
            <div class="flex items-center justify-between mb-5">
              <!-- Redirect Arrow Icon (Turns Golden on Hover) -->
              <a
                v-if="partner.url"
                :href="partner.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-primary transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
                :aria-label="`مشاهده وب‌سایت ${partner.name}`"
              >
                <svg
                  class="w-5 h-5 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
              <div v-else class="w-9 h-9" />

              <!-- Company Logo Badge / Placeholder Slot -->
              <div
                class="w-11 h-11 rounded-full bg-[#15181b] border border-white/10 flex items-center justify-center overflow-hidden transition-colors group-hover:border-white/25"
              >
                <slot :name="`${partner.id}-icon`">
                  <slot name="partner-icon" :partner="partner">
                    <!-- Clean Placeholder Icon (User can replace or use slot) -->
                    <div
                      class="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-white transition-colors"
                    >
                      <svg
                        class="w-5 h-5 opacity-70"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                  </slot>
                </slot>
              </div>
            </div>

            <!-- Card Content: Name, Domain, Description -->
            <div class="text-center mb-6">
              <h3 class="font-heading font-bold text-lg sm:text-xl text-white mb-1">
                {{ partner.name }}
              </h3>
              <span class="inline-block text-xs sm:text-sm text-gray-400 font-mono tracking-wider">
                {{ partner.domain }}
              </span>
              <p
                class="mt-4 text-xs sm:text-sm text-gray-300/85 leading-relaxed text-justify sm:text-center line-clamp-4"
              >
                {{ partner.description }}
              </p>
            </div>

            <!-- Mobile Coin representation (Shown below description only on mobile/tablet) -->
            <div class="lg:hidden flex justify-center my-3" aria-hidden="true">
              <img
                :src="partner.coinImage"
                :alt="partner.coinAlt"
                class="w-24 h-24 object-contain coin-float-mobile"
              />
            </div>

            <!-- Card Divider -->
            <div class="border-t border-white/[0.08] pt-5 mt-auto">
              <!-- Card Stats Grid -->
              <div class="grid grid-cols-2 gap-4 text-center">
                <!-- Stat 1 -->
                <div class="flex flex-col items-center justify-center">
                  <span class="font-heading font-bold text-base sm:text-lg lg:text-xl text-white">
                    {{ partner.stats[1]?.value }}
                  </span>
                  <span class="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                    {{ partner.stats[1]?.label }}
                  </span>
                </div>

                <!-- Stat 2 -->
                <div class="flex flex-col items-center justify-center border-r border-white/[0.08]">
                  <span class="font-heading font-bold text-base sm:text-lg lg:text-xl text-white">
                    {{ partner.stats[0]?.value }}
                  </span>
                  <span class="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                    {{ partner.stats[0]?.label }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Smooth Floating Animation for Coins */
@keyframes floatLeftCoin {
  0% {
    transform: translateY(-50%) translate3d(0, -6px, 0) rotate(-2deg);
  }
  50% {
    transform: translateY(-50%) translate3d(0, 10px, 0) rotate(3deg);
  }
  100% {
    transform: translateY(-50%) translate3d(0, -6px, 0) rotate(-2deg);
  }
}

@keyframes floatRightCoin {
  0% {
    transform: translateY(-50%) translate3d(0, 8px, 0) rotate(3deg);
  }
  50% {
    transform: translateY(-50%) translate3d(0, -10px, 0) rotate(-3deg);
  }
  100% {
    transform: translateY(-50%) translate3d(0, 8px, 0) rotate(3deg);
  }
}

@keyframes floatMobile {
  0% {
    transform: translateY(0px) rotate(-1deg);
  }
  50% {
    transform: translateY(6px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(-1deg);
  }
}

.coin-float-left {
  animation: floatLeftCoin 6.5s ease-in-out infinite;
  will-change: transform;
}

.coin-float-right {
  animation: floatRightCoin 5.8s ease-in-out infinite;
  will-change: transform;
}

.coin-float-mobile {
  animation: floatMobile 4.5s ease-in-out infinite;
  will-change: transform;
}
</style>
