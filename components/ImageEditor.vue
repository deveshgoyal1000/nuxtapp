<script setup>
import { ref, onMounted, watch } from 'vue';
import Konva from 'konva';

// Props
defineProps({
  imageSrc: {
    type: String,
    required: true, // Ensure it's marked as required
  },
});

const canvasContainer = ref(null);
let stage, layer, konvaImage;

onMounted(() => {
  if (!imageSrc) return;

  const img = new Image();
  img.src = imageSrc;

  img.onload = () => {
    stage = new Konva.Stage({
      container: canvasContainer.value,
      width: img.width,
      height: img.height,
    });

    layer = new Konva.Layer();
    stage.add(layer);

    konvaImage = new Konva.Image({
      image: img,
      x: 0,
      y: 0,
    });

    layer.add(konvaImage);
    layer.batchDraw();
  };
});

// Watch for updates to imageSrc
watch(() => imageSrc, (newSrc) => {
  if (!stage || !konvaImage) return;

  const newImg = new Image();
  newImg.src = newSrc;

  newImg.onload = () => {
    konvaImage.image(newImg);
    layer.batchDraw();
  };
});
</script>
