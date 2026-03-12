<script setup lang="ts">
  const { creations, loading } = useCreations()
  const { locale } = useLanguage()

  useHead({
    title: 'Creations | AdiKoding Studio',
    meta: [{ name: 'description', content: 'Explore our latest experimental digital works.' }]
  })
</script>

<template>
  <div class="px-4 py-12 mx-auto max-w-7xl">
    <header class="mb-16">
      <h1 class="text-5xl font-black tracking-tighter text-white">
        CREATIONS<span class="decoration-[--color-create-blue]">.</span>
      </h1>
      <p class="max-w-xl mt-4 text-white/50">
        A collection of experimental projects, indie games, and digital experiences built at AdiKoding Studio.
      </p>
    </header>

    <div v-if="loading" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 3" :key="i" class="h-80 bg-white/5 animate-pulse rounded-3xl"></div>
    </div>

    <div v-else-if="creations?.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="item in creations" 
        :key="item.id"
        class="relative flex flex-col p-4 overflow-hidden transition-all border group rounded-[2rem] bg-[#0f172a]/40 border-white/5 hover:border-[--color-create-blue]/30 hover:bg-white/5"
      >
        <div class="mb-5 overflow-hidden aspect-video rounded-2xl bg-slate-900 border border-white/5">
          <img 
            v-if="item.thumbnail_url" 
            :src="item.thumbnail_url" 
            class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
            alt="Project Preview"
          />
          <div v-else class="flex items-center justify-center w-full h-full text-white/10">
            <Icon name="heroicons:code-bracket-square" class="text-4xl" />
          </div>
        </div>

        <div class="flex flex-col flex-1">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[--color-create-blue]">
              {{ item.category }}
            </span>
            <span class="text-[10px] text-white/20 font-mono">#{{ item.id }}</span>
          </div>

          <h3 class="mb-3 text-2xl font-black text-white group-hover:text-[--color-create-blue] transition-colors">
            {{ item.title }}
          </h3>

          <div class="flex flex-wrap gap-2 mb-8">
            <span 
              v-for="tech in item.tech_stack?.slice(0, 3)" 
              :key="tech"
              class="px-2 py-1 text-[9px] font-bold uppercase border rounded-md border-white/10 text-white/60 bg-white/5"
            >
              {{ tech }}
            </span>
            <span v-if="item.tech_stack?.length > 3" class="text-[9px] text-white/20 self-center">
              +{{ item.tech_stack.length - 3 }}
            </span>
          </div>

          <div class="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
            <NuxtLink 
              :to="'/creation/' + item.slug"
              class="text-[10px] font-black uppercase tracking-widest text-white hover:text-[--color-create-blue] transition-all"
            >
              PROJECT_DETAILS
            </NuxtLink>
            
            <NuxtLink 
              :to="'/creation/' + item.slug"
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white group-hover:bg-[--color-create-blue] transition-all"
            >
              <Icon name="heroicons:arrow-right-20-solid" class="group-hover:translate-x-0.5 transition-transform" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="py-20 text-center border border-dashed border-white/10 rounded-3xl">
      <Icon name="heroicons:cube-transparent" class="text-5xl text-white/10 mb-4" />
      <p class="text-white/20 font-bold uppercase tracking-widest">No transmissions found in the archive.</p>
    </div>
  </div>
</template>