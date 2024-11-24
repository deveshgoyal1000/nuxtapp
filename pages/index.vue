<template>
  <div>
    <h1>Welcome to the Medical Imaging App</h1>
    <input type="file" @change="uploadFile" accept=".dcm" />
    <Canvas />
    <Toolbar />
    <MetadataViewer />
  </div>
</template>

<script setup>
import Canvas from '@/components/Canvas.vue';
import Toolbar from '@/components/Toolbar.vue';
import MetadataViewer from '@/components/MetadataViewer.vue';

function uploadFile(event) {
  const file = event.target.files[0];
  console.log("File uploaded:", file);
  // Add logic to parse and render DICOM file
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
</style>
