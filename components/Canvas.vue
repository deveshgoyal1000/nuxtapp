<template>
  <div ref="canvasContainer" class="canvas-container">
    <canvas id="imageCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const canvasContainer = ref(null);

onMounted(() => {
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d');
  // Example: Add image rendering logic here
});
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  border: 1px solid #ccc;
}
</style>
