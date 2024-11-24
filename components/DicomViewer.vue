<template>
    <div class="dicom-viewer">
      <h2 class="text-xl font-bold mb-4">DICOM Viewer</h2>
      <div id="dicom-container" class="border rounded shadow-md w-full h-96"></div>
    </div>
  </template>
  
  <script>
  import * as cornerstone from "cornerstone-core";
  import * as cornerstoneTools from "cornerstone-tools";
  import dicomParser from "dicom-parser";
  import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
  
  export default {
    mounted() {
      const dicomElement = document.getElementById("dicom-container");
  
      // Initialize cornerstone
      cornerstone.enable(dicomElement);
  
      // Configure cornerstone WADO image loader
      cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
      cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  
      // Load the example DICOM file
      const dicomFileUrl = "/example.dcm"; // Path to the DICOM file in the public folder
      const imageId = `wadouri:${dicomFileUrl}`;
  
      cornerstone
        .loadImage(imageId)
        .then((image) => {
          cornerstone.displayImage(dicomElement, image);
  
          // Enable tools
          const panTool = cornerstoneTools.PanTool;
          const zoomTool = cornerstoneTools.ZoomTool;
  
          cornerstoneTools.addTool(panTool);
          cornerstoneTools.addTool(zoomTool);
  
          cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
          cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 4 });
        })
        .catch((error) => {
          console.error("Error loading DICOM file:", error);
        });
    },
  };
  </script>
  
  <style>
  .dicom-viewer {
    margin: 20px 0;
  }
  
  #dicom-container {
    background-color: black;
    width: 100%;
    height: 100%;
  }
  </style>
  