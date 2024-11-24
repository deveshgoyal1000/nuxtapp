<template>
  <div>
    <h3 class="text-lg font-semibold">Image Editor</h3>
    
    <!-- First Upload Option (File Upload Button) -->
    <input type="file" @change="handleImageUpload" />
    
    <!-- Second Upload Option (Drag and Drop Area) -->
    <div
      ref="dropArea"
      class="border p-4 mt-4 text-center"
      @dragover.prevent
      @drop="handleDrop"
    >
      Drop image here or select from above
    </div>

    <!-- Container for Konva Stage -->
    <div ref="stageContainer" class="border mt-4"></div>
  </div>
</template>

<script setup>
import Konva from 'konva';
import { ref, onMounted } from 'vue';

const stageContainer = ref(null);
const stage = ref(null);
const layer = ref(null);
const imageElement = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    loadImage(file);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    loadImage(file);
  }
};

const loadImage = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    // Create an image element
    imageElement.value = new Image();
    imageElement.value.src = reader.result;
    imageElement.value.onload = () => {
      // Dynamically resize the Konva stage to fit the image
      if (stage.value) {
        stage.value.width(imageElement.value.width);
        stage.value.height(imageElement.value.height);
      }

      // Create Konva Image node
      const konvaImage = new Konva.Image({
        image: imageElement.value,
        x: 0,
        y: 0,
        width: imageElement.value.width,
        height: imageElement.value.height,
      });

      // Clear any previous images and add the new one
      layer.value.removeChildren();
      layer.value.add(konvaImage);
      layer.value.batchDraw();
    };
  };
  reader.readAsDataURL(file);
};

onMounted(() => {
  // Initialize Konva stage with default size
  stage.value = new Konva.Stage({
    container: stageContainer.value,
    width: 800,
    height: 600,
  });

  // Initialize Konva layer
  layer.value = new Konva.Layer();
  stage.value.add(layer.value);
});
</script>

<style scoped>
/* Optional: Styling for file input and drop area */
input[type="file"] {
  display: block;
  margin-bottom: 10px;
}

#dropArea {
  border: 2px dashed #cccccc;
  padding: 20px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
