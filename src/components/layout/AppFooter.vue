<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import { mainNavigation, rulesNavigation, supportNavigation } from './headerNavigation'
import { useFeatures } from '@/composables/useFeatures'

const { licenseBadges } = useFeatures()
const phone = '02191009090'
const email = 'info@gerami.com'

const footerLinks = [
  { title: 'دسترسی سریع', links: mainNavigation },
  { title: 'پشتیبانی و قوانین', links: [...supportNavigation, ...rulesNavigation] },
]
</script>

<template>
  <footer class="bg-dim text-white" aria-labelledby="footer-title">
    <AppContainer>
      <h2 id="footer-title" class="sr-only">اطلاعات و لینک‌های گرمی</h2>

      <div class="grid gap-3 border-b border-white/10 py-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 lg:py-9">
        <a
          :href="`tel:${phone}`"
          class="group flex min-h-26 items-center justify-between gap-4 rounded-xl border border-white/15 bg-[#0d1010] px-5 py-5 transition-colors duration-200 hover:border-primary/60 hover:bg-[#111515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dim"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-black">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.02l-2.21 2.21Z" />
              </svg>
            </span>
            <span class="min-w-0">
              <strong class="block font-heading text-base font-bold text-white">ارتباط با پشتیبانی</strong>
              <span class="mt-1 block truncate font-body text-xs leading-6 text-white/60">پشتیبانی گرمی همیشه در دسترس شماست</span>
            </span>
          </span>
          <svg class="h-5 w-5 shrink-0 text-white/80 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" />
          </svg>
        </a>

        <router-link
          to="/download"
          class="group flex min-h-26 items-center justify-between gap-4 rounded-xl border border-white/15 bg-[#0d1010] px-5 py-5 transition-colors duration-200 hover:border-primary/60 hover:bg-[#111515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dim"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v12h10V5H7Zm5 15.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
              </svg>
            </span>
            <span class="min-w-0">
              <strong class="block font-heading text-base font-bold text-white">دانلود اپلیکیشن موبایل</strong>
              <span class="mt-1 block truncate font-body text-xs leading-6 text-white/60">اپلیکیشن موبایل برای دسترسی و معامله آسان و سریع</span>
            </span>
          </span>
          <svg class="h-5 w-5 shrink-0 text-white/80 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6" />
          </svg>
        </router-link>
      </div>

      <div class="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr] lg:gap-14 lg:py-12">
        <div class="lg:order-3">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-black">
              <span class="font-heading text-2xl font-black leading-none">گ</span>
            </span>
            <span class="font-heading text-2xl font-black">گرمی</span>
          </div>
          <p class="max-w-130 font-body text-sm font-medium leading-8 text-white/70">
            گرمی، پلتفرم سرمایه‌گذاری آنلاین در طلا، نقره و مس است که با ارائه دسترسی سریع از طریق اپلیکیشن اختصاصی، انجام معاملات بر مبنای قیمت لحظه‌ای بازار و حذف چالش‌های مراجعه حضوری را ممکن می‌کند.
          </p>
          <div class="mt-7 space-y-3 font-body text-sm font-medium text-white/75">
            <a href="https://maps.google.com/?q=Almas+Karim+Khan+Complex+Tehran" target="_blank" rel="noopener noreferrer" class="flex items-start gap-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <svg class="mt-1 h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
              <span>تهران، کریمخان، تقاطع حافظ، مجتمع الماس کریمخان، طبقه همکف حافظ، پلاک ۱۲۷ و ۱۲۹</span>
            </a>
            <div class="flex flex-wrap gap-x-5 gap-y-2">
              <a :href="`tel:${phone}`" class="flex items-center gap-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><span aria-hidden="true">☎</span><span dir="ltr">۰۲۱۹۱۰۰۹۰۹۰</span></a>
              <a :href="`mailto:${email}`" class="flex items-center gap-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><span aria-hidden="true">✉</span>{{ email }}</a>
            </div>
          </div>
        </div>

        <nav v-for="group in footerLinks" :key="group.title" class="lg:order-2" :aria-label="group.title">
          <h3 class="mb-4 font-heading text-base font-bold text-white">{{ group.title }}</h3>
          <ul class="space-y-3">
            <li v-for="link in group.links" :key="link.to">
              <router-link :to="link.to" class="font-body text-sm font-medium text-white/65 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{{ link.label }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="lg:order-1">
          <h3 class="mb-4 font-heading text-base font-bold text-white">مجوزها و نمادهای رسمی</h3>
          <div class="flex flex-wrap gap-2">
            <a v-for="badge in licenseBadges" :key="badge.id" :href="badge.link || '#licenses'" class="flex h-18 w-18 items-center justify-center rounded-lg border border-white/10 bg-[#0d1010] p-2 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" :aria-label="badge.alt">
              <img :src="badge.image" :alt="badge.alt" class="max-h-full max-w-full object-contain" loading="lazy" />
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col-reverse gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="font-body text-xs font-medium leading-6 text-white/55">تمامی حقوق مادی و معنوی برای وب‌سایت گرمی محفوظ می‌باشد.</p>
        <div class="flex items-center gap-4" aria-label="شبکه‌های اجتماعی">
          <a href="#instagram" aria-label="اینستاگرام گرمی" class="text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">◎</a>
          <a href="#linkedin" aria-label="لینکدین گرمی" class="text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">in</a>
          <a href="#telegram" aria-label="تلگرام گرمی" class="text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">➤</a>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>
