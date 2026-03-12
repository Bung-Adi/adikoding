<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()

const links = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'heroicons:squares-2x2' },
  { name: 'Creations', path: '/admin/creations', icon: 'heroicons:rocket-launch' },
  { name: 'Campaigns', path: '/admin/campaigns', icon: 'heroicons:fire' },
  { name: 'Media', path: '/admin/media', icon: 'heroicons:video-camera' },
]

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/windbind')
}
</script>

<template>
  <aside class="fixed top-0 left-0 z-40 flex flex-col w-20 h-screen transition-all duration-300 border-r lg:w-64 bg-white/5 backdrop-blur-xl border-white/10">
    <div class="flex items-center justify-center gap-4 p-6 lg:justify-start">
      <img src="/logomark.webp" alt="AdiKoding Logo Mark" class="w-10 h-10 duration-500 rounded-lg"/>
      <span class="hidden text-xl font-black tracking-tighter text-white lg:block">AdiKoding</span>
    </div>

    <nav class="flex-1 px-4 mt-10 space-y-2">
      <NuxtLink 
        v-for="item in links" 
        :key="item.name"
        :to="item.path"
        class="flex items-stretch gap-4 p-3 transition-all rounded-xl group text-white/50 hover:text-white hover:bg-white/5"
        :class="route.path === item.path ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>

    <div class="p-4 space-y-6 border-t border-white/10">
      <div class="flex flex-col items-center justify-center gap-2 align lg:flex-row">
      <NuxtLink to="/" class="text-[10px] text-white/30 hover:text-white uppercase tracking-widest transition-colors">View Site</NuxtLink>
      <button 
        @click="handleLogout" 
        class="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-md text-[10px] font-bold transition-all"
      >
        LOGOUT
      </button>
      </div>
    </div>
  </aside>
</template>