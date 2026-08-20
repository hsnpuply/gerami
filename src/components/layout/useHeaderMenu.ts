import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'

export function useHeaderMenu() {
  const appStore = useAppStore()
  const activeDropdown = ref<string | null>(null)
  let dropdownTimeout: ReturnType<typeof setTimeout> | undefined

  function openDropdown(name: string) {
    if (dropdownTimeout) clearTimeout(dropdownTimeout)
    activeDropdown.value = name
  }

  function closeDropdown() {
    activeDropdown.value = null
    if (dropdownTimeout) clearTimeout(dropdownTimeout)
    dropdownTimeout = undefined
  }

  function closeDropdownWithDelay() {
    if (dropdownTimeout) clearTimeout(dropdownTimeout)
    dropdownTimeout = setTimeout(closeDropdown, 150)
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return
    appStore.closeMobileMenu()
    closeDropdown()
  }

  function onResize() {
    if (window.innerWidth >= 1024) appStore.closeMobileMenu()
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', onResize)
    if (dropdownTimeout) clearTimeout(dropdownTimeout)
  })

  return {
    activeDropdown,
    openDropdown,
    closeDropdown,
    closeDropdownWithDelay,
  }
}