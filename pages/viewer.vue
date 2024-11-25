<template>
  <div>
    <Toolbar :onToolSelect="handleToolSelect" />
    <Canvas :image="uploadedImage" />
  </div>
</template>

<script setup>
import Toolbar from '@/components/Toolbar.vue';
import Canvas from '@/components/Canvas.vue';
import { ref } from 'vue';

const uploadedImage = ref(null);

const handleToolSelect = (tool) => {
  console.log(`Selected Tool: ${tool}`);
};
</script>

<style scoped>
/* Add any custom styles for this component here */
</style>
