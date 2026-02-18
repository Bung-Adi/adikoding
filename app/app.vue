<script setup lang="ts">
import { ref } from 'vue'
import ThreeScene from '~/components/ThreeScene.vue'

const sceneRef = ref()
const isDragging = ref(false)
const joystickPos = ref({ x: 0, y: 0 })
let startPos = { x: 0, y: 0 }

const handlePointerDown = (e: PointerEvent) => {
  isDragging.value = true
  startPos = { x: e.clientX, y: e.clientY }
  if (e.target instanceof HTMLElement) {
    e.target.setPointerCapture(e.pointerId)
  }
}

const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging.value || !sceneRef.value) return

  const deltaX = (e.clientX - startPos.x) * 0.01
  const deltaY = (e.clientY - startPos.y) * 0.01

  // Keep your joystick visual logic
  joystickPos.value = {
    x: Math.max(Math.min(deltaX * 50, 30), -30),
    y: Math.max(Math.min(deltaY * 50, 30), -30)
  }

  // THE KEY FIX:
  // 1. sceneRef.value.controls gets the RefImpl you saw in the console
  // 2. .value unwraps it to get the <OrbitControls> component
  // 3. .instance gets the actual Three.js "OrbitControls" object
  const controls = sceneRef.value.controls?.value?.instance

  if (controls) {
    // Now rotateLeft and rotateUp will definitely exist
    controls.rotateLeft(deltaX * 2.0) 
    controls.rotateUp(deltaY * 2.0)
    controls.update()
  }
}

const handlePointerUp = () => {
  isDragging.value = false
  joystickPos.value = { x: 0, y: 0 }
}
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden bg-transparent">
    <ThreeScene ref="sceneRef" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div class="fixed z-50 bottom-8 right-8 md:bottom-18 md:right-12">
      <div
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerUp"
        class="flex items-center justify-center w-24 h-24 border rounded-full bg-white/10 backdrop-blur-md border-white/20 touch-none"
      >
        <div
          class="w-10 h-10 rounded-full shadow-xl bg-white/40"
          :style="{ transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)` }"
        />
      </div>
    </div>

  </div>
</template>
