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

    <!-- Display DICOM metadata -->
    <div v-if="dicomMetadata.PatientName" class="dicom-viewer">
      <h3>DICOM Metadata</h3>
      <p><strong>Patient Name:</strong> {{ dicomMetadata.PatientName }}</p>
      <p><strong>Study Date:</strong> {{ dicomMetadata.StudyDate }}</p>
      
      <!-- Display DICOM image if applicable -->
      <img v-if="dicomImage" :src="dicomImage" alt="DICOM Image" class="dicom-image" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ImageEditor from '~/components/ImageEditor.vue'; // Ensure correct path
import dcmjs from 'dcmjs';

// Reactive references for the uploaded image and DICOM metadata
const uploadedImage = ref(null);
const dicomMetadata = ref({});
const dicomImage = ref('');

// Function to handle file uploads
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Check if the file is a DICOM file
  if (file.type === 'application/dicom') {
    const arrayBuffer = await file.arrayBuffer();
    const dicomData = dcmjs.data.DicomMessage.readFile(arrayBuffer);
    dicomMetadata.value = dicomData.dict; // Store DICOM metadata
    dicomImage.value = URL.createObjectURL(new Blob([arrayBuffer])); // Display DICOM image
  } else if (file.type.startsWith('image/')) {
    // Handle regular image files
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

/* Styles for displaying DICOM image */
.dicom-image {
  max-width: 100%;
  height: auto;
}

.dicom-viewer {
  margin-top: 20px;
}
</style>
