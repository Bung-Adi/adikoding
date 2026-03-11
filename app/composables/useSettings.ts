export const useSettings = () => {
  // Global state that survives navigation
  const settings = useState<any>('site-settings', () => null)
  const loading = ref(false)
  const supabase = useSupabaseClient()

  const refreshSettings = async () => {
    loading.value = true
    const { data } = await supabase.from('site_settings').select('*').single()
    settings.value = data
    loading.value = false
  }

  return {
    settings,
    loading,
    refreshSettings
  }
}