<script setup lang="ts">
  const route = useRoute()
  const { getCreationBySlug, loading } = useCreations()
  const { locale } = useI18n()

  const project = getCreationBySlug(route.params.slug as string)

  useSeoMeta({
    title: () => project.value?.title || 'Made by Adikoding',
    ogTitle: () => project.value?.title || 'Made by Adikoding',
    description: () => project.value?.seo_description[locale.value] 
                    || project.value?.description[locale.value] 
                    || 'A special project by Adikoding',
    ogDescription: () => project.value?.seo_description[locale.value] 
                    || project.value?.description[locale.value] 
                    || 'A special project by Adikoding',
    ogImage: () => project.value?.thumbnail_url 
              || 'https://adikoding.com/nothumbnail.webp',
    twitterCard: 'summary_large_image',
    twitterTitle: () => project.value?.title || 'Made by Adikoding',
    twitterDescription: () => project.value?.seo_description[locale.value] 
                        || project.value?.description[locale.value] 
                        || 'A special project by Adikoding',
    twitterImage: () => project.value?.thumbnail_url 
                  || 'https://adikoding.com/nothumbnail.webp',
    ogType: 'article',
    ogUrl: () => `https://adikoding.com/${project.value?.slug}`
  })
</script>

<template>
  <div v-if="project" class="min-h-screen pb-24">
    <section class="relative h-[60vh] flex items-end px-6 pb-12 overflow-hidden">
      <img 
        :src="project.thumbnail_url" 
        class="absolute inset-0 z-0 object-cover w-full h-full"
        alt="Project creation thumbnail of {{ project.title }}"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent z-10"></div>

      <div class="relative z-20 w-full max-w-5xl mx-auto">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full bg-[--color-create-blue] text-[10px] font-black uppercase tracking-widest text-white">
            {{ project.category }}
          </span>
          <span class="text-white/40 text-[10px] font-mono">/ {{ project.slug }}</span>
        </div>
        <h1 class="mb-6 text-5xl font-black leading-none tracking-tighter text-white uppercase md:text-7xl">
          {{ project.title }}
        </h1>
        
        <div class="flex flex-wrap gap-3">
          <span v-for="tech in project.tech_stack" :key="tech" class="pb-1 text-xs font-bold border-b text-white/60 border-white/10">
            #{{ tech }}
          </span>
        </div>
      </div>
    </section>

    <main class="grid max-w-5xl grid-cols-1 gap-12 px-6 mx-auto mt-12 lg:grid-cols-4">
      
      <aside class="order-2 space-y-8 lg:col-span-1 lg:order-1">
        <div v-if="project.links?.length" class="space-y-4">
          <h4 class="text-[10px] font-black uppercase text-white/20 tracking-widest">Connect / Links</h4>
          <div class="flex flex-col gap-2">
            <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" 
               class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[--color-create-blue]/50 transition-all group">
              <span class="text-sm font-bold">{{ link.label }}</span>
              <Icon name="heroicons:arrow-up-right-20-solid" class="text-white/20 group-hover:text-[--color-create-blue] transition-colors" />
            </a>
          </div>
        </div>
      </aside>

      <article class="order-1 lg:col-span-3 lg:order-2">
        <div 
          class="prose prose-invert prose-blue max-w-none 
                 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                 prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-lg
                 prose-img:rounded-[2.5rem] prose-img:border prose-img:border-white/10"
          v-html="project.content[locale]"
        ></div>
      </article>

    </main>

    <footer class="flex items-center justify-between max-w-5xl px-6 pt-12 mx-auto mt-24 border-t border-white/5">
       <NuxtLink to="/creation" class="flex items-center gap-2 text-xs font-bold transition-all text-white/40 hover:text-white">
         <Icon name="heroicons:arrow-left-20-solid" /> BACK TO ARCHIVE
       </NuxtLink>
    </footer>
  </div>
  <div v-else-if="loading" class="flex items-center justify-center min-h-screen">
     <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-[--color-create-blue]"></div>
  </div>
  <div v-else class="flex flex-col items-center justify-center min-h-screen text-center">
     <h2 class="mb-4 text-4xl font-black uppercase">Project Not Found_</h2>
     <NuxtLink to="/creations" class="px-8 py-3 font-bold text-black bg-white rounded-full">Return to Creations</NuxtLink>
  </div>
</template>