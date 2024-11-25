<template>
  <div ref="canvasContainer" class="canvas-container">
    <canvas ref="canvas" />
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

// Initialize canvas and render the image
onMounted(() => {
  canvas.value = canvasContainer.value.querySelector("canvas");
  ctx.value = canvas.value.getContext("2d");

  // Render the image when component mounts
  renderImage();
});

// Watch for zoomLevel changes or new images
watch(
  () => [props.image, props.zoomLevel],
  () => {
    renderImage();
  },
  { deep: true }
);

// Function to render the image
const renderImage = () => {
  if (!props.image) return;

  const img = new Image();
  img.src = props.image;

  img.onload = () => {
    // Set canvas dimensions to match the image dimensions
    canvas.value.width = img.width * props.zoomLevel;
    canvas.value.height = img.height * props.zoomLevel;

    // Clear the canvas and draw the scaled image
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.drawImage(img, 0, 0, canvas.value.width, canvas.value.height);
  };
};
</script>

<style scoped>
.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

canvas {
  border: 1px solid #ccc;
  max-width: 100%;
  height: auto;
}
</style>
