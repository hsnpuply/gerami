<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import MetalItemRow from './MetalItemRow.vue'
import type { MetalItem } from '@/types/metals'

const props = defineProps<{
  customMetals?: MetalItem[]
}>()

defineEmits<{
  (e: 'metal-cta-click', metal: MetalItem): void
}>()

const defaultMetals: MetalItem[] = [
  {
    id: 'gold',
    slug: 'gold',
    visualSide: 'left',
    badgeText: 'خرید طلا',
    title: 'طلا؛ سرمایه‌گذاری مطمئن',
    description: 'اگر به دنبال گزینه‌ای مطمئن برای حفظ ارزش دارایی خود در برابر نوسانات اقتصادی و تورم هستید، طلا انتخابی امن و باثبات برای آینده مالی شماست.',
    features: [
      'تضمین اصالت طلا',
      'خرید و فروش سریع و آسان طلا',
      'امکان تحویل فیزیکی',
      'بدون اجرت و مالیات اضافی'
    ],
    ctaText: 'خرید طلا',
    ctaLink: '/buy/gold',
    theme: {
      accentColor: '#F59E0B',
      badgeBg: '#FFFDF5',
      badgeBorder: '#FEEFBD',
      badgeTextColor: '#78350F',
      iconBg: '#F59E0B',
      checkmarkBg: '#F59E0B'
    }
  },
  {
    id: 'silver',
    slug: 'silver',
    visualSide: 'right',
    badgeText: 'خرید نقره',
    title: 'نقره؛ گزینه‌ای مطمئن برای تنوع سرمایه‌گذاری',
    description: 'اگر به دنبال راهی مطمئن برای شروع سرمایه‌گذاری یا حفظ ارزش پولتان هستید، نقره انتخابی درخشان و قابل اعتماد است.',
    features: [
      'تضمین اصالت نقره',
      'خرید و فروش سریع و آسان نقره',
      'امکان تحویل فیزیکی',
      'بدون اجرت و مالیات اضافی'
    ],
    ctaText: 'خرید نقره',
    ctaLink: '/buy/silver',
    theme: {
      accentColor: '#9CA3AF',
      badgeBg: '#F8FAFC',
      badgeBorder: '#E2E8F0',
      badgeTextColor: '#475569',
      iconBg: '#9CA3AF',
      checkmarkBg: '#9CA3AF'
    }
  },
  {
    id: 'copper',
    slug: 'copper',
    visualSide: 'left',
    badgeText: 'خرید مس',
    title: 'مس، ابزار نوین سرمایه‌گذاری',
    description: 'اگر به دنبال راه جدیدی برای سرمایه‌گذاری هستید و قصد دارید سبد سرمایه‌گذاری خود را تنوع ببخشید، فقط در گرمی می‌توانید مس را خرید و فروش کنید',
    features: [
      'تنها سکوی سرمایه‌گذاری مس در ایران',
      'تضمین اصالت مس',
      'خرید و فروش سریع و آسان مس',
      'امکان تحویل فیزیکی',
      'بدون اجرت و مالیات اضافی'
    ],
    ctaText: 'خرید مس',
    ctaLink: '/buy/copper',
    theme: {
      accentColor: '#C2783E',
      badgeBg: '#FFF7ED',
      badgeBorder: '#FFEDD5',
      badgeTextColor: '#9A3412',
      iconBg: '#C2783E',
      checkmarkBg: '#C2783E'
    }
  }
]

const metals = computed(() => props.customMetals || defaultMetals)
</script>

<template>
  <section class="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-background-light">
    <AppContainer>
      <div class="space-y-16 sm:space-y-20 lg:space-y-28">
        <MetalItemRow
          v-for="metal in metals"
          :key="metal.id"
          :metal="metal"
          @cta-click="$emit('metal-cta-click', $event)"
        >
          <!-- Forward background slot to consumer -->
          <template #grid-background="slotProps">
            <slot :name="`grid-${slotProps.metal.slug}`" v-bind="slotProps" />
          </template>

          <!-- Forward canvas slot to consumer -->
          <template #canvas="slotProps">
            <slot :name="`canvas-${slotProps.metal.slug}`" v-bind="slotProps" />
          </template>
        </MetalItemRow>
      </div>
    </AppContainer>
  </section>
</template>
