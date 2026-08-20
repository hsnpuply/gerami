<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen font-body">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>
