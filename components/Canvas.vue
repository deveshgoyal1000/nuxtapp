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
    required: true
  },
  zoomLevel: {
    type: Number,
    required: true
  }
});

const canvasContainer = ref(null);
const canvas = ref(null);
const ctx = ref(null);

onMounted(() => {
  canvas.value = document.getElementById('imageCanvas');
  ctx.value = canvas.value.getContext('2d');

  canvas.value.width = canvasContainer.value.offsetWidth;
  canvas.value.height = canvasContainer.value.offsetHeight;

  renderImage();
});

watch(() => props.zoomLevel, () => {
  renderImage();
});

const renderImage = () => {
  if (!props.image) return;

  const img = new Image();
  img.src = props.image;
  img.onload = () => {
    const canvasWidth = canvas.value.width;
    const canvasHeight = canvas.value.height;

    const scaledWidth = img.width * props.zoomLevel;
    const scaledHeight = img.height * props.zoomLevel;

    ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.value.drawImage(img, 0, 0, scaledWidth, scaledHeight);
  };
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  border: 1px solid #ccc;
}
</style>
