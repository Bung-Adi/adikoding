<script setup lang="ts">
definePageMeta({ 
  middleware: 'auth',
  layout: 'admin'
})

const supabase = useSupabaseClient()
const creations = ref<any[]>([])
const isEditing = ref(false)
const activeLang = ref('en')

// Form State
const form = ref({
  title: '',
  slug: '',
  category: 'web',
  tech_stack: [] as string[],
  links: [] as {label: string, url: string}[],
  content: { en: '', id: '', zh: '' },
  thumbnail_url: ''
})

const fetchCreations = async () => {
  const { data } = await supabase.from('creations').select('*').order('created_at', { ascending: false })
  if (data) creations.value = data
}

const addTech = (event: any) => {
  const val = event.target.value.trim()
  if (val && !form.value.tech_stack.includes(val)) {
    form.value.tech_stack.push(val)
    event.target.value = ''
  }
}

const saveCreation = async () => {
  const { error } = await supabase.from('creations').upsert([form.value])
  if (!error) {
    alert('Project Saved!')
    isEditing.value = false
    fetchCreations()
  }
}

onMounted(fetchCreations)
</script>

<template>
  <div class="min-h-screen bg-(--main-dark)/50 text-white p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-3xl font-black uppercase tracking-tighter">Creations Manager</h1>
        <button 
          @click="isEditing = !isEditing" 
          class="px-6 py-2 bg-[--color-create-blue] rounded-full font-bold text-sm"
        >
          {{ isEditing ? 'CANCEL' : 'ADD NEW PROJECT' }}
        </button>
      </div>

      <div v-if="!isEditing" class="grid gap-4">
        <div v-for="item in creations" :key="item.id" class="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
          <div>
            <span class="text-[10px] text-[--color-create-blue] font-bold uppercase">{{ item.category }}</span>
            <h3 class="text-xl font-bold">{{ item.title }}</h3>
          </div>
          <div class="flex gap-2">
             <button @click="form = item; isEditing = true" class="p-2 hover:bg-white/10 rounded-lg">Edit</button>
          </div>
        </div>
      </div>

      <div v-else class="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <input v-model="form.title" placeholder="Project Title" class="admin-input" />
            <input v-model="form.slug" placeholder="url-slug-name" class="admin-input" />
            <select v-model="form.category" class="admin-input">
              <option value="web">Web</option>
              <option value="games">Games</option>
              <option value="apps">Apps</option>
            </select>
          </div>

          <div>
            <label class="block text-[10px] text-white/30 uppercase mb-2">Tech Stack (Press Enter)</label>
            <input @keydown.enter="addTech" placeholder="e.g. Nuxt, Three.js" class="admin-input" />
            <div class="flex flex-wrap gap-2 mt-3">
              <span v-for="t in form.tech_stack" :key="t" class="px-2 py-1 bg-white/10 rounded text-xs">
                {{ t }} <button @click="form.tech_stack = form.tech_stack.filter(i => i !== t)">×</button>
              </span>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10">
          <div class="flex gap-4 mb-4">
            <button v-for="l in ['en', 'id', 'zh']" @click="activeLang = l" :class="activeLang === l ? 'text-[--color-create-blue]' : ''" class="uppercase text-xs font-bold">{{ l }}</button>
          </div>
          <textarea v-model="form.content[activeLang as keyof typeof form.content]" rows="10" placeholder="HTML or Markdown content..." class="admin-input font-mono text-sm"></textarea>
        </div>

        <button @click="saveCreation" class="w-full py-4 bg-white text-black font-black rounded-2xl">PUBLISH CREATION</button>
      </div>
    </div>
  </div>
</template>