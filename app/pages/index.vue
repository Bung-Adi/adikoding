<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

// Update the 3D ball color when this page loads
onMounted(() => {
  theme.setPage('home') // Sets color to #20afdb
})

// SEO metadata for the Home page
useSeoMeta({
  title: 'Indie Dev Studio | Home',
  ogTitle: 'Indie Dev Studio',
  description: 'Welcome to my indie development portfolio and course landing page.',
  ogDescription: 'Explore my latest creations, games, and web apps.',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] text-white">
    
    <div class="w-full max-w-2xl p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl transition-all duration-500 hover:bg-white/15">
      
      <header class="text-center">
        <h1 class="mb-4 text-5xl font-black tracking-tighter text-transparent md:text-7xl bg-gradient-to-br from-white to-white/60 bg-clip-text">
          ADIKODING
        </h1>
        <p class="mb-8 text-lg font-medium md:text-xl text-blue-200/80">
          Crafting digital experiences through code and 3D.
        </p>
      </header>

      <div class="space-y-8 text-center">
        <div class="p-4 border bg-black/20 rounded-xl border-white/5">
          <p class="text-sm italic text-white/70 md:text-base">
            "Join our Discord to collaborate on indie projects and get exclusive course updates!"
          </p>
        </div>

        <div class="flex flex-col items-center gap-4">
          <a 
            href="https://discord.gg/yourlink" 
            target="_blank"
            class="group relative px-10 py-4 bg-[#20afdb] text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(32,175,219,0.4)]"
          >
            <span class="relative z-10 flex items-center gap-2">
              Join Server
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </span>
          </a>
          
          <p class="text-xs tracking-widest uppercase text-white/40">
            Indie Dev & Educator
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
div {
  animation: fadeInBlur 1.2s ease-out;
}

@keyframes fadeInBlur {
  from {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
</style>