<script setup lang="ts">
import { HeroSection } from '@/components/hero'
import { FeaturesSection } from '@/components/features'
import { MetalsSection } from '@/components/metals'
import { MarketPriceSection } from '@/components/market'
import { PhysicalDeliverySection } from '@/components/delivery'
import { QuickBuySection } from '@/components/quick-buy'
</script>

<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <MarketPriceSection />
    <MetalsSection />
    <QuickBuySection />
    <PhysicalDeliverySection />
  </div>
</template>
