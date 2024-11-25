<template>
  <div>
    <h1>Welcome to the Medical Imaging App</h1>
    <input type="file" @change="uploadFile" accept="image/*" />

    <!-- Zoom Controls -->
    <Toolbar :zoomLevel="zoomLevel" :setZoomLevel="setZoomLevel" />

    <!-- Canvas for zoomable image -->
    <Canvas v-if="uploadedImage" :zoomLevel="zoomLevel" :image="uploadedImage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Canvas from '@/components/Canvas.vue';
import Toolbar from '@/components/Toolbar.vue';

const uploadedImage = ref(null);
const zoomLevel = ref(1); // Initial zoom level

// Function to handle image upload
function uploadFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result; // Store image preview URL
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
}

// Function to update zoom level
const setZoomLevel = (newZoomLevel) => {
  zoomLevel.value = newZoomLevel;
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

input {
  margin-bottom: 20px;
}
</style>
