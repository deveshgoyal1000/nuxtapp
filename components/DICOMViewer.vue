<template>
    <div class="dicom-viewer">
      <h3>DICOM Metadata</h3>
      <p><strong>Patient Name:</strong> {{ dicomMetadata.PatientName }}</p>
      <p><strong>Study Date:</strong> {{ dicomMetadata.StudyDate }}</p>
      
      <!-- Display DICOM image if applicable -->
      <div v-if="dicomImage">
        <canvas ref="dicomCanvas"></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import dcmjs from 'dcmjs';
  
  const dicomMetadata = ref({});
  const dicomImage = ref(null);
  const dicomCanvas = ref(null);
  
  // Function to handle DICOM file and extract metadata
  const handleDICOMFile = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const dicomData = dcmjs.data.DicomMessage.readFile(arrayBuffer);
      dicomMetadata.value = dicomData.dict;
      
      // Check if pixel data is present in the DICOM file
      const pixelData = dicomData.dict['x7fe00010']; // DICOM tag for pixel data
      if (pixelData) {
        const image = await loadDicomImage(arrayBuffer);
        dicomImage.value = image;
        renderDicomImage(image);
      } else {
        console.error('No pixel data found in DICOM file');
      }
    } catch (error) {
      console.error('Error processing DICOM file', error);
    }
  };
  
  // Function to load and decode the DICOM image
  const loadDicomImage = async (arrayBuffer) => {
    try {
      const dicomData = dcmjs.data.DicomMessage.readFile(arrayBuffer);
      const pixelData = dicomData.dict['x7fe00010']; // DICOM tag for pixel data
      const width = dicomData.dict['x00280011']; // Width from DICOM metadata
      const height = dicomData.dict['x00280010']; // Height from DICOM metadata
  
      // Assuming 8-bit grayscale (you might need to handle more formats)
      const pixels = new Uint8Array(pixelData); // Raw pixel data
  
      return { width, height, pixels };
    } catch (error) {
      console.error('Error decoding DICOM image', error);
    }
  };
  
  // Function to render the decoded DICOM image on a canvas
  const renderDicomImage = (image) => {
    const canvas = dicomCanvas.value;
    const ctx = canvas.getContext('2d');
    
    if (image && ctx) {
      // Set canvas size
      canvas.width = image.width;
      canvas.height = image.height;
  
      // Create an image data object and put pixel data
      const imageData = ctx.createImageData(image.width, image.height);
      
      // For grayscale images, assign pixel data to the RGBA channels
      for (let i = 0; i < image.pixels.length; i++) {
        const pixelValue = image.pixels[i];
        imageData.data[i * 4] = pixelValue;     // R
        imageData.data[i * 4 + 1] = pixelValue; // G
        imageData.data[i * 4 + 2] = pixelValue; // B
        imageData.data[i * 4 + 3] = 255;       // A (alpha)
      }
  
      // Put the image data onto the canvas
      ctx.putImageData(imageData, 0, 0);
    } else {
      console.error('Canvas or image is undefined');
    }
  };
  
  onMounted(() => {
    // For example, if you want to call the function with a file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.dcm';
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        handleDICOMFile(file);
      }
    });
    document.body.appendChild(fileInput);
  });
  </script>
  
  <style scoped>
  .dicom-image {
    max-width: 100%;
    height: auto;
  }
  </style>
  