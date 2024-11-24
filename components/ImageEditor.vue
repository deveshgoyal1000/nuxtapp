<template>
  <div class="image-editor-container">
    <div ref="container" class="image-canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Konva from "konva";

const container = ref(null);
const stage = ref(null);
const layer = ref(null);

onMounted(() => {
  const stageInstance = new Konva.Stage({
    container: container.value,
    width: 800,
    height: 600,
  });

  const layerInstance = new Konva.Layer();
  stageInstance.add(layerInstance);
  stage.value = stageInstance;
  layer.value = layerInstance;

  const imageObj = new Image();
  imageObj.src = "https://via.placeholder.com/150"; // Test image
  imageObj.onload = () => {
    const konvaImage = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: 150,
      height: 150,
    });
    layerInstance.add(konvaImage);
    layerInstance.batchDraw();
  };
});
</script>

<style scoped>
.image-editor-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.image-canvas {
  width: 800px;
  height: 600px;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
}
</style>
