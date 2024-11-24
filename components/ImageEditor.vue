<template>
  <div class="image-editor-container">
    <!-- Konva Canvas container -->
    <div ref="container" class="image-canvas"></div>

    <!-- Zoom Controls -->
    <div class="controls">
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
      <button @click="resetZoom">Reset Zoom</button>
    </div>

    <!-- Crop and Panning -->
    <div class="controls">
      <button @click="enableCrop">Enable Crop</button>
      <button @click="cropImage">Crop</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Konva from 'konva';

const container = ref(null);
const uploadedImage = ref(null);
const stage = ref(null);
const layer = ref(null);

// Initialize Konva canvas
onMounted(() => {
  const stageInstance = new Konva.Stage({
    container: container.value, // Correct Vue 3 reference
    width: 800, // Fixed width
    height: 500, // Fixed height
  });

  const layerInstance = new Konva.Layer();
  stageInstance.add(layerInstance);

  stage.value = stageInstance;
  layer.value = layerInstance;
});

// Zoom Controls
function zoomIn() {
  const scale = stage.value.scaleX();
  stage.value.scale({ x: scale * 1.1, y: scale * 1.1 });
  layer.value.batchDraw();
}

function zoomOut() {
  const scale = stage.value.scaleX();
  stage.value.scale({ x: scale * 0.9, y: scale * 0.9 });
  layer.value.batchDraw();
}

function resetZoom() {
  stage.value.scale({ x: 1, y: 1 });
  layer.value.batchDraw();
}

// Crop and Panning (Optional)
let cropMode = ref(false);
function enableCrop() {
  cropMode.value = true;
}

function cropImage() {
  if (cropMode.value) {
    const image = layer.value.findOne('Image');
    const cropBox = image.getClientRect();

    const croppedImage = new Konva.Image({
      x: cropBox.x,
      y: cropBox.y,
      width: cropBox.width,
      height: cropBox.height,
      image: image.image(),
    });

    layer.value.add(croppedImage);
    layer.value.batchDraw();
    cropMode.value = false;
  }
}

// Watch for uploadedImage changes
watch(uploadedImage, (newImage) => {
  if (newImage) {
    console.log("Uploaded Image Source:", newImage);

    const imageObj = new Image();
    imageObj.src = newImage;

    imageObj.onload = () => {
      console.log("Image loaded successfully.");
      console.log("Image Dimensions:", imageObj.width, imageObj.height);

      const konvaImage = new Konva.Image({
        x: 50,
        y: 50,
        image: imageObj,
        width: imageObj.width,
        height: imageObj.height,
      });

      layer.value.add(konvaImage);
      layer.value.batchDraw();
    };

    imageObj.onerror = (e) => {
      console.error("Failed to load image", e);
    };
  }
});
</script>

<style scoped>
.image-editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.image-canvas {
  border: 1px solid #ccc;
  width: 800px;
  height: 500px;
  background-color: #f3f3f3;
}

.controls {
  margin-top: 10px;
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px;
  cursor: pointer;
}
</style>
