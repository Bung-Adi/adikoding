<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const positionY = ref(0)
const orbitRef = ref()

onMounted(() => {
  gsap.to(positionY, {
    value: -5,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "bounce.out"
  })
})

// Expose OrbitControls ref to parent
defineExpose({
  controls: orbitRef
})
</script>

<template>
  <TresCanvas window-size clear-color="black">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls ref="orbitRef" />

    <GLTFModel
      path="/logo.gltf"
      :position-y="positionY"
      :scale="[1,1,1]"
    />

    <TresAmbientLight />
    <TresDirectionalLight :position="[5,5,5]" />
    <TresGridHelper />
  </TresCanvas>
</template>