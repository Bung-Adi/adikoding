<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const { settings } = useSettings()
const theme = useThemeStore()

// const darkModeIcon = "heroicons:sun-solid"

const navLinks = [
  { name: 'Home', path: '/', icon: 'heroicons:home-solid', color: '#20afdb' },
  { name: 'Creation', path: '/creation', icon: 'heroicons:sparkles-solid', color: '#225cae' },
  { name: 'Campaign', path: '/campaign', icon: 'heroicons:rocket-launch-solid', color: '#57da3d' },
  { name: 'About', path: '/about', icon: 'heroicons:star-solid', color: '#020617' }
]

const socialConfig = [
  { icon: 'akar-icons:youtube-fill', key: 'youtube' },
  { icon: 'akar-icons:tiktok-fill', key: 'tiktok' },
  { icon: 'akar-icons:github-fill', key: 'github' },
  { icon: 'akar-icons:discord-fill', key: 'discord' },
  { icon: 'akar-icons:instagram-fill', key: 'instagram' },
  { icon: 'akar-icons:behance-fill', key: 'behance' },
]

const socials = computed(() => {
  if (!settings.value?.social_links) return []
  return socialConfig.map(s => ({
    icon: s.icon,
    link: settings.value.social_links[s.key] || '#'
  }))
})

const currentLocale = computed({
  get: () => locale.value,
  set: (val) => setLocale(val)
})
</script>

<template>
  <aside class="fixed top-0 left-0 z-40 flex flex-col w-20 h-screen transition-all duration-300 border-r lg:w-64 bg-white/5 backdrop-blur-xl border-white/10">
    <div class="flex items-center justify-center gap-4 p-6 lg:justify-start">
      <img src="/logomark.webp" alt="AdiKoding Logo Mark" class="w-10 h-10 duration-500 rounded-lg"/>
      <span class="hidden text-xl font-black tracking-tighter text-white lg:block">AdiKoding</span>
    </div>

    <nav class="flex-1 px-4 mt-10 space-y-2">
      <NuxtLink 
        v-for="item in navLinks" 
        :key="item.name"
        :to="localePath(item.path)"
        v-slot="{ isActive }" 
      >
        <div 
          class="flex items-stretch gap-4 p-3 transition-all rounded-xl group hover:bg-white/5"
          :class="isActive ? 'text-white' : 'text-white/50 hover:text-white'"
          :style="{ backgroundColor: isActive ? item.color : 'transparent' }"
        >
          <Icon :name="item.icon" class="mb-1 text-2xl" />
          <span class="hidden font-medium lg:block">{{ item.name }}</span>
        </div>
      </NuxtLink>
    </nav>

    <div class="p-4 space-y-6 border-t border-white/10">
      <div class="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <NuxtLink v-for="s in socials" :key="s.icon" :to="s.link" class="flex justify-center p-2 transition-colors text-white/40 hover:text-white">
          <Icon :name="s.icon" class="text-xl" />
        </NuxtLink>
      </div>

      <div class="flex flex-col items-center justify-center gap-2 align lg:flex-row">
        <select v-model="currentLocale" class="px-3 py-2 text-sm bg-gray-800 border rounded-md border-white/20 text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="en">EN</option>
          <option value="id">ID</option>
          <option value="zh">ZH</option>
        </select>
        <!-- <button class="p-2 text-white/60 hover:text-white">
          <Icon :name="darkModeIcon" class="mb-1 text-2xl" />
        </button> -->
      </div>
    </div>
  </aside>
</template>