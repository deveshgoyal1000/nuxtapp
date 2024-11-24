<script setup>
import { ref, onMounted, watch } from 'vue';
import Konva from 'konva';

// Props
defineProps({
  imageSrc: {
    type: String,
    required: true, // Ensure it's marked as required
  },
});

const canvasContainer = ref(null);
let stage, layer, konvaImage;

onMounted(() => {
  if (process.client && imageSrc) {
    initializeCanvas(imageSrc);
  }
});

// Watch for updates to imageSrc
watch(() => imageSrc, (newSrc) => {
  if (process.client && newSrc) {
    initializeCanvas(newSrc);
  }
});

function initializeCanvas(src) {
  const img = new Image(); // Only runs in the browser
  img.src = src;

  img.onload = () => {
    stage = new Konva.Stage({
      container: canvasContainer.value,
      width: img.width,
      height: img.height,
    });

    layer = new Konva.Layer();
    stage.add(layer);

    konvaImage = new Konva.Image({
      image: img,
      x: 0,
      y: 0,
    });

    layer.add(konvaImage);
    layer.batchDraw();
  };
}
</script>

<template>
  <div ref="canvasContainer" class="image-editor"></div>
</template>
