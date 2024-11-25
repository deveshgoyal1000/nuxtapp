<template>
  <div class="canvas-container">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  image: String,
  zoomLevel: Number,
});

const canvasRef = ref(null);
const width = 800;  // Width of the canvas
const height = 600; // Height of the canvas

const drawImage = () => {
  const canvas = canvasRef.value;
  const context = canvas.getContext('2d');
  const img = new Image();
  img.src = props.image;

  img.onload = () => {
    const scale = props.zoomLevel; // Scaling based on zoom level
    const x = (width - img.width * scale) / 2;
    const y = (height - img.height * scale) / 2;

    context.clearRect(0, 0, width, height);
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  };
};

// Watch zoom level to re-render the canvas
watch(() => props.zoomLevel, drawImage);

onMounted(() => {
  drawImage();
});
</script>

<style scoped>
.canvas-container {
  text-align: center;
  margin-top: 20px;
}

canvas {
  border: 2px solid #ccc;
  border-radius: 8px;
}
</style>
