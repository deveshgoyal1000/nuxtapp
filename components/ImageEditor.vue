<template>
  <div class="image-editor-container">
    <div ref="container" class="image-canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Konva from "konva";

// Props
const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  }
});

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
});

// Watch for imageSrc changes
watch(() => props.imageSrc, (newImageSrc) => {
  if (newImageSrc) {
    const imageObj = new Image();
    imageObj.src = newImageSrc; // This is the uploaded image

    imageObj.onload = () => {
      const konvaImage = new Konva.Image({
        x: 50,
        y: 50,
        image: imageObj,
        width: 150,
        height: 150,
      });

      layer.value.add(konvaImage);
      layer.value.batchDraw();
    };

    imageObj.onerror = () => {
      console.error("Failed to load image.");
    };
  }
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
