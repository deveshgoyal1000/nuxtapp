<template>
    <div id="dicomElement" style="width: 100%; height: 100%"></div>
  </template>
  
  <script>
  import cornerstone from 'cornerstone-core'
  
  export default {
    mounted() {
      // Ensure the DICOM element is available before enabling Cornerstone
      const element = document.getElementById('dicomElement')
      if (element) {
        cornerstone.enable(element)  // Initialize Cornerstone
      }
    },
    beforeDestroy() {
      const element = document.getElementById('dicomElement')
      if (element) {
        cornerstone.disable(element)  // Cleanup Cornerstone
      }
    },
  }
  </script>
  
  <style scoped>
  #dicomElement {
    background-color: #000;  /* DICOM background color */
  }
  </style>
  