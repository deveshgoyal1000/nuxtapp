<template>
  <div id="canvas-container">
    <Stage :config="stageConfig">
      <Layer>
        <Image :image="image" draggable />
      </Layer>
    </Stage>
  </div>
</template>

<script setup>
import { Stage, Layer, Image } from 'konva';
const stageConfig = {
  width: 800,
  height: 600,
};
const image = ref(null);
</script>
