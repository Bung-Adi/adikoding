export const useCreations = () => {
  const creations = useState<any[]>('creations-list', () => [])
  const loading = ref(false)
  const supabase = useSupabaseClient()

  const refreshCreations = async () => {
    loading.value = true
    const { data, error } = await supabase
      .from('creations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      creations.value = data
    }
    loading.value = false
  }

  // Helper to find a specific project in the already-fetched list
  const getCreationBySlug = (slug: string) => {
    // We use a computed property so it "waits" for the data to arrive
    return computed(() => {
      return creations.value.find(c => c.slug === slug)
    })
  }

  return {
    creations,
    loading,
    refreshCreations,
    getCreationBySlug
  }
}