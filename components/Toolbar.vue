<template>
  <div class="toolbar">
    <button @click="setZoomLevel(zoomLevel + 0.1)">Zoom In</button>
    <button @click="setZoomLevel(zoomLevel - 0.1)">Zoom Out</button>
    <button @click="setZoomLevel(1)">Reset</button>
  </div>
</template>

<script setup>
const props = defineProps({
  zoomLevel: Number,
  setZoomLevel: Function,
});
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
