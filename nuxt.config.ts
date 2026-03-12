export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2026-02-18',
  modules: [
    '@tresjs/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'],
    }
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', files: ['en.json'] },
      { code: 'id', iso: 'id-ID', name: 'Indonesia', files: ['id.json'] },
      { code: 'zh', iso: 'zh-CN', name: 'Chinese', files: ['zh.json'] }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default', // Creates /id/ and /zh/ but keeps home as /
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    pages: {
      // Disable i18n for specific pages
      'admin/dashboard': false,
      'admin/creations': false,
      'admin/campaigns': false,
      'windbind': false,
    }
  }
})