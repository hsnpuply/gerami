<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import supportPortrait from '@/assets/images/delivery/man-branch.png'
import supportDetail from '@/assets/images/delivery/suit-pin.png'

const supportPhone = '02191009090'
</script>

<template>
  <section
    class="relative overflow-hidden bg-background-light py-10 sm:py-14 lg:py-16"
    aria-labelledby="support-title"
  >
    <AppContainer>
      <div
        class="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-white/80 bg-white px-5 py-8 shadow-[0_16px_50px_-24px_rgba(25,20,8,0.2)] sm:px-8 sm:py-10 lg:min-h-59 lg:flex-row lg:items-center lg:gap-8 lg:px-10 lg:py-9"
      >
        <div
          class="pointer-events-none absolute -left-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#fff8df] blur-3xl"
          aria-hidden="true"
        />

        <div class="relative flex shrink-0 items-center justify-center lg:order-1 lg:w-30">
          <div class="relative h-21 w-23 sm:h-24 sm:w-26.5">
            <div
              class="absolute right-0 top-0 h-16.5 w-16.5 overflow-hidden rounded-full border-4 border-white bg-[#e8ece7] shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:h-19 sm:w-19"
            >
              <img
                :src="supportPortrait"
                alt="کارشناس پشتیبانی گرمی"
                class="h-full w-full object-cover object-[center_20%]"
                loading="lazy"
              />
            </div>
            <div
              class="absolute bottom-0 left-0 h-14.5 w-14.5 overflow-hidden rounded-full border-4 border-white bg-[#30312f] shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:h-16.5 sm:w-16.5"
            >
              <img
                :src="supportDetail"
                alt="جزئیات نشان طلایی گرمی"
                class="h-full w-full object-cover object-[52%_42%]"
                loading="lazy"
              />
            </div>
            <span
              class="absolute -bottom-2 right-1/2 translate-x-1/2 text-2xl leading-none text-primary drop-shadow-[0_3px_2px_rgba(222,166,0,0.2)]"
              aria-hidden="true"
            >
              ◆
            </span>
          </div>
        </div>

        <div class="relative order-2 min-w-0 flex-1 text-center lg:text-right">
          <h2
            id="support-title"
            class="font-heading text-[22px] font-black leading-[1.55] text-dim sm:text-[26px] lg:text-[27px]"
          >
            پشتیبانی گرمی همیشه در دسترس شماست.
          </h2>
          <p class="mx-auto mt-2 max-w-162.5 font-body text-sm font-medium leading-8 text-gray-dark sm:text-[15px] lg:mx-0 lg:mt-1">
            تیم پشتیبانی گرمی به‌صورت ۲۴ ساعته و در تمام روزهای هفته آماده پاسخگویی به سوالات و درخواست‌های شماست تا تجربه‌ای مطمئن و بدون دغدغه از خرید و فروش داشته باشید.
          </p>
          <div class="mt-4 flex items-center justify-center gap-2 font-body text-sm font-semibold text-gray-dark lg:justify-start">
            <svg class="h-5 w-5 shrink-0 text-[#5d594f]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.02l-2.21 2.21Z" />
            </svg>
            <span>شماره تماس:</span>
            <a
              :href="`tel:${supportPhone}`"
              class="text-dim underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary-dark focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              dir="ltr"
            >
              ۰۲۱۹۱۰۰۹۰۹۰
            </a>
          </div>
        </div>

        <a
          :href="`tel:${supportPhone}`"
          class="relative order-3 inline-flex min-h-14 w-full shrink-0 items-center justify-center rounded-full bg-black px-7 font-heading text-base font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)] transition-[transform,background-color] duration-200 hover:bg-[#202020] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:w-auto lg:order-3 lg:min-w-37"
        >
          ارتباط با پشتیبانی
        </a>
      </div>
    </AppContainer>
  </section>
</template>
