export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2026-02-18',
  modules: [
    '@tresjs/nuxt',
    'nuxt-monaco-editor',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'],
    }
  },
  robots: {
    groups: [
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot'],
        disallow: ['/']
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/**',
          '/windbind',
          '/_nuxt/',
        ]
      }
    ],
    sitemap: 'https://adikoding.com/sitemap.xml' 
  },
  site: {
    url: 'https://adikoding.com',
  },
  sitemap: {
    sources: ['/api/sitemap-urls'],
    exclude: ['/admin/**', '/windbind'],
    autoI18n: true
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', files: ['en.json'] },
      { code: 'id', iso: 'id-ID', name: 'Indonesia', files: ['id.json'] },
      { code: 'zh', iso: 'zh-CN', name: 'Chinese', files: ['zh.json'] }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    pages: {
      'admin/dashboard': false,
      'admin/creations': false,
      'admin/campaigns': false,
      'windbind': false,
    }
  },
})