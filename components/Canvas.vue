<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="600" height="400"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  image: String, // Image data URL from the parent
  zoomLevel: Number, // Zoom level from the parent
});

const canvas = ref(null);
const ctx = ref(null);
const imageObj = ref(null);

onMounted(() => {
  ctx.value = canvas.value.getContext('2d');
  imageObj.value = new Image();
  
  imageObj.value.onload = () => {
    drawImage();
  };
  
  watch(() => props.image, (newImage) => {
    if (newImage) {
      imageObj.value.src = newImage;
    }
  });

  watch(() => props.zoomLevel, () => {
    if (props.image) {
      drawImage();
    }
  });
});

const drawImage = () => {
  const scale = props.zoomLevel || 1;
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.value.drawImage(imageObj.value, 0, 0, imageObj.value.width * scale, imageObj.value.height * scale);
};
</script>

<style scoped>
.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  border: 1px solid #ccc;
}
</style>
