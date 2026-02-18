<script setup lang="ts">
defineProps(['error'])
const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-white bg-slate-900">
    <h1 class="font-black text-9xl opacity-20">404</h1>
    <p class="mt-4 text-2xl">Lost in the 3D void?</p>
    <button 
      @click="handleClearError"
      class="px-6 py-3 mt-8 font-bold transition bg-blue-500 rounded-full hover:bg-blue-400"
    >
      Return Home
    </button>
  </div>
</template>