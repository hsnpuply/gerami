<script setup lang="ts">
import { computed, ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import type { PhysicalDeliveryConfig } from '@/types/physicalDelivery'
import manBranchImg from '@/assets/images/delivery/man-branch.png'
import suitPinImg from '@/assets/images/delivery/suit-pin.png'

const props = withDefaults(
  defineProps<{
    config?: Partial<PhysicalDeliveryConfig>
  }>(),
  {}
)

const defaultConfig: PhysicalDeliveryConfig = {
  badgeText: 'تحویل فیزیکی',
  heading: 'تحویل فیزیکی در شعبه حضوری همراه با برگه اصالت',
  features: [
    { id: 'online-request', label: 'ثبت درخواست تحویل از پنل' },
    { id: 'in-person-receipt', label: 'دریافت حضوری یا پست ویژه' },
    { id: 'authenticity-cert', label: 'همراه با برگه اصالت' },
    { id: 'sealed-packaging', label: 'بسته‌بندی مهر و موم‌شده' },
  ],
  map: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.967676643668!2d51.41725517658097!3d35.70241037803622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e01726a5757d5%3A0xe54d5b272ec22ee!2sAlmas%20Karim%20Khan%20Complex!5e0!3m2!1sen!2sir!4v1710000000000',
    openUrl:
      'https://maps.google.com/?q=Almas+Karim+Khan+Complex+Tehran',
    routingUrl:
      'https://nshn.ir',
    alt: 'موقعیت شعبه حضوری گرمی روی نقشه',
  },
  address: {
    title: 'آدرس شعبه حضوری',
    lines: [
      'تهران، کریمخان، تقاطع حافظ، مجتمع الماس کریمخان، طبقه همکف حافظ، پلاک ۱۲۷ و ۱۲۹',
    ],
    workingHours: 'شنبه تا چهارشنبه: ۱۰:۰۰ الی ۱۸:۰۰ | پنجشنبه: ۱۰:۰۰ الی ۱۴:۰۰',
  },
  imageLeft: manBranchImg,
  imageLeftAlt: 'شعبه حضوری تحویل فیزیکی طلا گرمی',
  imageRight: suitPinImg,
  imageRightAlt: 'اصالت و ضمانت رسمی گرمی',
}

const cfg = computed<PhysicalDeliveryConfig>(() => ({
  ...defaultConfig,
  ...props.config,
  features: props.config?.features ?? defaultConfig.features,
  map: { ...defaultConfig.map, ...props.config?.map },
  address: { ...defaultConfig.address, ...props.config?.address },
  imageLeft: props.config?.imageLeft ?? defaultConfig.imageLeft,
  imageRight: props.config?.imageRight ?? defaultConfig.imageRight,
  imageLeftAlt: props.config?.imageLeftAlt ?? defaultConfig.imageLeftAlt,
  imageRightAlt: props.config?.imageRightAlt ?? defaultConfig.imageRightAlt,
}))

// Copy address feedback state
const copied = ref(false)
const copyAddress = async () => {
  const fullAddress = cfg.value.address.lines.join('، ')
  try {
    await navigator.clipboard.writeText(fullAddress)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch {
    // Fallback if clipboard API is restricted
    const el = document.createElement('textarea')
    el.value = fullAddress
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}
</script>

<template>
  <section
    class="relative py-16 sm:py-20 lg:py-10 overflow-hidden bg-background-light"
    aria-labelledby="physical-delivery-title"
  >
    <!-- Ambient Background Radial Glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-[#FFF9E6]/60 via-[#FDF3D6]/30 to-transparent blur-3xl pointer-events-none -z-10 rounded-full"
      aria-hidden="true"
    />

    <AppContainer custom-class="relative">
      <div class="relative w-full max-w-[750px] mx-auto">
        <!-- ================================================================
             Left Floating Polaroid/Photo (Desktop: xl and up)
             In RTL layout: Visual left side
             ================================================================ -->
        <div
          v-if="cfg.imageLeft"
          class="hidden xl:block absolute top-1/2 -translate-y-[80%] -left-[240px] 2xl:-left-[360px] z-0 select-none group"
        >
          <div
            class="w-[220px] 2xl:w-[329px] p-2.5 sm:p-3 pb-6 sm:pb-7 rounded-2xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-gray-mid/60 rotate-[-6deg] group-hover:rotate-[-2deg] group-hover:scale-105 transition-all duration-500 ease-out cursor-pointer"
          >
            <div class="w-full rounded-xl overflow-hidden bg-gray-mid relative shadow-inner">
              <img
                :src="cfg.imageLeft"
                :alt="cfg.imageLeftAlt ?? 'شعبه حضوری گرمی'"
                class="w-[329px] h-[239px] border-[12px] border-solid border-white shadow-delivery-img object-cover object-center"
                loading="lazy"
              />
              <div
                class="absolute w-full h-full inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        <!-- ================================================================
             Right Floating Polaroid/Photo (Desktop: xl and up)
             In RTL layout: Visual right side
             ================================================================ -->
        <div
          v-if="cfg.imageRight"
          class="hidden xl:block absolute top-1/2 -translate-y-[0%] -right-[240px] 2xl:-right-[380px] z-0 select-none group"
        >
          <div
            class="w-[220px] 2xl:w-[350px] p-2.5 sm:p-3 pb-6 sm:pb-7 rounded-2xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-gray-mid/60 rotate-[6deg] group-hover:rotate-[2deg] group-hover:scale-105 transition-all duration-500 ease-out cursor-pointer"
          >
            <div class="w-full rounded-xl overflow-hidden bg-gray-mid relative shadow-inner">
              <img
                :src="cfg.imageRight"
                :alt="cfg.imageRightAlt ?? 'اصالت طلا گرمی'"
                class="w-[329px] h-[239px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        <!-- ================================================================
             Main Center Card
             ================================================================ -->
        <div
          class="relative z-10 w-full rounded-3xl sm:rounded-[32px] bg-white border border-gray-mid/80 shadow-[0_12px_45px_-10px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.03)] p-5 sm:p-8 lg:p-9 transition-all duration-300"
        >
          <!-- ------------------------------------------------------------
               1. Header: Badge & Heading
               ------------------------------------------------------------ -->
          <div class="flex flex-col items-center text-center max-w-[500px] mx-auto mb-6 sm:mb-8">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF9E6] border border-[#FEEFBD] shadow-xs text-xs sm:text-sm font-heading font-semibold text-[#8B6E16] mb-4 select-none"
            >
              <svg
                class="w-4 h-4 text-[#FFC107] fill-current shrink-0"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"
                />
              </svg>
              <span>{{ cfg.badgeText }}</span>
            </div>

            <!-- Heading -->
            <h2
              id="physical-delivery-title"
              class="font-heading font-black text-[22px] sm:text-[26px] lg:text-[28px] text-dim leading-snug sm:leading-[1.35] tracking-tight"
            >
              {{ cfg.heading }}
            </h2>
          </div>

          <!-- ------------------------------------------------------------
               2. Features Checklist
               ------------------------------------------------------------ -->
          <!-- Desktop & Tablet (Pill style tags grid) -->
          <div class="hidden sm:flex flex-wrap items-center justify-center gap-3 lg:gap-8 mb-7">
            <div
              v-for="feature in cfg.features"
              :key="feature.id"
              class="inline-flex items-center gap-4 px-3.5 py-3.5 rounded-xl bg-[#F8F8F8] border border-gray-mid/60 text-dim hover:bg-white hover:border-primary/40 hover:shadow-xs transition-all duration-200 select-none"
            >
            <span
              class="w-5 h-5 rounded-full bg-[#242424] text-white flex items-center justify-center shrink-0 shadow-xs"
            >
              <svg
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </span>
              <span class="font-body text-xs lg:text-sm font-semibold text-dim">
                {{ feature.label }}
              </span>
            </div>
          </div>

          <!-- Mobile (Stacked Clean Row Cards) -->
          <div class="flex sm:hidden flex-col gap-2.5 mb-6">
            <div
              v-for="feature in cfg.features"
              :key="`mobile-${feature.id}`"
              class="flex items-center justify-between p-3 rounded-xl bg-[#F8F8F8] border border-gray-mid/60 transition-colors"
            >
              <span class="font-body text-xs font-semibold text-dim">
                {{ feature.label }}
              </span>
              <span
                class="w-5 h-5 rounded-full bg-[#242424] text-white flex items-center justify-center shrink-0 shadow-xs"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
            </div>
          </div>

          <!-- ------------------------------------------------------------
               3. Google Maps Embed with Overlay Controls
               ------------------------------------------------------------ -->
          <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-mid border border-gray-mid/70 shadow-inner group mb-5">
            <iframe
              :src="cfg.map.embedUrl"
              :title="cfg.map.alt ?? 'نقشه موقعیت شعبه حضوری'"
              width="100%"
              height="100%"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
              class="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.01]"
            />

            <!-- Top Floating Button: Open in Google Maps -->
            <a
              :href="cfg.map.openUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-dim text-xs font-bold px-3 py-1.5 rounded-xl shadow-md border border-gray-mid/60 hover:bg-white hover:text-primary-dark transition-all duration-200 active:scale-95"
            >
              <svg
                class="w-3.5 h-3.5 text-primary-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              <span>Open in Maps</span>
            </a>

            <!-- Bottom Floating Quick Location Badge -->
            <div
              class="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xs text-[11px] font-medium text-gray-dark select-none"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>شعبه کریمخان (تهران)</span>
            </div>
          </div>

          <!-- ------------------------------------------------------------
               4. Address & Branch Details Card
               ------------------------------------------------------------ -->
          <div
            class="rounded-2xl border border-gray-mid/70 bg-[#FBFBF9] p-4 sm:p-5 transition-all duration-200 hover:border-gray-mid hover:shadow-xs"
          >
            <div class="flex items-start gap-3 sm:gap-4">
              <!-- Location Pin Icon -->
              <div
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary-dark flex items-center justify-center shrink-0 mt-0.5"
              >
                <svg
                  class="w-5 h-5 sm:w-5.5 sm:h-5.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>

              <!-- Content & Copy Action -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <h3 class="font-heading font-black text-sm sm:text-base text-dim">
                    {{ cfg.address.title }}
                  </h3>

                  <!-- Copy Address Button -->
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 text-[11px] font-bold text-gray-dark hover:text-dim hover:bg-gray-mid/50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                    :title="copied ? 'کپی شد' : 'کپی آدرس'"
                    @click="copyAddress"
                  >
                    <svg
                      v-if="!copied"
                      class="w-3.5 h-3.5 text-gray-dark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-3.5 h-3.5 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span :class="copied ? 'text-emerald-600 font-bold' : ''">
                      {{ copied ? 'کپی شد!' : 'کپی آدرس' }}
                    </span>
                  </button>
                </div>

                <!-- Address Line -->
                <p class="font-body text-xs sm:text-sm text-gray-dark font-medium leading-relaxed mb-2">
                  {{ cfg.address.lines.join('، ') }}
                </p>

                <!-- Working Hours (if available) -->
                <div
                  v-if="cfg.address.workingHours"
                  class="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-dark/90 font-medium pt-1.5 border-t border-gray-mid/40"
                >
                  <svg
                    class="w-3.5 h-3.5 text-amber-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span>{{ cfg.address.workingHours }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================================================================
             Mobile / Tablet Image Gallery Strip (Visible below xl)
             Shows the high-end imagery gracefully on smaller viewports
             ================================================================ -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4 mt-6 xl:hidden">
          <!-- Left Photo Card -->
          <div
            class="p-2 sm:p-2.5 pb-4 sm:pb-5 rounded-2xl bg-white shadow-sm border border-gray-mid/60 rotate-[-2deg] transition-transform"
          >
            <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-gray-mid">
              <img
                :src="cfg.imageLeft"
                :alt="cfg.imageLeftAlt ?? 'شعبه حضوری گرمی'"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p class="font-body text-[10px] sm:text-xs font-semibold text-center text-gray-dark mt-2">
              شعبه حضوری گرمی
            </p>
          </div>

          <!-- Right Photo Card -->
          <div
            class="p-2 sm:p-2.5 pb-4 sm:pb-5 rounded-2xl bg-white shadow-sm border border-gray-mid/60 rotate-[2deg] transition-transform"
          >
            <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-gray-mid">
              <img
                :src="cfg.imageRight"
                :alt="cfg.imageRightAlt ?? 'اصالت طلا گرمی'"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p class="font-body text-[10px] sm:text-xs font-semibold text-center text-gray-dark mt-2">
              تضمین اصالت و برگه معتبر
            </p>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Smooth rendering enhancements */
img {
  content-visibility: auto;
}
</style>
