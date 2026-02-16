<template>
  <div class="relative min-h-screen">
    <ThreeScene ref="sceneRef" />

    <AppSidebar class="hidden md:flex" />
    
    <main class="pt-10 pb-24 md:pb-10 px-4">
      <slot />
    </main>

    <div class="fixed bottom-8 left-8 z-50 md:bottom-12 md:left-12">
      <div 
        class="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center touch-none"
        @touchstart="handleAnalogStart"
      >
        <div class="w-10 h-10 rounded-full bg-white/40 shadow-xl" />
      </div>
    </div>

    <MobileNav class="md:hidden" />
  </div>
</template>