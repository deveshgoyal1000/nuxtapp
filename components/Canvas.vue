<template>
  <div ref="canvasContainer" class="canvas-container">
    <canvas ref="canvas"></canvas>
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

  renderImage(); // Render the image when the component mounts
});

// Watch for changes in zoom level or image and re-render the image
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
    const containerWidth = canvasContainer.value.offsetWidth;
    const containerHeight = canvasContainer.value.offsetHeight;

    // Calculate aspect ratio for the image
    const imgAspectRatio = img.width / img.height;
    const containerAspectRatio = containerWidth / containerHeight;

    let scaledWidth, scaledHeight;

    // Fit the image within the container while maintaining its aspect ratio
    if (imgAspectRatio > containerAspectRatio) {
      // Image is wider than container
      scaledWidth = containerWidth * props.zoomLevel;
      scaledHeight = (containerWidth / img.width) * img.height * props.zoomLevel;
    } else {
      // Image is taller than container
      scaledHeight = containerHeight * props.zoomLevel;
      scaledWidth = (containerHeight / img.height) * img.width * props.zoomLevel;
    }

    // Set canvas size
    canvas.value.width = scaledWidth;
    canvas.value.height = scaledHeight;

    // Clear canvas and draw the scaled image
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.drawImage(img, 0, 0, scaledWidth, scaledHeight);
  };
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 500px; /* Adjust height to suit your layout */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Ensures no overflow for larger images */
}

canvas {
  border: 1px solid #ccc;
  max-width: 100%;
  max-height: 100%;
}
</style>
