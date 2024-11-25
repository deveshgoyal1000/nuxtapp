<template>
  <div>
    <h1>Welcome to the Medical Imaging App</h1>
    <input type="file" @change="uploadFile" accept="image/*" />
    
    <div v-if="uploadedImage">
      <h2>Uploaded Image Preview:</h2>
      <img :src="uploadedImage" alt="Uploaded Image" />
    </div>

    <!-- Zoom Controls -->
    <div class="toolbar">
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
    </div>
    
    <!-- Canvas Component -->
    <Canvas :zoomLevel="zoomLevel" />
  </div>
</template>

<script setup>
import Canvas from '@/components/Canvas.vue';
import { ref } from 'vue';

const uploadedImage = ref(null);
const zoomLevel = ref(1); // Initial zoom level

// File upload function
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

// Zoom in and zoom out functions
const zoomIn = () => {
  zoomLevel.value += 0.1;
};

const zoomOut = () => {
  if (zoomLevel.value > 0.1) {
    zoomLevel.value -= 0.1;
  }
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

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
}

.toolbar {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
