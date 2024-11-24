<template>
  <div id="canvas-container">
    <Stage :config="stageConfig">
      <Layer>
        <Image :image="image" draggable />
        <template v-for="shape in shapes">
          <Circle v-if="shape.type === 'circle'" :config="shape.config" />
          <!-- Add other shapes as needed -->
        </template>
      </Layer>
    </Stage>
  </div>
</template>

<script setup>
import { Stage, Layer, Image, Circle } from 'konva';
const stageConfig = { width: 800, height: 600 };
const image = ref(null);
const shapes = ref([]); // Array to store annotations
</script>
