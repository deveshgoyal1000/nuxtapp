<template>
    <div id="app">
      <h1 class="text-center font-bold text-3xl">Medical Image Viewer</h1>
      
      <!-- Image Upload and Editor -->
      <div class="upload-section">
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*,application/dicom"
          class="file-input"
        />
        
        <!-- Display the Image Editor or DICOM Viewer based on file type -->
        <ImageEditor v-if="uploadedImage && !isDicomFile" :imageSrc="uploadedImage" />
        <DicomViewer v-if="isDicomFile" :dicomFile="uploadedFile" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ImageEditor from './components/ImageEditor.vue';
  import DicomViewer from './components/DicomViewer.vue';
  
  const uploadedImage = ref(null); // Holds base64 of the uploaded image
  const uploadedFile = ref(null); // Holds the uploaded file (image or DICOM)
  const isDicomFile = ref(false); // Boolean to determine if the file is a DICOM
  
  // Handle file upload and process the image or DICOM file
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    uploadedFile.value = file;
    isDicomFile.value = file.type === 'application/dicom';
  
    // Process image files
    if (!isDicomFile.value && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  </script>
  
  <style scoped>
  #app {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .upload-section {
    margin-top: 20px;
    text-align: center;
  }
  
  .file-input {
    margin-bottom: 20px;
    padding: 10px;
  }
  
  h1 {
    margin-bottom: 30px;
  }
  </style>
  