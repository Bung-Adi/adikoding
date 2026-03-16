<script setup lang="ts">
  import { toRaw } from 'vue'

  definePageMeta({ 
    middleware: 'auth',
    layout: 'admin'
  })

  const { creations, refreshCreations } = useCreations()
  const supabase = useSupabaseClient()

  const isEditing = ref(false)
  const activeLang = ref<'en' | 'id' | 'zh'>('en')
  const loading = ref(false)

  const initialForm = {
    id: null,
    title: '',
    slug: '',
    category: 'web',
    tech_stack: [] as string[],
    links: [] as { id: string, label: string, url: string }[],
    content: { en: '', id: '', zh: '' },
    seo_metadata: { 
      title: { en: '', id: '', zh: '' }, 
      description: { en: '', id: '', zh: '' } 
    },
    thumbnail_url: ''
  }

  const form = ref(structuredClone(initialForm))

  const addTech = (event: Event) => {
    const input = event.target as HTMLInputElement | null
    if (!input) return
    const val = input.value.trim()
    if (val && !form.value.tech_stack.includes(val)) {
      form.value.tech_stack.push(val)
      input.value = ''
    }
  }

  const removeTech = (tech: string) => {
    form.value.tech_stack = form.value.tech_stack.filter(t => t !== tech)
  }

  const addLink = () => {
    form.value.links.push({ id: crypto.randomUUID(), label: '', url: '' })
  }

  const removeLink = (id: string) => {
    form.value.links = form.value.links.filter(link => link.id !== id)
  }

  const resetAndClose = () => {
    form.value = structuredClone(initialForm)
    isEditing.value = false
    activeLang.value = 'en'
  }

  const startEdit = (item: any) => {
    const baseForm = JSON.parse(JSON.stringify(initialForm))
    form.value = {
      ...baseForm,
      ...item,
      content: { ...baseForm.content, ...item.content },
      seo_metadata: {
        title: { ...baseForm.seo_metadata.title, ...(item.seo_metadata?.title || {}) },
        description: { ...baseForm.seo_metadata.description, ...(item.seo_metadata?.description || {}) }
      },
      tech_stack: item.tech_stack || [],
      links: item.links || []
    }
    isEditing.value = true
  }

  const saveCreation = async () => {
    loading.value = true
    const payload = JSON.parse(JSON.stringify(toRaw(form.value)))

    try {
      let error
      if (payload.id) {
        const id = payload.id
        delete payload.id
        const { error: updateError } = await supabase.from('creations').update(payload).eq('id', id)
        error = updateError
      } else {
        delete payload.id
        const { error: insertError } = await supabase.from('creations').insert(payload)
        error = insertError
      }

      if (error) throw error

      alert('Project synchronized successfully!')
      resetAndClose()
      await refreshCreations() // Syncs the global state
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="max-w-6xl mx-auto bg-(--main-dark)/50">
    <div class="flex items-center justify-between mb-12">
      <h1 class="text-3xl font-black tracking-tighter uppercase">Creations_Manager</h1>
      <button 
        @click="isEditing ? resetAndClose() : isEditing = true" 
        class="px-6 py-2 bg-[var(--color-create-blue)] rounded-full font-bold text-sm hover:bg-blue-600 transition-all"
        :class="isEditing ? 'bg-white/10 text-white' : 'bg-[var(--color-create-blue)] text-white'"
      >
        {{ isEditing ? 'CANCEL' : 'ADD NEW PROJECT' }}
      </button>
    </div>

    <div v-if="!isEditing" class="grid gap-4">
      <div v-for="item in creations" :key="item.id" 
        class="p-6 bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center group hover:border-[var(--color-create-blue)]/50 transition-all"
      >
        <div>
          <span class="text-[10px] text-[var(--color-create-blue)] font-bold uppercase tracking-widest">{{ item.category }}</span>
          <h3 class="text-xl font-bold">{{ item.title }}</h3>
          <p class="mt-1 font-mono text-xs text-white/20">/{{ item.slug }}</p>
        </div>
        <button @click="startEdit(item)" class="px-5 py-2 text-sm font-bold border bg-white/5 hover:bg-white/10 rounded-xl border-white/5">
          Edit Project
        </button>
      </div>
    </div>

    <div v-else class="space-y-8 duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div class="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-8">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div class="space-y-6">
            <h2 class="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Basic Information</h2>
            <div class="space-y-4">
              <input v-model="form.title" placeholder="Project Title" class="admin-input" />
              <input v-model="form.slug" placeholder="url-slug-name" class="admin-input" />
              <select v-model="form.category" class="admin-input">
                <option value="web">Web</option>
                <option value="games">Games</option>
                <option value="apps">Apps</option>
                <option value="3d modeling">3D Modeling</option>
                <option value="other">Other</option>
              </select>
              <input v-model="form.thumbnail_url" placeholder="Thumbnail URL (from Supabase Storage)" class="admin-input" />
            </div>
          </div>

          <div class="space-y-6">
            <h2 class="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Tech & Connectivity</h2>
            
            <div>
              <input @keydown.enter.prevent="addTech" placeholder="Add Tech (Press Enter)" class="admin-input" />
              <div class="flex flex-wrap gap-2 mt-3">
                <span v-for="t in form.tech_stack" :key="t" class="px-3 py-1 bg-[var(--color-create-blue)]/10 border border-[var(--color-create-blue)]/20 rounded-full text-[10px] font-bold">
                  {{ t }} <button @click="form.tech_stack = form.tech_stack.filter(i => i !== t)" class="ml-2 hover:text-red-400">×</button>
                </span>
              </div>
            </div>

            <div class="space-y-3">
              <div v-for="link in form.links" :key="link.id" class="flex gap-2">
                <input v-model="link.label" placeholder="Label (e.g. GitHub)" class="admin-input !py-2 text-xs" />
                <input v-model="link.url" placeholder="URL" class="admin-input !py-2 text-xs" />
                <button @click="removeLink(link.id)" class="p-2 text-red-500 rounded-lg hover:bg-red-500/10">×</button>
              </div>
              <button @click="addLink" class="text-[10px] font-bold text-[var(--color-create-blue)] uppercase tracking-widest">+ Add Link</button>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Project Narrative</h2>
            <div class="flex gap-2 p-1 border rounded-lg bg-black/40 border-white/5">
              <button v-for="l in (['en', 'id', 'zh'] as const)" :key="l" 
                @click="activeLang = l" 
                :class="activeLang === l ? 'bg-[var(--color-create-blue)] text-white shadow-lg' : 'text-white/40 hover:text-white'"
                class="px-4 py-1.5 rounded-md text-[10px] font-black transition-all uppercase"
              >
                {{ l }}
              </button>
            </div>
          </div>
          <ClientOnly>
            <MonacoEditor
              v-model="form.content[activeLang]"
              lang="markdown"
              :options="{
                theme: 'vs-dark',
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 24,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 2,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 }
              }"
              class="h-[500px]"
            />
            <template #fallback>
              <div class="h-[500px] flex items-center justify-center text-white/20 font-mono animate-pulse">
                Initializing Studio Editor...
              </div>
            </template>
          </ClientOnly>
          <div class="pt-2 space-y-6">
            <h2 class="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">SEO Metadata</h2>
            <input v-model="form.seo_metadata.title[activeLang]" placeholder="Project Title" class="admin-input" />
            <input v-model="form.seo_metadata.description[activeLang]" placeholder="Description (English)" class="admin-input" />
          </div>
        </div>

        <button 
          @click="saveCreation" 
          :disabled="loading"
          class="w-full py-5 bg-[var(--color-create-blue)] text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
        >
          {{ loading ? 'SYNCING DATA...' : 'PUBLISH PROJECT' }}
        </button>
      </div>
    </div>
  </div>
</template>