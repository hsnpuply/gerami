<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import type { PhysicalDeliveryConfig } from '@/types/physicalDelivery'

const props = withDefaults(
  defineProps<{
    config?: Partial<PhysicalDeliveryConfig>
  }>(),
  {}
)

const defaultConfig: PhysicalDeliveryConfig = {
  badgeText: 'تحویل فیزیکی',
  heading: 'تحویل فیزیکی در شعبه حضوری همراه با برگه اصالت',
  subtitle: 'اصالت',
  features: [
    { id: 'online-request', label: 'ثبت درخواست تحویل آنلاین' },
    { id: 'in-person-receipt', label: 'دریافت حضوری با پست ویژه' },
    { id: 'authenticity-cert', label: 'همراه با برگه اصالت' },
    { id: 'sealed-packaging', label: 'پست‌بندی مهر و موم‌شده' },
  ],
  map: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1677!2d51.389!3d35.698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzUyLjgiTiA1McKwMjMnMjAuNCJF!5e0!3m2!1sen!2sir!4v1700000000000',
    openUrl:
      'https://www.google.com/maps/place/Almas+Karim+Khan+Complex',
    alt: 'موقعیت شعبه حضوری گرمی روی نقشه',
  },
  address: {
    title: 'آدرس شعبه حضوری',
    lines: [
      'تهران، کریمخان، تقاطع حافظ، مجتمع الماس کریمخان، طبقه همکف، حافظ، پلاک ۱۲۹ و ۱۲۷',
    ],
  },
}

const cfg = computed<PhysicalDeliveryConfig>(() => ({
  ...defaultConfig,
  ...props.config,
  features: props.config?.features ?? defaultConfig.features,
  map: { ...defaultConfig.map, ...props.config?.map },
  address: { ...defaultConfig.address, ...props.config?.address },
}))

const hasRightImage = computed(() => !!cfg.value.imageRight)
const hasLeftImage = computed(() => !!cfg.value.imageLeft)
</script>

<template>
  <section class="relative overflow-hidden py-12 sm:py-16 lg:py-24">
    <AppContainer>
      <!-- ================================================================
           Decorative Images — Desktop only (absolutely positioned)
           ================================================================ -->

      <!-- Right decorative image -->
      <div
        v-if="hasRightImage"
        class="absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-16 xl:-right-24 max-md:hidden pointer-events-none select-none"
      >
        <div
          class="w-[180px] lg:w-[240px] xl:w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg rotate-[-4deg] hover:rotate-[-2deg] transition-transform duration-500"
        >
          <img
            :src="cfg.imageRight!"
            :alt="cfg.imageRightAlt ?? 'تصویر تزئینی'"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Left decorative image -->
      <div
        v-if="hasLeftImage"
        class="absolute top-1/2 -translate-y-1/2 -left-8 lg:-left-16 xl:-left-24 max-md:hidden pointer-events-none select-none"
      >
        <div
          class="w-[180px] lg:w-[240px] xl:w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg rotate-[4deg] hover:[2deg] transition-transform duration-500"
        >
          <img
            :src="cfg.imageLeft!"
            :alt="cfg.imageLeftAlt ?? 'تصویر تزئینی'"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- ================================================================
           Main Card
           ================================================================ -->
      <div
        class="mx-auto w-full max-w-[600px] border-solid rounded-3xl border-2 border-white bg-white text-dim overflow-hidden shadow-sm"
      >
        <!-- ----------------------------------------------------------
             Header: Badge + Heading + Subtitle
             ---------------------------------------------------------- -->
        <div
          class="mb-10 sm:!text-center sm:!items-center max-w-[500px] mx-auto w-full flex flex-col"
        >
          <!-- Badge -->
          <div class="fadeUp flex justify-center mb-4">
            <span
              class="inline-flex items-center gap-2 rounded-full bg-background-mid px-4 py-1.5 text-xs font-medium text-dim"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <span>{{ cfg.badgeText }}</span>
            </span>
          </div>

          <!-- Heading -->
          <h2
            class="fadeUp font-heading font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-dim leading-snug tracking-tight"
            style="--fadeup-delay: 80ms"
          >
            {{ cfg.heading }}
          </h2>

          <!-- Subtitle -->
          <p
            class="fadeUp font-heading font-bold text-xl sm:text-2xl text-dim mt-3"
            style="--fadeup-delay: 160ms"
          >
            {{ cfg.subtitle }}
          </p>
        </div>

        <!-- ----------------------------------------------------------
             Features Checklist (2-col grid on desktop, stacked mobile)
             ---------------------------------------------------------- -->
        <div class="fadeUp mb-10" style="--fadeup-delay: 240ms">
          <!-- Desktop: 2 columns (RTL) -->
          <div class="hidden sm:grid grid-cols-2 gap-x-8 gap-y-4">
            <div
              v-for="feature in cfg.features"
              :key="feature.id"
              class="flex items-center justify-end gap-3"
            >
              <span class="font-body text-sm text-dim font-medium whitespace-nowrap">
                {{ feature.label }}
              </span>
              <span
                class="shrink-0 w-6 h-6 rounded-full bg-dim text-white flex items-center justify-center"
              >
                <svg
                  class="w-3.5 h-3.5"
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
              </span>
            </div>
          </div>

          <!-- Mobile: stacked rows -->
          <div class="flex sm:hidden flex-col gap-3 px-1">
            <div
              v-for="feature in cfg.features"
              :key="`m-${feature.id}`"
              class="flex items-center justify-between"
            >
              <span class="font-body text-sm text-dim font-medium">
                {{ feature.label }}
              </span>
              <span
                class="shrink-0 w-6 h-6 rounded-full bg-dim text-white flex items-center justify-center"
              >
                <svg
                  class="w-3.5 h-3.5"
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
              </span>
            </div>
          </div>
        </div>

        <!-- ----------------------------------------------------------
             Google Maps Embed
             ---------------------------------------------------------- -->
        <div class="fadeUp px-4 sm:px-6 mb-6" style="--fadeup-delay: 320ms">
          <div
            class="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-mid"
          >
            <iframe
              :src="cfg.map.embedUrl"
              :title="cfg.map.alt ?? 'نقشه موقعیت شعبه'"
              width="100%"
              height="100%"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
              class="absolute inset-0"
            />

            <!-- Open in Maps overlay link -->
            <a
              :href="cfg.map.openUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary-dark text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-white transition-colors duration-200"
            >
              <span>Open in Maps</span>
              <svg
                class="w-3 h-3"
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
            </a>
          </div>
        </div>

        <!-- ----------------------------------------------------------
             Address Card
             ---------------------------------------------------------- -->
        <div
          class="fadeUp mx-4 sm:mx-6 mb-6 rounded-2xl border border-gray-mid/60 bg-background-light p-5 sm:p-6"
          style="--fadeup-delay: 400ms"
        >
          <div class="flex items-start gap-3">
            <!-- Map Pin Icon -->
            <span
              class="shrink-0 w-9 h-9 rounded-full bg-dim/5 text-dim flex items-center justify-center mt-0.5"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
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
            </span>

            <div class="flex-1 min-w-0">
              <h3 class="font-heading font-bold text-base sm:text-lg text-dim mb-1.5">
                {{ cfg.address.title }}
              </h3>
              <p
                class="font-body text-sm text-gray-dark font-medium leading-relaxed"
              >
                {{ cfg.address.lines.join('، ') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* ---------------------------------------------------------------
   Fade-up entrance animation (matches original codebase pattern)
   --------------------------------------------------------------- */
.fadeUp {
  opacity: 0;
  transform: translateY(var(--fadeup-distance, 32px));
  animation: fadeUpAnim var(--fadeup-duration, 700ms)
    var(--fadeup-delay, 0ms) cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
}

@keyframes fadeUpAnim {
  from {
    opacity: 0;
    transform: translateY(var(--fadeup-distance, 32px));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
