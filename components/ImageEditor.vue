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

const imageSrc = ref(null);
const uploadedImage = ref(null);
const cropMode = ref(false);
const stage = ref(null);
const layer = ref(null);

// Initialize Konva canvas
onMounted(() => {
  const stageInstance = new Konva.Stage({
    container: $refs.container,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const layerInstance = new Konva.Layer();
  stageInstance.add(layerInstance);

  // Set up the image layer
  if (imageSrc.value) {
    const imageObj = new Image();
    imageObj.src = imageSrc.value;

    imageObj.onload = () => {
      const konvaImage = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: imageObj.width,
        height: imageObj.height,
      });

      layerInstance.add(konvaImage);
      layerInstance.batchDraw();
    };
  }

  stage.value = stageInstance;
  layer.value = layerInstance;
});

// Zoom In, Zoom Out, and Reset Zoom
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

// Enable crop mode
function enableCrop() {
  cropMode.value = true;
}

// Crop the image
function cropImage() {
  if (cropMode.value) {
    // Get the cropped area
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

// Watch for the uploaded image change
watch(uploadedImage, (newImage) => {
  if (newImage) {
    const imageObj = new Image();
    imageObj.src = newImage;

    imageObj.onload = () => {
      const konvaImage = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: imageObj.width,
        height: imageObj.height,
      });

      layer.value.add(konvaImage);
      layer.value.batchDraw();
    };
  }
});
</script>

<style scoped>
.image-editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-canvas {
  border: 1px solid #ccc;
  width: 100%;
  height: 500px; /* You can adjust this size as per your needs */
  background-color: #f3f3f3;
}

.controls {
  margin-top: 10px;
}

button {
  margin: 5px;
  padding: 10px;
  cursor: pointer;
}
</style>
