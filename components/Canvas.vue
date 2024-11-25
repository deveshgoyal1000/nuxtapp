<template>
  <div>
    <div ref="canvasContainer" class="canvas-container">
      <img ref="imageCanvas" :src="image" id="imageCanvas" />
    </div>
    <div class="controls">
      <button @click="crop">Crop</button>
      <button @click="reset">Reset</button>
      <label>Brightness</label>
      <input type="range" min="50" max="150" v-model="brightness" @input="adjustBrightness" />
      <label>Contrast</label>
      <input type="range" min="50" max="150" v-model="contrast" @input="adjustContrast" />
    </div>
  </div>
</template>

<script setup>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const cropper = ref(null);

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});

const brightness = ref(100);
const contrast = ref(100);

onMounted(() => {
  const imageElement = document.getElementById("imageCanvas");
  cropper.value = new Cropper(imageElement, {
    aspectRatio: 16 / 9,
    viewMode: 1,
  });
});

const crop = () => {
  const canvas = cropper.value.getCroppedCanvas();
  const croppedImage = canvas.toDataURL("image/jpeg");
  console.log(croppedImage); // Save or render the cropped image
};

const reset = () => {
  cropper.value.reset();
};

const adjustBrightness = () => {
  const filter = `brightness(${brightness.value}%) contrast(${contrast.value}%)`;
  cropper.value.image.style.filter = filter;
};

const adjustContrast = () => {
  const filter = `brightness(${brightness.value}%) contrast(${contrast.value}%)`;
  cropper.value.image.style.filter = filter;
};
</script>

<style>
.canvas-container {
  margin: 20px auto;
  max-width: 800px;
  max-height: 600px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.controls {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.controls input {
  width: 300px;
  margin: auto;
}
</style>
