<template>
  <div ref="imageContainer" class="image-editor-container">
    <p v-if="!imageLoaded" class="loading-text">Loading image...</p>
    <p v-else-if="imageError" class="error-text">Failed to load image</p>
  </div>
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
    const imageContainer = ref(null); // Reference to container div
    const stage = ref(null); // Konva stage
    const layer = ref(null); // Konva layer
    const imageLoaded = ref(false); // Track if the image is loaded
    const imageError = ref(false); // Track if there's an error loading the image
    let konvaImage = null; // Image object to add to Konva layer

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

      // Handle resizing
      window.addEventListener('resize', () => {
        stage.value.width(container.offsetWidth);
        stage.value.height(container.offsetHeight);
      });
    };

    // Load image and create a Konva image object
    const loadImage = (imageSrc) => {
      imageLoaded.value = false;
      imageError.value = false;

      const imageObj = new Image();
      imageObj.src = imageSrc;

      imageObj.onload = () => {
        if (konvaImage) {
          konvaImage.image(imageObj); // Update existing Konva image
        } else {
          // Create new Konva image
          konvaImage = new Konva.Image({
            x: 50,
            y: 50,
            image: imageObj,
            width: imageObj.width,
            height: imageObj.height,
            draggable: true, // Make image draggable
          });

          layer.value.add(konvaImage);
        }

        layer.value.batchDraw(); // Update the layer
        imageLoaded.value = true;
      };

      imageObj.onerror = () => {
        console.error('Image failed to load!');
        imageError.value = true;
      };
    };

    // Watch for changes in imageSrc prop
    watch(
      () => props.imageSrc,
      (newImageSrc) => {
        if (layer.value) {
          console.log('Loading new image:', newImageSrc);
          loadImage(newImageSrc);
        } else {
          console.error('Konva layer is not initialized yet.');
        }
      },
      { immediate: true } // Ensure the image is loaded on mount
    );

    // Initialize Konva when the component mounts
    onMounted(() => {
      initKonva();
      loadImage(props.imageSrc);
    });

    return {
      imageContainer,
      imageLoaded,
      imageError,
    };
  },
};
</script>

<style scoped>
.image-editor-container {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  overflow: hidden; /* Prevent image overflow */
}

.loading-text {
  text-align: center;
  color: gray;
  font-size: 14px;
}

.error-text {
  text-align: center;
  color: red;
  font-size: 14px;
}
</style>
