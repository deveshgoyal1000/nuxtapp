<template>
  <div class="dicom-viewer">
    <h2>DICOM Image Viewer</h2>
    
    <!-- DICOM Image Display -->
    <div v-if="imageSrc" class="image-container">
      <img :src="imageSrc" alt="DICOM Image" class="dicom-image" />
    </div>

    <!-- Metadata Display -->
    <div v-if="dicomMetadata" class="metadata-container">
      <h3>Metadata</h3>
      <p><strong>Patient Name:</strong> {{ dicomMetadata.patientName }}</p>
      <p><strong>Study Date:</strong> {{ dicomMetadata.studyDate }}</p>
      <p><strong>Modality:</strong> {{ dicomMetadata.modality }}</p>
      <!-- Add more metadata as necessary -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDicom } from '~/composables/useDicom'; // Import the composable for DICOM handling

// Props for the component (file input or image source)
const props = defineProps({
  dicomFile: {
    type: File,
    required: true,
  },
});

// Reactive references to store image source and metadata
const imageSrc = ref(null);
const dicomMetadata = ref(null);

// DICOM handling logic
const { loadDicomFile } = useDicom();

// Load DICOM image and metadata when component is mounted
onMounted(async () => {
  if (props.dicomFile) {
    const dicomData = await loadDicomFile(props.dicomFile);
    imageSrc.value = dicomData.image;  // Assuming dicomData contains the image as a base64 string
    dicomMetadata.value = extractMetadata(dicomData);  // Extract relevant metadata
  }
});

// Function to extract and return the relevant metadata
function extractMetadata(dicomData) {
  return {
    patientName: dicomData.patientName || 'N/A',
    studyDate: dicomData.studyDate || 'N/A',
    modality: dicomData.modality || 'N/A',
    // Add more metadata fields as needed
  };
}
</script>

<style scoped>
.dicom-viewer {
  padding: 20px;
  text-align: center;
}

.image-container {
  margin-bottom: 20px;
}

.dicom-image {
  max-width: 100%;
  height: auto;
}

.metadata-container {
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  text-align: left;
}

.metadata-container p {
  font-size: 14px;
}
</style>
