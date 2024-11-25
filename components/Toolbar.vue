<template>
  <div class="toolbar">
    <button @click="zoomIn">Zoom In</button>
    <button @click="zoomOut">Zoom Out</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { emit } from 'vue';

let zoomLevel = ref(1);

const zoomIn = () => {
  zoomLevel.value += 0.1;
  emit('update:zoomLevel', zoomLevel.value);
};

const zoomOut = () => {
  if (zoomLevel.value > 0.1) {
    zoomLevel.value -= 0.1;
  }
  emit('update:zoomLevel', zoomLevel.value);
};

const reset = () => {
  zoomLevel.value = 1;
  emit('update:zoomLevel', zoomLevel.value);
};
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
