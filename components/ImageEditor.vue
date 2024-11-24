<template>
    <div>
      <h3 class="text-lg font-semibold">Image Editor</h3>
      <div ref="stageContainer" class="border mt-4"></div>
    </div>
  </template>
  
  <script setup>
  import Konva from 'konva';
  import { onMounted, ref } from 'vue';
  
  const stageContainer = ref(null);
  
  onMounted(() => {
    const stage = new Konva.Stage({
      container: stageContainer.value,
      width: 800,
      height: 600,
    });
  
    const layer = new Konva.Layer();
    stage.add(layer);
  
    const rect = new Konva.Rect({
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      fill: 'blue',
    });
  
    layer.add(rect);
    layer.draw();
  });
  </script>
  