<template>
    <div class="upload-page">
      <h1 class="text-2xl font-bold mb-4">Upload and Edit Images</h1>
  
      <!-- Single File Input for Image Upload -->
      <input
        type="file"
        @change="handleFileUpload"
        accept="image/*"
        class="file-input"
      />
  
      <!-- Pass uploaded image data to ImageEditor -->
      <div v-if="uploadedImage" class="image-container">
        <img :src="uploadedImage" alt="Uploaded Image" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Reactive reference for the uploaded image
  const uploadedImage = ref(null);
  
  // Function to handle file uploads
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // Handle image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.value = e.target.result; // Pass image data to display
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Unsupported file type:', file.type);
    }
  };
  </script>
  
  <style scoped>
  .upload-page {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .file-input {
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .image-container {
    margin-top: 20px;
  }
  
  img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
  }
  </style>
  