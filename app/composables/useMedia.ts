// composables/useMedia.ts
export const useMedia = () => {
  const supabase = useSupabaseClient()
  const media = ref<any[]>([])
  const loading = ref(false)

  const fetchMedia = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase.storage
        .from('media')
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) throw error
      // Filter out the placeholder .emptyFolderPlaceholder file Supabase sometimes creates
      media.value = data?.filter(f => f.name !== '.emptyFolderPlaceholder') || []
    } catch (err) {
      console.error("Fetch Error:", err)
    } finally {
      loading.value = false
    }
  }

  const uploadMedia = async (file: File) => {
    loading.value = true
    // Use a clean filename: timestamp + original name
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
    
    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, file)

    if (error) {
      alert("Upload failed: " + error.message)
    } else {
      await fetchMedia()
    }
    loading.value = false
    return { data, error }
  }

  const deleteMedia = async (name: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return
    
    const { error } = await supabase.storage.from('media').remove([name])
    if (error) alert(error.message)
    else await fetchMedia()
  }

  const getPublicUrl = (name: string) => {
    const { data } = supabase.storage.from('media').getPublicUrl(name)
    return data.publicUrl
  }

  return { media, loading, fetchMedia, uploadMedia, deleteMedia, getPublicUrl }
}