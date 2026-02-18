<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

// Get the slug from the URL parameters
const slug = route.params.slug

// Fetch only the specific project matching this slug
const { data: project, error } = await useAsyncData(`project-${slug}`, async () => {
  const { data } = await supabase
    .from('creations')
    .select('*')
    .eq('slug', slug)
    .single() // Ensures we only get one record
  
  if (!data) throw createError({ statusCode: 404, message: 'Project not found' })
  return data
})

// Update SEO title based on project name
useHead({
  title: project.value ? `${project.value.title} | AdiKoding` : 'Project Details'
})
</script>

<template>
  <div class="max-w-4xl px-6 py-12 mx-auto">
    <NuxtLink to="/creation" class="inline-flex items-center mb-8 text-sm text-white/40 hover:text-white group">
      <Icon name="heroicons:arrow-left-20-solid" class="mr-2 transition-transform group-hover:-translate-x-1" />
      Back to Creations
    </NuxtLink>

    <div v-if="project" class="space-y-8">
      <div class="overflow-hidden border shadow-2xl aspect-video rounded-3xl bg-white/5 border-white/10">
        <img 
          v-if="project.image_url" 
          :src="project.image_url" 
          class="object-cover w-full h-full" 
          :alt="project.title"
        />
        <div v-else class="flex items-center justify-center w-full h-full bg-slate-800">
          <Icon name="heroicons:photo-solid" class="text-6xl text-white/10" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div class="space-y-4 md:col-span-2">
          <h1 class="text-4xl font-black tracking-tight text-white">
            {{ project.title }}
          </h1>
          <div class="leading-relaxed prose prose-invert max-w-none text-white/70">
            {{ project.description }}
          </div>
        </div>

        <div class="space-y-6">
          <div class="p-6 space-y-4 border rounded-2xl bg-white/5 border-white/10">
            <div>
              <p class="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Category</p>
              <p class="text-sm font-semibold text-[--color-create-blue]">{{ project.category || 'Indie Project' }}</p>
            </div>
            <div v-if="project.link">
              <p class="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Live Preview</p>
              <a :href="project.link" target="_blank" class="flex items-center text-sm text-white hover:underline">
                Visit Project <Icon name="heroicons:arrow-top-right-on-square-20-solid" class="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="py-20 text-center">
      <h2 class="mb-2 text-2xl font-bold text-white">Oops! Project missing.</h2>
      <p class="mb-6 text-white/40">We couldn't find the project you're looking for.</p>
      <NuxtLink to="/creation" class="px-6 py-2 transition-colors rounded-full bg-white/10 hover:bg-white/20">
        Return to Gallery
      </NuxtLink>
    </div>
  </div>
</template>