<script setup lang="ts">
// Initialize Supabase client
const supabase = useSupabaseClient()

// Fetch data from your 'creations' table
const { data: creations, error } = await useAsyncData('creations', async () => {
  const { data } = await supabase
    .from('creations')
    .select('*')
    .order('created_at', { ascending: false })
  return data
})
</script>

<template>
  <div class="px-4 py-12 mx-auto max-w-7xl">
    <header class="mb-12">
      <h1 class="text-4xl font-black tracking-tighter text-white lg:text-6xl">
        CREATION<span class="text-[--color-create-blue]">.</span>
      </h1>
      <p class="max-w-xl mt-4 text-white/50">
        A collection of experimental projects, indie games, and digital experiences built at AdiKoding Studio.
      </p>
    </header>

    <div v-if="creations" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="item in creations" 
        :key="item.id"
        class="relative p-4 overflow-hidden transition-all border group rounded-3xl bg-white/5 border-white/10 hover:bg-white/10"
      >
        <div class="mb-4 overflow-hidden aspect-video rounded-2xl bg-slate-800">
          <img v-if="item.image_url" :src="item.image_url" class="object-cover w-full h-full transition-transform group-hover:scale-105" />
          <div v-else class="flex items-center justify-center w-full h-full text-white/20">
            <Icon name="heroicons:photo-solid" class="text-4xl" />
          </div>
        </div>

        <h3 class="mb-2 text-xl font-bold text-white">{{ item.title }}</h3>
        <p class="mb-4 text-sm text-white/60 line-clamp-2">{{ item.description }}</p>

        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-widest text-[--color-create-blue]">
            {{ item.category || 'Development' }}
          </span>
          <NuxtLink 
            :to="`/creation/${item.slug}`"
            class="p-2 rounded-full bg-white/10 text-white hover:bg-[--color-create-blue] transition-colors"
          >
            <Icon name="heroicons:arrow-up-right-20-solid" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-red-400">Error loading projects. Check Supabase connection.</div>
    <div v-else class="text-white/20">No projects found. Time to build something!</div>
  </div>
</template>