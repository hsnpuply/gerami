<script setup lang="ts">
import { ref, computed } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import type { AboutSectionConfig } from '@/types/about'

const props = withDefaults(
  defineProps<{
    config?: Partial<AboutSectionConfig>
  }>(),
  {}
)

const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const defaultConfig: AboutSectionConfig = {
  title: 'معرفی پلتفرم گرمی',
  introText:
    'در دنیای پرنوسان اقتصاد امروز، حفظ ارزش سرمایه و یافتن بازارهای امن برای سرمایه‌گذاری به یکی از دغدغه‌های اصلی افراد تبدیل شده است. پلتفرم «گرمی» یک بستر نوین، هوشمند و کاملاً آنلاین است که امکان خرید و فروش دیجیتال فلزات ارزشمندی مانند طلا، نقره و مس را برای تمامی افراد جامعه فراهم کرده است. در گرمی، شما بدون نیاز به درگیری با چالش‌های خرید سنتی، مراجعه حضوری به بازار یا نگرانی از بابت نگهداری فیزیکی دارایی‌ها، می‌توانید با هر میزان سرمایه‌ای وارد بازار فلزات شوید و آینده مالی خود را ایمن کنید.',
  philosophyTitle: 'فلسفه‌ی گرمی چیست',
  philosophyText:
    'فلسفه اصلی گرمی بر پایه «توسعه دسترسی عمومی به سرمایه‌گذاری امن» بنا شده است. ما معتقدیم که ورود به بازارهای پربازده فلزات گرانبها و صنعتی نباید در انحصار سرمایه‌های کلان باشد. گرمی با حذف واسطه‌ها و دیجیتالی کردن فرآیند خرید کالا، این امکان را فراهم کرده تا هر فردی بتواند حتی با مبالغ خرد، دارایی‌های ارزشمندی را به صورت آنلاین خریداری کند. هدف ما ایجاد شفافیت، رفع موانع سنتی بازار و ساختن یک سپر تورمی قدرتمند برای تک‌تک اعضای جامعه است.',
  licensesTitle: 'مجوزها و تأییدیه‌های گرمی',
  licensesText:
    'اعتماد، پایه و اساس هر سرمایه‌گذاری است. پلتفرم گرمی با طی کردن تمامی مراحل قانونی و حقوقی، بستری کاملاً امن و رگوله شده را برای کاربران خود تدارک دیده است. این پلتفرم تحت نظارت نهادهای ذیربط فعالیت می‌کند و با دریافت تأییدیه‌های معتبر از جمله نماد اعتماد الکترونیک (اینماد)، مجوزهای نظام صنفی رایانه‌ای، تأییدیه‌های انجمن فین‌تک و نهادهای ناظر بر تجارت الکترونیک، تضمین می‌کند که تمامی معاملات در چارچوبی قانونی، شفاف و با حفظ کامل حقوق مصرف‌کننده انجام می‌پذیرد.',
  assetsTitle: 'در گرمی چه دارایی‌هایی می‌توان معامله کرد؟',
  assetsDescription:
    'گرمی به صورت تخصصی روی خرید و فروش دیجیتال و آنلاین سه فلز استراتژیک تمرکز دارد:',
  assets: [
    {
      title: 'طلای دیجیتال',
      linkText: 'خرید طلا',
      url: 'https://gerami.com/gold/',
      description:
        'طلا شناخته‌شده‌ترین ابزار حفظ ارزش در طول تاریخ است که همواره به عنوان یک دارایی امن (Safe Haven) در برابر تورم و نوسانات اقتصادی مورد توجه سرمایه‌گذاران بوده است و شما می‌توانید با انتخاب گزینه خرید طلا در پلتفرم گرمی، مالکیت طلای خالص را به صورت کاملاً آنلاین و امن در حساب کاربری خود ثبت و مدیریت کنید، بدون آنکه نگران اجرت ساخت، هزینه حمل‌ونقل یا نگهداری فیزیکی آن باشید.',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      accentColor: 'border-r-4 border-r-amber-500'
    },
    {
      title: 'نقره دیجیتال',
      linkText: 'خرید نقره',
      url: 'https://gerami.com/silver/',
      description:
        'فلزی گرانبها با تاریخی غنی از حفظ ارزش و پتانسیل رشد بالا در بازارهای جهانی است. با انتخاب گزینه خرید نقره در پلتفرم گرمی، شما می‌توانید موجودی این فلز ارزشمند را به صورت کاملاً آنلاین و امن در حساب کاربری خود مدیریت کنید و از نوسانات قیمتی آن سود ببرید، بدون اینکه نیازی به اجاره صندوق امانات داشته باشید.',
      badgeColor: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
      accentColor: 'border-r-4 border-r-slate-400'
    },
    {
      title: 'مس دیجیتال',
      linkText: 'خرید مس',
      url: 'https://gerami.com/copper/',
      description:
        'یک فلز صنعتی به شدت پرکاربرد و استراتژیک که با توجه به توسعه تکنولوژی و نیاز روزافزون صنایع جهانی به زیرساخت‌های الکترونیکی، ارزش سرمایه‌گذاری بسیار بالایی پیدا کرده است. از طریق خرید مس به شکل دیجیتال، شما مستقیماً به این بازار پرتقاضا متصل می‌شوید و دارایی خود را همگام با رشد صنایع بزرگ افزایش می‌دهید.',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      accentColor: 'border-r-4 border-r-orange-500'
    }
  ],
  assetsNote:
    'دقت داشته باشید که در پلتفرم گرمی، تمامی معاملات به صورت دیجیتال و روی موجودی دقیق دارایی شما انجام می‌شود. ما دغدغه‌های مربوط به تهیه و نگهداری کالاهای خرد فیزیکی (مانند ساچمه، شمش‌های کوچک یا قطعات خرد) را به طور کامل حذف کرده‌ایم تا تمرکز شما تنها روی تحلیل بازار و رشد سرمایه باشد. این رویکرد مدرن به شما اجازه می‌دهد تا با خیالی آسوده و سرعتی بی‌نظیر، پورتفوی سرمایه‌گذاری خود را تنوع ببخشید.',
  advantagesTitle: 'مزایای خرید از گرمی',
  advantages: [
    {
      id: 'authenticity',
      title: 'تضمین اصالت',
      description:
        'تمامی دارایی‌های دیجیتالی که در پلتفرم گرمی معامله می‌کنید، دارای پشتوانه فیزیکی و واقعی در خزانه‌های امن هستند. این یعنی هر گرم طلا، نقره یا مس که به صورت آنلاین خریداری می‌کنید، نماینده یک دارایی اصیل و استاندارد است که کیفیت و خلوص آن به صورت کامل توسط کارشناسان تأیید و تضمین شده است.',
      iconName: 'shield'
    },
    {
      id: 'commission',
      title: 'کارمزد شفاف و منصفانه',
      description:
        'یکی از مهم‌ترین دغدغه‌های سرمایه‌گذاران، هزینه‌های پنهان معامله است. در گرمی، ساختار کارمزدها کاملاً شفاف و منصفانه طراحی شده است. شما دقیقاً می‌دانید که چه مبلغی را برای معامله پرداخت می‌کنید و هیچگونه هزینه اضافی، اجرت ساخت یا مالیات پنهانی در فرآیند خرید و فروش دیجیتال شما کسر نخواهد شد.',
      iconName: 'percent'
    },
    {
      id: 'liquidity',
      title: 'نقدشوندگی آنی',
      description:
        'بازار همیشه در حال تغییر است و شما باید بتوانید در بهترین زمان ممکن تصمیم‌گیری کنید. گرمی با ارائه نقدشوندگی بالا و تسویه سریع، این امکان را به شما می‌دهد که دارایی‌های خود را در کوتاه‌ترین زمان ممکن و بدون دغدغه پیدا کردن خریدار، به وجه نقد (ریال) تبدیل کرده و به حساب بانکی خود منتقل کنید.',
      iconName: 'zap'
    },
    {
      id: 'security',
      title: 'امنیت چندلایه و قوی',
      description:
        'محافظت از سرمایه و اطلاعات کاربران، خط قرمز پلتفرم گرمی است. سیستم‌های ما با استفاده از مدرن‌ترین پروتکل‌های رمزنگاری و ساختار امنیت چندلایه و قوی طراحی شده‌اند تا از حساب‌های کاربری، کیف پول دیجیتال و اطلاعات بانکی شما در برابر هرگونه تهدید سایبری محافظت کنند.',
      iconName: 'lock'
    }
  ],
  featuresTitle: 'امکانات گرمی',
  features: [
    {
      id: 'instant-sell',
      title: 'امکان فروش سریع در هر زمان',
      tag: '۲۴/۷',
      description:
        'پلتفرم گرمی محدودیت‌های زمانی بازار سنتی را شکسته است. شما به صورت ۲۴ ساعته و در ۷ روز هفته (حتی روزهای تعطیل) می‌توانید دارایی‌های خود را با یک کلیک به فروش برسانید و از فرصت‌های لحظه‌ای بازار به بهترین نحو استفاده کنید.'
    },
    {
      id: 'physical-delivery',
      title: 'تحویل فیزیکی با پلمپ',
      tag: 'اصالت تضمینی',
      description:
        'اگرچه ماهیت اصلی معاملات در گرمی دیجیتال و بدون دردسر است، اما چنانچه کاربری تمایل داشته باشد موجودی دیجیتال خود را به کالای فیزیکی تبدیل کند، این امکان فراهم است. با رسیدن موجودی به حد نصاب‌های استاندارد، شما می‌توانید دارایی خود را به صورت فیزیکی همراه با فاکتور رسمی و پلمپ معتبر و استاندارد دریافت کنید.'
    },
    {
      id: 'advanced-wallet',
      title: 'کیف پول و مدیریت دارایی پیشرفته',
      tag: 'داشبورد حرفه‌ای',
      description:
        'پس از ثبت‌نام، یک کیف پول و سیستم مدیریت دارایی پیشرفته در اختیار شما قرار می‌گیرد. در این داشبورد حرفه‌ای می‌توانید نمودارها را تحلیل کنید، تاریخچه معاملات خود را ببینید، میانگین خرید خود را بررسی کنید و کنترل کاملی روی رشد سبد سرمایه‌گذاری‌تان داشته باشید.'
    },
    {
      id: 'support-247',
      title: 'پشتیبانی ۲۴ ساعته',
      tag: 'پاسخگویی سریع',
      description:
        'در هر مرحله از فعالیت در پلتفرم، از ثبت‌نام تا ثبت سفارش و برداشت وجه، تیم پشتیبانی متخصص گرمی در تمام ساعات شبانه‌روز آماده پاسخگویی، راهنمایی و حل دغدغه‌های شماست تا تجربه‌ای بی‌نقص از سرمایه‌گذاری داشته باشید.'
    },
    {
      id: 'mobile-app',
      title: 'اپلیکیشن خرید و فروش آنلاین گرمی',
      tag: 'Android & iOS',
      description:
        'برای دسترسی راحت‌تر، اپلیکیشن اختصاصی گرمی با رابط کاربری روان و سریع طراحی شده است. خرید و فروش سریع و آسان تنها با چند لمس روی صفحه گوشی موبایل امکان‌پذیر است تا بازار همیشه و همه‌جا در جیب شما باشد.'
    }
  ],
  howToStartTitle: 'چگونه با گرمی شروع کنیم؟',
  howToStartSteps: [
    {
      stepNumber: 1,
      title: 'ثبت‌نام و احراز هویت',
      timeBadge: 'زیر ۳ دقیقه',
      description:
        'ورود به دنیای گرمی بسیار ساده است. کافیست شماره موبایل خود را وارد کرده و فرآیند احراز هویت هوشمند و اتوماتیک ما را در کمتر از ۳ دقیقه تکمیل کنید. هیچ نیازی به کاغذبازی یا مراحل پیچیده اداری نیست.'
    },
    {
      stepNumber: 2,
      title: 'شارژ آنی کیف پول',
      timeBadge: 'از طریق درگاه امن بانکی',
      description:
        'پس از فعال‌سازی حساب، می‌توانید کیف پول دیجیتال خود را از طریق درگاه‌های امن و معتبر بانکی و با استفاده از کارت‌های عضو شتاب، در همان لحظه شارژ کنید و آماده معامله شوید.'
    },
    {
      stepNumber: 3,
      title: 'خرید با قیمت لحظه‌ای بازار',
      timeBadge: 'تسویه و تحویل آنی',
      description:
        'حالا همه چیز آماده است! نمودار و قیمت لحظه‌ای فلزات را در پلتفرم مشاهده کنید و دقیقاً بر اساس قیمت زنده بازار جهانی و داخلی، مقدار طلا، نقره یا مس مورد نظر خود را خریداری کرده و به دارایی‌های کیف پولتان اضافه کنید.'
    }
  ]
}

const cfg = computed<AboutSectionConfig>(() => ({
  ...defaultConfig,
  ...props.config
}))
</script>

<template>
  <section
    id="about-platform-section"
    class="relative bg-background-light py-12 md:py-16 border-t border-gray-200/60"
    aria-labelledby="about-platform-title"
  >
    <AppContainer>
      <div class="max-w-4xl mx-auto">
        <!-- Content Container with Expand/Collapse Transition -->
        <div
          class="relative transition-[max-height] duration-500 ease-in-out overflow-hidden"
          :class="[isExpanded ? 'max-h-[5000px]' : 'max-h-[175px] sm:max-h-[160px]']"
          :aria-expanded="isExpanded"
        >
          <!-- Main Title -->
          <h2
            id="about-platform-title"
            class="font-heading font-black text-2xl sm:text-3xl text-dim mb-4 leading-tight"
          >
            {{ cfg.title }}
          </h2>

          <!-- Main Intro Text -->
          <p class="text-sm sm:text-base text-gray-600 leading-relaxed text-justify mb-8">
            {{ cfg.introText }}
          </p>

          <!-- 1. Philosophy -->
          <div class="mb-8">
            <h3 class="font-heading font-bold text-lg sm:text-xl text-dim mb-2 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
              {{ cfg.philosophyTitle }}
            </h3>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed text-justify">
              {{ cfg.philosophyText }}
            </p>
          </div>

          <!-- 2. Licenses & Approvals -->
          <div class="mb-8">
            <h3 class="font-heading font-bold text-lg sm:text-xl text-dim mb-2 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
              {{ cfg.licensesTitle }}
            </h3>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed text-justify">
              {{ cfg.licensesText }}
            </p>
          </div>

          <!-- 3. Tradable Assets -->
          <div class="mb-10">
            <h3 class="font-heading font-bold text-lg sm:text-xl text-dim mb-2 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
              {{ cfg.assetsTitle }}
            </h3>
            <p class="text-sm sm:text-base text-gray-600 mb-4">
              {{ cfg.assetsDescription }}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div
                v-for="asset in cfg.assets"
                :key="asset.title"
                class="rounded-xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                :class="asset.accentColor"
              >
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-heading font-bold text-base text-dim">
                      {{ asset.title }}
                    </h4>
                    <a
                      :href="asset.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs font-medium px-2.5 py-1 rounded-full border transition-colors inline-flex items-center gap-1"
                      :class="asset.badgeColor"
                    >
                      <span>{{ asset.linkText }}</span>
                      <svg
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                  <p class="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify mt-2">
                    {{ asset.description }}
                  </p>
                </div>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-gray-500 bg-gray-50 border border-gray-200/60 rounded-xl p-4 leading-relaxed text-justify">
              {{ cfg.assetsNote }}
            </p>
          </div>

          <!-- 4. Platform Advantages -->
          <div class="mb-10">
            <h3 class="font-heading font-bold text-lg sm:text-xl text-dim mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
              {{ cfg.advantagesTitle }}
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="adv in cfg.advantages"
                :key="adv.id"
                class="rounded-xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-primary/40 transition-colors"
              >
                <h4 class="font-heading font-bold text-base text-dim mb-2 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {{ adv.title }}
                </h4>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                  {{ adv.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- 5. Platform Features -->
          <div class="mb-10">
            <h3 class="font-heading font-bold text-lg sm:text-xl text-dim mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
              {{ cfg.featuresTitle }}
            </h3>

            <div class="space-y-3">
              <div
                v-for="feature in cfg.features"
                :key="feature.id"
                class="rounded-xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-start gap-3"
              >
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h4 class="font-heading font-bold text-base text-dim">
                      {{ feature.title }}
                    </h4>
                    <span
                      v-if="feature.tag"
                      class="text-[11px] px-2 py-0.5 rounded-md bg-primary/10 text-primary-dark font-medium border border-primary/20"
                    >
                      {{ feature.tag }}
                    </span>
                  </div>
                  <p class="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. How to Start -->
          <div class="mb-8">
            <h3 class="font-heading font-bold text-lg sm:text-xl text-dim mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
              {{ cfg.howToStartTitle }}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                v-for="step in cfg.howToStartSteps"
                :key="step.stepNumber"
                class="rounded-xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <div
                      class="w-7 h-7 rounded-full bg-primary/15 text-primary-dark font-heading font-bold text-sm flex items-center justify-center border border-primary/30"
                    >
                      {{ step.stepNumber }}
                    </div>
                    <span
                      v-if="step.timeBadge"
                      class="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {{ step.timeBadge }}
                    </span>
                  </div>
                  <h4 class="font-heading font-bold text-sm sm:text-base text-dim mb-2">
                    {{ step.title }}
                  </h4>
                  <p class="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Gradient Fade Overlay when collapsed -->
          <div
            v-if="!isExpanded"
            class="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background-light via-background-light/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        <!-- Expand / Collapse Toggle Button -->
        <div class="flex justify-center mt-4">
          <button
            type="button"
            @click="toggleExpand"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200/80 text-dim text-xs sm:text-sm font-medium transition-all duration-200 border border-gray-200/80 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            :aria-expanded="isExpanded"
          >
            <span>{{ isExpanded ? 'مطالعه کمتر' : 'مطالعه بیشتر' }}</span>
            <svg
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': isExpanded }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
