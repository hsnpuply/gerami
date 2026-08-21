<script setup lang="ts">
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import AppContainer from '@/components/ui/AppContainer.vue'
import enamadImg from '@/assets/images/licenses/enamad.png'
import goldUnionImg from '@/assets/images/licenses/gold-union.png'
import samandehiImg from '@/assets/images/licenses/samandehi.png'
import coinAsamImg from '@/assets/images/partners/coin-asam.png'
import coinKifpoolImg from '@/assets/images/partners/coin-kifpool.png'
import type { LicenseBadgeItem } from '@/types/features'

interface LicensesSectionConfig {
  heading: string
  subtitle: string
  viewAllLabel: string
  viewAllLink: string
  ctaHeading: string
  ctaDescription: string
  ctaButtonLabel: string
  ctaButtonLink: string
  badges: LicenseBadgeItem[]
}

const props = withDefaults(
  defineProps<{
    config?: Partial<LicensesSectionConfig>
  }>(),
  {}
)

const defaultBadges: LicenseBadgeItem[] = [
  {
    id: 'enamad',
    title: 'اینماد',
    subtitle: 'نماد اعتماد الکترونیکی',
    image: enamadImg,
    alt: 'اینماد - نماد اعتماد الکترونیکی کسب‌وکارهای اینترنتی',
  },
  {
    id: 'gold-union',
    title: 'اتحادیه طلا و جواهر',
    subtitle: 'مجوز رسمی اتحادیه طلا، نقره و سکه',
    image: goldUnionImg,
    alt: 'مجوز رسمی اتحادیه صنف طلا، جواهر، نقره و سکه',
  },
  {
    id: 'samandehi',
    title: 'نظام صنفی رایانه‌ای',
    subtitle: 'عضویت رسمی سازمان نصر',
    image: samandehiImg,
    alt: 'نماد عضویت در سازمان نظام صنفی رایانه‌ای کشور',
  },
  {
    id: 'coin-asam',
    title: 'گروه نرم‌افزاری آسام',
    image: coinAsamImg,
    alt: 'گروه نرم‌افزاری آسام',
  },
  {
    id: 'coin-kifpool',
    title: 'صرافی کیف پول من',
    image: coinKifpoolImg,
    alt: 'صرافی کیف پول من',
  },
]

const defaultConfig: Omit<LicensesSectionConfig, 'badges'> & { badges: LicenseBadgeItem[] } = {
  heading: 'مجوزهای گرمی',
  subtitle: 'اعتماد شما ارزشمندترین دارایی ماست.',
  viewAllLabel: 'مشاهده مجوزها',
  viewAllLink: '/licenses',
  ctaHeading: 'برای سرمایه‌گذاری آماده‌اید؟',
  ctaDescription:
    'گرمی؛ سکویی امن و ساده خرید و فروش لحظه‌ای طلا، نقره و مس با امکان تحویل فیزیکی',
  ctaButtonLabel: 'ورود به پلت خرید و فروش',
  ctaButtonLink: '/buy',
  badges: defaultBadges,
}

const cfg = computed(() => ({
  ...defaultConfig,
  ...props.config,
  badges: props.config?.badges ?? defaultConfig.badges,
}))

const swiperModules = [Autoplay, FreeMode]

const emit = defineEmits<{
  (e: 'view-all-click'): void
  (e: 'cta-click'): void
}>()
</script>

<template>
  <section class="bg-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
    <AppContainer>
      <!-- =============================================
           Desktop Layout (lg+): Static Row
           ============================================= -->
      <div class="hidden lg:block">
        <!-- Header Row: Title Right / Button Left -->
        <div class="flex items-center justify-between mb-10">
          <div class="text-right">
            <h2
              class="font-heading font-extrabold text-3xl xl:text-[34px] text-dim leading-snug tracking-tight mb-2"
            >
              {{ cfg.heading }}
            </h2>
            <p class="font-body text-sm text-gray-dark font-medium">
              {{ cfg.subtitle }}
            </p>
          </div>

          <a
            :href="cfg.viewAllLink"
            class="inline-flex items-center justify-center rounded-full border border-gray-mid/60 bg-white px-6 py-2.5 text-sm font-semibold text-dim transition-all duration-200 hover:bg-gray-light hover:border-gray-mid active:scale-[0.98] shrink-0"
            @click.prevent="$emit('view-all-click')"
          >
            {{ cfg.viewAllLabel }}
          </a>
        </div>

        <!-- Logos Row: Static centered grid -->
        <div class="flex items-center justify-center gap-10 xl:gap-14">
          <div
            v-for="badge in cfg.badges"
            :key="`desktop-${badge.id}`"
            class="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
            :title="badge.title"
          >
            <div
              class="w-16 h-16 xl:w-[72px] xl:h-[72px] flex items-center justify-center"
            >
              <img
                :src="badge.image"
                :alt="badge.alt"
                class="max-w-full max-h-full object-contain filter drop-shadow-xs"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- =============================================
           Mobile & Tablet Layout (below lg): Marquee
           ============================================= -->
      <div class="block lg:hidden">
        <!-- Header -->
        <div class="text-center mb-6">
          <h2
            class="font-heading font-extrabold text-2xl sm:text-3xl text-dim leading-snug tracking-tight mb-2"
          >
            {{ cfg.heading }}
          </h2>
          <p class="font-body text-xs sm:text-sm text-gray-dark font-medium">
            {{ cfg.subtitle }}
          </p>
        </div>

        <!-- Infinite Marquee Logos -->
        <div
          class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] py-2 mb-6 select-none"
        >
          <!-- Fade edges -->
          <div
            class="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none z-10"
          />
          <div
            class="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-white/70 to-transparent pointer-events-none z-10"
          />

          <Swiper
            :modules="swiperModules"
            :slides-per-view="3"
            :space-between="24"
            :loop="true"
            :speed="4000"
            :free-mode="{ enabled: true, momentum: false }"
            :autoplay="{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
            :grab-cursor="true"
            :breakpoints="{
              480: { slidesPerView: 4, spaceBetween: 28 },
              640: { slidesPerView: 5, spaceBetween: 32 },
            }"
            class="w-full"
          >
            <SwiperSlide
              v-for="(badge, idx) in [...cfg.badges, ...cfg.badges, ...cfg.badges]"
              :key="`m-${badge.id}-${idx}`"
              class="!flex items-center justify-center"
            >
              <div
                class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
                :title="badge.title"
              >
                <img
                  :src="badge.image"
                  :alt="badge.alt"
                  class="max-w-full max-h-full object-contain filter drop-shadow-xs"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- View All Button (Mobile) -->
        <div class="flex justify-center">
          <a
            :href="cfg.viewAllLink"
            class="inline-flex items-center justify-center rounded-full border border-gray-mid/60 bg-white px-6 py-2.5 text-sm font-semibold text-dim transition-all duration-200 hover:bg-gray-light hover:border-gray-mid active:scale-[0.98]"
            @click.prevent="$emit('view-all-click')"
          >
            {{ cfg.viewAllLabel }}
          </a>
        </div>
      </div>

      <!-- =============================================
           CTA Card
           ============================================= -->
      <div
        class="mt-12 sm:mt-16 rounded-3xl bg-background-mid relative overflow-hidden"
      >
        <div
          class="relative z-10 flex flex-col items-center text-center py-12 sm:py-16 lg:py-20 px-6 sm:px-10"
        >
          <!-- Heading -->
          <h2
            class="font-heading font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-dim leading-snug tracking-tight mb-4"
          >
            {{ cfg.ctaHeading }}
          </h2>

          <!-- Description -->
          <p
            class="font-body text-sm sm:text-base text-gray-dark font-medium leading-relaxed max-w-lg mb-8"
          >
            {{ cfg.ctaDescription }}
          </p>

          <!-- CTA Button -->
          <a
            :href="cfg.ctaButtonLink"
            class="inline-flex items-center justify-center rounded-full bg-dim px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-background-dark hover:shadow-md active:scale-[0.98]"
            @click.prevent="$emit('cta-click')"
          >
            {{ cfg.ctaButtonLabel }}
          </a>
        </div>

        <!-- Decorative geometric shapes (matching screenshot background) -->
        <div
          class="absolute top-4 right-4 w-24 h-24 sm:w-32 sm:h-32 bg-white/30 rounded-2xl rotate-12 pointer-events-none"
          aria-hidden="true"
        />
        <div
          class="absolute bottom-4 left-4 w-20 h-20 sm:w-28 sm:h-28 bg-white/25 rounded-2xl -rotate-6 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
</style>
