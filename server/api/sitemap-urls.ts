import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // This helper is provided by @nuxtjs/supabase
  const client = await serverSupabaseClient(event)

  const [{ data: creations }, { data: campaigns }] = await Promise.all([
    client.from('creations').select('slug'),
    client.from('campaigns').select('slug')
  ])

  return [
    ...(creations?.map(p => ({ loc: `/creations/${p.slug}`, _i18nTransform: true })) || []),
    ...(campaigns?.map(c => ({ loc: `/campaigns/${c.slug}`, _i18nTransform: true })) || [])
  ]
})