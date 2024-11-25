<template>
    <div>
      <div ref="dicomContainer" class="dicom-container"></div>
      <div class="metadata">
        <p><strong>Patient Name:</strong> {{ patientName }}</p>
        <p><strong>Study Date:</strong> {{ studyDate }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import cornerstone from "cornerstone-core";
  import dicomParser from "dicom-parser";
  
  const dicomContainer = ref(null);
  
  const props = defineProps({
    dicomFile: {
      type: File,
      required: true,
    },
  });
  
  const patientName = ref("");
  const studyDate = ref("");
  
  onMounted(() => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const byteArray = new Uint8Array(arrayBuffer);
  
      const dataSet = dicomParser.parseDicom(byteArray);
  
      // Display metadata
      patientName.value = dataSet.string("x00100010") || "Unknown";
      studyDate.value = dataSet.string("x00080020") || "Unknown";
  
      // Load the DICOM image using cornerstone
      cornerstone.enable(dicomContainer.value);
      cornerstone.loadImage(`wadouri:${dicomFile.name}`).then((image) => {
        cornerstone.displayImage(dicomContainer.value, image);
      });
    };
  
    reader.readAsArrayBuffer(props.dicomFile);
  });
  </script>
  
  <style>
  .dicom-container {
    width: 512px;
    height: 512px;
    margin: auto;
    border: 1px solid #ccc;
  }
  
  .metadata {
    margin-top: 20px;
    text-align: center;
  }
  </style>
  