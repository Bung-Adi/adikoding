<!-- <script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const ballRef = ref()

const moveBall = (x: number, y: number) => {
  if (ballRef.value) {
    ballRef.value.position.x += x * 0.1
    ballRef.value.position.z += y * 0.1
  }
}

defineExpose({ moveBall })
</script> -->

<template>
  <div class="fixed inset-0 pointer-events-none">
    <h1>TEST</h1>
    <!-- <ClientOnly>
      <TresCanvas clear-color="#0f172a">
        <TresPerspectiveCamera :position="[0, 5, 10]" />
        <OrbitControls />

        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />

        <TresMesh ref="ballRef" :position="[0, 1, 0]">
          <TresSphereGeometry :args="[1, 32, 32]" />
          <TresMeshStandardMaterial :color="theme.ballColor" />
        </TresMesh>

        <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
          <TresPlaneGeometry :args="[20, 20]" />
          <TresMeshStandardMaterial color="#1e293b" />
        </TresMesh>

        <TresGridHelper :args="[20, 20, '#334155', '#334155']" />
      </TresCanvas>
    </ClientOnly> -->
  </div>
</template>