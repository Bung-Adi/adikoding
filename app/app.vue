<script setup lang="ts">
const { locale } = useLanguage()
const { refreshSettings } = useSettings()
const { refreshCreations } = useCreations()

await useAsyncData('init-app', async () => {
  await Promise.all([
    refreshSettings(),
    refreshCreations()
  ])
})
</script>
<template>
  <div class="relative min-h-screen overflow-x-hidden bg-transparent">
    <ThreeScene class="-z-10"/>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>
