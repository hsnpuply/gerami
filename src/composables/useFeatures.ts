import { ref } from 'vue'
import type { FeatureItem, LicenseBadgeItem } from '@/types/features'
import enamadImg from '@/assets/images/licenses/enamad.png'
import goldUnionImg from '@/assets/images/licenses/gold-union.png'
import samandehiImg from '@/assets/images/licenses/samandehi.png'

export function useFeatures() {
  const licenseBadges = ref<LicenseBadgeItem[]>([
    {
      id: 'enamad',
      title: 'اینماد',
      subtitle: 'نماد اعتماد الکترونیکی',
      image: enamadImg,
      alt: 'اینماد - نماد اعتماد الکترونیکی کسب‌وکارهای اینترنتی'
    },
    {
      id: 'gold-union',
      title: 'اتحادیه طلا و جواهر',
      subtitle: 'مجوز رسمی اتحادیه طلا، نقره و سکه',
      image: goldUnionImg,
      alt: 'مجوز رسمی اتحادیه صنف طلا، جواهر، نقره و سکه'
    },
    {
      id: 'samandehi',
      title: 'نظام صنفی رایانه‌ای',
      subtitle: 'عضویت رسمی سازمان نصر',
      image: samandehiImg,
      alt: 'نماد عضویت در سازمان نظام صنفی رایانه‌ای کشور'
    }
  ])

  const features = ref<FeatureItem[]>([
    {
      id: 'authenticity',
      title: 'تضمین اصالت',
      description: 'فلزات در گرمی با گواهی اصالت معتبر عرضه می‌شوند.',
      iconName: 'guarantee'
    },
    {
      id: 'low-fee',
      title: 'کارمزد پایین و شفاف',
      description: 'معاملات با کارمزد حداقلی و کاملاً شفاف و مشخص انجام می‌شود.',
      iconName: 'fee'
    },
    {
      id: 'official-licenses',
      title: 'دارای مجوزها و نمادهای رسمی',
      description: 'تمامی فعالیت‌های گرمی تحت مجوزهای معتبر انجام می‌شود و امنیت معاملات شما تضمین شده است.',
      iconName: 'license',
      isDouble: true
    },
    {
      id: 'physical-delivery',
      title: 'امکان تحویل فیزیکی',
      description: 'دارایی خود را هر زمان بخواهید، می‌توانید به‌صورت فیزیکی تحویل بگیرید.',
      iconName: 'delivery'
    },
    {
      id: 'instant-trade',
      title: 'خرید و فروش لحظه‌ای',
      description: 'قیمت‌ها به‌صورت لحظه‌ای بروزرسانی می‌شود و معامله فوراً انجام می‌گیرد.',
      iconName: 'lightning'
    },
    {
      id: 'support-24-7',
      title: 'پشتیبانی ۲۴ ساعته',
      description: 'در تمام ساعات شبانه‌روز پاسخگوی سوالات و درخواست‌های شما هستیم.',
      iconName: 'support'
    },
    {
      id: 'secure-wallet',
      title: 'کیف پول امن اختصاصی',
      description: 'نگهداری امن دارایی‌های شما با بالاترین استانداردهای امنیتی و رمزنگاری.',
      iconName: 'wallet'
    }
  ])

  return {
    features,
    licenseBadges
  }
}
