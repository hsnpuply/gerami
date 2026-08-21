<script setup lang="ts">
import { HeroSection } from '@/components/hero'
import { FeaturesSection } from '@/components/features'
import { MetalsSection } from '@/components/metals'
import { MarketPriceSection } from '@/components/market'
import { PhysicalDeliverySection } from '@/components/delivery'
import { QuickBuySection } from '@/components/quick-buy'
import { FaqSection } from '@/components/faq'
import { SupportSection } from '@/components/support'
import { PartnersSection } from '@/components/partners'
import { LicensesSection } from '@/components/licenses'
import { AboutSection } from '@/components/about'
</script>

<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <MarketPriceSection />
    <MetalsSection />
    <QuickBuySection />
    <PhysicalDeliverySection />
    <PartnersSection />
    <LicensesSection />
    <FaqSection />
    <SupportSection />
    <AboutSection />
  </div>
</template>
