<template>
  <div>
    <h1>Upload and View Medical Images</h1>
    <input type="file" @change="uploadFile" accept="image/*" />
    <Canvas v-if="uploadedImage" :image="uploadedImage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Canvas from '@/components/Canvas.vue';

const uploadedImage = ref(null);

function uploadFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}

input {
  display: block;
  margin: 20px auto;
}
</style>
