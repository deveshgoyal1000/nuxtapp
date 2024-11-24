<template>
  <div class="upload-page">
    <h1 class="text-2xl font-bold mb-4">Upload and Edit Images</h1>
    
    <!-- Single File Input -->
    <input 
      type="file" 
      @change="handleFileUpload" 
      accept="image/*,application/dicom" 
      class="file-input" 
    />

    <!-- Image Editor Component -->
    <ImageEditor v-if="uploadedImage" :imageSrc="uploadedImage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ImageEditor from '~/components/ImageEditor.vue'; // Ensure path is correct
import dcmjs from 'dcmjs';

// Reactive reference for the uploaded image
const uploadedImage = ref(null);

// Function to handle file uploads
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Check if the file is a DICOM file
  if (file.type === 'application/dicom') {
    const arrayBuffer = await file.arrayBuffer();
    const dicomData = dcmjs.data.DicomMessage.readFile(arrayBuffer);
    console.log('DICOM Data:', dicomData);
    // You can process or display the DICOM data here
  } else if (file.type.startsWith('image/')) {
    // Handle image files
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result; // Pass image data to ImageEditor
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
</style>
