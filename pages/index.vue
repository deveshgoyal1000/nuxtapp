<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Medical Imaging Tool</h1>
    <input type="file" @change="handleFileUpload" />
    <Toolbar @onToolSelect="onToolSelect" />
    <Canvas />
  </div>
</template>

<script setup>
import Toolbar from '~/components/Toolbar.vue';
import Canvas from '~/components/Canvas.vue';

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log('Uploaded File:', file);
};
const onToolSelect = (tool) => {
  console.log('Selected Tool:', tool);
};
</script>
