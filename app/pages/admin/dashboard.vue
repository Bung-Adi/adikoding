<script setup lang="ts">
  import { toRaw } from 'vue'

  definePageMeta({ 
    middleware: 'auth',
    layout: 'admin'
  })

  const supabase = useSupabaseClient()
  // 1. Destructure refreshSettings to sync global state after save
  const { settings, refreshSettings } = useSettings()
  const loading = ref(false)
  const activeLang = ref('en')

  const langs = [
    { code: 'en', label: 'English' },
    { code: 'id', label: 'Indonesia' },
    { code: 'zh', label: 'Mandarin' }
  ]

  const handleSave = async () => {
    if (!settings.value) return
    
    loading.value = true
    
    // 2. Use toRaw and clone to ensure a clean payload
    const payload = JSON.parse(JSON.stringify(toRaw(settings.value)))
    const id = payload.id
    delete payload.id // Standard practice: don't send ID in the update body

    try {
      const { error } = await supabase
        .from('site_settings')
        .update(payload)
        .eq('id', id)

      if (error) throw error
      
      // 3. IMPORTANT: Tell the global state to fetch the new data from DB
      await refreshSettings()
      
      alert('Settings synchronized across the site!')
    } catch (error: any) {
      alert(`Update failed: ${error.message}`)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="min-h-screen bg-(--main-dark)/50 text-white p-8">
    <header class="max-w-5xl mx-auto flex justify-between items-center mb-12">
      <div>
        <h1 class="text-3xl font-black tracking-tighter uppercase">Website Meta & Link</h1>
        <p class="text-white/40 text-sm">Managing: {{ settings?.id ? 'Live Site' : 'Loading...' }}</p>
      </div>
    </header>

    <main v-if="settings" class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside class="space-y-2">
        <button 
          v-for="lang in langs" 
          :key="lang.code"
          @click="activeLang = lang.code"
          :class="['w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm', 
            activeLang === lang.code ? 'bg-[var(--color-home-blue)] text-white' : 'bg-white/5 text-white/40 hover:bg-white/10']"
        >
          {{ lang.label }} Content
        </button>
      </aside>

      <section class="lg:col-span-3 space-y-8 bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
        <div class="space-y-6">
          <div>
            <label class="block text-[10px] uppercase tracking-widest text-white/30 mb-2">Site Title ({{ activeLang }})</label>
            <input v-model="settings.title[activeLang]" class="admin-input" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-[10px] uppercase tracking-widest text-white/30 mb-2">Tagline 1</label>
              <textarea v-model="settings.tagline[activeLang]" rows="3" class="admin-input"></textarea>
            </div>
            <div>
              <label class="block text-[10px] uppercase tracking-widest text-white/30 mb-2">Tagline 2</label>
              <textarea v-model="settings.tagline_2[activeLang]" rows="3" class="admin-input"></textarea>
            </div>
          </div>

          <div class="pt-6 border-t border-white/10">
            <h3 class="text-xs font-bold mb-4 text-[var(--color-home-blue)]">Global Social Links</h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(val, key) in settings.social_links" :key="key">
                <label class="block text-[10px] uppercase text-white/30 mb-1">{{ key }}</label>
                <input v-model="settings.social_links[key]" class="admin-input text-xs" />
              </div>
            </div>
          </div>
        </div>

        <button 
          @click="handleSave"
          :disabled="loading"
          class="w-full py-4 bg-[var(--color-home-blue)] text-black font-black rounded-2xl hover:bg-blue-400 hover:text-white transition-all disabled:opacity-50"
        >
          {{ loading ? 'SAVING CHANGES...' : 'PUBLISH SETTINGS' }}
        </button>
      </section>
    </main>
  </div>
</template>