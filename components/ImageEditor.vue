<template>
  <div ref="imageContainer" class="image-editor-container"></div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
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
    const imageContainer = ref(null); // Reference to the container div
    const stage = ref(null); // Konva stage
    const layer = ref(null); // Konva layer
    let konvaImage = null; // Konva image object

    // Initialize Konva stage and layer
    const initKonva = () => {
      const container = imageContainer.value;
      stage.value = new Konva.Stage({
        container: container,
        width: container.offsetWidth || 800, // Default width if no size is set
        height: container.offsetHeight || 600, // Default height
      });

      layer.value = new Konva.Layer();
      stage.value.add(layer.value);
    };

    // Load and display the image
    const loadImage = (imageSrc) => {
      const imageObj = new Image();
      imageObj.src = imageSrc;

      imageObj.onload = () => {
        if (konvaImage) {
          konvaImage.image(imageObj); // Update image source if already exists
        } else {
          konvaImage = new Konva.Image({
            x: 50,
            y: 50,
            image: imageObj,
            draggable: true, // Make image draggable
          });

          layer.value.add(konvaImage);
        }

        // Adjust canvas size to fit the image
        stage.value.size({
          width: imageObj.width,
          height: imageObj.height,
        });

        layer.value.batchDraw(); // Redraw the layer to reflect changes
      };

      imageObj.onerror = () => {
        console.error('Failed to load the image:', imageSrc);
      };
    };

    // Watch for changes in the imageSrc prop
    watch(
      () => props.imageSrc,
      (newImageSrc) => {
        loadImage(newImageSrc);
      },
      { immediate: true }
    );

    // Initialize Konva when the component mounts
    onMounted(() => {
      initKonva();
      loadImage(props.imageSrc); // Load the initial image
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
  border: 1px solid black;
  overflow: hidden;
  position: relative;
}
</style>
