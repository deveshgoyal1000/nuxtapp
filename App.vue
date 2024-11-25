<template>
  <div id="app">
    <Toolbar :zoomLevel="zoomLevel" :setZoomLevel="setZoomLevel" />
    <Canvas :image="image" :zoomLevel="zoomLevel" />
    <DicomViewer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Toolbar from "./components/Toolbar.vue";
import Canvas from "./components/Canvas.vue";
import DicomViewer from "./components/DicomViewer.vue";

// State variables
const zoomLevel = ref(1); // Default zoom level
const image = ref(require("@/assets/sample.jpg")); // Replace with your image path

// Function to update zoom level
const setZoomLevel = (level) => {
  zoomLevel.value = level;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
