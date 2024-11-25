<template>
  <div ref="canvasContainer" class="canvas-container">
    <canvas id="imageCanvas" width="500" height="500"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const canvasContainer = ref(null);
const zoomLevel = ref(1); // Set default zoom level
const img = ref(null); // Reference to the image object
const canvas = ref(null);
const ctx = ref(null);

onMounted(() => {
  canvas.value = document.getElementById('imageCanvas');
  ctx.value = canvas.value.getContext('2d');

  // Set canvas size to match container size
  canvas.value.width = canvasContainer.value.offsetWidth;
  canvas.value.height = canvasContainer.value.offsetHeight;

  // Load image
  img.value = new Image();
  img.value.src = 'path_to_image.jpg'; // Replace with your image path

  img.value.onload = () => {
    drawImage();
  };

  // Resize handler to adjust canvas size dynamically
  window.addEventListener('resize', () => {
    canvas.value.width = canvasContainer.value.offsetWidth;
    canvas.value.height = canvasContainer.value.offsetHeight;
    drawImage();
  });
});

// Function to draw image with zoom
const drawImage = () => {
  const scale = zoomLevel.value;
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.value.drawImage(img.value, 0, 0, img.value.width * scale, img.value.height * scale);
};

// Watch for zoomLevel changes and update the image rendering
watch(zoomLevel, () => {
  if (img.value) {
    drawImage();
  }
});

// Function to zoom in
const zoomIn = () => {
  zoomLevel.value += 0.1;
};

// Function to zoom out
const zoomOut = () => {
  if (zoomLevel.value > 0.1) {
    zoomLevel.value -= 0.1;
  }
};

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
