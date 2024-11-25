<template>
  <div class="viewer">
    <h1>Upload and View Medical Images</h1>
    <input type="file" @change="uploadFile" accept="image/*" class="file-input" />

    <!-- Toolbar -->
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

const setZoomLevel = (newZoomLevel) => {
  zoomLevel.value = newZoomLevel;
};
</script>

<style scoped>
.viewer {
  margin-top: 50px;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #f8d210;
}

.file-input {
  margin: 20px auto;
  padding: 10px;
  background: #fff;
  border: none;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s ease;
}

.
