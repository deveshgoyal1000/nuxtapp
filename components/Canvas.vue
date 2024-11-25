<template>
  <div ref="canvasContainer" class="canvas-container">
    <canvas id="imageCanvas" width="500" height="500"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const canvasContainer = ref(null);

onMounted(() => {
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to match container size
  canvas.width = canvasContainer.value.offsetWidth;
  canvas.height = canvasContainer.value.offsetHeight;

  // Example: Image rendering logic
  const img = new Image();
  img.src = 'path_to_image.jpg'; // Replace with your image path

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Resize handler to adjust canvas size dynamically
  window.addEventListener('resize', () => {
    canvas.width = canvasContainer.value.offsetWidth;
    canvas.height = canvasContainer.value.offsetHeight;
    // Re-render the image on resize
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
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
