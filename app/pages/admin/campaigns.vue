<script setup lang="ts">
  import { toRaw } from 'vue'

  definePageMeta({ 
    middleware: 'auth',
    layout: 'admin' 
  })

  // 1. Global Composable
  const { campaigns, refreshCampaigns } = useCampaigns()
  const supabase = useSupabaseClient()

  // 2. Local State
  const isEditing = ref(false)
  const activeLang = ref<'en' | 'id' | 'zh'>('en')
  const loading = ref(false)

  // Define as a plain object constant to act as a blueprint
  const campaignBlueprint = {
    id: null,
    title: '',
    slug: '',
    status: 'upcoming' as 'upcoming' | 'active' | 'completed',
    progress: 0,
    date_range: '',
    thumbnail_url: '',
    content: { en: '', id: '', zh: '' },
    seo_metadata: { 
      title: { en: '', id: '', zh: '' }, 
      description: { en: '', id: '', zh: '' } 
    }
  }

  const form = ref(structuredClone(campaignBlueprint))

  const resetForm = () => {
    form.value = structuredClone(campaignBlueprint)
    isEditing.value = false
    activeLang.value = 'en'
  }

  const editCampaign = (item: any) => {
    const base = structuredClone(campaignBlueprint)
    
    // Safe Deep Merge
    form.value = {
      ...base,
      ...item,
      content: { ...base.content, ...item.content },
      seo_metadata: {
        title: { ...base.seo_metadata.title, ...(item.seo_metadata?.title || {}) },
        description: { ...base.seo_metadata.description, ...(item.seo_metadata?.description || {}) }
      },
    }
    isEditing.value = true
  }

  const saveCampaign = async () => {
    loading.value = true
    // Convert Proxy to plain object for Supabase
    const payload = JSON.parse(JSON.stringify(toRaw(form.value)))

    try {
      let error
      const id = payload.id
      delete payload.id // Always remove ID from the data body

      if (id) {
        const { error: updateError } = await supabase
          .from('campaigns')
          .update(payload)
          .eq('id', id)
        error = updateError
      } else {
        const { error: insertError } = await supabase
          .from('campaigns')
          .insert(payload)
        error = insertError
      }

      if (error) throw error

      alert('Campaign synchronized successfully!')
      resetForm()
      await refreshCampaigns() // Syncs global state across app
    } catch (err: any) {
      alert(`Error: ${err.message}`)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="min-h-screen bg-(--main-dark)/50 text-white p-8">
    <div class="flex justify-between items-center mb-12">
      <h1 class="text-3xl font-black uppercase tracking-tighter text-white">Campaigns_Hub</h1>
      <button 
        @click="isEditing = !isEditing; if(!isEditing) resetForm()" 
        class="px-6 py-2 bg-green-500 rounded-full font-bold text-sm text-white hover:bg-green-600 transition-all"
      >
        {{ isEditing ? 'BACK TO LIST' : 'INITIATE NEW CAMPAIGN' }}
      </button>
    </div>

    <div v-if="!isEditing" class="grid gap-6">
      <div v-for="item in campaigns" :key="item.id" 
        class="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div class="flex items-center gap-6 w-full">
          <div class="w-16 h-16 rounded-2xl bg-white/10 flex-shrink-0 flex items-center justify-center font-black text-green-500">
            {{ item.progress }}%
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/60 uppercase font-bold">{{ item.status }}</span>
              <span class="text-[10px] text-white/30 uppercase tracking-widest">{{ item.date_range }}</span>
            </div>
            <h3 class="text-xl font-bold text-white">{{ item.title }}</h3>
          </div>
        </div>
        <button @click="editCampaign(item)" class="w-full md:w-auto px-6 py-2 border border-white/10 hover:bg-white/10 rounded-xl font-bold transition-all">
          Edit
        </button>
      </div>
    </div>

    <div v-else class="space-y-8 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <label class="admin-label">General Info</label>
          <input v-model="form.title" placeholder="Campaign Name" class="admin-input" />
          <input v-model="form.slug" placeholder="campaign-slug" class="admin-input" />
          <input v-model="form.date_range" placeholder="e.g., Q1 2026 or 2026-03-20" class="admin-input" />
        </div>

        <div class="space-y-4">
          <label class="admin-label">Status & Progress</label>
          <select v-model="form.status" class="admin-input">
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <div class="flex items-center gap-4">
            <input type="range" v-model.number="form.progress" min="0" max="100" class="flex-1 accent-green-500" />
            <span class="font-black text-xl w-12">{{ form.progress }}%</span>
          </div>
          <input v-model="form.thumbnail_url" placeholder="Thumbnail Image URL" class="admin-input" />
        </div>
      </div>

      <div class="pt-8 border-t border-white/10">
        <div class="flex gap-4 mb-6">
          <button v-for="l in ['en', 'id', 'zh']" :key="l" 
            @click="activeLang = l as 'en' | 'id' | 'zh'" 
            :class="activeLang === l ? 'text-green-500 border-b-2 border-green-500' : 'text-white/40'"
            class="uppercase text-xs font-black pb-1 transition-all"
          >
            {{ l }} Content
          </button>
        </div>
        <textarea 
          v-model="form.content[activeLang as keyof typeof form.content]" 
          rows="12" 
          placeholder="Describe the campaign mission..." 
          class="admin-input font-mono text-sm"
        ></textarea>
      </div>

      <button @click="saveCampaign" class="w-full py-4 bg-green-500 text-white font-black rounded-2xl shadow-lg hover:brightness-110 transition-all">
        PUSH UPDATE TO LIVE SITE
      </button>
    </div>
  </div>
</template>