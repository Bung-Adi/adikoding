<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const isMenuOpen = ref(false)
const theme = useThemeStore()

const currentLocale = computed({
  get: () => locale.value,
  set: (val) => setLocale(val)
})

const navLinks = [
  { name: 'Home', path: '/', icon: 'heroicons:home-solid' },
  { name: 'Creation', path: '/creation', icon: 'heroicons:sparkles-solid' },
  { name: 'Campaign', path: '/campaign', icon: 'heroicons:rocket-launch-solid' }
]

const socials = [
  { name: 'YouTube', icon: 'akar-icons:youtube-fill', link: '#' },
  { name: 'TikTok', icon: 'akar-icons:tiktok-fill', link: '#' },
  { name: 'Instagram', icon: 'akar-icons:instagram-fill', link: '#' },
  { name: 'GitHub', icon: 'akar-icons:github-fill', link: '#' },
  { name: 'Discord', icon: 'akar-icons:discord-fill', link: '#' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div v-if="isMenuOpen" class="fixed inset-x-0 bottom-20 z-[55] p-6">
      <div class="p-6 border bg-black/80 backdrop-blur-2xl border-white/10 rounded-3xl">
        <h3 class="mb-6 text-xs font-black tracking-widest uppercase text-white/20">Connect with AdiKoding</h3>
        
        <div class="grid grid-cols-3 gap-4">
          <a 
            v-for="social in socials" 
            :key="social.name" 
            :href="social.link"
            target="_blank"
            class="flex flex-col items-center justify-center p-4 transition-colors rounded-2xl bg-white/5 hover:bg-white/10"
          >
            <Icon :name="social.icon" class="mb-2 text-2xl text-white" />
            <span class="text-[10px] font-bold text-white/60 uppercase">{{ social.name }}</span>
          </a>
        </div>

        <div class="flex flex-col items-end justify-center gap-2 pt-4 pb-8 align lg:flex-row">
          <select v-model="currentLocale" class="px-3 py-2 text-sm bg-gray-800 border rounded-md border-white/20 text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="en">EN</option>
            <option value="id">ID</option>
            <option value="zh">ZH</option>
          </select>
        </div>

      </div>
    </div>
  </Transition>
  <nav class="fixed bottom-0 left-0 right-0 z-[60] md:invisible">
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

<!-- <style scoped>
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
</style> -->