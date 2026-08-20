<script setup lang="ts">
defineProps<{
  tag?: string
}>()
</script>

<template>
  <div class="mx-auto w-full max-w-[1152px] ">
    <slot />
  </div>
</template>
