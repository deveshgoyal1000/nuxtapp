<template>
  <div>
    <h1 class="text-2xl font-bold">Medical Imaging Tool</h1>
    <input type="file" @change="handleFileUpload" />
  </div>
</template>

<script setup>
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  console.log('File Uploaded:', file);
};
</script>
