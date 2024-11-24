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
const imageFile = ref(null); // Reference to the uploaded image file

// Handle the image file change (file input)
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    // Use the image URL to load the image into Konva
    const img = new Image();
    img.src = reader.result;
    
    img.onload = () => {
      const layer = new Konva.Layer();
      const konvaImage = new Konva.Image({
        x: 100,
        y: 100,
        image: img,
        width: img.width / 2, // Resizing image initially
        height: img.height / 2, // Resizing image initially
        draggable: true, // Enable dragging
      });

      layer.add(konvaImage);
      stage.add(layer);

      // Allow resizing of the image by adding resizing handles
      const resizeHandle = new Konva.Rect({
        x: konvaImage.x() + konvaImage.width() - 10,
        y: konvaImage.y() + konvaImage.height() - 10,
        width: 10,
        height: 10,
        fill: 'red',
        draggable: true,
      });

      resizeHandle.on('dragmove', () => {
        // Resizing the image when resizing handle is dragged
        const newWidth = resizeHandle.x() - konvaImage.x();
        const newHeight = resizeHandle.y() - konvaImage.y();
        konvaImage.width(newWidth);
        konvaImage.height(newHeight);
        layer.batchDraw();
      });

      layer.add(resizeHandle);
      layer.batchDraw();
    };
  };
  reader.readAsDataURL(file);
};

onMounted(() => {
  const stage = new Konva.Stage({
    container: stageContainer.value,
    width: 800,
    height: 600,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  // Add image upload functionality
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', handleFileUpload);

  // Append the input element to the DOM
  document.body.appendChild(input);
});
</script>
