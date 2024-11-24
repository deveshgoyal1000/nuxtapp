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
const imageUrl = ref(null);  // For storing the image URL after uploading

onMounted(() => {
  const stage = new Konva.Stage({
    container: stageContainer.value,
    width: 800,
    height: 600,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  // Placeholder for the rectangle (it will be replaced by the image)
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

// Image upload function
const uploadImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // Once the image is loaded, add it to the Konva canvas
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
      addImageToCanvas(imageUrl.value);
    };

    reader.readAsDataURL(file);
  }
};

// Function to add image to Konva canvas
const addImageToCanvas = (src) => {
  const stage = new Konva.Stage({
    container: stageContainer.value,
    width: 800,
    height: 600,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  const imageObj = new Image();
  imageObj.onload = () => {
    const konvaImage = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: imageObj.width,
      height: imageObj.height,
    });

    layer.add(konvaImage);
    layer.draw();
  };
  imageObj.src = src;  // Set the image source (the uploaded file)
};
</script>
