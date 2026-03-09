<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()
const slug = route.params.slug

// Fetch specific campaign details
const { data: campaign, error } = await useAsyncData(`campaign-${slug}`, async () => {
  const { data } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (!data) throw createError({ statusCode: 404, message: 'Campaign not found' })
  return data
})

useHead({
  title: campaign.value ? `${campaign.value.title} | AdiKoding` : 'Campaign'
})
</script>

<template>
  <div class="min-h-screen">
    <div class="relative h-[60vh] flex items-end px-6 pb-12 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
      <div class="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[--color-create-blue]/20 blur-[120px] rounded-full" />
      
      <div class="max-w-7xl mx-auto w-full z-20">
        <NuxtLink to="/campaign" class="text-white/40 hover:text-white transition-colors flex items-center gap-2 mb-6">
          <Icon name="heroicons:arrow-left-20-solid" /> Back to Campaigns
        </NuxtLink>
        
        <h1 class="text-6xl font-black text-white tracking-tighter uppercase lg:text-8xl">
          {{ campaign?.title }}
        </h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div class="lg:col-span-2 space-y-12">
        <section>
          <h3 class="text-xs uppercase tracking-[0.3em] text-[--color-create-blue] font-bold mb-6">Mission Briefing</h3>
          <div class="prose prose-invert prose-lg max-w-none text-white/70">
            {{ campaign?.description }}
          </div>
        </section>

        <div class="grid grid-cols-2 gap-4">
          <div class="aspect-square rounded-3xl bg-white/5 border border-white/10" />
          <div class="aspect-square rounded-3xl bg-white/5 border border-white/10" />
        </div>
      </div>

      <aside class="space-y-6">
        <div class="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl sticky top-8">
          <div class="space-y-8">
            <div>
              <div class="flex justify-between items-end mb-2">
                <span class="text-xs font-bold text-white/40 uppercase">Campaign Progress</span>
                <span class="text-2xl font-black text-white">{{ campaign?.progress }}%</span>
              </div>
              <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-[--color-create-blue] transition-all duration-1000" 
                  :style="{ width: `${campaign?.progress}%` }"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 pt-4 border-t border-white/10">
              <div>
                <p class="text-[10px] text-white/30 uppercase tracking-widest">Current Status</p>
                <p class="text-white font-bold">{{ campaign?.status }}</p>
              </div>
              <div>
                <p class="text-[10px] text-white/30 uppercase tracking-widest">Timeline</p>
                <p class="text-white font-bold">{{ campaign?.date_range }}</p>
              </div>
            </div>

            <button class="w-full py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
              CONTRIBUTE NOW
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>