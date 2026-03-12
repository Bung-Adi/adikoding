export const useCampaigns = () => {
  const campaigns = useState<any[]>('campaigns-list', () => [])
  const loading = ref(false)
  const supabase = useSupabaseClient()

  const refreshCampaigns = async () => {
    loading.value = true
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      campaigns.value = data
    }
    loading.value = false
  }

  const getCampaignBySlug = (slug: string) => {
    return computed(() => {
      return campaigns.value.find(c => c.slug === slug)
    })
  }

  return {
    campaigns,
    loading,
    refreshCampaigns,
    getCampaignBySlug
  }
}