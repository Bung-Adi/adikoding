<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

const darkModeIcon = "heroicons:sun-solid"

const navLinks = [
  { name: 'Home', path: '/', icon: 'heroicons:home-solid', color: '#20afdb' },
  { name: 'Creation', path: '/creation', icon: 'heroicons:sparkles-solid', color: '#225cae' },
  { name: 'Campaign', path: '/campaign', icon: 'heroicons:rocket-launch-solid', color: '#57da3d' }
]

const socials = [
  { icon: 'akar-icons:youtube-fill', link: '#' },
  { icon: 'akar-icons:tiktok-fill', link: '#' },
  { icon: 'akar-icons:instagram-fill', link: '#' },
  { icon: 'akar-icons:github-fill', link: '#' },
  { icon: 'akar-icons:discord-fill', link: '#' },
]
</script>

<template>
  <aside class="fixed top-0 left-0 z-40 flex flex-col w-20 h-screen transition-all duration-300 border-r lg:w-64 bg-white/5 backdrop-blur-xl border-white/10">
    <div class="flex items-center justify-center gap-4 p-6 lg:justify-start">
      <div 
        class="w-10 h-10 transition-colors duration-500 rounded-lg" 
        :style="{ backgroundColor: theme.ballColor }"
      />
      <span class="hidden text-xl font-black tracking-tighter text-white lg:block">ADIKODING</span>
    </div>

    <nav class="flex-1 px-4 mt-10 space-y-2">
      <NuxtLink 
        v-for="item in navLinks" 
        :key="item.name"
        :to="item.path"
        :style="{ backgroundColor: theme.activePage === item.name.toLowerCase() ? item.color : 'transparent' }"
        class="flex items-stretch gap-4 p-3 transition-all rounded-xl group text-white/50 hover:text-white hover:bg-white/5"
      >
        <Icon :name="item.icon" class="mb-1 text-2xl" />
        <span class="hidden font-medium lg:block">{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="p-4 space-y-6 border-t border-white/10">
      <div class="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <NuxtLink v-for="s in socials" :key="s.icon" :to="s.link" class="flex justify-center p-2 transition-colors text-white/40 hover:text-white">
          <Icon :name="s.icon" class="text-xl" />
        </NuxtLink>
      </div>

      <div class="flex flex-col items-center justify-between gap-2 lg:flex-row">
        <select class="p-1 text-xs bg-transparent border rounded outline-none text-white/60 border-white/10">
          <option value="en">EN</option>
          <option value="id">ID</option>
          <option value="cn">ZH</option>
        </select>
        <button class="p-2 text-white/60 hover:text-white">
          <Icon :name="darkModeIcon" class="mb-1 text-2xl" />
        </button>
      </div>
    </div>
  </aside>
</template>