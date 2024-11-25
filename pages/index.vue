<template>
  <div>
    <h1>Welcome to the Medical Imaging App</h1>
    <input type="file" @change="uploadFile" accept="image/*" />
    <div v-if="uploadedImage">
      <h2>Uploaded Image Preview:</h2>
      <img :src="uploadedImage" alt="Uploaded Image" />
    </div>
    <Canvas />
    <Toolbar />
    <MetadataViewer />
  </div>
</template>

<script setup>
import Canvas from '@/components/Canvas.vue';
import Toolbar from '@/components/Toolbar.vue';
import MetadataViewer from '@/components/MetadataViewer.vue';
import { ref } from 'vue';

const uploadedImage = ref(null);

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
</style>
