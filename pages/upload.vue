<template>
  <div>
    <!-- Your image upload logic here -->
    
    <!-- Example: if a DICOM file is uploaded, pass it to DICOMViewer -->
    <DICOMViewer v-if="isDICOMFile" :file="uploadedFile" />
  </div>
</template>

<script setup>
import DICOMViewer from '~/components/DICOMViewer.vue';
import { ref } from 'vue';

const uploadedFile = ref(null);
const isDICOMFile = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  uploadedFile.value = file;
  if (file && file.type === 'application/dicom') {
    isDICOMFile.value = true;
  }
};
</script>
