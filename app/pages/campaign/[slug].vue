<script setup lang="ts">
const route = useRoute()
const { getCampaignBySlug, loading } = useCampaigns()
const { locale } = useI18n()

const campaign = getCampaignBySlug(route.params.slug as string)

useHead({
  title: campaign.value ? `${campaign.value.title} | AdiKoding` : 'Campaign',
  meta: [
    { name: 'description', content: computed(() => campaign.value?.seo_metadata?.description?.[locale.value] || '') }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <div class="relative h-[60vh] flex items-end px-6 pb-12 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
      <img 
        :src="campaign.thumbnail_url" 
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[--color-create-blue]/20 blur-[120px] rounded-full" />
      
      <div class="max-w-7xl mx-auto w-full z-20">
        <NuxtLink to="/campaign" class="text-white/40 hover:text-white transition-colors flex items-center gap-2 mb-6">
          <Icon name="heroicons:arrow-left-20-solid" /> Back to Campaigns
        </NuxtLink>
        
        <h1 class="text-4xl font-black text-white tracking-tighter uppercase lg:text-5xl">
          {{ campaign?.title }}
        </h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div class="lg:col-span-2 space-y-12">
        <section>
          <h3 class="text-xs uppercase tracking-[0.3em] text-[--color-create-blue] font-bold mb-6">Mission Briefing</h3>
          <div 
            class="prose prose-invert prose-blue max-w-none 
                  prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                  prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-lg
                  prose-img:rounded-[2.5rem] prose-img:border prose-img:border-white/10"
            v-html="campaign.content[locale]"
          ></div>
        </section>
      </div>

      <aside class="space-y-6">
        <div class="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl sticky top-8">
          <div class="space-y-8">
            <div v-if="campaign.progress > 0">
              <div class="flex justify-between items-end mb-2">
                <span class="text-xs font-bold text-white/40 uppercase">Campaign Progress</span>
              </div>
              <div class="relative w-full md:w-48 h-48 shrink-0 flex items-center justify-center">
                <div class="absolute inset-0 rounded-full border-4 border-white/5" />
                <div 
                  class="absolute inset-0 rounded-full border-4 border-[--color-create-blue] border-t-transparent -rotate-45" 
                />
                <div class="text-center">
                  <span class="block text-3xl font-black text-white">{{ campaign.progress || 0 }}%</span>
                </div>
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

          </div>
        </div>
      </aside>
    </div>
  </div>
</template>