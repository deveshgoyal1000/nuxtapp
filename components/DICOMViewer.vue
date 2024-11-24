<template>
    <div class="dicom-viewer">
      <h2 class="text-2xl font-bold mb-4">DICOM Image Viewer</h2>
      <input type="file" @change="handleFileUpload" accept="image/*,application/dicom" class="file-input" />
      <div v-if="dicomMetadata" class="metadata">
        <p><strong>Patient Name:</strong> {{ dicomMetadata.PatientName }}</p>
        <p><strong>Study Date:</strong> {{ dicomMetadata.StudyDate }}</p>
      </div>
      <div v-if="imageSrc" class="image-container">
        <img :src="imageSrc" alt="DICOM Image" class="image" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import dcmjs from 'dcmjs';
  
  const dicomMetadata = ref(null);
  const imageSrc = ref(null);
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    if (file.type === 'application/dicom') {
      const arrayBuffer = await file.arrayBuffer();
      const dicomData = dcmjs.data.DicomMessage.readFile(arrayBuffer);
      dicomMetadata.value = dicomData.dict;
      imageSrc.value = URL.createObjectURL(file);
    }
  };
  </script>
  
  <style scoped>
  .dicom-viewer {
    text-align: center;
  }
  .file-input {
    margin-bottom: 1rem;
  }
  .metadata {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
  .image-container {
    margin-top: 1rem;
  }
  .image {
    max-width: 100%;
    height: auto;
  }
  </style>
  