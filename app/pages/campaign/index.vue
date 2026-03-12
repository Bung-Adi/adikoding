<script setup lang="ts">
  const { campaigns, loading } = useCampaigns()
  const { locale } = useI18n()
  const localePath = useLocalePath()

  // Sort campaigns by date_range (interpreting date strings where possible)
  const sortedCampaigns = computed(() => {
    return [...campaigns.value].sort((a, b) => {
      const dateA = new Date(a.date_range).getTime() || 0
      const dateB = new Date(b.date_range).getTime() || 0
      return dateA - dateB
    })
  })
  
  useSeoMeta({
    title: $t('campaigns.title'),
    ogTitle: $t('campaigns.title'),
    description: $t('campaigns.subtitle'),
    ogDescription: $t('campaigns.subtitle'),
    // ogImage: () => project.value?.thumbnail_url,
    // twitterCard: 'summary_large_image',
    // ogType: 'article'
  })
</script>

<template>
  <div class="px-4 py-12 mx-auto max-w-7xl">
    <header class="mb-16">
      <h1 class="text-5xl font-black tracking-tighter text-white">
        {{ $t('campaigns.title') }}<span class="text-[--color-camp-green]">.</span>
      </h1>
      <p class="max-w-xl mt-4 text-white/50">
        {{ $t('campaigns.subtitle') }}
      </p>
    </header>

    <div v-if="sortedCampaigns.length" class="grid gap-8">
      <div 
        v-for="item in sortedCampaigns" 
        :key="item.id"
        class="group relative bg-white/10 border border-white/5 rounded-[2rem] overflow-hidden hover:border-[var(--color-camp-green)]/50 hover:bg-white/5 transition-all"
      >
        <div class="flex flex-col lg:flex-row">
          
          <div class="overflow-hidden lg:w-1/3 aspect-video lg:aspect-square bg-slate-900">
            <img 
              v-if="item.thumbnail_url" 
              :src="item.thumbnail_url" 
              class="object-cover w-full h-full transition-all duration-700 grayscale group-hover:grayscale-0"
              alt="Program campaign thumbnail of {{ item.title }}"
            />
          </div>

          <div class="flex flex-col justify-center flex-1 p-8 lg:p-12">
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

            <h2 class="mb-4 text-3xl font-black tracking-tighter text-white uppercase lg:text-4xl">
              {{ item.title }}
            </h2>

            <div v-if="item.progress > 0" class="max-w-md mb-8">
              <div class="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest text-white/40">
                <span>Phase Progress</span>
                <span>{{ item.progress }}%</span>
              </div>
              <div class="w-full h-1 overflow-hidden rounded-full bg-white/5">
                <div 
                  class="h-full bg-[var(--color-camp-green)] transition-all duration-1000"
                  :style="{ width: `${item.progress}%` }"
                ></div>
              </div>
            </div>

            <div class="flex items-center gap-6 mt-auto">
               <NuxtLink 
                :to="localePath(`/campaign/${item.slug}`)"
                class="px-8 py-3 bg-white/5 text-white-200 font-black rounded-xl hover:bg-[var(--color-camp-green)] hover:text-white transition-all text-sm uppercase"
               >
                 {{ $t('campaigns.post-btn') }}
               </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>