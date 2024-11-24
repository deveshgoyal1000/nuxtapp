<template>
  <div class="toolbar">
    <button @click="zoomIn">Zoom In</button>
    <button @click="zoomOut">Zoom Out</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
function zoomIn() {
  console.log("Zooming In...");
}
function zoomOut() {
  console.log("Zooming Out...");
}
function reset() {
  console.log("Resetting...");
}
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
