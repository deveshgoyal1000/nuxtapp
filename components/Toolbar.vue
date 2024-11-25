<template>
  <div class="toolbar">
    <button @click="decreaseZoom" class="zoom-btn">-</button>
    <span>{{ zoomLevel }}</span>
    <button @click="increaseZoom" class="zoom-btn">+</button>
  </div>
</template>

<script setup>
const props = defineProps({
  zoomLevel: Number,
  setZoomLevel: Function,
});

const increaseZoom = () => {
  props.setZoomLevel(props.zoomLevel + 0.1);
};

const decreaseZoom = () => {
  if (props.zoomLevel > 0.1) {
    props.setZoomLevel(props.zoomLevel - 0.1);
  }
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.zoom-btn {
  background-color: #4c8bf5;
  color: white;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.zoom-btn:hover {
  background-color: #3578d0;
}
</style>
