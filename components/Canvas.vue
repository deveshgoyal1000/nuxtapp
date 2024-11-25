<template>
  <div ref="canvasContainer" class="canvas-container">
    <canvas id="imageCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  zoomLevel: {
    type: Number,
    required: true,
  },
});

const canvasContainer = ref(null);
const canvas = ref(null);
const ctx = ref(null);

// Initialize canvas and render image
onMounted(() => {
  canvas.value = document.getElementById('imageCanvas');
  ctx.value = canvas.value.getContext('2d');
  
  // Resize canvas to fit the container
  canvas.value.width = canvasContainer.value.offsetWidth;
  canvas.value.height = canvasContainer.value.offsetHeight;

  renderImage();
});

// Watch for zoomLevel changes
watch(() => props.zoomLevel, () => {
  renderImage();
});

// Function to render the image on the canvas with zoom
const renderImage = () => {
  if (!props.image) return;

  const img = new Image();
  img.src = props.image;
  img.onload = () => {
    const canvasWidth = canvas.value.width;
    const canvasHeight = canvas.value.height;

    // Apply zoom by scaling the image
    const scaledWidth = img.width * props.zoomLevel;
    const scaledHeight = img.height * props.zoomLevel;

    // Calculate the position to center the image on the canvas
    const offsetX = (canvasWidth - scaledWidth) / 2;
    const offsetY = (canvasHeight - scaledHeight) / 2;

    // Clear canvas and draw the scaled image
    ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.value.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
  };
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 500px; /* Adjust this based on your design */
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  border: 1px solid #ccc;
}
</style>
git 