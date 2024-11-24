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
    const imageContainer = ref(null);  // Reference to container div
    const stage = ref(null);  // Konva stage
    const layer = ref(null);  // Konva layer
    let konvaImage = null;  // Image object to add to Konva layer

    // Initialize Konva stage and layer
    const initKonva = () => {
      const container = imageContainer.value;
      stage.value = new Konva.Stage({
        container: container,
        width: container.offsetWidth,
        height: container.offsetHeight,
      });

      layer.value = new Konva.Layer();
      stage.value.add(layer.value);
    };

    // Load image and create a Konva image object
    const loadImage = (imageSrc) => {
      const imageObj = new Image();
      imageObj.src = imageSrc;

      // Handle image load success
      imageObj.onload = () => {
        if (konvaImage) {
          konvaImage.image(imageObj); // Update image source if the image already exists
        } else {
          // Create new Konva image if not created yet
          konvaImage = new Konva.Image({
            x: 50,
            y: 50,
            image: imageObj,
            width: imageObj.width,
            height: imageObj.height,
            draggable: true, // Make image draggable
          });

          layer.value.add(konvaImage);
          layer.value.batchDraw(); // Update the layer to reflect changes
        }
      };

      // Handle image load error
      imageObj.onerror = () => {
        console.error('Image failed to load!');
      };
    };

    // Watch for changes in imageSrc prop
    watch(
      () => props.imageSrc,
      (newImageSrc) => {
        console.log('Loading new image:', newImageSrc);
        loadImage(newImageSrc);
      },
      { immediate: true } // Ensure that image is loaded immediately when component mounts
    );

    // Initialize Konva when the component mounts
    onMounted(() => {
      initKonva();
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
  border: 1px solid black; /* Optional: To visualize the container */
}
</style>
