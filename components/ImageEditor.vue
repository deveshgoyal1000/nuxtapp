<template>
  <div ref="imageContainer" class="image-editor-container"></div>
</template>

<script>
import { ref, onMounted, watch, defineProps } from 'vue';
import Konva from 'konva';

export default {
  name: 'ImageEditor',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imageContainer = ref(null);
    const layer = ref(null);
    const stage = ref(null);

    onMounted(() => {
      const container = imageContainer.value;
      
      // Initialize the Konva Stage
      stage.value = new Konva.Stage({
        container: container,
        width: container.offsetWidth,
        height: container.offsetHeight,
      });

      layer.value = new Konva.Layer();
      stage.value.add(layer.value);

      // Watch for changes to imageSrc
      watch(() => props.imageSrc, (newImageSrc) => {
        console.log('New image source:', newImageSrc); // Debug the new image source

        if (newImageSrc) {
          const imageObj = new Image();
          imageObj.src = newImageSrc; // This is the uploaded image

          // Handle image load
          imageObj.onload = () => {
            const konvaImage = new Konva.Image({
              x: 50, // Position the image
              y: 50,
              image: imageObj,
              width: imageObj.width, // Set the image width
              height: imageObj.height, // Set the image height
              draggable: true, // Optional: Makes the image draggable
            });

            // Add image to layer and redraw
            layer.value.add(konvaImage);
            layer.value.batchDraw();
          };

          // Handle image load error
          imageObj.onerror = () => {
            console.error("Failed to load image.");
          };
        }
      }, { immediate: true });
    });

    return {
      imageContainer,
    };
  },
};
</script>

<style scoped>
.image-editor-container {
  width: 100%;
  height: 100%;
  border: 1px solid black; /* Optional: Just to see the container bounds */
}
</style>
