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
  
  export default {
    mounted() {
      const dicomElement = document.getElementById("dicom-container");
  
      // Initialize cornerstone on the element
      cornerstone.enable(dicomElement);
  
      // Load the example DICOM file
      const dicomFileUrl = "/example.dcm"; // Path to the DICOM file in the public folder
      cornerstone
        .loadImage(`wadouri:${dicomFileUrl}`)
        .then((image) => {
          cornerstone.displayImage(dicomElement, image);
  
          // Optionally enable tools if you want interactivity (e.g., pan, zoom)
          cornerstoneTools.init();
  
          // Enable specific tools, e.g., pan, zoom, and window level
          cornerstoneTools.addTool(cornerstoneTools.PanTool);
          cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
          cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
  
          // Activate the tools
          cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 });
          cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 2 });
          cornerstoneTools.setToolActive("Wwwc", { mouseButtonMask: 4 });
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
  }
  </style>
  