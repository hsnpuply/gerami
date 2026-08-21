<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
    customClass?: string
  }>(),
  {
    tag: 'div',
    customClass: ''
  }
)
</script>

<template>
  <component
    :is="tag"
    class="mx-auto w-full max-w-[1184px] px-4 sm:px-6 lg:px-8"
    :class="customClass"
  >
    <slot />
  </component>
</template>
