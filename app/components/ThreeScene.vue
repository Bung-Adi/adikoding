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
    <TresCanvas window-size clear-color="black">
      <TresPerspectiveCamera />
      <OrbitControls />
      <TresMesh>
        <TresSphereGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresGridHelper />
    </TresCanvas>
  </div>
</template>