<template>
  <div>
    <h3 class="text-lg font-semibold">Image Editor</h3>

    <!-- Image upload section -->
    <input type="file" @change="uploadImage" accept="image/*" class="mt-4" />

    <!-- Konva stage container -->
    <div ref="stageContainer" class="border mt-4"></div>
  </div>
</template>

<script setup>
import Konva from 'konva';
import { onMounted, ref } from 'vue';

const stageContainer = ref(null);
let stage, layer, konvaImage;  // Keep references to the stage, layer, and image

onMounted(() => {
  stage = new Konva.Stage({
    container: stageContainer.value,
    width: 800,
    height: 600,
  });

  layer = new Konva.Layer();
  stage.add(layer);
});

// Image upload function
const uploadImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // Once the image is loaded, add it to the Konva canvas
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      addImageToCanvas(imageUrl);
    };

    reader.readAsDataURL(file);
  }
};

// Function to add image to Konva canvas
const addImageToCanvas = (src) => {
  const imageObj = new Image();
  imageObj.onload = () => {
    // If an image already exists on the canvas, remove it before adding the new one
    if (konvaImage) {
      konvaImage.destroy();
    }

    // Create the Konva Image object
    konvaImage = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: imageObj.width,
      height: imageObj.height,
    });

    layer.add(konvaImage);
    layer.batchDraw(); // Redraw the layer to show the new image
  };
  imageObj.src = src;  // Set the image source (the uploaded file)
};
</script>
