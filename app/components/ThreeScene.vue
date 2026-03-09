<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const positionX = ref(0)
const positionZ = ref(0)
const rotationY = ref(0)

onMounted(() => {
  // Circular motion on XZ plane
  gsap.to({}, {
    duration: 5,
    repeat: -1,
    ease: "none",
    onUpdate: function () {
      const progress = this.progress() * Math.PI * 2
      positionX.value = Math.cos(progress) * 3   // radius = 3
      positionZ.value = Math.sin(progress) * 3
    }
  })

  // Continuous spin
  gsap.to(rotationY, {
    value: Math.PI * 2,
    duration: 4,
    repeat: -1,
    ease: "none"
  })
})
</script>

<template>
  <TresCanvas window-size clear-color="black">
    <TresPerspectiveCamera :position="[0, 2, 8]" />
    <OrbitControls />

    <GLTFModel
      path="/logo.gltf"
      :position-x="positionX"
      :position-z="positionZ"
      :rotation-y="rotationY"
      :scale="[1,1,1]"
    />

    <TresAmbientLight />
    <TresDirectionalLight :position="[5,5,5]" />
    <TresGridHelper />
  </TresCanvas>
</template>
