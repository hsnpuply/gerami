<script setup lang="ts">
import { ref, computed } from "vue";
import AppContainer from "@/components/ui/AppContainer.vue";
import FaqItem from "./FaqItem.vue";
import type { FaqSectionConfig } from "@/types/faq";

const props = withDefaults(
  defineProps<{
    config?: Partial<FaqSectionConfig>;
  }>(),
  {},
);

const defaultConfig: FaqSectionConfig = {
  heading: "سوالات متداول",
  subtitle: "پرسش و پاسخ‌های متداول درباره گرمی",
  readMoreLabel: "مطالعه بیشتر",
  readMoreLink: "/faq",
  items: [
    {
      id: "what-is-gerami",
      question: "گرمی چیست و چه دارایی‌هایی در آن قابل معامله است؟",
      answer:
        "گرمی یک پلتفرم آنلاین برای سرمایه‌گذاری و معامله هوشمند فلزات گران‌بها است. در گرمی می‌توانید در ۲۴ ساعت شبانه‌روز و ۷ روز هفته، طلای ۱۸ عیار، نقره و مس را با قیمت‌های لحظه‌ای و واقعی بازار خرید و فروش کنید.",
    },
    {
      id: "trading-costs",
      question:
        "آیا معاملات طلا، نقره و مس در گرمی شامل اجرت، مالیات با هزینه‌های پنهان می‌شود؟",
      answer:
        "خیر، تمامی معاملات در گرمی بدون اجرت و مالیات اضافی انجام می‌شود. قیمت‌های نمایش‌داده‌شده همان قیمت‌های لحظه‌ای بازار واقعی هستند و هیچ هزینه پنهانی وجود ندارد.",
    },
    {
      id: "licenses-security",
      question:
        "آیا گرمی دارای مجوزهای رسمی است و امنیت سرمایه من چگونه تضمین می‌شود؟",
      answer:
        "بله، گرمی دارای مجوزهای رسمی از مراجع ذی‌صلاح است و تمامی فعالیت‌های آن تحت نظارت قانونی انجام می‌شود. امنیت سرمایه شما با استفاده از پروتکل‌های امنیتی پیشرفته و ذخیره‌سازی امن دارایی‌ها تضمین می‌شود.",
    },
    {
      id: "physical-delivery",
      question: "آیا امکان دریافت فیزیکی طلا، نقره و مس خریداری شده وجود دارد؟",
      answer:
        "بله، شما می‌توانید پس از خرید، درخواست تحویل فیزیکی دارایی خود را ثبت کنید. تحویل فیزیکی در شعبه حضوری گرمی انجام می‌شود و همراه با برگه اصالت و پست‌بندی مهر و موم‌شده خواهد بود.",
    },
    {
      id: "settlement-time",
      question: "پس از فروش دارایی، تسویه حساب و برداشت وجه چقدر زمان می‌برد؟",
      answer:
        "تسویه حساب پس از فروش دارایی به صورت آنی انجام می‌شود و وجه حاصل فوراً به کیف پول شما در گرمی واریز می‌گردد. برداشت وجه نیز در کوتاه‌ترین زمان ممکن امکان‌پذیر است.",
    },
    {
      id: "minimum-investment",
      question:
        "حداقل مبلغ برای شروع سرمایه‌گذاری در گرمی چقدر است و چگونه ثبت‌نام کنم؟",
      answer:
        "شما می‌توانید سرمایه‌گذاری در گرمی را با حداقل مبلغ کمی شروع کنید. برای ثبت‌نام کافی است وارد وب‌سایت یا اپلیکیشن گرمی شوید، فرایند احراز هویت را تکمیل کنید و سپس اقدام به خرید نمایید.",
    },
  ],
};

const cfg = computed<FaqSectionConfig>(() => ({
  ...defaultConfig,
  ...props.config,
  items: props.config?.items ?? defaultConfig.items,
}));

const openId = ref<string | null>(null);

function toggle(id: string) {
  openId.value = openId.value === id ? null : id;
}

/** Split items into two columns for the desktop grid */
const half = computed(() => Math.ceil(cfg.value.items.length / 2));
const columnRight = computed(() => cfg.value.items.slice(0, half.value));
const columnLeft = computed(() => cfg.value.items.slice(half.value));

const emit = defineEmits<{
  (e: "read-more-click"): void;
}>();
</script>

<template>
  <section class="bg-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
    <AppContainer>
      <!-- ========================================
           Section Header
           ======================================== -->
      <div class="mb-10 sm:mb-12 text-center">
        <h2
          class="font-heading font-extrabold text-2xl md:text-3xl text-dim mb-4 leading-[1.6]"
        >
          {{ cfg.heading }}
        </h2>
        <p class="font-body text-sm text-gray-dark font-medium">
          {{ cfg.subtitle }}
        </p>
      </div>

      <!-- ========================================
           Desktop: 2-Column Grid
           ======================================== -->
      <div class="hidden md:flex flex-row gap-x-10 mb-10">
        <!-- Right Column (RTL) -->
        <div class="flex-1 flex flex-col">
          <FaqItem
            v-for="item in columnRight"
            :key="item.id"
            :item="item"
            :is-open="openId === item.id"
            @toggle="toggle(item.id)"
          />
        </div>

        <!-- Left Column (RTL) -->
        <div class="flex-1 flex flex-col">
          <FaqItem
            v-for="item in columnLeft"
            :key="item.id"
            :item="item"
            :is-open="openId === item.id"
            @toggle="toggle(item.id)"
          />
        </div>
      </div>

      <!-- ========================================
           Mobile: Single Column
           ======================================== -->
      <div class="flex md:hidden flex-col mb-10">
        <FaqItem
          v-for="item in cfg.items"
          :key="`m-${item.id}`"
          :item="item"
          :is-open="openId === item.id"
          @toggle="toggle(item.id)"
        />
      </div>

      <!-- ========================================
           Read More Button
           ======================================== -->
      <div class="flex justify-center">
        <a
          :href="cfg.readMoreLink"
          class="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-dim transition-all duration-300 hover:bg-[#ffc107] hover:text-white hover:scale-[1.05]"
          @click.prevent="$emit('read-more-click')"
        >
          {{ cfg.readMoreLabel }}
        </a>
      </div>
    </AppContainer>
  </section>
</template>
