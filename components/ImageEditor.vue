<template>
  <div class="image-editor">
    <h2 class="text-xl font-bold mb-4">Image Editor</h2>
    <div class="editor-controls">
      <!-- Add editing controls here later -->
      <p>Image editing functionality goes here (e.g., crop, zoom, etc.)</p>
    </div>
    <div v-if="imageSrc">
      <img :src="imageSrc" alt="Image for editing" class="editable-image" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.image-editor {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.editor-controls {
  margin-bottom: 1rem;
}

.editable-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}
</style>
