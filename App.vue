<template>
  <div>
    <Toolbar :zoomLevel="zoomLevel" :setZoomLevel="setZoomLevel" />
    <Canvas :image="image" :zoomLevel="zoomLevel" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Canvas from "./Canvas.vue";
import Toolbar from "./Toolbar.vue";

const image = ref("path-to-your-image.jpg"); // Replace with the actual image path
const zoomLevel = ref(1);

const setZoomLevel = (newZoomLevel) => {
  zoomLevel.value = newZoomLevel;
};
</script>
