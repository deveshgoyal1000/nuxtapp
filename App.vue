<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/upload" class="nav-link">Upload</router-link>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <h1>Welcome to the Medical Imaging App</h1>
      <input type="file" @change="uploadFile" accept="image/*" />

      <!-- Zoom Controls -->
      <Toolbar :zoomLevel="zoomLevel" :setZoomLevel="setZoomLevel" />

      <!-- Canvas for zoomable image -->
      <Canvas v-if="uploadedImage" :zoomLevel="zoomLevel" :image="uploadedImage" />
    </div>
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
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Background and Body Styling */
body {
  background-color: #f4f7fc; /* Soft light background */
  color: #333; /* Dark text for contrast */
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  padding: 20px;
}

/* Navigation Bar */
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #4c8bf5; /* Calming blue */
  padding: 15px 0;
  border-radius: 8px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Main Content */
.content {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 32px;
  color: #2e3a59; /* Darker, softer text */
  margin-bottom: 20px;
}

input[type="file"] {
  padding: 10px;
  background-color: #f1f3f7;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  display: block;
  margin-bottom: 20px;
}

input[type="file"]:hover {
  background-color: #e1e6f0;
}

/* Zoom Controls */
.toolbar {
  margin-top: 20px;
}

canvas {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
