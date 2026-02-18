<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const theme = useThemeStore()

// Map route paths to page names used by the theme store
const routePageMap: Record<string, string> = {
  '/': 'home',
  '/creation': 'creation',
  '/campaign': 'campaign',
}

// Set the theme on initial load
theme.setPage(routePageMap[route.path] ?? 'home')

// Update theme reactively on every navigation
watch(
  () => route.path,
  (path) => {
    theme.setPage(routePageMap[path] ?? 'home')
  }
)
</script>

<template>
  <div class="flex min-h-screen">
    <AppSidebar class="hidden md:flex shrink-0" />

    <main class="flex-1 p-4 pb-24 transition-all duration-300 md:ml-20 lg:ml-64 md:pb-4">
      <slot />
    </main>

    <MobileNav class="md:hidden" />
  </div>
</template>