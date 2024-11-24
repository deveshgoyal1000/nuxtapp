<template>
    <div>
      <h1>DICOM Viewer</h1>
      <div ref="dicomContainer" id="dicom-container" style="width: 512px; height: 512px; background: black;"></div>
    </div>
  </template>
  
  <script>
  import cornerstone from "cornerstone-core";
  import cornerstoneTools from "cornerstone-tools";
  import dicomParser from "dicom-parser";
  
  export default {
    name: "DicomViewer",
    mounted() {
      this.setupDicomViewer();
    },
    methods: {
      setupDicomViewer() {
        const container = this.$refs.dicomContainer;
  
        // Enable the container for Cornerstone
        cornerstone.enable(container);
  
        // Load and render the DICOM file
        fetch("/path-to-your-dicom-file.dcm")
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => {
            const imageId = cornerstone.registerImageLoader("dicom", () => {
              const byteArray = new Uint8Array(arrayBuffer);
              const dataSet = dicomParser.parseDicom(byteArray);
              return cornerstone.imageCache.putImageLoadObject(imageId, {
                promise: Promise.resolve({
                  data: dataSet,
                }),
              });
            });
            cornerstone.loadImage(imageId).then((image) => {
              cornerstone.displayImage(container, image);
            });
          })
          .catch((err) => {
            console.error("Error loading DICOM file:", err);
          });
      },
    },
  };
  </script>
  
  <style>
  #dicom-container {
    margin: 20px auto;
  }
  </style>
  