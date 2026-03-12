<script setup lang="ts">
const route = useRoute()
const { getCreationBySlug, loading } = useCreations()
const { locale } = useI18n()

const project = getCreationBySlug(route.params.slug as string)

useHead({
  title: computed(() => `${project.value?.title || 'Project'} | AdiKoding Studio`),
  meta: [
    { name: 'description', content: computed(() => project.value?.seo_metadata?.description?.[locale.value] || '') }
  ]
})
</script>

<template>
  <div v-if="project" class="min-h-screen pb-24">
    <section class="relative h-[60vh] flex items-end px-6 pb-12 overflow-hidden">
      <img 
        :src="project.thumbnail_url" 
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent z-10"></div>

      <div class="relative z-20 max-w-5xl mx-auto w-full">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full bg-[--color-create-blue] text-[10px] font-black uppercase tracking-widest text-white">
            {{ project.category }}
          </span>
          <span class="text-white/40 text-[10px] font-mono">/ {{ project.slug }}</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
          {{ project.title }}
        </h1>
        
        <div class="flex flex-wrap gap-3">
          <span v-for="tech in project.tech_stack" :key="tech" class="text-xs font-bold text-white/60 border-b border-white/10 pb-1">
            #{{ tech }}
          </span>
        </div>
      </div>
    </section>

    <main class="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
      
      <aside class="lg:col-span-1 space-y-8 order-2 lg:order-1">
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

      <article class="lg:col-span-3 order-1 lg:order-2">
        <div 
          class="prose prose-invert prose-blue max-w-none 
                 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                 prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-lg
                 prose-img:rounded-[2.5rem] prose-img:border prose-img:border-white/10"
          v-html="project.content[locale]"
        ></div>
      </article>

    </main>

    <footer class="max-w-5xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 flex justify-between items-center">
       <NuxtLink to="/creation" class="text-xs font-bold text-white/40 hover:text-white flex items-center gap-2 transition-all">
         <Icon name="heroicons:arrow-left-20-solid" /> BACK TO ARCHIVE
       </NuxtLink>
    </footer>
  </div>
  <div v-else-if="loading" class="min-h-screen flex items-center justify-center">
     <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-[--color-create-blue]"></div>
  </div>
  <div v-else class="min-h-screen flex flex-col items-center justify-center text-center">
     <h2 class="text-4xl font-black mb-4 uppercase">Project Not Found_</h2>
     <NuxtLink to="/creations" class="bg-white text-black px-8 py-3 rounded-full font-bold">Return to Creations</NuxtLink>
  </div>
</template>