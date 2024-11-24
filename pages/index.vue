<template> 
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-blue-500">Medical Imaging App</h1>
    <p class="mt-4 text-gray-600">Start building your medical image tools here.</p>
    
    <!-- Add the DICOM Viewer Below -->
    <DicomViewer />
  </div>
</template>

<script>
import DicomViewer from "~/components/DicomViewer.vue";

export default {
  components: {
    DicomViewer,
  },
};
</script>
