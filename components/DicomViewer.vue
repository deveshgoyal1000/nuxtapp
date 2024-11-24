<template> 
    <div class="dicom-viewer">
      <h2 class="text-xl font-bold mb-4">DICOM Viewer</h2>
      <div id="dicom-container" class="border rounded shadow-md w-full h-96"></div>
    </div>
  </template>
  
  <script>
  import cornerstone from "cornerstone-core/dist/cornerstone.js";
  import cornerstoneTools from "cornerstone-tools";
  import dicomParser from "dicom-parser";
  import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
  
  export default {
    mounted() {
      const dicomElement = document.getElementById("dicom-container");
  
      // Enable cornerstone on the DICOM container
      cornerstone.enable(dicomElement);
  
      // Configure cornerstone WADO image loader
      cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
      cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  
      // Add WADO scheme to image loader
      cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
          // Add any custom headers here (if needed)
          xhr.setRequestHeader("Authorization", "Bearer YOUR_TOKEN_HERE");
        },
      });
  
      // Load the example DICOM file
      const dicomFileUrl = "/example.dcm"; // Ensure this file is placed in the public folder
      const imageId = `wadouri:${dicomFileUrl}`;
  
      cornerstone
        .loadImage(imageId)
        .then((image) => {
          // Display the loaded DICOM image
          cornerstone.displayImage(dicomElement, image);
  
          // Enable tools for user interaction
          cornerstoneTools.init();
          cornerstoneTools.addTool(cornerstoneTools.PanTool);
          cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
  
          cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 1 }); // Left-click for pan
          cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 4 }); // Right-click for zoom
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
  