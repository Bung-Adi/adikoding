<script setup>
  useHead({
    bodyAttrs: {
      class: 'bg-slate-900 text-white transition-colors duration-700 ease-in-out overflow-x-hidden'
    }
  })
</script>
<template>
  <div class="relative min-h-screen overflow-x-hidden bg-transparent">
    <ThreeScene ref="sceneRef" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- <div class="fixed z-50 bottom-8 right-8 md:bottom-18 md:right-12">
      <div class="flex items-center justify-center w-24 h-24 border rounded-full bg-white/10 backdrop-blur-md border-white/20 touch-none">
        <div class="w-10 h-10 rounded-full shadow-xl bg-white/40" />
      </div>
    </div> -->
  </div>
</template>
