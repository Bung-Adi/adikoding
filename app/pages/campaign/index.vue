<script setup lang="ts">
  const { campaigns, loading } = useCampaigns()
  const { locale } = useLanguage()

  // Sort campaigns by date_range (interpreting date strings where possible)
  const sortedCampaigns = computed(() => {
    return [...campaigns.value].sort((a, b) => {
      const dateA = new Date(a.date_range).getTime() || 0
      const dateB = new Date(b.date_range).getTime() || 0
      return dateA - dateB
    })
  })
</script>

<template>
  <div class="px-4 py-12 mx-auto max-w-7xl">
    <header class="mb-16">
      <h1 class="text-5xl font-black tracking-tighter text-white">
        CAMPAIGNS<span class="text-[--color-create-blue]">.</span>
      </h1>
      <p class="max-w-xl mt-4 text-white/50">
        Active initiatives and special projects currently running at AdiKoding Studio.
      </p>
    </header>

    <div v-if="sortedCampaigns.length" class="grid gap-8">
      <div 
        v-for="item in sortedCampaigns" 
        :key="item.id"
        class="group relative bg-[#0f172a]/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all"
      >
        <div class="flex flex-col lg:flex-row">
          
          <div class="lg:w-1/3 aspect-video lg:aspect-square overflow-hidden bg-slate-900">
            <img 
              v-if="item.thumbnail_url" 
              :src="item.thumbnail_url" 
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
            />
          </div>

          <div class="p-8 lg:p-12 flex-1 flex flex-col justify-center">
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <div 
                v-if="item.date_range && getStatusBadge(item.date_range)"
                :class="getStatusBadge(item.date_range)?.color"
                class="px-4 py-1 rounded-full text-[10px] font-black tracking-widest text-white transition-all shadow-xl"
              >
                {{ getStatusBadge(item.date_range)?.label }}
              </div>

              <span 
                :class="{
                  'text-emerald-400': item.status === 'active',
                  'text-blue-400': item.status === 'upcoming',
                  'text-white/20': item.status === 'completed'
                }"
                class="text-[10px] font-bold uppercase tracking-[0.3em]"
              >
                // {{ item.status }}
              </span>
            </div>

            <h2 class="text-3xl lg:text-4xl font-black text-white mb-4 uppercase tracking-tighter">
              {{ item.title }}
            </h2>

            <div v-if="item.progress > 0" class="mb-8 max-w-md">
              <div class="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest text-white/40">
                <span>Phase Progress</span>
                <span>{{ item.progress }}%</span>
              </div>
              <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-[--color-create-blue] transition-all duration-1000"
                  :style="{ width: `${item.progress}%` }"
                ></div>
              </div>
            </div>

            <div class="mt-auto flex gap-6 items-center">
               <NuxtLink 
                :to="`/campaign/${item.slug}`"
                class="px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-[--color-create-blue] hover:text-white transition-all text-sm uppercase"
               >
                 See The Details
               </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>