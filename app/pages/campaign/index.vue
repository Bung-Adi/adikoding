<script setup lang="ts">
const supabase = useSupabaseClient()

// Fetch campaigns
const { data: campaigns } = await useAsyncData('campaigns', async () => {
  const { data } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })
  return data
})

// Function to get status colors
const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    case 'upcoming': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    default: return 'bg-white/10 text-white/50 border-white/20'
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-12 px-6">
    <header class="mb-16">
      <h1 class="text-5xl font-black tracking-tighter text-white">
        CAMPAIGNS<span class="text-[--color-create-blue]">.</span>
      </h1>
      <p class="mt-4 text-white/40 max-w-lg">
        Active initiatives and special projects currently running at AdiKoding Studio.
      </p>
    </header>

    <div class="grid gap-8">
      <div 
        v-for="campaign in campaigns" 
        :key="campaign.id"
        class="group relative flex flex-col md:flex-row gap-8 p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
      >
        <div class="relative w-full md:w-48 h-48 shrink-0 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-4 border-white/5" />
          <div 
            class="absolute inset-0 rounded-full border-4 border-[--color-create-blue] border-t-transparent -rotate-45" 
          />
          <div class="text-center">
            <span class="block text-3xl font-black text-white">{{ campaign.progress || 0 }}%</span>
            <span class="text-[10px] uppercase tracking-widest text-white/30">Target</span>
          </div>
        </div>

        <div class="flex-1 space-y-4">
          <div class="flex items-center gap-3">
            <span :class="['px-3 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-full', getStatusClass(campaign.status)]">
              {{ campaign.status }}
            </span>
            <span class="text-white/20 text-xs">{{ campaign.date_range }}</span>
          </div>
          
          <h2 class="text-3xl font-bold text-white group-hover:text-[--color-create-blue] transition-colors">
            {{ campaign.title }}
          </h2>
          
          <p class="text-white/60 leading-relaxed max-w-2xl">
            {{ campaign.description }}
          </p>

          <div class="pt-4 flex items-center gap-6">
            <NuxtLink 
              :to="`/campaign/${campaign.slug}`"
              class="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-[--color-create-blue] hover:text-white transition-all"
            >
              Join Campaign
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>