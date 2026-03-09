export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/windbind') // Send them to secret login
  }
})