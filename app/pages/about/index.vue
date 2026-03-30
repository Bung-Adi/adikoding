<script setup lang="ts">
  const { locale } = useI18n()
  const { settings } = useSettings()

  const socialConfig = [
    { icon: 'akar-icons:youtube-fill', key: 'youtube' },
    { icon: 'akar-icons:tiktok-fill', key: 'tiktok' },
    { icon: 'akar-icons:github-fill', key: 'github' },
    { icon: 'akar-icons:discord-fill', key: 'discord' },
    { icon: 'akar-icons:instagram-fill', key: 'instagram' }, 
    { icon: 'akar-icons:behance-fill', key: 'behance' },
  ]

  const socials = computed(() => {
    if (!settings.value?.social_links) return []
    return socialConfig.map(s => ({
      icon: s.icon,
      link: settings.value.social_links[s.key] || '#'
    }))
  })

  useSeoMeta({
    title: $t('about.title'),
    ogTitle: $t('about.title'),
    description: $t('about.subtitle'),
    ogDescription: $t('about.subtitle'),
    // ogImage: () => project.value?.thumbnail_url,
    // twitterCard: 'summary_large_image',
    // ogType: 'article'
  })
</script>
<template>
  <div class="min-h-screen bg-(--main-dark)/50 text-white p-8">
    <header class="mb-16">
      <h1 class="text-5xl font-black tracking-tighter text-white">
        {{ $t('about.title') }}
      </h1>
    </header>
    <div class="overflow-hidden">
      <div class="flex flex-row gap-2">
        <div class="w-25 h-25 p-1 overflow-hidden transition-all border group rounded-[1rem] bg-white/10 border-white/5 hover:border-[var(--color-create-blue)]/50 hover:bg-white/5">
          <img 
          src="https://qqaykrbjyrsafbfttjkd.supabase.co/storage/v1/object/public/media/1774876157619-profile-pic-rl.jpg" 
          class="object-cover rounded-[1rem] w-full h-full transition-transform duration-700 group-hover:scale-110"
          alt="Adi alias Kuro Adi Profile Pic 2D and Real Life"/>
        </div>
        <div class="w-25 h-25 p-1 overflow-hidden transition-all border group rounded-[1rem] bg-white/10 border-white/5 hover:border-[var(--color-create-blue)]/50 hover:bg-white/5">
          <img 
          src="https://qqaykrbjyrsafbfttjkd.supabase.co/storage/v1/object/public/media/1774876169331-Profile2D.png" 
          class="object-cover rounded-[1rem] w-full h-full transition-transform duration-700 group-hover:scale-110"
          alt="Adi alias Kuro Adi Profile Pic 2D and Real Life"/>
        </div>
      </div>
      <h4 class="text-xs">Adi Reallife & Discord Profile Pic</h4>
    </div>
    <article class="py-8">
      <p>{{ $t('about.content') }}</p>
    </article>
    <NuxtLink v-for="s in socials" :key="s.icon" :to="s.link" class="p-5 transition-colors text-white/40 hover:text-white">
      <Icon :name="s.icon" class="text-xl" />
    </NuxtLink>
  </div>
</template>