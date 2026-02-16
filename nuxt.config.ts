export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  
  future: {
    compatibilityVersion: 4,
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  
  // This tells Nuxt how to handle the 3D components
  build: {
    transpile: ['three', '@tresjs/core', '@tresjs/cientos'],
  },

  // Setup for SEO: The default meta tags
  app: {
    head: {
      title: 'AdiKoding Studio',
      meta: [
        { name: 'description', content: 'Dev and Course' }
      ],
    }
  },

  // Supabase Configuration (Values come from your .env file)
  supabase: {
    redirect: false // So visitors can see your site without logging in
  }
})