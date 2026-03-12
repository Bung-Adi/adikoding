<script setup lang="ts">
  definePageMeta({ layout: 'admin', middleware: 'auth' })

  const { media, loading, fetchMedia, uploadMedia, deleteMedia, getPublicUrl } = useMedia()

  onMounted(() => fetchMedia())

  const handleUpload = async (e: any) => {
    const file = e.target.files[0]
    if (file) await uploadMedia(file)
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }
</script>

<template>
  <div class="p-8">
    <header class="flex items-center justify-between mb-10">
      <h1 class="text-3xl italic font-black text-white uppercase">Media Center<span class="text-studio-blue">.</span></h1>
      
      <label class="px-6 py-2 text-sm font-bold transition-transform cursor-pointer bg-studio-blue rounded-xl hover:scale-105">
        UPLOAD NEW
        <input type="file" class="hidden" @change="handleUpload" accept="image/*" />
      </label>
    </header>
    
    <div v-if="media.length === 0 && !loading" class="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
      <p class="tracking-widest uppercase text-white/20">No assets found. Upload your first image!</p>
    </div>

    <div v-if="loading" class="tracking-widest uppercase text-white/20">Scanning Storage...</div>

    <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      <div v-for="file in media" :key="file.id" class="relative p-2 transition-all border group bg-white/5 rounded-2xl border-white/5 hover:border-white/20">
        
        <div class="mb-3 overflow-hidden bg-black aspect-square rounded-xl">
          <img :src="getPublicUrl(file.name)" class="object-cover w-full h-full" />
        </div>

        <div class="px-2 pb-2">
          <p class="text-[10px] text-white/40 truncate mb-3">{{ file.name }}</p>
          
          <div class="flex gap-2">
            <button @click="copyToClipboard(getPublicUrl(file.name))" class="flex-1 bg-white/10 hover:bg-studio-blue py-1.5 rounded-lg text-[10px] font-bold transition-colors">
              COPY URL
            </button>
            <button @click="deleteMedia(file.name)" class="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-1.5 rounded-lg transition-colors">
              <Icon name="heroicons:trash-solid" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>