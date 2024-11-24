<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">Medical Imaging Tool</h1>
    <input type="file" @change="handleFileUpload" accept=".png,.dcm" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log('Uploaded File:', file);
  // Handle file logic here
};
</script>
