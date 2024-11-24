<template>
    <div class="dicom-viewer">
      <h3>DICOM Metadata</h3>
      <p><strong>Patient Name:</strong> {{ dicomMetadata.PatientName }}</p>
      <p><strong>Study Date:</strong> {{ dicomMetadata.StudyDate }}</p>
      
      <!-- Display DICOM image if applicable -->
      <img v-if="dicomImage" :src="dicomImage" alt="DICOM Image" class="dicom-image" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import dcmjs from 'dcmjs';
  
  const dicomMetadata = ref({});
  const dicomImage = ref('');
  
  // Function to handle DICOM file and extract metadata
  const handleDICOMFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const dicomData = dcmjs.data.DicomMessage.readFile(arrayBuffer);
    dicomMetadata.value = dicomData.dict;
    dicomImage.value = URL.createObjectURL(new Blob([arrayBuffer]));
  };
  
  // You can call `handleDICOMFile(file)` with a DICOM file from your upload input or another source
  </script>
  
  <style scoped>
  .dicom-image {
    max-width: 100%;
    height: auto;
  }
  </style>
  