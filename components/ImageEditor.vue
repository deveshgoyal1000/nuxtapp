<template>
  <div>
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="controls">
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
      <!-- Add other manipulation buttons as needed -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Konva from 'konva';

const canvasContainer = ref(null);
let stage;
let layer;
let image;

onMounted(() => {
  const img = new Image();
  img.src = '/path/to/your/image.png'; // Set the image source here
  
  img.onload = () => {
    stage = new Konva.Stage({
      container: canvasContainer.value,
      width: img.width,
      height: img.height,
    });
    
    layer = new Konva.Layer();
    stage.add(layer);
    
    image = new Konva.Image({
      image: img,
      x: 0,
      y: 0,
    });
    
    layer.add(image);
    layer.batchDraw();
  };
});

const zoomIn = () => {
  const scale = stage.scaleX() * 1.1;
  stage.scale({ x: scale, y: scale });
  layer.batchDraw();
};

const zoomOut = () => {
  const scale = stage.scaleX() / 1.1;
  stage.scale({ x: scale, y: scale });
  layer.batchDraw();
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: auto;
  border: 1px solid #000;
}
.controls {
  margin-top: 1rem;
}
</style>
