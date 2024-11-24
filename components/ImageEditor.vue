<template>
  <div class="image-editor-container">
    <!-- Canvas element for image manipulation -->
    <canvas ref="canvas" class="image-canvas"></canvas>

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
import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';

const imageSrc = ref(null);
const canvas = ref(null);
const uploadedImage = ref(null);
const cropMode = ref(false);

// Initialize Fabric.js canvas when the component is mounted
onMounted(() => {
  const ctx = canvas.value;
  const fabricCanvas = new fabric.Canvas(ctx);

  // Handle image loading
  if (imageSrc.value) {
    fabric.Image.fromURL(imageSrc.value, (img) => {
      img.set({ left: 0, top: 0, angle: 0 });
      fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
      fabricCanvas.renderAll();
    });
  }

  // Function to handle zoom in
  function zoomIn() {
    fabricCanvas.setZoom(fabricCanvas.getZoom() * 1.1);
  }

  // Function to handle zoom out
  function zoomOut() {
    fabricCanvas.setZoom(fabricCanvas.getZoom() * 0.9);
  }

  // Reset zoom to 1
  function resetZoom() {
    fabricCanvas.setZoom(1);
  }

  // Enable Crop Mode
  function enableCrop() {
    cropMode.value = true;
    fabricCanvas.isDrawingMode = true;
  }

  // Crop the image (currently just cutting out a portion)
  function cropImage() {
    if (cropMode.value) {
      const croppedImage = fabricCanvas.getObjects()[0];
      const croppedData = croppedImage.toDataURL();
      uploadedImage.value = croppedData; // Update with cropped image
      cropMode.value = false;
      fabricCanvas.clear();
    }
  }
});

// Watch the uploaded image to reload it into fabric.js
watch(uploadedImage, (newImage) => {
  if (newImage) {
    const fabricCanvas = new fabric.Canvas(canvas.value);
    fabric.Image.fromURL(newImage, (img) => {
      img.set({ left: 0, top: 0, angle: 0 });
      fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
      fabricCanvas.renderAll();
    });
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
  max-width: 100%;
  height: auto;
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
