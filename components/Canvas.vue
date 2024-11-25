<template>
  <div class="toolbar">
    <button @click="zoomIn">Zoom In</button>
    <button @click="zoomOut">Zoom Out</button>
    <button @click="resetZoom">Reset</button>
  </div>
</template>

<script setup>
const props = defineProps({
  zoomLevel: {
    type: Number,
    required: true,
  },
  setZoomLevel: {
    type: Function,
    required: true,
  },
});

const zoomIn = () => {
  const newZoomLevel = props.zoomLevel + 0.1;
  props.setZoomLevel(newZoomLevel);
};

const zoomOut = () => {
  if (props.zoomLevel > 0.1) {
    const newZoomLevel = props.zoomLevel - 0.1;
    props.setZoomLevel(newZoomLevel);
  }
};

const resetZoom = () => {
  props.setZoomLevel(1);
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
