<template>
  <div>
    <h3 class="text-lg font-semibold">Image Editor</h3>
    <div ref="stageContainer" class="border mt-4"></div>
    <input type="file" @change="handleImageUpload" />
  </div>
</template>

<script setup>
import Konva from 'konva';
import { ref, onMounted, watch } from 'vue';

const stageContainer = ref(null);
const stage = ref(null);
const layer = ref(null);
const imageElement = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      // Create an image element
      imageElement.value = new Image();
      imageElement.value.src = reader.result;
      imageElement.value.onload = () => {
        // Adjust stage size to match the image size
        if (stage.value) {
          stage.value.width(imageElement.value.width);
          stage.value.height(imageElement.value.height);
        }

        // Create image node and add it to the layer
        const konvaImage = new Konva.Image({
          image: imageElement.value,
          x: 0,
          y: 0,
          width: imageElement.value.width,
          height: imageElement.value.height,
        });
        
        layer.value.add(konvaImage);
        layer.value.batchDraw();
      };
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  // Initialize Konva stage
  stage.value = new Konva.Stage({
    container: stageContainer.value,
    width: 800,
    height: 600,
  });

  // Create and add a layer to the stage
  layer.value = new Konva.Layer();
  stage.value.add(layer.value);
});
</script>
