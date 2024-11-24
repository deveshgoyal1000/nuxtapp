<template>
  <div class="upload-page">
    <h1 class="text-2xl font-bold mb-4">Upload and Edit Images</h1>
    
    <!-- Single File Input for Image Upload -->
    <input 
      type="file" 
      @change="handleFileUpload" 
      accept="image/*,application/dicom" 
      class="file-input" 
    />
    
    <!-- Pass uploaded image data to ImageEditor -->
    <ImageEditor v-if="uploadedImage" :imageSrc="uploadedImage" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ImageEditor from '~/components/ImageEditor.vue'; // Ensure the correct path
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
    
    // Optionally extract pixel data or render as an image (this part depends on your requirements)
    const pixelData = dicomData.dict['x7fe00010']; // Pixel Data tag for DICOM
    if (pixelData) {
      // Convert DICOM pixel data to an image (you may need further processing)
      const image = createImageFromDicom(pixelData);
      uploadedImage.value = image;  // You might want to set this to the appropriate image data
    }

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

// Example function to create an image from DICOM pixel data
const createImageFromDicom = (pixelData) => {
  // DICOM image processing (to be implemented)
  // You could render pixel data or convert it into an ImageData object or base64 string
  return 'data:image/jpeg;base64,...'; // Return base64 encoded image or similar
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
