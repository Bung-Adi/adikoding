export const useLanguage = () => {
  // Global state for locale, defaults to English
  const cookieLocale = useCookie<'en' | 'id' | 'zh'>('user-locale', {
    default: () => 'en',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    watch: true // Auto-syncs when value changes
  })

  const locale = useState<'en' | 'id' | 'zh'>('locale', () => cookieLocale.value || 'en')

  watch(locale, (newVal) => {
    cookieLocale.value = newVal
  })

  return {
    locale
  }
}