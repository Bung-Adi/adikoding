<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const isMenuOpen = ref(false)
const theme = useThemeStore()

const navLinks = [
  { name: 'Home', path: '/', icon: 'heroicons:home-solid' },
  { name: 'Creation', path: '/creation', icon: 'heroicons:sparkles-solid' },
  { name: 'Campaign', path: '/campaign', icon: 'heroicons:rocket-launch-solid' }
]

const socials = [
  { name: 'YouTube', icon: 'simple-icons:youtube', link: '#' },
  { name: 'Discord', icon: 'simple-icons:discord', link: '#' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-[60]">
    <div class="flex items-center justify-around h-20 px-6 border-t bg-white/5 backdrop-blur-xl border-white/10">
      <NuxtLink 
        v-for="item in navLinks" 
        :key="item.name" 
        :to="item.path"
        class="flex flex-col items-center"
      >
        <Icon :name="item.icon" class="mb-1 text-2xl" />
        <span 
          class="w-1 h-1 transition-all duration-500 rounded-full" 
          :style="{ backgroundColor: theme.activePage === item.name.toLowerCase() ? theme.ballColor : 'transparent' }"
        />
      </NuxtLink>

      <button @click="toggleMenu" class="flex flex-col items-center text-white/40">
        <Icon :name="isMenuOpen ? 'heroicons:x-mark-solid' : 'heroicons:squares-2x2-solid'" class="text-2xl" />
        <span class="text-[10px] uppercase font-bold">More</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Adds padding for iPhones with Home Indicator */
.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>