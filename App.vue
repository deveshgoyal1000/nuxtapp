<template>
  <div id="app">
    <h1>Image Manipulation and DICOM Viewer</h1>
    <input type="file" @change="handleFileUpload" />
    <div v-if="isImage">
      <Canvas :image="fileSrc" />
    </div>
    <div v-if="isDicom">
      <DicomViewer :dicomFile="uploadedFile" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Canvas from "./components/Canvas.vue";
import DicomViewer from "./components/DicomViewer.vue";

const uploadedFile = ref(null);
const fileSrc = ref(null);
const isImage = ref(false);
const isDicom = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  uploadedFile.value = file;

  if (file.type === "image/jpeg" || file.type === "image/png") {
    fileSrc.value = URL.createObjectURL(file);
    isImage.value = true;
    isDicom.value = false;
  } else if (file.name.endsWith(".dcm")) {
    isDicom.value = true;
    isImage.value = false;
  }
};
</script>

<style>
#app {
  text-align: center;
  margin: 20px;
}
</style>
