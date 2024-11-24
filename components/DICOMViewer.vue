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
  
  // Emit imageSrc to the parent
  defineEmits(['image-uploaded']);
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    if (file.type === 'application/dicom') {
      const arrayBuffer = await file.arrayBuffer();
      const dicomData = dcmjs.data.DicomMessage.readFile(arrayBuffer);
      dicomMetadata.value = dicomData.dict;
      imageSrc.value = URL.createObjectURL(file);
  
      // Emit the image source
      emit('image-uploaded', imageSrc.value);
    } else if (file.type.startsWith('image/')) {
      imageSrc.value = URL.createObjectURL(file);
  
      // Emit the image source
      emit('image-uploaded', imageSrc.value);
    }
  };
  </script>
  