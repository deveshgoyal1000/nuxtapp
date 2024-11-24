<template>
  <div class="main-container">
    <DicomViewer @image-uploaded="updateImageSrc" />
    <ImageEditor :imageSrc="imageSrc" />
    <ImageTools />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DicomViewer from '~/components/DicomViewer.vue';
import ImageEditor from '~/components/ImageEditor.vue';
import ImageTools from '~/components/ImageTools.vue';

const imageSrc = ref('');

// Function to update imageSrc when a new image is uploaded
const updateImageSrc = (src) => {
  imageSrc.value = src;
};
</script>
