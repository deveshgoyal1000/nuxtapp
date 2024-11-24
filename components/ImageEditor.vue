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

    const initKonva = () => {
      const container = imageContainer.value;
      // Initialize Konva Stage
      stage.value = new Konva.Stage({
        container: container,
        width: container.offsetWidth,
        height: container.offsetHeight,
      });

      layer.value = new Konva.Layer();
      stage.value.add(layer.value);
    };

    const loadImage = (imageSrc) => {
      const imageObj = new Image();
      imageObj.src = imageSrc;

      imageObj.onload = () => {
        console.log('Image loaded successfully!');
        const konvaImage = new Konva.Image({
          x: 50,
          y: 50,
          image: imageObj,
          width: imageObj.width,
          height: imageObj.height,
          draggable: true,
        });

        layer.value.add(konvaImage);
        layer.value.batchDraw();
      };

      imageObj.onerror = () => {
        console.error("Failed to load the image.");
      };
    };

    onMounted(() => {
      initKonva();
      
      // Watch for imageSrc changes and load the new image
      watch(
        () => props.imageSrc,
        (newImageSrc) => {
          console.log('New image source:', newImageSrc);
          if (newImageSrc) {
            loadImage(newImageSrc);
          }
        },
        { immediate: true }
      );
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
