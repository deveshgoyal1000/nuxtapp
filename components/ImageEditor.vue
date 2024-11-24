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
    const imageContainer = ref(null);
    const stage = ref(null);
    const layer = ref(null);
    let konvaImage = null;

    const initKonva = () => {
      if (typeof window !== 'undefined') {
        const container = imageContainer.value;
        stage.value = new Konva.Stage({
          container: container,
          width: container.offsetWidth || 800,
          height: container.offsetHeight || 600,
        });

        layer.value = new Konva.Layer();
        stage.value.add(layer.value);
      }
    };

    const loadImage = (imageSrc) => {
      if (typeof window !== 'undefined') {
        const imageObj = new window.Image();
        imageObj.src = imageSrc;

        imageObj.onload = () => {
          if (konvaImage) {
            konvaImage.image(imageObj);
          } else {
            konvaImage = new Konva.Image({
              x: 50,
              y: 50,
              image: imageObj,
              draggable: true,
            });
            layer.value.add(konvaImage);
          }

          stage.value.size({
            width: imageObj.width,
            height: imageObj.height,
          });

          layer.value.batchDraw();
        };

        imageObj.onerror = () => {
          console.error('Failed to load the image:', imageSrc);
        };
      }
    };

    watch(
      () => props.imageSrc,
      (newImageSrc) => {
        loadImage(newImageSrc);
      },
      { immediate: true }
    );

    onMounted(() => {
      initKonva();
      loadImage(props.imageSrc);
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
